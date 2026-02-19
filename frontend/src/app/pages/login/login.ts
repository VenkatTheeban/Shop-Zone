import { Component } from '@angular/core';
import { AuthService } from '../../services/auth';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule,RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {

  email = '';
  password = '';
  errorMessage = '';
  returnUrl = '/';

  constructor(
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // Capture return URL if redirected from Add to Cart / Buy Now
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

 loginUser() {
  this.errorMessage = "";

  const body = {
    email: this.email,
    password: this.password
  };

  this.auth.loginApi(body).subscribe({
    next: (res: any) => {
      this.auth.login(res);
      this.router.navigate([this.returnUrl]);
    },
    error: () => {
      this.errorMessage = "Invalid email or password";
    }
  });
}
}




