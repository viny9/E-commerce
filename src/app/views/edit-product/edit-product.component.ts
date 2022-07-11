import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  @Output() home = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }

  editProduct() {
    window.location.reload()
  }

}
