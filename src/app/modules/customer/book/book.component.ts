import {Component, OnInit} from '@angular/core';
import {AppService} from '../../../angular-services/app.service';
import {ArtistService} from '../../shared/angular-services/artist.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
})
export class BookComponent implements OnInit {

  artists: any[] = [];
  loading = false;
  PER_PAGE  = 12;
  offset = 12;

  constructor(
    private appService: AppService,
    private artistService: ArtistService,
  ) {
  }

  ngOnInit() {
    this.appService.pageTitle = 'Book';
    this.loading = true;
    this.artistService.getAllItems().subscribe(
      (items: any[]) => {
        this.artists = items;
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
