import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  @Output() home = new EventEmitter()
  @Input() recive:any
  form:any

  constructor(private product:ProductService) { }

  ngOnInit(): void {
    console.log(this.recive)
    this.createForm()
  }

  createForm() {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required])
    })

    this.form.controls.name.setValue(this.recive.name)
    this.form.controls.price.setValue(this.recive.price)
  }

  editProduct() {
    this.product.updateProduct(this.recive.id, this.form.value)
  }

}
