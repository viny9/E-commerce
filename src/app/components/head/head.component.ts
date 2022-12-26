import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.css']
})
export class HeadComponent implements OnInit {

  theme: any

  constructor() { }

  ngOnInit(): void {
    this.themeStatus()
  }

  themeStatus() {
    this.theme = localStorage.getItem('theme')

    const sun = document.querySelector('.sun')
    const moon = document.querySelector('.moon')

    if (this.theme === "dark") {
      sun?.classList.toggle('hide')
    } else {
      moon?.classList.toggle('hide')
      document.body.classList.toggle('lightMode')
    }
  }

  themeIconToggle() {
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
}
