import { AdminComponent } from './components/admin/admin.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { ListComponent } from './components/list/list.component';
import { MainComponent } from './components/main/main.component';
import { ProductComponent } from './components/product/product.component';
import { SearchComponent } from './components/search/search.component';

const routes: Routes = [
  { path: '',
    component: MainComponent },

  { path: 'cart',
    component: CartComponent },

  { path: 'list',
    component: ListComponent },

  { path: 'search/:value',
    component: SearchComponent },

  { path: 'product',
    component: ProductComponent },

  { path: 'admin',
    component: AdminComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
