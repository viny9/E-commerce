import { ProductService } from './services/product.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private db:ProductService) { 
    this.log = this.db.logged 
  }

  log:any

  title = 'E-commerce';
}
