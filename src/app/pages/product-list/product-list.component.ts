import { MatTableDataSource } from '@angular/material/table';
import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { ProductService } from 'src/app/core/services/product/product.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LoadService } from 'src/app/services/load/load.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Product } from 'src/app/shared/interfaces/Product';
import { userMessages } from 'src/app/shared/utils/snackbar';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogCategoryComponent } from 'src/app/components/dialogs/dialog-category/dialog-category.component';

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

    await Promise.all([
      this.product(),
      userMessages('Produto removido', this.snackBar),
    ]);
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
