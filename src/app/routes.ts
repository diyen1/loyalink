import {Routes} from '@angular/router';
import {HomeComponent} from './modules/customer/home/home.component';
import {DmfbAdminComponent} from './modules/admin/dmfb-admin.component';
import {AdminDashboardComponent} from './modules/admin/dashboard/admin-dashboard.component';
import {LoginComponent} from './modules/auth/login/login.component';
import {AdminUsersComponent} from './modules/admin/users/admin-users.component';
import {AdminArtistsComponent} from './modules/admin/artists/admin-artists.component';
import {AdminAddArtistComponent} from './modules/admin/add-artist/admin-add-artist.component';
import {ArtistsComponent} from './modules/customer/artists/artists.component';
import {ArtistSingleComponent} from './modules/customer/artist-single/artist-single.component';
import {AboutUsComponent} from './modules/customer/about-us/about-us.component';
import {StaffComponent} from './modules/customer/staff/staff.component';
import {FaqComponent} from './modules/customer/faq/faq.component';
import {AdminEditArtistComponent} from './modules/admin/edit-artist/admin-edit-artist.component';

export const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'about-us', component: AboutUsComponent},
  {path: 'staff', component: StaffComponent},
  {path: 'faq', component: FaqComponent},
  {path: 'artists', component: ArtistsComponent},
  {path: 'artist/:id', component: ArtistSingleComponent},
  // {path: 'login', component: LoginComponent},
  // {path: 'register', component: RegisterComponent},
  // {path: 'shop', component: ShopComponent},
  // {path: 'add-service', component: AddServiceComponent},
  // {path: 'edit-service/:id', component: EditServiceComponent},
  // {path: 'service/:id', component: ServiceSingleComponent},
  // {path: 'search', component: SearchComponent},
  // {path: 'chat', component: ChatComponent},
  // {path: 'chat/:userId', component: ChatComponent},
  // {path: 'profile', component: ProfileComponent},
  // {path: 'edit-profile', component: EditProfileComponent},
  // {path: 'seller-profile/:id', component: SellerProfileComponent},

  // // {path: 'admin', loadChildren: './modules/admin/dmfb-admin.module#DmfbCustomerModule'},
  {
    path: 'admin',
    component: DmfbAdminComponent,
    children: [
      {path: 'dashboard', component: AdminDashboardComponent},
  //     {path: 'services', component: AdminShopComponent},
      {path: 'users', component: AdminUsersComponent},
      {path: 'artists', component: AdminArtistsComponent},
      {path: 'add-artist', component: AdminAddArtistComponent},
      {path: 'edit-artist/:id', component: AdminEditArtistComponent},
  //     {path: 'edit-service/:id', component: AdminEditServiceComponent},
      {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
      {path: '**', component: AdminDashboardComponent},
    ],
  },

  // {path: '', redirectTo: 'shop', pathMatch: 'full'},
  // {path: '**', redirectTo: 'shop'},
];