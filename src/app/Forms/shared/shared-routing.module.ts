import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '../shared/dashboard/dashboard.component';
import { InboxComponent } from '../shared/inbox/inbox.component';
import { ReportsComponent } from '../reports/reports/reports.component';
import { WelcomeComponent } from '../shared/welcome/welcome.component';
import { LayoutComponent } from '../shared/layout/layout.component';
import { SesionService } from 'src/app/services/session_lyr/sesion.service';
import { SearchBirthEventComponent } from './event/search-birth-event/search-birth-event.component';
import { SearchDeathEventComponent } from './event/search-death-event/search-death-event.component';
import { SearchAdoptionEventComponent } from './event/search-adoption-event/search-adoption-event.component';
import { DashboardtwoComponent } from './dashboardtwo/dashboardtwo.component';
import { MonitoringReportComponent } from '../reports/monitoring/monitoring-report/monitoring-report.component';
import { AddNameComponent } from './event/add-name/add-name.component';
import { CorrectionFormComponent } from './event/correction-form/correction-form.component';
import { DashboardthreeComponent } from './dashboardthree/dashboardthree.component';
import { DraftComponent } from './draft/draft.component';
import { NacSearchBirthEventComponent } from './event/nac-search-birth-event/nac-search-birth-event.component';
import { NacSearchDeathEventComponent } from './event/nac-search-death-event/nac-search-death-event.component';
import { SearchstillbirthEventComponent } from './event/searchstillbirth-event/searchstillbirth-event.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { BirthseekclarificationComponent } from './sharedviews/seekclarification/birthseekclarification/birthseekclarification.component';
import { NacSearchAdoptionEventComponent } from './event/nac-search-adoption-event/nac-search-adoption-event.component';
import { NacSearchStillbirthEventComponent } from './event/nac-search-stillbirth-event/nac-search-stillbirth-event.component';
import { SearchForeignBirthEventComponent } from './event/search-foreign-birth-event/search-foreign-birth-event.component';
import { StillbirthclarificationComponent } from './sharedviews/seekclarification/stillbirthclarification/stillbirthclarification.component';
import { BirthCancellationComponent } from './seekclarificationsubmission/birth-cancellation/birth-cancellation.component';
import { DeathCancellationComponent } from './seekclarificationsubmission/death-cancellation/death-cancellation.component';
import { DashboardFourComponent } from './dashboard-four/dashboard-four.component';
import { DashboardFiveComponent } from './dashboard-five/dashboard-five.component';
import { DashboardSixComponent } from './dashboard-six/dashboard-six.component';
import { DashboardsevenComponent } from './dashboardseven/dashboardseven.component';
import { DashboardeightComponent } from './dashboardeight/dashboardeight.component';
import { GswsBirthComponent } from './gsws-birth/gsws-birth.component';
import { GswsDeathComponent } from './gsws-death/gsws-death.component';
import { GswsbirthdeathDataComponent } from './gswsbirthdeath-data/gswsbirthdeath-data.component';
import { TabsSecLComponent } from './metric/tabs-sec-l/tabs-sec-l.component';
import { TabsBRSComponent } from './metric/tabs-brs/tabs-brs.component';
import { DashboardNineComponent } from './dashboard-nine/dashboard-nine.component';
import { ParametersSecretariatDrilldownComponent } from './metric/parameters-secretariat-drilldown/parameters-secretariat-drilldown.component';
import { ParametersVillageDrilldownComponent } from './metric/parameters-village-drilldown/parameters-village-drilldown.component';
import { DashboardtenComponent } from './dashboardten/dashboardten.component';
import { DashboardtenOldComponent } from './dashboardtenold/dashboardtenold.component';
import { DistrictPopulationDashboardComponent } from './district-population-dashboard/district-population-dashboard.component';


