import { ProductService } from './../../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {

  form: any
  products: any = []

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
    product.price = Number(product.price)
    
    this.db.createProduct(product)
      .then(() => this.db.userMessages('Produto criado'))
      .then(() => this.db.navegate('admin/products'))
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
