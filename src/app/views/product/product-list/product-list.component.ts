import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from 'src/app/services/product/product.service';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogCategoryComponent } from '../dialog-category/dialog-category.component';
import { LoadService } from 'src/app/services/load/load.service';

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
  loading: any = false

  constructor(private db: ProductService, private loadService: LoadService, private route: Router, private dialog: MatDialog) {
    loadService.isLoading.subscribe((res: any) => {
      this.loading = res
    })

    db.selectComponent = 'products'
  }

  ngOnInit(): void {
    this.product()
  }

  product() {
    this.loadService.showLoading()
    this.db.getProducts().subscribe((res: any) => {

      const products: any = []

      res.docs.map((res: any) => {
        products.push(res.data())
      })

      this.dataSource = new MatTableDataSource(products)
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator

      this.loadService.hideLoading()
    })
  }

  editPage(product: any) {
    this.db.getProductId(product)

    setTimeout(() => {
      this.route.navigate([`admin/products/editProduct/${this.db.id}`])
    }, 500);
  }

  removeProduct(product: any) {
    this.db.getProductId(product)

    setTimeout(() => {
      this.db.deleteProduct(this.db.id)
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
