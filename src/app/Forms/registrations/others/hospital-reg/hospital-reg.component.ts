import { HttpClient } from '@angular/common/http';
import {
    Component,
    ElementRef,
    Inject,
    OnInit,
    Renderer2,
    ViewChild,
} from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { NgxSpinnerService } from 'ngx-spinner';
import { MiddlewareService } from 'src/app/services/middleware_lyr/middleware.service';
import { EncDecService } from 'src/app/services/enc_dec_lyr/enc-dec.service';
import { AlertsService } from 'src/app/services/alert_lyr/alerts.service';
import { PrivateService } from 'src/app/services/api_lyr/private/private.service';
import { basemodel } from 'src/app/thirparty/model/apimodel';
import { DOCUMENT, DatePipe } from '@angular/common';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import * as CryptoJS from 'crypto-js';
import { GeolocationService } from 'src/app/services/geolocation.service';
import { AuthserService } from 'src/app/services/api_lyr/private/authser.service';
import { Router } from '@angular/router';
@Component({
    selector: 'app-hospital-reg',
    templateUrl: './hospital-reg.component.html',
    styleUrl: './hospital-reg.component.css'
})
export class HospitalRegComponent {
    constructor(
        private spinner: NgxSpinnerService,
        private alt: AlertsService,
        private pscall: PrivateService,
        //private unauth: UnauthserService,
        private auth: AuthserService,
        private httpClient: HttpClient,
        private mid: MiddlewareService,
        private geolocationService: GeolocationService,
        private sanitizer: DomSanitizer,
        private encdc: EncDecService,
        private router: Router,
        @Inject(DOCUMENT) private document: Document,
        private el: ElementRef
    ) { }

