import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  private http = inject(HttpClient);
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  private API_URL = 'http://localhost:5000/api/orders/place';

  private selectedItem: any = null;
  private selectedItems: any[] = [];

  constructor() {
    if (this.isBrowser) {
      const saved = localStorage.getItem('checkoutItem');
      if (saved) this.selectedItem = JSON.parse(saved);
      
      const savedItems = localStorage.getItem('checkoutItems');
      if (savedItems) this.selectedItems = JSON.parse(savedItems);
    }
  }

  setItem(item: any) {
    this.selectedItem = item;
    this.selectedItems = [];
    if (this.isBrowser) {
      localStorage.setItem('checkoutItem', JSON.stringify(item));
      localStorage.removeItem('checkoutItems');
    }
  }

  setItems(items: any[]) {
    this.selectedItems = items;
    this.selectedItem = null;
    if (this.isBrowser) {
      localStorage.setItem('checkoutItems', JSON.stringify(items));
      localStorage.removeItem('checkoutItem');
    }
  }

  getItem() {
    return this.selectedItem;
  }

  getItems() {
    return this.selectedItems;
  }

  hasMultipleItems() {
    return this.selectedItems.length > 0;
  }

  clearItem() {
    this.selectedItem = null;
    this.selectedItems = [];
    if (this.isBrowser) {
      localStorage.removeItem('checkoutItem');
      localStorage.removeItem('checkoutItems');
    }
  }

  // ✔️ FIXED — sends proper body
  placeOrder(data: any) {
    console.log("SENDING ORDER DATA:", data);
    return this.http.post(this.API_URL, data);
  }
}
