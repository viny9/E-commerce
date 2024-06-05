import { Component, OnInit } from '@angular/core';
import { LoadService } from 'src/app/services/load/load.service';
import { StripeService } from 'src/app/services/stripe/stripe.service';

@Component({
  selector: 'app-all-orders',
  templateUrl: './all-orders.component.html',
  styleUrls: ['./all-orders.component.css']
})
export class AllOrdersComponent implements OnInit {

  payments: any[] = []
  loading: boolean = false
  teste!: number;

  constructor(private stripeService: StripeService, private loadService: LoadService) {
    loadService.isLoading.subscribe((res) => {
      this.loading = res
    })
  }

  ngOnInit(): void {
    this.getUserPayments()

    this.teste = window.screen.width
  }

  getUserPayments() {
    // this.loadService.showLoading()
    // this.stripeService.getPayments().subscribe((res) => {

    //   res.map((element: any) => {
    //     const date = new Date(element.created * 1000)
    //     element.data = date
    //   });

    //   this.payments = res.sort((a: any, b: any) => {
    //     const d: any = new Date(a.created);
    //     const c: any = new Date(b.created);
    //     return c - d;
    //   })

    //   this.loadService.hideLoading()
    // })
  }

}
