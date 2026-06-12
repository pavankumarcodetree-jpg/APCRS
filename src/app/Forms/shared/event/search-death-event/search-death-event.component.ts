import { DatePipe } from '@angular/common';
import { Component, Input, ViewChild } from '@angular/core';
import { NgModel } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertsService } from 'src/app/services/alert_lyr/alerts.service';
import { AuthserService } from 'src/app/services/api_lyr/private/authser.service';
import { PrivateService } from 'src/app/services/api_lyr/private/private.service';
import { EncDecService } from 'src/app/services/enc_dec_lyr/enc-dec.service';
import { MiddlewareService } from 'src/app/services/middleware_lyr/middleware.service';
import { basemodel } from 'src/app/thirparty/model/apimodel';
import { InputvalidaionService } from 'src/app/thirparty/validation/inputvalidaion.service';
declare var Fancybox: any;


@Component({
    selector: 'app-search-death-event',
    templateUrl: './search-death-event.component.html',
    styleUrl: './search-death-event.component.css'
})
export class SearchDeathEventComponent {
    bsConfig: Partial<BsDatepickerConfig>;
    mindate!: Date;
    maxdate!: Date;
    // From_Date!: Date;
    // To_Date!: Date;
    contentshowurl: any;
    District: any[] = [];
    ruralurban_array: any[] = [];
    MandalMuncipality_array: any[] = [];
    HospitalList: any[] = [];
    Registration_UnitList: any[] = [];
    death_search = {
        Registration_Unit: '',
        Hospital: '',
        district: '',
        ruralurban: '',
        mandal: '',
        fromyear: '',
        toyear: '',
        applicationnumber: '',
        registrationnumber: '',
        Gender: '',
        mothername: '',
        fathername: '',
        deceased: '',
        From_Date: '',
        To_Date: '',
        Date_of_death: '',
        searchby: 'YEAR',
        Registration: '',
        Allstates: '0'
    }

