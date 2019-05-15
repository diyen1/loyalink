import {Component, Input, OnInit} from '@angular/core';
import {Artist} from '../../shared/models/artist.model';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.scss']
})
export class ArtistComponent implements OnInit {

  @Input() artist: Artist;
  @Input() showDesc = true;

  LIMIT = 42;

  constructor(
    // private appService: AppService,
    // private artistService: ArtistService,
    // private alertService: AlertService,
    // private dmfbModalService: ModalService
  ) {
  }

  ngOnInit() {
  }

  get cleanDesc() {
    return (this.artist.desc.length > this.LIMIT) ? this.artist.desc.substr(0, this.LIMIT) + ' ...' :  this.artist.desc;
  }
}
