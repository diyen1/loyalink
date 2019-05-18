import {Component, Input, OnInit} from '@angular/core';
import {AppService} from '../../../angular-services/app.service';
import {DmfbUser} from '../../../model/dmfb-user';
import {ArtistService} from '../../shared/angular-services/artist.service';
import {AlertService} from '../../shared/angular-services/alert.service';
import {ModalService} from '../../shared/angular-services/modal.service';
import {Artist} from '../../shared/models/artist.model';
import {ActivatedRoute, Params} from '@angular/router';
import {ShopService} from '../../../model/shop-service.model';

@Component({
  selector: 'app-artist-single',
  templateUrl: './artist-single.component.html',
  styleUrls: ['./artist-single.component.scss'],
})
export class ArtistSingleComponent implements OnInit {

  @Input() artist: Artist;
  loading = false;

  constructor(
    // private appService: AppService,
    // private artistService: ArtistService,
    // private alertService: AlertService,
    // private dmfbModalService: ModalService
    private activatedRoute: ActivatedRoute,
    private artistService: ArtistService,
  ) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (params: Params) => {
        this.loading = true;
        const id = params['id'];

        this.artistService.getItem(id).subscribe(
          (artist: Artist) => {
            this.artist = artist;
          },
          () => {
            console.log('error');
          },
          () => {
            this.loading = false;
          });
      });
  }

  sanitizeDescription() {
    return this.artist.desc.replace(/(?:\r\n|\r|\n)/g, '<br>').toUpperCase();
  }

  getIgLink() {
    if (!this.artist || !this.artist.ig) {
      return '';
    }

    let ig = this.artist.ig;

    ig = ig.replace('@', '');

    return 'https://www.instagram.com/' + ig;
  }
}
