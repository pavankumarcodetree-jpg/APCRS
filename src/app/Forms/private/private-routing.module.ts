import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './authnticate/login/login.component';
import { HeaderlayoutComponent } from '../public/layout/headerlayout/headerlayout.component';
import { UserregistrationComponent } from './shared/userregistration/userregistration.component';
import { NewloginComponent } from './authenticate/newlogin/newlogin.component';

const routes: Routes = [
  // {
  //   path: 'login',
  //   component: LoginComponent,
  // },
  {
    path: '',
    component: HeaderlayoutComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'newlogin',
        component: NewloginComponent,
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrivateRoutingModule {}
