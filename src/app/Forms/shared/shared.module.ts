import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';
import { NgSelectModule } from '@ng-select/ng-select';
import { AgChartsAngularModule } from 'ag-charts-angular';
import { AgGridModule } from 'ag-grid-angular';
import { QRCodeModule } from 'angularx-qrcode';
import { NgApexchartsModule } from 'ng-apexcharts';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { ProgressBarModule } from 'primeng/progressbar';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { DashboardComponent } from '../shared/dashboard/dashboard.component';
import { InboxComponent } from '../shared/inbox/inbox.component';
import { ReportsComponent } from '../reports/reports/reports.component';
import { WelcomeComponent } from '../shared/welcome/welcome.component';
import { LayoutComponent } from '../shared/layout/layout.component';
import { NgxDocViewerModule } from 'ngx-doc-viewer';
import { SearchBirthEventComponent } from './event/search-birth-event/search-birth-event.component';
import { SearchDeathEventComponent } from './event/search-death-event/search-death-event.component';
import { NgxMatTimepickerModule } from 'ngx-mat-timepicker';
import { HighchartsChartModule } from 'highcharts-angular';
import { ApplicationinfoComponent } from './sharedviews/applicationinfo/applicationinfo.component';
import { BirthviewComponent } from './sharedviews/birthview/birthview.component';
import { DeathviewComponent } from './sharedviews/deathview/deathview.component';
import { StillbirthviewComponent } from './sharedviews/stillbirthview/stillbirthview.component';
import { AdoptionviewComponent } from './sharedviews/adoptionview/adoptionview.component';
import { HistoryComponent } from './sharedviews/history/history.component';
import { SearchAdoptionEventComponent } from './event/search-adoption-event/search-adoption-event.component';
import { DashboardtwoComponent } from './dashboardtwo/dashboardtwo.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { MonitoringReportComponent } from '../reports/monitoring/monitoring-report/monitoring-report.component';
import { SharedvalidationModule } from 'src/app/thirparty/sharedvalidation/sharedvalidation.module';
import { StillbirthcorrectionviewComponent } from './sharedviews/correctionviews/stillbirthcorrectionview/stillbirthcorrectionview.component';
import { ChipModule } from 'primeng/chip';
import { FloatLabelModule } from 'primeng/floatlabel';
import { BirthcorrectionviewComponent } from './sharedviews/correctionviews/birthcorrectionview/birthcorrectionview.component';
import { DeathcorrectionviewComponent } from './sharedviews/correctionviews/deathcorrectionview/deathcorrectionview.component';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CorrectionFormComponent } from './event/correction-form/correction-form.component';
import { AddNameComponent } from './event/add-name/add-name.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { DashboardthreeComponent } from './dashboardthree/dashboardthree.component';
import { DropdownModule } from 'primeng/dropdown';
import { RegistrationsModule } from '../registrations/registrations.module';
import { DraftComponent } from './draft/draft.component';
import { NacSearchBirthEventComponent } from './event/nac-search-birth-event/nac-search-birth-event.component';
import { NacSearchDeathEventComponent } from './event/nac-search-death-event/nac-search-death-event.component';
import { NacSearchAdoptionEventComponent } from './event/nac-search-adoption-event/nac-search-adoption-event.component';
import { NacSearchStillbirthEventComponent } from './event/nac-search-stillbirth-event/nac-search-stillbirth-event.component';
import { SearchstillbirthEventComponent } from './event/searchstillbirth-event/searchstillbirth-event.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { ShareddirModule } from 'src/app/thirparty/shareddir/shareddir.module';
import { BirthseekclarificationComponent } from './sharedviews/seekclarification/birthseekclarification/birthseekclarification.component';
import { AdoptioncorrectionviewComponent } from './sharedviews/correctionviews/adoptioncorrectionview/adoptioncorrectionview.component';
import { DeathseekclarificationComponent } from './sharedviews/seekclarification/deathseekclarification/deathseekclarification.component';
import { SearchForeignBirthEventComponent } from './event/search-foreign-birth-event/search-foreign-birth-event.component';
import { StillbirthclarificationComponent } from './sharedviews/seekclarification/stillbirthclarification/stillbirthclarification.component';
import { DeathpopupviewComponent } from './viewpopups/deathpopupview/deathpopupview.component';
import { AdoptionpopupviewComponent } from './viewpopups/adoptionpopupview/adoptionpopupview.component';
import { BirthpopupviewComponent } from './viewpopups/birthpopupview/birthpopupview.component';
import { StillbirthpopupviewComponent } from './viewpopups/stillbirthpopupview/stillbirthpopupview.component';
import { BirthCancellationComponent } from './seekclarificationsubmission/birth-cancellation/birth-cancellation.component';
import { OlddeathcorrectionviewComponent } from './sharedviews/correctionviews/olddeathcorrectionview/olddeathcorrectionview.component';
import { OldbirthcorrectionviewComponent } from './sharedviews/correctionviews/oldbirthcorrectionview/oldbirthcorrectionview.component';
import { DeathCancellationComponent } from './seekclarificationsubmission/death-cancellation/death-cancellation.component';
import { DashboardFourComponent } from './dashboard-four/dashboard-four.component';
import { DashboardFiveComponent } from './dashboard-five/dashboard-five.component';
import { DashboardSixComponent } from './dashboard-six/dashboard-six.component';
import { DashboardsevenComponent } from './dashboardseven/dashboardseven.component';
import { DashboardeightComponent } from './dashboardeight/dashboardeight.component';
import { TmNgOdometerModule } from 'odometer-ngx';
import { GswsBirthComponent } from './gsws-birth/gsws-birth.component';
import { GswsDeathComponent } from './gsws-death/gsws-death.component';
import { GswsbirthdeathDataComponent } from './gswsbirthdeath-data/gswsbirthdeath-data.component';
import { TabsSecLComponent } from './metric/tabs-sec-l/tabs-sec-l.component';
import { TabsBRSComponent } from './metric/tabs-brs/tabs-brs.component';
import { DashboardNineComponent } from './dashboard-nine/dashboard-nine.component';
import { ParametersSecretariatDrilldownComponent } from './metric/parameters-secretariat-drilldown/parameters-secretariat-drilldown.component';
import { ParametersVillageDrilldownComponent } from './metric/parameters-village-drilldown/parameters-village-drilldown.component';
import { DashboardtenComponent } from './dashboardten/dashboardten.component';
import {DashboardtenOldComponent} from './dashboardtenold/dashboardtenold.component';
import { DistrictPopulationDashboardComponent } from './district-population-dashboard/district-population-dashboard.component';
import { DialogModule } from 'primeng/dialog';

