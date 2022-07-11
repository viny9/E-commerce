import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-product',
  templateUrl: './delete-product.component.html',
  styleUrls: ['./delete-product.component.css']
})
export class DeleteProductComponent implements OnInit {

  constructor(private ref:MatDialogRef<DeleteProductComponent>) { }

  ngOnInit(): void {
  }

  close() {
    this.ref.close()
  }
}
