import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadService {

  // Futuramente pensar em fazer um load para quem entrar no site
  loadingCount: any = 0;
  private isLoadingSubject: any = new BehaviorSubject<any>(false)
  isLoading = this.isLoadingSubject.asObservable()

  constructor() { }

  showLoading() {
    this.isLoadingSubject.next(true)
  }

  hideLoading() {
    while (this.loadingCount > 0) {
      this.loadingCount--;
    }

    if (this.loadingCount <= 0) {
      this.loadingCount = 0;
      this.isLoadingSubject.next(false)
    }
  }
}
