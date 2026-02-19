import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  wishlistList = signal<any[]>([]);

  addToWishlist(item: any) {
    const exists = this.wishlistList().some(x => x.id === item.id);

    if (!exists) {
      this.wishlistList.update(list => [...list, item]);
    }
  }

  removeItem(index: number) {
    this.wishlistList.update(list => list.filter((_, i) => i !== index));
  }
}
