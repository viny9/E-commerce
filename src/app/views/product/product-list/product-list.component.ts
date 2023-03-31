import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogCategoryComponent } from '../dialog-category/dialog-category.component';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: any;
  @ViewChild(MatSort) sort: any;
  columns: Array<String> = ['id', 'name', 'price', 'category', 'actions']

  dataSource: any;
  editProduct: any
  productId: any

  constructor(private db: ProductService, private route: Router, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.product()
  }

  product() {
    this.db.getProducts().subscribe((res: any) => {

      const products: any = []

      res.docs.map((res: any) => {
        products.push(res.data())
      })

      this.dataSource = new MatTableDataSource(products)
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator
    })
  }

  editPage(product: any) {
    this.db.getProductId(product)

    setTimeout(() => {
      this.route.navigate([`admin/products/editProduct/${this.db.productId}`])
    }, 500);
  }

  removeProduct(product: any) {
    this.db.getProductId(product)

    setTimeout(() => {
      this.db.deleteProduct(this.db.productId)
        .then(() => this.product())
        .then(() => this.db.userMessages('Produto removido'))
    }, 500);
  }

  openDialog() {
    const ref = this.dialog.open(DialogCategoryComponent, {
      width: '500px',
      panelClass: 'dialog'
    })

    ref.afterClosed().subscribe((res: any) => {
      if (res === true) {
        document.location.reload()
      }
    })
  }
}
