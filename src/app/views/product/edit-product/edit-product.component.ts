import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  @Output() back: any = new EventEmitter()
  @Input() oldProduct: any

  editForm: any

  constructor(private db: ProductService) { }

  ngOnInit(): void {
    this.createForm()
  }

  createForm() {
    this.editForm = new FormGroup({
      name: new FormControl(this.oldProduct.name),
      price: new FormControl(this.oldProduct.price),
      category: new FormControl(this.oldProduct.category),
      img: new FormControl(),
    })
  }

  updateProduct() {
    const product = this.editForm.value
    product.price = Number(product.price)

    this.db.editProduct(this.oldProduct.id, this.editForm.value)
      .then(() => this.back.emit(''))
  }

  return() {
    this.back.emit('')
  }

  teste2(event: Event) {

  }
  teste3(event: Event) {

  }

}
