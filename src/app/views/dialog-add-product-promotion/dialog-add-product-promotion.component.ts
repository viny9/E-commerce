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
  teste1: any = []
  selectedProducts: any = []
  deletedProducts: any = []

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private db: ProductService, private dialog: MatDialogRef<PromotionsComponent>) { }

  ngOnInit(): void {
    this.getProducts()
    this.selectedProducts = this.data?.products || []
    this.teste1 = this.data?.products || []
  }

  getProducts() {
    this.db.getProducts().subscribe((res: any) => {
      this.products = res.docs.map((doc: any) => {
        return doc.data()
      })

      const teste1 = []

      for (let i = 0; i < this.products.length; i++) {
        const element = this.products[i];

        if (element.promotionInfos === undefined || element.promotionInfos === null) {
          teste1.push(element)
        }
      }

      this.teste = teste1
    })
  }

  searchProduct() {
    this.teste = this.products.filter((product: any) => {
      return product.name.includes(this.input)
    })
  }

  selectProduct(option: any) {
    const products: any = this.selectedProducts.map((product: any) => {
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
    const products = this.selectedProducts?.map((product: any) => {
      return product.name
    })

    const index = products.indexOf(product.name)
    const teste = this.selectedProducts[index]

    if (this.teste1.includes(teste)) {
      this.deletedProducts.push(teste)
    }

    this.selectedProducts.splice(index, 1)
  }

  addPromotion() {
    const updates = {
      selectedProducts: this.selectedProducts,
      deletedProducts: this.deletedProducts
    }

    this.dialog.close(updates)
  }

  cancel() {
    this.dialog.close()
  }

}
