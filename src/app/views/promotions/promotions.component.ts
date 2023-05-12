import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LoadService } from 'src/app/services/load/load.service';
import { ProductService } from 'src/app/services/product/product.service';
import { DialogAddProductPromotionComponent } from '../dialog-add-product-promotion/dialog-add-product-promotion.component';

@Component({
  selector: 'app-promotions',
  templateUrl: './promotions.component.html',
  styleUrls: ['./promotions.component.css']
})
export class PromotionsComponent implements OnInit {

  columns = ['name', 'start', 'finish', 'actions']
  dataSource: any
  form: any
  id: any
  selected: boolean = false
  promotionProducts: any
  selectedPromotion: any

  constructor(private db: ProductService, private loadService: LoadService, private dialog: MatDialog) {
    db.selectComponent = 'promotions'
  }

  ngOnInit(): void {
    this.createForm()
    this.getPromotions()
  }

  createForm(teste?: any) {
    this.form = new FormGroup({
      name: new FormControl(teste?.name),
      description: new FormControl(teste?.description),
      start: new FormControl(teste?.start),
      end: new FormControl(teste?.end),
    })
  }

  getPromotions() {
    this.loadService.showLoading()
    this.db.getPromotions().subscribe((res: any) => {
      this.dataSource = res.docs.map((doc: any) => {

        const promotion = {
          ...doc.data()
        }

        promotion.start = doc.data().start.replace(/-/g, '/')
        promotion.end = doc.data().end.replace(/-/g, '/')

        return promotion
      })
      this.loadService.hideLoading()

    })
  }

  // Adicionar o disabled no button
  async selectPromotion(promotion: any) {
    const id = await this.db.getPromotionId(promotion)
    this.id = id
    this.selected = true

    this.db.getPromotionById(id).subscribe((res: any) => {
      const promotion = res.data()
      this.selectedPromotion = promotion

      this.createForm(promotion)
    })
  }

  async updatePromotion() {
    const promotion = {
      ...this.form.value,
      products: this.promotionProducts
    }

    this.loadService.showLoading()
    this.db.updatePromotion(this.id, promotion)
      .then(() => this.getPromotions())
      .then(() => this.addProductPromotion())
      .then(() => this.cancel())
      .then(() => this.loadService.hideLoading())
  }

  newPromotion() {
    this.loadService.showLoading()

    const promotion = {
      ...this.form.value,
      products: this.promotionProducts
    }

    this.db.newPromotion(promotion)
      .then(() => this.getPromotions())
      .then(() => this.addProductPromotion())
      .then(() => this.cancel())
      .then(() => this.loadService.hideLoading())
      .catch((e: any) => console.log(e))
  }

  addProductPromotion() {
    this.promotionProducts.forEach(async (product: any) => {
      delete product.edit
      product.promotionInfos.name = this.form.value.name

      const id = await this.db.getProductId(product)
      this.db.editProduct(id, product)

        .catch((e: any) => console.log(e))
    });
    // Ajustar a função de pegar o id do product
    // Chamar ela aqui
  }

  async deletePromotion(promotion: any) {
    this.loadService.showLoading()

    const id = await this.db.getPromotionId(promotion)

    this.db.deletePromotion(id)
      .then(() => this.getPromotions())
      .then(() => this.cancel())
      .then(() => this.loadService.hideLoading())
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

    dialog.afterClosed().subscribe((res: any) => {
      this.promotionProducts = res
    })
  }

}
