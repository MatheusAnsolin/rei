import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../models/cart-item.interface';
import { Observable } from 'rxjs';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { Order } from '../../models/order.interface';
import { take } from 'rxjs';


@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  cartItems$: Observable<CartItem[]>;
  currentCartItems: CartItem[] = []; // Para guardar o valor atual do carrinho

  constructor(
    private cartService: CartService,
    private router: Router // Injetar o Router
  ) {
    this.cartItems$ = this.cartService.cartItems$;
  }

  ngOnInit(): void {
    // Guarda o valor mais recente do carrinho para usar na hora de confirmar
    this.cartItems$.pipe(take(1)).subscribe(items => {
      this.currentCartItems = items;
    });
  }

  get grandTotal(): number {
    return this.currentCartItems.reduce((sum, item) => sum + item.totalPrice, 0);
  }

  confirmarPedido(): void {
    if (this.currentCartItems.length === 0) {
      alert("Seu carrinho está vazio!");
      return;
    }

    const newOrder: Order = {
      items: this.currentCartItems,
      grandTotal: this.grandTotal,
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
}
