import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  empty: any = true
  products: any = []
  all: number = 0

  constructor(private db: ProductService) { }

  ngOnInit(): void {
    this.cartItens()
  }

  cartItens() {
    this.db.getCart().subscribe((res: any) => {
      const productsArray = res.docs.map((element: any) => {
        return element.data()
      })
      this.products = productsArray

      this.isEmpty()
      this.totalPrice()
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
      this.db.deleteCartProduct(this.db.productId)
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
}
