import { Component, OnInit } from '@angular/core';
import { LoadService } from 'src/app/services/load/load.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {

  loading: any

  constructor(private loadService: LoadService) {
    loadService.isLoading.subscribe((res) => {
      this.loading = res
    })
  }

  ngOnInit(): void {
  }

}
