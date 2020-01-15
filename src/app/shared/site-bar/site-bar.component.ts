import { Component, ElementRef, HostBinding, HostListener, OnInit } from '@angular/core';
import { ContactShowService } from '../../core/services/contact-show.service';
import { fadeIn } from '../../core/animation';
import { fromEvent, timer } from 'rxjs';
import { debounce, map } from 'rxjs/operators';
import { MediaQueryService } from '../../core/services/media-query.service';

const socialList = [
  {
    link: 'https://www.instagram.com/inside_production/?hl=ru',
    icon: 'inst.png',
  },
  {
    link: 'https://vimeo.com/insideproduction',
    icon: 'vi.png',
  },
  {
    link: 'https://www.facebook.com/inside.videoproduction/',
    icon: 'face.png',
  },
  {
    link: 'https://vk.com/insidevideoproduction',
    icon: 'vk.png',
  },
];

@Component({
  selector: 'app-site-bar',
  templateUrl: './site-bar.component.html',
  styleUrls: ['./site-bar.component.scss'],
  animations: [
    fadeIn,
  ]
})
export class SiteBarComponent implements OnInit {
  @HostBinding('class.open') public showContacts;
  public socialList = socialList;


  constructor(
    private elRef: ElementRef,
    protected contactShowService: ContactShowService,
    protected mediaQueryService: MediaQueryService,
  ) {
  }

  ngOnInit() {
    this.showContacts = this.contactShowService.shown;
    this.contactShowService
      .onChange
      .subscribe((value: boolean) => {
        this.showContacts = value;
      });
    this.subscribeToScroll();
  }


  subscribeToScroll() {
    if (this.mediaQueryService.isPhone()) {
      return;
    }
    setInterval(() => this.calcPosition(), 100);
  }

  calcPosition() {
    const elem: HTMLElement = this.elRef.nativeElement;
    const rect = elem.getBoundingClientRect();

    if (rect.top <= 0) {
      elem.classList.add('fixed');
    } else {
      elem.classList.remove('fixed');
    }
  }
}
