import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent implements OnInit {
  @Input() productInfos!: Product;

  constructor(private route: Router) {}

  ngOnInit(): void {}

  async selectProduct(id: string) {
    this.route.navigate([`product/${id}`]);
  }
}
