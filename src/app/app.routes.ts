import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { 
    path: 'cart', 
    loadComponent: () => import('./components/cart/cart.component').then(m => m.CartComponent) 
  },
  {
    path: 'products/:id',
    loadComponent: () => import('./components/card-product/card-product.component').then(m => m.CardProductComponent)
  }
];
