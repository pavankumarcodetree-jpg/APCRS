import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BadrequestComponent } from './Forms/security/badrequest/badrequest.component';
import { LogoutComponent } from './Forms/security/logout/logout.component';
import { SessionexpiredComponent } from './Forms/security/sessionexpired/sessionexpired.component';
import { UnauthorizedaccessComponent } from './Forms/security/unauthorizedaccess/unauthorizedaccess.component';
import { DashboardFiveComponent } from './Forms/shared/dashboard-five/dashboard-five.component';
import { SesionService } from './services/session_lyr/sesion.service';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home/index',
    },
    // {
    //     path: '',
    //     pathMatch: 'full',
    //     // component: DashboardFiveComponent,
    //     redirectTo: 'shared/dashboardten',
    //     // canActivate: [SesionService],
    // },
    {
        path: 'auth',
        loadChildren: () =>
            import('./Forms/private/private.module').then((pr) => pr.PrivateModule),
    },
    {
        path: 'home',
        loadChildren: () =>
            import('./Forms/public/public.module').then((pb) => pb.PublicModule),
    },
    {
        path: 'reg',
        loadChildren: () =>
            import('./Forms/registrations/registrations.module').then(
                (re) => re.RegistrationsModule
            ),
    },
    {
        path: 'masters',
        loadChildren: () =>
            import('./Forms/masters/masters.module').then((mm) => mm.MastersModule),
    },
    {
        path: 'shared',
        loadChildren: () =>
            import('./Forms/shared/shared.module').then((sh) => sh.SharedModule),
    },
    {
        path: 'reports',
        loadChildren: () =>
            import('./Forms/reports/reports.module').then((re) => re.ReportsModule),
    },
    {
        path: 'Badrequest',
        component: BadrequestComponent,
    },
    {
        path: 'Logout',
        component: LogoutComponent,
    },
    {
        path: 'Sessionexpired',
        component: SessionexpiredComponent,
    },
    {
        path: 'Unauthorizedaccess',
        component: UnauthorizedaccessComponent,
    },
    {
        path: '**',
        pathMatch: 'full',
        component: BadrequestComponent,
    },
];

@NgModule({
    //imports: [RouterModule.forRoot(routes)],
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule],
})
export class AppRoutingModule { }
