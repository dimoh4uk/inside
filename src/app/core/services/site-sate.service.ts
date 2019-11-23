import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class SiteSateService {
  public onPlay = new Subject();
  public headerAnimationStart = false;
  protected playedLocal = false;

  get played(): boolean {
    return this.playedLocal;
  }

  set played(value: boolean) {
    this.playedLocal = value;
    this.onPlay.next(value);
  }

  public isPlayed(): boolean {
    return this.played;
  }

  public play(): void {
    this.played = true;
  }

  public stop(): void {
    this.played = false;
  }

  public startHeaderAnimaton() {
    this.headerAnimationStart = true;
  }
}
