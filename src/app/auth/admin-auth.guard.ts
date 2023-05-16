import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { ProductService } from '../services/product/product.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

  constructor(private db: ProductService, private auth: AngularFireAuth) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = localStorage['token']
    const admin = eval(localStorage['admin'])

    if (token && admin === true) {
      return true
    } else {
      this.db.navegate('')
      return false
    }
  }

}
