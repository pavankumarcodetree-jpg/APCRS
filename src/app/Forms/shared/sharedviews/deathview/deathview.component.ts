import { DatePipe } from '@angular/common';
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
  selector: 'app-deathview',
  templateUrl: './deathview.component.html',
  styleUrl: './deathview.component.css'
})
export class DeathviewComponent   {
  @Input() applicationid: any;
  @Input() selecttab: any;
  @Input() typeofcorrection:any;
  @Input() table_card_sub_select:any;
  UROLE:any;
  showcheckbox=false;
  constructor(private spinner: NgxSpinnerService,
    private auth: AuthserService, private alt: AlertsService, private encdc: EncDecService, 
    private router: Router, private http: HttpClient,
     private val: InputvalidaionService,private sanitizer: DomSanitizer
  ) {  }
  
  ngOnInit() {
    
    if (sessionStorage.getItem('_Uenc') !== '') {
      let obj: any = this.encdc.Getuser();
      if (obj != '' && obj != undefined && obj != null) {
        this.UROLE=obj[0].UROLE;
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
      Gendercheck:'0',
      Genderremarks:'',
      FullNamecheck:'0',
      FullNameremarks:'',
      DateofBirthcheck:'0',
      DateofBirthremarks:'',
      agecheck:'0',
      ageremarks:''
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
      aadhaarcheck:'0',
      aadhaarremarks:''
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
      father_full_namercheck:'0',
      father_full_namerremarks:'',
      father_aadhhar_numbercheck:'0',
      father_aadhhar_numberremarks:''
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
      mother_full_namecheck:'0',
      mother_full_nameremarks:'',
      mother_aadhhar_numbercheck:'0',
      mother_aadhhar_numberremarks:''
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
      MaritalStatuscheck:'0',
      MaritalStatusremarks:'',
      Spouse_FullName_valcheck:'0',
      Spouse_FullName_valremarks:'',
      Spouse_AadharNumber_maskcheck:'0',
      Spouse_AadharNumber_maskremarks:''
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
      addressof_parentscheck:'0',
      addressof_parentsremarks:''
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
      address_permenentcheck:'0',
      address_permenentremarks:''
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
      Typeofmedicalcheck:'0',
      Typeofmedicalremarks:'',
      deathmedicallycheck:'0',
      deathmedicallyremarks:'',
      DiseaseorActualcheck:'0',
      DiseaseorActualremarks:'',
      habituallysmokecheck:'0',
      habituallysmokeremarks:'',
      chewtobaccocheck:'0',
      chewtobaccoremarks:'',
      chewarecanutcheck:'0',
      chewarecanutremarks:'',
      drinkalcoholcheck:'0',
      drinkalcoholremarks:'',
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
      this.isConfirmStatisticalEnabled=true;
      tabButton.classList.add('active');
      tabContent.classList.add('show', 'active');
    }
  }
  checkvaluedefult(){
    this.draft_details_array.Informationofthedeceased.Gendercheck='0';
      this.draft_details_array.Informationofthedeceased.Genderremarks='';
      this.draft_details_array.Informationofthedeceased.FullNamecheck='0';
      this.draft_details_array.Informationofthedeceased.FullNameremarks='';
      this.draft_details_array.Informationofthedeceased.DateofBirthcheck='0';
      this.draft_details_array.Informationofthedeceased.DateofBirthremarks='';
      this.draft_details_array.Informationofthedeceased.agecheck='0';
      this.draft_details_array.Informationofthedeceased.ageremarks='';
this.draft_details_array.Confirmnameofthedeceased.aadhaarcheck='0';
      this.draft_details_array.Confirmnameofthedeceased.aadhaarremarks=''
this.draft_details_array.fatherInformation.father_full_namercheck='0';
      this.draft_details_array.fatherInformation.father_full_namerremarks='';
      this.draft_details_array.fatherInformation.father_aadhhar_numbercheck='0';
      this.draft_details_array.fatherInformation.father_aadhhar_numberremarks='';
this.draft_details_array.motherInformation.mother_full_namecheck='0';
      this.draft_details_array.motherInformation.mother_full_nameremarks='';
      this.draft_details_array.motherInformation.mother_aadhhar_numbercheck='0';
      this.draft_details_array.motherInformation.mother_aadhhar_numberremarks='';
this.draft_details_array.MaritalStatus.MaritalStatuscheck='0';
      this.draft_details_array.MaritalStatus.MaritalStatusremarks='';
      this.draft_details_array.MaritalStatus.Spouse_FullName_valcheck='0';
      this.draft_details_array.MaritalStatus.Spouse_FullName_valremarks='';
      this.draft_details_array.MaritalStatus.Spouse_AadharNumber_maskcheck='0';
      this.draft_details_array.MaritalStatus.Spouse_AadharNumber_maskremarks='';
this.draft_details_array.Addressofthedeceased.addressof_parentscheck='0';
      this.draft_details_array.Addressofthedeceased.addressof_parentsremarks='';
this.draft_details_array.Permanentaddress.address_permenentcheck='0';
      this.draft_details_array.Permanentaddress.address_permenentremarks='';
      this.draft_details_array.OtherInformation.Typeofmedicalcheck='0'
      this.draft_details_array.OtherInformation.Typeofmedicalremarks=''
      this.draft_details_array.OtherInformation.deathmedicallycheck='0'
      this.draft_details_array.OtherInformation.deathmedicallyremarks=''
      this.draft_details_array.OtherInformation.DiseaseorActualcheck='0'
      this.draft_details_array.OtherInformation.DiseaseorActualremarks=''
      this.draft_details_array.OtherInformation.habituallysmokecheck='0'
      this.draft_details_array.OtherInformation.habituallysmokeremarks=''
      this.draft_details_array.OtherInformation.chewtobaccocheck='0'
      this.draft_details_array.OtherInformation.chewtobaccoremarks=''
      this.draft_details_array.OtherInformation.chewarecanutcheck='0'
      this.draft_details_array.OtherInformation.chewarecanutremarks=''
      this.draft_details_array.OtherInformation.drinkalcoholcheck='0'
      this.draft_details_array.OtherInformation.drinkalcoholremarks=''
  }
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
 
  isConfirmLegalEnabled=true;
  isConfirmStatisticalEnabled=false;
  enableConfirmLegalTab() {
    this.spinner.hide();
  }
  enableConfirmStatisticalTab() {
    this.openTab('pills-confirmdeathstatistic-tab');
    this.isConfirmStatisticalEnabled = true;
    this.spinner.hide();
  }

  userremarks:any;
  selectedCheckbox = new FormControl('');

  onCheckboxChange(event:any,value: string) {
   if(event.target.checked){
    this.selectedCheckbox.setValue(value);
   }else{
    this.selectedCheckbox = new FormControl('');
   }
    
  }

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
          let responce: any = await this.auth.auth_pkgcrsdeath_service(req);
          this.spinner.hide();
          debugger
          if (responce.code) {
            if (responce.Details[0].STATUS == '1') {
              this.alt.success(responce.Details[0].STATUS_TEXT);
              this.selectedCheckbox = new FormControl('');
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
  PathReportString:any;
  async downloadorder() {
    try {

      const req = new basemodel();
      req.type = '1022';
      req.param1=this.applicationid
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
  async eSignwindow_open(){
    if (this.val.isEmpty(this.userremarks)) {
      this.alt.toasterror('Enter remarks here / వ్యాఖ్యలను ఇక్కడ నమోదు చేయండి');
      return;
    } 
    else{
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
  modelchange(obj:any,type:any){
    switch (type) {
      case 'gender':
        if(obj.checked){
          this.draft_details_array.Informationofthedeceased.Gendercheck='1';
        }else{
          this.draft_details_array.Informationofthedeceased.Gendercheck='0';
        }
        break;

      case 'fullname':
        if(obj.checked){
          this.draft_details_array.Informationofthedeceased.FullNamecheck='1';
        }else{
          this.draft_details_array.Informationofthedeceased.FullNamecheck='0';
        }
        break;
      case 'dateofbirth':
          if(obj.checked){
            this.draft_details_array.Informationofthedeceased.DateofBirthcheck='1';
          }else{
            this.draft_details_array.Informationofthedeceased.DateofBirthcheck='0';
          }
          break;  
      // case 'age':
      //     if(obj.checked){
      //       this.draft_details_array.Informationofthedeceased.agecheck='1';
      //     }else{
      //       this.draft_details_array.Informationofthedeceased.agecheck='0';
      //     }
      //     break;  
      case 'aadhar':
        if(obj.checked){
          this.draft_details_array.Confirmnameofthedeceased.aadhaarcheck='1';
        }else{
          this.draft_details_array.Confirmnameofthedeceased.aadhaarcheck='0';
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
          this.draft_details_array.motherInformation.mother_full_namecheck='1';
        }else{
          this.draft_details_array.motherInformation.mother_full_namecheck='0';
        }
        break;
      case 'motheraadhar':
        if(obj.checked){
          this.draft_details_array.motherInformation.mother_aadhhar_numbercheck='1';
        }else{
          this.draft_details_array.motherInformation.mother_aadhhar_numbercheck='0';
        }
        break;
      // case 'MaritalStatus':
      //   if(obj.checked){
      //     this.draft_details_array.MaritalStatus.MaritalStatuscheck='1';
      //   }else{
      //     this.draft_details_array.MaritalStatus.MaritalStatuscheck='0';
      //   }
      //   break;
      case 'spousefullname':
        if(obj.checked){
          this.draft_details_array.MaritalStatus.Spouse_FullName_valcheck='1';
        }else{
          this.draft_details_array.MaritalStatus.Spouse_FullName_valcheck='0';
        }
        break;
      case 'spouseaadhar':
        if(obj.checked){
          this.draft_details_array.MaritalStatus.Spouse_AadharNumber_maskcheck='1';
        }else{
          this.draft_details_array.MaritalStatus.Spouse_AadharNumber_maskcheck='0';
        }
        break;
      case 'addressofparents':
        if(obj.checked){
          this.draft_details_array.Addressofthedeceased.addressof_parentscheck='1';
        }else{
          this.draft_details_array.Addressofthedeceased.addressof_parentscheck='0';
        }
        break;
      case 'permanentaddress':
        if(obj.checked){
          this.draft_details_array.Permanentaddress.address_permenentcheck='1';
        }else{
          this.draft_details_array.Permanentaddress.address_permenentcheck='0';
        }
        break;
      case 'Typeofmedical':
        if(obj.checked){
          this.draft_details_array.OtherInformation.Typeofmedicalcheck='1';
        }else{
          this.draft_details_array.OtherInformation.Typeofmedicalcheck='0';
        }
        break;
        case 'drinkalcohol':
        if(obj.checked){
          this.draft_details_array.OtherInformation.drinkalcoholcheck='1';
        }else{
          this.draft_details_array.OtherInformation.drinkalcoholcheck='0';
        }
        break;
        case 'chewarecanut':
        if(obj.checked){
          this.draft_details_array.OtherInformation.chewarecanutcheck='1';
        }else{
          this.draft_details_array.OtherInformation.chewarecanutcheck='0';
        }
        break;
        case 'chewtobacco':
        if(obj.checked){
          this.draft_details_array.OtherInformation.chewtobaccocheck='1';
        }else{
          this.draft_details_array.OtherInformation.chewtobaccocheck='0';
        }
        break;
        case 'habituallysmoke':
        if(obj.checked){
          this.draft_details_array.OtherInformation.habituallysmokecheck='1';
        }else{
          this.draft_details_array.OtherInformation.habituallysmokecheck='0';
        }
        break;
        case 'DiseaseorActual':
        if(obj.checked){
          this.draft_details_array.OtherInformation.DiseaseorActualcheck='1';
        }else{
          this.draft_details_array.OtherInformation.DiseaseorActualcheck='0';
        }
        break;
        case 'deathmedically':
        if(obj.checked){
          this.draft_details_array.OtherInformation.deathmedicallycheck='1';
        }else{
          this.draft_details_array.OtherInformation.deathmedicallycheck='0';
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
      let responce: any = await this.auth.auth_pkgcrsdeath_service(req);
      this.spinner.hide();
      debugger
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


