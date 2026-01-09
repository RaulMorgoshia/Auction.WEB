import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-header-component',
  imports: [CommonModule],
  templateUrl: './header-component.html',
  styleUrl: './header-component.css',
})
export class HeaderComponent {
  constructor(private router: Router) { }

  auth = inject(AuthService);

  logout() {
    this.auth.logout();
  }

  navigateToHome() {
    this.router.navigate(['']);
  }

  navigateToAuth() {
    this.router.navigate(['auth']);
  }
}
