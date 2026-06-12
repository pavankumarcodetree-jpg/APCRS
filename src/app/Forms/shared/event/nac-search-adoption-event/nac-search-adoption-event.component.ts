import { Component, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertsService } from 'src/app/services/alert_lyr/alerts.service';
import { AuthserService } from 'src/app/services/api_lyr/private/authser.service';
import { EncDecService } from 'src/app/services/enc_dec_lyr/enc-dec.service';
import { basemodel } from 'src/app/thirparty/model/apimodel';
import { DOCUMENT, DatePipe } from '@angular/common';

@Component({
    selector: 'app-nac-search-adoption-event',
    templateUrl: './nac-search-adoption-event.component.html',
    styleUrl: './nac-search-adoption-event.component.css'
})
export class NacSearchAdoptionEventComponent {
    bsConfig: Partial<BsDatepickerConfig>;
    birth_search = {
        fromyear: '',
        toyear: '',
        fathername: '',
        childname: '',
        To_Date: ''
    }
    constructor(private encdc: EncDecService, private router: Router, private auth: AuthserService, private spinner: NgxSpinnerService,
        private alt: AlertsService, private sanitizer: DomSanitizer, private datepipe: DatePipe,
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
    ngOnInit(): void {
        if (sessionStorage.getItem('_Uenc') !== '') {
            //this.collapsed = true;
            let obj: any = this.encdc.Getuser();
            if (obj != '' && obj != undefined && obj != null) {
                this.getUploadPeriod();
                this.get_birth_table();
            } else {
                this.encdc.Usersessionkill();
            }
        } else {
            this.router.navigate(['/Sessionexpired']);
        }
    }
    years: any[] = [];
    public getUploadPeriod() {
        let baseYear = 2015;
        let currYear = new Date().getFullYear();
        this.years = [];

        for (var i = baseYear; i <= currYear; i++) {
            this.years.push({ "year": i });
        }
        console.log('years', this.years)
        return this.years

    }
    birth_depth_table_array: any[] = [];;
    async get_birth_table(): Promise<void> {
        try {
            const req = new basemodel();
            req.type = '1032';
            let responce: any = await this.auth.auth_pkgcrsadoption_service(req);
            this.birth_depth_table_array = [];
            this.spinner.show();
            if (responce.code) {
                this.spinner.hide();
                this.birth_depth_table_array = responce.Details;

                return;
            } else {
                this.spinner.hide();
                this.birth_depth_table_array = [];
                return;
            }
        } catch (error) {

            this.birth_depth_table_array = [];
            this.spinner.hide();
            return;
        }
    }
    Resetsearch() {
        this.birth_search = {
            fromyear: '',
            toyear: '',
            fathername: '',
            childname: '',
            To_Date: ''
        };

        this.get_birth_table();
    }
    isModalVisible: boolean = false; applicationnumber: any;
    closeModal() {
        this.isModalVisible = false;
    }
    async Backwindow() {
        this.viewmodel = 'nacsearchadoption';
        this.radiobutton = false;
    }
    radiobutton: boolean = false; NAC_application_Id: any;
    getbuttonenabled(agency: any) {
        debugger
        this.applicationnumber = agency.AR_APPLICATION_ID;
        this.NAC_application_Id = agency.AR_NAC_APPLICATION_ID;
        this.radiobutton = true;
        if (agency.AR_APPLICATION_ID != null) {
            this.drafttype = 'ADOPTIONEDIT';
        }
    }
    getRdo() {
        this.preview_tittle = "Rdo Adoption Registration(దత్తత జనన నమోదు)";
        this.viewmodel = "Rdo";
        this.typeofcorrection = "Rdo";

    }
    PathReportString: any; typeofcorrection: any; applicationid: any; preview_tittle = "";
    viewmodel = "nacsearchadoption"; drafttype = '';
    async downloadorder(agency: any) {
        try {

            const req = new basemodel();
            req.type = '1022';
            req.param1 = agency.BR_NAC_APPLICATION_ID;
            req.param4 = 'adoptionnac';
            req.param5 = 'both';
            let responce: any = await this.auth.pdf_download(req);
            this.spinner.show();
            if (responce.code) {
                this.spinner.hide();
                if (responce.url) {
                    this.PathReportString = 'data:application/pdf;base64,' + (this.sanitizer.bypassSecurityTrustResourceUrl(responce.url) as any).changingThisBreaksApplicationSecurity;
                    this.isModalVisible = true;
                    this.applicationnumber = agency.BR_NAC_APPLICATION_ID;
                }

            } else {
                this.spinner.hide();
                this.alt.toasterror(responce.message);
                return;
            }
        } catch (error) {
            this.spinner.hide();
            this.alt.toasterror('something went wrong');
            return;
        }
    }

    downloadPdf(): void {
        if (!this.PathReportString) {
            console.error('PDF source is not set');
            return;
        }
        if (this.PathReportString.startsWith('data:application/pdf')) {
            const link = document.createElement('a');
            link.href = this.PathReportString;
            link.download = this.applicationnumber + '.pdf';
            link.click();
        } else {
            const link = document.createElement('a');
            link.href = this.PathReportString;
            link.target = '_blank';
            link.download = this.PathReportString.split('/').pop() || 'document.pdf';
            link.click();
        }
    }
}
