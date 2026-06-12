import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, Inject, Output, Renderer2 } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MiddlewareService } from 'src/app/services/middleware_lyr/middleware.service';
import { EncDecService } from 'src/app/services/enc_dec_lyr/enc-dec.service';
import { AlertsService } from 'src/app/services/alert_lyr/alerts.service';
import { PrivateService } from 'src/app/services/api_lyr/private/private.service';
import { basemodel } from 'src/app/thirparty/model/apimodel';
import { InputvalidaionService } from 'src/app/thirparty/validation/inputvalidaion.service';
import { DatePipe, DOCUMENT } from '@angular/common';
import { firstValueFrom, interval, Subscription } from 'rxjs';
import * as CryptoJS from 'crypto-js';
import { UnauthserService } from 'src/app/services/api_lyr/public/unauthser.service';
import { GeolocationService } from 'src/app/services/geolocation.service';
@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css'],
})
export class ForgotpasswordComponent {
   timer: number = 600; // Initial timer value in seconds
      private countdownSubscription: any;
      Changpassform = {
          username: '',
          newpassword: '',
          connewpassword: '',
          mobile_no: '',
          otp_code: '',
      };

      isotpDisable: boolean = true; is_send_otp_disable: boolean = false; is_resend_otp: boolean = false; is_mobile_disable: boolean = false;
      baseModel: basemodel = new basemodel();
latitude: number = 0;
  longitude: number = 0;
  loginarray: any[] = [];
  buttonenable: boolean = true;
  capthform = {
    capenc: '',
    id: '',
    idref: '',
    imgurl: '',
    token: '',
    hsk: '',
    capthcheck: '',
    captchvalue: '',
  };
  Deviceid: any;
  hash: any;
  SPORTCODE: any;
  constructor(
    private spinner: NgxSpinnerService,
    private cookieService: CookieService,
    private alt: AlertsService,
    private unauth: UnauthserService,
    private httpClient: HttpClient,
    private val: InputvalidaionService,
    private router: Router,
    private encdc: EncDecService,
    private mid: MiddlewareService,
    private datepipe: DatePipe,
    private geolocationService: GeolocationService,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document,
    private el: ElementRef
  ) {}

  async ngOnInit(): Promise<void> {
    try {
      this.Deviceid = '';
      sessionStorage.clear();
      this.cookieService.deleteAll();
      
      await this.getiplocation();
      this.getCurrentLocation();
      
      
    } catch (error) {
      this.alt.warning('Check your internet connection and try again');
    }
  }
  
