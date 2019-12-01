import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class ContactShowService {
  public onChange = new Subject();
  public shown = false;

  public show() {
    this.shown = true;
    this.onChange.next(this.shown);
  }

  public hide() {
    this.shown = false;
    this.onChange.next(this.shown);
  }

  public toggle() {
    if (this.shown) {
      this.hide();
    } else {
      this.show();
    }
  }
}
