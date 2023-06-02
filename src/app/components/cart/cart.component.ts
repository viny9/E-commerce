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

  empty = true
  products: any = []
  all: number = 0
  loading = false

  constructor(private db: ProductService, private loadService: LoadService, private stripe: StripeService) {
    loadService.isLoading.subscribe((res) => {
      this.loading = res
    })
  }

  ngOnInit(): void {
    this.cartItens()
  }

  cartItens() {
    this.loadService.showLoading()

    this.db.getCart().subscribe((res) => {
      this.products = res

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

  async removeCartItem(product: Object) {
    const id = await this.db.getId(this.db.path.cart, product)

    await this.db.deleteCartProduct(id)
    this.cartItens()
  }

  subProductAmount(product: any) {
    if (product.amount > 1) {
      product.amount -= 1
      this.totalPrice()
    }
  }

  addProductAmount(product: any) {
    const max = 20

    if (product.amount < max) {
      product.amount += 1
      this.totalPrice()
    }
  }

  totalPrice() {
    let all: any = 0
    this.products.forEach((element: any) => {
      if (element.promotionInfos != null) {
        all += element.promotionInfos.promotionPrice * element.amount
      } else {
        all += element.price * element.amount
      }
    });

    this.all = all.toFixed(2).replace('.', ',')
  }

  pay() {
    this.stripe.cartPayment(this.products)
  }
}