  async getiplocation(): Promise<void> {
    try {
      const res: any = await firstValueFrom(this.httpClient.get('https://api.ipify.org/?format=json'));
      
      sessionStorage.setItem('Deviceid', res.ip);
      this.Deviceid = res.ip;
      this.Get_captcha();
    } catch (error) {
      
      return;
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
  // async forgot_password() {
  //   this.router.navigate(['/auth/forgot-password']);
  // }
  async Get_captcha(): Promise<void> {
    try {
      let date = new Date();
      const datePipe = new DatePipe('en-US');
      let clintkey: any = datePipe.transform(date, 'ddMMyyyyHHmmssss');
      sessionStorage.setItem('appid', clintkey);
      this.hash = CryptoJS.SHA256(this.Deviceid + '^' + clintkey).toString();
      let resultuser = this.encdc.enccall('_s3_a2psgoud'+ '^' + this.Deviceid + '^' + clintkey );
      
      sessionStorage.setItem('Deviceid', this.Deviceid);
      sessionStorage.setItem('_Uenc', resultuser ?? '');
      sessionStorage.setItem('_sltkn', this.hash ?? '');
      sessionStorage.setItem('_cltkn', this.hash ?? '');
      const req = new basemodel();
      req.type = '100';
      req.param1 = this.Deviceid;
      req.param2 = clintkey;
      req.param3 = this.hash;
      this.capthform.captchvalue = '';
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
          '_s3_a2psgoud' +
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
      } else {
        this.alt.toastwarning(rsdata.message);
        this.spinner.hide();
      }
    } catch (error) {
      this.spinner.hide();
      this.alt.warning('something went wrong');
    }
  }
  
  
      async submit_form(): Promise<void> {
          try {
              if (this.check_login_inputs()) {
                  try {
                      const req = new basemodel();
                      req.type = '1002';
                      req.param1 = this.Changpassform.username;
                      req.param2 = this.Changpassform.newpassword;
                      req.param3 = this.capthform.captchvalue;
                      req.param4 = this.capthform.capenc;
                      req.islogstore = 'Yes';
        req.logfoldername = 'Department_Login';
        req.refno = this.Changpassform.username;
                      this.spinner.show();
        
                      let responce: any = await this.unauth.pree_login_service(req);
  
                      if (responce.code) {
                          if (responce.code && responce.Details[0].STATUS == "1") {
                              this.spinner.hide();
                              this.alt.success(responce.Details[0].STATUS_TEXT);
                              this.childClick();
                              return;
                          }
                          if (responce.code && responce.Details[0].STATUS == "0") {
                              this.spinner.hide();
                              this.alt.info(responce.Details[0].STATUS_TEXT);
                              this.Get_captcha();
                              return;
                          }
                      }
                      else {
                          this.spinner.hide();
                          this.alt.warning(responce.message);
                          this.Get_captcha();
                          return;
                      }
                  } catch (error) {
                      this.alt.warning('Something went wrong ' + error);
                      this.Get_captcha();
                      return;
                  }
              }
              else {
                  this.spinner.hide();
                  this.Get_captcha();
              }
          }
          catch (error) {
              this.Get_captcha();
              this.spinner.hide();
              this.alt.warning('something went wrong');
          }
      }
      check_login_inputs(): boolean {
  
          if (this.val.isEmpty(this.Changpassform.username)) {
              this.alt.toastwarning('Please Enter username');
              return false;
          } else if (this.val.isEmpty(this.Changpassform.newpassword)) {
              this.alt.warning('Please Enter new password');
              return false;
          }
          else if (this.val.isEmpty(this.Changpassform.connewpassword)) {
              this.alt.warning('Please Enter confirm password');
              return false;
          }
          else if ((this.Changpassform.connewpassword) != (this.Changpassform.newpassword)) {
              this.alt.warning('New password and confirmation password do not match.');
              return false;
          }
          // else if ((this.Changpassform.connewpassword) == (this.Changpassform.newpassword)) {
          //     this.checkPasswordStrength();
          //     if (this.passwordStrength == 'Strong') {
          //         return true;
          //     }
          //     else {
          //         this.alt.warning('password should contain atleast one number and one special character');
          //         return false;
          //     }
          // }
          else if ((this.capthform.capthcheck) != (this.capthform.captchvalue)) {
              this.alt.warning('Please enter valid captcha');
              return false;
          }
          // else if (this.val.isEmpty(this.Changpassform.mobile_no)) {
          //     this.alt.warning('Mobile no is empty please try again after sometime');
          //     return false;
          // }
          else {
              return true;
          }
      }
  
      passwordStrength: any = '';
      checkPasswordStrength() {
          const password = this.Changpassform.connewpassword;
  
          // Check password strength based on criteria
          if (password.length < 8) {
              this.passwordStrength = 'Weak';
          } else if (!/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/[0-9]/.test(password)) {
              this.passwordStrength = 'Moderate';
          } else {
              this.passwordStrength = 'Strong';
          }
  
      }
  
      public fieldTextTypeonelogin: boolean | undefined;
      toggleFieldTextTypeonelogin() {
          this.fieldTextTypeonelogin = !this.fieldTextTypeonelogin;
      }

@Output() listenParentHandler = new EventEmitter();
 
childClick(){
  this.listenParentHandler.emit(true);
}
}
