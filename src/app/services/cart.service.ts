import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartItem } from '../models/cart-item.interface';
import { Order } from '../models/order.interface';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = 'http://localhost:3000';

  // BehaviorSubject guarda o valor atual do carrinho e emite para novos inscritos.
  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);

  // Expomos o carrinho como um Observable, para que ninguém de fora possa modificá-lo diretamente.
  cartItems$: Observable<CartItem[]> = this.cartItemsSubject.asObservable();

  constructor(private http: HttpClient) { }

  addToCart(item: CartItem): void {
    // Pega a lista atual de itens
    const currentItems = this.cartItemsSubject.getValue();
    // Adiciona o novo item
    const updatedItems = [...currentItems, item];
    // Emite a nova lista para todos os componentes que estão "ouvindo"
    this.cartItemsSubject.next(updatedItems);
  }
  placeOrder(order: Order): Observable<Order> {
    // Faz um POST para a nossa coleção de pedidos
    return this.http.post<Order>(`${this.apiUrl}/orders`, order);
  }

  clearCart(): void {
    // Esvazia o carrinho emitindo um array vazio
    this.cartItemsSubject.next([]);
  }

  getCartItems(): CartItem[] {
    return this.cartItemsSubject.getValue();
  }
}
