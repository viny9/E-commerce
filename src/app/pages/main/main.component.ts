import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  public logged: boolean = false;
  public checked: boolean = false;
  private theme: string | null = localStorage['theme'];
  private isSidebarOpen: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.themeIcon();

    this.logged = this.authService.isLogged();
  }

  themeIcon() {
    const sun = document.querySelector('#sun');
    const moon = document.querySelector('#moon');

    if (this.theme === 'dark') {
      sun?.classList.toggle('hide');
      this.checked = true;
    } else {
      moon?.classList.toggle('hide');
      this.checked = false;
    }
  }

  themeToggle() {
    const sun = document.querySelector('#sun');
    const moon = document.querySelector('#moon');

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
}
