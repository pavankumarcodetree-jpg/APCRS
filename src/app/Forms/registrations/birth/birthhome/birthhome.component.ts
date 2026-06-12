import { HttpClient, HttpHeaders } from '@angular/common/http';
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
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TimepickerConfig } from 'ngx-bootstrap/timepicker';
import { AuthserService } from 'src/app/services/api_lyr/private/authser.service';
import { InputvalidaionService } from 'src/app/thirparty/validation/inputvalidaion.service';
import { Router } from '@angular/router';
import { EncDecService } from 'src/app/services/enc_dec_lyr/enc-dec.service';
import { NgModel } from '@angular/forms';
import { LoggerService } from 'src/app/services/logger.service';
declare var Fancybox: any;


@Component({
    selector: 'app-birthhome',
    templateUrl: './birthhome.component.html',
    styleUrl: './birthhome.component.css',
})
export class BirthhomeComponent {
    contentuploadurl = '';
    contentshowurl = '';
    declarationcheck = false;
    birthinfohide: boolean = false;
    //brapplicationid:any;
    @Input() brapplicationid: any;
    @Input() drafttype: any;
    @Input() typeofcorrection: any;
    @Input() preview_tittle: any;
    @Input() NAC_application_Id: any;
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
        @Inject(DOCUMENT) private document: Document,
        private router: Router,
        private encdc: EncDecService,
        private el: ElementRef, private logger: LoggerService
    ) {
        this.maxdate = new Date();
        this.mindate = this.convertToDate('01-01-1970');
        this.contentuploadurl = this.mid.globalsetting.api_url_conent_upload;
        this.contentshowurl = mid.globalsetting.api_url_conent_show;

    }
    Deviceid: any;
    maxdate!: Date;
    mindate!: Date;
    dateofreportingcurrentdate: any;
    Dateoifreportmindate!: Date;
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
    minTime = '06:00'; // Minimum time in HH:mm format
    maxTime = '23:59'; // Maximum time in HH:mm format
    tbsConfig: Partial<TimepickerConfig> = {
        hourStep: 1,
        minuteStep: 15,
        showMeridian: true,
        readonlyInput: false,
        mousewheel: true,
        showMinutes: true,
        showSeconds: false,
        showSpinners: true,
        arrowkeys: true,
        min: new Date(0, 0, 0, 9, 0), // Start time: 9:00 AM
        max: new Date(0, 0, 0, 18, 0), // End time: 6:00 PM
    };
    hash: any;
    capthform: any;
    latitude: any;
    longitude: any;
    timeOptions: Array<{ value: string; label: string }> = [];
    selectedRadio3: string = '';
    selectedRadio4: string = '';

    documnets: any[] = [];

    dischargedocumnets = {
        documentcode: '',
        documentdescription: '',
        documentpath: '',
        documentformat: '',
        documentsize: '',
        documentfilename: '',
    };
    createdocment() {

        this.documnets.push({ documentcode: '', documentdescription: '', documentpath: '', documentformat: '', documentsize: '', documentfilename: '' })
    }
    deletedocment(add: any) {
        let index = this.documnets.findIndex((element) => element["documentcode"] == add.documentcode);
        this.documnets.splice(index, 1);
    }
    draft_details_array = {
        language: {
            primarylan: 'Telugu',
            secondarylan: 'English',
            dateofreport: this.datepipe.transform(new Date(), 'dd-MM-yyyy'),
        },
        childinformation: {
            childnotnamed: false,
            dateofbirthmask: '',
            dateofbirth: '',
            confirmdateofbirth: '',
            birttime: '',
            selgender: '',
            selgender_val: '',
            selaadhar: '',
            aadhaarmask: '',
            aadhaar: '',
            fullname: '',
            fullname_t: '',
            fullname_val: '',
            surname: '',
            surname_t: '',
            middlename: '',
            middlename_t: '',
            confirm_middle: '',
            confirm_middle_t: '',
            surname_val: '',
            confirm_fullname: '',
            confirm_fullname_t: '',
            confirm_fullname_val: '',
            confirm_surname: '',
            confirm_surname_t: '',
            confirm_surname_val: '',
            childname_value: '',
        },
        fatherInformation: {
            father_full_namer: '',
            father_full_namer_t: '',
            father_full_namer_val: '',
            father_surname: '',
            father_surname_t: '',
            father_middlename: '',
            father_middlename_t: '',
            father_surname_val: '',
            father_mobile_number: '',
            father_email_number: '',
            father_aadhhar_number_mask: '',
            father_aadhhar_number: '',
            fathername_value: '',
        },
        motherInformation: {
            mother_full_namer: '',
            mother_full_namer_t: '',
            mother_full_namer_val: '',
            mother_surname: '',
            mother_surname_t: '',
            mother_middle_name: '',
            mother_middle_name_t: '',
            mother_surname_val: '',
            mother_mobile_number: '',
            mother_email_number: '',
            mother_aadhhar_number: '',
            mother_aadhaar_number_mask: '',
            mothername_value: '',
        },
        addressof_parents: {
            addressof: '',
            address_parent_country: '',
            address_parent_country_val: '',
            address_parent_country_address: '',
            address_parent_country_address_t: '',
            address_parent_country_address_val: '',
            address_parent_state: '',
            address_parent_state_val: '',
            address_parent_district: '',
            address_parent_district_val: '',
            address_parent_rural_urabn: '',
            address_parent_rural_urabn_val: '',
            address_parent_mmc: '',
            address_parent_mmc_val: '',
            address_parent_Village_Town: '',
            address_parent_Village_Town_val: '',
            address_parent_pincode: '',
            address_parent_building_name: '',
            address_parent_building_name_t: '',
            address_parent_building_name_val: '',
            address_parent_house_no: '',
            address_parent_house_no_t: '',
            address_parent_house_no_val: '',
            address_parent_street_name: '',
            address_parent_street_name_t: '',
            address_parent_street_name_val: '',
            address_parent_locality: '',
            address_parent_locality_t: '',
            address_parent_postoff: '',
            address_parent_postoff_val: '',
            addressof_parents_value: '',
        },
        Permanent_addressof_parents: {
            address_parent_sameasaddress: '',
            address_parent_addressof: '',
            address_parent_permenent_country: '',
            address_parent_permenent_country_val: '',
            address_parent_permenent_country_address: '',
            address_parent_permenent_country_address_t: '',
            address_parent_permenent_country_address_val: '',
            address_parent_permenent_state: '',
            address_parent_permenent_state_val: '',
            address_parent_permenent_district: '',
            address_parent_permenent_district_val: '',
            address_parent_permenent_mmc: '',
            address_parent_permenent_mmc_val: '',
            address_parent_permenent_rural_urabn: '',
            address_parent_permenent_rural_urabn_val: '',
            address_parent_permenent_village: '',
            address_parent_permenent_village_val: '',
            address_parent_permenent_pincode: '',
            address_parent_permenent_building_no: '',
            address_parent_permenent_building_no_t: '',
            address_parent_permenent_building_no_val: '',
            address_parent_permenent_hose_no: '',
            address_parent_permenent_hose_no_t: '',
            address_parent_permenent_hose_no_val: '',
            address_parent_permenent_street_name: '',
            address_parent_permenent_street_name_t: '',
            address_parent_permenent_street_name_val: '',
            address_parent_permenent_locality: '',
            address_parent_permenent_locality_t: '',
            address_parent_permenent_locality_post_office_val: '',
            address_permenent_postoff: '',
            address_permenent_postoff_val: '',
        },
        placeofbirth: {
            place_of_birth: '',
            place_of_birth_hospital: '',
            place_of_birth_hospital_val: '',
            place_of_birth_state: '',
            place_of_birth_state_val: '',
            place_of_birth_district: '',
            place_of_birth_district_val: '',
            place_of_birth_mmc: '',
            place_of_birth_mmc_val: '',
            place_of_birth_rural_urabn: '',
            place_of_birth_rural_urabn_val: '',
            place_of_birth_village: '',
            place_of_birth_village_val: '',
            place_of_birth_pin_code: '',
            place_of_birth_building_no: '',
            place_of_birth_building_no_t: '',
            place_of_birth_building_no_val: '',
            place_of_birth_house_no: '',
            Place_of_birth_house_no_t: '',
            place_of_birth_house_no_val: '',
            place_of_birth_street_name: '',
            place_of_birth_street_name_t: '',
            place_of_birth_street_name_val: '',
            Place_of_birth_locality: '',
            Place_of_birth_locality_t: '',
            Place_of_birth_locality_val: '',
            Place_of_birth_postoff: '',
            Place_of_birth_postoff_val: '',
            placeofbirth_value: '',
        },
        information: {
            Informant_fullname: '',
            Informant_fullname_t: '',
            Informant_fullname_val: '',
            Informant_email_id: '',
            Informant_mobile_no: '',
            Informant_aadhhar_no_mask: '',
            Informant_aadhhar_no: '',
            Informant_address: '',
            Informant_address_t: '',
            Informant_address_val: '',
            information_value: '',
        },
        legal: {
            Copyfromtheaddress: false,
            Copyfromthepermanent: false,
            mother_residence_state: '',
            mother_residence_state_val: '',
            mother_residence_district: '',
            mother_residence_district_val: '',
            mother_residence_rural_urban: '',
            mother_residence_rural_urban_val: '',
            mother_residence_Mmc: '',
            mother_residence_Mmc_val: '',
            mother_residence_Village: '',
            mother_residence_Village_val: '',
            father_religion: '',
            father_religion_other: '',
            father_religion_other_t: '',
            father_religion_val: '',
            father_education: '',
            father_education_val: '',
            father_occupation: '',
            father_occupation_val: '',
            mother_religion: '',
            mother_religion_other: '',
            mother_religion_other_t: '',
            mother_religion_val: '',
            mother_eduaction: '',
            mother_eduaction_val: '',
            mother_occupation: '',
            mother_occupation_val: '',
            age_of_the_mother: '',
            age_of_the_mother_birth_time: '',
            number_of_children: '',
            type_of_attention: '',
            type_of_attention_val: '',
            method_of_delivery: '',
            method_of_delivery_val: '',
            duration_of_pregency: '',
            birth_weight: '',
            mother_residence_value: '',
            copyaddress: false
        },
    };

    RU_CODE: any; obj: any; UROLE: any; ATTENTION_CODE: any;
    ngOnInit(): void {
        try {
            if (sessionStorage.getItem('_Uenc') !== '') {
                this.NacDateChange();
                this.obj = this.encdc.Getuser();
                if (this.obj != '' && this.obj != undefined && this.obj != null) {
                    this.RU_CODE = this.obj[0].RU_CODE;
                    this.UROLE = this.obj[0].UROLE;
                    this.ATTENTION_CODE = this.obj[0].ATTENTION_CODE;
                    Fancybox.defaults.Hash = false;
                    Fancybox.bind('[data-fancybox="gallery"]', {
                        Hash: false,  // Disable URL hash changes
                    });
                    const currentDate = new Date();
                    const lastWeekDate = new Date();
                    lastWeekDate.setDate(currentDate.getDate() - this.obj[0]?.REPORTING_DAYS);
                    this.Dateoifreportmindate = lastWeekDate;
                    if (this.NAC_application_Id == "" && this.NAC_application_Id == null && this.NAC_application_Id == undefined) {
                        this.dateofbirthmin = new Date(); // Clone the event date
                        this.dateofbirthmin.setDate(this.dateofbirthmin.getDate() - 30); // Subtract 30 days
                    }
                    this.getCurrentLocation();
                    this.getdraft();
                    this.createdocment();
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
    // NACidCheck() {

    // } 

    birthinformationdetails() {
        this.birthinfohide = false;
        if (this.draft_details_array.placeofbirth.place_of_birth == "1") {
            let HospitalDetails = this.Hospital_master_array.find(e => e.HOSPITAL_ID == this.draft_details_array.placeofbirth.place_of_birth_hospital);
            if (HospitalDetails != undefined || HospitalDetails != null) {
                this.draft_details_array.information.Informant_fullname = HospitalDetails.HOSPITAL_AUTH_NAME;
                this.draft_details_array.information.Informant_mobile_no = HospitalDetails.HOSPITAL_AUTH_MOBILE_NO;
                this.draft_details_array.information.Informant_address = HospitalDetails.HOSPITAL_ADDRESS;

                this.birthinfohide = true;
                this.Teluglanguageconvrt(this.draft_details_array.information.Informant_fullname, 'Informant_fullname')
                this.Teluglanguageconvrt(this.draft_details_array.information.Informant_address, 'Informant_address');
            }
            else {
                this.draft_details_array.information = {
                    Informant_fullname: '',
                    Informant_fullname_t: '',
                    Informant_fullname_val: '',
                    Informant_email_id: '',
                    Informant_mobile_no: '',
                    Informant_aadhhar_no_mask: '',
                    Informant_aadhhar_no: '',
                    Informant_address: '',
                    Informant_address_t: '',
                    Informant_address_val: '',
                    information_value: '',
                }
            }
        }
        else {
            this.draft_details_array.information = {
                Informant_fullname: '',
                Informant_fullname_t: '',
                Informant_fullname_val: '',
                Informant_email_id: '',
                Informant_mobile_no: '',
                Informant_aadhhar_no_mask: '',
                Informant_aadhhar_no: '',
                Informant_address: '',
                Informant_address_t: '',
                Informant_address_val: '',
                information_value: '',
            }
        }
    }
    today = new Date();
    NacDateChange() {
        if (this.NAC_application_Id != "" && this.NAC_application_Id != null && this.NAC_application_Id != undefined) {
            this.dateofbirthmax = new Date(this.today.getFullYear() - 1, this.today.getMonth(), this.today.getDate());
            return;
        }
    }

    disabable = false;
    dateofreportdesiable: boolean = false;
    ruralurbandisable: boolean = false;
    async PlaceofBirthchange() {
        this.disabable = false;
        this.dateofreportdesiable = false;
        if (this.UROLE == '105' || this.UROLE == '112' || this.UROLE == '111' || this.UROLE == '1007') {
            this.dateofreportdesiable = true;
            if (this.draft_details_array.placeofbirth.place_of_birth != '1' && this.draft_details_array.placeofbirth.place_of_birth != "") {

                if (this.obj[0].STATE_CODE != "") {
                    
                    const { STATE_CODE, STATE_DD } = this.PlaceofBirth_state_master_array[0];
                    this.PlaceofBirth_state_master_array = [];
                    this.PlaceofBirth_state_master_array = [{ STATE_CODE, STATE_DD }];
                } else {
                    this.getstatedata();
                }
                this.draft_details_array.placeofbirth.place_of_birth_state = this.obj[0].STATE_CODE;
                if (this.obj[0].DISTRICT_CODE != "") {
                    this.getdistrict('placeofbirth'); // make sure this fills the array

                    setTimeout(() => {
                        const codeToFind = String(this.obj[0].DISTRICT_CODE);

                        const matchedDistrict = this.PlaceofBirth_district_array.find(
                            e => String(e.DISTRICT_CODE) === codeToFind
                        );
                        if (matchedDistrict) {
                            this.PlaceofBirth_district_array = [matchedDistrict];
                        } else {
                            this.PlaceofBirth_district_array = [];
                        }
                    }, 500); // small delay to simulate data loading

                } else {
                    this.getdistrict('placeofbirth');
                }
                this.draft_details_array.placeofbirth.place_of_birth_district = this.obj[0].DISTRICT_CODE;

                if (this.obj[0].RURAL_URBAN != "") {
                    this.ruralurbandisable = true;
                    this.draft_details_array.placeofbirth.place_of_birth_rural_urabn = this.obj[0].RURAL_URBAN;
                }

                if (this.obj[0].MMC_CODE != "") {
                    console.log(this.placeofbirth_MandalMuncipality_array);
                    this.MandalMuncipality('placeofbirth');
                    setTimeout(() => {
                        const codeToFind = String(this.obj[0].MMC_CODE);

                        const matchedMandal = this.placeofbirth_MandalMuncipality_array.find(
                            e => String(e.MMC_CODE) === codeToFind
                        );
                        if (matchedMandal) {
                            this.placeofbirth_MandalMuncipality_array = [matchedMandal];
                        } else {
                            this.placeofbirth_MandalMuncipality_array = [];
                        }
                    }, 500); // small delay to simulate data loading
                } else {
                    this.MandalMuncipality('placeofbirth');
                }
                this.draft_details_array.placeofbirth.place_of_birth_mmc = this.obj[0].MMC_CODE;
                if (this.obj[0].VW_CODE != "") {
                    this.VillageWard('placeofbirth');
                    setTimeout(() => {
                        const codeToFind = String(this.obj[0].VW_CODE);
                        const matchedvillage = this.placeofbirth_village_ward_array.find(
                            e => String(e.VW_CODE) === codeToFind
                        );
                        if (matchedvillage) {
                            this.placeofbirth_village_ward_array = [matchedvillage];
                        } else {
                            this.placeofbirth_village_ward_array = [];
                        }
                    }, 500); // small delay to simulate data loading

                } else {
                    this.VillageWard('placeofbirth');
                }
                this.draft_details_array.placeofbirth.place_of_birth_village = this.obj[0].VW_CODE;


            } else if (this.obj[0].HOSPITAL_ID != "" && this.UROLE == '108') {
                this.placeofbirthempty();
                this.draft_details_array.placeofbirth.place_of_birth = this.PlaceofBirth_master_array.find(e => e.BDPLACE_CODE == 1).BDPLACE_CODE;
                this.draft_details_array.placeofbirth.place_of_birth_hospital = this.obj[0].HOSPITAL_ID;
                this.get_SupportingDocuments();
                this.disabable = true;
            } else {
                this.disabable = false;
                this.placeofbirthempty();
            }
        }
    }
    placeofbirthempty() {
        this.PlaceofBirth_district_array = [];
        this.placeofbirth_MandalMuncipality_array = [];
        this.placeofbirth_village_ward_array = [];

        this.draft_details_array.placeofbirth = {
            place_of_birth: this.draft_details_array.placeofbirth.place_of_birth,
            place_of_birth_hospital: '',
            place_of_birth_hospital_val: '',
            place_of_birth_state: '',
            place_of_birth_state_val: '',
            place_of_birth_district: '',
            place_of_birth_district_val: '',
            place_of_birth_mmc: '',
            place_of_birth_mmc_val: '',
            place_of_birth_rural_urabn: '',
            place_of_birth_rural_urabn_val: '',
            place_of_birth_village: '',
            place_of_birth_village_val: '',
            place_of_birth_pin_code: '',
            place_of_birth_building_no: '',
            place_of_birth_building_no_t: '',
            place_of_birth_building_no_val: '',
            place_of_birth_house_no: '',
            Place_of_birth_house_no_t: '',
            place_of_birth_house_no_val: '',
            place_of_birth_street_name: '',
            place_of_birth_street_name_t: '',
            place_of_birth_street_name_val: '',
            Place_of_birth_locality: '',
            Place_of_birth_locality_t: '',
            Place_of_birth_locality_val: '',
            Place_of_birth_postoff: '',
            Place_of_birth_postoff_val: '',
            placeofbirth_value: '',
        }
    }
    async getCurrentLocation() {
        this.geolocationService.getCurrentPosition().subscribe(
            (coords: GeolocationCoordinates) => {
                this.latitude = coords.latitude;
                this.longitude = coords.longitude;
                sessionStorage.setItem('latitude', this.latitude.toString());
                sessionStorage.setItem('longitude', this.longitude.toString());
            },
            (error: any) => {
                console.error('Error getting location', error);
            }
        );
    }


    applicationstatus: any;
    async getdraft(): Promise<void> {
        try {
            const req = new basemodel();
            req.type = '1000';
            req.param1 = 'BIRTH';
            this.spinner.show();
            let rsdata: any = await this.auth.auth_pkgcrsbirth_service(req);
            //this.brapplicationid = '';
            this.spinner.hide();
            if (rsdata.code) {
                if (rsdata.code && rsdata.Details[0].STATUS == '1') {
                    if (this.brapplicationid == null || this.brapplicationid == undefined || this.brapplicationid == '') {
                        this.brapplicationid = rsdata.Details[0].APPLICATION_ID;
                        this.applicationstatus = rsdata.Details[0].APPLICATION_STATUS;
                    }
                    //this.brapplicationid = rsdata.Details[0].APPLICATION_ID;
                    //this.applicationstatus = rsdata.Details[0].APPLICATION_STATUS;
                    await this.getstatedata();
                    await this.getPlaceofBirth();
                    await this.getcountry();
                    await this.getHospital();
                    await this.getdraft_details();
                    await this.get_document_details();
                    await this.get_ProceedingSupportingDocuments();
                }
                else {
                    this.getdraft();
                }
            } else {
                this.spinner.hide();
            }
        } catch (error) {
            this.spinner.hide();

        }
    }

    async getdraft_details(): Promise<void> {
        try {
            const req = new basemodel();
            req.type = '1002';
            req.param1 = this.brapplicationid;
            this.spinner.show();

            let rsdata: any = await this.auth.auth_pkgcrsbirth_service(req);
            this.spinner.hide();
            if (rsdata.code) {
                let jsobobj = this.replaceNullWithEmptyString(JSON.parse(rsdata.Details[0].JSON_RESULT)); 
                this.backwindowdraftbinding(jsobobj);
                await this.loadalldropdowns();

            } else {
                this.spinner.hide();
            }
        } catch (error) {
            this.spinner.hide();

        }
    }
    replaceNullWithEmptyString(obj: any): any {
        for (let key in obj) {
            if (obj[key] === null) {
                obj[key] = '';
            } else if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
                this.replaceNullWithEmptyString(obj[key]);
            }
        }
        return obj;
    }
    async getdraftinsert(): Promise<void> {
        try {
            const req = new basemodel();
            req.type = '1001';
            req.param1 = this.brapplicationid;
            req.param2 = 'NEW';
            req.param3 = this.RU_CODE;
            req.param5 = this.applicationsubmittype;
            req.param6 = this.NAC_application_Id;
            req.json2 = this.draft_details_array;
            this.spinner.show();
            let rsdata: any = await this.auth.auth_pkgcrsbirth_service(req);
            this.spinner.hide();
            if (rsdata.code) {
                if (rsdata.code && rsdata.Details[0].STATUS == '1') {
                    this.getdraft_details();
                    this.alt.toastsuccess(rsdata.Details[0].STATUS_TEXT + rsdata.Details[0].STATUS_TEXT_TEL);
                }
                if (rsdata.code && rsdata.Details[0].STATUS == '0') {
                    this.alt.toasterror(rsdata.Details[0].STATUS_TEXT + rsdata.Details[0].STATUS_TEXT_TEL);
                }
            } else {
                this.alt.toasterror('Error: Draft could not be saved.');

                this.spinner.hide();
            }
        } catch (error) {
            this.spinner.hide();

        }
    }
    redirectpaymentpage = false; registrationfee = "0"; tranctionid = "0";
    async Application_final_submit_payment_intiate(): Promise<void> {
        try {

            this.redirectpaymentpage = false;
            const req = new basemodel();
            req.type = '10031';
            req.param1 = this.brapplicationid;
            this.spinner.show();
            let rsdata: any = await this.auth.auth_pkgcrsbirth_service(req);
            this.spinner.hide();

            if (rsdata.code) {
                if (rsdata.Details[0].ISPMT == 'Y') {
                    //this.redirectpaymentpage=true;
                    this.registrationfee = rsdata.Details[0].AMOUNT;
                    this.tranctionid = rsdata.Details[0].TXID;
                    this.ModalOpen();
                } else {
                    this.Application_final_submit();
                }
                // if (rsdata.code && rsdata.Details[0].STATUS == '1') {
                //     this.redirectpaymentpage=true;
                // }
                // if (rsdata.code && rsdata.Details[0].STATUS == '0') {
                //     this.alt.toasterror(rsdata.Details[0].STATUS_TEXT + rsdata.Details[0].STATUS_TEXT_TEL);
                // }
                this.spinner.hide();
            } else {
                this.alt.toasterror('The application processing has failed.');
                this.spinner.hide();
            }
        } catch (error) {
            this.spinner.hide();

        }
    }
    PaymentName: any;
    payredirection() {
        this.ModalCLose();
        this.redirectpaymentpage = true;
        this.PaymentName = "Birth";
    }

    async Application_final_submit(): Promise<void> {
        try {
            const req = new basemodel();
            req.type = '1003';
            req.param1 = this.brapplicationid;
            req.param2 = 'NEW';
            req.param3 = this.RU_CODE;
            req.json2 = this.draft_details_array;
            this.spinner.show();
            let rsdata: any = await this.auth.auth_pkgcrsbirth_service(req);
            this.spinner.hide();
            if (rsdata.code) {
                if (rsdata.code && rsdata.Details[0].STATUS == '1') {
                    this.alt.toastsuccess(rsdata.Details[0].STATUS_TEXT + rsdata.Details[0].STATUS_TEXT_TEL);
                    this.logger.logSuccess('Birth Data Submitted Successfully', req);
                    this.ModalCLose();
                    this.declarationcheck = false;
                    this.router.navigate(['/shared/inbox']);
                    // setTimeout(() => {
                    //   window.location.reload();
                    // }, 1000);
                    //this.downloadorder();
                }
                if (rsdata.code && rsdata.Details[0].STATUS == '0') {
                    this.alt.toasterror(rsdata.Details[0].STATUS_TEXT + rsdata.Details[0].STATUS_TEXT_TEL);
                    this.logger.logError('Birth Data Failed', req);
                }
                this.spinner.hide();
            } else {
                this.logger.logError('Birth Data Failed API Request Failed', req);
                this.alt.toasterror('The application processing has failed.');
                this.spinner.hide();
            }
        } catch (error) {
            this.spinner.hide();

        }
    }

    Childnamedclear(event: Event) {

        const isChecked = (event.target as HTMLInputElement).checked;
        if (isChecked) {
            this.draft_details_array.childinformation.childnotnamed = isChecked
        } else {
            this.draft_details_array.childinformation.fullname = '';
            this.draft_details_array.childinformation.fullname_t = '';
            this.draft_details_array.childinformation.middlename = '';
            this.draft_details_array.childinformation.middlename_t = '';
            this.draft_details_array.childinformation.surname = '';
            this.draft_details_array.childinformation.surname_t = '';
            this.draft_details_array.childinformation.confirm_fullname = '';
            this.draft_details_array.childinformation.confirm_fullname_t = '';
            this.draft_details_array.childinformation.confirm_middle = '';
            this.draft_details_array.childinformation.confirm_middle_t = '';
            this.draft_details_array.childinformation.confirm_surname = '';
            this.draft_details_array.childinformation.confirm_surname_t = '';
        }
    }

    copyadresscheck(event: Event) {

        const isChecked = (event.target as HTMLInputElement).checked;
        if (isChecked) {
            this.draft_details_array.legal.Copyfromtheaddress = isChecked;
            this.draft_details_array.legal.mother_residence_state = this.draft_details_array.addressof_parents.address_parent_state;
            this.getdistrict('staticstical');
            this.draft_details_array.legal.mother_residence_district = this.draft_details_array.addressof_parents.address_parent_district;
            this.draft_details_array.legal.mother_residence_rural_urban = this.draft_details_array.addressof_parents.address_parent_rural_urabn;
            this.MandalMuncipality('staticstical');
            this.draft_details_array.legal.mother_residence_Mmc = this.draft_details_array.addressof_parents.address_parent_mmc;
            this.VillageWard('staticstical');
            this.draft_details_array.legal.mother_residence_Village = this.draft_details_array.addressof_parents.address_parent_Village_Town;

            this.draft_details_array.legal.Copyfromthepermanent = false;
        } else {
            this.draft_details_array.legal.mother_residence_state = '';
            this.staticstical_district_array = [];
            this.draft_details_array.legal.mother_residence_district = '';
            this.draft_details_array.legal.mother_residence_rural_urban = '';
            this.staticstical_MandalMuncipality_array = [];
            this.draft_details_array.legal.mother_residence_Mmc = '';
            this.staticstical_village_ward_array = [];
            this.draft_details_array.legal.mother_residence_Village = '';
        }
    }
    permanentcopyadresscheck(event: Event) {

        const isChecked = (event.target as HTMLInputElement).checked;
        if (isChecked) {
            this.draft_details_array.legal.Copyfromthepermanent = isChecked;
            this.draft_details_array.legal.mother_residence_state = this.draft_details_array.Permanent_addressof_parents.address_parent_permenent_state;
            this.getdistrict('staticstical');
            this.draft_details_array.legal.mother_residence_district = this.draft_details_array.Permanent_addressof_parents.address_parent_permenent_district;
            this.draft_details_array.legal.mother_residence_rural_urban = this.draft_details_array.Permanent_addressof_parents.address_parent_permenent_rural_urabn;
            this.MandalMuncipality('staticstical');
            this.draft_details_array.legal.mother_residence_Mmc = this.draft_details_array.Permanent_addressof_parents.address_parent_permenent_mmc;
            this.VillageWard('staticstical');
            this.draft_details_array.legal.mother_residence_Village = this.draft_details_array.Permanent_addressof_parents.address_parent_permenent_village;

            this.draft_details_array.legal.Copyfromtheaddress = false;
        } else {
            this.draft_details_array.legal.mother_residence_state = '';
            this.staticstical_district_array = [];
            this.draft_details_array.legal.mother_residence_district = '';
            this.draft_details_array.legal.mother_residence_rural_urban = '';
            this.staticstical_MandalMuncipality_array = [];
            this.draft_details_array.legal.mother_residence_Mmc = '';
            this.staticstical_village_ward_array = [];
            this.draft_details_array.legal.mother_residence_Village = '';
        }
    }

    //Common End
    //Uploads
    photoPreviews: { file: File, discription: string, url: SafeResourceUrl, type: 'image' | 'pdf' | 'other' }[] = [];
    proceedphotoselectedFiles: File[] = [];
    proceedfileupload(event: any) {

        const files: File[] = event.target.files;
        this.proceedphotoselectedFiles = [];
        if (files.length > 1) {
            this.alt.toasterror('Upload Photo(png/jpg/pdf)');
            this.proceedphotoselectedFiles = [];
            return;
        }
        const checkfilesizetype = Array.from(files);
        const checkcondion = false;
        const allowedExtensions = ['.png', '.jpg', '.jpeg', '.pdf'];
        const maxFileSizeMB = 8; // Maximum file size in megabytes
        for (let chc = 0; chc < checkfilesizetype.length; chc++) {
            let type = checkfilesizetype[chc].name;
            this.dischargedocumnets.documentfilename = type;

            const fileExtension = checkfilesizetype[chc].name
                .toLowerCase()
                .substr(checkfilesizetype[chc].name.lastIndexOf('.'));
            this.dischargedocumnets.documentformat = fileExtension;

            if (allowedExtensions.indexOf(fileExtension) === -1) {
                this.proceedphotoselectedFiles = [];
                this.alt.toasterror('Only PNG,JPG,PDF files are allowed.)');
                return;
            }

            let fileSizeMB: any = checkfilesizetype[chc].size / (1024 * 1024);
            this.dischargedocumnets.documentsize = checkfilesizetype[chc].size.toString();
            if (fileSizeMB > maxFileSizeMB) {
                this.proceedphotoselectedFiles = [];
                this.alt.toasterror('File size exceeds the maximum allowed limit.8MB)');
                return;
            }
        }
        const file = event.target.files?.[0];

        if (file) {
            this.readImage(file);
        }
        this.proceedphotoselectedFiles = Array.from(files);
    }




    async proceedUpload() {  

        if (this.proceedphotoselectedFiles.length == 0) {
            this.alt.toasterror('Upload Supporting Documents');
            if (this.proceedngSupportingDocuments) {
                this.proceedngSupportingDocuments.control.markAsTouched();
                this.proceedngSupportingDocuments.control.updateValueAndValidity();
            }
            this.spinner.hide();
            return;
        } else {
            this.spinner.show();
            if (this.proceedphotoselectedFiles.length != 0) {
                let filename = this.brapplicationid + '_' + this.RU_CODE;
                if (this.proceedphotoselectedFiles.length > 0) {
                    let maxlen = 0;
                    let uploadcheck = 0;
                    maxlen = this.proceedphotoselectedFiles.length;
                    this.proceedingfileSelected = this.proceedphotoselectedFiles.length > 0;
                    this.proceedingfileError = !this.proceedingfileSelected; // Hide error if file is selected
                    for (let ph = 0; ph < maxlen; ph++) {
                        this.photofilepath = '';
                        const phform = new FormData();
                        phform.append('file', this.proceedphotoselectedFiles[ph]);
                        phform.append('input01', 'Birth');
                        phform.append('input02', 'proceedingbirthregistration');
                        phform.append('input03', 'PDF');
                        phform.append('input04', filename);
                        phform.append('userid', this.RU_CODE);
                        phform.append('source', 'wed');

                        await this.httpClient
                            .post(this.contentuploadurl, phform)
                            .subscribe((res) => {
                                let rsdata: any = res;
                                if (rsdata.code) {
                                    uploadcheck++;
                                    if (rsdata.code) { 
                                        this.dischargedocumnets.documentpath = rsdata.path;
                                        const selectedFile = this.proceedphotoselectedFiles[ph];
                                        const fileType = this.getFileType(selectedFile.name);
                                        const fileUrl = URL.createObjectURL(selectedFile);
                                        const safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(fileUrl);
                                        this.photoPreviews.push({
                                          file: selectedFile,
                                          discription: this.dischargedocumnets.documentdescription,
                                          url: safeUrl,
                                          type: fileType,
                                        });
                                        this.spinner.hide();
                                        //this.alt.toastsuccess('document upload successfully');
                                        return;
                                    } else if (rsdata.code && rsdata.Details[0].STATUS == '0') {
                                        this.spinner.hide();
                                        this.alt.toasterror('upload fail');
                                        return;
                                    } else {
                                        this.spinner.hide();
                                        this.alt.toasterror(rsdata.message);
                                        return;
                                    }
                                } else {
                                    this.spinner.hide();
                                    this.alt.toasterror(rsdata.message);
                                    return;
                                }
                            });
                    }
                }
            }
        }
    }
    //Uploads
    photoselectedFiles: File[] = [];
    fileupload(event: any) {

        const files: File[] = event.target.files;
        this.photoselectedFiles = [];
        if (files.length > 1) {
            this.alt.toasterror('Upload Photo(png/jpg/pdf)');
            this.photoselectedFiles = [];
            return;
        }
        const checkfilesizetype = Array.from(files);
        const checkcondion = false;
        const allowedExtensions = ['.png', '.jpg', '.jpeg', '.pdf'];
        const maxFileSizeMB = 8; // Maximum file size in megabytes
        for (let chc = 0; chc < checkfilesizetype.length; chc++) {
            let type = checkfilesizetype[chc].name;
            this.dischargedocumnets.documentfilename = type;

            const fileExtension = checkfilesizetype[chc].name
                .toLowerCase()
                .substr(checkfilesizetype[chc].name.lastIndexOf('.'));
            this.dischargedocumnets.documentformat = fileExtension;

            if (allowedExtensions.indexOf(fileExtension) === -1) {
                this.photoselectedFiles = [];
                this.alt.toasterror('Only PNG,JPG,PDF files are allowed.)');
                return;
            }

            let fileSizeMB: any = checkfilesizetype[chc].size / (1024 * 1024);
            this.dischargedocumnets.documentsize = checkfilesizetype[chc].size.toString();
            if (fileSizeMB > maxFileSizeMB) {
                this.photoselectedFiles = [];
                this.alt.toasterror('File size exceeds the maximum allowed limit.8MB)');
                return;
            }
        }
        const file = event.target.files?.[0];

        if (file) {
            this.readImage(file);
        }
        this.photoselectedFiles = Array.from(files);
    }

    imageSrc: string | ArrayBuffer | null = null;
    readImage(file: File): void {
        const reader = new FileReader();

        reader.onload = (e) => {
            if (e.target) {
                this.imageSrc = e.target.result;
            }
        };

        reader.readAsDataURL(file);
    }

    @ViewChild('fileInput') fileInput!: ElementRef;
    photofilepath: any;
    async Upload() {

        if (this.photoselectedFiles.length == 0) {
            this.alt.toasterror('Upload Supporting Documents');
            if (this.ngSupportingDocuments) {
                this.ngSupportingDocuments.control.markAsTouched();
                this.ngSupportingDocuments.control.updateValueAndValidity();
            }
            this.spinner.hide();
            return;
        } else {
            this.spinner.show();
            if (this.photoselectedFiles.length != 0) {
                let filename = this.brapplicationid + '_' + this.RU_CODE;
                if (this.photoselectedFiles.length > 0) {
                    let maxlen = 0;
                    let uploadcheck = 0;
                    maxlen = this.photoselectedFiles.length;
                    this.fileSelected = this.photoselectedFiles.length > 0;
                    this.fileError = !this.fileSelected; // Hide error if file is selected
                    for (let ph = 0; ph < maxlen; ph++) {
                        this.photofilepath = '';
                        const phform = new FormData();
                        phform.append('file', this.photoselectedFiles[ph]);
                        phform.append('input01', 'Birth');
                        phform.append('input02', 'birthregistration');
                        phform.append('input03', 'PDF');
                        phform.append('input04', filename);
                        phform.append('userid', this.RU_CODE);
                        phform.append('source', 'wed');

                        await this.httpClient
                            .post(this.contentuploadurl, phform)
                            .subscribe((res) => {
                                let rsdata: any = res;
                                if (rsdata.code) {
                                    uploadcheck++;
                                    if (rsdata.code) { 
                                        this.dischargedocumnets.documentpath = rsdata.path;
                                        const selectedFile = this.photoselectedFiles[ph];
                                        const fileType = this.getFileType(selectedFile.name);
                                        const fileUrl = URL.createObjectURL(selectedFile);
                                        const safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(fileUrl);
                                        this.photoPreviews.push({
                                            file: selectedFile,
                                            discription: this.dischargedocumnets.documentdescription,
                                            url: safeUrl,
                                            type: fileType, 
                                        }); 
                                        this.spinner.hide(); 
                                        console.log('upload completed'); 
                                        //this.alt.toastsuccess('document upload successfully'); 
                                        return;
                                    } else if (rsdata.code && rsdata.Details[0].STATUS == '0') {
                                        this.spinner.hide();
                                        this.alt.toasterror('upload fail');
                                        return;
                                    } else {
                                        this.spinner.hide();
                                        this.alt.toasterror(rsdata.message);
                                        return;
                                    }
                                } else {
                                    this.spinner.hide();
                                    this.alt.toasterror(rsdata.message);
                                    return;
                                }
                            });
                    }
                }
            }
        }
    }
    async documentinsert(): Promise<void> {
        try {
            const req = new basemodel();
            req.type = '1011';
            req.param1 = this.brapplicationid;
            req.param2 = this.dischargedocumnets.documentcode;
            req.param3 = this.dischargedocumnets.documentformat;
            req.param4 = this.dischargedocumnets.documentsize;
            req.param5 = this.dischargedocumnets.documentdescription;
            req.param6 = this.dischargedocumnets.documentfilename;
            req.param7 = this.dischargedocumnets.documentpath;
            this.spinner.show();
            let rsdata: any = await this.auth.auth_pkgcrsbirth_service(req);
            this.spinner.hide();
            if (rsdata.code) {
                if (rsdata.code && rsdata.Details[0].STATUS == '1') {
                    this.fileInput.nativeElement.value = '';
                    this.dischargedocumnets.documentcode = '';
                    this.dischargedocumnets.documentdescription = '';
                    let previefile: { file: File, discription: string, url: SafeResourceUrl, type: 'image' | 'pdf' | 'other' }[] = [];
                    this.photoPreviews = previefile;
                    this.photoselectedFiles = []; 
                    this.alt.toastsuccess(rsdata.Details[0].STATUS_TEXT + rsdata.Details[0].STATUS_TEXT_TEL); 
                }
                if (rsdata.code && rsdata.Details[0].STATUS == '0') {
                    this.alt.toasterror(rsdata.Details[0].STATUS_TEXT + rsdata.Details[0].STATUS_TEXT_TEL);
                }
            } else {
                this.alt.toasterror('Error:  document upload could not be saved.');

                this.spinner.hide();
            }
        } catch (error) {
            this.spinner.hide();

        }
    }

    //Uploads
    multiphotoselectedFiles: File[] = [];
    multifileupload(event: any) {

        const files: File[] = event.target.files;
        this.multiphotoselectedFiles = [];
        if (files.length > 1) {
            this.alt.toasterror('Upload Photo(png/jpg/pdf)');
            this.multiphotoselectedFiles = [];
            return;
        }
        const checkfilesizetype = Array.from(files);
        const checkcondion = false;
        const allowedExtensions = ['.png', '.jpg', '.jpeg', '.pdf'];
        const maxFileSizeMB = 8; // Maximum file size in megabytes
        for (let chc = 0; chc < checkfilesizetype.length; chc++) {
            let type = checkfilesizetype[chc].name;
            this.documnets[chc].documentfilename = type;

            const fileExtension = checkfilesizetype[chc].name
                .toLowerCase()
                .substr(checkfilesizetype[chc].name.lastIndexOf('.'));
            this.documnets[chc].documentformat = fileExtension;

            if (allowedExtensions.indexOf(fileExtension) === -1) {
                this.multiphotoselectedFiles = [];
                this.alt.toasterror('Only PNG,JPG,PDF files are allowed.)');
                return;
            }

            let fileSizeMB: any = checkfilesizetype[chc].size / (1024 * 1024);
            this.documnets[chc].documentsize = checkfilesizetype[chc].size.toString();
            if (fileSizeMB > maxFileSizeMB) {
                this.multiphotoselectedFiles = [];
                this.alt.toasterror('File size exceeds the maximum allowed limit.8MB)');
                return;
            }
        }
        const file = event.target.files?.[0];

        if (file) {
            this.multireadImage(file);
        }
        this.multiphotoselectedFiles = Array.from(files);
    }

    multiimageSrc: string | ArrayBuffer | null = null;
    multireadImage(file: File): void {
        const reader = new FileReader();

        reader.onload = (e) => {
            if (e.target) {
                this.multiimageSrc = e.target.result;
            }
        };

        reader.readAsDataURL(file);
    }

    @ViewChild('multifileInput') multifileInput!: ElementRef;
    multiphotofilepath: any;
    previewfile: any[] = [];
    async multiUpload(add: any) {

        if (this.multiphotoselectedFiles.length == 0) {
            this.alt.toasterror('Upload Supporting Documents');
            if (this.ngSupportingDocuments) {
                this.ngSupportingDocuments.control.markAsTouched();
                this.ngSupportingDocuments.control.updateValueAndValidity();
            }
            this.spinner.hide();
            return;
        } else {
            this.spinner.show();
            if (this.multiphotoselectedFiles.length != 0) {

                if (this.multiphotoselectedFiles.length > 0) {
                    let maxlen = 0;
                    let uploadcheck = 0;
                    maxlen = this.multiphotoselectedFiles.length;
                    this.multifileSelected = this.multiphotoselectedFiles.length > 0;
                    this.multifileError = !this.multifileSelected; // Hide error if file is selected
                    for (let ph = 0; ph < maxlen; ph++) {
                        this.photofilepath = '';
                        let filename = this.brapplicationid + '_' + this.RU_CODE;
                        const phform = new FormData();
                        phform.append('file', this.multiphotoselectedFiles[ph]);
                        phform.append('input01', 'Bith');
                        phform.append('input02', 'birthregistration');
                        phform.append('input03', 'PDF');
                        phform.append('input04', filename);
                        phform.append('userid', this.RU_CODE);
                        phform.append('source', 'web');

                        this.httpClient
                            .post(this.contentuploadurl, phform)
                            .subscribe((res) => {
                                let rsdata: any = res;
                                if (rsdata.code) {
                                    uploadcheck++;
                                    if (rsdata.code) {
                                        this.documnets[ph].documentpath = rsdata.path; 
                                       // this.previewfile.push(this.documnets[ph]);
                                        const selectedFile = this.multiphotoselectedFiles[ph];
                                        const fileType = this.getFileType(selectedFile.name);
                                        const fileUrl = URL.createObjectURL(selectedFile);
                                        const safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(fileUrl);
                                        this.photoPreviews.push({
                                            file: selectedFile,
                                            discription: this.documnets[ph].documentdescription,
                                            url: safeUrl,
                                            type: fileType,
                                        }); 
                                      //  this.multidocumentinsert(this.documnets[ph]);
                                        this.spinner.hide();

                                        //this.alt.toastsuccess('document upload successfully');
                                        return;
                                    } else if (rsdata.code && rsdata.Details[0].STATUS == '0') {
                                        this.spinner.hide();
                                        this.alt.toasterror('upload fail');
                                        return;
                                    } else {
                                        this.spinner.hide();
                                        this.alt.toasterror(rsdata.message);
                                        return;
                                    }
                                } else {
                                    this.spinner.hide();
                                    this.alt.toasterror(rsdata.message);
                                    return;
                                }
                            });
                    }
                }
            }
        }
    }
    async multidocumentinsert(obj: any): Promise<void> {
        try {
            const req = new basemodel();
            req.type = '1011';
            req.param1 = this.brapplicationid;
            req.param2 = obj.documentcode;
            req.param3 = obj.documentformat;
            req.param4 = obj.documentsize;
            req.param5 = obj.documentdescription;
            req.param6 = obj.documentfilename;
            req.param7 = obj.documentpath;
            this.spinner.show();
            let rsdata: any = await this.auth.auth_pkgcrsbirth_service(req);

            this.spinner.hide();
            if (rsdata.code) {
                if (rsdata.code && rsdata.Details[0].STATUS == '1') {
                    this.multifileInput.nativeElement.value = '';
                    this.documnets = [];
                    this.multiphotoselectedFiles = [];
                    let previefile: { file: File, discription: string, url: SafeResourceUrl, type: 'image' | 'pdf' | 'other' }[] = [];
                    this.photoPreviews = previefile;
                    this.createdocment(); 
                    this.alt.toastsuccess(rsdata.Details[0].STATUS_TEXT + rsdata.Details[0].STATUS_TEXT_TEL); 
                }
                if (rsdata.code && rsdata.Details[0].STATUS == '0') {
                    this.alt.toasterror(rsdata.Details[0].STATUS_TEXT + rsdata.Details[0].STATUS_TEXT_TEL);
                }
            } else {
                this.alt.toasterror('Error:  document upload could not be saved.');

                this.spinner.hide();
            }
        } catch (error) {
            this.spinner.hide();

        }
    }

    draftdelteconfrimation() {
        Swal.fire({
            title: 'Are You Sure Do You Want to Delete Draft?',
            text: 'Draft Delete!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
        }).then((result: any) => {
            if (result.value) {
                this.draftdelte();
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire('Cancelled', 'Draft Delete Cancelled', 'info');
            }
        });
    }

    async draftdelte(): Promise<void> {
        try {
            const req = new basemodel();
            req.type = '1006';
            req.param1 = this.brapplicationid;
            this.spinner.show();
            let rsdata: any = await this.auth.auth_pkgcrsbirth_service(req);

            this.spinner.hide();
            if (rsdata.code) {
                if (rsdata.code && rsdata.Details[0].STATUS == '1') {

                    setTimeout(() => {
                        window.location.reload();
                    }, 3000);
                    this.alt.toastsuccess(rsdata.Details[0].STATUS_TEXT + rsdata.Details[0].STATUS_TEXT_TEL);
                }
                if (rsdata.code && rsdata.Details[0].STATUS == '0') {
                    this.alt.toasterror(rsdata.Details[0].STATUS_TEXT + rsdata.Details[0].STATUS_TEXT_TEL);
                }
            } else {
                this.alt.toasterror('draft delete fail.');
                this.spinner.hide();
            }
        } catch (error) {
            this.spinner.hide();

        }
    }

    async documentdelte(obj: any): Promise<void> {
        try {
            const req = new basemodel();
            req.type = '1014';
            req.param1 = obj.BR_APPLICATION_ID;
            req.param2 = obj.BR_DOCUMENT_CODE;
            this.spinner.show();
            let rsdata: any = await this.auth.auth_pkgcrsbirth_service(req);
            this.spinner.hide();
            if (rsdata.code) {
                if (rsdata.code && rsdata.Details[0].STATUS == '1') {
                    this.get_document_details();
                    this.alt.toastsuccess(rsdata.Details[0].STATUS_TEXT + rsdata.Details[0].STATUS_TEXT_TEL);
                }
                if (rsdata.code && rsdata.Details[0].STATUS == '0') {
                    this.alt.toasterror(rsdata.Details[0].STATUS_TEXT + rsdata.Details[0].STATUS_TEXT_TEL);
                }
            } else {
                this.alt.toasterror('document delete fail.');
                this.spinner.hide();
            }
        } catch (error) {
            this.spinner.hide();

        }
    }
    getFileType(fileName: string): 'image' | 'pdf' | 'other' {
        const ext = fileName.toLowerCase().split('.').pop();
        if (['png', 'jpg', 'jpeg'].includes(ext!)) return 'image';
        if (ext === 'pdf') return 'pdf';
        return 'other';
    } 

    documentlist: any[] = [];
    async get_document_details(): Promise<void> {
        try {
            debugger
            const req = new basemodel();
            req.type = '1012';
            req.param1 = this.brapplicationid;
            this.spinner.show();
            this.documentlist = [];
            if (this.photoselectedFiles.length == 0 && this.multiphotoselectedFiles.length == 0) {
                let previefile: { file: File, discription: string, url: SafeResourceUrl, type: 'image' | 'pdf' | 'other' }[] = [];
                this.photoPreviews = previefile;
            }
            let rsdata: any = await this.auth.auth_pkgcrsbirth_service(req);
            this.spinner.hide();
            if (rsdata.code) {
                this.documentlist = rsdata.Details; 
                for (let index = 0; index < this.documentlist.length; index++) {
                    const element = this.documentlist[index];
                    const fileName = element.DOCUMENT_NAME_TEL;
                    const fileType = this.getFileType(element.DOCUMENT_FORMAT);

                    // Generate safe preview URL
                    const fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.contentshowurl + element.DOCUMENT_PATH);

                    // Create dummy file if needed (optional)
                    const dummyFile = new File([new Blob()], fileName, { type: 'application/pdf' });

                    this.photoPreviews.push({
                        file: dummyFile,
                        discription: element.DOCUMENT_DESCRIPTION,
                        url: fileUrl,
                        type: fileType
                    });

                }
                if (this.birthvalidate) {
                    if (this.documentlist.find(e => e.DOCUMENT_CODE == '146')) {
                        this.proceedingfileSelected = this.documentlist.length > 0;
                        this.proceedingfileError = !this.proceedingfileSelected;
                    }
                    // Hide error if file is selected
                    this.fileSelected = this.documentlist.length > 1;
                    this.fileError = !this.fileSelected; // Hide error if file is selected
                    this.multifileSelected = this.documentlist.length > 2;
                    this.multifileError = !this.multifileSelected; // Hide error if file is selected
                } else {
                    this.fileSelected = this.documentlist.length > 0;
                    this.fileError = !this.fileSelected; // Hide error if file is selected
                    this.multifileSelected = this.documentlist.length > 1;
                    this.multifileError = !this.multifileSelected; // Hide error if file is selected
                }

            } else {
                this.documentlist = [];
                this.spinner.hide();
            }
        } catch (error) {
            this.spinner.hide();

        }
    }


    ViewDoc(image: string) {
        window.open(image, '_blank');
    }

    ///Masters Start

    //Common Functions
    suggestions: any;
    async Teluglanguageconvrt(inputkeyval: any, inputsource: any) {
        this.pscall.google_translate(inputkeyval).subscribe(
            (response: any) => {

                if (response[0] != '') // if (response[0] == 'SUCCESS')
                {
                    this.suggestions = response[0][0];//response[0][0][0]
                    if (inputsource == 'child_fullname') {
                        this.draft_details_array.childinformation.fullname_t =
                            this.suggestions[0];
                    }
                    if (inputsource == 'child_fullname_tel') {
                        this.draft_details_array.childinformation.fullname_t =
                            this.suggestions[0];
                    }
                    if (inputsource == 'middlename') {
                        this.draft_details_array.childinformation.middlename_t =
                            this.suggestions[0];
                    }
                    if (inputsource == 'middlename_t') {
                        this.draft_details_array.childinformation.middlename_t =
                            this.suggestions[0];
                    }
                    if (inputsource == 'child_surname') {
                        this.draft_details_array.childinformation.surname_t =
                            this.suggestions[0];
                    }
                    if (inputsource == 'child_surname_tel') {
                        this.draft_details_array.childinformation.surname_t =
                            this.suggestions[0];
                    }
                    if (inputsource == 'child_confirm_fullname') {
                        this.draft_details_array.childinformation.confirm_fullname_t =
                            this.suggestions[0];
                    }
                    if (inputsource == 'child_confirm_fullname_tel') {
                        this.draft_details_array.childinformation.confirm_fullname_t =
                            this.suggestions[0];
                    }
                    if (inputsource == 'confirm_middle') {
                        this.draft_details_array.childinformation.confirm_middle_t =
                            this.suggestions[0];
                    }
                    if (inputsource == 'confirm_middle_t') {
                        this.draft_details_array.childinformation.confirm_middle_t =
                            this.suggestions[0];
                    }

                    if (inputsource == 'child_confirm_surname') {
                        this.draft_details_array.childinformation.confirm_surname_t =
                            this.suggestions[0];
                    }
                    if (inputsource == 'child_confirm_surname_tel') {
                        this.draft_details_array.childinformation.confirm_surname_t =
                            this.suggestions[0];
                    }

                    if (inputsource == 'father_full_name') {
                        this.draft_details_array.fatherInformation.father_full_namer_t =
                            this.suggestions[0];
                    }
                    if (inputsource == 'father_full_name_tel') {
                        this.draft_details_array.fatherInformation.father_full_namer_t =
                            this.suggestions[0];
                    }
                    if (inputsource == 'father_middlename') {
                        this.draft_details_array.fatherInformation.father_middlename_t =
                            this.suggestions[0];
                    }
                    if (inputsource == 'father_middlename_t') {
                        this.draft_details_array.fatherInformation.father_middlename_t =
                            this.suggestions[0];
                    }

                    if (inputsource == 'father_surname') {
                        this.draft_details_array.fatherInformation.father_surname_t =
                            this.suggestions[0];
                    }
                    if (inputsource == 'father_surname_tel') {
                        this.draft_details_array.fatherInformation.father_surname_t =
                            this.suggestions[0];
                    }
                    if (inputsource == 'father_surname') {
                        this.draft_details_array.fatherInformation.father_surname_t =
                            this.suggestions[0];
                    }
                    if (inputsource == 'father_surname_tel') {
                        this.draft_details_array.fatherInformation.father_surname_t =
                            this.suggestions[0];
                    }
                    if (inputsource == 'mother_full_name') {
                        this.draft_details_array.motherInformation.mother_full_namer_t =
                            this.suggestions[0];
                    }
                    if (inputsource == 'mother_full_name_tel') {
                        this.draft_details_array.motherInformation.mother_full_namer_t =
                            this.suggestions[0];
                    }
                    if (inputsource == 'mother_middle_name') {
                        this.draft_details_array.motherInformation.mother_middle_name_t =
                            this.suggestions[0];
                    }
                    if (inputsource == 'mother_middle_name_t') {
                        this.draft_details_array.motherInformation.mother_middle_name_t =
                            this.suggestions[0];
                    }
                    if (inputsource == 'mother_surname_name') {
                        this.draft_details_array.motherInformation.mother_surname_t =
                            this.suggestions[0];
                    }
                    if (inputsource == 'mother_surname_name_tel') {
                        this.draft_details_array.motherInformation.mother_surname_t =
                            this.suggestions[0];
                    }
                    if (inputsource == 'address_parent_country_address') {
                        this.draft_details_array.addressof_parents.address_parent_country_address_t =
                            this.suggestions[0];
                    }
                    if (inputsource == 'address_parent_country_address_tel') {
                        this.draft_details_array.addressof_parents.address_parent_country_address_t =
                            this.suggestions[0];
                    }
                    if (inputsource == 'address_parent_country_address') {
                        this.draft_details_array.addressof_parents.address_parent_country_address_t =
                            this.suggestions[0];
                    }
                    if (inputsource == 'address_parent_country_address_tel') {
                        this.draft_details_array.addressof_parents.address_parent_country_address_t =
                            this.suggestions[0];
                    }
                    if (inputsource == 'address_parent_building_name') {
                        this.draft_details_array.addressof_parents.address_parent_building_name_t =
                            this.suggestions[0];
                    }
                    if (inputsource == 'address_parent_building_name_tel') {
                        this.draft_details_array.addressof_parents.address_parent_building_name_t =
                            this.suggestions[0];
                    }
                    if (inputsource == 'address_parent_house_no') {
                        this.draft_details_array.addressof_parents.address_parent_house_no_t =
                            this.suggestions[0];
                    }
                    if (inputsource == 'address_parent_house_no_tel') {
                        this.draft_details_array.addressof_parents.address_parent_house_no_t =
                            this.suggestions[0];
                    }
                    if (inputsource == 'address_parent_street_name') {
                        this.draft_details_array.addressof_parents.address_parent_street_name_t =
                            this.suggestions[0];
                    }
                    if (inputsource == 'address_parent_street_name_tel') {
                        this.draft_details_array.addressof_parents.address_parent_street_name_t =
                            this.suggestions[0];
                    }
                    if (inputsource == 'address_parent_Locality_Post') {
                        this.draft_details_array.addressof_parents.address_parent_locality_t =
                            this.suggestions[0];
                    }
                    if (inputsource == 'address_parent_Locality_Post_tel') {
                        this.draft_details_array.addressof_parents.address_parent_locality_t =
                            this.suggestions[0];
                    }
                    //Permanent
                    if (inputsource == 'addressoutsideindia') {
                        this.draft_details_array.Permanent_addressof_parents.address_parent_permenent_country_address_t =
                            this.suggestions[0];
                    }
                    if (inputsource == 'addressoutsideindia_tel') {
                        this.draft_details_array.Permanent_addressof_parents.address_parent_permenent_country_address_t =
                            this.suggestions[0];
                    }
                    if (inputsource == 'address_parent_permenent_building_no') {
                        this.draft_details_array.Permanent_addressof_parents.address_parent_permenent_building_no_t =
                            this.suggestions[0];
                    }
                    if (inputsource == 'address_parent_permenent_building_no_tel') {
                        this.draft_details_array.Permanent_addressof_parents.address_parent_permenent_building_no_t =
                            this.suggestions[0];
                    }

                    if (inputsource == 'address_parent_permenent_hose_no') {
                        this.draft_details_array.Permanent_addressof_parents.address_parent_permenent_hose_no_t =
                            this.suggestions[0];
                    }
                    if (inputsource == 'address_parent_permenent_hose_no_tel') {
                        this.draft_details_array.Permanent_addressof_parents.address_parent_permenent_hose_no_t =
                            this.suggestions[0];
                    }
                    if (inputsource == 'address_parent_permenent_street_name') {
                        this.draft_details_array.Permanent_addressof_parents.address_parent_permenent_street_name_t =
                            this.suggestions[0];
                    }
                    if (inputsource == 'address_parent_permenent_street_name_tel') {
                        this.draft_details_array.Permanent_addressof_parents.address_parent_permenent_street_name_t =
                            this.suggestions[0];
                    }
                    if (inputsource == 'address_parent_permenent_locality_post_office') {
                        this.draft_details_array.Permanent_addressof_parents.address_parent_permenent_locality_t =
                            this.suggestions[0];
                    }
                    if (
                        inputsource == 'address_parent_permenent_locality_post_office_tel'
                    ) {
                        this.draft_details_array.Permanent_addressof_parents.address_parent_permenent_locality_t =
                            this.suggestions[0];
                    }
                    if (inputsource == 'place_of_birth_building_no') {
                        this.draft_details_array.placeofbirth.place_of_birth_building_no_t =
                            this.suggestions[0];
                    }
                    if (inputsource == 'place_of_birth_building_no_t') {
                        this.draft_details_array.placeofbirth.place_of_birth_building_no_t =
                            this.suggestions[0];
                    }
                    if (inputsource == 'Place_of_birth_house_no') {
                        this.draft_details_array.placeofbirth.Place_of_birth_house_no_t =
                            this.suggestions[0];
                    }
                    if (inputsource == 'Place_of_birth_house_no_t') {
                        this.draft_details_array.placeofbirth.Place_of_birth_house_no_t =
                            this.suggestions[0];
                    }
                    if (inputsource == 'place_of_birth_street_name') {
                        this.draft_details_array.placeofbirth.place_of_birth_street_name_t =
                            this.suggestions[0];
                    }
                    if (inputsource == 'place_of_birth_street_name_t') {
                        this.draft_details_array.placeofbirth.place_of_birth_street_name_t =
                            this.suggestions[0];
                    }
                    if (inputsource == 'Place_of_birth_locality') {
                        this.draft_details_array.placeofbirth.Place_of_birth_locality_t =
                            this.suggestions[0];
                    }
                    if (inputsource == 'Place_of_birth_locality_t') {
                        this.draft_details_array.placeofbirth.Place_of_birth_locality_t =
                            this.suggestions[0];
                    }
                    if (inputsource == 'Informant_fullname') {
                        this.draft_details_array.information.Informant_fullname_t =
                            this.suggestions[0];
                    }
                    if (inputsource == 'Informant_fullname_t') {
                        this.draft_details_array.information.Informant_fullname_t =
                            this.suggestions[0];
                    }
                    if (inputsource == 'Informant_address') {
                        this.draft_details_array.information.Informant_address_t =
                            this.suggestions[0];
                    }
                    if (inputsource == 'Informant_address_t') {
                        this.draft_details_array.information.Informant_address_t =
                            this.suggestions[0];
                    }
                    if (inputsource == 'father_religion_other') {
                        this.draft_details_array.legal.father_religion_other_t = this.suggestions[0];
                    }
                    if (inputsource == 'father_religion_other_t') {
                        this.draft_details_array.legal.father_religion_other_t = this.suggestions[0];
                    }
                    if (inputsource == 'mother_religion_other') {
                        this.draft_details_array.legal.mother_religion_other_t = this.suggestions[0];
                    }
                    if (inputsource == 'mother_religion_other_t') {
                        this.draft_details_array.legal.mother_religion_other_t = this.suggestions[0];
                    }
                } else {
                    if (inputsource == 'child_fullname') {
                        this.draft_details_array.childinformation.fullname_t = '';
                    }
                    if (inputsource == 'child_fullname_tel') {
                        this.draft_details_array.childinformation.fullname_t = '';
                    }
                    if (inputsource == 'middlename') {
                        this.draft_details_array.childinformation.middlename_t = '';
                    }
                    if (inputsource == 'middlename_t') {
                        this.draft_details_array.childinformation.middlename_t = '';
                    }
                    if (inputsource == 'child_surname') {
                        this.draft_details_array.childinformation.surname_t = '';
                    }
                    if (inputsource == 'child_surname_tel') {
                        this.draft_details_array.childinformation.surname_t = '';
                    }
                    if (inputsource == 'child_confirm_fullname') {
                        this.draft_details_array.childinformation.confirm_fullname_t = '';
                    }
                    if (inputsource == 'child_confirm_fullname_tel') {
                        this.draft_details_array.childinformation.confirm_fullname_t = '';
                    }
                    if (inputsource == 'confirm_middle') {
                        this.draft_details_array.childinformation.confirm_middle_t = '';
                    }
                    if (inputsource == 'confirm_middle_t') {
                        this.draft_details_array.childinformation.confirm_middle_t = '';
                    }

                    if (inputsource == 'child_confirm_surname') {
                        this.draft_details_array.childinformation.confirm_surname_t = '';
                    }
                    if (inputsource == 'child_confirm_surname_tel') {
                        this.draft_details_array.childinformation.confirm_surname_t = '';
                    }

                    if (inputsource == 'father_full_name') {
                        this.draft_details_array.fatherInformation.father_full_namer_t = '';
                    }
                    if (inputsource == 'father_full_name_tel') {
                        this.draft_details_array.fatherInformation.father_full_namer_t = '';
                    }
                    if (inputsource == 'father_middlename') {
                        this.draft_details_array.fatherInformation.father_middlename_t = '';
                    }
                    if (inputsource == 'father_middlename_t') {
                        this.draft_details_array.fatherInformation.father_middlename_t = '';
                    }

                    if (inputsource == 'father_surname') {
                        this.draft_details_array.fatherInformation.father_surname_t = '';
                    }
                    if (inputsource == 'father_surname_tel') {
                        this.draft_details_array.fatherInformation.father_surname_t = '';
                    }
                    if (inputsource == 'father_surname') {
                        this.draft_details_array.fatherInformation.father_surname_t = '';
                    }
                    if (inputsource == 'father_surname_tel') {
                        this.draft_details_array.fatherInformation.father_surname_t = '';
                    }
                    if (inputsource == 'mother_full_name') {
                        this.draft_details_array.motherInformation.mother_full_namer_t = '';
                    }
                    if (inputsource == 'mother_full_name_tel') {
                        this.draft_details_array.motherInformation.mother_full_namer_t = '';
                    }
                    if (inputsource == 'mother_middle_name') {
                        this.draft_details_array.motherInformation.mother_middle_name_t =
                            '';
                    }
                    if (inputsource == 'mother_middle_name_t') {
                        this.draft_details_array.motherInformation.mother_middle_name_t =
                            '';
                    }
                    if (inputsource == 'mother_surname_name') {
                        this.draft_details_array.motherInformation.mother_surname_t = '';
                    }
                    if (inputsource == 'mother_surname_name_tel') {
                        this.draft_details_array.motherInformation.mother_surname_t = '';
                    }
                    if (inputsource == 'address_parent_country_address') {
                        this.draft_details_array.addressof_parents.address_parent_country_address_t =
                            '';
                    }
                    if (inputsource == 'address_parent_country_address_tel') {
                        this.draft_details_array.addressof_parents.address_parent_country_address_t =
                            '';
                    }
                    if (inputsource == 'address_parent_country_address') {
                        this.draft_details_array.addressof_parents.address_parent_country_address_t =
                            '';
                    }
                    if (inputsource == 'address_parent_country_address_tel') {
                        this.draft_details_array.addressof_parents.address_parent_country_address_t =
                            '';
                    }
                    if (inputsource == 'address_parent_building_name') {
                        this.draft_details_array.addressof_parents.address_parent_building_name_t =
                            '';
                    }
                    if (inputsource == 'address_parent_building_name_tel') {
                        this.draft_details_array.addressof_parents.address_parent_building_name_t =
                            '';
                    }
                    if (inputsource == 'address_parent_house_no') {
                        this.draft_details_array.addressof_parents.address_parent_house_no_t =
                            '';
                    }
                    if (inputsource == 'address_parent_house_no_tel') {
                        this.draft_details_array.addressof_parents.address_parent_house_no_t =
                            '';
                    }
                    if (inputsource == 'address_parent_street_name') {
                        this.draft_details_array.addressof_parents.address_parent_street_name_t =
                            '';
                    }
                    if (inputsource == 'address_parent_street_name_tel') {
                        this.draft_details_array.addressof_parents.address_parent_street_name_t =
                            '';
                    }
                    if (inputsource == 'address_parent_Locality_Post') {
                        this.draft_details_array.addressof_parents.address_parent_locality_t =
                            '';
                    }
                    if (inputsource == 'address_parent_Locality_Post_tel') {
                        this.draft_details_array.addressof_parents.address_parent_locality_t =
                            '';
                    }
                    //Permanent
                    if (inputsource == 'addressoutsideindia') {
                        this.draft_details_array.Permanent_addressof_parents.address_parent_permenent_country_address_t =
                            '';
                    }
                    if (inputsource == 'addressoutsideindia_tel') {
                        this.draft_details_array.Permanent_addressof_parents.address_parent_permenent_country_address_t =
                            '';
                    }
                    if (inputsource == 'address_parent_permenent_building_no') {
                        this.draft_details_array.Permanent_addressof_parents.address_parent_permenent_building_no_t =
                            '';
                    }
                    if (inputsource == 'address_parent_permenent_building_no_tel') {
                        this.draft_details_array.Permanent_addressof_parents.address_parent_permenent_building_no_t =
                            '';
                    }

                    if (inputsource == 'address_parent_permenent_hose_no') {
                        this.draft_details_array.Permanent_addressof_parents.address_parent_permenent_hose_no_t =
                            '';
                    }
                    if (inputsource == 'address_parent_permenent_hose_no_tel') {
                        this.draft_details_array.Permanent_addressof_parents.address_parent_permenent_hose_no_t =
                            '';
                    }
                    if (inputsource == 'address_parent_permenent_street_name') {
                        this.draft_details_array.Permanent_addressof_parents.address_parent_permenent_street_name_t =
                            '';
                    }
                    if (inputsource == 'address_parent_permenent_street_name_tel') {
                        this.draft_details_array.Permanent_addressof_parents.address_parent_permenent_street_name_t =
                            '';
                    }
                    if (inputsource == 'address_parent_permenent_locality_post_office') {
                        this.draft_details_array.Permanent_addressof_parents.address_parent_permenent_locality_t =
                            '';
                    }
                    if (
                        inputsource == 'address_parent_permenent_locality_post_office_tel'
                    ) {
                        this.draft_details_array.Permanent_addressof_parents.address_parent_permenent_locality_t =
                            '';
                    }
                    if (inputsource == 'place_of_birth_building_no') {
                        this.draft_details_array.placeofbirth.place_of_birth_building_no_t =
                            '';
                    }
                    if (inputsource == 'place_of_birth_building_no_t') {
                        this.draft_details_array.placeofbirth.place_of_birth_building_no_t =
                            '';
                    }
                    if (inputsource == 'Place_of_birth_house_no') {
                        this.draft_details_array.placeofbirth.Place_of_birth_house_no_t =
                            '';
                    }
                    if (inputsource == 'Place_of_birth_house_no_t') {
                        this.draft_details_array.placeofbirth.Place_of_birth_house_no_t =
                            '';
                    }
                    if (inputsource == 'place_of_birth_street_name') {
                        this.draft_details_array.placeofbirth.place_of_birth_street_name_t =
                            '';
                    }
                    if (inputsource == 'place_of_birth_street_name_t') {
                        this.draft_details_array.placeofbirth.place_of_birth_street_name_t =
                            '';
                    }
                    if (inputsource == 'Place_of_birth_locality') {
                        this.draft_details_array.placeofbirth.Place_of_birth_locality_t =
                            '';
                    }
                    if (inputsource == 'Place_of_birth_locality_t') {
                        this.draft_details_array.placeofbirth.Place_of_birth_locality_t =
                            '';
                    }
                    if (inputsource == 'Informant_fullname') {
                        this.draft_details_array.information.Informant_fullname_t = '';
                    }
                    if (inputsource == 'Informant_fullname_t') {
                        this.draft_details_array.information.Informant_fullname_t = '';
                    }
                    if (inputsource == 'Informant_address') {
                        this.draft_details_array.information.Informant_address_t = '';
                    }
                    if (inputsource == 'Informant_address_t') {
                        this.draft_details_array.information.Informant_address_t = '';
                    }
                    if (inputsource == 'father_religion_other') {
                        this.draft_details_array.legal.father_religion_other_t = '';
                    }
                    if (inputsource == 'father_religion_other_t') {
                        this.draft_details_array.legal.father_religion_other_t = '';
                    }
                    if (inputsource == 'mother_religion_other') {
                        this.draft_details_array.legal.mother_religion_other = '';
                    }
                    if (inputsource == 'mother_religion_other_t') {
                        this.draft_details_array.legal.mother_religion_other_t = '';
                    }
                }
            },
            (error) => {
                console.error('Error transliterating text:', error);
                return '';
            }
        );
    }
    country_master_array: any[] = [];
    async getcountry(): Promise<void> {
        try {
            const req = new basemodel();
            req.type = '1000';
            this.spinner.show();
            this.country_master_array = [];
            let responce: any = await this.auth.auth_utilities_service(req);

            this.spinner.hide();
            if (responce.code) {
                this.country_master_array = responce.Details;
            } else {
                this.country_master_array = [];
                this.spinner.hide();
            }
        } catch (error) {
            this.spinner.hide();

        }
    }
    PlaceofBirth_master_array: any[] = [];
    async getPlaceofBirth(): Promise<void> {
        try {
            const req = new basemodel();
            req.type = '1009';
            this.spinner.show();
            this.PlaceofBirth_master_array = [];
            let responce: any = await this.auth.auth_utilities_service(req);
            this.spinner.hide();
            if (responce.code) {
                this.PlaceofBirth_master_array = responce.Details;


            } else {
                this.PlaceofBirth_master_array = [];
                this.spinner.hide();
            }
        } catch (error) {
            this.spinner.hide();

        }
    }
    async StatisticalInformationservice() {
        await this.get_Father_Mother_Religion();
        await this.get_Father_mother_Education();
        await this.get_Father_mother_occupation();
        await this.get_SupportingDocuments();
        await this.getHospital();
        await this.get_Typeofattention();
        await this.get_MethodofDelivery();
        await this.get_AdditionalSupportingDocuments();
    }

    FatherReligion_master_array: any[] = [];
    MotherReligion_master_array: any[] = [];
    async get_Father_Mother_Religion(): Promise<void> {
        try {
            const req = new basemodel();
            req.type = '1012';
            this.spinner.show();
            this.FatherReligion_master_array = [];
            this.MotherReligion_master_array = [];
            let responce: any = await this.auth.auth_utilities_service(req);

            this.spinner.hide();
            if (responce.code) {
                this.FatherReligion_master_array = responce.Details;
                this.MotherReligion_master_array = responce.Details;
            } else {
                this.FatherReligion_master_array = [];
                this.MotherReligion_master_array = [];
                this.spinner.hide();
            }
        } catch (error) {
            this.spinner.hide();

        }
    }
    FatherEducation_master_array: any[] = [];
    MotehrEducation_master_array: any[] = [];
    async get_Father_mother_Education(): Promise<void> {
        try {
            const req = new basemodel();
            req.type = '1013';
            this.spinner.show();
            this.FatherEducation_master_array = [];
            this.MotehrEducation_master_array = [];
            let responce: any = await this.auth.auth_utilities_service(req);

            this.spinner.hide();
            if (responce.code) {
                this.FatherEducation_master_array = responce.Details;
                this.MotehrEducation_master_array = responce.Details;
            } else {
                this.FatherEducation_master_array = [];
                this.MotehrEducation_master_array = [];
                this.spinner.hide();
            }
        } catch (error) {
            this.spinner.hide();

        }
    }
    Fatheroccupation_master_array: any[] = [];
    Mohter_occupation_master_array: any[] = [];
    async get_Father_mother_occupation(): Promise<void> {
        try {
            const req = new basemodel();
            req.type = '1014';
            this.spinner.show();
            this.Fatheroccupation_master_array = [];
            this.Mohter_occupation_master_array = [];
            let responce: any = await this.auth.auth_utilities_service(req);

            this.spinner.hide();
            if (responce.code) {
                this.Fatheroccupation_master_array = responce.Details;
                this.Mohter_occupation_master_array = responce.Details;
            } else {
                this.Fatheroccupation_master_array = [];
                this.Mohter_occupation_master_array = [];
                this.spinner.hide();
            }
        } catch (error) {
            this.spinner.hide();

        }
    }
    typeofattenction() {
        this.draft_details_array.legal.method_of_delivery = '';
    }
    Typeofattention_master_array: any[] = [];
    async get_Typeofattention(): Promise<void> {
        try {
            let hospitalcategory = '0';
            if (this.draft_details_array.placeofbirth.place_of_birth == '1') {
                hospitalcategory = this.Hospital_master_array.find(x => x.HOSPITAL_CODE == this.draft_details_array.placeofbirth.place_of_birth_hospital).HOSPITAL_CATEGORY;
            }
            const req = new basemodel();
            req.type = '1015';
            req.param1 = this.draft_details_array.placeofbirth.place_of_birth;
            req.param2 = hospitalcategory;
            req.param25 = 'BIRTH';
            this.spinner.show();
            this.Typeofattention_master_array = [];
            let responce: any = await this.auth.auth_utilities_service(req);
            this.spinner.hide();
            if (responce.code) {
                this.Typeofattention_master_array = responce.Details;
                if (this.draft_details_array.placeofbirth.place_of_birth == '1') {
                    this.draft_details_array.legal.type_of_attention = this.Typeofattention_master_array[0].ATTENTION_CODE;
                }
            } else {
                this.Typeofattention_master_array = [];
                this.spinner.hide();
            }
        } catch (error) {
            this.spinner.hide();

        }
    }
    MethodofDelivery_master_array: any[] = [];
    async get_MethodofDelivery(): Promise<void> {
        try {
            const req = new basemodel();
            req.type = '1016';
            req.param1 = this.draft_details_array.placeofbirth.place_of_birth;
            this.spinner.show();
            this.MethodofDelivery_master_array = [];
            let responce: any = await this.auth.auth_utilities_service(req);

            this.spinner.hide();
            if (responce.code) {
                this.MethodofDelivery_master_array = responce.Details;
            } else {
                this.MethodofDelivery_master_array = [];
                this.spinner.hide();
            }
        } catch (error) {
            this.spinner.hide();

        }
    }
    SupportingDocuments_master_array: any[] = [];
    async get_SupportingDocuments(): Promise<void> {
        try {
            const req = new basemodel();
            req.type = '1017';
            req.param1 = this.draft_details_array.placeofbirth.place_of_birth;
            this.spinner.show();
            this.SupportingDocuments_master_array = [];
            let responce: any = await this.auth.auth_utilities_service(req);

            this.spinner.hide();
            if (responce.code) {
                this.SupportingDocuments_master_array = responce.Details;
            } else {
                this.SupportingDocuments_master_array = [];
                this.spinner.hide();
            }
        } catch (error) {
            this.spinner.hide();

        }
    }
    AdditionalSupportingDocuments_master_array: any[] = [];
    async get_AdditionalSupportingDocuments(): Promise<void> {
        try {
            const req = new basemodel();
            req.type = '1017';
            req.param1 = '111';
            this.spinner.show();
            this.AdditionalSupportingDocuments_master_array = [];
            let responce: any = await this.auth.auth_utilities_service(req);

            this.spinner.hide();
            if (responce.code) {
                this.AdditionalSupportingDocuments_master_array = responce.Details;
            } else {
                this.AdditionalSupportingDocuments_master_array = [];
                this.spinner.hide();
            }
        } catch (error) {
            this.spinner.hide();

        }
    }
    ProceedingSupportingDocuments_master_array: any[] = [];
    async get_ProceedingSupportingDocuments(): Promise<void> {
        try {
            const req = new basemodel();
            req.type = '1017';
            req.param1 = '333';
            this.spinner.show();
            this.ProceedingSupportingDocuments_master_array = [];
            let responce: any = await this.auth.auth_utilities_service(req);

            this.spinner.hide();
            if (responce.code) {
                this.ProceedingSupportingDocuments_master_array = responce.Details;
            } else {
                this.ProceedingSupportingDocuments_master_array = [];
                this.spinner.hide();
            }
        } catch (error) {
            this.spinner.hide();

        }
    }
    Addressofparents_state_master_array: any[] = [];
    Permanent_Addressofparents_state_master_array: any[] = [];
    PlaceofBirth_state_master_array: any[] = [];
    staticstical_state_master_array: any[] = [];
    async getstatedata(): Promise<void> {
        try {
            const req = new basemodel();
            req.type = '1001';
            this.spinner.show();
            this.Addressofparents_state_master_array = [];
            this.Permanent_Addressofparents_state_master_array = [];
            this.PlaceofBirth_state_master_array = [];
            this.staticstical_state_master_array = [];
            let responce: any = await this.auth.auth_utilities_service(req);
            this.spinner.hide();
            if (responce.code) {
                this.Addressofparents_state_master_array = responce.Details;
                this.Permanent_Addressofparents_state_master_array = responce.Details;
                this.PlaceofBirth_state_master_array = responce.Details;
                this.staticstical_state_master_array = responce.Details;
            } else {
                this.Addressofparents_state_master_array = [];
                this.PlaceofBirth_state_master_array = [];
                this.staticstical_state_master_array = [];
                this.Permanent_Addressofparents_state_master_array = [];
                this.spinner.hide();
            }
        } catch (error) {
            this.spinner.hide();

        }
    }
    Addressofparents_district_array: any[] = [];
    Permanent_Addressofparents_district_array: any[] = [];
    PlaceofBirth_district_array: any[] = [];
    staticstical_district_array: any[] = [];
    statcode: any;
    async getdistrict(obj: any): Promise<void> {
        this.statcode = '';
        if (
            obj == 'Addressofparents' &&
            this.draft_details_array.addressof_parents.address_parent_state == ''
        ) {
            this.spinner.hide();
            this.Addressofparents_district_array = [];
            this.draft_details_array.addressof_parents.address_parent_state = '';
            this.alt.warning('select  Permanent Address of parents State');
            return;
        } else if (
            obj == 'PermanentAddressofparents' &&
            this.draft_details_array.Permanent_addressof_parents
                .address_parent_permenent_state == ''
        ) {
            this.spinner.hide();
            this.Permanent_Addressofparents_district_array = [];
            this.draft_details_array.Permanent_addressof_parents.address_parent_permenent_state =
                '';
            this.alt.warning('select Permanent Address of parents State');
            return;
        } else if (
            obj == 'placeofbirth' &&
            this.draft_details_array.placeofbirth.place_of_birth_state == ''
        ) {
            this.spinner.hide();
            this.PlaceofBirth_district_array = [];
            this.draft_details_array.placeofbirth.place_of_birth_state = '';
            this.alt.warning('select Place of Birth State');
            return;
        } else if (
            obj == 'staticstical' &&
            this.draft_details_array.legal.mother_residence_state == ''
        ) {
            this.spinner.hide();
            this.staticstical_district_array = [];
            this.draft_details_array.placeofbirth.place_of_birth_state = '';
            this.alt.warning('select State');
            return;
        } else {
            if (obj == 'Addressofparents') {
                this.statcode =
                    this.draft_details_array.addressof_parents.address_parent_state;
            }
            if (obj == 'PermanentAddressofparents') {
                this.statcode =
                    this.draft_details_array.Permanent_addressof_parents.address_parent_permenent_state;
            }
            if (obj == 'placeofbirth') {
                this.statcode =
                    this.draft_details_array.placeofbirth.place_of_birth_state;
            }
            if (obj == 'staticstical') {
                this.statcode = this.draft_details_array.legal.mother_residence_state;
            }
            try {
                const req = new basemodel();
                req.type = '1002';
                req.param1 = this.statcode;
                this.spinner.show();
                let responce: any = await this.auth.auth_utilities_service(req);
                this.spinner.hide();

                if (responce.code) {
                    if (obj == 'Addressofparents') {
                        this.Addressofparents_district_array = responce.Details;
                    }
                    if (obj == 'PermanentAddressofparents') {
                        this.Permanent_Addressofparents_district_array = responce.Details;
                    }
                    if (obj == 'placeofbirth') {
                        this.PlaceofBirth_district_array = responce.Details;
                    }
                    if (obj == 'staticstical') {
                        this.staticstical_district_array = responce.Details;
                    }
                } else {
                    if (obj == 'Addressofparents') {
                        this.Addressofparents_district_array = [];
                    }
                    if (obj == 'PermanentAddressofparents') {
                        this.Permanent_Addressofparents_district_array = [];
                    }
                    if (obj == 'placeofbirth') {
                        this.PlaceofBirth_district_array = [];
                    }
                    if (obj == 'staticstical') {
                        this.staticstical_district_array = [];
                    }
                    this.spinner.hide();
                }
            } catch (error) {
                this.spinner.hide();

            }
        }
    }

    async statechangeser(type: any) {
        if (type == 'Addressofparents') {
            this.draft_details_array.addressof_parents.address_parent_district = '';
            this.Addressof_districtchange();
        }
        if (type == 'PermanentAddressofparents') {
            this.draft_details_array.Permanent_addressof_parents.address_parent_permenent_district = '';
            this.Permanent_Addressof_districtchange();
        }
        if (type == 'placeofbirth') {
            this.draft_details_array.placeofbirth.place_of_birth_district = '';
            this.PlaceofBirth_districtchange();
        }
        if (type == 'staticstical') {
            this.draft_details_array.legal.mother_residence_district = '';
            this.staticstical_districtchange();
        }
    }
    async urbanruralchangeser(type: any) {

        if (type == 'Addressofparents') {
            this.draft_details_array.addressof_parents.address_parent_mmc = '';
            this.Addressof_urbanchange();
        }
        if (type == 'PermanentAddressofparents') {
            this.draft_details_array.Permanent_addressof_parents.address_parent_permenent_mmc = '';
            this.Permanent_Addressof_urbanchange();
        }
        if (type == 'placeofbirth') {
            this.draft_details_array.placeofbirth.place_of_birth_mmc = '';
            this.PlaceofBirth_urbanchange();
        }
        if (type == 'staticstical') {
            this.draft_details_array.legal.mother_residence_Mmc = '';
            this.staticstical_urbanchange();
        }
    }
    async manmuncchangeser(type: any) {

        if (type == 'Addressofparents') {
            this.draft_details_array.addressof_parents.address_parent_Village_Town = '';
            this.Addressof_mandalchange();
        }
        if (type == 'PermanentAddressofparents') {
            this.draft_details_array.Permanent_addressof_parents.address_parent_permenent_village = '';
            this.Permanent_Addressof_mandalchange();
        }
        if (type == 'placeofbirth') {
            this.draft_details_array.placeofbirth.place_of_birth_village = '';
            this.PlaceofBirth_mandalchange();
        }
        if (type == 'staticstical') {
            this.draft_details_array.legal.mother_residence_Village = '';
            this.staticstical_mandalchange();
        }
    }

    async Addressof_districtchange(): Promise<void> {
        this.draft_details_array.addressof_parents.address_parent_rural_urabn = '';
        this.draft_details_array.addressof_parents.address_parent_mmc = '';
        this.draft_details_array.addressof_parents.address_parent_Village_Town = '';
        this.Addressofparents_MandalMuncipality_array = [];
    }
    async Addressof_urbanchange(): Promise<void> {
        // this.draft_details_array.addressof_parents.address_parent_rural_urabn = '';
        this.draft_details_array.addressof_parents.address_parent_mmc = '';
        this.draft_details_array.addressof_parents.address_parent_Village_Town = '';
        this.Addressofparents_MandalMuncipality_array = [];
    }
    async Addressof_mandalchange(): Promise<void> {
        // this.draft_details_array.addressof_parents.address_parent_rural_urabn = '';
        // this.draft_details_array.addressof_parents.address_parent_mmc = '';
        this.draft_details_array.addressof_parents.address_parent_Village_Town = '';
        this.village_ward_array = [];
    }
    async Permanent_Addressof_districtchange(): Promise<void> {
        this.draft_details_array.Permanent_addressof_parents.address_parent_permenent_rural_urabn =
            '';
        this.draft_details_array.Permanent_addressof_parents.address_parent_permenent_mmc =
            '';
        this.draft_details_array.Permanent_addressof_parents.address_parent_permenent_village =
            '';
        this.Permanent_Addressofparents_MandalMuncipality_array = [];
    }
    async Permanent_Addressof_urbanchange(): Promise<void> {
        // this.draft_details_array.Permanent_addressof_parents.address_parent_permenent_rural_urabn =
        //     '';
        this.draft_details_array.Permanent_addressof_parents.address_parent_permenent_mmc =
            '';
        this.draft_details_array.Permanent_addressof_parents.address_parent_permenent_village =
            '';
        this.Permanent_Addressofparents_MandalMuncipality_array = [];
    }
    async Permanent_Addressof_mandalchange(): Promise<void> {
        // this.draft_details_array.Permanent_addressof_parents.address_parent_permenent_rural_urabn =
        //     '';
        // this.draft_details_array.Permanent_addressof_parents.address_parent_permenent_mmc =
        //     '';
        this.draft_details_array.Permanent_addressof_parents.address_parent_permenent_village =
            '';
        this.Permanent_village_ward_array = [];
    }
    async PlaceofBirth_districtchange(): Promise<void> {
        this.draft_details_array.placeofbirth.place_of_birth_rural_urabn = '';
        this.draft_details_array.placeofbirth.place_of_birth_mmc = '';
        this.draft_details_array.placeofbirth.place_of_birth_village = '';
        this.placeofbirth_MandalMuncipality_array = [];
    }
    async PlaceofBirth_urbanchange(): Promise<void> {
        // this.draft_details_array.placeofbirth.place_of_birth_rural_urabn = '';
        this.draft_details_array.placeofbirth.place_of_birth_mmc = '';
        this.draft_details_array.placeofbirth.place_of_birth_village = '';
        this.placeofbirth_MandalMuncipality_array = [];
    }
    async PlaceofBirth_mandalchange(): Promise<void> {
        // this.draft_details_array.placeofbirth.place_of_birth_rural_urabn = '';
        // this.draft_details_array.placeofbirth.place_of_birth_mmc = '';
        this.draft_details_array.placeofbirth.place_of_birth_village = '';
        this.placeofbirth_village_ward_array = [];
    }
    async staticstical_districtchange(): Promise<void> {
        this.draft_details_array.legal.mother_residence_rural_urban = '';
        this.draft_details_array.legal.mother_residence_Mmc = '';
        this.draft_details_array.legal.mother_residence_Village = '';
        this.staticstical_MandalMuncipality_array = [];
    }
    async staticstical_urbanchange(): Promise<void> {
        // this.draft_details_array.legal.mother_residence_rural_urban = '';
        this.draft_details_array.legal.mother_residence_Mmc = '';
        this.draft_details_array.legal.mother_residence_Village = '';
        this.staticstical_MandalMuncipality_array = [];
    }
    async staticstical_mandalchange(): Promise<void> {
        // this.draft_details_array.legal.mother_residence_rural_urban = '';
        // this.draft_details_array.legal.mother_residence_Mmc = '';
        this.draft_details_array.legal.mother_residence_Village = '';
        this.staticstical_village_ward_array = [];
    }
    Hospital_master_array: any[] = [];

    hospitalAuthority: any;
    async getHospital(): Promise<void> {
        try {
            const req = new basemodel();
            req.type = '1021';
            this.spinner.show();
            this.Hospital_master_array = []; 
            let responce: any = await this.auth.auth_utilities_service(req);
            console.log(responce);
            this.spinner.hide();
            if (responce.code) {
                this.Hospital_master_array = responce.Details;
            } else {
                this.Hospital_master_array = [];
                this.spinner.hide();
            }
        } catch (error) {
            this.spinner.hide();

        }
    }

    Addressofparents_MandalMuncipality_array: any[] = [];
    Permanent_Addressofparents_MandalMuncipality_array: any[] = [];
    placeofbirth_MandalMuncipality_array: any[] = [];
    staticstical_MandalMuncipality_array: any[] = [];
    ruralurban = '';
    district = '';
    async MandalMuncipality(obj: any): Promise<void> {

        this.ruralurban = '';
        if (
            obj == 'Addressofparents' &&
            this.draft_details_array.addressof_parents.address_parent_district == ''
        ) {
            this.spinner.hide();
            this.Addressofparents_MandalMuncipality_array = [];
            this.alt.warning('select district');
            return;
        } else if (
            obj == 'PermanentAddressofparents' &&
            this.draft_details_array.Permanent_addressof_parents
                .address_parent_permenent_district == ''
        ) {
            this.spinner.hide();
            this.Permanent_Addressofparents_MandalMuncipality_array = [];
            this.alt.warning('select district');
            return;
        } else if (
            obj == 'placeofbirth' &&
            this.draft_details_array.placeofbirth.place_of_birth_district == ''
        ) {
            this.spinner.hide();
            this.placeofbirth_MandalMuncipality_array = [];
            this.alt.warning('select district');
            return;
        } else if (
            obj == 'staticstical' &&
            this.draft_details_array.legal.mother_residence_district == ''
        ) {
            this.spinner.hide();
            this.staticstical_MandalMuncipality_array = [];
            this.alt.warning('select district');
            return;
        } else {
            try {
                if (obj == 'Addressofparents') {
                    this.Addressofparents_MandalMuncipality_array = [];
                    this.statcode =
                        this.draft_details_array.addressof_parents.address_parent_state;
                    this.district =
                        this.draft_details_array.addressof_parents.address_parent_district;
                    this.ruralurban =
                        this.draft_details_array.addressof_parents.address_parent_rural_urabn;
                }
                if (obj == 'PermanentAddressofparents') {
                    this.Permanent_Addressofparents_MandalMuncipality_array = [];
                    this.statcode =
                        this.draft_details_array.Permanent_addressof_parents.address_parent_permenent_state;
                    this.district =
                        this.draft_details_array.Permanent_addressof_parents.address_parent_permenent_district;
                    this.ruralurban =
                        this.draft_details_array.Permanent_addressof_parents.address_parent_permenent_rural_urabn;
                }
                if (obj == 'placeofbirth') {
                    this.placeofbirth_MandalMuncipality_array = [];
                    this.statcode =
                        this.draft_details_array.placeofbirth.place_of_birth_state;
                    this.district =
                        this.draft_details_array.placeofbirth.place_of_birth_district;
                    this.ruralurban =
                        this.draft_details_array.placeofbirth.place_of_birth_rural_urabn;
                }

                if (obj == 'staticstical') {
                    this.staticstical_MandalMuncipality_array = [];
                    this.statcode = this.draft_details_array.legal.mother_residence_state;
                    this.district =
                        this.draft_details_array.legal.mother_residence_district;
                    this.ruralurban =
                        this.draft_details_array.legal.mother_residence_rural_urban;
                }

                const req = new basemodel();
                req.type = '1003';
                req.param1 = this.statcode;
                req.param2 = this.district;
                req.param3 = this.ruralurban;
                this.spinner.show();
                let responce: any = await this.auth.auth_utilities_service(req);
                this.spinner.hide();
                if (responce.code) {
                    if (obj == 'Addressofparents') {
                        this.Addressofparents_MandalMuncipality_array = responce.Details;
                    }
                    if (obj == 'PermanentAddressofparents') {
                        this.Permanent_Addressofparents_MandalMuncipality_array =
                            responce.Details;
                    }
                    if (obj == 'placeofbirth') {
                        this.placeofbirth_MandalMuncipality_array = responce.Details;
                    }
                    if (obj == 'staticstical') {
                        this.staticstical_MandalMuncipality_array = responce.Details;
                    }
                } else {
                    if (obj == 'Addressofparents') {
                        this.Addressofparents_MandalMuncipality_array = [];
                    }
                    if (obj == 'PermanentAddressofparents') {
                        this.Permanent_Addressofparents_MandalMuncipality_array = [];
                    }
                    if (obj == 'placeofbirth') {
                        this.placeofbirth_MandalMuncipality_array = [];
                    }
                    if (obj == 'staticstical') {
                        this.staticstical_MandalMuncipality_array = [];
                    }
                }
            } catch (error) {
                this.spinner.hide();

            }
        }
    }

    village_ward_array: any[] = [];
    Permanent_village_ward_array: any[] = [];
    placeofbirth_village_ward_array: any[] = [];
    staticstical_village_ward_array: any[] = [];
    mandalmuncipality = '';
    async VillageWard(obj: any): Promise<void> {
        this.mandalmuncipality = '';
        if (
            obj == 'Addressofparents' &&
            this.draft_details_array.addressof_parents.address_parent_mmc == ''
        ) {
            this.spinner.hide();
            this.village_ward_array = [];
            this.alt.warning('select Mandal/Muncipality');
            return;
        } else if (
            obj == 'PermanentAddressofparents' &&
            this.draft_details_array.Permanent_addressof_parents
                .address_parent_permenent_mmc == ''
        ) {
            this.spinner.hide();
            this.Permanent_village_ward_array = [];
            this.alt.warning('select Mandal/Muncipality');
            return;
        } else if (
            obj == 'placeofbirth' &&
            this.draft_details_array.placeofbirth.place_of_birth_mmc == ''
        ) {
            this.spinner.hide();
            this.placeofbirth_village_ward_array = [];
            this.alt.warning('select Mandal/Muncipality');
            return;
        } else if (
            obj == 'staticstical' &&
            this.draft_details_array.legal.mother_residence_Mmc == ''
        ) {
            this.spinner.hide();
            this.staticstical_village_ward_array = [];
            this.alt.warning('select Mandal/Muncipality');
            return;
        } else {
            try {
                if (obj == 'Addressofparents') {
                    this.village_ward_array = [];
                    this.statcode =
                        this.draft_details_array.addressof_parents.address_parent_state;
                    this.district =
                        this.draft_details_array.addressof_parents.address_parent_district;
                    this.ruralurban =
                        this.draft_details_array.addressof_parents.address_parent_rural_urabn;
                    this.mandalmuncipality =
                        this.draft_details_array.addressof_parents.address_parent_mmc;
                }
                if (obj == 'PermanentAddressofparents') {
                    this.Permanent_village_ward_array = [];
                    this.statcode =
                        this.draft_details_array.Permanent_addressof_parents.address_parent_permenent_state;
                    this.district =
                        this.draft_details_array.Permanent_addressof_parents.address_parent_permenent_district;
                    this.ruralurban =
                        this.draft_details_array.Permanent_addressof_parents.address_parent_permenent_rural_urabn;
                    this.mandalmuncipality =
                        this.draft_details_array.Permanent_addressof_parents.address_parent_permenent_mmc;
                }
                if (obj == 'placeofbirth') {
                    this.placeofbirth_village_ward_array = [];
                    this.statcode =
                        this.draft_details_array.placeofbirth.place_of_birth_state;
                    this.district =
                        this.draft_details_array.placeofbirth.place_of_birth_district;
                    this.ruralurban =
                        this.draft_details_array.placeofbirth.place_of_birth_rural_urabn;
                    this.mandalmuncipality =
                        this.draft_details_array.placeofbirth.place_of_birth_mmc;
                }
                if (obj == 'staticstical') {
                    this.staticstical_village_ward_array = [];
                    this.statcode = this.draft_details_array.legal.mother_residence_state;
                    this.district =
                        this.draft_details_array.legal.mother_residence_district;
                    this.ruralurban =
                        this.draft_details_array.legal.mother_residence_rural_urban;
                    this.mandalmuncipality =
                        this.draft_details_array.legal.mother_residence_Mmc;
                }
                const req = new basemodel();
                req.type = '1004';
                req.param1 = this.statcode;
                req.param2 = this.district;
                req.param3 = this.ruralurban;
                req.param4 = this.mandalmuncipality;
                this.spinner.show();
                let responce: any = await this.auth.auth_utilities_service(req);
                this.spinner.hide();

                if (responce.code) {
                    if (obj == 'Addressofparents') {
                        this.village_ward_array = responce.Details;
                    }
                    if (obj == 'PermanentAddressofparents') {
                        this.Permanent_village_ward_array = responce.Details;
                    }
                    if (obj == 'placeofbirth') {
                        this.placeofbirth_village_ward_array = responce.Details;
                    }
                    if (obj == 'staticstical') {
                        this.staticstical_village_ward_array = responce.Details;
                    }
                } else {
                    if (obj == 'Addressofparents') {
                        this.village_ward_array = [];
                    }
                    if (obj == 'PermanentAddressofparents') {
                        this.Permanent_village_ward_array = [];
                    }
                    if (obj == 'placeofbirth') {
                        this.placeofbirth_village_ward_array = [];
                    }
                    if (obj == 'staticstical') {
                        this.staticstical_village_ward_array = [];
                    }
                    this.spinner.hide();
                }
            } catch (error) {
                this.spinner.hide();

            }
        }
    }

    Parents_postal_array: any[] = [];
    Permanent_Parents_postal_array: any[] = [];
    placeofbirth_postal_array: any[] = [];
    pincode = '';
    previousPermanentPincodeLength: number = 0;
    previousBirthPincodeLength: number = 0;
    async Postalareas(value: any, obj: any): Promise<void> {




        if (
            obj == 'Addressofparents' &&
            this.draft_details_array.addressof_parents.address_parent_pincode == '' &&
            this.draft_details_array.addressof_parents.address_parent_pincode.length <
            6
        ) {
            this.spinner.hide();
            this.Parents_postal_array = [];
            this.draft_details_array.addressof_parents.address_parent_postoff = '';
            this.alt.warning('enter 6 digits postal code');
            return;
        } else if (
            obj == 'PermanentAddressofparents' &&
            this.draft_details_array.Permanent_addressof_parents
                .address_parent_permenent_pincode == '' &&
            this.draft_details_array.Permanent_addressof_parents
                .address_parent_permenent_pincode.length < 6
        ) {
            this.spinner.hide();
            this.Permanent_Parents_postal_array = [];
            this.draft_details_array.Permanent_addressof_parents.address_permenent_postoff =
                '';
            this.alt.warning('enter 6 digits postal code');
            return;
        } else if (
            obj == 'placeofbirth' &&
            this.draft_details_array.placeofbirth.place_of_birth_pin_code == '' &&
            this.draft_details_array.placeofbirth.place_of_birth_pin_code.length < 6
        ) {
            this.spinner.hide();
            this.placeofbirth_postal_array = [];
            this.draft_details_array.placeofbirth.Place_of_birth_postoff = '';
            this.alt.warning('enter 6 digits postal code');
            return;
        } else if (value.length === 6) {
            try {
                if (obj == 'Addressofparents') {
                    this.draft_details_array.addressof_parents.address_parent_postoff =
                        '';
                    this.Parents_postal_array = [];
                    this.pincode =
                        this.draft_details_array.addressof_parents.address_parent_pincode;
                }
                if (obj === 'PermanentAddressofparents') {
                    this.draft_details_array.addressof_parents.address_parent_postoff =
                        '';
                    this.Permanent_Parents_postal_array = [];
                    this.pincode =
                        this.draft_details_array.Permanent_addressof_parents.address_parent_permenent_pincode;
                }
                if (obj == 'placeofbirth') {
                    this.draft_details_array.placeofbirth.Place_of_birth_postoff = '';
                    this.placeofbirth_postal_array = [];
                    this.pincode =
                        this.draft_details_array.placeofbirth.place_of_birth_pin_code;
                }
                const req = new basemodel();
                req.type = '1008';
                req.param1 = this.pincode;
                this.spinner.show();
                let responce: any = await this.auth.auth_utilities_service(req);
                this.spinner.hide();
                if (responce.code) {

                    if (obj == 'Addressofparents') {
                        this.Parents_postal_array = responce.Details;
                    }
                    if (obj == 'PermanentAddressofparents') {
                        this.Permanent_Parents_postal_array = responce.Details;
                    }
                    if (obj == 'placeofbirth') {
                        this.placeofbirth_postal_array = responce.Details;
                    }
                } else {
                    if (obj == 'Addressofparents') {
                        this.Parents_postal_array = [];
                    }
                    if (obj == 'PermanentAddressofparents') {
                        this.Permanent_Parents_postal_array = [];
                    }
                    if (obj == 'placeofbirth') {
                        this.placeofbirth_postal_array = [];
                    }
                    this.spinner.hide();
                }
            } catch (error) {
                this.spinner.hide();

            }
        }
        //}

    }
    calculateyesrDiff(sentDate: any) {
        var date1: any = new Date(sentDate);
        var date2: any = new Date();
        var diffDays: any = Math.floor((date2 - date1) / (1000 * 60 * 60 * 24));

        return diffDays;
    }
    //Masters End 
    dateofbirthmax = new Date(); dateofbirthmin!: Date;
    confirmdateofbirthmax!: Date; confirmdateofbirthmin!: Date;
    birthvalidate: boolean = false;
    timedisable: boolean = true;

    onDateChange(event: any, type: any) {

        const formattedDate = this.datepipe.transform(event, 'dd-MM-yyyy');
        if (type == 'language') {
            this.draft_details_array.language.dateofreport = formattedDate || '';
            //this.dateofbirthmin = event;
            this.dateofbirthmax = event; // Assuming event is a Date object
            this.dateofbirthmin = new Date(event); // Clone the event date
            this.dateofbirthmin.setDate(this.dateofbirthmin.getDate() - 30); // Subtract 30 days

            //this.dateofbirthmax.setDate(this.dateofbirthmin.getDate()-20);
        }
        if (type == 'DateofBirth') {
            this.birthvalidate = false;
            this.timedisable = false;
            this.chekcdatecase();
            this.draft_details_array.childinformation.dateofbirthmask =
                formattedDate || '';
            this.draft_details_array.childinformation.dateofbirth =
                formattedDate || '';
            this.confirmdateofbirthmax = event;
            const datecaldiff = this.calculateDiff(event);
            if (datecaldiff > 20) {
                this.alt.toasterror('Please check you have all requisite documents before proceeding the event registration / దయచేసి ఈవెంట్ రిజిస్ట్రేషన్‌ను కొనసాగించే ముందు మీకు అవసరమైన అన్ని పత్రాలు ఉన్నాయో లేదో తనిఖీ చేయండి');
            }
            //this.confirmdateofbirthmin = event;
            const currentdatetime = this.datepipe.transform(new Date(), 'dd-MM-yyyy');
            if (formattedDate == currentdatetime) {
                this.updateTimeRange();
            }
            else {
                this.minTime = "00:00"; // Allow any time for past dates
                this.maxTime = "23:59";
            }
            this.chekcdatecase();
            let diffdate = this.calculateyesrDiff(event);
            if (diffdate > 365) {
                this.birthvalidate = true;
                this.alt.toasterror('Please check your date of death due to going back 365 days. Apply for NAC. / దయచేసి 365 రోజులు వెనక్కి వెళ్లడం వల్ల మీ పుట్టిన తేదీని తనిఖీ చేయండి. NAC కోసం దరఖాస్తు చేయండి.');

            }
        }
        if (type == 'confrimDateofBirth') {

            this.draft_details_array.childinformation.confirmdateofbirth =
                formattedDate || '';

            this.chekcdatecase();
        }
    }
    calculateDiff(dateSent: any) {
        let currentDate = new Date();
        dateSent = new Date(dateSent);

        return Math.floor((Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()) - Date.UTC(dateSent.getFullYear(), dateSent.getMonth(), dateSent.getDate())) / (1000 * 60 * 60 * 24));
    }
    // Update min and max time dynamically
    updateTimeRange() {
        const now = new Date();
        const istTime = new Date(now.toLocaleString("en-US"));
        this.maxTime = this.formatTime(istTime);
        this.minTime = "00:00";
    }

    formatTime(date: Date): string {
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    }
    chekcdatecase() {

        if (!this.val.isEmpty(this.draft_details_array.childinformation.confirmdateofbirth)) {
            if (this.draft_details_array.childinformation.dateofbirth != this.draft_details_array.childinformation.confirmdateofbirth) {
                this.foc_confirm_DateBirth.nativeElement.focus();
                this.ngConfirmDateBirth.control.setErrors({ mismatch: true });
                this.ngConfirmDateBirth.control.setErrors({ mismatch: true });
                this.draft_details_array.childinformation.confirmdateofbirth = '';
                this.alt.toasterror('Child Date of birth and Confim Date of birth Missmach')

            }
        }

    }
    AddressofparentsRadiochange(event: any) {

        const selectedValue = event.target.value;
        this.draft_details_array.addressof_parents = {
            addressof: selectedValue,
            address_parent_country: '',
            address_parent_country_val: '',
            address_parent_country_address: '',
            address_parent_country_address_t: '',
            address_parent_country_address_val: '',
            address_parent_state: '',
            address_parent_state_val: '',
            address_parent_district: '',
            address_parent_district_val: '',
            address_parent_rural_urabn: '',
            address_parent_rural_urabn_val: '',
            address_parent_mmc: '',
            address_parent_mmc_val: '',
            address_parent_Village_Town: '',
            address_parent_Village_Town_val: '',
            address_parent_pincode: '',
            address_parent_building_name: '',
            address_parent_building_name_t: '',
            address_parent_building_name_val: '',
            address_parent_house_no: '',
            address_parent_house_no_t: '',
            address_parent_house_no_val: '',
            address_parent_street_name: '',
            address_parent_street_name_t: '',
            address_parent_street_name_val: '',
            address_parent_locality: '',
            address_parent_locality_t: '',
            address_parent_postoff: '',
            address_parent_postoff_val: '',
            addressof_parents_value: '',
        };
    }
    permanentAddressofparentsRadiochange(event: any) {

        const selectedValue = event.target.value;
        this.draft_details_array.Permanent_addressof_parents = {
            address_parent_sameasaddress: '',
            address_parent_addressof: selectedValue,
            address_parent_permenent_country: '',
            address_parent_permenent_country_address: '',
            address_parent_permenent_country_address_t: '',
            address_parent_permenent_state: '',
            address_parent_permenent_district: '',
            address_parent_permenent_mmc: '',
            address_parent_permenent_rural_urabn: '',
            address_parent_permenent_village: '',
            address_parent_permenent_pincode: '',
            address_parent_permenent_building_no: '',
            address_parent_permenent_building_no_t: '',
            address_parent_permenent_hose_no: '',
            address_parent_permenent_hose_no_t: '',
            address_parent_permenent_street_name: '',
            address_parent_permenent_street_name_t: '',
            address_parent_permenent_locality: '',
            address_parent_permenent_locality_t: '',
            address_permenent_postoff: '',

            address_parent_permenent_country_val: '',
            address_parent_permenent_country_address_val: '',
            address_parent_permenent_state_val: '',
            address_parent_permenent_district_val: '',
            address_parent_permenent_mmc_val: '',
            address_parent_permenent_rural_urabn_val: '',
            address_parent_permenent_village_val: '',
            address_parent_permenent_building_no_val: '',
            address_parent_permenent_hose_no_val: '',
            address_parent_permenent_street_name_val: '',
            address_parent_permenent_locality_post_office_val: '',
            address_permenent_postoff_val: '',
        };
    }
    sameasaddress_toggleRadio(value: string): void {
        if (
            this.draft_details_array.Permanent_addressof_parents
                .address_parent_sameasaddress === value
        ) {
            this.draft_details_array.Permanent_addressof_parents.address_parent_sameasaddress =
                '';
            this.clearsameassaddress();
        } else {
            this.draft_details_array.Permanent_addressof_parents.address_parent_sameasaddress =
                value;
            if (value == 'Yes') {
                this.clearsameassaddress();
                this.draft_details_array.Permanent_addressof_parents = {
                    address_parent_sameasaddress: value,
                    address_parent_addressof:
                        this.draft_details_array.addressof_parents.addressof,
                    address_parent_permenent_country:
                        this.draft_details_array.addressof_parents.address_parent_country,
                    address_parent_permenent_country_address:
                        this.draft_details_array.addressof_parents
                            .address_parent_country_address,
                    address_parent_permenent_country_address_t:
                        this.draft_details_array.addressof_parents
                            .address_parent_country_address_t,
                    address_parent_permenent_state:
                        this.draft_details_array.addressof_parents.address_parent_state,
                    address_parent_permenent_district:
                        this.draft_details_array.addressof_parents.address_parent_district,
                    address_parent_permenent_mmc:
                        this.draft_details_array.addressof_parents.address_parent_mmc,
                    address_parent_permenent_rural_urabn:
                        this.draft_details_array.addressof_parents
                            .address_parent_rural_urabn,
                    address_parent_permenent_village:
                        this.draft_details_array.addressof_parents
                            .address_parent_Village_Town,
                    address_parent_permenent_pincode:
                        this.draft_details_array.addressof_parents.address_parent_pincode,
                    address_parent_permenent_building_no:
                        this.draft_details_array.addressof_parents
                            .address_parent_building_name,
                    address_parent_permenent_building_no_t:
                        this.draft_details_array.addressof_parents
                            .address_parent_building_name_t,
                    address_parent_permenent_hose_no:
                        this.draft_details_array.addressof_parents.address_parent_house_no,
                    address_parent_permenent_hose_no_t:
                        this.draft_details_array.addressof_parents
                            .address_parent_house_no_t,
                    address_parent_permenent_street_name:
                        this.draft_details_array.addressof_parents
                            .address_parent_street_name,
                    address_parent_permenent_street_name_t:
                        this.draft_details_array.addressof_parents
                            .address_parent_street_name_t,
                    address_parent_permenent_locality:
                        this.draft_details_array.addressof_parents
                            .address_parent_locality,
                    address_parent_permenent_locality_t:
                        this.draft_details_array.addressof_parents
                            .address_parent_locality_t,
                    address_permenent_postoff:
                        this.draft_details_array.addressof_parents.address_parent_postoff,

                    address_parent_permenent_country_val: '',
                    address_parent_permenent_country_address_val: '',
                    address_parent_permenent_state_val: '',
                    address_parent_permenent_district_val: '',
                    address_parent_permenent_mmc_val: '',
                    address_parent_permenent_rural_urabn_val: '',
                    address_parent_permenent_village_val: '',
                    address_parent_permenent_building_no_val: '',
                    address_parent_permenent_hose_no_val: '',
                    address_parent_permenent_street_name_val: '',
                    address_parent_permenent_locality_post_office_val: '',
                    address_permenent_postoff_val: '',
                };
            }
        }
    }
    clearsameassaddress() {
        this.draft_details_array.Permanent_addressof_parents = {
            address_parent_sameasaddress: '',
            address_parent_addressof: '',
            address_parent_permenent_country: '',
            address_parent_permenent_country_address: '',
            address_parent_permenent_country_address_t: '',
            address_parent_permenent_state: '',
            address_parent_permenent_district: '',
            address_parent_permenent_mmc: '',
            address_parent_permenent_rural_urabn: '',
            address_parent_permenent_village: '',
            address_parent_permenent_pincode: '',
            address_parent_permenent_building_no: '',
            address_parent_permenent_building_no_t: '',
            address_parent_permenent_hose_no: '',
            address_parent_permenent_hose_no_t: '',
            address_parent_permenent_street_name: '',
            address_parent_permenent_street_name_t: '',
            address_parent_permenent_locality: '',
            address_parent_permenent_locality_t: '',
            address_permenent_postoff: '',
            address_parent_permenent_country_val: '',
            address_parent_permenent_country_address_val: '',
            address_parent_permenent_state_val: '',
            address_parent_permenent_district_val: '',
            address_parent_permenent_mmc_val: '',
            address_parent_permenent_rural_urabn_val: '',
            address_parent_permenent_village_val: '',
            address_parent_permenent_building_no_val: '',
            address_parent_permenent_hose_no_val: '',
            address_parent_permenent_street_name_val: '',
            address_parent_permenent_locality_post_office_val: '',
            address_permenent_postoff_val: '',
        };
    }

    async validateaadhaar(aadhaar: any, inputsource: any) {
        const checknumaric = this.val.isNumber(aadhaar);
        if (aadhaar.length === 12 && checknumaric == true) {
            const isValidAadhaar = this.mid.validateVerhoeff(aadhaar);
            if (isValidAadhaar == false) {
                if (inputsource == 'childaadhaar') {
                    this.draft_details_array.childinformation.aadhaar = '';
                    this.draft_details_array.childinformation.aadhaarmask = '';
                }
                if (inputsource == 'fatheraadhaar') {
                    this.draft_details_array.fatherInformation.father_aadhhar_number = '';
                    this.draft_details_array.fatherInformation.father_aadhhar_number_mask =
                        '';
                }
                if (inputsource == 'motheraadhaar') {
                    this.draft_details_array.motherInformation.mother_aadhhar_number = '';
                    this.draft_details_array.motherInformation.mother_aadhaar_number_mask =
                        '';
                }
                if (inputsource == 'informationaadhaar') {
                    this.draft_details_array.information.Informant_aadhhar_no = '';
                    this.draft_details_array.information.Informant_aadhhar_no_mask = '';
                }
                this.alt.toasterror('Enter a 12-digit Valid Aadhaar Number.');
            }
            if (isValidAadhaar == true) {

                if (inputsource == 'childaadhaar') {
                    this.draft_details_array.childinformation.aadhaar =
                        this.draft_details_array.childinformation.aadhaarmask;
                    this.draft_details_array.childinformation.aadhaarmask =
                        this.maskinput(
                            this.draft_details_array.childinformation.aadhaarmask
                        );
                }
                if (inputsource == 'fatheraadhaar') {
                    this.draft_details_array.fatherInformation.father_aadhhar_number =
                        this.draft_details_array.fatherInformation.father_aadhhar_number_mask;
                    this.draft_details_array.fatherInformation.father_aadhhar_number_mask =
                        this.maskinput(
                            this.draft_details_array.fatherInformation
                                .father_aadhhar_number_mask
                        );

                }
                if (inputsource == 'motheraadhaar') {
                    this.draft_details_array.motherInformation.mother_aadhhar_number =
                        this.draft_details_array.motherInformation.mother_aadhaar_number_mask;
                    this.draft_details_array.motherInformation.mother_aadhaar_number_mask =
                        this.maskinput(
                            this.draft_details_array.motherInformation
                                .mother_aadhaar_number_mask
                        );
                }
                if (inputsource == 'informationaadhaar') {
                    this.draft_details_array.information.Informant_aadhhar_no =
                        this.draft_details_array.information.Informant_aadhhar_no_mask;
                    this.draft_details_array.information.Informant_aadhhar_no_mask =
                        this.maskinput(
                            this.draft_details_array.information.Informant_aadhhar_no_mask
                        );
                }

            }
            this.validateaadharchildparent(inputsource);
        } else if (aadhaar.length < 12) {
            if (inputsource == 'childaadhaar') {
                this.draft_details_array.childinformation.aadhaar = '';
                this.draft_details_array.childinformation.aadhaarmask = '';
            }
            if (inputsource == 'fatheraadhaar') {
                this.draft_details_array.fatherInformation.father_aadhhar_number = '';
                this.draft_details_array.fatherInformation.father_aadhhar_number_mask =
                    '';
            }
            if (inputsource == 'motheraadhaar') {
                this.draft_details_array.motherInformation.mother_aadhhar_number = '';
                this.draft_details_array.motherInformation.mother_aadhaar_number_mask =
                    '';
            }
            if (inputsource == 'informationaadhaar') {
                this.draft_details_array.information.Informant_aadhhar_no = '';
                this.draft_details_array.information.Informant_aadhhar_no_mask = '';
            }
            this.alt.toasterror('Enter a 12-digit Aadhaar Number.');
        } else {
            if (inputsource == 'childaadhaar') {
                this.draft_details_array.childinformation.aadhaar = '';
                this.draft_details_array.childinformation.aadhaarmask = '';
            }
            if (inputsource == 'fatheraadhaar') {
                this.draft_details_array.fatherInformation.father_aadhhar_number = '';
                this.draft_details_array.fatherInformation.father_aadhhar_number_mask =
                    '';
            }
            if (inputsource == 'motheraadhaar') {
                this.draft_details_array.motherInformation.mother_aadhhar_number = '';
                this.draft_details_array.motherInformation.mother_aadhaar_number_mask =
                    '';
            }
            if (inputsource == 'informationaadhaar') {
                this.draft_details_array.information.Informant_aadhhar_no = '';
                this.draft_details_array.information.Informant_aadhhar_no_mask = '';
            }
            this.alt.toasterror('Enter a 12-digit Aadhaar Number.');
        }
        return;
    }
    validateaadharchildparent(inputsource: any) {
        if (inputsource == 'childaadhaar') {
            if (this.draft_details_array.information.Informant_aadhhar_no == this.draft_details_array.childinformation.aadhaar && !this.val.isEmpty(this.draft_details_array.information.Informant_aadhhar_no_mask)) {
                this.draft_details_array.childinformation.aadhaarmask = '';
                this.alt.toasterror('Child Aadhaar Number and Information Aadhaar Number should not be same');
                return;
            }
            if (this.draft_details_array.childinformation.aadhaar == this.draft_details_array.fatherInformation.father_aadhhar_number && !this.val.isEmpty(this.draft_details_array.fatherInformation.father_aadhhar_number_mask)) {
                this.draft_details_array.childinformation.aadhaarmask = '';
                this.alt.toasterror('Child Aadhaar Number and Father Aadhaar Number should not be same');
                return;
            }
            if (this.draft_details_array.childinformation.aadhaar == this.draft_details_array.motherInformation.mother_aadhhar_number && !this.val.isEmpty(this.draft_details_array.motherInformation.mother_aadhaar_number_mask)) {
                this.draft_details_array.childinformation.aadhaarmask = '';
                this.alt.toasterror('Child Aadhaar Number and Mother Aadhaar Number should not be same');
                return;
            }
        }
        if (inputsource == 'fatheraadhaar') {
            if (this.draft_details_array.fatherInformation.father_aadhhar_number == this.draft_details_array.childinformation.aadhaar && !this.val.isEmpty(this.draft_details_array.childinformation.aadhaarmask)) {
                this.draft_details_array.fatherInformation.father_aadhhar_number_mask = '';
                this.alt.toasterror('Father Aadhaar Number and Child Aadhaar Number should not be same');
                return;
            }
            if (this.draft_details_array.motherInformation.mother_aadhhar_number == this.draft_details_array.fatherInformation.father_aadhhar_number && !this.val.isEmpty(this.draft_details_array.motherInformation.mother_aadhaar_number_mask)) {
                this.draft_details_array.fatherInformation.father_aadhhar_number_mask = '';
                this.alt.toasterror('Father Aadhaar Number and Mother Aadhaar Number should not be same');
                return;
            }
            if (this.draft_details_array.information.Informant_aadhhar_no == this.draft_details_array.fatherInformation.father_aadhhar_number && !this.val.isEmpty(this.draft_details_array.information.Informant_aadhhar_no_mask)) {
                this.draft_details_array.fatherInformation.father_aadhhar_number_mask = '';
                this.alt.toasterror('Father Aadhaar Number and Information Aadhaar Number should not be same');
                return;
            }
        }
        if (inputsource == 'motheraadhaar') {
            if (this.draft_details_array.motherInformation.mother_aadhhar_number == this.draft_details_array.childinformation.aadhaar && !this.val.isEmpty(this.draft_details_array.childinformation.aadhaarmask)) {
                this.draft_details_array.motherInformation.mother_aadhaar_number_mask = '';
                this.alt.toasterror('Mother Aadhaar Number and Child Aadhaar Number should not be same');
                return;
            }
            if (this.draft_details_array.motherInformation.mother_aadhhar_number == this.draft_details_array.fatherInformation.father_aadhhar_number && !this.val.isEmpty(this.draft_details_array.fatherInformation.father_aadhhar_number_mask)) {
                this.draft_details_array.motherInformation.mother_aadhaar_number_mask = '';
                this.alt.toasterror('Mother Aadhaar Number and Father Aadhaar Number should not be same');
                return;
            }
            if (this.draft_details_array.information.Informant_aadhhar_no == this.draft_details_array.motherInformation.mother_aadhhar_number && !this.val.isEmpty(this.draft_details_array.motherInformation.mother_aadhaar_number_mask)) {
                this.draft_details_array.motherInformation.mother_aadhaar_number_mask = '';
                this.alt.toasterror('Mother Aadhaar Number and Information Aadhaar Number should not be same');
                return;
            }
        }
        if (inputsource == 'informationaadhaar') {
            if (this.draft_details_array.information.Informant_aadhhar_no == this.draft_details_array.childinformation.aadhaar && !this.val.isEmpty(this.draft_details_array.childinformation.aadhaarmask)) {
                this.draft_details_array.information.Informant_aadhhar_no_mask = '';
                this.alt.toasterror('Information Aadhaar Number and Child Aadhaar Number should not be same');
                return;
            }
            if (this.draft_details_array.information.Informant_aadhhar_no == this.draft_details_array.fatherInformation.father_aadhhar_number && !this.val.isEmpty(this.draft_details_array.fatherInformation.father_aadhhar_number_mask)) {
                this.draft_details_array.information.Informant_aadhhar_no_mask = '';
                this.alt.toasterror('Information Aadhaar Number and Father Aadhaar Number should not be same');
                return;
            }
            if (this.draft_details_array.information.Informant_aadhhar_no == this.draft_details_array.motherInformation.mother_aadhhar_number && !this.val.isEmpty(this.draft_details_array.motherInformation.mother_aadhaar_number_mask)) {
                this.draft_details_array.information.Informant_aadhhar_no_mask = '';
                this.alt.toasterror('Information Aadhaar Number and Mother Aadhaar Number should not be same');
                return;
            }
        }

    }
    async changeaadhaarmode() {
        this.draft_details_array.childinformation.aadhaar = '';
        this.draft_details_array.childinformation.aadhaarmask = '';
    }
    maskinput(objinput: string) {
        const maskedAadhaar = objinput.replace(/\d(?=\d{4})/g, '*');
        return maskedAadhaar !== '' ? maskedAadhaar : '';
    }

    combinedData: any;
    openTab(tabId: string): void {
        // Find the tab button and content to activate
        const tabButton = document.getElementById(tabId);
        const tabContentId = tabButton?.getAttribute('data-bs-target');
        const tabContent = tabContentId
            ? document.querySelector(tabContentId)
            : null;

        if (tabButton && tabContent) {
            // Remove active state from all tabs and contents
            const allTabs = document.querySelectorAll('.nav-link');
            const allContents = document.querySelectorAll('.tab-pane');
            allTabs.forEach((tab) => tab.classList.remove('active'));
            allContents.forEach((content) =>
                content.classList.remove('show', 'active')
            );

            tabButton.classList.add('active');
            tabContent.classList.add('show', 'active');

            if (tabId == 'pills-statistical-tab') {
                this.StatisticalInformationservice();
            }
            if (tabId == 'pills-confirmlegal-tab') {
                this.StatisticalInformationservice();
            }
        }
    }
    isLegalEnabled: boolean = true; // Enable the first tab by default
    isStatisticalEnabled: boolean = false;
    isConfirmLegalEnabled: boolean = false;
    isConfirmStatisticalEnabled: boolean = false;
    enableLegalTab() {
        this.mother_Aadharno_status = false;
        this.father_Aadharno_status = false;
        this.child_Aadharno_status = false;
        this.child_name_status = false;
        this.father_mother_check_status = false;
        this.father_check_status = false;
        this.mother_check_status = false;
        this.isLegalEnabled = true;
        this.isStatisticalEnabled = false;
        this.openTab('pills-legal-tab');
    }
    enableStatisticalTab() {
        this.applicationsubmittype = "Legal";
        this.legal_from_check_inpts();
    }
    savedraftclick() {
        if (this.isLegalEnabled) {
            this.applicationsubmittype = "Legal-Draft";
            this.legal_from_check_inpts();
        }
        if (this.isStatisticalEnabled) {
            this.applicationsubmittype = "Statistical-Draft";
            this.statistical_from_check_inpts();
        }

    }

    enableConfirmLegalTab() {
        this.applicationsubmittype = "Statistical";
        this.statistical_from_check_inpts();
    }

    enableConfirmStatisticalTab() {
        this.openTab('pills-confirmstatistic-tab');
        this.isConfirmStatisticalEnabled = true;
        this.spinner.hide();
    }
    @ViewChild('dateofbirth') dateofbirth!: NgModel;
    @ViewChild('dateofreport') dateofreport!: NgModel;
    @ViewChild('ngConfirmDateBirth') ngConfirmDateBirth!: NgModel;
    @ViewChild('ngfullname') ngfullname!: NgModel;
    @ViewChild('ngConfirm_fullname') ngConfirm_fullname!: NgModel;
    @ViewChild('sel_gender') sel_gender!: NgModel;
    @ViewChild('Place_of_birth') Place_of_birth!: NgModel;
    @ViewChild('ngHospitalName') ngHospitalName!: NgModel;
    @ViewChild('Place_of_birth_state') Place_of_birth_state!: NgModel;
    @ViewChild('Place_of_birth_district') Place_of_birth_district!: NgModel;
    @ViewChild('Place_of_birth_sub_district') Place_of_birth_sub_district!: NgModel;
    @ViewChild('place_of_birth_mmc') place_of_birth_mmc!: NgModel;
    @ViewChild('foc_fullname', { static: false }) foc_fullname!: ElementRef;
    @ViewChild('foc_confirm_fullname', { static: false }) foc_confirm_fullname!: ElementRef;
    @ViewChild('foc_confirm_DateBirth', { static: false }) foc_confirm_DateBirth!: ElementRef;
    @ViewChild('informant_fullname') informant_fullname!: NgModel;
    @ViewChild('informant_address') informant_address!: NgModel;
    proceedingfileSelected: boolean = false;
    proceedingfileError: boolean = false;

    legal_from_check_inpts() {

        let isInvalid = false;
        if (this.dateofbirth) {
            this.dateofbirth.control.markAsTouched();
            this.dateofbirth.control.updateValueAndValidity();
            if (this.dateofbirth.invalid) isInvalid = true;
        }
        if (this.dateofreport) {
            this.dateofreport.control.markAsTouched();
            this.dateofreport.control.updateValueAndValidity();
            if (this.dateofreport.invalid) isInvalid = true;
        }
        if (this.ngConfirmDateBirth) {
            this.ngConfirmDateBirth.control.markAsTouched();
            this.ngConfirmDateBirth.control.updateValueAndValidity();
            if (this.ngConfirmDateBirth.invalid) isInvalid = true;
        }
        if (this.sel_gender) {
            this.sel_gender.control.markAsTouched();
            this.sel_gender.control.updateValueAndValidity();
            if (this.sel_gender.invalid) isInvalid = true;
        }

        if (this.Place_of_birth) {
            this.Place_of_birth.control.markAsTouched();
            this.Place_of_birth.control.updateValueAndValidity();
            if (this.Place_of_birth.invalid) isInvalid = true;
        }
        if (
            this.ngHospitalName &&
            this.draft_details_array.placeofbirth.place_of_birth == '1'
        ) {
            this.ngHospitalName.control.markAsTouched();
            this.ngHospitalName.control.updateValueAndValidity();
            if (this.ngHospitalName.invalid) isInvalid = true;
        }
        if (
            this.Place_of_birth_state &&
            this.draft_details_array.placeofbirth.place_of_birth != '1'
        ) {
            this.Place_of_birth_state.control.markAsTouched();
            this.Place_of_birth_state.control.updateValueAndValidity();
            if (this.Place_of_birth_state.invalid) isInvalid = true;
        }
        if (
            this.Place_of_birth_district &&
            this.draft_details_array.placeofbirth.place_of_birth != '1'
        ) {
            this.Place_of_birth_district.control.markAsTouched();
            this.Place_of_birth_district.control.updateValueAndValidity();
            if (this.Place_of_birth_district.invalid) isInvalid = true;
        }
        if (
            this.Place_of_birth_sub_district &&
            this.draft_details_array.placeofbirth.place_of_birth != '1'
        ) {
            this.Place_of_birth_sub_district.control.markAsTouched();
            this.Place_of_birth_sub_district.control.updateValueAndValidity();
            if (this.Place_of_birth_sub_district.invalid) isInvalid = true;
        }
        if (
            this.place_of_birth_mmc &&
            this.draft_details_array.placeofbirth.place_of_birth != '1'
        ) {
            this.place_of_birth_mmc.control.markAsTouched();
            this.place_of_birth_mmc.control.updateValueAndValidity();
            if (this.place_of_birth_mmc.invalid) isInvalid = true;
        }
        if (this.informant_fullname) {
            this.informant_fullname.control.markAsTouched();
            this.informant_fullname.control.updateValueAndValidity();
            if (this.informant_fullname.invalid) isInvalid = true;
        }
        if (this.informant_address) {
            this.informant_address.control.markAsTouched();
            this.informant_address.control.updateValueAndValidity();
            if (this.informant_address.invalid) isInvalid = true;
        }
        if (this.birthvalidate && !this.proceedingfileSelected) {
            this.proceedingfileError = true;
            isInvalid = true;
        }
        if (isInvalid) {
            this.form_alert();
        }
        if (!isInvalid) {
            if (
                this.draft_details_array.childinformation.dateofbirth !=
                this.draft_details_array.childinformation.confirmdateofbirth
            ) {
                this.dateofbirth.control.markAsTouched();
                this.dateofbirth.control.updateValueAndValidity();
                this.ngConfirmDateBirth.control.markAsTouched();
                this.ngConfirmDateBirth.control.updateValueAndValidity();
                this.dateofbirth.control.setErrors({ mismatch: true });
                this.ngConfirmDateBirth.control.setErrors({ mismatch: true });
                this.foc_confirm_DateBirth.nativeElement.focus();
                this.alt.toasterror('Child Date of birth and Confim Date of birth Missmach')
            }
            else if (
                this.draft_details_array.childinformation.fullname.toUpperCase() !=
                this.draft_details_array.childinformation.confirm_fullname.toUpperCase()
            ) {
                this.ngfullname.control.markAsTouched();
                this.ngfullname.control.updateValueAndValidity();
                this.ngConfirm_fullname.control.markAsTouched();
                this.ngConfirm_fullname.control.updateValueAndValidity();
                this.ngfullname.control.setErrors({ mismatch: true });
                this.ngConfirm_fullname.control.setErrors({ mismatch: true });
                this.foc_confirm_fullname.nativeElement.focus();
                this.alt.toasterror('Child First Name and Confim Name Missmach')
            }
            else {

                this.legal_checkAndShowAlert();

            }
        }
    }

    documentInserted: boolean = false;
    
    mother_Aadharno_status = false;
    father_Aadharno_status = false;
    child_Aadharno_status = false;
    child_name_status = false;
    father_mother_check_status = false;
    father_check_status = false;
    mother_check_status = false;
    legal_checkAndShowAlert() {
        
        if (this.val.isEmpty(this.draft_details_array.fatherInformation.father_aadhhar_number_mask) && !this.father_Aadharno_status) {
            this.swalform_alert("Do you want to continue without Father's Aadhar Number?మీరు తండ్రి ఆధార్ నంబర్ లేకుండా కొనసాగించాలనుకుంటున్నారా?", "fatheraadharno")
        }
        if (!this.val.isEmpty(this.draft_details_array.fatherInformation.father_aadhhar_number_mask)) {
            this.father_Aadharno_status = true;
        }
        if (this.val.isEmpty(this.draft_details_array.motherInformation.mother_aadhaar_number_mask) && !this.mother_Aadharno_status) {
            this.swalform_alert("Do you want to continue without Mother's Aadhar Number?మీరు తల్లి ఆధార్ నంబర్ లేకుండా కొనసాగించాలనుకుంటున్నారా?", "motheraadharno")
        }
        if (!this.val.isEmpty(this.draft_details_array.motherInformation.mother_aadhaar_number_mask)) {
            this.mother_Aadharno_status = true;
        }
        if (this.val.isEmpty(this.draft_details_array.childinformation.aadhaarmask) && !this.child_Aadharno_status) {
            this.swalform_alert("Do you want to continue without Child's Aadhar Number?మీరు పిల్లల ఆధార్ నంబర్ లేకుండా కొనసాగించాలనుకుంటున్నారా?", "childaadharno")
        }
        if (!this.val.isEmpty(this.draft_details_array.childinformation.aadhaarmask)) {
            this.child_Aadharno_status = true;
        }
        if (this.val.isEmpty(this.draft_details_array.childinformation.fullname) && !this.child_name_status) {
            this.swalform_alert("Do you want to continue without Child's Name?మీరు బిడ్డ పేరు లేకుండానే కొనసాగించదలచుకున్నారా?", "childname")
        }
        if (!this.val.isEmpty(this.draft_details_array.childinformation.fullname)) {
            this.child_name_status = true;
        }
        if (this.val.isEmpty(this.draft_details_array.fatherInformation.father_full_namer) && this.val.isEmpty(this.draft_details_array.motherInformation.mother_full_namer) && !this.father_mother_check_status) {
            this.swalform_alert("Do you want to keep the information of mother and father blank? మీరు తల్లి మరియు తండ్రి సమాచారము ఖాళీగా ఉంచదలచుకున్నారా?", "mother_father");
        }
        if (!this.val.isEmpty(this.draft_details_array.fatherInformation.father_full_namer) || !this.val.isEmpty(this.draft_details_array.motherInformation.mother_full_namer)) {
            this.father_mother_check_status = true;
        }
        if (this.val.isEmpty(this.draft_details_array.fatherInformation.father_full_namer) && !this.father_check_status) {
            this.swalform_alert("Do you want to keep the information of father blank? మీరు తండ్రి సమాచారము ఖాళీగా ఉంచదలచుకున్నారా?", "father");
        }
        if (!this.val.isEmpty(this.draft_details_array.fatherInformation.father_full_namer)) {
            this.father_check_status = true;
        }
        if (this.val.isEmpty(this.draft_details_array.motherInformation.mother_full_namer) && !this.mother_check_status) {
            this.swalform_alert("Do you want to keep the information of mother blank? మీరు తల్లి సమాచారము ఖాళీగా ఉంచదలచుకున్నారా?", "mother");
        }
        if (!this.val.isEmpty(this.draft_details_array.motherInformation.mother_full_namer)) {
            this.mother_check_status = true;
        }

        
        if (this.mother_check_status && this.father_check_status && this.father_mother_check_status && this.child_name_status && this.child_Aadharno_status && this.mother_Aadharno_status && this.father_Aadharno_status) {
            this.isStatisticalEnabled = true; 

            if(this.NAC_application_Id != undefined && this.NAC_application_Id != null && this.NAC_application_Id != ''){
                if (this.proceedphotoselectedFiles.length === 0) {
                    this.documentInserted = false; // reset flag when no files
                  }
                if (this.proceedphotoselectedFiles.length > 0 && !this.documentInserted) {
                    this.documentinsert();
                    this.documentInserted = true; 
                }  
            } 
            this.getdraftinsert();
            this.openTab('pills-statistical-tab');
            this.get_document_details(); 
        }
        this.spinner.hide();
    }
   
    applicationsubmittype = "Legal";
    swalform_alert(alertmsg: any, type: any) {
        Swal.fire({
            title: 'Please Confirm !దయచేసి నిర్ధారించండి !',
            text: alertmsg,
            showCancelButton: true,
            cancelButtonText: 'Cancel',
            confirmButtonText: 'Confirm',
        }).then((result) => {
            
            if (result.isConfirmed) {
                if (type == "mother") {
                    this.mother_check_status = true;
                } else if (type == "father") {
                    this.father_check_status = true;
                } else if (type == "mother_father") {
                    this.father_mother_check_status = true;
                } else if (type == "childname") {
                    this.child_name_status = true;
                } else if (type == "childaadharno") {
                    this.child_Aadharno_status = true;
                } else if (type == "fatheraadharno") {
                    this.father_Aadharno_status = true;
                } else if (type == "motheraadharno") {
                    this.mother_Aadharno_status = true;
                }
                this.legal_checkAndShowAlert();
            }
        });
    }

    form_alert() {
        Swal.fire({
            title:
                '<span style="color: red;">Invalid form submission ! సమర్పించిన ఫారము చెల్లనిది!</span>',
            html: '<span style="color: red;">Please fill all the required fields / దయచేసి అవసరమైన అన్ని ఫీల్డ్ లను పూరించండి</span>',
            confirmButtonText: 'Close',
            customClass: {
                confirmButton: 'red-button',
            },
        });
    }

    convertToDate(dateStr: string): Date {
        const parts = dateStr.split('-');
        const day = +parts[0];
        const month = +parts[1] - 1;
        const year = +parts[2];
        return new Date(year, month, day);
    }
    transform_date(value: string): string {
        if (!value) return '';
        const parts = value.split('-');
        const day = parts[0];
        const month = parts[1];
        const year = parts[2];
        return `${year}-${month}-${day}`;
    }

    @ViewChild('Permenent_state') Permenent_state!: NgModel;
    @ViewChild('Permenent_district') Permenent_district!: NgModel;
    @ViewChild('permenent_Mmc') permenent_Mmc!: NgModel;
    @ViewChild('Permenent_sub_district') Permenent_sub_district!: NgModel;
    @ViewChild('Permenent_Village') Permenent_Village!: NgModel;
    @ViewChild('Age_of_the_mother') Age_of_the_mother!: NgModel;
    @ViewChild('Age__birth_time_') Age__birth_time_!: NgModel;
    @ViewChild('Number_of_children') Number_of_children!: NgModel;
    @ViewChild('Type_of_attention') Type_of_attention!: NgModel;
    @ViewChild('Method_of_delivery') Method_of_delivery!: NgModel;
    @ViewChild('Birth_weight') Birth_weight!: NgModel;
    @ViewChild('Duration_of_pregency') Duration_of_pregency!: NgModel;
    @ViewChild('ngSupportingDocuments') ngSupportingDocuments!: NgModel;
    @ViewChild('proceedngSupportingDocuments') proceedngSupportingDocuments!: NgModel;
    @ViewChild('ngmultiSupportingDocuments') ngmultiSupportingDocuments!: NgModel;
    fileSelected: boolean = false;
    fileError: boolean = false;
    multifileSelected: boolean = false;
    multifileError: boolean = false;
    statistical_from_check_inpts() {
        debugger
        let isInvalid = false;
        if (this.Permenent_state) {
            this.Permenent_state.control.markAsTouched();
            this.Permenent_state.control.updateValueAndValidity();
            if (this.Permenent_state.invalid) isInvalid = true;
        }
        if (this.Permenent_district) {
            this.Permenent_district.control.markAsTouched();
            this.Permenent_district.control.updateValueAndValidity();
            if (this.Permenent_district.invalid) isInvalid = true;
        }
        if (this.permenent_Mmc) {
            this.permenent_Mmc.control.markAsTouched();
            this.permenent_Mmc.control.updateValueAndValidity();
            if (this.permenent_Mmc.invalid) isInvalid = true;
        }
        if (this.Permenent_sub_district) {
            this.Permenent_sub_district.control.markAsTouched();
            this.Permenent_sub_district.control.updateValueAndValidity();
            if (this.Permenent_sub_district.invalid) isInvalid = true;
        }

        if (this.Permenent_Village) {
            this.Permenent_Village.control.markAsTouched();
            this.Permenent_Village.control.updateValueAndValidity();
            if (this.Permenent_Village.invalid) isInvalid = true;
        }
        if (this.Age_of_the_mother) {
            this.Age_of_the_mother.control.markAsTouched();
            this.Age_of_the_mother.control.updateValueAndValidity();
            if (this.Age_of_the_mother.invalid) isInvalid = true;
        }
        if (this.Age__birth_time_) {
            this.Age__birth_time_.control.markAsTouched();
            this.Age__birth_time_.control.updateValueAndValidity();
            if (this.Age__birth_time_.invalid) isInvalid = true;
        }
        if (this.Number_of_children) {
            this.Number_of_children.control.markAsTouched();
            this.Number_of_children.control.updateValueAndValidity();
            if (this.Number_of_children.invalid) isInvalid = true;
        }
        if (this.Type_of_attention) {
            this.Type_of_attention.control.markAsTouched();
            this.Type_of_attention.control.updateValueAndValidity();
            if (this.Type_of_attention.invalid) isInvalid = true;
        }
        if (this.Method_of_delivery) {
            this.Method_of_delivery.control.markAsTouched();
            this.Method_of_delivery.control.updateValueAndValidity();
            if (this.Method_of_delivery.invalid) isInvalid = true;
        }
        if (this.Birth_weight) {
            this.Birth_weight.control.markAsTouched();
            this.Birth_weight.control.updateValueAndValidity();
            if (this.Birth_weight.invalid) isInvalid = true;
        }
        if (this.Duration_of_pregency) {
            this.Duration_of_pregency.control.markAsTouched();
            this.Duration_of_pregency.control.updateValueAndValidity();
            if (this.Duration_of_pregency.invalid) isInvalid = true;
        }
        if (this.documentlist.length == 0) {
            this.ngSupportingDocuments.control.markAsTouched();
            this.ngSupportingDocuments.control.updateValueAndValidity();
            if (this.ngSupportingDocuments.invalid) isInvalid = true;
        }
        if (this.documentlist.length == 0) {
            this.ngmultiSupportingDocuments.control.markAsTouched();
            this.ngmultiSupportingDocuments.control.updateValueAndValidity();
            if (this.ngmultiSupportingDocuments.invalid) isInvalid = true;
        }
        if (!this.fileSelected) {
            this.fileError = true;
            isInvalid = true;
        }
        if (!this.multifileSelected) {
            this.multifileError = true;
            isInvalid = true;
        } 

        if (isInvalid) {
            this.form_alert();
        }
        if (!isInvalid) {
            this.isConfirmLegalEnabled = true;
            if (this.photoselectedFiles.length > 0) {
                this.documentinsert();
            }
            for (let index = 0; index < this.multiphotoselectedFiles.length; index++) {
                const element = this.multiphotoselectedFiles[index];
                if (this.multiphotoselectedFiles.length > 0) {
                    this.multidocumentinsert(this.documnets[index]);
                }
            }
            this.getdraftinsert();
            this.openTab('pills-confirmlegal-tab');
            this.get_document_details(); 
        }
        this.spinner.hide();
    }

    Ageofthemothercheck() {

        if (this.draft_details_array.legal.age_of_the_mother_birth_time != '' && this.draft_details_array.legal.age_of_the_mother != '') {
            const birthTimeAge = parseInt(this.draft_details_array.legal.age_of_the_mother_birth_time);
            const motherAge = parseInt(this.draft_details_array.legal.age_of_the_mother);

            if (motherAge > birthTimeAge) {
                this.draft_details_array.legal.age_of_the_mother_birth_time = '';
                this.alt.toasterror(
                    'Age of the mother at the time of this birth cannot be greater than the Age of the mother at the time of marriage'
                );
            } else {
                if (this.Age__birth_time_) {
                    this.Age__birth_time_.control.setErrors(null);
                    this.Age__birth_time_.control.updateValueAndValidity();
                }
            }
        }
        else {
            this.draft_details_array.legal.age_of_the_mother_birth_time = '';
        }


        if (parseInt(this.draft_details_array.legal.age_of_the_mother) < 18) {
            this.draft_details_array.legal.age_of_the_mother = '';
            this.alt.toasterror('Age of the mother (in completed years) at the time of marriage should be above 18 or more');
        }


    }
    Numberofchildrencheck() {
        if (parseInt(this.draft_details_array.legal.number_of_children) > 8) {
            this.draft_details_array.legal.number_of_children = '';
            this.alt.toasterror('Number of children born alive to the mother');
        } else if (
            parseInt(this.draft_details_array.legal.number_of_children) == 0
        ) {
            this.draft_details_array.legal.number_of_children = '';
            this.alt.toasterror('Number of children born alive to the mother');
        }
    }
    Birthweightcheck() {
        if (parseInt(this.draft_details_array.legal.birth_weight) > 8) {
            this.draft_details_array.legal.birth_weight = '';
            this.alt.toasterror('Birth weight should be less than or equal to 8 Kg');
        } else if (parseInt(this.draft_details_array.legal.birth_weight) == 0) {
            this.draft_details_array.legal.birth_weight = '';
            this.alt.toasterror('Birth weight should be less than or equal to 8 Kg');
        }
    }
    DurationofPregnancycheck() {
        if (parseInt(this.draft_details_array.legal.duration_of_pregency) > 44) {
            this.draft_details_array.legal.duration_of_pregency = '';
            this.alt.toasterror('Duration of Pregnancy should be less than 44 weeks');
        } else if (
            parseInt(this.draft_details_array.legal.duration_of_pregency) == 0
        ) {
            this.draft_details_array.legal.duration_of_pregency = '';
            this.alt.toasterror('Duration of Pregnancy should be less than 44 weeks');
        }

        if (parseInt(this.draft_details_array.legal.duration_of_pregency) < 30) {
            this.draft_details_array.legal.duration_of_pregency = '';
            this.alt.toasterror('Duration of Pregnancy should be more than 30 weeks');
        }
    }
    keyPressAlpha(event: { keyCode: number; preventDefault: () => void }) {
        var inp = String.fromCharCode(event.keyCode);

        if (/[a-zA-Z ]/.test(inp)) {
            return true;
        } else {
            event.preventDefault();
            return false;
        }
    }
    disabletypeattention: boolean = false;
    async backwindowdraftbinding(obj: any) {
        
        this.getHospital();
        this.PlaceofBirthchange();
        this.draft_details_array = obj;

        if (this.draft_details_array.language.dateofreport == null || this.draft_details_array.language.dateofreport == "" || this.draft_details_array.language.dateofreport == undefined) {
            this.draft_details_array.language.dateofreport = this.datepipe.transform(new Date(), 'dd-MM-yyyy');
        }
        if (this.draft_details_array.addressof_parents.addressof == null || this.draft_details_array.addressof_parents.addressof == "" || this.draft_details_array.addressof_parents.addressof == undefined) {
            this.draft_details_array.addressof_parents.addressof = 'inside';
        }
        let childnamevaluedb: any
        childnamevaluedb = this.draft_details_array.childinformation.childnotnamed;
        if (childnamevaluedb == 'false' || childnamevaluedb == "" || childnamevaluedb == null || childnamevaluedb == undefined) {
            this.draft_details_array.childinformation.childnotnamed = false;
        }
        this.birthinfohide = false;
        if (this.draft_details_array.placeofbirth.place_of_birth == "1") {
            this.birthinfohide = true;
        }
        this.disabable = false;
        if (this.obj[0].HOSPITAL_ID != "" && this.UROLE == '108') {
            this.draft_details_array.placeofbirth.place_of_birth = this.PlaceofBirth_master_array.find(e => e.BDPLACE_CODE == 1).BDPLACE_CODE;
            this.draft_details_array.placeofbirth.place_of_birth_hospital = this.obj[0].HOSPITAL_ID;
            this.get_SupportingDocuments();
            if (this.draft_details_array.information.Informant_fullname == '' || this.draft_details_array.information.Informant_fullname == undefined || this.draft_details_array.information.Informant_fullname == null) {
                this.draft_details_array.information.Informant_fullname = this.obj[0].UDPNAME;
                this.Teluglanguageconvrt(this.draft_details_array.information.Informant_fullname, 'Informant_fullname')
            }
            if (this.draft_details_array.information.Informant_mobile_no == '' || this.draft_details_array.information.Informant_mobile_no == undefined || this.draft_details_array.information.Informant_mobile_no == null) {
                this.draft_details_array.information.Informant_mobile_no = this.obj[0].UMOBILE;
            }
            if (this.draft_details_array.information.Informant_address == '' || this.draft_details_array.information.Informant_address == undefined || this.draft_details_array.information.Informant_address == null) {
                this.draft_details_array.information.Informant_address = this.obj[0].RU_ADDRESS;
                this.Teluglanguageconvrt(this.draft_details_array.information.Informant_address, 'Informant_address');
            }
            this.disabable = true;
            this.birthinfohide = true;
        }
        // this.dateofreportdesiable = false;
        // if (this.UROLE == '105' || this.UROLE == '112' || this.UROLE == '111' || this.UROLE == '1007') {
        //     this.dateofreportdesiable = true;
        // }
        this.draft_details_array.childinformation.confirmdateofbirth = this.draft_details_array.childinformation.dateofbirth;
        this.get_SupportingDocuments();

        let diffdate = this.calculateyesrDiff(this.draft_details_array.childinformation.dateofbirth);
        debugger
        if (diffdate > 365) {
            this.birthvalidate = true;
        }
    }

    async loadalldropdowns() {
        if (this.draft_details_array.addressof_parents.address_parent_state != '') {
            await this.getdistrict('Addressofparents');
        }
        if (this.draft_details_array.addressof_parents.address_parent_state != '' && this.draft_details_array.addressof_parents.address_parent_district != '' && this.draft_details_array.addressof_parents.address_parent_rural_urabn != '') {
            await this.MandalMuncipality('Addressofparents');
        }
        if (this.draft_details_array.addressof_parents.address_parent_state != '' && this.draft_details_array.addressof_parents.address_parent_district != '' && this.draft_details_array.addressof_parents.address_parent_rural_urabn != '' && this.draft_details_array.addressof_parents.address_parent_mmc != '') {
            await this.VillageWard('Addressofparents');
        }
        if (this.draft_details_array.Permanent_addressof_parents.address_parent_permenent_state != '') {
            await this.getdistrict('PermanentAddressofparents');
        }
        if (this.draft_details_array.Permanent_addressof_parents.address_parent_permenent_state != '' && this.draft_details_array.Permanent_addressof_parents.address_parent_permenent_district != '' && this.draft_details_array.Permanent_addressof_parents.address_parent_permenent_rural_urabn != '') {
            await this.MandalMuncipality('PermanentAddressofparents');
        }
        if (this.draft_details_array.Permanent_addressof_parents.address_parent_permenent_state != '' && this.draft_details_array.Permanent_addressof_parents.address_parent_permenent_district != '' && this.draft_details_array.Permanent_addressof_parents.address_parent_permenent_rural_urabn != '' && this.draft_details_array.Permanent_addressof_parents.address_parent_permenent_mmc != '') {
            await this.VillageWard('PermanentAddressofparents');
        }
        if (this.draft_details_array.placeofbirth.place_of_birth != "1") {
            if (this.draft_details_array.placeofbirth.place_of_birth_state != '') {
                await this.getdistrict('placeofbirth');
            }
            if (this.draft_details_array.placeofbirth.place_of_birth_state != '' && this.draft_details_array.placeofbirth.place_of_birth_district != '' && this.draft_details_array.placeofbirth.place_of_birth_rural_urabn != '') {
                await this.MandalMuncipality('placeofbirth');
            }
            if (this.draft_details_array.placeofbirth.place_of_birth_state != '' && this.draft_details_array.placeofbirth.place_of_birth_district != '' && this.draft_details_array.placeofbirth.place_of_birth_rural_urabn != '' && this.draft_details_array.placeofbirth.place_of_birth_mmc != '') {
                await this.VillageWard('placeofbirth');
            }
        }
        if (this.draft_details_array.legal.mother_residence_state != '') {
            await this.getdistrict('staticstical');
        }
        if (this.draft_details_array.legal.mother_residence_state != '' && this.draft_details_array.legal.mother_residence_district != '' && this.draft_details_array.legal.mother_residence_rural_urban != '') {
            await this.MandalMuncipality('staticstical');
        }
        if (this.draft_details_array.legal.mother_residence_state != '' && this.draft_details_array.legal.mother_residence_district != '' && this.draft_details_array.legal.mother_residence_rural_urban != '' && this.draft_details_array.legal.mother_residence_Mmc != '') {
            await this.VillageWard('staticstical');
        }
    }

    displaymodal = 'none';
    ModalCLose() {
        this.displaymodal = 'none';
    }
    ModalOpen() {

        this.displaymodal = 'block';
    }
    PathReportString: any; isModalVisible: boolean = false;
    async downloadorder() {
        try {

            const req = new basemodel();
            req.type = '1022';
            req.param1 = this.brapplicationid
            req.param4 = 'birthack';
            let responce: any = await this.auth.pdf_download(req);
            this.spinner.show();

            if (responce.code) {
                this.spinner.hide();
                if (responce.url) {
                    this.PathReportString = 'data:application/pdf;base64,' + (this.sanitizer.bypassSecurityTrustResourceUrl(responce.url) as any).changingThisBreaksApplicationSecurity;
                    this.isModalVisible = true;
                }

            } else {
                this.spinner.hide();
                this.alt.toasterror("Not Found Acknowledgement" + responce.message);
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
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
            link.download = this.brapplicationid + 'ACK.pdf'; // Default file name
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
    closeModal() {
        this.isModalVisible = false;
        setTimeout(() => {
            window.location.reload();
        }, 1000);
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

    timeInvalid: boolean = false;

    // validateTime(selectedTime: string): void {  
    //     // Get current date and time
    //     const currentDate = new Date();

    //     // Check if selected date is today
    //     const selectedDate = new Date(this.draft_details_array.childinformation.dateofbirth);
    //     if (selectedDate.setHours(0,0,0,0) === currentDate.setHours(0,0,0,0)) {
    //       // Extract the selected hour and minute from the input
    //       const [selectedHour, selectedMinute] = selectedTime.split(':').map(Number);

    //       // Compare selected time with current time
    //       if (selectedHour > currentDate.getHours() || 
    //           (selectedHour === currentDate.getHours() && selectedMinute > currentDate.getMinutes())) {
    //         // Invalid time, it's in the future
    //         this.timeInvalid = true;
    //       } else {
    //         // Valid time
    //         this.timeInvalid = false;
    //       }
    //     } else {
    //       // Reset the timeInvalid flag if not today
    //       this.timeInvalid = false;
    //       this.alt.toasterror('Selected time cannot be in the future.');
    //       this.draft_details_array.childinformation.birttime = "";
    //     }
    //   }

    validateTime(selectedTime: string): void {
        // Get current date and time
        const currentDate = new Date();

        // Convert dateofbirth (dd-mm-yyyy) string to a Date object
        const dateString = this.draft_details_array.childinformation.dateofbirth; // Format: 'dd-mm-yyyy'
        const [day, month, year] = dateString.split('-').map(Number); // Split into day, month, year

        // Create a Date object using the parsed day, month, and year
        const selectedDate = new Date(year, month - 1, day); // month is 0-indexed in JavaScript Date

        // Check if selected date is today
        if (selectedDate.setHours(0, 0, 0, 0) === currentDate.setHours(0, 0, 0, 0)) {
            // Extract the selected hour and minute from the input
            const [selectedHour, selectedMinute] = selectedTime.split(':').map(Number);

            // Compare selected time with current time
            if (selectedHour > currentDate.getHours() ||
                (selectedHour === currentDate.getHours() && selectedMinute > currentDate.getMinutes())) {
                // Invalid time, it's in the future
                this.timeInvalid = true;
            } else {
                // Valid time
                this.timeInvalid = false;
            }
        } else {
            // Reset the timeInvalid flag if not today
            this.timeInvalid = false;
            this.alt.toasterror('Selected time cannot be in the future.');
            this.draft_details_array.childinformation.birttime = "";
        }
    }

    deletePreview(index: number): void {
        // Revoke the object URL to avoid memory leaks
        const toRemove = this.photoPreviews[index];
        if (toRemove?.url && typeof toRemove.url === 'string') {
          URL.revokeObjectURL(toRemove.url);
        }
        (document.getElementById('UploadDocument') as HTMLInputElement).value = '';
        this.photoPreviews.splice(index, 1);
        this.photoselectedFiles.splice(index, 1);
      }

}
