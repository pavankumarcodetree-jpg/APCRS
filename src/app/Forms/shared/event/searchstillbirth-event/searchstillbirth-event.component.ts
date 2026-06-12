import { Component, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertsService } from 'src/app/services/alert_lyr/alerts.service';
import { AuthserService } from 'src/app/services/api_lyr/private/authser.service';
import { EncDecService } from 'src/app/services/enc_dec_lyr/enc-dec.service';
import { MiddlewareService } from 'src/app/services/middleware_lyr/middleware.service';
import { basemodel } from 'src/app/thirparty/model/apimodel';
import { DOCUMENT, DatePipe } from '@angular/common';
declare var Fancybox: any;

@Component({
    selector: 'app-searchstillbirth-event',
    templateUrl: './searchstillbirth-event.component.html',
    styleUrl: './searchstillbirth-event.component.css'
})
export class SearchstillbirthEventComponent {
    bsConfig: Partial<BsDatepickerConfig>;
    mindate!: Date;
    maxdate!: Date;
    From_Date!: Date;
    To_Date!: Date;
    contentshowurl: any;
    RuCode: any;
    birth_search = {
        district: '',
        ruralurban: '',
        mandal: '',
        Registration_Unit: '',
        Hospital: '',
        fromyear: '',
        toyear: '',
        applicationnumber: '',
        registrationnumber: '',
        Registration: '',
        Gender: '',
        mothername: '',
        fathername: '',
        childname: '',
        From_Date: '',
        To_Date: '',
        Date_of_birth: '',
        searchby: 'YEAR',
        Allstates:'0'
    }
    District: any[] = [];
    ruralurban_array: any[] = [];
    MandalMuncipality_array: any[] = [];
    HospitalList: any[] = [];
    Registration_UnitList: any[] = [];
    constructor(private encdc: EncDecService, private router: Router, private auth: AuthserService, private spinner: NgxSpinnerService,
        private alt: AlertsService, private sanitizer: DomSanitizer, private mid: MiddlewareService, private datepipe: DatePipe
    ) {
        this.contentshowurl = mid.globalsetting.api_url_conent_show;
        this.bsConfig = {
            dateInputFormat: 'DD-MM-YYYY',
            isDisabled: false,
            startView: 'day',
            showWeekNumbers: true,
            containerClass: 'theme-blue',
            showClearButton: true,
        };
    }

    nac_registration = {
        forntname: '',
        childname: '',
        careof: '',
        fathername: ''
    }
    obj: any;    UROLE: any
    ngOnInit(): void {
        if (sessionStorage.getItem('_Uenc') !== '') {
            this.obj = this.encdc.Getuser();
            if (this.obj != '' && this.obj != undefined && this.obj != null) {
                this.getDistrict();
                this.UROLE = this.obj[0].UROLE;
                this.cureentdate = this.datepipe.transform(new Date(), 'dd-MM-yyyy');
                this.RuCode = this.obj[0].RU_CODE;
                Fancybox.defaults.Hash = false;
                Fancybox.bind('[data-fancybox="gallery"]', {
                    Hash: false,
                });
                this.getUploadPeriod();
            } else {
                this.encdc.Usersessionkill();
            }
        } else {
            this.router.navigate(['/Sessionexpired']);
        }
    }
    years: any[] = [];
    public getUploadPeriod() {
        let baseYear = 2023;
        let currYear = new Date().getFullYear();
        this.years = [];
        for (var i = currYear; i >= baseYear; i--) {
            this.years.push({ "year": i });
        }
        console.log('years', this.years)
        return this.years

    }
    isdropdownhide: any = true;
    searchbychange() {
        this.birth_search.fromyear = '';
        this.birth_search.toyear = '';
        this.birth_search.applicationnumber = '';
        this.birth_search.registrationnumber = '';
        this.birth_search.Registration = '';
        this.birth_search.Gender = '';
        this.birth_search.mothername = '';
        this.birth_search.fathername = '';
        this.birth_search.childname = '';
        this.birth_search.From_Date = '';
        this.birth_search.To_Date = '';
        this.birth_search.Date_of_birth = '';

        if (this.birth_search.searchby == 'APPLICATIONNO' || this.birth_search.searchby == 'REGISTRATIONNO') {
            this.isdropdownhide = false;
            this.birth_search.district = '';
            this.birth_search.Registration_Unit = '';
            this.birth_search.Hospital = '';
        } else {
            this.isdropdownhide = true;
            this.birth_search.district = this.District[0].DISTRICT_CODE;
            this.birth_search.Registration_Unit = this.Registration_UnitList[0].RU_CODE;
            this.birth_search.Hospital = this.HospitalList[0].HOSPITAL_ID;
        }
    }

