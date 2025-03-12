import { Component, inject } from '@angular/core';
import { ProductService } from '../../services/serviceProduct/product.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/serviceCart/cart.service';

@Component({
  selector: 'app-card-product',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-product.component.html',
  styleUrl: './card-product.component.css'
})
export class CardProductComponent {
  private route = inject(ActivatedRoute);
  private productService = inject(ProductService);
  private cartService = inject(CartService);

  productId!: number;
  product: any;
  productCount: number = 0;

  ngOnInit(): void {
    this.productId = Number(this.route.snapshot.paramMap.get('id'));

    this.productService.fetchProducts().subscribe(products => {
      this.product = products.find((p: any) => p.id === this.productId);
      this.updateProductCount();
    });

    this.cartService.getCart().subscribe(() => {
      this.updateProductCount();
    });
  }

  addToCart() {
    if (this.product) {
      this.cartService.addToCart(this.product);
      this.updateProductCount();
    }
  }

  updateProductCount() {
    if (this.product) {
      this.productCount = this.cartService.getProductQuantity(this.product.id);
    }
  }
}
