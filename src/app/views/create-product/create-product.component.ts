import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {

  @Output() home = new EventEmitter()
  form:any

  constructor(private product:ProductService) { }

  ngOnInit(): void {
    this.createForm()
  }

  createForm() {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required])
    })
  }

  createProduct() {
    this.product.createProduct(this.form.value)
  }

}
