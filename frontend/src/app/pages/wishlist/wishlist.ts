import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { WishlistService } from '../../services/wishlist';
import { CartService } from '../../services/cart';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './wishlist.html',
  styleUrl: './wishlist.css',
})
export class Wishlist implements OnInit {

  wishlistList: any;

  constructor(
    private wishlistService: WishlistService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.wishlistList = this.wishlistService.wishlistList;  // Initialize here
  }

  removeItem(i: number) {
    this.wishlistService.removeItem(i);
  }

  addToCart(item: any, i: number) {
    this.cartService.addToCart(item);
    this.wishlistService.removeItem(i);
    this.showToast("Moved to cart");
  }

  showToast(msg: string) {
    const toast = document.getElementById('toast');
    if (toast) {
      toast.innerText = msg;
      toast.classList.add('toast-show');
      setTimeout(() => {
        toast.classList.remove('toast-show');
      }, 1800);
    }
  }
}



