import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {

  @Output() teste:any = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }

  teste1() {
    this.teste.emit('')
  }

  teste2(event:Event | any) {
    event.preventDefault()  
    // var data = event.dataTransfer.getData("text");
  }
  
  teste3(event:Event) {
    event.preventDefault()
    console.log(event)
  }

}
