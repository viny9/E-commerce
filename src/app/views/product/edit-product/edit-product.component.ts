import { moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs';
import { LoadService } from 'src/app/services/load/load.service';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  product: any
  categorys: any
  editForm: any
  imgs: any = []
  newImgs: any = []
  imgsFiles: any = []
  removedImgs: any = []
  loading: any = false

  constructor(private db: ProductService, private loadService: LoadService, private route: ActivatedRoute, private storage: AngularFireStorage) {
    loadService.isLoading.subscribe((res: any) => {
      this.loading = res
    })
  }

  ngOnInit(): void {
    this.getProduct()
    this.categoryList()
  }

  getProduct() {
    this.loadService.showLoading()

    this.route.params.subscribe((res: any) => {

      const id = res.productId

      this.db.getProductById(id).subscribe((res: any) => {
        this.product = res.data()
        this.imgs = this.product.imgs
        this.createForm(this.product)
      })
    })
  }

  categoryList() {
    this.db.getCategorys().subscribe((res: any) => {

      const categorys = res.docs.map((doc: any) => {
        return doc.data()
      })

      this.categorys = categorys

      this.loadService.hideLoading()
    })
  }

  createForm(product?: any) {
    this.editForm = new FormGroup({
      name: new FormControl(product?.name, [Validators.required]),
      price: new FormControl(product?.price, [Validators.required]),
      category: new FormControl(product?.category, [Validators.required]),
    })
  }

  addImgs(event: Event | any) {
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
      this.newImgs.push(imgInfos)
      this.imgsFiles.push(file)
    }
  }

  changeImgOrder(event: Event | any) {
    moveItemInArray(this.imgs, event.previousIndex, event.currentIndex)
    this.updateImgsOrder()
  }

  removeImg(selectedImg: any) {
    const imgs = this.imgs.map((i: any) => {
      return i.name
    })

    const index = imgs.indexOf(selectedImg.name)
    this.imgs.splice(index, 1)

    const newImgs: Array<any> = this.newImgs.map((img: any) => {
      return img.name
    })

    const newImgsFile = this.imgsFiles.map((img: any) => {
      return img.name
    })

    switch (newImgs.includes(selectedImg.name)) {
      case true:
        const newImgIndex = newImgs.indexOf(selectedImg.name)
        const fileIndex = newImgsFile.indexOf(selectedImg.name)

        this.imgsFiles.splice(fileIndex, 1)
        this.newImgs.splice(newImgIndex, 1)
        break;

      case false:
        this.removedImgs.push(selectedImg.url)
        break;
    }

    this.updateImgsOrder()
  }

  updateImgsOrder() {
    this.imgs.forEach((element: any) => {
      const imgs = this.imgs.map((element: any) => element.name)
      let index = imgs.indexOf(element.name) + 1

      element.order = index
    });
  }

  updateProduct() {
    const product = {
      ...this.product,
      ...this.editForm.value
    }

    // Terminar depois
    // if (this.editForm.value.name != this.product.name) {
    //   this.db.updateProductImgRef(this.product.name, this.editForm.value.name)
    // }

    product.price = Number(product.price)

    this.route.params.subscribe((res: any) => {

      if (this.removedImgs.length > 0) {
        this.removedImgs.forEach((img: any) => {
          this.db.deleteProductImg(img).subscribe()
        });
      }

      this.uploadImgs()
        .then(() => this.db.editProduct(res.productId, product))
        .then(() => this.db.navegate('admin/products'))
        .then(() => this.db.userMessages('Produto Editado'))
    })
  }

  uploadImgs() {
    return new Promise((resolve, reject) => {

      const files = this.imgsFiles
      const imgs: any = []

      if (files.length === 0 || this.imgs.length === 0) {
        resolve(null)
      }

      for (let file of files) {
        const filePath = `${this.editForm.value.name}/${file.name}`
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
