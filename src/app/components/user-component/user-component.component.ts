import { AuthService } from './../../services/auth/auth.service';
import { NoopScrollStrategy } from '@angular/cdk/overlay';
import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { User } from 'src/app/models/user';
import { LoadService } from 'src/app/services/load/load.service';
import { ProductService } from 'src/app/services/product/product.service';
import { UserService } from 'src/app/services/user/user.service';
import { DeleteAccountComponent } from 'src/app/views/delete-account/delete-account.component';

@Component({
  selector: 'app-user-component',
  templateUrl: './user-component.component.html',
  styleUrls: ['./user-component.component.css'],
})
export class UserComponentComponent implements OnInit {
  user!: User;
  userForm!: UntypedFormGroup;
  addressForm!: UntypedFormGroup;
  mask: any;
  loading: boolean = false;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private loadService: LoadService,
    private dialog: MatDialog
  ) {
    loadService.isLoading.subscribe((res) => {
      this.loading = res;
    });
  }

  ngOnInit(): void {
    this.userInfos();
    this.createForms();
  }

  userInfos() {
    this.loadService.showLoading();

    this.userService.getUsers().subscribe((res) => {
      const users = res;

      this.userService.getUserById('').subscribe((res: any) => {
        const filter = users.filter((user: any) => {
          return user.email === res.email;
        });

        this.user = filter[0];
        this.createForms(this.user);
      });

      this.loadService.hideLoading();
    });
  }

  createForms(userInfos?: any) {
    this.userForm = new UntypedFormGroup({
      name: new UntypedFormControl(userInfos?.name),
      email: new UntypedFormControl(userInfos?.email),
      phone: new UntypedFormControl(userInfos?.phone),
    });

    this.addressForm = new UntypedFormGroup({
      cep: new UntypedFormControl(userInfos?.address.cep),
      number: new UntypedFormControl(userInfos?.address.number),
      neighborhood: new UntypedFormControl(userInfos?.address.neighborhood),
      city: new UntypedFormControl(userInfos?.address.city),
      state: new UntypedFormControl(userInfos?.address.state),
      extra: new UntypedFormControl(userInfos?.address.extra),
    });
  }

  signOut() {
    this.authService.logOut();
  }

  updateUserInfos() {
    this.userService.getUserById('').subscribe(async (res: User) => {
      const email = res.email;

      const user = {
        ...this.user,
        ...this.userForm.value,
        oldEmail: email,
      };

      const address = this.addressForm.value;
      user.address = address;

      user.address.cep = user.address.cep.replace(/\D/g, ''); //Removendo a mask do valor
      user.phone = user.phone.replace(/\D/g, ''); //Removendo a mask do valor

      await this.userService.updateUser(res.id, user);
      this.userInfos();
    });
  }

  openDialog() {
    this.userService.getUserById('').subscribe((res) => {
      const user = res.data();

      this.dialog.open(DeleteAccountComponent, {
        data: user,
        width: '500px',
        scrollStrategy: new NoopScrollStrategy(),
      });
    });
  }
}
