import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/serviceProduct/product.service';
import { CartService } from '../../services/serviceCart/cart.service';
import { SearchService } from '../../services/serviceSearch/search.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true,
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  imports: [CommonModule, FormsModule, RouterModule]

})
export class ProductsComponent implements OnInit {
  products: any[] = [];
  filteredProducts: any[] = [];
  productCounts: { [productId: number]: number } = {};

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private searchService: SearchService
  ) {}

  ngOnInit() {
    this.productService.fetchProducts().subscribe(products => {
      this.products = products;
      this.filteredProducts = products;
    });

    this.searchService.searchTerm$.subscribe(term => {
      const lowerTerm = term.toLowerCase().trim();
      if (!lowerTerm) {
        this.filteredProducts = this.products;
      } else {
        this.filteredProducts = this.products.filter(product =>
          product.title.toLowerCase().includes(lowerTerm)
        );
      }
    });

    this.cartService.getCart().subscribe(cart => {
      this.productCounts = {};
      cart.forEach(item => {
        this.productCounts[item.product.id] = item.quantity;
      });
    });
  }
  
  addToCart(product: any) {
    this.cartService.addToCart(product);
  }
  
  getProductCount(id: number): number {
    return this.productCounts[id] || 0;
  }

  trackById(index: number, product: any): number {
    return product.id;
  }
  handleAddToCart(event: MouseEvent, product: any) {
    event.preventDefault();
    event.stopPropagation();
    this.cartService.addToCart(product);
  }
  
}
