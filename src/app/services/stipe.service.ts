import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { loadStripe } from '@stripe/stripe-js';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StipeService {

  baseUrl = environment.stripeBaseUrl

  httpOptions = {
    headers: new HttpHeaders({
      Authorization: "Bearer sk_test_51MjQSrFr4ZXQgrGI1bOieWjmrKv4xXNfTMqlYhOrIOL9lqt6rJtmRPhYBVXC4sNGGZ8R1XjU6gS2lV18g4WQt46T00s2ggbFvj"
    })
  };

  constructor(private http: HttpClient) { }

  teste(paymentConfig:any) {
    return this.http.post(`${this.baseUrl}/checkout`, paymentConfig ).subscribe((res: any) => {
      console.log(res)
      window.location.href = res.url;
    })
  }

  teste2() {
    this.http.get('https://api.stripe.com/v1/prices', this.httpOptions).subscribe((res: any) => {
      console.log(res)
    })
  }
}
