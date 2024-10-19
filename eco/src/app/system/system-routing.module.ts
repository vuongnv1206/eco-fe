import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RoleComponent } from './role/role.component';

const routes: Routes = [
  {
    path: 'role',
    component: RoleComponent,

  },
  // {
  //   path: 'user',
  //   component: UserComponent,
  // },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
})
export class SystemRoutingModule { }
