import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/serviceProduct/product.service';

@Component({
  selector: 'app-slider',
  standalone: true,
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {
  images: string[] = [];
  currentIndex = 1;
  intervalId: any;
  isTransitioning = false;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.fetchProducts().subscribe(() => {    
      this.productService.getSliderProducts(10).subscribe(products => {
    
        const originalImages = products.map(p => p.images[0]);
        this.images = [originalImages[originalImages.length - 1], ...originalImages, originalImages[0]];
        
        this.startAutoSlide();
      });
    });
    
  }

  startAutoSlide() {
    this.intervalId = setInterval(() => {
      this.nextSlide();
    }, 3000); 
  }

  prevSlide() {
    if (this.isTransitioning) return;
  
    this.isTransitioning = true;
    this.currentIndex--;
  
    setTimeout(() => {
      if (this.currentIndex === 0) {
        this.currentIndex = this.images.length - 2; 
      }
      this.isTransitioning = false;
    }, 500);
  }
  

  nextSlide() {
    if (this.isTransitioning) return;
    
    this.isTransitioning = true;
    this.currentIndex++;

    setTimeout(() => {
      this.isTransitioning = false;

      if (this.currentIndex === this.images.length - 1) {
        this.currentIndex = 1;
      }
    }, 500);
  }
  
  goToSlide(index: number) {
    this.currentIndex = index + 1; 
  }


  ngOnDestroy() {
    clearInterval(this.intervalId);
  }

  updateSlider() {
    const sliderWrapper = document.querySelector('.slider-wrapper') as HTMLElement;
    sliderWrapper.style.transform = `translateX(-${this.currentIndex * 100}%)`;

    const indicators = document.querySelectorAll('.slider-indicators button');
    indicators.forEach((dot, i) => {
      dot.classList.toggle('active', i === this.currentIndex);
    });
  }
}
