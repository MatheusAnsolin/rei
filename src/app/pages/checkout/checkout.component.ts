import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../models/cart-item.interface';
import { Observable } from 'rxjs';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { Order } from '../../models/order.interface';


@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  cartItems$: Observable<CartItem[]>;
  cartTotal$: Observable<number>;
  cartItems: CartItem[] = [];

  constructor(
    private cartService: CartService,
    private router: Router
  ) {
    this.cartItems$ = this.cartService.cartItems$;
    this.cartTotal$ = this.cartService.cartTotal$;
  }

  ngOnInit(): void {
    // Subscreve para manter os itens atualizados
    this.cartItems$.subscribe(items => {
      this.cartItems = items;
    });
  }

  removeItem(index: number): void {
    if (confirm('Deseja remover este item do carrinho?')) {
      this.cartService.removeFromCart(index);
    }
  }

  confirmarPedido(): void {
    if (this.cartItems.length === 0) {
      alert("Seu carrinho está vazio!");
      return;
    }

    const newOrder: Order = {
      items: this.cartItems,
      grandTotal: this.cartService.getCartTotal(),
      orderDate: new Date(),
      status: 'Confirmado'
    };

    this.cartService.placeOrder(newOrder).subscribe({
      next: (createdOrder) => {
        console.log('Pedido criado com sucesso!', createdOrder);
        this.cartService.clearCart();
        // Navega para a tela de confirmação com o ID do novo pedido
        this.router.navigate(['/order-confirmation', createdOrder.id]);
      },
      error: (err) => {
        console.error('Erro ao criar o pedido', err);
        alert('Houve um erro ao processar seu pedido. Tente novamente.');
      }
    });
  }

  // Métodos auxiliares para o template
  getExtrasArray(extras: Map<number, { extra: any, quantity: number }>): Array<{ extra: any, quantity: number }> {
    return Array.from(extras.values());
  }

  getAcompanhamentosArray(acompanhamentos: Map<number, { topping: any, quantity: number }>): Array<{ topping: any, quantity: number }> {
    return Array.from(acompanhamentos.values());
  }
}
