import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadService {

  // Futuramente pensar em fazer um load para quem entrar no site
  private isLoadingSubject = new BehaviorSubject<boolean>(false)
  isLoading = this.isLoadingSubject.asObservable()

  constructor() { }

  showLoading() {
    this.isLoadingSubject.next(true)
  }

  hideLoading() {
    this.isLoadingSubject.next(false)
  }
}
