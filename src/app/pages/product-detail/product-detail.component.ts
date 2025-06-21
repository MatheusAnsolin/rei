import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../models/product.interface';
import { ProductService } from '../../services/product.service';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: Product | undefined;

  constructor(
    private route: ActivatedRoute, // Injeta o serviço de rotas
    private productService: ProductService // Injeta nosso serviço de produtos
  ) {}

  ngOnInit(): void {
    // Pega o 'id' da URL
    const idString = this.route.snapshot.paramMap.get('id');
    if (idString) {
      const productId = Number(idString);
      this.productService.getProductById(productId).subscribe(data => {
        this.product = data;
      });
    }
  }
}
