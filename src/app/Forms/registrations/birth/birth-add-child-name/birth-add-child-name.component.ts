import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { BsDatepickerConfig, BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertsService } from 'src/app/services/alert_lyr/alerts.service';
import { AuthserService } from 'src/app/services/api_lyr/private/authser.service';
import { EncDecService } from 'src/app/services/enc_dec_lyr/enc-dec.service';
import { basemodel } from 'src/app/thirparty/model/apimodel';
import { DOCUMENT, DatePipe } from '@angular/common';
import { MiddlewareService } from 'src/app/services/middleware_lyr/middleware.service';

@Component({
  selector: 'app-birth-add-child-name',
  templateUrl: './birth-add-child-name.component.html',
  styleUrl: './birth-add-child-name.component.css'
})
export class BirthAddChildNameComponent {
 bsConfig: Partial<BsDatepickerModule> = {
    dateInputFormat: 'DD-MM-YYYY',
    isDisabled: false,
    startView: 'day',
    showWeekNumbers: false,
    containerClass: 'theme-blue',
    showClearButton: true,
    adaptivePosition: true,
    minMode: 'day',
    maxMode: 'year',
    customTodayClass: 'custom-today',
  };
  add_name = {
    applicationnumber: '',
    fromyear: '',
    toyear: '',
    Gender: '',
    mothername: '',
    fathername: '',
    Date_of_birth: '',
    registrationnumber:''
  }
  dateofbirthmin = new Date();
  years: any[] = [];
  public getUploadPeriod() {
    let baseYear = 2023;
    let currYear = new Date().getFullYear();
    this.years = [];

    for (var i = baseYear; i <= currYear; i++) {
      this.years.push({ "year": i });
    }
    console.log('years', this.years)
    return this.years

  }
    constructor(private encdc: EncDecService, private router: Router, private auth: AuthserService, private spinner: NgxSpinnerService,
      private alt: AlertsService, private sanitizer: DomSanitizer, private datepipe: DatePipe, private mid: MiddlewareService,
    ) {
      this.bsConfig = {
        dateInputFormat: 'DD-MM-YYYY',
        isDisabled: false,
        startView: 'day',
        showWeekNumbers: true,
        containerClass: 'theme-blue',
        showClearButton: true,
      };
    }
  RU_CODE: any;obj:any;UROLE:any;
  ngOnInit(): void {
    try {debugger
      if (sessionStorage.getItem('_Uenc') !== '') {
        this.obj = this.encdc.Getuser();
        if (this.obj != '' && this.obj != undefined && this.obj != null) {
          this.RU_CODE = this.obj[0].RU_CODE;
          this.UROLE=this.obj[0].UROLE;
          const currentDate = new Date();
    const lastWeekDate = new Date();
    lastWeekDate.setDate(currentDate.getDate() - this.obj[0]?.REPORTING_DAYS);
    this.getUploadPeriod();
        } else {
          this.encdc.Usersessionkill();
        }
      } else {
        this.router.navigate(['/Sessionexpired']);
      }
    } catch (error) {
      this.alt.warning('check your internet connection and try again');
    }
  }
}
