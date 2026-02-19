import { Component, OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart';
import { CheckoutService } from '../../services/checkout';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class CartComponent implements OnDestroy {

  cartList: any[] = [];
  private sub: Subscription | null = null;

  constructor(
    private cartService: CartService,
    private checkoutService: CheckoutService,
    private router: Router,
    private auth: AuthService
  ) {
    this.sub = this.cartService.cartItems$.subscribe(items => {
      this.cartList = items || [];
    });
  }

  // Remove item by index (CartService handles persistence)
  removeItem(i: number) {
    this.cartService.removeFromCart(i);
  }

  // Buy now: require login, save item and navigate to checkout
  buyNow(item: any) {
    if (!this.auth.isLoggedIn()) {
      // redirect to login, then back to checkout after login
      this.router.navigate(['/login'], { queryParams: { returnUrl: '/checkout' }});
      return;
    }

    // normalize item shape (backends sometimes send title instead of name)
    const normalized = {
      ...item,
      name: item.name || item.title
    };

    this.checkoutService.setItem(normalized);
    this.router.navigate(['/checkout']);
  }

  // optional helper for displaying price (ensures numeric)
  getPrice(item: any) {
    const p = item.price ?? item.amount ?? 0;
    return Number(p);
  }

  // subtotal (sum of price * qty). If you store qty in cart items later, update accordingly.
  getSubtotal() {
    return this.cartList.reduce((sum, it) => sum + (this.getPrice(it) || 0), 0);
  }

  // Proceed to checkout with all cart items
  proceedToCheckout() {
    console.log('proceedToCheckout called');
    console.log('isLoggedIn:', this.auth.isLoggedIn());
    console.log('cartList length:', this.cartList.length);
    
    if (!this.auth.isLoggedIn()) {
      console.log('Not logged in, redirecting to login');
      this.router.navigate(['/login'], { queryParams: { returnUrl: '/checkout' }});
      return;
    }

    if (this.cartList.length === 0) {
      console.log('Cart is empty');
      return;
    }

    console.log('Setting items and navigating to checkout');
    // Set all cart items for checkout
    this.checkoutService.setItems(this.cartList);
    this.router.navigate(['/checkout']);
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }
}
