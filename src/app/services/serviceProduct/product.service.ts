import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, map, Observable, switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'https://api.escuelajs.co/api/v1/products';
  private productsSubject = new BehaviorSubject<any[]>([]);
  products$ = this.productsSubject.asObservable()

  constructor(private http: HttpClient) {}

  fetchProducts(): Observable<any> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      tap(products => {
        this.productsSubject.next(products); 
      })
    );
  }
  
  getProducts(): Observable<any[]> {
    return this.products$;
  }

  getSliderProducts(limit: number = 10): Observable<any[]> {
    return this.products$.pipe(
      filter(products => {
        return products.length > 0; 
      }),
      map(products => {
        return products.slice(0, limit);
      })
    );
  }
}
