import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  imgs = [
    { url: 'https://images.tcdn.com.br/static_inst/meiosdepagamento/wp-content/uploads/2021/07/opencommerces.jpg ' },
  ]
  products: any = []

  constructor(private db: ProductService, private route: Router) { }

  ngOnInit(): void {
    this.allProducts()
  }

  allProducts() {
    this.db.getProducts().subscribe((data: any) => {
      data.docs.map((data: any) => {
        this.products.push(data.data())
      })
    })
  }

  selectProduct(product: any) {
    this.db.getProductId(product)

    setTimeout(() => {
      this.route.navigate([`product/${this.db.productId}`])
    }, 500);

  }

  toRight() {
    const teste = document.querySelector('.teste2')

    teste?.classList.toggle('teste3')
    teste?.classList.remove('teste')
  }

  toLeft() {
    const teste = document.querySelector('.teste2')

    teste?.classList.toggle('teste')
    teste?.classList.remove('teste3')
  }
}