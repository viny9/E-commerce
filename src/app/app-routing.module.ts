import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { AdminComponent } from './components/admin/admin.component';
import { CartComponent } from './components/cart/cart.component';
import { FavoriteListComponent } from './components/favorite-list/favorite-list.component';
import { MainComponent } from './components/main/main.component';
import { ProductComponent } from './components/product/product.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { UserComponentComponent } from './components/user-component/user-component.component';
import { NotificationsComponent } from './views/notifications/notifications.component';
import { OrderInfosComponent } from './views/orders/order-infos/order-infos.component';
import { OrdersListComponent } from './views/orders/orders-list/orders-list.component';
import { EditProductComponent } from './views/product/edit-product/edit-product.component';
import { NewProductComponent } from './views/product/new-product/new-product.component';
import { ProductListComponent } from './views/product/product-list/product-list.component';

const routes: Routes = [
  { path: "", component: MainComponent },
  { path: "signIn", component: SignInComponent },
  { path: 'product/:productId', component: ProductComponent },
  { path: "signUp", component: SignUpComponent },
  { path: 'favoriteList', component: FavoriteListComponent },
  { path: 'cart', component: CartComponent },
  { path: 'user', component: UserComponentComponent },
  // { path: '**', component: PageNotFound }, Os ** servem para paginas que não foram encontradas. Depois criar um componente para essa mensagem
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'products', component: ProductListComponent },
      { path: 'products/newProduct', component: NewProductComponent },
      { path: 'products/editProduct/:productId', component: EditProductComponent },
      { path: 'orders', component: OrdersListComponent },
      { path: 'orders/orderInfos', component: OrderInfosComponent },
      { path: 'notifications', component: NotificationsComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
