import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SignInComponent } from 'src/app/components/sign-in/sign-in.component';
import { ErrorsService } from 'src/app/services/errors/errors.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-delete-account',
  templateUrl: './delete-account.component.html',
  styleUrls: ['./delete-account.component.css'],
})
export class DeleteAccountComponent implements OnInit {
  password: string = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialogRef<SignInComponent>,
    private userService: UserService,
    private errorsService: ErrorsService
  ) {}

  ngOnInit(): void {}

  async deleteAccount() {
    // const user = {
    //   email: this.data.email,
    //   password: this.password,
    //   stripe_id: this.data.stripe_id,
    //   id: this.data.id,
    // };

    // if (!this.data.admin) {
    //   await this.userService.deleteUser(user);
    //   await Promise.all([this.userService.logOut(), this.dialog.close()]);
    // } else {
    //   delete user.stripe_id;

    //   try {
    //     await this.auth.signInWithEmailAndPassword(user.email, user.password);
    //     await getAuth().currentUser?.delete();
    //     await this.firestore.collection('users').doc(user.id).delete();

    //     await Promise.all([this.userService.logOut(), this.dialog.close()]);
    //   } catch (error) {
    //     this.errorsService.handleError(error);
    //   }
    // }
  }
}
