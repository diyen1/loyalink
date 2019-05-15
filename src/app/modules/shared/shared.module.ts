import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HeaderComponent} from './header/header.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FooterComponent} from './footer/footer.component';
import {DmfbAuthModule} from '../auth/dmfb-auth.module';
import {NotificationComponent} from './notification/notification.component';
import {ModalComponent} from './modal/modal.component';
import {RouterModule} from '@angular/router';

const declarations = [
  HeaderComponent,
  FooterComponent,
  NotificationComponent,
  ModalComponent
];

@NgModule({
  declarations: [
    ... declarations
  ],
  imports: [
    CommonModule,
    NgbModule,
    DmfbAuthModule,
    RouterModule,
  ],
  exports: [
    ... declarations,
    NgbModule,
    DmfbAuthModule,
  ],
})
export class SharedModule { }