    crs_hosipatalreg_form = {
        hosiatalcode: '',
        hosipatal_category: '',
        Hosipatal_type: '',
        hosiatalname: '',
        state: '',
        district: '',
        subdistrict: '',
        registration: '',
        village: '',
        email: '',
        mobileno: '',
        place: '',
        status: '',
        Hosipatal_code: '',
        Email: '',
        mandal: '',
        Address: '',
        building_no: '',
        house_no: '',
        hosiatalname_telugu: '',
        primary_mobile_number: '',
        street_name_telugu: '',
        street_name: '',
        locatity: '',
        locatity_telugu: '',
        pincode: '',
        Authorise_person_name: '',
        Authorise_mobile_no: '',
        Authorise_email_id: '',
        address: '',
        hosiatalname_tel: '',
        hosiatalcategory: '',
        hosiataltype: '',
        village_ward: '',
        auth_email: '',
        auth_mobileno: '',
        auth_name: '',
        rural_urban: '',
    };
    displausername = '';
    designationname = '';
    user_type = '';
    approve_status = '';
    user_role = '';
    u_id = '';
    RU_CODE = '';
    isdistrictdisable: boolean = false;
    detailsdisable: boolean = false;
    async ngOnInit(): Promise<void> {
        if (sessionStorage.getItem('_Uenc') !== '') {
            //this.collapsed = true;
            let obj: any = this.encdc.Getuser();
            if (obj != '' && obj != undefined && obj != null) {
                debugger
                this.displausername = obj[0].UNAME;
                this.u_id = obj[0].UID;
                this.designationname = obj[0].UDPDESIGNATION;
                this.user_type = obj[0].UTYPE;
                this.user_role = obj[0].UROLE;
                this.crs_hosipatalreg_form.district = obj[0].DISTRICT_CODE; 
                this.crs_hosipatalreg_form.rural_urban=obj[0].RURAL_URBAN;
                if (obj[0].MMC_CODE!='') {
                await this.MandalMuncipality();
                this.crs_hosipatalreg_form.mandal = obj[0].MMC_CODE;
                }
                if (obj[0].VW_CODE!='') {
                    await this.VillageWard();
                    this.crs_hosipatalreg_form.village_ward = obj[0].VW_CODE;
                }
                this.RU_CODE = obj[0].RU_CODE;
                if (obj[0].DISTRICT_CODE != '0') {
                    this.isdistrictdisable = true;
                    
                }
                else {
                    this.isdistrictdisable = false;
                } 
              
                await this.get_hospital_details();
                await this.getdistrict();
                
                if (
                    obj[0].DISTRICT_CODE && 
                    obj[0].RURAL_URBAN && 
                    obj[0].MMC_CODE && 
                    obj[0].VW_CODE
                  ) {
                    this.detailsdisable = true;  
                  } else {
                    this.detailsdisable = false; 
                  }
            } else {
                this.encdc.Usersessionkill();
            }
        } else {
            this.router.navigate(['/Sessionexpired']);
        }
    }
    suggestions: any;
    async Teluglanguageconvrt(inputkeyval: any, inputsource: any) {
        this.pscall.Cdac_transliterateText(inputkeyval).subscribe(
            (response: any) => {
                if (response[0] == 'SUCCESS') {
                    this.suggestions = response[1][0][1];
                    if (inputsource == 'hosiatalname_tel') {
                        this.crs_hosipatalreg_form.hosiatalname_tel = this.suggestions[0];
                    }
                    if (inputsource == 'hosiatalname_tel_upd') {
                        this.update_crs_hosipatalreg_form.hosiatalname_tel_upd = this.suggestions[0];
                    }
                }
                else {
                    if (inputsource == 'hosiatalname_tel') {
                        this.crs_hosipatalreg_form.hosiatalname_tel = '';
                    }
                    if (inputsource == 'hosiatalname_tel_upd') {
                        this.update_crs_hosipatalreg_form.hosiatalname_tel_upd = '';
                    }
                }
            },
            (error) => {
                if (inputsource == 'hosiatalname_tel') {
                    this.crs_hosipatalreg_form.hosiatalname_tel = '';
                }
                if (inputsource == 'hosiatalname_tel_upd') {
                    this.update_crs_hosipatalreg_form.hosiatalname_tel_upd = '';
                }
                return '';
            }
        );
    }
    getcancel(){
        this.update_crs_hosipatalreg_form = {
            hosiataltype_upd: '',
            hosiatalcode_upd: '',
            hosiatalcategory_upd: '',
            Hosipatal_type_upd: '',
            hosiatalname_upd: '',
            state_upd: '',
            district_upd: '',
            subdistrict_upd: '',
            registration_upd: '',
            village_upd: '',
            email_upd: '',
            mobileno_upd: '',
            place_upd: '',
            status_upd: '',
            Hosipatal_code_upd: '',
            Email_upd: '',
            mandal_upd: '',
            Address_upd: '',
            building_no_upd: '',
            house_no_upd: '',
            hosiatalname_telugu_upd: '',
            primary_mobile_number_upd: '',
            street_name_telugu_upd: '',
            street_name_upd: '',
            locatity_upd: '',
            locatity_telugu_upd: '',
            pincode_upd: '',
            address_upd: '',
            hosiatalname_tel_upd: '',
            village_ward_upd: '',
            auth_email_upd: '',
            auth_mobileno_upd: '',
            auth_name_upd: '',
            rural_urban_upd: '',
        };
    }
    hospital_cate_array: any[] = [];
    async gets_hospital_cate_data(): Promise<void> {
        try {
            const req = new basemodel();
            req.type = '1022';
            this.spinner.show();
            this.hospital_cate_array = [];
            let responce: any = await this.auth.auth_utilities_service(req);
            
            this.spinner.hide();
            if (responce.code) {
                this.hospital_cate_array = responce.Details;
                this.spinner.hide();
                return;
            } else {
                this.hospital_cate_array = [];
                this.spinner.hide();
                return;
            }
        } catch (error) {
            this.spinner.hide();
           
            this.hospital_cate_array = [];
            return;
        }
    }
    state_array: any[] = [];
    async getstatedata(): Promise<void> {
        try {
            const req = new basemodel();
            req.type = '1001';
            this.spinner.show();
            this.state_array = [];
            let responce: any = await this.auth.auth_utilities_service(req);
            this.spinner.hide();
            if (responce.code) {
                this.state_array = responce.Details;
                this.spinner.hide();
                return;
            } else {
                this.state_array = [];
                this.spinner.hide();
                return;
            }
        } catch (error) {
            this.spinner.hide();
           
            this.state_array = [];
            return;
        }
    }
    Addressofparents_district_array: any[] = [];
    async getdistrict(): Promise<void> {
        try {
            const req = new basemodel();
            req.type = '1002';
            req.param1 = '28';//this.crs_hosipatalreg_form.state;
            this.spinner.show();
            let responce: any = await this.auth.auth_utilities_service(req);
            this.spinner.hide();
            this.Addressofparents_district_array = [];
            if (responce.code) {
                this.Addressofparents_district_array = responce.Details;
                this.spinner.hide();
                return;
            } else {
                this.Addressofparents_district_array = [];
                this.spinner.hide();
            }
        } catch (error) {
            this.spinner.hide();
           
            this.Addressofparents_district_array = [];
            return;
        }
    }

