import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AppService} from '../../../angular-services/app.service';
import {AuthService} from '../../auth/services/auth.service';
import {Router} from '@angular/router';
import {generateFirebaseId} from '../../../functions/generate-firebase-id';
import {firestore} from 'firebase';
import {ArtistService} from '../../shared/angular-services/artist.service';
import {CrudLayout} from '../../crud/crud-layout';
import {AlertService} from '../../shared/angular-services/alert.service';
import {MediaService} from '../../shared/angular-services/media.service';

@Component({
  selector: 'app-admin-nav',
  templateUrl: './admin-add-artist.component.html',
  styleUrls: ['./admin-add-artist.component.scss'],
})
export class AdminAddArtistComponent implements OnInit {

  fields = [];

  layout: CrudLayout = {
    wrapperClass: 'row',
    colums: 2,
    templateStructure: null,
    // templateStructure: [
    //   {
    //     class: 'col-12 col-md-6',
    //     data: [
    //       {
    //         key: 'name',
    //       },
    //       {
    //         key: 'desc',
    //       },
    //       {
    //         key: 'email',
    //       },
    //       {
    //         key: 'ig',
    //       },
    //     ],
    //   },
    //   {
    //     class: 'col-12 col-md-6',
    //     data: [
    //       {
    //         key: 'avatar',
    //       },
    //       {
    //         key: 'portfolioImages',
    //       },
    //     ]
    //   },
    // ],
  };

  loading = false;

  constructor(
    private appService: AppService,
    private authService: AuthService,
    private alertService: AlertService,
    private artistService: ArtistService,
    private mediaService: MediaService,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.resetForm();
    this.appService.pageTitle = 'Add Service';
  }

  resetForm() {
    this.fields = [
      {
        key: 'name',
        name: 'Name',
        class: '',
        type: 'text',
        value: '',
      },
      {
        key: 'desc',
        name: 'Description',
        type: 'text_area',
        class: '',
        value: '',
      },
      {
        key: 'email',
        name: 'Email',
        type: 'email',
        class: '',
        value: '',
      },
      {
        key: 'ig',
        name: 'IG',
        type: 'text',
        class: '',
        value: '',
      },
      {
        key: 'avatar',
        name: 'Avatar',
        type: 'image',
        postId: 0,
        userId: 0,
        class: '',
        value: '',
      },
      {
        key: 'portfolioImages',
        name: 'Gallery Images',
        type: 'image_array',
        image_count: 20,
        class: '',
        value: '',
      },
    ];
  }

  addArtist(formData) {
    console.log('add artist called');
    // this.loading = true;
    formData.aid = generateFirebaseId(); // firestore.FieldPath.documentId();
    console.log(formData);
    console.log(formData.portfolioImages);

    this.artistService.postItem(formData).subscribe(() => {
        // console.log(id);
        // this.router.navigate(['edit-service/' + id]);
        this.alertService.addAlert(
          {
            type: 'success',
            message: 'Artist successfully added.',
          }
        );

        // Add media images quietly
        // this.addMediaImages(formData);
      },
      (error) => {
        console.error('failed to add artist', error);
        this.alertService.addAlert(
          {
            type: 'danger',
            message: 'Failed to add artist.',
          }
        );
      },
      () => {
      console.log('finished');
        this.loading = false;
        this.resetForm();
      });
  }

  addMediaImages(formData) {
    const currentTime = firestore.FieldValue.serverTimestamp();
    formData.portfolioImages.forEach((imageUrl) => {
      const medium = {
        mid: generateFirebaseId(),
        url: imageUrl,
        pid: formData.aid,
        aid: this.authService.currentUserId,
        created: currentTime,
        modified: currentTime,
      };
      this.mediaService.postItem(medium).subscribe(() => { });
    });
  }
}

// const ALERTS: Alert[] = [{
//   type: 'success',
//   message: 'This is an success alert',
// }, {
//   type: 'info',
//   message: 'This is an info alert',
// }, {
//   type: 'warning',
//   message: 'This is a warning alert',
// }, {
//   type: 'danger',
//   message: 'This is a danger alert',
// }, {
//   type: 'primary',
//   message: 'This is a primary alert',
// }, {
//   type: 'secondary',
//   message: 'This is a secondary alert',
// }, {
//   type: 'light',
//   message: 'This is a light alert',
// }, {
//   type: 'dark',
//   message: 'This is a dark alert',
// }
// ];
