import { ProductService } from '../../../core/services/product/product.service';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/core/services/category/category.service';
import { userMessages } from 'src/app/shared/utils/snackbar';

@Component({
  selector: 'app-dialog-category',
  templateUrl: './dialog-category.component.html',
  styleUrls: ['./dialog-category.component.css'],
})
export class DialogCategoryComponent implements OnInit {
  public inputStatus = 'new';
  public newCategoryInput = '';
  public editCategoryInput = '';
  public categorys: any[] = [];
  private selectedCategory = '';
  private changed: boolean = false;

  constructor(
    private db: ProductService,
    private categoryService: CategoryService,
    private dialog: MatDialogRef<DialogCategoryComponent>,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.categorysList();
  }

  categorysList() {
    this.categoryService.getCategorys().subscribe((res: any) => {
      this.categorys = res;
    });
  }

  async newCategory() {
    const category = { name: this.newCategoryInput };

    await this.categoryService.createCategory(category);
    this.categorysList();
  }

  selectCategory(category: any) {
    this.editCategoryInput = category.name;
    this.selectedCategory = category.name;
  }

  async updateCategory() {
    const upadatedCategory = { name: this.editCategoryInput };

    await this.categoryService.updateCategory('', upadatedCategory);
    this.categorysList();
    this.filterProducts();
  }

  filterProducts() {
    this.db.getProducts().subscribe((res: any) => {
      const filter = res.filter((product: any) => {
        return product.category === this.selectedCategory;
      });

      filter.forEach((product: any) => {
        product.category = this.editCategoryInput;
        this.updateProducts(product);
      });
    });
  }

  async updateProducts(product: any) {
    this.db.editProduct(product.id, product);
    userMessages('Produtos foram atualizados', this.snackBar);
    this.changed = true;
  }

  async deleteCategory(category: any) {
    this.categoryService.removeCategory(category.id);
    userMessages('Categoria removida', this.snackBar);
    this.categorysList();
  }

  close() {
    this.dialog.close(this.changed);
  }
}
