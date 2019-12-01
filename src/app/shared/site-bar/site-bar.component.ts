import { Component, HostBinding, OnInit } from '@angular/core';
import { ContactShowService } from '../../core/services/contact-show.service';
import { fadeIn } from '../../core/animation';

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
    public contactShowService: ContactShowService,
  ) {
  }

  ngOnInit() {
    this.showContacts = this.contactShowService.shown;
    this.contactShowService.onChange
      .subscribe((value: boolean) => {
        console.log('value=:', value);
        this.showContacts = value;
      });
  }

}
