import { MatTableDataSource } from '@angular/material/table';
import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { ProductService } from 'src/app/services/product/product.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogCategoryComponent } from '../dialog-category/dialog-category.component';
import { LoadService } from 'src/app/services/load/load.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AdminRoutes } from 'src/app/enums/admin-routes';
import { Product } from 'src/app/models/product';

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

  constructor(private db: ProductService, private loadService: LoadService, private route: Router, private dialog: MatDialog) {
    db.selectComponent = AdminRoutes.products
  }

  ngAfterViewInit(): void {
    this.product()
  }

  product() {
    this.loadService.showLoading()

    this.db.getProducts().subscribe((res) => {

      const products: Product[] = res

      this.dataSource = new MatTableDataSource(products)
      this.dataSource.paginator = this.paginator
      this.dataSource.sort = this.sort;

      this.loadService.hideLoading()
    })

  }

  async editPage(product: Product) {
    const id = await this.db.getId(this.db.path.products, product)
    this.route.navigate([`admin/products/editProduct/${id}`])
  }

  async removeProduct(product: Product) {
    const id = await this.db.getId(this.db.path.products, product)

    await this.db.deleteProduct(id)
    product.imgs.forEach((img: any) => {
      this.db.deleteProductImg(img.url).subscribe()
    })

    await Promise.all([this.product(), this.db.userMessages('Produto removido')])
  }

  openDialog() {
    const ref = this.dialog.open(DialogCategoryComponent, {
      width: '500px',
      panelClass: 'dialog'
    })

    ref.afterClosed().subscribe((res) => {
      if (res === true) {
        document.location.reload()
      }
    })
  }
}
