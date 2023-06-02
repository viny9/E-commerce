import { ProductService } from '../../../services/product/product.service';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-category',
  templateUrl: './dialog-category.component.html',
  styleUrls: ['./dialog-category.component.css']
})
export class DialogCategoryComponent implements OnInit {

  inputStatus = 'new'
  newCategoryInput = ''
  editCategoryInput = ''
  selectedCategory = ''
  categorys: any[] = []
  changed: boolean = false

  constructor(private db: ProductService, private dialog: MatDialogRef<DialogCategoryComponent>) { }

  ngOnInit(): void {
    this.categorysList()
  }

  categorysList() {
    this.db.getCategorys().subscribe((res: any) => {
      this.categorys = res
    })
  }

  async newCategory() {
    const category = { name: this.newCategoryInput }

    await this.db.createCategory(category)
    this.categorysList()
  }

  selectCategory(category: any) {
    this.editCategoryInput = category.name
    this.selectedCategory = category.name
  }

  async updateCategory() {
    const id = await this.db.getId(this.db.path.categorys, this.selectedCategory)
    const upadatedCategory = { name: this.editCategoryInput }

    await this.db.updateCategory(id, upadatedCategory)
    this.categorysList()
    this.filterProducts()
  }

  filterProducts() {
    this.db.getProducts().subscribe((res: any) => {
      const filter = res.filter((product: any) => {
        return product.category === this.selectedCategory
      })

      filter.forEach((product: any) => {
        product.category = this.editCategoryInput
        this.updateProducts(product)
      });
    })
  }

  async updateProducts(product: any) {
    const id = await this.db.getId(this.db.path.products, product)

    await this.db.editProduct(id, product)
    this.db.userMessages('Produtos foram atualizados')
    this.changed = true
  }

  async deleteCategory(category: any) {
    const id = await this.db.getId(this.db.path.categorys, category)

    await this.db.removeCategory(id)
    this.db.userMessages('Categoria removida')
    this.categorysList()
  }

  close() {
    this.dialog.close(this.changed)
  }

}
