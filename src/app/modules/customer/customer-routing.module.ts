import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';


const routes: Routes = [{
  path: '',
  // component: DmfbAdminComponent,
  // children: [
  //   {
  //     path: 'dashboard',
  //     component: AdminDashboardComponent,
  //   },
  // ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerRoutingModule {
}
