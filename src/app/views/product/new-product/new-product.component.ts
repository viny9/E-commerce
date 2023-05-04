import { ProductService } from '../../../services/product/product.service';
import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {

  form: any
  categorys: any
  imgs: any = []
  imgsFiles: any = []

  constructor(private db: ProductService, private storage: AngularFireStorage) { }

  ngOnInit(): void {
    this.createForm()
    this.categoryList()
  }

  createForm() {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
    })
  }

  categoryList() {
    this.db.getCategorys().subscribe((res: any) => {

      const categorys = res.docs.map((doc: any) => {
        return doc.data()
      })

      this.categorys = categorys
    })
  }

  selectedImgs(event: Event | any) {
    event.preventDefault()

    let files;
    switch (event.target.files) {
      case undefined:
        files = event.dataTransfer.files
        break;

      default:
        files = event.target.files
        break;
    }

    for (let file of files) {
      let size: any = file.size;
      let i = 0;
      const fileSizeExtension = ['Bytes', 'KB', 'MB', 'GB']

      while (size > 900) {
        size /= 1024;
        i++;
      }

      size = (Math.round(size * 100) / 100) + ' ' + fileSizeExtension[i];

      const imgInfos = {
        name: file.name,
        size: size,
        order: this.imgs.length + 1
      }

      this.imgs.push(imgInfos)
      this.imgsFiles.push(file)
    }
  }

  changeImgOrder(event: Event | any) {
    moveItemInArray(this.imgs, event.previousIndex, event.currentIndex)

    this.imgs.forEach((element: any) => {
      const imgs = this.imgs.map((element: any) => element.name)
      let index = imgs.indexOf(element.name) + 1

      element.order = index
    });
  }

  removeImg(selectedImg: any) {
    const imgs = this.imgs.map((i: any) => {
      return i.name
    })

    const files = this.imgsFiles.map((file: any) => {
      return file.name
    })

    const imgIndex = imgs.indexOf(selectedImg.name)
    const fileIndex = files.indexOf(selectedImg.name)

    this.imgs.splice(imgIndex, 1)
    this.imgsFiles.splice(fileIndex, 1)

    this.updateImgsOrder()
  }

  updateImgsOrder() {
    this.imgs.forEach((element: any) => {
      const imgs = this.imgs.map((element: any) => element.name)
      let index = imgs.indexOf(element.name) + 1

      element.order = index
    });
  }

  createProduct() {
    const product = this.form.value
    let price: any = Number(product.price)

    if (Number.isNaN(price)) {
      price = this.form.value.price
      price = price.replace(',', '.')
      price = Number(price)
    }

    product.price = price
    this.uploadImgs()
      .then((imgs: any) => product.imgs = imgs)
      .then(() => this.db.createProduct(product))
      .then(() => this.db.userMessages('Produto criado'))
      .then(() => this.db.navegate('admin/products'))

  }

  uploadImgs() {
    return new Promise((resolve, reject) => {

      const files = this.imgsFiles
      const imgs: any = []

      if (files.length === 0) {
        resolve([])
      }

      for (let file of files) {
        const filePath = `${this.form.value.name}/${file.name}`
        const fileRef = this.storage.ref(filePath)

        this.db.sendProductImg(filePath, file).snapshotChanges()
          .pipe(
            finalize(() => {
              fileRef.getDownloadURL().subscribe((url: any) => {
                const imgInfos = this.imgs.find((img: any) => img.name === file.name)
                imgInfos.url = url
                imgs.push(imgInfos)

                if (imgs.length === files.length) {
                  imgs.sort((a: any, b: any) => a.order - b.order)
                  resolve(imgs)
                }
              })
            })
          )
          .subscribe()
      }
    })
  }

  // Adds and removes a hover style when user drag a img to upload
  dragHoverIn(event: any) {
    event.preventDefault()

    const imgUploadArea = document.querySelector('#fileUploadLabel')
    imgUploadArea?.classList.add('dragHover')
  }

  dragHoverOut(event: any) {
    event.preventDefault()

    const imgUploadArea = document.querySelector('#fileUploadLabel')
    imgUploadArea?.classList.remove('dragHover')
  }
}
