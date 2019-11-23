import { Component, HostBinding, HostListener, Input, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { SiteSateService } from '../../../core/services/site-sate.service';

enum TriggerName {
  circle = 'circleTrigger',
  arrow = 'arrowTrigger',
}

enum StateName {
  stop = 'hidden',
  start = 'show',
}

@Component({
  selector: 'app-header-button',
  templateUrl: './header-button.component.html',
  styleUrls: ['./header-button.component.scss'],
  animations: [
    trigger(TriggerName.circle, [
      state(StateName.stop, style({
        height: 0,
        width: 0,
        opacity: 0,
      })),
      state(StateName.start, style({
        height: '88px',
        width: '88px',
        opacity: 1,
      })),
      transition(`${StateName.stop}<=>${StateName.start}`, [
        animate('0.2s ease'),
      ]),
    ]),
    trigger(TriggerName.arrow, [
      state(StateName.stop, style({
        width: '*',
        paddingLeft: '0px',
      })),
      state(StateName.start, style({
        width: '100%',
        paddingLeft: '92px',
      })),
      transition(`${StateName.stop}<=>${StateName.start}`, [
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
  ) {
  }

  ngOnInit() {
  }


  getAnimationState() {
    return this.siteSateService.headerAnimationStart ? StateName.start : StateName.stop;
  }
}
