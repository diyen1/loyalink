import {Component, OnInit} from '@angular/core';
import {AppService} from '../../../angular-services/app.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
})
export class AboutUsComponent implements OnInit {

  constructor(
    public appService: AppService,
  ) {
  }

  ngOnInit() {
    this.appService.pageTitle = 'About Us';
  }
}
