import { AuthService } from '../../services/auth/auth.service';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  hide: boolean = true
  signinForm!: UntypedFormGroup

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.createForm()
  }

  createForm() {
    this.signinForm = new UntypedFormGroup({
      email: new UntypedFormControl(),
      password: new UntypedFormControl()
    })
  }

  login() {
    this.authService.login(this.signinForm.value)
  }

}
