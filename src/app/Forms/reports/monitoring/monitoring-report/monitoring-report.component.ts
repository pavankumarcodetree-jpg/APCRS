import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Inject, ViewChild, Input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { NgxSpinnerService } from 'ngx-spinner';
import { MiddlewareService } from 'src/app/services/middleware_lyr/middleware.service';
import { AlertsService } from 'src/app/services/alert_lyr/alerts.service';
import { PrivateService } from 'src/app/services/api_lyr/private/private.service';
import { basemodel } from 'src/app/thirparty/model/apimodel';
import { DOCUMENT, DatePipe } from '@angular/common';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { GeolocationService } from 'src/app/services/geolocation.service';
import { BsDatepickerConfig, BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TimepickerConfig } from 'ngx-bootstrap/timepicker';
import { AuthserService } from 'src/app/services/api_lyr/private/authser.service';
import { InputvalidaionService } from 'src/app/thirparty/validation/inputvalidaion.service';
import { Router } from '@angular/router';
import { EncDecService } from 'src/app/services/enc_dec_lyr/enc-dec.service';
import { NgModel } from '@angular/forms';
import { SharedvalidationModule } from 'src/app/thirparty/sharedvalidation/sharedvalidation.module';

@Component({
  selector: 'app-monitoring-report',
  templateUrl: './monitoring-report.component.html',
  styleUrl: './monitoring-report.component.css'
})
export class MonitoringReportComponent {
  selectedbirth='birth';
  selecteddeath:boolean=false;
  monitoring_state:any;
  constructor(
      private spinner: NgxSpinnerService,
      private alt: AlertsService,
      private pscall: PrivateService,
      private val: InputvalidaionService,
      private auth: AuthserService,
      private httpClient: HttpClient,
      private mid: MiddlewareService,
      private datepipe: DatePipe,
      private geolocationService: GeolocationService,
      private sanitizer: DomSanitizer,
      private router: Router,
      private encdc: EncDecService,
      private el: ElementRef,
      private shared: SharedvalidationModule
    ) {
      this.setWeekLimits();
      this.From_Date = this.mindate;
      this.To_Date = this.maxdate;
      this.bsConfig = {
        dateInputFormat: 'DD-MM-YYYY',
        isDisabled: false,
        startView: 'day',
        showWeekNumbers: false,
        containerClass: 'theme-blue',
        showClearButton: true,
      };
    }
    getToDateConfig() {
      return {
        ...this.bsConfig,
        maxDate: this.maxdate
      };
    }
    
