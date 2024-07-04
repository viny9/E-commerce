import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from 'src/app/shared/models/product';
import { User } from 'src/app/shared/models/user';
import { environment } from 'src/environments/environment';
import { ErrorsService } from '../../../services/errors/errors.service';
import { catchError, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StripeService {
  baseUrl = environment.backendBaseUrl;
  userId = localStorage['userId'];

  constructor(private http: HttpClient, private errorsService: ErrorsService) {}

  // // Pagamentos
  // productPayment(paymentConfig: Product) {
  //   return this.http
  //     .post(`${this.baseUrl}/checkout`, paymentConfig)
  //     .pipe(catchError((e: Error) => this.errorsService.handleError(e)))
  //     .subscribe((res: any) => {
  //       window.location.href = res.url;
  //     });
  // }

  // cartPayment(paymentConfig: Product) {
  //   return this.http
  //     .post(`${this.baseUrl}/checkout-cart`, paymentConfig)
  //     .pipe(catchError((e: Error) => this.errorsService.handleError(e)))
  //     .subscribe((res: any) => {
  //       window.location.href = res.url;
  //     });
  // }

  // paymentStatus(id: string) {
  //   return this.http
  //     .get(`${this.baseUrl}/payment-status/${id}`)
  //     .pipe(catchError((e: Error) => this.errorsService.handleError(e)));
  // }

  // // Clientes
  // createCustomer(customer: User) {
  //   return this.http
  //     .post(`${this.baseUrl}/createCustomer`, customer)
  //     .pipe(catchError((e: Error) => this.errorsService.handleError(e)));
  // }

  // updateCustomer(customer: User) {
  //   return this.http
  //     .put(`${this.baseUrl}/updateCustomer/${customer.stripe_id}`, customer)
  //     .pipe(catchError((e: Error) => this.errorsService.handleError(e)));
  // }

  // deleteCustomer(id: string) {
  //   return this.http
  //     .delete(`${this.baseUrl}/deleteCustomer/${id}`)
  //     .pipe(catchError((e: Error) => this.errorsService.handleError(e)));
  // }

  // //Firebase
  // savePaymentInfosOnFirebase(session: Object) {
  //   return this.firebase
  //     .collection('users')
  //     .doc(this.userId)
  //     .collection('payments')
  //     .add(session)
  //     .catch((e: Error) => this.errorsService.handleError(e));
  // }

  // getPayments() {
  //   return this.firebase
  //     .collection('users')
  //     .doc(this.userId)
  //     .collection('payments')
  //     .get()
  //     .pipe(
  //       map((res) => {
  //         return res.docs.map((doc) => doc.data());
  //       }),
  //       catchError((e: Error) => this.errorsService.handleError(e))
  //     );
  // }
}
