import { Component, OnInit } from '@angular/core';
import { LoadService } from 'src/app/services/load/load.service';
import { ProductService } from 'src/app/services/product/product.service';
import { StripeService } from 'src/app/services/stripe/stripe.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  empty: any = true
  products: any = []
  all: number = 0
  loading: any = false

  constructor(private db: ProductService, private loadService:LoadService, private stripe: StripeService) {
    loadService.isLoading.subscribe((res: any) => {
      this.loading = res
    })
  }

  ngOnInit(): void {
    this.cartItens()
  }

  cartItens() {
    this.loadService.showLoading()
    this.db.getCart().subscribe((res: any) => {
      const productsArray = res.docs.map((element: any) => {
        return element.data()
      })
      this.products = productsArray

      this.isEmpty()
      this.totalPrice()
      this.loadService.hideLoading()
    })
  }

  isEmpty() {
    if (this.products.length === 0) {
      this.empty = true
    } else {
      this.empty = false
    }
  }

  removeCartItem(product: any) {
    this.db.getCartProductId(product)

    setTimeout(() => {
      this.db.deleteCartProduct(this.db.id)
        .then(() => this.cartItens())
        .then(() => console.log('removido')
        )
    }, 500);
  }

  subAmount(product: any) {
    if (product.amount > 1) {
      product.amount -= 1
      this.totalPrice()
    }
  }

  addAmount(product: any) {
    const max = 20

    if (product.amount < max) {
      product.amount += 1
      this.totalPrice()
    }
  }

  totalPrice() {
    let all: any = 0
    this.products.forEach((element: any) => {
      all += element.price * element.amount
    });
    this.all = all
  }

  pay() {
    this.stripe.cartPayment(this.products)
  }
}
