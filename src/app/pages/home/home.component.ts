import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/interfaces/Product';
import { LoadService } from 'src/app/services/load/load.service';
import { ProductService } from 'src/app/core/services/product/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public imgss = [ // Remove later
    {
      id: '1',
      url: 'https://thumbs.dreamstime.com/b/panorama-horizontal-do-c%C3%A9u-das-nuvens-wispy-o-vento-da-alta-altitude-varreu-no-com-azul-147437736.jpg',
      imgNumber: 1,
    },
    {
      id: '2',
      url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6qohwBsxr9feBDPKQhVRqcgP2zT4d8diCRw&usqp=CAU',
      imgNumber: 3,
    },
    {
      id: '3',
      url: 'https://api-rayashop.freetls.fastly.net/media/offers/1672647578965.jpg',
      imgNumber: 2,
    },
  ];
  public products: Product[] = [];
  constructor(private productService: ProductService, private loadService: LoadService) {}

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts() {
    this.loadService.showLoading();

    this.productService.getProducts().subscribe((res) => {
      this.products = res;
      this.loadService.hideLoading();
    });
  }
}