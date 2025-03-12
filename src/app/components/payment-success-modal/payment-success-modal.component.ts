import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-payment-success-modal',
  templateUrl: './payment-success-modal.component.html',
  styleUrls: ['./payment-success-modal.component.css']
})
export class PaymentSuccessModalComponent {
  @Input() successMessage: string = '';
  @Input() cardInfo: { cardNumber: string, name: string } = { cardNumber: '', name: '' };
  @Output() close = new EventEmitter<void>();

  closeModal() {
    this.close.emit();
  }
}
