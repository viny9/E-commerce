import { ProductService } from './../../services/product.service';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteProductComponent } from 'src/app/views/delete-product/delete-product.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  selectedProduct:any
  dataSource:any = []
  columns = ['position', 'name', 'price', 'actions']
  component:String = ''
  id:any

  constructor(private dialog: MatDialog, private product:ProductService) { }

  ngOnInit(): void {
    const products:any = []
    this.product.readProducts().subscribe((res:any) => {
      res.forEach((element:any) => {
        products.push(element.data())
      });
      this.dataSource = products
    })
  }

  edit(product?:any) {
    this.product.readProducts().subscribe((res:any) => {
      this.findId(product, res)
      
      this.selectedProduct = {
        ...product,
        id: this.id
      }
  })

  setTimeout(() => {
    this.component = 'edit-product'
  }, 500);

  }

  openDelete(product:any) {
    this.product.readProducts().subscribe((res:any) => {
    this.findId(product, res)

   const ref = this.dialog.open(DeleteProductComponent, {
      width: '500px',
      data: product
    })
    ref.afterClosed().subscribe((res:any) => {
      res === true? this.product.deleteProduct(this.id) : false
    })

   })
  }

  findId(product:any, res:any) {
      const ids = res.docs
      const names = res.docs.map((res:any) => {
        return res.data().name
      })

      const index = names.indexOf(product.name)
      this.id = ids[index].id
  }
 

  recive(event:any) {
    this.component = event
  }

}
