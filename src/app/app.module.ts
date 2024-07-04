import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';

//Componentes
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { MainComponent } from './pages/main/main.component';
import { HeadComponent } from './layout/head/head.component';
import { FavoriteListComponent } from './pages/favorite-list/favorite-list.component';
import { ProductComponent } from './pages/product/product.component';
import { CartComponent } from './pages/cart/cart.component';
import { UserComponentComponent } from './pages/user-component/user-component.component';
import { FooterComponent } from './layout/footer/footer.component';
import { AdminComponent } from './pages/admin/admin.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { NewProductComponent } from './pages/new-product/new-product.component';
import { EditProductComponent } from './pages/edit-product/edit-product.component';
import { OrderInfosComponent } from './pages/order-infos/order-infos.component';
import { OrdersListComponent } from './pages/orders-list/orders-list.component';
import { NotificationsComponent } from './pages/notifications/notifications.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { SearchComponent } from './pages/search/search.component';
import { DialogCategoryComponent } from './components/dialogs/dialog-category/dialog-category.component';
import { SuccessComponent } from './pages/success/success.component';
import { AllOrdersComponent } from './pages/all-orders/all-orders.component';
import { UserOrderDetailComponent } from './pages/user-order-detail/user-order-detail.component';
import { LoadingComponent } from './components/loading/loading.component';
import { PasswordRecoveryComponent } from './pages/password-recovery/password-recovery.component';
import { DeleteAccountComponent } from './components/dialogs/delete-account/delete-account.component';
import { DialogUpdateUserComponent } from './components/dialogs/dialog-update-user/dialog-update-user.component';
import { PromotionsComponent } from './pages/promotions/promotions.component';
import { DialogAddProductPromotionComponent } from './components/dialogs/dialog-add-product-promotion/dialog-add-product-promotion.component';
import { AdminUsersListComponent } from './pages/admin-users-list/admin-users-list.component';
import { CreateAdminUserComponent } from './pages/create-admin-user/create-admin-user.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { CarouselComponent } from './components/carousel/carousel.component';

//Angular Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
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
import { MatStepperModule } from '@angular/material/stepper';

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
    ProductCardComponent,
    CarouselComponent,
  ],
  bootstrap: [AppComponent],
  imports: [
    AppRoutingModule,
    BrowserModule,
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
    MatProgressBarModule,
    MatChipsModule,
    MatTreeModule,
    MatAutocompleteModule,
    DragDropModule,
    MatStepperModule,
  ],
  providers: [provideHttpClient(withInterceptorsFromDi())],
})
export class AppModule {}
