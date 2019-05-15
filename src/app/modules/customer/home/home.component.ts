import {Component, OnInit} from '@angular/core';
import {AppService} from '../../../angular-services/app.service';
import {Artist} from '../../shared/models/artist.model';
import {ArtistService} from '../../shared/angular-services/artist.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  images = [
    {
      title: '1. CHOOSE YOUR ARTIST',
      content: 'BOOK AN APPOINTMENT'
    },
    {
      title: '2. CHOOSE YOUR ARTIST',
      content: 'BOOK AN APPOINTMENT'
    },
    {
      title: '3. CHOOSE YOUR ARTIST',
      content: 'BOOK AN APPOINTMENT'
    },
  ];

  artists: Artist[] = [];
  gallery = [];
  loading = false;

  constructor(
    private appService: AppService,
    private artistService: ArtistService,
  ) {
  }

  ngOnInit() {
    this.appService.pageTitle = 'Home';

    this.fetchArtists();
  }

  fetchArtists() {
    this.loading = true;

    this.artistService.getAllItems().subscribe(
      (items: Artist[]) => {
        this.artists = items;
        this.createGallery();
      },
      () => {
        this.loading = false;
      });
  }

  createGallery() {

    let galleryIndex = 0;
    let galleryCounter = 0;

    this.gallery[galleryIndex] = [];

    for (let i = 0; i < this.artists.length; i++) {
      if (this.artists[i].portfolioImages && this.artists[i].portfolioImages.length > 0) {
        for (let j = 0; j < this.artists[i].portfolioImages.length; j++) {
          if (galleryCounter === 6) {
            galleryIndex++;
            galleryCounter = 0;
            this.gallery[galleryIndex] = [];
          }

          galleryCounter ++;

          this.gallery[galleryIndex].push(this.artists[i].portfolioImages[j]);
        }
      }
    }

    this.loading = false;
  }
}
