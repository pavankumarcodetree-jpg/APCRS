import {
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA,
  NgModule,
  LOCALE_ID,
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CommonModule, NgFor, DatePipe, registerLocaleData } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { BadrequestComponent } from './Forms/security/badrequest/badrequest.component';
import { LogoutComponent } from './Forms/security/logout/logout.component';
import { SessionexpiredComponent } from './Forms/security/sessionexpired/sessionexpired.component';
import { UnauthorizedaccessComponent } from './Forms/security/unauthorizedaccess/unauthorizedaccess.component';
import { EmptyBorderDirectiveDirective } from './thirparty/directives/empty-border-directive.directive';
import { NgSelectModule } from '@ng-select/ng-select';
import { FullCalendarModule } from '@fullcalendar/angular';
import { GoogleMapsModule } from '@angular/google-maps';
import { NgApexchartsModule } from 'ng-apexcharts';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ShareddirModule } from 'src/app/thirparty/shareddir/shareddir.module';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { MultiSelectModule } from 'primeng/multiselect';
import localeIndia from '@angular/common/locales/en-IN';
registerLocaleData(localeIndia);
@NgModule({
  declarations: [
    AppComponent,
    BadrequestComponent,
    LogoutComponent,
    SessionexpiredComponent,
    UnauthorizedaccessComponent,
    EmptyBorderDirectiveDirective,
    //TournamentsComponent,
  ],
  imports: [
    BsDatepickerModule.forRoot(),
    FormsModule,
    BrowserModule,
    ReactiveFormsModule,
    ShareddirModule,
    AppRoutingModule,
    NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' }),
    FormsModule,
    CommonModule,
    HttpClientModule,
    NgFor,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      progressBar: true,
      progressAnimation: 'decreasing',
      tapToDismiss: true,
      maxOpened: 3,
      newestOnTop: true,
    }),
    BrowserAnimationsModule,
    NgSelectModule,
    MultiSelectModule,
    FullCalendarModule,
    GoogleMapsModule,
    NgApexchartsModule,
    TooltipModule.forRoot(),
  ],
  providers: [DatePipe,{ provide: LOCALE_ID, useValue: 'en-IN' } ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class AppModule {
  noInterNetPopUp = false;
}
