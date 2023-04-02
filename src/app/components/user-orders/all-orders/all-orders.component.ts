import { Component, OnInit } from '@angular/core';
import { LoadService } from 'src/app/services/load/load.service';
import { StripeService } from 'src/app/services/stripe/stripe.service';

@Component({
  selector: 'app-all-orders',
  templateUrl: './all-orders.component.html',
  styleUrls: ['./all-orders.component.css']
})
export class AllOrdersComponent implements OnInit {

  payments: any
  loading:any = false

  constructor(private stripeService: StripeService, private loadService: LoadService) {
    loadService.isLoading.subscribe((res: any) => {
      this.loading = res
    })
  }

  ngOnInit(): void {
    this.getUserPayments()
  }

  getUserPayments() {
    this.loadService.showLoading()
    this.stripeService.getPayments().subscribe((res: any) => {

      const payments = res.docs.map((doc: any) => {
        return doc.data()
      })

      payments.map((element: any) => {
        const date = new Date(element.created * 1000)
        element.data = date
      });

      this.payments = payments.sort((a: any, b: any) => {
        const d: any = new Date(a.created);
        const c: any = new Date(b.created);
        return c - d;
      })

      this.loadService.hideLoading()
    })
  }

}
