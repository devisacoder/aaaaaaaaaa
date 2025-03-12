import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/serviceCart/cart.service';
import { PaymentService } from '../../services/payment/payment.service';
import { PaymentSuccessModalComponent } from '../payment-success-modal/payment-success-modal.component';
import { InformationBeforePaymentComponent } from "../information-before-payment/information-before-payment.component";
import { InsufficientFundsModalComponent } from '../insufficient-funds-modal/insufficient-funds-modal.component';

@Component({
  selector: 'app-order-summary',
  imports: [PaymentSuccessModalComponent, CommonModule, InformationBeforePaymentComponent, InsufficientFundsModalComponent], 
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.css'],
})
export class OrderSummaryComponent implements OnInit {
  cartItems: any[] = [];
  cardBalance: number = 0;
  showSuccessModal: boolean = false;
  showInsufficientFundsModal: boolean = false;
  showPayment = false;
  successMessageFromCard: string = '';
  showFailureModal: boolean = false;
  cardInfo = { cardNumber: '', name: '' };

  constructor(
    private cartService: CartService,
    private paymentService: PaymentService
  ) {}

  ngOnInit(): void {
    this.cartService.getCart().subscribe(cart => {
      this.cartItems = cart;
    });
  }

  get totalProducts(): number {
    return this.cartItems.reduce((sum, item) => sum + item.quantity, 0);
  }

  get totalPrice(): number {
    return this.cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  }

  togglePayment(): void {
    this.showPayment = !this.showPayment;
  }

  handleCardAdded(message: string): void {
    this.successMessageFromCard = message;
  }
  async onCheckout(): Promise<void> {
    try {
      const savedCard = JSON.parse(localStorage.getItem('savedCard') || '{}');
      
      if (!savedCard.cardNumber) {
        this.successMessageFromCard = 'No hay tarjeta guardada. Por favor, agrega una tarjeta primero.';
        return;
      }
  
      const totalAmount = this.totalPrice;
      const savedCardInfo = savedCard.cardNumber.replace(/\s/g, '');
      
      const cardBalance = this.paymentService.getCardBalance();
      
      if (cardBalance <= 0) {
        this.successMessageFromCard = 'Fondos insuficientes. No se puede completar la compra.';
        this.showInsufficientFundsModal = true;
        return;  
      }
  
      if (cardBalance < totalAmount) {
        this.successMessageFromCard = 'Fondos insuficientes. No se puede completar la compra.';
        this.showInsufficientFundsModal = true;
        return;
      }
  
      const paymentData = {
        cardNumber: savedCardInfo,
        amount: totalAmount,
        currency: 'USD',
      };
  
      const response = await this.paymentService.processPayment(paymentData).toPromise();
      
      if (response.status === 'REJECTED') {
        if (response.amount > this.cardBalance) {
          this.showInsufficientFundsModal = true;
        }
      } else {
        this.successMessageFromCard = 'Pago exitoso!';
        this.cardInfo = {
          cardNumber: savedCardInfo.slice(0, 4) + ' **** **** ****',
          name: savedCard.name,
        };
        this.showSuccessModal = true;
        localStorage.removeItem('savedCard');
        this.cartService.clearCart();
      }
    } catch (error) {
      console.error('Error en el proceso de pago:', error);
      this.successMessageFromCard = 'Hubo un error al procesar el pago. Intenta de nuevo.';
      this.showFailureModal = true;
    }
  }
  
    
  closeModal(): void {
    this.showSuccessModal = false;
    this.showInsufficientFundsModal = false;
  }
}
