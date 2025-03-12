import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-information-before-payment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './information-before-payment.component.html',
  styleUrl: './information-before-payment.component.css'
})
export class InformationBeforePaymentComponent {
  name = '';
  cardNumber = '';
  expiry = '';
  cvv = '';
  errorMessage = '';
  successMessage = '';

  @Output() cardAdded = new EventEmitter<string>();
  @Output() closeModal = new EventEmitter<void>(); 

  formatCardNumber(event: Event): void {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/\D/g, '');
    value = value.substring(0, 16);
    input.value = value.replace(/(.{4})/g, '$1 ').trim();
    this.cardNumber = input.value;
  }

  formatExpiryDate(event: Event): void {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/\D/g, '');
    value = value.substring(0, 6);
  
    if (value.length > 4) {
      value = value.substring(0, 4) + '-' + value.substring(4);
    }
  
    input.value = value;
    this.expiry = input.value;
  }

  validateCVV(event: Event): void {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/\D/g, '').substring(0, 4);
    this.cvv = input.value;
  }

  private maskName(fullName: string): string {
    const [first, last] = fullName.split(' ');
    const maskedFirst = first ? first[0] + '*'.repeat(first.length - 1) : '';
    const maskedLast = last ? last[0] + '*'.repeat(last.length - 1) : '';
    return `${maskedFirst} ${maskedLast}`;
  }

  onFinish(): void {
    const isCardNumberValid = this.cardNumber.replace(/\s/g, '').length === 16;
const isExpiryValid = /^\d{4}-\d{2}$/.test(this.expiry);
    const isCVVValid = this.cvv.length >= 3 && this.cvv.length <= 4;

    if (!this.name || !isCardNumberValid || !isExpiryValid || !isCVVValid) {
      this.errorMessage = 'Por favor, completa todos los campos correctamente.';
      return;
    }
  
    this.errorMessage = '';
  
    const paymentData = {
      name: this.name,
      cardNumber: this.cardNumber,
      expiry: this.expiry,
      cvv: this.cvv,
    };
  
    localStorage.setItem('paymentData', JSON.stringify(paymentData));
  
    const firstFourDigits = this.cardNumber.slice(0, 6);
    const maskedCard = `${firstFourDigits} **** **** ****`;
    const maskedName = this.maskName(this.name);
    const successMessage = `Tarjeta agregada: ${maskedCard} - ${maskedName}`;
  
    this.cardAdded.emit(successMessage);
    this.closeModal.emit() 
  }
}
