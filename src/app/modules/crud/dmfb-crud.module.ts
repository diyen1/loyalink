import { NgModule } from '@angular/core';
import {CrudCreateComponent} from './create/crud-create.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DmfbFileUploadModule} from '../file-upload/dmfb-file-upload.module';
import {CrudReadAllComponent} from './read/read-all/crud-read-all.component';
import {CrudReadSingleComponent} from './read/read-single/crud-read-single.component';
import {ItemComponent} from './read/item/item.component';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {RouterModule} from '@angular/router';
import {CrudAttributeDisplayComponent} from './read/attribute-display/crud-attribute-display.component';
import {MyItemComponent} from './read/my-item/my-item.component';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {CommonModule} from '@angular/common';

const components = [
  CrudCreateComponent,
  CrudReadAllComponent,
  CrudReadSingleComponent,
  ItemComponent,
  MyItemComponent,
  CrudAttributeDisplayComponent,
];

@NgModule({
  declarations: [
    ... components,
  ],
  imports: [
    CommonModule,
    Ng2SmartTableModule,
    DmfbFileUploadModule,
    FormsModule,
    ReactiveFormsModule,
    InfiniteScrollModule,
    RouterModule,
  ],
  exports: [
    ... components,
  ],
  bootstrap: []
})
export class DmfbCrudModule { }
