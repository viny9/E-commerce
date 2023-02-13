import { ProductService } from './../../../services/product.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {

  @Output() teste: any = new EventEmitter()
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
    this.db.createProduct(this.form.value)
      .then(() => console.log('criado'))
      .then(() => this.return())
  }

  return() {
    this.teste.emit('')
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
