import { Component, HostBinding, HostListener, Input, OnInit } from '@angular/core';
import { fadeIn, fadeOut } from '../../core/animation';

export interface SiteMenuItem {
  label: string;
  link: string;
}

@Component({
  selector: 'app-site-burger',
  templateUrl: './site-burger.component.html',
  styleUrls: ['./site-burger.component.scss'],
  animations: [
    fadeIn,
    fadeOut,
  ]
})
export class SiteBurgerComponent implements OnInit {
  @HostBinding('@fadeIn') public fadeIn;
  @HostBinding('@fadeOut') public fadeOut;

  @Input() menu: Array<SiteMenuItem> = [
    {
      label: 'Blog',
      link: '#1',
    }, {
      label: 'About',
      link: '#2',
    },
  ];

  public showMenu = false;

  constructor() {
  }

  @HostListener('click', ['$event'])
  public toggle() {
    // this.showMenu = !this.showMenu;
  }

  ngOnInit() {
  }

}
