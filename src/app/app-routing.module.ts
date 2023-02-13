import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { CartComponent } from './components/cart/cart.component';
import { FavoriteListComponent } from './components/favorite-list/favorite-list.component';
import { MainComponent } from './components/main/main.component';
import { ProductComponent } from './components/product/product.component';
import { UserComponentComponent } from './components/user-component/user-component.component';

const routes: Routes = [
  { path: "", component: MainComponent },
  { path: 'product/:productId', component: ProductComponent },
  { path: 'favoriteList', component: FavoriteListComponent },
  { path: 'cart', component:  CartComponent },
  { path: 'user', component:  UserComponentComponent },
  { path: 'admin', component:  AdminComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
