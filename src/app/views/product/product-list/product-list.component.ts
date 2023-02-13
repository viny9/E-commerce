import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { MatSort } from '@angular/material/sort';
import { promises, resolve } from 'dns';
import { rejects } from 'assert';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  page: any = ''
  @ViewChild(MatPaginator) paginator: any;
  @ViewChild(MatSort) sort: any;
  columns: Array<String> = ['id', 'name', 'price', 'category', 'actions']

  dataSource: any;
  editProduct: any
  productId: any

  constructor(private db: ProductService,) { }

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
      product.id = this.db.productId
      this.editProduct = product
      this.page = 'edit'
    }, 500);
  }

  removeProduct(product: any) {
    this.db.getProductId(product)

    setTimeout(() => {
      this.db.deleteProduct(this.db.productId)
        .then(() => this.product())
    }, 500);
  }

  recive(event: any) {
    this.product()
    this.page = event
  }
}
