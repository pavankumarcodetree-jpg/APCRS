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
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { AuthserService } from 'src/app/services/api_lyr/private/authser.service';

@Component({
    selector: 'app-s2',
    templateUrl: './s2.component.html',
    styleUrl: './s2.component.css'
})
export class S2Component {
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

        private el: ElementRef
    ) {

    }
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


            } else {
                this.encdc.Usersessionkill();
            }
        } else {
            this.router.navigate(['/Sessionexpired']);
        }
    }
    static_array = [
        {
            sno: '1',
            id: 123456,
            name: "Gowri",
            fatherName: "Subbarao",
            disease: "Hepatitis",
            dateOfBirth: "01-01-1995",
            dateOfDeath: "10-08-2024",
            office: "Head office",
            status: "Pending"
        },
        {
            sno: '2',
            id: 265456,
            name: "Laksmi",
            fatherName: "Benkayya",
            disease: "Measles",
            dateOfBirth: "01-01-2000",
            dateOfDeath: "10-08-2023",
            office: "Head office",
            status: "Completed"
        }
    ]
    bsConfig: Partial<BsDatepickerModule> = {
        // dateInputFormat: 'DD-MM-YYYY',
        // isDisabled: false,
        // startView: 'day',
        // showWeekNumbers: false,
        // containerClass: 'theme-blue',
        // showClearButton: true,
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
}
