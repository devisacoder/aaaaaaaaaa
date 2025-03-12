import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: any[] = this.loadCartFromSession();
  private cartSubject = new BehaviorSubject<any[]>(this.cart);
  private cartCountSubject = new BehaviorSubject<number>(this.cart.reduce((sum, item) => sum + item.quantity, 0));

  cart$ = this.cartSubject.asObservable();
  cartCount$ = this.cartCountSubject.asObservable(); 

  addToCart(product: any) {
    const existingItem = this.cart.find(item => item.product.id === product.id);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      this.cart.push({ product: product, quantity: 1 });
    }
    this.updateCart();
  }

  getCart() {
    return this.cart$;
  }

  clearCart() {
    this.cart = [];
    this.updateCart();
  }

  removeProduct(productId: number) {
    this.cart = this.cart.filter(item => item.product.id !== productId);
    this.updateCart();
  }

  incrementQuantity(productId: number) {
    const item = this.cart.find(item => item.product.id === productId);
    if (item) {
      item.quantity++;
      this.updateCart();
    }
  }
  
  decrementQuantity(productId: number) {
    const item = this.cart.find(item => item.product.id === productId);
    if (item) {
      item.quantity--;
      if (item.quantity <= 0) {
        this.removeProduct(productId);
      } else {
        this.updateCart();
      }
    }
  }
  
  getProductQuantity(productId: number): number {
    const item = this.cart.find(item => item.product.id === productId);
    return item ? item.quantity : 0;
  }
  
  private updateCart() {
    this.cartSubject.next([...this.cart]);
    this.cartCountSubject.next(this.cart.reduce((sum, item) => sum + item.quantity, 0));
    this.saveCartToSession();
  }
  
  private saveCartToSession() {
    sessionStorage.setItem('cart', JSON.stringify(this.cart));
  }

  private loadCartFromSession() {
    const savedCart = sessionStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  }
}
