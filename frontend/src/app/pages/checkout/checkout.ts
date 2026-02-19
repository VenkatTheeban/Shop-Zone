import { Component, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { CheckoutService } from '../../services/checkout';
import { AuthService } from '../../services/auth';
import { CartService } from '../../services/cart';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './checkout.html',
  styleUrls: ['./checkout.css']
})
export class CheckoutComponent {

  private platformId = inject(PLATFORM_ID);
  isBrowser = isPlatformBrowser(this.platformId);

  item: any = null;          // Buy Now product
  items: any[] = [];         // Cart items
  quantity: number = 1;      // Selected quantity
  isMultipleItems = false;   // Flag for multiple items

  constructor(
    private checkoutService: CheckoutService,
    private auth: AuthService,
    private router: Router,
    private cartService: CartService
  ) {}

  ngOnInit() {

  
    if (!this.isBrowser) return;

    // ❗ User must be logged in
    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/login'], {
        queryParams: { returnUrl: '/checkout' }
      });
      return;
    }

    // Check for single item first (Buy Now has priority)
    this.item = this.checkoutService.getItem();
    
    if (this.item) {
      // Single item from "Buy Now"
      this.isMultipleItems = false;
    } else {
      // Check for multiple items (from cart)
      this.items = this.checkoutService.getItems();
      this.isMultipleItems = this.checkoutService.hasMultipleItems();
      
      if (!this.isMultipleItems || this.items.length === 0) {
        this.router.navigate(['/']);
      }
    }
  }

  // -------------------------
  // PLACE ORDER
  // -------------------------
 placeOrder() {

  if (!this.isMultipleItems && !this.item) {
    this.showToast("No item selected!", "error");
    return;
  }

  if (this.isMultipleItems && this.items.length === 0) {
    this.showToast("No items in cart!", "error");
    return;
  }

  const logged = this.auth.getUser();

  if (!logged || !logged.id) {
    this.showToast("Login required!", "error");
    return;
  }

  if (this.isMultipleItems) {
    const orderBody = {
      userId: logged.id,
      items: this.items.map(item => ({
        productId: item.id,
        quantity: 1,
        price: item.price || item.amount || 0
      })),
      totalAmount: this.getTotalAmount()
    };

    this.checkoutService.placeOrder(orderBody).subscribe({
      next: () => {
        this.showToast("All orders placed successfully!", "success");
        this.cartService.clearCart();
        this.checkoutService.clearItem();
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 1500);
      },
      error: (err) => {
        console.error(err);
        this.showToast("Failed to place orders!", "error");
      }
    });
  } else {
    // Single item order
    const orderBody = {
      userId: logged.id,
      productId: this.item.id,
      quantity: this.quantity,
      totalAmount: this.item.price * this.quantity
    };

    this.checkoutService.placeOrder(orderBody).subscribe({
      next: () => {
        this.showToast("Order placed successfully!", "success");
        this.cartService.clearCart();
        this.checkoutService.clearItem();
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 1500);
      },
      error: (err) => {
        console.error(err);
        this.showToast("Failed to place order!", "error");
      }
    });
  }

}

getTotalAmount() {
  return this.items.reduce((total, item) => total + (item.price || item.amount || 0), 0);
}

showToast(message: string, type: 'success' | 'error') {
  const toast = document.getElementById('order-toast');
  if (!toast) return;

  toast.innerText = message;

  toast.classList.remove('toast-success', 'toast-error');
  toast.classList.add(type === 'success' ? 'toast-success' : 'toast-error');

  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 2000);
}



}





