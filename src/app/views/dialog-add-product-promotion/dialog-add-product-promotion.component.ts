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

  promotionInput: string | number = ''
  searchInput: string = ''
  products: any[] = []
  promotionProducts: any[] = []
  selectedProducts: any[] = []
  deletedProducts: any[] = []

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private db: ProductService, private dialog: MatDialogRef<PromotionsComponent>) { }

  ngOnInit(): void {
    this.getProducts()
    this.selectedProducts = this.data?.products || []
    this.promotionProducts = this.data?.products || []
  }

  getProducts() {
    this.db.getProducts().subscribe((res) => {

      const noPromotionProducts: any[] = []
      const allProducts = res.docs.map((doc: any) => {
        return doc.data()
      })

      allProducts.forEach((element) => {
        if (element.promotionInfos === undefined || element.promotionInfos === null) {
          noPromotionProducts.push(element)
        }
      })

      this.products = noPromotionProducts
    })
  }

  searchProduct() {
    this.products = this.products.filter((product: any) => {
      return product.name.includes(this.searchInput)
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
    const selectedProduct = this.selectedProducts[index]

    if (this.promotionProducts.includes(selectedProduct)) {
      this.deletedProducts.push(selectedProduct)
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
