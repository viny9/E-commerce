import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.component.html',
  styleUrls: ['./password-recovery.component.css']
})
export class PasswordRecoveryComponent implements OnInit {

  email: any
  code: any
  sendedCode: any

  constructor(private userSevice: UserService) { }

  ngOnInit(): void {
  }

  formChangeAnimationControl(component: string) {
    const emailForm = document.querySelector('.emailForm')
    const codeForm = document.querySelector('.codeForm')
    const backBtn = document.querySelector('.backIcon')

    switch (component) {
      case 'code':
        emailForm?.classList.add('none')
        backBtn?.classList.add('none')

        codeForm?.classList.remove('none')
        codeForm?.classList.add('moveRightAnimation')
        break;

      case 'email':
        codeForm?.classList.add('none')

        backBtn?.classList.remove('none')
        backBtn?.classList.add('showAnimation')

        emailForm?.classList.remove('none')
        emailForm?.classList.add('moveLeftAnimation')
        break
    }
  }

  sendCodeEmail() {
    this.userSevice.getUsers().subscribe((res: any) => {
      const users = res.docs.map((doc: any) => {
        return doc.data()
      })

      const user = users.filter((user: any) => {
        return user.email === this.email
      })

      if (user[0]) {
        this.userSevice.sendVerificationCodeEmail(this.email).subscribe((res: any) => {
          this.sendedCode = res.code
        })
      }
    })

    this.formChangeAnimationControl('code')
  }

  checkEmailCode() {
    if (this.code === this.sendedCode) {
      this.userSevice.sendPasswordResetEmail(this.email)
    }
  }

  return() {
    this.formChangeAnimationControl('email')
    this.code = ''
  }

}
