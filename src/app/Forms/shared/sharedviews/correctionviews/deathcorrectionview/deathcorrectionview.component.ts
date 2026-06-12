import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertsService } from 'src/app/services/alert_lyr/alerts.service';
import { EncDecService } from 'src/app/services/enc_dec_lyr/enc-dec.service';
import { basemodel } from 'src/app/thirparty/model/apimodel';
import { AuthserService } from 'src/app/services/api_lyr/private/authser.service';
import { InputvalidaionService } from 'src/app/thirparty/validation/inputvalidaion.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { PrivateService } from 'src/app/services/api_lyr/private/private.service';
import { MiddlewareService } from 'src/app/services/middleware_lyr/middleware.service';
import { NgModel } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

declare var Fancybox: any;

@Component({
    selector: 'app-deathcorrectionview',
    templateUrl: './deathcorrectionview.component.html',
    styleUrl: './deathcorrectionview.component.css'
})
export class DeathcorrectionviewComponent {
    @Input() applicationid: any;
    @Input() applicationregnumber: any;
    @Input() typeofcorrection: any;
    UROLE: any;
    showcheckbox = false;
    contentuploadurl = '';
    contentshowurl = '';
    RU_CODE: any;

    constructor(private spinner: NgxSpinnerService,
        private auth: AuthserService, private alt: AlertsService, private encdc: EncDecService,
        private router: Router, private http: HttpClient,
        private val: InputvalidaionService, private sanitizer: DomSanitizer,
        private pscall: PrivateService, private mid: MiddlewareService, private httpClient: HttpClient,
        private datepipe: DatePipe,
    ) {
        this.contentuploadurl = this.mid.globalsetting.api_url_conent_upload;
        this.contentshowurl = mid.globalsetting.api_url_conent_show;
    }
    bsConfig: Partial<BsDatepickerModule> = {
        dateInputFormat: 'DD-MM-YYYY',
        isDisabled: false,
        startView: 'day',
        showWeekNumbers: false,
        containerClass: 'theme-blue',
        showClearButton: true,
    };
    async ngOnInit() {

        if (sessionStorage.getItem('_Uenc') !== '') {
            let obj: any = this.encdc.Getuser();
            if (obj != '' && obj != undefined && obj != null) {
                this.UROLE = obj[0].UROLE;
                this.RU_CODE = obj[0].RU_CODE;
                Fancybox.defaults.Hash = false;
                Fancybox.bind('[data-fancybox="gallery"]', {
                    Hash: false,  // Disable URL hash changes
                });
                await this.get_AdditionalSupportingDocuments();
                await this.getstatedata();
                await this.getcountry();
                await this.getHospital();
                await this.getPlaceofDeath();
                await this.getcorrectiondrop();
                await this.getdraft_details();
                await this.getdraft();
                //this.downloadorder();
            } else {
                this.encdc.Usersessionkill();
            }
        }
        else {
            this.encdc.Usersessionkill();
            this.router.navigate(['/Sessionexpired']);
        }
    }

