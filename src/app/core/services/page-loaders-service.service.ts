import { Injectable } from '@angular/core';

enum LoaderClass {
  show = 'show',
}

@Injectable({
  providedIn: 'root'
})
export class PageLoadersServiceService {
  fullPageLoader: HTMLElement = document.querySelector('.fullPageLoader');

  constructor() {
  }

  showMainLoader() {
    this.addClass(this.fullPageLoader, LoaderClass.show);
  }

  hideMainLoader() {
    this.deleteClasses(this.fullPageLoader, LoaderClass.show);
  }

  addClass(selector: HTMLElement, classes: Array<string> | string) {
    selector.classList.add(...[].concat(classes));
  }

  deleteClasses(selector: HTMLElement, classes: Array<string> | string) {
    selector.classList.remove(...[].concat(classes));
  }
}
