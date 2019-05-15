import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AppService} from '../../../angular-services/app.service';
import {AuthService} from '../../auth/services/auth.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {generateFirebaseId} from '../../../functions/generate-firebase-id';
import {firestore} from 'firebase';
import {ArtistService} from '../../shared/angular-services/artist.service';
import {CrudLayout} from '../../crud/crud-layout';
import {AlertService} from '../../shared/angular-services/alert.service';
import {MediaService} from '../../shared/angular-services/media.service';
import {Artist} from '../../shared/models/artist.model';

@Component({
  selector: 'app-admin-nav',
  templateUrl: './admin-edit-artist.component.html',
  styleUrls: ['./admin-edit-artist.component.scss'],
})
export class AdminEditArtistComponent implements OnInit {

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
  artist: Artist;

  constructor(
    private appService: AppService,
    private authService: AuthService,
    private alertService: AlertService,
    private artistService: ArtistService,
    private mediaService: MediaService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    this.appService.pageTitle = 'Add Service';

    this.activatedRoute.params.subscribe(
      (params: Params) => {
        this.loading = true;
        const id = params['id'];

        this.artistService.getItem(id).subscribe(
          (artist: Artist) => {
            this.artist = artist;
            console.log('this.artist', this.artist);
            this.resetForm();
          },
          (error) => {
            console.error(error);
          },
          () => {
            this.loading = false;
          });
      });
  }

  resetForm() {

    console.log('resetForm artists', this.artist);

    this.fields = [
      {
        key: 'name',
        name: 'Name',
        class: '',
        type: 'text',
        value: this.artist.name,
      },
      {
        key: 'desc',
        name: 'Description',
        type: 'text_area',
        class: '',
        value: this.artist.desc,
      },
      {
        key: 'email',
        name: 'Email',
        type: 'email',
        class: '',
        value: this.artist.email,
      },
      {
        key: 'ig',
        name: 'IG',
        type: 'text',
        class: '',
        value: this.artist.ig,
      },
      {
        key: 'avatar',
        name: 'Avatar',
        type: 'image',
        postId: 0,
        userId: 0,
        class: '',
        value: this.artist.avatar,
      },
      {
        key: 'portfolioImages',
        name: 'Gallery Images',
        type: 'image_array',
        image_count: 20,
        class: '',
        value: this.artist.portfolioImages,
      },
    ];
  }

  updateArtist(formData) {

    // formData.desc = formData.desc.replace('\n', '\\n');

    this.loading = true;

    this.artist.name = formData.name;
    this.artist.desc = formData.desc;
    this.artist.avatar = formData.avatar;
    this.artist.portfolioImages = formData.portfolioImages;
    this.artist.ig = formData.ig;
    this.artist.email = formData.email;

    console.log(this.artist.aid);

    this.resetForm();

    this.artistService.updateItem(this.artist.aid, this.artist).subscribe(() => {
        // console.log(id);
        // this.router.navigate(['edit-service/' + id]);
        this.alertService.addAlert(
          {
            type: 'success',
            message: 'Artist successfully updated.',
          }
        );
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
}

