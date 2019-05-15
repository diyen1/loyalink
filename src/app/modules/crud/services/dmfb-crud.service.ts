import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import * as firebase from 'firebase';
import firestore from 'firebase/firestore';
import {ShopService} from '../../../model/shop-service.model';
import {DmfbUser} from '../../../model/dmfb-user';
// import Timestamp = firebase.firestore.Timestamp;

@Injectable({
  providedIn: 'root'
})
export class DmfbCrudService {

  searchKey = '';
  services: ShopService[] = [];
  loading = false;
  PER_PAGE = 12;

  constructor() {
    // this.initializeServicesList();
  }

  initializeItemsList(collectionPath: string, user: DmfbUser = null) {

    let itemsListener;
    if (user && user != null) {
      itemsListener = this.getUserItems(collectionPath, user);
    } else {
      itemsListener = this.getItems(collectionPath);
    }
    itemsListener.subscribe((res) => {
        // console.log('success', res.data);
        this.services = res.data;
        this.loading = false;
      },
      (error) => {
        console.error('error', error);
        this.loading = false;
      });
  }

  getUserItems(collectionPath: string, user: DmfbUser = null, lastItem = null): Observable<any> {
    this.loading = true;
    let i = 0;
    let ref: any = firebase.firestore().collection(collectionPath).where('uid', '==', user.uid)
      .orderBy('time', 'desc').limit(this.PER_PAGE + 1);
    if (lastItem != null) {
      ref = ref.startAt(lastItem.time).limit(this.PER_PAGE + 1);
    }

    return new Observable((observer) => {
      ref.onSnapshot((querySnapshot) => {
        const items = [];
        const fetchDataLength = querySnapshot.size;
        if (fetchDataLength > 0) {
          querySnapshot.forEach((doc: any) => {
            const data = doc.data();
            let newLastItem = null;
            if (i < this.PER_PAGE) {
              items.push(this.getFormattedItem(data));
            } else {
              newLastItem = this.getFormattedItem(data);
            }
            i++;
            if (i === fetchDataLength) {
              const isLastPage = (i !== this.PER_PAGE + 1);
              observer.next({data: items, isLastPage: isLastPage, lastItem: newLastItem});
              observer.complete();
            }
          });
        } else {
          observer.next({data: items, isLastPage: true, lastItem: null});
          observer.complete();
        }
      });
    });
  }

  getItems(collectionPath: string, lastItem = null): Observable<any> {

    this.loading = true;
    let i = 0;
    const ref = this.getFetchRef(collectionPath);

    if (this.searchKey && this.searchKey !== '') {
      return this.getItemsSearch(collectionPath);
    } else {
      return new Observable((observer) => {
        ref.onSnapshot((querySnapshot) => {
          i = 0;
          const items = [];
          const fetchDataLength = querySnapshot.size;
          querySnapshot.forEach((doc: any) => {
            const data = doc.data();

            items.push(this.getFormattedItem(data));
            i++;
            if (i === fetchDataLength) {
              observer.next({data: items});
              observer.complete();
            }
          });
        });
      });
    }
  }

  getItemsSearch(collectionPath: string): Observable<any> {

    this.loading = true;
    let i = 0;

    return new Observable((observer) => {

      const ref: any = this.getFetchRef(collectionPath);

      ref.onSnapshot((querySnapshot) => {
        const items = [];
        const fetchDataLength = querySnapshot.size;
        i = 0;

        querySnapshot.forEach((doc: any) => {
          const data = doc.data();

          if (
            (data.service && data.service.toLowerCase().includes(this.searchKey.toLowerCase()))
            || (data.price && data.price.toLowerCase().includes(this.searchKey.toLowerCase()))
            || (data.description && data.description.toLowerCase().includes(this.searchKey.toLowerCase()))
          ) {
            items.push(this.getFormattedItem(data));
          }

          i++;

          if (i === fetchDataLength) {
            observer.next({data: items});
            observer.complete();
          } else {

          }
        });
      });
    });
  }

  getFormattedItem(data: any): any {
    return {
      imagesUrl: data.imagesUrl,
      latestUpdateTimestamp: data.latestUpdateTimestamp,
      price: (data.price.charAt(0) === '$') ? data.price.substr(1) : data.price,
      sid: data.sid,
      time: data.time,
      uid: data.uid,
      description: data.description,
      service: data.service,
      reported: !! data.reported,
      mainPhotoUrl: data.mainPhotoUrl,
    };
  }

  getFetchRef(collectionPath: string) {
    return firebase.firestore().collection(collectionPath).orderBy('time', 'desc');
  }

  getAllItems(collectionPath: string): Observable<any> {

    console.log('FUCKING FETCHIN 1');

    this.loading = true;
    let i = 0;
    const ref: any = this.getFetchRef(collectionPath);

    return new Observable((observer) => {
      ref.onSnapshot((querySnapshot) => {
        console.log('FUCKING FETCHIN 2');
        const items = [];
        const fetchDataLength = querySnapshot.size;
        querySnapshot.forEach((doc: any) => {
          const data = doc.data();
          items.push(this.getFormattedItem(data));
          i++;
          console.log('FUCKING FETCHIN 3');
          if (i === fetchDataLength) {
            console.log('FUCKING FETCHIN 4');
            observer.next(items);
            observer.complete();
          }
        });
      });
    });
  }

  getItem(collectionPath: string, id: string): Observable<any> {
    const ref = firebase.firestore().collection(collectionPath);
    return new Observable((observer) => {
      ref.doc(id).get().then((doc: any) => {
        const data = doc.data();
        observer.next(this.getFormattedItem(data));
      });
    });
  }

  postItem(collectionPath: string, data): Observable<any> {
    const ref = firebase.firestore().collection(collectionPath);
    return new Observable((observer) => {
      /*ref.add(data).then((doc) => {
        observer.next(doc.id);
      });*/
      ref.doc(data.sid).set(data).then(() => {
        observer.next();
      }).catch(error => console.log(error));
    });
  }

  updateItem(collectionPath: string, id: string, data): Observable<any> {
    const ref = firebase.firestore().collection(collectionPath);
    return new Observable((observer) => {
      ref.doc(id).set(data).then(() => {
        observer.next();
      });
    });
  }

  deleteItem(collectionPath: string, id: string): Observable<{}> {
    const ref = firebase.firestore().collection(collectionPath);
    return new Observable((observer) => {
      ref.doc(id).delete().then(() => {
        observer.next();
      });
    });
  }
}
