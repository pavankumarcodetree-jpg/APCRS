import { HttpClient } from '@angular/common/http';
import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  Renderer2,
} from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { EncDecService } from 'src/app/services/enc_dec_lyr/enc-dec.service';
import { AlertsService } from 'src/app/services/alert_lyr/alerts.service';
import { PrivateService } from 'src/app/services/api_lyr/private/private.service';
import { basemodel } from 'src/app/thirparty/model/apimodel';
import { DOCUMENT, DatePipe } from '@angular/common';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import * as CryptoJS from 'crypto-js';
import { GeolocationService } from 'src/app/services/geolocation.service';
import { UnauthserService } from 'src/app/services/api_lyr/public/unauthser.service';
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

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrl: './master.component.css',
})
export class MasterComponent {
  
  constructor(
    private spinner: NgxSpinnerService,
    private alt: AlertsService,
    private unauth: UnauthserService,
    private httpClient: HttpClient,
    private encdc: EncDecService,
    private geolocationService: GeolocationService,
    private fb: FormBuilder,
    /*     private share: SharedvalidationModule, */
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document,
    private el: ElementRef
  ) {}
  hash: any;
  capthform: any;
  latitude: any;
  longitude: any;
  crs_hosipatalreg_form = {
    hosiatalcode: '',
    hosipatal_category: '',
    Hosipatal_type: '',
    hosiatalname: '',
    state: '',
    district: '',
    subdistrict: '',
    registration: '',
    village: '',
    email: '',
    mobileno: '',
    place: '',
    status: '',
    Hosipatal_code: '',
    Email: '',
    mandal: '',
    Address: '',
    building_no: '',
    house_no: '',

    hosiatalname_telugu: '',
    primary_mobile_number: '',
    street_name_telugu: '',
    street_name: '',
    locatity: '',
    locatity_telugu: '',
    pincode: '',
    Authorise_person_name: '',
    Authorise_mobile_no: '',
    Authorise_email_id: '',
  };
  Deviceid: any;
  ngOnInit(): void {
    try {
      this.Deviceid = '';
      //sessionStorage.clear();
      //this.cookieService.deleteAll();
      if (this.Deviceid == '') {
        this.Get_captcha();
        this.getCurrentLocation();
        // this.httpClient
        //   .get('https://api.ipify.org/?format=json')
        //   .subscribe((res: any) => {
        //     this.Deviceid = res.ip;
        //     this.Get_captcha();
        //     this.getCurrentLocation();
        //   });
      } else {
      }
    } catch (error) {
      this.alt.warning('check your internet connection and try again');
    }

    // this.getstatedata();
  }
  Submithealthmaster() {}
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
      const req = new basemodel();
      req.type = '100';
      req.param1 = this.Deviceid;
      req.param2 = clintkey;
      req.param3 = this.hash;
      let rsdata: any = await this.unauth.pree_login_captcha(req);
      
      if (rsdata.code) {
        this.capthform.capenc = rsdata.capenc;
        this.capthform.id = rsdata.id;
        this.capthform.idref = rsdata.idval;
        this.capthform.imgurl = rsdata.imgurl;
        this.capthform.token = rsdata.token;
        this.capthform.hsk = rsdata._hsk;
        this.capthform.capthcheck = rsdata.result;
        this.hash = rsdata.token;
        let clintkey = rsdata._hsk;
        sessionStorage.setItem('appid', clintkey);
        sessionStorage.setItem('_sltkn', this.hash ?? '');
        sessionStorage.setItem('_cltkn', this.hash ?? '');
        let resultuser = this.encdc.enccall(
          'Sap789456' +
            '^' +
            rsdata.capenc +
            '^' +
            rsdata.id +
            '^' +
            rsdata.idval +
            '^' +
            rsdata.imgurl +
            '^' +
            rsdata.token +
            '^' +
            rsdata.result +
            '^' +
            rsdata._hsk
        );
        sessionStorage.setItem('_Uenc', resultuser ?? '');
        this.spinner.hide();
        // this.getstatedata();
      } else {
        this.alt.toastwarning(rsdata.message);
        this.spinner.hide();
      }
    } catch (error) {
      this.spinner.hide();
     
    }
  }
  async openmodel() {
    // this.getdistrict();
  }
  state_array: any[] = [];
  state_array_static: any[] = [
    {
      STATE_CODE: 28,
      STATE_NAME: 'Andhra Pradesh',
      STATE_NAME_TEL: 'ఆంధ్ర ప్రదేశ్',
      STATE: 'Andhra Pradesh / ఆంధ్ర ప్రదేశ్',
    },
  ];
  registration_unit_array: any[] = [
    {
      REGISTRATION_CODE: 10,
      REGISTRATION_NAME: 'Hosptial',
    },
  ];
  hosptial_category_array: any[] = [
    {
      HOSPTIAL_CATE_CODE: 10,
      HOSPTIAL_CATE_NAME: 'Hosptial',
    },
  ];
  hosptial_type_array: any[] = [
    {
      HOSPTIAL_TYPE_CODE: 10,
      HOSPTIAL_TYPE_NAME: 'Hosptial',
    },
  ];
  hosptial_id_array: any[] = [
    {
      HOSPTIAL_ID: 10,
      HOSPTIAL_ID_NAME: 'Hosptial multi',
    },
  ];
}