    draft_details_array = {

        Informationofthedeceased: {
            FullName: '',
            FullName_tel: '',
            middlename: '',
            middlename_tel: '',
            Surname: '',
            Surname_tel: '',
        },
        fatherInformation: {
            father_full_namer: '',
            father_full_namer_t: '',
            father_full_namer_val: '',
            father_surname: '',
            father_surname_t: '',
            father_middlename: '',
            father_middlename_t: '',
        }

    };
    constructor(private encdc: EncDecService, private router: Router, private auth: AuthserService, private spinner: NgxSpinnerService,
        private alt: AlertsService, private sanitizer: DomSanitizer, private datepipe: DatePipe, private mid: MiddlewareService,
        private pscall: PrivateService, private val: InputvalidaionService
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
    UROLE: any;
    RuCode: any;
    cureentdate: any; obj: any; statuses: any[] = [];
    ngOnInit(): void {
        if (sessionStorage.getItem('_Uenc') !== '') {
            //this.collapsed = true;
            this.obj = this.encdc.Getuser();
            if (this.obj != '' && this.obj != undefined && this.obj != null) {
                this.RuCode = this.obj[0].RU_CODE;
                this.UROLE = this.obj[0].UROLE;
                this.getDistrict();
                this.cureentdate = this.datepipe.transform(new Date(), 'dd-MM-yyyy');
                Fancybox.defaults.Hash = false;
                Fancybox.bind('[data-fancybox="gallery"]', {
                    Hash: false,  // Disable URL hash changes
                });
                this.getUploadPeriod();
                this.statuses = [
                    { label: "DEATH", value: "DEATH" },
                    { label: "OLDDEATH", value: "OLDDEATH" },
                ];
                // this.get_birth_table();
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

        // for (var i = baseYear; i <= currYear; i++) {
        //     this.years.push({ "year": i });
        // }
        for (var i = currYear; i >= baseYear; i--) {
            this.years.push({ "year": i });
        }
        console.log('years', this.years)
        return this.years

    }
    isdropdownhide: any = true;
    searchbychange() {
        this.death_search.fromyear = '';
        this.death_search.toyear = '';
        this.death_search.applicationnumber = '';
        this.death_search.registrationnumber = '';
        this.death_search.Registration = '';
        this.death_search.Gender = '';
        this.death_search.mothername = '';
        this.death_search.fathername = '';
        this.death_search.deceased = '';
        this.death_search.From_Date = '';
        this.death_search.To_Date = '';
        this.death_search.Date_of_death = '';


        if (this.death_search.searchby == 'APPLICATIONNO' || this.death_search.searchby == 'REGISTRATIONNO') {
            this.isdropdownhide = false;
            this.death_search.district = '';
            this.death_search.Registration_Unit = '';
            this.death_search.Hospital = '';
        } else {
            this.isdropdownhide = true;
            this.death_search.district = this.District[0].DISTRICT_CODE;
            this.death_search.Registration_Unit = this.Registration_UnitList[0].RU_CODE;
            this.death_search.Hospital = this.HospitalList[0].HOSPITAL_ID;
        }

    }
    birth_depth_table_array: any[] = []; expression: boolean = false;
    async get_birth_table(): Promise<void> {
        
        if (this.death_search.searchby === null || this.death_search.searchby === "" || this.death_search.searchby === undefined) {
            this.alt.toasterror("Please Select  Search By Filter");
            return;
        }
        else {
            if (!this.validationforinputs()) {
                try {
                    this.radiobutton = false;
                    this.correctionshow = false;
                    this.docmentshow = false;
                    this.downloadshow = false;
                    this.cancelshow = false;
                    const req = new basemodel();
                    req.type = '1023';
                    req.param5 = this.death_search.searchby;
                    req.param4 = this.death_search.fromyear.toString();
                    req.param6 = this.death_search.toyear.toString();
                    req.param7 = this.death_search.Gender;
                    req.param8 = this.death_search.deceased;
                    req.param9 = this.death_search.mothername;
                    req.param10 = this.death_search.fathername;
                    req.param11 = this.datepipe.transform(this.death_search.From_Date, 'dd-MM-yyyy');//this.death_search.From_Date.toString();
                    req.param12 = this.datepipe.transform(this.death_search.To_Date, 'dd-MM-yyyy');//this.death_search.To_Date.toString();
                    req.param14 = this.datepipe.transform(this.death_search.Date_of_death, 'dd-MM-yyyy');//this.death_search.Date_of_death.toString();
                    req.param13 = this.death_search.applicationnumber;
                    req.param15 = this.death_search.registrationnumber;
                    req.param16 = this.death_search.Registration;
                    req.param18 = this.death_search.district;
                    req.param19 = this.death_search.Registration_Unit;
                    req.param20 = this.death_search.Hospital;
                    req.param22 = this.death_search.Allstates;
                    req.param23 = this.death_search.ruralurban;
                    req.param24 = this.death_search.mandal;
                    // console.log(req);
                    let responce: any = await this.auth.auth_pkgcrsdeath_service(req);
                    this.birth_depth_table_array = [];
                    this.spinner.show();
                    debugger
                    if (responce.code) {
                        this.spinner.hide();
                        this.birth_depth_table_array = responce.Details;
                        if (this.birth_depth_table_array.length == 0) {
                            this.expression = true;
                        } else {
                            this.expression = false;
                        }
                        return;
                    } else {
                        if (this.birth_depth_table_array.length == 0) {
                            this.expression = true;
                        } else {
                            this.expression = false;
                        }
                        this.spinner.hide();
                        this.alt.toasterror(responce.message);
                        this.birth_depth_table_array = [];

                        return;
                    }



                } catch (error) {

                    this.birth_depth_table_array = [];
                    this.spinner.hide();
                    return;
                }
            }
        }
    }

    async getallstate(event: any) {
        if (this.death_search.Allstates === '1') {
            this.death_search.Allstates = '0';
            this.death_search.ruralurban = this.obj[0].RURAL_URBAN;
            this.death_search.mandal = this.obj[0].MMC_CODE;
            this.death_search.Registration_Unit = this.Registration_UnitList[0].RU_CODE;
            this.death_search.Hospital = this.HospitalList[0].HOSPITAL_ID;
        } else {
            this.death_search.Allstates = '1';
            this.death_search.ruralurban = '';
            this.death_search.mandal = '';
            this.death_search.Registration_Unit = '';
            this.death_search.Hospital = '';
        }
        this.getDistrict();

    }

    @ViewChild('fromyear') fromyear!: NgModel;
    @ViewChild('toyear') toyear!: NgModel;
    @ViewChild('Gender') Gender!: NgModel;
    @ViewChild('deceased') deceased!: NgModel;
    @ViewChild('mothername') mothername!: NgModel;
    @ViewChild('fathername') fathername!: NgModel;
    @ViewChild('From_Date') From_Date!: NgModel;
    @ViewChild('To_Date') To_Date!: NgModel;
    @ViewChild('Date_of_death') Date_of_death!: NgModel;
    @ViewChild('applicationnumberref') applicationnumberref!: NgModel;
    @ViewChild('registrationnumber') registrationnumber!: NgModel;

    validationforinputs() {
        debugger
        let isInvalid = false;
        let tostervalue = "";
        switch (this.death_search.searchby) {
            case 'YEAR':
                // if (this.fromyear) {
                if (this.death_search.searchby === "YEAR") {
                    if (this.fromyear) {
                        this.fromyear.control.markAsTouched();
                        this.fromyear.control.updateValueAndValidity();
                        // this.foc_sel_gender.nativeElement.focus();
                        if (this.fromyear.invalid) {
                            isInvalid = true;
                            tostervalue = "Please Select From Year";
                            break;

                        }
                    }
                    if (this.toyear) {
                        this.toyear.control.markAsTouched();
                        this.toyear.control.updateValueAndValidity();
                        // this.foc_sel_gender.nativeElement.focus();
                        if (this.toyear.invalid) {
                            isInvalid = true;
                            tostervalue = "Please Select To Year";
                            break;

                        }
                    }
                    if (this.Gender) {
                        this.Gender.control.markAsTouched();
                        this.Gender.control.updateValueAndValidity();
                        // this.foc_sel_gender.nativeElement.focus();
                        if (this.Gender.invalid) {
                            isInvalid = true;
                            tostervalue = "Please Select Gender";
                            break;

                        }
                    }
                }

                break;

            case 'DOD':
                if (this.From_Date) {
                    this.From_Date.control.markAsTouched();
                    this.From_Date.control.updateValueAndValidity();
                    // this.foc_sel_gender.nativeElement.focus();
                    if (this.From_Date.invalid) {
                        isInvalid = true;
                        tostervalue = "Please Select From Date";
                        break;

                    }
                }
                if (this.To_Date) {
                    this.To_Date.control.markAsTouched();
                    this.To_Date.control.updateValueAndValidity();
                    // this.foc_sel_gender.nativeElement.focus();
                    if (this.To_Date.invalid) {
                        isInvalid = true;
                        tostervalue = "Please Select To Date";
                        break;

                    }
                }
                if (this.Date_of_death) {
                    this.Date_of_death.control.markAsTouched();
                    this.Date_of_death.control.updateValueAndValidity();
                    // this.foc_sel_gender.nativeElement.focus();
                    if (this.Date_of_death.invalid) {
                        isInvalid = true;
                        tostervalue = "Please Select Date of death";
                        break;

                    }
                }
                break;
            case 'APPLICATIONNO':
                if (this.applicationnumberref) {
                    this.applicationnumberref.control.markAsTouched();
                    this.applicationnumberref.control.updateValueAndValidity();
                    // this.foc_sel_gender.nativeElement.focus();
                    if (this.applicationnumberref.invalid) {
                        isInvalid = true;
                        tostervalue = "Please Enter Application Ref Number";
                        break;

                    }
                }
                // if (this.Gender) {
                //     this.Gender.control.markAsTouched();
                //     this.Gender.control.updateValueAndValidity();
                //     // this.foc_sel_gender.nativeElement.focus();
                //     if (this.Gender.invalid) {
                //         isInvalid = true;
                //         tostervalue = "Please Select Gender";
                //         break;

                //     }
                // }
                break;
            case 'REGISTRATIONNO':
                if (this.registrationnumber) {
                    this.registrationnumber.control.markAsTouched();
                    this.registrationnumber.control.updateValueAndValidity();
                    // this.foc_sel_gender.nativeElement.focus();
                    if (this.registrationnumber.invalid) {
                        isInvalid = true;
                        tostervalue = "Please Enter Registration Number";
                        break;

                    }
                }
                // if (this.Gender) {
                //     this.Gender.control.markAsTouched();
                //     this.Gender.control.updateValueAndValidity();
                //     // this.foc_sel_gender.nativeElement.focus();
                //     if (this.Gender.invalid) {
                //         isInvalid = true;
                //         tostervalue = "Please Select Gender";
                //         break;

                //     }
                // }

                //return isInvalid;
                break;
            default:
            // Code to execute if no case matches
        }
        if (isInvalid) {
            //this.form_alert();
            this.alt.toasterror(tostervalue);
            return isInvalid;
        } else {
            return isInvalid;
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
            req.param4 = 'death';
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
    downloadPdf(): void {
        if (!this.PathReportString) {
            console.error('PDF source is not set');
            return;
        }
        // Determine if the source is a URL or base64
        if (this.PathReportString.startsWith('data:application/pdf')) {
            // Handle base64 download
            const link = document.createElement('a');
            link.href = this.PathReportString;
            link.download = this.applicationnumber + '.pdf'; // Default file name
            link.click();
        } else {
            // Handle URL download
            const link = document.createElement('a');
            link.href = this.PathReportString;
            link.target = '_blank'; // Open in a new tab if necessary
            link.download = this.PathReportString.split('/').pop() || 'document.pdf'; // Extract file name from URL or use default
            link.click();
        }
    }

    Resetsearch() {
        this.death_search = {
            Registration_Unit: '',
            Hospital: '',
            ruralurban: '',
            mandal: '',
            district: '',
            fromyear: '',
            toyear: '',
            applicationnumber: '',
            registrationnumber: '',
            Gender: '',
            mothername: '',
            fathername: '',
            deceased: '',
            From_Date: '',
            To_Date: '',
            Date_of_death: '',
            searchby: 'YEAR',
            Registration: '',
            Allstates: '0'
        }
        this.radiobutton = false;
        this.correctionshow = false;
        this.docmentshow = false;
        this.downloadshow = false;
        this.cancelshow = false;
        this.birth_depth_table_array = [];
        //this.get_birth_table();
    }

    nac_registration = {
        entername: '',
        entercareof: '',
        enterchildname: '',
        forntname: '',
        childname: '',
        careof: '',
        fathername: ''
    }
    getDeathColumn(columnName: string): boolean {
        return this.birth_depth_table_array.some(row => row[columnName] === "1" && row['APPLICATION_ID'] === this.applicationnumber);
    }






    viewmodelShow = 'INBOX';
    isdocModalVisibleDeath: boolean = false;

    DeathCLose() {
        this.isdocModalVisibleDeath = false;
        this.viewmodelShow = "";
    }

    isNACModalVisible = false;
    NACModalCLose() {
        this.isNACModalVisible = false;
    }

    async modelcloseclear() {
        this.nac_registration.entername = '';
        this.nac_registration.entercareof = '';
        this.nac_registration.enterchildname = '';
        this.nac_registration.forntname = '';
        // this.nac_registration = {
        //     entername: '',
        //     entercareof: '',
        //     enterchildname: '',
        //     forntname: '',
        //     childname: '',
        //     careof: '',
        //     fathername: ''
        // }
    }

    validateNACinputs() {
        if (this.val.isEmpty(this.death_search.deceased)) {
            this.alt.toasterror('Please Add Deceased Name');
            return false;
        }
        if (this.val.isEmpty(this.death_search.fathername) && this.val.isEmpty(this.death_search.mothername)) {
            this.alt.toasterror('Please Add Father Name or Mother name');
            return false;
        }
        return true;
    }

    NACShow() {
        
        if (this.validateNACinputs()) {
            this.nac_registration.careof = 'sonanddaughter';
            this.nac_registration.childname = this.death_search.deceased;
            if (!this.val.isEmpty(this.death_search.mothername)) {
                this.nac_registration.fathername = this.death_search.mothername;
            } else {
                this.nac_registration.fathername = this.death_search.fathername;
            }
            this.isNACModalVisible = true;
        }
    }


    radiobutton = false; applicationnumber: any; applicationregnumber: any;
    correctionshow: boolean = false;
    docmentshow: boolean = false;
    downloadshow: boolean = false;
    cancelshow: boolean = false;
    application_type='';
    getbuttonenabled(agency: any) {
        
       // this.radiobutton = true;
        this.applicationnumber = agency.APPLICATION_ID;
        this.applicationregnumber = agency.REGISTRATION_ID;
        this.application_type= agency.APPLICATION_TYPE;
        this.correctionshow = this.getDeathColumn('CORRECTION_SEARCH');
        this.docmentshow = this.getDeathColumn('DOCUMENT_SEARCH');
        this.downloadshow = this.getDeathColumn('DOWNLOAD_SEARCH');
        this.cancelshow = this.getDeathColumn('CANCEL_SEARCH');
        this.radiobutton = this.getDeathColumn('REPORT_SEARCH');  
    }

    viewReportform() {
        this.isdocModalVisibleDeath = true;
        this.preview_tittle = "Death Registration Application Preview / మరణ నమోదు దరఖాస్తు ప్రివ్యూ";
        this.viewmodelShow = "DEATH";
    }
    pdfSrc = 'http://www.pdf995.com/samples/pdf.pdf';
    typeofcorrection: any; applicationid: any; preview_tittle = "";
    viewmodel = "searchdeath";
    getCorrection(type: any) {
        if (this.radiobutton && this.applicationnumber != null) {
            this.applicationid = "";
            this.applicationid = this.applicationnumber;
            if (type == 'Correction') {
                this.preview_tittle = "Death Correction / చనిపోయి దిద్దుబాటు";
                this.viewmodel = "Correction";
                this.typeofcorrection = "Correction";
            }
            if (type == 'Cancellation') {
                this.preview_tittle = "Cancel Death / మరణాన్ని రద్దు చేయండి";
                this.viewmodel = "Cancellation";
                this.typeofcorrection = "Cancellation";
            }

        }
        else {
            this.alt.toasterror('invalid application');
        }
    }
    async Backwindow() {
        this.viewmodel = 'searchdeath';
        this.Resetsearch();
        this.getDistrict(); 
        if(this.obj[0].MMC_CODE != null || this.obj[0].MMC_CODE != undefined || this.obj[0].MMC_CODE != ''){
            this.death_search.mandal = this.obj[0].MMC_CODE;
            }
            if(this.obj[0].RU_CODE != null || this.obj[0].RU_CODE != undefined || this.obj[0].RU_CODE != ''){
            this.death_search.Registration_Unit = this.obj[0].RU_CODE;
            }
    }




    async NACSave(): Promise<void> {
        try {
            const number = new Date().getFullYear();
            const req = new basemodel();
            req.type = '1031';
            req.param1 = "";
            req.param2 = this.death_search.fromyear;
            req.param3 = this.death_search.toyear;
            req.param4 = this.nac_registration.childname;
            req.param5 = this.nac_registration.fathername;
            req.param6 = this.datepipe.transform(new Date(), 'dd-MM-yyyy');
            req.param7 = this.nac_registration.forntname;
            req.param8 = this.nac_registration.entername;
            req.param9 = this.nac_registration.entercareof;
            req.param10 = this.nac_registration.enterchildname;

            this.spinner.show();
            let responce: any = await this.auth.auth_pkgcrsdeath_service(req);
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
    isdocModalVisible: boolean = false;
    documentlist: any[] = [];
    async get_document_details(): Promise<void> {
        try {
            const req = new basemodel();
            req.type = '1016';
            req.param1 = this.applicationregnumber;
            req.param2 = this.applicationnumber;
            this.spinner.show();
            this.documentlist = [];
            let rsdata: any = await this.auth.auth_pkgcrsdeath_service(req);
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

    // async getDistrict(): Promise<void> {
    //     try {
    //         
    //         const req = new basemodel();
    //         req.type = '2009';
    //         req.param22 = this.death_search.Allstates;
    //         this.spinner.show();
    //         this.District = [];
    //         let responce: any = await this.auth.auth_utilities_service(req);

    //         this.spinner.hide();
    //         if (responce.code) {
    //             this.District = responce.Details;
    //             if (this.District.length > 0 && !this.death_search.district) {
    //                 // Auto-select first only if the user has not made a selection
    //                 this.death_search.district = this.District[0].DISTRICT_CODE;
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
    //         req.param1 = this.death_search.district;
    //         req.param22 = this.death_search.Allstates;
    //         this.spinner.show();
    //         this.Registration_UnitList = [];

    //         let responce: any = await this.auth.auth_utilities_service(req);
    //         this.spinner.hide();

    //         if (responce.code) {
    //             this.Registration_UnitList = responce.Details;

    //             if (this.Registration_UnitList.length > 0) {
    //                 // Preserve the user's selected Registration Unit if it's still valid
    //                 const existingSelection = this.Registration_UnitList.find(
    //                     (unit) => unit.RU_CODE === this.death_search.Registration_Unit
    //                 );

    //                 this.death_search.Registration_Unit = existingSelection
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
            req.param22 = this.death_search.Allstates;
            this.spinner.show();
            this.District = [];
            let responce: any = await this.auth.auth_utilities_service(req);
            this.spinner.hide();
            if (responce.code) {
                this.District = responce.Details;

                if (this.UROLE == '101') {
                    this.death_search.district = this.District[0].DISTRICT_CODE;
                    this.Districtchange();
                } else {

                    if (this.District.length == 1) {
                        this.death_search.district = this.District[0].DISTRICT_CODE;
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
    // Districtchange() {
    //     
    //     this.death_search.ruralurban = this.obj[0].RURAL_URBAN;
    //     this.urbanchange();
    // }

    async Districtchange(): Promise<void> {
        
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
            req.param22 = this.death_search.Allstates;   //28
            req.param1 = this.death_search.district;
            // req.param2 = this.birth_search.ruralurban;

            this.spinner.show();
            const responce: any = await this.auth.auth_utilities_service(req);
            this.spinner.hide();

            if (responce.code) {
                this.ruralurban_array = responce.Details;
                if (this.ruralurban_array.length > 0) {
                    this.death_search.ruralurban = this.ruralurban_array[0].RURAL_URBAN_CODE;
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
            req.param22 = this.death_search.Allstates;
            req.param1 = this.death_search.district;
            req.param2 = this.death_search.ruralurban;
            this.spinner.show();
            const responce: any = await this.auth.auth_utilities_service(req);
            this.spinner.hide();
            if (responce.code) {
                this.MandalMuncipality_array = responce.Details;
                if (responce.code) {
                    this.MandalMuncipality_array = responce.Details;
                    if (this.MandalMuncipality_array.length > 0) {
                        this.death_search.mandal = this.MandalMuncipality_array[0].MMC_CODE;
                        this.Mandalchange();
                    }
                } else {
                    this.MandalMuncipality_array = [];
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
            req.param1 = this.death_search.district;
            req.param22 = this.death_search.Allstates;
            req.param2 = this.death_search.ruralurban;
            req.param3 = this.death_search.mandal;
            this.spinner.show();
            this.Registration_UnitList = [];

            let responce: any = await this.auth.auth_utilities_service(req);
            this.spinner.hide();

            if (responce.code) {
                this.Registration_UnitList = responce.Details;

                if (responce.code) {
                    this.Registration_UnitList = responce.Details;
                    if (this.Registration_UnitList.length > 0) {
                        this.death_search.Registration_Unit = this.Registration_UnitList[0].RU_CODE;
                        this.Registrationchange();
                    } 
                } else {
                    this.Registration_UnitList = [];
                }
            }
        } catch (error) {
            this.spinner.hide();
        }
    }

    async Registrationchange(): Promise<void> {
        try {
            
            const req = new basemodel();
            req.type = '2011';
            req.param1 = this.death_search.district;
            req.param2 = this.death_search.Registration_Unit;
            req.param22 = this.death_search.Allstates;
            req.param3 = this.death_search.ruralurban;
            req.param4 = this.death_search.mandal;
            this.spinner.show();
            this.HospitalList = [];

            let responce: any = await this.auth.auth_utilities_service(req);
            this.spinner.hide();

            if (responce.code) {
                this.HospitalList = responce.Details;
                this.death_search.Hospital = this.HospitalList[0].HOSPITAL_ID;
                //this.birth_search.Hospital = this.HospitalList[0].HOSPITAL_ID; 
            } else {
                this.HospitalList = [];
            }
        } catch (error) {
            this.spinner.hide();
        }
    }


    suggestions: any;
    async Teluglanguageconvrt(inputkeyval: any, inputsource: any) {
        this.pscall.Cdac_transliterateText(inputkeyval).subscribe(
            (response: any) => {
                this.suggestions = response[1][0][1];
                //------- Confirmnameofthedeceased -------//
                if (inputsource == 'InformationofthedeceasedFullName') {
                    this.draft_details_array.Informationofthedeceased.FullName_tel =
                        this.suggestions[0];
                }
                if (inputsource == 'InformationofthedeceasedFullName_t') {
                    this.draft_details_array.Informationofthedeceased.FullName_tel =
                        this.suggestions[0];
                }

                if (inputsource == 'middlename') {
                    this.draft_details_array.Informationofthedeceased.middlename_tel =
                        this.suggestions[0];
                }
                if (inputsource == 'middlename_tel') {
                    this.draft_details_array.Informationofthedeceased.middlename_tel =
                        this.suggestions[0];
                }

                //------- fatherInformation -------//
                if (inputsource == 'fatherInformationfather_full_namer') {
                    this.draft_details_array.fatherInformation.father_full_namer_t =
                        this.suggestions[0];
                }
                if (inputsource == 'fatherInformationfather_full_namer_t') {
                    this.draft_details_array.fatherInformation.father_full_namer_t =
                        this.suggestions[0];
                }

                if (inputsource == 'fathermiddlename') {
                    this.draft_details_array.fatherInformation.father_middlename_t =
                        this.suggestions[0];
                }
                if (inputsource == 'fathermiddlename_tel') {
                    this.draft_details_array.fatherInformation.father_middlename_t =
                        this.suggestions[0];
                }
                if (inputsource == 'fatherInformationfather_surname') {
                    this.draft_details_array.fatherInformation.father_surname_t =
                        this.suggestions[0];
                }
                if (inputsource == 'fatherInformationfather_surname_t') {
                    this.draft_details_array.fatherInformation.father_surname_t =
                        this.suggestions[0];
                }

            },
            (error) => {
                console.error('Error transliterating text:', error);
                return '';
            }
        );
    }



}
