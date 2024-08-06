import { ProductService } from '../../core/services/product/product.service';
import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import { moveItemInArray } from '@angular/cdk/drag-drop';
import { Product } from 'src/app/shared/interfaces/Product';
import { CategoryService } from 'src/app/core/services/category/category.service';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css'],
})
export class NewProductComponent implements OnInit {
  form!: UntypedFormGroup;
  categorys: any[] = [];
  imgs: Product['imgs'] = [];
  imgsFiles: any[] = [];

  constructor(
    private db: ProductService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.categoryList();
  }

  createForm() {
    this.form = new UntypedFormGroup({
      name: new UntypedFormControl('', [Validators.required]),
      price: new UntypedFormControl('', [Validators.required]),
      category: new UntypedFormControl('', [Validators.required]),
    });
  }

  categoryList() {
    this.categoryService.getCategorys().subscribe((res) => {
      this.categorys = res;
    });
  }

  selectedImgs(event: any) {
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

      const imgInfos: any = {
        name: file.name,
        size: size,
        order: this.imgs.length + 1,
      };

      this.imgs.push(imgInfos);
      this.imgsFiles.push(file);
    }
  }

  changeImgOrder(event: any) {
    moveItemInArray(this.imgs, event.previousIndex, event.currentIndex);

    this.imgs.forEach((element: any) => {
      const imgs = this.imgs.map((element: any) => element.name);
      let index = imgs.indexOf(element.name) + 1;

      element.order = index;
    });
  }

  removeImg(selectedImg: any) {
    const imgs = this.imgs.map((i) => {
      // return i.name;
    });

    const files = this.imgsFiles.map((file: any) => {
      return file.name;
    });

    const imgIndex = imgs.indexOf(selectedImg.name);
    const fileIndex = files.indexOf(selectedImg.name);

    this.imgs.splice(imgIndex, 1);
    this.imgsFiles.splice(fileIndex, 1);

    this.updateImgsOrder();
  }

  updateImgsOrder() {
    this.imgs.forEach((element) => {
      // const imgs = this.imgs.map((img) => img.name);
      // let index = imgs.indexOf(element.name) + 1;

      // element.order = index;
    });
  }

  async createProduct() {
    const product = this.form.value;
    let price: any = Number(product.price);

    if (Number.isNaN(price)) {
      price = this.form.value.price;
      price = price.replace(',', '.');
      price = Number(price);
    }

    const imgs = await this.uploadImgs();
    product.price = price;
    product.imgs = imgs;

    await this.db.createProduct(product);
    // await Promise.all([
    //   this.db.userMessages('Produto criado'),
    //   this.db.navegate('admin/products'),
    // ]);
  }

  async uploadImgs() {
    const files = this.imgsFiles;
    const imgs: any = [];

    if (files.length === 0) {
      return [];
    }

    for (let file of files) {
      // const filePath = `${this.form.value.name}/${file.name}`;
      // const fileRef = this.storage.ref(filePath);

      // await this.db.addProductImg(filePath, file);

      // const url: string = await lastValueFrom(fileRef.getDownloadURL());
      // const imgInfos: any = this.imgs.find((img) => img.name === file.name);

      // imgInfos.url = url;
      // imgs.push(imgInfos);

      if (imgs.length === files.length) {
        imgs.sort((a: any, b: any) => a.order - b.order);
        return imgs;
      }
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
