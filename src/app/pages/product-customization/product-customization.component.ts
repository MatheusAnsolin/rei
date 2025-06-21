import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs'; // Usaremos para fazer várias chamadas de API
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.interface';
import { Topping, Extra } from '../../models/topping.interface';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../models/cart-item.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-customization',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-customization.component.html',
  styleUrls: ['./product-customization.component.css']
})
export class ProductCustomizationComponent implements OnInit {
  product: Product | undefined;
  allCaldas: Topping[] = [];
  allExtras: Extra[] = [];
  allAcompanhamentos: Topping[] = [];
  isLoading = true;
  activeTab: 'caldas' | 'extras' | 'acompanhamentos' = 'caldas';
  selectedCalda: Topping | null = null;
  selectedExtras = new Map<number, { extra: Extra, quantity: number }>();
  selectedAcompanhamentos = new Map<number, { topping: Topping, quantity: number }>();


  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService, // Injetar o serviço de carrinho
    private router: Router // Injetar o roteador para navegar
  ) {}

  ngOnInit(): void {
    const idString = this.route.snapshot.paramMap.get('id');
    if (idString) {
      const productId = Number(idString);

      // forkJoin executa todas as chamadas de API em paralelo
      // e nos dá o resultado apenas quando TODAS terminarem.
      forkJoin({
        product: this.productService.getProductById(productId),
        caldas: this.productService.getCaldas(),
        extras: this.productService.getExtras(),
        acompanhamentos: this.productService.getAcompanhamentos()
      }).subscribe(({product, caldas, extras, acompanhamentos}) => {
        this.product = product;
        this.allCaldas = caldas;
        this.allExtras = extras;
        this.allAcompanhamentos = acompanhamentos;
        this.isLoading = false;
      });

    }
  }

  // ... (dentro da classe, após o ngOnInit)

// --- MÉTODOS PARA A LÓGICA DA PÁGINA ---

  changeTab(tab: 'caldas' | 'extras' | 'acompanhamentos'): void {
    this.activeTab = tab;
  }

// --- LÓGICA PARA CALDAS ---

  selectCalda(calda: Topping): void {
    // Se a calda clicada já é a selecionada, desmarque-a. Senão, selecione-a.
    this.selectedCalda = this.selectedCalda?.id === calda.id ? null : calda;
    // Para melhorar a experiência, muda para a próxima aba após a seleção
  }

// --- LÓGICA PARA EXTRAS ---
  addExtra(extra: Extra): void {
    if (this.totalItemsSelecionados >= this.product!.limit || this.getExtraQuantity(extra.id) >= 2) {
      return;
    }
    const existing = this.selectedExtras.get(extra.id);
    if (existing) {
      existing.quantity++;
    } else {
      this.selectedExtras.set(extra.id, {extra: extra, quantity: 1});
    }
  }

  removeExtra(extra: Extra): void {
    const existing = this.selectedExtras.get(extra.id);
    if (existing) {
      existing.quantity--;
      if (existing.quantity === 0) {
        this.selectedExtras.delete(extra.id);
      }
    }
  }

  getExtraQuantity(extraId: number): number {
    return this.selectedExtras.get(extraId)?.quantity || 0;
  }

// --- LÓGICA PARA ACOMPANHAMENTOS (similar aos extras) ---
  addAcompanhamento(topping: Topping): void {
    if (this.totalItemsSelecionados >= this.product!.limit || this.getAcompanhamentoQuantity(topping.id) >= 2) {
      return;
    }
    const existing = this.selectedAcompanhamentos.get(topping.id);
    if (existing) {
      existing.quantity++;
    } else {
      this.selectedAcompanhamentos.set(topping.id, {topping: topping, quantity: 1});
    }
  }

  removeAcompanhamento(topping: Topping): void {
    const existing = this.selectedAcompanhamentos.get(topping.id);
    if (existing) {
      existing.quantity--;
      if (existing.quantity === 0) {
        this.selectedAcompanhamentos.delete(topping.id);
      }
    }
  }

  getAcompanhamentoQuantity(toppingId: number): number {
    return this.selectedAcompanhamentos.get(toppingId)?.quantity || 0;
  }

// --- GETTERS PARA ATUALIZAR A UI DINAMICAMENTE ---
  get totalExtras(): number {
    return Array.from(this.selectedExtras.values()).reduce((sum, item) => sum + item.quantity, 0);
  }

  get totalAcompanhamentos(): number {
    return Array.from(this.selectedAcompanhamentos.values()).reduce((sum, item) => sum + item.quantity, 0);
  }

  get totalPrice(): number {
    if (!this.product) {
      return 0;
    }
    const extrasPrice = Array.from(this.selectedExtras.values())
      .reduce((sum, item) => sum + (item.extra.price * item.quantity), 0);

    return this.product.price + extrasPrice;
  }
  get totalItemsSelecionados(): number {
    return this.totalExtras + this.totalAcompanhamentos;
  }
  confirmarProduto(): void {
    if (!this.product) return;

    // 1. Monta o objeto do item do carrinho com as seleções atuais
    const cartItem: CartItem = {
      product: this.product,
      selectedCalda: this.selectedCalda,
      selectedExtras: this.selectedExtras,
      selectedAcompanhamentos: this.selectedAcompanhamentos,
      totalPrice: this.totalPrice
    };

    // 2. Adiciona o item ao serviço do carrinho
    this.cartService.addToCart(cartItem);

    // 3. Navega para a próxima tela (que vamos criar agora)
    this.router.navigate(['/checkout']);
  }

}
