import { HttpClient } from '@angular/common/http';
import {
    Component,
    ElementRef,
    Inject,
    Input,
    OnInit,
    Renderer2,
    ViewChild,
} from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { NgxSpinnerService } from 'ngx-spinner';
import { MiddlewareService } from 'src/app/services/middleware_lyr/middleware.service';
import { AlertsService } from 'src/app/services/alert_lyr/alerts.service';
import { PrivateService } from 'src/app/services/api_lyr/private/private.service';
import { basemodel } from 'src/app/thirparty/model/apimodel';
import { DOCUMENT, DatePipe } from '@angular/common';
import { GeolocationService } from 'src/app/services/geolocation.service';
import { AuthserService } from 'src/app/services/api_lyr/private/authser.service';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TimepickerConfig } from 'ngx-bootstrap/timepicker';
import { InputvalidaionService } from 'src/app/thirparty/validation/inputvalidaion.service';
import { EncDecService } from 'src/app/services/enc_dec_lyr/enc-dec.service';
import { Router } from '@angular/router';
import { NgModel } from '@angular/forms';
import Swal from 'sweetalert2';
import { LoggerService } from 'src/app/services/logger.service';
declare var Fancybox: any;

@Component({
    selector: 'app-deathhome',
    templateUrl: './deathhome.component.html',
    styleUrl: './deathhome.component.css',
})
export class DeathhomeComponent {
    contentuploadurl = '';
    contentshowurl = '';
    declarationcheck: boolean = false;
    informationhide: boolean = false;
    @Input() brapplicationid: any;
    @Input() drafttype: any = '';
    @Input() typeofcorrection: any;
    @Input() preview_tittle: any;
    @Input() NAC_application_Id: any;
    constructor(
        private spinner: NgxSpinnerService,
        private alt: AlertsService,
        private pscall: PrivateService,
        private auth: AuthserService,
        private httpClient: HttpClient,
        private datepipe: DatePipe,
        private mid: MiddlewareService,
        private geolocationService: GeolocationService,
        private val: InputvalidaionService,
        private sanitizer: DomSanitizer,
        private router: Router,
        private encdc: EncDecService, private logger: LoggerService,
        @Inject(DOCUMENT) private document: Document
    ) {
        this.maxdate = new Date();
        this.mindate = new Date('01-01-1970');
        //this.Dateoifreportmindate = new Date('01-12-2024');
        this.contentuploadurl = this.mid.globalsetting.api_url_conent_upload;
        this.contentshowurl = mid.globalsetting.api_url_conent_show;
        //     const currentDate = new Date();
        //     const lastWeekDate = new Date();
        //     lastWeekDate.setDate(currentDate.getDate() - 7);
        //    // lastWeekDate.setDate(currentDate.getDate() - this.obj[0]?.REPORTING_DAYS);
        //     this.Dateoifreportmindate = lastWeekDate;
    }
    Deviceid: any;
    maxdate!: Date;
    mindate!: Date;
    Dateoifreportmindate!: Date;
    bsConfig: Partial<BsDatepickerModule> = {
        dateInputFormat: 'DD-MM-YYYY',
        isDisabled: false,
        startView: 'day',
        showWeekNumbers: false,
        containerClass: 'theme-blue',
        showClearButton: true,
    };
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
    isChildNotNamed: boolean = false;

    Permanentaddressdeceased: string = 'inside';
    SameaddressofparentsRadio: string = 'inside';
    selectedRadio3: string = '';
    selectedRadio4: string = '';

    draft_details_array = {
        language: {
            primarylan: 'English',
            secondarylan: 'Telugu',
            dateofreport: this.datepipe.transform(new Date(), 'dd-MM-yyyy'),
        },
        Informationofthedeceased: {
            DateofDeathmask: '',
            DateofDeath: '',
            ConfirmDateofDeath: '',
            TimeofDeath: '',
            Gender: '',
            Gender_val: '',
            DateofBirth: '',
            AgeYear: '',
            AgeMonth: '',
            AgeDay: '',
            Hours: '',
            FullName: '',
            FullName_tel: '',
            middlename: '',
            middlename_tel: '',
            Surname: '',
            Surname_tel: '',
        },
        Confirmnameofthedeceased: {
            FullName: '',
            FullName_tel: '',
            FullName_val: '',
            Surname: '',
            Surname_tel: '',
            Surname_val: '',
            Aadhaartype: '',
            AadhaarEIDNumber: '',
            FullName_value: '',
            middlename: '',
            middlename_tel: '',
            AadhaarEIDNumber_mask: '',
        },
        fatherInformation: {
            father_full_namer: '',
            father_full_namer_t: '',
            father_full_namer_val: '',
            father_surname: '',
            father_surname_t: '',
            father_surname_val: '',
            father_mobile_number: '',
            father_email_number: '',
            father_aadhhar_number: '',
            father_full_namer_value: '',
            father_middlename: '',
            father_middlename_t: '',
            father_aadhhar_number_mask: '',
        },
        motherInformation: {
            mother_full_name: '',
            mother_full_name_t: '',
            mother_full_name_val: '',
            mother_surname_name: '',
            mother_surname_name_t: '',
            mother_surname_name_val: '',
            mother_mobile_number: '',
            mother_email: '',
            mother_aadhaar_number: '',
            mother_full_name_value: '',
            mother_middlename: '',
            mother_middlename_t: '',
            mother_aadhaar_number_mask: '',
        },
        MaritalStatus: {
            Spouse_Married_Status: '',
            Spouse_FullName: '',
            Spouse_FullName_tel: '',
            Spouse_FullName_val: '',
            Spouse_Surname: '',
            Spouse_Surname_tel: '',
            Spouse_Surname_val: '',
            Spouse_AadharNumber: '',
            Spouse_DateofBirth: '',
            Spouse_AgeYear: '',
            Spouse_ContactDetails_EmailId: '',
            Spouse_ContactDetails_Mobileno: '',
            Spouse_FullName_value: '',
            Spouse_middlename: '',
            Spouse_middlename_tel: '',
            Spouse_AadharNumber_mask: '',
        },
        Addressofthedeceased: {
            addressof: '',
            Country: '',
            address: '',
            address_t: '',
            Country_val: '',
            Country_address_val: '',
            State: '',
            State_val: '',
            District: '',
            District_val: '',
            UrbanRural: '',
            UrbanRural_val: '',
            MandalMuncipality: '',
            MandalMuncipality_val: '',
            VillageWard: '',
            VillageWard_val: '',
            BuildingNo: '',
            BuildingNo_tel: '',
            BuildingNo_val: '',
            HouseNo: '',
            HouseNo_tel: '',
            HouseNo_val: '',
            StreetName: '',
            StreetName_tel: '',
            StreetName_val: '',
            Locality: '',
            Locality_tel: '',
            Locality_val: '',
            PINCode: '',
            PostOffice: '',
            Addressofthedeceased_value: '',
        },
        Permanentaddress: {
            permantaddressof: '',
            addressof: '',
            sameasaddress: '',
            Country: '',
            Country_val: '',
            address: '',
            address_t: '',
            address_val: '',
            State: '',
            State_val: '',
            District: '',
            District_val: '',
            UrbanRural: '',
            UrbanRural_val: '',
            MandalMuncipality: '',
            MandalMuncipality_val: '',
            VillageWard: '',
            VillageWard_val: '',
            BuildingNo: '',
            BuildingNo_tel: '',
            BuildingNo_val: '',
            HouseNo: '',
            HouseNo_tel: '',
            HouseNo_val: '',
            StreetName: '',
            StreetName_tel: '',
            StreetName_val: '',
            Locality: '',
            Locality_tel: '',
            Locality_val: '',
            PINCode: '',
            PostOffice: '',
            Permanentaddress_value: '',
        },
        PlaceofDeath: {
            PlaceofDeath: '',
            HospitalName: '',
            HospitalName_val: '',
            State: '',
            State_val: '',
            District: '',
            District_val: '',
            UrbanRural: '',
            UrbanRural_val: '',
            MandalMuncipality: '',
            MandalMuncipality_val: '',
            VillageWard: '',
            VillageWard_val: '',
            BuildingNo: '',
            BuildingNo_tel: '',
            BuildingNo_val: '',
            HouseNo: '',
            HouseNo_tel: '',
            HouseNo_val: '',
            StreetName: '',
            StreetName_tel: '',
            StreetName_val: '',
            Locality: '',
            Locality_tel: '',
            Locality_val: '',
            PINCode: '',
            PostOffice: '',
            PlaceofDeath_value: '',
        },
        StatisticalInformation: {
            Religion: '',
            Religion_Other: '',
            Religion_Other_t: '',
            Religion_Other_val: '',
            Education: '',
            Education_val: '',
            Occupation: '',
            Occupation_val: '',
            State: '',
            State_val: '',
            District: '',
            District_val: '',
            UrbanRural: '',
            UrbanRural_val: '',
            MandalMuncipality: '',
            MandalMuncipality_val: '',
            VillageWard: '',
            VillageWard_val: '',
            copyaddress: false,
            permanentcopyaddress: false
        },
        OtherInformation: {
            medicalattention: '',
            medicalattention_val: '',
            causeofdeathmedicallycertified: '',
            nameofdiseaseoractualcauseofdeath: '',
            nameofdiseaseoractualcauseofdeath_val: '',
            deathoccurwhilepregnant: '',
            immediatecause: '',
            immediatecause_val: '',
            antecedentcause: '',
            antecedentcause_val: '',
            othercause: '',
            othercause_val: '',
            deathcausewhilepregnant: '',
            deathcausewhilepregnant_val: '',
            deathmanner: '',
            deathmanner_val: '',
            habituallysmoke: 'No',
            habituallysmoke_years: '',
            chewtobacco: 'No',
            chewtobacco_years: '',
            chewarecanut: 'No',
            chewarecanut_years: '',
            drinkalcohol: 'No',
            drinkalcohol_years: '',
            deceased_residence_value: '',
            wasthereadelivery: '',
            mannerofdeath: '',
            mannerofdeath_val: '',
            mannerinjuryoccur: ''
        },
        information: {
            Informant_fullname: '',
            Informant_fullname_t: '',
            Informant_fullname_val: '',
            Informant_email_id: '',
            Informant_mobile_no: '',
            Informant_aadhhar_no: '',
            Informant_address: '',
            Informant_address_t: '',
            Informant_address_val: '',
            Informant_aadhhar_no_mask: '',
        },
    };

    // documnets = {
    //   documentcode: '',
    //   documentdescription: '',
    //   documentpath: '',
    //   documentformat: '',
    //   documentsize: '',
    //   documentfilename: '',
    // };
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

    @ViewChild('notifyResolutionDocInput') notifyResolutionDocInput!: ElementRef;

