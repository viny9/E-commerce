import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-favorite-list',
  templateUrl: './favorite-list.component.html',
  styleUrls: ['./favorite-list.component.css']
})
export class FavoriteListComponent implements OnInit {

  favorite:boolean = false
  empty:boolean = true

  constructor() { }

  ngOnInit(): void {
  }

}
