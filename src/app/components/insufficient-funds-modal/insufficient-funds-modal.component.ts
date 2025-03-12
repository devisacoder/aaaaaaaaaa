import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-insufficient-funds-modal',
  templateUrl: './insufficient-funds-modal.component.html',
  styleUrls: ['./insufficient-funds-modal.component.css']
})
export class InsufficientFundsModalComponent {
  @Output() closeModal = new EventEmitter<void>();

  close() {
    this.closeModal.emit();
  }
}
