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
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { InputvalidaionService } from 'src/app/thirparty/validation/inputvalidaion.service';
@Component({
    selector: 'app-registration-unit',
    templateUrl: './registration-unit.component.html',
    styleUrl: './registration-unit.component.css'
})
export class RegistrationUnitComponent {
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
        private datepipe: DatePipe,
        private val: InputvalidaionService,
        @Inject(DOCUMENT) private document: Document,
        private el: ElementRef
    ) {
        this.contentuploadurl_img = this.mid.globalsetting.api_url_conent_upload;
        this.contentshowurl = this.mid.globalsetting.api_url_conent_show;
    }
    contentuploadurl_img = '';
    contentshowurl = '';
    displausername = '';
    designationname = '';
    user_type = '';
    approve_status = '';
    user_role = '';
    u_id = '';
    UCODE = '';
    RU_CODE = '';
    user_district = '';
    registration_unit = {
        reg_regional_name: '', reg_unit_name: '', type_of_reg: '', reg_level: '', role: '', state_name: '', district: '', rural_urban: '', mandal: '', village: '', reg_unit_name_t: '', address: '', address_tel: '',
        google_map_link: '', regpincode: '',
    }
    isdistrict_disabled: boolean = false; 
    async ngOnInit(): Promise<void> {
        if (sessionStorage.getItem('_Uenc') !== '') {
            //this.collapsed = true;
            let obj: any = this.encdc.Getuser();
            if (obj != '' && obj != undefined && obj != null) {
                this.displausername = obj[0].UNAME;
                this.u_id = obj[0].UID;
                this.UCODE = obj[0].UCODE;
                this.designationname = obj[0].UDPDESIGNATION;
                this.user_type = obj[0].UTYPE;
                this.user_role = obj[0].UROLE;
                this.user_district = obj[0].DISTRICT_CODE;
                this.registration_unit.district = obj[0].DISTRICT_CODE;
                this.RU_CODE = obj[0].RU_CODE;
                this.user_reg_form.registrar_district = obj[0].DISTRICT_CODE;
                if (obj[0].RURAL_URBAN != '0') {
                this.registration_unit.rural_urban=obj[0].RURAL_URBAN;
                this.user_reg_form.registrar_rural_urban = obj[0].RURAL_URBAN;
                }
                if (obj[0].MMC_CODE!='') {
                    await this.MandalMuncipality();
                    await this.registrar_mandalmuncipality();
                    this.registration_unit.mandal = obj[0].MMC_CODE;
                    this.user_reg_form.registrar_mandal = obj[0].MMC_CODE;

                    }
                    if (obj[0].VW_CODE!='') {
                        await this.VillageWard();
                        await this.registrar_villageward();
                        this.registration_unit.village = obj[0].VW_CODE;
                        this.user_reg_form.registrar_village= obj[0].VW_CODE;
                    }
                this.get_district = obj[0].DISTRICT_CODE;
                this.update_registration_unit.district = obj[0].DISTRICT_CODE;
                if (obj[0].DISTRICT_CODE != '0') {
                    this.isdistrict_disabled = true;
                    //this.registrar_districtchange();
                    this.get_districtchange();
                }
                else {
                    this.isdistrict_disabled = false;
                }
                this.getrolesdata(); this.roles_data_get(); this.get_district_data(); this.get_depat_revenuesdata();
            } else {
                this.encdc.Usersessionkill();
            }
        } else {
            this.router.navigate(['/Sessionexpired']);
        }
    }
    get_role_array: any[] = [];
    async roles_data_get(): Promise<void> {
        try {
            const req = new basemodel();
            req.type = '1019';
            this.spinner.show();
            this.get_role_array = [];
            let responce: any = await this.auth.auth_utilities_service(req);
            this.spinner.hide();
            if (responce.code) {
                this.get_role_array = responce.Details;
                if (responce.Details.length == 1) {
                    this.getrole = responce.Details[0].DEPT_CODE;
                }
                else {
                    this.getrole = '';
                }
                this.spinner.hide();
                return;
            } else {
                this.get_role_array = [];
                this.spinner.hide();
                return;
            }
        } catch (error) {
            this.spinner.hide();
           
            this.get_role_array = [];
            return;
        }
    }
    is_get_urban_disable: boolean = false; isgetvillagedisable: boolean = false;
    check_mandal_panchayat() {
        
        if (this.getrole == '1') {
            this.get_rural_urban = 'Urban';
            this.is_get_urban_disable = true;
            this.isgetvillagedisable = false;
            this.get_MandalMuncipality();
        }
        else if (this.getrole == '3') {
            this.get_rural_urban = 'Rural';
            this.is_get_urban_disable = true;
            this.isgetvillagedisable = true;
            this.get_MandalMuncipality();
        }
        else {
            this.is_get_urban_disable = false;
            this.isgetvillagedisable = true;
        }
    }
    get_district_array: any[] = [];
    async get_district_data(): Promise<void> {
        // if (
        //     this.registration_unit.state_name == ''
        // ) {
        //     this.alt.warning('select state');
        //     alert(JSON.stringify(this.registration_unit.state_name))
        //     return;
        // } else {

        try {
            const req = new basemodel();
            req.type = '1002';
            req.param1 = '28';// this.registration_unit.state_name;
            this.spinner.show();
            let responce: any = await this.auth.auth_utilities_service(req);
            this.spinner.hide();
            this.get_district_array = [];
            if (responce.code) {
                this.get_district_array = responce.Details;
                this.spinner.hide();
                return;
            } else {
                this.get_district_array = [];
                this.spinner.hide();
            }
        } catch (error) {
            this.spinner.hide();
           
            this.get_district_array = [];
            return;
        }
        // }
    }

    async get_districtchange(): Promise<void> {
        this.get_rural_urban = '';
        this.get_mandal = '';
        this.getvillage = '';
    }
    get_MandalMuncipality_array: any[] = [];
    async get_MandalMuncipality(): Promise<void> {
        this.get_mandal = '';
        this.getvillage = '';
        if (
            this.get_district == ''
        ) {
            this.spinner.hide();
            this.alt.warning('select district');
            return;
        } else if (
            this.get_rural_urban == ''
        ) {
            this.spinner.hide();
            this.alt.warning('select Rural / Urban');
            return;
        } else {
            try {
                const req = new basemodel();
                req.type = '1003';
                req.param1 = '28';// this.registration_unit.state_name;
                req.param2 = this.get_district;
                req.param3 = this.get_rural_urban;
                this.spinner.show();
                let responce: any = await this.auth.auth_utilities_service(req);
                this.get_MandalMuncipality_array = [];
                if (responce.code) {
                    this.spinner.hide();
                    this.get_MandalMuncipality_array = responce.Details;
                    return;
                } else {
                    this.spinner.hide();
                    this.get_MandalMuncipality_array = [];
                    return;
                }
            } catch (error) {
                this.spinner.hide();
               
                this.get_MandalMuncipality_array = [];
                return;
            }
        }
    }

    get_village_ward_array: any[] = []; getrole = ''; get_district = ''; get_rural_urban = ''; get_mandal = ''; getvillage = '';
    async get_VillageWard(): Promise<void> {
        this.getvillage = '';
        if (
            this.get_district == ''
        ) {
            this.spinner.hide();
            this.alt.warning('select District');
            return;
        }
        if (
            this.get_mandal == ''
        ) {
            this.spinner.hide();
            this.alt.warning('select Mandal/Muncipality');
            return;
        }
        else {
            try {

                const req = new basemodel();
                req.type = '1004';
                req.param1 = '28';// this.registration_unit.state_name;
                req.param2 = this.get_district;
                req.param3 = this.get_rural_urban;
                req.param4 = this.get_mandal;
                this.spinner.show();
                let responce: any = await this.auth.auth_utilities_service(req);
                this.get_village_ward_array = []
                if (responce.code) {
                    this.spinner.hide();
                    this.get_village_ward_array = responce.Details;
                    return;
                } else {
                    this.get_village_ward_array = [];
                    this.spinner.hide();
                }
            } catch (error) {
                this.get_village_ward_array = [];
                this.spinner.hide();
               
            }
        }
    }
    reg_unit_details_array: any[] = []; display_level = 'registration';
    async get_registration_unit_details(): Promise<void> {
        if (this.getrole == '') {
            this.alt.warning('Please select Department');
            return;
        }
        else if (this.get_district == '') {
            this.alt.warning('Please select District');
            return;
        }
        else if (this.get_mandal == '') {
            this.alt.warning('Please select mandal');
            return;
        }
        else if (this.getvillage == '' && this.isgetvillagedisable == true) {
            this.alt.warning('Please select village');
            return;
        }
        try {
            const req = new basemodel();
            req.type = '1002';
            req.param1 = this.getrole;
            req.param2 = this.get_district;
            req.param3 = this.get_mandal;
            req.param4 = this.getvillage;
            this.spinner.show();
            this.reg_unit_details_array = [];
            let responce: any = await this.auth.auth_pkgmasters_service(req);
            this.spinner.hide();
            if (responce.code) {
                this.reg_unit_details_array = responce.Details;
                this.display_level = 'registration';
                this.spinner.hide();
                return;
            } else {
                this.reg_unit_details_array = [];
                this.spinner.hide();
                return;
            }
        } catch (error) {
            this.spinner.hide();
           
            this.reg_unit_details_array = [];
            return;
        }
    }
    registrar_details_array: any[] = []; registration_unit_name = '';
    async get_registrar_details(obj: any): Promise<void> {
        this.registration_unit_name = obj.RU_NAME + ' / ' + obj.RU_NAME_TEL
        try {
            const req = new basemodel();
            req.type = '1003';
            req.param1 = obj.RU_CODE;
            this.spinner.show();
            this.registrar_details_array = [];
            let responce: any = await this.auth.auth_pkgmasters_service(req);
            this.spinner.hide();
            if (responce.code) {
                this.registrar_details_array = responce.Details; this.display_level = 'registrar';
                this.spinner.hide();
                return;
            } else {
                this.registrar_details_array = [];
                this.spinner.hide();
                return;
            }
        } catch (error) {
            this.spinner.hide();
           
            this.registrar_details_array = [];
            return;
        }
    }
    back() {
        this.display_level = 'registration';
    }
    modal_open() {
        this.get_registrar_district();
        this.getdistrict();
        this.getdesignationdata();
    }
    suggestions: any;
    async Teluglanguageconvrt(inputkeyval: any, inputsource: any) {
        this.pscall.Cdac_transliterateText(inputkeyval).subscribe(
            (response: any) => {
                if (response[0] == "SUCCESS") {
                    this.suggestions = response[1][0][1];
                    if (inputsource == 'reg_unit_name_tel') {
                        this.registration_unit.reg_unit_name_t = this.suggestions[0];
                    }
                    if (inputsource == 'name_of_functionary_tel') {
                        this.user_reg_form.name_of_functionary_t = this.suggestions[0];
                    }
                    if (inputsource == 'address_tel') {
                        this.registration_unit.address_tel = this.suggestions[0];
                    }
                    if (inputsource == 'update_reg_unit_name_tel') {
                        this.registration_unit.reg_unit_name_t = this.suggestions[0];
                    }

                    if (inputsource == 'update_address_tel') {
                        this.registration_unit.address_tel = this.suggestions[0];
                    }
                }
                else {
                    if (inputsource == 'reg_unit_name_tel') {
                        this.registration_unit.reg_unit_name_t = '';
                    }
                    if (inputsource == 'name_of_functionary_tel') {
                        this.user_reg_form.name_of_functionary_t = '';
                    }
                    if (inputsource == 'address_tel') {
                        this.registration_unit.address_tel = '';
                    }
                    if (inputsource == 'update_reg_unit_name_tel') {
                        this.registration_unit.reg_unit_name_t = '';
                    }

                    if (inputsource == 'update_address_tel') {
                        this.registration_unit.address_tel = '';
                    }
                }
            },
            (error) => {
                if (inputsource == 'reg_unit_name_tel') {
                    this.registration_unit.reg_unit_name_t = '';
                }
                if (inputsource == 'name_of_functionary_tel') {
                    this.user_reg_form.name_of_functionary_t = '';
                }
                if (inputsource == 'address_tel') {
                    this.registration_unit.address_tel = '';
                }
                if (inputsource == 'update_reg_unit_name_tel') {
                    this.registration_unit.reg_unit_name_t = '';
                }
                if (inputsource == 'update_address_tel') {
                    this.registration_unit.address_tel = '';
                }
                return '';
            }
        );
    }
    latitude: number = 0; logitude: number = 0;
    extractLatLongFromLink(link: string): void {
        // Assuming the link format is https://www.google.com/maps/place/LATITUDE+LONGITUDE
        const regex = /@(-?\d+\.\d+),(-?\d+\.\d+)/;
        const matches = link.match(regex);
        if (matches && matches.length >= 3) {
            this.latitude = parseFloat(matches[1]);
            this.logitude = parseFloat(matches[2]);
        } else {
            this.alt.toastwarning('Invalid google map link');
            this.registration_unit.google_map_link = "";
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
        // if (
        //     this.registration_unit.state_name == ''
        // ) {
        //     this.alt.warning('select state');
        //     alert(JSON.stringify(this.registration_unit.state_name))
        //     return;
        // } else {

        try {
            const req = new basemodel();
            req.type = '1002';
            req.param1 = '28';// this.registration_unit.state_name;
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
        // }
    }
    isvillagedisable: boolean = false;
    async Addressof_districtchange(): Promise<void> {
        //this.registration_unit.rural_urban = '';
        this.registration_unit.mandal = '';
        this.registration_unit.village = '';

        const splitregtpe = this.registration_unit.type_of_reg.split('^');
        if (splitregtpe[0] == '5') {
            this.MandalMuncipality();
            this.isvillagedisable = false;
        }
        else if (splitregtpe[0] == '4') {
            this.MandalMuncipality();
            this.isvillagedisable = true;
        }
        else {
            this.isvillagedisable = true;
        }
    }
    Addressofparents_MandalMuncipality_array: any[] = [];
    async MandalMuncipality(): Promise<void> {
        if (
            this.registration_unit.district == ''
        ) {
            this.spinner.hide();
            this.alt.warning('select district');
            return;
        } else if (
            this.registration_unit.rural_urban == ''
        ) {
            this.spinner.hide();
            this.alt.warning('select Rural / Urban');
            return;
        } else {
            try {
                const req = new basemodel();
                req.type = '1003';
                req.param1 = '28';// this.registration_unit.state_name;
                req.param2 = this.registration_unit.district;
                req.param3 = this.registration_unit.rural_urban;
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
        this.capture_reg_unit_name();
        this.user_reg_form.registrar_mandal = this.registration_unit.mandal;
        this.registration_unit.village = '';
        if (
            this.registration_unit.district == ''
        ) {
            this.spinner.hide();
            this.alt.warning('select District');
            return;
        }
        if (
            this.registration_unit.mandal == ''
        ) {
            this.spinner.hide();
            this.alt.warning('select Mandal/Muncipality');
            return;
        }
        else {
            try {

                const req = new basemodel();
                req.type = '1004';
                req.param1 = '28';// this.registration_unit.state_name;
                req.param2 = this.registration_unit.district;
                req.param3 = this.registration_unit.rural_urban;
                req.param4 = this.registration_unit.mandal;
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
    role_array: any[] = [];
    async getrolesdata(): Promise<void> {
        try {
            const req = new basemodel();
            req.type = '1019';
            this.spinner.show();
            this.role_array = [];
            let responce: any = await this.auth.auth_utilities_service(req);
            this.spinner.hide();
            if (responce.code) {
                this.role_array = responce.Details;
                if (responce.Details.length == 1) {
                    this.registration_unit.role = responce.Details[0].DEPT_CODE;
                }
                else {
                    this.registration_unit.role = '';
                }
                this.spinner.hide();
                return;
            } else {
                this.role_array = [];
                this.spinner.hide();
                return;
            }
        } catch (error) {
            this.spinner.hide();
           
            this.role_array = [];
            return;
        }
    }
    reg_unt_array: any[] = [];
    async getregunitdata(): Promise<void> {
        this.registration_unit.type_of_reg = '';
        this.registration_unit.reg_level = '';
        //this.registration_unit.district = '';
        this.registration_unit.mandal = '';
        this.registration_unit.village = '';
        this.registration_unit.rural_urban = '';
        this.registration_unit.reg_unit_name = '';
        this.registration_unit.reg_unit_name_t = '';
        this.user_reg_form.registrar_rural_urban = '';
        this.user_reg_form.registrar_mandal = '';
        this.user_reg_form.registrar_village = '';
        try {
            const req = new basemodel();
            req.type = '1020';
            req.param1 = this.registration_unit.role;
            this.spinner.show();
            this.reg_unt_array = [];
            let responce: any = await this.auth.auth_utilities_service(req);
            this.spinner.hide();
            if (responce.code) {
                this.reg_unt_array = responce.Details;
                this.spinner.hide();
                return;
            } else {
                this.reg_unt_array = [];
                this.spinner.hide();
                return;
            }
        } catch (error) {
            this.spinner.hide();
           
            this.reg_unt_array = [];
            return;
        }
    }

    reg_unit_level_array: any[] = [];
    async getregunitleveldata(): Promise<void> {
        try {
            const req = new basemodel();
            req.type = '1023';
            req.param1 = this.registration_unit.role;
            this.spinner.show();
            this.reg_unit_level_array = [];
            let responce: any = await this.auth.auth_utilities_service(req);
            this.spinner.hide();
            if (responce.code) {
                this.reg_unit_level_array = responce.Details;
                this.spinner.hide();
                return;
            } else {
                this.reg_unit_level_array = [];
                this.spinner.hide();
                return;
            }
        } catch (error) {
            this.spinner.hide();
           
            this.reg_unit_level_array = [];
            return;
        }
    }
    is_urban_disable: boolean = false; is_reg_unit_disable: boolean = false;
    registration_unit_capture_data() {  
        const splitregtpe = this.registration_unit.type_of_reg.split('^');
        this.registration_unit.reg_level = ''; this.getregunitleveldata();
        this.registration_unit.mandal = ''; this.registration_unit.rural_urban = ''; this.registration_unit.village = '';
        if (splitregtpe[0] == '5') {
            this.registration_unit.rural_urban = 'Urban';
            this.user_reg_form.registrar_rural_urban = 'Urban';
            this.is_urban_disable = true;
            this.is_reg_unit_disable = true;
            this.registration_unit.reg_unit_name = '';
            this.registration_unit.reg_unit_name_t = '';
            this.isvillagedisable = false;
            if (this.registration_unit.district != '') {
                this.MandalMuncipality(); this.registrar_mandalmuncipality();
            }
            else {

            }
        }
        else if (splitregtpe[0] == '4') {
            this.registration_unit.rural_urban = 'Rural';
            this.user_reg_form.registrar_rural_urban = 'Rural';
            this.is_urban_disable = true;
            this.is_reg_unit_disable = false;
            this.registration_unit.reg_unit_name = '';
            this.registration_unit.reg_unit_name_t = '';
            this.isvillagedisable = true;
            if (this.registration_unit.district != '') {
                this.MandalMuncipality(); this.registrar_mandalmuncipality();
            }
            else {

            }
        }
        else {
            this.registration_unit.rural_urban = '';
            this.is_urban_disable = false;
            this.is_reg_unit_disable = false;
            this.registration_unit.reg_unit_name = '';
            this.registration_unit.reg_unit_name_t = '';
            this.isvillagedisable = true;
        }
    }
    capture_reg_unit_name() { 
        const splitregtpe = this.registration_unit.type_of_reg.split('^');
        if (splitregtpe[0] == '5') {
            const result = this.Addressofparents_MandalMuncipality_array.find(item => item.MMC_CODE === this.registration_unit.mandal);
            this.registration_unit.reg_unit_name = result.MMC_NAME;
            this.registration_unit.reg_unit_name_t = result.MMC_NAME_TEL;
            this.is_reg_unit_disable = true;
        }
        else {

            this.is_reg_unit_disable = false;
        }
    }
    photoselectedFiles: File[] = [];
    @ViewChild('regunitlogo') regunitlogo: any;
    supportdoc: File[] = [];
    @ViewChild('supportdocelement') supportdocelement: any;
    fileupload(event: any, doc_type: any) {
        if (doc_type == 'logo') {
            const files: File[] = event.target.files;
            if (files.length > 1) {
                this.alt.toasterror('Upload jpeg/jpg/png formate only');
                this.photoselectedFiles = [];
                return;
            }
            const checkfilesizetype = Array.from(files);
            const checkcondion = false;
            const allowedExtensions = ['.jpg', '.jpeg', '.png'];
            const maxFileSizeMB = 5; // Maximum file size in megabytes
            for (let chc = 0; chc < checkfilesizetype.length; chc++) {
                let type = checkfilesizetype[chc].name;

                const fileExtension = checkfilesizetype[chc].name
                    .toLowerCase()
                    .substr(checkfilesizetype[chc].name.lastIndexOf('.'));
                if (allowedExtensions.indexOf(fileExtension) === -1) {
                    this.photoselectedFiles = [];
                    this.alt.toasterror('Only jpeg/jpg/png files are allowed.)');
                    return;
                }

                const fileSizeMB = checkfilesizetype[chc].size / (1024 * 1024);
                if (fileSizeMB > maxFileSizeMB) {
                    this.photoselectedFiles = [];
                    this.alt.toasterror('File size exceeds the maximum allowed limit.5mb)');
                    return;
                }
            }
            const file = event.target.files?.[0];

            if (file) {
                // this.readImage(file);
            }
            this.photoselectedFiles = Array.from(files);
            this.upload_logo();
        }
        else {
            const files: File[] = event.target.files;
            if (files.length > 1) {
                this.alt.toasterror('Upload jpeg/jpg/png formate only');
                this.supportdoc = [];
                return;
            }
            const checkfilesizetype = Array.from(files);
            const checkcondion = false;
            const allowedExtensions = ['.pdf'];
            const maxFileSizeMB = 5; // Maximum file size in megabytes
            for (let chc = 0; chc < checkfilesizetype.length; chc++) {
                let type = checkfilesizetype[chc].name;

                const fileExtension = checkfilesizetype[chc].name
                    .toLowerCase()
                    .substr(checkfilesizetype[chc].name.lastIndexOf('.'));
                if (allowedExtensions.indexOf(fileExtension) === -1) {
                    this.supportdoc = [];
                    this.alt.toasterror('Only pdf files are allowed.)');
                    return;
                }

                const fileSizeMB = checkfilesizetype[chc].size / (1024 * 1024);
                if (fileSizeMB > maxFileSizeMB) {
                    this.supportdoc = [];
                    this.alt.toasterror('File size exceeds the maximum allowed limit.5mb)');
                    return;
                }
            }
            const file = event.target.files?.[0];

            if (file) {
                // this.readImage(file);
            }
            this.supportdoc = Array.from(files);

        }
        //this.Savephotoupload();
    }
    logopath = '';
    async upload_logo() {
        if (
            this.photoselectedFiles.length == 0 &&
            this.regunitlogo.nativeElement.value != ''
        ) {
            this.alt.toasterror(' Please Upload Documents');
            return;
        } else {

            this.spinner.show();
            if (this.photoselectedFiles.length != 0) {
                let filename = 'sample' + '_' + 'TP';
                if (this.photoselectedFiles.length > 0) {
                    let maxlen = 0;
                    let uploadcheck = 0;
                    maxlen = this.photoselectedFiles.length;
                    for (let ph = 0; ph < maxlen; ph++) {
                        this.logopath = '';
                        const phform = new FormData();
                        phform.append('file', this.photoselectedFiles[ph]);
                        phform.append('input01', 'Documents');
                        phform.append('input02', 'Sample');
                        phform.append('input03', 'IMG');
                        phform.append('input04', filename);
                        phform.append('userid', 'Sample');
                        phform.append('type', 'InsertJson');
                        await this.httpClient
                            .post(this.contentuploadurl_img, phform)
                            .subscribe((res) => {
                                let rsdata: any = res;
                                if (rsdata.code) {
                                    uploadcheck++;
                                    if (rsdata.code) {
                                        this.spinner.hide();
                                        this.logopath = rsdata.path;
                                        return;
                                    } else if (rsdata.code && rsdata.Details[0].STATUS == '0') {
                                        this.spinner.hide();
                                        this.alt.toastinfo(rsdata.Details[0].STATUS_TEXT);
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

    photofilepath = '';
    async Savephotoupload() {
        if (
            this.supportdoc.length == 0 &&
            this.supportdocelement.nativeElement.value != ''
        ) {
            this.alt.toasterror(' Please Upload Documents');
            return;
        } else {
            if (this.checkinputs()) {
                this.spinner.show();
                if (this.supportdoc.length != 0) {
                    let filename = 'Supporting' + '_' + 'TP';
                    if (this.supportdoc.length > 0) {
                        let maxlen = 0;
                        let uploadcheck = 0;
                        maxlen = this.supportdoc.length;
                        for (let ph = 0; ph < maxlen; ph++) {
                            this.photofilepath = '';
                            const phform = new FormData();
                            phform.append('file', this.supportdoc[ph]);
                            phform.append('input01', 'Documents');
                            phform.append('input02', 'Supporting');
                            phform.append('input03', 'PDF');
                            phform.append('input04', filename);
                            phform.append('userid', 'Sample');
                            phform.append('type', 'InsertJson');
                            await this.httpClient
                                .post(this.contentuploadurl_img, phform)
                                .subscribe((res) => {
                                    let rsdata: any = res;
                                    if (rsdata.code) {
                                        uploadcheck++;
                                        if (rsdata.code) {
                                            this.supportdocelement.nativeElement.value = '';
                                            this.spinner.hide();
                                            this.photofilepath = rsdata.path;
                                            this.submit_register_unit();
                                            return;
                                        } else if (rsdata.code && rsdata.Details[0].STATUS == '0') {
                                            this.spinner.hide();
                                            this.alt.toastinfo(rsdata.Details[0].STATUS_TEXT);
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
                else {
                    this.spinner.hide();
                    this.submit_register_unit();
                }
            }
            else {
                this.spinner.hide();
                return;
            }
        }
    }
    checkinputs(): boolean {
        if (this.registration_unit.role == '') {
            this.alt.warning('Please select Department/శాఖ');
            return false;
        }
        else if (this.registration_unit.type_of_reg == '') {
            this.alt.warning('Please select Type of Registration Unit/నమోదు విభాగం');
            return false;
        }
        else if (this.registration_unit.reg_level == '') {
            this.alt.warning('Please select Registration Unit Level/రిజిస్ట్రేషన్ యూనిట్ లెవెల్');
            return false;
        }
        else if (this.registration_unit.reg_unit_name == '') {
            this.alt.warning('Please select Registration Unit Name/నమోదు విభాగం పేరు');
            return false;
        }
        else if (this.registration_unit.reg_unit_name_t == '') {
            this.alt.warning('Please select Registration Unit Name/నమోదు విభాగం పేరు');
            return false;
        }
        else if (this.registration_unit.district == '') {
            this.alt.warning('Please select District/ జిల్లా');
            return false;
        }
        else if (this.registration_unit.mandal == '') {
            this.alt.warning('Please select Mandal/Muncipality/ మండలం/మున్సిపాలిటీ');
            return false;
        }
        else if (this.registration_unit.village == '' && this.isvillagedisable == true) {
            this.alt.warning('Please select Village/Ward /గ్రామం /వార్డు');
            return false;
        }
        else if (this.registration_unit.address == '') {
            this.alt.warning('Please enter Address /చిరునామా');
            return false;
        }
        else if (this.registration_unit.regpincode == '') {
            this.alt.warning('Please enter PIN Code/ పిన్ కోడ్');
            return false;
        }
        // else if (this.registration_unit.google_map_link == '') {
        //     this.alt.warning('Plaese enter Googlre Map Link/గూగుల్ మ్యాప్ లింక్');
        //     return false;
        // }
        // else if (this.latitude == 0 || this.logitude == null) {
        //     this.alt.warning('Plaese enter Googlre Map Link/గూగుల్ మ్యాప్ లింక్');
        //     return false;
        // }
        // else if (this.logitude == 0 || this.logitude == null) {
        //     this.alt.warning('Plaese enter Googlre Map Link/గూగుల్ మ్యాప్ లింక్');
        //     return false;
        // }
        // else if (this.logopath == '') {
        //     this.alt.warning('Plaese upload Logo of Registration Unit/నమోదు యూనిట్ లోగో');
        //     return false;
        // }
        else if (this.user_reg_form.name_of_functionary == '') {
            this.alt.warning('Please enter Name of Functionary/పదవిదారుడి పేరు');
            return false;
        }
        else if (this.user_reg_form.name_of_functionary_t == '') {
            this.alt.warning('Please enter Name of Functionary/పదవిదారుడి పేరు');
            return false;
        }
        else if (this.user_reg_form.gender == '') {
            this.alt.warning('Please select Gender/ లింగ బేధము');
            return false;
        }
        else if (this.user_reg_form.email == '') {
            this.alt.warning('Please enter Email ID/ ఇమెయిల్ ID');
            return false;
        }
        else if (this.user_reg_form.mobileno == '') {
            this.alt.warning('Please enter Mobile Number/ మొబైల్ నంబర్');
            return false;
        }
        else if (this.user_reg_form.designation == '') {
            this.alt.warning('Please select Designation/పదవి');
            return false;
        }
        else if (this.user_reg_form.departmentaldesignation == '') {
            this.alt.warning('Please select Department Designation/శాఖా సంబంధిత పదవి');
            return false;
        }
        else if (this.user_reg_form.dateofposting == '') {
            this.alt.warning('Please select Date of Posting/పోస్టింగ్ తేది');
            return false;
        }
        else if (this.user_reg_form.registrar_district == '') {
            this.alt.warning('Please select District/ జిల్లా');
            return false;
        }
        else if (this.user_reg_form.registrar_mandal == '') {
            this.alt.warning('Please select Mandal/Muncipality/ మండలం/మున్సిపాలిటీ');
            return false;
        }
        else if (this.user_reg_form.registrar_village == '') {
            this.alt.warning('Please select Village/Town /గ్రామం / పట్టణం పేరు');
            return false;
        }
        // else if (this.user_reg_form.building_name == '') {
        //     this.alt.warning('Please enter Building No. & Name/ భవనం సంఖ్య & పేరు');
        //     return false;
        // }
        // else if (this.user_reg_form.hsno == '') {
        //     this.alt.warning('Please enter House No/ ఇంటి నం');
        //     return false;
        // }
        // else if (this.user_reg_form.street_name == '') {
        //     this.alt.warning('Please enter Street Name/ వీధి పేరు');
        //     return false;
        // }
        // else if (this.user_reg_form.locality == '') {
        //     this.alt.warning('Please enter Locality/ ప్రాంతం');
        //     return false;
        // }
        else if (this.user_reg_form.pincode == '') {
            this.alt.warning('Please enter PIN Code/ పిన్ కోడ్');
            return false;
        }
        else {
            return true;
        }
    }
    async submit_register_unit(): Promise<void> {
        const splitregtpe = this.registration_unit.type_of_reg.split('^');
        const splitregleveltpe = this.registration_unit.reg_level.split('^');
        const desigsplit = this.user_reg_form.designation.split('^');
        try {
            if (this.checkinputs()) {
                try {
                    const req = new basemodel();
                    // if (splitregtpe[0] == '5') {
                    //     req.type = '1001';
                    // }
                    // else {
                    //     req.type = '1002';
                    // }
                    req.type = '1001';  
                    req.json1 = JSON.stringify({
                        RU_TYPE: splitregtpe[0], RU_LEVEL: splitregleveltpe[1], RU_ROLE: splitregleveltpe[0], RU_NAME: this.registration_unit.reg_unit_name, RU_NAME_TEL: this.registration_unit.reg_unit_name_t, RU_REPORTING: this.RU_CODE, RU_DEPT_CODE: this.registration_unit.role, RU_DEPT: '', RU_DEPT_TEL: '', RU_STATE_CODE: '28', RU_STATE_NAME: '', RU_STATE_NAME_TEL: '', RU_DISTRICT_CODE: this.registration_unit.district, RU_DISTRICT_NAME: '', RU_DISTRICT_NAME_TEL: '', RU_RURAL_URBAN: this.registration_unit.rural_urban, RU_RURAL_URBAN_TEL: '', RU_MMC_CODE: this.registration_unit.mandal, RU_MMC_NAME: '', RU_MMC_NAME_TEL: '', RU_VW_CODE: this.registration_unit.village, RU_VW_NAME: '', RU_VW_NAME_TEL: '', RU_ADDRESS: this.registration_unit.address, RU_ADDRESS_TEL: this.registration_unit.address_tel, RU_PINCODE: this.registration_unit.regpincode, RU_LATITUDE: this.latitude, RU_LONGITUDE: this.logitude, RU_LOGO_PATH: this.logopath, RU_ZONE_CODE: '', RU_ZONE_NAME: '', RU_ZONE_NAME_TEL: '', RU_REGIONAL_CODE: '', RU_REGIONAL_NAME: '', RU_REGIONAL_NAME_TEL: '' ,RU_REVENUEDIVISION_CODE:this.user_reg_form.RevenueDivision,
                    });
                    req.json2 = JSON.stringify({ RU_NAME: this.registration_unit.reg_unit_name, RU_NAME_TEL: this.registration_unit.reg_unit_name_t, RUF_RU_CODE: '', RUF_RU_ROLE: desigsplit[0], RUF_FULLNAME: this.user_reg_form.name_of_functionary, RUF_FULLNAME_TEL: this.user_reg_form.name_of_functionary_t, RUF_GENDER: this.user_reg_form.gender, RUF_GENDER_TEL: '', RUF_UID: this.user_reg_form.aadhaarno, RUF_MOBILE_NO: this.user_reg_form.mobileno, RUF_EMAILID: this.user_reg_form.email, RUF_POSTING_DATE: this.datepipe.transform(this.user_reg_form.dateofposting, 'dd-MM-yyyy'), RUF_RU_DESIGNATION_CODE: desigsplit[0], RUF_RU_DESIGNATION_TEL: '', RUF_DEPT_DESIGNATION_CODE: this.user_reg_form.departmentaldesignation, RUF_DEPT_DESIGNATION_TEL: '', RUF_DEPT_CODE: this.registration_unit.role, RUF_DEPT: '', RUF_DEPT_TEL: '', RUF_STATE_CODE: '28', RUF_STATE_NAME: '', RUF_STATE_NAME_TEL: '', RUF_DISTRICT_CODE: this.user_reg_form.registrar_district, RUF_DISTRICT_NAME: '', RUF_DISTRICT_NAME_TEL: '', RUF_RURAL_URBAN: this.user_reg_form.registrar_rural_urban, RUF_RURAL_URBAN_TEL: '', RUF_MMC_CODE: this.user_reg_form.registrar_mandal, RUF_MMC_NAME: '', RUF_MMC_NAME_TEL: '', RUF_VW_CODE: this.user_reg_form.registrar_village, RUF_VW_NAME: '', RUF_VW_NAME_TEL: '', RUF_ADDRESS: this.user_reg_form.building_name + ',' + this.user_reg_form.hsno + ',' + this.user_reg_form.street_name + ',' + this.user_reg_form.locality, RUF_ADDRESS_TEL: '', RUF_DOC: this.photofilepath, RUF_PINCODE: this.user_reg_form.pincode, RUF_SIGNATURE: '', });
                    req.islogstore = 'YES';
                    req.logfoldername = "registration_unit";
                    req.refno = this.u_id;
                    this.spinner.show();
                    
                    let responce: any = await this.auth.auth_pkgmasters_service(req);
                    if (responce.code) {
                        if (responce.Details[0].STATUS == '1') {
                          //  this.alt.success(responce.Details[0].STATUS_TEXT + "<br/>" + responce.Details[0].STATUS_TEXT_TEL);
                            this.alt.success(responce.Details[0].STATUS_TEXT);
                            this.spinner.hide(); this.clear_inputs();
                            setTimeout(() => {
                                window.location.reload();
                            }, 2000)
                            return;
                        }
                        else if (responce.Details[0].STATUS == '0') {
                            this.alt.warning(responce.Details[0].STATUS_TEXT);
                           // this.alt.warning(responce.Details[0].STATUS_TEXT + "<br/>" + responce.Details[0].STATUS_TEXT_TEL);
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
        this.user_reg_form = {
            locality: '', email: '', mobileno: '', name_of_functionary: '', name_of_functionary_t: '', gender: '', designation: '', departmentaldesignation: '', state_name: '', registrar_district: this.user_district, registrar_rural_urban: '', registrar_mandal: '', registrar_village: '',
            pincode: '', dateofposting: '', street_name: '', hsno: '', building_name: '', aadhaarno: '', aadhaarmask: '',RevenueDivision:''
        }
        this.registration_unit = {
            reg_regional_name: '', reg_unit_name: '', type_of_reg: '', reg_level: '', role: '', state_name: '', district: this.user_district, rural_urban: '', mandal: '', village: '', reg_unit_name_t: '', address: '', address_tel: '',
            google_map_link: '', regpincode: '',
        }
    }

    user_reg_form = {
        locality: '', email: '', mobileno: '', name_of_functionary: '', name_of_functionary_t: '', gender: '', designation: '', departmentaldesignation: '', state_name: '', registrar_district: this.user_district, registrar_rural_urban: '', registrar_mandal: '', registrar_village: '',
        pincode: '', dateofposting: '', street_name: '', hsno: '', building_name: '', aadhaarno: '', aadhaarmask: '', RevenueDivision:''
    }
    close_modal() {
        this.clear_inputs();
    }
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

    registrar_state_array: any[] = [];
    async getregistrar_statedata(): Promise<void> {
        try {
            const req = new basemodel();
            req.type = '1001';
            this.spinner.show();
            this.registrar_state_array = [];
            let responce: any = await this.auth.auth_utilities_service(req);
            this.spinner.hide();
            if (responce.code) {
                this.registrar_state_array = responce.Details;
                this.spinner.hide();
                return;
            } else {
                this.registrar_state_array = [];
                this.spinner.hide();
                return;
            }
        } catch (error) {
            this.spinner.hide();
           
            this.registrar_state_array = [];
            return;
        }
    }
    registrar_district_array: any[] = [];
    async get_registrar_district(): Promise<void> {
        // if (
        //     this.registration_unit.state_name == ''
        // ) {
        //     this.alt.warning('select state');
        //     alert(JSON.stringify(this.registration_unit.state_name))
        //     return;
        // } else {

        try {
            const req = new basemodel();
            req.type = '1002';
            req.param1 = '28';// this.user_reg_form.state_name;
            this.spinner.show();
            let responce: any = await this.auth.auth_utilities_service(req);
            this.spinner.hide();
            this.registrar_district_array = [];
            if (responce.code) {
                this.registrar_district_array = responce.Details;
                this.spinner.hide();
                return;
            } else {
                this.registrar_district_array = [];
                this.spinner.hide();
            }
        } catch (error) {
            this.spinner.hide();
           
            this.registrar_district_array = [];
            return;
        }
        // }
    }

    async registrar_districtchange(): Promise<void> {
        this.user_reg_form.registrar_rural_urban = '';
        this.user_reg_form.registrar_mandal = '';
        this.user_reg_form.registrar_village = '';
    }
    registrar_MandalMuncipality_array: any[] = [];
    async registrar_mandalmuncipality(): Promise<void> {
        this.user_reg_form.registrar_mandal = ''; this.user_reg_form.registrar_village = '';
        if (
            this.user_reg_form.registrar_district == ''
        ) {
            this.spinner.hide();
            this.alt.warning('select district');
            return;
        } else if (
            this.user_reg_form.registrar_rural_urban == ''
        ) {
            this.spinner.hide();
            this.alt.warning('select Rural / Urban');
            return;
        } else {
            try {
                const req = new basemodel();
                req.type = '1003';
                req.param1 = '28'; //this.user_reg_form.state_name;
                req.param2 = this.user_reg_form.registrar_district;
                req.param3 = this.user_reg_form.registrar_rural_urban;
                this.spinner.show();
                let responce: any = await this.auth.auth_utilities_service(req);
                this.registrar_MandalMuncipality_array = [];
                if (responce.code) {
                    this.spinner.hide();
                    this.registrar_MandalMuncipality_array = responce.Details;
                    return;
                } else {
                    this.spinner.hide();
                    this.registrar_MandalMuncipality_array = [];
                    return;
                }
            } catch (error) {
                this.spinner.hide();
               
                this.registrar_MandalMuncipality_array = [];
                return;
            }
        }
    }

    registrar_village_ward_array: any[] = [];
    async registrar_villageward(): Promise<void> {
        if (
            this.user_reg_form.registrar_district == ''
        ) {
            this.spinner.hide();
            this.alt.warning('select District');
            return;
        }
        if (
            this.user_reg_form.registrar_mandal == ''
        ) {
            this.spinner.hide();
            this.alt.warning('select Mandal/Muncipality');
            return;
        }
        else {
            try {

                const req = new basemodel();
                req.type = '1004';
                req.param1 = '28';// this.user_reg_form.state_name;
                req.param2 = this.user_reg_form.registrar_district;
                req.param3 = this.user_reg_form.registrar_rural_urban;
                req.param4 = this.user_reg_form.registrar_mandal;
                this.spinner.show();
                let responce: any = await this.auth.auth_utilities_service(req);
                this.registrar_village_ward_array = []
                if (responce.code) {
                    this.spinner.hide();
                    this.registrar_village_ward_array = responce.Details;
                    return;
                } else {
                    this.registrar_village_ward_array = [];
                    this.spinner.hide();
                }
            } catch (error) {
                this.registrar_village_ward_array = [];
                this.spinner.hide();
               
            }
        }
    }
    designation_array: any[] = [];
    async getdesignationdata(): Promise<void> {

        try {
            const req = new basemodel();
            req.type = '2003';
            this.spinner.show();
            this.designation_array = [];
            let responce: any = await this.auth.auth_utilities_service(req);
            this.spinner.hide();
            if (responce.code) {
                this.designation_array = responce.Details;
                this.spinner.hide();
                return;
            } else {
                this.designation_array = [];
                this.spinner.hide();
                return;
            }
        } catch (error) {
            this.spinner.hide();
           
            this.designation_array = [];
            return;
        }
    }
    department_designation_array: any[] = [];
    async get_depat_designationdata(): Promise<void> {
        const desigsplit = this.user_reg_form.designation.split('^');
        try {
            const req = new basemodel();
            req.type = '2004';
            req.param1 = this.registration_unit.role;
            this.spinner.show();
            this.department_designation_array = [];
            let responce: any = await this.auth.auth_utilities_service(req);
            this.spinner.hide();
            if (responce.code) {
                this.department_designation_array = responce.Details;
                this.spinner.hide();
                return;
            } else {
                this.department_designation_array = [];
                this.spinner.hide();
                return;
            }
        } catch (error) {
            this.spinner.hide();
           
            this.department_designation_array = [];
            return;
        }
    }
    async validateaadhaar(aadhaar: any, inputsource: any) {
        const checknumaric = this.val.isNumber(aadhaar);
        if (aadhaar.length === 12 && checknumaric == true) {
            const isValidAadhaar = this.mid.validateVerhoeff(aadhaar);
            if (isValidAadhaar == false) {
                this.user_reg_form.aadhaarno = ''; this.user_reg_form.aadhaarmask = '';
                this.alt.toasterror('Enter a 12-digit Valid Aadhaar Number.');
                return;
            }
            if (isValidAadhaar == true) {
                this.user_reg_form.aadhaarno = this.user_reg_form.aadhaarmask;
                this.user_reg_form.aadhaarmask = this.maskinput(
                    this.user_reg_form.aadhaarmask
                );
                return;
            }
            else {
                this.alt.toasterror('Enter a 12-digit Valid Aadhaar Number.');
                this.user_reg_form.aadhaarno = ''; this.user_reg_form.aadhaarmask = '';
                return
            }
        } else if (aadhaar.length < 12) {
            this.alt.toasterror('Enter a 12-digit Aadhaar Number.');
            this.user_reg_form.aadhaarno = ''; this.user_reg_form.aadhaarmask = '';
            return;
        }
    }
    maskinput(objinput: string) {
        const maskedAadhaar = objinput.replace(/\d(?=\d{4})/g, '*');
        return maskedAadhaar !== '' ? maskedAadhaar : '';
    }
    view_details_array: any[] = []; isview_villagedisable: boolean = false; RU_DEPT_CODE = '';
    view_details(obj: any) {
        this.view_details_array = [];
        this.view_details_array.push(obj);
        this.get_viewregunitdata(obj);
        this.RU_DEPT_CODE == obj.RU_DEPT_CODE.toString();
        if (obj.RU_DEPT_CODE == '5') {
            this.isview_villagedisable = false;
        }
        else {
            this.isview_villagedisable = true;
        }

    }

    view_reg_unt_array: any[] = [];
    async get_viewregunitdata(obj: any): Promise<void> {

        try {
            const req = new basemodel();
            req.type = '1020';
            req.param1 = obj.RU_DEPT_CODE;
            this.spinner.show();
            this.view_reg_unt_array = [];
            let responce: any = await this.auth.auth_utilities_service(req);
            this.spinner.hide();
            if (responce.code) {
                this.view_reg_unt_array = responce.Details;
                this.spinner.hide();
                return;
            } else {
                this.view_reg_unt_array = [];
                this.spinner.hide();
                return;
            }
        } catch (error) {
            this.spinner.hide();
           
            this.view_reg_unt_array = [];
            return;
        }
    }


    // update details
    update_details_array: any[] = [];
    updatedetails(obj: any) {
        this.update_details_array.push(obj);
        this.get_update_district();
        this.getupdate_rolesdata();
        this.RU_CODE = obj.RU_CODE;
        this.displaymodal = 'block';
        this.update_registration_unit = {
            role: obj.RU_DEPT_CODE,
            reg_regional_name: '',
            reg_unit_name: obj.RU_NAME,
            reg_unit_name_t: obj.RU_NAME_TEL,
            type_of_reg: obj.RU_TYPE + "^" + obj.RU_TYPE_NAME,
            reg_level: obj.RU_ROLE + "^" + obj.RU_LEVEL,
            state_name: '28',
            district: obj.RU_DISTRICT_CODE,
            rural_urban: obj.RURAL_URBAN,
            mandal: obj.RU_MMC_CODE,
            village: obj.RU_VW_CODE,

            address: obj.RU_ADDRESS,
            address_tel: '',
            google_map_link: '',
            regpincode: obj.RU_PINCODE,
        }
        if (obj.RU_TYPE == '5') {
            this.update_MandalMuncipality();
            this.isupdatevillagedisable = false;
        }
        else if (obj.RU_TYPE == '4') {
            this.update_MandalMuncipality();
            this.isupdatevillagedisable = true;
        }
        else {
            this.isupdatevillagedisable = true;
        }
    }
    update_district_array: any[] = [];
    async get_update_district(): Promise<void> {
        // if (
        //     this.registration_unit.state_name == ''
        // ) {
        //     this.alt.warning('select state');
        //     alert(JSON.stringify(this.registration_unit.state_name))
        //     return;
        // } else {

        try {
            const req = new basemodel();
            req.type = '1002';
            req.param1 = '28';// this.registration_unit.state_name;
            this.spinner.show();
            let responce: any = await this.auth.auth_utilities_service(req);
            this.spinner.hide();
            this.update_district_array = [];
            if (responce.code) {
                this.update_district_array = responce.Details;
                this.update_MandalMuncipality();
                this.spinner.hide();
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
        // }
    }
    update_registration_unit = {
        reg_regional_name: '', reg_unit_name: '', type_of_reg: '', reg_level: '', role: '', state_name: '', district: '', rural_urban: '', mandal: '', village: '', reg_unit_name_t: '', address: '', address_tel: '',
        google_map_link: '', regpincode: '',
    }
    displaymodal = 'none';
    update_close_modal() {
        this.displaymodal = 'none';
    }
    isupdatevillagedisable: boolean = false;
    async update_districtchange(): Promise<void> {
        //this.registration_unit.rural_urban = '';
        this.update_registration_unit.mandal = '';
        this.update_registration_unit.village = '';

        const splitregtpe = this.registration_unit.type_of_reg.split('^');
        if (splitregtpe[0] == '5') {
            this.update_MandalMuncipality();
            this.isupdatevillagedisable = false;
        }
        else if (splitregtpe[0] == '4') {
            this.update_MandalMuncipality();
            this.isupdatevillagedisable = true;
        }
        else {
            this.isupdatevillagedisable = true;
        }
    }
    update_MandalMuncipality_array: any[] = [];
    async update_MandalMuncipality(): Promise<void> {
        if (
            this.update_registration_unit.district == ''
        ) {
            this.spinner.hide();
            this.alt.warning('select district');
            return;
        } else if (
            this.update_registration_unit.rural_urban == ''
        ) {
            this.spinner.hide();
            this.alt.warning('select Rural / Urban');
            return;
        } else {
            try {
                const req = new basemodel();
                req.type = '1003';
                req.param1 = '28';// this.registration_unit.state_name;
                req.param2 = this.update_registration_unit.district;
                req.param3 = this.update_registration_unit.rural_urban;
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
        this.update_capture_reg_unit_name();
        this.user_reg_form.registrar_mandal = this.update_registration_unit.mandal;
        if (
            this.update_registration_unit.district == ''
        ) {
            this.spinner.hide();
            this.alt.warning('select District');
            return;
        }
        if (
            this.update_registration_unit.mandal == ''
        ) {
            this.spinner.hide();
            this.alt.warning('select Mandal/Muncipality');
            return;
        }
        else {
            try {

                const req = new basemodel();
                req.type = '1004';
                req.param1 = '28';// this.registration_unit.state_name;
                req.param2 = this.update_registration_unit.district;
                req.param3 = this.update_registration_unit.rural_urban;
                req.param4 = this.update_registration_unit.mandal;
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
    update_role_array: any[] = [];
    async getupdate_rolesdata(): Promise<void> {
        try {
            const req = new basemodel();
            req.type = '1019';
            this.spinner.show();
            this.role_array = [];
            let responce: any = await this.auth.auth_utilities_service(req);
            this.update_role_array = [];
            this.spinner.hide();
            if (responce.code) {
                this.update_role_array = responce.Details;
                this.getupdateregunitdata();
                this.spinner.hide();
                return;
            } else {
                this.update_role_array = [];
                this.spinner.hide();
                return;
            }
        } catch (error) {
            this.spinner.hide();
           
            this.update_role_array = [];
            return;
        }
    }
    update_reg_unt_array: any[] = [];
    async getupdateregunitdata(): Promise<void> {
        // this.update_registration_unit.type_of_reg = '';
        // this.update_registration_unit.reg_level = '';
        // //this.registration_unit.district = '';
        // this.update_registration_unit.mandal = '';
        // this.update_registration_unit.village = '';
        // this.update_registration_unit.rural_urban = '';
        // this.update_registration_unit.reg_unit_name = '';
        // this.update_registration_unit.reg_unit_name_t = '';

        try {
            const req = new basemodel();
            req.type = '1020';
            req.param1 = this.update_registration_unit.role;
            this.spinner.show();
            this.update_reg_unt_array = [];
            let responce: any = await this.auth.auth_utilities_service(req);
            this.spinner.hide();
            if (responce.code) {
                this.update_reg_unt_array = responce.Details;
                this.getupdateregunitleveldata();
                this.spinner.hide();
                return;
            } else {
                this.update_reg_unt_array = [];
                this.spinner.hide();
                return;
            }
        } catch (error) {
            this.spinner.hide();
           
            this.update_reg_unt_array = [];
            return;
        }
    }

    update_reg_unit_level_array: any[] = [];
    async getupdateregunitleveldata(): Promise<void> {
        try {
            const req = new basemodel();
            req.type = '1023';
            req.param1 = this.update_registration_unit.role;
            this.spinner.show();
            this.update_reg_unit_level_array = [];
            let responce: any = await this.auth.auth_utilities_service(req);
            this.spinner.hide();
            if (responce.code) {
                this.update_reg_unit_level_array = responce.Details;
                this.spinner.hide();
                return;
            } else {
                this.update_reg_unit_level_array = [];
                this.spinner.hide();
                return;
            }
        } catch (error) {
            this.spinner.hide();
           
            this.update_reg_unit_level_array = [];
            return;
        }
    }
    is_update_urban_disable: boolean = false; is_update_reg_unit_disable: boolean = false;
    update_registration_unit_capture_data() {
        const splitregtpe = this.update_registration_unit.type_of_reg.split('^');
        this.update_registration_unit.reg_level = ''; this.getregunitleveldata();
        this.update_registration_unit.mandal = ''; this.update_registration_unit.rural_urban = ''; this.update_registration_unit.village = '';
        if (splitregtpe[0] == '5') {
            this.update_registration_unit.rural_urban = 'Urban';
            this.is_update_urban_disable = true;
            this.is_update_reg_unit_disable = true;
            this.update_registration_unit.reg_unit_name = '';
            this.update_registration_unit.reg_unit_name_t = '';
            this.isupdatevillagedisable = false;
            if (this.update_registration_unit.district != '') {
                this.MandalMuncipality(); this.registrar_mandalmuncipality();
            }
            else {

            }
        }
        else if (splitregtpe[0] == '4') {
            this.update_registration_unit.rural_urban = 'Rural';
            this.is_update_urban_disable = true;
            this.is_update_reg_unit_disable = true;
            this.update_registration_unit.reg_unit_name = '';
            this.update_registration_unit.reg_unit_name_t = '';
            this.isupdatevillagedisable = true;
            if (this.update_registration_unit.district != '') {
                this.MandalMuncipality(); this.registrar_mandalmuncipality();
            }
            else {

            }
        }
        else {
            this.update_registration_unit.rural_urban = '';
            this.is_update_urban_disable = false;
            this.is_update_reg_unit_disable = false;
            this.update_registration_unit.reg_unit_name = '';
            this.update_registration_unit.reg_unit_name_t = '';
            this.isupdatevillagedisable = true;
        }
    }
    update_capture_reg_unit_name() {
        const splitregtpe = this.update_registration_unit.type_of_reg.split('^');
        if (splitregtpe[0] == '5') {
            const result = this.update_MandalMuncipality_array.find(item => item.MMC_CODE === this.update_registration_unit.mandal);
            this.update_registration_unit.reg_unit_name = result.MMC_NAME;
            this.update_registration_unit.reg_unit_name_t = result.MMC_NAME_TEL;
            this.is_update_reg_unit_disable = true;
        }
        else {

            this.is_update_reg_unit_disable = false;
        }
    }

    async update() {
        if (
            this.supportdoc.length == 0 &&
            this.supportdocelement.nativeElement.value != ''
        ) {
            this.alt.toasterror(' Please Upload Documents');
            return;
        } else {
            if (this.update_checkinputs()) {
                this.spinner.show();
                if (this.supportdoc.length != 0) {
                    let filename = 'Supporting' + '_' + 'TP';
                    if (this.supportdoc.length > 0) {
                        let maxlen = 0;
                        let uploadcheck = 0;
                        maxlen = this.supportdoc.length;
                        for (let ph = 0; ph < maxlen; ph++) {
                            this.photofilepath = '';
                            const phform = new FormData();
                            phform.append('file', this.supportdoc[ph]);
                            phform.append('input01', 'Documents');
                            phform.append('input02', 'Supporting');
                            phform.append('input03', 'PDF');
                            phform.append('input04', filename);
                            phform.append('userid', 'Sample');
                            phform.append('type', 'InsertJson');
                            await this.httpClient
                                .post(this.contentuploadurl_img, phform)
                                .subscribe((res) => {
                                    let rsdata: any = res;
                                    if (rsdata.code) {
                                        uploadcheck++;
                                        if (rsdata.code) {
                                            this.supportdocelement.nativeElement.value = '';
                                            this.spinner.hide();
                                            this.photofilepath = rsdata.path;
                                            this.update_register_unit();
                                            return;
                                        } else if (rsdata.code && rsdata.Details[0].STATUS == '0') {
                                            this.spinner.hide();
                                            this.alt.toastinfo(rsdata.Details[0].STATUS_TEXT);
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
                else {
                    this.spinner.hide();
                    this.update_register_unit();
                }
            }
            else {
                this.spinner.hide();
                return;
            }
        }
    }
    update_checkinputs(): boolean {
        if (this.update_registration_unit.role == '') {
            this.alt.warning('Please select Department/శాఖ');
            return false;
        }
        else if (this.update_registration_unit.type_of_reg == '') {
            this.alt.warning('Please select Type of Registration Unit/నమోదు విభాగం');
            return false;
        }
        else if (this.update_registration_unit.reg_level == '') {
            this.alt.warning('Please select Registration Unit Level/రిజిస్ట్రేషన్ యూనిట్ లెవెల్');
            return false;
        }
        else if (this.update_registration_unit.reg_unit_name == '') {
            this.alt.warning('Please select Registration Unit Name/నమోదు విభాగం పేరు');
            return false;
        }
        else if (this.update_registration_unit.reg_unit_name_t == '') {
            this.alt.warning('Please select Registration Unit Name/నమోదు విభాగం పేరు');
            return false;
        }
        else if (this.update_registration_unit.district == '') {
            this.alt.warning('Please select District/ జిల్లా');
            return false;
        }
        else if (this.update_registration_unit.mandal == '') {
            this.alt.warning('Please select Mandal/Muncipality/ మండలం/మున్సిపాలిటీ');
            return false;
        }
        else if (this.update_registration_unit.village == '' && this.isvillagedisable == true) {
            this.alt.warning('Please select Village/Ward /గ్రామం /వార్డు');
            return false;
        }
        else if (this.update_registration_unit.address == '') {
            this.alt.warning('Please enter Address /చిరునామా');
            return false;
        }
        else if (this.update_registration_unit.regpincode == '') {
            this.alt.warning('Please enter PIN Code/ పిన్ కోడ్');
            return false;
        }
        // else if (this.registration_unit.google_map_link == '') {
        //     this.alt.warning('Plaese enter Googlre Map Link/గూగుల్ మ్యాప్ లింక్');
        //     return false;
        // }
        // else if (this.latitude == 0 || this.logitude == null) {
        //     this.alt.warning('Plaese enter Googlre Map Link/గూగుల్ మ్యాప్ లింక్');
        //     return false;
        // }
        // else if (this.logitude == 0 || this.logitude == null) {
        //     this.alt.warning('Plaese enter Googlre Map Link/గూగుల్ మ్యాప్ లింక్');
        //     return false;
        // }
        // else if (this.logopath == '') {
        //     this.alt.warning('Plaese upload Logo of Registration Unit/నమోదు యూనిట్ లోగో');
        //     return false;
        // }       
        else {
            return true;
        }
    }
    async update_register_unit(): Promise<void> {
        const splitregtpe = this.update_registration_unit.type_of_reg.split('^');
        const splitregleveltpe = this.update_registration_unit.reg_level.split('^');
        try {
            if (this.update_checkinputs()) {
                try {
                    const req = new basemodel();
                    // if (splitregtpe[0] == '5') {
                    //     req.type = '1001';
                    // }
                    // else {
                    //     req.type = '1002';
                    // }
                    req.type = '1004';
                    req.param1 = this.RU_CODE;
                    req.json1 = JSON.stringify({
                        RU_TYPE: splitregtpe[0], RU_LEVEL: splitregleveltpe[1], RU_ROLE: splitregleveltpe[0], RU_NAME: this.update_registration_unit.reg_unit_name, RU_NAME_TEL: this.update_registration_unit.reg_unit_name_t, RU_REPORTING: this.RU_CODE, RU_DEPT_CODE: this.update_registration_unit.role, RU_DEPT: '', RU_DEPT_TEL: '', RU_STATE_CODE: '28', RU_STATE_NAME: '', RU_STATE_NAME_TEL: '', RU_DISTRICT_CODE: this.update_registration_unit.district, RU_DISTRICT_NAME: '', RU_DISTRICT_NAME_TEL: '', RU_RURAL_URBAN: this.update_registration_unit.rural_urban, RU_RURAL_URBAN_TEL: '', RU_MMC_CODE: this.update_registration_unit.mandal, RU_MMC_NAME: '', RU_MMC_NAME_TEL: '', RU_VW_CODE: this.update_registration_unit.village, RU_VW_NAME: '', RU_VW_NAME_TEL: '', RU_ADDRESS: this.update_registration_unit.address, RU_ADDRESS_TEL: this.update_registration_unit.address_tel, RU_PINCODE: this.update_registration_unit.regpincode, RU_LATITUDE: this.latitude, RU_LONGITUDE: this.logitude, RU_LOGO_PATH: this.logopath, RU_ZONE_CODE: '', RU_ZONE_NAME: '', RU_ZONE_NAME_TEL: '', RU_REGIONAL_CODE: '', RU_REGIONAL_NAME: '', RU_REGIONAL_NAME_TEL: ''
                    });
                    req.islogstore = 'YES';
                    req.logfoldername = "registration_unit";
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

    async update_active_status(obj: any): Promise<void> {
        try {
            Swal.fire({
                title: 'Confirm Status Update',
                text: 'Are you sure you want to update the current status of this Registration Unit? ' + obj.RU_NAME,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Update Status',
                cancelButtonText: 'Cancel',
            }).then((result) => {
                if (result.isConfirmed) {
                    this.update_current_status(obj);
                    Swal.fire({
                        title: 'Updated!',
                        text: 'The Registrar status has been successfully updated.',
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
            req.type = '1005';
            req.param1 = obj.RU_CODE;
            this.spinner.show();
            let responce: any = await this.auth.auth_pkgmasters_service(req);
            if (responce.code) {
                if (responce.Details[0].STATUS == '1') {
                    this.alt.success(responce.Details[0].STATUS_TEXT);
                    this.get_registration_unit_details();
                    this.spinner.hide();
                    return;
                }
                else if (responce.Details[0].STATUS == '0') {
                    this.alt.warning(responce.Details[0].STATUS_TEXT);
                    this.spinner.hide();
                    obj.ISACTIVE = 1;
                    return;
                }
                else {
                    this.alt.warning(responce.message);
                    this.spinner.hide();
                    obj.ISACTIVE = 1;
                    return;
                }

            }
            else {
                this.alt.warning(responce.message);
                this.spinner.hide();
                obj.ISACTIVE = 1;
                return;
            }
        } catch (error) {
            this.spinner.hide();
            obj.ISACTIVE = 1;
           
        }
    }

    department_revenuesdata_array: any[] = [];
    async get_depat_revenuesdata(): Promise<void> {

        try {
            const req = new basemodel();
            req.type = '2012';
            req.param1 = this.user_district;
            this.spinner.show();
            this.department_revenuesdata_array = [];
            let responce: any = await this.auth.auth_utilities_service(req);
            this.spinner.hide();
            debugger
            if (responce.code) {
                this.department_revenuesdata_array = responce.Details;
                this.spinner.hide();
                return;
            } else {
                this.department_revenuesdata_array = [];
                this.spinner.hide();
                return;
            }
        } catch (error) {
            this.spinner.hide();
           
            this.department_revenuesdata_array = [];
            return;
        }
    }
}
