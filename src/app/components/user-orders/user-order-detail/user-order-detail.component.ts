import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ProductService } from 'src/app/services/product/product.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { StripeService } from 'src/app/services/stripe/stripe.service';
import { LoadService } from 'src/app/services/load/load.service';

@Component({
  selector: 'app-user-order-detail',
  templateUrl: './user-order-detail.component.html',
  styleUrls: ['./user-order-detail.component.css']
})
export class UserOrderDetailComponent implements OnInit {

  order: any
  date: any
  status: any
  paymentInfos: any
  address: any
  loading:any = false

  constructor(private stripe: StripeService, private loadService:LoadService, private router: ActivatedRoute) { 
    loadService.isLoading.subscribe((res: any) => {
      this.loading = res
    })
  }

  ngOnInit(): void {
    this.getOrder()
  }

  getOrder() {
    this.loadService.showLoading()
    this.stripe.getPayments().subscribe((res: any) => {
      const orders = res.docs.map((doc: any) => {
        return doc.data()
      })

      this.router.params.subscribe((params: any) => {
        const orderNumber = Number(params.orderId)

        const filter = orders.filter((order: any) => {
          return order.order_number === orderNumber
        })

        this.order = filter[0]

        this.address = this.order.customer_details.address

        const date = new Date(this.order.created * 1000)
        this.date = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`

        this.paymentStatus()
        this.teste()
        this.loadService.hideLoading()
      })
    })
  }

  teste() {
    this.paymentInfos = this.order.payment_intent.payment_method
  }

  paymentStatus() {
    const status = document.querySelector('#status')

    if (this.order.payment_intent.status === 'succeeded') {
      this.status = 'Pago'
      status?.classList.add('paid')
    } else {
      this.status = 'Aguardando pagamento'
      status?.classList.add('unpaid')
    }
  }
}
