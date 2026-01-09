import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration-component',
  imports: [],
  templateUrl: './registration-component.html',
  styleUrl: './registration-component.css',
})
export class RegistrationComponent {
  constructor(private router: Router) { }

  navigateToAuth() {
    this.router.navigate(['auth']);
  }

  navigateToHome() {
    this.router.navigate(['']);
  }
}
