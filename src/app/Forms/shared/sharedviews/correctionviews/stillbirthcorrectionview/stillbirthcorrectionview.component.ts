import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertsService } from 'src/app/services/alert_lyr/alerts.service';
import { EncDecService } from 'src/app/services/enc_dec_lyr/enc-dec.service';
import { basemodel } from 'src/app/thirparty/model/apimodel';
import { AuthserService } from 'src/app/services/api_lyr/private/authser.service';
import { InputvalidaionService } from 'src/app/thirparty/validation/inputvalidaion.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MultiSelect } from 'primeng/multiselect';
import { MiddlewareService } from 'src/app/services/middleware_lyr/middleware.service';
import { PrivateService } from 'src/app/services/api_lyr/private/private.service';
import { NgModel } from '@angular/forms';
import Swal from 'sweetalert2';
declare var Fancybox: any;

@Component({
    selector: 'app-stillbirthcorrectionview',
    templateUrl: './stillbirthcorrectionview.component.html',
    styleUrl: './stillbirthcorrectionview.component.css'
})
export class StillbirthcorrectionviewComponent {
    @Input() applicationid: any;
    @Input() selecttab: any;
    @Input() typeofcorrection: any;
    @Input() applicationregid: any;
    contentuploadurl = '';
    contentshowurl = '';
    selectedstillbirth: any[] = [];
    fathermail = false;
    fathermobilenumber = false;
    motheremail = false; mothermobile = false; PlaceofBirth = false;
    constructor(private spinner: NgxSpinnerService,
        private auth: AuthserService, private alt: AlertsService, private encdc: EncDecService, private router: Router, private http: HttpClient
        , private val: InputvalidaionService, private sanitizer: DomSanitizer, private mid: MiddlewareService, private pscall: PrivateService,
        private httpClient: HttpClient,) {
        this.contentuploadurl = this.mid.globalsetting.api_url_conent_upload;
    this.contentshowurl = mid.globalsetting.api_url_conent_show;
    }
      cancelform_alert() {
        Swal.fire({
          title: 'Please Confirm !దయచేసి నిర్ధారించండి !',
          text: 'Do you have desired document for cancellation ? / మీరు రద్దు చేయడానికి కావలసిన పత్రాన్ని కలిగివున్నారా?',
          //showCancelButton: true,
          //cancelButtonText: 'Cancel',
          confirmButtonText: 'Continue',
        }).then((result) => {
    
        });
      }
    UROLE: any;RU_CODE: any;
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
                if (this.typeofcorrection == 'Cancellation') {
                  this.cancelform_alert();
                }
                await this.getstatedata();
                await this.getPlaceofBirth(); 
                await this.getHospital();
                await this.get_nameofdisease();
                await this.get_Typeofattention();
                await this.getcorrectiondrop();
                await this.getdraft_details();
                await this.getdraft();
            } else {
                this.encdc.Usersessionkill();
            }
        }
        else {
            this.encdc.Usersessionkill();
            this.router.navigate(['/Sessionexpired']);
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
    draft_details_array = {
        language: {
            primarylan: 'Telugu',
            secondarylan: 'English',
            dateofreport: '',
        },
        childinformation: {
            childnotnamed: '',
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
            selgendercheck: '0',
            selgenderremarks: '',
            fullnamecheck: '0',
            fullnameremarks: '',
            aadhaarcheck: '0',
            aadhaarremarks: '',
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
            father_full_namercheck: '0',
            father_full_namerremarks: '',
            father_aadhhar_numbercheck: '0',
            father_aadhhar_numberremarks: ''
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
            mother_full_namercheck: '0',
            mother_full_namerremarks: '',
            mother_aadhhar_numbercheck: '0',
            mother_aadhhar_numberremarks: '',

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
            Copyfromtheaddress: '',
            Copyfromthepermanent: '',
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
            number_of_childrencheck: '0',
            number_of_childrenremarks: '',
            type_of_attention_valcheck: '0',
            type_of_attention_valremarks: '',
            causeoffoetaldeathcheck: '0',
            causeoffoetaldeathremarks: '',
            causeoffoetaldeath: '',
            Birthweightcheck: '0',
            Birthweightremarks: '',
            DurationofPregnancycheck: '0',
            DurationofPregnancyremarks: '',
            Methodofdeliverycheck: '0',
            Methodofdeliveryremarks: ''
        },
    };
    new_draft_details_array = {
        language: {
            primarylan: 'Telugu',
            secondarylan: 'English',
            dateofreport: '',
        },
        childinformation: {

            new_selgender: '',
            new_selgender_val: '',
            selgendercheck: '0',
        },
        fatherInformation: {

            new_fathername_value: '',
            new_father_full_namer: '',
            new_father_full_namer_t: '',
            new_father_full_namer_val: '',
            new_father_surname: '',
            new_father_surname_t: '',
            new_father_mobile_number: '',
            new_father_email_number: '',
            new_father_middlename: '',
            new_father_middlename_t: '',
            new_father_surname_val: '',
            new_father_aadhhar_number_mask: '',
            new_father_aadhhar_number: '',
            father_full_namercheck: '0',
            father_aadhhar_numbercheck: '0',
            father_mobile_numbercheck: '0',
            father_email_numbercheck: '0',
        },
        motherInformation: {

            new_mother_full_namer: '',
            new_mother_full_namer_t: '',
            new_mother_full_namer_val: '',
            new_mother_surname: '',
            new_mother_surname_t: '',
            new_mother_mobile_number: '',
      new_mother_email_number: '',
            new_mother_middle_name: '',
            new_mother_middle_name_t: '',
            new_mother_surname_val: '',
            new_mother_aadhhar_number: '',
            new_mother_aadhaar_number_mask: '',
            new_mothername_value: '',
            mother_full_namercheck: '0',
            mother_aadhhar_numbercheck: '0',
            mother_mobile_numbercheck: '0',
            mother_email_numbercheck: '0',
        },

        placeofbirth: {
            new_place_of_birth: '',
            new_place_of_birth_hospital: '',
            new_place_of_birth_hospital_val: '',
            new_place_of_birth_state: '',
            new_place_of_birth_state_val: '',
            new_place_of_birth_district: '',
            new_place_of_birth_district_val: '',
            new_place_of_birth_mmc: '',
            new_place_of_birth_mmc_val: '',
            new_place_of_birth_rural_urabn: '',
            new_place_of_birth_rural_urabn_val: '',
            new_place_of_birth_village: '',
            new_place_of_birth_village_val: '',
            new_place_of_birth_pin_code: '',
            new_place_of_birth_building_no: '',
            new_place_of_birth_building_no_t: '',
            new_place_of_birth_building_no_val: '',
            new_place_of_birth_house_no: '',
            new_Place_of_birth_house_no_t: '',
            new_place_of_birth_house_no_val: '',
            new_place_of_birth_street_name: '',
            new_place_of_birth_street_name_t: '',
            new_place_of_birth_street_name_val: '',
            new_Place_of_birth_locality: '',
            new_Place_of_birth_locality_t: '',
            new_Place_of_birth_locality_val: '',
            new_Place_of_birth_postoff: '',
            new_Place_of_birth_postoff_val: '',
            new_placeofbirth_value: '',
            placeofbirthcheck: '0'
          },
        legal: {
            new_number_of_children: '',
            new_type_of_attention: '',
            new_type_of_attention_val: '',
            new_duration_of_pregency: '',
            number_of_childrencheck: '0',
            number_of_childrenremarks: '',
            type_of_attention_valcheck: '0',
            type_of_attention_valremarks: '',
            causeoffoetaldeathcheck: '0',
            causeoffoetaldeathremarks: '',
            new_causeoffoetaldeath: '',
            Birthweightcheck: '0',
            Birthweightremarks: '',
            DurationofPregnancycheck: '0',
            DurationofPregnancyremarks: '',
            Methodofdeliverycheck: '0',
            Methodofdeliveryremarks: ''
        },
    };
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
        }
    }
    selectedbirth: any[] = [];
    multitypechangesforcorrection() {

        if (this.typeofcorrection == 'Correction') {
          if (this.selectedbirth.length > 0) {
            if (this.selectedbirth.find(e => e.CORRECTION_CODE == '101')) {
              this.new_draft_details_array.childinformation.selgendercheck = '1';
              this.gendershow = true;
            } else {
              this.gendershow = false;
              this.new_draft_details_array.childinformation.new_selgender = '';
              this.new_draft_details_array.childinformation.selgendercheck = '0';
            }
            if (this.selectedbirth.find(e => e.CORRECTION_CODE == '104')) {
              this.new_draft_details_array.fatherInformation.father_full_namercheck = '1';
              this.fatherfullname = true;
            } else {
              this.fatherfullname = false;
              this.new_draft_details_array.fatherInformation.father_full_namercheck = '0';
              this.new_draft_details_array.fatherInformation.new_father_full_namer = '';
              this.new_draft_details_array.fatherInformation.new_father_full_namer_t = '';
              this.new_draft_details_array.fatherInformation.new_father_middlename = '';
              this.new_draft_details_array.fatherInformation.new_father_middlename_t = '';
              this.new_draft_details_array.fatherInformation.new_father_surname = '';
              this.new_draft_details_array.fatherInformation.new_father_surname_t = '';
            }

            if (this.selectedbirth.find(e => e.CORRECTION_CODE == '105')) {
                this.new_draft_details_array.fatherInformation.father_email_numbercheck = '1',
                  this.fathermail = true;
      
              } else {
                this.fathermail = false;
                this.new_draft_details_array.fatherInformation.father_email_numbercheck = '0',
                  this.new_draft_details_array.fatherInformation.new_father_email_number = '';
              }
              if (this.selectedbirth.find(e => e.CORRECTION_CODE == '106')) {
                this.new_draft_details_array.fatherInformation.father_mobile_numbercheck = '1',
                  this.fathermobilenumber = true;
              } else {
                this.fathermobilenumber = false;
                this.new_draft_details_array.fatherInformation.father_mobile_numbercheck = '0',
                  this.new_draft_details_array.fatherInformation.new_father_mobile_number = '';
              }



            if (this.selectedbirth.find(e => e.CORRECTION_CODE == '107')) {
              this.new_draft_details_array.fatherInformation.father_aadhhar_numbercheck = '1';
              this.fatheraadharnumber = true;
            } else {
              this.fatheraadharnumber = false;
              this.new_draft_details_array.fatherInformation.father_aadhhar_numbercheck = '0';
              this.new_draft_details_array.fatherInformation.new_father_aadhhar_number_mask = '';
              this.new_draft_details_array.fatherInformation.new_father_aadhhar_number = '';
            }
            if (this.selectedbirth.find(e => e.CORRECTION_CODE == '108')) {
              this.new_draft_details_array.motherInformation.mother_full_namercheck = '1';
              this.motherfullname = true;
            } else {
              this.motherfullname = false;
              this.new_draft_details_array.motherInformation.mother_full_namercheck = '0';
              this.new_draft_details_array.motherInformation.new_mother_full_namer = '';
              this.new_draft_details_array.motherInformation.new_mother_full_namer_t = '';
              this.new_draft_details_array.motherInformation.new_mother_middle_name = '';
              this.new_draft_details_array.motherInformation.new_mother_middle_name_t = '';
              this.new_draft_details_array.motherInformation.new_mother_surname = '';
              this.new_draft_details_array.motherInformation.new_mother_surname_t = '';
            }

            if (this.selectedbirth.find(e => e.CORRECTION_CODE == '109')) {
                this.new_draft_details_array.motherInformation.mother_email_numbercheck = '1',
                  this.motheremail = true;
              } else {
                this.motheremail = false;
                this.new_draft_details_array.motherInformation.mother_email_numbercheck = '0',
                  this.new_draft_details_array.motherInformation.new_mother_email_number = '';
              }
              if (this.selectedbirth.find(e => e.CORRECTION_CODE == '110')) {
                this.new_draft_details_array.motherInformation.mother_mobile_numbercheck = '1',
                  this.mothermobile = true;
              } else {
                this.mothermobile = false;
                this.new_draft_details_array.motherInformation.mother_mobile_numbercheck = '0',
                  this.new_draft_details_array.motherInformation.new_mother_mobile_number = '';
              }
            if (this.selectedbirth.find(e => e.CORRECTION_CODE == '111')) {
              this.new_draft_details_array.motherInformation.mother_aadhhar_numbercheck = '1';
              this.motheraadhar = true;
            } else {
              this.motheraadhar = false;
              this.new_draft_details_array.motherInformation.mother_aadhhar_numbercheck = '0';
              this.new_draft_details_array.motherInformation.new_mother_aadhaar_number_mask = '';
            }   
            if (this.selectedbirth.find(e => e.CORRECTION_CODE == '114')) {
                this.new_draft_details_array.placeofbirth.placeofbirthcheck = '1';
                this.PlaceofBirth = true;
              } else {
                this.PlaceofBirth = false;
                this.new_draft_details_array.placeofbirth.placeofbirthcheck = '0';
              }
           
          }
          else {
            this.getallcorrectionempty();
          }
        }
      }
    
      getallcorrectionempty() {
        this.gendershow = false;
        this.fatherfullname = false;
        this.fathermail = false;
        this.fathermobilenumber = false;
        this.fatheraadharnumber = false;
        this.motherfullname = false;
        // father details
        this.new_draft_details_array.fatherInformation.new_father_full_namer = '';
        this.new_draft_details_array.fatherInformation.new_father_full_namer_t = '';
        this.new_draft_details_array.fatherInformation.new_father_middlename = '';
        this.new_draft_details_array.fatherInformation.new_father_middlename_t = '';
        this.new_draft_details_array.fatherInformation.new_father_surname = '';
        this.new_draft_details_array.fatherInformation.new_father_surname_t = '';
        this.new_draft_details_array.fatherInformation.new_father_aadhhar_number_mask = '';
        this.new_draft_details_array.fatherInformation.new_father_aadhhar_number = '';
        this.new_draft_details_array.fatherInformation.new_father_mobile_number = '';
        this.new_draft_details_array.fatherInformation.new_father_email_number = '';
        // mother details
        this.new_draft_details_array.motherInformation.new_mother_full_namer = '';
        this.new_draft_details_array.motherInformation.new_mother_full_namer_t = '';
        this.new_draft_details_array.motherInformation.new_mother_middle_name = '';
        this.new_draft_details_array.motherInformation.new_mother_middle_name_t = ''; 
        this.new_draft_details_array.motherInformation.new_mother_surname = '';
        this.new_draft_details_array.motherInformation.new_mother_surname_t = '';
        this.motheraadhar = false;
        this.new_draft_details_array.motherInformation.new_mother_aadhaar_number_mask = '';
        this.motheremail = false;
        this.mothermobile = false;
        this.new_draft_details_array.motherInformation.new_mother_mobile_number = '';
        this.new_draft_details_array.motherInformation.new_mother_email_number = '';

        this.PlaceofBirth = false;
        this.new_draft_details_array.placeofbirth = {
    
          new_place_of_birth: '',
          new_place_of_birth_hospital: '',
          new_place_of_birth_hospital_val: '',
          new_place_of_birth_state: '',
          new_place_of_birth_state_val: '',
          new_place_of_birth_district: '',
          new_place_of_birth_district_val: '',
          new_place_of_birth_mmc: '',
          new_place_of_birth_mmc_val: '',
          new_place_of_birth_rural_urabn: '',
          new_place_of_birth_rural_urabn_val: '',
          new_place_of_birth_village: '',
          new_place_of_birth_village_val: '',
          new_place_of_birth_pin_code: '',
          new_place_of_birth_building_no: '',
          new_place_of_birth_building_no_t: '',
          new_place_of_birth_building_no_val: '',
          new_place_of_birth_house_no: '',
          new_Place_of_birth_house_no_t: '',
          new_place_of_birth_house_no_val: '',
          new_place_of_birth_street_name: '',
          new_place_of_birth_street_name_t: '',
          new_place_of_birth_street_name_val: '',
          new_Place_of_birth_locality: '',
          new_Place_of_birth_locality_t: '',
          new_Place_of_birth_locality_val: '',
          new_Place_of_birth_postoff: '',
          new_Place_of_birth_postoff_val: '',
          new_placeofbirth_value: '',
          placeofbirthcheck: '0'
        };
      
      }
      applicationstatus: any; brapplicationid: any;
  async getdraft(): Promise<void> {
    try {
      const req = new basemodel();
      req.type = '10001';
      req.param1 = 'STILLBIRTH';
      req.param2 = this.applicationregid;
      req.param3 = this.applicationid;
      req.param4 = this.typeofcorrection;
      this.spinner.show();
      let rsdata: any = await this.auth.auth_pkgcrsstillbirth_service(req);
      this.spinner.hide();
      debugger
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

    }
  }
    async getdraft_details(): Promise<void> {
        try {

            let rsdata: any
            const req = new basemodel();
            this.spinner.show();
            req.type = '1010';
            req.param1 = this.applicationid;
            req.param2 = 'STILLBIRTH';
            rsdata = await this.auth.auth_pkgcrsstillbirth_service(req);
            this.spinner.hide();
            if (rsdata.code) {
                if (rsdata.code && rsdata.Details[0].STATUS == '1') {
                    this.draft_details_array = JSON.parse(rsdata.Details[0].JSON_RESULT);
                    this.multitypechangesforcorrection();
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

        }
    }

    PathReportString: any;
    async downloadorder() {
        try {

            const req = new basemodel();
            req.type = '1022';
            req.param1 = this.applicationid
            req.param4 = 'stillbirth';
            let responce: any = await this.auth.pdf_download(req);
            if (responce.code) {
                this.PathReportString = 'data:application/pdf;base64,' + (this.sanitizer.bypassSecurityTrustResourceUrl(responce.url) as any).changingThisBreaksApplicationSecurity;
                document.getElementById('ifrm')?.setAttribute("src", this.PathReportString);
            } else {
                this.alt.toasterror('No Documents found.');
                return;
            }
        } catch (error) {
            this.spinner.hide();
            this.alt.toasterror('something went wrong');
            return;
        }
    }
    isConfirmLegalEnabled = true;
    isConfirmStatisticalEnabled = false;
    enableConfirmStatisticalTab() {
        debugger
        if(this.typeofcorrection=='Correction'){
        if (!this.validationforinputs()) {
            this.isConfirmStatisticalEnabled = true;
            this.get_AdditionalSupportingDocuments();
            this.get_Typeofattention();
            this.openTab('pills-confirmstatistic-tab');
            this.spinner.hide();

        }
    }else{
        this.isConfirmStatisticalEnabled = true;
        this.get_AdditionalSupportingDocuments();
        this.get_Typeofattention();
            this.openTab('pills-confirmstatistic-tab');
            this.spinner.hide();
    }
    }

    @ViewChild('sel_gender') sel_gender!: NgModel;
    @ViewChild('Father__full_namer') Father__full_namer!: NgModel;
    @ViewChild('Father_surname') Father_surname!: NgModel;
    @ViewChild('Father_aadhhar_number') Father_aadhhar_number!: NgModel;
    @ViewChild('Mother_full_name') Mother_full_name!: NgModel;
    @ViewChild('Mother_surname_name') Mother_surname_name!: NgModel;
    @ViewChild('Mother_aadhaar_no') Mother_aadhaar_no!: NgModel;
    @ViewChild('Type_of_attention') Type_of_attention!: NgModel;
    @ViewChild('Duration_of_pregency') Duration_of_pregency!: NgModel;
    @ViewChild('Father_email_number') Father_email_number!: NgModel;
    @ViewChild('foc_Father_email_number', { static: false }) foc_Father_email_number!: ElementRef;
    @ViewChild('Father_mobile_number') Father_mobile_number!: NgModel;
    @ViewChild('foc_Father_mobile_number', { static: false }) foc_Father_mobile_number!: ElementRef;
    @ViewChild('Mother_email') Mother_email!: NgModel;
  @ViewChild('Mother_mobile_number') Mother_mobile_number!: NgModel;
    

    validationforinputs() {
        debugger
        let isInvalid = false;
        let tostervalue = "";
        switch (this.typeofcorrection) {
            case 'Clarification':
                if (this.gendershow) {
                    if (this.sel_gender) {
                        this.sel_gender.control.markAsTouched();
                        this.sel_gender.control.updateValueAndValidity();
                        // this.foc_sel_gender.nativeElement.focus();
                        if (this.sel_gender.invalid) {
                            isInvalid = true;
                            tostervalue = "Please Select Child Gender Drop Down";
                            break;

                        }
                    }
                }

                if (this.fatherfullname) {
                    if (this.Father__full_namer) {
                        this.Father__full_namer.control.markAsTouched();
                        this.Father__full_namer.control.updateValueAndValidity();
                        // this.foc_sel_gender.nativeElement.focus();
                        if (this.Father__full_namer.invalid) {
                            isInvalid = true;
                            tostervalue = "Please Enter Father’s First Name";
                            break;
                        }

                    }
                    if (this.Father_surname) {
                        this.Father_surname.control.markAsTouched();
                        this.Father_surname.control.updateValueAndValidity();
                        // this.foc_sel_gender.nativeElement.focus();
                        if (this.Father_surname.invalid) {
                            isInvalid = true;
                            tostervalue = "Please Enter Father’s Last Name";
                            break;
                        }

                    }

                }

                if(this.fathermail){
                    this.Father_email_number.control.markAsTouched();
                    this.Father_email_number.control.updateValueAndValidity();
                    this.foc_Father_email_number.nativeElement.focus();
                    if (this.Father_email_number.invalid) {
                      isInvalid = true;
                      tostervalue = "Please Enter Father Email";
                    }
                }
                if(this.fathermobilenumber){
                  if (this.Father_mobile_number) {
                    this.Father_mobile_number.control.markAsTouched();
                    this.Father_mobile_number.control.updateValueAndValidity();
                    this.foc_Father_mobile_number.nativeElement.focus();
                    if (this.Father_mobile_number.invalid) {
                      isInvalid = true;
                      tostervalue = "Please Enter Father Mobile Number";
                    }
                  }
          
                }

                if (this.fatheraadharnumber) {
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


                if (this.motherfullname) {
                    if (this.Mother_full_name) {
                        this.Mother_full_name.control.markAsTouched();
                        this.Mother_full_name.control.updateValueAndValidity();
                        // this.foc_sel_gender.nativeElement.focus();
                        if (this.Mother_full_name.invalid) {
                            isInvalid = true;
                            tostervalue = "Please Enter Mother’s First Name";
                            break;
                        }

                    }
                    if (this.Mother_surname_name) {
                        this.Mother_surname_name.control.markAsTouched();
                        this.Mother_surname_name.control.updateValueAndValidity();
                        // this.foc_sel_gender.nativeElement.focus();
                        if (this.Mother_surname_name.invalid) {
                            isInvalid = true;
                            tostervalue = "Please Enter Mother’s Last Name";
                            break;
                        }

                    }

                }

                if (this.motheremail) {
                    this.Mother_email.control.markAsTouched();
                    this.Mother_email.control.updateValueAndValidity();
                    if (this.Mother_email.invalid) {
                      isInvalid = true;
                      tostervalue = "Please Enter Mother Email";
                    }
                  }
                  if(this.mothermobile){
                    if (this.Mother_mobile_number) {
                      this.Mother_mobile_number.control.markAsTouched();
                      this.Mother_mobile_number.control.updateValueAndValidity();
                      if (this.Mother_mobile_number.invalid) {
                        isInvalid = true;
                        tostervalue = "Please Enter Mother Mobile Number";
                      }
                    }
                  }

                if (this.motheraadhar) {
                    if (this.Mother_aadhaar_no) {
                        this.Mother_aadhaar_no.control.markAsTouched();
                        this.Mother_aadhaar_no.control.updateValueAndValidity();
                        // this.foc_sel_gender.nativeElement.focus();
                        if (this.Mother_aadhaar_no.invalid) {
                            isInvalid = true;
                            tostervalue = "Please Enter Mother’s Aadhaar Number";
                            break;
                        }

                    }

                }
                if (this.isConfirmStatisticalEnabled) {
                    if (this.typeofattention) {
                        if (this.Type_of_attention) {
                            this.Type_of_attention.control.markAsTouched();
                            this.Type_of_attention.control.updateValueAndValidity();
                            // this.foc_sel_gender.nativeElement.focus();
                            if (this.Type_of_attention.invalid) {
                                isInvalid = true;
                                tostervalue = "Please Select Type of attention";
                                break;

                            }
                        }
                    }
                    if (this.durationofpregency) {
                        if (this.Duration_of_pregency) {
                            this.Duration_of_pregency.control.markAsTouched();
                            this.Duration_of_pregency.control.updateValueAndValidity();
                            // this.foc_sel_gender.nativeElement.focus();
                            if (this.Duration_of_pregency.invalid) {
                                isInvalid = true;
                                tostervalue = "Please Enter Duration of Pregnancy";
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
    correction_master_array: any[] = [];
    async getcorrectiondrop(): Promise<void> {
        try {
            const req = new basemodel();
            req.type = '1024';
            req.param1='STILLBIRTH';
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
    @ViewChild('multiSelect') multiSelect!: MultiSelect;

    gendershow = false;
    // Method called on selection change
    onSelectionChange(obj: any): void {
        // Ensure the dropdown is hidden
        if (this.multiSelect) {
            this.multiSelect.hide();
        }
        //this.gendershow=false;
        if (obj.itemValue.CORRECTION_CODE == '101')
            this.gendershow = true;
    }

    fileSelected: boolean = false;
    fileError: boolean = false;
    documentlist: any[] = [];
    async get_document_details(): Promise<void> {
        try {
            const req = new basemodel();
            req.type = '1012';
            req.param1 = this.brapplicationid;
            this.spinner.show();
            this.documentlist = [];
            let rsdata: any = await this.auth.auth_pkgcrsstillbirth_service(req);
            this.spinner.hide();
            debugger
            if (rsdata.code) {
                this.documentlist = rsdata.Details;
                this.fileSelected = this.documentlist.length > 0;
                this.fileError = !this.fileSelected; // Hide error if file is selected
            } else {
                this.documentlist = [];
                this.spinner.hide();
            }
        } catch (error) {
            this.spinner.hide();

        }
    }
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
         let typeofbirth = 'Birth';
         if (this.typeofcorrection == 'Correction') {
           typeofbirth = 'BirthCorrection';
         }
         if (this.typeofcorrection == 'Addname') {
           typeofbirth = 'BirthAddname';
         }
         if (this.typeofcorrection == 'Cancellation') {
           typeofbirth = 'BirthCancellation';
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
                   this.documentinsert();
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
 documnets = {
    documentcode: '',
    documentdescription: '',
    documentpath: '',
    documentformat: '',
    documentsize: '',
    documentfilename: '',
  };
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
     req.param8 = this.applicationregid;
     req.param9 = this.applicationid;
     this.spinner.show();
     let rsdata: any = await this.auth.auth_pkgcrsstillbirth_service(req);
     this.spinner.hide();
     if (rsdata.code) {
       if (rsdata.code && rsdata.Details[0].STATUS == '1') {
         this.fileInput.nativeElement.value = '';
         this.documnets.documentcode = '';
         this.documnets.documentdescription = '';
         this.get_document_details();
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
    userremarks: any;
    async Application_final_submit(): Promise<void> {
        if (!this.validationforinputs()) {
            try {
                if (!this.fileSelected) {
                    this.alt.toasterror('Please Upload Files / దయచేసి ఫైల్‌లను అప్‌లోడ్ చేయండి');
                    return;
                  }
               else if (this.val.isEmpty(this.userremarks)) {
                    this.alt.toasterror('Enter remarks here / వ్యాఖ్యలను ఇక్కడ నమోదు చేయండి');
                    return;
                }
                else {
                    const req = new basemodel();
                    req.type = '1017';
                    req.param1 = this.brapplicationid;
                    req.param2 = this.userremarks;
                    req.param3 = this.typeofcorrection;
                    req.param4 = this.applicationregid;
                    req.param5 = this.applicationid;
                    req.json2 = this.new_draft_details_array;
                    this.spinner.show();
                    // req.type = '1009';
                    // req.param1 = this.applicationid;
                    // req.param2 = this.userremarks;
                    // req.param3 = this.typeofcorrection;
                    // req.json2 = this.new_draft_details_array;
                    this.spinner.show();
                    let rsdata: any = await this.auth.auth_pkgcrsstillbirth_service(req);
                    this.spinner.hide();
                    debugger
                    if (rsdata.code) {
                        if (rsdata.code && rsdata.Details[0].STATUS == '1') {
                            this.alt.toastsuccess(rsdata.Details[0].STATUS_TEXT + rsdata.Details[0].STATUS_TEXT_TEL);
                            setTimeout(() => {
                                window.location.reload();
                            }, 1000);
                        }
                        if (rsdata.code && rsdata.Details[0].STATUS == '0') {
                            this.alt.toasterror(rsdata.Details[0].STATUS_TEXT + rsdata.Details[0].STATUS_TEXT_TEL);
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
    typeofattention = false; childnameshow = false; childaadharshow = false; fatherfullname = false;
    fatheraadharnumber = false; motherfullname = false; motheraadhar = false; durationofpregency = false;
    causeoffoetaldeath = false;
    
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
    }
    Typeofattention_master_array: any[] = [];
    async get_Typeofattention(): Promise<void> {
        try {
            const req = new basemodel();
            req.type = '1015';
            req.param1 = "1";
            this.spinner.show();
            this.Typeofattention_master_array = [];
            let responce: any = await this.auth.auth_utilities_service(req);
            this.spinner.hide();
            if (responce.code) {
                this.Typeofattention_master_array = responce.Details;
            } else {
                this.Typeofattention_master_array = [];
                this.spinner.hide();
            }
        } catch (error) {
            this.spinner.hide();

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
    maskinput(objinput: string) {
        const maskedAadhaar = objinput.replace(/\d(?=\d{4})/g, '*');
        return maskedAadhaar !== '' ? maskedAadhaar : '';
    }
    async validateaadhaar(aadhaar: any, inputsource: any) {
        const checknumaric = this.val.isNumber(aadhaar);
        if (aadhaar.length === 12 && checknumaric == true) {
            const isValidAadhaar = this.mid.validateVerhoeff(aadhaar);
            if (isValidAadhaar == false) {

                if (inputsource == 'fatheraadhaar') {
                    this.new_draft_details_array.fatherInformation.new_father_aadhhar_number = '';
                    this.new_draft_details_array.fatherInformation.new_father_aadhhar_number_mask =
                        '';
                }
                if (inputsource == 'motheraadhaar') {
                    this.new_draft_details_array.motherInformation.new_mother_aadhhar_number = '';
                    this.new_draft_details_array.motherInformation.new_mother_aadhaar_number_mask =
                        '';
                }
                this.alt.toasterror('Enter a 12-digit Valid Aadhaar Number.');
            }
            if (isValidAadhaar == true) {

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
                    this.new_draft_details_array.motherInformation.new_mother_aadhhar_number =
                        this.new_draft_details_array.motherInformation.new_mother_aadhaar_number_mask;
                    this.new_draft_details_array.motherInformation.new_mother_aadhaar_number_mask =
                        this.maskinput(
                            this.new_draft_details_array.motherInformation
                                .new_mother_aadhaar_number_mask
                        );
                }

            }
            this.validateaadharchildparent(inputsource);
        } else if (aadhaar.length < 12) {

            if (inputsource == 'fatheraadhaar') {
                this.new_draft_details_array.fatherInformation.new_father_aadhhar_number = '';
                this.new_draft_details_array.fatherInformation.new_father_aadhhar_number_mask =
                    '';
            }
            if (inputsource == 'motheraadhaar') {
                this.new_draft_details_array.motherInformation.new_mother_aadhhar_number = '';
                this.new_draft_details_array.motherInformation.new_mother_aadhaar_number_mask =
                    '';
            }
            else {

                if (inputsource == 'fatheraadhaar') {
                    this.new_draft_details_array.fatherInformation.new_father_aadhhar_number = '';
                    this.new_draft_details_array.fatherInformation.new_father_aadhhar_number_mask =
                        '';
                }
                if (inputsource == 'motheraadhaar') {
                    this.new_draft_details_array.motherInformation.new_mother_aadhhar_number = '';
                    this.new_draft_details_array.motherInformation.new_mother_aadhaar_number_mask =
                        '';
                }
                this.alt.toasterror('Enter a 12-digit Aadhaar Number.');
            }
            return;
        }
    }
    validateaadharchildparent(inputsource: any) {

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

            if (this.new_draft_details_array.motherInformation.new_mother_aadhhar_number == this.new_draft_details_array.fatherInformation.new_father_aadhhar_number && !this.val.isEmpty(this.new_draft_details_array.fatherInformation.new_father_aadhhar_number_mask)) {
                this.new_draft_details_array.motherInformation.new_mother_aadhaar_number_mask = '';
                this.alt.toasterror('Mother Aadhaar Number and Father Aadhaar Number should not be same');
                return;
            }
            if (this.draft_details_array.information.Informant_aadhhar_no == this.new_draft_details_array.motherInformation.new_mother_aadhhar_number && !this.val.isEmpty(this.new_draft_details_array.motherInformation.new_mother_aadhaar_number_mask)) {
                this.draft_details_array.motherInformation.mother_aadhaar_number_mask = '';
                this.alt.toasterror('Mother Aadhaar Number and Information Aadhaar Number should not be same');
                return;
            }
        }


    }
    async changeaadhaarmode() {
        this.draft_details_array.childinformation.aadhaar = '';
        this.draft_details_array.childinformation.aadhaarmask = '';
    }

    //Common Functions
    suggestions: any;
    async Teluglanguageconvrt(inputkeyval: any, inputsource: any) {
        this.pscall.google_translate(inputkeyval).subscribe(
            (response: any) => {


                if (response[0] != '') // if (response[0] == 'SUCCESS')
                {
                    this.suggestions = response[0][0];//response[0][0][0]

                    if (inputsource == 'father_full_name') {
                        this.new_draft_details_array.fatherInformation.new_father_full_namer_t =
                            this.suggestions[0];
                    }
                    if (inputsource == 'father_full_name_tel') {
                        this.new_draft_details_array.fatherInformation.new_father_full_namer_t =
                            this.suggestions[0];
                    }
                    if (inputsource == 'father_middlename') {
                        this.new_draft_details_array.fatherInformation.new_father_middlename_t =
                            this.suggestions[0];
                    }
                    if (inputsource == 'father_middlename_t') {
                        this.new_draft_details_array.fatherInformation.new_father_middlename_t =
                            this.suggestions[0];
                    }

                    if (inputsource == 'father_surname') {
                        this.new_draft_details_array.fatherInformation.new_father_surname_t =
                            this.suggestions[0];
                    }
                    if (inputsource == 'father_surname_tel') {
                        this.new_draft_details_array.fatherInformation.new_father_surname_t =
                            this.suggestions[0];
                    }

                    if (inputsource == 'mother_full_name') {
                        this.new_draft_details_array.motherInformation.new_mother_full_namer_t =
                            this.suggestions[0];
                    }
                    if (inputsource == 'mother_full_name_tel') {
                        this.new_draft_details_array.motherInformation.new_mother_full_namer_t =
                            this.suggestions[0];
                    }
                    if (inputsource == 'mother_middle_name') {
                        this.new_draft_details_array.motherInformation.new_mother_middle_name_t =
                            this.suggestions[0];
                    }
                    if (inputsource == 'mother_middle_name_t') {
                        this.new_draft_details_array.motherInformation.new_mother_middle_name_t =
                            this.suggestions[0];
                    }
                    if (inputsource == 'mother_surname_name') {
                        this.new_draft_details_array.motherInformation.new_mother_surname_t =
                            this.suggestions[0];
                    }
                    if (inputsource == 'mother_surname_name_tel') {
                        this.new_draft_details_array.motherInformation.new_mother_surname_t =
                            this.suggestions[0];
                    }


                } else {
                    if (inputsource == 'father_full_name') {
                        this.new_draft_details_array.fatherInformation.new_father_full_namer_t = '';
                    }
                    if (inputsource == 'father_full_name_tel') {
                        this.new_draft_details_array.fatherInformation.new_father_full_namer_t = '';
                    }
                    if (inputsource == 'father_middlename') {
                        this.new_draft_details_array.fatherInformation.new_father_middlename_t = '';
                    }
                    if (inputsource == 'father_middlename_t') {
                        this.new_draft_details_array.fatherInformation.new_father_middlename_t = '';
                    }

                    if (inputsource == 'father_surname') {
                        this.new_draft_details_array.fatherInformation.new_father_surname_t = '';
                    }
                    if (inputsource == 'father_surname_tel') {
                        this.new_draft_details_array.fatherInformation.new_father_surname_t = '';
                    }
                    if (inputsource == 'mother_full_name') {
                        this.new_draft_details_array.motherInformation.new_mother_full_namer_t = '';
                    }
                    if (inputsource == 'mother_full_name_tel') {
                        this.draft_details_array.motherInformation.mother_full_namer_t = '';
                    }
                    if (inputsource == 'mother_middle_name') {
                        this.new_draft_details_array.motherInformation.new_mother_middle_name_t =
                            '';
                    }
                    if (inputsource == 'mother_middle_name_t') {
                        this.new_draft_details_array.motherInformation.new_mother_middle_name_t =
                            '';
                    }
                    if (inputsource == 'mother_surname_name') {
                        this.new_draft_details_array.motherInformation.new_mother_surname_t = '';
                    }
                    if (inputsource == 'mother_surname_name_tel') {
                        this.new_draft_details_array.motherInformation.new_mother_surname_t = '';
                    }

                }
            },
            (error) => {
                console.error('Error transliterating text:', error);
                return '';
            }
        );
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
        obj == 'placeofbirth' &&
        this.new_draft_details_array.placeofbirth.new_place_of_birth_state == ''
      ) {
        this.spinner.hide();
        this.PlaceofBirth_district_array = [];
        this.new_draft_details_array.placeofbirth.new_place_of_birth_state = '';
        this.alt.warning('select Place of Birth State');
        return;
      } else if (
        obj == 'staticstical' &&
        this.draft_details_array.legal.mother_residence_state == ''
      ) {
        this.spinner.hide();
        this.staticstical_district_array = [];
        this.new_draft_details_array.placeofbirth.new_place_of_birth_state = '';
        this.alt.warning('select State');
        return;
      } else { 
        if (obj == 'placeofbirth') {
          this.new_draft_details_array.placeofbirth.new_place_of_birth_district = '';
          this.new_draft_details_array.placeofbirth.new_place_of_birth_rural_urabn = '';
          this.statcode =
            this.new_draft_details_array.placeofbirth.new_place_of_birth_state;
        }
        if (obj == 'staticstical') {
          this.draft_details_array.legal.mother_residence_district = '';
          this.draft_details_array.legal.mother_residence_rural_urban = '';
          this.statcode = this.draft_details_array.legal.mother_residence_state;
        }
        try {
          this.Addressofparents_district_array = [];
          this.PlaceofBirth_district_array = [];
          this.Permanent_Addressofparents_district_array = [];
          const req = new basemodel();
          req.type = '1002';
          req.param1 = this.statcode;
          this.spinner.show();
          let responce: any = await this.auth.auth_utilities_service(req);
          this.spinner.hide();
  
          if (responce.code) {
            
            if (obj == 'placeofbirth') {
              this.PlaceofBirth_district_array = responce.Details;
            }
            if (obj == 'staticstical') {
              this.staticstical_district_array = responce.Details;
            }
          } else { 
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
        obj == 'placeofbirth' &&
        this.new_draft_details_array.placeofbirth.new_place_of_birth_district == ''
      ) {
        this.spinner.hide();
        this.placeofbirth_MandalMuncipality_array = [];
        this.new_draft_details_array.placeofbirth.new_place_of_birth_rural_urabn = '';
        this.alt.warning('select district');
        return;
      } else if (
        obj == 'staticstical' &&
        this.draft_details_array.legal.mother_residence_district == ''
      ) {
        this.spinner.hide();
        this.staticstical_MandalMuncipality_array = [];
        this.draft_details_array.legal.mother_residence_rural_urban = '';
        this.alt.warning('select district');
        return;
      } else {
        try {
         
          if (obj == 'placeofbirth') {
            this.new_draft_details_array.placeofbirth.new_place_of_birth_mmc = '';
            this.new_draft_details_array.placeofbirth.new_place_of_birth_village = '';
            this.Permanent_Addressofparents_MandalMuncipality_array = [];
            this.statcode =
              this.new_draft_details_array.placeofbirth.new_place_of_birth_state;
            this.district =
              this.new_draft_details_array.placeofbirth.new_place_of_birth_district;
            this.ruralurban =
              this.new_draft_details_array.placeofbirth.new_place_of_birth_rural_urabn;
          }
  
          if (obj == 'staticstical') {
            this.draft_details_array.legal.mother_residence_Mmc = '';
            this.draft_details_array.legal.mother_residence_Village = '';
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
            
            if (obj == 'placeofbirth') {
              this.placeofbirth_MandalMuncipality_array = responce.Details;
            }
            if (obj == 'staticstical') {
              this.staticstical_MandalMuncipality_array = responce.Details;
            }
          } else {
            
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
        obj == 'placeofbirth' &&
        this.new_draft_details_array.placeofbirth.new_place_of_birth_mmc == ''
      ) {
        this.spinner.hide();
        this.placeofbirth_village_ward_array = [];
        this.new_draft_details_array.placeofbirth.new_place_of_birth_village = '';
        this.alt.warning('select Mandal/Muncipality');
        return;
      } else if (
        obj == 'staticstical' &&
        this.draft_details_array.legal.mother_residence_Mmc == ''
      ) {
        this.spinner.hide();
        this.staticstical_village_ward_array = [];
        this.draft_details_array.legal.mother_residence_Village = '';
        this.alt.warning('select Mandal/Muncipality');
        return;
      } else {
        try {
           if (obj == 'placeofbirth') {
            this.draft_details_array.placeofbirth.place_of_birth_village = '';
            this.placeofbirth_village_ward_array = [];
            this.statcode =
              this.new_draft_details_array.placeofbirth.new_place_of_birth_state;
            this.district =
              this.new_draft_details_array.placeofbirth.new_place_of_birth_district;
            this.ruralurban =
              this.new_draft_details_array.placeofbirth.new_place_of_birth_rural_urabn;
            this.mandalmuncipality =
              this.new_draft_details_array.placeofbirth.new_place_of_birth_mmc;
          }
          if (obj == 'staticstical') {
            this.draft_details_array.legal.mother_residence_Village = '';
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
            
            if (obj == 'placeofbirth') {
              this.placeofbirth_village_ward_array = responce.Details;
            }
            if (obj == 'placeofbirth') {
              this.placeofbirth_village_ward_array = responce.Details;
            }
            if (obj == 'staticstical') {
              this.staticstical_village_ward_array = responce.Details;
            }
          } else {
           
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
    async Postalareas(obj: any): Promise<void> {
       if (
        obj == 'placeofbirth' &&
        this.new_draft_details_array.placeofbirth.new_place_of_birth_pin_code == '' &&
        this.new_draft_details_array.placeofbirth.new_place_of_birth_pin_code.length < 6
      ) {
        this.spinner.hide();
        this.placeofbirth_postal_array = [];
        this.new_draft_details_array.placeofbirth.new_Place_of_birth_postoff = '';
        this.alt.warning('enter 6 digits postal code');
        return;
      } else {
        try {
            if (obj == 'placeofbirth') {
            this.new_draft_details_array.placeofbirth.new_Place_of_birth_postoff = '';
            this.placeofbirth_postal_array = [];
            this.pincode =
              this.new_draft_details_array.placeofbirth.new_place_of_birth_pin_code;
          }
          const req = new basemodel();
          req.type = '1008';
          req.param1 = this.pincode;
          this.spinner.show();
          let responce: any = await this.auth.auth_utilities_service(req);
          this.spinner.hide();
          if (responce.code) {
  
           
            if (obj == 'placeofbirth') {
              this.placeofbirth_postal_array = responce.Details;
            }
          } else {
            
            if (obj == 'placeofbirth') {
              this.placeofbirth_postal_array = [];
            }
            this.spinner.hide();
          }
        } catch (error) {
          this.spinner.hide();
  
        }
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
}
