import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AdminRoutes } from 'src/app/shared/enums/admin-routes';
import { LoadService } from 'src/app/services/load/load.service';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-edit-admin-user',
  templateUrl: './edit-admin-user.component.html',
  styleUrls: ['./edit-admin-user.component.css'],
})
export class EditAdminUserComponent implements OnInit {
  form!: any;
  loading: boolean = false;
  oldEmail: string = '';

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private loadService: LoadService
  ) {
    loadService.isLoading.subscribe((res) => {
      this.loading = res;
    });

    // db.selectComponent = AdminRoutes.adminUsers;
  }

  ngOnInit(): void {
    this.getUser();
  }

  createForm(userInfos?: any) {
    this.form = new UntypedFormGroup({
      name: new UntypedFormControl(userInfos?.name, Validators.required),
      email: new UntypedFormControl(userInfos?.email, [
        Validators.required,
        Validators.email,
      ]),
    });
  }

  getUser() {
    this.loadService.showLoading();

    this.route.params.subscribe((res) => {
      const id = res['userId'];

      this.userService.getUserById(id).subscribe((res) => {
        this.createForm(res.data());
        this.oldEmail = res.data().email;

        this.loadService.hideLoading();
      });
    });
  }

  async updateUser() {
    // this.form.value.oldEmail = this.oldEmail;
    // (await this.userService.updateUserAsAdmin(this.form.value)).subscribe(() => {
    //   this.userService.userMessages('Usuário atualizado com sucesso')
    //   this.db.navegate('admin/adminUsersList')
    // })
  }
}
