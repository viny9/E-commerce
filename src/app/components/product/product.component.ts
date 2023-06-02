import { StripeService } from 'src/app/services/stripe/stripe.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product/product.service';
import { LoadService } from 'src/app/services/load/load.service';
import { Product } from 'src/app/models/product';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  amount: number = 1
  favorite: boolean = false
  product!: Product
  listFavorites: any[] = []
  cart: any[] = []
  inCart: boolean = false
  loading: boolean = false
  selectedImg: string = ''

  constructor(private db: ProductService, private loadService: LoadService, private router: ActivatedRoute, private stripeService: StripeService) {
    loadService.isLoading.subscribe((res) => {
      this.loading = res
    })
  }

  ngOnInit(): void {
    this.loadService.showLoading()

    this.getProductInfos()
    this.isFavorite()
    this.isOnCart()

  }

  getProductInfos() {
    this.router.params.subscribe((param) => {
      const id = param['productId']

      this.db.getProductById(id).subscribe((res: any) => {
        this.product = res
        this.selectedImg = this.product.imgs[0]?.url
      })
    })
  }

  isFavorite() {
    this.db.getFavoriteList().subscribe((res: any) => {

      this.listFavorites = res

      const filter = this.listFavorites.filter((product: Product) => {
        return product.name === this.product.name
      })

      if (filter.length === 0) {
        this.favorite = false
      } else if (filter.length >= 1) {
        this.favorite = true
      }
    })
  }

  isOnCart() {
    this.db.getCart().subscribe((res: any) => {

      this.cart = res

      const filter = this.cart.filter((product: any) => {
        return product.name === this.product.name
      })

      if (filter.length === 0) {
        this.inCart = false
      } else if (filter.length >= 1) {
        this.inCart = true
      }

      this.loadService.hideLoading()

    })
  }

  async addFavorites() {
    if (!this.favorite) {
      const id = await this.db.getId(this.db.path.products, this.product)
      this.product.id = id

      await this.db.addProductInList(this.product)
      this.favorite = true
      this.db.userMessages('Adicionado a sua lista')

    } else if (this.favorite) {
      const id: any = await this.db.getId(this.db.path.list, this.product)

      await this.db.deleteFromList(id)
      this.favorite = false
      this.db.userMessages('Foi removido da sua lista')
    }
  }

  async addCart() {
    if (!this.inCart) {
      const id: any = await this.db.getId(this.db.path.products, this.product)

      this.product.amount = this.amount
      this.product.id = id

      await this.db.addProductInCart(this.product)
      this.inCart = true
      this.db.userMessages('Adicionado ao carrinho')

    } else {
      this.db.userMessages('Produto já está no carrinho')
    }
  }

  subProductAmount() {
    if (this.amount > 1) {
      this.amount -= 1
    }
  }

  addProductAmount() {
    const max = 20

    if (this.amount < max) {
      this.amount += 1
    }
  }

  async buy() {
    const id: any = await this.db.getId(this.db.path.products, this.product)

    this.product.id = id
    this.product.amount = this.amount
    this.stripeService.productPayment(this.product)
  }

  // navigator.clipboard.writeText(window.location.href)
}
