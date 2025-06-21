import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.interface';
import { RouterModule } from '@angular/router';

// Interface para nossa nova estrutura de dados agrupada
export interface ProductGroup {
  category: string;
  products: Product[];
}

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  // Nossa nova propriedade para armazenar os dados agrupados
  groupedProducts: ProductGroup[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe((data: Product[]) => {
      this.groupProducts(data);
    });
  }

  private groupProducts(products: Product[]): void {
    // Usamos um Map para facilitar o agrupamento
    this.groupedProducts = [];

    const groupMap = new Map<string, Product[]>();

    products.forEach(product => {
      // Se o grupo (categoria) ainda não existe no mapa, crie-o
      if (!groupMap.has(product.category)) {
        groupMap.set(product.category, []);
      }
      // Adicione o produto ao array da sua categoria
      groupMap.get(product.category)?.push(product);
    });

    // Converte o mapa de volta para um array no formato que queremos
    this.groupedProducts = Array.from(groupMap.entries()).map(([category, products]) => ({
      category,
      products
    }));
  }
}