    async Addressof_districtchange(): Promise<void> {
        this.crs_hosipatalreg_form.rural_urban = '';
        this.crs_hosipatalreg_form.mandal = '';
        this.crs_hosipatalreg_form.village_ward = '';
        this.Addressofparents_MandalMuncipality_array = []; this.village_ward_array = [];
    }
    Addressofparents_MandalMuncipality_array: any[] = [];
    async MandalMuncipality(): Promise<void> {
        this.crs_hosipatalreg_form.mandal = ''; this.crs_hosipatalreg_form.village_ward = '';
        if (
            this.crs_hosipatalreg_form.district == ''
        ) {
            this.spinner.hide();
            this.alt.warning('select district');
            return;
        } else if (
            this.crs_hosipatalreg_form.rural_urban == ''
        ) {
            this.spinner.hide();
            this.alt.warning('select Rural / Urban');
            return;
        } else {
            try {
                const req = new basemodel();
                req.type = '1003';
                req.param1 = '28';// this.crs_hosipatalreg_form.state;
                req.param2 = this.crs_hosipatalreg_form.district;
                req.param3 = this.crs_hosipatalreg_form.rural_urban;
                this.spinner.show();
                let responce: any = await this.auth.auth_utilities_service(req);
                this.Addressofparents_MandalMuncipality_array = [];
                if (responce.code) {
                    this.spinner.hide();
                    this.Addressofparents_MandalMuncipality_array = responce.Details;
                    return;
                } else {
                    this.spinner.hide();
                    this.Addressofparents_MandalMuncipality_array = [];
                    return;
                }
            } catch (error) {
                this.spinner.hide();
               
                this.Addressofparents_MandalMuncipality_array = [];
                return;
            }
        }
    }

