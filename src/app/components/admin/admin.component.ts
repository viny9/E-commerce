import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteProductComponent } from 'src/app/views/delete-product/delete-product.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  dataSource = [
    {name: 'PS5',
    price: 'R$500',}
  ]
  columns = ['position', 'name', 'price', 'actions']
  component:String = ''

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  recive(event:any) {
    this.component = event
  }

  openDelete() {
    this.dialog.open(DeleteProductComponent, {
      width: '500px'
    })
  }

}