    setWeekLimits() {
      const today = new Date();
      const dayOfWeek = today.getDay(); // 0 = Sunday, 1 = Monday, etc.
      const monday = new Date(today);
      monday.setDate(today.getDate() - dayOfWeek);
      const saturday = new Date(today);
      saturday.setDate(today.getDate() - 2);
  
      this.mindate = saturday;
      this.maxdate = today;
    }
    RU_CODE: any;
    bsConfig: Partial<BsDatepickerConfig>;
    mindate!: Date;
  maxdate!: Date;
  From_Date!: Date;
  To_Date!: Date;
obj:any;
    ngOnInit(): void {
      try {
        if (sessionStorage.getItem('_Uenc') !== '') {
           this.obj = this.encdc.Getuser();
          
  
          if (this.obj != '' && this.obj != undefined && this.obj != null) {
            debugger
            this.RU_CODE = this.obj[0].RU_CODE;
            this.monitoring_state=28;
            this.getstatedata();
            this.get_monitoring_report();
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
    staticstical_state_master_array: any[] = [];
    async getstatedata(): Promise<void> {
      try {
        const req = new basemodel();
        req.type = '1001';
        this.spinner.show();
        this.staticstical_state_master_array = [];
        let responce: any = await this.auth.auth_utilities_service(req);
        this.spinner.hide();
        if (responce.code) {
          this.staticstical_state_master_array = responce.Details;
        } else {
          this.staticstical_state_master_array = [];
          this.spinner.hide();
        }
      } catch (error) {
        this.spinner.hide();
       
      }
    }
    monitoring_report_array: any[]=[];
    radiobuttontype='birth';
    display_level='district';
    async get_monitoring_report(): Promise<void>{
      try { 
        this.display_level='district';
        const req = new basemodel();
        req.type = '2001';
        req.param1=this.monitoring_state;
        req.param2 = this.datepipe.transform(this.From_Date, 'dd-MM-yyyy');
        req.param3 = this.datepipe.transform(this.To_Date, 'dd-MM-yyyy');
        req.param4=this.radiobuttontype;
        this.spinner.show();
        this.monitoring_report_array = [];
        let responce: any = await this.auth.auth_utilities_service02(req);
        this.spinner.hide();
        
        if (responce.code) {
          this.monitoring_report_array = responce.Details;
        } else {
          this.monitoring_report_array = [];
          this.spinner.hide();
        }
      } catch (error) {
        this.spinner.hide();
       
      }
    }
    monitoring_report_mandal_array:any[]=[];district_name:any;display_sub_level='birth';
    cureent_date = new Date();   monitoring_report_Hospital_array:any[]=[];
    async get_monitoring_report_Hospital(obj:any): Promise<void>{
      try { 
        this.display_level='Hospital';
        this.district_name=obj.DISTRICT_NAME;
        this.mandal_name=obj.MMC_NAME;
        this.Ru_Name = obj.RU_NAME;
        const req = new basemodel();
        if (this.radiobuttontype=='birth') { 
          req.param4 = 'BIRTH';
           this.display_sub_level='birth';
        }
        if (this.radiobuttontype=='death') { 
          req.param4 = 'DEATH';
          this.display_sub_level='death';
        }
        req.type = '2007';
        req.param1=this.monitoring_state;
        req.param2 = this.datepipe.transform(this.From_Date, 'dd-MM-yyyy');
        req.param3 = this.datepipe.transform(this.To_Date, 'dd-MM-yyyy');
        req.param5 = obj.DISTRICT_CODE;
        req.param7 = obj.RU_CODE;
        this.spinner.show();
        this.monitoring_report_Hospital_array = []; 
        let responce: any = await this.auth.auth_utilities_service02(req);
        this.spinner.hide();
        if (responce.code) {
          this.monitoring_report_Hospital_array = responce.Details;
        } else {
          this.monitoring_report_Hospital_array = [];
          this.spinner.hide();
        }
      } catch (error) {
        this.spinner.hide();
       
      }
    }
    monitoring_report_Hospital_details_array:any[]=[]; hospitalName:any;
    async get_monitoring_report_Hospital_details(obj:any): Promise<void>{
      try { 
        this.display_level='HospitalDetails';
        this.district_name=obj.DISTRICT_NAME;
        this.mandal_name=obj.MMC_NAME;
        this.Ru_Name = obj.RU_NAME;
        this.hospitalName = obj.HOSPITAL_NAME;
        const req = new basemodel();
        if (this.radiobuttontype=='birth') { 
          req.param4 = 'BIRTH';
          req.type = '2008';
          this.display_sub_level='birth';
        }
        if (this.radiobuttontype=='death') { 
          req.type = '2009';
          req.param4 = 'DEATH';
          this.display_sub_level='death';
        } 
        req.param1=  this.monitoring_state;
        req.param2 = this.datepipe.transform(this.From_Date, 'dd-MM-yyyy');
        req.param3 = this.datepipe.transform(this.To_Date, 'dd-MM-yyyy');
        req.param5 = obj.DISTRICT_CODE;
        req.param7 = obj.RU_CODE;
        req.param8 = obj.HOSPITAL_ID;
        this.spinner.show();
        this.monitoring_report_Hospital_details_array = []; 
        let responce: any = await this.auth.auth_utilities_service02(req);
        this.spinner.hide();
        if (responce.code) {
          this.monitoring_report_Hospital_details_array = responce.Details;
        } else {
          this.monitoring_report_Hospital_details_array = [];
          this.spinner.hide();
        }
      } catch (error) {
        this.spinner.hide();
       
      }
    }
    async get_monitoring_report_mandal(obj:any): Promise<void>{ 
      
      try { 
        this.display_level='mandal';
        this.district_name=obj.DISTRICT_NAME;
        const req = new basemodel();
        if (this.radiobuttontype=='birth') {
          req.type = '2002';
          this.display_sub_level='birth';
        }
        if (this.radiobuttontype=='death') {
          req.type = '2004';
          this.display_sub_level='death';
        }
        req.param1=this.monitoring_state;
        req.param2 = this.datepipe.transform(this.From_Date, 'dd-MM-yyyy');
        req.param3 = this.datepipe.transform(this.To_Date, 'dd-MM-yyyy');
        req.param5=obj.DISTRICT_CODE;
        this.spinner.show();
        this.monitoring_report_mandal_array = [];
        let responce: any = await this.auth.auth_utilities_service02(req);
        this.spinner.hide();
        if (responce.code) {
          this.monitoring_report_mandal_array = responce.Details; 
        } else {
          this.monitoring_report_mandal_array = [];
          this.spinner.hide();
        }
      } catch (error) {
        this.spinner.hide();
       
      }
    }
    monitoring_report_RU_array:any[]=[];display_sub_ru_level='birth';
    mandal_name:any;
    Ru_Name:any;
    async get_monitoring_report_ru(obj:any): Promise<void>{
      try { 
        debugger
        this.display_level='RU';
        this.district_name=obj.DISTRICT_NAME;
        this.mandal_name=obj.MMC_NAME;
        const req = new basemodel();
        if (this.radiobuttontype=='birth') {
          req.type = '2005';
          this.display_sub_ru_level='birth';
        }
        if (this.radiobuttontype=='death') {
          req.type = '2006';
          this.display_sub_ru_level='death';
        }
        req.param1=this.monitoring_state;
        req.param2 = this.datepipe.transform(this.From_Date, 'dd-MM-yyyy');
        req.param3 = this.datepipe.transform(this.To_Date, 'dd-MM-yyyy');
        req.param5=obj.DISTRICT_CODE;
        req.param6=obj.MMC_CODE;
        this.spinner.show();
        this.monitoring_report_RU_array = [];
        let responce: any = await this.auth.auth_utilities_service02(req);
        this.spinner.hide();
        if (responce.code) {
          this.monitoring_report_RU_array = responce.Details;
        } else {
          this.monitoring_report_RU_array = [];
          this.spinner.hide();
        }
      } catch (error) {
        this.spinner.hide();
       
      }
    }
   
    radiobuttonchange(event:any){
      if(event=='birth'){
        this.radiobuttontype='birth';
      }else{
        this.radiobuttontype='death';
      }
      
      this.get_monitoring_report();
    }
    backtomandal(){
      this.display_level='mandal';
    }
    getsum_of_coloumn(columnName: string): number {
      const regdistrictSum = this.monitoring_report_array.reduce((sum, dd) => Number(sum) + dd[columnName], 0);
      return Number(regdistrictSum.toFixed(2));
    }
    exportTable_ToPDF(table_id: any, filename: any): void {
      this.shared.exportTableToPDF(table_id, filename);
    }
    exportTable_toexcel(table_id: any, filename: any): void {
      this.shared.exportTableToExcel(table_id, filename);
    }
}
