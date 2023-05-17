import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { CartComponent } from './components/cart/cart.component';
import { FavoriteListComponent } from './components/favorite-list/favorite-list.component';
import { HomeComponent } from './components/home/home.component';
import { MainComponent } from './components/main/main.component';
import { ProductComponent } from './components/product/product.component';
import { SearchComponent } from './components/search/search.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { UserComponentComponent } from './components/user-component/user-component.component';
import { AllOrdersComponent } from './components/user-orders/all-orders/all-orders.component';
import { UserOrderDetailComponent } from './components/user-orders/user-order-detail/user-order-detail.component';
import { NotFoundComponent } from './views/not-found/not-found.component';
import { NotificationsComponent } from './views/notifications/notifications.component';
import { OrderInfosComponent } from './views/orders/order-infos/order-infos.component';
import { OrdersListComponent } from './views/orders/orders-list/orders-list.component';
import { SuccessComponent } from './views/payment/success/success.component';
import { EditProductComponent } from './views/product/edit-product/edit-product.component';
import { NewProductComponent } from './views/product/new-product/new-product.component';
import { ProductListComponent } from './views/product/product-list/product-list.component';
import { PasswordRecoveryComponent } from './components/password-recovery/password-recovery.component';
import { PromotionsComponent } from './views/promotions/promotions.component';
import { AdminAuthGuard } from './auth/admin-auth.guard';
import { UserAuthGuard } from './auth/user-auth.guard';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [UserAuthGuard],
    canActivateChild: [UserAuthGuard],
    children: [
      { path: '', component: HomeComponent },
      { path: 'favoriteList', component: FavoriteListComponent },
      { path: 'cart', component: CartComponent},
      { path: 'user', component: UserComponentComponent},
      { path: 'allOrders', component: AllOrdersComponent },
      { path: 'order/:orderId', component: UserOrderDetailComponent },
      { path: 'product/:productId', component: ProductComponent },
      { path: 'success/:paymentId', component: SuccessComponent },
      { path: 'search/:searchWord', component: SearchComponent, data: { someData: 'teste' } },
    ]
  },

  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AdminAuthGuard],
    children: [
      { path: 'products', component: ProductListComponent },
      { path: 'products/newProduct', component: NewProductComponent },
      { path: 'products/editProduct/:productId', component: EditProductComponent },
      { path: 'promotions', component: PromotionsComponent },
      { path: 'orders', component: OrdersListComponent },
      { path: 'orders/:orderId', component: OrderInfosComponent },
      { path: 'notifications', component: NotificationsComponent },
    ]
  },

  { path: "signIn", component: SignInComponent },
  { path: "signUp", component: SignUpComponent },
  { path: "passwordRecovery", component: PasswordRecoveryComponent },
  { path: 'pageNotFound', component: NotFoundComponent },
  { path: '**', redirectTo: 'pageNotFound' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
