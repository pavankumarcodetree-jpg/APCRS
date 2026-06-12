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
import { DomSanitizer } from '@angular/platform-browser';
import { PrivateService } from 'src/app/services/api_lyr/private/private.service';
import { MiddlewareService } from 'src/app/services/middleware_lyr/middleware.service';
import { NgModel } from '@angular/forms';
import Swal from 'sweetalert2';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';


@Component({
  selector: 'app-deathseekclarification',
  templateUrl: './deathseekclarification.component.html',
  styleUrl: './deathseekclarification.component.css'
})
export class DeathseekclarificationComponent {
  @Input() applicationid: any;
  @Input() selecttab: any;
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

  ngOnInit() {

    if (sessionStorage.getItem('_Uenc') !== '') {
      let obj: any = this.encdc.Getuser();
      if (obj != '' && obj != undefined && obj != null) {
        this.UROLE = obj[0].UROLE;
        this.RU_CODE = obj[0].RU_CODE;
        this.seekclarificationform_alert();
        this.getcorrectiondrop();
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
      Gendercheck: '0',
      FullNamecheck: '0',
      DateofBirthcheck: '0',
      agecheck: '0',

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
      aadhaarcheck: '0',

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
      father_full_namercheck: '0',
      father_aadhhar_numbercheck: '0',
      father_mobile_numbercheck: '0',
      father_email_numbercheck: '0',

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
      mother_full_namecheck: '0',
      mother_aadhhar_numbercheck: '0',
      mother_emailcheck: '0',
      mother_mobile_numbercheck: '0',

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
      MaritalStatuscheck: '0',
      Spouse_FullName_valcheck: '0',
      Spouse_AadharNumber_maskcheck: '0',
      Spouse_ContactDetails_EmailIdcheck: '0',
      Spouse_ContactDetails_Mobilenocheck: '0',


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
      addressof_parentscheck: '0',


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
      address_permenentcheck: '0',

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
    },
    OtherInformation: {
      new_medicalattention: '',
      new_medicalattention_val: '',
      new_causeofdeathmedicallycertified: '',
      new_nameofdiseaseoractualcauseofdeath: '',
      new_nameofdiseaseoractualcauseofdeath_val: '',
      new_habituallysmoke: 'No',
      new_habituallysmoke_years: '',
      new_chewtobacco: 'No',
      new_chewtobacco_years: '',
      new_chewarecanut: 'No',
      new_chewarecanut_years: '',
      new_drinkalcohol: 'No',
      new_drinkalcohol_years: '',
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
    }
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
      this.isConfirmStatisticalEnabled = true;
      tabButton.classList.add('active');
      tabContent.classList.add('show', 'active');
    }
  }
  async getdraft_details(): Promise<void> {
    try {
      const req = new basemodel();
      this.spinner.show();
      req.type = '1010';
      req.param1 = this.applicationid;
      req.param2 = 'DEATH';
      let rsdata: any = await this.auth.auth_pkgcrsdeath_service(req);

      this.spinner.hide();
      if (rsdata.code) {
        if (rsdata.code && rsdata.Details[0].STATUS == '1') {
          this.draft_details_array = JSON.parse(rsdata.Details[0].JSON_RESULT);
          await this.getclarification();
          await this.getstatedata();
          await this.getcountry();
          await this.getHospital();
          await this.getPlaceofDeath();
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

  isConfirmLegalEnabled = true;
  isConfirmStatisticalEnabled = false;
  enableConfirmLegalTab() {
    this.spinner.hide();
  }
  enableConfirmStatisticalTab() {
    this.openTab('pills-confirmdeathstatistic-tab');
    this.isConfirmStatisticalEnabled = true;
    this.spinner.hide();
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
        console.log('correction_master_array', this.correction_master_array);
      } else {
        this.correction_master_array = [];
        this.spinner.hide();
      }
    } catch (error) {
      this.spinner.hide();

    }
  }
  dateofdeathmax = new Date(); dateofdeathmin!: Date;
  confirmdateofdeathmax!: Date; confirmdateofdeathmin!: Date;dateofbirthdisable=false;
  onDateChange(event: any, type: any) {
    const formattedDate = this.datepipe.transform(event, 'dd-MM-yyyy');

    if (type == 'DateofBirth') {
      this.new_draft_details_array.Informationofthedeceased.new_DateofBirth =
        formattedDate || '';
        this.dateofbirthdisable=true;
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
    bsConfig: Partial<BsDatepickerModule> = {
      dateInputFormat: 'DD-MM-YYYY',
      isDisabled: false,
      startView: 'day',
      showWeekNumbers: false,
      containerClass: 'theme-blue',
      showClearButton: true,
    };
  gendershow = false; DateofBirthshow = false; ageshow = false; FullNameshow = false;
  aadhaarshow = false; mother_full_nameshow = false; mother_aadhhar_numbershow = false;
  father_full_namershow = false; father_aadhhar_numbershow = false; MaritalStatusshow = false;
  Spouse_FullName_valshow = false; Spouse_AadharNumber_maskshow = false;
  addressof_parentsshow = false; address_permenentshow = false; Typeofmedicalcheck = false;
  deathmedicallycheck = false; DiseaseorActualcheck = false; habituallysmokecheck = false;chewtobaccocheckval=false;
  chewarecanutcheck = false; drinkalcoholcheck = false;
  motheremail = false; mothermobilenumber = false; fatheremail = false; fathermobilenumber = false; spouseemail = false; spousemobilenumber = false;
  async getclarification() {

    if (this.draft_details_array.Informationofthedeceased.Gendercheck == '1') {
      this.gendershow = true;
      this.new_draft_details_array.Informationofthedeceased.Gendercheck='1';
    }
    if (this.draft_details_array.Informationofthedeceased.DateofBirthcheck == '1') {
      this.DateofBirthshow = true;
      this.new_draft_details_array.Informationofthedeceased.DateofBirthcheck='1';

    }
    // if (this.draft_details_array.Informationofthedeceased.agecheck == '1') {
    //   this.ageshow = true;
    //   this.new_draft_details_array.Informationofthedeceased.agecheck = '1';
    // }
    if (this.draft_details_array.Informationofthedeceased.FullNamecheck == '1') {
      this.FullNameshow = true;
      this.new_draft_details_array.Informationofthedeceased.FullNamecheck = '1';
    }
    if (this.draft_details_array.Confirmnameofthedeceased.aadhaarcheck == '1') {
      this.aadhaarshow = true;
      this.new_draft_details_array.Confirmnameofthedeceased.aadhaarcheck = '1';
    }
    if (this.draft_details_array.motherInformation.mother_full_namecheck == '1') {
      this.mother_full_nameshow = true;
      this.new_draft_details_array.motherInformation.mother_full_namecheck = '1';
    }
    if (this.draft_details_array.motherInformation.mother_aadhhar_numbercheck == '1') {
      this.mother_aadhhar_numbershow = true;
      this.new_draft_details_array.motherInformation.mother_aadhhar_numbercheck = '1';
    }
    if (this.draft_details_array.fatherInformation.father_full_namercheck == '1') {
      this.father_full_namershow = true;
      this.new_draft_details_array.fatherInformation.father_full_namercheck='1';
    }
    if (this.draft_details_array.fatherInformation.father_aadhhar_numbercheck == '1') {
      this.father_aadhhar_numbershow = true;
      this.new_draft_details_array.fatherInformation.father_aadhhar_numbercheck='1';
    }
    // if (this.draft_details_array.MaritalStatus.MaritalStatuscheck == '1') {
    //   this.MaritalStatusshow = true;
    //   this.new_draft_details_array.MaritalStatus.MaritalStatuscheck='1';

    // }
    if (this.draft_details_array.MaritalStatus.Spouse_FullName_valcheck == '1') {
      this.Spouse_FullName_valshow = true;
      this.new_draft_details_array.MaritalStatus.Spouse_FullName_valcheck = '1';
    }
    if (this.draft_details_array.MaritalStatus.Spouse_AadharNumber_maskcheck == '1') {
      this.Spouse_AadharNumber_maskshow = true;
      this.new_draft_details_array.MaritalStatus.Spouse_AadharNumber_maskcheck = '1';
    }
    if (this.draft_details_array.Addressofthedeceased.addressof_parentscheck == '1') {
      this.addressof_parentsshow = true;
      this.new_draft_details_array.Addressofthedeceased.addressof_parentscheck = '1';
    }
    if (this.draft_details_array.Permanentaddress.address_permenentcheck == '1') {
      this.address_permenentshow = true;
      this.new_draft_details_array.Permanentaddress.address_permenentcheck = '1';
    }
    if (this.draft_details_array.OtherInformation.Typeofmedicalcheck == '1') {
      this.Typeofmedicalcheck = true;
      this.new_draft_details_array.OtherInformation.Typeofmedicalcheck = '1';
    }
    if (this.draft_details_array.OtherInformation.deathmedicallycheck == '1') {
      this.deathmedicallycheck = true;
      this.new_draft_details_array.OtherInformation.deathmedicallycheck = '1';

    }
    if (this.draft_details_array.OtherInformation.DiseaseorActualcheck == '1') {
      this.DiseaseorActualcheck = true;
      this.new_draft_details_array.OtherInformation.DiseaseorActualcheck = '1';

    }
    if (this.draft_details_array.OtherInformation.habituallysmokecheck == '1') {
      this.habituallysmokecheck = true;
      this.new_draft_details_array.OtherInformation.DiseaseorActualcheck = '1';

    }
    if (this.draft_details_array.OtherInformation.chewtobaccocheck == '1') {
      this.chewtobaccocheckval = true;
      this.new_draft_details_array.OtherInformation.chewtobaccocheck = '1';

    }
    if (this.draft_details_array.OtherInformation.chewarecanutcheck == '1') {
      this.chewarecanutcheck = true;
      this.new_draft_details_array.OtherInformation.chewarecanutcheck = '1';

    }
    if (this.draft_details_array.OtherInformation.drinkalcoholcheck == '1') {
      this.drinkalcoholcheck = true;
      this.new_draft_details_array.OtherInformation.drinkalcoholcheck = '1';

    }
  }
  async changeaadhaarmode() {
    this.draft_details_array.Confirmnameofthedeceased.AadhaarEIDNumber = '';
    this.draft_details_array.Confirmnameofthedeceased.AadhaarEIDNumber_mask =
      '';
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
        address_permenentcheck: '0',
        new_permantaddressof : selectedValue,
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
      this.new_draft_details_array.Permanentaddress = {
        new_permantaddressof: selectedValue,
        new_addressof: this.draft_details_array.Addressofthedeceased.addressof,
        new_sameasaddress: selectedValue,
        new_Country: this.draft_details_array.Addressofthedeceased.Country,
        new_Country_val: '',
        new_address: this.draft_details_array.Addressofthedeceased.address,
        new_address_t: this.draft_details_array.Addressofthedeceased.address_t,
        new_State: this.draft_details_array.Addressofthedeceased.State,
        new_District: this.draft_details_array.Addressofthedeceased.District,
        new_UrbanRural: this.draft_details_array.Addressofthedeceased.UrbanRural,
        new_MandalMuncipality:
          this.draft_details_array.Addressofthedeceased.MandalMuncipality,
        new_VillageWard: this.draft_details_array.Addressofthedeceased.VillageWard,
        new_BuildingNo: this.draft_details_array.Addressofthedeceased.BuildingNo,
        new_BuildingNo_tel:
          this.draft_details_array.Addressofthedeceased.BuildingNo_tel,
        new_HouseNo: this.draft_details_array.Addressofthedeceased.HouseNo,
        new_HouseNo_tel: this.draft_details_array.Addressofthedeceased.HouseNo_tel,
        new_StreetName: this.draft_details_array.Addressofthedeceased.StreetName,
        new_StreetName_tel:
          this.draft_details_array.Addressofthedeceased.StreetName_tel,
        new_Locality: this.draft_details_array.Addressofthedeceased.Locality,
        new_Locality_tel:
          this.draft_details_array.Addressofthedeceased.Locality_tel,
        new_PINCode: this.draft_details_array.Addressofthedeceased.PINCode,
        new_PostOffice: this.draft_details_array.Addressofthedeceased.PostOffice,
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
        address_permenentcheck: '0',

      };
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
      address_permenentcheck: '0',
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

  keyPressAlpha(event: { keyCode: number; preventDefault: () => void }) {
    var inp = String.fromCharCode(event.keyCode);

    if (/[a-zA-Z ]/.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }
  async realvaluesgetdraft_details_array() {
    if (this.gendershow) {
      this.draft_details_array.Informationofthedeceased.Gender = this.new_draft_details_array.Informationofthedeceased.new_Gender;
    }
    if (this.DateofBirthshow) {
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
      this.draft_details_array.motherInformation.mother_aadhaar_number=this.new_draft_details_array.motherInformation.new_mother_aadhaar_number;
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
    if(this.Typeofmedicalcheck){
      this.draft_details_array.OtherInformation.medicalattention=this.new_draft_details_array.OtherInformation.new_medicalattention;
    }
    if(this.deathmedicallycheck){
      this.draft_details_array.OtherInformation.causeofdeathmedicallycertified=this.new_draft_details_array.OtherInformation.new_causeofdeathmedicallycertified;
      
    }
    if(this.DiseaseorActualcheck){
      if(this.new_draft_details_array.OtherInformation.new_causeofdeathmedicallycertified=='No'){
        this.draft_details_array.OtherInformation.nameofdiseaseoractualcauseofdeath=this.new_draft_details_array.OtherInformation.new_nameofdiseaseoractualcauseofdeath;
      }
    }
    if(this.habituallysmokecheck){
      this.draft_details_array.OtherInformation.habituallysmoke=this.new_draft_details_array.OtherInformation.new_habituallysmoke;
      if(this.new_draft_details_array.OtherInformation.new_habituallysmoke=='Yes'){
        this.draft_details_array.OtherInformation.habituallysmoke_years=this.new_draft_details_array.OtherInformation.new_habituallysmoke_years;
      }
    }
    if(this.chewtobaccocheckval){
      this.draft_details_array.OtherInformation.chewtobacco=this.new_draft_details_array.OtherInformation.new_chewtobacco;
      if(this.new_draft_details_array.OtherInformation.new_chewtobacco=='Yes'){
        this.draft_details_array.OtherInformation.chewtobacco_years=this.new_draft_details_array.OtherInformation.new_chewtobacco_years;
      }
    }
    if(this.chewarecanutcheck){
      this.draft_details_array.OtherInformation.chewarecanut=this.new_draft_details_array.OtherInformation.new_chewarecanut;
      if(this.new_draft_details_array.OtherInformation.new_chewarecanut=='Yes'){
        this.draft_details_array.OtherInformation.chewarecanut_years=this.new_draft_details_array.OtherInformation.new_chewarecanut_years;
      }
    }
    if(this.drinkalcoholcheck){
      this.draft_details_array.OtherInformation.drinkalcohol=this.new_draft_details_array.OtherInformation.new_drinkalcohol;
      if(this.new_draft_details_array.OtherInformation.new_drinkalcohol=='Yes'){
        this.draft_details_array.OtherInformation.drinkalcohol_years=this.new_draft_details_array.OtherInformation.new_drinkalcohol_years;
      }
    }
  }
  userremarks: any;
  async Application_final_submit(): Promise<void> {
    try {
      if (this.val.isEmpty(this.userremarks)) {
        this.alt.toasterror('Enter remarks here / వ్యాఖ్యలను ఇక్కడ నమోదు చేయండి');
        return;
      }
      else {
        await this.realvaluesgetdraft_details_array();
        const req = new basemodel();
        req.type = '1009';
        req.param1 = this.applicationid;
        req.param2 = this.userremarks;
        req.param3 = this.typeofcorrection;
        req.json2 = this.draft_details_array;
        this.spinner.show();
        let rsdata: any = await this.auth.auth_pkgcrsdeath_service(req);
        this.spinner.hide();
        if (rsdata.code) {
          if (rsdata.code && rsdata.Details[0].STATUS == '1') {
            this.alt.toastsuccess(rsdata.Details[0].STATUS_TEXT + rsdata.Details[0].STATUS_TEXT_TEL);
            this.ModalCLose();
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
    seekclarificationform_alert() {
        Swal.fire({
          //title: 'Please Confirm !దయచేసి నిర్ధారించండి !',
          text: 'Application is received for clarification, please check the fields which are marked in red / వివరణ కోసం దరఖాస్తు స్వీకరించబడింది, దయచేసి ఎరుపు రంగులో గుర్తించబడిన ఫీల్డ్‌లను తనిఖీ చేయండి',
          //showCancelButton: true,
          //cancelButtonText: 'Cancel',
          confirmButtonText: 'Close',
        }).then((result) => {
        
        });
      }
    
}
