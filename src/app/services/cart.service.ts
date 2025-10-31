import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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

  // Observable para o contador de itens no carrinho
  cartItemCount$: Observable<number> = this.cartItems$.pipe(
    map(items => items.length)
  );

  // Observable para o total do carrinho
  cartTotal$: Observable<number> = this.cartItems$.pipe(
    map(items => items.reduce((sum, item) => sum + item.totalPrice, 0))
  );

  constructor(private http: HttpClient) {
    // Carrega o carrinho do localStorage ao inicializar
    this.loadCartFromStorage();
  }

  addToCart(item: CartItem): void {
    // Pega a lista atual de itens
    const currentItems = this.cartItemsSubject.getValue();
    // Adiciona o novo item
    const updatedItems = [...currentItems, item];
    // Emite a nova lista para todos os componentes que estão "ouvindo"
    this.cartItemsSubject.next(updatedItems);
    // Salva no localStorage
    this.saveCartToStorage(updatedItems);
  }

  removeFromCart(index: number): void {
    const currentItems = this.cartItemsSubject.getValue();
    const updatedItems = currentItems.filter((_, i) => i !== index);
    this.cartItemsSubject.next(updatedItems);
    this.saveCartToStorage(updatedItems);
  }

  placeOrder(order: Order): Observable<Order> {
    // Faz um POST para a nossa coleção de pedidos
    return this.http.post<Order>(`${this.apiUrl}/orders`, order);
  }

  clearCart(): void {
    // Esvazia o carrinho emitindo um array vazio
    this.cartItemsSubject.next([]);
    this.saveCartToStorage([]);
  }

  getCartItems(): CartItem[] {
    return this.cartItemsSubject.getValue();
  }

  getCartItemCount(): number {
    return this.cartItemsSubject.getValue().length;
  }

  getCartTotal(): number {
    return this.cartItemsSubject.getValue().reduce((sum, item) => sum + item.totalPrice, 0);
  }

  // Métodos para persistência no localStorage
  private saveCartToStorage(items: CartItem[]): void {
    try {
      // Convertemos os Maps para arrays para serialização
      const itemsToSave = items.map(item => ({
        ...item,
        selectedExtras: Array.from(item.selectedExtras.entries()),
        selectedAcompanhamentos: Array.from(item.selectedAcompanhamentos.entries())
      }));
      localStorage.setItem('cart', JSON.stringify(itemsToSave));
    } catch (error) {
      console.error('Erro ao salvar carrinho no localStorage', error);
    }
  }

  private loadCartFromStorage(): void {
    try {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        const items = JSON.parse(savedCart);
        // Reconvertemos os arrays de volta para Maps
        const restoredItems = items.map((item: any) => ({
          ...item,
          selectedExtras: new Map(item.selectedExtras),
          selectedAcompanhamentos: new Map(item.selectedAcompanhamentos)
        }));
        this.cartItemsSubject.next(restoredItems);
      }
    } catch (error) {
      console.error('Erro ao carregar carrinho do localStorage', error);
    }
  }
}
