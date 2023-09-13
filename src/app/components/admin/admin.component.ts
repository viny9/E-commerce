import { Component, OnInit } from '@angular/core';
import { AdminRoutes } from 'src/app/enums/admin-routes';
import { ProductService } from 'src/app/services/product/product.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  selected: string = ''
  theme: string | null = localStorage['theme']
  checked: boolean = false
  routes = AdminRoutes
  sidebarMode:any = ''
  isSidebarOpen:boolean = false

  constructor(private userService: UserService, private db: ProductService) {
    db.updatedComponent.subscribe((res: any) => {
      this.selected = res
    })
  }

  ngOnInit(): void {
    this.themeIcon()

    if(window.screen.width <= 768){
      this.sidebarMode = 'over'
    } else {
      this.sidebarMode = 'side'
      this.isSidebarOpen = true
    }
  }

  themeIcon() {
    const sun = document.querySelector('.sun')
    const moon = document.querySelector('.moon')

    if (this.theme === "dark") {
      sun?.classList.toggle('hide')
      this.checked = true
    } else {
      moon?.classList.toggle('hide')
      this.checked = false
    }
  }

  themeToggle() {
    const sun = document.querySelector('.sun')
    const moon = document.querySelector('.moon')

    if (this.theme == "dark") {
      this.theme = 'light'
      sun?.classList.remove('hideAnimation')
      moon?.classList.remove('showAnimation')

      sun?.classList.toggle('showAnimation')
      moon?.classList.toggle('hideAnimation')

      localStorage.setItem('theme', 'light')
      document.body.classList.toggle('lightMode')

    } else {
      this.theme = 'dark'
      sun?.classList.remove('showAnimation')
      moon?.classList.remove('hideAnimation')

      sun?.classList.toggle('hideAnimation')
      moon?.classList.toggle('showAnimation')

      document.body.classList.toggle('lightMode')
      localStorage.setItem('theme', 'dark')
    }
  }

  signOut() {
    this.userService.logOut()
  }
}
