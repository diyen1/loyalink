import {Component, OnInit} from '@angular/core';
import {AppService} from '../../../angular-services/app.service';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
})
export class FaqComponent implements OnInit {

  constructor(
    private appService: AppService,
  ) {
  }

  ngOnInit() {
    this.appService.pageTitle = 'FAQ';

    const acc = document.getElementsByClassName('accordion');
    let i;

    for (i = 0; i < acc.length; i++) {
      acc[i].addEventListener('click', function() {
        this.classList.toggle('active');
        const panel = this.nextElementSibling;
        if (panel.style.maxHeight){
          panel.style.maxHeight = null;
        } else {
          panel.style.maxHeight = panel.scrollHeight + 'px';
        }
      });
    }
  }
}
