import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ProductService } from 'src/app/services/product/product.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.css'],
})
export class HeadComponent implements OnInit {
  @Input() public isSidebarOpen!: any;
  public screenSize: number = window.screen.width;
  public logged: boolean = false;
  public searchInput: string = '';
  private theme: string = localStorage['theme'];

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.themeIcon();

    this.logged = this.authService.isLogged();
  }

  themeIcon() {
    const sun = document.querySelector('.sun');
    const moon = document.querySelector('.moon');

    if (this.theme === 'dark') {
      sun?.classList.toggle('hide');
    } else {
      moon?.classList.toggle('hide');
    }
  }

  themeToggle() {
    const sun = document.querySelector('.sun');
    const moon = document.querySelector('.moon');

    if (this.theme == 'dark') {
      this.theme = 'light';
      sun?.classList.remove('hideAnimation');
      moon?.classList.remove('showAnimation');

      sun?.classList.toggle('showAnimation');
      moon?.classList.toggle('hideAnimation');

      localStorage.setItem('theme', 'light');
      document.body.classList.toggle('lightMode');
    } else {
      this.theme = 'dark';
      sun?.classList.remove('showAnimation');
      moon?.classList.remove('hideAnimation');

      sun?.classList.toggle('hideAnimation');
      moon?.classList.toggle('showAnimation');

      document.body.classList.toggle('lightMode');
      localStorage.setItem('theme', 'dark');
    }
  }

  search() {
    this.router.navigate([`search/${this.searchInput}`]);
  }
}
