import { NgModule } from '@angular/core';
import {NavComponent} from './nav/nav.component';
import {CommonModule} from '@angular/common';
import {UtilsService} from './utils.service';

const declarations = [
  NavComponent,
];

const modules = [
  CommonModule,
];

@NgModule({
  declarations: [
    ... declarations
  ],
  imports: [
    ... modules
  ],
  exports: [
    ... declarations
  ],
  providers: [
    UtilsService,
  ],
  bootstrap: []
})
export class UtilsModule { }
