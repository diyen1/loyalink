import { Injectable } from '@angular/core';
import {Alert} from '../models/alert.interface';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  alerts: Alert[] = [];

  constructor() { }

  addAlert(alert: Alert) {
    this.alerts.push(alert);
    this.scrollToTop();
  }

  clearAlerts() {
    this.alerts = [];
  }

  scrollToTop(): void {
    this.scrollTo('body');
  }

  scrollToNotification(): void {
    this.scrollTo('dm-notification');
  }

  scrollTo(className: string): void {
    const elementList = document.querySelectorAll('.' + className);
    const element = elementList[0] as HTMLElement;
    element.scrollIntoView({ behavior: 'smooth' });
  }
}
