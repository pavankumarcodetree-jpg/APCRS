import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '../shared/layout/layout.component';
import { SesionService } from 'src/app/services/session_lyr/sesion.service';
import { HospitalRegComponent } from './others/hospital-reg/hospital-reg.component';
import { UserRegistrationComponent } from './others/user-registration/user-registration.component';
import { RegistrationUnitComponent } from './others/registration-unit/registration-unit.component';
import { DataoperatorsRegComponent } from './others/dataoperators-reg/dataoperators-reg.component';
import { BirthhomeComponent } from './birth/birthhome/birthhome.component';
import { DeathhomeComponent } from './death/deathhome/deathhome.component';
import { StillbirthhomeComponent } from './stillbirth/stillbirthhome/stillbirthhome.component';
import { BirthregisterComponent } from './birth/birthregister/birthregister.component';
import { BirthhomematerialComponent } from './birth/birthhomematerial/birthhomematerial.component';
import { BirthRegisterOldDataComponent } from './birth/birth-register-old-data/birth-register-old-data.component';
import { ReporForeignBirthComponent } from './foreign/repor-foreign-birth/repor-foreign-birth.component';
import { AdoptionregistrationComponent } from './adoption/adoptionregistration/adoptionregistration.component';
//import { AddchildnameComponent } from './birth/addchildname/addchildname.component';
import { UserCreationComponent } from './others/user-management/user-creation/user-creation.component';
import { BirthAddChildNameComponent } from './birth/birth-add-child-name/birth-add-child-name.component';
import { AddchildnameComponent } from './birth/addchildname/addchildname.component';
import { DeathRegisterOldDataComponent } from './death/death-register-old-data/death-register-old-data.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [SesionService],
    children: [
      {
        path: 'register-birth',
        component: BirthhomeComponent,
        canActivate: [SesionService],
      },
      {
        path: 'register-birthmaterial',
        component: BirthhomematerialComponent,
        canActivate: [SesionService],
      },
      {
        path: 'birth-register',
        component: BirthregisterComponent,
        canActivate: [SesionService],
      },
      {
        path: 'register-death',
        component: DeathhomeComponent,
        canActivate: [SesionService],
      },

      {
        path: 'still-register-birth',
        component: StillbirthhomeComponent,
        canActivate: [SesionService],
      },
      {
        path: 'birthRegisterOldData',
        component: BirthRegisterOldDataComponent,
        canActivate: [SesionService],
      },{
        path: 'deathRegisterOldData',
        component: DeathRegisterOldDataComponent,
        canActivate: [SesionService],
      },
      {
        path: 'ReporForeignBirth',
        component: ReporForeignBirthComponent,
        canActivate: [SesionService],
      },      
      {
        path: 'hosiptal-registration',
        component: HospitalRegComponent,
        canActivate: [SesionService],
      },
      {
        path: 'adoption-registration',
        component: AdoptionregistrationComponent,
        canActivate: [SesionService],
      },   
      {
        path: 'add-childname',
        component: AddchildnameComponent,
        canActivate: [SesionService],
      },  
      {
        path: 'new-add-childname',
        component:BirthAddChildNameComponent,
        canActivate: [SesionService],
      },   
      {
        path: 'user-registration',
        component: UserRegistrationComponent,
        canActivate: [SesionService],
      },
      {
        path: 'registration-unit',
        component: RegistrationUnitComponent,
        canActivate: [SesionService],
      },
      {
        path: 'dataoperator-reg',
        component: DataoperatorsRegComponent,
        canActivate: [SesionService],
      },
      {
        path: 'user-creation',
        component: UserCreationComponent,
        canActivate: [SesionService],
      }
      
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistrationsRoutingModule {}
