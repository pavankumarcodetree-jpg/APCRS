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

@Component({
  selector: 'app-stillbirthclarification',
  templateUrl: './stillbirthclarification.component.html',
  styleUrl: './stillbirthclarification.component.css'
})
export class StillbirthclarificationComponent {
  @Input() applicationid: any;
  @Input() selecttab: any;
  @Input() typeofcorrection: any;
  @Input() applicationregid: any;

  selectedstillbirth: any[] = [];
  constructor(private spinner: NgxSpinnerService,
    private auth: AuthserService, private alt: AlertsService, private encdc: EncDecService, private router: Router, private http: HttpClient
    , private val: InputvalidaionService, private sanitizer: DomSanitizer, private mid: MiddlewareService, private pscall: PrivateService,
  ) {
  }
  async ngOnInit() {

    if (sessionStorage.getItem('_Uenc') !== '') {
      let obj: any = this.encdc.Getuser();
      if (obj != '' && obj != undefined && obj != null) {
        await this.get_nameofdisease();
        await this.get_Typeofattention();
        await this.getdraft_details();
        await this.getclarification();
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
      new_father_middlename: '',
      new_father_middlename_t: '',
      new_father_surname_val: '',
      new_father_aadhhar_number_mask: '',
      new_father_aadhhar_number: '',
      father_full_namercheck: '0',
      father_aadhhar_numbercheck: '0',
    },
    motherInformation: {

      new_mother_full_namer: '',
      new_mother_full_namer_t: '',
      new_mother_full_namer_val: '',
      new_mother_surname: '',
      new_mother_surname_t: '',
      new_mother_middle_name: '',
      new_mother_middle_name_t: '',
      new_mother_surname_val: '',
      new_mother_aadhhar_number: '',
      new_mother_aadhaar_number_mask: '',
      new_mothername_value: '',
      mother_full_namercheck: '0',
      mother_aadhhar_numbercheck: '0',
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
    if (!this.validationforinputs()) {
      this.isConfirmStatisticalEnabled = true;
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
  ;

  validationforinputs() {
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
      req.param1 = this.applicationid;
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

  userremarks: any;
  async Application_final_submit(): Promise<void> {
    if (!this.validationforinputs()) {
      try {
        if (this.val.isEmpty(this.userremarks)) {
          this.alt.toasterror('Enter remarks here / వ్యాఖ్యలను ఇక్కడ నమోదు చేయండి');
          return;
        }
        else {
          const req = new basemodel();
          req.type = '1009';
          req.param1 = this.applicationid;
          req.param2 = this.userremarks;
          req.param3 = this.typeofcorrection;
          req.json2 = this.new_draft_details_array;
          this.spinner.show();
          let rsdata: any = await this.auth.auth_pkgcrsstillbirth_service(req);
          this.spinner.hide();
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

  typeofattention = false; childnameshow = false; childaadharshow = false; fatherfullname = false;
  fatheraadharnumber = false; motherfullname = false; motheraadhar = false; durationofpregency = false;
  causeoffoetaldeath = false;
  async getclarification() {

    if (this.draft_details_array.childinformation.selgendercheck == '1') {
      this.new_draft_details_array.childinformation.selgendercheck = '1';
      this.gendershow = true;
    }
    if (this.draft_details_array.fatherInformation.father_full_namercheck == '1') {
      this.new_draft_details_array.fatherInformation.father_full_namercheck = '1';
      this.fatherfullname = true;
    }
    if (this.draft_details_array.fatherInformation.father_aadhhar_numbercheck == '1') {
      this.new_draft_details_array.fatherInformation.father_aadhhar_numbercheck = '1';
      this.fatheraadharnumber = true;
    }
    if (this.draft_details_array.motherInformation.mother_full_namercheck == '1') {
      this.new_draft_details_array.motherInformation.mother_full_namercheck = '1';
      this.motherfullname = true;
    }
    if (this.draft_details_array.motherInformation.mother_aadhhar_numbercheck == '1') {
      this.new_draft_details_array.motherInformation.mother_aadhhar_numbercheck = '1';
      this.motheraadhar = true;
    }
    if (this.draft_details_array.legal.type_of_attention_valcheck == '1') {
      this.new_draft_details_array.motherInformation.mother_full_namercheck = '1';
      this.typeofattention = true;
    }

    if (this.draft_details_array.legal.DurationofPregnancycheck == '1') {
      this.new_draft_details_array.legal.DurationofPregnancycheck = '1';
      this.durationofpregency = true;
    }
    if (this.draft_details_array.legal.causeoffoetaldeathcheck == '1') {
      this.new_draft_details_array.legal.causeoffoetaldeathcheck = '1';
      this.causeoffoetaldeath = true;
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
}
