import {
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA,
  NgModule,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrivateRoutingModule } from './private-routing.module';
import { LoginComponent } from './authnticate/login/login.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgSelectModule } from '@ng-select/ng-select';
import { ForgotpasswordComponent } from './shared/forgotpassword/forgotpassword.component';
import { ForcepasswordchangeonlogonComponent } from './shared/forcepasswordchangeonlogon/forcepasswordchangeonlogon.component';
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
import { NewloginComponent } from './authenticate/newlogin/newlogin.component';
import { MatInputModule } from '@angular/material/input';
@NgModule({
  declarations: [
    LoginComponent,
    ForgotpasswordComponent,
    ForcepasswordchangeonlogonComponent,
    ForgotpasswordComponent,
    NewloginComponent,
  ],
  imports: [
    PrivateRoutingModule,
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
    ButtonModule,
    RippleModule,
    InputTextModule,
    MultiSelectModule,
    GoogleMapsModule,
    CheckboxModule,
    QRCodeModule,
    ProgressBarModule,
    MatInputModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class PrivateModule {}
