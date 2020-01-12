import { Component, OnInit } from '@angular/core';
import { PageLoadersServiceService } from '../../core/services/page-loaders-service.service';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

const src = 'https://player.vimeo.com/video/';

@Component({
  selector: 'app-show-reel',
  templateUrl: './show-reel.component.html',
  styleUrls: ['./show-reel.component.scss']
})
export class ShowReelComponent implements OnInit {
  public src;

  constructor(
    protected pageLoadersServiceService: PageLoadersServiceService,
    protected route: ActivatedRoute,
    protected sanitizer: DomSanitizer,
  ) {
  }

  ngOnInit() {
    const id = this.route.snapshot.queryParamMap.get('id');
    this.src = this.sanitizer.bypassSecurityTrustResourceUrl(src + id);
    this.pageLoadersServiceService.hideMainLoader();
  }
}
