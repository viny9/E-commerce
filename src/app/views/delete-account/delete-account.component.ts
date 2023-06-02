import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SignInComponent } from 'src/app/components/sign-in/sign-in.component';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-delete-account',
  templateUrl: './delete-account.component.html',
  styleUrls: ['./delete-account.component.css']
})
export class DeleteAccountComponent implements OnInit {

  password: string = ''

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialog: MatDialogRef<SignInComponent>, private userService: UserService) { }

  ngOnInit(): void {
  }

  async deleteAccount() {
    const user = {
      email: this.data.email,
      password: this.password,
      stripe_id: this.data.stripe_id
    }

    await this.userService.deleteUser(user)
    await Promise.all([this.userService.navegate('/signIn'), this.dialog.close()])
  }
}
