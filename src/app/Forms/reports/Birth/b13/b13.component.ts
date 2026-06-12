import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
    Component,
    ElementRef,
    Inject,
    OnInit,
    Renderer2,
    ViewChild,
} from '@angular/core';

import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertsService } from 'src/app/services/alert_lyr/alerts.service';
import { PrivateService } from 'src/app/services/api_lyr/private/private.service';
import { EncDecService } from 'src/app/services/enc_dec_lyr/enc-dec.service';
import { MiddlewareService } from 'src/app/services/middleware_lyr/middleware.service';
import { basemodel } from 'src/app/thirparty/model/apimodel';
import { InputvalidaionService } from 'src/app/thirparty/validation/inputvalidaion.service';
import jsPDF from 'jspdf';
import Swal from 'sweetalert2';
import html2canvas from 'html2canvas';
import { Fancybox } from '@fancyapps/ui';
import * as $ from "jquery";
import { BsDatepickerConfig, BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { AuthserService } from 'src/app/services/api_lyr/private/authser.service';
@Component({
    selector: 'app-b13',
    templateUrl: './b13.component.html',
    styleUrl: './b13.component.css'
})
export class B13Component {
    bsConfig: Partial<BsDatepickerConfig>;
         mindate!: Date;
         maxdate!: Date;
    constructor(
        private spinner: NgxSpinnerService,
        private alt: AlertsService,
        private pscall: PrivateService,
        //private unauth: UnauthserService,
        private auth: AuthserService,
        private httpClient: HttpClient,
        private mid: MiddlewareService,
        private encdc: EncDecService,
        private router: Router,
        private datepipe: DatePipe,
        private val: InputvalidaionService,
         // private shared: SharedvalidationModule
        private el: ElementRef
    ) {this.setWeekLimits();
        this.from_date = this.mindate;
        this.to_date = this.maxdate;
        this.bsConfig = {
          dateInputFormat: 'DD-MM-YYYY',
          isDisabled: false,
          startView: 'day',
          showWeekNumbers: false,
          containerClass: 'theme-blue',
          showClearButton: true,
        };

    }
    state_level_array = [];
    displausername = '';
    designationname = '';
    user_type = '';
    approve_status = '';
    user_role = '';
    u_id = '';
    from_date!: Date;
    to_date!: Date;
    ngOnInit(): void {
        if (sessionStorage.getItem('_Uenc') !== '') {
            //this.collapsed = true;
            let obj: any = this.encdc.Getuser();
            if (obj != '' && obj != undefined && obj != null) {
                this.displausername = obj[0].UNAME;
                this.u_id = obj[0].UID;
                this.designationname = obj[0].UDPDESIGNATION;
                this.user_type = obj[0].UTYPE;
                this.user_role = obj[0].UROLE;
this.get_statelevel();

            } else {
                this.encdc.Usersessionkill();
            }
        } else {
            this.router.navigate(['/Sessionexpired']);
        }
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
        saturday.setDate(today.getDate() - 1);
    
        this.mindate = saturday;
        this.maxdate = today;
      }


    async get_statelevel(): Promise<void> {
        try {
            

            if (this.from_date == null || this.from_date == undefined) {
                this.alt.toastwarning("please Select From Date");
                return
            }
            if (this.to_date == null || this.to_date == undefined) {
                this.alt.toastwarning("please Select To Date");
                return
            }

            const req = new basemodel();
            req.type = 2060;
            req.param1 = this.from_date;
            req.param2 = this.to_date;
            let responce: any = await this.auth.auth_pkgreports01_service(req);
            
            this.state_level_array = [];
            this.spinner.show();
            if (responce.code) {
                this.spinner.hide();
                this.state_level_array = responce.Details;
                return;
            } else {
                this.spinner.hide();
                this.state_level_array = [];
                return;
            }
        } catch (error) {
           
            this.state_level_array = [];
            this.spinner.hide();
            return;
        }
    }

    exportTable_ToPDF(table_id: any, filename: any): void {
        // this.shared.exportTableToPDF(table_id, filename);
    }
    exportTable_toexcel(table_id: any, filename: any): void {
        // this.shared.exportTableToExcel(table_id, filename);
    }
}
