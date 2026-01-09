import { Component } from '@angular/core';
import { HeaderComponent } from "../../includes/header-component/header-component";
import { FooterComponent } from "../../includes/footer-component/footer-component";

@Component({
  selector: 'app-home-component',
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './home-component.html',
  styleUrl: './home-component.css',
})
export class HomeComponent {

}