@NgModule({
    declarations: [
        DashboardComponent,
        InboxComponent,
        ReportsComponent,
        WelcomeComponent,
        LayoutComponent,
        SearchBirthEventComponent,
        SearchDeathEventComponent,
        HistoryComponent,
        ApplicationinfoComponent,
        SearchAdoptionEventComponent,
        BirthviewComponent,
        DeathviewComponent,
        StillbirthviewComponent,
        AdoptionviewComponent,
        DashboardtwoComponent,
        MonitoringReportComponent,
        StillbirthcorrectionviewComponent,
        BirthcorrectionviewComponent,
        DeathcorrectionviewComponent,
        CorrectionFormComponent,
        AddNameComponent,
        DashboardthreeComponent,
        DraftComponent,
        NacSearchBirthEventComponent,
        NacSearchDeathEventComponent,
        SearchstillbirthEventComponent,
        ChangepasswordComponent,
        BirthseekclarificationComponent,
        AdoptioncorrectionviewComponent,
        DeathseekclarificationComponent,
        NacSearchAdoptionEventComponent,
        NacSearchStillbirthEventComponent,
        SearchForeignBirthEventComponent,
        StillbirthclarificationComponent,
        DeathpopupviewComponent,
        AdoptionpopupviewComponent,
        BirthpopupviewComponent,
        StillbirthpopupviewComponent,
        BirthCancellationComponent,
        DeathCancellationComponent,
        OlddeathcorrectionviewComponent,
        OldbirthcorrectionviewComponent,
        DashboardFourComponent,
        DashboardFiveComponent,
        DashboardSixComponent,
        DashboardsevenComponent,
        DashboardeightComponent,
        GswsBirthComponent,
        GswsDeathComponent,
        GswsbirthdeathDataComponent,
        TabsSecLComponent,
        TabsBRSComponent,
        DashboardNineComponent,
        ParametersSecretariatDrilldownComponent,
        ParametersVillageDrilldownComponent,
        DashboardtenComponent,
        DashboardtenOldComponent,
        DistrictPopulationDashboardComponent

    ],
    imports: [
        CommonModule,
        SharedRoutingModule,
        CommonModule,
        FormsModule,
        ShareddirModule,
        ReactiveFormsModule,
        NgSelectModule,
        NgMultiSelectDropDownModule.forRoot(),
        TimepickerModule.forRoot(),
        BsDatepickerModule.forRoot(),
        CarouselModule,
        AgGridModule,
        AgChartsAngularModule,
        ModalModule.forRoot(),
        NgApexchartsModule,
        TableModule,
        NgxDocViewerModule,
        ButtonModule,
        RippleModule,
        InputTextModule,
        MultiSelectModule,
        FloatLabelModule,
        ChipModule,
        GoogleMapsModule,
        CheckboxModule,
        InputTextareaModule,
        QRCodeModule,
        ProgressBarModule,
        PdfViewerModule,
        DropdownModule,
        NgxMatTimepickerModule,
        HighchartsChartModule,
        SharedvalidationModule,
        RegistrationsModule,
        NgCircleProgressModule.forRoot({}),
        TmNgOdometerModule,
         DialogModule,
    ],

})
export class SharedModule { }
