import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserComponentComponent } from 'src/app/components/user-component/user-component.component';
import { StripeService } from 'src/app/services/stripe/stripe.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-dialog-update-user',
  templateUrl: './dialog-update-user.component.html',
  styleUrls: ['./dialog-update-user.component.css']
})
export class DialogUpdateUserComponent implements OnInit {

  password: any

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialog: MatDialogRef<UserComponentComponent>, private userService: UserService) { }

  ngOnInit(): void {
  }

  updateAccount() {
    this.data.password = this.password

    this.userService.updateUserWithLogin(this.data)
      .then(() => this.dialog.close())
  }

}
