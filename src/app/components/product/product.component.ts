import { CartService } from './../../services/cart/cart.service';
import { StripeService } from 'src/app/services/stripe/stripe.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product/product.service';
import { LoadService } from 'src/app/services/load/load.service';
import { Product } from 'src/app/models/product';
import { ListService } from 'src/app/services/list/list.service';
import { userMessages } from 'src/app/utils/snackbar';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  public amount: number = 1;
  public favorite: boolean = false;
  public product!: Product;
  public loading: boolean = false;
  public selectedImg: string = '';
  private listFavorites: any[] = [];
  private cart: any[] = [];
  private inCart: boolean = false;

  constructor(
    private listService: ListService,
    private productService: ProductService,
    private loadService: LoadService,
    private cartService: CartService,
    private router: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    loadService.isLoading.subscribe((res) => {
      this.loading = res;
    });
  }

  ngOnInit(): void {
    this.loadService.showLoading();

    this.getProductInfos();
    this.isFavorite();
    this.isOnCart();
  }

  getProductInfos() {
    this.router.params.subscribe((param) => {
      const id = param['productId'];

      this.productService.getProductById(id).subscribe((res: any) => {
        this.product = res;
        this.selectedImg = this.product.imgs[0]?.url;
      });
    });
  }

  isFavorite() {
    this.listService.getFavoriteList().subscribe((res: any) => {
      this.listFavorites = res;

      const filter = this.listFavorites.filter((product: Product) => {
        return product.name === this.product.name;
      });

      if (filter.length === 0) {
        this.favorite = false;
      } else if (filter.length >= 1) {
        this.favorite = true;
      }
    });
  }

  isOnCart() {
    this.cartService.getCart().subscribe((res: any) => {
      this.cart = res;

      const filter = this.cart.filter((product: any) => {
        return product.name === this.product.name;
      });

      if (filter.length === 0) {
        this.inCart = false;
      } else if (filter.length >= 1) {
        this.inCart = true;
      }

      this.loadService.hideLoading();
    });
  }

  async addFavorites() {
    if (!this.favorite) {
      this.listService.addProductInList(this.product).subscribe();
      this.favorite = true;
      userMessages('Adicionado a sua lista', this.snackBar);
    } else if (this.favorite) {
      this.listService.deleteFromList(this.product.id!).subscribe();
      this.favorite = false;
      userMessages('Foi removido da sua lista', this.snackBar);
    }
  }

  async addCart() {
    if (!this.inCart) {
      // this.product.amount = this.amount;

      this.cartService.addProductInCart(this.product).subscribe();
      this.inCart = true;
      userMessages('Adicionado ao carrinho', this.snackBar);
    } else {
      userMessages('Produto já está no carrinho', this.snackBar);
    }
  }

  subProductAmount() {
    if (this.amount > 1) {
      this.amount -= 1;
    }
  }

  addProductAmount() {
    const max = 20;

    if (this.amount < max) {
      this.amount += 1;
    }
  }

  async buy() {
    // this.product.amount = this.amount;
    // this.stripeService.productPayment(this.product);
  }

  // navigator.clipboard.writeText(window.location.href)
}
