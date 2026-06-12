import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { B1Component } from './Birth/b1/b1.component';
import { SesionService } from 'src/app/services/session_lyr/sesion.service';
import { LayoutComponent } from '../shared/layout/layout.component';
import { B20Component } from './Birth/b20/b20.component';
import { B2Component } from './Birth/b2/b2.component';
import { B3Component } from './Birth/b3/b3.component';
import { B4Component } from './Birth/b4/b4.component';
import { B5Component } from './Birth/b5/b5.component';
import { B6Component } from './Birth/b6/b6.component';
import { B7Component } from './Birth/b7/b7.component';
import { B8Component } from './Birth/b8/b8.component';
import { B9Component } from './Birth/b9/b9.component';
import { B10Component } from './Birth/b10/b10.component';
import { B11Component } from './Birth/b11/b11.component';
import { B12Component } from './Birth/b12/b12.component';
import { B13Component } from './Birth/b13/b13.component';
import { B14Component } from './Birth/b14/b14.component';
import { B15Component } from './Birth/b15/b15.component';
import { B16Component } from './Birth/b16/b16.component';
import { B17Component } from './Birth/b17/b17.component';
import { B18Component } from './Birth/b18/b18.component';
import { B19Component } from './Birth/b19/b19.component';
import { B21Component } from './Birth/b21/b21.component';
import { B22Component } from './Birth/b22/b22.component';
import { B23Component } from './Birth/b23/b23.component';
import { D1Component } from './Death/d1/d1.component';
import { D21Component } from './Death/d21/d21.component';
import { D20Component } from './Death/d20/d20.component';
import { D19Component } from './Death/d19/d19.component';
import { D18Component } from './Death/d18/d18.component';
import { D17Component } from './Death/d17/d17.component';
import { D16Component } from './Death/d16/d16.component';
import { D15Component } from './Death/d15/d15.component';
import { D14Component } from './Death/d14/d14.component';
import { D13Component } from './Death/d13/d13.component';
import { D12Component } from './Death/d12/d12.component';
import { D11Component } from './Death/d11/d11.component';
import { D10Component } from './Death/d10/d10.component';
import { D9Component } from './Death/d9/d9.component';
import { D7Component } from './Death/d7/d7.component';
import { D6Component } from './Death/d6/d6.component';
import { D5Component } from './Death/d5/d5.component';
import { D4Component } from './Death/d4/d4.component';
import { D3Component } from './Death/d3/d3.component';
import { D2Component } from './Death/d2/d2.component';
import { S7Component } from './StillBirth/s7/s7.component';
import { S6Component } from './StillBirth/s6/s6.component';
import { S5Component } from './StillBirth/s5/s5.component';
import { S4Component } from './StillBirth/s4/s4.component';
import { S3Component } from './StillBirth/s3/s3.component';
import { S2Component } from './StillBirth/s2/s2.component';
import { S1Component } from './StillBirth/s1/s1.component';
import { MonitoringReportComponent } from './monitoring/monitoring-report/monitoring-report.component';
import { D8Component } from './Death/d8/d8.component';
const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        canActivate: [SesionService],
        children: [
            {
                path: 'b1',
                component: B1Component,
                canActivate: [SesionService],
            },
            {
                path: 'b2',
                component: B2Component,
                canActivate: [SesionService],
            },
            {
                path: 'b3',
                component: B3Component,
                canActivate: [SesionService],
            },
            {
                path: 'b4',
                component: B4Component,
                canActivate: [SesionService],
            },
            {
                path: 'b5',
                component: B5Component,
                canActivate: [SesionService],
            },
            {
                path: 'b6',
                component: B6Component,
                canActivate: [SesionService],
            },
            {
                path: 'b7',
                component: B7Component,
                canActivate: [SesionService],
            },
            {
                path: 'b8',
                component: B8Component,
                canActivate: [SesionService],
            },
            {
                path: 'b9',
                component: B9Component,
                canActivate: [SesionService],
            },
            {
                path: 'b10',
                component: B10Component,
                canActivate: [SesionService],
            },
            {
                path: 'b11',
                component: B11Component,
                canActivate: [SesionService],
            },
            {
                path: 'b12',
                component: B12Component,
                canActivate: [SesionService],
            },
            {
                path: 'b13',
                component: B13Component,
                canActivate: [SesionService],
            },
            {
                path: 'b14',
                component: B14Component,
                canActivate: [SesionService],
            },
            {
                path: 'b15',
                component: B15Component,
                canActivate: [SesionService],
            },
            {
                path: 'b16',
                component: B16Component,
                canActivate: [SesionService],
            },
            {
                path: 'b17',
                component: B17Component,
                canActivate: [SesionService],
            },
            {
                path: 'b18',
                component: B18Component,
                canActivate: [SesionService],
            },
            {
                path: 'b19',
                component: B19Component,
                canActivate: [SesionService],
            },
            {
                path: 'b20',
                component: B20Component,
                canActivate: [SesionService],
            },
            {
                path: 'b21',
                component: B21Component,
                canActivate: [SesionService],
            },
            {
                path: 'b22',
                component: B22Component,
                canActivate: [SesionService],
            },
            {
                path: 'b23',
                component: B23Component,
                canActivate: [SesionService],
            },
            {
                path: 'd1',
                component: D1Component,
                canActivate: [SesionService],
            },
            {
                path: 'd2',
                component: D2Component,
                canActivate: [SesionService],
            },
            {
                path: 'd3',
                component: D3Component,
                canActivate: [SesionService],
            },
            {
                path: 'd4',
                component: D4Component,
                canActivate: [SesionService],
            },
            {
                path: 'd5',
                component: D5Component,
                canActivate: [SesionService],
            },
            {
                path: 'd7',
                component: D7Component,
                canActivate: [SesionService],
            },
            {
                path: 'd6',
                component: D6Component,
                canActivate: [SesionService],
            },
            {
                path: 'd8',
                component: D8Component,
                canActivate: [SesionService],
            },
            {
                path: 'd9',
                component: D9Component,
                canActivate: [SesionService],
            },
            {
                path: 'd10',
                component: D10Component,
                canActivate: [SesionService],
            },
            {
                path: 'd11',
                component: D11Component,
                canActivate: [SesionService],
            },
            {
                path: 'd12',
                component: D12Component,
                canActivate: [SesionService],
            },
            {
                path: 'd13',
                component: D13Component,
                canActivate: [SesionService],
            },
            {
                path: 'd14',
                component: D14Component,
                canActivate: [SesionService],
            },
            {
                path: 'd15',
                component: D15Component,
                canActivate: [SesionService],
            },
            {
                path: 'd16',
                component: D16Component,
                canActivate: [SesionService],
            },
            {
                path: 'd17',
                component: D17Component,
                canActivate: [SesionService],
            },
            {
                path: 'd18',
                component: D18Component,
                canActivate: [SesionService],
            },
            {
                path: 'd19',
                component: D19Component,
                canActivate: [SesionService],
            },
            {
                path: 'd20',
                component: D20Component,
                canActivate: [SesionService],
            },
            {
                path: 'd21',
                component: D21Component,
                canActivate: [SesionService],
            },
            {
                path: 's1',
                component: S1Component,
                canActivate: [SesionService],
            },
            {
                path: 's2',
                component: S2Component,
                canActivate: [SesionService],
            },
            {
                path: 's3',
                component: S3Component,
                canActivate: [SesionService],
            },
            {
                path: 's4',
                component: S4Component,
                canActivate: [SesionService],
            },
            {
                path: 's5',
                component: S5Component,
                canActivate: [SesionService],
            },
            {
                path: 's6',
                component: S6Component,
                canActivate: [SesionService],
            },
            {
                path: 's7',
                component: S7Component,
                canActivate: [SesionService],
            }

        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ReportsRoutingModule { }
