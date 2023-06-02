import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LoadService } from 'src/app/services/load/load.service';
import { ProductService } from 'src/app/services/product/product.service';
import { DialogAddProductPromotionComponent } from '../dialog-add-product-promotion/dialog-add-product-promotion.component';
import { AdminRoutes } from 'src/app/enums/admin-routes';
import { Promotion } from 'src/app/models/promotion';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-promotions',
  templateUrl: './promotions.component.html',
  styleUrls: ['./promotions.component.css']
})
export class PromotionsComponent implements OnInit {

  columns: string[] = ['name', 'start', 'finish', 'actions']
  dataSource: any
  form!: FormGroup
  id: string = ''
  selected: boolean = false
  promotionProducts: any
  selectedPromotion: Promotion[] = []

  constructor(private db: ProductService, private loadService: LoadService, private dialog: MatDialog) {
    db.selectComponent = AdminRoutes.promotions
  }

  ngOnInit(): void {
    this.createForm()
    this.getPromotions()
  }

  createForm(promotionInfos?: Promotion) {
    this.form = new FormGroup({
      name: new FormControl(promotionInfos?.name),
      description: new FormControl(promotionInfos?.description),
      start: new FormControl(promotionInfos?.start),
      end: new FormControl(promotionInfos?.end),
    })
  }

  getPromotions() {
    this.loadService.showLoading()

    this.db.getPromotions().subscribe((res) => {
      this.dataSource = res.map((doc: any) => {

        const start = new Date(doc.start)
        const end = new Date(doc.end)

        doc.start = `${start.getDate() + 1}/${start.getMonth() + 1}/${start.getFullYear()}`
        doc.end = `${end.getDate() + 1}/${end.getMonth() + 1}/${end.getFullYear()}`

        return doc
      })

      this.loadService.hideLoading()
    })
  }

  // Adicionar o disabled no button
  async selectPromotion(promotion: Promotion) {
    const id = await this.db.getId(this.db.path.promotions, promotion)

    this.id = id
    this.selected = true

    this.db.getPromotionById(id).subscribe((res: any) => {
      this.selectedPromotion = res

      this.createForm(res)
    })
  }

  async updatePromotion() {
    const promotion = {
      ...this.form.value,
      products: this.promotionProducts.selectedProducts
    }

    if (this.promotionProducts.deletedProducts.length > 0) {
      this.removeProductPromotion(this.promotionProducts.deletedProducts)
    }

    this.loadService.showLoading()

    await this.db.updatePromotion(this.id, promotion)
    await Promise.all([
      this.selectedPromotion = [],
      this.addProductPromotion(),
      this.getPromotions(),
      this.cancel(),
      this.loadService.hideLoading()
    ])
  }

  async newPromotion() {
    this.loadService.showLoading()

    const promotion = {
      ...this.form.value,
      products: this.promotionProducts.selectedProducts
    }

    await this.db.createPromotion(promotion)

    await Promise.all([
      this.addProductPromotion(),
      this.getPromotions(),
      this.cancel(),
      this.loadService.hideLoading()
    ])

  }

  addProductPromotion() {
    this.promotionProducts?.selectedProducts.forEach(async (product: Product) => {

      const percentage = product.promotionInfos!.percentage / 100
      let promotionPrice = product.price - (product.price * percentage)
      promotionPrice = Math.round(promotionPrice * 100) / 100

      delete product.edit
      product.promotionInfos!.name = this.form.value.name
      product.promotionInfos!.promotionPrice = promotionPrice

      const id = await this.db.getId(this.db.path.products, product)

      await this.db.editProduct(id, product)
      this.selectedPromotion = []
    });
  }

  removeProductPromotion(products: Product[]) {
    products.forEach(async (product: any) => {
      product.promotionInfos = null
      delete product.edit

      const id = await this.db.getId(this.db.path.products, product)
      await this.db.editProduct(id, product)
    });
  }

  async deletePromotion(promotion: Promotion) {
    this.loadService.showLoading()

    const id = await this.db.getId(this.db.path.promotions, promotion)

    await this.db.deletePromotion(id)
      .then(() => this.removeProductPromotion(promotion.products))

    await Promise.all([
      this.getPromotions(),
      this.cancel(),
      this.loadService.hideLoading()
    ])
  }

  cancel() {
    this.selected = false
    this.createForm()
  }

  openDialog() {
    const dialog = this.dialog.open(DialogAddProductPromotionComponent, {
      width: '500px',
      height: '500px',
      panelClass: 'dialog',
      data: this.selectedPromotion
    })

    dialog.afterClosed().subscribe((res: Product[]) => {
      this.promotionProducts = res
    })
  }
}
