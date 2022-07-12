import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  products:any = false
  id:any

  constructor(private product:ProductService) { }

  ngOnInit(): void {
    const prod:any = []
    this.product.readList().subscribe((res:any) => {
      res.forEach((element:any) => {
        prod.push(element.data())

        this.products = prod
      });
    })
  }

  remove(product:any) {
    this.product.readList().subscribe((res:any) => {
      const ids = res.docs
      const names = res.docs.map((res:any) => {
        return res.data().name
      })

      const index = names.indexOf(product.name)
      this.id = ids[index].id
      
      this.product.deleteFromTheList(this.id)
  })
  }
}
