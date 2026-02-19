import { Component } from '@angular/core';
import { AuthService } from '../../services/auth';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './signup.html',
  styleUrls: ['./signup.css']
})
export class SignupComponent {

  username = '';
  email = '';
  password = '';

  message = '';
  errorMessage = '';
  loading = false;

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  registerUser() {
    this.errorMessage = '';
    this.message = '';

    // 🔥 VALIDATION
    if (!this.username || !this.email || !this.password) {
      this.errorMessage = "All fields are required.";
      return;
    }

    // Prevent double clicks
    this.loading = true;

    const body = {
      username: this.username,
      email: this.email,
      password: this.password
    };

    this.auth.register(body).subscribe({
      next: (res: any) => {
        this.loading = false;
        this.message = "Registration successful! Redirecting...";

        // Redirect after 1 second
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1000);
      },

      error: (err) => {
        this.loading = false;

        // Extract server message if available
        this.errorMessage = err.error?.message
          ? err.error.message
          : "Registration failed! Email may already exist.";
      }
    });
  }
}
