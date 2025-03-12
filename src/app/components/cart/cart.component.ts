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
  get totalProducts(): number {
    return this.cartItems.reduce((sum, item) => sum + item.quantity, 0);
  }
  
  get totalPrice(): number {
    return this.cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  }
  
  incrementItem(productId: number) {
    this.cartService.incrementQuantity(productId);
  }
  
  decrementItem(productId: number) {
    this.cartService.decrementQuantity(productId);
  }
  
}
