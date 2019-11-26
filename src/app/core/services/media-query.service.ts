import { Injectable } from '@angular/core';
import { fromEvent, timer } from 'rxjs';
import { debounce, map } from 'rxjs/operators';

export enum Device {
  desktop,
  table,
  phone,
}

const screenSizes = {
  [Device.desktop]: {from: 1281, to: '*'},
  [Device.table]: {from: 641, to: 1280},
  [Device.phone]: {form: 0, to: 640},
};

@Injectable({
  providedIn: 'root'
})
export class MediaQueryService {
  public currentDevice: Device;

  public resizeSubject = fromEvent(window, 'resize')
    .pipe(
      debounce(() => timer(300)),
      map((e: any) => e.target.innerWidth),
      map((width) => this.transformPxToDeviceScreen(width))
    );

  constructor() {
    this.initCurrentDevice();
    this.resizeSubject.subscribe((device: Device) => this.initCurrentDevice(device));
  }

  initCurrentDevice(device = this.transformPxToDeviceScreen(this.windowWidth)): void {
    this.currentDevice = device;
    console.log(device);
  }

  public transformPxToDeviceScreen(px: number): Device {
    const min = screenSizes[Device.phone].to;
    const max = screenSizes[Device.desktop].from;
    if (px >= max) {
      return Device.desktop;
    }
    if (px <= min) {
      return Device.phone;
    }
    return Device.table;
  }

  public isDesktop(): boolean {
    return this.currentDevice === Device.desktop;
  }

  public isTable(): boolean {
    return this.currentDevice === Device.table;
  }

  public isPhone(): boolean {
    return this.currentDevice === Device.phone;
  }

  get windowWidth(): number {
    return window.innerWidth;
  }
}
