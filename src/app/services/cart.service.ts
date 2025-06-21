import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartItem } from '../models/cart-item.interface';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  // BehaviorSubject guarda o valor atual do carrinho e emite para novos inscritos.
  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);

  // Expomos o carrinho como um Observable, para que ninguém de fora possa modificá-lo diretamente.
  cartItems$: Observable<CartItem[]> = this.cartItemsSubject.asObservable();

  constructor() { }

  addToCart(item: CartItem): void {
    // Pega a lista atual de itens
    const currentItems = this.cartItemsSubject.getValue();
    // Adiciona o novo item
    const updatedItems = [...currentItems, item];
    // Emite a nova lista para todos os componentes que estão "ouvindo"
    this.cartItemsSubject.next(updatedItems);
  }

  getCartItems(): CartItem[] {
    return this.cartItemsSubject.getValue();
  }
}
