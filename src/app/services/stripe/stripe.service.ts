import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StripeService {

  baseUrl = environment.backendBaseUrl
  userId: any = localStorage['userId']

  constructor(private http: HttpClient, private firebase: AngularFirestore) { }

  // Pagamentos
  productPayment(paymentConfig: any) {
    return this.http.post(`${this.baseUrl}/checkout`, paymentConfig).subscribe((res: any) => {
      window.location.href = res.url
      // window.open(res.url)
    })
  }

  cartPayment(paymentConfig: any) {
    return this.http.post(`${this.baseUrl}/checkout-cart`, paymentConfig).subscribe((res: any) => {
      window.location.href = res.url;
      // window.open(res.url)
    })
  }

  paymentStatus(id: any) {
    return this.http.get(`${this.baseUrl}/payment-status/${id}`)
  }

  // Clientes
  createCustomer(customer: any) {
    return this.http.post(`${this.baseUrl}/createCustomer`, customer)
  }

  updateCustomer(customer: any) {
    return this.http.put(`${this.baseUrl}/updateCustomer/${customer.stripe_id}`, customer)
  }

  deleteCustomer(id: any) {
    return this.http.delete(`${this.baseUrl}/deleteCustomer/${id}`)
  }

  //Firebase
  savePaymentInfosOnFirebase(session: any) {
    return this.firebase.collection('users').doc(this.userId).collection('payments').add(session)
  }

  getPayments() {
    return this.firebase.collection('users').doc(this.userId).collection('payments').get()
  }
}
