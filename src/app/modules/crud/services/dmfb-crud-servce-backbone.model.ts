import {Observable} from 'rxjs';
import * as firebase from 'firebase';
import {ShopService} from '../../../model/shop-service.model';
import {DmfbUser} from '../../../model/dmfb-user';
import {firestore} from 'firebase';
import {generateFirebaseId} from '../../../functions/generate-firebase-id';

export class DmfbCrudServiceBackbone {

  searchKey = '';
  services: ShopService[] = [];
  loading = false;
  PER_PAGE = 12;
  collectionPath = 'services';

  constructor() {
  }

  initializeItemsList(user: DmfbUser = null) {

    let itemsListener;
    if (user && user != null) {
      itemsListener = this.getUserItems(user);
    } else {
      itemsListener = this.getItems();
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

  getUserItems(user: DmfbUser = null, lastItem = null): Observable<any> {
    this.loading = true;
    let i = 0;
    let ref: any = firebase.firestore().collection(this.collectionPath).where('uid', '==', user.uid)
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

  getItems(lastItem = null): Observable<any> {

    this.loading = true;
    let i = 0;
    const ref = this.getFetchRef();

    if (this.searchKey && this.searchKey !== '') {
      return this.getItemsSearch();
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

  getAllItems(): Observable<any> {

    this.loading = true;
    let i = 0;
    const ref: any = this.getFetchRef();

    return new Observable((observer) => {
      ref.onSnapshot((querySnapshot) => {
        const items = [];
        const fetchDataLength = querySnapshot.size;

        if (querySnapshot.size > 0) {
          querySnapshot.forEach((doc: any) => {
            const data = doc.data();
            items.push(this.getFormattedItem(data));
            i++;
            if (i === fetchDataLength) {
              observer.next(items);
              observer.complete();
            }
          });
        } else {
          observer.next([]);
          observer.complete();
        }
      });
    });
  }

  getItem(id: string): Observable<any> {
    const ref = firebase.firestore().collection(this.collectionPath);
    return new Observable((observer) => {
      ref.doc(id).get().then((doc: any) => {
        const data = doc.data();
        observer.next(this.getFormattedItem(data));
        observer.complete();
      }).catch((error) => {
        observer.error(error);
        observer.complete();
      });
    });
  }

  postItem(data): Observable<any> {

    data.created = firestore.FieldValue.serverTimestamp();
    data.modified = data.created;

    const ref = firebase.firestore().collection(this.collectionPath);
    return new Observable((observer) => {
      /*ref.add(data).then((doc) => {
        observer.next(doc.id);
      });*/
      console.log('data', data);
      console.log('this.getItemId(data)', this.getItemId(data));
      ref.doc(this.getItemId(data)).set(data).then(() => {
        observer.next();
        observer.complete();
      }).catch(error => {
        console.error(error);
        observer.complete();
      });
    });
  }

  updateItem(id: string, data): Observable<any> {

    data.modified = firestore.FieldValue.serverTimestamp();

    const ref = firebase.firestore().collection(this.collectionPath);
    return new Observable((observer) => {
      ref.doc(id).set(data).then(() => {
        observer.next();
        observer.complete();
      }).catch((error) => {
        observer.error(error);
        observer.complete();
      });
    });
  }

  deleteItem(id: string): Observable<{}> {
    const ref = firebase.firestore().collection(this.collectionPath);
    return new Observable((observer) => {
      ref.doc(id).delete().then(() => {
        observer.next();
        observer.complete();
      }).catch((error) => {
        observer.error(error);
        observer.complete();
      });
    });
  }

  getItemsSearch(): Observable<any> {

    this.loading = true;
    let i = 0;

    return new Observable((observer) => {

      const ref: any = this.getFetchRef();

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
      reported: !!data.reported,
      mainPhotoUrl: data.mainPhotoUrl,
    };
  }

  getFetchRef() {
    return firebase.firestore().collection(this.collectionPath).orderBy('time', 'desc');
  }

  getItemId(item) {
    return item.sid;
  }
}
