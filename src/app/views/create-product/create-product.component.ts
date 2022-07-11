import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {

  @Output() home = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }

  createProduct() {
    window.location.reload()
  }

}
