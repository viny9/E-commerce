import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ErrorsService } from '../../../services/errors/errors.service';
import { Product } from 'src/app/shared/models/product';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private baseUrl: string = environment.backendBaseUrl;
  private userId: string = '';

  constructor(private http: HttpClient, private errorService: ErrorsService) {}

  getCart() {
    return this.http
      .get(`${this.baseUrl}/cart/${this.userId}`)
      .pipe(catchError((e) => this.errorService.handleError(e)));
  }

  addProductInCart(product: Product) {
    let cartId = '';

    return this.http
      .post(`${this.baseUrl}/cart/${cartId}/products/${product.id}`, undefined)
      .pipe(catchError((e) => this.errorService.handleError(e)));
  }

  deleteCartProduct(productId: string) {
    let cartId = '';

    return this.http
      .delete(`${this.baseUrl}/cart/${cartId}/products/${productId}`)
      .pipe(catchError((e) => this.errorService.handleError(e)));
  }

  emptyCart() {
    // Create a method to clear cart
  }
}
