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
import { ShareddirModule } from 'src/app/thirparty/shareddir/shareddir.module';
import { QRCodeModule } from 'angularx-qrcode';
import { ProgressBarModule } from 'primeng/progressbar';
import { RegistrationsRoutingModule } from './registrations-routing.module';
import { RegistationLaoutComponent } from './registation-laout/registation-laout.component';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { NgxMatTimepickerModule } from 'ngx-mat-timepicker';
import { HospitalRegComponent } from './others/hospital-reg/hospital-reg.component';
import { UserRegistrationComponent } from './others/user-registration/user-registration.component';
import { RegistrationUnitComponent } from './others/registration-unit/registration-unit.component';
import { DataoperatorsRegComponent } from './others/dataoperators-reg/dataoperators-reg.component';
import { MasterComponent } from './others/master/master.component';
import { MainregistrationComponent } from './others/mainregistration/mainregistration.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { BirthhomeComponent } from './birth/birthhome/birthhome.component';
import { DeathhomeComponent } from './death/deathhome/deathhome.component';
import { StillbirthhomeComponent } from './stillbirth/stillbirthhome/stillbirthhome.component';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BirthregisterComponent } from './birth/birthregister/birthregister.component';

import { AdoptionregistrationComponent } from './adoption/adoptionregistration/adoptionregistration.component';
import { AddchildnameComponent } from './birth/addchildname/addchildname.component';

import { BirthRegisterOldDataComponent } from './birth/birth-register-old-data/birth-register-old-data.component';
import { ReporForeignBirthComponent } from './foreign/repor-foreign-birth/repor-foreign-birth.component';
import {BirthhomematerialComponent} from './birth/birthhomematerial/birthhomematerial.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { UserCreationComponent } from './others/user-management/user-creation/user-creation.component';
import { BirthAddChildNameComponent } from './birth/birth-add-child-name/birth-add-child-name.component';
import { DeathRegisterOldDataComponent } from './death/death-register-old-data/death-register-old-data.component';
import { RegistrationpaymentComponent } from './payment/registrationpayment/registrationpayment.component';
import { PaymentsuccessComponent } from './payment/paymentsuccess/paymentsuccess.component';
import { PaymentfailedComponent } from './payment/paymentfailed/paymentfailed.component';
@NgModule({
  declarations: [
    RegistationLaoutComponent,
    MainregistrationComponent,
    MasterComponent,
    HospitalRegComponent,
    UserRegistrationComponent,    
    RegistrationUnitComponent,
    DataoperatorsRegComponent,
    BirthhomeComponent,
    DeathhomeComponent,
    StillbirthhomeComponent,
    BirthregisterComponent,
    BirthhomematerialComponent,
    BirthRegisterOldDataComponent,
    ReporForeignBirthComponent,
    AdoptionregistrationComponent,
    AddchildnameComponent,
    UserCreationComponent,
    BirthAddChildNameComponent,
    DeathRegisterOldDataComponent,
    RegistrationpaymentComponent,
    PaymentsuccessComponent,
    PaymentfailedComponent,
  ],
  imports: [
    CommonModule,
    RegistrationsRoutingModule,
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
    ButtonModule,
    RippleModule,
    InputTextModule,
    MultiSelectModule,
    GoogleMapsModule,
    CheckboxModule,
    QRCodeModule,
    ProgressBarModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    NgxMatTimepickerModule,
    PdfViewerModule,
    TooltipModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCheckboxModule,
    MatRadioModule
  ],
  exports:[
    BirthhomeComponent,
    DeathhomeComponent,
    StillbirthhomeComponent,
    AdoptionregistrationComponent,
    ReporForeignBirthComponent,
    BirthRegisterOldDataComponent,
    DeathRegisterOldDataComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class RegistrationsModule {}
