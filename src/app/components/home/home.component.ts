import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

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
  products: any = []
  imgNumber: any = 1

  constructor(private db: ProductService, private route: Router) { }

  // Quando fazer o componente de promoções e na hora do cliente bota a img para a promo no carrousel você adiciona um input para categoria 
  // Assim você adicina como param na url e redireciona para as promoções daquela categoria.

  ngOnInit(): void {
    this.allProducts()
  }

  allProducts() {
    this.db.getProducts().subscribe((data: any) => {
      data.docs.map((data: any) => {
        this.products.push(data.data())
      })
    })
  }

  selectProduct(product: any) {
    this.db.getProductId(product)

    setTimeout(() => {
      this.route.navigate([`product/${this.db.productId}`])
    }, 500);

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