import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detalhe-produto',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detalhe-produto.component.html',
  styleUrls: ['./detalhe-produto.component.css']
})
export class DetalheProdutoComponent implements OnInit {
  produtoId: number | null = null;

  ngOnInit(): void {
    const id = history.state?.id || null;
    this.produtoId = Number(id);
  }
}
