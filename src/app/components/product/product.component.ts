import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  amount: any = 1
  favorite: any = false
  product:any

  constructor(private db:ProductService, private router:ActivatedRoute) { }

  ngOnInit(): void {
    this.productInfos()
  }

  productInfos() {
    this.router.params.subscribe((data:any) => {
      const id = data.productId
      
      this.db.getProductById(id).subscribe((res:any) => {
        this.product = res.data()
      })
    })
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

  // navigator.clipboard.writeText(window.location.href)
}
