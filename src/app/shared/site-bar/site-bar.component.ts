import { Component, ElementRef, HostBinding, HostListener, OnInit } from '@angular/core';
import { ContactShowService } from '../../core/services/contact-show.service';
import { fadeIn } from '../../core/animation';
import { fromEvent, timer } from 'rxjs';
import { debounce, map } from 'rxjs/operators';
import { MediaQueryService } from '../../core/services/media-query.service';

const socialList = [
  {
    link: '#',
    icon: 'inst.png',
  },
  {
    link: '#',
    icon: 'vi.png',
  },
  {
    link: '#',
    icon: 'face.png',
  },
  {
    link: '#',
    icon: 'behance.png',
  },
  {
    link: '#',
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
