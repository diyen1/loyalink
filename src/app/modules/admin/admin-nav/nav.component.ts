import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AdminService} from '../angular-services/admin.service';

@Component({
  selector: 'app-admin-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class AdminNavComponent implements OnInit {

  @Input() transparent = false;
  @Input() back = null;
  @Input() title;

  constructor(
    public router: Router,
  ) {
  }

  ngOnInit() {
  }

  goHome() {
    this.router.navigate(['shop']);
  }

  goCategories() {
    this.router.navigate(['categories']);
  }
}
