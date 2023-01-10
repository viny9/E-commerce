import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { FavoriteListComponent } from './components/favorite-list/favorite-list.component';
import { MainComponent } from './components/main/main.component';
import { ProductComponent } from './components/product/product.component';
import { UserComponentComponent } from './components/user-component/user-component.component';

const routes: Routes = [
  { path: "", component: MainComponent },
  { path: 'product', component: ProductComponent },
  { path: 'favoriteList', component: FavoriteListComponent },
  { path: 'cart', component:  CartComponent },
  { path: 'user', component:  UserComponentComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
