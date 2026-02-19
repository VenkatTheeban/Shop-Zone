import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product';
import { CartService } from '../../services/cart';
import { WishlistService } from '../../services/wishlist';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css'
})
export class ProductDetails {

  product: any = null;
  suggestedProducts: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private wishlistService: WishlistService,
    private router: Router
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    // FIRST: Try to load from the already loaded products
    this.product = this.productService.products().find(p => p.id === id);

    if (!this.product) {
      // If user refreshed → product list empty, fetch from backend
      this.productService.getProductById(id).subscribe({
        next: (res: any) => {
          this.product = res;

          // Load suggested
          this.loadSuggested();
        },
        error: () => {
          this.router.navigate(['/']); // invalid ID → go home
        }
      });
    } else {
      this.loadSuggested();
    }
  }

  // --------------------------
  // Load Suggested Products
  // --------------------------
  loadSuggested() {
    this.suggestedProducts = this.productService
      .products()
      .filter(p => p.id !== this.product.id)
      .slice(0, 5);
  }

  // --------------------------
  // Go to another product
  // --------------------------
  goToDetails(id: number) {
    this.router.navigate(['/product', id]);
    window.scrollTo(0, 0);
    this.ngOnInit(); // reload page dynamically
  }

  // --------------------------
  // Add to Cart
  // --------------------------
  addToCart(product: any) {
    this.cartService.addToCart(product);
  }

  // --------------------------
  // Wishlist
  // --------------------------
  addToWishlist(item: any) {
    this.wishlistService.addToWishlist(item);
    this.showToast();
  }

  showToast() {
    const toast = document.getElementById('detail-toast');
    if (!toast) return;
    toast.classList.add('toast-show');
    setTimeout(() => toast.classList.remove('toast-show'), 1800);
  }
}
