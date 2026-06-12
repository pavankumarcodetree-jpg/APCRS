import { DatePipe } from '@angular/common';
import { Component, Input, ViewChild } from '@angular/core';
import { NgModel } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertsService } from 'src/app/services/alert_lyr/alerts.service';
import { AuthserService } from 'src/app/services/api_lyr/private/authser.service';
import { EncDecService } from 'src/app/services/enc_dec_lyr/enc-dec.service';
import { MiddlewareService } from 'src/app/services/middleware_lyr/middleware.service';
import { basemodel } from 'src/app/thirparty/model/apimodel';
import { InputvalidaionService } from 'src/app/thirparty/validation/inputvalidaion.service';
declare var Fancybox: any;

@Component({
    selector: 'app-search-adoption-event',
    templateUrl: './search-adoption-event.component.html',
    styleUrl: './search-adoption-event.component.css'
})
export class SearchAdoptionEventComponent {
    bsConfig: Partial<BsDatepickerConfig>;
    mindate!: Date;
    maxdate!: Date;
    contentshowurl: any;
    // From_Date!: Date;
    // To_Date!: Date;
    //   birth_search = {
    //   fromyear: '',
    //   toyear: '',
    //   applicationnumber: '',
    //   Gender: '',
    //   mothername:'',
    //   fathername:'',
    //   childname:'',
    //   searchby:'year'
    //   }
    District: any[] = [];
    ruralurban_array: any[] = [];
    HospitalList: any[] = [];
    Registration_UnitList: any[] = [];
    MandalMuncipality_array: any[] = [];
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
        Allstates: '0'
    }
    // nac_registration = {
    //     forntname: '',
    //     childname: '',
    //     careof: '',
    //     fathername: ''
    // }
    nac_registration = {
        entername: '',
        entercareof: '',
        enterchildname: '',
        forntname: '',
        childname: '',
        careof: '',
        fathername: ''
    }
    constructor(private encdc: EncDecService, private router: Router, private auth: AuthserService, private spinner: NgxSpinnerService,
        private alt: AlertsService, private sanitizer: DomSanitizer, private datepipe: DatePipe, private mid: MiddlewareService, private val: InputvalidaionService
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
    obj: any;UROLE:any;
    ngOnInit(): void {
        if (sessionStorage.getItem('_Uenc') !== '') {
            //this.collapsed = true;
            this.obj = this.encdc.Getuser();
            if (this.obj != '' && this.obj != undefined && this.obj != null) {
                this.UROLE = this.obj[0].UROLE;
                this.getDistrict();             
                this.cureentdate = this.datepipe.transform(new Date(), 'dd-MM-yyyy');
                Fancybox.defaults.Hash = false;
                Fancybox.bind('[data-fancybox="gallery"]', {
                    Hash: false,  // Disable URL hash changes
                });
                this.getUploadPeriod();
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
        let baseYear = 2015;
        let currYear = new Date().getFullYear();
        this.years = [];

        // for (var i = baseYear; i <= currYear; i++) {
        // this.years.push({"year":i});
        // }
        for (var i = currYear; i >= baseYear; i--) {
            this.years.push({ "year": i });
        }
        console.log('years', this.years)
        return this.years

    }
    expression: boolean = false;
    birth_depth_table_array: any[] = []; table_card_select = "BIRTH";
    async get_birth_table(): Promise<void> {

        if (this.birth_search.searchby === null || this.birth_search.searchby === "" || this.birth_search.searchby === undefined) {
            this.alt.toasterror("Please Select  Search By Filter");
            return;
        }
        else {
            if (!this.validationforinputs()) {
                try {
                    this.radiobutton = false;
                    this.addnameshow = false;
                    this.correctionshow = false;
                    this.cancelshow = false;
                    this.docmentshow = false;
                    this.downloadshow = false;
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
                    let responce: any = await this.auth.auth_pkgcrsadoption_service(req);
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
                        this.birth_depth_table_array = [];
                        this.alt.toasterror(responce.message);
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


    getBirthColumn(columnName: string): boolean {
        return this.birth_depth_table_array.some(row => row[columnName] === "1" && row['APPLICATION_ID'] === this.applicationnumber);
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
            Allstates: '0'
        }
        this.radiobutton = false;
        this.addnameshow = false;
        this.correctionshow = false;
        this.cancelshow = false;
        this.docmentshow = false;
        this.downloadshow = false;
        this.birth_depth_table_array = [];
        //this.get_birth_table();
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
            req.param4 = 'adoption';
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

    radiobutton = false; applicationnumber: any; applicationregid: any;
    getbuttonenabled(agency: any) {
        debugger
        this.radiobutton = true;
        this.applicationnumber = agency.APPLICATION_ID;
        this.applicationregid = agency.REGISTRATION_ID;
        this.addnameshow = this.getBirthColumn('ADDNAME_SEARCH');
        this.correctionshow = this.getBirthColumn('CORRECTION_SEARCH');
        this.docmentshow = this.getBirthColumn('DOCUMENT_SEARCH');
        this.downloadshow = this.getBirthColumn('DOWNLOAD_SEARCH');
        this.cancelshow = this.getBirthColumn('CANCEL_SEARCH');


    }

    viewReportform() {
        this.isdocModalVisibleAdoption = true;
        this.preview_tittle = "Adoption Registration Application Preview / దత్తత నమోదు దరఖాస్తు ప్రివ్యూ";
        this.viewmodelShow = "ADOPTION";

    }
    async Backwindow() {
        this.viewmodel = 'searchbirth';
        this.Resetsearch();
        this.getDistrict(); 
        if(this.obj[0].MMC_CODE != null || this.obj[0].MMC_CODE != undefined || this.obj[0].MMC_CODE != ''){
            this.birth_search.mandal = this.obj[0].MMC_CODE;
            }
            if(this.obj[0].RU_CODE != null || this.obj[0].RU_CODE != undefined || this.obj[0].RU_CODE != ''){
            this.birth_search.Registration_Unit = this.obj[0].RU_CODE;
            }
    }
    pdfSrc = '';

    buttonshowString: any[] = [];
    addnameshow: boolean = false;
    correctionshow: boolean = false;
    cancelshow: boolean = false;
    docmentshow: boolean = false;
    downloadshow: boolean = false;
    viewmodel = "searchbirth"; drafttype = ''; preview_tittle = ""; applicationid: any; typeofcorrection: any
    getCorrection(type: any) {
        debugger
        if (this.radiobutton && this.applicationnumber != null) {
            this.applicationid = "";
            this.applicationid = this.applicationnumber;

            if (type == 'Correction') {
                this.preview_tittle = "Birth Correction / జనన దిద్దుబాటు";
                this.viewmodel = "Correction";
                this.typeofcorrection = "Correction";
            }
            if (type == 'addname') {
                this.preview_tittle = "Add Name / పేరు జోడించండి";
                this.viewmodel = "Addname";
                this.typeofcorrection = "Addname";
            }
            if (type == 'Cancellation') {
                this.preview_tittle = "Cancel Birth / జననాన్ని రద్దు చేయండి";
                this.viewmodel = "Cancellation";
                this.typeofcorrection = "Cancellation";
            }

        }
        else {
            this.alt.toasterror('invalid application');
        }
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
    documentlist: any[] = []; isdocModalVisible: boolean = false;
    async get_document_details(): Promise<void> {
        try {
            const req = new basemodel();
            req.type = '1016';
            req.param1 = this.applicationregid;
            req.param2 = this.applicationnumber;
            this.spinner.show();
            this.documentlist = [];
            let rsdata: any = await this.auth.auth_pkgcrsadoption_service(req);
            this.spinner.hide();
            debugger
            if (rsdata.code) {
                this.isdocModalVisible = true;
                this.applicationid = this.applicationnumber;
                this.documentlist = rsdata.Details;
            } else {
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


    @ViewChild('fromyear') fromyear!: NgModel;
    @ViewChild('toyear') toyear!: NgModel;
    @ViewChild('Gender') Gender!: NgModel;
    @ViewChild('childname') childname!: NgModel;
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
        switch (this.birth_search.searchby) {
            case 'YEAR':
                // if (this.fromyear) {
                if (this.birth_search.searchby === "YEAR") {
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

    cureentdate: any;
    async modelcloseclear() {
        this.nac_registration = {
            entername: '',
            entercareof: '',
            enterchildname: '',
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
            // req.param2 = number;
            // req.param3 = number;
            req.param2 = this.birth_search.fromyear;
            req.param3 = this.birth_search.toyear;
            req.param4 = this.nac_registration.childname;
            req.param5 = this.nac_registration.fathername;
            req.param6 = this.datepipe.transform(new Date(), 'dd-MM-yyyy');
            req.param7 = this.nac_registration.forntname;
            req.param8 = this.nac_registration.entername;
            req.param9 = this.nac_registration.entercareof;
            req.param10 = this.nac_registration.enterchildname;

            this.spinner.show();
            let responce: any = await this.auth.auth_pkgcrsadoption_service(req);
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
    async getallstate(event: any) {
        if (this.birth_search.Allstates === '1') {
            this.birth_search.Allstates = '0';

            this.birth_search.ruralurban = this.obj[0].RURAL_URBAN;
            this.birth_search.mandal = this.obj[0].MMC_CODE;
            this.birth_search.Registration_Unit = this.Registration_UnitList[0].RU_CODE;
            this.birth_search.Hospital = this.HospitalList[0].HOSPITAL_ID;
        } else {
            this.birth_search.Allstates = '1';
            this.birth_search.ruralurban = '';
            this.birth_search.mandal = '';
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
                if (this.UROLE == '101') {
                    this.birth_search.district = this.District[0].DISTRICT_CODE;
                    this.Districtchange();
                } else {

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
    // Districtchange() {
    //     
    //     this.birth_search.ruralurban = this.obj[0].RURAL_URBAN;
    //     this.urbanchange();
    // }
    async Districtchange() : Promise<void> {    
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
            req.param22 = this.birth_search.Allstates;   //28
            req.param1 = this.birth_search.district;
            req.param2 = this.birth_search.ruralurban;

            this.spinner.show();
            const responce: any = await this.auth.auth_utilities_service(req);
            this.spinner.hide();

            if (responce.code) {
                this.MandalMuncipality_array = responce.Details;
                console.log(this.MandalMuncipality_array);

                if (responce.code) {
                    this.MandalMuncipality_array = responce.Details;
                    if (this.MandalMuncipality_array.length > 0) {
                        this.birth_search.mandal = this.MandalMuncipality_array[0].MMC_CODE;
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
                //this.birth_search.Hospital = this.HospitalList[0].HOSPITAL_ID; 
            } else {
                this.HospitalList = [];
            }  
        } catch (error) {
            this.spinner.hide();
        }
    }




    isNACModalVisible = false;
    NACModalCLose() {
        this.isNACModalVisible = false;
    }
    validateNACinputs() {
        if (this.val.isEmpty(this.birth_search.childname)) {
            this.alt.toasterror('Please Add Child Name');
            return false;
        }
        if (this.val.isEmpty(this.birth_search.fathername) && this.val.isEmpty(this.birth_search.mothername)) {
            this.alt.toasterror('Please Add Father Name or Mother name');
            return false;
        }
        return true;
    }
    NACShow() {
        
        if (this.validateNACinputs()) {
            this.nac_registration.careof = 'sonanddaughter';
            this.nac_registration.childname = this.birth_search.childname;
            if (!this.val.isEmpty(this.birth_search.mothername)) {
                this.nac_registration.fathername = this.birth_search.mothername;
            } else {
                this.nac_registration.fathername = this.birth_search.fathername;
            }
            this.isNACModalVisible = true;
        }
    }



    applicationidV: any;
    applicationtype: any;
    viewmodelShow = 'INBOX';
    isdocModalVisibleAdoption: boolean = false;

    AdoptionCLose() {
        this.isdocModalVisibleAdoption = false;
        this.viewmodelShow = "";
    }

}
