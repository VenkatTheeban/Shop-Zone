import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

import { SearchService } from '../../services/search';
import { CartService } from '../../services/cart';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {

  cartCount = 0;
  dropdownOpen = false;

  constructor(
    private searchService: SearchService,
    private cartService: CartService,
    private auth: AuthService,
    private router: Router
  ) {

    // CART COUNT LISTEN
    this.cartService.cartItems$.subscribe(items => {
      this.cartCount = items.length;
    });
  }

  // -----------------------------
  // SEARCH
  // -----------------------------
  onSearchInput(event: any) {
    this.searchService.setSearch(event.target.value);
  }

  onSearch(event: Event) {
    event.preventDefault();
  }

  // -----------------------------
  // LOGIN STATUS
  // -----------------------------
  isLoggedIn() {
    return this.auth.isLoggedIn();
  }

  getUser() {
    return this.auth.getUser();
  }

  // -----------------------------
  // DROPDOWN
  // -----------------------------
  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  // -----------------------------
  // LOGOUT
  // -----------------------------
  logout() {
    this.dropdownOpen = false;
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
