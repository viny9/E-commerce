import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  products:any = []
  id:any

  constructor(private product:ProductService, private router: Router) { }

  ngOnInit(): void {
    this.product.readProducts().subscribe((res:any) => {
      res.forEach((element:any) => {
        this.products.push(element.data())
      });
    })
  }

  selectedProduct(product:any) {
    this.product.readProducts().subscribe((res:any) => {
      const ids = res.docs
      const names = res.docs.map((res:any) => {
        return res.data().name
      })

      const index = names.indexOf(product.name)
      this.id = ids[index].id
      this.router.navigate([`product/${this.id}`])
    })
  }
}
