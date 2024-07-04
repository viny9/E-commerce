import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { ProductService } from 'src/app/core/services/product/product.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  public isSidebarOpen: boolean = false;
  public sidebarMode: any = '';
  public checked: boolean = false;
  public selected: string = '';
  private theme: string = localStorage['theme'];

  constructor(
    private db: ProductService,
    private authService: AuthService
  ) {
    this.db.updatedComponent.subscribe((res: any) => {
      this.selected = res;
    });
  }

  ngOnInit(): void {
    this.themeIcon();

    if (window.screen.width <= 768) {
      this.sidebarMode = 'over';
    } else {
      this.sidebarMode = 'side';
      this.isSidebarOpen = true;
    }
  }

  themeIcon() {
    const sun = document.querySelector('.sun');
    const moon = document.querySelector('.moon');

    if (this.theme === 'dark') {
      sun?.classList.toggle('hide');
      this.checked = true;
    } else {
      moon?.classList.toggle('hide');
      this.checked = false;
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

  closeSidebar(drawer: any) {
    if (window.screen.width <= 768) {
      drawer.toggle();
    }
  }

  signOut() {
    this.authService.logOut();
  }
}
