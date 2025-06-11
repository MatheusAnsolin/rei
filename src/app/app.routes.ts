import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Importando os componentes standalone
import { CatalogoComponent } from './pages/catalogo/catalogo.component';
import { LoginComponent } from './pages/login/login.component';
import { DetalheProdutoComponent } from './pages/detalhe-produto/detalhe-produto.component';

export const routes: Routes = [
  { path: '', redirectTo: 'catalogo', pathMatch: 'full' }, // rota padrão
  { path: 'catalogo', component: CatalogoComponent },
  { path: 'login', component: LoginComponent },
  { path: 'detalhes/:id', component: DetalheProdutoComponent }, // id do produto na URL
  { path: '**', redirectTo: 'catalogo' }, // rota fallback
];

