import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {

  @Output() home = new EventEmitter()
  form:any
  imgs:any = []
  infos:any = []
  gif:any

  constructor(private product:ProductService) { }

  ngOnInit(): void {
    this.createForm()
  }

  createForm() {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
    })

    this.form.controls.name.setValue(undefined)
  }

  createProduct() {
    this.product.createProduct(this.form.value)
  }

  imgUpload(event:any) {
    const files = event.srcElement.files[0]
      this.product.upload(`products/${this.form.value.name}/${files.name}`, files).percentageChanges().subscribe((res:any) => {
      if(res < 100) {
      this.gif = true
    } else if(res >= 100) {
      this.gif = false
      this.imgInfos(files)
    }
  })
}

  imgInfos(img:any) {
        this.product.getImg(img.name, this.form.value.name).subscribe((res:any) => {
        
        this.infos.push(img.name)
        this.imgs.push(res)
        this.form.value.img = this.imgs
        this.form.value.imgName = this.infos
      })
  }

  cancel() {
    if(this.form.value.name != undefined && this.infos.length != 0) {
      for (let i = 0; i < this.imgs.length; i++) {
        this.product.deleteImg(this.form.value.name, this.form.value.imgName[i]).subscribe()
      }
    } else {
      return 
    }
  }

}
