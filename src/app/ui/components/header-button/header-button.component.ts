import {Component, HostBinding, HostListener, Input, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {SiteSateService} from '../../../core/services/site-sate.service';
import {MediaQueryService} from '../../../core/services/media-query.service';

enum StateName {
  stop = 'hidden',
  start = 'show',
}

@Component({
  selector: 'app-header-button',
  templateUrl: './header-button.component.html',
  styleUrls: ['./header-button.component.scss'],
  animations: [
    trigger('circleTrigger', [
      state('hidden', style({
        height: 0,
        width: 0,
        opacity: 0,
      })),
      state('show', style({
        height: '88px',
        width: '88px',
        opacity: 1,
      })),
      transition('hidden <=> show', [
        animate('0.2s ease'),
      ]),
    ]),
    trigger('arrowTrigger', [
      state('hidden', style({
        width: '*',
        paddingLeft: '0px',
      })),
      state('show', style({
        width: '100%',
        paddingLeft: '92px',
      })),
      transition('hidden <=> show', [
        animate('0.7s')
      ]),
    ]),
    trigger('arrowTriggerPhone', [
      state('hidden', style({
        left: '*',
      })),
      state('show', style({
        left: '50%',
      })),
      transition('hidden <=> show', [
        animate('0.7s')
      ]),
    ]),
    trigger('titleTrigger', [
      state('hidden', style({
        width: '*',
      })),
      state('show', style({
        width: '100%',
      })),
      transition('hidden <=> show', [
        animate('0.7s')
      ]),
    ]),
  ]
})
export class HeaderButtonComponent implements OnInit {
  @Input() public buttonText = '';
  @Input() public start = false;

  @HostBinding('attr.tabindex') tabindex = '1';

  constructor(
    protected siteSateService: SiteSateService,
    protected mediaQueryService: MediaQueryService,
  ) {
  }

  ngOnInit() {
  }

  public isPhone() {
    return this.mediaQueryService.isPhone();
  }

  getAnimationState() {
    return this.siteSateService.headerAnimationStart ? 'show' : 'hidden';
  }
}
