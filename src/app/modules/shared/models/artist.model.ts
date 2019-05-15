import {firestore} from 'firebase';

export class Artist {
  aid: string;
  name: string;
  desc: string;
  ig: string;
  email: string;
  avatar: string;
  portfolioImages: string;
  created: any;
  modified: any;

  // public static defineUndefinedArtistValues(data) {
  //   data.description = (data.description) ? data.description : null;
  //   data.imagesUrl = (data.imagesUrl) ? data.imagesUrl : null;
  //   data.latestUpdateTimestamp = firestore.FieldValue.serverTimestamp();
  //   data.mainPhotoUrl = (data.mainPhotoUrl) ? data.mainPhotoUrl : null;
  //   data.price = (data.price) ? data.price : null;
  //   data.service = (data.service) ? data.service : null;
  //   data.sid = (data.sid) ? data.sid : null;
  //   data.time = (data.time) ? data.time : null;
  //   data.uid = (data.uid) ? data.uid : null;
  //   return data;
  // }
}
