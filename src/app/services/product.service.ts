import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.interface';
import { Topping, Extra } from '../models/topping.interface';




@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/products`);
  }
  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/products/${id}`);
  }
  getCaldas(): Observable<Topping[]> {
    return this.http.get<Topping[]>(`${this.apiUrl}/caldas`);
  }

  getExtras(): Observable<Extra[]> {
    return this.http.get<Extra[]>(`${this.apiUrl}/extras`);
  }

  getAcompanhamentos(): Observable<Topping[]> {
    return this.http.get<Topping[]>(`${this.apiUrl}/acompanhamentos`);
  }
}
