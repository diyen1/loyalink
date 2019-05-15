import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DmfbFileUploadModule} from '../file-upload/dmfb-file-upload.module';
import {DmfbAuthModule} from '../auth/dmfb-auth.module';
import {DmfbCrudModule} from '../crud/dmfb-crud.module';
import {CustomerRoutingModule} from './customer-routing.module';
import {RouterModule} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {StaffComponent} from './staff/staff.component';
import {FaqComponent} from './faq/faq.component';
import {AboutUsComponent} from './about-us/about-us.component';
import {SharedModule} from '../shared/shared.module';
import {ArtistsComponent} from './artists/artists.component';
import {ArtistComponent} from './artist/artist.component';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {ArtistSingleComponent} from './artist-single/artist-single.component';

const components = [
  HomeComponent,
  AboutUsComponent,
  StaffComponent,
  FaqComponent,
  ArtistsComponent,
  ArtistComponent,
  ArtistSingleComponent,
];

@NgModule({
  declarations: [
    ... components
  ],
  entryComponents: [],
  imports: [
    CommonModule,
    RouterModule,
    DmfbFileUploadModule,
    DmfbAuthModule,
    FormsModule,
    DmfbCrudModule,
    ReactiveFormsModule,
    InfiniteScrollModule,
    SharedModule,
    // CustomerRoutingModule,
  ],
  exports: [],
  providers: [],
  bootstrap: []
})
export class DmfbCustomerModule {
}
