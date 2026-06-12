import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertsService } from 'src/app/services/alert_lyr/alerts.service';
import { AuthserService } from 'src/app/services/api_lyr/private/authser.service';
import { EncDecService } from 'src/app/services/enc_dec_lyr/enc-dec.service';
import { basemodel } from 'src/app/thirparty/model/apimodel';
import { InputvalidaionService } from 'src/app/thirparty/validation/inputvalidaion.service';

@Component({
    selector: 'app-deathpopupview',
    templateUrl: './deathpopupview.component.html',
    styleUrl: './deathpopupview.component.css'
})
export class DeathpopupviewComponent {
    @Input() applicationid: any;
    @Input() selecttab: any;
    @Input() typeofcorrection: any;
    @Input() table_card_sub_select: any;

    UROLE: any;
    showcheckbox = false;
    constructor(private spinner: NgxSpinnerService,
        private auth: AuthserService, private alt: AlertsService, private encdc: EncDecService,
        private router: Router, private http: HttpClient,
        private val: InputvalidaionService, private sanitizer: DomSanitizer
    ) { }

    ngOnInit() {
        
        if (sessionStorage.getItem('_Uenc') !== '') {
            let obj: any = this.encdc.Getuser();
            if (obj != '' && obj != undefined && obj != null) {
                this.UROLE = obj[0].UROLE;
                this.getdraft_details();
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
            ageremarks: ''
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
            aadhaarremarks: ''
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
            father_aadhhar_numberremarks: ''
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
            mother_aadhhar_numberremarks: ''
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
            Spouse_AadharNumber_maskremarks: ''
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
            addressof_parentsremarks: ''
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
            address_permenentremarks: ''
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

    documnets = {
        documentcode: '',
        documentdescription: '',
        documentpath: '',
        documentformat: '',
        documentsize: '',
        documentfilename: '',
    };

    async getdraft_details(): Promise<void> {
        try {
            const req = new basemodel();
            this.spinner.show();
            req.type = '1002';
            req.param1 = this.applicationid;
            req.param2 = 'DEATH';
            let rsdata: any = await this.auth.auth_pkgcrsdeath_service(req);
            debugger
            this.spinner.hide();
            if (rsdata.code) {
                if (rsdata.code && rsdata.Details[0].STATUS == '1') {
                    this.draft_details_array = JSON.parse(rsdata.Details[0].JSON_RESULT);

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

}
