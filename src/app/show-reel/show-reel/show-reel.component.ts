import { Component, OnInit } from '@angular/core';
import { PageLoadersServiceService } from '../../core/services/page-loaders-service.service';

@Component({
  selector: 'app-show-reel',
  templateUrl: './show-reel.component.html',
  styleUrls: ['./show-reel.component.scss']
})
export class ShowReelComponent implements OnInit {

  constructor(
    protected pageLoadersServiceService: PageLoadersServiceService,
  ) {
  }

  ngOnInit() {
    this.pageLoadersServiceService.hideMainLoader();
  }

}
