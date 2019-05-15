import {Injectable} from '@angular/core';
import * as firebase from 'firebase/app';
import {AngularFireAuth} from 'angularfire2/auth';
import {AngularFireDatabase} from 'angularfire2/database';
import {Observable, of} from 'rxjs';
import {DmfbUser} from '../../../model/dmfb-user';
import {AuthService} from '../../auth/services/auth.service';
import {database} from 'firebase';
import {User} from '../../../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private user: any;

  constructor(
    private  db: AngularFireDatabase,
    private  authService: AuthService,
  ) {
    this.user = this.authService.getAuthUser();
  }
}
