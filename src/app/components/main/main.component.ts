import { UserService } from 'src/app/services/user/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  theme: string | null = localStorage['theme']
  logged:boolean = false
  isSidebarOpen: boolean = false
  checked: boolean = false

  constructor(private userService:UserService) { }

  ngOnInit() {
    this.themeIcon()

    this.logged = this.userService.isLogged()
  }

  themeIcon() {
    const sun = document.querySelector('#sun')
    const moon = document.querySelector('#moon')


    if (this.theme === "dark") {
      sun?.classList.toggle('hide')
      this.checked = true
    } else {
      moon?.classList.toggle('hide')
      this.checked = false
    }
  }

  themeToggle() {
    const sun = document.querySelector('#sun')
    const moon = document.querySelector('#moon')

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

}
