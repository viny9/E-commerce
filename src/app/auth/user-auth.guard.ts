import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, CanActivateChild, UrlTree } from '@angular/router';
import { ProductService } from '../services/product/product.service';

@Injectable({
  providedIn: 'root'
})
export class UserAuthGuard implements CanActivate, CanActivateChild {

  constructor(private db: ProductService) { }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = localStorage['token'] || sessionStorage['token']
    const admin = eval(localStorage['admin']) || eval(sessionStorage['admin'])

    if (token && admin === false) {
      return true
    } else if (token && admin === true) {
      this.db.navegate('/admin/products')
      return false
    } else {
      return true
    }
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = localStorage['token']
    const routeName = childRoute.routeConfig?.path

    enum routes {
      userComponent = 'user',
      orders = 'allOrders',
      order = 'order/:orderId'
    }

    const blockedRoutes = routeName === routes.userComponent || routeName === routes.orders || routeName === routes.order

    if (blockedRoutes && token === undefined) {
      this.db.navegate('')
      return false
    } else {
      return true
    }


  }
}
