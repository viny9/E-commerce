import { AuthService } from './../../services/auth/auth.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  hide: boolean = true
  signinForm!: FormGroup

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.createForm()
  }

  createForm() {
    this.signinForm = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    })
  }

  login() {
    this.authService.login(this.signinForm.value)
  }

}
