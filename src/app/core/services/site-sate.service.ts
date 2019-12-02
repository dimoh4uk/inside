import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class SiteSateService {
  public headerAnimationStart = false;
  public onLoad = new Subject();

  protected loadedLocal = false;

  public startHeaderAnimation() {
    this.headerAnimationStart = true;
  }

  public stopHeaderAnimation() {
    this.headerAnimationStart = false;
  }

  get load(): boolean {
    return this.loadedLocal;
  }

  set load(value: boolean) {
    this.loadedLocal = value;
    this.onLoad.next(value);
  }

  public isLoaded(): boolean {
    return this.load;
  }
}
