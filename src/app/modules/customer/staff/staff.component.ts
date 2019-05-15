import {Component, OnInit} from '@angular/core';
import {AppService} from '../../../angular-services/app.service';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
})
export class StaffComponent implements OnInit {

  constructor(
    private appService: AppService,
  ) {
  }

  ngOnInit() {
    this.appService.pageTitle = 'Staff';
  }
}
