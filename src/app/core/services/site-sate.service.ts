import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class SiteSateService {
  public onPlay = new Subject();
  public headerAnimationStart = false;
  public onLoad = new Subject();

  protected playedLocal = false;
  protected loadedLocal = false;

  public startHeaderAnimation() {
    this.headerAnimationStart = true;
  }

  public stopHeaderAnimation() {
    this.headerAnimationStart = false;
  }

  get play(): boolean {
    return this.playedLocal;
  }

  set play(value: boolean) {
    this.playedLocal = value;
    this.onPlay.next(value);
  }


  public isPlayed(): boolean {
    return this.play;
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
