import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderlayoutComponent } from './layout/headerlayout/headerlayout.component';
import { IndexComponent } from './website/index/index.component';
import { UserregistrationComponent } from './website/userregistration/userregistration.component';
import { LaunchComponent } from './launch/launch.component';
import { AboutComponent } from './website/about/about.component';
import { CircularsComponent } from './website/circulars/circulars.component';
import { DashboardthreeComponent } from '../shared/dashboardthree/dashboardthree.component';
import { GswsBirthComponent } from '../shared/gsws-birth/gsws-birth.component';
import { GswsDeathComponent } from '../shared/gsws-death/gsws-death.component';
import { GswsBirthDataComponent } from './website/gsws-birth-data/gsws-birth-data.component';
import { GswsdeathdataComponent } from './website/gswsdeathdata/gswsdeathdata.component';
import { GswsbirthdeathComponent } from './website/gswsbirthdeath/gswsbirthdeath.component';
const routes: Routes = [
  {
    path: 'launch',
    component: LaunchComponent,
  },
  {
    path: 'dashboard',
    component: DashboardthreeComponent,
    // canActivate: [SesionService],
  },
  // {
  //   path: 'gsws-birth',
  //   component: GswsBirthDataComponent,
  //   // canActivate: [SesionService],
  // },
  // {
  //   path: 'gsws-death',
  //   component: GswsdeathdataComponent,
  //   // canActivate: [SesionService],
  // },

    {
    path: 'gsws-birth-death',
    component: GswsbirthdeathComponent,
    // canActivate: [SesionService],
  },
  {
    path: '',
    component: HeaderlayoutComponent,
    children: [
      {
        path: 'index',
        component: IndexComponent,
      },
      {
        path: 'userregistration',
        component: UserregistrationComponent,
      },
      {
        path: 'about',
        component: AboutComponent,
      },
      {
        path: 'circulars',
        component: CircularsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicRoutingModule { }
