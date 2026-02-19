import { Routes } from '@angular/router';

import { Home } from './pages/home/home';
import { LoginComponent } from './pages/login/login';
import { SignupComponent } from './pages/signup/signup';
import { CheckoutComponent } from './pages/checkout/checkout';
import { CartComponent } from './pages/cart/cart';
import { Wishlist } from './pages/wishlist/wishlist';
import { ProductDetails } from './pages/product-details/product-details';

import { AuthGuard } from './auth-guard';

export const routes: Routes = [

  { path: '', redirectTo: 'home', pathMatch: 'full' },

  { path: 'home', component: Home },

  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },

  { path: 'product/:id', component: ProductDetails },

  { path: 'wishlist', component: Wishlist },

  { path: 'cart', component: CartComponent, canActivate: [AuthGuard] },

  { path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard] },

  { path: '**', redirectTo: 'home' } // wild card
];
