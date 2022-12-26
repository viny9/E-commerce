import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  amount:number = 1
  empty:boolean = true

  constructor() { }

  ngOnInit(): void {
  }

  subAmount() {
    if (this.amount > 1) {
      this.amount -= 1
    }
  }

  addAmount() {
    const max = 20

    if (this.amount < max) {
      this.amount += 1
    } 
  }
}
