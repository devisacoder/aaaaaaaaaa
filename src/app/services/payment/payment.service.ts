import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private paymentUrl = 'http://54.175.175.233:8085/api/transactions/payment';

  constructor(private http: HttpClient) {}

processPayment(paymentData: { cardNumber: string; amount: number; currency: string }): Observable<any> {
  const cardBalance = 1212; 

  if (paymentData.amount > cardBalance) {
    return new Observable(observer => {
      observer.error('Fondos insuficientes');
    });
  }

  return this.http.post(this.paymentUrl, paymentData);
}
}
