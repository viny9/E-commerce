import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  hidePassword:any = true
  hideConfirmPassword:any = true
  
  constructor() { }

  ngOnInit(): void {
  }

}
