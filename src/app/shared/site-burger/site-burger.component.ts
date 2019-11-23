import { Component, HostListener, Input, OnInit } from '@angular/core';

export interface SiteMenuItem {
  label: string;
  link: string;
}

@Component({
  selector: 'app-site-burger',
  templateUrl: './site-burger.component.html',
  styleUrls: ['./site-burger.component.scss']
})
export class SiteBurgerComponent implements OnInit {
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
  public toggle($event) {
    debugger;
    this.showMenu = !this.showMenu;
  }

  ngOnInit() {
  }

}
