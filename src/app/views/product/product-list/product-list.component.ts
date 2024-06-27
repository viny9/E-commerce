import { MatLegacyTableDataSource as MatTableDataSource } from '@angular/material/legacy-table';
import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { ProductService } from 'src/app/services/product/product.service';
import { Router } from '@angular/router';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { DialogCategoryComponent } from '../dialog-category/dialog-category.component';
import { LoadService } from 'src/app/services/load/load.service';
import { MatLegacyPaginator as MatPaginator } from '@angular/material/legacy-paginator';
import { MatSort } from '@angular/material/sort';
import { AdminRoutes } from 'src/app/enums/admin-routes';
import { Product } from 'src/app/models/product';
import { userMessages } from 'src/app/utils/snackbar';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  columns: string[] = ['id', 'name', 'price', 'category', 'actions'];
  dataSource: any;

  constructor(
    private productService: ProductService,
    private loadService: LoadService,
    private route: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    // db.selectComponent = AdminRoutes.products;
  }

  ngAfterViewInit(): void {
    this.product();
  }

  product() {
    this.loadService.showLoading();

    this.productService.getProducts().subscribe((res) => {
      const products: Product[] = res;

      this.dataSource = new MatTableDataSource(products);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

      this.loadService.hideLoading();
    });
  }

  async editPage(product: Product) {
    this.route.navigate([`admin/products/editProduct/${product.id}`]);
  }

  async removeProduct(product: Product) {
    await this.productService.deleteProduct(product.id!);
    product.imgs.forEach((img: any) => {
      // this.db.deleteProductImg(img.url).subscribe();
    });

    await Promise.all([this.product(), userMessages('Produto removido', this.snackBar)]);
  }

  openDialog() {
    const ref = this.dialog.open(DialogCategoryComponent, {
      width: '500px',
      panelClass: 'dialog',
    });

    ref.afterClosed().subscribe((res) => {
      if (res === true) {
        document.location.reload();
      }
    });
  }
}
