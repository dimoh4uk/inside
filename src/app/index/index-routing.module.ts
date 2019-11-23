import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndexComponent } from './components/index/index.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { RoutersPath } from './index.path';
import { PlayedGuard } from '../core/services/played-guard.service';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    children: [
      {
        path: RoutersPath.play,
        component: CategoriesComponent,
        canActivate: [PlayedGuard],
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IndexRoutingModule {
}
