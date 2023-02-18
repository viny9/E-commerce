import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  selected:string = 'products'

  constructor(private db:ProductService) { }

  ngOnInit(): void {
  }

  signOut() {
    this.db.logOut()
  }

  

}
