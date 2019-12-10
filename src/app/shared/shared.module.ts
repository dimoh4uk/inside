import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SiteBarComponent} from './site-bar/site-bar.component';
import {RouterModule} from '@angular/router';
import {SiteBurgerComponent} from './site-burger/site-burger.component';

@NgModule({
  declarations: [
    SiteBarComponent,
    SiteBurgerComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    CommonModule,
    SiteBarComponent,
    SiteBurgerComponent,
  ]
})
export class SharedModule {
}
