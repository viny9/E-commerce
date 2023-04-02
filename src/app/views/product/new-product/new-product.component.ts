import { ProductService } from '../../../services/product/product.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { createTextMaskInputElement } from 'text-mask-core';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {

  form: any
  products: any = []
  value: any
  categorys:any

  constructor(private db: ProductService) { }

  ngOnInit(): void {
    this.createForm()
    this.categoryList()
  }

  createForm() {
    this.form = new FormGroup({
      name: new FormControl(''),
      price: new FormControl(''),
      category: new FormControl(''),
      img: new FormControl('')
    })
  }

  createProduct() {
    const product = this.form.value
    let price: any = Number(product.price)

    if (Number.isNaN(price)) {
      price = this.form.value.price
      price = price.replace(',', '.')
      price = Number(price)
    }

    product.price = price

    this.db.createProduct(product)
      .then(() => this.db.userMessages('Produto criado'))
      .then(() => this.db.navegate('admin/products'))
  }

 categoryList() {
  this.db.getCategorys().subscribe((res:any) => {

    const categorys = res.docs.map((doc:any) => {
      return doc.data()
    })

    this.categorys = categorys
  })
 }

  teste2(event: Event | any) {
    event.preventDefault()
    // var data = event.dataTransfer.getData("text");
  }

  teste3(event: Event) {
    event.preventDefault()
    console.log(event)
  }

}
