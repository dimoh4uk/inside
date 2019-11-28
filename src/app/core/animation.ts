import { animate, state, style, transition, trigger } from '@angular/animations';

export const fadeIn = trigger('fadeIn', [
  state('void', style({
    opacity: 0
  })),
  transition('void => *', animate(1200)),
]);

export const fadeOut = trigger('fadeOut', [
  state('void', style({
    opacity: 0
  })),
  transition('* => void', animate(1200)),
]);