const routes: Routes = [
    {
        path: 'dashboardthree',
        component: DashboardthreeComponent,
        canActivate: [SesionService],
    },

    {
        path: 'dashboardtwo',
        component: DashboardtwoComponent,
        canActivate: [SesionService],
    },
    {
        path: 'dashboardFour',
        component: DashboardFourComponent,
        canActivate: [SesionService],
    },
    {
        path: 'dashboardFive',
        component: DashboardFiveComponent,
        canActivate: [SesionService],
    },
    {
        path: 'dashboardsix',
        component: DashboardSixComponent,
        canActivate: [SesionService],
    },
    {
        path: 'dashboardseven',
        component: DashboardsevenComponent,
        canActivate: [SesionService],
    },
    {
        path: 'dashboardeight',
        component: DashboardeightComponent,
        canActivate: [SesionService],
    },
    {
        path: 'dashboardnine',
        component: DashboardNineComponent,
        canActivate: [SesionService],
    },
    {
        path: 'dashboard',
        component: DashboardtenComponent,
        canActivate: [SesionService],
    },
    {
        path: 'dashboardtenold',
        component: DashboardtenOldComponent,
        canActivate: [SesionService],
    },

        {
        path: 'district-population',
        component: DistrictPopulationDashboardComponent,
        canActivate: [SesionService],
    },
    {
        path: 'gsws-birth-data',
        component: GswsBirthComponent,
        canActivate: [SesionService],
    },
    {
        path: 'gsws-death-data',
        component: GswsDeathComponent,
        canActivate: [SesionService],
    },

    {
        path: 'Tabs-TFR',
        component: TabsSecLComponent,
        canActivate: [SesionService],
    },
    {
        path: 'Tabs-BRS',
        component: TabsBRSComponent,
        canActivate: [SesionService],
    },

    {
        path: 'Tabs-SEC',
        component: ParametersSecretariatDrilldownComponent,
        canActivate: [SesionService],
    },
    {
        path: 'Tabs-VILLS',
        component: ParametersVillageDrilldownComponent,
        canActivate: [SesionService],
    },


    {
        path: '',
        component: LayoutComponent,
        canActivate: [SesionService],
        children: [
            {
                path: 'welcome',
                component: WelcomeComponent,
                canActivate: [SesionService],
            }, {
                path: 'dashboard',
                component: DashboardComponent,
                canActivate: [SesionService],
            }, {
                path: 'inbox',
                component: InboxComponent,
                canActivate: [SesionService],
            }, {
                path: 'reports',
                component: ReportsComponent,
                canActivate: [SesionService],

            }, {
                path: 'SearchBirthEvent',
                component: SearchBirthEventComponent,
                canActivate: [SesionService],
            },
            {
                path: 'SearchDeathEvent',
                component: SearchDeathEventComponent,
                canActivate: [SesionService],
            },
            {
                path: 'SearchAdoptionEvent',
                component: SearchAdoptionEventComponent,
                canActivate: [SesionService],
            }, {
                path: 'SearchstillbirthEvent',
                component: SearchstillbirthEventComponent,
                canActivate: [SesionService],
            }, {
                path: 'monitoring-report',
                component: MonitoringReportComponent,
                canActivate: [SesionService],
            }, {
                path: 'add-name',
                component: AddNameComponent,
                canActivate: [SesionService],
            }, {
                path: 'correction-details',
                component: CorrectionFormComponent,
                canActivate: [SesionService],
            }, {
                path: 'draft',
                component: DraftComponent,
                canActivate: [SesionService],
            }, {
                path: 'SearchBirthNAC',
                component: NacSearchBirthEventComponent,
                canActivate: [SesionService],
            }, {
                path: 'SearchDeathNAC',
                component: NacSearchDeathEventComponent,
                canActivate: [SesionService],
            }, {
                path: 'SearchAdoptionNAC',
                component: NacSearchAdoptionEventComponent,
                canActivate: [SesionService],
            }, {
                path: 'SearchStillBirthNAC',
                component: NacSearchStillbirthEventComponent,
                canActivate: [SesionService],
            }, {
                path: 'SearchForeignBirthEvent',
                component: SearchForeignBirthEventComponent,
                canActivate: [SesionService],
            }, {
                path: 'BirthCancellation',
                component: BirthCancellationComponent,
                canActivate: [SesionService],
            }, {
                path: 'DeathCancellation',
                component: DeathCancellationComponent,
                canActivate: [SesionService],
            },
            {
                path: 'gsws-birth',
                component: GswsBirthComponent,
                // canActivate: [SesionService],
            },
            {
                path: 'gsws-death',
                component: GswsDeathComponent,
                // canActivate: [SesionService],
            },

            {
                path: 'gsws-birth-death-data',
                component: GswsbirthdeathDataComponent,
                canActivate: [SesionService],
            },

        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    // exports: [RouterModule],
})
export class SharedRoutingModule { }
