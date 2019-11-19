import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddRoutersPath } from './add-routers.path';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: AddRoutersPath.index,
  },
  {
    path: AddRoutersPath.index,
    loadChildren: () => import('./index/index.module').then(m => m.IndexModule)
  },
  {
    path: AddRoutersPath.errors,
    loadChildren: () => import('./errors/errors.module').then(m => m.ErrorsModule)
  },
  {
    path: '**',
    redirectTo: AddRoutersPath.errors,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
