import { Routes } from '@angular/router';
import { ProductListComponent } from './pages/product-list/product-list.component';

export const routes: Routes = [
  {
    path: 'products', // O caminho na URL
    component: ProductListComponent // O componente a ser carregado
  },
  {
    path: '', // Rota padrão (URL raiz)
    redirectTo: '/products', // Redireciona para a rota de produtos
    pathMatch: 'full' // Exige que o caminho seja exatamente vazio para redirecionar
  }
];
