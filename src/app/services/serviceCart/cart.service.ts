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
  cartCount$ = this.cartCountSubject.asObservable(); 

  addToCart(product: any) {
    const existingItem = this.cart.find(item => item.product.id === product.id);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      this.cart.push({ product: product, quantity: 1 });
    }
    this.cartSubject.next([...this.cart]);
    this.cartCountSubject.next(
      this.cart.reduce((sum, item) => sum + item.quantity, 0)
    );
  }

  getCart() {
    return this.cart$;
  }

  clearCart() {
    this.cart = [];
    this.cartSubject.next(this.cart);
    this.cartCountSubject.next(0); 
  }

  removeProduct(productId: number) {
    this.cart = this.cart.filter(item => item.product.id !== productId);
    this.cartSubject.next(this.cart);
    this.cartCountSubject.next(this.cart.length);
  }

  incrementQuantity(productId: number) {
    const item = this.cart.find(item => item.product.id === productId);
    if (item) {
      item.quantity++;
      this._updateCart();
    }
  }
  
  decrementQuantity(productId: number) {
    const item = this.cart.find(item => item.product.id === productId);
    if (item) {
      item.quantity--;
      if (item.quantity <= 0) {
        this.removeProduct(productId);
      } else {
        this._updateCart();
      }
    }
  }
  
  getProductQuantity(productId: number): number {
    const item = this.cart.find(item => item.product.id === productId);
    return item ? item.quantity : 0;
  }
  
  private _updateCart() {
    this.cartSubject.next([...this.cart]);
    this.cartCountSubject.next(
      this.cart.reduce((sum, item) => sum + item.quantity, 0)
    );
  }
  
  resetCart() {
    this.cart = [];
    this.cartSubject.next(this.cart);
    this.cartCountSubject.next(0);
  }
}
