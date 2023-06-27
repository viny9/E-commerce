import { FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  hide: boolean = true
  signinForm!: FormGroup

  constructor(private userService: UserService) { }

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
    this.userService.signIn(this.signinForm.value)
  }

}
