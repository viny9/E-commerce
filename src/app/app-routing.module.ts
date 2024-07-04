import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './pages/admin/admin.component';
import { CartComponent } from './pages/cart/cart.component';
import { FavoriteListComponent } from './pages/favorite-list/favorite-list.component';
import { HomeComponent } from './pages/home/home.component';
import { MainComponent } from './pages/main/main.component';
import { ProductComponent } from './pages/product/product.component';
import { SearchComponent } from './pages/search/search.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { UserComponentComponent } from './pages/user-component/user-component.component';
import { AllOrdersComponent } from './pages/all-orders/all-orders.component';
import { UserOrderDetailComponent } from './pages/user-order-detail/user-order-detail.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { NotificationsComponent } from './pages/notifications/notifications.component';
import { OrderInfosComponent } from './pages/order-infos/order-infos.component';
import { OrdersListComponent } from './pages/orders-list/orders-list.component';
import { SuccessComponent } from './pages/success/success.component';
import { EditProductComponent } from './pages/edit-product/edit-product.component';
import { NewProductComponent } from './views/product/new-product/new-product.component';
import { ProductListComponent } from './views/product/product-list/product-list.component';
import { PasswordRecoveryComponent } from './pages/password-recovery/password-recovery.component';
import { PromotionsComponent } from './pages/promotions/promotions.component';
import { AdminAuthGuard } from './core/guards/admin/admin-auth.guard';
import { UserAuthGuard } from './core/guards/user/user-auth.guard';
import { AdminUsersListComponent } from './pages/admin-users-list/admin-users-list.component';
import { CreateAdminUserComponent } from './pages/create-admin-user/create-admin-user.component';
import { EditAdminUserComponent } from './pages/edit-admin-user/edit-admin-user.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [UserAuthGuard],
    canActivateChild: [UserAuthGuard],
    children: [
      { path: '', component: HomeComponent },
      { path: 'favoriteList', component: FavoriteListComponent },
      { path: 'cart', component: CartComponent },
      { path: 'user', component: UserComponentComponent },
      { path: 'allOrders', component: AllOrdersComponent },
      { path: 'order/:orderId', component: UserOrderDetailComponent },
      { path: 'product/:productId', component: ProductComponent },
      { path: 'success/:paymentId', component: SuccessComponent },
      {
        path: 'search/:searchWord',
        component: SearchComponent,
        data: { someData: 'teste' },
      },
    ],
  },

  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AdminAuthGuard],
    children: [
      { path: 'products', component: ProductListComponent },
      { path: 'products/newProduct', component: NewProductComponent },
      {
        path: 'products/editProduct/:productId',
        component: EditProductComponent,
      },
      { path: 'promotions', component: PromotionsComponent },
      { path: 'orders', component: OrdersListComponent },
      { path: 'orders/:orderId', component: OrderInfosComponent },
      { path: 'notifications', component: NotificationsComponent },
      { path: 'adminUsersList', component: AdminUsersListComponent },
      {
        path: 'adminUsersList/createAdminUser',
        component: CreateAdminUserComponent,
      },
      {
        path: 'adminUsersList/editAdminUser/:userId',
        component: EditAdminUserComponent,
      },
    ],
  },

  { path: 'signIn', component: SignInComponent },
  { path: 'signUp', component: SignUpComponent },
  { path: 'passwordRecovery', component: PasswordRecoveryComponent },
  { path: 'pageNotFound', component: NotFoundComponent },
  { path: '**', redirectTo: 'pageNotFound' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
