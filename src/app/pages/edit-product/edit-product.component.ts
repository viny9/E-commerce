import { moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { Product } from 'src/app/shared/interfaces/Product';
import { CategoryService } from 'src/app/core/services/category/category.service';
import { LoadService } from 'src/app/services/load/load.service';
import { ProductService } from 'src/app/core/services/product/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
})
export class EditProductComponent implements OnInit {
  product!: Product;
  categorys: any[] = [];
  editForm!: UntypedFormGroup;
  imgs: any[] = [];
  newImgs: any[] = [];
  imgsFiles: any[] = [];
  removedImgs: any[] = [];
  loading: boolean = false;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private loadService: LoadService,
    private route: ActivatedRoute
  ) {
    loadService.isLoading.subscribe((res) => {
      this.loading = res;
    });
  }

  ngOnInit(): void {
    this.getProduct();
    this.categoryList();
  }

  getProduct() {
    this.loadService.showLoading();

    this.route.params.subscribe((res) => {
      const id = res['productId'];

      this.productService.getProductById(id).subscribe((res: any) => {
        this.product = res;
        this.imgs = this.product.imgs;
        this.createForm(this.product);
      });
    });
  }

  categoryList() {
    this.categoryService.getCategorys().subscribe((res) => {
      this.categorys = res;
      this.loadService.hideLoading();
    });
  }

  createForm(product?: any) {
    this.editForm = new UntypedFormGroup({
      name: new UntypedFormControl(product?.name, [Validators.required]),
      price: new UntypedFormControl(product?.price, [Validators.required]),
      category: new UntypedFormControl(product?.category, [Validators.required]),
    });
  }

  addImgs(event: any) {
    event.preventDefault();

    let files;
    switch (event.target.files) {
      case undefined:
        files = event.dataTransfer.files;
        break;

      default:
        files = event.target.files;
        break;
    }

    for (let file of files) {
      let size: any = file.size;
      let i = 0;
      const fileSizeExtension = ['Bytes', 'KB', 'MB', 'GB'];

      while (size > 900) {
        size /= 1024;
        i++;
      }

      size = Math.round(size * 100) / 100 + ' ' + fileSizeExtension[i];

      const imgInfos = {
        name: file.name,
        size: size,
        order: this.imgs.length + 1,
      };

      this.imgs.push(imgInfos);
      this.newImgs.push(imgInfos);
      this.imgsFiles.push(file);
    }
  }

  changeImgOrder(event: any) {
    moveItemInArray(this.imgs, event.previousIndex, event.currentIndex);
    this.updateImgsOrder();
  }

  removeImg(selectedImg: any) {
    const imgs = this.imgs.map((i: any) => {
      return i.name;
    });

    const index = imgs.indexOf(selectedImg.name);
    this.imgs.splice(index, 1);

    const newImgs: Array<any> = this.newImgs.map((img: any) => {
      return img.name;
    });

    const newImgsFile = this.imgsFiles.map((img: any) => {
      return img.name;
    });

    switch (newImgs.includes(selectedImg.name)) {
      case true:
        const newImgIndex = newImgs.indexOf(selectedImg.name);
        const fileIndex = newImgsFile.indexOf(selectedImg.name);

        this.imgsFiles.splice(fileIndex, 1);
        this.newImgs.splice(newImgIndex, 1);
        break;

      case false:
        this.removedImgs.push(selectedImg.url);
        break;
    }

    this.updateImgsOrder();
  }

  updateImgsOrder() {
    this.imgs.forEach((element: any) => {
      const imgs = this.imgs.map((img) => img.name);
      const index = imgs.indexOf(element.name) + 1;

      element.order = index;
    });
  }

  updateProduct() {
    const product = {
      ...this.product,
      ...this.editForm.value,
    };

    product.price = Number(product.price);

    // this.route.params.subscribe(async (res: any) => {
    //   if (this.removedImgs.length > 0) {
    //     this.removedImgs.forEach((img: any) => {
    //       this.db.deleteProductImg(img).subscribe();
    //     });
    //   }

      // await this.uploadImgs();
      // await this.db.editProduct(res.productId, product);
      // await Promise.all([
      //   this.db.navegate('admin/products'),
      //   this.db.userMessages('Produto Editado'),
      // ]);
    // });
  }

   uploadImgs() {
    const files = this.imgsFiles;
    const imgs: any = [];

    // if (files.length === 0 || this.imgs.length === 0) {
    //   return null;
    // }

    for (let file of files) {
      // const filePath = `${this.editForm.value.name}/${file.name}`;
      // const fileRef = this.storage.ref(filePath);

      // await this.db.addProductImg(filePath, file);

      // const url = await lastValueFrom(fileRef.getDownloadURL());
      // const imgInfos = this.imgs.find((img) => img.name === file.name);

      // imgInfos.url = url;
      // imgs.push(imgInfos);

      // if (imgs.length === files.length) {
      //   imgs.sort((a: any, b: any) => a.order - b.order);
      //   return imgs;
      // }
    }
  }

  // Adds and removes a hover style when user drag a img to upload
  dragHoverIn(event: Event) {
    event.preventDefault();

    const imgUploadArea = document.querySelector('#fileUploadLabel');
    imgUploadArea?.classList.add('dragHover');
  }

  dragHoverOut(event: Event) {
    event.preventDefault();

    const imgUploadArea = document.querySelector('#fileUploadLabel');
    imgUploadArea?.classList.remove('dragHover');
  }
}
