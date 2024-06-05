import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

//Componentes
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { MainComponent } from './components/main/main.component';
import { HeadComponent } from './components/head/head.component'
import { FavoriteListComponent } from './components/favorite-list/favorite-list.component';
import { ProductComponent } from './components/product/product.component';
import { CartComponent } from './components/cart/cart.component';
import { UserComponentComponent } from './components/user-component/user-component.component';
import { FooterComponent } from './components/footer/footer.component';
import { AdminComponent } from './components/admin/admin.component';
import { ProductListComponent } from './views/product/product-list/product-list.component';
import { NewProductComponent } from './views/product/new-product/new-product.component';
import { EditProductComponent } from './views/product/edit-product/edit-product.component';
import { OrderInfosComponent } from './views/orders/order-infos/order-infos.component';
import { OrdersListComponent } from './views/orders/orders-list/orders-list.component';
import { NotificationsComponent } from './views/notifications/notifications.component';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './views/not-found/not-found.component';
import { SearchComponent } from './components/search/search.component';
import { DialogCategoryComponent } from './views/product/dialog-category/dialog-category.component';
import { SuccessComponent } from './views/payment/success/success.component';
import { AllOrdersComponent } from './components/user-orders/all-orders/all-orders.component';
import { UserOrderDetailComponent } from './components/user-orders/user-order-detail/user-order-detail.component';
import { LoadingComponent } from './views/loading/loading.component';
import { PasswordRecoveryComponent } from './components/password-recovery/password-recovery.component';
import { DeleteAccountComponent } from './views/delete-account/delete-account.component';
import { DialogUpdateUserComponent } from './views/dialog-update-user/dialog-update-user.component';
import { PromotionsComponent } from './views/promotions/promotions.component';
import { DialogAddProductPromotionComponent } from './views/dialog-add-product-promotion/dialog-add-product-promotion.component';
import { AdminUsersListComponent } from './views/adminUser/admin-users-list/admin-users-list.component';
import { CreateAdminUserComponent } from './views/adminUser/create-admin-user/create-admin-user.component';
import { environment } from './../environments/environment';

//Angular Material
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table'
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatSortModule } from '@angular/material/sort'
import { MatSelectModule } from '@angular/material/select';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatChipsModule } from '@angular/material/chips';
import { MatTreeModule } from '@angular/material/tree';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { TextMaskModule } from 'angular2-text-mask';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent,
    MainComponent,
    HeadComponent,
    ProductComponent,
    FavoriteListComponent,
    CartComponent,
    UserComponentComponent,
    FooterComponent,
    AdminComponent,
    ProductListComponent,
    NewProductComponent,
    EditProductComponent,
    OrderInfosComponent,
    OrdersListComponent,
    NotificationsComponent,
    HomeComponent,
    NotFoundComponent,
    SearchComponent,
    DialogCategoryComponent,
    SuccessComponent,
    AllOrdersComponent,
    UserOrderDetailComponent,
    LoadingComponent,
    PasswordRecoveryComponent,
    DeleteAccountComponent,
    DialogUpdateUserComponent,
    PromotionsComponent,
    DialogAddProductPromotionComponent,
    AdminUsersListComponent,
    CreateAdminUserComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatListModule,
    MatSidenavModule,
    MatDividerModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSelectModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatSlideToggleModule,
    MatDialogModule,
    TextMaskModule,
    HttpClientModule,
    MatProgressBarModule,
    MatChipsModule,
    MatTreeModule,
    MatAutocompleteModule,
    DragDropModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
