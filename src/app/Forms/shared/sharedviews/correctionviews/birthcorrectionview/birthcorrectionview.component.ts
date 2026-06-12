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
import { MultiSelect } from 'primeng/multiselect';
import { PrivateService } from 'src/app/services/api_lyr/private/private.service';
import { NgModel } from '@angular/forms';
import { MiddlewareService } from 'src/app/services/middleware_lyr/middleware.service';
import Swal from 'sweetalert2';
declare var Fancybox: any;

@Component({
  selector: 'app-birthcorrectionview',
  templateUrl: './birthcorrectionview.component.html',
  styleUrl: './birthcorrectionview.component.css'
})
export class BirthcorrectionviewComponent {
  @Input() applicationid: any;
  @Input() selecttab: any;
  @Input() typeofcorrection: any;
  @Input() applicationregid: any;
  contentuploadurl = '';
  contentshowurl = '';
  UROLE: any;
  showcheckbox = false;
  constructor(private spinner: NgxSpinnerService,
    private auth: AuthserService, private alt: AlertsService,
    private encdc: EncDecService, private router: Router, private http: HttpClient,
    private val: InputvalidaionService, private sanitizer: DomSanitizer, private pscall: PrivateService, private mid: MiddlewareService,
    private httpClient: HttpClient,
  ) {
    this.contentuploadurl = this.mid.globalsetting.api_url_conent_upload;
    this.contentshowurl = mid.globalsetting.api_url_conent_show;
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
  RU_CODE: any;
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
        if (this.typeofcorrection == 'Cancellation' || this.typeofcorrection == 'Cancellation') {
          this.cancelform_alert();
        }
        await this.getstatedata();
        await this.getPlaceofBirth();
        await this.getcountry();
        await this.getHospital();
        await this.getdraft_details();
        await this.getdraft();
        await this.getcorrectiondrop();

      } else {
        this.encdc.Usersessionkill();
      }
    }
    else {
      this.encdc.Usersessionkill();
      this.router.navigate(['/Sessionexpired']);
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
      addressof_parentscheck: '0',
      addressof_parentsremarks: '',
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
      address_permenentcheck: '0',
      address_permenentremarks: '',

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
      number_of_childrenremark: '',
      type_of_attention_valcheck: '0',
      type_of_attention_valremarks: '',
      Methodofdeliverycheck: '0',
      Methodofdeliveryremarks: '',
      Birthweightcheck: '0',
      Birthweightremarks: '',
      DurationofPregnancycheck: '0',
      DurationofPregnancyremarks: '',

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
      new_selaadhar: '',
      new_aadhaarmask: '',
      new_aadhaar: '',
      new_fullname: '',
      new_fullname_t: '',
      new_fullname_val: '',
      new_surname: '',
      new_surname_t: '',
      new_middlename: '',
      new_middlename_t: '',
      new_surname_val: '',
      new_confirm_fullname: '',
      new_confirm_fullname_t: '',
      new_confirm_fullname_val: '',
      new_confirm_surname: '',
      new_confirm_surname_t: '',
      new_confirm_surname_val: '',
      new_childname_value: '',
      new_confirm_middle: '',
      new_confirm_middle_t: '',
      selgendercheck: '0',
      fullnamecheck: '0',
      aadhaarcheck: '0',
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
    addressof_parents: {
      new_addressof: '',
      new_address_parent_country: '',
      new_address_parent_country_val: '',
      new_address_parent_country_address: '',
      new_address_parent_country_address_t: '',
      new_address_parent_country_address_val: '',
      new_address_parent_state: '',
      new_address_parent_state_val: '',
      new_address_parent_district: '',
      new_address_parent_district_val: '',
      new_address_parent_rural_urabn: '',
      new_address_parent_rural_urabn_val: '',
      new_address_parent_mmc: '',
      new_address_parent_mmc_val: '',
      new_address_parent_Village_Town: '',
      new_address_parent_Village_Town_val: '',
      new_address_parent_pincode: '',
      new_address_parent_building_name: '',
      new_address_parent_building_name_t: '',
      new_address_parent_building_name_val: '',
      new_address_parent_house_no: '',
      new_address_parent_house_no_t: '',
      new_address_parent_house_no_val: '',
      new_address_parent_street_name: '',
      new_address_parent_street_name_t: '',
      new_address_parent_street_name_val: '',
      new_address_parent_locality: '',
      new_address_parent_locality_t: '',
      new_address_parent_postoff: '',
      new_address_parent_postoff_val: '',
      new_addressof_parents_value: '',
      addressof_parentscheck: '0',
    },
    Permanent_addressof_parents: {
      new_address_parent_sameasaddress: '',
      new_address_parent_addressof: '',
      new_address_parent_permenent_country: '',
      new_address_parent_permenent_country_val: '',
      new_address_parent_permenent_country_address: '',
      new_address_parent_permenent_country_address_t: '',
      new_address_parent_permenent_country_address_val: '',
      new_address_parent_permenent_state: '',
      new_address_parent_permenent_state_val: '',
      new_address_parent_permenent_district: '',
      new_address_parent_permenent_district_val: '',
      new_address_parent_permenent_mmc: '',
      new_address_parent_permenent_mmc_val: '',
      new_address_parent_permenent_rural_urabn: '',
      new_address_parent_permenent_rural_urabn_val: '',
      new_address_parent_permenent_village: '',
      new_address_parent_permenent_village_val: '',
      new_address_parent_permenent_pincode: '',
      new_address_parent_permenent_building_no: '',
      new_address_parent_permenent_building_no_t: '',
      new_address_parent_permenent_building_no_val: '',
      new_address_parent_permenent_hose_no: '',
      new_address_parent_permenent_hose_no_t: '',
      new_address_parent_permenent_hose_no_val: '',
      new_address_parent_permenent_street_name: '',
      new_address_parent_permenent_street_name_t: '',
      new_address_parent_permenent_street_name_val: '',
      new_address_parent_permenent_locality: '',
      new_address_parent_permenent_locality_t: '',
      new_address_parent_permenent_locality_post_office_val: '',
      new_address_permenent_postoff: '',
      new_address_permenent_postoff_val: '',
      address_permenentcheck: '0',
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
      new_method_of_delivery: '',
      new_method_of_delivery_val: '',
      new_duration_of_pregency: '',
      new_birth_weight: '',
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
      req.type = '1015';
      req.param1 = this.applicationregid;
      req.param2 = 'BIRTH';
      rsdata = await this.auth.auth_pkgcrsbirth_service(req);
      this.spinner.hide();
      debugger
      if (rsdata.code) {
        if (rsdata.code && rsdata.Details[0].STATUS == '1') {
          this.draft_details_array = this.replaceNullWithEmptyString(JSON.parse(rsdata.Details[0].JSON_RESULT));
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
  keyPressAlpha(event: { keyCode: number; preventDefault: () => void }) {
    var inp = String.fromCharCode(event.keyCode);

    if (/[a-zA-Z ]/.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }
  PathReportString: any;
  async downloadorder() {
    try {

      const req = new basemodel();
      req.type = '1022';
      req.param1 = this.applicationid
      req.param4 = 'birth';
      let responce: any = await this.auth.pdf_download(req);
      if (responce.code) {
        this.PathReportString = 'data:application/pdf;base64,' + (this.sanitizer.bypassSecurityTrustResourceUrl(responce.url) as any).changingThisBreaksApplicationSecurity;
        document.getElementById('ifrm')?.setAttribute("src", this.PathReportString);
      } else {
        this.alt.toasterror('No Orders found.');
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
  //Uploads
  photoselectedFiles: File[] = [];
  photoPreviews: { file: File, discription: string, url: SafeResourceUrl, type: 'image' | 'pdf' | 'other' }[] = [];

  fileupload(event: any) {

    const files: File[] = event.target.files;
    const selectedFile = files[0];
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
  getFileType(fileName: string): 'image' | 'pdf' | 'other' {
    const ext = fileName.toLowerCase().split('.').pop();
    if (['png', 'jpg', 'jpeg'].includes(ext!)) return 'image';
    if (ext === 'pdf') return 'pdf';
    return 'other';
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
  getFilePreview(file: File): string {
    return URL.createObjectURL(file);
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
      req.param8 = this.applicationregid;
      req.param9 = this.applicationid;
      this.spinner.show();
      let rsdata: any = await this.auth.auth_pkgcrsbirth_service(req);
      this.spinner.hide();
      debugger
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
  isConfirmLegalEnabled = true;
  isConfirmStatisticalEnabled = false;
  enableConfirmStatisticalTab() {
    if(this.typeofcorrection=='Correction'){
    if (!this.validationforinputs()) {
      this.isConfirmStatisticalEnabled = true;
      this.get_MethodofDelivery();
      this.get_Typeofattention();
      this.openTab('pills-confirmstatistic-tab');
      this.get_AdditionalSupportingDocuments();
      this.spinner.hide();
    }
  }else{
    this.isConfirmStatisticalEnabled = true;
    this.get_MethodofDelivery();
    this.get_Typeofattention();
    this.openTab('pills-confirmstatistic-tab');
    this.get_AdditionalSupportingDocuments();
    this.spinner.hide();
  }
  }
  @ViewChild('ngfullname') ngfullname!: NgModel;
  @ViewChild('Surname') Surname!: NgModel;
  @ViewChild('Confirm_surname') Confirm_surname!: NgModel;
  @ViewChild('foc_fullname', { static: false }) foc_fullname!: ElementRef;

  @ViewChild('surname_lastname', { static: false }) surname_lastname!: ElementRef;
  @ViewChild('ngConfirm_fullname') ngConfirm_fullname!: NgModel;
  @ViewChild('foc_confirm_fullname', { static: false }) foc_confirm_fullname!: ElementRef;
  @ViewChild('sel_gender') sel_gender!: NgModel;
  @ViewChild('foc_sel_gender', { static: false }) foc_sel_gender!: ElementRef;
  @ViewChild('sel_aadhar') sel_aadhar!: NgModel;

  @ViewChild('Father__full_namer') Father__full_namer!: NgModel;
  @ViewChild('Father_surname') Father_surname!: NgModel;
  @ViewChild('Father_email_number') Father_email_number!: NgModel;
  @ViewChild('foc_Father_email_number', { static: false }) foc_Father_email_number!: ElementRef;
  @ViewChild('Father_mobile_number') Father_mobile_number!: NgModel;
  @ViewChild('foc_Father_mobile_number', { static: false }) foc_Father_mobile_number!: ElementRef;
  @ViewChild('Father_aadhhar_number') Father_aadhhar_number!: NgModel;
  @ViewChild('Mother_full_name') Mother_full_name!: NgModel;
  @ViewChild('Mother_surname_name') Mother_surname_name!: NgModel;
  @ViewChild('Mother_email') Mother_email!: NgModel;
  @ViewChild('Mother_mobile_number') Mother_mobile_number!: NgModel;
  @ViewChild('Mother_aadhaar_no') Mother_aadhaar_no!: NgModel;
  @ViewChild('Place_of_birth') Place_of_birth!: NgModel;
  @ViewChild('ngHospitalName') ngHospitalName!: NgModel;
  @ViewChild('Place_of_birth_state') Place_of_birth_state!: NgModel;
  @ViewChild('Place_of_birth_district') Place_of_birth_district!: NgModel;
  @ViewChild('Place_of_birth_sub_district') Place_of_birth_sub_district!: NgModel;
  @ViewChild('place_of_birth_mmc') place_of_birth_mmc!: NgModel;

  @ViewChild('ngaddress_parent_country') ngaddress_parent_country!: NgModel;
  @ViewChild('Address_parent_state') Address_parent_state!: NgModel;
  @ViewChild('Address_parent_district') Address_parent_district!: NgModel;
  @ViewChild('address_parent_rural_urabn') address_parent_rural_urabn!: NgModel;
  @ViewChild('address_parent_mmc') address_parent_mmc!: NgModel;
   @ViewChild('Address_parent_Village_Town') Address_parent_Village_Town!: NgModel;  
   
   @ViewChild('ngaddress_parent_permenent_country') ngaddress_parent_permenent_country!: NgModel;
  @ViewChild('Address_parent_permenent_state') Address_parent_permenent_state!: NgModel;
  @ViewChild('Address_parent_permenent_district') Address_parent_permenent_district!: NgModel;
  @ViewChild('Address_parent_permenent_sub_district') Address_parent_permenent_sub_district!: NgModel;
  @ViewChild('address_parent_permenent_mmc') address_parent_permenent_mmc!: NgModel;
   @ViewChild('Address_parent_permenent_village') Address_parent_permenent_village!: NgModel;
  validationforinputs() {
    debugger
    let isInvalid = false;
    let tostervalue = "";
    switch (this.typeofcorrection) {
      case 'Correction':
        if(this.selectedbirth.length>0){
        if(this.gendershow){
          if (this.sel_gender) {
            this.sel_gender.control.markAsTouched();
            this.sel_gender.control.updateValueAndValidity();
           // this.foc_sel_gender.nativeElement.focus();
            if (this.sel_gender.invalid) {
              isInvalid = true;
              tostervalue = "Please Select Child Gender Drop Down";
            }
          }
        }
        if (this.childnameshow) {

          if (this.ngfullname) {
            this.ngfullname.control.markAsTouched();
            this.ngfullname.control.updateValueAndValidity();
            this.foc_fullname.nativeElement.focus();
            if (this.ngfullname.invalid) {
              isInvalid = true;
              tostervalue = "Please Enter Child First Name";
            }
          }
          if (this.Surname) {
            this.Surname.control.markAsTouched();
            this.Surname.control.updateValueAndValidity();
            this.surname_lastname.nativeElement.focus();
            if (this.Surname.invalid) {
              isInvalid = true;
              tostervalue = "Please Enter Child Last Name";
            }
          }
          if (
            this.new_draft_details_array.childinformation.new_fullname.toUpperCase() !=
            this.new_draft_details_array.childinformation.new_confirm_fullname.toUpperCase()
          ) {
            this.ngfullname.control.markAsTouched();
            this.ngfullname.control.updateValueAndValidity();
            this.ngConfirm_fullname.control.markAsTouched();
            this.ngConfirm_fullname.control.updateValueAndValidity();
            this.ngfullname.control.setErrors({ mismatch: true });
            this.ngConfirm_fullname.control.setErrors({ mismatch: true });
            this.foc_confirm_fullname.nativeElement.focus();
            tostervalue = "Child First Name and Confim Name Missmach";
            isInvalid = true;
            //this.alt.toasterror('Child First Name and Confim Name Missmach')
          }
          if (
            this.new_draft_details_array.childinformation.new_surname.toUpperCase() !=
            this.new_draft_details_array.childinformation.new_confirm_surname.toUpperCase()
          ) {
            this.Surname.control.markAsTouched();
            this.Surname.control.updateValueAndValidity();
            this.Confirm_surname.control.markAsTouched();
            this.Confirm_surname.control.updateValueAndValidity();
            this.Surname.control.setErrors({ mismatch: true });
            this.Confirm_surname.control.setErrors({ mismatch: true });
            this.foc_confirm_fullname.nativeElement.focus();
            tostervalue = "Child Last Name and Confim Last Name Missmach";
            isInvalid = true;
            //this.alt.toasterror('Child First Name and Confim Name Missmach')
          }
        }
        if(this.childaadharshow){
          if (this.sel_aadhar) {
            this.sel_aadhar.control.markAsTouched();
            this.sel_aadhar.control.updateValueAndValidity();
            if (this.sel_aadhar.invalid) {
              isInvalid = true;
              tostervalue = "Please Enter Child Aadhar Number";
            }
          }
        }
        if(this.fatherfullname){
          if (this.Father__full_namer) {
            this.Father__full_namer.control.markAsTouched();
            this.Father__full_namer.control.updateValueAndValidity();
            if (this.Father__full_namer.invalid) {
              isInvalid = true;
              tostervalue = "Please Enter Father Full Name";
            }
        }
          if (this.Father_surname) {
            this.Father_surname.control.markAsTouched();
            this.Father_surname.control.updateValueAndValidity();
            if (this.Father_surname.invalid) {
              isInvalid = true;
              tostervalue = "Please Enter Father Last Name";
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
      if(this.fatheraadharnumber){
        if (this.Father_aadhhar_number) {
          this.Father_aadhhar_number.control.markAsTouched();
          this.Father_aadhhar_number.control.updateValueAndValidity();
          if (this.Father_aadhhar_number.invalid) {
            isInvalid = true;
            tostervalue = "Please Enter Father Aadhar Number";
          }
        }
      }
      if(this.motherfullname){
        if (this.Mother_full_name) {
          this.Mother_full_name.control.markAsTouched();
          this.Mother_full_name.control.updateValueAndValidity();
          if (this.Mother_full_name.invalid) {
            isInvalid = true;
            tostervalue = "Please Enter Mother First Name";
          }
        }
        if (this.Mother_surname_name) {
          this.Mother_surname_name.control.markAsTouched();
          this.Mother_surname_name.control.updateValueAndValidity();
          if (this.Mother_surname_name.invalid) {
            isInvalid = true;
            tostervalue = "Please Enter Mother Last Name";
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
          if (this.Mother_aadhaar_no.invalid) {
            isInvalid = true;
            tostervalue = "Please Enter Mother Aadhar Number";
          }
        }
        
      }
      if (this.Addressofparents) {
        if(this.new_draft_details_array.addressof_parents.new_addressof == 'outside'){
          if(this.ngaddress_parent_country){
          this.ngaddress_parent_country.control.markAsTouched();
          this.ngaddress_parent_country.control.updateValueAndValidity();
          if (this.ngaddress_parent_country.invalid) {
            isInvalid = true;
            tostervalue = "Please Select Country Drop Down";
          }
          }
        }
        if(this.new_draft_details_array.addressof_parents.new_addressof != 'outside')
        {
          if (this.Address_parent_state) {
            this.Address_parent_state.control.markAsTouched();
            this.Address_parent_state.control.updateValueAndValidity();
            if (this.Address_parent_state.invalid) {
              isInvalid = true;
              tostervalue = "Please Select State Drop Down";
            }
          }
          if(this.Address_parent_district){
            this.Address_parent_district.control.markAsTouched();
            this.Address_parent_district.control.updateValueAndValidity();
            if (this.Address_parent_district.invalid) {
              isInvalid = true;
              tostervalue = "Please Select District Drop Down";
            }
          }
          if(this.address_parent_rural_urabn){
            this.address_parent_rural_urabn.control.markAsTouched();
            this.address_parent_rural_urabn.control.updateValueAndValidity();
            if (this.address_parent_rural_urabn.invalid) {
              isInvalid = true;
              tostervalue = "Please Select Rural/Urban Drop Down";
            }
          }
          if(this.address_parent_mmc){
            this.address_parent_mmc.control.markAsTouched();
            this.address_parent_mmc.control.updateValueAndValidity();
            if (this.address_parent_mmc.invalid) {
              isInvalid = true;
              tostervalue = "Please Select MMC Drop Down";
            }

          }
          if(this.Address_parent_Village_Town){
            this.Address_parent_Village_Town.control.markAsTouched();
            this.Address_parent_Village_Town.control.updateValueAndValidity();
            if (this.Address_parent_Village_Town.invalid) {
              isInvalid = true;
              tostervalue = "Please Select Village/Town Drop Down";
            }

          }
        }
      }
      if (this.Permanentaddress) {
        if(this.new_draft_details_array.Permanent_addressof_parents?.new_address_parent_addressof == 'outside' && this.new_draft_details_array.Permanent_addressof_parents.new_address_parent_sameasaddress == ''){
          if (this.ngaddress_parent_permenent_country) {
            this.ngaddress_parent_permenent_country.control.markAsTouched();
            this.ngaddress_parent_permenent_country.control.updateValueAndValidity();
            if (this.ngaddress_parent_permenent_country.invalid) {
              isInvalid = true;
              tostervalue = "Please Select Country Drop Down";
            }
            
          }
        }
        if(this.new_draft_details_array.Permanent_addressof_parents?.new_address_parent_addressof != 'outside' && this.new_draft_details_array.Permanent_addressof_parents.new_address_parent_sameasaddress == ''){

          if (this.Address_parent_permenent_state) {
            this.Address_parent_permenent_state.control.markAsTouched();
            this.Address_parent_permenent_state.control.updateValueAndValidity();
            if(this.Address_parent_permenent_state.invalid){
              isInvalid = true;
              tostervalue = "Please Select State Drop Down";
            }
          }
          if(this.Address_parent_permenent_district){
            this.Address_parent_permenent_district.control.markAsTouched();
            this.Address_parent_permenent_district.control.updateValueAndValidity();
            if(this.Address_parent_permenent_district.invalid){
              isInvalid = true;
              tostervalue = "Please Select District Drop Down";
            }
          }
          if (this.Address_parent_permenent_sub_district) {
            this.Address_parent_permenent_sub_district.control.markAsTouched();
            this.Address_parent_permenent_sub_district.control.updateValueAndValidity();
            if(this.Address_parent_permenent_sub_district.invalid){
              isInvalid = true;
              tostervalue = "Please Select Rural/Urban Drop Down";
            }
          }
          if(this.address_parent_permenent_mmc){
            this.address_parent_permenent_mmc.control.markAsTouched();
            this.address_parent_permenent_mmc.control.updateValueAndValidity();
            if(this.address_parent_permenent_mmc.invalid){
              isInvalid = true;
              tostervalue = "Please Select MMC Drop Down";

            }
          }
          if(this.Address_parent_permenent_village){
            this.Address_parent_permenent_village.control.markAsTouched();
            this.Address_parent_permenent_village.control.updateValueAndValidity();
            if(this.Address_parent_permenent_village.invalid){
              isInvalid = true;
              tostervalue = "Please Select Village/Town Drop Down";

            }
          }
        }
      }
      if (this.PlaceofBirth) {
        if (this.Place_of_birth) {
          this.Place_of_birth.control.markAsTouched();
          this.Place_of_birth.control.updateValueAndValidity();
          if (this.Place_of_birth.invalid) {
            isInvalid = true;
            tostervalue = "Please Select Place of Birth Drop Down";
          }
        }
        if (
          this.ngHospitalName &&
          this.new_draft_details_array.placeofbirth.new_place_of_birth == '1'
        ) {
          this.ngHospitalName.control.markAsTouched();
          this.ngHospitalName.control.updateValueAndValidity();
          if (this.ngHospitalName.invalid) {
            isInvalid = true;
            tostervalue = "Please Enter Hospital Name";
          }
        }
        if (
          this.Place_of_birth_state &&
          this.new_draft_details_array.placeofbirth.new_place_of_birth != '1'
        ) {
          this.Place_of_birth_state.control.markAsTouched();
          this.Place_of_birth_state.control.updateValueAndValidity();
          if (this.Place_of_birth_state.invalid) {
            isInvalid = true;
            tostervalue = "Please Select Place of Birth State Drop Down";
          }
        }
        if (
          this.Place_of_birth_district &&
          this.new_draft_details_array.placeofbirth.new_place_of_birth != '1'
        ) {
          this.Place_of_birth_district.control.markAsTouched();
          this.Place_of_birth_district.control.updateValueAndValidity();
          if (this.Place_of_birth_district.invalid) {
            isInvalid = true;
            tostervalue = "Please Select Place of Birth District Drop Down";
          }
        }
        if (
          this.Place_of_birth_sub_district &&
          this.new_draft_details_array.placeofbirth.new_place_of_birth != '1'
        ) {
          this.Place_of_birth_sub_district.control.markAsTouched();
          this.Place_of_birth_sub_district.control.updateValueAndValidity();
          if (this.Place_of_birth_sub_district.invalid) {
            isInvalid = true;
            tostervalue = "Please Select Place of Birth Sub District Drop Down";
          }
        }
        if (
          this.place_of_birth_mmc &&
          this.new_draft_details_array.placeofbirth.new_place_of_birth != '1'
        ) {
          this.place_of_birth_mmc.control.markAsTouched();
          this.place_of_birth_mmc.control.updateValueAndValidity();
          if (this.place_of_birth_mmc.invalid) {
            isInvalid = true;
            tostervalue = "Please Select Place of Birth MMC Drop Down";
          }
        }
      }
    }else{
      tostervalue = "Please Select Correction Drop Down";
      isInvalid = true;
    }
        
        break;
      case 'Addname':
        if (this.ngfullname) {
          this.ngfullname.control.markAsTouched();
          this.ngfullname.control.updateValueAndValidity();
          this.foc_fullname.nativeElement.focus();
          if (this.ngfullname.invalid) {
            isInvalid = true;
            tostervalue = "Please Enter Child First Name";
          }
        }
        if (this.Surname) {
          this.Surname.control.markAsTouched();
          this.Surname.control.updateValueAndValidity();
          this.surname_lastname.nativeElement.focus();
          if (this.Surname.invalid) {
            isInvalid = true;
            tostervalue = "Please Enter Child Last Name";
          }
        }
        if (
          this.new_draft_details_array.childinformation.new_fullname.toUpperCase() !=
          this.new_draft_details_array.childinformation.new_confirm_fullname.toUpperCase()
        ) {
          this.ngfullname.control.markAsTouched();
          this.ngfullname.control.updateValueAndValidity();
          this.ngConfirm_fullname.control.markAsTouched();
          this.ngConfirm_fullname.control.updateValueAndValidity();
          this.ngfullname.control.setErrors({ mismatch: true });
          this.ngConfirm_fullname.control.setErrors({ mismatch: true });
          this.foc_confirm_fullname.nativeElement.focus();
          tostervalue = "Child First Name and Confim Name Missmach";
          isInvalid = true;
          //this.alt.toasterror('Child First Name and Confim Name Missmach')
        }
        if (
          this.new_draft_details_array.childinformation.new_surname.toUpperCase() !=
          this.new_draft_details_array.childinformation.new_confirm_surname.toUpperCase()
        ) {
          this.Surname.control.markAsTouched();
          this.Surname.control.updateValueAndValidity();
          this.Confirm_surname.control.markAsTouched();
          this.Confirm_surname.control.updateValueAndValidity();
          this.Surname.control.setErrors({ mismatch: true });
          this.Confirm_surname.control.setErrors({ mismatch: true });
          this.foc_confirm_fullname.nativeElement.focus();
          tostervalue = "Child Last Name and Confim Last Name Missmach";
          isInvalid = true;
          //this.alt.toasterror('Child First Name and Confim Name Missmach')
        }
        if (!this.val.isEmpty(this.new_draft_details_array.childinformation.new_middlename) &&
          this.new_draft_details_array.childinformation.new_middlename.toUpperCase() !=
          this.new_draft_details_array.childinformation.new_confirm_surname.toUpperCase() && !this.val.isEmpty(this.new_draft_details_array.childinformation.new_confirm_middle)
        ) {
          this.Surname.control.markAsTouched();
          this.Surname.control.updateValueAndValidity();
          this.Confirm_surname.control.markAsTouched();
          this.Confirm_surname.control.updateValueAndValidity();
          this.Surname.control.setErrors({ mismatch: true });
          this.Confirm_surname.control.setErrors({ mismatch: true });
          this.foc_confirm_fullname.nativeElement.focus();
          tostervalue = "Child Last Name and Confim Last Name Missmach";
          isInvalid = true;
          //this.alt.toasterror('Child First Name and Confim Name Missmach')
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
    }else{
      return isInvalid;
    }
  }
  form_alert() {
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
  documentlist: any[] = [];
  async get_document_details(): Promise<void> {
    try {
      const req = new basemodel();
      req.type = '1012';
      req.param1 = this.brapplicationid;
      this.spinner.show();
      this.documentlist = [];
      let rsdata: any = await this.auth.auth_pkgcrsbirth_service(req);
      this.spinner.hide();
      debugger
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

    }
  }
  displaymodal = 'none';
  ModalCLose() {
    this.displaymodal = 'none';
  }
  ModalOpen() {
    this.displaymodal = 'block';
  }
  screentype = 'INBOX';
  openpayment() {
    this.screentype = 'PAYMENT';
  }
  pay() {
    //this.inbox_Approve();
    setTimeout(() => {
      this.ModalCLose();
      window.location.reload();
      this.screentype = 'INBOX';
    }, 2000)
  }

  selectedbirth: any[] = [];
  correction_master_array: any[] = [];
  async getcorrectiondrop(): Promise<void> {
    try {
      const req = new basemodel();
      req.type = '1024';
      req.param1='BIRTH';
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
  applicationstatus: any; brapplicationid: any;
  async getdraft(): Promise<void> {
    try {
      const req = new basemodel();
      req.type = '10001';
      req.param1 = 'BIRTH';
      req.param2 = this.applicationregid;
      req.param3 = this.applicationid;
      req.param4 = this.typeofcorrection;
      this.spinner.show();
      let rsdata: any = await this.auth.auth_pkgcrsbirth_service(req);
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
  @ViewChild('multiSelect') multiSelect!: MultiSelect;

  gendershow = false;
  childnameshow = false;
  childaadharshow = false;
  fatherfullname = false;
  fathermail = false;
  fathermobilenumber = false;
  fatheraadharnumber = false;
  motherfullname = false;
  motheremail = false; mothermobile = false; motheraadhar = false;
  Addressofparents = false; Permanentaddress = false; PlaceofBirth = false;
  numberofchildren = false;
  typeofattention = false; Methodofdelivery = false; Birthweight = false; DurationofPregnancy = false;
  fileSelected: boolean = false;
  fileError: boolean = false;
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
        if (this.selectedbirth.find(e => e.CORRECTION_CODE == '102')) {
          this.new_draft_details_array.childinformation.fullnamecheck = '1';
          this.childnameshow = true;
        } else {
          this.childnameshow = false;
          this.new_draft_details_array.childinformation.fullnamecheck = '0';
          this.new_draft_details_array.childinformation.new_fullname = '';
          this.new_draft_details_array.childinformation.new_fullname_t = '';
          this.new_draft_details_array.childinformation.new_middlename = '';
          this.new_draft_details_array.childinformation.new_middlename_t = '';
          this.new_draft_details_array.childinformation.new_surname = '';
          this.new_draft_details_array.childinformation.new_surname_t = '';
        }
        if (this.selectedbirth.find(e => e.CORRECTION_CODE == '103')) {
          this.new_draft_details_array.childinformation.aadhaarcheck = '1';
          this.childaadharshow = true;
        } else {
          this.childaadharshow = false;
          this.new_draft_details_array.childinformation.aadhaarcheck = '0';
          this.new_draft_details_array.childinformation.new_aadhaar = '';
          this.new_draft_details_array.childinformation.new_aadhaarmask = '';
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
        if (this.selectedbirth.find(e => e.CORRECTION_CODE == '112')) {
          this.new_draft_details_array.addressof_parents.addressof_parentscheck = '1';
          this.Addressofparents = true;
        } else {
          this.Addressofparents = false;
          this.new_draft_details_array.addressof_parents.addressof_parentscheck = '0';
        } if (this.selectedbirth.find(e => e.CORRECTION_CODE == '113')) {
          this.new_draft_details_array.Permanent_addressof_parents.address_permenentcheck = '1';
          this.Permanentaddress = true;
        } else {
          this.Permanentaddress = false;
          this.new_draft_details_array.Permanent_addressof_parents.address_permenentcheck = '0';

        } if (this.selectedbirth.find(e => e.CORRECTION_CODE == '114')) {
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
    if (this.typeofcorrection == 'Addname') {
      this.childnameshow = true;
      this.new_draft_details_array.childinformation.fullnamecheck = '1';
    }
  }

  getallcorrectionempty() {
    this.gendershow = false;
    this.childnameshow = false;
    this.childaadharshow = false;
    this.fatherfullname = false;
    this.fathermail = false;
    this.fathermobilenumber = false;
    this.fatheraadharnumber = false;
    this.motherfullname = false;
    this.new_draft_details_array.childinformation.new_fullname = '';
    this.new_draft_details_array.childinformation.new_fullname_t = '';
    this.new_draft_details_array.childinformation.new_middlename = '';
    this.new_draft_details_array.childinformation.new_middlename_t = '';
    this.new_draft_details_array.childinformation.new_surname = '';
    this.new_draft_details_array.childinformation.new_surname_t = '';
    this.new_draft_details_array.childinformation.new_aadhaar = '';
    this.new_draft_details_array.childinformation.new_aadhaarmask = '';
    // father details
    this.new_draft_details_array.fatherInformation.new_father_full_namer = '';
    this.new_draft_details_array.fatherInformation.new_father_full_namer_t = '';
    this.new_draft_details_array.fatherInformation.new_father_middlename = '';
    this.new_draft_details_array.fatherInformation.new_father_middlename_t = '';
    this.new_draft_details_array.fatherInformation.new_father_surname = '';
    this.new_draft_details_array.fatherInformation.new_father_surname_t = '';
    this.new_draft_details_array.fatherInformation.new_father_email_number = '';
    this.new_draft_details_array.fatherInformation.new_father_mobile_number = '';
    this.new_draft_details_array.fatherInformation.new_father_aadhhar_number_mask = '';
    this.new_draft_details_array.fatherInformation.new_father_aadhhar_number = '';
    // mother details
    this.new_draft_details_array.motherInformation.new_mother_full_namer = '';
    this.new_draft_details_array.motherInformation.new_mother_full_namer_t = '';
    this.new_draft_details_array.motherInformation.new_mother_middle_name = '';
    this.new_draft_details_array.motherInformation.new_mother_middle_name_t = '';
    this.new_draft_details_array.motherInformation.new_mother_surname = '';
    this.new_draft_details_array.motherInformation.new_mother_surname_t = '';
    this.motheremail = false;
    this.mothermobile = false;
    this.new_draft_details_array.motherInformation.new_mother_email_number = '';
    this.motheraadhar = false;
    this.new_draft_details_array.motherInformation.new_mother_aadhaar_number_mask = '';
    this.Addressofparents = false;
    this.new_draft_details_array.addressof_parents = {

      new_addressof: 'inside',
      new_address_parent_country: '',
      new_address_parent_country_val: '',
      new_address_parent_country_address: '',
      new_address_parent_country_address_t: '',
      new_address_parent_country_address_val: '',
      new_address_parent_state: '',
      new_address_parent_state_val: '',
      new_address_parent_district: '',
      new_address_parent_district_val: '',
      new_address_parent_rural_urabn: '',
      new_address_parent_rural_urabn_val: '',
      new_address_parent_mmc: '',
      new_address_parent_mmc_val: '',
      new_address_parent_Village_Town: '',
      new_address_parent_Village_Town_val: '',
      new_address_parent_pincode: '',
      new_address_parent_building_name: '',
      new_address_parent_building_name_t: '',
      new_address_parent_building_name_val: '',
      new_address_parent_house_no: '',
      new_address_parent_house_no_t: '',
      new_address_parent_house_no_val: '',
      new_address_parent_street_name: '',
      new_address_parent_street_name_t: '',
      new_address_parent_street_name_val: '',
      new_address_parent_locality: '',
      new_address_parent_locality_t: '',
      new_address_parent_postoff: '',
      new_address_parent_postoff_val: '',
      new_addressof_parents_value: '',
      addressof_parentscheck: '0',
    };
    this.Permanentaddress = false;
    this.new_draft_details_array.Permanent_addressof_parents = {

      new_address_parent_sameasaddress: '',
      new_address_parent_addressof: '',
      new_address_parent_permenent_country: '',
      new_address_parent_permenent_country_val: '',
      new_address_parent_permenent_country_address: '',
      new_address_parent_permenent_country_address_t: '',
      new_address_parent_permenent_country_address_val: '',
      new_address_parent_permenent_state: '',
      new_address_parent_permenent_state_val: '',
      new_address_parent_permenent_district: '',
      new_address_parent_permenent_district_val: '',
      new_address_parent_permenent_mmc: '',
      new_address_parent_permenent_mmc_val: '',
      new_address_parent_permenent_rural_urabn: '',
      new_address_parent_permenent_rural_urabn_val: '',
      new_address_parent_permenent_village: '',
      new_address_parent_permenent_village_val: '',
      new_address_parent_permenent_pincode: '',
      new_address_parent_permenent_building_no: '',
      new_address_parent_permenent_building_no_t: '',
      new_address_parent_permenent_building_no_val: '',
      new_address_parent_permenent_hose_no: '',
      new_address_parent_permenent_hose_no_t: '',
      new_address_parent_permenent_hose_no_val: '',
      new_address_parent_permenent_street_name: '',
      new_address_parent_permenent_street_name_t: '',
      new_address_parent_permenent_street_name_val: '',
      new_address_parent_permenent_locality: '',
      new_address_parent_permenent_locality_t: '',
      new_address_parent_permenent_locality_post_office_val: '',
      new_address_permenent_postoff: '',
      new_address_permenent_postoff_val: '',
      address_permenentcheck: '0',
    };
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
  async changeaadhaarmode() {
    this.new_draft_details_array.childinformation.new_aadhaar = '';
    this.new_draft_details_array.childinformation.new_aadhaarmask = '';
  }
  //Common Functions
  suggestions: any;
  async Teluglanguageconvrt(inputkeyval: any, inputsource: any) {
    this.pscall.google_translate(inputkeyval).subscribe(
      (response: any) => {
        if (response[0] != '') // if (response[0] == 'SUCCESS')
        {
          this.suggestions = response[0][0];//response[0][0][0]
          if (inputsource == 'child_fullname') {
            this.new_draft_details_array.childinformation.new_fullname_t =
              this.suggestions[0];
          }
          if (inputsource == 'child_fullname_tel') {
            this.new_draft_details_array.childinformation.new_fullname_t =
              this.suggestions[0];
          }
          if (inputsource == 'middlename') {
            this.new_draft_details_array.childinformation.new_middlename_t =
              this.suggestions[0];
          }
          if (inputsource == 'middlename_t') {
            this.new_draft_details_array.childinformation.new_middlename_t =
              this.suggestions[0];
          }
          if (inputsource == 'child_surname') {
            this.new_draft_details_array.childinformation.new_surname_t =
              this.suggestions[0];
          }
          if (inputsource == 'child_surname_tel') {
            this.new_draft_details_array.childinformation.new_surname_t =
              this.suggestions[0];
          }
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
          if (inputsource == 'address_parent_country_address') {
            this.new_draft_details_array.addressof_parents.new_address_parent_country_address_t =
              this.suggestions[0];
          }
          if (inputsource == 'address_parent_country_address_tel') {
            this.new_draft_details_array.addressof_parents.new_address_parent_country_address_t =
              this.suggestions[0];
          }
          if (inputsource == 'address_parent_country_address') {
            this.new_draft_details_array.addressof_parents.new_address_parent_country_address_t =
              this.suggestions[0];
          }
          if (inputsource == 'address_parent_country_address_tel') {
            this.new_draft_details_array.addressof_parents.new_address_parent_country_address_t =
              this.suggestions[0];
          }
          if (inputsource == 'address_parent_building_name') {
            this.new_draft_details_array.addressof_parents.new_address_parent_building_name_t =
              this.suggestions[0];
          }
          if (inputsource == 'address_parent_building_name_tel') {
            this.new_draft_details_array.addressof_parents.new_address_parent_building_name_t =
              this.suggestions[0];
          }
          if (inputsource == 'address_parent_house_no') {
            this.new_draft_details_array.addressof_parents.new_address_parent_house_no_t =
              this.suggestions[0];
          }
          if (inputsource == 'address_parent_house_no_tel') {
            this.new_draft_details_array.addressof_parents.new_address_parent_house_no_t =
              this.suggestions[0];
          }
          if (inputsource == 'address_parent_street_name') {
            this.new_draft_details_array.addressof_parents.new_address_parent_street_name_t =
              this.suggestions[0];
          }
          if (inputsource == 'address_parent_street_name_tel') {
            this.new_draft_details_array.addressof_parents.new_address_parent_street_name_t =
              this.suggestions[0];
          }
          if (inputsource == 'address_parent_Locality_Post') {
            this.new_draft_details_array.addressof_parents.new_address_parent_locality_t =
              this.suggestions[0];
          }
          if (inputsource == 'address_parent_Locality_Post_tel') {
            this.new_draft_details_array.addressof_parents.new_address_parent_locality_t =
              this.suggestions[0];
          }
          //Permanent
          if (inputsource == 'addressoutsideindia') {
            this.new_draft_details_array.Permanent_addressof_parents.new_address_parent_permenent_country_address_t =
              this.suggestions[0];
          }
          if (inputsource == 'addressoutsideindia_tel') {
            this.new_draft_details_array.Permanent_addressof_parents.new_address_parent_permenent_country_address_t =
              this.suggestions[0];
          }
          if (inputsource == 'address_parent_permenent_building_no') {
            this.new_draft_details_array.Permanent_addressof_parents.new_address_parent_permenent_building_no_t =
              this.suggestions[0];
          }
          if (inputsource == 'address_parent_permenent_building_no_tel') {
            this.new_draft_details_array.Permanent_addressof_parents.new_address_parent_permenent_building_no_t =
              this.suggestions[0];
          }

          if (inputsource == 'address_parent_permenent_hose_no') {
            this.new_draft_details_array.Permanent_addressof_parents.new_address_parent_permenent_hose_no_t =
              this.suggestions[0];
          }
          if (inputsource == 'address_parent_permenent_hose_no_tel') {
            this.new_draft_details_array.Permanent_addressof_parents.new_address_parent_permenent_hose_no_t =
              this.suggestions[0];
          }
          if (inputsource == 'address_parent_permenent_street_name') {
            this.new_draft_details_array.Permanent_addressof_parents.new_address_parent_permenent_street_name_t =
              this.suggestions[0];
          }
          if (inputsource == 'address_parent_permenent_street_name_tel') {
            this.new_draft_details_array.Permanent_addressof_parents.new_address_parent_permenent_street_name_t =
              this.suggestions[0];
          }
          if (inputsource == 'address_parent_permenent_locality_post_office') {
            this.new_draft_details_array.Permanent_addressof_parents.new_address_parent_permenent_locality_t =
              this.suggestions[0];
          }
          if (
            inputsource == 'address_parent_permenent_locality_post_office_tel'
          ) {
            this.new_draft_details_array.Permanent_addressof_parents.new_address_parent_permenent_locality_t =
              this.suggestions[0];
          }
          if (inputsource == 'place_of_birth_building_no') {
            this.new_draft_details_array.placeofbirth.new_place_of_birth_building_no_t =
              this.suggestions[0];
          }
          if (inputsource == 'place_of_birth_building_no_t') {
            this.new_draft_details_array.placeofbirth.new_place_of_birth_building_no_t =
              this.suggestions[0];
          }
          if (inputsource == 'Place_of_birth_house_no') {
            this.new_draft_details_array.placeofbirth.new_Place_of_birth_house_no_t =
              this.suggestions[0];
          }
          if (inputsource == 'Place_of_birth_house_no_t') {
            this.new_draft_details_array.placeofbirth.new_Place_of_birth_house_no_t =
              this.suggestions[0];
          }
          if (inputsource == 'place_of_birth_street_name') {
            this.new_draft_details_array.placeofbirth.new_place_of_birth_street_name_t =
              this.suggestions[0];
          }
          if (inputsource == 'place_of_birth_street_name_t') {
            this.new_draft_details_array.placeofbirth.new_place_of_birth_street_name_t =
              this.suggestions[0];
          }
          if (inputsource == 'Place_of_birth_locality') {
            this.new_draft_details_array.placeofbirth.new_Place_of_birth_locality_t =
              this.suggestions[0];
          }
          if (inputsource == 'Place_of_birth_locality_t') {
            this.new_draft_details_array.placeofbirth.new_Place_of_birth_locality_t =
              this.suggestions[0];
          }
        } else {
          if (inputsource == 'child_fullname') {
            this.new_draft_details_array.childinformation.new_fullname_t = '';
          }
          if (inputsource == 'child_fullname_tel') {
            this.new_draft_details_array.childinformation.new_fullname_t = '';
          }
          if (inputsource == 'middlename') {
            this.new_draft_details_array.childinformation.new_middlename_t = '';
          }
          if (inputsource == 'middlename_t') {
            this.new_draft_details_array.childinformation.new_middlename_t = '';
          }
          if (inputsource == 'child_surname') {
            this.new_draft_details_array.childinformation.new_surname_t = '';
          }
          if (inputsource == 'child_surname_tel') {
            this.new_draft_details_array.childinformation.new_surname_t = '';
          }
          if (inputsource == 'father_full_name') {
            this.draft_details_array.fatherInformation.father_full_namer_t = '';
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
            this.new_draft_details_array.motherInformation.new_mother_full_namer_t = '';
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
          if (inputsource == 'address_parent_country_address') {
            this.new_draft_details_array.addressof_parents.new_address_parent_country_address_t =
              '';
          }
          if (inputsource == 'address_parent_country_address_tel') {
            this.new_draft_details_array.addressof_parents.new_address_parent_country_address_t =
              '';
          }
          if (inputsource == 'address_parent_country_address') {
            this.new_draft_details_array.addressof_parents.new_address_parent_country_address_t =
              '';
          }
          if (inputsource == 'address_parent_country_address_tel') {
            this.new_draft_details_array.addressof_parents.new_address_parent_country_address_t =
              '';
          }
          if (inputsource == 'address_parent_building_name') {
            this.new_draft_details_array.addressof_parents.new_address_parent_building_name_t =
              '';
          }
          if (inputsource == 'address_parent_building_name_tel') {
            this.new_draft_details_array.addressof_parents.new_address_parent_building_name_t =
              '';
          }
          if (inputsource == 'address_parent_house_no') {
            this.new_draft_details_array.addressof_parents.new_address_parent_house_no_t =
              '';
          }
          if (inputsource == 'address_parent_house_no_tel') {
            this.new_draft_details_array.addressof_parents.new_address_parent_house_no_t =
              '';
          }
          if (inputsource == 'address_parent_street_name') {
            this.new_draft_details_array.addressof_parents.new_address_parent_street_name_t =
              '';
          }
          if (inputsource == 'address_parent_street_name_tel') {
            this.new_draft_details_array.addressof_parents.new_address_parent_street_name_t =
              '';
          }
          if (inputsource == 'address_parent_Locality_Post') {
            this.new_draft_details_array.addressof_parents.new_address_parent_locality_t =
              '';
          }
          if (inputsource == 'address_parent_Locality_Post_tel') {
            this.new_draft_details_array.addressof_parents.new_address_parent_locality_t =
              '';
          }
          //Permanent
          if (inputsource == 'addressoutsideindia') {
            this.new_draft_details_array.Permanent_addressof_parents.new_address_parent_permenent_country_address_t =
              '';
          }
          if (inputsource == 'addressoutsideindia_tel') {
            this.new_draft_details_array.Permanent_addressof_parents.new_address_parent_permenent_country_address_t =
              '';
          }
          if (inputsource == 'address_parent_permenent_building_no') {
            this.new_draft_details_array.Permanent_addressof_parents.new_address_parent_permenent_building_no_t =
              '';
          }
          if (inputsource == 'address_parent_permenent_building_no_tel') {
            this.new_draft_details_array.Permanent_addressof_parents.new_address_parent_permenent_building_no_t =
              '';
          }

          if (inputsource == 'address_parent_permenent_hose_no') {
            this.new_draft_details_array.Permanent_addressof_parents.new_address_parent_permenent_hose_no_t =
              '';
          }
          if (inputsource == 'address_parent_permenent_hose_no_tel') {
            this.new_draft_details_array.Permanent_addressof_parents.new_address_parent_permenent_hose_no_t =
              '';
          }
          if (inputsource == 'address_parent_permenent_street_name') {
            this.new_draft_details_array.Permanent_addressof_parents.new_address_parent_permenent_street_name_t =
              '';
          }
          if (inputsource == 'address_parent_permenent_street_name_tel') {
            this.new_draft_details_array.Permanent_addressof_parents.new_address_parent_permenent_street_name_t =
              '';
          }
          if (inputsource == 'address_parent_permenent_locality_post_office') {
            this.new_draft_details_array.Permanent_addressof_parents.new_address_parent_permenent_locality_t =
              '';
          }
          if (
            inputsource == 'address_parent_permenent_locality_post_office_tel'
          ) {
            this.new_draft_details_array.Permanent_addressof_parents.new_address_parent_permenent_locality_t =
              '';
          }
          if (inputsource == 'place_of_birth_building_no') {
            this.new_draft_details_array.placeofbirth.new_place_of_birth_building_no_t =
              '';
          }
          if (inputsource == 'place_of_birth_building_no_t') {
            this.new_draft_details_array.placeofbirth.new_place_of_birth_building_no_t =
              '';
          }
          if (inputsource == 'Place_of_birth_house_no') {
            this.new_draft_details_array.placeofbirth.new_Place_of_birth_house_no_t =
              '';
          }
          if (inputsource == 'Place_of_birth_house_no_t') {
            this.new_draft_details_array.placeofbirth.new_Place_of_birth_house_no_t =
              '';
          }
          if (inputsource == 'place_of_birth_street_name') {
            this.new_draft_details_array.placeofbirth.new_place_of_birth_street_name_t =
              '';
          }
          if (inputsource == 'place_of_birth_street_name_t') {
            this.new_draft_details_array.placeofbirth.new_place_of_birth_street_name_t =
              '';
          }
          if (inputsource == 'Place_of_birth_locality') {
            this.new_draft_details_array.placeofbirth.new_Place_of_birth_locality_t =
              '';
          }
          if (inputsource == 'Place_of_birth_locality_t') {
            this.new_draft_details_array.placeofbirth.new_Place_of_birth_locality_t =
              '';
          }
        }
      },
      (error) => {
        console.error('Error transliterating text:', error);
        return '';
      }
    );
  }

  AddressofparentsRadiochange(event: any) {

    const selectedValue = event.target.value;
    this.new_draft_details_array.addressof_parents = {

      new_addressof: selectedValue,
      new_address_parent_country: '',
      new_address_parent_country_val: '',
      new_address_parent_country_address: '',
      new_address_parent_country_address_t: '',
      new_address_parent_country_address_val: '',
      new_address_parent_state: '',
      new_address_parent_state_val: '',
      new_address_parent_district: '',
      new_address_parent_district_val: '',
      new_address_parent_rural_urabn: '',
      new_address_parent_rural_urabn_val: '',
      new_address_parent_mmc: '',
      new_address_parent_mmc_val: '',
      new_address_parent_Village_Town: '',
      new_address_parent_Village_Town_val: '',
      new_address_parent_pincode: '',
      new_address_parent_building_name: '',
      new_address_parent_building_name_t: '',
      new_address_parent_building_name_val: '',
      new_address_parent_house_no: '',
      new_address_parent_house_no_t: '',
      new_address_parent_house_no_val: '',
      new_address_parent_street_name: '',
      new_address_parent_street_name_t: '',
      new_address_parent_street_name_val: '',
      new_address_parent_locality: '',
      new_address_parent_locality_t: '',
      new_address_parent_postoff: '',
      new_address_parent_postoff_val: '',
      new_addressof_parents_value: '',
      addressof_parentscheck: '0',
    };
  }
  permanentAddressofparentsRadiochange(event: any) {

    const selectedValue = event.target.value;
    this.new_draft_details_array.Permanent_addressof_parents = {

      new_address_parent_sameasaddress: '',
      new_address_parent_addressof: selectedValue,
      new_address_parent_permenent_country: '',
      new_address_parent_permenent_country_val: '',
      new_address_parent_permenent_country_address: '',
      new_address_parent_permenent_country_address_t: '',
      new_address_parent_permenent_country_address_val: '',
      new_address_parent_permenent_state: '',
      new_address_parent_permenent_state_val: '',
      new_address_parent_permenent_district: '',
      new_address_parent_permenent_district_val: '',
      new_address_parent_permenent_mmc: '',
      new_address_parent_permenent_mmc_val: '',
      new_address_parent_permenent_rural_urabn: '',
      new_address_parent_permenent_rural_urabn_val: '',
      new_address_parent_permenent_village: '',
      new_address_parent_permenent_village_val: '',
      new_address_parent_permenent_pincode: '',
      new_address_parent_permenent_building_no: '',
      new_address_parent_permenent_building_no_t: '',
      new_address_parent_permenent_building_no_val: '',
      new_address_parent_permenent_hose_no: '',
      new_address_parent_permenent_hose_no_t: '',
      new_address_parent_permenent_hose_no_val: '',
      new_address_parent_permenent_street_name: '',
      new_address_parent_permenent_street_name_t: '',
      new_address_parent_permenent_street_name_val: '',
      new_address_parent_permenent_locality: '',
      new_address_parent_permenent_locality_t: '',
      new_address_parent_permenent_locality_post_office_val: '',
      new_address_permenent_postoff: '',
      new_address_permenent_postoff_val: '',
      address_permenentcheck: '0',
    };
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

    }
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
      obj == 'Addressofparents' &&
      this.new_draft_details_array.addressof_parents.new_address_parent_state == ''
    ) {
      this.spinner.hide();
      this.Addressofparents_district_array = [];
      this.new_draft_details_array.addressof_parents.new_address_parent_state = '';
      this.alt.warning('select  Permanent Address of parents State');
      return;
    } else if (
      obj == 'PermanentAddressofparents' &&
      this.new_draft_details_array.Permanent_addressof_parents
        .new_address_parent_permenent_state == ''
    ) {
      this.spinner.hide();
      this.Permanent_Addressofparents_district_array = [];
      this.new_draft_details_array.Permanent_addressof_parents.new_address_parent_permenent_state =
        '';
      this.alt.warning('select Permanent Address of parents State');
      return;
    } else if (
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
      if (obj == 'Addressofparents') {
        this.new_draft_details_array.addressof_parents.new_address_parent_district = '';
        this.new_draft_details_array.addressof_parents.new_address_parent_rural_urabn =
          '';
        this.statcode =
          this.new_draft_details_array.addressof_parents.new_address_parent_state;
      }
      if (obj == 'PermanentAddressofparents') {
        this.new_draft_details_array.Permanent_addressof_parents.new_address_parent_permenent_district =
          '';
        this.new_draft_details_array.Permanent_addressof_parents.new_address_parent_permenent_rural_urabn =
          '';
        this.statcode =
          this.new_draft_details_array.Permanent_addressof_parents.new_address_parent_permenent_state;
      }
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
          if (obj == 'Addressofparents') {
            this.Addressofparents_district_array = responce.Details;
          }
          if (obj == 'PermanentAddressofparents') {
            this.Permanent_Addressofparents_district_array = responce.Details;
          }
          if (obj == 'placeofbirth') {
            this.PlaceofBirth_district_array = responce.Details;
          }
          if (obj == 'staticstical') {
            this.staticstical_district_array = responce.Details;
          }
        } else {
          if (obj == 'Addressofparents') {
            this.Addressofparents_district_array = [];
          }
          if (obj == 'PermanentAddressofparents') {
            this.Addressofparents_district_array = [];
          }
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

  async Addressof_districtchange(): Promise<void> {
    this.new_draft_details_array.addressof_parents.new_address_parent_rural_urabn = '';
    this.new_draft_details_array.addressof_parents.new_address_parent_mmc = '';
    this.new_draft_details_array.addressof_parents.new_address_parent_Village_Town = '';
    this.Addressofparents_MandalMuncipality_array = [];
  }
  async Permanent_Addressof_districtchange(): Promise<void> {
    this.new_draft_details_array.Permanent_addressof_parents.new_address_parent_permenent_rural_urabn =
      '';
    this.new_draft_details_array.Permanent_addressof_parents.new_address_parent_permenent_mmc =
      '';
    this.new_draft_details_array.Permanent_addressof_parents.new_address_parent_permenent_village =
      '';
    this.Permanent_Addressofparents_MandalMuncipality_array = [];
  }
  async PlaceofBirth_districtchange(): Promise<void> {
    this.new_draft_details_array.placeofbirth.new_place_of_birth_rural_urabn = '';
    this.new_draft_details_array.placeofbirth.new_place_of_birth_mmc = '';
    this.new_draft_details_array.placeofbirth.new_place_of_birth_village = '';
    this.placeofbirth_MandalMuncipality_array = [];
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
      obj == 'Addressofparents' &&
      this.new_draft_details_array.addressof_parents.new_address_parent_district == ''
    ) {
      this.spinner.hide();
      this.Addressofparents_MandalMuncipality_array = [];
      this.new_draft_details_array.addressof_parents.new_address_parent_rural_urabn =
        '';
      this.alt.warning('select district');
      return;
    } else if (
      obj == 'PermanentAddressofparents' &&
      this.new_draft_details_array.Permanent_addressof_parents
        .new_address_parent_permenent_district == ''
    ) {
      this.spinner.hide();
      this.Permanent_Addressofparents_MandalMuncipality_array = [];
      this.new_draft_details_array.Permanent_addressof_parents.new_address_parent_permenent_rural_urabn =
        '';
      this.alt.warning('select district');
      return;
    } else if (
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
        if (obj == 'Addressofparents') {
          this.new_draft_details_array.addressof_parents.new_address_parent_mmc = '';
          this.new_draft_details_array.addressof_parents.new_address_parent_Village_Town =
            '';
          this.Addressofparents_MandalMuncipality_array = [];
          this.statcode =
            this.new_draft_details_array.addressof_parents.new_address_parent_state;
          this.district =
            this.new_draft_details_array.addressof_parents.new_address_parent_district;
          this.ruralurban =
            this.new_draft_details_array.addressof_parents.new_address_parent_rural_urabn;
        }
        if (obj == 'PermanentAddressofparents') {
          this.new_draft_details_array.Permanent_addressof_parents.new_address_parent_permenent_mmc =
            '';
          this.new_draft_details_array.Permanent_addressof_parents.new_address_parent_permenent_village =
            '';
          this.Permanent_Addressofparents_MandalMuncipality_array = [];
          this.statcode =
            this.new_draft_details_array.Permanent_addressof_parents.new_address_parent_permenent_state;
          this.district =
            this.new_draft_details_array.Permanent_addressof_parents.new_address_parent_permenent_district;
          this.ruralurban =
            this.new_draft_details_array.Permanent_addressof_parents.new_address_parent_permenent_rural_urabn;
        }
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
          if (obj == 'Addressofparents') {
            this.Addressofparents_MandalMuncipality_array = responce.Details;
          }
          if (obj == 'PermanentAddressofparents') {
            this.Permanent_Addressofparents_MandalMuncipality_array =
              responce.Details;
          }
          if (obj == 'placeofbirth') {
            this.placeofbirth_MandalMuncipality_array = responce.Details;
          }
          if (obj == 'staticstical') {
            this.staticstical_MandalMuncipality_array = responce.Details;
          }
        } else {
          if (obj == 'Addressofparents') {
            this.Addressofparents_MandalMuncipality_array = [];
          }
          if (obj == 'PermanentAddressofparents') {
            this.Permanent_Addressofparents_MandalMuncipality_array = [];
          }
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
      obj == 'Addressofparents' &&
      this.new_draft_details_array.addressof_parents.new_address_parent_mmc == ''
    ) {
      this.spinner.hide();
      this.village_ward_array = [];
      this.new_draft_details_array.addressof_parents.new_address_parent_Village_Town =
        '';
      this.alt.warning('select Mandal/Muncipality');
      return;
    } else if (
      obj == 'PermanentAddressofparents' &&
      this.new_draft_details_array.Permanent_addressof_parents
        .new_address_parent_permenent_mmc == ''
    ) {
      this.spinner.hide();
      this.Permanent_village_ward_array = [];
      this.new_draft_details_array.Permanent_addressof_parents.new_address_parent_permenent_village =
        '';
      this.alt.warning('select Mandal/Muncipality');
      return;
    } else if (
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
        if (obj == 'Addressofparents') {
          this.new_draft_details_array.addressof_parents.new_address_parent_Village_Town =
            '';
          this.village_ward_array = [];
          this.statcode =
            this.new_draft_details_array.addressof_parents.new_address_parent_state;
          this.district =
            this.new_draft_details_array.addressof_parents.new_address_parent_district;
          this.ruralurban =
            this.new_draft_details_array.addressof_parents.new_address_parent_rural_urabn;
          this.mandalmuncipality =
            this.new_draft_details_array.addressof_parents.new_address_parent_mmc;
        }
        if (obj == 'PermanentAddressofparents') {
          this.new_draft_details_array.Permanent_addressof_parents.new_address_parent_permenent_village =
            '';
          this.Permanent_village_ward_array = [];
          this.statcode =
            this.new_draft_details_array.Permanent_addressof_parents.new_address_parent_permenent_state;
          this.district =
            this.new_draft_details_array.Permanent_addressof_parents.new_address_parent_permenent_district;
          this.ruralurban =
            this.new_draft_details_array.Permanent_addressof_parents.new_address_parent_permenent_rural_urabn;
          this.mandalmuncipality =
            this.new_draft_details_array.Permanent_addressof_parents.new_address_parent_permenent_mmc;
        }
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
          if (obj == 'Addressofparents') {
            this.village_ward_array = responce.Details;
          }
          if (obj == 'PermanentAddressofparents') {
            this.Permanent_village_ward_array = responce.Details;
          }
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
          if (obj == 'Addressofparents') {
            this.village_ward_array = [];
          }
          if (obj == 'PermanentAddressofparents') {
            this.Permanent_village_ward_array = [];
          }
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
      obj == 'Addressofparents' &&
      this.new_draft_details_array.addressof_parents.new_address_parent_pincode == '' &&
      this.new_draft_details_array.addressof_parents.new_address_parent_pincode.length <
      6
    ) {
      this.spinner.hide();
      this.Parents_postal_array = [];
      this.new_draft_details_array.addressof_parents.new_address_parent_postoff = '';
      this.alt.warning('enter 6 digits postal code');
      return;
    } else if (
      obj == 'PermanentAddressofparents' &&
      this.new_draft_details_array.Permanent_addressof_parents
        .new_address_parent_permenent_pincode == '' &&
      this.new_draft_details_array.Permanent_addressof_parents
        .new_address_parent_permenent_pincode.length < 6
    ) {
      this.spinner.hide();
      this.Permanent_Parents_postal_array = [];
      this.new_draft_details_array.Permanent_addressof_parents.new_address_permenent_postoff =
        '';
      this.alt.warning('enter 6 digits postal code');
      return;
    } else if (
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
        if (obj == 'Addressofparents') {
          this.new_draft_details_array.addressof_parents.new_address_parent_postoff =
            '';
          this.Parents_postal_array = [];
          this.pincode =
            this.new_draft_details_array.addressof_parents.new_address_parent_pincode;
        }
        if (obj == 'PermanentAddressofparents') {
          this.new_draft_details_array.addressof_parents.new_address_parent_postoff =
            '';
          this.Permanent_Parents_postal_array = [];
          this.pincode =
            this.new_draft_details_array.Permanent_addressof_parents.new_address_parent_permenent_pincode;
        }
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

          if (obj == 'Addressofparents') {
            this.Parents_postal_array = responce.Details;
          }
          if (obj == 'PermanentAddressofparents') {
            this.Permanent_Parents_postal_array = responce.Details;
          }
          if (obj == 'placeofbirth') {
            this.placeofbirth_postal_array = responce.Details;
          }
        } else {
          if (obj == 'Addressofparents') {
            this.Parents_postal_array = [];
          }
          if (obj == 'PermanentAddressofparents') {
            this.Permanent_Parents_postal_array = [];
          }
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
  userremarks: any;
  async Application_final_submit(): Promise<void> {
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
        // let jsobobj = this.replaceNullWithEmptyString(this.new_draft_details_array);
        // let final_submit_json:any[]=[];
        // if(this.childnameshow){
        //   final_submit_json.push({childinformation: jsobobj.childinformation});
        // }
        const req = new basemodel();
        //req.type = '1009';
        req.type = '1017';
        req.param1 = this.brapplicationid;
        req.param2 = this.userremarks;
        req.param3 = this.typeofcorrection;
        req.param4 = this.applicationregid;
        req.param5 = this.applicationid;
        req.json2 = this.new_draft_details_array;
        this.spinner.show();
        let rsdata: any = await this.auth.auth_pkgcrsbirth_service(req);
        this.spinner.hide();
        if (rsdata.code) {
          if (rsdata.code && rsdata.Details[0].STATUS == '1') {
            if(this.photoselectedFiles.length > 0){
              this.documentinsert();
            }
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
  async documentdelte(obj: any): Promise<void> {
    try {
      const req = new basemodel();
      req.type = '1014';
      req.param1 = obj.BR_APPLICATION_ID;
      req.param2 = obj.BR_DOCUMENT_CODE;
      this.spinner.show();
      let rsdata: any = await this.auth.auth_pkgcrsbirth_service(req);
      this.spinner.hide();
      if (rsdata.code) {
        if (rsdata.code && rsdata.Details[0].STATUS == '1') {
          this.get_document_details();
          this.alt.toastsuccess(rsdata.Details[0].STATUS_TEXT + rsdata.Details[0].STATUS_TEXT_TEL);
        }
        if (rsdata.code && rsdata.Details[0].STATUS == '0') {
          this.alt.toasterror(rsdata.Details[0].STATUS_TEXT + rsdata.Details[0].STATUS_TEXT_TEL);
        }
      } else {
        this.alt.toasterror('document delete fail.');
        this.spinner.hide();
      }
    } catch (error) {
      this.spinner.hide();

    }
  }
  Numberofchildrencheck() {
    if (parseInt(this.new_draft_details_array.legal.new_number_of_children) > 8) {
      this.new_draft_details_array.legal.new_number_of_children = '';
      this.alt.toasterror('Number of children born alive to the mother');
    } else if (
      parseInt(this.new_draft_details_array.legal.new_number_of_children) == 0
    ) {
      this.new_draft_details_array.legal.new_number_of_children = '';
      this.alt.toasterror('Number of children born alive to the mother');
    }
  }
  Birthweightcheck() {
    if (parseInt(this.new_draft_details_array.legal.new_birth_weight) > 8) {
      this.new_draft_details_array.legal.new_birth_weight = '';
      this.alt.toasterror('Birth weight should be less than or equal to 8 Kg');
    } else if (parseInt(this.new_draft_details_array.legal.new_birth_weight) == 0) {
      this.new_draft_details_array.legal.new_birth_weight = '';
      this.alt.toasterror('Birth weight should be less than or equal to 8 Kg');
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
  MethodofDelivery_master_array: any[] = [];
  async get_MethodofDelivery(): Promise<void> {
    try {
      const req = new basemodel();
      req.type = '1016';
      req.param1 = this.new_draft_details_array.placeofbirth.new_place_of_birth;
      this.spinner.show();
      this.MethodofDelivery_master_array = [];
      let responce: any = await this.auth.auth_utilities_service(req);

      this.spinner.hide();
      if (responce.code) {
        this.MethodofDelivery_master_array = responce.Details;
      } else {
        this.MethodofDelivery_master_array = [];
        this.spinner.hide();
      }
    } catch (error) {
      this.spinner.hide();

    }
  }
  Typeofattention_master_array: any[] = [];
  async get_Typeofattention(): Promise<void> {
    try {
      const req = new basemodel();
      req.type = '1015';
      req.param1=this.draft_details_array.placeofbirth.place_of_birth;
      req.param2=this.Hospital_master_array.find(x=>x.HOSPITAL_CODE==this.draft_details_array.placeofbirth.place_of_birth_hospital).HOSPITAL_CATEGORY;
      req.param25='BIRTH';
      this.spinner.show();
      debugger
      this.Typeofattention_master_array = [];
      let responce: any = await this.auth.auth_utilities_service(req);
      this.spinner.hide();
      if (responce.code) {
        this.Typeofattention_master_array = responce.Details;
        if(this.draft_details_array.placeofbirth.place_of_birth=='1'){
          this.draft_details_array.legal.type_of_attention=this.Typeofattention_master_array[0].ATTENTION_CODE;
        }
      } else {
        this.Typeofattention_master_array = [];
        this.spinner.hide();
      }
    } catch (error) {
      this.spinner.hide();
     
    }
  }
  
  sameasaddress_toggleRadio(value: string): void {
    if (
      this.new_draft_details_array.Permanent_addressof_parents
        .new_address_parent_sameasaddress === value
    ) {
      this.new_draft_details_array.Permanent_addressof_parents.new_address_parent_sameasaddress =
        '';
      this.clearsameassaddress();
    } else {
      this.new_draft_details_array.Permanent_addressof_parents.new_address_parent_sameasaddress =
        value;
      if (value == 'Yes') {
        this.clearsameassaddress();
        if (this.new_draft_details_array.addressof_parents.addressof_parentscheck == '1') {
          this.new_draft_details_array.Permanent_addressof_parents = {
            new_address_parent_sameasaddress: value,
            new_address_parent_addressof:
              this.new_draft_details_array.addressof_parents.new_addressof,
            new_address_parent_permenent_country:
              this.new_draft_details_array.addressof_parents.new_address_parent_country,
            new_address_parent_permenent_country_address:
              this.new_draft_details_array.addressof_parents
                .new_address_parent_country_address,
            new_address_parent_permenent_country_address_t:
              this.new_draft_details_array.addressof_parents
                .new_address_parent_country_address_t,
            new_address_parent_permenent_state:
              this.new_draft_details_array.addressof_parents.new_address_parent_state,
            new_address_parent_permenent_district:
              this.new_draft_details_array.addressof_parents.new_address_parent_district,
            new_address_parent_permenent_mmc:
              this.new_draft_details_array.addressof_parents.new_address_parent_mmc,
            new_address_parent_permenent_rural_urabn:
              this.new_draft_details_array.addressof_parents
                .new_address_parent_rural_urabn,
            new_address_parent_permenent_village:
              this.new_draft_details_array.addressof_parents
                .new_address_parent_Village_Town,
            new_address_parent_permenent_pincode:
              this.new_draft_details_array.addressof_parents.new_address_parent_pincode,
            new_address_parent_permenent_building_no:
              this.new_draft_details_array.addressof_parents
                .new_address_parent_building_name,
            new_address_parent_permenent_building_no_t:
              this.new_draft_details_array.addressof_parents
                .new_address_parent_building_name_t,
            new_address_parent_permenent_hose_no:
              this.new_draft_details_array.addressof_parents.new_address_parent_house_no,
            new_address_parent_permenent_hose_no_t:
              this.new_draft_details_array.addressof_parents
                .new_address_parent_house_no_t,
            new_address_parent_permenent_street_name:
              this.new_draft_details_array.addressof_parents
                .new_address_parent_street_name,
            new_address_parent_permenent_street_name_t:
              this.new_draft_details_array.addressof_parents
                .new_address_parent_street_name_t,
            new_address_parent_permenent_locality:
              this.new_draft_details_array.addressof_parents
                .new_address_parent_locality,
            new_address_parent_permenent_locality_t:
              this.new_draft_details_array.addressof_parents
                .new_address_parent_locality_t,
            new_address_permenent_postoff:
              this.new_draft_details_array.addressof_parents.new_address_parent_postoff,

            new_address_parent_permenent_country_val: '',
            new_address_parent_permenent_country_address_val: '',
            new_address_parent_permenent_state_val: '',
            new_address_parent_permenent_district_val: '',
            new_address_parent_permenent_mmc_val: '',
            new_address_parent_permenent_rural_urabn_val: '',
            new_address_parent_permenent_village_val: '',
            new_address_parent_permenent_building_no_val: '',
            new_address_parent_permenent_hose_no_val: '',
            new_address_parent_permenent_street_name_val: '',
            new_address_parent_permenent_locality_post_office_val: '',
            new_address_permenent_postoff_val: '',
            address_permenentcheck: '1',
          };
        } else {
          this.alt.toasterror("Please Enter Address of parents at the time of birth of the child First To Select This Option");
          this.new_draft_details_array.Permanent_addressof_parents.new_address_parent_sameasaddress =
            '';
          let el = document.getElementById('address_parent_sameasaddress') as HTMLInputElement;
          el.checked = false;
        }
      }
    }
  }
  clearsameassaddress() {
    this.new_draft_details_array.Permanent_addressof_parents = {
      new_address_parent_sameasaddress: '',
      new_address_parent_addressof: '',
      new_address_parent_permenent_country: '',
      new_address_parent_permenent_country_val: '',
      new_address_parent_permenent_country_address: '',
      new_address_parent_permenent_country_address_t: '',
      new_address_parent_permenent_country_address_val: '',
      new_address_parent_permenent_state: '',
      new_address_parent_permenent_state_val: '',
      new_address_parent_permenent_district: '',
      new_address_parent_permenent_district_val: '',
      new_address_parent_permenent_mmc: '',
      new_address_parent_permenent_mmc_val: '',
      new_address_parent_permenent_rural_urabn: '',
      new_address_parent_permenent_rural_urabn_val: '',
      new_address_parent_permenent_village: '',
      new_address_parent_permenent_village_val: '',
      new_address_parent_permenent_pincode: '',
      new_address_parent_permenent_building_no: '',
      new_address_parent_permenent_building_no_t: '',
      new_address_parent_permenent_building_no_val: '',
      new_address_parent_permenent_hose_no: '',
      new_address_parent_permenent_hose_no_t: '',
      new_address_parent_permenent_hose_no_val: '',
      new_address_parent_permenent_street_name: '',
      new_address_parent_permenent_street_name_t: '',
      new_address_parent_permenent_street_name_val: '',
      new_address_parent_permenent_locality: '',
      new_address_parent_permenent_locality_t: '',
      new_address_parent_permenent_locality_post_office_val: '',
      new_address_permenent_postoff: '',
      new_address_permenent_postoff_val: '',
      address_permenentcheck: '1',
    };
  }
  async validateaadhaar(aadhaar: any, inputsource: any) {
    const checknumaric = this.val.isNumber(aadhaar);
    if (aadhaar.length === 12 && checknumaric == true) {
      const isValidAadhaar = this.mid.validateVerhoeff(aadhaar);
      if (isValidAadhaar == false) {
        if (inputsource == 'childaadhaar') {
          this.new_draft_details_array.childinformation.new_aadhaar = '';
          this.new_draft_details_array.childinformation.new_aadhaarmask = '';
        }
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

        if (inputsource == 'childaadhaar') {
          this.new_draft_details_array.childinformation.new_aadhaar =
            this.new_draft_details_array.childinformation.new_aadhaarmask;
          this.new_draft_details_array.childinformation.new_aadhaarmask =
            this.maskinput(
              this.new_draft_details_array.childinformation.new_aadhaarmask
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
          this.new_draft_details_array.motherInformation.new_mother_aadhhar_number =
            this.new_draft_details_array.motherInformation.new_mother_aadhaar_number_mask;
          this.new_draft_details_array.motherInformation.new_mother_aadhaar_number_mask =
            this.maskinput(
              this.new_draft_details_array.motherInformation
                .new_mother_aadhaar_number_mask
            );
        }

      }
      //this.validateaadharchildparent(inputsource);
    } else if (aadhaar.length < 12) {
      if (inputsource == 'childaadhaar') {
        this.new_draft_details_array.childinformation.new_aadhaar = '';
        this.new_draft_details_array.childinformation.new_aadhaarmask = '';
      }
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
    } else {
      if (inputsource == 'childaadhaar') {
        this.new_draft_details_array.childinformation.new_aadhaar = '';
        this.new_draft_details_array.childinformation.new_aadhaarmask = '';
      }
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
  maskinput(objinput: string) {
    const maskedAadhaar = objinput.replace(/\d(?=\d{4})/g, '*');
    return maskedAadhaar !== '' ? maskedAadhaar : '';
  }

  isFirstNameWhitespaceOnly:boolean = false;
  isMiddleNameWhitespaceOnly:boolean = false;
  isLastNameWhitespaceOnly:boolean = false;
  onNameChange() {
    let trimmedValue = this.new_draft_details_array.childinformation.new_fullname.trim();
    this.isFirstNameWhitespaceOnly = trimmedValue.length === 0;
    this.new_draft_details_array.childinformation.new_fullname = trimmedValue;

    let trimmedValue1 = this.new_draft_details_array.childinformation.new_middlename.trim();
    this.isMiddleNameWhitespaceOnly = trimmedValue1.length === 0;
    this.new_draft_details_array.childinformation.new_middlename = trimmedValue1;

    let trimmedValue2 = this.new_draft_details_array.childinformation.new_surname.trim();
    this.isLastNameWhitespaceOnly = trimmedValue2.length === 0;
    this.new_draft_details_array.childinformation.new_surname = trimmedValue2;

    }
}
