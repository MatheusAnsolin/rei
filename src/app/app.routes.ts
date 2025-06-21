import { Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';

import { ProductListComponent } from './pages/product-list/product-list.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import {ProductCustomizationComponent} from './pages/product-customization/product-customization.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';


export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'products', component: ProductListComponent },
      { path: 'product/:id', component: ProductDetailComponent },
      // Redirecionamento padrão vai para a lista de produtos
      { path: '', redirectTo: '/products', pathMatch: 'full' }
    ]
  },

  // Rota SEM layout principal
  {
    path: 'customize/:id',
    component: ProductCustomizationComponent
  },
  { path: 'checkout', component: CheckoutComponent } // Nova rota

];
