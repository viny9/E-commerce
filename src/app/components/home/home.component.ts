import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadService } from 'src/app/services/load/load.service';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  imgss = [
    {
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6qohwBsxr9feBDPKQhVRqcgP2zT4d8diCRw&usqp=CAU",
      imgNumber: 3
    },
    {
      url: "https://api-rayashop.freetls.fastly.net/media/offers/1672647578965.jpg",
      imgNumber: 2
    },
    {
      url: "https://thumbs.dreamstime.com/b/panorama-horizontal-do-c%C3%A9u-das-nuvens-wispy-o-vento-da-alta-altitude-varreu-no-com-azul-147437736.jpg",
      imgNumber: 1
    },

  ]
  products: any[] = []
  imgNumber: number = 1
  loading: boolean = true
  promotionPrice: any[] = []

  constructor(private db: ProductService, private loadService: LoadService, private route: Router) {
    loadService.isLoading.subscribe((res) => {
      this.loading = res
    })
  }

  ngOnInit(): void {
    this.allProducts()
  }

  allProducts() {
    this.loadService.showLoading()

    this.db.getProducts().subscribe((res) => {
      this.products = res.docs.map((doc) => {
        return doc.data()
      })

      this.loadService.hideLoading()
    })
  }

  async selectProduct(product: any) {
    const id = await this.db.getId(this.db.path.products, product)
    this.route.navigate([`product/${id}`])
  }

  // Carrousel improvisado criar outro depois
  next() {
    this.imgNumber = ++this.imgNumber
    const maxImgs = this.imgss.length
    this.imgNumber > maxImgs ? this.imgNumber = 1 : this.imgNumber

    const lastImg: any = document.querySelector(`.img${this.imgNumber - 1 === 0 ? maxImgs : this.imgNumber - 1}`)
    const img = document.querySelector(`.img${this.imgNumber}`)

    if (img?.classList[1] === 'nextHide') {

      img?.classList.remove('nextHide')
      img?.classList.toggle('nextShow')

      lastImg.classList.remove('nextShow')
      lastImg.classList.toggle('nextHide')

    } else if (img?.classList[1] === undefined) {

      img?.classList.toggle('nextShow')
      lastImg?.classList.remove('nextShow')
      lastImg?.classList.toggle('nextHide')

    } else if (img?.classList[1] != undefined && 'nextHide' && 'nextShow') {

      img?.classList.remove('backHide')
      lastImg?.classList.remove('backShow')
      lastImg?.classList.remove('nextShow')

      img?.classList.toggle('nextShow')
      lastImg?.classList.toggle('nextHide')

    }

  }

  prev() {
    this.imgNumber = --this.imgNumber
    this.imgNumber < 1 ? this.imgNumber = 3 : this.imgNumber

    const img = document.querySelector(`.img${this.imgNumber}`)
    const lastImg: any = document.querySelector(`.img${this.imgNumber === 3 ? 1 : this.imgNumber + 1}`)

    if (img?.classList[1] === 'backHide') {

      img?.classList.remove('backHide')
      img?.classList.toggle('backShow')

      lastImg.classList.remove('backShow')
      lastImg.classList.toggle('backHide')

    } else if (img?.classList[1] != undefined && 'backHide' && 'backShow') {

      img?.classList.remove('nextHide')
      lastImg?.classList.remove('nextShow')
      lastImg?.classList.remove('backShow')

      img?.classList.toggle('backShow')
      lastImg?.classList.toggle('backHide')

    } else if (img?.classList[1] === undefined) {

      img?.classList.toggle('backShow')
      lastImg?.classList.remove('backShow')
      lastImg?.classList.toggle('backHide')

    }
  }
}