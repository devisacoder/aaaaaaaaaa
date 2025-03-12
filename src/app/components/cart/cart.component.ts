import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/serviceCart/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartService.getCart().subscribe(cart => {
      this.cartItems = cart;
    });
  }
  
    removeFromCart(productId: number) {
    this.cartService.removeProduct(productId);
    this.cartItems = this.cartItems.filter(item => item.id !== productId);
  }

  clearCart() {
    this.cartService.clearCart();
  }
}
