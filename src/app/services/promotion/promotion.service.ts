import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ErrorsService } from '../errors/errors.service';
import { catchError } from 'rxjs';
import { Promotion } from 'src/app/models/promotion';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {
  private baseUrl: string = environment.backendBaseUrl

  constructor(private http: HttpClient, private errorService: ErrorsService) { }

  getPromotions() {
    return this.http
      .get(`${this.baseUrl}/promotion`)
      .pipe(catchError((e) => this.errorService.handleError(e)));
  }

  getPromotionById(id: string) {
    return this.http
    .get(`${this.baseUrl}/promotion/${id}`)
    .pipe(catchError((e) => this.errorService.handleError(e)));
  }

  createPromotion(promotion: Promotion) {
    return this.http
    .post(`${this.baseUrl}/promotion`, promotion)
    .pipe(catchError((e) => this.errorService.handleError(e)));
  }

  updatePromotion(id: string, updatedPromotion: Promotion) {
    return this.http
    .patch(`${this.baseUrl}/promotion/${id}`, updatedPromotion)
    .pipe(catchError((e) => this.errorService.handleError(e)));
  }

  deletePromotion(id: string) {
    return this.http
    .delete(`${this.baseUrl}/promotion/${id}`)
    .pipe(catchError((e) => this.errorService.handleError(e)));
  }

  // Create methods to remove and add product promotions
}
