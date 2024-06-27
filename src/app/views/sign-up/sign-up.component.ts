import { userMessages } from './../../utils/snackbar';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SignUp } from 'src/app/models/signup';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  public signupForm!: FormGroup;
  public hidePassword: boolean = true;
  public hideConfirmPassword: boolean = true;
  public isFormValid: boolean = false;

  constructor(
    private authService: AuthService,
    private snackBack: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.signupForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required),
    });
  }

  createUser() {
    const isValid: boolean = this.checkIsFormValid();
    const formValue = this.signupForm.value;

    if (isValid) {
      const signUpData: SignUp = {
        name: formValue.name,
        email: formValue.email,
        phone: this.cleanPhoneNumber(formValue.phone),
        password: formValue.password,
      };

      this.authService.signUp(signUpData);
    }
  }

  checkIsFormValid() {
    const { phone, password, confirmPassword } = this.signupForm.value;

    if (!this.isValidPhoneNumber(phone)) {
      userMessages('Telefone inválido', this.snackBack);
      return false;
    }

    if (confirmPassword !== password) {
      userMessages('Senhas estão diferentes', this.snackBack);
      return false;
    }

    if (password < 6) {
      userMessages('Senhas deve ter no mínimo 6 carateres', this.snackBack);
      return false;
    }

    return true;
  }

  formatPhoneNumber(phoneNumber: string) {
    const cleaned = phoneNumber.replace(/\D/g, '');
    if (cleaned.length > 10) {
      return cleaned.replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3');
    } else {
      return cleaned.replace(/^(\d{2})(\d{4})(\d{4}).*/, '($1) $2-$3');
    }
  }

  cleanPhoneNumber(phoneNumber: string) {
    const cleaned = phoneNumber.replace(/\D/g, '');
    if (cleaned === '') return '';
    const withoutParentheses = cleaned.replace(/[(|)]/g, '');
    return withoutParentheses;
  }

  isValidPhoneNumber(phoneNumber: string) {
    const cleaned = phoneNumber.replace(/\D/g, '');
    const isMobile = /^[1-9]{2}9[0-9]{8}$/.test(cleaned);
    const isLandline = /^[1-9]{2}[2-6][0-9]{7}$/.test(cleaned);

    return isMobile || isLandline;
  }
}
