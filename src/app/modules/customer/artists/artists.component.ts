import {Component, OnInit} from '@angular/core';
import {AppService} from '../../../angular-services/app.service';
import {DmfbUser} from '../../../model/dmfb-user';
import {ArtistService} from '../../shared/angular-services/artist.service';
import {AlertService} from '../../shared/angular-services/alert.service';
import {ModalService} from '../../shared/angular-services/modal.service';

@Component({
  selector: 'app-artists',
  templateUrl: './artists.component.html',
})
export class ArtistsComponent implements OnInit {

  lastItem = null;
  artists: any[] = [];
  loading = false;
  isLastPage = false;
  user: DmfbUser;
  noItemsError = 'There are currently no artists available';
  PER_PAGE  = 12;
  offset = 12;

  constructor(
    private appService: AppService,
    private artistService: ArtistService,
    private alertService: AlertService,
    private dmfbModalService: ModalService
  ) {
  }

  ngOnInit() {
    this.appService.pageTitle = 'Artists';
    this.loading = true;
    this.artistService.getAllItems().subscribe(
      (items: any[]) => {
        this.artists = items;
        // [
        //   ...items, ...items, ...items, ...items,
        //   // ...items, ...items, ...items, ...items,
        //   // ...items, ...items, ...items, ...items,
        //   // ...items, ...items, ...items, ...items,
        // ];
      },
      () => {},
      () => {
        this.loading = false;
      });
  }

  get showLoadMore() {
    return !!(this.offset < this.artists.length);
  }

  loadMore() {
    if (this.offset < this.artists.length) {
      this.offset += this.PER_PAGE;
    }
  }
}
