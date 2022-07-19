import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './components/admin/admin.component';
import { CartComponent } from './components/cart/cart.component';
import { ListComponent } from './components/list/list.component';
import { MainComponent } from './components/main/main.component';
import { ProductComponent } from './components/product/product.component';
import { SearchComponent } from './components/search/search.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';

const routes: Routes = [
  { path: '',
    component: MainComponent },

  { path: 'cart',
    component: CartComponent },

  { path: 'list',
    component: ListComponent },

  { path: 'search/:value',
    component: SearchComponent },

  { path: 'product/:productName',
    component: ProductComponent },

  { path: 'admin',
    component: AdminComponent },

  { path: 'signIn',
    component:  SignInComponent},

  { path: 'signUp',
    component:  SignUpComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
