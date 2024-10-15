import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from './layout/app.layout.component';
const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
    component: AppLayoutComponent
  },
//   {
//     path: 'auth',
//     loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
//   },
  // {
  //   path: 'catalog',
  //   loadChildren: () => import('./catalog/catalog.module').then(m => m.CatalogModule),
  //   component: AppLayoutComponent
  // },
  // {
  //   path: 'system',
  //   loadChildren: () => import('./system/system.module').then(m => m.SystemModule),
  //   component: AppLayoutComponent
  // },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }