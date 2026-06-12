import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertsService } from 'src/app/services/alert_lyr/alerts.service';
import { EncDecService } from 'src/app/services/enc_dec_lyr/enc-dec.service';
import { basemodel } from 'src/app/thirparty/model/apimodel'; 
import { AuthserService } from 'src/app/services/api_lyr/private/authser.service';
import { InputvalidaionService } from 'src/app/thirparty/validation/inputvalidaion.service';
import { DomSanitizer } from '@angular/platform-browser';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-birthview',
  templateUrl: './birthview.component.html',
  styleUrl: './birthview.component.css'
})
export class BirthviewComponent  {
  @Input() applicationid: any;
  @Input() selecttab: any;
  @Input() typeofcorrection:any;
  @Input() table_card_sub_select:any;
  UROLE:any;
  showcheckbox=false;
  constructor(private spinner: NgxSpinnerService,
    private auth: AuthserService, private alt: AlertsService, 
    private encdc: EncDecService, private router: Router, private http: HttpClient,
      private val: InputvalidaionService,private sanitizer: DomSanitizer
  ) {  }
  ngOnInit() {
    
    if (sessionStorage.getItem('_Uenc') !== '') {
      let obj: any = this.encdc.Getuser();
      if (obj != '' && obj != undefined && obj != null) {
        this.UROLE=obj[0].UROLE;
        this.getdraft_details();
        
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
      selgendercheck:'0',
      selgenderremarks:'',
      fullnamecheck:'0',
      fullnameremarks:'',
      aadhaarcheck:'0',
      aadhaarremarks:'',
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
      father_full_namercheck:'0',
      father_full_namerremarks:'',
      father_aadhhar_numbercheck:'0',
      father_aadhhar_numberremarks:''
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
      mother_full_namercheck:'0',
      mother_full_namerremarks:'',
      mother_aadhhar_numbercheck:'0',
      mother_aadhhar_numberremarks:''
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
      addressof_parentscheck:'0',
      addressof_parentsremarks:''
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
      address_permenentcheck:'0',
      address_permenentremarks:''
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
      number_of_childrencheck:'0',
      number_of_childrenremark:'',
      type_of_attention_valcheck:'0',
      type_of_attention_valremarks:'',
      Methodofdeliverycheck:'0',
      Methodofdeliveryremarks:'',
      Birthweightcheck:'0',
      Birthweightremarks:'',
      DurationofPregnancycheck:'0',
      DurationofPregnancyremarks:''
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
  checkvaluedefult(){
    this.draft_details_array.childinformation.selgendercheck='0';
      this.draft_details_array.childinformation.selgenderremarks='';
      this.draft_details_array.childinformation.fullnamecheck='0';
      this.draft_details_array.childinformation.fullnameremarks='';
      this.draft_details_array.childinformation.aadhaarcheck='0';
      this.draft_details_array.childinformation.aadhaarremarks='';
      this.draft_details_array.fatherInformation.father_full_namercheck='0';
      this.draft_details_array.fatherInformation.father_full_namerremarks='';
      this.draft_details_array.fatherInformation.father_aadhhar_numbercheck='0';
      this.draft_details_array.fatherInformation.father_aadhhar_numberremarks='';
      this.draft_details_array.motherInformation.mother_full_namercheck='0';
      this.draft_details_array.motherInformation.mother_full_namerremarks='';
      this.draft_details_array.motherInformation.mother_aadhhar_numbercheck='0';
      this.draft_details_array.motherInformation.mother_aadhhar_numberremarks='';
      this.draft_details_array.addressof_parents.addressof_parentscheck='0';
      this.draft_details_array.addressof_parents.addressof_parentsremarks='';
      this.draft_details_array.Permanent_addressof_parents.address_permenentcheck='0';
      this.draft_details_array.Permanent_addressof_parents.address_permenentremarks='';
      this.draft_details_array.legal.number_of_childrencheck='0'
      this.draft_details_array.legal.number_of_childrenremark=''
      this.draft_details_array.legal.type_of_attention_valcheck='0'
      this.draft_details_array.legal.type_of_attention_valremarks=''
      this.draft_details_array.legal.Methodofdeliverycheck='0'
      this.draft_details_array.legal.Methodofdeliveryremarks=''
      this.draft_details_array.legal.Birthweightcheck='0'
      this.draft_details_array.legal.Birthweightremarks=''
      this.draft_details_array.legal.DurationofPregnancycheck='0'
      this.draft_details_array.legal.DurationofPregnancyremarks=''
  }
  async getdraft_details(): Promise<void> {
    try {
      
      let rsdata: any
      const req = new basemodel();
      this.spinner.show();
      req.type = '1002';
      req.param1 = this.applicationid;
      req.param2 = 'BIRTH';
      rsdata = await this.auth.auth_pkgcrsbirth_service(req);
      this.spinner.hide();
      if (rsdata.code) {
        if (rsdata.code && rsdata.Details[0].STATUS == '1') {
          
          this.draft_details_array = JSON.parse(rsdata.Details[0].JSON_RESULT);
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
        this.spinner.hide();
      }
    } catch (error) {
      this.spinner.hide();
     
    }
  }
  userremarks:any;
  async inbox_Approve(type:any): Promise<void> {
    if (this.val.isEmpty(this.userremarks)) {
      this.alt.toasterror('Enter remarks here / వ్యాఖ్యలను ఇక్కడ నమోదు చేయండి');
      return;
    } 
    else{
      try {
        try {
          const req = new basemodel();
          req.type = '1004';
          req.param1 = this.applicationid;
          req.param2 = this.userremarks;
          req.param3 = type;
          req.param4 = this.table_card_sub_select;
          this.spinner.show();
          let responce: any = await this.auth.auth_pkgcrsbirth_service(req);
          
          this.spinner.hide();
          debugger
          if (responce.code) {
            if (responce.Details[0].STATUS == '1') {
              this.alt.success(responce.Details[0].STATUS_TEXT);
              this.selectedCheckbox = new FormControl('');
              //this.downloadorder();
              setTimeout(() => {
                window.location.reload();
              }, 2000);
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
  selectedCheckbox = new FormControl('');

  onCheckboxChange(event:any,value: string) {
   if(event.target.checked){
    this.selectedCheckbox.setValue(value);
   }else{
    this.selectedCheckbox = new FormControl('');
   }
    
  }
  pdfdisplaymodal = 'none'; isModalVisible: boolean = false;
  closeModal() {
    this.isModalVisible = false;
    this.pdfdisplaymodal = 'none';
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  }
  PathReportString:any;
  async downloadorder() {
    try {

      const req = new basemodel();
      req.type = '1022';
      req.param1=this.applicationid
      req.param4 = 'birth';
      let responce: any = await this.auth.pdf_download(req);
      this.spinner.show();
      
      if (responce.code) {
        this.spinner.hide();
        if(responce.url){
          this.PathReportString = 'data:application/pdf;base64,' + (this.sanitizer.bypassSecurityTrustResourceUrl(responce.url) as any).changingThisBreaksApplicationSecurity;
          this.isModalVisible = true;
          this.pdfdisplaymodal = 'block';
        }
       
      } else {
        setTimeout(() => {
          window.location.reload();
        }, 2000);
        this.spinner.hide();
        this.alt.toasterror(responce.message+"No Download files Avalible");
        return;
      }
    } catch (error) {
      this.spinner.hide();
      this.alt.toasterror('something went wrong');
      return;
    }
  }
  async eSignwindow_open(){
    if (this.val.isEmpty(this.userremarks)) {
      this.alt.toasterror('Enter remarks here / వ్యాఖ్యలను ఇక్కడ నమోదు చేయండి');
      return;
    } 
    else{
      this.ModalOpen();
    }
    
  }
  isConfirmLegalEnabled=true;
  isConfirmStatisticalEnabled=false;
  enableConfirmStatisticalTab() {
    this.isConfirmStatisticalEnabled=true;
    //this.downloadorder();
    this.openTab('pills-confirmstatistic-tab');
    this.spinner.hide();
  }
  displaymodal = 'none';
  ModalCLose() {
    this.displaymodal = 'none';
  }
  ModalOpen() {
    this.displaymodal = 'block';
  }
  screentype='INBOX';
  openpayment(){
    this.screentype='PAYMENT';
  }
  pay(){
    //this.inbox_Approve();
    setTimeout(() => {
      this.ModalCLose();
      window.location.reload();
      this.screentype='INBOX';
    }, 2000)
  }
  modelchange(obj:any,type:any){
    switch (type) {
      case 'gender':
        if(obj.checked){
          this.draft_details_array.childinformation.selgendercheck='1';
        }else{
          this.draft_details_array.childinformation.selgendercheck='0';
        }
        break;

      case 'fullname':
        if(obj.checked){
          this.draft_details_array.childinformation.fullnamecheck='1';
        }else{
          this.draft_details_array.childinformation.fullnamecheck='0';
        }
        break;
      case 'aadhar':
        if(obj.checked){
          this.draft_details_array.childinformation.aadhaarcheck='1';
        }else{
          this.draft_details_array.childinformation.aadhaarcheck='0';
        }
        break;
      case 'fatherfullname':
        if(obj.checked){
          this.draft_details_array.fatherInformation.father_full_namercheck='1';
        }else{
          this.draft_details_array.fatherInformation.father_full_namercheck='0';
        }
        break;
      case 'fatheraadhar':
        if(obj.checked){
          this.draft_details_array.fatherInformation.father_aadhhar_numbercheck='1';
        }else{
          this.draft_details_array.fatherInformation.father_aadhhar_numbercheck='0';
        }
        break;
      case 'motherfullname':
        if(obj.checked){
          this.draft_details_array.motherInformation.mother_full_namercheck='1';
        }else{
          this.draft_details_array.motherInformation.mother_full_namercheck='0';
        }
        break;
      case 'motheraadhar':
        if(obj.checked){
          this.draft_details_array.motherInformation.mother_aadhhar_numbercheck='1';
        }else{
          this.draft_details_array.motherInformation.mother_aadhhar_numbercheck='0';
        }
        break;
      case 'addressofparents':
        if(obj.checked){
          this.draft_details_array.addressof_parents.addressof_parentscheck='1';
        }else{
          this.draft_details_array.addressof_parents.addressof_parentscheck='0';
        }
        break;
      case 'permanentaddress':
        if(obj.checked){
          this.draft_details_array.Permanent_addressof_parents.address_permenentcheck='1';
        }else{
          this.draft_details_array.Permanent_addressof_parents.address_permenentcheck='0';
        }
        break;
        case 'numberofchild':
        if(obj.checked){
          this.draft_details_array.legal.number_of_childrencheck='1';
        }else{
          this.draft_details_array.legal.number_of_childrencheck='0';
        }
        break;
        case 'Typeofattention':
        if(obj.checked){
          this.draft_details_array.legal.type_of_attention_valcheck='1';
        }else{
          this.draft_details_array.legal.type_of_attention_valcheck='0';
        }
        break;
        case 'Methodofdelivery':
        if(obj.checked){
          this.draft_details_array.legal.Methodofdeliverycheck='1';
        }else{
          this.draft_details_array.legal.Methodofdeliverycheck='0';
        }
        break;
        case 'Birthweight':
        if(obj.checked){
          this.draft_details_array.legal.Birthweightcheck='1';
        }else{
          this.draft_details_array.legal.Birthweightcheck='0';
        }
        break;
        case 'DurationofPregnancy':
        if(obj.checked){
          this.draft_details_array.legal.DurationofPregnancycheck='1';
        }else{
          this.draft_details_array.legal.DurationofPregnancycheck='0';
        }
        break;
      default:
        break;
    }
    
  }

  async inbox_Save(): Promise<void> {
        try {
          const req = new basemodel();
          req.type = '1008';
          req.param1 = this.applicationid;
          req.param5="Seek-Clarification";
          req.json2 = this.draft_details_array;
          this.spinner.show();
          let responce: any = await this.auth.auth_pkgcrsbirth_service(req);
          this.spinner.hide();
          
          if (responce.code) {
            if (responce.Details[0].STATUS == '1') {
              this.alt.success(responce.Details[0].STATUS_TEXT);
              setTimeout(() => {
                window.location.reload();
              }, 2000)
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

}

