import { ProductService } from '../../../services/product/product.service';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-category',
  templateUrl: './dialog-category.component.html',
  styleUrls: ['./dialog-category.component.css']
})
export class DialogCategoryComponent implements OnInit {

  inputStatus: any = 'new'
  newCategoryInput: any
  editCategoryInput: any
  selectedCategory: any
  categorys: any
  changed: any = false

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

  updateCategory() {
    this.db.getCategoryId(this.selectedCategory)

    setTimeout(() => {
      const id = this.db.id
      const upadatedCategory = { name: this.editCategoryInput }

      this.db.updateCategory(id, upadatedCategory)
        .then(() => this.categorysList())
        .then(() => this.filterProducts())
    }, 1000);
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
        this.UpdateProducts(product)
      });
    })
  }

  UpdateProducts(product: any) {
    this.db.getProducts().subscribe((res: any) => {

      const ids = res.docs

      const products = res.docs.map((res: any) => {
        return res.data().name
      })

      const index = products.indexOf(product.name)
      const id = ids[index].id

      this.db.editProduct(id, product)
        .then(() => this.db.userMessages('Produtos foram atualizados'))
        .then(() => this.changed = true)
    })
  }

  deleteCategory(category: any) {
    this.db.getCategoryId(category.name)

    setTimeout(() => {
      this.db.removeCategory(this.db.id)
        .then(() => this.db.userMessages('Categoria removida'))
        .then(() => this.categorysList())
    }, 500);
  }

  close() {
    this.dialog.close(this.changed)
  }

}
