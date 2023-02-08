import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  @Output() teste:any = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }

  return() {
    this.teste.emit('')
  }

  teste2(event:Event) {
    
  }

  teste3(event:Event) {

  }

}
