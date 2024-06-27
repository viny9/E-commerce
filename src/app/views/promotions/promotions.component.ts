import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { LoadService } from 'src/app/services/load/load.service';
import { ProductService } from 'src/app/services/product/product.service';
import { DialogAddProductPromotionComponent } from '../dialog-add-product-promotion/dialog-add-product-promotion.component';
import { AdminRoutes } from 'src/app/enums/admin-routes';
import { Promotion } from 'src/app/models/promotion';
import { Product } from 'src/app/models/product';
import { PromotionService } from 'src/app/services/promotion/promotion.service';

@Component({
  selector: 'app-promotions',
  templateUrl: './promotions.component.html',
  styleUrls: ['./promotions.component.css'],
})
export class PromotionsComponent implements OnInit {
  public columns: string[] = ['name', 'start', 'finish', 'actions'];
  public dataSource: any;
  public form!: UntypedFormGroup;
  public id: string = '';
  public selected: boolean = false;
  public promotionProducts: any;
  public selectedPromotion: Promotion[] = [];

  constructor(
    private productService: ProductService,
    private promotionService: PromotionService,
    private loadService: LoadService,
    private dialog: MatDialog
  ) {
    productService.selectComponent = AdminRoutes.promotions;
  }

  ngOnInit(): void {
    this.createForm();
    this.getPromotions();
  }

  createForm(promotionInfos?: Promotion) {
    this.form = new UntypedFormGroup({
      name: new UntypedFormControl(promotionInfos?.name),
      description: new UntypedFormControl(promotionInfos?.description),
      start: new UntypedFormControl(promotionInfos?.start),
      end: new UntypedFormControl(promotionInfos?.end),
    });
  }

  getPromotions() {
    this.loadService.showLoading();

    this.promotionService.getPromotions().subscribe((res) => {
      this.dataSource = res.map((doc: any) => {
        const start = new Date(doc.start);
        const end = new Date(doc.end);

        doc.start = `${start.getDate() + 1}/${
          start.getMonth() + 1
        }/${start.getFullYear()}`;
        doc.end = `${end.getDate() + 1}/${
          end.getMonth() + 1
        }/${end.getFullYear()}`;

        return doc;
      });

      this.loadService.hideLoading();
    });
  }

  // Adicionar o disabled no button
  async selectPromotion(promotion: Promotion) {
    this.selected = true;

    this.promotionService
      .getPromotionById(promotion.id)
      .subscribe((res: any) => {
        this.selectedPromotion = res;

        this.createForm(res);
      });
  }

  async updatePromotion() {
    const promotion = {
      ...this.form.value,
      products: this.promotionProducts.selectedProducts,
    };

    if (this.promotionProducts.deletedProducts.length > 0) {
      this.removeProductPromotion(this.promotionProducts.deletedProducts);
    }

    this.loadService.showLoading();

    await this.promotionService.updatePromotion(this.id, promotion);
    await Promise.all([
      (this.selectedPromotion = []),
      this.addProductPromotion(),
      this.getPromotions(),
      this.cancel(),
      this.loadService.hideLoading(),
    ]);
  }

  async newPromotion() {
    this.loadService.showLoading();

    const promotion = {
      ...this.form.value,
      products: this.promotionProducts.selectedProducts,
    };

    await this.promotionService.createPromotion(promotion);

    await Promise.all([
      this.addProductPromotion(),
      this.getPromotions(),
      this.cancel(),
      this.loadService.hideLoading(),
    ]);
  }

  addProductPromotion() {
    // this.promotionProducts?.selectedProducts.forEach(
    //   async (product: Product) => {
    //     const percentage = product.promotionInfos!.percentage / 100;
    //     let promotionPrice = product.price - product.price * percentage;
    //     promotionPrice = Math.round(promotionPrice * 100) / 100;
    //     delete product.edit;
    //     product.promotionInfos!.name = this.form.value.name;
    //     product.promotionInfos!.promotionPrice = promotionPrice;
    //     const id = await this.productService.getId(
    //       this.productService.path.products,
    //       product
    //     );
    //     await this.productService.editProduct(id, product);
    //     this.selectedPromotion = [];
    // }
    // );
  }

  removeProductPromotion(products: Product[]) {
    // products.forEach(async (product: any) => {
    //   product.promotionInfos = null;
    //   delete product.edit;
    //   await this.productService.editProduct(id, product);
    // });
  }

  async deletePromotion(promotion: Promotion) {
    this.loadService.showLoading();

    this.promotionService.deletePromotion(promotion.id).subscribe(() => {
      this.removeProductPromotion(promotion.products);
    });

    await Promise.all([
      this.getPromotions(),
      this.cancel(),
      this.loadService.hideLoading(),
    ]);
  }

  cancel() {
    this.selected = false;
    this.createForm();
  }

  openDialog() {
    const dialog = this.dialog.open(DialogAddProductPromotionComponent, {
      width: '500px',
      height: '500px',
      panelClass: 'dialog',
      data: this.selectedPromotion,
    });

    dialog.afterClosed().subscribe((res: Product[]) => {
      this.promotionProducts = res;
    });
  }
}
