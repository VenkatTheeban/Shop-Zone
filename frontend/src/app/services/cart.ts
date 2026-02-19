import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private items = new BehaviorSubject<any[]>([]);
  cartItems$ = this.items.asObservable();

  addToCart(product: any) {
    const currentItems = this.items.value;
    this.items.next([...currentItems, product]);
  }

  removeFromCart(index: number) {
    const updated = this.items.value.filter((_, i) => i !== index);
    this.items.next(updated);
  }

  getItems() {
    return this.items.value;
  }

  clearCart() {
    this.items.next([]);
  }
}



