import { BehaviorSubject, catchError, lastValueFrom, map } from 'rxjs';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoadService } from '../load/load.service';
import { Notification } from 'src/app/models/notification';
import { Product } from 'src/app/models/product';
import { Promotion } from 'src/app/models/promotion';
import { ErrorsService } from '../errors/errors.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  userId = localStorage['userId'];
  private baseUrl: string = environment.backendBaseUrl;
  private component: any = new BehaviorSubject<string>('products');
  path = {
    products: 'products',
    list: `users/${this.userId}/list`,
    cart: `users/${this.userId}/cart`,
    categorys: 'productsCategorys',
    promotions: 'promotions',
  };

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private router: Router,
    private loadService: LoadService,
    private errorService: ErrorsService
  ) {}

  getProducts() {
    return this.http
      .get(`${this.baseUrl}/product`)
      .pipe(catchError((e) => this.errorService.handleError(e)));
  }

  getProductById(id: string) {
    return this.http
      .get(`${this.baseUrl}/product/${id}`)
      .pipe(catchError((e) => this.errorService.handleError(e)));
  }

  createProduct(product: Product) {
    return this.http
      .post(`${this.baseUrl}/product`, product)
      .pipe(catchError((e) => this.errorService.handleError(e)));
  }

  editProduct(productId: string, updatedProduct: Product) {
    return this.http
    .patch(`${this.baseUrl}/product/${productId}`, updatedProduct)
    .pipe(catchError((e) => this.errorService.handleError(e)));
  }

  deleteProduct(productId: string) {
    return this.http
    .delete(`${this.baseUrl}/product/${productId}`)
    .pipe(catchError((e) => this.errorService.handleError(e)));
  }

  addProductImg(productId: string, file: File) {
    return this.http
    .post(`${this.baseUrl}/product/${productId}/img`, file)
    .pipe(catchError((e) => this.errorService.handleError(e)));
  }

  updatedProductImgs(productId: string, removedImgs: string[]) {
    // Adaptar para que receba tantas as que vão remover quantas as novas
    return this.http
    .put(`${this.baseUrl}/product/${productId}/img`, removedImgs)
    .pipe(catchError((e) => this.errorService.handleError(e)));
  }

  get selectComponent() {
    return this.component.value;
  }

  set selectComponent(component: string) {
    this.component.next(component);
  }

  get updatedComponent() {
    return this.component.asObservable();
  }
}
