import {
  Component,
  HostListener,
  OnInit,
  computed,
  inject,
  PLATFORM_ID
} from '@angular/core';

import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink, Router } from '@angular/router';

import { SearchService } from '../../services/search';
import { CartService } from '../../services/cart';
import { WishlistService } from '../../services/wishlist';
import { ProductService } from '../../services/product';
import { AuthService } from '../../services/auth';
import { CheckoutService } from '../../services/checkout';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {

  private platformId = inject(PLATFORM_ID);
  isBrowser = isPlatformBrowser(this.platformId);

  isVisible = false;

  products: any;
  filteredProducts: any;

  constructor(
    private searchService: SearchService,
    private cartService: CartService,
    private productService: ProductService,
    private wishlistService: WishlistService,
    private router: Router,
    private auth: AuthService,
    private checkoutService: CheckoutService
  ) {}

  ngOnInit() {
    if (!this.isBrowser) return;

    this.products = this.productService.products;

    this.filteredProducts = computed(() => {
      const search = this.searchService.searchText().toLowerCase();
      return this.products().filter((p: any) =>
        p.name.toLowerCase().includes(search)
      );
    });
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (!this.isBrowser) return;
    this.isVisible = window.scrollY > 400;
  }

  scrollToTop() {
    if (!this.isBrowser) return;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  showToast(msg: string) {
    const toast = document.getElementById('toast');
    if (!toast) return;

    toast.innerText = msg;
    toast.classList.add('toast-show');
    setTimeout(() => toast.classList.remove('toast-show'), 1800);
  }

  openProduct(id: number) {
    this.router.navigate(['/product', id]);
  }

  addToCart(item: any) {
    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }
    this.cartService.addToCart(item);
    this.showToast("Added to cart");
  }

  addToWishlist(item: any) {
    this.wishlistService.addToWishlist(item);
    this.showToast("Added to wishlist");
  }

  buyNow(item: any) {
    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }
    this.checkoutService.setItem(item);
    this.router.navigate(['/checkout']);
  }
}
