import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-component',
  templateUrl: './user-component.component.html',
  styleUrls: ['./user-component.component.css']
})
export class UserComponentComponent implements OnInit {

  teste:boolean = true
  open:any = 'password'

  constructor() { }

  ngOnInit(): void {
  }

  changeComponent(component:string) {
    this.open = component
  }

}
