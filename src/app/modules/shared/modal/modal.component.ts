import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ModalService} from '../angular-services/modal.service';
import {AuthService} from '../../auth/services/auth.service';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ModalType} from '../models/modal-type.enum';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  @ViewChild('modalContent') private modalContent: ElementRef;

  closeResult: string;
  heading = '';
  body = '';
  isNormal = true;
  isConfirm = false;
  modalType = ModalType.NORMAL;

  constructor(
    public authService: AuthService,
    public modalService: ModalService,
    public ngbModal: NgbModal,
  ) {
  }

  ngOnInit() {
    this.modalService.modalComponentsSubject.subscribe(
      (value: any) => {
        if (value && value != null) {
          this.heading = value.heading;
          this.body = value.body;
          this.modalType = value.modalType;
          this.setModalProperties();
          console.log('this.isNormal', this.isNormal);
          this.open();
        }
      }
    );
  }

  open() {
    this.ngbModal.open(this.modalContent, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'sm',
      centered: true,
    }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  setModalProperties() {
    this.isNormal = this.modalType === ModalType.NORMAL;
    this.isConfirm = this.modalType === ModalType.CONFIRM;
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  confirmComplete(value) {
    this.modalService.confirmComplete(value);
    this.ngbModal.dismissAll();
  }
}