    validationforinputs() {
        if (this.birth_search.searchby === null || this.birth_search.searchby === undefined || this.birth_search.searchby === "") {
            this.alt.toasterror('Please select search by');
            return false;
        }
        if (this.birth_search.searchby == 'YEAR') {
            if (this.birth_search.fromyear === null || this.birth_search.fromyear === undefined || this.birth_search.fromyear === "") {
                this.alt.toasterror('Please select from year');
                return false;
            }
            if (this.birth_search.toyear === null || this.birth_search.toyear === undefined || this.birth_search.toyear === "") {
                this.alt.toasterror('Please select to year');
                return false;
            }
            if (this.birth_search.Gender === null || this.birth_search.Gender === undefined || this.birth_search.Gender === "") {
                this.alt.toasterror('Please Select Gender');
                return false;
            }
        }
        // if (this.birth_search.searchby == 'NAME') {
        //   if (this.birth_search.childname === null || this.birth_search.childname === undefined || this.birth_search.childname === "") {
        //     this.alt.toasterror('Please Enter Child Name');
        //     return false;
        //   }
        //   if (this.birth_search.mothername === null || this.birth_search.mothername === undefined || this.birth_search.mothername === "") {
        //     this.alt.toasterror('Please Enter Mother Name');
        //     return false;
        //   }
        //   if (this.birth_search.fathername === null || this.birth_search.fathername === undefined || this.birth_search.fathername === "") {
        //     this.alt.toasterror('Please Enter Father Name');
        //     return false;
        //   }
        // }

        if (this.birth_search.searchby == 'DOB') {
            if (this.birth_search.From_Date === null || this.birth_search.From_Date === undefined || this.birth_search.From_Date === "") {
                this.alt.toasterror('Please Select From Date');
                return false;
            }
            if (this.birth_search.To_Date === null || this.birth_search.To_Date === undefined || this.birth_search.To_Date === "") {
                this.alt.toasterror('Please Select To Date');
                return false;
            }
            if (this.birth_search.Date_of_birth === null || this.birth_search.Date_of_birth === undefined || this.birth_search.Date_of_birth === "") {
                this.alt.toasterror('Please Select Date of Birth');
                return false;
            }
        }
        if (this.birth_search.searchby == 'APPLICATIONNO') {
            if (this.birth_search.applicationnumber === null || this.birth_search.applicationnumber === undefined || this.birth_search.applicationnumber === "") {
                this.alt.toasterror('Please Enter Application Number');
                return false;
            }
            // if (this.birth_search.Gender === null || this.birth_search.Gender === undefined || this.birth_search.Gender === "") {
            //   this.alt.toasterror('Please Select Gender');
            //   return false;
            // }
        }
        if (this.birth_search.searchby == 'REGISTRATIONNO') {
            if (this.birth_search.registrationnumber === null || this.birth_search.registrationnumber === undefined || this.birth_search.registrationnumber === "") {
                this.alt.toasterror('Please Enter Registration Number');
                return false;
            }
            // if (this.birth_search.Gender === null || this.birth_search.Gender === undefined || this.birth_search.Gender === "") {
            //   this.alt.toasterror('Please Select Gender');
            //   return false;
            // }
        }

        return true;
    }

