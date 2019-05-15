import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Alert} from '../models/alert.interface';
import {AlertService} from '../angular-services/alert.service';
import {NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  constructor(
    public alertService: AlertService,
    private router: Router,
    ) {
  }

  ngOnInit() {
    this.router.events.subscribe((val) => {
      console.log(val instanceof NavigationEnd);
      this.alertService.clearAlerts();
    });
  }

  close(alert: Alert) {
    this.alertService.alerts.splice(this.alertService.alerts.indexOf(alert), 1);
  }
}
