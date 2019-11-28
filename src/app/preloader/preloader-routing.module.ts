import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PreloaderComponent } from './preloader.component';
import { AppRoutersPath } from '../app-routers.path';

const routes: Routes = [
  {
    path: '',
    component: PreloaderComponent,
    data: {
      animation: AppRoutersPath.preloader,
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PreloaderRoutingModule {
}
