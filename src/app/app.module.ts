import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

//Componentes
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SignInComponent } from './views/sign-in/sign-in.component';
import { SignUpComponent } from './views/sign-up/sign-up.component';
import { MainComponent } from './components/main/main.component';
import { HeadComponent } from './components/head/head.component';
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

//Angular Material
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacyListModule as MatListModule } from '@angular/material/legacy-list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { MatLegacyTableModule as MatTableModule } from '@angular/material/legacy-table';
import { MatLegacyPaginatorModule as MatPaginatorModule } from '@angular/material/legacy-paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatLegacyCheckboxModule as MatCheckboxModule } from '@angular/material/legacy-checkbox';
import { MatLegacySnackBarModule as MatSnackBarModule } from '@angular/material/legacy-snack-bar';
import { MatLegacySlideToggleModule as MatSlideToggleModule } from '@angular/material/legacy-slide-toggle';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatLegacyProgressBarModule as MatProgressBarModule } from '@angular/material/legacy-progress-bar';
import { MatLegacyChipsModule as MatChipsModule } from '@angular/material/legacy-chips';
import { MatTreeModule } from '@angular/material/tree';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatLegacyAutocompleteModule as MatAutocompleteModule } from '@angular/material/legacy-autocomplete';
import { MatStepperModule } from '@angular/material/stepper';

import { TextMaskModule } from 'angular2-text-mask';

@NgModule({ declarations: [
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
    bootstrap: [AppComponent], imports: [BrowserModule,
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
        MatProgressBarModule,
        MatChipsModule,
        MatTreeModule,
        MatAutocompleteModule,
        DragDropModule,
        MatStepperModule], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class AppModule {}
