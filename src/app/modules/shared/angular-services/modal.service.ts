import {Injectable, OnInit} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {ModalType} from '../models/modal-type.enum';

@Injectable({
  providedIn: 'root'
})
export class ModalService implements OnInit {

  modalComponentsSubject = new BehaviorSubject<any>(null);
  modalConfirmSubject = new BehaviorSubject<any>(null);

  constructor() {
  }

  ngOnInit() {
  }

  confirmComplete(value: boolean) {
    this.modalConfirmSubject.next(value);
  }

  open(heading, body, modalType = ModalType.NORMAL) {
    this.modalComponentsSubject.next({
      heading: heading,
      body: body,
      modalType: modalType
    });
  }

  confirm(body, yesText = 'Yes', noText = 'No'): Observable<boolean> {

    const context = this;

    context.open('', body, ModalType.CONFIRM);

    return new Observable((observer) => {
      context.modalConfirmSubject.subscribe(
        (value: any) => {
          if (value && value != null) {
            if (value) {
              observer.next();
            } else {
              observer.error();
            }
            context.modalConfirmSubject.next(null);
            observer.complete();
          }
          // context.modalConfirmSubject.complete();
        },
        () => {
          observer.next(false);
          observer.complete();
          // context.modalConfirmSubject.complete();
        }
      );
    });
  }
}
