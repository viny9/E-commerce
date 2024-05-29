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
  loading: any = false
  priceDetails: any = {}

  constructor(private stripe: StripeService, private loadService: LoadService, private router: ActivatedRoute) {
    loadService.isLoading.subscribe((res: any) => {
      this.loading = res
    })
  }

  ngOnInit(): void {
    this.getOrder()
  }

  getOrder() {
    this.loadService.showLoading()

    this.router.params.subscribe((params) => {
      const orderNumber = Number(params['orderId'])

      this.stripe.getPayments().subscribe((res: any) => {

        const filter = res.filter((order: any) => {
          return order.order_number === orderNumber
        })

        this.order = filter[0]
        this.paymentInfos = this.order.payment_intent.payment_method
        this.address = this.order.customer_details.address

        const date = new Date(this.order.created * 1000)
        this.date = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`

        this.paymentStatus()
        this.totalPrice()
        this.loadService.hideLoading()
      })
    })
  }

  totalPrice() {
    let all: any = 0
    let promotion: any = 0
    let productsValue: any = 0

    const products = this.order?.products
    products.forEach((product: any) => {
      if (product.promotionInfos != null) {
        promotion += (product.promotionInfos.oldPrice * product.promotionInfos.percentage) / 100
        all += (product.price / 100) * product.amount
        productsValue += product.promotionInfos.oldPrice * product.amount

      } else {
        all += (product.price / 100) * product.amount
        productsValue += (product.price / 100) * product.amount
      }

    });

    // Ajustar melhor depois esses valores
    // E adicionar o frete
    this.priceDetails.all = all.toFixed(2).replace('.', ',')
    this.priceDetails.products = productsValue.toFixed(2).replace('.', ',')
    this.priceDetails.promotions = promotion.toFixed(2).replace('.', ',')
  }

  paymentStatus() {
    if (this.order.payment_intent.status === 'succeeded') {
      this.status = 'Pago'
    } else {
      this.status = 'Aguardando pagamento'
    }
  }
}
