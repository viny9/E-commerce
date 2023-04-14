import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SignInComponent } from 'src/app/components/sign-in/sign-in.component';
import { StripeService } from 'src/app/services/stripe/stripe.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-delete-account',
  templateUrl: './delete-account.component.html',
  styleUrls: ['./delete-account.component.css']
})
export class DeleteAccountComponent implements OnInit {

  password: any

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialog: MatDialogRef<SignInComponent>, private userService: UserService, private stripeService: StripeService,) { }

  ngOnInit(): void {
  }

  deleteAccount() {
    const user = {
      email: this.data.email,
      password: this.password
    }

    this.userService.deleteUser(user)
      .then(() => {
        this.stripeService.deleteCustomer(this.data.stripe_id).subscribe((res: any) => {
          this.userService.userMessages('Conta deletada')
        })
      })
      .then(() => this.userService.navegate('/signIn'))
      .then(() => this.dialog.close())
      .catch((e: any) => this.userService.userMessages(e))
  }
}
