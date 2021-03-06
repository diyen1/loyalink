import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import * as firebase from 'firebase';

if (environment.production) {
  enableProdMode();
}

/* Initializes firestore */
const settings = {timestampsInSnapshots: true};
firebase.initializeApp(environment.firebase);
firebase.firestore().settings(settings);

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

