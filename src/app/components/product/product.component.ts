import { StipeService } from 'src/app/services/stipe.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  amount: any = 1
  favorite: any = false
  product: any
  listFavorites: Array<any> = []
  cart: any = []
  inCart: any

  constructor(private db: ProductService, private router: ActivatedRoute, private pay: StipeService) { }

  ngOnInit(): void {
    this.productInfos()
    this.isFavorite()
    this.isOnCart()
  }

  productInfos() {
    this.router.params.subscribe((data: any) => {
      const id = data.productId

      this.db.getProductById(id).subscribe((res: any) => {
        this.product = res.data()
      })
    })
  }

  isFavorite() {
    this.db.getFavoriteList().subscribe((res: any) => {
      res.docs.forEach((element: any) => {
        this.listFavorites.push(element.data())
      });

      const filter = this.listFavorites.filter((product: any) => {
        return product.name === this.product.name
      })

      if (filter.length === 0) {
        this.favorite = false
      } else if (filter.length >= 1) {
        this.favorite = true
      }
    })
  }

  subAmount() {
    if (this.amount > 1) {
      this.amount -= 1
    }
  }

  addAmount() {
    const max = 20

    if (this.amount < max) {
      this.amount += 1
    }
  }

  addFavorites() {
    if (this.favorite === false) {
      this.db.getProductId(this.product)

      setTimeout(() => {
        this.product.id = this.db.productId

        this.db.addProductInList(this.product)
          .then(() => this.favorite = true)
          .then(() => this.db.userMessages('Adicionado a sua lista'))
      }, 500);

    } else if (this.favorite === true) {
      this.db.getListProductId(this.product)

      setTimeout(() => {
        this.db.deleteFromList(this.db.productId)
          .then(() => this.favorite = false)
          .then(() => this.db.userMessages('Foi removido da sua lista'))
      }, 500);
    }
  }

  addCart() {
    if (this.inCart === false) {
      this.db.getProductId(this.product)

      setTimeout(() => {
        this.product.amount = this.amount
        this.product.id = this.db.productId

        this.db.addInCart(this.product)
          .then(() => this.inCart = true)
          .then(() => this.db.userMessages('Adicionado ao carrinho'))
      }, 500);

    } else {
      this.db.userMessages('Produto já está no carrinho')
    }
  }

  isOnCart() {
    this.db.getCart().subscribe((res: any) => {
      res.docs.forEach((element: any) => {
        this.cart.push(element.data())
      });

      const filter = this.cart.filter((product: any) => {
        return product.name === this.product.name
      })

      if (filter.length === 0) {
        this.inCart = false
      } else if (filter.length >= 1) {
        this.inCart = true
      }
    })
  }

  buy() {
    this.db.getProductId(this.product)

    setTimeout(() => {
      this.product.id = this.db.productId
      this.product.amount = this.amount
      this.pay.productPayment(this.product)
    }, 500);
  }

  // navigator.clipboard.writeText(window.location.href)
}
