import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProductService } from 'src/app/services/product/product.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.css']
})
export class HeadComponent implements OnInit {

  theme = localStorage['theme']
  logged: boolean = false
  searchInput: string = ''
  @Input() isSidebarOpen!: any
  screenSize: number = window.screen.width

  constructor(private db: ProductService, private userService: UserService) { }

  ngOnInit(): void {
    this.themeIcon()

    this.logged = this.userService.isLogged()
  }

  themeIcon() {
    const sun = document.querySelector('.sun')
    const moon = document.querySelector('.moon')

    if (this.theme === "dark") {
      sun?.classList.toggle('hide')
    } else {
      moon?.classList.toggle('hide')
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

  search() {
    localStorage.setItem('search', this.searchInput)

    this.db.navegate(`search/${this.searchInput}`)
  }
}
