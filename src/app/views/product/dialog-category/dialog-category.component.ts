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
      const categorys = res.docs.map((doc: any) => {
        return doc.data()
      })

      this.categorys = categorys
    })
  }

  newCategory() {
    const category = { name: this.newCategoryInput }

    this.db.addCategory(category)
      .then(() => this.categorysList())
  }

  selectCategory(category: any) {
    this.editCategoryInput = category.name
    this.selectedCategory = category.name
  }

  async updateCategory() {
    const id = await this.db.getId(this.db.path.categorys, this.selectedCategory)

    const upadatedCategory = { name: this.editCategoryInput }

    this.db.updateCategory(id, upadatedCategory)
      .then(() => this.categorysList())
      .then(() => this.filterProducts())
  }

  filterProducts() {
    this.db.getProducts().subscribe((res: any) => {
      const products = res.docs.map((doc: any) => {
        return doc.data()
      })

      const filter = products.filter((product: any) => {
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

    this.db.editProduct(id, product)
      .then(() => this.db.userMessages('Produtos foram atualizados'))
      .then(() => this.changed = true)
  }

  async deleteCategory(category: any) {
    const id = await this.db.getId(this.db.path.categorys, category)

    this.db.removeCategory(id)
      .then(() => this.db.userMessages('Categoria removida'))
      .then(() => this.categorysList())
  }

  close() {
    this.dialog.close(this.changed)
  }

}
