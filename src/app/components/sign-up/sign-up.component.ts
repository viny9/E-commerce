import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor(private route: Router) { }

  ngOnInit(): void {
  }

  teste() {
    this.route.navigate(['/signIn']).then(() => {
      window.location.reload()
    })
  }

}
