import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent {
  produtos = [
    { id: 1, nome: 'Camiseta Angular', preco: 79.9 },
    { id: 2, nome: 'Caneca Typescript', preco: 49.9 },
    { id: 3, nome: 'Boné Dev', preco: 59.9 }
  ];

  constructor(private router: Router) {}

  verDetalhes(id: number) {
    this.router.navigate(['/detalhes', id]);
  }
}
