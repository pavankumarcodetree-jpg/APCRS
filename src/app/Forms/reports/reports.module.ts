import {
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA,
    NgModule,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgSelectModule } from '@ng-select/ng-select';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { AgGridModule } from 'ag-grid-angular';
import { AgChartsAngularModule } from 'ag-charts-angular';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { MultiSelectModule } from 'primeng/multiselect';
import { CheckboxModule } from 'primeng/checkbox';
import { GoogleMapsModule } from '@angular/google-maps';
import { InputTextModule } from 'primeng/inputtext';
import { NgApexchartsModule } from 'ng-apexcharts';
import { QRCodeModule } from 'angularx-qrcode';
import { ProgressBarModule } from 'primeng/progressbar';
import { ReportsRoutingModule } from './reports-routing.module';
import { B1Component } from './Birth/b1/b1.component';
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
import { B20Component } from './Birth/b20/b20.component';
import { B21Component } from './Birth/b21/b21.component';
import { B22Component } from './Birth/b22/b22.component';
import { B23Component } from './Birth/b23/b23.component';
import { D1Component } from './Death/d1/d1.component';
import { D2Component } from './Death/d2/d2.component';
import { D3Component } from './Death/d3/d3.component';
import { D4Component } from './Death/d4/d4.component';
import { D5Component } from './Death/d5/d5.component';
import { D6Component } from './Death/d6/d6.component';
import { D7Component } from './Death/d7/d7.component';
import { D8Component } from './Death/d8/d8.component';
import { D9Component } from './Death/d9/d9.component';
import { D10Component } from './Death/d10/d10.component';
import { D11Component } from './Death/d11/d11.component';
import { D12Component } from './Death/d12/d12.component';
import { D13Component } from './Death/d13/d13.component';
import { D14Component } from './Death/d14/d14.component';
import { D15Component } from './Death/d15/d15.component';
import { D16Component } from './Death/d16/d16.component';
import { D17Component } from './Death/d17/d17.component';
import { D18Component } from './Death/d18/d18.component';
import { D19Component } from './Death/d19/d19.component';
import { D20Component } from './Death/d20/d20.component';
import { D21Component } from './Death/d21/d21.component';
import { S7Component } from './StillBirth/s7/s7.component';
import { S1Component } from './StillBirth/s1/s1.component';
import { S2Component } from './StillBirth/s2/s2.component';
import { S3Component } from './StillBirth/s3/s3.component';
import { S4Component } from './StillBirth/s4/s4.component';
import { S5Component } from './StillBirth/s5/s5.component';
import { S6Component } from './StillBirth/s6/s6.component';
import { MonitoringReportComponent } from './monitoring/monitoring-report/monitoring-report.component';
import { NgxDocViewerModule } from 'ngx-doc-viewer';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ChipModule } from 'primeng/chip';
import { NgxMatTimepickerModule } from 'ngx-mat-timepicker';
import { HighchartsChartModule } from 'highcharts-angular';
import { SharedvalidationModule } from 'src/app/thirparty/sharedvalidation/sharedvalidation.module';
import { NgCircleProgressModule } from 'ng-circle-progress';

@NgModule({
    declarations: [
        B1Component,
        B2Component,
        B3Component,
        B4Component,
        B5Component,
        B6Component,
        B7Component,
        B8Component,
        B9Component,
        B10Component,
        B11Component,
        B12Component,
        B13Component,
        B14Component,
        B15Component,
        B16Component,
        B17Component,
        B18Component,
        B19Component,
        B20Component,
        B21Component,
        B22Component,
        B23Component,
        D1Component,
        D2Component,
        D3Component,
        D4Component,
        D5Component,
        D6Component,
        D7Component,
        D8Component,
        D9Component,
        D10Component,
        D11Component,
        D12Component,
        D13Component,
        D14Component,
        D15Component,
        D16Component,
        D17Component,
        D18Component,
        D19Component,
        D20Component,
        D21Component,
        S1Component,
        S2Component,
        S3Component,
        S4Component,
        S5Component,
        S6Component,
        S7Component
        
    ],
   
    imports: [
            CommonModule,
            ReportsRoutingModule,
            CommonModule,
            FormsModule,
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
            QRCodeModule,
            ProgressBarModule,
            NgxMatTimepickerModule,
            HighchartsChartModule,
            SharedvalidationModule,
            NgCircleProgressModule.forRoot({})
        ],
})
export class ReportsModule { }
