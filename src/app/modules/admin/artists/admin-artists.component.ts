import {Component, OnInit} from '@angular/core';
import {AppService} from '../../../angular-services/app.service';
import {DmfbUser} from '../../../model/dmfb-user';
import {ArtistService} from '../../shared/angular-services/artist.service';
import {DescriptionCellComponent} from '../cells/description-cell/description-cell.component';
import {AlertService} from '../../shared/angular-services/alert.service';
import {ModalService} from '../../shared/angular-services/modal.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin-artists',
  templateUrl: './admin-artists.component.html',
})
export class AdminArtistsComponent implements OnInit {

  lastItem = null;
  artists: any[] = [];
  loading = false;
  isLastPage = false;
  user: DmfbUser;
  noItemsError = 'There are currently no artists available';

  settings = {
    columns: {
      // uid: {
      //   title: 'UID',
      //   width: '250px',
      //   editable: false,
      // },
      name: {
        title: 'Name',
      },
      desc: {
        title: 'Description',
        type: 'custom',
        renderComponent: DescriptionCellComponent,
        onComponentInitFunction(instance) {
          instance.save.subscribe(row => {
            //
          });
        },
      },
      ig: {
        title: 'IG',
      },
      email: {
        title: 'Email',
      },
    },
    actions: {
      add: false,
      edit: false,
      position: 'right',
      custom: [
        {
          name: 'edit',
          title: '<a class="ng2-smart-action ng2-smart-action-edit-edit" href="#">Edit</a>',
        },
      ],
    },
    edit: {
      confirmSave: true,
    },
    delete: {
      confirmDelete: true,
    }
  };

  constructor(
    private appService: AppService,
    private artistService: ArtistService,
    private alertService: AlertService,
    private dmfbModalService: ModalService,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.appService.pageTitle = 'Artists';
    this.loading = true;
    this.artistService.getAllItems().subscribe(
      (items: any[]) => {
        this.artists = items;
        this.loading = false;
      },
      () => {
        this.loading = false;
      });
  }

  onCustomAction($event) {
    switch ($event.action) {

      case 'edit':
        console.log('edit');
        this.editEvent($event);
        break;

      default:
      //
    }
  }

  private editEvent($event) {
    console.log('editing ', $event.data);
    console.log('route', '/admin/edit-artist/' + $event.data.aid);
    this.router.navigate([ '/admin/edit-artist/' + $event.data.aid ]);
  }

  editConfirm(event) {
    // console.log(event);
    const oldData = event.data;
    let newData = event.newData;

    /*
     * Update the server only when there is a change
     */
    if (!(
      oldData.name && newData.name && oldData.name === newData.name &&
      oldData.desc && newData.desc && oldData.desc === newData.desc &&
      oldData.ig && newData.ig && oldData.ig === newData.ig &&
      oldData.email && newData.email && oldData.email === newData.email
    )) {
      newData = this.defineUndefinedUserValues(newData);

      if (newData.uid !== '') {
        this.artistService.updateItem(newData.aid, newData).subscribe(() => {
          event.confirm.resolve();
          // this.mdlSnackbarService.showSnackbar({
          //   message: 'Successfully updated user, ' + newData.fullNames,
          // });
          this.alertService.addAlert(
            {
              type: 'success',
              message: 'Successfully updated user, ' + newData.name,
            }
          );
        });
      }
    }
  }

  deleteConfirm(event) {
    const artistId = event.data.aid;
    const artistName = event.data.name;

    this.dmfbModalService.confirm('Do you want to delete this artist?', 'No', 'Yes')
      .subscribe(() => {
          this.updateArtistsList(artistId);
          // this.loading = true;

          // console.log('confirmed');
          this.artistService.deleteItem(artistId).subscribe(() => {
              event.confirm.resolve();

              this.updateArtistsList(artistId);

              this.alertService.addAlert(
                {
                  type: 'success',
                  message: 'Successfully delete artist, ' + artistName,
                }
              );
            },
            (error) => {
              console.error(error);

              this.alertService.addAlert(
                {
                  type: 'danger',
                  message: 'Failed to delete artist',
                }
              );
            });
        },
        (err: any) => {
          console.log('declined');
        }
      );
  }

  updateArtistsList(artistId) {
    for (let i = 0; i < this.artists.length; i++) {
      if (this.artists[i].aid === artistId) {
        console.log('this.artists[i].aid === artistId', this.artists[i].aid === artistId);
        this.artists.splice(i, 1);
        console.log(this.artists);
        break;
      }
    }
  }

  private defineUndefinedUserValues(data) {
    data.aid = (data.aid) ? data.aid : '';
    data.name = (data.name) ? data.name : '';
    data.desc = (data.desc) ? data.desc : '';
    data.ig = (data.ig) ? data.ig : '';
    data.email = (data.email) ? data.email : '';
    data.avatar = (data.avatar) ? data.avatar : '';
    data.portfolioImages = (data.portfolioImages) ? data.portfolioImages : '';
    data.created = (data.created) ? data.created : null;
    data.modified = (data.modified) ? data.modified : null;
    return data;
  }
}
