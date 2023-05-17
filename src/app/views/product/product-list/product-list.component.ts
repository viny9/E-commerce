import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ProductService } from 'src/app/services/product/product.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogCategoryComponent } from '../dialog-category/dialog-category.component';
import { LoadService } from 'src/app/services/load/load.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { GetIdTypes } from 'src/app/enums/get-id-types';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})


export class ProductListComponent implements AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  columns: string[] = ['id', 'name', 'price', 'category', 'actions']

  dataSource: any;
  editProduct: any
  productId: any

  constructor(private db: ProductService, private loadService: LoadService, private route: Router, private dialog: MatDialog) {
    db.selectComponent = 'products'
  }

  ngAfterViewInit(): void {
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
      this.dataSource.paginator = this.paginator
      this.dataSource.sort = this.sort;

      this.loadService.hideLoading()
    })

  }

  async editPage(product: any) {
    const id: any = await this.db.getId(GetIdTypes.products, product)

    this.route.navigate([`admin/products/editProduct/${id}`])
  }

  async removeProduct(product: any) {
    const id: any = await this.db.getId(GetIdTypes.products, product)

    this.db.deleteProduct(id)
      .then(() => {
        product.imgs.forEach((img: any) => {
          this.db.deleteProductImg(img.url).subscribe()
        });
      })
      .then(() => this.product())
      .then(() => this.db.userMessages('Produto removido'))
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
