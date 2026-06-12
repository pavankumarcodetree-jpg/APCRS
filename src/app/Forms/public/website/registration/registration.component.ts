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
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MiddlewareService } from 'src/app/services/middleware_lyr/middleware.service';
import { EncDecService } from 'src/app/services/enc_dec_lyr/enc-dec.service';
import { AlertsService } from 'src/app/services/alert_lyr/alerts.service';
import { PrivateService } from 'src/app/services/api_lyr/private/private.service';
import { basemodel } from 'src/app/thirparty/model/apimodel';
import { InputvalidaionService } from 'src/app/thirparty/validation/inputvalidaion.service';
import { DOCUMENT, DatePipe } from '@angular/common';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import * as CryptoJS from 'crypto-js';
import { GeolocationService } from 'src/app/services/geolocation.service';
import { UnauthserService } from '../../../../services/api_lyr/public/unauthser.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  NgModel,
  Validators,
} from '@angular/forms';
import { SharedvalidationModule } from 'src/app/thirparty/sharedvalidation/sharedvalidation.module';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TimepickerConfig } from 'ngx-bootstrap/timepicker';
declare var $: any;
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent {
  constructor(
    private spinner: NgxSpinnerService,
    private cookieService: CookieService,
    private alt: AlertsService,
    private pscall: PrivateService,
    private unauth: UnauthserService,
    private httpClient: HttpClient,
    private val: InputvalidaionService,
    private router: Router,
    private encdc: EncDecService,
    private mid: MiddlewareService,
    private datepipe: DatePipe,
    private geolocationService: GeolocationService,
    private fb: FormBuilder,
    private sanitizer: DomSanitizer,
    /*     private share: SharedvalidationModule, */
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document,
    private el: ElementRef
  ) {
    this.generateTimeOptions();
    this.maxdate = new Date();
    this.contentuploadurl_img = '';
  }
  Deviceid: any;
  maxdate!: Date;
  bsConfig: Partial<BsDatepickerModule> = {
    dateInputFormat: 'DD-MM-YYYY',
    isDisabled: false,
    startView: 'day',
    showWeekNumbers: false,
    containerClass: 'theme-blue',
    showClearButton: true,
  };
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
  timeOptions: Array<{ value: string; label: string }> = [];
  isChildNotNamed: boolean = false;
  selectedRadio: string = '';
  selectedRadio1: string = '';
  selectedRadio2: string = '';
  selectedRadio3: string = '';
  selectedRadio4: string = '';
  Birth_crsreg_form = {
    primarylan: '',
    secondarylan: '',
    dateofreport: '',
    dateofbirth: '',
    condateofreport: '',
    birttime: '',
    selgender: '',
    selaadhar: '',
    aadhaar: '',
    fullname: '',
    fullname_t: '',
    surname: '',
    surname_t: '',
    confirm_fullname: '',
    confirm_fullname_t: '',
    confirm_surname: '',
    confirm_surname_t: '',
    father__full_namer: '',
    father__full_namer_t: '',
    father_surname: '',
    father_surname_t: '',
    father_mobile_number: '',
    father_email_number: '',
    father_aadhhar_number: '',
    mother_full_name: '',
    mother_full_name_t: '',
    mother_surname_name: '',
    mother_surname_name_t: '',
    mother_mobile_number: '',
    mother_email: '',
    mother_aadhaar_no: '',
    address_parent_state: '',
    address_parent_district: '',
    address_parent_sub_district: '',
    address_parent_mmc: '',
    address_parent_Village_Town: '',
    address_parent_pincode: '',
    address_parent_building_name: '',
    address_parent_street_name: '',
    address_parent_permenent_state: '',
    address_parent_permenent_district: '',
    address_parent_permenent_sub_district: '',
    address_parent_permenent_village: '',
    address_parent_permenent_pincode: '',
    address_parent_permenent_Building_no: '',
    address_parent_permenent_hose_no: '',
    address_parent_permenent_street_name: '',
    address_parent_permenent_post_office: '',
    place_of_birth: '',
    place_of_birth_state: '',
    place_of_birth_district: '',
    place_of_birth_sub_district: '',
    place_of_birth_village: '',
    place_of_birth_pin_code: '',
    place_of_birth_building_no: '',
    place_of_birth_house_no: '',
    place_of_birth_street_name: '',
    Informant_fullname: '',
    Informant_email_id: '',
    Informant_mobile_no: '',
    Informant_aadhhar_no: '',
    Informant_address: '',
    child_birth_state: '',
    child_birth_district: '',
    child_birth_sub_district: '',
    child_birth_village: '',
    father_religion: '',
    father_education: '',
    father_occupation: '',
    mother_religion: '',
    mother_education: '',
    mother_occupation: '',
    Address_parent_Locality_Post: '',
    Address_parent_Locality_Post_t: '',
    address_parent_street_name_t: '',
    address_parent_building_name_t: '',
    Address_parent_house_no: '',
    Address_parent_house_no_t: '',
    address_parent_permenent_mmc: '',
    place_of_birth_mmc: '',
    address_parent_permenent_post_office_t: '',
    address_parent_permenent_Building_no_t: '',
    address_parent_permenent_hose_no_t: '',
    address_parent_permenent_street_name_t: '',
    place_of_birth_building_no_t: '',
    Place_of_birth_house_no_t: '',
    place_of_birth_street_name_t: '',
    Place_of_birth_locality: '',
    Place_of_birth_locality_t: '',
    Informant_address_t: '',
    Informant_fullname_t: '',
    Address_palce_postoff: '',
    Address_permenent_postoff: '',
    Address_parent_postoff: '',
  };
  permenent_address_form = {
    permenent_Mmc: '',
    permenent_state: '',
    permenent_district: '',
    permenent_sub_district: '',
    permenent_Village: '',
    father_religion: '',
    father_education: '',
    father_occupation: '',
    mother_religion: '',
    mother_eduaction: '',
    mother_occupation: '',
    age_of_the_mother: '',
    age_of_the_mother_birth_time: '',
    number_of_children: '',
    type_of_attention: '',
    method_of_delivery: '',
    duration_of_pregency: '',
    driving_licience: '',
    birth_weight: '',
    documenent_descrption: '',
  };
  Address_parent_state_master_array: any[] = [];
  Address_parent_district_master_array: any[] = [];
  Address_parent_sub_district_master_array: any[] = [];
  Address_parent_Village_Town_master_array: any[] = [];
  Address_parent_permenent_state_master_array: any[] = [];
  Address_parent_permenent_district_master_array: any[] = [];
  Address_parent_permenent_sub_district_master_array: any[] = [];
  Address_parent_permenent_village_master_array: any[] = [];
  Place_of_birth_master_array: any[] = [];
  Place_of_birth_state_master_array: any[] = [];
  Place_of_birth_district_master_array: any[] = [];
  Place_of_birth_sub_district_master_array: any[] = [];
  Place_of_birth_village_master_array: any[] = [];
  Permenent_state_master_array: any[] = [];
  Permenent_district_master_array: any[] = [];
  Permenent_Village_master_array: any[] = [];
  hash: any;
  capthform: any;
  latitude: any;
  longitude: any;
  @ViewChild('notifyResolutionDocInput') notifyResolutionDocInput!: ElementRef;

  ngOnInit(): void {
    // this.getstatedata()
    try {
      this.Deviceid = '';
      if (this.Deviceid == '') {
        this.Get_captcha();
        this.getCurrentLocation();
        // this.httpClient
        //   .get('https://api.ipify.org/?format=json')
        //   .subscribe((res: any) => {
        //     this.Deviceid = res.ip;
        //     sessionStorage.setItem('Deviceid', res.ip);
        //     this.Get_captcha();
        //     this.getCurrentLocation();
        //   });
      } else {
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
  async Get_captcha(): Promise<void> {
    try {
      let date = new Date();
      const datePipe = new DatePipe('en-US');
      let clintkey: any = datePipe.transform(date, 'ddMMyyyyHHmmssss');
      this.hash = CryptoJS.SHA256(this.Deviceid + '^' + clintkey).toString();
      let resultuser = this.encdc.enccall(
        JSON.stringify(this.Deviceid + '^' + clintkey + '^' + 'Sap789456')
      );
      sessionStorage.setItem('devid', this.Deviceid);
      sessionStorage.setItem('appid', clintkey);
      sessionStorage.setItem('_Uenc', resultuser ?? '');
      sessionStorage.setItem('_sltkn', this.hash ?? '');
      sessionStorage.setItem('_cltkn', this.hash ?? '');
      this.getstatedata();
    } catch (error) {
      this.spinner.hide();
     
    }
  }

  generateTimeOptions() {
    const times: Array<{ value: string; label: string }> = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute++) {
        const isPM = hour >= 12;
        const hour12 = hour % 12 === 0 ? 12 : hour % 12; // Convert to 12-hour format
        const minuteStr = minute < 10 ? `0${minute}` : `${minute}`;
        const label = `${hour12}:${minuteStr} ${isPM ? 'PM' : 'AM'}`;
        const value = `${hour < 10 ? '0' : ''}${hour}:${minuteStr}`; // 24-hour format
        times.push({ value, label });
      }
    }
    this.timeOptions = times;
  }
  onDateChange(event: any) {}
  toggleRadio(value: string): void {
    // Toggle logic: unselect if already selected
    if (this.selectedRadio2 === value) {
      this.selectedRadio2 = ''; // Unselect
    } else {
      this.selectedRadio2 = value; // Select new value
    }
  }
  toggleRadio1(value: string): void {
    // Toggle logic: unselect if already selected
    if (this.selectedRadio3 === value) {
      this.selectedRadio3 = ''; // Unselect
    } else {
      this.selectedRadio3 = value; // Select new value
    }
  }
  toggleRadio2(value: string): void {
    // Toggle logic: unselect if already selected
    if (this.selectedRadio4 === value) {
      this.selectedRadio4 = ''; // Unselect
    } else {
      this.selectedRadio4 = value; // Select new value
    }
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

      // Add active state to the selected tab and content
      tabButton.classList.add('active');
      tabContent.classList.add('show', 'active');
    }
  }
  uidvalidate(empAadhaar: any, obj: any) {
    //return false if invalid -- return true for Vaid UID
    

    if (empAadhaar.length == 12) {
      const uidstatus = this.mid.validateVerhoeff(empAadhaar);
      
      if (!uidstatus) {
        
        this.alt.toasterror('Enter a 12-digit Valid Aadhaar Number.');

        if (obj == '1') {
          this.Birth_crsreg_form.aadhaar = '';
        }

        if (obj == '2') {
          this.Birth_crsreg_form.father_aadhhar_number = '';
        }

        if (obj == '3') {
          this.Birth_crsreg_form.mother_aadhaar_no = '';
        }

        if (obj == '4') {
          this.Birth_crsreg_form.Informant_aadhhar_no = '';
        }
      }
    }
  }
  focusOutFunction(val: any, typetext: any) {
    if (val.toString() == '' && typetext == 'cfname') {
      this.Birth_crsreg_form.fullname_t = '';
    }
    if (val.toString() == '' && typetext == 'csname') {
      this.Birth_crsreg_form.surname_t = '';
    }
    if (val.toString() == '' && typetext == 'cofname') {
      this.Birth_crsreg_form.confirm_fullname_t = '';
    }
    if (val.toString() == '' && typetext == 'cosname') {
      this.Birth_crsreg_form.confirm_surname_t = '';
    }
    if (val.toString() == '' && typetext == 'cofuname') {
      this.Birth_crsreg_form.father__full_namer_t = '';
    }
    if (val.toString() == '' && typetext == 'cosuname') {
      this.Birth_crsreg_form.father_surname_t = '';
    }
    if (val.toString() == '' && typetext == 'comfuname') {
      this.Birth_crsreg_form.mother_full_name_t = '';
    }
    if (val.toString() == '' && typetext == 'comsuname') {
      this.Birth_crsreg_form.mother_surname_name_t = '';
    }

    if (val.toString() == '' && typetext == 'addressone') {
      this.Birth_crsreg_form.address_parent_building_name_t = '';
    }
    if (val.toString() == '' && typetext == 'addresstwo') {
      this.Birth_crsreg_form.Address_parent_house_no_t = '';
    }
    if (val.toString() == '' && typetext == 'addressthree') {
      this.Birth_crsreg_form.address_parent_street_name_t = '';
    }
    if (val.toString() == '' && typetext == 'addressfour') {
      this.Birth_crsreg_form.Address_parent_Locality_Post_t = '';
    }
    if (val.toString() == '' && typetext == 'paddressone') {
      this.Birth_crsreg_form.address_parent_permenent_Building_no_t = '';
    }
    if (val.toString() == '' && typetext == 'paddresstwo') {
      this.Birth_crsreg_form.address_parent_permenent_hose_no_t = '';
    }
    if (val.toString() == '' && typetext == 'paddressthree') {
      this.Birth_crsreg_form.address_parent_permenent_street_name_t = '';
    }
    if (val.toString() == '' && typetext == 'paddressfour') {
      this.Birth_crsreg_form.address_parent_permenent_post_office_t = '';
    }
    if (val.toString() == '' && typetext == 'ppaddressone') {
      this.Birth_crsreg_form.place_of_birth_building_no_t = '';
    }
    if (val.toString() == '' && typetext == 'ppaddresstwo') {
      this.Birth_crsreg_form.Place_of_birth_house_no_t = '';
    }
    if (val.toString() == '' && typetext == 'ppaddressthree') {
      this.Birth_crsreg_form.place_of_birth_street_name_t = '';
    }
    if (val.toString() == '' && typetext == 'ppaddressfour') {
      this.Birth_crsreg_form.Place_of_birth_locality_t = '';
    }
    if (val.toString() == '' && typetext == 'pppaddressone') {
      this.Birth_crsreg_form.Informant_fullname_t = '';
    }
    if (val.toString() == '' && typetext == 'pppaddresstwo') {
      this.Birth_crsreg_form.Informant_address_t = '';
    }
    if (typetext == 'cfname') {
      this.changelanguagetransaletion1(val.toString(), typetext);
    } else {
      this.changelanguagetransaletion(val.toString(), typetext);
    }
  }
  suggestions: any;
  changelanguagetransaletion(inputText: any, title: any) {
    
    this.pscall.transliterateText(inputText).subscribe(
      (response: any) => {
        this.suggestions = response[1][0][1];
        
        if (title == 'cfname') {
          this.Birth_crsreg_form.fullname_t = this.suggestions[0];
        }
        if (title == 'csname') {
          this.Birth_crsreg_form.surname_t = this.suggestions[0];
        }
        if (title == 'cofname') {
          this.Birth_crsreg_form.confirm_fullname_t = this.suggestions[0];
        }
        if (title == 'cosname') {
          this.Birth_crsreg_form.confirm_surname_t = this.suggestions[0];
        }
        if (title == 'cofuname') {
          this.Birth_crsreg_form.father__full_namer_t = this.suggestions[0];
        }
        if (title == 'cosuname') {
          this.Birth_crsreg_form.father_surname_t = this.suggestions[0];
        }
        if (title == 'comfuname') {
          this.Birth_crsreg_form.mother_full_name_t = this.suggestions[0];
        }
        if (title == 'comsuname') {
          this.Birth_crsreg_form.mother_surname_name_t = this.suggestions[0];
        }
        if (title == 'addressone') {
          this.Birth_crsreg_form.address_parent_building_name_t =
            this.suggestions[0];
        }
        if (title == 'addresstwo') {
          this.Birth_crsreg_form.Address_parent_house_no_t =
            this.suggestions[0];
        }
        if (title == 'addressthree') {
          this.Birth_crsreg_form.address_parent_street_name_t =
            this.suggestions[0];
        }
        if (title == 'addressfour') {
          this.Birth_crsreg_form.Address_parent_Locality_Post_t =
            this.suggestions[0];
        }

        if (title == 'paddressone') {
          this.Birth_crsreg_form.address_parent_permenent_Building_no_t =
            this.suggestions[0];
        }
        if (title == 'paddresstwo') {
          this.Birth_crsreg_form.address_parent_permenent_hose_no_t =
            this.suggestions[0];
        }
        if (title == 'paddressthree') {
          this.Birth_crsreg_form.address_parent_permenent_street_name_t =
            this.suggestions[0];
        }
        if (title == 'paddressfour') {
          this.Birth_crsreg_form.address_parent_permenent_post_office_t =
            this.suggestions[0];
        }
        if (title == 'ppaddressone') {
          this.Birth_crsreg_form.place_of_birth_building_no_t =
            this.suggestions[0];
        }
        if (title == 'ppaddresstwo') {
          this.Birth_crsreg_form.Place_of_birth_house_no_t =
            this.suggestions[0];
        }
        if (title == 'ppaddressthree') {
          this.Birth_crsreg_form.place_of_birth_street_name_t =
            this.suggestions[0];
        }
        if (title == 'ppaddressfour') {
          this.Birth_crsreg_form.Place_of_birth_locality_t =
            this.suggestions[0];
        }
        if (title == 'pppaddressone') {
          this.Birth_crsreg_form.Informant_fullname_t = this.suggestions[0];
        }
        if (title == 'pppaddresstwo') {
          this.Birth_crsreg_form.Informant_address_t = this.suggestions[0];
        }
      },
      (error) => {
        console.error('Error transliterating text:', error);
        return '';
      }
    );
  }
  inputText: string = ''; // Text entered by the user
  transliteratedText: string = ''; // Full response from GIST service
  primaryResult: string = ''; // First part of the response (before ^)
  secondaryResult: string = ''; // Second part (optional)
  changelanguagetransaletion1(inputText: any, title: any) {
    
    this.inputText = ''; // Text entered by the user
    this.transliteratedText = ''; // Full response from GIST service
    this.primaryResult = ''; // First part of the response (before ^)
    this.secondaryResult = ''; // Second part (optional)
    this.pscall.transliterate(inputText).subscribe(
      (response: any) => {
        this.transliteratedText = response;
        const results = response.split('^');
        this.primaryResult = results[0]?.replace(/"/g, '').trim(); // Removes all double quotes
        this.secondaryResult =
          results.length > 1 ? results[1]?.replace(/"/g, '').trim() : '';
        
        if (title == 'cfname') {
          this.Birth_crsreg_form.fullname_t = this.primaryResult;
        }
        if (title == 'csname') {
          this.Birth_crsreg_form.surname_t = this.suggestions[0];
        }
        if (title == 'cofname') {
          this.Birth_crsreg_form.confirm_fullname_t = this.suggestions[0];
        }
        if (title == 'cosname') {
          this.Birth_crsreg_form.confirm_surname_t = this.suggestions[0];
        }
        if (title == 'cofuname') {
          this.Birth_crsreg_form.father__full_namer_t = this.suggestions[0];
        }
        if (title == 'cosuname') {
          this.Birth_crsreg_form.father_surname_t = this.suggestions[0];
        }
        if (title == 'comfuname') {
          this.Birth_crsreg_form.mother_full_name_t = this.suggestions[0];
        }
        if (title == 'comsuname') {
          this.Birth_crsreg_form.mother_surname_name_t = this.suggestions[0];
        }
        if (title == 'addressone') {
          this.Birth_crsreg_form.address_parent_building_name_t =
            this.suggestions[0];
        }
        if (title == 'addresstwo') {
          this.Birth_crsreg_form.Address_parent_house_no_t =
            this.suggestions[0];
        }
        if (title == 'addressthree') {
          this.Birth_crsreg_form.address_parent_street_name_t =
            this.suggestions[0];
        }
        if (title == 'addressfour') {
          this.Birth_crsreg_form.Address_parent_Locality_Post_t =
            this.suggestions[0];
        }

        if (title == 'paddressone') {
          this.Birth_crsreg_form.address_parent_permenent_Building_no_t =
            this.suggestions[0];
        }
        if (title == 'paddresstwo') {
          this.Birth_crsreg_form.address_parent_permenent_hose_no_t =
            this.suggestions[0];
        }
        if (title == 'paddressthree') {
          this.Birth_crsreg_form.address_parent_permenent_street_name_t =
            this.suggestions[0];
        }
        if (title == 'paddressfour') {
          this.Birth_crsreg_form.address_parent_permenent_post_office_t =
            this.suggestions[0];
        }
        if (title == 'ppaddressone') {
          this.Birth_crsreg_form.place_of_birth_building_no_t =
            this.suggestions[0];
        }
        if (title == 'ppaddresstwo') {
          this.Birth_crsreg_form.Place_of_birth_house_no_t =
            this.suggestions[0];
        }
        if (title == 'ppaddressthree') {
          this.Birth_crsreg_form.place_of_birth_street_name_t =
            this.suggestions[0];
        }
        if (title == 'ppaddressfour') {
          this.Birth_crsreg_form.Place_of_birth_locality_t =
            this.suggestions[0];
        }
        if (title == 'pppaddressone') {
          this.Birth_crsreg_form.Informant_fullname_t = this.suggestions[0];
        }
        if (title == 'pppaddresstwo') {
          this.Birth_crsreg_form.Informant_address_t = this.suggestions[0];
        }
      },
      (error) => {
        console.error('Error transliterating text:', error);
        return '';
      }
    );
  }
  postoffice_array: any = [];
  postoffice_array1: any = [];
  postoffice_array2: any = [];
  async Loadpostoffcie(postcode: any, type: any): Promise<void> {
    try {
      
      if (type == '1') {
        this.postoffice_array = [];
      }
      if (type == '2') {
        this.postoffice_array1 = [];
      }
      if (type == '3') {
        this.postoffice_array2 = [];
      }
      const req = new basemodel();
      req.type = '1008';
      req.param1 = postcode;
      let responce: any = await this.unauth.pree_utilities_service(req);

      
      if (responce.code) {
        if (type == '1') {
          this.postoffice_array = responce.Details;
        }
        if (type == '2') {
          this.postoffice_array1 = responce.Details;
        }
        if (type == '3') {
          this.postoffice_array2 = responce.Details;
        }
      } else {
        //this.alt.toasterror('yes or no data not found');
        this.spinner.hide();
      }
    } catch (error) {
      this.spinner.hide();
      //
    }
  }
  async getstatedata(): Promise<void> {
    try {
      
      const req = new basemodel();
      req.type = '1001';
      this.spinner.hide();
      let responce: any = await this.unauth.pree_utilities_service(req);
      this.spinner.hide();
      
      if (responce.code) {
        this.Address_parent_state_master_array = responce.Details;
      } else {
        this.alt.toasterror('yes or no data not found');
        this.spinner.hide();
      }
    } catch (error) {
      this.spinner.hide();
     
    }
  }
  district_array: any[] = [];
  district_array1: any[] = [];
  district_array2: any[] = [];
  district_array3: any[] = [];
  async getdistrict(obj: any): Promise<void> {
    try {
      const req = new basemodel();
      req.type = '1002';
      if (obj == '1') {
        req.param1 = this.Birth_crsreg_form.address_parent_state;
        this.district_array = [];
        this.mmc_array = [];
        this.vmc_array = [];
      }
      if (obj == '2') {
        req.param1 = this.Birth_crsreg_form.address_parent_permenent_state;
        this.district_array1 = [];
        this.mmc_array1 = [];
        this.vmc_array1 = [];
      }
      if (obj == '3') {
        req.param1 = this.Birth_crsreg_form.place_of_birth_state;
        this.district_array2 = [];
        this.mmc_array2 = [];
        this.vmc_array2 = [];
      }
      if (obj == '4') {
        req.param1 = this.permenent_address_form.permenent_state;
        this.district_array3 = [];
        this.mmc_array3 = [];
        this.vmc_array3 = [];
      }

      let responce: any = await this.unauth.pree_utilities_service(req);
      
      if (responce.code) {
        if (obj == '1') {
          this.district_array = responce.Details;
        }
        if (obj == '2') {
          this.district_array1 = responce.Details;
        }
        if (obj == '3') {
          this.district_array2 = responce.Details;
        }
        if (obj == '4') {
          this.district_array3 = responce.Details;
        }
      } else {
        this.alt.toasterror('yes or no data not found');
        this.spinner.hide();
      }
    } catch (error) {
      this.spinner.hide();
     
    }
  }

  mmc_array: any[] = [];
  mmc_array1: any[] = [];
  mmc_array2: any[] = [];
  mmc_array3: any[] = [];
  async getmmc(obj: any): Promise<void> {
    try {
      const req = new basemodel();
      req.type = '1003';
      if (obj == '1') {
        req.param1 = this.Birth_crsreg_form.address_parent_state;
        req.param2 = this.Birth_crsreg_form.address_parent_district;
        req.param3 = this.Birth_crsreg_form.address_parent_sub_district;
        this.mmc_array = [];
        this.vmc_array = [];
      }
      if (obj == '2') {
        req.param1 = this.Birth_crsreg_form.address_parent_permenent_state;
        req.param2 = this.Birth_crsreg_form.address_parent_permenent_district;
        req.param3 =
          this.Birth_crsreg_form.address_parent_permenent_sub_district;
        this.mmc_array1 = [];
        this.vmc_array1 = [];
      }
      if (obj == '3') {
        req.param1 = this.Birth_crsreg_form.place_of_birth_state;
        req.param2 = this.Birth_crsreg_form.place_of_birth_district;
        req.param3 = this.Birth_crsreg_form.place_of_birth_sub_district;
        this.mmc_array2 = [];
        this.vmc_array2 = [];
      }
      if (obj == '4') {
        req.param1 = this.permenent_address_form.permenent_state;
        req.param2 = this.permenent_address_form.permenent_district;
        req.param3 = this.permenent_address_form.permenent_sub_district;
        this.mmc_array3 = [];
        this.vmc_array3 = [];
      }
      let responce: any = await this.unauth.pree_utilities_service(req);
      
      if (responce.code) {
        if (obj == '1') {
          this.mmc_array = responce.Details;
        }
        if (obj == '2') {
          this.mmc_array1 = responce.Details;
        }
        if (obj == '3') {
          this.mmc_array2 = responce.Details;
        }
        if (obj == '4') {
          this.mmc_array3 = responce.Details;
        }
      } else {
        this.alt.toasterror('yes or no data not found');
        this.spinner.hide();
      }
    } catch (error) {
      this.spinner.hide();
     
    }
  }

  vmc_array: any[] = [];
  vmc_array1: any[] = [];
  vmc_array2: any[] = [];
  vmc_array3: any[] = [];
  async getvwc(obj: any): Promise<void> {
    try {
      const req = new basemodel();
      req.type = '1004';
      if (obj == '1') {
        req.param1 = this.Birth_crsreg_form.address_parent_state;
        req.param2 = this.Birth_crsreg_form.address_parent_district;
        req.param3 = this.Birth_crsreg_form.address_parent_sub_district;
        req.param4 = this.Birth_crsreg_form.address_parent_mmc;
        this.vmc_array = [];
      }
      if (obj == '2') {
        req.param1 = this.Birth_crsreg_form.address_parent_permenent_state;
        req.param2 = this.Birth_crsreg_form.address_parent_permenent_district;
        req.param3 =
          this.Birth_crsreg_form.address_parent_permenent_sub_district;
        req.param4 = this.Birth_crsreg_form.address_parent_permenent_mmc;
        this.vmc_array1 = [];
      }
      if (obj == '3') {
        req.param1 = this.Birth_crsreg_form.place_of_birth_state;
        req.param2 = this.Birth_crsreg_form.place_of_birth_district;
        req.param3 = this.Birth_crsreg_form.place_of_birth_sub_district;
        req.param4 = this.Birth_crsreg_form.place_of_birth_mmc;
        this.vmc_array2 = [];
      }
      if (obj == '4') {
        req.param1 = this.permenent_address_form.permenent_state;
        req.param2 = this.permenent_address_form.permenent_district;
        req.param3 = this.permenent_address_form.permenent_sub_district;
        req.param4 = this.permenent_address_form.permenent_Mmc;
        this.vmc_array3 = [];
      }
      let responce: any = await this.unauth.pree_utilities_service(req);
      
      if (responce.code) {
        if (obj == '1') {
          this.vmc_array = responce.Details;
        }
        if (obj == '2') {
          this.vmc_array1 = responce.Details;
        }
        if (obj == '3') {
          this.vmc_array2 = responce.Details;
        }
        if (obj == '4') {
          this.vmc_array3 = responce.Details;
        }
      } else {
        this.alt.toasterror('yes or no data not found');
        this.spinner.hide();
      }
    } catch (error) {
      this.spinner.hide();
     
    }
  }

  photoselectedFiles: File[] = [];
  fileupload(event: any) {
    const files: File[] = event.target.files;
    if (files.length > 1) {
      this.alt.toasterror('Upload Photo(png/jpg)');
      this.photoselectedFiles = [];
      return;
    }
    const checkfilesizetype = Array.from(files);
    const checkcondion = false;
    const allowedExtensions = ['.png', '.jpg', '.jpeg', '.pdf'];
    const maxFileSizeMB = 8; // Maximum file size in megabytes
    for (let chc = 0; chc < checkfilesizetype.length; chc++) {
      let type = checkfilesizetype[chc].name;

      const fileExtension = checkfilesizetype[chc].name
        .toLowerCase()
        .substr(checkfilesizetype[chc].name.lastIndexOf('.'));
      if (allowedExtensions.indexOf(fileExtension) === -1) {
        this.photoselectedFiles = [];
        this.alt.toasterror('Only PNG and JPG files are allowed.)');
        return;
      }

      const fileSizeMB = checkfilesizetype[chc].size / (1024 * 1024);
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
  photofilepath: any;
  contentuploadurl_img = '';
  documentlist: any[] = [];
  async Savephotoupload(obj: any) {
    if (
      this.photoselectedFiles.length == 0 &&
      this.notifyResolutionDocInput.nativeElement.value != ''
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
            this.photofilepath = '';
            const phform = new FormData();
            phform.append('file', this.photoselectedFiles[ph]);
            phform.append('input01', 'Documents');
            phform.append('input02', 'Sample');
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
                    

                    this.notifyResolutionDocInput.nativeElement.value = '';
                    let item = {
                      documenttype: 'Documentproof',
                      documentdescription: 'Document',
                      url:
                        this.mid.globalsetting.api_url_conent_show + rsdata.url,
                    };
                    this.documentlist.push(item);
                    this.spinner.hide();
                    /* this.documentlist = [
                                        {
                                          documentdescription: 'Sample Image',
                                          documenttype: 'Imageproof',
                                          url: 'https://via.placeholder.com/150',
                                        },
                                        {
                                          documentdescription: 'Sample PDF',
                                          documenttype: 'Documentproof',
                                          url: 'https://sportsapi.ap.gov.in/crsapi/contentpath/img/Documents/20241207/Sample/SamplePDF2024120709375068536_sample_TP.pdf',
                                        },
                                      ]; */
                 

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
  isImage(url: string): boolean {
    
    return /\.(jpeg|jpg|png|gif|bmp|webp)$/i.test(url);
  }

  // Sanitize the URL for safe use in iframe
  getSafeUrl(url: string): SafeResourceUrl {
    
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
  ViewDoc(image: string) {
    window.open(image, '_blank');
  }
  /*  emailvaild = false; adharvalid = false; maxlegthtext = "30";
    loginform = {
        username: '',
        password: '',
        usertype: '',
        useradharorg: ''
    }; */

  /*  Registernow() {
        this.ResetFields();
        this.Get_Designation_Details();
    }

    User_submitted = false;
    userForm: FormGroup = new FormGroup({
        Officer_Name: new FormControl(),
        Officer_Designation: new FormControl(),
        Officer_password: new FormControl(),
        Officer_email: new FormControl(),
        Officer_mobilenumber: new FormControl(),
        Officer_maskUID: new FormControl(),
        Officer_orgUID: new FormControl(),

    }); */
  /*  ResetFields() {

        this.User_submitted = false;
        this.userForm = this.fb.group({
            Officer_Name: ['', Validators.required],
            Officer_Designation: ['', Validators.required],
            Officer_email: ['', Validators.required],
            Officer_password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(12), Validators.pattern(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#%\$\^&\*\.\ ]).{8,12}$/),],],
            Officer_mobilenumber: ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]],
            Officer_orgUID: ['', Validators.required],
            Officer_maskUID: ['', Validators.required],
        });
    }

    containsAtSymbolValidator(control: any) {
        const email = control.value;
        if (email && !email.includes('@')) {
            return { missingAtSymbol: true };
        }
        return null;
    } */
  /*   validateUsername(usernameControl: NgModel) {

        const value = usernameControl.value || '';
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,4}$/; // Email regex
        const aadharPattern = /^\d{12}$/; // Aadhar: 12 numeric characters

        // Determine whether input matches email or Aadhar patterns
        if (value === '') {
            usernameControl.control.setErrors({ required: true });
        } else if (!emailPattern.test(value) && !aadharPattern.test(value)) {
            usernameControl.control.setErrors({ invalidFormat: true });
        } else {
            usernameControl.control.setErrors(null); // Clear errors if valid
        }
    } */

  /*   get f() { return this.userForm.controls; }
    async Register_user(): Promise<void> {
        try {

            this.User_submitted = true;

            if (this.userForm.valid) {

                let reqarray = this.userForm.value;
                const req = new basemodel();

                req.type = '100';
                req.param1 = reqarray.Officer_Name;
                req.param2 = reqarray.Officer_orgUID;
                req.param3 = reqarray.Officer_email;
                req.param4 = reqarray.Officer_password
                req.param5 = reqarray.Officer_mobilenumber;
                req.param6 = reqarray.Officer_Designation;
                req.islogstore = 'Yes';
                req.logfoldername = 'Public_userRegistration';


                let rsdata: any = await this.uncall.pree_Masters_Sub_service(req);
                this.spinner.hide();

                if (rsdata.code) {
                    if (rsdata.code && rsdata.Details[0].STATUS == '1') {
                        this.alt.success(rsdata.Details[0].STATUS_TEXT);
                        this.ResetFields();
                        this.router.navigate(['/auth/login']);
                        return;
                    }
                    else {
                        this.spinner.hide();
                        this.alt.warning(rsdata.Details[0].STATUS_TEXT);

                    }
                }
                else {
                    this.alt.warning(rsdata.message);
                    this.spinner.hide();

                }
            }

            else {

                // this.alt.warning('Please fill all the fields');
                this.spinner.hide();
            }

        } catch (error) {
            this.spinner.hide();

        }
    } */

  // onInputChange(event: Event) {
  //     const inputElement = event.target as HTMLInputElement;
  //     // If the Aadhaar number reaches 12 digits, trigger masking
  //     if (inputElement.value.length === 12) {
  //         this.validateaadhaar();
  //     }
  // }
  /*  maskedAadhaarNumber: any;
    orginalAadhaarNumber: any;
    mobilenumber: any;
    async validateaadhaar() {

        const aadhaarControl = this.userForm.get('Officer_maskUID');
        if (!aadhaarControl) return;

        let aadhaarValue = aadhaarControl.value?.toString(); // Convert to string
        aadhaarControl.enable();

        // Aadhaar validation logic
        if (aadhaarValue?.length === 12) {
            const isNumeric = /^\d+$/.test(aadhaarValue); // Checks if all characters are digits

            if (!isNumeric) {
                aadhaarControl.setValue('');
                this.alt.toasterror('Enter a 12-digit Aadhaar Number.');
            } else {
                const isValidAadhaar = this.share.validateVerhoeff(aadhaarValue);

                if (!isValidAadhaar) {
                    aadhaarControl.setValue('');
                    this.alt.toasterror('Enter a 12-digit Valid Aadhaar Number.');
                } else {
                    this.orginalAadhaarNumber = aadhaarValue;
                    const maskedAadhaar = aadhaarValue.replace(/\d(?=\d{4})/g, '*');
                    aadhaarControl.setValue(maskedAadhaar);
                    this.userForm.get('Officer_orgUID')?.setValue(this.orginalAadhaarNumber);
                }
            }
        } else if (aadhaarValue?.length === 0) {
            this.orginalAadhaarNumber = '';
            this.userForm.get('Officer_orgUID')?.setValue(this.orginalAadhaarNumber);
        } else if (aadhaarValue?.length < 12) {
            this.orginalAadhaarNumber = '';
            this.userForm.get('Officer_orgUID')?.setValue(this.orginalAadhaarNumber);
            aadhaarControl.setValue('');
            this.alt.toasterror('Enter a 12-digit Aadhaar Number.');
        }

    } */

  /*   async validateloginaadhaar() {

        //const aadhaarControl = this.loginform.username;
        if (!this.loginform.username) return;

        // let aadhaarValue = aadhaarControl.toString(); // Convert to string
        // aadhaarControl.enable();

        // Aadhaar validation logic
        if (this.loginform.username?.length === 12) {
            const isNumeric = /^\d+$/.test(this.loginform.username); // Checks if all characters are digits

            if (!isNumeric) {
                this.loginform.username == '';
                this.alt.toasterror('Enter a 12-digit Aadhaar Number.');
            } else {
                const isValidAadhaar = this.share.validateVerhoeff(this.loginform.username);

                if (!isValidAadhaar) {
                    this.loginform.username = '';
                    this.alt.toasterror('Enter a 12-digit Valid Aadhaar Number.');
                } else {
                    this.loginform.useradharorg = this.loginform.username;
                    const maskedAadhaar = this.loginform.username.replace(/\d(?=\d{4})/g, '*');
                    this.loginform.username = maskedAadhaar;
                    this.loginform.useradharorg = this.orginalAadhaarNumber;
                }
            }
        } else if (this.loginform.username?.length === 0) {
            this.orginalAadhaarNumber = '';
            this.loginform.useradharorg = this.orginalAadhaarNumber;
        } else if (this.loginform.username?.length < 12) {
            this.orginalAadhaarNumber = '';
            this.loginform.useradharorg = this.orginalAadhaarNumber;
            this.loginform.username = '';
            this.alt.toasterror('Enter a 12-digit Aadhaar Number.');
        }

    } */

  /*  keyPressAlphawithemail(event: { keyCode: number; preventDefault: () => void; }) {

        var inp = String.fromCharCode(event.keyCode);

        if (/[a-zA-Z0-9@._+-]/.test(inp)) {
            return true;
        } else {
            event.preventDefault();
            return false;
        }
    } */
  /*   keyPressNumberonly(event: { keyCode: number; preventDefault: () => void; }) {

        var inp = String.fromCharCode(event.keyCode);

        if (/[0-9\. ]/.test(inp)) {
            return true;
        } else {
            event.preventDefault();
            return false;
        }
    } */
  /*  Designation_Master_array: any[] = [];
    async Get_Designation_Details(): Promise<void> {
        try {
            this.spinner.show();
            this.Designation_Master_array = [];
            const req = new basemodel();
            req.type = '109';
            req.param1 = '0';
            let rsdata: any = await this.uncall.pree_Masters_Get_service(req);
            this.spinner.hide();
            if (rsdata.code) {
                this.Designation_Master_array = rsdata.Details;
            }
            else {
                this.alt.warning(rsdata.message);
                this.spinner.hide();
                return;
            }
        } catch (error) {
            this.alt.warning('Something went wrong try again' + error);
            this.spinner.hide();
            return;
        }
    } */
}
