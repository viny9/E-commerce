import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductService } from 'src/app/services/product/product.service';
import { PromotionsComponent } from '../promotions/promotions.component';

@Component({
  selector: 'app-dialog-add-product-promotion',
  templateUrl: './dialog-add-product-promotion.component.html',
  styleUrls: ['./dialog-add-product-promotion.component.css']
})
export class DialogAddProductPromotionComponent implements OnInit {

  promotionInput: any = ''
  input: string = ''
  products: any
  teste: any
  selectedProducts: any = []

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private db: ProductService, private dialog: MatDialogRef<PromotionsComponent>) { }

  ngOnInit(): void {
    this.getProducts()
    this.selectedProducts = this.data.products
  }

  getProducts() {
    this.db.getProducts().subscribe((res: any) => {
      this.products = res.docs.map((doc: any) => {
        return doc.data()
      })

      this.teste = this.products
    })
  }

  searchProduct() {
    this.teste = this.products.filter((product: any) => {
      return product.name.includes(this.input)
    })
  }

  selectProduct(option: any) {
    const products = this.selectedProducts.map((product: any) => {
      return product.name
    })

    if (products.includes(option.name) === false) {
      option.edit = false
      option.promotionInfos = {
        percentage: 0
      }

      this.selectedProducts.push(option)
    }

    this.getProducts()
  }

  editProduct(product: any) {
    const products = this.selectedProducts.map((product: any) => {
      return product.name
    })

    const index = products.indexOf(product.name)

    if (this.promotionInput === '') {
      this.selectedProducts[index].promotionInfos.percentage = 0

    } else {
      this.selectedProducts[index].promotionInfos.percentage = Number(this.promotionInput)
    }

    this.promotionInput = ''
  }

  check() {
    const products = this.selectedProducts.map((product: any) => {
      return product.edit
    })

    if (products.includes(true)) {
      return true
    } else {
      return false
    }
  }

  removeProduct(product: any) {
    const products = this.selectedProducts.map((product: any) => {
      return product.name
    })

    const index = products.indexOf(product.name)
    this.selectedProducts.splice(index, 1)
  }

  addPromotion() {
    this.dialog.close(this.selectedProducts)
  }

  cancel() {
    this.dialog.close()
  }

}
