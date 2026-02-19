import { Injectable, signal, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  user = signal<any>(null);

  backendURL = "http://localhost:5000/api/auth";

  constructor() {
    if (this.isBrowser) {
      const saved = localStorage.getItem("user");
      if (saved) this.user.set(JSON.parse(saved));
    }
  }

  // --------------------------
  // REGISTER
  // --------------------------
  register(data: any) {
    return this.http.post(`${this.backendURL}/register`, data);
  }

  // --------------------------
  // LOGIN API
  // --------------------------
  loginApi(data: any) {
    return this.http.post(`${this.backendURL}/login`, data);
  }

  // --------------------------
  // SAVE USER (After login)
  // --------------------------
  login(apiResponse: any) {

    const userData = {
      id: apiResponse.user.id,
      username: apiResponse.user.username,
      email: apiResponse.user.email,
      token: apiResponse.token
    };

    this.user.set(userData);

    if (this.isBrowser) {
      localStorage.setItem("user", JSON.stringify(userData));
    }
  }

  logout() {
    this.user.set(null);
    if (this.isBrowser) localStorage.removeItem("user");
  }

  isLoggedIn(): boolean {
    return this.user() !== null;
  }

  getUser() {
    return this.user();
  }

  getToken() {
    const u = this.user();
    return u ? u.token : null;
  }
}
