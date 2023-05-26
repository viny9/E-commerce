import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Product } from 'src/app/models/product';
import { User } from 'src/app/models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StripeService {

  baseUrl = environment.backendBaseUrl
  userId = localStorage['userId']

  constructor(private http: HttpClient, private firebase: AngularFirestore) { }

  // Pagamentos
  productPayment(paymentConfig: Product) {
    return this.http.post(`${this.baseUrl}/checkout`, paymentConfig).subscribe((res: any) => {
      window.location.href = res.url
    })
  }

  cartPayment(paymentConfig: Product) {
    return this.http.post(`${this.baseUrl}/checkout-cart`, paymentConfig).subscribe((res: any) => {
      window.location.href = res.url;
    })
  }

  paymentStatus(id: string) {
    return this.http.get(`${this.baseUrl}/payment-status/${id}`)
  }

  // Clientes
  createCustomer(customer: User) {
    return this.http.post(`${this.baseUrl}/createCustomer`, customer)
  }

  updateCustomer(customer: User) {
    return this.http.put(`${this.baseUrl}/updateCustomer/${customer.stripe_id}`, customer)
  }

  deleteCustomer(id: string) {
    return this.http.delete(`${this.baseUrl}/deleteCustomer/${id}`)
  }

  //Firebase
  savePaymentInfosOnFirebase(session: Object) {
    return this.firebase.collection('users').doc(this.userId).collection('payments').add(session)
  }

  getPayments() {
    return this.firebase.collection('users').doc(this.userId).collection('payments').get()
  }
}
