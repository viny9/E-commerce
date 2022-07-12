import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  productInfos:any
  pathId:any

  constructor(private product:ProductService, private route:ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((res:any) => {
      this.pathId = res.productName
      this.product.readProduct(res.productName).subscribe((res:any) => {
        this.productInfos = res.data()
        this.productInfos.id = this.pathId
      })
    })
  }

  moveToList() {
    const productsId:any = []

    this.product.readList().subscribe((res:any) => {
      res.forEach((element:any) => {
        productsId.push(element.data().id)
      });

      if(productsId.includes(this.productInfos.id)) {
        this.product.messages('Já está na sua lista de desejos')
      } else {
        this.product.addToList(this.productInfos)
        this.router.navigate(['list'])
      }
    })
  }

  moveToCart() {
    const productsId:any = []

    this.product.readCart().subscribe((res:any) => {
      res.forEach((element:any) => {
        productsId.push(element.data().id)
      })
      
      if(productsId.includes(this.productInfos.id)) {
          this.product.messages('Já está no seu carrinho')
        } else {
          this.product.addToCart(this.productInfos)
          this.router.navigate(['cart'])
        }
    });

  }

}
