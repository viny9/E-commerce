import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  products: any = false
  id: any

  constructor(private product: ProductService) {}

  ngOnInit(): void {
    const products: any = []

    this.product.readCart().subscribe((res: any) => {
      res.forEach((element: any) => {
        products.push(element.data())
        this.products = products
      });
    })
  }

  remove(product: any) {
    this.product.readCart().subscribe((res: any) => {
      const ids = res.docs
      const names = res.docs.map((res: any) => {
        return res.data().name
      })

      const index = names.indexOf(product.name)
      this.id = ids[index].id

      this.product.deleteFromTheCart(this.id)
    })
  }

}