    draft_details_array = {
        language: {
            primarylan: 'English',
            secondarylan: 'Telugu',
            dateofreport: '',
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
            Gendercheck: '0',
            Genderremarks: '',
            FullNamecheck: '0',
            FullNameremarks: '',
            DateofBirthcheck: '0',
            DateofBirthremarks: '',
            agecheck: '0',
            ageremarks: '',

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
            aadhaarcheck: '0',
            aadhaarremarks: '',

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
            father_full_namercheck: '0',
            father_full_namerremarks: '',
            father_aadhhar_numbercheck: '0',
            father_aadhhar_numberremarks: '',
            father_mobile_numbercheck: '0',
            father_email_numbercheck: '0',
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
            mother_full_namecheck: '0',
            mother_full_nameremarks: '',
            mother_aadhhar_numbercheck: '0',
            mother_aadhhar_numberremarks: '',
            mother_emailcheck: '0',
            mother_mobile_numbercheck: '0',

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
            MaritalStatuscheck: '0',
            MaritalStatusremarks: '',
            Spouse_FullName_valcheck: '0',
            Spouse_FullName_valremarks: '',
            Spouse_AadharNumber_maskcheck: '0',
            Spouse_AadharNumber_maskremarks: '',
            Spouse_ContactDetails_EmailIdcheck: '0',
            Spouse_ContactDetails_Mobilenocheck: '0',

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
            addressof_parentscheck: '0',
            addressof_parentsremarks: '',

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
            address_permenentcheck: '0',
            address_permenentremarks: '',

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
            Typeofmedicalcheck: '0',
            Typeofmedicalremarks: '',
            deathmedicallycheck: '0',
            deathmedicallyremarks: '',
            DiseaseorActualcheck: '0',
            DiseaseorActualremarks: '',
            habituallysmokecheck: '0',
            habituallysmokeremarks: '',
            chewtobaccocheck: '0',
            chewtobaccoremarks: '',
            chewarecanutcheck: '0',
            chewarecanutremarks: '',
            drinkalcoholcheck: '0',
            drinkalcoholremarks: '',
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
    new_draft_details_array = {
        language: {
            primarylan: 'English',
            secondarylan: 'Telugu',
            dateofreport: '',
        },
        Informationofthedeceased: {

            new_Gender: '',
            new_Gender_val: '',
            new_DateofBirth: '',
            new_AgeYear: '',
            new_AgeMonth: '',
            new_AgeDay: '',
            new_Hours: '',
            new_FullName: '',
            new_FullName_tel: '',
            new_middlename: '',
            new_middlename_tel: '',
            new_Surname: '',
            new_Surname_tel: '',
        },
        Confirmnameofthedeceased: {

            new_FullName: '',
            new_FullName_tel: '',
            new_FullName_val: '',
            new_Surname: '',
            new_Surname_tel: '',
            new_Surname_val: '',
            new_Aadhaartype: '',
            new_AadhaarEIDNumber: '',
            new_FullName_value: '',
            new_middlename: '',
            new_middlename_tel: '',
            new_AadhaarEIDNumber_mask: '',
        },
        fatherInformation: {

            new_father_full_namer: '',
            new_father_full_namer_t: '',
            new_father_full_namer_val: '',
            new_father_surname: '',
            new_father_surname_t: '',
            new_father_surname_val: '',
            new_father_mobile_number: '',
            new_father_email_number: '',
            new_father_aadhhar_number: '',
            new_father_full_namer_value: '',
            new_father_middlename: '',
            new_father_middlename_t: '',
            new_father_aadhhar_number_mask: '',
        },
        motherInformation: {

            new_mother_full_name: '',
            new_mother_full_name_t: '',
            new_mother_full_name_val: '',
            new_mother_surname_name: '',
            new_mother_surname_name_t: '',
            new_mother_surname_name_val: '',
            new_mother_mobile_number: '',
            new_mother_email: '',
            new_mother_aadhaar_number: '',
            new_mother_full_name_value: '',
            new_mother_middlename: '',
            new_mother_middlename_t: '',
            new_mother_aadhaar_number_mask: '',
        },
        MaritalStatus: {
            new_Spouse_Married_Status: '',
            new_Spouse_FullName: '',
            new_Spouse_FullName_tel: '',
            new_Spouse_FullName_val: '',
            new_Spouse_Surname: '',
            new_Spouse_Surname_tel: '',
            new_Spouse_Surname_val: '',
            new_Spouse_AadharNumber: '',
            new_Spouse_DateofBirth: '',
            new_Spouse_AgeYear: '',
            new_Spouse_ContactDetails_EmailId: '',
            new_Spouse_ContactDetails_Mobileno: '',
            new_Spouse_FullName_value: '',
            new_Spouse_middlename: '',
            new_Spouse_middlename_tel: '',
            new_Spouse_AadharNumber_mask: '',
        },
        Addressofthedeceased: {
            new_addressof: '',
            new_Country: '',
            new_address: '',
            new_address_t: '',
            new_Country_val: '',
            new_Country_address_val: '',
            new_State: '',
            new_State_val: '',
            new_District: '',
            new_District_val: '',
            new_UrbanRural: '',
            new_UrbanRural_val: '',
            new_MandalMuncipality: '',
            new_MandalMuncipality_val: '',
            new_VillageWard: '',
            new_VillageWard_val: '',
            new_BuildingNo: '',
            new_BuildingNo_tel: '',
            new_BuildingNo_val: '',
            new_HouseNo: '',
            new_HouseNo_tel: '',
            new_HouseNo_val: '',
            new_StreetName: '',
            new_StreetName_tel: '',
            new_StreetName_val: '',
            new_Locality: '',
            new_Locality_tel: '',
            new_Locality_val: '',
            new_PINCode: '',
            new_PostOffice: '',
            new_Addressofthedeceased_value: '',
        },
        Permanentaddress: {
            new_permantaddressof: '',
            new_addressof: '',
            new_sameasaddress: '',
            new_Country: '',
            new_Country_val: '',
            new_address: '',
            new_address_t: '',
            new_address_val: '',
            new_State: '',
            new_State_val: '',
            new_District: '',
            new_District_val: '',
            new_UrbanRural: '',
            new_UrbanRural_val: '',
            new_MandalMuncipality: '',
            new_MandalMuncipality_val: '',
            new_VillageWard: '',
            new_VillageWard_val: '',
            new_BuildingNo: '',
            new_BuildingNo_tel: '',
            new_BuildingNo_val: '',
            new_HouseNo: '',
            new_HouseNo_tel: '',
            new_HouseNo_val: '',
            new_StreetName: '',
            new_StreetName_tel: '',
            new_StreetName_val: '',
            new_Locality: '',
            new_Locality_tel: '',
            new_Locality_val: '',
            new_PINCode: '',
            new_PostOffice: '',
            new_Permanentaddress_value: '',
        }
    };

    async clernewvalue() {

        this.draft_details_array = {
            language: {
                primarylan: 'English',
                secondarylan: 'Telugu',
                dateofreport: '',
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
                Gendercheck: '0',
                Genderremarks: '',
                FullNamecheck: '0',
                FullNameremarks: '',
                DateofBirthcheck: '0',
                DateofBirthremarks: '',
                agecheck: '0',
                ageremarks: '',

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
                aadhaarcheck: '0',
                aadhaarremarks: '',

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
                father_full_namercheck: '0',
                father_full_namerremarks: '',
                father_aadhhar_numbercheck: '0',
                father_aadhhar_numberremarks: '',
                father_mobile_numbercheck: '0',
                father_email_numbercheck: '0',
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
                mother_full_namecheck: '0',
                mother_full_nameremarks: '',
                mother_aadhhar_numbercheck: '0',
                mother_aadhhar_numberremarks: '',
                mother_emailcheck: '0',
                mother_mobile_numbercheck: '0',

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
                MaritalStatuscheck: '0',
                MaritalStatusremarks: '',
                Spouse_FullName_valcheck: '0',
                Spouse_FullName_valremarks: '',
                Spouse_AadharNumber_maskcheck: '0',
                Spouse_AadharNumber_maskremarks: '',
                Spouse_ContactDetails_EmailIdcheck: '0',
                Spouse_ContactDetails_Mobilenocheck: '0',

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
                addressof_parentscheck: '0',
                addressof_parentsremarks: '',

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
                address_permenentcheck: '0',
                address_permenentremarks: '',

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
                Typeofmedicalcheck: '0',
                Typeofmedicalremarks: '',
                deathmedicallycheck: '0',
                deathmedicallyremarks: '',
                DiseaseorActualcheck: '0',
                DiseaseorActualremarks: '',
                habituallysmokecheck: '0',
                habituallysmokeremarks: '',
                chewtobaccocheck: '0',
                chewtobaccoremarks: '',
                chewarecanutcheck: '0',
                chewarecanutremarks: '',
                drinkalcoholcheck: '0',
                drinkalcoholremarks: '',
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
        this.new_draft_details_array = {
            language: {
                primarylan: 'English',
                secondarylan: 'Telugu',
                dateofreport: '',
            },
            Informationofthedeceased: {

                new_Gender: '',
                new_Gender_val: '',
                new_DateofBirth: '',
                new_AgeYear: '',
                new_AgeMonth: '',
                new_AgeDay: '',
                new_Hours: '',
                new_FullName: '',
                new_FullName_tel: '',
                new_middlename: '',
                new_middlename_tel: '',
                new_Surname: '',
                new_Surname_tel: '',
            },
            Confirmnameofthedeceased: {

                new_FullName: '',
                new_FullName_tel: '',
                new_FullName_val: '',
                new_Surname: '',
                new_Surname_tel: '',
                new_Surname_val: '',
                new_Aadhaartype: '',
                new_AadhaarEIDNumber: '',
                new_FullName_value: '',
                new_middlename: '',
                new_middlename_tel: '',
                new_AadhaarEIDNumber_mask: '',
            },
            fatherInformation: {

                new_father_full_namer: '',
                new_father_full_namer_t: '',
                new_father_full_namer_val: '',
                new_father_surname: '',
                new_father_surname_t: '',
                new_father_surname_val: '',
                new_father_mobile_number: '',
                new_father_email_number: '',
                new_father_aadhhar_number: '',
                new_father_full_namer_value: '',
                new_father_middlename: '',
                new_father_middlename_t: '',
                new_father_aadhhar_number_mask: '',
            },
            motherInformation: {

                new_mother_full_name: '',
                new_mother_full_name_t: '',
                new_mother_full_name_val: '',
                new_mother_surname_name: '',
                new_mother_surname_name_t: '',
                new_mother_surname_name_val: '',
                new_mother_mobile_number: '',
                new_mother_email: '',
                new_mother_aadhaar_number: '',
                new_mother_full_name_value: '',
                new_mother_middlename: '',
                new_mother_middlename_t: '',
                new_mother_aadhaar_number_mask: '',
            },
            MaritalStatus: {
                new_Spouse_Married_Status: '',
                new_Spouse_FullName: '',
                new_Spouse_FullName_tel: '',
                new_Spouse_FullName_val: '',
                new_Spouse_Surname: '',
                new_Spouse_Surname_tel: '',
                new_Spouse_Surname_val: '',
                new_Spouse_AadharNumber: '',
                new_Spouse_DateofBirth: '',
                new_Spouse_AgeYear: '',
                new_Spouse_ContactDetails_EmailId: '',
                new_Spouse_ContactDetails_Mobileno: '',
                new_Spouse_FullName_value: '',
                new_Spouse_middlename: '',
                new_Spouse_middlename_tel: '',
                new_Spouse_AadharNumber_mask: '',
            },
            Addressofthedeceased: {

                new_addressof: '',
                new_Country: '',
                new_address: '',
                new_address_t: '',
                new_Country_val: '',
                new_Country_address_val: '',
                new_State: '',
                new_State_val: '',
                new_District: '',
                new_District_val: '',
                new_UrbanRural: '',
                new_UrbanRural_val: '',
                new_MandalMuncipality: '',
                new_MandalMuncipality_val: '',
                new_VillageWard: '',
                new_VillageWard_val: '',
                new_BuildingNo: '',
                new_BuildingNo_tel: '',
                new_BuildingNo_val: '',
                new_HouseNo: '',
                new_HouseNo_tel: '',
                new_HouseNo_val: '',
                new_StreetName: '',
                new_StreetName_tel: '',
                new_StreetName_val: '',
                new_Locality: '',
                new_Locality_tel: '',
                new_Locality_val: '',
                new_PINCode: '',
                new_PostOffice: '',
                new_Addressofthedeceased_value: '',
            },
            Permanentaddress: {

                new_permantaddressof: '',
                new_addressof: '',
                new_sameasaddress: '',
                new_Country: '',
                new_Country_val: '',
                new_address: '',
                new_address_t: '',
                new_address_val: '',
                new_State: '',
                new_State_val: '',
                new_District: '',
                new_District_val: '',
                new_UrbanRural: '',
                new_UrbanRural_val: '',
                new_MandalMuncipality: '',
                new_MandalMuncipality_val: '',
                new_VillageWard: '',
                new_VillageWard_val: '',
                new_BuildingNo: '',
                new_BuildingNo_tel: '',
                new_BuildingNo_val: '',
                new_HouseNo: '',
                new_HouseNo_tel: '',
                new_HouseNo_val: '',
                new_StreetName: '',
                new_StreetName_tel: '',
                new_StreetName_val: '',
                new_Locality: '',
                new_Locality_tel: '',
                new_Locality_val: '',
                new_PINCode: '',
                new_PostOffice: '',
                new_Permanentaddress_value: '',
            }
        };
        await this.getdraft_details();
        await this.getdraft();
    }

    documnets = {
        documentcode: '',
        documentdescription: '',
        documentpath: '',
        documentformat: '',
        documentsize: '',
        documentfilename: '',
    };
    dateofdeathmax = new Date(); dateofdeathmin!: Date;
    confirmdateofdeathmax!: Date; confirmdateofdeathmin!: Date; dateofbirthdisable = false;
    onDateChange(event: any, type: any) {
        const formattedDate = this.datepipe.transform(event, 'dd-MM-yyyy');

        if (type == 'DateofBirth') {
            this.new_draft_details_array.Informationofthedeceased.new_DateofBirth =
                formattedDate || '';
            this.dateofbirthdisable = true;
            if (this.draft_details_array.Informationofthedeceased.ConfirmDateofDeath != '' &&
                this.new_draft_details_array.Informationofthedeceased.new_DateofBirth != ''
            ) {
                this.calculateDateDifference(
                    this.draft_details_array.Informationofthedeceased.ConfirmDateofDeath,
                    this.new_draft_details_array.Informationofthedeceased.new_DateofBirth
                );
            }
        }
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
            //console.error('Invalid date formats');
            (this.new_draft_details_array.Informationofthedeceased.new_DateofBirth = ''),
                (this.draft_details_array.Informationofthedeceased.DateofDeath = '');
            (this.draft_details_array.Informationofthedeceased.ConfirmDateofDeath =
                ''),
                this.alt.toasterror('Invalid date formats.');
            return;
        }
        if (startDate > endDate) {
            (this.new_draft_details_array.Informationofthedeceased.new_DateofBirth = ''),
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
        //console.log(`Years: ${years}, Months: ${months}, Days: ${days}`);
        this.new_draft_details_array.Informationofthedeceased.new_AgeYear =
            years.toString();
        this.new_draft_details_array.Informationofthedeceased.new_AgeMonth =
            months.toString();
        this.new_draft_details_array.Informationofthedeceased.new_AgeDay = days.toString();
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
            this.isConfirmStatisticalEnabled = true;
            tabButton.classList.add('active');
            tabContent.classList.add('show', 'active');
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
    checkvaluedefult() {
        this.draft_details_array.Informationofthedeceased.Gendercheck = '0';
        this.draft_details_array.Informationofthedeceased.Genderremarks = '';
        this.draft_details_array.Informationofthedeceased.FullNamecheck = '0';
        this.draft_details_array.Informationofthedeceased.FullNameremarks = '';
        this.draft_details_array.Informationofthedeceased.DateofBirthcheck = '0';
        this.draft_details_array.Informationofthedeceased.DateofBirthremarks = '';
        this.draft_details_array.Informationofthedeceased.agecheck = '0';
        this.draft_details_array.Informationofthedeceased.ageremarks = '';
        this.draft_details_array.Confirmnameofthedeceased.aadhaarcheck = '0';
        this.draft_details_array.Confirmnameofthedeceased.aadhaarremarks = ''
        this.draft_details_array.fatherInformation.father_full_namercheck = '0';
        this.draft_details_array.fatherInformation.father_full_namerremarks = '';
        this.draft_details_array.fatherInformation.father_aadhhar_numbercheck = '0';
        this.draft_details_array.fatherInformation.father_aadhhar_numberremarks = '';
        this.draft_details_array.motherInformation.mother_full_namecheck = '0';
        this.draft_details_array.motherInformation.mother_full_nameremarks = '';
        this.draft_details_array.motherInformation.mother_aadhhar_numbercheck = '0';
        this.draft_details_array.motherInformation.mother_aadhhar_numberremarks = '';
        this.draft_details_array.MaritalStatus.MaritalStatuscheck = '0';
        this.draft_details_array.MaritalStatus.MaritalStatusremarks = '';
        this.draft_details_array.MaritalStatus.Spouse_FullName_valcheck = '0';
        this.draft_details_array.MaritalStatus.Spouse_FullName_valremarks = '';
        this.draft_details_array.MaritalStatus.Spouse_AadharNumber_maskcheck = '0';
        this.draft_details_array.MaritalStatus.Spouse_AadharNumber_maskremarks = '';
        this.draft_details_array.Addressofthedeceased.addressof_parentscheck = '0';
        this.draft_details_array.Addressofthedeceased.addressof_parentsremarks = '';
        this.draft_details_array.Permanentaddress.address_permenentcheck = '0';
        this.draft_details_array.Permanentaddress.address_permenentremarks = '';
    }
    async getdraft_details(): Promise<void> {
        try {
            const req = new basemodel();
            this.spinner.show();
            req.type = '1015';
            req.param1 = this.applicationregnumber;
            req.param2 = 'DEATH';
            let rsdata: any = await this.auth.auth_pkgcrsdeath_service(req);
            debugger
            this.spinner.hide();
            if (rsdata.code) {
                if (rsdata.code && rsdata.Details[0].STATUS == '1') {
                    this.draft_details_array = this.replaceNullWithEmptyString(JSON.parse(rsdata.Details[0].JSON_RESULT));
                    this.checkvaluedefult();
                }
                if (rsdata.code && rsdata.Details[0].STATUS == '0') {
                    this.alt.toasterror(
                        rsdata.Details[0].STATUS_TEXT +
                        '<br>' +
                        rsdata.Details[0].STATUS_TEXT_TEL
                    );
                }

            } else {
                this.alt.toasterror('death details not found');
                this.spinner.hide();
            }
        } catch (error) {
            this.spinner.hide();
            this.alt.toasterror('something went wrong' + error);
        }
    }
    brapplicationid: any;
    applicationstatus: any;
    async getdraft(): Promise<void> {
        try {
            const req = new basemodel();
            req.type = '10001';
            req.param1 = 'DEATH';
            req.param2 = this.applicationregnumber;
            req.param3 = this.applicationid;
            req.param4 = this.typeofcorrection;
            this.spinner.show();
            let rsdata: any = await this.auth.auth_pkgcrsdeath_service(req);
            this.brapplicationid = '';
            this.spinner.hide();
            if (rsdata.code) {
                if (rsdata.code && rsdata.Details[0].STATUS == '1') {
                    this.brapplicationid = rsdata.Details[0].APPLICATION_ID;
                    this.applicationstatus = rsdata.Details[0].APPLICATION_STATUS;
                    await this.get_document_details();
                }
            } else {
                this.spinner.hide();
            }
        } catch (error) {
            this.spinner.hide();
            this.alt.toasterror('something went wrong' + error);
        }
    }
    isConfirmLegalEnabled = true;
    isConfirmStatisticalEnabled = false;
    enableConfirmLegalTab() {
        this.spinner.hide();
    }
    enableConfirmStatisticalTab() {
        if(this.typeofcorrection=='Correction'){
            if (!this.validationforinputs()) {
                this.isConfirmStatisticalEnabled = true;
                // this.get_MethodofDelivery();
                // this.get_Typeofattention();
                this.openTab('pills-confirmdeathstatistic-tab');
                this.get_AdditionalSupportingDocuments();
                this.spinner.hide();
            }
        }else{
            this.isConfirmStatisticalEnabled = true;
                // this.get_MethodofDelivery();
                // this.get_Typeofattention();
                this.openTab('pills-confirmdeathstatistic-tab');
                this.get_AdditionalSupportingDocuments();
                this.spinner.hide();
        }
        
        // this.openTab('pills-confirmdeathstatistic-tab');

        // this.isConfirmStatisticalEnabled = true;
        // this.spinner.hide();
    }

    @ViewChild('sel_gender') sel_gender!: NgModel;
    @ViewChild('condateofreport') condateofreport!: NgModel;
    @ViewChild('ngAgeYear') ngAgeYear!: NgModel;
    @ViewChild('ngAgeMonth') ngAgeMonth!: NgModel;
    @ViewChild('TimeofDeath') TimeofDeath!: NgModel;
    @ViewChild('ngInformationFullName') ngInformationFullName!: NgModel;
    @ViewChild('InformationofthedeceasedSurname') InformationofthedeceasedSurname!: NgModel;
    @ViewChild('confrimngFullName') confrimngFullName!: NgModel;
    @ViewChild('ngSurname') ngSurname!: NgModel;
    @ViewChild('sel_aadhar') sel_aadhar!: NgModel;
    @ViewChild('aadhaar') aadhaar!: NgModel;
    @ViewChild('Mother_full_name') Mother_full_name!: NgModel;
    @ViewChild('Mother_surname_name') Mother_surname_name!: NgModel;
    @ViewChild('Mother_aadhaar_no') Mother_aadhaar_no!: NgModel;
    @ViewChild('Father__full_namer') Father__full_namer!: NgModel;
    @ViewChild('Father_surname') Father_surname!: NgModel;
    @ViewChild('Father_aadhhar_number') Father_aadhhar_number!: NgModel;
    @ViewChild('ngSpouse_FullName') ngSpouse_FullName!: NgModel;
    @ViewChild('ngSpouse_Surname') ngSpouse_Surname!: NgModel;
    @ViewChild('ngSpouse_AadharNumber') ngSpouse_AadharNumber!: NgModel;
    @ViewChild('ngCountry') ngCountry!: NgModel;
    @ViewChild('ngaddress') ngaddress!: NgModel;
    @ViewChild('ngState') ngState!: NgModel;
    @ViewChild('ngDistrict') ngDistrict!: NgModel;
    @ViewChild('ngUrbanRural') ngUrbanRural!: NgModel;
    @ViewChild('ngMandalMuncipality') ngMandalMuncipality!: NgModel;
    @ViewChild('ngVillageWard') ngVillageWard!: NgModel;
    @ViewChild('ngLocality') ngLocality!: NgModel;
    @ViewChild('ngHouseNo') ngHouseNo!: NgModel;
    @ViewChild('ngBuildingNo') ngBuildingNo!: NgModel;
    @ViewChild('ngStreetName') ngStreetName!: NgModel;
    @ViewChild('ngPINCode') ngPINCode!: NgModel;
    @ViewChild('ngPostOffice') ngPostOffice!: NgModel;
    @ViewChild('ngPermanentaddressaddress') ngPermanentaddressaddress!: NgModel;
    @ViewChild('ngPermanentCountry') ngPermanentCountry!: NgModel;
    @ViewChild('ngPerm_State') ngPerm_State!: NgModel;
    @ViewChild('ngPerm_District') ngPerm_District!: NgModel;
    @ViewChild('ngPerm_UrbanRural') ngPerm_UrbanRural!: NgModel;
    @ViewChild('ngPerm_MandalMuncipality') ngPerm_MandalMuncipality!: NgModel;
    @ViewChild('ngPerm_VillageWard') ngPerm_VillageWard!: NgModel;
    @ViewChild('ngPerm_BuildingNo') ngPerm_BuildingNo!: NgModel;
    @ViewChild('ngPerm_HouseNo') ngPerm_HouseNo!: NgModel;
    @ViewChild('ngPerm_StreetName') ngPerm_StreetName!: NgModel;
    @ViewChild('ngPerm_Locality') ngPerm_Locality!: NgModel;
    @ViewChild('ngPerm_PINCode') ngPerm_PINCode!: NgModel;
    @ViewChild('ngPerm_PostOffice') ngPerm_PostOffice!: NgModel;

    validationforinputs() {
        debugger
        let isInvalid = false;
        let tostervalue = "";
        switch (this.typeofcorrection) {
            case 'Correction':
                if (this.gendershow) {
                    if (this.sel_gender) {
                        this.sel_gender.control.markAsTouched();
                        this.sel_gender.control.updateValueAndValidity();
                        // this.foc_sel_gender.nativeElement.focus();
                        if (this.sel_gender.invalid) {
                            isInvalid = true;
                            tostervalue = "Please Select Deceased Gender Drop Down";
                            break;

                        }
                    }
                }
                if (this.ageshow) {
                    if (this.condateofreport) {
                        this.condateofreport.control.markAsTouched();
                        this.condateofreport.control.updateValueAndValidity();
                        // this.foc_sel_gender.nativeElement.focus();
                        if (this.condateofreport.invalid) {
                            isInvalid = true;
                            tostervalue = "Please Select Deceased Date of Birth";
                            break;
                        }

                    }
                    if (this.ngAgeYear) {
                        this.ngAgeYear.control.markAsTouched();
                        this.ngAgeYear.control.updateValueAndValidity();
                        // this.foc_sel_gender.nativeElement.focus();
                        if (this.ngAgeYear.invalid) {
                            isInvalid = true;
                            tostervalue = "Please Enter Deceased Age(In Years)";
                            break;
                        }

                    }
                    if (this.ngAgeMonth) {
                        this.ngAgeMonth.control.markAsTouched();
                        this.ngAgeMonth.control.updateValueAndValidity();
                        // this.foc_sel_gender.nativeElement.focus();
                        if (this.ngAgeMonth.invalid) {
                            isInvalid = true;
                            tostervalue = "Please Enter Deceased Age(In Months)";
                            break;
                        }

                    }
                    if (this.TimeofDeath) {
                        this.TimeofDeath.control.markAsTouched();
                        this.TimeofDeath.control.updateValueAndValidity();
                        // this.foc_sel_gender.nativeElement.focus();
                        if (this.TimeofDeath.invalid) {
                            isInvalid = true;
                            tostervalue = "Please Enter Deceased Age(In Hours)";
                            break;
                        }

                    }
                }
                if (this.FullNameshow) {
                    if (this.ngInformationFullName) {
                        this.ngInformationFullName.control.markAsTouched();
                        this.ngInformationFullName.control.updateValueAndValidity();
                        // this.foc_sel_gender.nativeElement.focus();
                        if (this.ngInformationFullName.invalid) {
                            isInvalid = true;
                            tostervalue = "Please Enter Deceased First Name";
                            break;
                        }

                    }
                    if (this.InformationofthedeceasedSurname) {
                        this.InformationofthedeceasedSurname.control.markAsTouched();
                        this.InformationofthedeceasedSurname.control.updateValueAndValidity();
                        // this.foc_sel_gender.nativeElement.focus();
                        if (this.InformationofthedeceasedSurname.invalid) {
                            isInvalid = true;
                            tostervalue = "Please Enter Deceased Last Name";
                            break;
                        }

                    }
                    if (
                        this.new_draft_details_array.Informationofthedeceased.new_FullName.toUpperCase() !=
                        this.new_draft_details_array.Confirmnameofthedeceased.new_FullName.toUpperCase()
                    ) {
                        this.ngInformationFullName.control.markAsTouched();
                        this.ngInformationFullName.control.updateValueAndValidity();
                        this.confrimngFullName.control.markAsTouched();
                        this.confrimngFullName.control.updateValueAndValidity();
                        this.ngInformationFullName.control.setErrors({ mismatch: true });
                        this.confrimngFullName.control.setErrors({ mismatch: true });
                        // this.foc_confirm_fullname.nativeElement.focus();
                        tostervalue = "Deceased First Name and Confim Name Missmach";
                        isInvalid = true;
                        break;


                    }
                    if (
                        this.new_draft_details_array.Informationofthedeceased.new_Surname.toUpperCase() !=
                        this.new_draft_details_array.Confirmnameofthedeceased.new_Surname.toUpperCase()
                    ) {
                        this.InformationofthedeceasedSurname.control.markAsTouched();
                        this.InformationofthedeceasedSurname.control.updateValueAndValidity();
                        this.ngSurname.control.markAsTouched();
                        this.ngSurname.control.updateValueAndValidity();
                        this.InformationofthedeceasedSurname.control.setErrors({ mismatch: true });
                        this.ngSurname.control.setErrors({ mismatch: true });
                        // this.foc_confirm_fullname.nativeElement.focus();
                        tostervalue = "Deceased Last Name and Confim Last Name Missmach";
                        isInvalid = true;
                        break;

                    }
                }

                if (this.aadhaarshow) {
                    if (this.sel_aadhar) {
                        this.sel_aadhar.control.markAsTouched();
                        this.sel_aadhar.control.updateValueAndValidity();
                        // this.foc_sel_gender.nativeElement.focus();
                        if (this.sel_aadhar.invalid) {
                            isInvalid = true;
                            tostervalue = "Please Select Deceased Aadhaar Number";
                            break;
                        }

                    }
                    if (this.aadhaar) {
                        this.aadhaar.control.markAsTouched();
                        this.aadhaar.control.updateValueAndValidity();
                        // this.foc_sel_gender.nativeElement.focus();
                        if (this.aadhaar.invalid) {
                            isInvalid = true;
                            tostervalue = "Please Enter Deceased Aadhaar Number";
                            break;
                        }

                    }
                }

                if (this.mother_full_nameshow) {
                    if (this.Mother_full_name) {
                        this.Mother_full_name.control.markAsTouched();
                        this.Mother_full_name.control.updateValueAndValidity();
                        // this.foc_sel_gender.nativeElement.focus();
                        if (this.Mother_full_name.invalid) {
                            isInvalid = true;
                            tostervalue = "Please Enter Mother's First Name";
                            break;
                        }

                    }
                    if (this.Mother_surname_name) {
                        this.Mother_surname_name.control.markAsTouched();
                        this.Mother_surname_name.control.updateValueAndValidity();
                        // this.foc_sel_gender.nativeElement.focus();
                        if (this.Mother_surname_name.invalid) {
                            isInvalid = true;
                            tostervalue = "Please Enter Mother's Last Name";
                            break;
                        }

                    }

                }
                if (this.mother_aadhhar_numbershow) {
                    if (this.Mother_aadhaar_no) {
                        this.Mother_aadhaar_no.control.markAsTouched();
                        this.Mother_aadhaar_no.control.updateValueAndValidity();
                        // this.foc_sel_gender.nativeElement.focus();
                        if (this.Mother_aadhaar_no.invalid) {
                            isInvalid = true;
                            tostervalue = "Please Enter Mother's Aadhaar Number";
                            break;
                        }

                    }

                }
                //
                if (this.father_full_namershow) {
                    if (this.Father__full_namer) {
                        this.Father__full_namer.control.markAsTouched();
                        this.Father__full_namer.control.updateValueAndValidity();
                        // this.foc_sel_gender.nativeElement.focus();
                        if (this.Father__full_namer.invalid) {
                            isInvalid = true;
                            tostervalue = "Please Enter Father's First Name";
                            break;
                        }

                    }
                    if (this.Father_surname) {
                        this.Father_surname.control.markAsTouched();
                        this.Father_surname.control.updateValueAndValidity();
                        // this.foc_sel_gender.nativeElement.focus();
                        if (this.Father_surname.invalid) {
                            isInvalid = true;
                            tostervalue = "Please Enter Father's Last Name";
                            break;
                        }

                    }

                }
                if (this.father_aadhhar_numbershow) {
                    if (this.Father_aadhhar_number) {
                        this.Father_aadhhar_number.control.markAsTouched();
                        this.Father_aadhhar_number.control.updateValueAndValidity();
                        // this.foc_sel_gender.nativeElement.focus();
                        if (this.Father_aadhhar_number.invalid) {
                            isInvalid = true;
                            tostervalue = "Please Enter Father's Aadhaar Number";
                            break;
                        }

                    }

                }

                //

                if (this.Spouse_FullName_valshow) {
                    if (this.ngSpouse_FullName) {
                        this.ngSpouse_FullName.control.markAsTouched();
                        this.ngSpouse_FullName.control.updateValueAndValidity();
                        // this.foc_sel_gender.nativeElement.focus();
                        if (this.ngSpouse_FullName.invalid) {
                            isInvalid = true;
                            tostervalue = "Please Enter Spouse's First Name";
                            break;
                        }

                    }
                    if (this.ngSpouse_Surname) {
                        this.ngSpouse_Surname.control.markAsTouched();
                        this.ngSpouse_Surname.control.updateValueAndValidity();
                        // this.foc_sel_gender.nativeElement.focus();
                        if (this.ngSpouse_Surname.invalid) {
                            isInvalid = true;
                            tostervalue = "Please Enter Spouse's Last Name";
                            break;
                        }

                    }

                }
                if (this.Spouse_AadharNumber_maskshow) {
                    if (this.ngSpouse_AadharNumber) {
                        this.ngSpouse_AadharNumber.control.markAsTouched();
                        this.ngSpouse_AadharNumber.control.updateValueAndValidity();
                        // this.foc_sel_gender.nativeElement.focus();
                        if (this.ngSpouse_AadharNumber.invalid) {
                            isInvalid = true;
                            tostervalue = "Please Enter Spouse's Aadhaar Number";
                            break;
                        }

                    }

                }

                if (this.addressof_parentsshow) {
                    if (this.new_draft_details_array.Addressofthedeceased.new_addressof === "") {
                        isInvalid = true;
                        tostervalue = "Please select Address of the deceased at the time of death In India or Outside India radio button";
                        break;
                    }
                    if (this.new_draft_details_array.Addressofthedeceased.new_addressof === "inside") {
                        if (this.ngState) {
                            this.ngState.control.markAsTouched();
                            this.ngState.control.updateValueAndValidity();
                            // this.foc_sel_gender.nativeElement.focus();
                            if (this.ngState.invalid) {
                                isInvalid = true;
                                tostervalue = "Please select a State in India";
                                break;
                            }

                        }
                        if (this.ngDistrict) {
                            this.ngDistrict.control.markAsTouched();
                            this.ngDistrict.control.updateValueAndValidity();
                            // this.foc_sel_gender.nativeElement.focus();
                            if (this.ngDistrict.invalid) {
                                isInvalid = true;
                                tostervalue = "Please select a District in India";
                                break;
                            }

                        }
                        if (this.ngUrbanRural) {
                            this.ngUrbanRural.control.markAsTouched();
                            this.ngUrbanRural.control.updateValueAndValidity();
                            // this.foc_sel_gender.nativeElement.focus();
                            if (this.ngUrbanRural.invalid) {
                                isInvalid = true;
                                tostervalue = "Please select a Urban Rural in India";
                                break;
                            }

                        }
                        if (this.ngMandalMuncipality) {
                            this.ngMandalMuncipality.control.markAsTouched();
                            this.ngMandalMuncipality.control.updateValueAndValidity();
                            // this.foc_sel_gender.nativeElement.focus();
                            if (this.ngMandalMuncipality.invalid) {
                                isInvalid = true;
                                tostervalue = "Please select a Mandal Muncipality in India";
                                break;
                            }

                        }
                        if (this.ngVillageWard) {
                            this.ngVillageWard.control.markAsTouched();
                            this.ngVillageWard.control.updateValueAndValidity();
                            // this.foc_sel_gender.nativeElement.focus();
                            if (this.ngVillageWard.invalid) {
                                isInvalid = true;
                                tostervalue = "Please select a Village Ward in India";
                                break;
                            }

                        }

                        if (this.ngBuildingNo) {
                            this.ngBuildingNo.control.markAsTouched();
                            this.ngBuildingNo.control.updateValueAndValidity();
                            // this.foc_sel_gender.nativeElement.focus();
                            if (this.ngBuildingNo.invalid) {
                                isInvalid = true;
                                tostervalue = "Please select a Building No in India";
                                break;
                            }

                        }

                        if (this.ngHouseNo) {
                            this.ngHouseNo.control.markAsTouched();
                            this.ngHouseNo.control.updateValueAndValidity();
                            // this.foc_sel_gender.nativeElement.focus();
                            if (this.ngHouseNo.invalid) {
                                isInvalid = true;
                                tostervalue = "Please select a House No in India";
                                break;
                            }

                        }
                        if (this.ngStreetName) {
                            this.ngStreetName.control.markAsTouched();
                            this.ngStreetName.control.updateValueAndValidity();
                            // this.foc_sel_gender.nativeElement.focus();
                            if (this.ngStreetName.invalid) {
                                isInvalid = true;
                                tostervalue = "Please select a Street Name in India";
                                break;
                            }

                        }
                        if (this.ngLocality) {
                            this.ngLocality.control.markAsTouched();
                            this.ngLocality.control.updateValueAndValidity();
                            // this.foc_sel_gender.nativeElement.focus();
                            if (this.ngLocality.invalid) {
                                isInvalid = true;
                                tostervalue = "Please select a Locality in India";
                                break;
                            }

                        }
                        if (this.ngPINCode) {
                            this.ngPINCode.control.markAsTouched();
                            this.ngPINCode.control.updateValueAndValidity();
                            // this.foc_sel_gender.nativeElement.focus();
                            if (this.ngPINCode.invalid) {
                                isInvalid = true;
                                tostervalue = "Please select a Pin Code in India";
                                break;
                            }

                        }
                        if (this.ngPostOffice) {
                            this.ngPostOffice.control.markAsTouched();
                            this.ngPostOffice.control.updateValueAndValidity();
                            // this.foc_sel_gender.nativeElement.focus();
                            if (this.ngPostOffice.invalid) {
                                isInvalid = true;
                                tostervalue = "Please select a Post Office in India";
                                break;
                            }

                        }

                    }
                    else {
                        if (this.ngCountry) {
                            this.ngCountry.control.markAsTouched();
                            this.ngCountry.control.updateValueAndValidity();
                            // this.foc_sel_gender.nativeElement.focus();
                            if (this.ngCountry.invalid) {
                                isInvalid = true;
                                tostervalue = "Please select a Country outside India";

                                break;
                            }

                        }
                        if (this.ngaddress) {
                            this.ngaddress.control.markAsTouched();
                            this.ngaddress.control.updateValueAndValidity();
                            // this.foc_sel_gender.nativeElement.focus();
                            if (this.ngaddress.invalid) {
                                isInvalid = true;
                                tostervalue = "Please Enter a Country outside India";
                                break;
                            }

                        }


                    }
                }
                if (this.address_permenentshow) {

                    if (this.new_draft_details_array.Permanentaddress.new_permantaddressof === "") {
                        isInvalid = true;
                        tostervalue = "Please select Permanent address of the deceased  Yes or No radio button";
                        break;
                    }

                    if (this.new_draft_details_array.Permanentaddress.new_permantaddressof === "No" && this.new_draft_details_array.Permanentaddress.new_addressof === "inside") {
                        if (this.ngPerm_State) {
                            this.ngPerm_State.control.markAsTouched();
                            this.ngPerm_State.control.updateValueAndValidity();
                            // this.foc_sel_gender.nativeElement.focus();
                            if (this.ngPerm_State.invalid) {
                                isInvalid = true;
                                tostervalue = "Please select a State in India";
                                break;
                            }

                        }
                        if (this.ngPerm_District) {
                            this.ngPerm_District.control.markAsTouched();
                            this.ngPerm_District.control.updateValueAndValidity();
                            // this.foc_sel_gender.nativeElement.focus();
                            if (this.ngPerm_District.invalid) {
                                isInvalid = true;
                                tostervalue = "Please select a District in India";
                                break;
                            }

                        }
                        if (this.ngPerm_UrbanRural) {
                            this.ngPerm_UrbanRural.control.markAsTouched();
                            this.ngPerm_UrbanRural.control.updateValueAndValidity();
                            // this.foc_sel_gender.nativeElement.focus();
                            if (this.ngPerm_UrbanRural.invalid) {
                                isInvalid = true;
                                tostervalue = "Please select a Urban Rural in India";
                                break;
                            }

                        }
                        if (this.ngPerm_MandalMuncipality) {
                            this.ngPerm_MandalMuncipality.control.markAsTouched();
                            this.ngPerm_MandalMuncipality.control.updateValueAndValidity();
                            // this.foc_sel_gender.nativeElement.focus();
                            if (this.ngPerm_MandalMuncipality.invalid) {
                                isInvalid = true;
                                tostervalue = "Please select a Mandal Muncipality in India";
                                break;
                            }

                        }
                        if (this.ngPerm_VillageWard) {
                            this.ngPerm_VillageWard.control.markAsTouched();
                            this.ngPerm_VillageWard.control.updateValueAndValidity();
                            // this.foc_sel_gender.nativeElement.focus();
                            if (this.ngPerm_VillageWard.invalid) {
                                isInvalid = true;
                                tostervalue = "Please select a Village Ward in India";
                                break;
                            }

                        }

                        if (this.ngPerm_BuildingNo) {
                            this.ngPerm_BuildingNo.control.markAsTouched();
                            this.ngPerm_BuildingNo.control.updateValueAndValidity();
                            // this.foc_sel_gender.nativeElement.focus();
                            if (this.ngPerm_BuildingNo.invalid) {
                                isInvalid = true;
                                tostervalue = "Please select a Building No in India";
                                break;
                            }

                        }

                        if (this.ngPerm_HouseNo) {
                            this.ngPerm_HouseNo.control.markAsTouched();
                            this.ngPerm_HouseNo.control.updateValueAndValidity();
                            // this.foc_sel_gender.nativeElement.focus();
                            if (this.ngPerm_HouseNo.invalid) {
                                isInvalid = true;
                                tostervalue = "Please select a House No in India";
                                break;
                            }

                        }
                        if (this.ngPerm_StreetName) {
                            this.ngPerm_StreetName.control.markAsTouched();
                            this.ngPerm_StreetName.control.updateValueAndValidity();
                            // this.foc_sel_gender.nativeElement.focus();
                            if (this.ngPerm_StreetName.invalid) {
                                isInvalid = true;
                                tostervalue = "Please select a Street Name in India";
                                break;
                            }

                        }
                        if (this.ngPerm_Locality) {
                            this.ngPerm_Locality.control.markAsTouched();
                            this.ngPerm_Locality.control.updateValueAndValidity();
                            // this.foc_sel_gender.nativeElement.focus();
                            if (this.ngPerm_Locality.invalid) {
                                isInvalid = true;
                                tostervalue = "Please select a Locality in India";
                                break;
                            }

                        }
                        if (this.ngPerm_PINCode) {
                            this.ngPerm_PINCode.control.markAsTouched();
                            this.ngPerm_PINCode.control.updateValueAndValidity();
                            // this.foc_sel_gender.nativeElement.focus();
                            if (this.ngPerm_PINCode.invalid) {
                                isInvalid = true;
                                tostervalue = "Please select a Pin Code in India";
                                break;
                            }

                        }
                        if (this.ngPerm_PostOffice) {
                            this.ngPerm_PostOffice.control.markAsTouched();
                            this.ngPerm_PostOffice.control.updateValueAndValidity();
                            // this.foc_sel_gender.nativeElement.focus();
                            if (this.ngPerm_PostOffice.invalid) {
                                isInvalid = true;
                                tostervalue = "Please select a Post Office in India";
                                break;
                            }

                        }

                    }
                    else {
                        if (this.ngPermanentCountry) {
                            this.ngPermanentCountry.control.markAsTouched();
                            this.ngPermanentCountry.control.updateValueAndValidity();
                            // this.foc_sel_gender.nativeElement.focus();
                            if (this.ngPermanentCountry.invalid) {
                                isInvalid = true;
                                tostervalue = "Please select a Country outside India";

                                break;
                            }

                        }
                        if (this.ngPermanentaddressaddress) {
                            this.ngPermanentaddressaddress.control.markAsTouched();
                            this.ngPermanentaddressaddress.control.updateValueAndValidity();
                            // this.foc_sel_gender.nativeElement.focus();
                            if (this.ngPermanentaddressaddress.invalid) {
                                isInvalid = true;
                                tostervalue = "Please Enter a Country outside India";
                                break;
                            }

                        }


                    }
                }






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







    PathReportString: any;
    async downloadorder() {
        try {

            const req = new basemodel();
            req.type = '1022';
            req.param1 = this.applicationid
            req.param4 = 'death';
            let responce: any = await this.auth.pdf_download(req);
            if (responce.code) {
                this.PathReportString = 'data:application/pdf;base64,' + (this.sanitizer.bypassSecurityTrustResourceUrl(responce.url) as any).changingThisBreaksApplicationSecurity;
                document.getElementById('ifrm')?.setAttribute("src", this.PathReportString);
            } else {
                //this.alt.toasterror('No Orders found.');
                return;
            }
        } catch (error) {
            this.spinner.hide();
            this.alt.toasterror('something went wrong');
            return;
        }
    }
    async eSignwindow_open() {
        if (this.val.isEmpty(this.userremarks)) {
            this.alt.toasterror('Enter remarks here / వ్యాఖ్యలను ఇక్కడ నమోదు చేయండి');
            return;
        }
        else {
            this.ModalOpen();
        }

    }
    displaymodal = 'none';
    ModalCLose() {
        this.displaymodal = 'none';
    }
    ModalOpen() {
        this.displaymodal = 'block';
    }
    correction_master_array: any[] = [];
    async getcorrectiondrop(): Promise<void> {
        try {
            const req = new basemodel();
            req.type = '1025';
            this.spinner.show();
            this.correction_master_array = [];
            let responce: any = await this.auth.auth_utilities_service(req);

            this.spinner.hide();
            if (responce.code) {
                this.correction_master_array = responce.Details;
            } else {
                this.correction_master_array = [];
                this.spinner.hide();
            }
        } catch (error) {
            this.spinner.hide();

        }
    }
    gendershow = false; DateofBirthshow = false; ageshow = false; FullNameshow = false;
    aadhaarshow = false; mother_full_nameshow = false; mother_aadhhar_numbershow = false;
    father_full_namershow = false; father_aadhhar_numbershow = false; MaritalStatusshow = false;
    Spouse_FullName_valshow = false; Spouse_AadharNumber_maskshow = false;
    addressof_parentsshow = false; address_permenentshow = false; Typeofmedicalcheck = false;
    deathmedicallycheck = false; DiseaseorActualcheck = false; habituallysmokecheck = false;
    chewarecanutcheck = false; drinkalcoholcheck = false;
    motheremail = false; mothermobilenumber = false; fatheremail = false; fathermobilenumber = false; spouseemail = false; spousemobilenumber = false;

    async changeaadhaarmode() {
        this.draft_details_array.Confirmnameofthedeceased.AadhaarEIDNumber = '';
        this.draft_details_array.Confirmnameofthedeceased.AadhaarEIDNumber_mask =
            '';
    }
    async deceased_districtchange(): Promise<void> {
        this.draft_details_array.Addressofthedeceased.UrbanRural = '';
        this.draft_details_array.Addressofthedeceased.MandalMuncipality = '';
        this.draft_details_array.Addressofthedeceased.VillageWard = '';
        this.deceased_MandalMuncipality_array = [];
    }
    async correctiondropdownchange(obj: any) {
        debugger
        switch (obj.itemValue.DR_CORRECTION_CODE) {
            case 101:
                if (!obj.originalEvent.selected) {
                    this.gendershow = true;
                    this.draft_details_array.Informationofthedeceased.Gendercheck = '1';

                } else {
                    this.gendershow = false;
                    this.draft_details_array.Informationofthedeceased.Gendercheck = '0';
                }
                break;
            case 102:
                if (!obj.originalEvent.selected) {
                    this.ageshow = true;
                    this.draft_details_array.Informationofthedeceased.agecheck = '1';
                    this.draft_details_array.Informationofthedeceased.DateofBirthcheck = '1';
                } else {
                    this.ageshow = false;
                    this.draft_details_array.Informationofthedeceased.agecheck = '0';
                    this.draft_details_array.Informationofthedeceased.DateofBirthcheck = '0';
                }
                break;
            case 103:
                if (!obj.originalEvent.selected) {
                    this.FullNameshow = true;
                    this.draft_details_array.Informationofthedeceased.FullNamecheck = '1';
                } else {
                    this.FullNameshow = false;
                    this.draft_details_array.Informationofthedeceased.FullNamecheck = '0'
                }
                break;
            case 104:
                if (!obj.originalEvent.selected) {
                    this.aadhaarshow = true;
                    this.draft_details_array.Confirmnameofthedeceased.aadhaarcheck = '1';
                } else {
                    this.aadhaarshow = false;
                    this.draft_details_array.Confirmnameofthedeceased.aadhaarcheck = '0';
                }
                break;
            case 105:
                if (!obj.originalEvent.selected) {
                    this.mother_full_nameshow = true;
                    this.draft_details_array.motherInformation.mother_full_namecheck = '1';
                } else {
                    this.mother_full_nameshow = false;
                    this.draft_details_array.motherInformation.mother_full_namecheck = '0';
                }
                break;
            case 106:
                if (!obj.originalEvent.selected) {
                    this.mothermobilenumber = true;
                    this.draft_details_array.motherInformation.mother_mobile_numbercheck = '1';
                } else {
                    this.mothermobilenumber = false;
                    this.draft_details_array.motherInformation.mother_mobile_numbercheck = '0';
                }

                break;
            case 107:
                if (!obj.originalEvent.selected) {
                    this.motheremail = true;
                    this.draft_details_array.motherInformation.mother_emailcheck = '1';
                } else {
                    this.motheremail = false;
                    this.draft_details_array.motherInformation.mother_emailcheck = '0';
                }
                break;
            case 108:
                if (!obj.originalEvent.selected) {
                    this.mother_aadhhar_numbershow = true;
                    this.draft_details_array.motherInformation.mother_aadhhar_numbercheck = '1';
                } else {
                    this.mother_aadhhar_numbershow = false;
                    this.draft_details_array.motherInformation.mother_aadhhar_numbercheck = '0';
                }
                break;
            case 109:
                if (!obj.originalEvent.selected) {
                    this.father_full_namershow = true;
                    this.draft_details_array.fatherInformation.father_full_namercheck = '1';
                } else {
                    this.father_full_namershow = false;
                    this.draft_details_array.fatherInformation.father_full_namercheck = '0';
                }
                break;
            case 110:
                if (!obj.originalEvent.selected) {
                    this.fathermobilenumber = true;
                    this.draft_details_array.fatherInformation.father_mobile_numbercheck = '1';
                } else {
                    this.fathermobilenumber = false;
                    this.draft_details_array.fatherInformation.father_mobile_numbercheck = '0';
                }
                break;
            case 111:
                if (!obj.originalEvent.selected) {
                    this.fatheremail = true;
                    this.draft_details_array.fatherInformation.father_email_numbercheck = '1';
                } else {
                    this.fatheremail = false;
                    this.draft_details_array.fatherInformation.father_email_numbercheck = '0';
                }
                break;
            case 112:
                if (!obj.originalEvent.selected) {
                    this.father_aadhhar_numbershow = true;
                    this.draft_details_array.fatherInformation.father_aadhhar_numbercheck = '1';
                } else {
                    this.father_aadhhar_numbershow = false;
                    this.draft_details_array.fatherInformation.father_aadhhar_numbercheck = '0';
                }
                break;
            case 113:
                if (!obj.originalEvent.selected) {
                    this.Spouse_FullName_valshow = true;
                    this.draft_details_array.MaritalStatus.Spouse_FullName_valcheck = '1';
                } else {
                    this.Spouse_FullName_valshow = false;
                    this.draft_details_array.MaritalStatus.Spouse_FullName_valcheck = '0';
                }
                break;
            case 114:
                if (!obj.originalEvent.selected) {
                    this.spouseemail = true;
                    this.draft_details_array.MaritalStatus.Spouse_ContactDetails_EmailIdcheck = '1';
                } else {
                    this.spouseemail = false;
                    this.draft_details_array.MaritalStatus.Spouse_ContactDetails_EmailIdcheck = '0';
                }
                break;
            case 115:
                if (!obj.originalEvent.selected) {
                    this.spousemobilenumber = true;
                    this.draft_details_array.MaritalStatus.Spouse_ContactDetails_Mobilenocheck = '1';
                } else {
                    this.spousemobilenumber = false;
                    this.draft_details_array.MaritalStatus.Spouse_ContactDetails_Mobilenocheck = '0';
                }
                break;
            case 117:
                if (!obj.originalEvent.selected) {
                    this.Spouse_AadharNumber_maskshow = true;
                    this.draft_details_array.MaritalStatus.Spouse_AadharNumber_maskcheck = '1';
                } else {
                    this.Spouse_AadharNumber_maskshow = false;
                    this.draft_details_array.MaritalStatus.Spouse_AadharNumber_maskcheck = '0';
                }
                break;
            case 118:
                if (!obj.originalEvent.selected) {
                    this.addressof_parentsshow = true;
                    this.draft_details_array.Addressofthedeceased.addressof_parentscheck = '1';
                } else {
                    this.addressof_parentsshow = false;
                    this.draft_details_array.Addressofthedeceased.addressof_parentscheck = '0';
                }
                break;
            case 119:
                if (!obj.originalEvent.selected) {
                    this.address_permenentshow = true;
                    this.draft_details_array.Permanentaddress.address_permenentcheck = '1';
                } else {
                    this.address_permenentshow = false;
                    this.draft_details_array.Permanentaddress.address_permenentcheck = '0';
                }
                break;
            default:
                break;
        }
    }
    async validateaadhaar(aadhaar: any, inputsource: any) {
        const checknumaric = this.val.isNumber(aadhaar);
        if (aadhaar.length === 12 && checknumaric == true) {
            const isValidAadhaar = this.mid.validateVerhoeff(aadhaar);
            if (isValidAadhaar == false) {
                if (inputsource == 'deceasedaadhaar') {
                    this.new_draft_details_array.Confirmnameofthedeceased.new_AadhaarEIDNumber =
                        '';
                    this.new_draft_details_array.Confirmnameofthedeceased.new_AadhaarEIDNumber_mask =
                        '';
                }
                if (inputsource == 'fatheraadhaar') {
                    this.new_draft_details_array.fatherInformation.new_father_aadhhar_number = '';
                    this.new_draft_details_array.fatherInformation.new_father_aadhhar_number_mask =
                        '';
                }
                if (inputsource == 'Spouseaadhaar') {
                    this.new_draft_details_array.MaritalStatus.new_Spouse_AadharNumber = '';
                    this.new_draft_details_array.MaritalStatus.new_Spouse_AadharNumber_mask = '';
                }
                if (inputsource == 'motheraadhaar') {
                    this.new_draft_details_array.motherInformation.new_mother_aadhaar_number = '';
                    this.new_draft_details_array.motherInformation.new_mother_aadhaar_number_mask =
                        '';
                }
                this.alt.toasterror('Enter a 12-digit Valid Aadhaar Number.');
            }

            if (isValidAadhaar == true) {
                if (inputsource == 'deceasedaadhaar') {
                    this.new_draft_details_array.Confirmnameofthedeceased.new_AadhaarEIDNumber =
                        this.new_draft_details_array.Confirmnameofthedeceased.new_AadhaarEIDNumber_mask;
                    this.new_draft_details_array.Confirmnameofthedeceased.new_AadhaarEIDNumber_mask =
                        this.maskinput(
                            this.new_draft_details_array.Confirmnameofthedeceased
                                .new_AadhaarEIDNumber_mask
                        );
                }
                if (inputsource == 'fatheraadhaar') {
                    this.new_draft_details_array.fatherInformation.new_father_aadhhar_number =
                        this.new_draft_details_array.fatherInformation.new_father_aadhhar_number_mask;
                    this.new_draft_details_array.fatherInformation.new_father_aadhhar_number_mask =
                        this.maskinput(
                            this.new_draft_details_array.fatherInformation
                                .new_father_aadhhar_number_mask
                        );
                }
                if (inputsource == 'motheraadhaar') {
                    this.new_draft_details_array.motherInformation.new_mother_aadhaar_number =
                        this.new_draft_details_array.motherInformation.new_mother_aadhaar_number_mask;
                    this.new_draft_details_array.motherInformation.new_mother_aadhaar_number_mask =
                        this.maskinput(
                            this.new_draft_details_array.motherInformation
                                .new_mother_aadhaar_number_mask
                        );
                }
                if (inputsource == 'Spouseaadhaar') {
                    this.new_draft_details_array.MaritalStatus.new_Spouse_AadharNumber =
                        this.new_draft_details_array.MaritalStatus.new_Spouse_AadharNumber_mask;
                    this.new_draft_details_array.MaritalStatus.new_Spouse_AadharNumber_mask =
                        this.maskinput(
                            this.new_draft_details_array.MaritalStatus.new_Spouse_AadharNumber_mask
                        );
                }
            }
            //this.validateaadharchildparent(inputsource);
        } else if (aadhaar.length < 12) {
            if (inputsource == 'deceasedaadhaar') {
                this.new_draft_details_array.Confirmnameofthedeceased.new_AadhaarEIDNumber = '';
                this.new_draft_details_array.Confirmnameofthedeceased.new_AadhaarEIDNumber_mask =
                    '';
            }
            if (inputsource == 'fatheraadhaar') {
                this.new_draft_details_array.fatherInformation.new_father_aadhhar_number = '';
                this.new_draft_details_array.fatherInformation.new_father_aadhhar_number_mask =
                    '';
            }
            if (inputsource == 'motheraadhaar') {
                this.new_draft_details_array.motherInformation.new_mother_aadhaar_number = '';
                this.new_draft_details_array.motherInformation.new_mother_aadhaar_number_mask =
                    '';
            }
            if (inputsource == 'Spouseaadhaar') {
                this.new_draft_details_array.MaritalStatus.new_Spouse_AadharNumber = '';
                this.new_draft_details_array.MaritalStatus.new_Spouse_AadharNumber_mask = '';
            }
            this.alt.toasterror('Enter a 12-digit Aadhaar Number.');
        } else {
            if (inputsource == 'deceasedaadhaar') {
                this.new_draft_details_array.Confirmnameofthedeceased.new_AadhaarEIDNumber = '';
                this.new_draft_details_array.Confirmnameofthedeceased.new_AadhaarEIDNumber_mask =
                    '';
            }
            if (inputsource == 'fatheraadhaar') {
                this.new_draft_details_array.fatherInformation.new_father_aadhhar_number = '';
                this.new_draft_details_array.fatherInformation.new_father_aadhhar_number_mask =
                    '';
            }
            if (inputsource == 'motheraadhaar') {
                this.new_draft_details_array.motherInformation.new_mother_aadhaar_number = '';
                this.new_draft_details_array.motherInformation.new_mother_aadhaar_number_mask =
                    '';
            }
            if (inputsource == 'Spouseaadhaar') {
                this.new_draft_details_array.MaritalStatus.new_Spouse_AadharNumber = '';
                this.new_draft_details_array.MaritalStatus.new_Spouse_AadharNumber_mask = '';
            }
            this.alt.toasterror('Enter a 12-digit Aadhaar Number.');
        }
        return;
    }
    maskinput(objinput: string) {
        const maskedAadhaar = objinput.replace(/\d(?=\d{4})/g, '*');
        return maskedAadhaar !== '' ? maskedAadhaar : '';
    }
    SameasAddressofthedeceased(event: any) {

        this.new_draft_details_array.Permanentaddress.new_permantaddressof = '';
        const selectedValue = event.target.value;
        this.new_draft_details_array.Permanentaddress.new_permantaddressof = selectedValue;
        if (selectedValue == 'No') {

            this.new_draft_details_array.Permanentaddress = {
                new_permantaddressof: selectedValue,
                new_addressof: 'inside',
                new_sameasaddress: selectedValue,
                new_Country: '',
                new_Country_val: '',
                new_address: '',
                new_address_t: '',
                new_address_val: '',
                new_State: '',
                new_State_val: '',
                new_District: '',
                new_District_val: '',
                new_UrbanRural: '',
                new_UrbanRural_val: '',
                new_MandalMuncipality: '',
                new_MandalMuncipality_val: '',
                new_VillageWard: '',
                new_VillageWard_val: '',
                new_BuildingNo: '',
                new_BuildingNo_tel: '',
                new_BuildingNo_val: '',
                new_HouseNo: '',
                new_HouseNo_tel: '',
                new_HouseNo_val: '',
                new_StreetName: '',
                new_StreetName_tel: '',
                new_StreetName_val: '',
                new_Locality: '',
                new_Locality_tel: '',
                new_Locality_val: '',
                new_PINCode: '',
                new_PostOffice: '',
                new_Permanentaddress_value: '',
            };
        }
        if (selectedValue == 'Yes') {
            if (this.draft_details_array.Addressofthedeceased.addressof_parentscheck == '1') {
                this.new_draft_details_array.Permanentaddress = {
                    new_permantaddressof: selectedValue,
                    new_addressof: this.new_draft_details_array.Addressofthedeceased.new_addressof,
                    new_sameasaddress: selectedValue,
                    new_Country: this.new_draft_details_array.Addressofthedeceased.new_Country,
                    new_Country_val: '',
                    new_address: this.new_draft_details_array.Addressofthedeceased.new_address,
                    new_address_t: this.new_draft_details_array.Addressofthedeceased.new_address_t,
                    new_State: this.new_draft_details_array.Addressofthedeceased.new_State,
                    new_District: this.new_draft_details_array.Addressofthedeceased.new_District,
                    new_UrbanRural: this.new_draft_details_array.Addressofthedeceased.new_UrbanRural,
                    new_MandalMuncipality:
                        this.new_draft_details_array.Addressofthedeceased.new_MandalMuncipality,
                    new_VillageWard: this.new_draft_details_array.Addressofthedeceased.new_VillageWard,
                    new_BuildingNo: this.new_draft_details_array.Addressofthedeceased.new_BuildingNo,
                    new_BuildingNo_tel:
                        this.new_draft_details_array.Addressofthedeceased.new_BuildingNo_tel,
                    new_HouseNo: this.new_draft_details_array.Addressofthedeceased.new_HouseNo,
                    new_HouseNo_tel: this.new_draft_details_array.Addressofthedeceased.new_HouseNo_tel,
                    new_StreetName: this.new_draft_details_array.Addressofthedeceased.new_StreetName,
                    new_StreetName_tel:
                        this.new_draft_details_array.Addressofthedeceased.new_StreetName_tel,
                    new_Locality: this.new_draft_details_array.Addressofthedeceased.new_Locality,
                    new_Locality_tel:
                        this.new_draft_details_array.Addressofthedeceased.new_Locality_tel,
                    new_PINCode: this.new_draft_details_array.Addressofthedeceased.new_PINCode,
                    new_PostOffice: this.new_draft_details_array.Addressofthedeceased.new_PostOffice,
                    new_address_val: '',
                    new_State_val: '',
                    new_District_val: '',
                    new_UrbanRural_val: '',
                    new_MandalMuncipality_val: '',
                    new_VillageWard_val: '',
                    new_BuildingNo_val: '',
                    new_HouseNo_val: '',
                    new_StreetName_val: '',
                    new_Locality_val: '',
                    new_Permanentaddress_value: '',

                };
            }
            else {
                this.alt.toasterror("Please Enter Address of parents at the time of birth of the child First To Select This Option");
                this.new_draft_details_array.Permanentaddress.new_permantaddressof =
                    '';
                let el = document.getElementById('No') as HTMLInputElement;
                el.checked = false;
                let elyes = document.getElementById('Yes') as HTMLInputElement;
                elyes.checked = false;
            }
        }
    }

    sameasaddress_outofindia(event: any) {
        const selectedValue = event.target.value;
        this.new_draft_details_array.Permanentaddress = {
            new_permantaddressof: this.draft_details_array.Permanentaddress.sameasaddress,
            new_addressof: selectedValue,
            new_sameasaddress: this.draft_details_array.Permanentaddress.sameasaddress,
            new_Country: '',
            new_Country_val: '',
            new_address: '',
            new_address_t: '',
            new_address_val: '',
            new_State: '',
            new_State_val: '',
            new_District: '',
            new_District_val: '',
            new_UrbanRural: '',
            new_UrbanRural_val: '',
            new_MandalMuncipality: '',
            new_MandalMuncipality_val: '',
            new_VillageWard: '',
            new_VillageWard_val: '',
            new_BuildingNo: '',
            new_BuildingNo_tel: '',
            new_BuildingNo_val: '',
            new_HouseNo: '',
            new_HouseNo_tel: '',
            new_HouseNo_val: '',
            new_StreetName: '',
            new_StreetName_tel: '',
            new_StreetName_val: '',
            new_Locality: '',
            new_Locality_tel: '',
            new_Locality_val: '',
            new_PINCode: '',
            new_PostOffice: '',
            new_Permanentaddress_value: '',
        };
    }
    //Common Functions
    suggestions: any;
    async Teluglanguageconvrt(inputkeyval: any, inputsource: any) {
        this.pscall.Cdac_transliterateText(inputkeyval).subscribe(
            (response: any) => {
                this.suggestions = response[1][0][1];
                //------- Confirmnameofthedeceased -------//
                if (inputsource == 'InformationofthedeceasedFullName') {
                    this.new_draft_details_array.Informationofthedeceased.new_FullName_tel =
                        this.suggestions[0];
                }
                if (inputsource == 'InformationofthedeceasedFullName_t') {
                    this.new_draft_details_array.Informationofthedeceased.new_FullName_tel =
                        this.suggestions[0];
                }

                if (inputsource == 'middlename') {
                    this.new_draft_details_array.Informationofthedeceased.new_middlename_tel =
                        this.suggestions[0];
                }
                if (inputsource == 'middlename_tel') {
                    this.new_draft_details_array.Informationofthedeceased.new_middlename_tel =
                        this.suggestions[0];
                }

                if (inputsource == 'confirmiddlename') {
                    this.new_draft_details_array.Confirmnameofthedeceased.new_middlename_tel =
                        this.suggestions[0];
                }
                if (inputsource == 'confirmiddlename_tel') {
                    this.new_draft_details_array.Confirmnameofthedeceased.new_middlename_tel =
                        this.suggestions[0];
                }

                if (inputsource == 'InformationofthedeceasedSurname') {
                    this.new_draft_details_array.Informationofthedeceased.new_Surname_tel =
                        this.suggestions[0];
                }
                if (inputsource == 'InformationofthedeceasedSurname_t') {
                    this.new_draft_details_array.Informationofthedeceased.new_Surname_tel =
                        this.suggestions[0];
                }

                if (inputsource == 'ConfirmnameofthedeceasedFullName') {
                    this.new_draft_details_array.Confirmnameofthedeceased.new_FullName_tel =
                        this.suggestions[0];
                }
                if (inputsource == 'Confirmnameofthedeceasedfullname_t') {
                    this.new_draft_details_array.Confirmnameofthedeceased.new_FullName_tel =
                        this.suggestions[0];
                }
                if (inputsource == 'ConfirmnameofthedeceasedSurname') {
                    this.new_draft_details_array.Confirmnameofthedeceased.new_Surname_tel =
                        this.suggestions[0];
                }
                if (inputsource == 'ConfirmnameofthedeceasedSurname_tel') {
                    this.new_draft_details_array.Confirmnameofthedeceased.new_Surname_tel =
                        this.suggestions[0];
                }
                //------- fatherInformation -------//
                if (inputsource == 'fatherInformationfather_full_namer') {
                    this.new_draft_details_array.fatherInformation.new_father_full_namer_t =
                        this.suggestions[0];
                }
                if (inputsource == 'fatherInformationfather_full_namer_t') {
                    this.new_draft_details_array.fatherInformation.new_father_full_namer_t =
                        this.suggestions[0];
                }

                if (inputsource == 'fathermiddlename') {
                    this.new_draft_details_array.fatherInformation.new_father_middlename_t =
                        this.suggestions[0];
                }
                if (inputsource == 'fathermiddlename_tel') {
                    this.new_draft_details_array.fatherInformation.new_father_middlename_t =
                        this.suggestions[0];
                }
                if (inputsource == 'fatherInformationfather_surname') {
                    this.new_draft_details_array.fatherInformation.new_father_surname_t =
                        this.suggestions[0];
                }
                if (inputsource == 'fatherInformationfather_surname_t') {
                    this.new_draft_details_array.fatherInformation.new_father_surname_t =
                        this.suggestions[0];
                }
                //------- motherInformation -------//
                if (inputsource == 'motherInformationmother_full_name') {
                    this.new_draft_details_array.motherInformation.new_mother_full_name_t =
                        this.suggestions[0];
                }
                if (inputsource == 'motherInformationmother_full_name_t') {
                    this.new_draft_details_array.motherInformation.new_mother_full_name_t =
                        this.suggestions[0];
                }
                if (inputsource == 'mothermiddlename') {
                    this.new_draft_details_array.motherInformation.new_mother_middlename_t =
                        this.suggestions[0];
                }
                if (inputsource == 'mother_middlename_t') {
                    this.new_draft_details_array.motherInformation.new_mother_middlename_t =
                        this.suggestions[0];
                }
                if (inputsource == 'motherInformationmother_surname_name') {
                    this.new_draft_details_array.motherInformation.new_mother_surname_name_t =
                        this.suggestions[0];
                }
                if (inputsource == 'motherInformationmother_surname_name_t') {
                    this.new_draft_details_array.motherInformation.new_mother_surname_name_t =
                        this.suggestions[0];
                }
                //------- MaritalStatus -------//
                if (inputsource == 'MaritalStatusSpouse_FullName') {
                    this.new_draft_details_array.MaritalStatus.new_Spouse_FullName_tel =
                        this.suggestions[0];
                }
                if (inputsource == 'MaritalStatusSpouse_FullName_tel') {
                    this.new_draft_details_array.MaritalStatus.new_Spouse_FullName_tel =
                        this.suggestions[0];
                }
                if (inputsource == 'spousemiddlename') {
                    this.new_draft_details_array.MaritalStatus.new_Spouse_middlename_tel =
                        this.suggestions[0];
                }
                if (inputsource == 'spousemiddlename_tel') {
                    this.new_draft_details_array.MaritalStatus.new_Spouse_middlename_tel =
                        this.suggestions[0];
                }
                if (inputsource == 'MaritalStatusSpouse_Surname') {
                    this.new_draft_details_array.MaritalStatus.new_Spouse_Surname_tel =
                        this.suggestions[0];
                }
                if (inputsource == 'MaritalStatusSpouse_Surname_tel') {
                    this.new_draft_details_array.MaritalStatus.new_Spouse_Surname_tel =
                        this.suggestions[0];
                }

                //------- Addressofthedeceased -------//
                if (inputsource == 'AddressofthedeceasedBuildingNo') {
                    this.new_draft_details_array.Addressofthedeceased.new_BuildingNo_tel =
                        this.suggestions[0];
                }
                if (inputsource == 'AddressofthedeceasedBuildingNo_tel') {
                    this.new_draft_details_array.Addressofthedeceased.new_BuildingNo_tel =
                        this.suggestions[0];
                }
                if (inputsource == 'AddressofthedeceasedHouseNo') {
                    this.new_draft_details_array.Addressofthedeceased.new_HouseNo_tel =
                        this.suggestions[0];
                }
                if (inputsource == 'AddressofthedeceasedHouseNo_tel') {
                    this.new_draft_details_array.Addressofthedeceased.new_HouseNo_tel =
                        this.suggestions[0];
                }
                if (inputsource == 'AddressofthedeceasedStreetName') {
                    this.new_draft_details_array.Addressofthedeceased.new_StreetName_tel =
                        this.suggestions[0];
                }
                if (inputsource == 'AddressofthedeceasedStreetName_tel') {
                    this.new_draft_details_array.Addressofthedeceased.new_StreetName_tel =
                        this.suggestions[0];
                }
                if (inputsource == 'AddressofthedeceasedLocality') {
                    this.new_draft_details_array.Addressofthedeceased.new_Locality_tel =
                        this.suggestions[0];
                }
                if (inputsource == 'AddressofthedeceasedLocality_tel') {
                    this.new_draft_details_array.Addressofthedeceased.new_Locality_tel =
                        this.suggestions[0];
                }
                if (inputsource == 'Addressofthedeceasedaddress') {
                    this.new_draft_details_array.Addressofthedeceased.new_address_t =
                        this.suggestions[0];
                }
                if (inputsource == 'Addressofthedeceasedaddress_t') {
                    this.new_draft_details_array.Addressofthedeceased.new_address_t =
                        this.suggestions[0];
                }
                //------- Permanentaddress -------//
                if (inputsource == 'PermanentaddressBuildingNo') {
                    this.new_draft_details_array.Permanentaddress.new_BuildingNo_tel =
                        this.suggestions[0];
                }
                if (inputsource == 'PermanentaddressBuildingNo_tel') {
                    this.new_draft_details_array.Permanentaddress.new_BuildingNo_tel =
                        this.suggestions[0];
                }
                if (inputsource == 'PermanentaddressHouseNo') {
                    this.new_draft_details_array.Permanentaddress.new_HouseNo_tel =
                        this.suggestions[0];
                }
                if (inputsource == 'PermanentaddressHouseNo_tel') {
                    this.new_draft_details_array.Permanentaddress.new_HouseNo_tel =
                        this.suggestions[0];
                }
                if (inputsource == 'PermanentaddressStreetName') {
                    this.new_draft_details_array.Permanentaddress.new_StreetName_tel =
                        this.suggestions[0];
                }
                if (inputsource == 'PermanentaddressStreetName_tel') {
                    this.new_draft_details_array.Permanentaddress.new_StreetName_tel =
                        this.suggestions[0];
                }
                if (inputsource == 'PermanentaddressLocality') {
                    this.new_draft_details_array.Permanentaddress.new_Locality_tel =
                        this.suggestions[0];
                }
                if (inputsource == 'PermanentaddressLocality_tel') {
                    this.new_draft_details_array.Permanentaddress.new_Locality_tel =
                        this.suggestions[0];
                }
                if (inputsource == 'Permanentaddressaddress') {
                    this.new_draft_details_array.Permanentaddress.new_address_t =
                        this.suggestions[0];
                }
                if (inputsource == 'Permanentaddressaddress_t') {
                    this.new_draft_details_array.Permanentaddress.new_address_t =
                        this.suggestions[0];
                }

            },
            (error) => {
                console.error('Error transliterating text:', error);
                return '';
            }
        );
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
            this.new_draft_details_array.Addressofthedeceased.new_District == ''
        ) {
            this.spinner.hide();
            this.deceased_MandalMuncipality_array = [];
            this.new_draft_details_array.Addressofthedeceased.new_UrbanRural = '';
            this.alt.warning('select district');
            return;
        } else if (
            obj == 'Permanent' &&
            this.new_draft_details_array.Permanentaddress.new_District == ''
        ) {
            this.spinner.hide();
            this.Permanent_MandalMuncipality_array = [];
            this.new_draft_details_array.Permanentaddress.new_UrbanRural = '';
            this.alt.warning('select district');
            return;
        } else {
            try {
                if (obj == 'deceased') {
                    this.new_draft_details_array.Addressofthedeceased.new_MandalMuncipality = '';
                    this.new_draft_details_array.Addressofthedeceased.new_VillageWard = '';
                    this.deceased_MandalMuncipality_array = [];
                    this.statcode = this.new_draft_details_array.Addressofthedeceased.new_State;
                    this.district =
                        this.new_draft_details_array.Addressofthedeceased.new_District;
                    this.ruralurban =
                        this.new_draft_details_array.Addressofthedeceased.new_UrbanRural;
                }
                if (obj == 'Permanent') {
                    this.new_draft_details_array.Permanentaddress.new_MandalMuncipality = '';
                    this.new_draft_details_array.Permanentaddress.new_VillageWard = '';
                    this.Permanent_MandalMuncipality_array = [];
                    this.statcode = this.new_draft_details_array.Permanentaddress.new_State;
                    this.district = this.new_draft_details_array.Permanentaddress.new_District;
                    this.ruralurban =
                        this.new_draft_details_array.Permanentaddress.new_UrbanRural;
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
            this.new_draft_details_array.Addressofthedeceased.new_MandalMuncipality == ''
        ) {
            this.spinner.hide();
            this.deceasedvillage_ward_array = [];
            this.new_draft_details_array.Addressofthedeceased.new_VillageWard = '';
            this.alt.warning('select Mandal/Muncipality');
            return;
        } else if (
            obj == 'Permanent' &&
            this.new_draft_details_array.Permanentaddress.new_MandalMuncipality == ''
        ) {
            this.spinner.hide();
            this.Permanentvillage_ward_array = [];
            this.new_draft_details_array.Permanentaddress.new_VillageWard = '';
            this.alt.warning('select Mandal/Muncipality');
            return;
        } else {
            try {
                if (obj == 'deceased') {
                    this.new_draft_details_array.Addressofthedeceased.new_VillageWard = '';
                    this.deceasedvillage_ward_array = [];
                    this.statcode = this.new_draft_details_array.Addressofthedeceased.new_State;
                    this.district =
                        this.new_draft_details_array.Addressofthedeceased.new_District;
                    this.ruralurban =
                        this.new_draft_details_array.Addressofthedeceased.new_UrbanRural;
                    this.mandalmuncipality =
                        this.new_draft_details_array.Addressofthedeceased.new_MandalMuncipality;
                }
                if (obj == 'Permanent') {
                    this.new_draft_details_array.Permanentaddress.new_VillageWard = '';
                    this.Permanentvillage_ward_array = [];
                    this.statcode = this.new_draft_details_array.Permanentaddress.new_State;
                    this.district = this.new_draft_details_array.Permanentaddress.new_District;
                    this.ruralurban =
                        this.new_draft_details_array.Permanentaddress.new_UrbanRural;
                    this.mandalmuncipality =
                        this.new_draft_details_array.Permanentaddress.new_MandalMuncipality;
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
    async Postalareas(obj: any): Promise<void> {
        if (
            obj == 'deceased' &&
            this.new_draft_details_array.Addressofthedeceased.new_PINCode == '' &&
            this.new_draft_details_array.Addressofthedeceased.new_PINCode.length < 6
        ) {
            this.spinner.hide();
            this.deceased_postal_array = [];
            this.new_draft_details_array.Addressofthedeceased.new_PostOffice = '';
            this.alt.warning('enter 6 digits postal code');
            return;
        } else if (
            obj == 'Permanent' &&
            this.new_draft_details_array.Permanentaddress.new_PINCode == '' &&
            this.new_draft_details_array.Permanentaddress.new_PINCode.length < 6
        ) {
            this.spinner.hide();
            this.Permanent_postal_array = [];
            this.new_draft_details_array.Addressofthedeceased.new_PostOffice = '';
            this.alt.warning('enter 6 digits postal code');
            return;
        } else {
            try {
                if (obj == 'deceased') {
                    this.new_draft_details_array.Addressofthedeceased.new_PostOffice = '';
                    this.deceased_postal_array = [];
                    this.pincode = this.new_draft_details_array.Addressofthedeceased.new_PINCode;
                }
                if (obj == 'Permanent') {
                    this.new_draft_details_array.Permanentaddress.new_PostOffice = '';
                    this.Permanent_postal_array = [];
                    this.pincode = this.new_draft_details_array.Permanentaddress.new_PINCode;
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
            this.new_draft_details_array.Addressofthedeceased.new_State == ''
        ) {
            this.spinner.hide();
            this.deceased_district_array = [];
            this.new_draft_details_array.Addressofthedeceased.new_State = '';
            this.alt.warning('select  Permanent Address of parents State');
            return;
        } else if (
            obj == 'Permanent' &&
            this.new_draft_details_array.Permanentaddress.new_State == ''
        ) {
            this.spinner.hide();
            this.Permanent_district_array = [];
            this.new_draft_details_array.Permanentaddress.new_State = '';
            this.alt.warning('select  Permanent Address of parents State');
            return;
        } else {
            if (obj == 'deceased') {
                this.PlaceofDeath_district_array = [];
                this.draft_details_array.PlaceofDeath.District = '';
                this.draft_details_array.PlaceofDeath.UrbanRural = '';
                this.statcode = this.new_draft_details_array.Addressofthedeceased.new_State;
            }
            if (obj == 'Permanent') {
                this.Permanent_district_array = [];
                this.new_draft_details_array.Permanentaddress.new_District = '';
                this.new_draft_details_array.Permanentaddress.new_UrbanRural = '';
                this.statcode = this.new_draft_details_array.Permanentaddress.new_State;
            }
            try {
                const req = new basemodel();
                req.type = '1002';
                req.param1 = this.statcode;
                this.spinner.show();
                let responce: any = await this.auth.auth_utilities_service(req);
                this.spinner.hide();
                debugger
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
    Hospital_master_array: any[] = [];
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
            } else {
                this.Hospital_master_array = [];
                this.spinner.hide();
            }
        } catch (error) {
            this.spinner.hide();
            this.alt.toasterror('something went wrong' + error);
        }
    }
    documentlist: any[] = [];
    async get_document_details(): Promise<void> {
        try {
            const req = new basemodel();
            req.type = '1012';
            req.param1 = this.brapplicationid;
            req.param2 = this.applicationregnumber;
            req.param3 = this.applicationid;
            this.spinner.show();
            this.documentlist = [];
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
                this.fileSelected = this.documentlist.length > 0;
                this.fileError = !this.fileSelected; // Hide error if file is selected
            } else {
                this.documentlist = [];
                this.spinner.hide();
            }
        } catch (error) {
            this.spinner.hide();
            this.alt.toasterror('something went wrong' + error);
        }
    }
    async Permanent_districtchange(): Promise<void> {
        this.new_draft_details_array.Permanentaddress.new_UrbanRural = '';
        this.new_draft_details_array.Permanentaddress.new_MandalMuncipality = '';
        this.new_draft_details_array.Permanentaddress.new_VillageWard = '';
        this.Permanent_MandalMuncipality_array = [];
    }
    userremarks: any;
    async Correction_Approve(type: any): Promise<void> {
        if (this.val.isEmpty(this.userremarks)) {
            this.alt.toasterror('Enter remarks here / వ్యాఖ్యలను ఇక్కడ నమోదు చేయండి');
            return;
        }
        else {
            try {
                try {
                    const req = new basemodel();
                    req.type = '1009';
                    req.param1 = this.applicationid;
                    req.param2 = this.userremarks;
                    req.param3 = type;
                    req.json2 = this.draft_details_array;
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

            } catch (error) {
                this.alt.toasterror("Something went wrong " + error);
                this.spinner.hide();
                return;
            }
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
    //Uploads
    photoselectedFiles: File[] = [];
    photoPreviews: { file: File, discription: string, url: SafeResourceUrl, type: 'image' | 'pdf' | 'other' }[] = [];
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
            this.documnets.documentfilename = type;

            const fileExtension = checkfilesizetype[chc].name
                .toLowerCase()
                .substr(checkfilesizetype[chc].name.lastIndexOf('.'));
            this.documnets.documentformat = fileExtension;

            if (allowedExtensions.indexOf(fileExtension) === -1) {
                this.photoselectedFiles = [];
                this.alt.toasterror('Only PNG,JPG,PDF files are allowed.)');
                return;
            }

            let fileSizeMB: any = checkfilesizetype[chc].size / (1024 * 1024);
            this.documnets.documentsize = checkfilesizetype[chc].size.toString();
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

    getFileType(fileName: string): 'image' | 'pdf' | 'other' {
        const ext = fileName.toLowerCase().split('.').pop();
        if (['png', 'jpg', 'jpeg'].includes(ext!)) return 'image';
        if (ext === 'pdf') return 'pdf';
        return 'other';
      }
    @ViewChild('fileInput') fileInput!: ElementRef;
    @ViewChild('ngSupportingDocuments') ngSupportingDocuments!: NgModel;
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
                let filename = this.applicationid + '_' + this.RU_CODE;
                if (this.photoselectedFiles.length > 0) {
                    let maxlen = 0;
                    let uploadcheck = 0;
                    let typeofbirth = 'Death';
                    if (this.typeofcorrection == 'Correction') {
                        typeofbirth = 'DeathCorrection';
                    }
                    if (this.typeofcorrection == 'Cancellation') {
                        typeofbirth = 'DeathCancellation';
                    }
                    maxlen = this.photoselectedFiles.length;
                    this.fileSelected = this.photoselectedFiles.length > 0;
                    this.fileError = !this.fileSelected; // Hide error if file is selected
                    for (let ph = 0; ph < maxlen; ph++) {
                        this.photofilepath = '';
                        const phform = new FormData();
                        phform.append('file', this.photoselectedFiles[ph]);
                        phform.append('input01', typeofbirth);
                        phform.append('input02', this.typeofcorrection);
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

                                        this.documnets.documentpath = rsdata.path;
                                        const selectedFile = this.photoselectedFiles[ph];
                                        const fileType = this.getFileType(selectedFile.name);
                                        const fileUrl = URL.createObjectURL(selectedFile);
                                        const safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(fileUrl);
                                        this.photoPreviews = [{
                                          file: selectedFile,
                                          discription: this.documnets.documentdescription,
                                          url: safeUrl,
                                          type: fileType,
                                          
                                        }];
                                        //this.documentinsert();
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
    async documentinsert(): Promise<void> {
        try {
            const req = new basemodel();
            req.type = '1018';
            req.param1 = this.brapplicationid;
            req.param2 = this.documnets.documentcode;
            req.param3 = this.documnets.documentformat;
            req.param4 = this.documnets.documentsize;
            req.param5 = this.documnets.documentdescription;
            req.param6 = this.documnets.documentfilename;
            req.param7 = this.documnets.documentpath;
            req.param8 = this.applicationregnumber;
            req.param9 = this.applicationid;
            this.spinner.show();
            let rsdata: any = await this.auth.auth_pkgcrsdeath_service(req);

            this.spinner.hide();
            if (rsdata.code) {
                if (rsdata.code && rsdata.Details[0].STATUS == '1') {
                    this.fileInput.nativeElement.value = '';
                    this.documnets.documentcode = '';
                    this.documnets.documentdescription = '';
                    await this.get_document_details();
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
    fileSelected: boolean = false;
    fileError: boolean = false;
    AdditionalSupportingDocuments_master_array: any[] = [];
    async get_AdditionalSupportingDocuments(): Promise<void> {
        try {
            const req = new basemodel();
            req.type = '1017';
            req.param1 = '222';
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
    async realvaluesgetdraft_details_array() {

        if (this.gendershow) {
            this.draft_details_array.Informationofthedeceased.Gender = this.new_draft_details_array.Informationofthedeceased.new_Gender;
        }
        if (this.ageshow) {
            this.draft_details_array.Informationofthedeceased.DateofBirth = this.new_draft_details_array.Informationofthedeceased.new_DateofBirth;
            this.draft_details_array.Informationofthedeceased.AgeYear = this.new_draft_details_array.Informationofthedeceased.new_AgeYear;
            this.draft_details_array.Informationofthedeceased.AgeMonth = this.new_draft_details_array.Informationofthedeceased.new_AgeMonth;
            this.draft_details_array.Informationofthedeceased.AgeDay = this.new_draft_details_array.Informationofthedeceased.new_AgeDay;
            this.draft_details_array.Informationofthedeceased.Hours = this.new_draft_details_array.Informationofthedeceased.new_Hours;
        }
        if (this.FullNameshow) {
            this.draft_details_array.Informationofthedeceased.FullName = this.new_draft_details_array.Informationofthedeceased.new_FullName;
            this.draft_details_array.Informationofthedeceased.FullName_tel = this.new_draft_details_array.Informationofthedeceased.new_FullName_tel;
            this.draft_details_array.Informationofthedeceased.middlename = this.new_draft_details_array.Informationofthedeceased.new_middlename;
            this.draft_details_array.Informationofthedeceased.middlename_tel = this.new_draft_details_array.Informationofthedeceased.new_middlename_tel;
            this.draft_details_array.Informationofthedeceased.Surname = this.new_draft_details_array.Informationofthedeceased.new_Surname;
            this.draft_details_array.Informationofthedeceased.Surname_tel = this.new_draft_details_array.Informationofthedeceased.new_Surname_tel;
            this.draft_details_array.Confirmnameofthedeceased.FullName = this.new_draft_details_array.Confirmnameofthedeceased.new_FullName;
            this.draft_details_array.Confirmnameofthedeceased.FullName_tel = this.new_draft_details_array.Confirmnameofthedeceased.new_FullName_tel
            this.draft_details_array.Confirmnameofthedeceased.middlename = this.new_draft_details_array.Confirmnameofthedeceased.new_middlename;
            this.draft_details_array.Confirmnameofthedeceased.middlename_tel = this.new_draft_details_array.Confirmnameofthedeceased.new_middlename_tel;
            this.draft_details_array.Confirmnameofthedeceased.Surname = this.new_draft_details_array.Confirmnameofthedeceased.new_Surname;
            this.draft_details_array.Confirmnameofthedeceased.Surname_tel = this.new_draft_details_array.Confirmnameofthedeceased.new_Surname_tel;
        }
        if (this.aadhaarshow) {
            this.draft_details_array.Confirmnameofthedeceased.Aadhaartype = this.new_draft_details_array.Confirmnameofthedeceased.new_Aadhaartype
            this.draft_details_array.Confirmnameofthedeceased.AadhaarEIDNumber_mask = this.new_draft_details_array.Confirmnameofthedeceased.new_AadhaarEIDNumber_mask;
            this.draft_details_array.Confirmnameofthedeceased.AadhaarEIDNumber = this.new_draft_details_array.Confirmnameofthedeceased.new_AadhaarEIDNumber;
        }
        if (this.mother_full_nameshow) {
            this.draft_details_array.motherInformation.mother_full_name = this.new_draft_details_array.motherInformation.new_mother_full_name;
            this.draft_details_array.motherInformation.mother_full_name_t = this.new_draft_details_array.motherInformation.new_mother_full_name_t;
            this.draft_details_array.motherInformation.mother_middlename = this.new_draft_details_array.motherInformation.new_mother_middlename;
            this.draft_details_array.motherInformation.mother_middlename_t = this.new_draft_details_array.motherInformation.new_mother_middlename_t;
            this.draft_details_array.motherInformation.mother_surname_name = this.new_draft_details_array.motherInformation.new_mother_surname_name;
            this.draft_details_array.motherInformation.mother_surname_name_t = this.new_draft_details_array.motherInformation.new_mother_surname_name_t;
        }
        if (this.motheremail) {
            this.draft_details_array.motherInformation.mother_email = this.new_draft_details_array.motherInformation.new_mother_email;
        }
        if (this.mothermobilenumber) {
            this.draft_details_array.motherInformation.mother_mobile_number = this.new_draft_details_array.motherInformation.new_mother_mobile_number;
        }
        if (this.mother_aadhhar_numbershow) {
            this.draft_details_array.motherInformation.mother_aadhaar_number = this.new_draft_details_array.motherInformation.new_mother_aadhaar_number;
            this.draft_details_array.motherInformation.mother_aadhaar_number_mask = this.new_draft_details_array.motherInformation.new_mother_aadhaar_number_mask;
        }
        if (this.father_full_namershow) {
            this.draft_details_array.fatherInformation.father_full_namer = this.new_draft_details_array.fatherInformation.new_father_full_namer;
            this.draft_details_array.fatherInformation.father_full_namer_t = this.new_draft_details_array.fatherInformation.new_father_full_namer_t;
            this.draft_details_array.fatherInformation.father_middlename = this.new_draft_details_array.fatherInformation.new_father_middlename;
            this.draft_details_array.fatherInformation.father_middlename_t = this.new_draft_details_array.fatherInformation.new_father_middlename_t;
            this.draft_details_array.fatherInformation.father_surname = this.new_draft_details_array.fatherInformation.new_father_surname;
            this.draft_details_array.fatherInformation.father_surname_t = this.new_draft_details_array.fatherInformation.new_father_surname_t;
        }
        if (this.fatheremail) {
            this.draft_details_array.fatherInformation.father_email_number = this.new_draft_details_array.fatherInformation.new_father_email_number;
        }
        if (this.fathermobilenumber) {
            this.draft_details_array.fatherInformation.father_mobile_number = this.new_draft_details_array.fatherInformation.new_father_mobile_number;
        }
        if (this.father_aadhhar_numbershow) {
            this.draft_details_array.fatherInformation.father_aadhhar_number = this.new_draft_details_array.fatherInformation.new_father_aadhhar_number;
            this.draft_details_array.fatherInformation.father_aadhhar_number_mask = this.new_draft_details_array.fatherInformation.new_father_aadhhar_number_mask;
        }
        if (this.Spouse_FullName_valshow) {
            this.draft_details_array.MaritalStatus.Spouse_FullName = this.new_draft_details_array.MaritalStatus.new_Spouse_FullName;
            this.draft_details_array.MaritalStatus.Spouse_FullName_tel = this.new_draft_details_array.MaritalStatus.new_Spouse_FullName_tel;
            this.draft_details_array.MaritalStatus.Spouse_middlename = this.new_draft_details_array.MaritalStatus.new_Spouse_middlename;
            this.draft_details_array.MaritalStatus.Spouse_middlename_tel = this.new_draft_details_array.MaritalStatus.new_Spouse_middlename_tel;
            this.draft_details_array.MaritalStatus.Spouse_Surname = this.new_draft_details_array.MaritalStatus.new_Spouse_Surname;
            this.draft_details_array.MaritalStatus.Spouse_Surname_tel = this.new_draft_details_array.MaritalStatus.new_Spouse_Surname_tel;
        }
        if (this.spouseemail) {
            this.draft_details_array.MaritalStatus.Spouse_ContactDetails_EmailId = this.new_draft_details_array.MaritalStatus.new_Spouse_ContactDetails_EmailId;
        }
        if (this.spousemobilenumber) {
            this.draft_details_array.MaritalStatus.Spouse_ContactDetails_Mobileno = this.new_draft_details_array.MaritalStatus.new_Spouse_ContactDetails_Mobileno;
        }
        if (this.Spouse_AadharNumber_maskshow) {
            this.draft_details_array.MaritalStatus.Spouse_AadharNumber = this.new_draft_details_array.MaritalStatus.new_Spouse_AadharNumber;
            this.draft_details_array.MaritalStatus.Spouse_AadharNumber_mask = this.new_draft_details_array.MaritalStatus.new_Spouse_AadharNumber_mask;
        }
        if (this.addressof_parentsshow) {
            this.draft_details_array.Addressofthedeceased.addressof = this.new_draft_details_array.Addressofthedeceased.new_addressof;
            if (this.new_draft_details_array.Addressofthedeceased.new_addressof == 'outside') {
                this.draft_details_array.Addressofthedeceased.Country = this.new_draft_details_array.Addressofthedeceased.new_Country;
                this.draft_details_array.Addressofthedeceased.address = this.new_draft_details_array.Addressofthedeceased.new_address;
                this.draft_details_array.Addressofthedeceased.address_t = this.new_draft_details_array.Addressofthedeceased.new_address_t;
            }
            if (this.new_draft_details_array.Addressofthedeceased.new_addressof != 'outside') {
                this.draft_details_array.Addressofthedeceased.State = this.new_draft_details_array.Addressofthedeceased.new_State;
                this.draft_details_array.Addressofthedeceased.District = this.new_draft_details_array.Addressofthedeceased.new_District;
                this.draft_details_array.Addressofthedeceased.UrbanRural = this.new_draft_details_array.Addressofthedeceased.new_UrbanRural;
                this.draft_details_array.Addressofthedeceased.MandalMuncipality = this.new_draft_details_array.Addressofthedeceased.new_MandalMuncipality;
                this.draft_details_array.Addressofthedeceased.VillageWard = this.new_draft_details_array.Addressofthedeceased.new_VillageWard;
                this.draft_details_array.Addressofthedeceased.BuildingNo = this.new_draft_details_array.Addressofthedeceased.new_BuildingNo;
                this.draft_details_array.Addressofthedeceased.BuildingNo_tel = this.new_draft_details_array.Addressofthedeceased.new_BuildingNo_tel;
                this.draft_details_array.Addressofthedeceased.HouseNo = this.new_draft_details_array.Addressofthedeceased.new_HouseNo;
                this.draft_details_array.Addressofthedeceased.HouseNo_tel = this.new_draft_details_array.Addressofthedeceased.new_HouseNo_tel;
                this.draft_details_array.Addressofthedeceased.StreetName = this.new_draft_details_array.Addressofthedeceased.new_StreetName;
                this.draft_details_array.Addressofthedeceased.StreetName_tel = this.new_draft_details_array.Addressofthedeceased.new_StreetName_tel;
                this.draft_details_array.Addressofthedeceased.Locality = this.new_draft_details_array.Addressofthedeceased.new_Locality;
                this.draft_details_array.Addressofthedeceased.Locality_tel = this.new_draft_details_array.Addressofthedeceased.new_Locality_tel;
                this.draft_details_array.Addressofthedeceased.PINCode = this.new_draft_details_array.Addressofthedeceased.new_PINCode;
                this.draft_details_array.Addressofthedeceased.PostOffice = this.new_draft_details_array.Addressofthedeceased.new_PostOffice;

            }
        }
        if (this.address_permenentshow) {
            this.draft_details_array.Permanentaddress.permantaddressof = this.new_draft_details_array.Permanentaddress.new_permantaddressof;
            if (this.new_draft_details_array.Permanentaddress.new_permantaddressof == 'No') {
                this.draft_details_array.Permanentaddress.addressof = this.new_draft_details_array.Permanentaddress.new_addressof;
                if (this.new_draft_details_array.Permanentaddress.new_addressof == 'outside') {
                    this.draft_details_array.Permanentaddress.Country = this.new_draft_details_array.Permanentaddress.new_Country;
                    this.draft_details_array.Permanentaddress.address = this.new_draft_details_array.Permanentaddress.new_address;
                    this.draft_details_array.Permanentaddress.address_t = this.new_draft_details_array.Permanentaddress.new_address_t;
                }
                if (this.new_draft_details_array.Permanentaddress.new_addressof != 'outside') {
                    this.draft_details_array.Permanentaddress.State = this.new_draft_details_array.Permanentaddress.new_State;
                    this.draft_details_array.Permanentaddress.District = this.new_draft_details_array.Permanentaddress.new_District;
                    this.draft_details_array.Permanentaddress.UrbanRural = this.new_draft_details_array.Permanentaddress.new_UrbanRural;
                    this.draft_details_array.Permanentaddress.MandalMuncipality = this.new_draft_details_array.Permanentaddress.new_MandalMuncipality;
                    this.draft_details_array.Permanentaddress.VillageWard = this.new_draft_details_array.Permanentaddress.new_VillageWard;
                    this.draft_details_array.Permanentaddress.BuildingNo = this.new_draft_details_array.Permanentaddress.new_BuildingNo;
                    this.draft_details_array.Permanentaddress.BuildingNo_tel = this.new_draft_details_array.Permanentaddress.new_BuildingNo_tel;
                    this.draft_details_array.Permanentaddress.HouseNo = this.new_draft_details_array.Permanentaddress.new_HouseNo;
                    this.draft_details_array.Permanentaddress.HouseNo_tel = this.new_draft_details_array.Permanentaddress.new_HouseNo_tel;
                    this.draft_details_array.Permanentaddress.StreetName = this.new_draft_details_array.Permanentaddress.new_StreetName;
                    this.draft_details_array.Permanentaddress.StreetName_tel = this.new_draft_details_array.Permanentaddress.new_StreetName_tel;
                    this.draft_details_array.Permanentaddress.Locality = this.new_draft_details_array.Permanentaddress.new_Locality;
                    this.draft_details_array.Permanentaddress.Locality_tel = this.new_draft_details_array.Permanentaddress.new_Locality_tel;
                    this.draft_details_array.Permanentaddress.PINCode = this.new_draft_details_array.Permanentaddress.new_PINCode;
                    this.draft_details_array.Permanentaddress.PostOffice = this.new_draft_details_array.Permanentaddress.new_PostOffice;
                }
            }
            if (this.new_draft_details_array.Permanentaddress.new_permantaddressof == 'Yes') {
                this.draft_details_array.Permanentaddress.State = this.new_draft_details_array.Permanentaddress.new_State;
                this.draft_details_array.Permanentaddress.District = this.new_draft_details_array.Permanentaddress.new_District;
                this.draft_details_array.Permanentaddress.UrbanRural = this.new_draft_details_array.Permanentaddress.new_UrbanRural;
                this.draft_details_array.Permanentaddress.MandalMuncipality = this.new_draft_details_array.Permanentaddress.new_MandalMuncipality;
                this.draft_details_array.Permanentaddress.VillageWard = this.new_draft_details_array.Permanentaddress.new_VillageWard;
                this.draft_details_array.Permanentaddress.BuildingNo = this.new_draft_details_array.Permanentaddress.new_BuildingNo;
                this.draft_details_array.Permanentaddress.BuildingNo_tel = this.new_draft_details_array.Permanentaddress.new_BuildingNo_tel;
                this.draft_details_array.Permanentaddress.HouseNo = this.new_draft_details_array.Permanentaddress.new_HouseNo;
                this.draft_details_array.Permanentaddress.HouseNo_tel = this.new_draft_details_array.Permanentaddress.new_HouseNo_tel;
                this.draft_details_array.Permanentaddress.StreetName = this.new_draft_details_array.Permanentaddress.new_StreetName;
                this.draft_details_array.Permanentaddress.StreetName_tel = this.new_draft_details_array.Permanentaddress.new_StreetName_tel;
                this.draft_details_array.Permanentaddress.Locality = this.new_draft_details_array.Permanentaddress.new_Locality;
                this.draft_details_array.Permanentaddress.Locality_tel = this.new_draft_details_array.Permanentaddress.new_Locality_tel;
                this.draft_details_array.Permanentaddress.PINCode = this.new_draft_details_array.Permanentaddress.new_PINCode;
                this.draft_details_array.Permanentaddress.PostOffice = this.new_draft_details_array.Permanentaddress.new_PostOffice;
            }
        }
    }
     removeEmpty(obj:any) {
        Object.keys(obj).forEach((key) => {
          if (obj[key] && typeof obj[key] === 'object') {
            const childObject = this.removeEmpty(obj[key]);
            if (childObject === undefined) {
              delete obj[key];
            }
          } else if (obj[key] === '' || obj[key] === null || obj[key] === undefined) {
            delete obj[key];
          }
        });
        return Object.keys(obj).length > 0 || obj instanceof Array ? obj : undefined;
      };
    async Application_final_submit(): Promise<void> {
        try {
            debugger
            if (!this.fileSelected) {
                this.alt.toasterror('Please Upload Files / దయచేసి ఫైల్‌లను అప్‌లోడ్ చేయండి');
                return;
            }
            else if (this.val.isEmpty(this.userremarks)) {
                this.alt.toasterror('Enter remarks here / వ్యాఖ్యలను ఇక్కడ నమోదు చేయండి');
                return;
            }
            else {
                await this.realvaluesgetdraft_details_array();
                this.removeEmpty(this.draft_details_array);
                const req = new basemodel();
                req.type = '1017';
                req.param1 = this.brapplicationid;
                req.param2 = this.userremarks;
                req.param3 = this.typeofcorrection;
                req.param4 = this.applicationregnumber;
                req.param5 = this.applicationid;
                req.json2 = this.draft_details_array;
                this.spinner.show();
                let rsdata: any = await this.auth.auth_pkgcrsdeath_service(req);
                this.spinner.hide();
                debugger
                if (rsdata.code) {
                    if (rsdata.code && rsdata.Details[0].STATUS == '1') {
                        if(this.photoselectedFiles.length > 0){
                            this.documentinsert();
                          }
                        this.alt.toastsuccess(rsdata.Details[0].STATUS_TEXT + rsdata.Details[0].STATUS_TEXT_TEL);
                        this.dateofbirthdisable = false;
                        this.ModalCLose();
                        setTimeout(() => {
                            window.location.reload();
                        }, 1000);
                    }
                    if (rsdata.code && rsdata.Details[0].STATUS == '0') {
                        this.alt.toasterror(rsdata.Details[0].STATUS_TEXT + rsdata.Details[0].STATUS_TEXT_TEL);
                        this.dateofbirthdisable = false;
                        this.clernewvalue();

                    }
                    this.spinner.hide();
                } else {
                    this.alt.toasterror('The application processing has failed.');
                    this.spinner.hide();
                }
            }
        } catch (error) {
            this.spinner.hide();

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
    getSafeUrl(filePath: string) {
        return this.sanitizer.bypassSecurityTrustResourceUrl(filePath);
    }

    isImage(filePath: string): boolean {
        return /\.(jpg|jpeg|png|gif|bmp|svg)$/i.test(filePath);
    }

    isPDF(filePath: string): boolean {
        return /\.pdf$/i.test(filePath);
    }


}
