import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ErrorsService } from '../errors/errors.service';
import { Category } from 'src/app/models/category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private baseUrl: string = environment.backendBaseUrl;

  constructor(private http: HttpClient, private errorService: ErrorsService) {}

  getCategorys() {
    return this.http
      .get(`${this.baseUrl}/category`)
      .pipe(catchError((e) => this.errorService.handleError(e)));
  }

  createCategory(category: Category) {
    return this.http
      .post(`${this.baseUrl}/category`, category)
      .pipe(catchError((e) => this.errorService.handleError(e)));
  }

  updateCategory(categoryId: string, updatedCategory: Category) {
    return this.http
    .patch(`${this.baseUrl}/category/${categoryId}`, updatedCategory)
    .pipe(catchError((e) => this.errorService.handleError(e)));
  }

  removeCategory(categoryId: string) {
    return this.http
    .delete(`${this.baseUrl}/category/${categoryId}`)
    .pipe(catchError((e) => this.errorService.handleError(e)));
  }
}
