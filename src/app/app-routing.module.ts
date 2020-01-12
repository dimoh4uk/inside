import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppRoutersPath } from './app-routers.path';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: AppRoutersPath.preloader,
  },
  {
    path: AppRoutersPath.preloader,
    loadChildren: () => import('./preloader/preloader.module').then(m => m.PreloaderModule),
  },
  {
    path: AppRoutersPath.index,
    loadChildren: () => import('./index/index.module').then(m => m.IndexModule)
  },
  {
    path: AppRoutersPath.errors,
    loadChildren: () => import('./errors/errors.module').then(m => m.ErrorsModule)
  },
  {
    path: AppRoutersPath.showVideo,
    loadChildren: () => import('./show-reel/show-reel.module').then(m => m.ShowReelModule)
  },
  {
    path: '**',
    redirectTo: AppRoutersPath.errors,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
