import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdminRoutes } from 'src/app/enums/admin-routes';
import { LoadService } from 'src/app/services/load/load.service';
import { ProductService } from 'src/app/services/product/product.service';
import { UserService } from 'src/app/services/user/user.service';
import { DeleteAccountComponent } from '../../delete-account/delete-account.component';

@Component({
  selector: 'app-admin-users-list',
  templateUrl: './admin-users-list.component.html',
  styleUrls: ['./admin-users-list.component.css']
})
export class AdminUsersListComponent implements OnInit {

  dataSource: any
  columns: string[] = ['name', 'email', 'actions']

  constructor(private db: ProductService, private userService: UserService, private loadService: LoadService, private dialog: MatDialog) {
    db.selectComponent = AdminRoutes.adminUsers
  }

  ngOnInit(): void {
    this.getUsers()
  }

  getUsers() {
    this.loadService.showLoading()

    this.userService.getAdminUsers().subscribe((res) => {
      this.dataSource = res.docs.map((user: any) => {
        return user.data()
      })
      this.loadService.hideLoading()
    })
  }

  async editPage(user: any) {
    const id = await this.db.getId('users', user)
    this.db.navegate(`admin/adminUsersList/editAdminUser/${id}`)
  }

  async deleteUser(user: any) {
    const userId = sessionStorage['userId']
    const id = await this.db.getId('users', user)

    if (userId === id) {
      user.id = id

      this.dialog.open(DeleteAccountComponent, {
        width: '500px',
        height: '300px',
        data: user
      })

    } else {
      (await this.userService.deleteUserAsAdmin(user)).subscribe(() => {
        this.userService.userMessages('Usuário removido com sucesso')
        this.getUsers()
      })
    }
  }

}
