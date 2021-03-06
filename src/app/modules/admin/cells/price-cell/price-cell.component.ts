import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-price-cell',
  templateUrl: './price-cell.component.html',
})
export class PriceCellComponent implements OnInit {

  @Input() value: any;
  @Input() rowData: any;
  // formattedDate = '';

  @Output() save: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
    // console.log(this.value);
    //
    // const formatter = new Intl.NumberFormat('en-US', {
    //   style: 'currency',
    //   currency: 'USD',
    // });
    //
    //
    // //   this.services[i].price = '<div class="mdl-textfield--align-right">' + formatter.format(+this.services[i].price) + '</div>';
    //
    // if (this.value && this.value.seconds) {
    //   this.formattedDate = new Date(this.value.seconds).toLocaleString();
    //   if (this.formattedDate === 'Invalid Date') {
    //     this.formattedDate = '';
    //   }
    // }
  }
}
