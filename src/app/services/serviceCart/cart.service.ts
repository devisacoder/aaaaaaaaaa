import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: any[] = [];
  private cartSubject = new BehaviorSubject<any[]>([]);
  private cartCountSubject = new BehaviorSubject<number>(0);

  cart$ = this.cartSubject.asObservable();
  cartCount$ = this.cartCountSubject.asObservable(); // 🔹 Nuevo observable

  addToCart(product: any) {
    this.cart.push(product);
    this.cartSubject.next(this.cart);
    this.cartCountSubject.next(this.cart.length); // 🔹 Actualiza el contador
  }

  getCart() {
    return this.cart$;
  }

  clearCart() {
    this.cart = [];
    this.cartSubject.next(this.cart);
    this.cartCountSubject.next(0); // 🔹 Resetea el contador
  }

  removeProduct(productId: number) {
    this.cart = this.cart.filter(item => item.id !== productId);
    this.cartSubject.next(this.cart);
    this.cartCountSubject.next(this.cart.length); // 🔹 Actualiza el contador
  }
}
