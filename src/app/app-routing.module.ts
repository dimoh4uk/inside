import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppRoutersPath } from './app-routers.path';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: AppRoutersPath.index,
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
    path: '**',
    redirectTo: AppRoutersPath.errors,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
