import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-recharger',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './recharger.component.html',
  styleUrl: './recharger.component.css'
})
export class RechargerComponent {
  rechargeForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.rechargeForm = this.fb.group({
      holderName: ['', Validators.required],
      cardNumber: ['', [Validators.required, Validators.pattern('^[0-9]{16}$')]],
      cardType: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.rechargeForm.valid) {
      alert('Recarga realizada con éxito');
    }
  }
}
