import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {RouterModule} from '@angular/router';
import {routes} from './routes';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {environment} from '../environments/environment';
import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabase} from 'angularfire2/database';
import {AngularFireAuth} from 'angularfire2/auth';
import {AuthGuard} from './auth.guard';
import {DmfbAdminModule} from './modules/admin/dmfb-admin.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {DmfbCustomerModule} from './modules/customer/dmfb-customer.module';
import {SharedModule} from './modules/shared/shared.module';

// import {OnlineStatusModule} from 'ngx-online-status';

@NgModule({
  declarations: [
    AppComponent,
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
