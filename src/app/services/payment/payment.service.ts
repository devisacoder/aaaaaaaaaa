import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private paymentUrl = 'http://54.175.175.233:8085/api/transactions/payment';

  constructor(private http: HttpClient) {}

  getCardBalance(): number {
    const savedCard = JSON.parse(localStorage.getItem('savedCard') || '{}');
    
    const balance = parseFloat(savedCard.balance || '0');
    
    console.log('Saldo de la tarjeta:', balance); 
    
    return balance;
  }
  
  setCardBalance(amount: number): void {
    localStorage.setItem('cardBalance', amount.toString());
  }

  processPayment(paymentData: { cardNumber: string; amount: number; currency: string }): Observable<any> {
    const cardBalance = this.getCardBalance();

    if (paymentData.amount > cardBalance) {
      return new Observable(observer => {
        observer.error('Fondos insuficientes');
      });
    }

    const updatedBalance = cardBalance - paymentData.amount;
    this.setCardBalance(updatedBalance);

    return this.http.post(this.paymentUrl, paymentData);
  }
}