    birth_depth_table_array: any[] = [];
    async get_birth_table(): Promise<void> {
        try {
            if (this.validationforinputs()) {
                this.radiobutton = false;
                this.correctionshow = false;
                this.docmentshow = false;
                this.downloadshow = false;
                this.cancelshow = false;
                const req = new basemodel();
                req.type = '1023';
                req.param5 = this.birth_search.searchby;
                req.param4 = this.birth_search.fromyear.toString();
                req.param6 = this.birth_search.toyear.toString();
                req.param7 = this.birth_search.Gender;
                req.param8 = this.birth_search.childname;
                req.param9 = this.birth_search.mothername;
                req.param10 = this.birth_search.fathername;
                req.param11 = this.datepipe.transform(this.birth_search.From_Date, 'dd-MM-yyyy');
                req.param12 = this.datepipe.transform(this.birth_search.To_Date, 'dd-MM-yyyy');
                req.param14 = this.datepipe.transform(this.birth_search.Date_of_birth, 'dd-MM-yyyy');
                req.param13 = this.birth_search.applicationnumber;
                req.param15 = this.birth_search.registrationnumber;
                req.param16 = this.birth_search.Registration;
                req.param18 = this.birth_search.district;
                req.param19 = this.birth_search.Registration_Unit;
                req.param20 = this.birth_search.Hospital;
                req.param22 = this.birth_search.Allstates;
                req.param23 = this.birth_search.ruralurban;
                req.param24 = this.birth_search.mandal;
                let responce: any = await this.auth.auth_pkgcrsstillbirth_service(req);
                this.birth_depth_table_array = [];
                this.spinner.show();
                debugger
                if (responce.code) {
                    this.spinner.hide();
                    this.birth_depth_table_array = responce.Details;
                    return;
                } else {
                    this.spinner.hide();
                    this.alt.toastinfo(responce.message);
                    this.birth_depth_table_array = [];
                    return;
                }
            }
        } catch (error) {
            this.birth_depth_table_array = [];
            this.spinner.hide();
            return;
        }
    }
    Resetsearch() {
        this.birth_search = {
            district: '',
            ruralurban: '',
            mandal: '',
            Registration_Unit: '',
            Hospital: '',
            fromyear: '',
            toyear: '',
            applicationnumber: '',
            registrationnumber: '',
            Registration: '',
            Gender: '',
            mothername: '',
            fathername: '',
            childname: '',
            From_Date: '',
            To_Date: '',
            Date_of_birth: '',
            searchby: 'YEAR',
            Allstates:'0'
        }
        this.radiobutton = false;
        this.correctionshow = false;
        this.docmentshow = false;
        this.downloadshow = false;
        this.cancelshow = false;
        this.birth_depth_table_array = [];
    }
    typeofcorrection: any; applicationid: any; preview_tittle = ""; applicationregid: any;
    viewmodel = "searchstillbirth"; drafttype = '';
    getCorrection(type: any) {
        debugger
        if (this.radiobutton && this.applicationnumber != null) {
            this.applicationid = "";
            this.applicationid = this.applicationnumber;

            if (type == 'Correction') {
                this.preview_tittle = "Still Birth Correction / నిర్జీవ శిశువు దిద్దుబాటు";
                this.viewmodel = "StillBIRTHCorrection";
                this.typeofcorrection = "Correction";
            }
            if (type == 'Cancellation') {
                this.preview_tittle = "Cancel Still Birth / నిర్జీవ శిశువు రద్దు చేయండి";
                this.viewmodel = "Cancellation";
                this.typeofcorrection = "Cancellation";
            }

        }
        else {
            this.alt.toasterror('invalid application');
        }
    }
    pdfdisplaymodal = 'none'; isModalVisible: boolean = false;
    closeModal() {
        this.isModalVisible = false;
        this.pdfdisplaymodal = 'none';
    }
    PathReportString: any;
    async downloadorder() {
        try {
            const req = new basemodel();
            req.type = '1022';
            req.param1 = this.applicationnumber
            req.param4 = 'stillbirth';
            req.param5 = 'both';
            let responce: any = await this.auth.pdf_download(req);
            this.spinner.show();
            if (responce.code) {
                this.spinner.hide();
                if (responce.url) {
                    this.PathReportString = 'data:application/pdf;base64,' + (this.sanitizer.bypassSecurityTrustResourceUrl(responce.url) as any).changingThisBreaksApplicationSecurity;
                    this.isModalVisible = true;
                    this.pdfdisplaymodal = 'block';
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
    async Backwindow() {
        this.viewmodel = 'searchstillbirth';
        this.Resetsearch();
        this.getDistrict(); 
        if(this.obj[0].MMC_CODE != null || this.obj[0].MMC_CODE != undefined || this.obj[0].MMC_CODE != ''){
            this.birth_search.mandal = this.obj[0].MMC_CODE;
            }
            if(this.obj[0].RU_CODE != null || this.obj[0].RU_CODE != undefined || this.obj[0].RU_CODE != ''){
            this.birth_search.Registration_Unit = this.obj[0].RU_CODE;
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
    getStillbirthColumn(columnName: string): boolean {
        return this.birth_depth_table_array.some(row => row[columnName] === "1" && row['APPLICATION_ID'] === this.applicationnumber);
    }
    correctionshow: boolean = false;
    docmentshow: boolean = false;
    downloadshow: boolean = false;
    cancelshow: boolean = false;
    radiobutton = false; applicationnumber: any
    getbuttonenabled(agency: any) {
        this.radiobutton = true;
        this.applicationnumber = agency.APPLICATION_ID;
        this.applicationregid = agency.REGISTRATION_ID;
        this.correctionshow = this.getStillbirthColumn('CORRECTION_SEARCH');
        this.docmentshow = this.getStillbirthColumn('DOCUMENT_SEARCH');
        this.downloadshow = this.getStillbirthColumn('DOWNLOAD_SEARCH');
        this.cancelshow = this.getStillbirthColumn('CANCEL_SEARCH');


    }

    viewReportform() {
        this.isdocModalVisibleStillBirth = true;
        this.preview_tittle = "Stillbirth Registration Application Preview / చనిపోయి పుట్టిన శిశువు నమోదు దరఖాస్తు ప్రివ్యూ";
        this.viewmodelShow = "STILLBIRTH";

    }
    pdfSrc = 'http://www.pdf995.com/samples/pdf.pdf';
    isdocModalVisible: boolean = false;
    documentlist: any[] = [];
    async get_document_details(): Promise<void> {
        try {
            const req = new basemodel();
            req.type = '1016';
            req.param1 = this.applicationregid;
            req.param2 = this.applicationnumber;
            this.spinner.show();
            this.documentlist = [];
            let rsdata: any = await this.auth.auth_pkgcrsstillbirth_service(req);
            this.spinner.hide();
            if (rsdata.code) {
                this.isdocModalVisible = true;
                this.applicationid = this.applicationnumber;
                this.documentlist = rsdata.Details;
            } else {
                this.alt.toasterror('Docments Not Found');
                this.documentlist = [];
                this.spinner.hide();
            }
        } catch (error) {
            this.spinner.hide();

        }
    }
    DocModalCLose() {
        this.isdocModalVisible = false;
    }
    getSafeUrl(filePath: string) {
        return this.sanitizer.bypassSecurityTrustResourceUrl(filePath);
    }

    isImage(filePath: string): boolean {
        return /\.(jpg|jpeg|png|gif|bmp|svg)$/i.test(filePath);
    }

    isPDF(filePath: string): boolean {
        return /\.pdf$/i.test(filePath);
    }

    cureentdate: any;
    async modelcloseclear() {
        this.nac_registration = {
            forntname: '',
            childname: '',
            careof: '',
            fathername: ''
        }
    }
    async NACSave(): Promise<void> {
        try {
            const number = new Date().getFullYear();
            const req = new basemodel();
            req.type = '1031';
            req.param1 = "";
            req.param2 = number;
            req.param3 = number;
            req.param4 = this.nac_registration.childname;
            req.param5 = this.nac_registration.fathername;
            req.param6 = this.datepipe.transform(new Date(), 'dd-MM-yyyy');

            this.spinner.show();
            let responce: any = await this.auth.auth_pkgcrsstillbirth_service(req);
            this.spinner.hide();

            if (responce.code) {
                if (responce.Details[0].STATUS == '1') {
                    this.alt.success(responce.Details[0].STATUS_TEXT);
                    setTimeout(() => {
                        window.location.reload();
                    }, 2000)
                    return;
                }
                else if (responce.Details[0].STATUS == '0') {
                    this.alt.warning(responce.Details[0].STATUS_TEXT);
                    this.spinner.hide();
                    return;
                }
                else {
                    this.alt.warning(responce.message);
                    this.spinner.hide();
                    return;
                }
            }
            else {
                this.alt.warning(responce.message);
                this.spinner.hide();
                return;
            }


        } catch (error) {
            this.alt.toasterror("Something went wrong " + error);
            this.spinner.hide();
            return;
        }

    }
    async getallstate(event:any){
        if(this.birth_search.Allstates==='1'){
            this.birth_search.Allstates='0';
            this.birth_search.ruralurban = this.obj[0].RURAL_URBAN;
             this.birth_search.mandal = this.obj[0].MMC_CODE;
             this.birth_search.Registration_Unit = this.Registration_UnitList[0].RU_CODE;
             this.birth_search.Hospital = this.HospitalList[0].HOSPITAL_ID;
        }else{
            this.birth_search.Allstates='1';
            this.birth_search.ruralurban = '';
            this.birth_search.mandal ='';
            this.birth_search.Registration_Unit = '';
            this.birth_search.Hospital = '';
        }
        this.getDistrict();

    }

    // async getDistrict(): Promise<void> {
    //     try {
    //         
    //         const req = new basemodel();
    //         req.type = '2009';
    //         req.param22 = this.birth_search.Allstates;
    //         this.spinner.show();
    //         this.District = [];
    //         let responce: any = await this.auth.auth_utilities_service(req);

    //         this.spinner.hide();
    //         if (responce.code) {
    //             this.District = responce.Details;
    //             if (this.District.length > 0 && !this.birth_search.district) {
    //                 // Auto-select first only if the user has not made a selection
    //                 this.birth_search.district = this.District[0].DISTRICT_CODE;
    //                 await this.Districtchange();
    //             }
    //         } else {
    //             this.District = [];
    //         }
    //     } catch (error) {
    //         this.spinner.hide();
    //     }
    // }

    // async Districtchange(): Promise<void> {
    //     try {
    //         
    //         const req = new basemodel();
    //         req.type = '2010';
    //         req.param1 = this.birth_search.district;
    //         req.param22 = this.birth_search.Allstates;
    //         this.spinner.show();
    //         this.Registration_UnitList = [];

    //         let responce: any = await this.auth.auth_utilities_service(req);
    //         this.spinner.hide();

    //         if (responce.code) {
    //             this.Registration_UnitList = responce.Details;

    //             if (this.Registration_UnitList.length > 0) {
    //                 // Preserve the user's selected Registration Unit if it's still valid
    //                 const existingSelection = this.Registration_UnitList.find(
    //                     (unit) => unit.RU_CODE === this.birth_search.Registration_Unit
    //                 );

    //                 this.birth_search.Registration_Unit = existingSelection
    //                     ? existingSelection.RU_CODE
    //                     : this.Registration_UnitList[0].RU_CODE;

    //                 await this.Registrationchange();
    //             }
    //         } else {
    //             this.Registration_UnitList = [];
    //         }
    //     } catch (error) {
    //         this.spinner.hide();
    //     }
    // }

    async getDistrict(): Promise<void> {
        try {
            
            const req = new basemodel();
            req.type = '2009';
            req.param22 = this.birth_search.Allstates;
            this.spinner.show();
            this.District = [];
            let responce: any = await this.auth.auth_utilities_service(req);
            this.spinner.hide();
            if (responce.code) {
                this.District = responce.Details;
                // if (this.District.length > 0 && !this.birth_search.district) {
                //     // Auto-select first only if the user has not made a selection 
                //     this.birth_search.district = this.District[0].DISTRICT_CODE;
                //     this.Districtchange();  
                // } 
                if(this.UROLE =='101'){
                    this.birth_search.district = this.District[0].DISTRICT_CODE;
                    this.Districtchange();
                }else{

                if (this.District.length == 1) {
                    this.birth_search.district = this.District[0].DISTRICT_CODE;
                    this.Districtchange();
                }
                else {
                    this.Districtchange();
                } 
            }
            } else {
                this.District = [];
            }
        } catch (error) {
            this.spinner.hide();
        }
    }
    async Districtchange() : Promise<void> {  
        // if(this.UROLE =='101'){
        //     this.birth_search.ruralurban = 'Urban';
        //     this.urbanchange();
        // }else{
        //     this.birth_search.ruralurban = this.obj[0].RURAL_URBAN;
        //     this.urbanchange();
        // }

        try {
            const req = new basemodel();
            req.type = '2014';
            req.param22 = this.birth_search.Allstates;   //28
            req.param1 = this.birth_search.district;
           // req.param2 = this.birth_search.ruralurban;

            this.spinner.show();
            const responce: any = await this.auth.auth_utilities_service(req);
            this.spinner.hide();

            if (responce.code) {
                this.ruralurban_array = responce.Details;
                if (this.ruralurban_array.length > 0) {
                    this.birth_search.ruralurban = this.ruralurban_array[0].RURAL_URBAN_CODE;
                    this.urbanchange();
                }
                 } else {
                this.MandalMuncipality_array = [];
            }
        } catch (error) {
            this.spinner.hide();
            console.error('urbanchange error:', error);
        }
       
    }

    async urbanchange(): Promise<void> {
        try {
            
            const req = new basemodel();
            req.type = '2013';
            req.param22 = this.birth_search.Allstates;
            req.param1 = this.birth_search.district;
            req.param2 = this.birth_search.ruralurban;

            this.spinner.show();
            const responce: any = await this.auth.auth_utilities_service(req);
            this.spinner.hide();

            if (responce.code) {
                this.MandalMuncipality_array = responce.Details;
                if (this.MandalMuncipality_array.length > 0) {
                    this.birth_search.mandal = this.MandalMuncipality_array[0].MMC_CODE;
                    this.Mandalchange();
                }
                 } else {
                this.MandalMuncipality_array = [];
            }
        } catch (error) {
            this.spinner.hide();
            console.error('urbanchange error:', error);
        }
    }



    async Mandalchange(): Promise<void> {
        try {
            
            
            const req = new basemodel();
            req.type = '2010';
            req.param1 = this.birth_search.district;
            req.param22 = this.birth_search.Allstates;
            req.param2 = this.birth_search.ruralurban;
            req.param3 = this.birth_search.mandal;
            this.spinner.show();
            this.Registration_UnitList = [];

            let responce: any = await this.auth.auth_utilities_service(req);
            this.spinner.hide();

            if (responce.code) {
                this.Registration_UnitList = responce.Details;
                if (this.Registration_UnitList.length > 0) {
                    this.birth_search.Registration_Unit = this.Registration_UnitList[0].RU_CODE;
                    this.Registrationchange();
                }

            } else {
                this.Registration_UnitList = [];
            }
        } catch (error) {
            this.spinner.hide();
        }
    }

    async Registrationchange(): Promise<void> {
        try {
            
            const req = new basemodel();
            req.type = '2011';
            req.param1 = this.birth_search.district;
            req.param2 = this.birth_search.Registration_Unit;
            req.param22 = this.birth_search.Allstates;
            this.spinner.show();
            this.HospitalList = [];

            let responce: any = await this.auth.auth_utilities_service(req);
            this.spinner.hide();

            if (responce.code) {
                this.HospitalList = responce.Details;
                this.birth_search.Hospital = this.HospitalList[0].HOSPITAL_ID; 
            } else {
                this.HospitalList = [];
            }
        } catch (error) {
            this.spinner.hide();
        }
    }



    applicationidV: any;
    applicationtype: any;
    viewmodelShow = 'INBOX';
    isdocModalVisibleStillBirth: boolean = false;

    StillBirthCLose() {
        this.isdocModalVisibleStillBirth = false;
        this.viewmodelShow = "";
    }
}
