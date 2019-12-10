import {Component, HostBinding, HostListener, OnInit} from '@angular/core';
import {ContactShowService} from '../../core/services/contact-show.service';

@Component({
  selector: 'app-site-burger',
  templateUrl: './site-burger.component.html',
  styleUrls: ['./site-burger.component.scss'],
})
export class SiteBurgerComponent implements OnInit {
  @HostBinding('class.open') public open = this.contactShowService.shown;

  @HostListener('click')
  public toggle() {
    this.contactShowService.toggle();
  }

  constructor(
    protected contactShowService: ContactShowService,
  ) {
  }

  ngOnInit() {
    this.open = this.contactShowService.shown;
    this.contactShowService.onChange
      .subscribe((value: boolean) => {
        this.open = value;
      });
  }
}
