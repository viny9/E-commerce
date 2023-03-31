import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { StipeService } from 'src/app/services/stipe.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent implements OnInit {

  constructor(private db: ProductService, private stripeService: StipeService, private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.status()
  }

  status() {
    this.router.params.subscribe((params: any) => {
      const id = params.paymentId

      this.stripeService.paymentStatus(id).subscribe((res: any) => {

        this.db.getUser().subscribe((doc: any) => {
          const user = doc.data()
          
          res.customer_details.address = user.address
          res.customer_details.name = user.name
          res.customer_details.email = user.email
          res.customer_details.telephone = user.telephone

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
