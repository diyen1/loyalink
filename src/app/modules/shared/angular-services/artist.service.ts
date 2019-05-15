import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import {DmfbCrudServiceBackbone} from '../../crud/services/dmfb-crud-servce-backbone.model';

@Injectable({
  providedIn: 'root'
})
export class ArtistService extends DmfbCrudServiceBackbone {

  collectionPath = 'artists';

  getFormattedItem(data: any): any {
    return {
      aid: data.aid,
      name: data.name,
      desc: data.desc,
      ig: data.ig,
      email: data.email,
      avatar: data.avatar,
      portfolioImages: data.portfolioImages,
      created: data.created,
      modified: data.modified,
    };
  }

  getFetchRef() {
    return firebase.firestore().collection(this.collectionPath).orderBy('created', 'desc');
  }

  getItemId(item) {
    return item.aid;
  }
}
