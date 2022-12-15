import { CssSelector } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  imgs = [
    {url: 'https://images.tcdn.com.br/static_inst/meiosdepagamento/wp-content/uploads/2021/07/opencommerces.jpg '},
    {url: 'https://images.tcdn.com.br/static_inst/meiosdepagamento/wp-content/uploads/2021/07/opencommerces.jpg '},
    
  ]

  constructor() { }
  
  ngOnInit(): void {
  }

  toRight() {
    const teste = document.querySelector('.teste2')
    
    teste?.classList.toggle('teste3')
    teste?.classList.remove('teste')
  }
  
  toLeft() {
    const teste = document.querySelector('.teste2')

    teste?.classList.toggle('teste')
    teste?.classList.remove('teste3')
  }
}
