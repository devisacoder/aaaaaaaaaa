import { Component, OnInit } from '@angular/core';
import { InformationBeforePaymentComponent } from "../information-before-payment/information-before-payment.component";
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/serviceCart/cart.service';

@Component({
  selector: 'app-order-summary',
  imports: [InformationBeforePaymentComponent, CommonModule],
  templateUrl: './order-summary.component.html',
  styleUrl: './order-summary.component.css'
})
export class OrderSummaryComponent implements OnInit{
  cartItems: any[] = [];
  successMessageFromCard = '';
  showPayment = false;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.getCart().subscribe(cart => {
      this.cartItems =cart
    })
  }

  get totalProducts(): number {
    return this.cartItems.reduce((sum, item) => sum + item.quantity, 0);
  }

  get totalPrice(): number {
    return this.cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0)
  }

  togglePayment(): void {
    this.showPayment = !this.showPayment;
  }

  handleCardAdded(message: string): void {
    this.successMessageFromCard = message;
  }
}
