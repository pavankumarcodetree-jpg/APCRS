import {
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA,
  NgModule,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PublicRoutingModule } from './public-routing.module';
import { HeaderlayoutComponent } from './layout/headerlayout/headerlayout.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { CountUpModule } from 'ngx-countup';
import { NgFireworksModule } from '@fireworks-js/angular';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FullCalendarModule } from '@fullcalendar/angular';
import { GoogleMapsModule } from '@angular/google-maps';
import { NgSelectModule } from '@ng-select/ng-select';
import { QRCodeModule } from 'angularx-qrcode';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TabViewModule } from 'primeng/tabview';
import { RegistrationComponent } from './website/registration/registration.component';
import { IndexComponent } from './website/index/index.component';
import { UserregistrationComponent } from './website/userregistration/userregistration.component';
import { LaunchComponent } from './launch/launch.component';
import { AboutComponent } from './website/about/about.component';
import { CircularsComponent } from './website/circulars/circulars.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { GswsBirthDataComponent } from './website/gsws-birth-data/gsws-birth-data.component';
import { GswsdeathdataComponent } from './website/gswsdeathdata/gswsdeathdata.component';
import { GswsbirthdeathComponent } from './website/gswsbirthdeath/gswsbirthdeath.component';
import { DialogModule } from 'primeng/dialog';
@NgModule({
  declarations: [
    HeaderlayoutComponent,
    RegistrationComponent,
    IndexComponent,
    UserregistrationComponent,
    LaunchComponent,
    AboutComponent,
    CircularsComponent,
    GswsBirthDataComponent,
    GswsdeathdataComponent,
    GswsbirthdeathComponent
    
  ],
  imports: [
    BsDatepickerModule.forRoot(),
    TimepickerModule.forRoot(),
    CommonModule,
    PublicRoutingModule,
    CarouselModule,
    SlickCarouselModule,
    CountUpModule,
    NgFireworksModule,
    DragDropModule,
    FullCalendarModule,
    GoogleMapsModule,
    NgSelectModule,
    FormsModule,
    QRCodeModule,
    TabViewModule,
    HighchartsChartModule,
    NgCircleProgressModule.forRoot({}),
     DialogModule
  ],
})
export class PublicModule {}
