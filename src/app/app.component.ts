import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'E-commerce';

  ngOnInit() {
    const theme = localStorage['theme']

    if (theme == "dark") {
      document.body.classList.toggle('darkMode')

    } else {
      document.body.classList.toggle('lightMode')
    }
  }

}
