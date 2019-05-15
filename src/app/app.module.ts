import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
// import {MdlModule} from '@angular-mdl/core';
import {RouterModule} from '@angular/router';
import {routes} from './routes';
// import {ShopComponent} from './shop/shop.component';
// import {SearchComponent} from './search/search.component';
// import {ProfileComponent} from './profile/profile.component';
// import {ServiceSingleComponent} from './service-single/service-single.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
// import {SellerProfileComponent} from './seller-profile/seller-profile.component';
// import {AddServiceComponent} from './add-service/add-service.component';
import {environment} from '../environments/environment';
import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabase} from 'angularfire2/database';
import {AngularFireAuth} from 'angularfire2/auth';
// import {UtilsModule} from './modules/utils/utils.module';
import {AuthGuard} from './auth.guard';
// import {DmfbCrudModule} from './modules/crud/dmfb-crud.module';
// import {DmfbAuthModule} from './modules/auth/dmfb-auth.module';
// import {EditServiceComponent} from './edit-service/edit-service.component';
// import {ServicesListComponent} from './services-list/services-list.component';
// import {InfiniteScrollModule} from 'ngx-infinite-scroll';
// import {TokenInterceptor} from './interceptors/token.interceptor';
// import {HTTP_INTERCEPTORS} from '@angular/common/http';
// import {SlideshowModule} from 'ng-simple-slideshow';
// import {EditProfileComponent} from './edit-profile/edit-profile.component';
import {DmfbAdminModule} from './modules/admin/dmfb-admin.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {DmfbCustomerModule} from './modules/customer/dmfb-customer.module';
import {SharedModule} from './modules/shared/shared.module';

// import {OnlineStatusModule} from 'ngx-online-status';

@NgModule({
  declarations: [
    AppComponent,
    // ShopComponent,
    // SearchComponent,
    // ProfileComponent,
    // ServiceSingleComponent,
    // ProfileComponent,
    // SellerProfileComponent,
    // AddServiceComponent,
    // EditServiceComponent,
    // ServicesListComponent,
    // EditProfileComponent,
  ],
  imports: [
    // DmfbCrudModule,
    // DmfbAuthModule,
    BrowserModule,
    // MdlModule,
    FormsModule,
    ReactiveFormsModule,
    // UtilsModule,
    // SlideshowModule,
    NgbModule,
    SharedModule,
    // OnlineStatusModule,
    AngularFireModule.initializeApp(environment.firebase),
    DmfbAdminModule,
    DmfbCustomerModule,
    RouterModule.forRoot(routes),
  ],
  providers: [
    AngularFireDatabase,
    AngularFireAuth,
    AuthGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}