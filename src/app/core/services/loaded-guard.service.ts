import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SiteSateService } from './site-sate.service';
import { AppRoutersPath } from '../../app-routers.path';

@Injectable({
  providedIn: 'root',
})
export class LoadedGuard implements CanActivate {
  constructor(
    protected siteSateService: SiteSateService,
    protected router: Router,
  ) {

  }

  public canActivate(
    route: ActivatedRouteSnapshot, state: RouterStateSnapshot,
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.siteSateService.isLoaded()) {
      return this.redirectToLoading();
    }
    return true;
  }

  redirectToLoading() {
    return this.router.navigate(['/' + AppRoutersPath.preloader]);
  }
}
