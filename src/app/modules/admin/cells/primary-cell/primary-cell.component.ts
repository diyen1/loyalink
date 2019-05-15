import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ShopService} from '../../../../model/shop-service.model';
import {DmfbCrudService} from '../../../crud/services/dmfb-crud.service';

@Component({
  selector: 'app-primary-cell',
  templateUrl: './primary-cell.component.html',
})
export class PrimaryCellComponent implements OnInit {

  @Input() value: any;
  @Input() rowData: any;

  collectionPath = 'services';

  @Output() save: EventEmitter<any> = new EventEmitter();

  constructor(
    public crudService: DmfbCrudService,
  ) { }

  ngOnInit() {
  }
}
