import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/serviceProduct/product.service';
import { CartService } from '../../services/serviceCart/cart.service';

@Component({
  selector: 'app-products',
  standalone: true,
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: any[] = [];

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.productService.fetchProducts().subscribe(products => {
      this.products = products;
    });
  }

  addToCart(product: any) {
    this.cartService.addToCart(product);
  }

  trackById(index: number, product: any): number {
    return product.id; 
  }
}
