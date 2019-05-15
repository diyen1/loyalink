import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-description-cell',
  templateUrl: './description-cell.component.html',
})
export class DescriptionCellComponent implements OnInit {

  @Input() value: string;
  @Input() rowData: any;
  formattedValue = '';
  LIMIT = 50;

  @Output() save: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
    this.formattedValue = (this.value.length > this.LIMIT) ? this.value.substr(0, this.LIMIT) + ' ...' :  this.value;
  }
}
