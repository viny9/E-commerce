import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ErrorsService } from '../errors/errors.service';
import { List } from 'src/app/models/list';
import { Product } from 'src/app/models/product';

@Injectable({
  providedIn: 'root',
})
export class ListService {
  private baseUrl: string = environment.backendBaseUrl;
  private userId: string = '';

  constructor(private http: HttpClient, private errorService: ErrorsService) {}

  getFavoriteList() {
    return this.http
      .get<List>(`${this.baseUrl}/list/${this.userId}`)
      .pipe(catchError((e: Error) => this.errorService.handleError(e)));
  }

  addProductInList(product: Product) {
    let listId = '';

    return this.http
      .post(`${this.baseUrl}/list/${listId}/product/${product.id}`, null)
      .pipe(catchError((e) => this.errorService.handleError(e)));
  }

  deleteFromList(productId: string) {
    let listId = '';

    return this.http
      .delete(`${this.baseUrl}/list/${listId}/product/${productId}`)
      .pipe(catchError((e) => this.errorService.handleError(e)));
  }
}
