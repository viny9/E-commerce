import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { ProductService } from '../services/product/product.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

  constructor(private db: ProductService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = localStorage['token'] || sessionStorage['token']
    const admin = eval(localStorage['admin']) || eval(sessionStorage['admin'])

    if (token && admin === true) {
      return true
    } else {
      this.db.navegate('')
      return false
    }
  }
}
