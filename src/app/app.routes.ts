import { Routes } from '@angular/router';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import {ProductCustomizationComponent} from './pages/product-customization/product-customization.component';

export const routes: Routes = [
  {
    path: 'products',
    component: ProductListComponent
  },
  {
    path: 'product/:id',
    component: ProductDetailComponent
  },
  {
    path: '',
    redirectTo: '/products',
    pathMatch: 'full' // Exige que o caminho seja exatamente vazio para redirecionar
  },
  {
    path: 'customize/:id', // Rota para a personalização
    component: ProductCustomizationComponent
  },
];
