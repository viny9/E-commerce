import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { StripeService } from 'src/app/services/stripe/stripe.service';
import { ProductService } from 'src/app/services/product/product.service';
import { UserService } from 'src/app/services/user/user.service';
import { LoadService } from 'src/app/services/load/load.service';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent implements OnInit {

  loading: any = false

  constructor(private userService: UserService, private db: ProductService, private stripeService: StripeService, private loadService: LoadService, private router: ActivatedRoute) {
    loadService.isLoading.subscribe((res: any) => {
      this.loading = res
    })
  }

  ngOnInit(): void {
    this.status()
  }

  status() {
    this.loadService.showLoading()
    this.router.params.subscribe((params: any) => {
      const id = params.paymentId

      this.stripeService.paymentStatus(id).subscribe((res: any) => {

        this.userService.getUser().subscribe((doc: any) => {
          const user = doc.data()

          res.customer_details.address = user.address
          res.customer_details.name = user.name
          res.customer_details.email = user.email
          res.customer_details.phone = user.phone

          this.savePayment(res)
        })
      })
    })
  }

  savePayment(paymentStatus: any) {
    this.stripeService.getPayments().subscribe((res: any) => {

      const payments = res.docs.map((doc: any) => {
        return doc.data()
      })

      const filter = payments.filter((payment: any) => {
        return payment.id === paymentStatus.id
      })

      this.loadService.hideLoading(

      )
      if (filter.length === 0) {
        const products = JSON.parse(paymentStatus.metadata.products)
        const orderNumber = Math.floor(Math.random() * 999999999) + 100000000

        delete products.category
        delete paymentStatus.metadata

        paymentStatus.products = products
        paymentStatus.order_number = orderNumber

        this.stripeService.savePaymentInfosOnFirebase(paymentStatus)
          .then(() => this.db.emptyCart())

        this.db.sendAdminOrder(paymentStatus)
          .then(() => console.log('foi'))
      }
    })
  }

}
