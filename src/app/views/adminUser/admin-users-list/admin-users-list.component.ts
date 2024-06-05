import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdminRoutes } from 'src/app/enums/admin-routes';
import { LoadService } from 'src/app/services/load/load.service';
import { ProductService } from 'src/app/services/product/product.service';
import { UserService } from 'src/app/services/user/user.service';
import { DeleteAccountComponent } from '../../delete-account/delete-account.component';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-admin-users-list',
  templateUrl: './admin-users-list.component.html',
  styleUrls: ['./admin-users-list.component.css'],
})
export class AdminUsersListComponent implements OnInit {
  dataSource: any;
  columns: string[] = ['name', 'email', 'actions'];

  constructor(
    private userService: UserService,
    private loadService: LoadService,
    private dialog: MatDialog,
    private router: Router
  ) {
    // db.selectComponent = AdminRoutes.adminUsers;
  }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.loadService.showLoading();

    this.userService.getAdminUsers().subscribe((res) => {
      this.dataSource = res.docs.map((user: any) => {
        return user.data();
      });
      this.loadService.hideLoading();
    });
  }

  async editPage(user: User) {
    this.router.navigate([`admin/adminUsersList/editAdminUser/${user.id}`]);
  }

  async deleteUser(user: User) {
    const userId = sessionStorage['userId'];

    if (userId === user.id) {

      this.dialog.open(DeleteAccountComponent, {
        width: '500px',
        height: '300px',
        data: user,
      });
    } else {
      // (await this.userService.deleteUserAsAdmin(user)).subscribe(() => {
      //   this.userService.userMessages('Usuário removido com sucesso')
      //   this.getUsers()
      // })
    }
  }
}
