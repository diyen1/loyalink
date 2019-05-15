import { Injectable } from '@angular/core';
import {DmfbCrudServiceBackbone} from '../../crud/services/dmfb-crud-servce-backbone.model';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class MediaService extends DmfbCrudServiceBackbone {

  collectionPath = 'media';

  getFormattedItem(data: any): any {
    return {
      mid: data.mid,
      url: data.url,
      pid: data.pid,
      created: data.created,
      modified: data.modified,
    };
  }

  getFetchRef() {
    return firebase.firestore().collection(this.collectionPath).orderBy('created', 'desc');
  }

  getItemId(item) {
    return item.mid;
  }
}