    village_ward_array: any[] = [];
    async VillageWard(): Promise<void> {
        this.crs_hosipatalreg_form.village_ward = '';
        if (
            this.crs_hosipatalreg_form.district == ''
        ) {
            this.spinner.hide();
            this.alt.warning('select District');
            return;
        }
        if (
            this.crs_hosipatalreg_form.mandal == ''
        ) {
            this.spinner.hide();
            this.alt.warning('select Mandal/Muncipality');
            return;
        }
        else {
            try {

                const req = new basemodel();
                req.type = '1004';
                req.param1 = '28';// this.crs_hosipatalreg_form.state;
                req.param2 = this.crs_hosipatalreg_form.district;
                req.param3 = this.crs_hosipatalreg_form.rural_urban;
                req.param4 = this.crs_hosipatalreg_form.mandal;
                this.spinner.show();
                let responce: any = await this.auth.auth_utilities_service(req);
                this.village_ward_array = []
                if (responce.code) {
                    this.spinner.hide();
                    this.village_ward_array = responce.Details;
                    return;
                } else {
                    this.village_ward_array = [];
                    this.spinner.hide();
                }
            } catch (error) {
                this.village_ward_array = [];
                this.spinner.hide();
               
            }
        }
    }
    async modal_open() {
        this.getstatedata();
        this.gets_hospital_cate_data();
    }
    hospital_details_arrau: any[] = [];
    async get_hospital_details() {
        try {
            const req = new basemodel();
            req.type = '1024';
            req.param1 = this.RU_CODE;
            this.spinner.show();
            let responce: any = await this.auth.auth_pkgmasters_service(req);
            this.hospital_details_arrau = [];
            if (responce.code) {
                this.hospital_details_arrau = responce.Details;
                this.spinner.hide();
                return;
            }
            else {
                this.hospital_details_arrau = [];
                this.alt.warning(responce.message);
                this.spinner.hide();
                return;
            }
        } catch (error) {
            this.hospital_details_arrau = [];
            this.alt.warning("Something went wrong " + error);
            this.spinner.hide();
            return;
        }
    }
    checkinputs(): boolean {
        // if (this.crs_hosipatalreg_form.hosiataltype == '') {
        //     this.alt.warning('Please enter Hosipatal Type');
        //     return false;
        // }
        if (this.crs_hosipatalreg_form.hosiatalcategory == '') {
            this.alt.warning('Please select Hosipatal Category');
            return false;
        }
        else if (this.crs_hosipatalreg_form.hosiatalcode == '') {
            this.alt.warning('Please enter Hospital Code');
            return false;
        }
        else if (this.crs_hosipatalreg_form.hosiatalname == '') {
            this.alt.warning('Please enter Hosipatal Name');
            return false;
        }
        else if (this.crs_hosipatalreg_form.hosiatalname_tel == '') {
            this.alt.warning('Please enter Hosipatal Name (Telugu)');
            return false;
        }
        // else if (this.crs_hosipatalreg_form.registration == '') {
        //     this.alt.warning('Please enter Registration Unit');
        //     return false;
        // }
        // else if (this.crs_hosipatalreg_form.state == '') {
        //     this.alt.warning('Please select State');
        //     return false;
        // }
        else if (this.crs_hosipatalreg_form.district == '') {
            this.alt.warning('Please select District');
            return false;
        }
        else if (this.crs_hosipatalreg_form.mandal == '') {
            this.alt.warning('Please select MMC Name');
            return false;
        }

        else if (this.crs_hosipatalreg_form.village_ward == '') {
            this.alt.warning('Please select Village/Ward');
            return false;
        }
        else if (this.crs_hosipatalreg_form.email == '') {
            this.alt.warning('Please enter Email');
            return false;
        }
        else if (this.crs_hosipatalreg_form.mobileno == '') {
            this.alt.warning('Please enter Mobile No');
            return false;
        }
        else if (this.crs_hosipatalreg_form.pincode == '') {
            this.alt.warning('Please enter Pincode');
            return false;
        }
        else if (this.crs_hosipatalreg_form.address == '') {
            this.alt.warning('Please enter Address');
            return false;
        }
        else if (this.crs_hosipatalreg_form.auth_name == '') {
            this.alt.warning('Please enter Authorization Name');
            return false;
        }
        else if (this.crs_hosipatalreg_form.auth_mobileno == '') {
            this.alt.warning('Please enter Authorization Mobile No');
            return false;
        }
        else if (this.crs_hosipatalreg_form.auth_email == '') {
            this.alt.warning('Please enter Authorization eMail Id');
            return false;
        }
        else {
            return true;
        }

    }
    async Submithealthmaster(): Promise<void> {
        try {
            if (this.checkinputs()) {
                try {
                    const req = new basemodel();
                    req.type = '1021';
                    req.json2 = JSON.stringify({ registrationunit: this.RU_CODE, hospitaltype: this.crs_hosipatalreg_form.hosiataltype, hospitalcategory: this.crs_hosipatalreg_form.hosiatalcategory, hospitalcode: this.crs_hosipatalreg_form.hosiatalcode, hospitalname: this.crs_hosipatalreg_form.hosiatalname, hospitalnametel: this.crs_hosipatalreg_form.hosiatalname_tel, hospitalmobileno: this.crs_hosipatalreg_form.mobileno, hospitalemailid: this.crs_hosipatalreg_form.email, hospitalstatecode: '28', hospitaldistrictcode: this.crs_hosipatalreg_form.district, hospitalmmccode: this.crs_hosipatalreg_form.mandal, hospitalvwcode: this.crs_hosipatalreg_form.village_ward, hospitaladdress: this.crs_hosipatalreg_form.address, hospitalpincode: this.crs_hosipatalreg_form.pincode, hospitalauthname: this.crs_hosipatalreg_form.auth_name, hospitalauthmobileno: this.crs_hosipatalreg_form.auth_mobileno, hospitalauthemailid: this.crs_hosipatalreg_form.auth_email });
                    req.islogstore = 'YES';
                    req.logfoldername = "Hospital_Reg";
                    req.refno = this.u_id;
                    this.spinner.show();
                    let responce: any = await this.auth.auth_pkgmasters_service(req);
                    if (responce.code) {
                        if (responce.Details[0].STATUS == '1') {
                            this.alt.success(responce.Details[0].STATUS_TEXT + "<br/>" + responce.Details[0].STATUS_TEXT_TEL);
                            this.spinner.hide(); this.clear_inputs();
                            setTimeout(() => {
                                window.location.reload();
                            }, 2000)
                            return;
                        }
                        else if (responce.Details[0].STATUS == '0') {
                            this.alt.warning(responce.Details[0].STATUS_TEXT + "<br/>" + responce.Details[0].STATUS_TEXT_TEL);
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
                    this.alt.warning("Something went wrong " + error);
                    this.spinner.hide();
                    return;
                }
            }
            else {
                return;
            }
        } catch (error) {
            this.alt.warning("Something went wrong " + error);
            this.spinner.hide();
            return;
        }
    }
    clear_inputs() {
        this.crs_hosipatalreg_form = {
            hosiatalcode: '',
            hosipatal_category: '',
            Hosipatal_type: '',
            hosiatalname: '',
            state: '',
            district: '',
            subdistrict: '',
            registration: '',
            village: '',
            email: '',
            mobileno: '',
            place: '',
            status: '',
            Hosipatal_code: '',
            Email: '',
            mandal: '',
            Address: '',
            building_no: '',
            house_no: '',
            hosiatalname_telugu: '',
            primary_mobile_number: '',
            street_name_telugu: '',
            street_name: '',
            locatity: '',
            locatity_telugu: '',
            pincode: '',
            Authorise_person_name: '',
            Authorise_mobile_no: '',
            Authorise_email_id: '',
            address: '',
            hosiatalname_tel: '',
            hosiatalcategory: '',
            hosiataltype: '',
            village_ward: '',
            auth_email: '',
            auth_mobileno: '',
            auth_name: '',
            rural_urban: '',
        };
    }
    update_crs_hosipatalreg_form = {
        hosiataltype_upd: '',
        hosiatalcode_upd: '',
        hosiatalcategory_upd: '',
        Hosipatal_type_upd: '',
        hosiatalname_upd: '',
        state_upd: '',
        district_upd: '',
        subdistrict_upd: '',
        registration_upd: '',
        village_upd: '',
        email_upd: '',
        mobileno_upd: '',
        place_upd: '',
        status_upd: '',
        Hosipatal_code_upd: '',
        Email_upd: '',
        mandal_upd: '',
        Address_upd: '',
        building_no_upd: '',
        house_no_upd: '',
        hosiatalname_telugu_upd: '',
        primary_mobile_number_upd: '',
        street_name_telugu_upd: '',
        street_name_upd: '',
        locatity_upd: '',
        locatity_telugu_upd: '',
        pincode_upd: '',
        address_upd: '',
        hosiatalname_tel_upd: '',
        village_ward_upd: '',
        auth_email_upd: '',
        auth_mobileno_upd: '',
        auth_name_upd: '',
        rural_urban_upd: '',
    };
    update_modal_open(obj: any) {
        this.get_update_statedata();
        this.gets_hospital_update_cate_data();
        this.update_crs_hosipatalreg_form = {
            hosiataltype_upd: obj.HOSPITAL_TYPE,
            hosiatalcode_upd: obj.HOSPITAL_CODE,
            hosiatalcategory_upd: obj.HOSPITAL_CATEGORY_CODE,
            Hosipatal_type_upd: obj.HOSPITAL_TYPE,
            hosiatalname_upd: obj.HOSPITAL_NAME,
            state_upd: obj.HOSPITAL_STATE_CODE,
            district_upd: obj.HOSPITAL_DISTRICT_CODE,
            subdistrict_upd: obj.HOSPITAL_MMC_CODE,
            registration_upd: obj.REGISTRATION_UNIT,
            village_upd: obj.HOSPITAL_VW_CODE,
            email_upd: obj.HOSPITAL_EMAILID,
            mobileno_upd: obj.HOSPITAL_MOBILE_NO,
            place_upd: '',
            status_upd: '',
            Hosipatal_code_upd: '',
            Email_upd: '',
            mandal_upd: obj.HOSPITAL_MMC_CODE,
            Address_upd: '',
            building_no_upd: '',
            house_no_upd: '',
            hosiatalname_telugu_upd: '',
            primary_mobile_number_upd: '',
            street_name_telugu_upd: '',
            street_name_upd: '',
            locatity_upd: '',
            locatity_telugu_upd: '',
            pincode_upd: obj.HOSPITAL_PINCODE,
            address_upd: obj.HOSPITAL_ADDRESS,
            hosiatalname_tel_upd: obj.HOSPITAL_NAME_TEL,
            village_ward_upd: obj.HOSPITAL_VW_CODE,
            auth_email_upd: obj.HOSPITAL_AUTH_EMAILID,
            auth_mobileno_upd: obj.HOSPITAL_AUTH_MOBILE_NO,
            auth_name_upd: obj.HOSPITAL_AUTH_NAME,
            rural_urban_upd: obj.RURAL_URBAN,
        };
    }
    async update_hopital_master(): Promise<void> {
        if (this.update_checkinputs()) {
            try {
                const req = new basemodel();
                req.type = '1022';
                req.json2 = JSON.stringify({ registrationunit: this.RU_CODE, hospitaltype: this.update_crs_hosipatalreg_form.hosiataltype_upd, hospitalcategory: this.update_crs_hosipatalreg_form.hosiatalcategory_upd, hospitalcode: this.update_crs_hosipatalreg_form.hosiatalcode_upd, hospitalname: this.update_crs_hosipatalreg_form.hosiatalname_upd, hospitalnametel: this.update_crs_hosipatalreg_form.hosiatalname_tel_upd, hospitalmobileno: this.update_crs_hosipatalreg_form.mobileno_upd, hospitalemailid: this.update_crs_hosipatalreg_form.email_upd, hospitalstatecode: this.update_crs_hosipatalreg_form.state_upd, hospitaldistrictcode: this.update_crs_hosipatalreg_form.district_upd, hospitalmmccode: this.update_crs_hosipatalreg_form.mandal_upd, hospitalvwcode: this.update_crs_hosipatalreg_form.village_ward_upd, hospitaladdress: this.update_crs_hosipatalreg_form.address_upd, hospitalpincode: this.update_crs_hosipatalreg_form.pincode_upd, hospitalauthname: this.update_crs_hosipatalreg_form.auth_name_upd, hospitalauthmobileno: this.update_crs_hosipatalreg_form.auth_mobileno_upd, hospitalauthemailid: this.update_crs_hosipatalreg_form.auth_email_upd });
                req.islogstore = 'YES';
                req.logfoldername = "Hospital_Reg";
                req.refno = this.u_id;
                this.spinner.show();
                let responce: any = await this.auth.auth_pkgmasters_service(req);
                if (responce.code) {
                    if (responce.Details[0].STATUS == '1') {
                        this.alt.success(responce.Details[0].STATUS_TEXT);
                        this.spinner.hide(); this.clear_inputs();
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
                this.alt.warning("Something went wrong " + error);
                this.spinner.hide();
                return;
            }
        }
        else {

        }
    }
    update_checkinputs(): boolean {
        // if (this.update_crs_hosipatalreg_form.hosiataltype_upd == '') {
        //     this.alt.warning('Please enter Hosipatal Type');
        //     return false;
        // }
        if (this.update_crs_hosipatalreg_form.hosiatalcategory_upd == '') {
            this.alt.warning('Please select Hosipatal Category');
            return false;
        }
        else if (this.update_crs_hosipatalreg_form.hosiatalcode_upd == '') {
            this.alt.warning('Please enter Hospital Code');
            return false;
        }
        else if (this.update_crs_hosipatalreg_form.hosiatalname_upd == '') {
            this.alt.warning('Please enter Hosipatal Name');
            return false;
        }
        else if (this.update_crs_hosipatalreg_form.hosiatalname_tel_upd == '') {
            this.alt.warning('Please enter Hosipatal Name (Telugu)');
            return false;
        }
        // else if (this.update_crs_hosipatalreg_form.registration_upd == '') {
        //     this.alt.warning('Please enter Registration Unit');
        //     return false;
        // }
        // else if (this.update_crs_hosipatalreg_form.state_upd == '') {
        //     this.alt.warning('Please select State');
        //     return false;
        // }
        else if (this.update_crs_hosipatalreg_form.district_upd == '') {
            this.alt.warning('Please select District');
            return false;
        }
        else if (this.update_crs_hosipatalreg_form.mandal_upd == '') {
            this.alt.warning('Please select MMC Name');
            return false;
        }

        else if (this.update_crs_hosipatalreg_form.village_ward_upd == '') {
            this.alt.warning('Please select Village/Ward');
            return false;
        }
        else if (this.update_crs_hosipatalreg_form.email_upd == '') {
            this.alt.warning('Please enter Email');
            return false;
        }
        else if (this.update_crs_hosipatalreg_form.mobileno_upd == '') {
            this.alt.warning('Please enter Mobile No');
            return false;
        }
        else if (this.update_crs_hosipatalreg_form.pincode_upd == '') {
            this.alt.warning('Please enter Pincode');
            return false;
        }
        else if (this.update_crs_hosipatalreg_form.address_upd == '') {
            this.alt.warning('Please enter Address');
            return false;
        }
        else if (this.update_crs_hosipatalreg_form.auth_name_upd == '') {
            this.alt.warning('Please enter Authorization Name');
            return false;
        }
        else if (this.update_crs_hosipatalreg_form.auth_mobileno_upd == '') {
            this.alt.warning('Please enter Authorization Mobile No');
            return false;
        }
        else if (this.update_crs_hosipatalreg_form.auth_email_upd == '') {
            this.alt.warning('Please enter Authorization eMail Id');
            return false;
        }
        else {
            return true;
        }

    }
    update_hospital_cate_array: any[] = [];
    async gets_hospital_update_cate_data(): Promise<void> {
        try {
            const req = new basemodel();
            req.type = '1022';
            this.spinner.show();
            this.update_hospital_cate_array = [];
            let responce: any = await this.auth.auth_utilities_service(req);
            this.spinner.hide();
            if (responce.code) {
                this.update_hospital_cate_array = responce.Details;
                this.spinner.hide();
                return;
            } else {
                this.update_hospital_cate_array = [];
                this.spinner.hide();
                return;
            }
        } catch (error) {
            this.spinner.hide();
           
            this.update_hospital_cate_array = [];
            return;
        }
    }
    update_state_array: any[] = [];
    async get_update_statedata(): Promise<void> {
        try {
            const req = new basemodel();
            req.type = '1001';
            this.spinner.show();
            this.update_state_array = [];
            let responce: any = await this.auth.auth_utilities_service(req);
            this.spinner.hide();
            if (responce.code) {
                this.update_state_array = responce.Details;
                this.spinner.hide();
                this.get_update_district();
                return;
            } else {
                this.update_state_array = [];
                this.spinner.hide();
                return;
            }
        } catch (error) {
            this.spinner.hide();
           
            this.update_state_array = [];
            return;
        }
    }
    update_district_array: any[] = [];
    async get_update_district(): Promise<void> {
        if (
            this.update_crs_hosipatalreg_form.state_upd == ''
        ) {
            this.alt.warning('select district');
            return;
        } else {

            try {
                const req = new basemodel();
                req.type = '1002';
                req.param1 = this.update_crs_hosipatalreg_form.state_upd;
                this.spinner.show();
                let responce: any = await this.auth.auth_utilities_service(req);
                this.spinner.hide();
                this.update_district_array = [];
                if (responce.code) {
                    this.update_district_array = responce.Details;
                    this.spinner.hide();
                    this.get_update_MandalMuncipality();
                    return;
                } else {
                    this.update_district_array = [];
                    this.spinner.hide();
                }
            } catch (error) {
                this.spinner.hide();
               
                this.update_district_array = [];
                return;
            }
        }
    }

    async update_of_districtchange(): Promise<void> {
        this.update_crs_hosipatalreg_form.rural_urban_upd = '';
        this.update_crs_hosipatalreg_form.mandal_upd = '';
        this.update_crs_hosipatalreg_form.village_ward_upd = '';
        this.update_village_ward_array = []; this.update_MandalMuncipality_array = [];
    }
    update_MandalMuncipality_array: any[] = [];
    async get_update_MandalMuncipality(): Promise<void> {
        if (
            this.update_crs_hosipatalreg_form.district_upd == ''
        ) {
            this.spinner.hide();
            this.alt.warning('select district');
            return;
        } else if (
            this.update_crs_hosipatalreg_form.rural_urban_upd == ''
        ) {
            this.spinner.hide();
            this.alt.warning('select Rural / Urban');
            return;
        } else {
            try {
                const req = new basemodel();
                req.type = '1003';
                req.param1 = this.update_crs_hosipatalreg_form.state_upd;
                req.param2 = this.update_crs_hosipatalreg_form.district_upd;
                req.param3 = this.update_crs_hosipatalreg_form.rural_urban_upd;
                this.spinner.show();
                let responce: any = await this.auth.auth_utilities_service(req);
                this.update_MandalMuncipality_array = [];
                if (responce.code) {
                    this.spinner.hide();
                    this.update_MandalMuncipality_array = responce.Details;
                    this.update_VillageWard();
                    return;
                } else {
                    this.spinner.hide();
                    this.update_MandalMuncipality_array = [];
                    return;
                }
            } catch (error) {
                this.spinner.hide();
               
                this.update_MandalMuncipality_array = [];
                return;
            }
        }
    }

    update_village_ward_array: any[] = [];
    async update_VillageWard(): Promise<void> {
        if (
            this.update_crs_hosipatalreg_form.district_upd == ''
        ) {
            this.spinner.hide();
            this.alt.warning('select District');
            return;
        }
        if (
            this.update_crs_hosipatalreg_form.mandal_upd == ''
        ) {
            this.spinner.hide();
            this.alt.warning('select Mandal/Muncipality');
            return;
        }
        else {
            try {

                const req = new basemodel();
                req.type = '1004';
                req.param1 = this.update_crs_hosipatalreg_form.state_upd;
                req.param2 = this.update_crs_hosipatalreg_form.district_upd;
                req.param3 = this.update_crs_hosipatalreg_form.rural_urban_upd;
                req.param4 = this.update_crs_hosipatalreg_form.mandal_upd;
                this.spinner.show();
                let responce: any = await this.auth.auth_utilities_service(req);
                this.update_village_ward_array = []
                if (responce.code) {
                    this.spinner.hide();
                    this.update_village_ward_array = responce.Details;
                    return;
                } else {
                    this.update_village_ward_array = [];
                    this.spinner.hide();
                }
            } catch (error) {
                this.update_village_ward_array = [];
                this.spinner.hide();
               
            }
        }
    }

    async update_active_status(obj: any): Promise<void> {
        try {
            Swal.fire({
                title: 'Confirm Status Update',
                text: 'Are you sure you want to update the current status of this hospital? ' + obj.HOSPITAL_NAME,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Update Status',
                cancelButtonText: 'Cancel',
            }).then((result) => {
                if (result.isConfirmed) {
                    this.update_current_status(obj);
                    Swal.fire({
                        title: 'Updated!',
                        text: 'The hospital status has been successfully updated.',
                        icon: 'success',
                    });
                } else if (result.isDismissed) {
                    Swal.fire({
                        title: 'Action Cancelled',
                        text: 'No changes were made to the hospital status.',
                        icon: 'info',
                    });
                    obj.ISACTIVE = 1;
                }
            });
        } catch (error) {

        }
    }
    async update_current_status(obj: any): Promise<void> {
        try {
            const req = new basemodel();
            req.type = '1023';
            req.param1 = obj.HOSPITAL_CODE;
            this.spinner.show();
            let responce: any = await this.auth.auth_pkgmasters_service(req);
            if (responce.code) {
                if (responce.Details[0].STATUS == '1') {
                    this.alt.success(responce.Details[0].STATUS_TEXT);
                    this.get_hospital_details();
                    this.spinner.hide();
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
            this.spinner.hide();
           
        }
    }
}
