import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private http = inject(HttpClient);
  backendURL = "http://localhost:5000/api/products";

  products = signal<any[]>([]);

  constructor() {
    this.loadProducts();
  }

  loadProducts() {
    this.http.get<any[]>(`${this.backendURL}/assignAll`)
      .subscribe({
        next: (res: any) => {
          this.products.set(res);
        },
        error: (err) => console.error("Product API Error:", err)
      });
  }

  getProductById(id: number) {
    return this.http.get(`${this.backendURL}/findOne?id=${id}`);
  }
}
