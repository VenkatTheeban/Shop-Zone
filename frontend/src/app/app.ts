import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './components/navbar/navbar';
import { Footer } from './components/footer/footer';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    Navbar,
    Footer
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.css']

})
export class AppComponent {
   constructor(private router: Router) {

    // Scroll to top on every route change
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd  && typeof window !== 'undefined') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
}
}

