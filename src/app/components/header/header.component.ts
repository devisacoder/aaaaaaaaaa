import { Component } from '@angular/core';
import { SearchComponent } from "../search/search.component";
import { RouterModule } from '@angular/router';
import { CartIconComponent } from "../cart-icon/cart-icon.component";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [SearchComponent, RouterModule, CartIconComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  
}
