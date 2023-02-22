import { ProductService } from './../../../services/product.service';
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

  constructor(private db: ProductService) { }

  ngOnInit(): void {
    this.createForm()
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

  teste() {
    let x: any = Number(this.form.value.price)


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
