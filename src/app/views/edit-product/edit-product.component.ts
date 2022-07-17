import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  @Output() home = new EventEmitter()
  @Input() recive:any
  form:any
  img:any
  gif:any = false
  add:any = []

  constructor(private product:ProductService) { }

  ngOnInit(): void {
    this.createForm()
    this.img = this.recive.img
  }

  createForm() {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required])
    })

    this.form.controls.name.setValue(this.recive.name)
    this.form.controls.price.setValue(this.recive.price)
  }

  editProduct() {
    this.product.updateProduct(this.recive.id, this.form.value)
  }

  addImg (event:any) {
    const file = event.srcElement.files[0] 
    this.product.upload(`products/${this.recive.name}/${file.name}`, file).percentageChanges().subscribe((res:any) => {
      if(res < 100) {
        this.gif = true
      } else if(res === 100) {
        this.gif = false
        this.imgInfos(file)
      }
    })
  }

  imgInfos(img:any) { 
    this.product.getImg(img.name, this.recive.name).subscribe((res:any) => {
      const newProd = {
        imgName: img.name,
        product: this.recive.name
      }

      this.img.push(res)
      this.add.push(newProd)
      this.recive.imgName.push(img.name)

      this.form.value.img = this.img
      this.form.value.imgName = this.recive.imgName
    })
  }

  changeImg(event:any) {
    this.product.changeImg(this.recive.imgName, event.srcElement.files[0]).percentageChanges().subscribe((res:any) => {
      if(res < 100) {
        this.gif = true
      } else if(res >= 100) {
        this.gif = false
        this.product.getImg(this.recive.imgName, this.form.value.name).subscribe((res:any) => {
          this.img = res
        })
      }
    })
  }

  cancel() {
    for (let i = 0; i < this.add.length; i++) {
      this.product.deleteImg(this.add[i].product, this.add[i].imgName).subscribe(() => {
      })
      window.location.reload()
    }
  }

}
