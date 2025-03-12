import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CartIconComponent } from "../cart-icon/cart-icon.component";
import { SearchComponent } from '../search/search.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CartIconComponent, SearchComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  
}
