import {CommonModule} from '@angular/common';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DmfbFileUploadModule} from '../file-upload/dmfb-file-upload.module';
import {AdminNavComponent} from './admin-nav/nav.component';
import {DmfbAuthModule} from '../auth/dmfb-auth.module';
import {DmfbCrudModule} from '../crud/dmfb-crud.module';
import {AdminRoutingModule} from './admin-routing.module';
import {AdminShopComponent} from './shop/admin-shop.component';
import {DmfbAdminComponent} from './dmfb-admin.component';
import {AdminUsersComponent} from './users/admin-users.component';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {DateCellComponent} from './cells/date-cell/date-cell.component';
import {PriceCellComponent} from './cells/price-cell/price-cell.component';
import {AdminDashboardComponent} from './dashboard/admin-dashboard.component';
import {RouterModule} from '@angular/router';
import {ImageCellComponent} from './cells/image-cell/image-cell.component';
import {PrimaryCellComponent} from './cells/primary-cell/primary-cell.component';
import {AdminEditServiceComponent} from './admin-edit-profile/admin-edit-service.component';
import {YesNoCellComponent} from './cells/yes-no-cell/yes-no-cell.component';
import {SharedModule} from '../shared/shared.module';
import {AdminArtistsComponent} from './artists/admin-artists.component';
import {AdminAddArtistComponent} from './add-artist/admin-add-artist.component';
import {DescriptionCellComponent} from './cells/description-cell/description-cell.component';
import {AdminEditArtistComponent} from './edit-artist/admin-edit-artist.component';

const components = [
  DmfbAdminComponent,
  AdminDashboardComponent,
  AdminShopComponent,
  AdminNavComponent,
  AdminUsersComponent,
  AdminArtistsComponent,
  AdminEditServiceComponent,
  AdminAddArtistComponent,
  AdminEditArtistComponent,
];

const entryComponents = [
  DateCellComponent,
  PriceCellComponent,
  ImageCellComponent,
  PrimaryCellComponent,
  YesNoCellComponent,
  DescriptionCellComponent,
];

@NgModule({
  declarations: [
    ... components,
    ... entryComponents
  ],
  entryComponents: [
    ... entryComponents
  ],
  imports: [
    CommonModule,
    RouterModule,
    Ng2SmartTableModule,
    DmfbFileUploadModule,
    DmfbAuthModule,
    FormsModule,
    DmfbCrudModule,
    ReactiveFormsModule,
    SharedModule,
    // CustomerRoutingModule,
  ],
  exports: [
    AdminNavComponent,
  ],
  providers: [],
  bootstrap: []
})
export class DmfbAdminModule { }
