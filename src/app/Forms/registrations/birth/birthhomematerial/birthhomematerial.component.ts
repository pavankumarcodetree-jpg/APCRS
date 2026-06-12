import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Inject, ViewChild, Input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { NgxSpinnerService } from 'ngx-spinner';
import { MiddlewareService } from 'src/app/services/middleware_lyr/middleware.service';
import { AlertsService } from 'src/app/services/alert_lyr/alerts.service';
import { PrivateService } from 'src/app/services/api_lyr/private/private.service';
import { basemodel } from 'src/app/thirparty/model/apimodel';
import { DOCUMENT, DatePipe } from '@angular/common';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { GeolocationService } from 'src/app/services/geolocation.service';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TimepickerConfig } from 'ngx-bootstrap/timepicker';
import { AuthserService } from 'src/app/services/api_lyr/private/authser.service';
import { InputvalidaionService } from 'src/app/thirparty/validation/inputvalidaion.service';
import { Router } from '@angular/router';
import { EncDecService } from 'src/app/services/enc_dec_lyr/enc-dec.service';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-birthhomematerial',
  templateUrl: './birthhomematerial.component.html',
  styleUrl: './birthhomematerial.component.css'
})
export class BirthhomematerialComponent {
contentuploadurl = '';
  contentshowurl = '';
selected: any;
  constructor(
    private spinner: NgxSpinnerService,
    private alt: AlertsService,
    private pscall: PrivateService,
    //private unauth: UnauthserService,
    private val: InputvalidaionService,
    private auth: AuthserService,
    private httpClient: HttpClient,
    private mid: MiddlewareService,
    private datepipe: DatePipe,
    private geolocationService: GeolocationService,
    private sanitizer: DomSanitizer,
    @Inject(DOCUMENT) private document: Document,
    private router: Router,
    private encdc: EncDecService,
    private el: ElementRef
  ) {
    this.maxdate = new Date();
    this.mindate = this.convertToDate('01-01-1970');
    this.Dateoifreportmindate = this.convertToDate('01-12-2024');
    this.contentuploadurl = this.mid.globalsetting.api_url_conent_upload;
    this.contentshowurl = mid.globalsetting.api_url_conent_show;
  }
  // material data
  value: Date | any;
  selected2: any;

  
  //material end
  Deviceid: any;
  maxdate!: Date;
  mindate!: Date;
  Dateoifreportmindate!: Date;
  bsConfig: Partial<BsDatepickerModule> = {
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
  //minTime = '08:00'; // Minimum time in HH:mm format
  //maxTime = '18:00'; // Maximum time in HH:mm format
  tbsConfig: Partial<TimepickerConfig> = {
    hourStep: 1,
    minuteStep: 15,
    showMeridian: true,
    readonlyInput: false,
    mousewheel: true,
    showMinutes: true,
    showSeconds: false,
    showSpinners: true,
    arrowkeys: true,
    min: new Date(0, 0, 0, 9, 0), // Start time: 9:00 AM
    max: new Date(0, 0, 0, 18, 0), // End time: 6:00 PM
  };
  hash: any;
  capthform: any;
  latitude: any;
  longitude: any;
  timeOptions: Array<{ value: string; label: string }> = [];
  selectedRadio3: string = '';
  selectedRadio4: string = '';

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
      childnotnamed: false,
      dateofbirthmask: '',
      dateofbirth: '',
      confirmdateofbirth: '',
      birttime: '',
      selgender: '',
      selgender_val: '',
      selaadhar: '',
      aadhaarmask: '',
      aadhaar: '',
      fullname:'',
      fullname_t:'',
      fullname_val:'',
      surname:'',
      surname_t:'',
      middlename:'',
      middlename_t:'',
      confirm_middle:'',
      confirm_middle_t:'',
      surname_val:'',
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
    },
  };
  RU_CODE: any;
  ngOnInit(): void {
    try {
      if (sessionStorage.getItem('_Uenc') !== '') {
        let obj: any = this.encdc.Getuser();

        if (obj != '' && obj != undefined && obj != null) {
          this.RU_CODE = obj[0].RU_CODE;
          this.getCurrentLocation();
          this.getdraft();
        } else {
          this.encdc.Usersessionkill();
        }
      } else {
        this.router.navigate(['/Sessionexpired']);
      }
    } catch (error) {
      this.alt.warning('check your internet connection and try again');
    }
  }
  async getCurrentLocation() {
    this.geolocationService.getCurrentPosition().subscribe(
      (coords: GeolocationCoordinates) => {
        this.latitude = coords.latitude;
        this.longitude = coords.longitude;
        sessionStorage.setItem('latitude', this.latitude.toString());
        sessionStorage.setItem('longitude', this.longitude.toString());
      },
      (error: any) => {
        console.error('Error getting location', error);
      }
    );
  }

  brapplicationid: any;
  applicationstatus: any;
  async getdraft(): Promise<void> {
    try {
      const req = new basemodel();
      req.type = '1000';
      req.param1 = 'BIRTH';
      this.spinner.show();
      let rsdata: any = await this.auth.auth_pkgcrsbirth_service(req);
      this.brapplicationid = '';

      this.spinner.hide();
      if (rsdata.code) {
        if (rsdata.code && rsdata.Details[0].STATUS == '1') {

          this.brapplicationid = rsdata.Details[0].APPLICATION_ID;
          this.applicationstatus = rsdata.Details[0].APPLICATION_STATUS;
          await this.getstatedata();
          await this.getPlaceofBirth();
          await this.getcountry();
          await this.getHospital();
          await this.getdraft_details();
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
      const req = new basemodel();
      req.type = '1002';
      req.param1 = this.brapplicationid;
      this.spinner.show();

      let rsdata: any = await this.auth.auth_pkgcrsbirth_service(req);

      this.spinner.hide();

      if (rsdata.code) {
        //this.draft_details_array = JSON.parse(rsdata.Details[0].JSON_RESULT);
       let jsobobj= this.replaceNullWithEmptyString(JSON.parse(rsdata.Details[0].JSON_RESULT));
       console.log(jsobobj);
        this.backwindowdraftbinding(jsobobj);
      } else {
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
  async getdraftinsert(): Promise<void> {
    try {
      const req = new basemodel();
      req.type = '1001';
      req.param1 = this.brapplicationid;
      req.param2 = 'NEW';
      req.param3 = this.RU_CODE;
      req.json2 = this.draft_details_array;
      this.spinner.show();

      let rsdata: any = await this.auth.auth_pkgcrsbirth_service(req);
      this.spinner.hide();
      if (rsdata.code) {
        if (rsdata.code && rsdata.Details[0].STATUS == '1') {
          this.getdraft_details();
           this.alt.toastsuccess(rsdata.Details[0].STATUS_TEXT+rsdata.Details[0].STATUS_TEXT_TEL);
        }
        if (rsdata.code && rsdata.Details[0].STATUS == '0') {
           this.alt.toasterror(rsdata.Details[0].STATUS_TEXT+rsdata.Details[0].STATUS_TEXT_TEL);
        }
      } else {
        this.alt.toasterror('Error: Draft could not be saved.');

        this.spinner.hide();
      }
    } catch (error) {
      this.spinner.hide();
     
    }
  }

  async Application_final_submit(): Promise<void> {
    try {
      const req = new basemodel();
      req.type = '1003';
      req.param1 = this.brapplicationid;
      req.param2 = 'NEW';
      req.param3 = this.RU_CODE;
      req.json2 = this.draft_details_array;
      this.spinner.show();
      let rsdata: any = await this.auth.auth_pkgcrsbirth_service(req);

      this.spinner.hide();
      if (rsdata.code) {
        if (rsdata.code && rsdata.Details[0].STATUS == '1') {
           this.alt.toastsuccess(rsdata.Details[0].STATUS_TEXT+rsdata.Details[0].STATUS_TEXT_TEL);
           this.ModalCLose();
           setTimeout(() => {
            window.location.reload();
          }, 1000);
        }
        if (rsdata.code && rsdata.Details[0].STATUS == '0') {
           this.alt.toasterror(rsdata.Details[0].STATUS_TEXT+rsdata.Details[0].STATUS_TEXT_TEL);
        }
        this.spinner.hide();
      } else {
        this.alt.toasterror('The application processing has failed.');
        this.spinner.hide();
      }
    } catch (error) {
      this.spinner.hide();
     
    }
  }

  Childnamedclear(event: Event) {

    const isChecked = (event.target as HTMLInputElement).checked;
    if (isChecked) {
      this.draft_details_array.childinformation.childnotnamed = isChecked
    } else {
      this.draft_details_array.childinformation.fullname = '';
      this.draft_details_array.childinformation.fullname_t = '';
      this.draft_details_array.childinformation.middlename = '';
      this.draft_details_array.childinformation.middlename_t = '';
      this.draft_details_array.childinformation.surname = '';
      this.draft_details_array.childinformation.surname_t = '';
      this.draft_details_array.childinformation.confirm_fullname= '';
      this.draft_details_array.childinformation.confirm_fullname_t= '';
      this.draft_details_array.childinformation.confirm_middle = '';
      this.draft_details_array.childinformation.confirm_middle_t = '';
      this.draft_details_array.childinformation.confirm_surname = '';
      this.draft_details_array.childinformation.confirm_surname_t = '';
    }
  }

  //Common End

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
        let filename = this.brapplicationid + '_' + this.RU_CODE;
        if (this.photoselectedFiles.length > 0) {
          let maxlen = 0;
          let uploadcheck = 0;
          maxlen = this.photoselectedFiles.length;
          for (let ph = 0; ph < maxlen; ph++) {
            this.photofilepath = '';
            const phform = new FormData();
            phform.append('file', this.photoselectedFiles[ph]);
            phform.append('input01', 'Bith');
            phform.append('input02', 'birthregistration');
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
                    console.log('upload completed');

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
      req.type = '1011';
      req.param1 = this.brapplicationid;
      req.param2 = this.documnets.documentcode;
      req.param3 = this.documnets.documentformat;
      req.param4 = this.documnets.documentsize;
      req.param5 = this.documnets.documentdescription;
      req.param6 = this.documnets.documentfilename;
      req.param7 = this.documnets.documentpath;
      this.spinner.show();
      let rsdata: any = await this.auth.auth_pkgcrsbirth_service(req);

      this.spinner.hide();
      if (rsdata.code) {
        if (rsdata.code && rsdata.Details[0].STATUS == '1') {
          this.fileInput.nativeElement.value = '';
          this.documnets.documentcode = '';
          this.documnets.documentdescription = '';
          this.get_document_details();
           this.alt.toastsuccess(rsdata.Details[0].STATUS_TEXT+rsdata.Details[0].STATUS_TEXT_TEL);

         }
        if (rsdata.code && rsdata.Details[0].STATUS == '0') {
           this.alt.toasterror(rsdata.Details[0].STATUS_TEXT+rsdata.Details[0].STATUS_TEXT_TEL);
        }
      } else {
        this.alt.toasterror('Error:  document upload could not be saved.');

        this.spinner.hide();
      }
    } catch (error) {
      this.spinner.hide();
     
    }
  }

    draftdelteconfrimation() {
      Swal.fire({
        title: 'Are You Sure Do You Want to Delete Draft?',
        text: 'Draft Delete!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
      }).then((result: any) => {
        if (result.value) {
          this.draftdelte();
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire('Cancelled', 'Draft Delete Cancelled', 'info');
        }
      });
    }

  async draftdelte(): Promise<void> {
    try {
      const req = new basemodel();
      req.type = '1006';
      req.param1 = this.brapplicationid;
      this.spinner.show();
      let rsdata: any = await this.auth.auth_pkgcrsbirth_service(req);

      this.spinner.hide();
      if (rsdata.code) {
        if (rsdata.code && rsdata.Details[0].STATUS == '1') {

          setTimeout(() => {
            window.location.reload();
          }, 3000);
           this.alt.toastsuccess(rsdata.Details[0].STATUS_TEXT+rsdata.Details[0].STATUS_TEXT_TEL);
        }
        if (rsdata.code && rsdata.Details[0].STATUS == '0') {
           this.alt.toasterror(rsdata.Details[0].STATUS_TEXT+rsdata.Details[0].STATUS_TEXT_TEL);
        }
      } else {
        this.alt.toasterror('draft delete fail.');
        this.spinner.hide();
      }
    } catch (error) {
      this.spinner.hide();
     
    }
  }

  async documentdelte(obj:any): Promise<void> {
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
          this.alt.toastsuccess(rsdata.Details[0].STATUS_TEXT+rsdata.Details[0].STATUS_TEXT_TEL);
        }
        if (rsdata.code && rsdata.Details[0].STATUS == '0') {
           this.alt.toasterror(rsdata.Details[0].STATUS_TEXT+rsdata.Details[0].STATUS_TEXT_TEL);
        }
      } else {
        this.alt.toasterror('document delete fail.');
        this.spinner.hide();
      }
    } catch (error) {
      this.spinner.hide();
     
    }
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
      if (rsdata.code) {
        this.documentlist = rsdata.Details;
      } else {
        this.documentlist = [];
        this.spinner.hide();
      }
    } catch (error) {
      this.spinner.hide();
     
    }
  }

  isImage(url: string): boolean {
    return /\.(jpeg|jpg|png|gif|bmp|webp)$/i.test(url);
  }

  getSafeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
  ViewDoc(image: string) {
    window.open(image, '_blank');
  }

  ///Masters Start

  //Common Functions
  suggestions: any;
  async Teluglanguageconvrt(inputkeyval: any, inputsource: any) {
    this.pscall.google_translate(inputkeyval).subscribe(
      (response: any) => {
        
        if (response[0] != '') // if (response[0] == 'SUCCESS')
           {
          this.suggestions = response[0][0];//response[0][0][0]
          if (inputsource == 'child_fullname') {
            this.draft_details_array.childinformation.fullname_t =
              this.suggestions[0];
          }
          if (inputsource == 'child_fullname_tel') {
            this.draft_details_array.childinformation.fullname_t =
              this.suggestions[0];
          }
          if (inputsource == 'middlename') {
            this.draft_details_array.childinformation.middlename_t =
              this.suggestions[0];
          }
          if (inputsource == 'middlename_t') {
            this.draft_details_array.childinformation.middlename_t =
              this.suggestions[0];
          }
          if (inputsource == 'child_surname') {
            this.draft_details_array.childinformation.surname_t =
              this.suggestions[0];
          }
          if (inputsource == 'child_surname_tel') {
            this.draft_details_array.childinformation.surname_t =
              this.suggestions[0];
          }
          if (inputsource == 'child_confirm_fullname') {
            this.draft_details_array.childinformation.confirm_fullname_t =
              this.suggestions[0];
          }
          if (inputsource == 'child_confirm_fullname_tel') {
            this.draft_details_array.childinformation.confirm_fullname_t =
              this.suggestions[0];
          }
          if (inputsource == 'confirm_middle') {
            this.draft_details_array.childinformation.confirm_middle_t =
              this.suggestions[0];
          }
          if (inputsource == 'confirm_middle_t') {
            this.draft_details_array.childinformation.confirm_middle_t =
              this.suggestions[0];
          }

          if (inputsource == 'child_confirm_surname') {
            this.draft_details_array.childinformation.confirm_surname_t =
              this.suggestions[0];
          }
          if (inputsource == 'child_confirm_surname_tel') {
            this.draft_details_array.childinformation.confirm_surname_t =
              this.suggestions[0];
          }

          if (inputsource == 'father_full_name') {
            this.draft_details_array.fatherInformation.father_full_namer_t =
              this.suggestions[0];
          }
          if (inputsource == 'father_full_name_tel') {
            this.draft_details_array.fatherInformation.father_full_namer_t =
              this.suggestions[0];
          }
          if (inputsource == 'father_middlename') {
            this.draft_details_array.fatherInformation.father_middlename_t =
              this.suggestions[0];
          }
          if (inputsource == 'father_middlename_t') {
            this.draft_details_array.fatherInformation.father_middlename_t =
              this.suggestions[0];
          }

          if (inputsource == 'father_surname') {
            this.draft_details_array.fatherInformation.father_surname_t =
              this.suggestions[0];
          }
          if (inputsource == 'father_surname_tel') {
            this.draft_details_array.fatherInformation.father_surname_t =
              this.suggestions[0];
          }
          if (inputsource == 'father_surname') {
            this.draft_details_array.fatherInformation.father_surname_t =
              this.suggestions[0];
          }
          if (inputsource == 'father_surname_tel') {
            this.draft_details_array.fatherInformation.father_surname_t =
              this.suggestions[0];
          }
          if (inputsource == 'mother_full_name') {
            this.draft_details_array.motherInformation.mother_full_namer_t =
              this.suggestions[0];
          }
          if (inputsource == 'mother_full_name_tel') {
            this.draft_details_array.motherInformation.mother_full_namer_t =
              this.suggestions[0];
          }
          if (inputsource == 'mother_middle_name') {
            this.draft_details_array.motherInformation.mother_middle_name_t =
              this.suggestions[0];
          }
          if (inputsource == 'mother_middle_name_t') {
            this.draft_details_array.motherInformation.mother_middle_name_t =
              this.suggestions[0];
          }
          if (inputsource == 'mother_surname_name') {
            this.draft_details_array.motherInformation.mother_surname_t =
              this.suggestions[0];
          }
          if (inputsource == 'mother_surname_name_tel') {
            this.draft_details_array.motherInformation.mother_surname_t =
              this.suggestions[0];
          }
          if (inputsource == 'address_parent_country_address') {
            this.draft_details_array.addressof_parents.address_parent_country_address_t =
              this.suggestions[0];
          }
          if (inputsource == 'address_parent_country_address_tel') {
            this.draft_details_array.addressof_parents.address_parent_country_address_t =
              this.suggestions[0];
          }
          if (inputsource == 'address_parent_country_address') {
            this.draft_details_array.addressof_parents.address_parent_country_address_t =
              this.suggestions[0];
          }
          if (inputsource == 'address_parent_country_address_tel') {
            this.draft_details_array.addressof_parents.address_parent_country_address_t =
              this.suggestions[0];
          }
          if (inputsource == 'address_parent_building_name') {
            this.draft_details_array.addressof_parents.address_parent_building_name_t =
              this.suggestions[0];
          }
          if (inputsource == 'address_parent_building_name_tel') {
            this.draft_details_array.addressof_parents.address_parent_building_name_t =
              this.suggestions[0];
          }
          if (inputsource == 'address_parent_house_no') {
            this.draft_details_array.addressof_parents.address_parent_house_no_t =
              this.suggestions[0];
          }
          if (inputsource == 'address_parent_house_no_tel') {
            this.draft_details_array.addressof_parents.address_parent_house_no_t =
              this.suggestions[0];
          }
          if (inputsource == 'address_parent_street_name') {
            this.draft_details_array.addressof_parents.address_parent_street_name_t =
              this.suggestions[0];
          }
          if (inputsource == 'address_parent_street_name_tel') {
            this.draft_details_array.addressof_parents.address_parent_street_name_t =
              this.suggestions[0];
          }
          if (inputsource == 'address_parent_Locality_Post') {
            this.draft_details_array.addressof_parents.address_parent_locality_t =
              this.suggestions[0];
          }
          if (inputsource == 'address_parent_Locality_Post_tel') {
            this.draft_details_array.addressof_parents.address_parent_locality_t =
              this.suggestions[0];
          }
          //Permanent
          if (inputsource == 'addressoutsideindia') {
            this.draft_details_array.Permanent_addressof_parents.address_parent_permenent_country_address_t =
              this.suggestions[0];
          }
          if (inputsource == 'addressoutsideindia_tel') {
            this.draft_details_array.Permanent_addressof_parents.address_parent_permenent_country_address_t =
              this.suggestions[0];
          }
          if (inputsource == 'address_parent_permenent_building_no') {
            this.draft_details_array.Permanent_addressof_parents.address_parent_permenent_building_no_t =
              this.suggestions[0];
          }
          if (inputsource == 'address_parent_permenent_building_no_tel') {
            this.draft_details_array.Permanent_addressof_parents.address_parent_permenent_building_no_t =
              this.suggestions[0];
          }

          if (inputsource == 'address_parent_permenent_hose_no') {
            this.draft_details_array.Permanent_addressof_parents.address_parent_permenent_hose_no_t =
              this.suggestions[0];
          }
          if (inputsource == 'address_parent_permenent_hose_no_tel') {
            this.draft_details_array.Permanent_addressof_parents.address_parent_permenent_hose_no_t =
              this.suggestions[0];
          }
          if (inputsource == 'address_parent_permenent_street_name') {
            this.draft_details_array.Permanent_addressof_parents.address_parent_permenent_street_name_t =
              this.suggestions[0];
          }
          if (inputsource == 'address_parent_permenent_street_name_tel') {
            this.draft_details_array.Permanent_addressof_parents.address_parent_permenent_street_name_t =
              this.suggestions[0];
          }
          if (inputsource == 'address_parent_permenent_locality_post_office') {
            this.draft_details_array.Permanent_addressof_parents.address_parent_permenent_locality_t =
              this.suggestions[0];
          }
          if (
            inputsource == 'address_parent_permenent_locality_post_office_tel'
          ) {
            this.draft_details_array.Permanent_addressof_parents.address_parent_permenent_locality_t =
              this.suggestions[0];
          }
          if (inputsource == 'place_of_birth_building_no') {
            this.draft_details_array.placeofbirth.place_of_birth_building_no_t =
              this.suggestions[0];
          }
          if (inputsource == 'place_of_birth_building_no_t') {
            this.draft_details_array.placeofbirth.place_of_birth_building_no_t =
              this.suggestions[0];
          }
          if (inputsource == 'Place_of_birth_house_no') {
            this.draft_details_array.placeofbirth.Place_of_birth_house_no_t =
              this.suggestions[0];
          }
          if (inputsource == 'Place_of_birth_house_no_t') {
            this.draft_details_array.placeofbirth.Place_of_birth_house_no_t =
              this.suggestions[0];
          }
          if (inputsource == 'place_of_birth_street_name') {
            this.draft_details_array.placeofbirth.place_of_birth_street_name_t =
              this.suggestions[0];
          }
          if (inputsource == 'place_of_birth_street_name_t') {
            this.draft_details_array.placeofbirth.place_of_birth_street_name_t =
              this.suggestions[0];
          }
          if (inputsource == 'Place_of_birth_locality') {
            this.draft_details_array.placeofbirth.Place_of_birth_locality_t =
              this.suggestions[0];
          }
          if (inputsource == 'Place_of_birth_locality_t') {
            this.draft_details_array.placeofbirth.Place_of_birth_locality_t =
              this.suggestions[0];
          }
          if (inputsource == 'Informant_fullname') {
            this.draft_details_array.information.Informant_fullname_t =
              this.suggestions[0];
          }
          if (inputsource == 'Informant_fullname_t') {
            this.draft_details_array.information.Informant_fullname_t =
              this.suggestions[0];
          }
          if (inputsource == 'Informant_address') {
            this.draft_details_array.information.Informant_address_t =
              this.suggestions[0];
          }
          if (inputsource == 'Informant_address_t') {
            this.draft_details_array.information.Informant_address_t =
              this.suggestions[0];
          }
          if (inputsource == 'father_religion_other') {
            this.draft_details_array.legal.father_religion_other_t = this.suggestions[0];
          }
          if (inputsource == 'father_religion_other_t') {
            this.draft_details_array.legal.father_religion_other_t =  this.suggestions[0];
          }
          if (inputsource == 'mother_religion_other') {
            this.draft_details_array.legal.mother_religion_other_t = this.suggestions[0];
          }
          if (inputsource == 'mother_religion_other_t') {
            this.draft_details_array.legal.mother_religion_other_t =  this.suggestions[0];
          }
        } else {
          if (inputsource == 'child_fullname') {
            this.draft_details_array.childinformation.fullname_t = '';
          }
          if (inputsource == 'child_fullname_tel') {
            this.draft_details_array.childinformation.fullname_t = '';
          }
          if (inputsource == 'middlename') {
            this.draft_details_array.childinformation.middlename_t = '';
          }
          if (inputsource == 'middlename_t') {
            this.draft_details_array.childinformation.middlename_t = '';
          }
          if (inputsource == 'child_surname') {
            this.draft_details_array.childinformation.surname_t = '';
          }
          if (inputsource == 'child_surname_tel') {
            this.draft_details_array.childinformation.surname_t = '';
          }
          if (inputsource == 'child_confirm_fullname') {
            this.draft_details_array.childinformation.confirm_fullname_t = '';
          }
          if (inputsource == 'child_confirm_fullname_tel') {
            this.draft_details_array.childinformation.confirm_fullname_t = '';
          }
          if (inputsource == 'confirm_middle') {
            this.draft_details_array.childinformation.confirm_middle_t = '';
          }
          if (inputsource == 'confirm_middle_t') {
            this.draft_details_array.childinformation.confirm_middle_t = '';
          }

          if (inputsource == 'child_confirm_surname') {
            this.draft_details_array.childinformation.confirm_surname_t = '';
          }
          if (inputsource == 'child_confirm_surname_tel') {
            this.draft_details_array.childinformation.confirm_surname_t = '';
          }

          if (inputsource == 'father_full_name') {
            this.draft_details_array.fatherInformation.father_full_namer_t = '';
          }
          if (inputsource == 'father_full_name_tel') {
            this.draft_details_array.fatherInformation.father_full_namer_t = '';
          }
          if (inputsource == 'father_middlename') {
            this.draft_details_array.fatherInformation.father_middlename_t = '';
          }
          if (inputsource == 'father_middlename_t') {
            this.draft_details_array.fatherInformation.father_middlename_t = '';
          }

          if (inputsource == 'father_surname') {
            this.draft_details_array.fatherInformation.father_surname_t = '';
          }
          if (inputsource == 'father_surname_tel') {
            this.draft_details_array.fatherInformation.father_surname_t = '';
          }
          if (inputsource == 'father_surname') {
            this.draft_details_array.fatherInformation.father_surname_t = '';
          }
          if (inputsource == 'father_surname_tel') {
            this.draft_details_array.fatherInformation.father_surname_t = '';
          }
          if (inputsource == 'mother_full_name') {
            this.draft_details_array.motherInformation.mother_full_namer_t = '';
          }
          if (inputsource == 'mother_full_name_tel') {
            this.draft_details_array.motherInformation.mother_full_namer_t = '';
          }
          if (inputsource == 'mother_middle_name') {
            this.draft_details_array.motherInformation.mother_middle_name_t =
              '';
          }
          if (inputsource == 'mother_middle_name_t') {
            this.draft_details_array.motherInformation.mother_middle_name_t =
              '';
          }
          if (inputsource == 'mother_surname_name') {
            this.draft_details_array.motherInformation.mother_surname_t = '';
          }
          if (inputsource == 'mother_surname_name_tel') {
            this.draft_details_array.motherInformation.mother_surname_t = '';
          }
          if (inputsource == 'address_parent_country_address') {
            this.draft_details_array.addressof_parents.address_parent_country_address_t =
              '';
          }
          if (inputsource == 'address_parent_country_address_tel') {
            this.draft_details_array.addressof_parents.address_parent_country_address_t =
              '';
          }
          if (inputsource == 'address_parent_country_address') {
            this.draft_details_array.addressof_parents.address_parent_country_address_t =
              '';
          }
          if (inputsource == 'address_parent_country_address_tel') {
            this.draft_details_array.addressof_parents.address_parent_country_address_t =
              '';
          }
          if (inputsource == 'address_parent_building_name') {
            this.draft_details_array.addressof_parents.address_parent_building_name_t =
              '';
          }
          if (inputsource == 'address_parent_building_name_tel') {
            this.draft_details_array.addressof_parents.address_parent_building_name_t =
              '';
          }
          if (inputsource == 'address_parent_house_no') {
            this.draft_details_array.addressof_parents.address_parent_house_no_t =
              '';
          }
          if (inputsource == 'address_parent_house_no_tel') {
            this.draft_details_array.addressof_parents.address_parent_house_no_t =
              '';
          }
          if (inputsource == 'address_parent_street_name') {
            this.draft_details_array.addressof_parents.address_parent_street_name_t =
              '';
          }
          if (inputsource == 'address_parent_street_name_tel') {
            this.draft_details_array.addressof_parents.address_parent_street_name_t =
              '';
          }
          if (inputsource == 'address_parent_Locality_Post') {
            this.draft_details_array.addressof_parents.address_parent_locality_t =
              '';
          }
          if (inputsource == 'address_parent_Locality_Post_tel') {
            this.draft_details_array.addressof_parents.address_parent_locality_t =
              '';
          }
          //Permanent
          if (inputsource == 'addressoutsideindia') {
            this.draft_details_array.Permanent_addressof_parents.address_parent_permenent_country_address_t =
              '';
          }
          if (inputsource == 'addressoutsideindia_tel') {
            this.draft_details_array.Permanent_addressof_parents.address_parent_permenent_country_address_t =
              '';
          }
          if (inputsource == 'address_parent_permenent_building_no') {
            this.draft_details_array.Permanent_addressof_parents.address_parent_permenent_building_no_t =
              '';
          }
          if (inputsource == 'address_parent_permenent_building_no_tel') {
            this.draft_details_array.Permanent_addressof_parents.address_parent_permenent_building_no_t =
              '';
          }

          if (inputsource == 'address_parent_permenent_hose_no') {
            this.draft_details_array.Permanent_addressof_parents.address_parent_permenent_hose_no_t =
              '';
          }
          if (inputsource == 'address_parent_permenent_hose_no_tel') {
            this.draft_details_array.Permanent_addressof_parents.address_parent_permenent_hose_no_t =
              '';
          }
          if (inputsource == 'address_parent_permenent_street_name') {
            this.draft_details_array.Permanent_addressof_parents.address_parent_permenent_street_name_t =
              '';
          }
          if (inputsource == 'address_parent_permenent_street_name_tel') {
            this.draft_details_array.Permanent_addressof_parents.address_parent_permenent_street_name_t =
              '';
          }
          if (inputsource == 'address_parent_permenent_locality_post_office') {
            this.draft_details_array.Permanent_addressof_parents.address_parent_permenent_locality_t =
              '';
          }
          if (
            inputsource == 'address_parent_permenent_locality_post_office_tel'
          ) {
            this.draft_details_array.Permanent_addressof_parents.address_parent_permenent_locality_t =
              '';
          }
          if (inputsource == 'place_of_birth_building_no') {
            this.draft_details_array.placeofbirth.place_of_birth_building_no_t =
              '';
          }
          if (inputsource == 'place_of_birth_building_no_t') {
            this.draft_details_array.placeofbirth.place_of_birth_building_no_t =
              '';
          }
          if (inputsource == 'Place_of_birth_house_no') {
            this.draft_details_array.placeofbirth.Place_of_birth_house_no_t =
              '';
          }
          if (inputsource == 'Place_of_birth_house_no_t') {
            this.draft_details_array.placeofbirth.Place_of_birth_house_no_t =
              '';
          }
          if (inputsource == 'place_of_birth_street_name') {
            this.draft_details_array.placeofbirth.place_of_birth_street_name_t =
              '';
          }
          if (inputsource == 'place_of_birth_street_name_t') {
            this.draft_details_array.placeofbirth.place_of_birth_street_name_t =
              '';
          }
          if (inputsource == 'Place_of_birth_locality') {
            this.draft_details_array.placeofbirth.Place_of_birth_locality_t =
              '';
          }
          if (inputsource == 'Place_of_birth_locality_t') {
            this.draft_details_array.placeofbirth.Place_of_birth_locality_t =
              '';
          }
          if (inputsource == 'Informant_fullname') {
            this.draft_details_array.information.Informant_fullname_t = '';
          }
          if (inputsource == 'Informant_fullname_t') {
            this.draft_details_array.information.Informant_fullname_t = '';
          }
          if (inputsource == 'Informant_address') {
            this.draft_details_array.information.Informant_address_t = '';
          }
          if (inputsource == 'Informant_address_t') {
            this.draft_details_array.information.Informant_address_t = '';
          }
          if (inputsource == 'father_religion_other') {
            this.draft_details_array.legal.father_religion_other_t = '';
          }
          if (inputsource == 'father_religion_other_t') {
            this.draft_details_array.legal.father_religion_other_t = '';
          }
          if (inputsource == 'mother_religion_other') {
            this.draft_details_array.legal.mother_religion_other = '';
          }
          if (inputsource == 'mother_religion_other_t') {
            this.draft_details_array.legal.mother_religion_other_t  = '';
          }
        }
      },
      (error) => {
        console.error('Error transliterating text:', error);
        return '';
      }
    );
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
  async StatisticalInformationservice() {
    this.get_Father_Mother_Religion();
    this.get_Father_mother_Education();
    this.get_Father_mother_occupation();
    this.get_Typeofattention();
    this.get_MethodofDelivery();
  }

  FatherReligion_master_array: any[] = [];
  MotherReligion_master_array: any[] = [];
  async get_Father_Mother_Religion(): Promise<void> {
    try {
      const req = new basemodel();
      req.type = '1012';
      this.spinner.show();
      this.FatherReligion_master_array = [];
      this.MotherReligion_master_array = [];
      let responce: any = await this.auth.auth_utilities_service(req);

      this.spinner.hide();
      if (responce.code) {
        this.FatherReligion_master_array = responce.Details;
        this.MotherReligion_master_array = responce.Details;
      } else {
        this.FatherReligion_master_array = [];
        this.MotherReligion_master_array = [];
        this.spinner.hide();
      }
    } catch (error) {
      this.spinner.hide();
     
    }
  }
  FatherEducation_master_array: any[] = [];
  MotehrEducation_master_array: any[] = [];
  async get_Father_mother_Education(): Promise<void> {
    try {
      const req = new basemodel();
      req.type = '1013';
      this.spinner.show();
      this.FatherEducation_master_array = [];
      this.MotehrEducation_master_array = [];
      let responce: any = await this.auth.auth_utilities_service(req);

      this.spinner.hide();
      if (responce.code) {
        this.FatherEducation_master_array = responce.Details;
        this.MotehrEducation_master_array = responce.Details;
      } else {
        this.FatherEducation_master_array = [];
        this.MotehrEducation_master_array = [];
        this.spinner.hide();
      }
    } catch (error) {
      this.spinner.hide();
     
    }
  }
  Fatheroccupation_master_array: any[] = [];
  Mohter_occupation_master_array: any[] = [];
  async get_Father_mother_occupation(): Promise<void> {
    try {
      const req = new basemodel();
      req.type = '1014';
      this.spinner.show();
      this.Fatheroccupation_master_array = [];
      this.Mohter_occupation_master_array = [];
      let responce: any = await this.auth.auth_utilities_service(req);

      this.spinner.hide();
      if (responce.code) {
        this.Fatheroccupation_master_array = responce.Details;
        this.Mohter_occupation_master_array = responce.Details;
      } else {
        this.Fatheroccupation_master_array = [];
        this.Mohter_occupation_master_array = [];
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
  MethodofDelivery_master_array: any[] = [];
  async get_MethodofDelivery(): Promise<void> {
    try {
      const req = new basemodel();
      req.type = '1016';
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
  SupportingDocuments_master_array: any[] = [];
  async get_SupportingDocuments(): Promise<void> {
    try {
      const req = new basemodel();
      req.type = '1017';
      req.param1 = this.draft_details_array.placeofbirth.place_of_birth;
      this.spinner.show();
      this.SupportingDocuments_master_array = [];
      let responce: any = await this.auth.auth_utilities_service(req);

      this.spinner.hide();
      if (responce.code) {
        this.SupportingDocuments_master_array = responce.Details;
      } else {
        this.SupportingDocuments_master_array = [];
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
      this.draft_details_array.addressof_parents.address_parent_state == ''
    ) {
      this.spinner.hide();
      this.Addressofparents_district_array = [];
      this.draft_details_array.addressof_parents.address_parent_state = '';
      this.alt.warning('select  Permanent Address of parents State');
      return;
    } else if (
      obj == 'PermanentAddressofparents' &&
      this.draft_details_array.Permanent_addressof_parents
        .address_parent_permenent_state == ''
    ) {
      this.spinner.hide();
      this.Permanent_Addressofparents_district_array = [];
      this.draft_details_array.Permanent_addressof_parents.address_parent_permenent_state =
        '';
      this.alt.warning('select Permanent Address of parents State');
      return;
    } else if (
      obj == 'placeofbirth' &&
      this.draft_details_array.placeofbirth.place_of_birth_state == ''
    ) {
      this.spinner.hide();
      this.PlaceofBirth_district_array = [];
      this.draft_details_array.placeofbirth.place_of_birth_state = '';
      this.alt.warning('select Place of Birth State');
      return;
    } else if (
      obj == 'staticstical' &&
      this.draft_details_array.legal.mother_residence_state == ''
    ) {
      this.spinner.hide();
      this.staticstical_district_array = [];
      this.draft_details_array.placeofbirth.place_of_birth_state = '';
      this.alt.warning('select State');
      return;
    } else {
      if (obj == 'Addressofparents') {
        this.draft_details_array.addressof_parents.address_parent_district = '';
        this.draft_details_array.addressof_parents.address_parent_rural_urabn =
          '';
        this.statcode =
          this.draft_details_array.addressof_parents.address_parent_state;
      }
      if (obj == 'PermanentAddressofparents') {
        this.draft_details_array.Permanent_addressof_parents.address_parent_permenent_district =
          '';
        this.draft_details_array.Permanent_addressof_parents.address_parent_permenent_rural_urabn =
          '';
        this.statcode =
          this.draft_details_array.Permanent_addressof_parents.address_parent_permenent_state;
      }
      if (obj == 'placeofbirth') {
        this.draft_details_array.placeofbirth.place_of_birth_district = '';
        this.draft_details_array.placeofbirth.place_of_birth_rural_urabn = '';
        this.statcode =
          this.draft_details_array.placeofbirth.place_of_birth_state;
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
    this.draft_details_array.addressof_parents.address_parent_rural_urabn = '';
    this.draft_details_array.addressof_parents.address_parent_mmc = '';
    this.draft_details_array.addressof_parents.address_parent_Village_Town = '';
    this.Addressofparents_MandalMuncipality_array = [];
  }
  async Permanent_Addressof_districtchange(): Promise<void> {
    this.draft_details_array.Permanent_addressof_parents.address_parent_permenent_rural_urabn =
      '';
    this.draft_details_array.Permanent_addressof_parents.address_parent_permenent_mmc =
      '';
    this.draft_details_array.Permanent_addressof_parents.address_parent_permenent_village =
      '';
    this.Permanent_Addressofparents_MandalMuncipality_array = [];
  }
  async PlaceofBirth_districtchange(): Promise<void> {
    this.draft_details_array.placeofbirth.place_of_birth_rural_urabn = '';
    this.draft_details_array.placeofbirth.place_of_birth_mmc = '';
    this.draft_details_array.placeofbirth.place_of_birth_village = '';
    this.placeofbirth_MandalMuncipality_array = [];
  }
  async staticstical_districtchange(): Promise<void> {
    this.draft_details_array.legal.mother_residence_rural_urban = '';
    this.draft_details_array.legal.mother_residence_Mmc = '';
    this.draft_details_array.legal.mother_residence_Village = '';
    this.staticstical_MandalMuncipality_array = [];
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
      this.draft_details_array.addressof_parents.address_parent_district == ''
    ) {
      this.spinner.hide();
      this.Addressofparents_MandalMuncipality_array = [];
      this.draft_details_array.addressof_parents.address_parent_rural_urabn =
        '';
      this.alt.warning('select district');
      return;
    } else if (
      obj == 'PermanentAddressofparents' &&
      this.draft_details_array.Permanent_addressof_parents
        .address_parent_permenent_district == ''
    ) {
      this.spinner.hide();
      this.Permanent_Addressofparents_MandalMuncipality_array = [];
      this.draft_details_array.Permanent_addressof_parents.address_parent_permenent_rural_urabn =
        '';
      this.alt.warning('select district');
      return;
    } else if (
      obj == 'placeofbirth' &&
      this.draft_details_array.placeofbirth.place_of_birth_district == ''
    ) {
      this.spinner.hide();
      this.placeofbirth_MandalMuncipality_array = [];
      this.draft_details_array.placeofbirth.place_of_birth_rural_urabn = '';
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
          this.draft_details_array.addressof_parents.address_parent_mmc = '';
          this.draft_details_array.addressof_parents.address_parent_Village_Town =
            '';
          this.Addressofparents_MandalMuncipality_array = [];
          this.statcode =
            this.draft_details_array.addressof_parents.address_parent_state;
          this.district =
            this.draft_details_array.addressof_parents.address_parent_district;
          this.ruralurban =
            this.draft_details_array.addressof_parents.address_parent_rural_urabn;
        }
        if (obj == 'PermanentAddressofparents') {
          this.draft_details_array.Permanent_addressof_parents.address_parent_permenent_mmc =
            '';
          this.draft_details_array.Permanent_addressof_parents.address_parent_permenent_village =
            '';
          this.Permanent_Addressofparents_MandalMuncipality_array = [];
          this.statcode =
            this.draft_details_array.Permanent_addressof_parents.address_parent_permenent_state;
          this.district =
            this.draft_details_array.Permanent_addressof_parents.address_parent_permenent_district;
          this.ruralurban =
            this.draft_details_array.Permanent_addressof_parents.address_parent_permenent_rural_urabn;
        }
        if (obj == 'placeofbirth') {
          this.draft_details_array.placeofbirth.place_of_birth_mmc = '';
          this.draft_details_array.placeofbirth.place_of_birth_village = '';
          this.Permanent_Addressofparents_MandalMuncipality_array = [];
          this.statcode =
            this.draft_details_array.placeofbirth.place_of_birth_state;
          this.district =
            this.draft_details_array.placeofbirth.place_of_birth_district;
          this.ruralurban =
            this.draft_details_array.placeofbirth.place_of_birth_rural_urabn;
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
      this.draft_details_array.addressof_parents.address_parent_mmc == ''
    ) {
      this.spinner.hide();
      this.village_ward_array = [];
      this.draft_details_array.addressof_parents.address_parent_Village_Town =
        '';
      this.alt.warning('select Mandal/Muncipality');
      return;
    } else if (
      obj == 'PermanentAddressofparents' &&
      this.draft_details_array.Permanent_addressof_parents
        .address_parent_permenent_mmc == ''
    ) {
      this.spinner.hide();
      this.Permanent_village_ward_array = [];
      this.draft_details_array.Permanent_addressof_parents.address_parent_permenent_village =
        '';
      this.alt.warning('select Mandal/Muncipality');
      return;
    } else if (
      obj == 'placeofbirth' &&
      this.draft_details_array.placeofbirth.place_of_birth_mmc == ''
    ) {
      this.spinner.hide();
      this.placeofbirth_village_ward_array = [];
      this.draft_details_array.placeofbirth.place_of_birth_village = '';
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
          this.draft_details_array.addressof_parents.address_parent_Village_Town =
            '';
          this.village_ward_array = [];
          this.statcode =
            this.draft_details_array.addressof_parents.address_parent_state;
          this.district =
            this.draft_details_array.addressof_parents.address_parent_district;
          this.ruralurban =
            this.draft_details_array.addressof_parents.address_parent_rural_urabn;
          this.mandalmuncipality =
            this.draft_details_array.addressof_parents.address_parent_mmc;
        }
        if (obj == 'PermanentAddressofparents') {
          this.draft_details_array.Permanent_addressof_parents.address_parent_permenent_village =
            '';
          this.Permanent_village_ward_array = [];
          this.statcode =
            this.draft_details_array.Permanent_addressof_parents.address_parent_permenent_state;
          this.district =
            this.draft_details_array.Permanent_addressof_parents.address_parent_permenent_district;
          this.ruralurban =
            this.draft_details_array.Permanent_addressof_parents.address_parent_permenent_rural_urabn;
          this.mandalmuncipality =
            this.draft_details_array.Permanent_addressof_parents.address_parent_permenent_mmc;
        }
        if (obj == 'placeofbirth') {
          this.draft_details_array.placeofbirth.place_of_birth_village = '';
          this.placeofbirth_village_ward_array = [];
          this.statcode =
            this.draft_details_array.placeofbirth.place_of_birth_state;
          this.district =
            this.draft_details_array.placeofbirth.place_of_birth_district;
          this.ruralurban =
            this.draft_details_array.placeofbirth.place_of_birth_rural_urabn;
          this.mandalmuncipality =
            this.draft_details_array.placeofbirth.place_of_birth_mmc;
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
      this.draft_details_array.addressof_parents.address_parent_pincode == '' &&
      this.draft_details_array.addressof_parents.address_parent_pincode.length <
        6
    ) {
      this.spinner.hide();
      this.Parents_postal_array = [];
      this.draft_details_array.addressof_parents.address_parent_postoff = '';
      this.alt.warning('enter 6 digits postal code');
      return;
    } else if (
      obj == 'PermanentAddressofparents' &&
      this.draft_details_array.Permanent_addressof_parents
        .address_parent_permenent_pincode == '' &&
      this.draft_details_array.Permanent_addressof_parents
        .address_parent_permenent_pincode.length < 6
    ) {
      this.spinner.hide();
      this.Permanent_Parents_postal_array = [];
      this.draft_details_array.Permanent_addressof_parents.address_permenent_postoff =
        '';
      this.alt.warning('enter 6 digits postal code');
      return;
    } else if (
      obj == 'placeofbirth' &&
      this.draft_details_array.placeofbirth.place_of_birth_pin_code == '' &&
      this.draft_details_array.placeofbirth.place_of_birth_pin_code.length < 6
    ) {
      this.spinner.hide();
      this.placeofbirth_postal_array = [];
      this.draft_details_array.placeofbirth.Place_of_birth_postoff = '';
      this.alt.warning('enter 6 digits postal code');
      return;
    } else {
      try {
        if (obj == 'Addressofparents') {
          this.draft_details_array.addressof_parents.address_parent_postoff =
            '';
          this.Parents_postal_array = [];
          this.pincode =
            this.draft_details_array.addressof_parents.address_parent_pincode;
        }
        if (obj == 'PermanentAddressofparents') {
          this.draft_details_array.addressof_parents.address_parent_postoff =
            '';
          this.Permanent_Parents_postal_array = [];
          this.pincode =
            this.draft_details_array.Permanent_addressof_parents.address_parent_permenent_pincode;
        }
        if (obj == 'placeofbirth') {
          this.draft_details_array.placeofbirth.Place_of_birth_postoff = '';
          this.placeofbirth_postal_array = [];
          this.pincode =
            this.draft_details_array.placeofbirth.place_of_birth_pin_code;
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
   
  //Masters End 
  dateofbirthmax!:Date;dateofbirthmin!:Date;
  confirmdateofbirthmax!:Date;confirmdateofbirthmin!:Date;
  onDateChange(event: any, type: any) {
    const formattedDate = this.datepipe.transform(event, 'dd-MM-yyyy');
    if (type == 'language') {
      this.draft_details_array.language.dateofreport = formattedDate || '';
      //this.dateofbirthmin = event;
      this.dateofbirthmax = event; // Assuming event is a Date object
      this.dateofbirthmin = new Date(event); // Clone the event date
      this.dateofbirthmin.setDate(this.dateofbirthmin.getDate() - 30); // Subtract 30 days
    //this.dateofbirthmax.setDate(this.dateofbirthmin.getDate()-20);
    }
    if (type == 'DateofBirth') {
       this.chekcdatecase();
      this.draft_details_array.childinformation.dateofbirthmask =
        formattedDate || '';
      this.draft_details_array.childinformation.dateofbirth =
        formattedDate || '';
        this.confirmdateofbirthmax = event;
        this.confirmdateofbirthmin=event;
        const currentdatetime=this.datepipe.transform(new Date(), 'dd-MM-yyyy');
        if(formattedDate==currentdatetime){
        this.updateTimeRange();
        }
        this.chekcdatecase();
    }
    if (type == 'confrimDateofBirth') {

      this.draft_details_array.childinformation.confirmdateofbirth =
        formattedDate || '';
       
        this.chekcdatecase();
    }
  }
  // Update min and max time dynamically
  minTime=this.formatTime(new Date());maxTime=this.formatTime(new Date());;
  updateTimeRange() {
    const now = new Date();

    // Set min time to current time
    this.minTime = this.formatTime(now);

    // Set max time to the end of the back day
    const endOfPreviousDay = new Date();
    endOfPreviousDay.setDate(endOfPreviousDay.getDate() - 1); // Subtract 1 day
    endOfPreviousDay.setHours(23, 59, 59, 999); // Set time to 23:59:59.999
    this.maxTime = this.formatTime(endOfPreviousDay); // Format as HH:mm
  }
  formatTime(date: Date): string {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }
  chekcdatecase(){

    if(!this.val.isEmpty(this.draft_details_array.childinformation.confirmdateofbirth)){
    if(this.draft_details_array.childinformation.dateofbirth!=this.draft_details_array.childinformation.confirmdateofbirth){
      this.foc_confirm_DateBirth.nativeElement.focus();
      this.ngConfirmDateBirth.control.setErrors({ mismatch: true });
      this.ngConfirmDateBirth.control.setErrors({ mismatch: true });
      this.draft_details_array.childinformation.confirmdateofbirth='';
      this.alt.toasterror('Child Date of birth and Confim Date of birth Missmach')

    }
  }

  }
  AddressofparentsRadiochange(event: any) {

    const selectedValue = event.target.value;
    this.draft_details_array.addressof_parents = {
      addressof: selectedValue,
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
    };
  }
  permanentAddressofparentsRadiochange(event: any) {

    const selectedValue = event.target.value;
    this.draft_details_array.Permanent_addressof_parents = {
      address_parent_sameasaddress: '',
      address_parent_addressof: selectedValue,
      address_parent_permenent_country: '',
      address_parent_permenent_country_address: '',
      address_parent_permenent_country_address_t: '',
      address_parent_permenent_state: '',
      address_parent_permenent_district: '',
      address_parent_permenent_mmc: '',
      address_parent_permenent_rural_urabn: '',
      address_parent_permenent_village: '',
      address_parent_permenent_pincode: '',
      address_parent_permenent_building_no: '',
      address_parent_permenent_building_no_t: '',
      address_parent_permenent_hose_no: '',
      address_parent_permenent_hose_no_t: '',
      address_parent_permenent_street_name: '',
      address_parent_permenent_street_name_t: '',
      address_parent_permenent_locality: '',
      address_parent_permenent_locality_t: '',
      address_permenent_postoff: '',

      address_parent_permenent_country_val: '',
      address_parent_permenent_country_address_val: '',
      address_parent_permenent_state_val: '',
      address_parent_permenent_district_val: '',
      address_parent_permenent_mmc_val: '',
      address_parent_permenent_rural_urabn_val: '',
      address_parent_permenent_village_val: '',
      address_parent_permenent_building_no_val: '',
      address_parent_permenent_hose_no_val: '',
      address_parent_permenent_street_name_val: '',
      address_parent_permenent_locality_post_office_val: '',
      address_permenent_postoff_val: '',
    };
  }
  sameasaddress_toggleRadio(value: string): void {
    if (
      this.draft_details_array.Permanent_addressof_parents
        .address_parent_sameasaddress === value
    ) {
      this.draft_details_array.Permanent_addressof_parents.address_parent_sameasaddress =
        '';
      this.clearsameassaddress();
    } else {
      this.draft_details_array.Permanent_addressof_parents.address_parent_sameasaddress =
        value;
      if (value == 'Yes') {
        this.clearsameassaddress();
        this.draft_details_array.Permanent_addressof_parents = {
          address_parent_sameasaddress: value,
          address_parent_addressof:
            this.draft_details_array.addressof_parents.addressof,
          address_parent_permenent_country:
            this.draft_details_array.addressof_parents.address_parent_country,
          address_parent_permenent_country_address:
            this.draft_details_array.addressof_parents
              .address_parent_country_address,
          address_parent_permenent_country_address_t:
            this.draft_details_array.addressof_parents
              .address_parent_country_address_t,
          address_parent_permenent_state:
            this.draft_details_array.addressof_parents.address_parent_state,
          address_parent_permenent_district:
            this.draft_details_array.addressof_parents.address_parent_district,
          address_parent_permenent_mmc:
            this.draft_details_array.addressof_parents.address_parent_mmc,
          address_parent_permenent_rural_urabn:
            this.draft_details_array.addressof_parents
              .address_parent_rural_urabn,
          address_parent_permenent_village:
            this.draft_details_array.addressof_parents
              .address_parent_Village_Town,
          address_parent_permenent_pincode:
            this.draft_details_array.addressof_parents.address_parent_pincode,
          address_parent_permenent_building_no:
            this.draft_details_array.addressof_parents
              .address_parent_building_name,
          address_parent_permenent_building_no_t:
            this.draft_details_array.addressof_parents
              .address_parent_building_name_t,
          address_parent_permenent_hose_no:
            this.draft_details_array.addressof_parents.address_parent_house_no,
          address_parent_permenent_hose_no_t:
            this.draft_details_array.addressof_parents
              .address_parent_house_no_t,
          address_parent_permenent_street_name:
            this.draft_details_array.addressof_parents
              .address_parent_street_name,
          address_parent_permenent_street_name_t:
            this.draft_details_array.addressof_parents
              .address_parent_street_name_t,
              address_parent_permenent_locality:
            this.draft_details_array.addressof_parents
              .address_parent_locality,
              address_parent_permenent_locality_t:
            this.draft_details_array.addressof_parents
              .address_parent_locality_t,
          address_permenent_postoff:
            this.draft_details_array.addressof_parents.address_parent_postoff,

          address_parent_permenent_country_val: '',
          address_parent_permenent_country_address_val: '',
          address_parent_permenent_state_val: '',
          address_parent_permenent_district_val: '',
          address_parent_permenent_mmc_val: '',
          address_parent_permenent_rural_urabn_val: '',
          address_parent_permenent_village_val: '',
          address_parent_permenent_building_no_val: '',
          address_parent_permenent_hose_no_val: '',
          address_parent_permenent_street_name_val: '',
          address_parent_permenent_locality_post_office_val: '',
          address_permenent_postoff_val: '',
        };
      }
    }
  }
  clearsameassaddress() {
    this.draft_details_array.Permanent_addressof_parents = {
      address_parent_sameasaddress: '',
      address_parent_addressof: '',
      address_parent_permenent_country: '',
      address_parent_permenent_country_address: '',
      address_parent_permenent_country_address_t: '',
      address_parent_permenent_state: '',
      address_parent_permenent_district: '',
      address_parent_permenent_mmc: '',
      address_parent_permenent_rural_urabn: '',
      address_parent_permenent_village: '',
      address_parent_permenent_pincode: '',
      address_parent_permenent_building_no: '',
      address_parent_permenent_building_no_t: '',
      address_parent_permenent_hose_no: '',
      address_parent_permenent_hose_no_t: '',
      address_parent_permenent_street_name: '',
      address_parent_permenent_street_name_t: '',
      address_parent_permenent_locality: '',
      address_parent_permenent_locality_t: '',
      address_permenent_postoff: '',
      address_parent_permenent_country_val: '',
      address_parent_permenent_country_address_val: '',
      address_parent_permenent_state_val: '',
      address_parent_permenent_district_val: '',
      address_parent_permenent_mmc_val: '',
      address_parent_permenent_rural_urabn_val: '',
      address_parent_permenent_village_val: '',
      address_parent_permenent_building_no_val: '',
      address_parent_permenent_hose_no_val: '',
      address_parent_permenent_street_name_val: '',
      address_parent_permenent_locality_post_office_val: '',
      address_permenent_postoff_val: '',
    };
  }

  async validateaadhaar(aadhaar: any, inputsource: any) {
    const checknumaric = this.val.isNumber(aadhaar);
    if (aadhaar.length === 12 && checknumaric == true) {
      const isValidAadhaar = this.mid.validateVerhoeff(aadhaar);
      if (isValidAadhaar == false) {
        if (inputsource == 'childaadhaar') {
          this.draft_details_array.childinformation.aadhaar = '';
          this.draft_details_array.childinformation.aadhaarmask = '';
        }
        if (inputsource == 'fatheraadhaar') {
          this.draft_details_array.fatherInformation.father_aadhhar_number = '';
          this.draft_details_array.fatherInformation.father_aadhhar_number_mask =
            '';
        }
        if (inputsource == 'motheraadhaar') {
          this.draft_details_array.motherInformation.mother_aadhhar_number = '';
          this.draft_details_array.motherInformation.mother_aadhaar_number_mask =
            '';
        }
        if (inputsource == 'informationaadhaar') {
          this.draft_details_array.information.Informant_aadhhar_no = '';
          this.draft_details_array.information.Informant_aadhhar_no_mask = '';
        }
        this.alt.toasterror('Enter a 12-digit Valid Aadhaar Number.');
      }
      if (isValidAadhaar == true) {
        if (inputsource == 'childaadhaar') {
          this.draft_details_array.childinformation.aadhaar =
            this.draft_details_array.childinformation.aadhaarmask;
          this.draft_details_array.childinformation.aadhaarmask =
            this.maskinput(
              this.draft_details_array.childinformation.aadhaarmask
            );
        }
        if (inputsource == 'fatheraadhaar') {
          this.draft_details_array.fatherInformation.father_aadhhar_number =
            this.draft_details_array.fatherInformation.father_aadhhar_number_mask;
          this.draft_details_array.fatherInformation.father_aadhhar_number_mask =
            this.maskinput(
              this.draft_details_array.fatherInformation
                .father_aadhhar_number_mask
            );
        }
        if (inputsource == 'motheraadhaar') {
          this.draft_details_array.motherInformation.mother_aadhhar_number =
            this.draft_details_array.motherInformation.mother_aadhaar_number_mask;
          this.draft_details_array.motherInformation.mother_aadhaar_number_mask =
            this.maskinput(
              this.draft_details_array.motherInformation
                .mother_aadhaar_number_mask
            );
        }
        if (inputsource == 'informationaadhaar') {
          this.draft_details_array.information.Informant_aadhhar_no =
            this.draft_details_array.information.Informant_aadhhar_no_mask;
          this.draft_details_array.information.Informant_aadhhar_no_mask =
            this.maskinput(
              this.draft_details_array.information.Informant_aadhhar_no_mask
            );
        }
      }
    } else if (aadhaar.length < 12) {
      if (inputsource == 'childaadhaar') {
        this.draft_details_array.childinformation.aadhaar = '';
        this.draft_details_array.childinformation.aadhaarmask = '';
      }
      if (inputsource == 'fatheraadhaar') {
        this.draft_details_array.fatherInformation.father_aadhhar_number = '';
        this.draft_details_array.fatherInformation.father_aadhhar_number_mask =
          '';
      }
      if (inputsource == 'motheraadhaar') {
        this.draft_details_array.motherInformation.mother_aadhhar_number = '';
        this.draft_details_array.motherInformation.mother_aadhaar_number_mask =
          '';
      }
      if (inputsource == 'informationaadhaar') {
        this.draft_details_array.information.Informant_aadhhar_no = '';
        this.draft_details_array.information.Informant_aadhhar_no_mask = '';
      }
      this.alt.toasterror('Enter a 12-digit Aadhaar Number.');
    } else {
      if (inputsource == 'childaadhaar') {
        this.draft_details_array.childinformation.aadhaar = '';
        this.draft_details_array.childinformation.aadhaarmask = '';
      }
      if (inputsource == 'fatheraadhaar') {
        this.draft_details_array.fatherInformation.father_aadhhar_number = '';
        this.draft_details_array.fatherInformation.father_aadhhar_number_mask =
          '';
      }
      if (inputsource == 'motheraadhaar') {
        this.draft_details_array.motherInformation.mother_aadhhar_number = '';
        this.draft_details_array.motherInformation.mother_aadhaar_number_mask =
          '';
      }
      if (inputsource == 'informationaadhaar') {
        this.draft_details_array.information.Informant_aadhhar_no = '';
        this.draft_details_array.information.Informant_aadhhar_no_mask = '';
      }
      this.alt.toasterror('Enter a 12-digit Aadhaar Number.');
    }
    return;
  }
  async changeaadhaarmode() {
    this.draft_details_array.childinformation.aadhaar = '';
    this.draft_details_array.childinformation.aadhaarmask = '';
  }
  maskinput(objinput: string) {
    const maskedAadhaar = objinput.replace(/\d(?=\d{4})/g, '*');
    return maskedAadhaar !== '' ? maskedAadhaar : '';
  }
  combinedData: any;
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

      if (tabId == 'pills-statistical-tab') {
        this.StatisticalInformationservice();
      }
      if (tabId == 'pills-confirmlegal-tab') {
        this.StatisticalInformationservice();
      }
    }
  }
  isLegalEnabled: boolean = true; // Enable the first tab by default
  isStatisticalEnabled: boolean = false;
  isConfirmLegalEnabled: boolean = false;
  isConfirmStatisticalEnabled: boolean = false;
  enableLegalTab() {
    this.isLegalEnabled = true;
    this.openTab('pills-legal-tab');
  }
  enableStatisticalTab() {
    this.legal_from_check_inpts();
  }

  enableConfirmLegalTab() {
    this.statistical_from_check_inpts();
  }

  enableConfirmStatisticalTab() {
    this.openTab('pills-confirmstatistic-tab');
    this.isConfirmStatisticalEnabled = true;
    this.spinner.hide();
  }
  @ViewChild('dateofbirth') dateofbirth!: NgModel;
  @ViewChild('dateofreport') dateofreport!: NgModel;
  @ViewChild('ngConfirmDateBirth') ngConfirmDateBirth!: NgModel;
  @ViewChild('ngfullname') ngfullname!: NgModel;
  @ViewChild('ngConfirm_fullname') ngConfirm_fullname!: NgModel;
  @ViewChild('sel_gender') sel_gender!: NgModel;
  @ViewChild('Place_of_birth') Place_of_birth!: NgModel;
  @ViewChild('ngHospitalName') ngHospitalName!: NgModel;
  @ViewChild('Place_of_birth_state') Place_of_birth_state!: NgModel;
  @ViewChild('Place_of_birth_district') Place_of_birth_district!: NgModel;
  @ViewChild('Place_of_birth_sub_district')
  Place_of_birth_sub_district!: NgModel;
  @ViewChild('place_of_birth_mmc') place_of_birth_mmc!: NgModel;
  @ViewChild('foc_fullname', { static: false }) foc_fullname!: ElementRef;
  @ViewChild('foc_confirm_fullname', { static: false }) foc_confirm_fullname!: ElementRef;
  @ViewChild('foc_confirm_DateBirth', { static: false }) foc_confirm_DateBirth!: ElementRef;
  // @ViewChild('Place_of_birth_village') Place_of_birth_village!: NgModel;
  // @ViewChild('place_of_birth_building_no') place_of_birth_building_no!: NgModel;
  // @ViewChild('Place_of_birth_house_no') Place_of_birth_house_no!: NgModel;
  // @ViewChild('Place_of_birth_street_name') Place_of_birth_street_name!: NgModel;
  // @ViewChild('Place_of_birth_locality') Place_of_birth_locality!: NgModel;
  // @ViewChild('Place_of_birth_pin_code') Place_of_birth_pin_code!: NgModel;
  // @ViewChild('Address_palce_postoff') Address_palce_postoff!: NgModel;


  legal_from_check_inpts() {

    let isInvalid = false;
    if (this.dateofbirth) {
      this.dateofbirth.control.markAsTouched();
      this.dateofbirth.control.updateValueAndValidity();
      if (this.dateofbirth.invalid) isInvalid = true;
    }
    if (this.dateofreport) {
      this.dateofreport.control.markAsTouched();
      this.dateofreport.control.updateValueAndValidity();
      if (this.dateofreport.invalid) isInvalid = true;
    }
    if (this.ngConfirmDateBirth) {
      this.ngConfirmDateBirth.control.markAsTouched();
      this.ngConfirmDateBirth.control.updateValueAndValidity();
      if (this.ngConfirmDateBirth.invalid) isInvalid = true;
    }
    if (this.sel_gender) {
      this.sel_gender.control.markAsTouched();
      this.sel_gender.control.updateValueAndValidity();
      if (this.sel_gender.invalid) isInvalid = true;
    }

    if (this.Place_of_birth) {
      this.Place_of_birth.control.markAsTouched();
      this.Place_of_birth.control.updateValueAndValidity();
      if (this.Place_of_birth.invalid) isInvalid = true;
    }
    if (
      this.ngHospitalName &&
      this.draft_details_array.placeofbirth.place_of_birth == '1'
    ) {
      this.ngHospitalName.control.markAsTouched();
      this.ngHospitalName.control.updateValueAndValidity();
      if (this.ngHospitalName.invalid) isInvalid = true;
    }
    if (
      this.Place_of_birth_state &&
      this.draft_details_array.placeofbirth.place_of_birth != '1'
    ) {
      this.Place_of_birth_state.control.markAsTouched();
      this.Place_of_birth_state.control.updateValueAndValidity();
      if (this.Place_of_birth_state.invalid) isInvalid = true;
    }
    if (
      this.Place_of_birth_district &&
      this.draft_details_array.placeofbirth.place_of_birth != '1'
    ) {
      this.Place_of_birth_district.control.markAsTouched();
      this.Place_of_birth_district.control.updateValueAndValidity();
      if (this.Place_of_birth_district.invalid) isInvalid = true;
    }
    if (
      this.Place_of_birth_sub_district &&
      this.draft_details_array.placeofbirth.place_of_birth != '1'
    ) {
      this.Place_of_birth_sub_district.control.markAsTouched();
      this.Place_of_birth_sub_district.control.updateValueAndValidity();
      if (this.Place_of_birth_sub_district.invalid) isInvalid = true;
    }
    if (
      this.place_of_birth_mmc &&
      this.draft_details_array.placeofbirth.place_of_birth != '1'
    ) {
      this.place_of_birth_mmc.control.markAsTouched();
      this.place_of_birth_mmc.control.updateValueAndValidity();
      if (this.place_of_birth_mmc.invalid) isInvalid = true;
    }
    // if (
    //   this.Place_of_birth_village &&
    //   this.draft_details_array.placeofbirth.place_of_birth != '1'
    // ) {
    //   this.Place_of_birth_village.control.markAsTouched();
    //   this.Place_of_birth_village.control.updateValueAndValidity();
    //   if (this.Place_of_birth_village.invalid) isInvalid = true;
    // }
    // if (
    //   this.place_of_birth_building_no &&
    //   this.draft_details_array.placeofbirth.place_of_birth != '1'
    // ) {
    //   this.place_of_birth_building_no.control.markAsTouched();
    //   this.place_of_birth_building_no.control.updateValueAndValidity();
    //   if (this.place_of_birth_building_no.invalid) isInvalid = true;
    // }
    // if (
    //   this.Place_of_birth_house_no &&
    //   this.draft_details_array.placeofbirth.place_of_birth != '1'
    // ) {
    //   this.Place_of_birth_house_no.control.markAsTouched();
    //   this.Place_of_birth_house_no.control.updateValueAndValidity();
    //   if (this.Place_of_birth_house_no.invalid) isInvalid = true;
    // }
    // if (
    //   this.Place_of_birth_street_name &&
    //   this.draft_details_array.placeofbirth.place_of_birth != '1'
    // ) {
    //   this.Place_of_birth_street_name.control.markAsTouched();
    //   this.Place_of_birth_street_name.control.updateValueAndValidity();
    //   if (this.Place_of_birth_street_name.invalid) isInvalid = true;
    // }
    // if (
    //   this.Place_of_birth_locality &&
    //   this.draft_details_array.placeofbirth.place_of_birth != '1'
    // ) {
    //   this.Place_of_birth_locality.control.markAsTouched();
    //   this.Place_of_birth_locality.control.updateValueAndValidity();
    //   if (this.Place_of_birth_locality.invalid) isInvalid = true;
    // }
    // if (
    //   this.Place_of_birth_pin_code &&
    //   this.draft_details_array.placeofbirth.place_of_birth != '1'
    // ) {
    //   this.Place_of_birth_pin_code.control.markAsTouched();
    //   this.Place_of_birth_pin_code.control.updateValueAndValidity();
    //   if (this.Place_of_birth_pin_code.invalid) isInvalid = true;
    // }
    // if (
    //   this.Address_palce_postoff &&
    //   this.draft_details_array.placeofbirth.place_of_birth != '1'
    // ) {
    //   this.Address_palce_postoff.control.markAsTouched();
    //   this.Address_palce_postoff.control.updateValueAndValidity();
    //   if (this.Address_palce_postoff.invalid) isInvalid = true;
    // }

    if (isInvalid) {
      this.form_alert();
    }
    if (!isInvalid) {
      if (
        this.draft_details_array.childinformation.dateofbirth !=
        this.draft_details_array.childinformation.confirmdateofbirth
      ) {
        this.dateofbirth.control.markAsTouched();
        this.dateofbirth.control.updateValueAndValidity();
        this.ngConfirmDateBirth.control.markAsTouched();
        this.ngConfirmDateBirth.control.updateValueAndValidity();
        this.dateofbirth.control.setErrors({ mismatch: true });
        this.ngConfirmDateBirth.control.setErrors({ mismatch: true });
        this.foc_confirm_DateBirth.nativeElement.focus();
        this.alt.toasterror('Child Date of birth and Confim Date of birth Missmach')
      }
      else if (
        this.draft_details_array.childinformation.fullname.toUpperCase() !=
        this.draft_details_array.childinformation.confirm_fullname.toUpperCase()
      ) {
        this.ngfullname.control.markAsTouched();
        this.ngfullname.control.updateValueAndValidity();
        this.ngConfirm_fullname.control.markAsTouched();
        this.ngConfirm_fullname.control.updateValueAndValidity();
        this.ngfullname.control.setErrors({ mismatch: true });
        this.ngConfirm_fullname.control.setErrors({ mismatch: true });
        this.foc_confirm_fullname.nativeElement.focus();
        this.alt.toasterror('Child First Name and Confim Name Missmach')
      }
      else {

           this.legal_checkAndShowAlert();

      }
    }
  }

  checkcase: string = '';
  child_checkstatus: string = '0';
  father_mother_checkstatus: string = '0';
  father_checkstatus: string = '0';
  mother_checkstatus: string = '0';
  legal_checkAndShowAlert() {
    let alertConfirmText: string = '';
    
    if (
      this.draft_details_array.childinformation.fullname == '' &&
      this.child_checkstatus == '0'
    ) {
      this.checkcase = 'child';
      alertConfirmText =
        "Do you want to continue without Child's Name? బిడ్డ పేరు లేకుండానే కొనసాగించదలచుకున్నారా?";
    } else if (
      this.val.isEmpty(this.draft_details_array.fatherInformation.father_full_namer) &&
      this.val.isEmpty(this.draft_details_array.motherInformation.mother_full_namer) &&
      this.father_mother_checkstatus == '0'
    ) {
      this.checkcase = 'fathermother';
      alertConfirmText =
        'Do you want to keep the information of mother and father blank? మీరు తల్లి మరియు తండ్రి సమాచారము ఖాళీగా ఉంచదలచుకున్నారా?';
    } else if (
      this.val.isEmpty(this.draft_details_array.fatherInformation.father_full_namer) &&
      this.father_checkstatus == '0'
    ) {
      this.checkcase = 'father';
      alertConfirmText =
        'Do you want to keep the information of father blank? మీరు తండ్రి సమాచారము ఖాళీగా ఉంచదలచుకున్నారా?';
    } else if (
      this.val.isEmpty(this.draft_details_array.motherInformation.mother_full_namer) &&
      this.mother_checkstatus == '0'
    ) {
      this.checkcase = 'mother';
      alertConfirmText =
        'Do you want to keep the information of mother blank? మీరు తల్లి సమాచారము ఖాళీగా ఉంచదలచుకున్నారా?';
    }


    if (!this.val.isEmpty(alertConfirmText)) {
      this.checkAndShowAlert_message_show(alertConfirmText, this.checkcase);
    }
    if(!this.val.isEmpty(this.draft_details_array.childinformation.fullname) &&
    !this.val.isEmpty(this.draft_details_array.childinformation.confirm_fullname)){
      this.father_mother_checkstatus = '1'
    }
    if(!this.val.isEmpty(this.draft_details_array.fatherInformation.father_full_namer) &&
    !this.val.isEmpty(this.draft_details_array.motherInformation.mother_full_namer)){
      this.father_mother_checkstatus = '1'
    }
    if(!this.val.isEmpty(this.draft_details_array.motherInformation.mother_full_namer)){
      this.mother_checkstatus = '1'
    }
    
    if(!this.val.isEmpty(this.draft_details_array.fatherInformation.father_full_namer)){
      this.father_checkstatus = '1'
    }
    if(this.father_mother_checkstatus=='1'&&this.mother_checkstatus == '1'&&this.father_checkstatus == '1'){
      this.isStatisticalEnabled = true;
      this.getdraftinsert();
      this.get_document_details();
      this.openTab('pills-statistical-tab');
    }
    
    this.spinner.hide();
  }

  checkAndShowAlert_message_show(message: string, checkcase: string) {
    Swal.fire({
      title: 'Please Confirm !దయచేసి నిర్ధారించండి !',
      text: message,
      showCancelButton: true,
      cancelButtonText: 'Cancel',
      confirmButtonText: 'Confirm',
    }).then((result) => {
      if (result.isConfirmed) {
        switch (checkcase) {
          case 'child':
            this.child_checkstatus = '1';
            break;
          case 'fathermother':
            this.father_mother_checkstatus = '1';
            break;
          case 'father':
            this.father_checkstatus = '1';
            break;
          case 'mother':
            this.mother_checkstatus = '1';
            break;
        }
        this.legal_checkAndShowAlert();
      } else {
        this.child_checkstatus = '0';
        this.father_mother_checkstatus = '0';
        this.father_checkstatus = '0';
        this.mother_checkstatus = '0';
      }
    });
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

  convertToDate(dateStr: string): Date {
    const parts = dateStr.split('-');
    const day = +parts[0];
    const month = +parts[1] - 1;
    const year = +parts[2];
    return new Date(year, month, day);
  }
  transform_date(value: string): string {
    if (!value) return '';
    const parts = value.split('-');
    const day = parts[0];
    const month = parts[1];
    const year = parts[2];
    return `${year}-${month}-${day}`;
  }

  @ViewChild('Permenent_state') Permenent_state!: NgModel;
  @ViewChild('Permenent_district') Permenent_district!: NgModel;
  @ViewChild('permenent_Mmc') permenent_Mmc!: NgModel;
  @ViewChild('Permenent_sub_district') Permenent_sub_district!: NgModel;
  @ViewChild('Permenent_Village') Permenent_Village!: NgModel;
  @ViewChild('Age_of_the_mother') Age_of_the_mother!: NgModel;
  @ViewChild('Age__birth_time_') Age__birth_time_!: NgModel;
  @ViewChild('Number_of_children') Number_of_children!: NgModel;
  @ViewChild('Type_of_attention') Type_of_attention!: NgModel;
  @ViewChild('Method_of_delivery') Method_of_delivery!: NgModel;
  @ViewChild('Birth_weight') Birth_weight!: NgModel;
  @ViewChild('Duration_of_pregency') Duration_of_pregency!: NgModel;
  @ViewChild('ngSupportingDocuments') ngSupportingDocuments!: NgModel;
  statistical_from_check_inpts() {
    let isInvalid = false;
    if (this.Permenent_state) {
      this.Permenent_state.control.markAsTouched();
      this.Permenent_state.control.updateValueAndValidity();
      if (this.Permenent_state.invalid) isInvalid = true;
    }
    if (this.Permenent_district) {
      this.Permenent_district.control.markAsTouched();
      this.Permenent_district.control.updateValueAndValidity();
      if (this.Permenent_district.invalid) isInvalid = true;
    }
    if (this.permenent_Mmc) {
      this.permenent_Mmc.control.markAsTouched();
      this.permenent_Mmc.control.updateValueAndValidity();
      if (this.permenent_Mmc.invalid) isInvalid = true;
    }
    if (this.Permenent_sub_district) {
      this.Permenent_sub_district.control.markAsTouched();
      this.Permenent_sub_district.control.updateValueAndValidity();
      if (this.Permenent_sub_district.invalid) isInvalid = true;
    }

    if (this.Permenent_Village) {
      this.Permenent_Village.control.markAsTouched();
      this.Permenent_Village.control.updateValueAndValidity();
      if (this.Permenent_Village.invalid) isInvalid = true;
    }
    if (this.Age_of_the_mother) {
      this.Age_of_the_mother.control.markAsTouched();
      this.Age_of_the_mother.control.updateValueAndValidity();
      if (this.Age_of_the_mother.invalid) isInvalid = true;
    }
    if (this.Age__birth_time_) {
      this.Age__birth_time_.control.markAsTouched();
      this.Age__birth_time_.control.updateValueAndValidity();
      if (this.Age__birth_time_.invalid) isInvalid = true;
    }
    if (this.Number_of_children) {
      this.Number_of_children.control.markAsTouched();
      this.Number_of_children.control.updateValueAndValidity();
      if (this.Number_of_children.invalid) isInvalid = true;
    }
    if (this.Type_of_attention) {
      this.Type_of_attention.control.markAsTouched();
      this.Type_of_attention.control.updateValueAndValidity();
      if (this.Type_of_attention.invalid) isInvalid = true;
    }
    if (this.Method_of_delivery) {
      this.Method_of_delivery.control.markAsTouched();
      this.Method_of_delivery.control.updateValueAndValidity();
      if (this.Method_of_delivery.invalid) isInvalid = true;
    }
    if (this.Birth_weight) {
      this.Birth_weight.control.markAsTouched();
      this.Birth_weight.control.updateValueAndValidity();
      if (this.Birth_weight.invalid) isInvalid = true;
    }
    if (this.Duration_of_pregency) {
      this.Duration_of_pregency.control.markAsTouched();
      this.Duration_of_pregency.control.updateValueAndValidity();
      if (this.Duration_of_pregency.invalid) isInvalid = true;
    }
    if (this.documentlist.length==0) {
      this.ngSupportingDocuments.control.markAsTouched();
      this.ngSupportingDocuments.control.updateValueAndValidity();
      if (this.ngSupportingDocuments.invalid) isInvalid = true;
    }
    if (isInvalid) {
      this.form_alert();
    }
    if (!isInvalid) {
      this.openTab('pills-confirmlegal-tab');
      this.isConfirmLegalEnabled = true;
      this.getdraftinsert();
      this.spinner.hide();
    }
  }

  Ageofthemothercheck() {

    if(this.draft_details_array.legal.age_of_the_mother_birth_time!=''&& this.draft_details_array.legal.age_of_the_mother!=''){
      const birthTimeAge = parseInt(this.draft_details_array.legal.age_of_the_mother_birth_time);
      const motherAge = parseInt(this.draft_details_array.legal.age_of_the_mother);

      if (motherAge>birthTimeAge) {
        this.draft_details_array.legal.age_of_the_mother_birth_time = '';
        this.alt.toasterror(
          'Age of the mother at the time of this birth cannot be greater than the Age of the mother at the time of marriage'
        );
      } else {
        if (this.Age__birth_time_) {
          this.Age__birth_time_.control.setErrors(null);
          this.Age__birth_time_.control.updateValueAndValidity();
        }
      }
    }
    else{
      this.draft_details_array.legal.age_of_the_mother_birth_time = '';
    }


  }
  Numberofchildrencheck() {
    if (parseInt(this.draft_details_array.legal.number_of_children) > 8) {
      this.draft_details_array.legal.number_of_children = '';
      this.alt.toasterror('Number of children born alive to the mother');
    } else if (
      parseInt(this.draft_details_array.legal.number_of_children) == 0
    ) {
      this.draft_details_array.legal.number_of_children = '';
      this.alt.toasterror('Number of children born alive to the mother');
    }
  }
  Birthweightcheck() {
    if (parseInt(this.draft_details_array.legal.birth_weight) > 8) {
      this.draft_details_array.legal.birth_weight = '';
      this.alt.toasterror('Birth weight should be less than or equal to 8 Kg');
    } else if (parseInt(this.draft_details_array.legal.birth_weight) == 0) {
      this.draft_details_array.legal.birth_weight = '';
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
  keyPressAlpha(event: { keyCode: number; preventDefault: () => void }) {
    var inp = String.fromCharCode(event.keyCode);

    if (/[a-zA-Z ]/.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }
  async backwindowdraftbinding(obj: any) {

    this.draft_details_array = obj;
    this.draft_details_array.childinformation.confirmdateofbirth=this.draft_details_array.childinformation.dateofbirth;
    this.Addressofparents_district_array = [];
    this.Addressofparents_district_array.push({
      DISTRICT_CODE:
        this.draft_details_array?.addressof_parents?.address_parent_district,
      DISTRICT_DD:
        this.draft_details_array?.addressof_parents
          ?.address_parent_district_val,
    });
    this.Addressofparents_MandalMuncipality_array = [];
    this.Addressofparents_MandalMuncipality_array.push({
      MMC_CODE: this.draft_details_array?.addressof_parents?.address_parent_mmc,
      MMC_DD:
        this.draft_details_array?.addressof_parents?.address_parent_mmc_val,
    });
    this.village_ward_array = [];
    this.village_ward_array.push({
      VW_CODE:
        this.draft_details_array?.addressof_parents
          ?.address_parent_Village_Town,
      VW_DD:
        this.draft_details_array?.addressof_parents
          ?.address_parent_Village_Town_val,
    });
    this.Parents_postal_array = [];
    this.Parents_postal_array.push({
      PINCODE:
        this.draft_details_array?.addressof_parents?.address_parent_postoff,
      POSTOFFICE:
        this.draft_details_array?.addressof_parents?.address_parent_postoff_val,
    });
     this.Permanent_Addressofparents_district_array = [];
    this.Permanent_Addressofparents_district_array.push({
      DISTRICT_CODE:
        this.draft_details_array?.Permanent_addressof_parents
          ?.address_parent_permenent_district,
      DISTRICT_DD:
        this.draft_details_array?.Permanent_addressof_parents
          ?.address_parent_permenent_district_val,
    });
    this.Permanent_Addressofparents_MandalMuncipality_array = [];
    this.Permanent_Addressofparents_MandalMuncipality_array.push({
      MMC_CODE:
        this.draft_details_array?.Permanent_addressof_parents
          ?.address_parent_permenent_mmc,
      MMC_DD:
        this.draft_details_array?.Permanent_addressof_parents
          ?.address_parent_permenent_mmc_val,
    });
    this.Permanent_village_ward_array = [];
    this.Permanent_village_ward_array.push({
      VW_CODE:
        this.draft_details_array?.Permanent_addressof_parents
          ?.address_parent_permenent_village,
      VW_DD:
        this.draft_details_array?.Permanent_addressof_parents
          ?.address_parent_permenent_village_val,
    });
    this.Permanent_Parents_postal_array = [];
    this.Permanent_Parents_postal_array.push({
      PINCODE:
        this.draft_details_array?.Permanent_addressof_parents
          ?.address_permenent_postoff,
      POSTOFFICE:
        this.draft_details_array?.Permanent_addressof_parents
          ?.address_permenent_postoff_val,
    });

    if(this.draft_details_array?.placeofbirth?.place_of_birth!=null){
      this.PlaceofBirth_master_array.push({
        BDPLACE_CODE: this.draft_details_array?.placeofbirth?.place_of_birth,
       //BDPLACE_DD: this.draft_details_array?.placeofbirth?.placeofbirth_value,
      });
      this.get_SupportingDocuments();
    }
    if(this.draft_details_array?.placeofbirth?.place_of_birth_hospital!=null){
      this.Hospital_master_array.push({
        HOSPITAL_CODE:
          this.draft_details_array?.placeofbirth?.place_of_birth_hospital,
        //HOSPITAL_DD:this.draft_details_array?.placeofbirth?.place_of_birth_hospital_val,
      });
    }
    this.PlaceofBirth_district_array = [];
    this.PlaceofBirth_district_array.push({
      DISTRICT_CODE:
        this.draft_details_array?.placeofbirth?.place_of_birth_district,
      DISTRICT_DD:
        this.draft_details_array?.placeofbirth?.place_of_birth_district_val,
    });

    this.placeofbirth_MandalMuncipality_array = [];
    this.placeofbirth_MandalMuncipality_array.push({
      MMC_CODE: this.draft_details_array?.placeofbirth?.place_of_birth_mmc,
      MMC_DD: this.draft_details_array?.placeofbirth?.place_of_birth_mmc_val,
    });
    this.placeofbirth_village_ward_array = [];
    this.placeofbirth_village_ward_array.push({
      VW_CODE: this.draft_details_array?.placeofbirth?.place_of_birth_village,
      VW_DD: this.draft_details_array?.placeofbirth?.place_of_birth_village_val,
    });
    this.placeofbirth_postal_array = [];
    this.placeofbirth_postal_array.push({
      PINCODE: this.draft_details_array?.placeofbirth?.Place_of_birth_postoff,
      POSTOFFICE:
        this.draft_details_array?.placeofbirth?.Place_of_birth_postoff_val,
    });

    this.staticstical_district_array = [];
    this.staticstical_district_array.push({
      DISTRICT_CODE: this.draft_details_array?.legal?.mother_residence_district,
      DISTRICT_DD:
        this.draft_details_array?.legal?.mother_residence_district_val,
    });
    this.staticstical_MandalMuncipality_array = [];
    this.staticstical_MandalMuncipality_array.push({
      MMC_CODE: this.draft_details_array?.legal?.mother_residence_Mmc,
      MMC_DD: this.draft_details_array?.legal?.mother_residence_Mmc_val,
    });
    this.staticstical_village_ward_array = [];
    this.staticstical_village_ward_array.push({
      VW_CODE: this.draft_details_array?.legal?.mother_residence_Village,
      VW_DD: this.draft_details_array?.legal?.mother_residence_Village_val,
    });
    if(this.draft_details_array?.legal?.father_religion!=null && this.draft_details_array?.legal?.mother_religion!=null){
      this.FatherReligion_master_array.push({
        RELIGION_CODE: this.draft_details_array?.legal?.father_religion,
        RELIGION_DD: this.draft_details_array?.legal?.father_religion_val,
      });

      this.MotherReligion_master_array.push({
        RELIGION_CODE: this.draft_details_array?.legal?.mother_religion,
        RELIGION_DD: this.draft_details_array?.legal?.mother_religion_val,
      });
    }
    if(this.draft_details_array?.legal?.father_education!=null && this.draft_details_array?.legal?.mother_eduaction!=null){
      this.FatherEducation_master_array.push({
        EDUCATION_CODE: this.draft_details_array?.legal?.father_education,
        EDUCATION_DD: this.draft_details_array?.legal?.father_education_val,
      });

      this.MotehrEducation_master_array.push({
        EDUCATION_CODE: this.draft_details_array?.legal?.mother_eduaction,
        EDUCATION_DD: this.draft_details_array?.legal?.mother_eduaction_val,
      });

    }
    if(this.draft_details_array?.legal?.father_occupation!=null&& this.draft_details_array?.legal?.mother_occupation!=null){
      this.Fatheroccupation_master_array.push({
        OCCUPATION_CODE: this.draft_details_array?.legal?.father_occupation,
        OCCUPATION_DD: this.draft_details_array?.legal?.father_occupation_val,
      });


      this.Mohter_occupation_master_array.push({
        OCCUPATION_CODE: this.draft_details_array?.legal?.mother_occupation,
        OCCUPATION_DD: this.draft_details_array?.legal?.mother_occupation_val,
      });
    }

  }

  displaymodal = 'none';
  ModalCLose() {
    this.displaymodal = 'none';
  }
  ModalOpen() {
    this.displaymodal = 'block';
  }
}
