import {Component} from '@angular/core';

import {RouterOutlet} from '@angular/router';
import {query, animate, style, transition, trigger} from '@angular/animations';
import {AppRoutersPath} from './app-routers.path';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('routeAnimation', [
      transition(`${AppRoutersPath.preloader} <=> ${AppRoutersPath.index}`, [
        query(':leave', style({opacity: 1}), {optional: true}),
        query(':enter', style({opacity: 0}), {optional: true}),
        query(':leave', animate('2s ease', style({opacity: 0})), {optional: true}),
        query(':enter', animate('1s', style({opacity: 1})), {optional: true}),
      ])
    ])
  ],
})
export class AppComponent {
  title = 'inside';

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }
}