    RU_CODE: any; obj: any; UROLE: any;
    async ngOnInit(): Promise<void> {
        try {
            if (sessionStorage.getItem('_Uenc') !== '') {
                this.obj = this.encdc.Getuser();

                this.NacDateChange();

                if (this.obj != '' && this.obj != undefined && this.obj != null) {
                    this.RU_CODE = this.obj[0].RU_CODE;
                    this.UROLE = this.obj[0].UROLE;
                    Fancybox.defaults.Hash = false;
                    Fancybox.bind('[data-fancybox="gallery"]', {
                        Hash: false,  // Disable URL hash changes
                    });
                    const currentDate = new Date();
                    const lastWeekDate = new Date();
                    lastWeekDate.setDate(currentDate.getDate() - this.obj[0]?.REPORTING_DAYS);
                    this.Dateoifreportmindate = lastWeekDate;
                    if (this.NAC_application_Id == "" && this.NAC_application_Id == null && this.NAC_application_Id == undefined) {
                        this.dateofdeathmin = new Date(); // Clone the event date
                        this.dateofdeathmin.setDate(this.dateofdeathmin.getDate() - 30); // Subtract 30 days
                    }
                    this.getCurrentLocation();
                    await this.getstatedata();
                    await this.getcountry();
                    await this.getHospital();
                    await this.getPlaceofDeath();
                    await this.getMannerdeath();
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



    today = new Date();
    NacDateChange() {
        if (this.NAC_application_Id != "" && this.NAC_application_Id != null && this.NAC_application_Id != undefined) {
            this.dateofdeathmax = new Date(this.today.getFullYear() - 1, this.today.getMonth(), this.today.getDate());
            return;
        }
    }

    deathinformationdetails() {
        if (this.draft_details_array.PlaceofDeath.PlaceofDeath == "1") {
            let HospitalDetails = this.Hospital_master_array.find(e => e.HOSPITAL_CODE == this.draft_details_array.PlaceofDeath.HospitalName);
            if (HospitalDetails != undefined || HospitalDetails != null) {
                this.draft_details_array.information.Informant_fullname = HospitalDetails.HOSPITAL_AUTH_NAME,
                    this.draft_details_array.information.Informant_mobile_no = HospitalDetails.HOSPITAL_AUTH_MOBILE_NO,
                    this.draft_details_array.information.Informant_address = HospitalDetails.HOSPITAL_ADDRESS,
                    this.informationhide = true;
                this.Teluglanguageconvrt(this.draft_details_array.information.Informant_fullname, 'informationInformant_fullname');
                this.Teluglanguageconvrt(this.draft_details_array.information.Informant_address, 'informationInformant_address');
            }
            else {
                this.draft_details_array.information = {
                    Informant_fullname: '',
                    Informant_fullname_t: '',
                    Informant_fullname_val: '',
                    Informant_email_id: '',
                    Informant_mobile_no: '',
                    Informant_aadhhar_no: '',
                    Informant_address: '',
                    Informant_address_t: '',
                    Informant_address_val: '',
                    Informant_aadhhar_no_mask: '',
                }
                this.informationhide = false;
            }
        }
        else {
            this.draft_details_array.information = {
                Informant_fullname: '',
                Informant_fullname_t: '',
                Informant_fullname_val: '',
                Informant_email_id: '',
                Informant_mobile_no: '',
                Informant_aadhhar_no: '',
                Informant_address: '',
                Informant_address_t: '',
                Informant_address_val: '',
                Informant_aadhhar_no_mask: '',
            }
            this.informationhide = false;
        }
    }


    disabable = false; dateofreportdesiable: boolean = false; ruralurbandisable: boolean = false;

    async PlaceofDeathchange() {

        this.disabable = false;
        this.dateofreportdesiable = false;
        if (this.UROLE == '105' || this.UROLE == '112' || this.UROLE == '111' || this.UROLE == '1007') {
            this.dateofreportdesiable = true;

            if (this.draft_details_array.PlaceofDeath.PlaceofDeath != '1' && this.draft_details_array.PlaceofDeath.PlaceofDeath != "") {

                if (this.obj[0].STATE_CODE != "") {
                    
                    const { STATE_CODE, STATE_DD } = this.PlaceofDeath_state_master_array[0];
                    this.PlaceofDeath_state_master_array = [];
                    this.PlaceofDeath_state_master_array = [{ STATE_CODE, STATE_DD }];
                } else {
                    this.getstatedata();
                }
                this.draft_details_array.PlaceofDeath.State = this.obj[0].STATE_CODE;

                if (this.obj[0].DISTRICT_CODE != "") {
                    this.getdistrict('PlaceofDeath'); // make sure this fills the array

                    setTimeout(() => {
                        const codeToFind = String(this.obj[0].DISTRICT_CODE);

                        const matchedDistrict = this.PlaceofDeath_district_array.find(
                            e => String(e.DISTRICT_CODE) === codeToFind
                        );
                        if (matchedDistrict) {
                            this.PlaceofDeath_district_array = [matchedDistrict];
                        } else {
                            this.PlaceofDeath_district_array = [];
                        }
                    }, 500); // small delay to simulate data loading

                } else {
                    this.getdistrict('PlaceofDeath');
                }
                this.draft_details_array.PlaceofDeath.District = this.obj[0].DISTRICT_CODE;

                if (this.obj[0].RURAL_URBAN != "") {
                    this.ruralurbandisable = true;
                    this.draft_details_array.PlaceofDeath.UrbanRural = this.obj[0].RURAL_URBAN;
                }

                if (this.obj[0].MMC_CODE != "") {
                    console.log(this.PlaceofDeath_MandalMuncipality_array);
                    this.MandalMuncipality('PlaceofDeath');
                    setTimeout(() => {
                        const codeToFind = String(this.obj[0].MMC_CODE);

                        const matchedMandal = this.PlaceofDeath_MandalMuncipality_array.find(
                            e => String(e.MMC_CODE) === codeToFind
                        );
                        if (matchedMandal) {
                            this.PlaceofDeath_MandalMuncipality_array = [matchedMandal];
                        } else {
                            this.PlaceofDeath_MandalMuncipality_array = [];
                        }
                    }, 500); // small delay to simulate data loading
                } else {
                    this.MandalMuncipality('PlaceofDeath');
                }
                this.draft_details_array.PlaceofDeath.MandalMuncipality = this.obj[0].MMC_CODE;
                if (this.obj[0].VW_CODE != "") {
                    this.VillageWard('PlaceofDeath');
                    setTimeout(() => {
                        const codeToFind = String(this.obj[0].VW_CODE);
                        const matchedvillage = this.PlaceofDeath_village_ward_array.find(
                            e => String(e.VW_CODE) === codeToFind
                        );
                        if (matchedvillage) {
                            this.PlaceofDeath_village_ward_array = [matchedvillage];
                        } else {
                            this.PlaceofDeath_village_ward_array = [];
                        }
                    }, 500); // small delay to simulate data loading

                } else {
                    this.VillageWard('PlaceofDeath');
                }
                this.draft_details_array.PlaceofDeath.VillageWard = this.obj[0].VW_CODE;

            } else if (this.obj[0].HOSPITAL_ID != "" && this.UROLE == '108') {
                this.draft_details_array.PlaceofDeath.PlaceofDeath = '1';
                this.placeofdeathempty();
                this.draft_details_array.PlaceofDeath.PlaceofDeath = this.PlaceofDeath_master_array.find(e => e.BDPLACE_CODE == 1).BDPLACE_CODE;
                this.get_SupportingDocuments();
                this.draft_details_array.PlaceofDeath.HospitalName = this.obj[0].HOSPITAL_ID;
                this.disabable = true;
            } else {
                this.disabable = false;
                this.placeofdeathempty();
            }
        }
    }
    placeofdeathempty() {
        this.PlaceofDeath_district_array = [];
        this.PlaceofDeath_MandalMuncipality_array = [];
        this.PlaceofDeath_village_ward_array = [];
        this.draft_details_array.PlaceofDeath = {
            PlaceofDeath: this.draft_details_array.PlaceofDeath.PlaceofDeath,
            HospitalName: '',
            HospitalName_val: '',
            State: '',
            State_val: '',
            District: '',
            District_val: '',
            UrbanRural: '',
            UrbanRural_val: '',
            MandalMuncipality: '',
            MandalMuncipality_val: '',
            VillageWard: '',
            VillageWard_val: '',
            BuildingNo: '',
            BuildingNo_tel: '',
            BuildingNo_val: '',
            HouseNo: '',
            HouseNo_tel: '',
            HouseNo_val: '',
            StreetName: '',
            StreetName_tel: '',
            StreetName_val: '',
            Locality: '',
            Locality_tel: '',
            Locality_val: '',
            PINCode: '',
            PostOffice: '',
            PlaceofDeath_value: '',
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

    PlaceofDeath_master_array: any[] = [];
    async getPlaceofDeath(): Promise<void> {
        try {
            const req = new basemodel();
            req.type = '1009';
            this.spinner.show();
            this.PlaceofDeath_master_array = [];
            let responce: any = await this.auth.auth_utilities_service(req);
            this.spinner.hide();
            // 
            if (responce.code) {
                this.PlaceofDeath_master_array = responce.Details;
            } else {
                this.PlaceofDeath_master_array = [];
                this.spinner.hide();
            }
        } catch (error) {
            this.spinner.hide();
            this.alt.toasterror('something went wrong' + error);
        }
    }
    MannerDeath_master_array: any[] = [];
    async getMannerdeath(): Promise<void> {
        try {
            const req = new basemodel();
            req.type = '1026';
            this.spinner.show();
            this.MannerDeath_master_array = [];
            let responce: any = await this.auth.auth_utilities_service(req);
            this.spinner.hide();
            // 
            if (responce.code) {
                this.MannerDeath_master_array = responce.Details;
            } else {
                this.MannerDeath_master_array = [];
                this.spinner.hide();
            }
        } catch (error) {
            this.spinner.hide();
            this.alt.toasterror('something went wrong' + error);
        }
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
            this.spinner.hide();
            if (responce.code) {
                this.Hospital_master_array = responce.Details;
                // this.hospitalAuthority = responce.Details[0];
            } else {
                this.Hospital_master_array = [];
                this.spinner.hide();
            }
        } catch (error) {
            this.spinner.hide();
            this.alt.toasterror('something went wrong' + error);
        }
    }
    async StatisticalInformationservice() {
        this.get_Father_Mother_Religion();
        this.get_Father_mother_Education();
        this.get_Father_mother_occupation();
        await this.getHospital();
        this.get_Typeofattention();
        this.get_causeofdeath();
        this.get_nameofdisease();
        this.get_AdditionalSupportingDocuments();
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
            this.alt.toasterror('something went wrong' + error);
        }
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
            this.alt.toasterror('something went wrong' + error);
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
            this.alt.toasterror('something went wrong' + error);
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
            this.alt.toasterror('something went wrong' + error);
        }
    }

    Typeofattention_master_array: any[] = [];
    async get_Typeofattention(): Promise<void> {
        try {
            let hospitalcategory = '0';
            if (this.draft_details_array.PlaceofDeath.PlaceofDeath == '1') {
                hospitalcategory = this.Hospital_master_array.find(x => x.HOSPITAL_CODE == this.draft_details_array.PlaceofDeath.HospitalName).HOSPITAL_CATEGORY;
            }
            const req = new basemodel();
            req.type = '1015';
            req.param1 = this.draft_details_array.PlaceofDeath.PlaceofDeath;
            req.param2 = hospitalcategory;
            req.param25 = 'DEATH';
            this.spinner.show();
            this.Typeofattention_master_array = [];
            let responce: any = await this.auth.auth_utilities_service(req);
            this.spinner.hide();
            if (responce.code) {
                this.Typeofattention_master_array = responce.Details;
                if (this.draft_details_array.PlaceofDeath.PlaceofDeath == '1') {
                    this.draft_details_array.OtherInformation.medicalattention = this.Typeofattention_master_array[0].ATTENTION_CODE;
                }
            } else {
                this.Typeofattention_master_array = [];
                this.spinner.hide();
            }
        } catch (error) {
            this.spinner.hide();

        }
    }
    causeofdeath_master_array: any[] = [];
    async get_causeofdeath(): Promise<void> {
        try {
            const req = new basemodel();
            req.type = '1016';
            this.spinner.show();
            this.causeofdeath_master_array = [];
            let responce: any = await this.auth.auth_utilities_service(req);

            this.spinner.hide();
            if (responce.code) {
                this.causeofdeath_master_array = responce.Details;
            } else {
                this.causeofdeath_master_array = [];
                this.spinner.hide();
            }
        } catch (error) {
            this.spinner.hide();
            this.alt.toasterror('something went wrong' + error);
        }
    }
    nameofdisease_master_array: any[] = [];
    async get_nameofdisease(): Promise<void> {
        try {
            const req = new basemodel();
            req.type = '1018';
            this.spinner.show();
            this.nameofdisease_master_array = [];
            let responce: any = await this.auth.auth_utilities_service(req);
            this.spinner.hide();
            if (responce.code) {
                this.nameofdisease_master_array = responce.Details;
            } else {
                this.nameofdisease_master_array = [];
                this.spinner.hide();
            }
        } catch (error) {
            this.spinner.hide();
            this.alt.toasterror('something went wrong' + error);
        }
    }
    SupportingDocuments_master_array: any[] = [];

    async get_SupportingDocuments(): Promise<void> {
        try {
            const req = new basemodel();
            req.type = '1017';
            req.param1 = this.draft_details_array.PlaceofDeath.PlaceofDeath;
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
            this.alt.toasterror('something went wrong' + error);
        }
    }
    deceased_state_master_array: any[] = [];
    Permanent_state_master_array: any[] = [];
    PlaceofDeath_state_master_array: any[] = [];
    staticstical_state_master_array: any[] = [];
    async getstatedata(): Promise<void> {
        try {
            const req = new basemodel();
            req.type = '1001';
            this.spinner.show();
            this.deceased_state_master_array = [];
            this.Permanent_state_master_array = [];
            this.PlaceofDeath_state_master_array = [];
            this.staticstical_state_master_array = [];
            let responce: any = await this.auth.auth_utilities_service(req);

            this.spinner.hide();
            if (responce.code) {
                this.deceased_state_master_array = responce.Details;
                this.Permanent_state_master_array = responce.Details;
                this.PlaceofDeath_state_master_array = responce.Details;
                this.staticstical_state_master_array = responce.Details;
            } else {
                this.deceased_state_master_array = [];
                this.Permanent_state_master_array = [];

                this.PlaceofDeath_state_master_array = [];
                this.staticstical_state_master_array = [];
                this.spinner.hide();
            }
        } catch (error) {
            this.spinner.hide();
            this.alt.toasterror('something went wrong' + error);
        }
    }
    deceased_district_array: any[] = [];
    Permanent_district_array: any[] = [];
    PlaceofDeath_district_array: any[] = [];
    staticstical_district_array: any[] = [];
    statcode: any;
    async getdistrict(obj: any): Promise<void> {
        this.statcode = '';
        if (
            obj == 'deceased' &&
            this.draft_details_array.Addressofthedeceased.State == ''
        ) {
            this.spinner.hide();
            this.deceased_district_array = [];
            this.draft_details_array.Addressofthedeceased.State = '';
            this.alt.warning('select  Permanent Address of parents State');
            return;
        } else if (
            obj == 'Permanent' &&
            this.draft_details_array.Permanentaddress.State == ''
        ) {
            this.spinner.hide();
            this.Permanent_district_array = [];
            this.draft_details_array.Permanentaddress.State = '';
            this.alt.warning('select  Permanent Address of parents State');
            return;
        } else if (
            obj == 'Statistical' &&
            this.draft_details_array.StatisticalInformation.State == ''
        ) {
            this.spinner.hide();
            this.staticstical_district_array = [];
            this.draft_details_array.StatisticalInformation.State = '';
            this.alt.warning('select State');
            return;
        } else if (
            obj == 'PlaceofDeath' &&
            this.draft_details_array.PlaceofDeath.State == ''
        ) {
            this.spinner.hide();
            this.PlaceofDeath_district_array = [];
            this.draft_details_array.PlaceofDeath.State = '';
            this.alt.warning('select State');
            return;
        } else {
            if (obj == 'deceased') {
                this.PlaceofDeath_district_array = [];
                this.statcode = this.draft_details_array.Addressofthedeceased.State;
            }
            if (obj == 'Permanent') {
                this.Permanent_district_array = [];
                this.statcode = this.draft_details_array.Permanentaddress.State;
            }

            if (obj == 'Statistical') {
                this.statcode = this.draft_details_array.StatisticalInformation.State;
            }
            if (obj == 'PlaceofDeath') {
                this.statcode = this.draft_details_array.PlaceofDeath.State;
            }
            try {
                const req = new basemodel();
                req.type = '1002';
                req.param1 = this.statcode;
                this.spinner.show();
                let responce: any = await this.auth.auth_utilities_service(req);
                this.spinner.hide();

                if (responce.code) {
                    if (obj == 'deceased') {
                        this.deceased_district_array = responce.Details;
                    }
                    if (obj == 'Permanent') {
                        this.Permanent_district_array = responce.Details;
                    }
                    if (obj == 'Statistical') {
                        this.staticstical_district_array = responce.Details;
                    }
                    if (obj == 'PlaceofDeath') {
                        this.PlaceofDeath_district_array = responce.Details;
                    }
                } else {
                    if (obj == 'deceased') {
                        this.deceased_district_array = [];
                    }
                    if (obj == 'Permanent') {
                        this.Permanent_district_array = [];
                    }
                    if (obj == 'Statistical') {
                        this.staticstical_district_array = [];
                    }
                    if (obj == 'PlaceofDeath') {
                        this.PlaceofDeath_district_array = [];
                    }
                    this.spinner.hide();
                }
            } catch (error) {
                this.spinner.hide();
                this.alt.toasterror('something went wrong' + error);
            }
        }
    }

    //Common Functions
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

                if (inputsource == 'confirmiddlename') {
                    this.draft_details_array.Confirmnameofthedeceased.middlename_tel =
                        this.suggestions[0];
                }
                if (inputsource == 'confirmiddlename_tel') {
                    this.draft_details_array.Confirmnameofthedeceased.middlename_tel =
                        this.suggestions[0];
                }

                if (inputsource == 'InformationofthedeceasedSurname') {
                    this.draft_details_array.Informationofthedeceased.Surname_tel =
                        this.suggestions[0];
                }
                if (inputsource == 'InformationofthedeceasedSurname_t') {
                    this.draft_details_array.Informationofthedeceased.Surname_tel =
                        this.suggestions[0];
                }

                if (inputsource == 'ConfirmnameofthedeceasedFullName') {
                    this.draft_details_array.Confirmnameofthedeceased.FullName_tel =
                        this.suggestions[0];
                }
                if (inputsource == 'Confirmnameofthedeceasedfullname_t') {
                    this.draft_details_array.Confirmnameofthedeceased.FullName_tel =
                        this.suggestions[0];
                }
                if (inputsource == 'ConfirmnameofthedeceasedSurname') {
                    this.draft_details_array.Confirmnameofthedeceased.Surname_tel =
                        this.suggestions[0];
                }
                if (inputsource == 'ConfirmnameofthedeceasedSurname_tel') {
                    this.draft_details_array.Confirmnameofthedeceased.Surname_tel =
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
                //------- motherInformation -------//
                if (inputsource == 'motherInformationmother_full_name') {
                    this.draft_details_array.motherInformation.mother_full_name_t =
                        this.suggestions[0];
                }
                if (inputsource == 'motherInformationmother_full_name_t') {
                    this.draft_details_array.motherInformation.mother_full_name_t =
                        this.suggestions[0];
                }
                if (inputsource == 'mothermiddlename') {
                    this.draft_details_array.motherInformation.mother_middlename_t =
                        this.suggestions[0];
                }
                if (inputsource == 'mother_middlename_t') {
                    this.draft_details_array.motherInformation.mother_middlename_t =
                        this.suggestions[0];
                }
                if (inputsource == 'motherInformationmother_surname_name') {
                    this.draft_details_array.motherInformation.mother_surname_name_t =
                        this.suggestions[0];
                }
                if (inputsource == 'motherInformationmother_surname_name_t') {
                    this.draft_details_array.motherInformation.mother_surname_name_t =
                        this.suggestions[0];
                }
                //------- MaritalStatus -------//
                if (inputsource == 'MaritalStatusSpouse_FullName') {
                    this.draft_details_array.MaritalStatus.Spouse_FullName_tel =
                        this.suggestions[0];
                }
                if (inputsource == 'MaritalStatusSpouse_FullName_tel') {
                    this.draft_details_array.MaritalStatus.Spouse_FullName_tel =
                        this.suggestions[0];
                }
                if (inputsource == 'spousemiddlename') {
                    this.draft_details_array.MaritalStatus.Spouse_middlename_tel =
                        this.suggestions[0];
                }
                if (inputsource == 'spousemiddlename_tel') {
                    this.draft_details_array.MaritalStatus.Spouse_middlename_tel =
                        this.suggestions[0];
                }
                if (inputsource == 'MaritalStatusSpouse_Surname') {
                    this.draft_details_array.MaritalStatus.Spouse_Surname_tel =
                        this.suggestions[0];
                }
                if (inputsource == 'MaritalStatusSpouse_Surname_tel') {
                    this.draft_details_array.MaritalStatus.Spouse_Surname_tel =
                        this.suggestions[0];
                }

                //------- Addressofthedeceased -------//
                if (inputsource == 'AddressofthedeceasedBuildingNo') {
                    this.draft_details_array.Addressofthedeceased.BuildingNo_tel =
                        this.suggestions[0];
                }
                if (inputsource == 'AddressofthedeceasedBuildingNo_tel') {
                    this.draft_details_array.Addressofthedeceased.BuildingNo_tel =
                        this.suggestions[0];
                }
                if (inputsource == 'AddressofthedeceasedHouseNo') {
                    this.draft_details_array.Addressofthedeceased.HouseNo_tel =
                        this.suggestions[0];
                }
                if (inputsource == 'AddressofthedeceasedHouseNo_tel') {
                    this.draft_details_array.Addressofthedeceased.HouseNo_tel =
                        this.suggestions[0];
                }
                if (inputsource == 'AddressofthedeceasedStreetName') {
                    this.draft_details_array.Addressofthedeceased.StreetName_tel =
                        this.suggestions[0];
                }
                if (inputsource == 'AddressofthedeceasedStreetName_tel') {
                    this.draft_details_array.Addressofthedeceased.StreetName_tel =
                        this.suggestions[0];
                }
                if (inputsource == 'AddressofthedeceasedLocality') {
                    this.draft_details_array.Addressofthedeceased.Locality_tel =
                        this.suggestions[0];
                }
                if (inputsource == 'AddressofthedeceasedLocality_tel') {
                    this.draft_details_array.Addressofthedeceased.Locality_tel =
                        this.suggestions[0];
                }
                if (inputsource == 'Addressofthedeceasedaddress') {
                    this.draft_details_array.Addressofthedeceased.address_t =
                        this.suggestions[0];
                }
                if (inputsource == 'Addressofthedeceasedaddress_t') {
                    this.draft_details_array.Addressofthedeceased.address_t =
                        this.suggestions[0];
                }
                //------- Permanentaddress -------//
                if (inputsource == 'PermanentaddressBuildingNo') {
                    this.draft_details_array.Permanentaddress.BuildingNo_tel =
                        this.suggestions[0];
                }
                if (inputsource == 'PermanentaddressBuildingNo_tel') {
                    this.draft_details_array.Permanentaddress.BuildingNo_tel =
                        this.suggestions[0];
                }
                if (inputsource == 'PermanentaddressHouseNo') {
                    this.draft_details_array.Permanentaddress.HouseNo_tel =
                        this.suggestions[0];
                }
                if (inputsource == 'PermanentaddressHouseNo_tel') {
                    this.draft_details_array.Permanentaddress.HouseNo_tel =
                        this.suggestions[0];
                }
                if (inputsource == 'PermanentaddressStreetName') {
                    this.draft_details_array.Permanentaddress.StreetName_tel =
                        this.suggestions[0];
                }
                if (inputsource == 'PermanentaddressStreetName_tel') {
                    this.draft_details_array.Permanentaddress.StreetName_tel =
                        this.suggestions[0];
                }
                if (inputsource == 'PermanentaddressLocality') {
                    this.draft_details_array.Permanentaddress.Locality_tel =
                        this.suggestions[0];
                }
                if (inputsource == 'PermanentaddressLocality_tel') {
                    this.draft_details_array.Permanentaddress.Locality_tel =
                        this.suggestions[0];
                }
                if (inputsource == 'Permanentaddressaddress') {
                    this.draft_details_array.Permanentaddress.address_t =
                        this.suggestions[0];
                }
                if (inputsource == 'Permanentaddressaddress_t') {
                    this.draft_details_array.Permanentaddress.address_t =
                        this.suggestions[0];
                }
                //------- PlaceofDeath -------//
                if (inputsource == 'PlaceofDeathBuildingNo') {
                    this.draft_details_array.PlaceofDeath.BuildingNo_tel =
                        this.suggestions[0];
                }
                if (inputsource == 'PlaceofDeathBuildingNo_tel') {
                    this.draft_details_array.PlaceofDeath.BuildingNo_tel =
                        this.suggestions[0];
                }
                if (inputsource == 'PlaceofDeathHouseNo') {
                    this.draft_details_array.PlaceofDeath.HouseNo_tel =
                        this.suggestions[0];
                }
                if (inputsource == 'PlaceofDeathHouseNo_tel') {
                    this.draft_details_array.PlaceofDeath.HouseNo_tel =
                        this.suggestions[0];
                }
                if (inputsource == 'PlaceofDeathStreetName') {
                    this.draft_details_array.PlaceofDeath.StreetName_tel =
                        this.suggestions[0];
                }
                if (inputsource == 'PlaceofDeathStreetName_tel') {
                    this.draft_details_array.PlaceofDeath.StreetName_tel =
                        this.suggestions[0];
                }
                if (inputsource == 'PlaceofDeathLocality') {
                    this.draft_details_array.PlaceofDeath.Locality_tel =
                        this.suggestions[0];
                }
                if (inputsource == 'PlaceofDeathLocality_tel') {
                    this.draft_details_array.PlaceofDeath.Locality_tel =
                        this.suggestions[0];
                }
                //------- information -------//
                if (inputsource == 'informationInformant_fullname') {
                    this.draft_details_array.information.Informant_fullname_t =
                        this.suggestions[0];
                }
                if (inputsource == 'informationInformant_fullname_t') {
                    this.draft_details_array.information.Informant_fullname_t =
                        this.suggestions[0];
                }
                if (inputsource == 'informationInformant_address') {
                    this.draft_details_array.information.Informant_address_t =
                        this.suggestions[0];
                }
                if (inputsource == 'informationInformant_address_t') {
                    this.draft_details_array.information.Informant_address_t =
                        this.suggestions[0];
                }
            },
            (error) => {
                console.error('Error transliterating text:', error);
                return '';
            }
        );
    }

    async statechangeser(type: any) {
        if (type == 'deceased') {
            this.draft_details_array.Addressofthedeceased.District = '';
            this.deceased_districtchange();
        }
        if (type == 'Permanent') {
            this.draft_details_array.Permanentaddress.District = '';
            this.Permanent_districtchange();
        }
        if (type == 'PlaceofDeath') {
            this.draft_details_array.PlaceofDeath.District = '';
            this.placeofDeath_districtchange();
        }
        if (type == 'Statistical') {
            this.draft_details_array.StatisticalInformation.District = '';
            this.staticstical_districtchange();
        }
    }
    async urbanruralchangeser(type: any) {
        if (type == 'deceased') {
            this.draft_details_array.Addressofthedeceased.MandalMuncipality = '';
            this.Addressof_urbanchange();
        }
        if (type == 'Permanent') {
            this.draft_details_array.Permanentaddress.MandalMuncipality = '';
            this.Permanent_Addressof_urbanchange();
        }
        if (type == 'PlaceofDeath') {
            this.draft_details_array.PlaceofDeath.MandalMuncipality = '';
            this.PlaceofBirth_urbanchange();
        }
        if (type == 'Statistical') {
            this.draft_details_array.StatisticalInformation.MandalMuncipality = '';
            this.staticstical_urbanchange();
        }
    }
    async manmuncchangeser(type: any) {
        if (type == 'deceased') {
            this.draft_details_array.Addressofthedeceased.VillageWard = '';
            this.Addressof_mandalchange();
        }
        if (type == 'Permanent') {
            this.draft_details_array.Permanentaddress.VillageWard = '';
            this.Permanent_Addressof_mandalchange();
        }
        if (type == 'PlaceofDeath') {
            this.draft_details_array.PlaceofDeath.VillageWard = '';
            this.PlaceofBirth_mandalchange();
        }
        if (type == 'Statistical') {
            this.draft_details_array.StatisticalInformation.VillageWard = '';
            this.staticstical_mandalchange();
        }
    }

    async deceased_districtchange(): Promise<void> {
        this.draft_details_array.Addressofthedeceased.UrbanRural = '';
        this.draft_details_array.Addressofthedeceased.MandalMuncipality = '';
        this.draft_details_array.Addressofthedeceased.VillageWard = '';
        this.deceased_MandalMuncipality_array = [];
    }
    async Addressof_urbanchange(): Promise<void> {
        this.draft_details_array.Addressofthedeceased.MandalMuncipality = '';
        this.draft_details_array.Addressofthedeceased.VillageWard = '';
        this.deceased_MandalMuncipality_array = [];
    }
    async Addressof_mandalchange(): Promise<void> {
        this.draft_details_array.Addressofthedeceased.VillageWard = '';
        this.deceasedvillage_ward_array = [];
    }
    async Permanent_districtchange(): Promise<void> {
        this.draft_details_array.Permanentaddress.UrbanRural = '';
        this.draft_details_array.Permanentaddress.MandalMuncipality = '';
        this.draft_details_array.Permanentaddress.VillageWard = '';
        this.Permanent_MandalMuncipality_array = [];
    }
    async Permanent_Addressof_urbanchange(): Promise<void> {
        this.draft_details_array.Permanentaddress.MandalMuncipality = '';
        this.draft_details_array.Permanentaddress.VillageWard = '';
        this.Permanent_MandalMuncipality_array = [];
    }
    async Permanent_Addressof_mandalchange(): Promise<void> {
        this.draft_details_array.Permanentaddress.VillageWard = '';
        this.Permanentvillage_ward_array = [];
    }
    async placeofDeath_districtchange(): Promise<void> {
        this.draft_details_array.PlaceofDeath.UrbanRural = '';
        this.draft_details_array.PlaceofDeath.MandalMuncipality = '';
        this.draft_details_array.PlaceofDeath.VillageWard = '';
        this.PlaceofDeath_MandalMuncipality_array = [];
    }
    async PlaceofBirth_urbanchange(): Promise<void> {
        this.draft_details_array.PlaceofDeath.MandalMuncipality = '';
        this.draft_details_array.PlaceofDeath.VillageWard = '';
        this.PlaceofDeath_MandalMuncipality_array = [];
    }
    async PlaceofBirth_mandalchange(): Promise<void> {
        this.draft_details_array.PlaceofDeath.VillageWard = '';
        this.PlaceofDeath_village_ward_array = [];
    }
    async staticstical_districtchange(): Promise<void> {
        this.draft_details_array.StatisticalInformation.UrbanRural = '';
        this.draft_details_array.StatisticalInformation.MandalMuncipality = '';
        this.draft_details_array.StatisticalInformation.VillageWard = '';
        this.staticstical_MandalMuncipality_array = [];
    }
    async staticstical_urbanchange(): Promise<void> {
        this.draft_details_array.StatisticalInformation.MandalMuncipality = '';
        this.draft_details_array.StatisticalInformation.VillageWard = '';
        this.staticstical_MandalMuncipality_array = [];
    }
    async staticstical_mandalchange(): Promise<void> {
        this.draft_details_array.StatisticalInformation.VillageWard = '';
        this.staticstical_village_ward_array = [];
    }
    deceased_MandalMuncipality_array: any[] = [];
    Permanent_MandalMuncipality_array: any[] = [];
    staticstical_MandalMuncipality_array: any[] = [];
    PlaceofDeath_MandalMuncipality_array: any[] = [];
    ruralurban = '';
    district = '';
    async MandalMuncipality(obj: any): Promise<void> {
        this.ruralurban = '';
        if (
            obj == 'deceased' &&
            this.draft_details_array.Addressofthedeceased.District == ''
        ) {
            this.spinner.hide();
            this.deceased_MandalMuncipality_array = [];
            this.alt.warning('select district');
            return;
        } else if (
            obj == 'Permanent' &&
            this.draft_details_array.Permanentaddress.District == ''
        ) {
            this.spinner.hide();
            this.Permanent_MandalMuncipality_array = [];
            this.draft_details_array.Permanentaddress.UrbanRural = '';
            this.alt.warning('select district');
            return;
        } else if (
            obj == 'Statistical' &&
            this.draft_details_array.StatisticalInformation.District == ''
        ) {
            this.spinner.hide();
            this.staticstical_MandalMuncipality_array = [];
            this.alt.warning('select district');
            return;
        } else if (
            obj == 'PlaceofDeath' &&
            this.draft_details_array.PlaceofDeath.District == ''
        ) {
            this.spinner.hide();
            this.PlaceofDeath_MandalMuncipality_array = [];
            this.alt.warning('select district');
            return;
        } else {
            try {
                if (obj == 'deceased') {
                    this.deceased_MandalMuncipality_array = [];
                    this.statcode = this.draft_details_array.Addressofthedeceased.State;
                    this.district =
                        this.draft_details_array.Addressofthedeceased.District;
                    this.ruralurban =
                        this.draft_details_array.Addressofthedeceased.UrbanRural;
                }
                if (obj == 'Permanent') {
                    this.Permanent_MandalMuncipality_array = [];
                    this.statcode = this.draft_details_array.Permanentaddress.State;
                    this.district = this.draft_details_array.Permanentaddress.District;
                    this.ruralurban =
                        this.draft_details_array.Permanentaddress.UrbanRural;
                }
                if (obj == 'Statistical') {
                    this.staticstical_MandalMuncipality_array = [];
                    this.statcode = this.draft_details_array.StatisticalInformation.State;
                    this.district =
                        this.draft_details_array.StatisticalInformation.District;
                    this.ruralurban =
                        this.draft_details_array.StatisticalInformation.UrbanRural;
                }
                if (obj == 'PlaceofDeath') {
                    this.PlaceofDeath_MandalMuncipality_array = [];
                    this.statcode = this.draft_details_array.PlaceofDeath.State;
                    this.district = this.draft_details_array.PlaceofDeath.District;
                    this.ruralurban = this.draft_details_array.PlaceofDeath.UrbanRural;
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
                    if (obj == 'deceased') {
                        this.deceased_MandalMuncipality_array = responce.Details;
                    }
                    if (obj == 'Permanent') {
                        this.Permanent_MandalMuncipality_array = responce.Details;
                    }
                    if (obj == 'Statistical') {
                        this.staticstical_MandalMuncipality_array = responce.Details;
                    }
                    if (obj == 'PlaceofDeath') {
                        this.PlaceofDeath_MandalMuncipality_array = responce.Details;
                    }
                } else {
                    if (obj == 'deceased') {
                        this.deceased_MandalMuncipality_array = [];
                    }
                    if (obj == 'Permanent') {
                        this.Permanent_MandalMuncipality_array = [];
                    }
                    if (obj == 'Statistical') {
                        this.staticstical_MandalMuncipality_array = [];
                    }
                    if (obj == 'PlaceofDeath') {
                        this.PlaceofDeath_MandalMuncipality_array = [];
                    }
                }
            } catch (error) {
                this.spinner.hide();
                this.alt.toasterror('something went wrong' + error);
            }
        }
    }

    deceasedvillage_ward_array: any[] = [];
    Permanentvillage_ward_array: any[] = [];
    staticstical_village_ward_array: any[] = [];
    PlaceofDeath_village_ward_array: any[] = [];
    mandalmuncipality = '';
    async VillageWard(obj: any): Promise<void> {
        this.mandalmuncipality = '';
        if (
            obj == 'deceased' &&
            this.draft_details_array.Addressofthedeceased.MandalMuncipality == ''
        ) {
            this.spinner.hide();
            this.deceasedvillage_ward_array = [];
            this.alt.warning('select Mandal/Muncipality');
            return;
        } else if (
            obj == 'Permanent' &&
            this.draft_details_array.Permanentaddress.MandalMuncipality == ''
        ) {
            this.spinner.hide();
            this.Permanentvillage_ward_array = [];
            this.alt.warning('select Mandal/Muncipality');
            return;
        } else if (
            obj == 'Statistical' &&
            this.draft_details_array.StatisticalInformation.MandalMuncipality == ''
        ) {
            this.spinner.hide();
            this.staticstical_village_ward_array = [];
            this.alt.warning('select Mandal/Muncipality');
            return;
        } else if (
            obj == 'PlaceofDeath' &&
            this.draft_details_array.PlaceofDeath.MandalMuncipality == ''
        ) {
            this.spinner.hide();
            this.PlaceofDeath_village_ward_array = [];
            this.alt.warning('select Mandal/Muncipality');
            return;
        } else {
            try {
                if (obj == 'deceased') {
                    this.deceasedvillage_ward_array = [];
                    this.statcode = this.draft_details_array.Addressofthedeceased.State;
                    this.district =
                        this.draft_details_array.Addressofthedeceased.District;
                    this.ruralurban =
                        this.draft_details_array.Addressofthedeceased.UrbanRural;
                    this.mandalmuncipality =
                        this.draft_details_array.Addressofthedeceased.MandalMuncipality;
                }
                if (obj == 'Permanent') {
                    this.Permanentvillage_ward_array = [];
                    this.statcode = this.draft_details_array.Permanentaddress.State;
                    this.district = this.draft_details_array.Permanentaddress.District;
                    this.ruralurban =
                        this.draft_details_array.Permanentaddress.UrbanRural;
                    this.mandalmuncipality =
                        this.draft_details_array.Permanentaddress.MandalMuncipality;
                }
                if (obj == 'Statistical') {
                    this.staticstical_village_ward_array = [];
                    this.statcode = this.draft_details_array.StatisticalInformation.State;
                    this.district =
                        this.draft_details_array.StatisticalInformation.District;
                    this.ruralurban =
                        this.draft_details_array.StatisticalInformation.UrbanRural;
                    this.mandalmuncipality =
                        this.draft_details_array.StatisticalInformation.MandalMuncipality;
                }
                if (obj == 'PlaceofDeath') {
                    this.PlaceofDeath_village_ward_array = [];
                    this.statcode = this.draft_details_array.PlaceofDeath.State;
                    this.district = this.draft_details_array.PlaceofDeath.District;
                    this.ruralurban = this.draft_details_array.PlaceofDeath.UrbanRural;
                    this.mandalmuncipality =
                        this.draft_details_array.PlaceofDeath.MandalMuncipality;
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
                    if (obj == 'deceased') {
                        this.deceasedvillage_ward_array = responce.Details;
                    }
                    if (obj == 'Permanent') {
                        this.Permanentvillage_ward_array = responce.Details;
                    }
                    if (obj == 'Statistical') {
                        this.staticstical_village_ward_array = responce.Details;
                    }
                    if (obj == 'PlaceofDeath') {
                        this.PlaceofDeath_village_ward_array = responce.Details;
                    }
                } else {
                    if (obj == 'deceased') {
                        this.deceasedvillage_ward_array = [];
                    }
                    if (obj == 'Permanent') {
                        this.Permanentvillage_ward_array = [];
                    }
                    if (obj == 'Statistical') {
                        this.staticstical_village_ward_array = [];
                    }
                    if (obj == 'PlaceofDeath') {
                        this.PlaceofDeath_village_ward_array = [];
                    }
                    this.spinner.hide();
                }
            } catch (error) {
                this.spinner.hide();
                this.alt.toasterror('something went wrong' + error);
            }
        }
    }
    deceased_postal_array: any[] = [];
    Permanent_postal_array: any[] = [];
    PlaceofDeath_postal_array: any[] = [];
    pincode = '';
    async Postalareas(value: any, obj: any): Promise<void> {


        if (
            obj == 'deceased' &&
            this.draft_details_array.Addressofthedeceased.PINCode == '' &&
            this.draft_details_array.Addressofthedeceased.PINCode.length < 6
        ) {
            this.spinner.hide();
            this.deceased_postal_array = [];
            this.draft_details_array.Addressofthedeceased.PostOffice = '';
            this.alt.warning('enter 6 digits postal code');
            return;
        } else if (
            obj == 'Permanent' &&
            this.draft_details_array.Permanentaddress.PINCode == '' &&
            this.draft_details_array.Permanentaddress.PINCode.length < 6
        ) {
            this.spinner.hide();
            this.Permanent_postal_array = [];
            this.draft_details_array.Addressofthedeceased.PostOffice = '';
            this.alt.warning('enter 6 digits postal code');
            return;
        } else if (
            obj == 'PlaceofDeath' &&
            this.draft_details_array.PlaceofDeath.PINCode == '' &&
            this.draft_details_array.PlaceofDeath.PINCode.length < 6
        ) {
            this.spinner.hide();
            this.PlaceofDeath_postal_array = [];
            this.draft_details_array.PlaceofDeath.PostOffice = '';
            this.alt.warning('enter 6 digits postal code');
            return;
        } else if (value.length === 6) {
            try {
                if (obj == 'deceased') {
                    this.draft_details_array.Addressofthedeceased.PostOffice = '';
                    this.deceased_postal_array = [];
                    this.pincode = this.draft_details_array.Addressofthedeceased.PINCode;
                }
                if (obj == 'Permanent') {
                    this.draft_details_array.Permanentaddress.PostOffice = '';
                    this.Permanent_postal_array = [];
                    this.pincode = this.draft_details_array.Permanentaddress.PINCode;
                }
                if (obj == 'PlaceofDeath') {
                    this.draft_details_array.PlaceofDeath.PostOffice = '';
                    this.PlaceofDeath_postal_array = [];
                    this.pincode = this.draft_details_array.PlaceofDeath.PINCode;
                }
                const req = new basemodel();
                req.type = '1008';
                req.param1 = this.pincode;
                this.spinner.show();
                let responce: any = await this.auth.auth_utilities_service(req);
                this.spinner.hide();
                if (responce.code) {
                    if (obj == 'deceased') {
                        this.deceased_postal_array = responce.Details;
                    }
                    if (obj == 'Permanent') {
                        this.Permanent_postal_array = responce.Details;
                    }
                    if (obj == 'PlaceofDeath') {
                        this.PlaceofDeath_postal_array = responce.Details;
                    }
                } else {
                    if (obj == 'deceased') {
                        this.deceased_postal_array = [];
                    }
                    if (obj == 'Permanent') {
                        this.Permanent_postal_array = [];
                    }
                    if (obj == 'PlaceofDeath') {
                        this.Permanent_postal_array = [];
                    }
                    this.spinner.hide();
                }

            } catch (error) {
                this.spinner.hide();
                this.alt.toasterror('something went wrong' + error);
            }
        }
    }

    ///old

    //Common End

    //Uploads
    photoselectedFiles: File[] = [];
    fileupload(event: any) {
        const files: File[] = event.target.files;
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

    @ViewChild('fileInput') fileInput!: ElementRef;
    photofilepath: any;
    photoPreviews: { file: File, discription: string, url: SafeResourceUrl, type: 'image' | 'pdf' | 'other' }[] = [];
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
                        phform.append('input01', 'Death');
                        phform.append('input02', 'deathregistration');
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
    getFileType(fileName: string): 'image' | 'pdf' | 'other' {
        const ext = fileName.toLowerCase().split('.').pop();
        if (['png', 'jpg', 'jpeg'].includes(ext!)) return 'image';
        if (ext === 'pdf') return 'pdf';
        return 'other';
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
            let rsdata: any = await this.auth.auth_pkgcrsdeath_service(req);

            this.spinner.hide();
            if (rsdata.code) {
                if (rsdata.code && rsdata.Details[0].STATUS == '1') {
                    this.fileInput.nativeElement.value = '';
                    this.dischargedocumnets.documentcode = '';
                    this.dischargedocumnets.documentdescription = '';
                    let previefile: { file: File, discription: string, url: SafeResourceUrl, type: 'image' | 'pdf' | 'other' }[] = [];
                    this.photoPreviews = previefile;
                    this.photoselectedFiles = [];
                    this.alt.toastsuccess(
                        rsdata.Details[0].STATUS_TEXT + rsdata.Details[0].STATUS_TEXT_TEL
                    );
                }
                if (rsdata.code && rsdata.Details[0].STATUS == '0') {
                    this.alt.toasterror(
                        rsdata.Details[0].STATUS_TEXT + rsdata.Details[0].STATUS_TEXT_TEL
                    );
                }
            } else {
                this.alt.toasterror('Error:  document upload could not be saved.');

                this.spinner.hide();
            }
        } catch (error) {
            this.spinner.hide();
            this.alt.toasterror('something went wrong' + error);
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
            let rsdata: any = await this.auth.auth_pkgcrsdeath_service(req);
            this.spinner.hide();
            if (rsdata.code) {
                if (rsdata.code && rsdata.Details[0].STATUS == '1') {

                    this.alt.toastsuccess(
                        rsdata.Details[0].STATUS_TEXT + rsdata.Details[0].STATUS_TEXT_TEL
                    );
                    setTimeout(() => {
                        window.location.reload();
                    }, 3000);
                }
                if (rsdata.code && rsdata.Details[0].STATUS == '0') {
                    this.alt.toasterror(
                        rsdata.Details[0].STATUS_TEXT + rsdata.Details[0].STATUS_TEXT_TEL
                    );
                }
            } else {
                this.alt.toasterror('draft delete fail.');
                this.spinner.hide();
            }
        } catch (error) {
            this.spinner.hide();
            this.alt.toasterror('something went wrong' + error);
        }
    }
    async documentdelte(obj: any): Promise<void> {

        try {
            const req = new basemodel();
            req.type = '1014';
            req.param1 = obj.DR_APPLICATION_ID;
            req.param2 = obj.DR_DOCUMENT_CODE;
            this.spinner.show();
            let rsdata: any = await this.auth.auth_pkgcrsdeath_service(req);
            this.spinner.hide();
            if (rsdata.code) {
                if (rsdata.code && rsdata.Details[0].STATUS == '1') {
                    this.get_document_details();
                    this.alt.toastsuccess(
                        rsdata.Details[0].STATUS_TEXT + rsdata.Details[0].STATUS_TEXT_TEL
                    );
                }
                if (rsdata.code && rsdata.Details[0].STATUS == '0') {
                    this.alt.toasterror(
                        rsdata.Details[0].STATUS_TEXT + rsdata.Details[0].STATUS_TEXT_TEL
                    );
                }
            } else {
                this.alt.toasterror('document delete fail.');
                this.spinner.hide();
            }
        } catch (error) {
            this.spinner.hide();
            this.alt.toasterror('something went wrong' + error);
        }
    }

    @ViewChild('proceedngSupportingDocuments') proceedngSupportingDocuments!: NgModel;

    proceedingfileSelected: boolean = false;
    proceedingfileError: boolean = false;

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
                        phform.append('input01', 'Death');
                        phform.append('input02', 'proceedingdeathregistration');
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

    documentlist: any[] = [];
    async get_document_details(): Promise<void> {
        try {
            
            const req = new basemodel();
            req.type = '1012';
            req.param1 = this.brapplicationid;
            this.spinner.show();
            this.documentlist = [];
            if (this.photoselectedFiles.length == 0 && this.multiphotoselectedFiles.length == 0) {
                let previefile: { file: File, discription: string, url: SafeResourceUrl, type: 'image' | 'pdf' | 'other' }[] = [];
                this.photoPreviews = previefile;
            }
            let rsdata: any = await this.auth.auth_pkgcrsdeath_service(req);
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

                // this.fileSelected = this.documentlist.length > 0;
                // this.fileError = !this.fileSelected; // Hide error if file is selected
                // this.multifileSelected = this.documentlist.length > 1;
                // this.multifileError = !this.multifileSelected; // Hide error if file is selected

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
            this.alt.toasterror('something went wrong' + error);
        }
    }

    isImage(url: string): boolean {
        return /\.(jpeg|jpg|png|gif|bmp|webp)$/i.test(url);
    }
    isPDF(filePath: string): boolean {
        return /\.pdf$/i.test(filePath);
    }
    getSafeUrl(url: string): SafeResourceUrl {
        return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
    ViewDoc(image: string) {
        window.open(image, '_blank');
    }
    calculateDiff(dateSent: any) {
        let currentDate = new Date();
        dateSent = new Date(dateSent);

        return Math.floor((Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()) - Date.UTC(dateSent.getFullYear(), dateSent.getMonth(), dateSent.getDate())) / (1000 * 60 * 60 * 24));
    }

    calculateyesrDiff(sentDate: any) {
        var date1: any = new Date(sentDate);
        var date2: any = new Date();
        var diffDays: any = Math.floor((date2 - date1) / (1000 * 60 * 60 * 24));

        return diffDays;
    }

    dateofdeathmax = new Date(); dateofdeathmin!: Date;
    confirmdateofdeathmax!: Date; confirmdateofdeathmin!: Date;

    birthvalidate: boolean = false;
    timedisable: boolean = true;
    onDateChange(event: any, type: any) {
        const formattedDate = this.datepipe.transform(event, 'dd-MM-yyyy');
        if (type == 'language') {
            this.draft_details_array.language.dateofreport = formattedDate || '';
            this.dateofdeathmax = event; // Assuming event is a Date object
            this.dateofdeathmin = new Date(event); // Clone the event date
            this.dateofdeathmin.setDate(this.dateofdeathmin.getDate() - 30); // Subtract 30 days
        }
        if (type == 'DateofDeath') {
            this.birthvalidate = false;
            this.timedisable = false;
            this.draft_details_array.Informationofthedeceased.DateofDeath =
                formattedDate || '';
            const datecaldiff = this.calculateDiff(event);
            if (datecaldiff > 20) {
                this.alt.toasterror('Please check you have all requisite documents before proceeding the event registration / దయచేసి ఈవెంట్ రిజిస్ట్రేషన్‌ను కొనసాగించే ముందు మీకు అవసరమైన అన్ని పత్రాలు ఉన్నాయో లేదో తనిఖీ చేయండి');
            }
            this.chekcdatecase();

            let diffdate = this.calculateyesrDiff(event);
            if (diffdate > 365) {
                this.birthvalidate = true;
                this.alt.toasterror('Please check your date of birth due to going back 365 days. Apply for NAC. / దయచేసి 365 రోజులు వెనక్కి వెళ్లడం వల్ల మీ మరణ తేదీని తనిఖీ చేయండి. NAC కోసం దరఖాస్తు చేయండి.');

            }

            const currentdatetime = this.datepipe.transform(new Date(), 'dd-MM-yyyy');
            if (formattedDate == currentdatetime) {
                this.updateTimeRange();
            }
            else {
                this.minTime = "00:00"; // Allow any time for past dates
                this.maxTime = "23:59";
            }
        }
        if (type == 'ConfirmDateofDeath') {
            this.draft_details_array.Informationofthedeceased.ConfirmDateofDeath =
                formattedDate || '';
            if (
                this.draft_details_array.Informationofthedeceased.ConfirmDateofDeath !=
                '' &&
                this.draft_details_array.Informationofthedeceased.DateofBirth != ''
            ) {
                this.calculateDateDifference(
                    this.draft_details_array.Informationofthedeceased.ConfirmDateofDeath,
                    this.draft_details_array.Informationofthedeceased.DateofBirth
                );
            }
            this.chekcdatecase();
        }
        if (type == 'DateofBirth') {
            this.draft_details_array.Informationofthedeceased.DateofBirth =
                formattedDate || '';
            if (
                this.draft_details_array.Informationofthedeceased.ConfirmDateofDeath !=
                '' &&
                this.draft_details_array.Informationofthedeceased.DateofBirth != ''
            ) {
                this.calculateDateDifference(
                    this.draft_details_array.Informationofthedeceased.ConfirmDateofDeath,
                    this.draft_details_array.Informationofthedeceased.DateofBirth
                );
            }
        }

        if (type == 'MaritalStatus') {
            this.draft_details_array.MaritalStatus.Spouse_DateofBirth =
                formattedDate || '';
            this.Spouseagecalculate();
        }
    }

    minTime = '06:00'; // Minimum time in HH:mm format
    maxTime = '18:00'; // Maximum time in HH:mm format
    updateTimeRange() {
        const now = new Date();
        const istTime = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
        this.maxTime = this.formatTime(istTime);
        this.minTime = "00:00";
    }

    formatTime(date: Date): string {
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    }

    @ViewChild('foc_confirm_Dateofdeath', { static: false }) foc_confirm_Dateofdeath!: ElementRef;
    chekcdatecase() {

        if (!this.val.isEmpty(this.draft_details_array.Informationofthedeceased.ConfirmDateofDeath)) {
            if (this.draft_details_array.Informationofthedeceased.DateofDeath != this.draft_details_array.Informationofthedeceased.ConfirmDateofDeath) {
                this.foc_confirm_Dateofdeath.nativeElement.focus();
                this.ngConfirmDateofDeath.control.setErrors({ mismatch: true });
                this.ngConfirmDateofDeath.control.setErrors({ mismatch: true });
                this.draft_details_array.Informationofthedeceased.ConfirmDateofDeath = '';
                this.alt.toasterror('Date of Death and Confim Date of Death Missmach')

            }
        }

    }
    async Spouseagecalculate() {
        let age: any = this.calculateAgeFromDate(
            this.draft_details_array.MaritalStatus.Spouse_DateofBirth
        );
        this.draft_details_array.MaritalStatus.Spouse_AgeYear = age;
    }

    calculateDateDifference(DateofDeath: string, DateofBirth: string) {
        if (!DateofDeath || !DateofBirth) {
            console.error('Invalid date inputs');
            return;
        }

        const formatDate = (date: string) => {
            const [day, month, year] = date.split('-').map(Number);
            return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(
                2,
                '0'
            )}`;
        };
        const startDate = new Date(formatDate(DateofBirth));
        const endDate = new Date(formatDate(DateofDeath));



        if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
            console.error('Invalid date formats');
            (this.draft_details_array.Informationofthedeceased.DateofBirth = ''),
                (this.draft_details_array.Informationofthedeceased.DateofDeath = '');
            (this.draft_details_array.Informationofthedeceased.ConfirmDateofDeath =
                ''),
                this.alt.toasterror('Invalid date formats.');
            return;
        }
        if (startDate > endDate) {
            (this.draft_details_array.Informationofthedeceased.DateofBirth = ''),
                (this.draft_details_array.Informationofthedeceased.ConfirmDateofDeath =
                    ''),
                (this.draft_details_array.Informationofthedeceased.DateofDeath = '');
            this.alt.toasterror(
                'Date of birth must be earlier than the date of death.'
            );
            return;
        }
        let years = endDate.getFullYear() - startDate.getFullYear();
        let months = endDate.getMonth() - startDate.getMonth();
        let days = endDate.getDate() - startDate.getDate();
        if (days < 0) {
            months--;
            const daysInPreviousMonth = new Date(
                endDate.getFullYear(),
                endDate.getMonth(),
                0
            ).getDate();
            days += daysInPreviousMonth;
        }
        if (months < 0) {
            years--;
            months += 12;
        }
        console.log(`Years: ${years}, Months: ${months}, Days: ${days}`);
        this.draft_details_array.Informationofthedeceased.AgeYear =
            years.toString();
        this.draft_details_array.Informationofthedeceased.AgeMonth =
            months.toString();
        this.draft_details_array.Informationofthedeceased.AgeDay = days.toString();
    }
    calculateAgeFromDate(date: string) {
        if (!date) {
            console.error('Invalid date input');
            return;
        }
        const formatDate = (date: string) => {
            const [day, month, year] = date.split('-').map(Number);
            return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(
                2,
                '0'
            )}`;
        };

        const birthDate = new Date(formatDate(date));
        const today = new Date();

        if (isNaN(birthDate.getTime())) {
            console.error('Invalid date format');
            return;
        }

        if (birthDate > today) {
            alert('Date of birth cannot be in the future.');
            return;
        }

        let years = today.getFullYear() - birthDate.getFullYear();
        let months = today.getMonth() - birthDate.getMonth();
        let days = today.getDate() - birthDate.getDate();

        if (days < 0) {
            months--;
            const daysInPreviousMonth = new Date(
                today.getFullYear(),
                today.getMonth(),
                0
            ).getDate();
            days += daysInPreviousMonth;
        }

        if (months < 0) {
            years--;
            months += 12;
        }
        return years;
    }
    toggleRadio1(value: string): void {
        // Toggle logic: unselect if already selected
        if (this.selectedRadio3 === value) {
            this.selectedRadio3 = ''; // Unselect
        } else {
            this.selectedRadio3 = value; // Select new value
        }
    }
    toggleRadio2(value: string): void {
        // Toggle logic: unselect if already selected
        if (this.selectedRadio4 === value) {
            this.selectedRadio4 = ''; // Unselect
        } else {
            this.selectedRadio4 = value; // Select new value
        }
    }
    //brapplicationid: any;
    applicationstatus: any;
    async getdraft(): Promise<void> {
        try {
            const req = new basemodel();
            req.type = '1000';
            req.param1 = 'DEATH';
            this.spinner.show();
            let rsdata: any = await this.auth.auth_pkgcrsdeath_service(req);
            //this.brapplicationid = '';
            this.spinner.hide();
            if (rsdata.code) {
                if (rsdata.code && rsdata.Details[0].STATUS == '1') {
                    //this.brapplicationid = rsdata.Details[0].APPLICATION_ID;
                    //this.applicationstatus = rsdata.Details[0].APPLICATION_STATUS;
                    if (this.brapplicationid == null || this.brapplicationid == undefined || this.brapplicationid == '') {
                        this.brapplicationid = rsdata.Details[0].APPLICATION_ID;
                        this.applicationstatus = rsdata.Details[0].APPLICATION_STATUS;
                    }
                    await this.getdraft_details();
                    //await this.deathinformationdetails();
                    await this.get_document_details();
                    await this.get_ProceedingSupportingDocuments();
                }
                else {
                    this.spinner.hide();
                    this.alt.toasterror(rsdata.Details[0].STATUS_TEXT);
                }
            } else {
                this.spinner.hide();
                this.alt.toasterror(rsdata.message);

            }
        } catch (error) {
            this.spinner.hide();
            this.alt.toasterror('something went wrong' + error);
        }
    }
    async getdraft_details(): Promise<void> {
        try {
            const req = new basemodel();
            req.type = '1002';
            req.param1 = this.brapplicationid;
            req.param2 = 'DEATH';
            this.spinner.show();
            let rsdata: any = await this.auth.auth_pkgcrsdeath_service(req);
            this.spinner.hide();

            if (rsdata.code) {
                if (rsdata.code && rsdata.Details[0].STATUS == '1') {
                    let jsobobj = this.replaceNullWithEmptyString(
                        JSON.parse(rsdata.Details[0].JSON_RESULT)
                    );

                    this.backwindowdraftbinding(jsobobj);
                    this.loadalldropdowns();
                    // this.deathinformationdetails();
                    // this.PlaceofDeathchange();
                }
                if (rsdata.code && rsdata.Details[0].STATUS == '0') {
                    this.alt.toasterror(
                        rsdata.Details[0].STATUS_TEXT +
                        '<br>' +
                        rsdata.Details[0].STATUS_TEXT_TEL
                    );
                }
            } else {
                this.spinner.hide();
            }
        } catch (error) {
            this.spinner.hide();
            this.alt.toasterror('something went wrong' + error);
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

        if (this.brapplicationid == "") {
            this.alt.toasterror('invalid application id');
            return;
        }
        else {
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
                let rsdata: any = await this.auth.auth_pkgcrsdeath_service(req);
                this.spinner.hide();
                if (rsdata.code) {
                    if (rsdata.code && rsdata.Details[0].STATUS == '1') {
                        await this.getdraft_details();
                        this.alt.toastsuccess(
                            rsdata.Details[0].STATUS_TEXT + rsdata.Details[0].STATUS_TEXT_TEL
                        );
                    }
                    if (rsdata.code && rsdata.Details[0].STATUS == '0') {
                        this.alt.toasterror(
                            rsdata.Details[0].STATUS_TEXT + rsdata.Details[0].STATUS_TEXT_TEL
                        );
                    }
                } else {
                    this.alt.toasterror('Error: Draft could not be saved.');

                    this.spinner.hide();
                }
            } catch (error) {
                this.spinner.hide();
                this.alt.toasterror('something went wrong' + error);
            }
        }
    }
    copyadresscheck(event: Event) {
        const isChecked = (event.target as HTMLInputElement).checked;
        if (isChecked) {
            this.draft_details_array.StatisticalInformation.copyaddress = isChecked;
            this.draft_details_array.StatisticalInformation.State = this.draft_details_array.Addressofthedeceased.State;
            this.getdistrict('Statistical');
            this.draft_details_array.StatisticalInformation.District = this.draft_details_array.Addressofthedeceased.District;
            this.draft_details_array.StatisticalInformation.UrbanRural = this.draft_details_array.Addressofthedeceased.UrbanRural;
            this.MandalMuncipality('Statistical');
            this.draft_details_array.StatisticalInformation.MandalMuncipality = this.draft_details_array.Addressofthedeceased.MandalMuncipality;
            this.VillageWard('Statistical');
            this.draft_details_array.StatisticalInformation.VillageWard = this.draft_details_array.Addressofthedeceased.VillageWard;
            this.draft_details_array.StatisticalInformation.permanentcopyaddress = false;

        } else {
            this.draft_details_array.StatisticalInformation.State = '';
            this.staticstical_district_array = [];
            this.draft_details_array.StatisticalInformation.District = '';
            this.draft_details_array.StatisticalInformation.UrbanRural = '';
            this.staticstical_MandalMuncipality_array = [];
            this.draft_details_array.StatisticalInformation.MandalMuncipality = '';
            this.staticstical_village_ward_array = [];
            this.draft_details_array.StatisticalInformation.VillageWard = '';
        }
    }
    permenantcopyadresscheck(event: Event) {
        const isChecked = (event.target as HTMLInputElement).checked;
        if (isChecked) {
            this.draft_details_array.StatisticalInformation.permanentcopyaddress = isChecked;
            this.draft_details_array.StatisticalInformation.State = this.draft_details_array.Addressofthedeceased.State;
            this.getdistrict('Statistical');
            this.draft_details_array.StatisticalInformation.District = this.draft_details_array.Addressofthedeceased.District;
            this.draft_details_array.StatisticalInformation.UrbanRural = this.draft_details_array.Addressofthedeceased.UrbanRural;
            this.MandalMuncipality('Statistical');
            this.draft_details_array.StatisticalInformation.MandalMuncipality = this.draft_details_array.Addressofthedeceased.MandalMuncipality;
            this.VillageWard('Statistical');
            this.draft_details_array.StatisticalInformation.VillageWard = this.draft_details_array.Addressofthedeceased.VillageWard;
            this.draft_details_array.StatisticalInformation.copyaddress = false;

        } else {
            this.draft_details_array.StatisticalInformation.State = '';
            this.staticstical_district_array = [];
            this.draft_details_array.StatisticalInformation.District = '';
            this.draft_details_array.StatisticalInformation.UrbanRural = '';
            this.staticstical_MandalMuncipality_array = [];
            this.draft_details_array.StatisticalInformation.MandalMuncipality = '';
            this.staticstical_village_ward_array = [];
            this.draft_details_array.StatisticalInformation.VillageWard = '';
        }
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
            let rsdata: any = await this.auth.auth_pkgcrsdeath_service(req);

            this.spinner.hide();
            if (rsdata.code) {
                if (rsdata.code && rsdata.Details[0].STATUS == '1') {
                    this.alt.toastsuccess(rsdata.Details[0].STATUS_TEXT + rsdata.Details[0].STATUS_TEXT_TEL);
                    this.logger.logSuccess('Death Data Submitted Successfully', req);
                    this.declarationcheck = false;
                    this.router.navigate(['/shared/inbox']);
                    setTimeout(() => {
                        window.location.reload();
                    }, 1000);
                    //this.downloadorder();

                }
                if (rsdata.code && rsdata.Details[0].STATUS == '0') {
                    this.logger.logError('Death Data Failed', req);
                    this.alt.toasterror(rsdata.Details[0].STATUS_TEXT + rsdata.Details[0].STATUS_TEXT_TEL);
                }
                this.spinner.hide();
            } else {
                this.logger.logError('Death Data Failed API Request Failed', req);
                this.alt.toasterror('The application processing has failed.');
                this.spinner.hide();
            }
        } catch (error) {
            this.spinner.hide();

        }
    }
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

            // Add active state to the selected tab and content
            tabButton.classList.add('active');
            tabContent.classList.add('show', 'active');

            if (tabId == 'pills-deathstaticall-tab') {
                this.StatisticalInformationservice();
            }
            if (tabId == 'pills-confirmdeathl-tab') {
            }
        }
    }

    sameasaddress_outofindia(event: any) {
        const selectedValue = event.target.value;
        this.draft_details_array.Permanentaddress = {
            permantaddressof: this.draft_details_array.Permanentaddress.sameasaddress,
            addressof: selectedValue,
            sameasaddress: this.draft_details_array.Permanentaddress.sameasaddress,
            Country: '',
            Country_val: '',
            address: '',
            address_t: '',
            address_val: '',
            State: '',
            State_val: '',
            District: '',
            District_val: '',
            UrbanRural: '',
            UrbanRural_val: '',
            MandalMuncipality: '',
            MandalMuncipality_val: '',
            VillageWard: '',
            VillageWard_val: '',
            BuildingNo: '',
            BuildingNo_tel: '',
            BuildingNo_val: '',
            HouseNo: '',
            HouseNo_tel: '',
            HouseNo_val: '',
            StreetName: '',
            StreetName_tel: '',
            StreetName_val: '',
            Locality: '',
            Locality_tel: '',
            Locality_val: '',
            PINCode: '',
            PostOffice: '',
            Permanentaddress_value: '',
        };
    }
    SameasAddressofthedeceased(event: any) {

        this.draft_details_array.Permanentaddress.permantaddressof = '';
        const selectedValue = event.target.value;
        this.draft_details_array.Permanentaddress.permantaddressof = selectedValue;
        if (selectedValue == 'No') {
            this.draft_details_array.Permanentaddress = {
                permantaddressof: selectedValue,
                addressof: 'inside',
                sameasaddress: selectedValue,
                Country: '',
                Country_val: '',
                address: '',
                address_t: '',
                address_val: '',
                State: '',
                State_val: '',
                District: '',
                District_val: '',
                UrbanRural: '',
                UrbanRural_val: '',
                MandalMuncipality: '',
                MandalMuncipality_val: '',
                VillageWard: '',
                VillageWard_val: '',
                BuildingNo: '',
                BuildingNo_tel: '',
                BuildingNo_val: '',
                HouseNo: '',
                HouseNo_tel: '',
                HouseNo_val: '',
                StreetName: '',
                StreetName_tel: '',
                StreetName_val: '',
                Locality: '',
                Locality_tel: '',
                Locality_val: '',
                PINCode: '',
                PostOffice: '',
                Permanentaddress_value: '',
            };

        }
        if (selectedValue == 'Yes') {
            this.draft_details_array.Permanentaddress = {
                permantaddressof: selectedValue,
                addressof: this.draft_details_array.Addressofthedeceased.addressof,
                sameasaddress: selectedValue,
                Country: this.draft_details_array.Addressofthedeceased.Country,
                Country_val: '',
                address: this.draft_details_array.Addressofthedeceased.address,
                address_t: this.draft_details_array.Addressofthedeceased.address_t,
                State: this.draft_details_array.Addressofthedeceased.State,
                District: this.draft_details_array.Addressofthedeceased.District,
                UrbanRural: this.draft_details_array.Addressofthedeceased.UrbanRural,
                MandalMuncipality:
                    this.draft_details_array.Addressofthedeceased.MandalMuncipality,
                VillageWard: this.draft_details_array.Addressofthedeceased.VillageWard,
                BuildingNo: this.draft_details_array.Addressofthedeceased.BuildingNo,
                BuildingNo_tel:
                    this.draft_details_array.Addressofthedeceased.BuildingNo_tel,
                HouseNo: this.draft_details_array.Addressofthedeceased.HouseNo,
                HouseNo_tel: this.draft_details_array.Addressofthedeceased.HouseNo_tel,
                StreetName: this.draft_details_array.Addressofthedeceased.StreetName,
                StreetName_tel:
                    this.draft_details_array.Addressofthedeceased.StreetName_tel,
                Locality: this.draft_details_array.Addressofthedeceased.Locality,
                Locality_tel:
                    this.draft_details_array.Addressofthedeceased.Locality_tel,
                PINCode: this.draft_details_array.Addressofthedeceased.PINCode,
                PostOffice: this.draft_details_array.Addressofthedeceased.PostOffice,
                address_val: '',
                State_val: '',
                District_val: '',
                UrbanRural_val: '',
                MandalMuncipality_val: '',
                VillageWard_val: '',
                BuildingNo_val: '',
                HouseNo_val: '',
                StreetName_val: '',
                Locality_val: '',
                Permanentaddress_value: '',
            };
        }
    }
    async validateaadhaar(aadhaar: any, inputsource: any) {
        const checknumaric = this.val.isNumber(aadhaar);
        if (aadhaar.length === 12 && checknumaric == true) {
            const isValidAadhaar = this.mid.validateVerhoeff(aadhaar);
            if (isValidAadhaar == false) {
                if (inputsource == 'deceasedaadhaar') {
                    this.draft_details_array.Confirmnameofthedeceased.AadhaarEIDNumber =
                        '';
                    this.draft_details_array.Confirmnameofthedeceased.AadhaarEIDNumber_mask =
                        '';
                }
                if (inputsource == 'fatheraadhaar') {
                    this.draft_details_array.fatherInformation.father_aadhhar_number = '';
                    this.draft_details_array.fatherInformation.father_aadhhar_number_mask =
                        '';
                }
                if (inputsource == 'Spouseaadhaar') {
                    this.draft_details_array.MaritalStatus.Spouse_AadharNumber = '';
                    this.draft_details_array.MaritalStatus.Spouse_AadharNumber_mask = '';
                }
                if (inputsource == 'motheraadhaar') {
                    this.draft_details_array.motherInformation.mother_aadhaar_number = '';
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
                if (inputsource == 'deceasedaadhaar') {
                    this.draft_details_array.Confirmnameofthedeceased.AadhaarEIDNumber =
                        this.draft_details_array.Confirmnameofthedeceased.AadhaarEIDNumber_mask;
                    this.draft_details_array.Confirmnameofthedeceased.AadhaarEIDNumber_mask =
                        this.maskinput(
                            this.draft_details_array.Confirmnameofthedeceased
                                .AadhaarEIDNumber_mask
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
                    this.draft_details_array.motherInformation.mother_aadhaar_number =
                        this.draft_details_array.motherInformation.mother_aadhaar_number_mask;
                    this.draft_details_array.motherInformation.mother_aadhaar_number_mask =
                        this.maskinput(
                            this.draft_details_array.motherInformation
                                .mother_aadhaar_number_mask
                        );
                }
                if (inputsource == 'Spouseaadhaar') {
                    this.draft_details_array.MaritalStatus.Spouse_AadharNumber =
                        this.draft_details_array.MaritalStatus.Spouse_AadharNumber_mask;
                    this.draft_details_array.MaritalStatus.Spouse_AadharNumber_mask =
                        this.maskinput(
                            this.draft_details_array.MaritalStatus.Spouse_AadharNumber_mask
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
            if (inputsource == 'deceasedaadhaar') {
                this.draft_details_array.Confirmnameofthedeceased.AadhaarEIDNumber = '';
                this.draft_details_array.Confirmnameofthedeceased.AadhaarEIDNumber_mask =
                    '';
            }
            if (inputsource == 'fatheraadhaar') {
                this.draft_details_array.fatherInformation.father_aadhhar_number = '';
                this.draft_details_array.fatherInformation.father_aadhhar_number_mask =
                    '';
            }
            if (inputsource == 'motheraadhaar') {
                this.draft_details_array.motherInformation.mother_aadhaar_number = '';
                this.draft_details_array.motherInformation.mother_aadhaar_number_mask =
                    '';
            }
            if (inputsource == 'informationaadhaar') {
                this.draft_details_array.information.Informant_aadhhar_no = '';
                this.draft_details_array.information.Informant_aadhhar_no_mask = '';
            }
            if (inputsource == 'Spouseaadhaar') {
                this.draft_details_array.MaritalStatus.Spouse_AadharNumber = '';
                this.draft_details_array.MaritalStatus.Spouse_AadharNumber_mask = '';
            }
            this.alt.toasterror('Enter a 12-digit Aadhaar Number.');
        } else {
            if (inputsource == 'deceasedaadhaar') {
                this.draft_details_array.Confirmnameofthedeceased.AadhaarEIDNumber = '';
                this.draft_details_array.Confirmnameofthedeceased.AadhaarEIDNumber_mask =
                    '';
            }
            if (inputsource == 'fatheraadhaar') {
                this.draft_details_array.fatherInformation.father_aadhhar_number = '';
                this.draft_details_array.fatherInformation.father_aadhhar_number_mask =
                    '';
            }
            if (inputsource == 'motheraadhaar') {
                this.draft_details_array.motherInformation.mother_aadhaar_number = '';
                this.draft_details_array.motherInformation.mother_aadhaar_number_mask =
                    '';
            }
            if (inputsource == 'informationaadhaar') {
                this.draft_details_array.information.Informant_aadhhar_no = '';
                this.draft_details_array.information.Informant_aadhhar_no_mask = '';
            }
            if (inputsource == 'Spouseaadhaar') {
                this.draft_details_array.MaritalStatus.Spouse_AadharNumber = '';
                this.draft_details_array.MaritalStatus.Spouse_AadharNumber_mask = '';
            }
            this.alt.toasterror('Enter a 12-digit Aadhaar Number.');
        }
        return;
    }
    validateaadharchildparent(inputsource: any) {
        if (inputsource == 'deceasedaadhaar') {
            if (this.draft_details_array.Confirmnameofthedeceased.AadhaarEIDNumber == this.draft_details_array.information.Informant_aadhhar_no && !this.val.isEmpty(this.draft_details_array.information.Informant_aadhhar_no_mask)) {
                this.draft_details_array.Confirmnameofthedeceased.AadhaarEIDNumber_mask = '';
                this.alt.toasterror('Deceased person Aadhaar Number and Information Aadhaar Number should not be same');
                return;
            }
            if (this.draft_details_array.Confirmnameofthedeceased.AadhaarEIDNumber == this.draft_details_array.fatherInformation.father_aadhhar_number && !this.val.isEmpty(this.draft_details_array.fatherInformation.father_aadhhar_number_mask)) {
                this.draft_details_array.Confirmnameofthedeceased.AadhaarEIDNumber_mask = '';
                this.alt.toasterror('Deceased person Aadhaar Number and Father Aadhaar Number should not be same');
                return;
            }
            if (this.draft_details_array.Confirmnameofthedeceased.AadhaarEIDNumber == this.draft_details_array.motherInformation.mother_aadhaar_number && !this.val.isEmpty(this.draft_details_array.motherInformation.mother_aadhaar_number_mask)) {
                this.draft_details_array.Confirmnameofthedeceased.AadhaarEIDNumber_mask = '';
                this.alt.toasterror('Deceased person Aadhaar Number and Mother Aadhaar Number should not be same');
                return;
            }
            if (this.draft_details_array.Confirmnameofthedeceased.AadhaarEIDNumber == this.draft_details_array.MaritalStatus.Spouse_AadharNumber && !this.val.isEmpty(this.draft_details_array.MaritalStatus.Spouse_AadharNumber_mask)) {
                this.draft_details_array.Confirmnameofthedeceased.AadhaarEIDNumber_mask = '';
                this.alt.toasterror('Spouse Aadhaar Number and deceased person Aadhaar Number should not be same');
                return;
            }
        }
        if (inputsource == 'fatheraadhaar') {
            if (this.draft_details_array.fatherInformation.father_aadhhar_number == this.draft_details_array.Confirmnameofthedeceased.AadhaarEIDNumber && !this.val.isEmpty(this.draft_details_array.Confirmnameofthedeceased.AadhaarEIDNumber_mask)) {
                this.draft_details_array.fatherInformation.father_aadhhar_number_mask = '';
                this.alt.toasterror('Father Aadhaar Number and Deceased Aadhaar Number should not be same');
                return;
            }
            if (this.draft_details_array.fatherInformation.father_aadhhar_number == this.draft_details_array.motherInformation.mother_aadhaar_number && !this.val.isEmpty(this.draft_details_array.motherInformation.mother_aadhaar_number_mask)) {
                this.draft_details_array.fatherInformation.father_aadhhar_number_mask = '';
                this.alt.toasterror('Father Aadhaar Number and Mother Aadhaar Number should not be same');
                return;
            }
            if (this.draft_details_array.fatherInformation.father_aadhhar_number == this.draft_details_array.information.Informant_aadhhar_no && !this.val.isEmpty(this.draft_details_array.information.Informant_aadhhar_no_mask)) {
                this.draft_details_array.fatherInformation.father_aadhhar_number_mask = '';
                this.alt.toasterror('Father Aadhaar Number and Information Aadhaar Number should not be same');
                return;
            }
            if (this.draft_details_array.fatherInformation.father_aadhhar_number == this.draft_details_array.MaritalStatus.Spouse_AadharNumber && !this.val.isEmpty(this.draft_details_array.MaritalStatus.Spouse_AadharNumber_mask)) {
                this.draft_details_array.fatherInformation.father_aadhhar_number_mask = '';
                this.alt.toasterror('Spouse Aadhaar Number and Father Aadhaar Number should not be same');
                return;
            }
        }
        if (inputsource == 'motheraadhaar') {
            if (this.draft_details_array.motherInformation.mother_aadhaar_number == this.draft_details_array.Confirmnameofthedeceased.AadhaarEIDNumber && !this.val.isEmpty(this.draft_details_array.Confirmnameofthedeceased.AadhaarEIDNumber_mask)) {
                this.draft_details_array.motherInformation.mother_aadhaar_number_mask = '';
                this.alt.toasterror('Mother Aadhaar Number and Deceased Aadhaar Number should not be same');
                return;
            }
            if (this.draft_details_array.motherInformation.mother_aadhaar_number == this.draft_details_array.fatherInformation.father_aadhhar_number && !this.val.isEmpty(this.draft_details_array.fatherInformation.father_aadhhar_number_mask)) {
                this.draft_details_array.motherInformation.mother_aadhaar_number_mask = '';
                this.alt.toasterror('Mother Aadhaar Number and Father Aadhaar Number should not be same');
                return;
            }
            if (this.draft_details_array.motherInformation.mother_aadhaar_number == this.draft_details_array.information.Informant_aadhhar_no && !this.val.isEmpty(this.draft_details_array.information.Informant_aadhhar_no_mask)) {
                this.draft_details_array.motherInformation.mother_aadhaar_number_mask = '';
                this.alt.toasterror('Mother Aadhaar Number and Information Aadhaar Number should not be same');
                return;
            }
            if (this.draft_details_array.motherInformation.mother_aadhaar_number == this.draft_details_array.MaritalStatus.Spouse_AadharNumber && !this.val.isEmpty(this.draft_details_array.MaritalStatus.Spouse_AadharNumber_mask)) {
                this.draft_details_array.motherInformation.mother_aadhaar_number_mask = '';
                this.alt.toasterror('Spouse Aadhaar Number and mother Aadhaar Number should not be same');
                return;
            }
        }
        if (inputsource == 'Spouseaadhaar') {
            if (this.draft_details_array.MaritalStatus.Spouse_AadharNumber == this.draft_details_array.Confirmnameofthedeceased.AadhaarEIDNumber && !this.val.isEmpty(this.draft_details_array.Confirmnameofthedeceased.AadhaarEIDNumber_mask)) {
                this.draft_details_array.MaritalStatus.Spouse_AadharNumber_mask = '';
                this.alt.toasterror('Spouse Aadhaar Number and Deceased Aadhaar Number should not be same');
                return;
            }
            if (this.draft_details_array.MaritalStatus.Spouse_AadharNumber == this.draft_details_array.fatherInformation.father_aadhhar_number && !this.val.isEmpty(this.draft_details_array.fatherInformation.father_aadhhar_number_mask)) {
                this.draft_details_array.MaritalStatus.Spouse_AadharNumber_mask = '';
                this.alt.toasterror('Mother Aadhaar Number and Father Aadhaar Number should not be same');
                return;
            }
            if (this.draft_details_array.MaritalStatus.Spouse_AadharNumber == this.draft_details_array.information.Informant_aadhhar_no && !this.val.isEmpty(this.draft_details_array.information.Informant_aadhhar_no_mask)) {
                this.draft_details_array.MaritalStatus.Spouse_AadharNumber_mask = '';
                this.alt.toasterror('Mother Aadhaar Number and Information Aadhaar Number should not be same');
                return;
            }
            if (this.draft_details_array.MaritalStatus.Spouse_AadharNumber == this.draft_details_array.motherInformation.mother_aadhaar_number && !this.val.isEmpty(this.draft_details_array.motherInformation.mother_aadhaar_number_mask)) {
                this.draft_details_array.MaritalStatus.Spouse_AadharNumber_mask = '';
                this.alt.toasterror('Spouse Aadhaar Number and mother Aadhaar Number should not be same');
                return;
            }
        }
        if (inputsource == 'informationaadhaar') {
            if (this.draft_details_array.information.Informant_aadhhar_no == this.draft_details_array.Confirmnameofthedeceased.AadhaarEIDNumber && !this.val.isEmpty(this.draft_details_array.Confirmnameofthedeceased.AadhaarEIDNumber_mask)) {
                this.draft_details_array.information.Informant_aadhhar_no_mask = '';
                this.alt.toasterror('Information Aadhaar Number and Deceased Aadhaar Number should not be same');
                return;
            }
            if (this.draft_details_array.information.Informant_aadhhar_no == this.draft_details_array.fatherInformation.father_aadhhar_number && !this.val.isEmpty(this.draft_details_array.fatherInformation.father_aadhhar_number_mask)) {
                this.draft_details_array.information.Informant_aadhhar_no_mask = '';
                this.alt.toasterror('Information Aadhaar Number and Father Aadhaar Number should not be same');
                return;
            }
            if (this.draft_details_array.information.Informant_aadhhar_no == this.draft_details_array.motherInformation.mother_aadhaar_number && !this.val.isEmpty(this.draft_details_array.motherInformation.mother_aadhaar_number_mask)) {
                this.draft_details_array.information.Informant_aadhhar_no_mask = '';
                this.alt.toasterror('Information Aadhaar Number and Mother Aadhaar Number should not be same');
                return;
            }
            if (this.draft_details_array.information.Informant_aadhhar_no == this.draft_details_array.MaritalStatus.Spouse_AadharNumber && !this.val.isEmpty(this.draft_details_array.MaritalStatus.Spouse_AadharNumber_mask)) {
                this.draft_details_array.information.Informant_aadhhar_no_mask = '';
                this.alt.toasterror('Spouse Aadhaar Number and Information Aadhaar Number should not be same');
                return;
            }
        }

    }
    async changeaadhaarmode() {
        this.draft_details_array.Confirmnameofthedeceased.AadhaarEIDNumber = '';
        this.draft_details_array.Confirmnameofthedeceased.AadhaarEIDNumber_mask =
            '';
    }
    maskinput(objinput: string) {
        const maskedAadhaar = objinput.replace(/\d(?=\d{4})/g, '*');
        return maskedAadhaar !== '' ? maskedAadhaar : '';
    }
    isLegalEnabled: boolean = true; // Enable the first tab by default
    isStatisticalEnabled: boolean = false;
    isConfirmLegalEnabled: boolean = false;
    isConfirmStatisticalEnabled: boolean = false;
    enableLegalTab() {
        this.father_mother_spouse_check_status = false;
        this.isLegalEnabled = true;
        this.isStatisticalEnabled = false;
        this.openTab('pills-deathlegal-tab');
        this.spinner.hide();
    }
    applicationsubmittype = "Legal";
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
    enableStatisticalTab() {
        this.applicationsubmittype = "Legal";
        this.legal_from_check_inpts();
        this.spinner.hide();
    }

    enableConfirmLegalTab() {
        this.applicationsubmittype = "Statistical";
        this.statistical_from_check_inpts();
        this.spinner.hide();
    }
    enableConfirmStatisticalTab() {
        this.openTab('pills-confirmdeathstatistic-tab');
        this.isConfirmStatisticalEnabled = true;
        this.spinner.hide();
    }
    @ViewChild('dateofreport') dateofreport!: NgModel;
    @ViewChild('ngDateofDeath') ngDateofDeath!: NgModel;
    @ViewChild('ngConfirmDateofDeath') ngConfirmDateofDeath!: NgModel;
    @ViewChild('sel_gender') sel_gender!: NgModel;
    @ViewChild('ngInformationFullName') ngInformationFullName!: NgModel;
    @ViewChild('InformationofthedeceasedSurname') InformationofthedeceasedSurname!: NgModel;
    @ViewChild('ngInformationofthedeceasedSurnametel') ngInformationofthedeceasedSurnametel!: NgModel;
    @ViewChild('ngFullName_tel') ngFullName_tel!: NgModel;
    @ViewChild('confrimngFullName') confrimngFullName!: NgModel;
    @ViewChild('confirmngFullName_tel') confirmngFullName_tel!: NgModel;
    @ViewChild('ngSurname') ngSurname!: NgModel;
    @ViewChild('Surname_tel') Surname_tel!: NgModel;
    @ViewChild('ngHospitalName') ngHospitalName!: NgModel;
    @ViewChild('ngPlaceofDeath') ngPlaceofDeath!: NgModel;
    @ViewChild('ngDeath_State') ngDeath_State!: NgModel;
    @ViewChild('ngDeath_District') ngDeath_District!: NgModel;
    @ViewChild('ngDeath_UrbanRural') ngDeath_UrbanRural!: NgModel;
    @ViewChild('ngDeath_MandalMuncipality') ngDeath_MandalMuncipality!: NgModel;
    @ViewChild('ngDeath_VillageWard') ngDeath_VillageWard!: NgModel;
    @ViewChild('informant_fullname') informant_fullname!: NgModel;
    @ViewChild('informant_address') informant_address!: NgModel;
    dateofbirthInput!: ElementRef; // Reference for focus 

    legal_from_check_inpts() {
        let isInvalid = false;
        if (this.dateofreport) {
            this.dateofreport.control.markAsTouched();
            this.dateofreport.control.updateValueAndValidity();
            if (this.dateofreport.invalid) isInvalid = true;
        }
        if (this.ngDateofDeath) {
            this.ngDateofDeath.control.markAsTouched();
            this.ngDateofDeath.control.updateValueAndValidity();
            if (this.ngDateofDeath.invalid) isInvalid = true;
        }
        if (this.ngConfirmDateofDeath) {
            this.ngConfirmDateofDeath.control.markAsTouched();
            this.ngConfirmDateofDeath.control.updateValueAndValidity();
            if (this.ngConfirmDateofDeath.invalid) isInvalid = true;
        }
        if (this.sel_gender) {
            this.sel_gender.control.markAsTouched();
            this.sel_gender.control.updateValueAndValidity();
            if (this.sel_gender.invalid) isInvalid = true;
        }
        if (this.ngInformationFullName) {
            this.ngInformationFullName.control.markAsTouched();
            this.ngInformationFullName.control.updateValueAndValidity();
            if (this.ngInformationFullName.invalid) isInvalid = true;
        }
        if (this.ngFullName_tel) {
            this.ngFullName_tel.control.markAsTouched();
            this.ngFullName_tel.control.updateValueAndValidity();
            if (this.ngFullName_tel.invalid) isInvalid = true;
        }
        if (this.InformationofthedeceasedSurname) {
            this.InformationofthedeceasedSurname.control.markAsTouched();
            this.InformationofthedeceasedSurname.control.updateValueAndValidity();
            if (this.InformationofthedeceasedSurname.invalid) isInvalid = true;
        }
        if (this.ngInformationofthedeceasedSurnametel) {
            this.ngInformationofthedeceasedSurnametel.control.markAsTouched();
            this.ngInformationofthedeceasedSurnametel.control.updateValueAndValidity();
            if (this.ngInformationofthedeceasedSurnametel.invalid) isInvalid = true;
        }
        if (this.confrimngFullName) {
            this.confrimngFullName.control.markAsTouched();
            this.confrimngFullName.control.updateValueAndValidity();
            if (this.confrimngFullName.invalid) isInvalid = true;
        }
        if (this.confirmngFullName_tel) {
            this.confirmngFullName_tel.control.markAsTouched();
            this.confirmngFullName_tel.control.updateValueAndValidity();
            if (this.confirmngFullName_tel.invalid) isInvalid = true;
        }
        if (this.ngSurname) {
            this.ngSurname.control.markAsTouched();
            this.ngSurname.control.updateValueAndValidity();
            if (this.ngSurname.invalid) isInvalid = true;
        }
        if (this.Surname_tel) {
            this.Surname_tel.control.markAsTouched();
            this.Surname_tel.control.updateValueAndValidity();
            if (this.Surname_tel.invalid) isInvalid = true;
        }
        if (this.ngPlaceofDeath) {
            this.ngPlaceofDeath.control.markAsTouched();
            this.ngPlaceofDeath.control.updateValueAndValidity();
            if (this.ngPlaceofDeath.invalid) isInvalid = true;
        }
        if (this.ngHospitalName) {
            this.ngHospitalName.control.markAsTouched();
            this.ngHospitalName.control.updateValueAndValidity();
            if (this.ngHospitalName.invalid) isInvalid = true;
        }
        if (this.ngDeath_State) {
            this.ngDeath_State.control.markAsTouched();
            this.ngDeath_State.control.updateValueAndValidity();
            if (this.ngDeath_State.invalid) isInvalid = true;
        }
        if (this.ngDeath_District) {
            this.ngDeath_District.control.markAsTouched();
            this.ngDeath_District.control.updateValueAndValidity();
            if (this.ngDeath_District.invalid) isInvalid = true;
        }
        if (this.ngDeath_UrbanRural) {
            this.ngDeath_UrbanRural.control.markAsTouched();
            this.ngDeath_UrbanRural.control.updateValueAndValidity();
            if (this.ngDeath_UrbanRural.invalid) isInvalid = true;
        }
        if (this.ngDeath_MandalMuncipality) {
            this.ngDeath_MandalMuncipality.control.markAsTouched();
            this.ngDeath_MandalMuncipality.control.updateValueAndValidity();
            if (this.ngDeath_MandalMuncipality.invalid) isInvalid = true;
        }
        if (this.ngDeath_VillageWard) {
            this.ngDeath_VillageWard.control.markAsTouched();
            this.ngDeath_VillageWard.control.updateValueAndValidity();
            if (this.ngDeath_VillageWard.invalid) isInvalid = true;
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
        if (isInvalid) {
            this.legal_form_alert();
        }
        if (!isInvalid) {
            this.legal_checkAndShowAlert();

        }

        if (this.birthvalidate && !this.proceedingfileSelected) {
            this.proceedingfileError = true;
            isInvalid = true;
        }
    }
    Spouse_FullName_alert = true;
    father_full_namer_alert = true;
    // legal_checkAndShowAlert() {  
    //     let anyvalid = true;
    //     //if (!this.father_mother_spouse_check_status) {
    //         if (this.val.isEmpty(this.draft_details_array.motherInformation.mother_full_name) && this.val.isEmpty(this.draft_details_array.fatherInformation.father_full_namer) && this.val.isEmpty(this.draft_details_array.MaritalStatus.Spouse_FullName)) {
    //             anyvalid = false;
    //             this.swalform_alert("Do you want to keep the information of mother , father and spouse blank? మీరు తల్లి, తండ్రి మరియు భార్య/భర్త సమాచారము ఖాళీగా ఉంచదలచుకున్నారా?");
    //         }
    //         if (this.val.isEmpty(this.draft_details_array.motherInformation.mother_full_name) && this.val.isEmpty(this.draft_details_array.fatherInformation.father_full_namer)) {
    //             anyvalid = false;
    //             this.swalform_alert("Do you want to keep the information of mother and father blank? మీరు తల్లి మరియు తండ్రి సమాచారము ఖాళీగా ఉంచదలచుకున్నారా?");
    //         }
    //         if (this.val.isEmpty(this.draft_details_array.motherInformation.mother_full_name) && this.val.isEmpty(this.draft_details_array.MaritalStatus.Spouse_FullName)) {
    //             anyvalid = false;
    //             this.swalform_alert("Do you want to keep the information of mother and spouse blank? మీరు తల్లి మరియు భార్య/భర్త సమాచారము ఖాళీగా ఉంచదలచుకున్నారా?");
    //         }
    //         if (this.val.isEmpty(this.draft_details_array.fatherInformation.father_full_namer) && this.val.isEmpty(this.draft_details_array.MaritalStatus.Spouse_FullName)) {
    //             anyvalid = false;
    //             this.swalform_alert("Do you want to keep the information of father and spouse blank? మీరు తండ్రి మరియు భార్య/భర్త సమాచారము ఖాళీగా ఉంచదలచుకున్నారా?");
    //         }
    //         if (this.val.isEmpty(this.draft_details_array.motherInformation.mother_full_name)) {
    //             anyvalid = false;
    //             this.swalform_alert("Do you want to keep the information of mother blank? మీరు తల్లి సమాచారము ఖాళీగా ఉంచదలచుకున్నారా?",);
    //         }
    //         if (this.val.isEmpty(this.draft_details_array.MaritalStatus.Spouse_FullName) && this.Spouse_FullName_alert) {
    //             anyvalid = false;
    //             this.swalform_alert("Do you want to keep the information of spouse blank? మీరు భార్య/భర్త సమాచారము ఖాళీగా ఉంచదలచుకున్నారా?",'Spouse_FullName');
    //         }
    //         if (this.val.isEmpty(this.draft_details_array.fatherInformation.father_full_namer) && this.father_full_namer_alert) {
    //             anyvalid = false;
    //             this.swalform_alert("Do you want to keep the information of father blank? మీరు తండ్రి సమాచారము ఖాళీగా ఉంచదలచుకున్నారా?",'father_full_namer');
    //         }

    //    // }
    //     if (anyvalid) {
    //         this.isStatisticalEnabled = true;
    //         
    //         this.openTab('pills-deathstaticall-tab');
    //         this.spinner.hide();
    //     }
    // }

    // swalform_alert(alertmsg: any,type:any) {
    //     Swal.fire({
    //         title: 'Please Confirm !దయచేసి నిర్ధారించండి !',
    //         text: alertmsg,
    //         showCancelButton: true,
    //         cancelButtonText: 'Cancel',
    //         confirmButtonText: 'Confirm',
    //     }).then((result) => {
    //         if (result.isConfirmed) {
    //             this.father_mother_spouse_check_status = false;
    //             switch (type) {
    //                 case 'father_full_namer':
    //                     this.father_full_namer_alert= false;
    //                     break;
    //                     case 'Spouse_FullName':
    //                     this.Spouse_FullName_alert= false;
    //                     break;

    //                 default:
    //                     break;
    //             }
    //             this.father_full_namer_alert=false;
    //             this.legal_checkAndShowAlert();
    //         }
    //     });
    // }

    documentInserted: boolean = false;
    father_mother_spouse_check_status = false;
    async legal_checkAndShowAlert() {
        
        if (!this.father_mother_spouse_check_status) {
            const missingMessages: string[] = [];

            const isMotherEmpty = this.val.isEmpty(this.draft_details_array.motherInformation.mother_full_name);
            const isFatherEmpty = this.val.isEmpty(this.draft_details_array.fatherInformation.father_full_namer);
            const isSpouseEmpty = this.val.isEmpty(this.draft_details_array.MaritalStatus.Spouse_FullName);

            if (isMotherEmpty && isFatherEmpty) {
                missingMessages.push("Do you want to keep the information of mother and father blank? మీరు తల్లి మరియు తండ్రి సమాచారము ఖాళీగా ఉంచదలచుకున్నారా?");
            }
            if (isMotherEmpty && isSpouseEmpty) {
                missingMessages.push("Do you want to keep the information of mother and spouse blank? మీరు తల్లి మరియు భార్య సమాచారము ఖాళీగా ఉంచదలచుకున్నారా?");
            }
            if (isFatherEmpty && isSpouseEmpty) {
                missingMessages.push("Do you want to keep the information of father and spouse blank? మీరు తండ్రి మరియు భార్య సమాచారము ఖాళీగా ఉంచదలచుకున్నారా?");
            }
            if (isMotherEmpty) {
                missingMessages.push("Do you want to keep the information of mother blank? మీరు తల్లి సమాచారము ఖాళీగా ఉంచదలచుకున్నారా?");
            }

            if (isFatherEmpty) {
                missingMessages.push("Do you want to keep the information of father blank? మీరు తండ్రి సమాచారము ఖాళీగా ఉంచదలచుకున్నారా?");
            }

            if (isSpouseEmpty) {
                missingMessages.push("Do you want to keep the information of spouse blank? మీరు భార్య సమాచారము ఖాళీగా ఉంచదలచుకున్నారా?");
            }
            if (isSpouseEmpty) {
                missingMessages.push("Do you want to keep the information of spouse blank? మీరు భార్య సమాచారము ఖాళీగా ఉంచదలచుకున్నారా?");
            }
            if (this.val.isEmpty(this.draft_details_array.Confirmnameofthedeceased.AadhaarEIDNumber_mask)) {
                missingMessages.push("Do you want to continue without name of the deceased Aadhar Number? మరణించిన వారి ఆధార్ నంబర్ లేకుండా మీరు కొనసాగించాలనుకుంటున్నారా?");
            }
            if (this.val.isEmpty(this.draft_details_array.fatherInformation.father_aadhhar_number_mask)) {
                missingMessages.push("Do you want to continue without Father's Aadhar Number?మీరు తండ్రి ఆధార్ నంబర్ లేకుండా కొనసాగించాలనుకుంటున్నారా?");
            }
            if (this.val.isEmpty(this.draft_details_array.motherInformation.mother_aadhaar_number_mask)) {
                missingMessages.push("Do you want to continue without Mother's Aadhar Number?మీరు తల్లి ఆధార్ నంబర్ లేకుండా కొనసాగించాలనుకుంటున్నారా?");
            }
            if (this.val.isEmpty(this.draft_details_array.MaritalStatus.Spouse_AadharNumber_mask)) {
                missingMessages.push("Do you want to continue without Spouse Aadhar Number?మీరు భార్య ఆధార్ నంబర్ లేకుండా కొనసాగించాలనుకుంటున్నారా?");
            }

            // Optional: If all are empty, push a summary message at the beginning
            if (isMotherEmpty && isFatherEmpty && isSpouseEmpty) {
                missingMessages.unshift("Do you want to keep the information of mother, father and spouse blank? మీరు తల్లి, తండ్రి మరియు భార్య సమాచారము ఖాళీగా ఉంచదలచుకున్నారా?");
            }

            // Show all alerts one by one
            for (let msg of missingMessages) {
                const confirmed = await this.swalform_alert(msg);
                if (!confirmed) return;
            }

            this.father_mother_spouse_check_status = true;
        }
        if(this.father_mother_spouse_check_status){  
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
            this.openTab('pills-deathstaticall-tab');
            this.get_document_details(); 
        }
        this.spinner.hide(); 
    }

    swalform_alert(alertmsg: string): Promise<boolean> {
        return Swal.fire({
            title: 'Please Confirm !దయచేసి నిర్ధారించండి !',
            text: alertmsg,
            showCancelButton: true,
            cancelButtonText: 'Cancel',
            confirmButtonText: 'Confirm',
        }).then(result => result.isConfirmed);
    }


    legal_form_alert() {
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
    @ViewChild('ngStat_State') ngStat_State!: NgModel;
    @ViewChild('ngStat_District') ngStat_District!: NgModel;
    @ViewChild('ngStat_UrbanRural') ngStat_UrbanRural!: NgModel;
    @ViewChild('ngStat_MandalMuncipality') ngStat_MandalMuncipality!: NgModel;
    @ViewChild('ngStat_VillageWard') ngStat_VillageWard!: NgModel;
    @ViewChild('ngReligion') ngReligion!: NgModel;
    @ViewChild('ngEducation') ngEducation!: NgModel;
    @ViewChild('ngOccupation') ngOccupation!: NgModel;
    @ViewChild('ngmedicalattention') ngmedicalattention!: NgModel;
    @ViewChild('ngcauseofdeath') ngcauseofdeath!: NgModel;
    @ViewChild('ngcauseofdeath') ngSupportingDocuments!: NgModel;
    @ViewChild('ngmultiSupportingDocuments') ngmultiSupportingDocuments!: NgModel;

    fileSelected: boolean = false;
    fileError: boolean = false;
    multifileSelected: boolean = false;
    multifileError: boolean = false;
    statistical_from_check_inpts() {
        let isInvalid = false;
        if (this.ngStat_State) {
            this.ngStat_State.control.markAsTouched();
            this.ngStat_State.control.updateValueAndValidity();
            if (this.ngStat_State.invalid) isInvalid = true;
        }
        if (this.ngStat_District) {
            this.ngStat_District.control.markAsTouched();
            this.ngStat_District.control.updateValueAndValidity();
            if (this.ngStat_District.invalid) isInvalid = true;
        }
        if (this.ngStat_UrbanRural) {
            this.ngStat_UrbanRural.control.markAsTouched();
            this.ngStat_UrbanRural.control.updateValueAndValidity();
            if (this.ngStat_UrbanRural.invalid) isInvalid = true;
        }
        if (this.ngStat_MandalMuncipality) {
            this.ngStat_MandalMuncipality.control.markAsTouched();
            this.ngStat_MandalMuncipality.control.updateValueAndValidity();
            if (this.ngStat_MandalMuncipality.invalid) isInvalid = true;
        }
        if (this.ngStat_VillageWard) {
            this.ngStat_VillageWard.control.markAsTouched();
            this.ngStat_VillageWard.control.updateValueAndValidity();
            if (this.ngStat_VillageWard.invalid) isInvalid = true;
        }
        if (this.ngReligion) {
            this.ngReligion.control.markAsTouched();
            this.ngReligion.control.updateValueAndValidity();
            if (this.ngReligion.invalid) isInvalid = true;
        }
        if (this.ngEducation) {
            this.ngEducation.control.markAsTouched();
            this.ngEducation.control.updateValueAndValidity();
            if (this.ngEducation.invalid) isInvalid = true;
        }
        if (this.ngOccupation) {
            this.ngOccupation.control.markAsTouched();
            this.ngOccupation.control.updateValueAndValidity();
            if (this.ngOccupation.invalid) isInvalid = true;
        }
        if (this.ngmedicalattention) {
            this.ngmedicalattention.control.markAsTouched();
            this.ngmedicalattention.control.updateValueAndValidity();
            if (this.ngmedicalattention.invalid) isInvalid = true;
        }
        if (this.ngcauseofdeath) {
            this.ngcauseofdeath.control.markAsTouched();
            this.ngcauseofdeath.control.updateValueAndValidity();
            if (this.ngcauseofdeath.invalid) isInvalid = true;
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
            this.statistical_from_alert();
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
            this.openTab('pills-confirmdeathl-tab');
            this.get_document_details(); 
        }
        this.spinner.hide();
    }
    statistical_from_alert() {
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
    async backwindowdraftbinding(obj: any) {
        this.PlaceofDeathchange();
        this.draft_details_array = obj;
        if (this.draft_details_array.language.dateofreport == null || this.draft_details_array.language.dateofreport == "" || this.draft_details_array.language.dateofreport == undefined) {
            this.draft_details_array.language.dateofreport = this.datepipe.transform(new Date(), 'dd-MM-yyyy');
        }
        if (this.draft_details_array.Addressofthedeceased.addressof == null || this.draft_details_array.Addressofthedeceased.addressof == "" || this.draft_details_array.Addressofthedeceased.addressof == undefined) {
            this.draft_details_array.Addressofthedeceased.addressof = 'inside';
        }
        if (this.draft_details_array.MaritalStatus.Spouse_Married_Status == null || this.draft_details_array.MaritalStatus.Spouse_Married_Status == "" || this.draft_details_array.MaritalStatus.Spouse_Married_Status == undefined) {
            this.draft_details_array.MaritalStatus.Spouse_Married_Status = 'Married';
        }
        this.draft_details_array.Permanentaddress.permantaddressof = this.draft_details_array.Permanentaddress.sameasaddress;
        this.informationhide = false;
        if (this.obj[0].HOSPITAL_ID != "" && this.UROLE == '108') {

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
            this.informationhide = true;
        }

        this.informationhide = false;
        if (this.draft_details_array.PlaceofDeath.PlaceofDeath == "1") {
            this.informationhide = true;
        }

        // this.dateofreportdesiable = false;
        // if (this.UROLE == '105' || this.UROLE == '112' || this.UROLE == '111' || this.UROLE == '1007') {
        //     this.dateofreportdesiable = true;
        // }
        this.get_SupportingDocuments();

        let diffdate = this.calculateyesrDiff(this.draft_details_array.Informationofthedeceased.DateofDeath);
        if (diffdate > 365) {
            this.birthvalidate = true;
        }


    }

    async loadalldropdowns() {
        if (this.draft_details_array.Addressofthedeceased.State != '') {
            await this.getdistrict('deceased');
        }
        if (this.draft_details_array.Addressofthedeceased.State != '' && this.draft_details_array.Addressofthedeceased.District != '' && this.draft_details_array.Addressofthedeceased.UrbanRural != '') {
            await this.MandalMuncipality('deceased');
        }
        if (this.draft_details_array.Addressofthedeceased.State != '' && this.draft_details_array.Addressofthedeceased.District != '' && this.draft_details_array.Addressofthedeceased.UrbanRural != '' && this.draft_details_array.Addressofthedeceased.MandalMuncipality != '') {
            await this.VillageWard('deceased');
        }
        if (this.draft_details_array.Permanentaddress.State != '') {
            await this.getdistrict('Permanent');
        }
        if (this.draft_details_array.Permanentaddress.State != '' && this.draft_details_array.Permanentaddress.District != '' && this.draft_details_array.Permanentaddress.UrbanRural != '') {
            await this.MandalMuncipality('Permanent');
        }
        if (this.draft_details_array.Permanentaddress.State != '' && this.draft_details_array.Permanentaddress.District != '' && this.draft_details_array.Permanentaddress.UrbanRural != '' && this.draft_details_array.Permanentaddress.MandalMuncipality != '') {
            await this.VillageWard('Permanent');
        }
        if (this.draft_details_array.PlaceofDeath.PlaceofDeath != "1") {
            if (this.draft_details_array.PlaceofDeath.State != '') {
                await this.getdistrict('PlaceofDeath');
            }
            if (this.draft_details_array.PlaceofDeath.State != '' && this.draft_details_array.PlaceofDeath.District != '' && this.draft_details_array.PlaceofDeath.UrbanRural != '') {
                await this.MandalMuncipality('PlaceofDeath');
            }
            if (this.draft_details_array.PlaceofDeath.State != '' && this.draft_details_array.PlaceofDeath.District != '' && this.draft_details_array.PlaceofDeath.UrbanRural != '' && this.draft_details_array.PlaceofDeath.MandalMuncipality != '') {
                await this.VillageWard('PlaceofDeath');
            }
        }
        if (this.draft_details_array.StatisticalInformation.State != '') {
            await this.getdistrict('Statistical');
        }
        if (this.draft_details_array.StatisticalInformation.State != '' && this.draft_details_array.StatisticalInformation.District != '' && this.draft_details_array.StatisticalInformation.UrbanRural != '') {
            await this.MandalMuncipality('Statistical');
        }
        if (this.draft_details_array.StatisticalInformation.State != '' && this.draft_details_array.StatisticalInformation.District != '' && this.draft_details_array.StatisticalInformation.UrbanRural != '' && this.draft_details_array.StatisticalInformation.MandalMuncipality != '') {
            await this.VillageWard('Statistical');
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
    clearspousedetails(eventvalue: any) {

        const selectedValue = eventvalue.target.value;
        this.draft_details_array.MaritalStatus = {
            Spouse_Married_Status: selectedValue,
            Spouse_FullName: '',
            Spouse_FullName_tel: '',
            Spouse_FullName_val: '',
            Spouse_Surname: '',
            Spouse_Surname_tel: '',
            Spouse_Surname_val: '',
            Spouse_AadharNumber: '',
            Spouse_DateofBirth: '',
            Spouse_AgeYear: '',
            Spouse_ContactDetails_EmailId: '',
            Spouse_ContactDetails_Mobileno: '',
            Spouse_FullName_value: '',
            Spouse_middlename: '',
            Spouse_middlename_tel: '',
            Spouse_AadharNumber_mask: '',
        };
    }
    displaymodal = 'none';
    ModalCLose() {
        this.displaymodal = 'none';
    }
    ModalOpen() {

        this.displaymodal = 'block';
    }
    PaymentName: any;
    payredirection() {
        this.ModalCLose();
        this.redirectpaymentpage = true;
        this.PaymentName = "Death";
    }
    redirectpaymentpage = false; registrationfee = "0"; tranctionid = "0";
    async Application_final_submit_payment_intiate(): Promise<void> {
        try {
            this.redirectpaymentpage = false;
            const req = new basemodel();
            req.type = '10031';
            req.param1 = this.brapplicationid;
            this.spinner.show();
            let rsdata: any = await this.auth.auth_pkgcrsdeath_service(req);
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

    //Uploads
    multiphotoselectedFiles: File[] = [];
    multifileupload(event: any) {

        const files: File[] = event.target.files;
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
                        phform.append('input01', 'Death');
                        phform.append('input02', 'deathregistration');
                        phform.append('input03', 'PDF');
                        phform.append('input04', filename);
                        phform.append('userid', this.RU_CODE);
                        phform.append('source', 'wed');
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
                                        // this.multidocumentinsert(this.documnets[ph]);
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
            let rsdata: any = await this.auth.auth_pkgcrsdeath_service(req);

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
    PathReportString: any; isModalVisible: boolean = false;
    async downloadorder() {
        try {
            const req = new basemodel();
            req.type = '1022';
            req.param1 = this.brapplicationid
            req.param4 = 'deathack';
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
