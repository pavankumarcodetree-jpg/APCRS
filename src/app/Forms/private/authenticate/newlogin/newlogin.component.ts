import { HttpClient } from '@angular/common/http';
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  Inject,
  OnInit,
  Renderer2,
} from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MiddlewareService } from 'src/app/services/middleware_lyr/middleware.service';
import { EncDecService } from 'src/app/services/enc_dec_lyr/enc-dec.service';
import { AlertsService } from 'src/app/services/alert_lyr/alerts.service';
import { UnauthserService } from 'src/app/services/api_lyr/public/unauthser.service';
import { basemodel } from 'src/app/thirparty/model/apimodel';
import { InputvalidaionService } from 'src/app/thirparty/validation/inputvalidaion.service';
import { DOCUMENT, DatePipe } from '@angular/common';
import * as CryptoJS from 'crypto-js';
import { GeolocationService } from 'src/app/services/geolocation.service';
import { interval } from 'rxjs';
declare var $: any;

@Component({
  selector: 'app-newlogin',
  templateUrl: './newlogin.component.html',
  styleUrl: './newlogin.component.css'
})
export class NewloginComponent {
 latitude: number = 0;
  longitude: number = 0;
  loginform = {
    username: '',
    password: '',
    usertype: '',
  };
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
  baseModel: basemodel = new basemodel();display: any;
  verifyotpscreen=false;
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
    private cdr: ChangeDetectorRef,
    @Inject(DOCUMENT) private document: Document,
    private el: ElementRef
  ) {
    
  }
  ngOnInit(): void {
    this.initializeMobileMenu();
    try {
      this.Deviceid = '';
      sessionStorage.clear();
      this.cookieService.deleteAll();
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
  async forgot_password() {
    this.router.navigate(['/auth/forgot-password']);
  }
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

  u_id = '';
  async login_submit_form(): Promise<void> {
    try {
      if (this.check_login_inputs()) {
        const req = new basemodel();
        req.type = '1001';
        req.param1 = this.loginform.username;
        req.param2 = this.loginform.password;
        req.param3 = this.capthform.captchvalue;
        req.islogstore = 'Yes';
        req.logfoldername = 'Department_Login';
        req.refno = this.loginform.username;
        let rsdata: any = await this.unauth.pree_login_service(req);
        
        if (rsdata.code) {
          if (rsdata.code && rsdata.Details[0].STATUS == '1') {
            this.buttonenable = false;
            this.verifyotpscreen=true;
            //this.timer(3);
            this.loginarray = rsdata.Details;
            this.spinner.hide();
            let date = new Date();
            let logtime: any = this.datepipe.transform(date, 'hh:mm:ss a');
            let clintkey: any = rsdata._hsk;
            sessionStorage.setItem('appid', clintkey);
            let resultuser = this.encdc.enccall(JSON.stringify(rsdata.Details));
            this.hash = rsdata.token;
            let _Uenc = this.encdc.enccall(
              rsdata.Details[0].UNAME +
                '^' +
                rsdata.Details[0].USERID +
                '^' +
                rsdata.Details[0].UTYPE +
                '^' +
                rsdata.Details[0].UROLE +
                '^' +
                logtime +
                '^' +
                rsdata._hsk +
                '^' +
                rsdata.Details[0].UKEY_CHANGED +
                '^' +
                rsdata.Details[0].MOBILE_NO +
                '^' +
                rsdata.Details[0].DISTRICT_CODE
            );
            let _hsk = clintkey;
            let _Urole = rsdata.Details[0].UROLE;
            let _Uid = rsdata.Details[0].USER_ID;
            let _sltkn = this.hash;
            let _cltkn = this.hash;
            let _Logtm = rsdata.Details[0].LAST_LOGIN_ON;
            let ipaddress = rsdata.ipaddress;
            sessionStorage.setItem('_Uenc', _Uenc ?? '');
            sessionStorage.setItem('_hsk', _hsk ?? '');
            sessionStorage.setItem('_Urole', _Urole ?? '');
            sessionStorage.setItem('_Uid', _Uid ?? '');
            sessionStorage.setItem('_sltkn', _sltkn ?? '');
            sessionStorage.setItem('_cltkn', _cltkn ?? '');
            sessionStorage.setItem('_Logtm', _Logtm ?? '');
            sessionStorage.setItem('Logdata', resultuser);
            sessionStorage.setItem('logtime', logtime);
            sessionStorage.setItem('ipaddress', ipaddress);
            sessionStorage.setItem('forcepasswordchange', 'Department');
            const expiration = new Date();
            expiration.setHours(expiration.getHours() + 2);
            const host = window.location.href;
            this.cookieService.set('Deviceid', this.Deviceid ?? '', expiration);
            this.cookieService.set('_Uenc', _Uenc ?? '', {
              expires: 2,
              path: host,
              domain: '',
              secure: true,
              sameSite: 'Lax',
            });
            this.cookieService.set('_hsk', _hsk ?? '', {
              expires: 2,
              path: host,
              domain: '',
              secure: true,
              sameSite: 'Lax',
            });
            this.cookieService.set('_Urole', _Urole ?? '', {
              expires: 2,
              path: host,
              domain: '',
              secure: true,
              sameSite: 'Lax',
            });
            this.cookieService.set('_Uid', _Uid ?? '', {
              expires: 2,
              path: host,
              domain: '',
              secure: true,
              sameSite: 'Lax',
            });
            this.cookieService.set('_sltkn', _sltkn ?? '', {
              expires: 2,
              path: host,
              domain: '',
              secure: true,
              sameSite: 'Lax',
            });
            this.cookieService.set('_cltkn', _cltkn ?? '', {
              expires: 2,
              path: host,
              domain: '',
              secure: true,
              sameSite: 'Lax',
            });
            this.cookieService.set('_Logtm', _Logtm ?? '', {
              expires: 2,
              path: host,
              domain: '',
              secure: true,
              sameSite: 'Lax',
            });
            if (rsdata.Details[0].UKEY_CHANGED == '0') {
              //this.router.navigate(['/auth/Department-force-password-change']);
              this.router.navigate(['/shared/welcome']);
              this.spinner.hide();
            } else {
              this.router.navigate(['/shared/welcome']);
              this.spinner.hide();
            }
            this.spinner.hide();
          } else if (rsdata.code && rsdata.Details[0].STATUS == '6') {
            this.alt.toastinfo(rsdata.Details[0].STATUS_TEXT);
            this.Get_captcha();
            this.router.navigate(['/auth/login']);
          } else if (rsdata.code && rsdata.Details[0].STATUS == '7') {
            this.alt.toastinfo(rsdata.Details[0].STATUS_TEXT);
            this.Get_captcha();
            this.router.navigate(['/auth/login']);
          } else if (rsdata.code && rsdata.Details[0].STATUS == '0') {
            this.alt.toasterror(
              rsdata.Details[0].STATUS_TEXT +
                rsdata.Details[0].STATUS_TEXT_TEL
            );
            this.Get_captcha();
            this.router.navigate(['/auth/login']);
          } else {
            this.alt.warning('invalid user name and password');
            this.Get_captcha();
            this.spinner.hide();
          }
        } else {
          this.alt.warning('invalid user name and password');
          this.Get_captcha();
          this.spinner.hide();
        }
      } else {
        this.Get_captcha();
        this.spinner.hide();
      }
    } catch (error) {
      this.Get_captcha();
      this.spinner.hide();
      this.alt.warning('something went wrong');
    }
  }
  otp_code: any;
  otp: any;
  otpsend = '0';
  mobileno:any;  is_send_otp_disable: boolean = false;
  is_resend_otp: boolean = false;
  is_mobile_disable: boolean = false;
  async send_otp(): Promise<void> {
      if (this.val.isEmpty(this.mobileno)) {
          this.alt.toastwarning('Please enter mobile no');
          return;
      }  else {
          try {
             

              const req = new basemodel();
              req.type = '1001'; //'100';
              req.param1 = this.mobileno; //this.mobileno;
              req.param2 = 'Generalregistration';
              req.param9 = 'G';
              req.param10 = 'commonotp';
              req.param11 = 'General Consumer';
              req.param12 = 'Registration';
              req.param13 = 'SANDSSPBAPP';
              req.islogstore = 'Yes';
              req.logfoldername = 'SMS_Gateway';
              req.refno = this.mobileno;
              this.spinner.show();
              let responce: any = await this.unauth.pree_login_utilityspdata01(req);
              if (responce.code) {
                  if (responce.code && responce.Details[0].STATUS == '1') {
                      this.otpsend = '1';
                      this.spinner.hide();
                      this.is_send_otp_disable = true;
                      this.is_mobile_disable = true;
                      this.alt.success(
                          responce.Details[0].STATUS_TEXT +
                          '</br>' +
                          responce.Details[0].STATUS_TEXT_TEL
                      );
                      this.otp_code = responce.Details[0].OTP_CODE;
                      this.startTimer();
                      return;
                  }
                  if (responce.code && responce.Details[0].STATUS == '0') {
                      this.spinner.hide();
                      this.otpsend = '0';
                      this.alt.warning(
                          responce.Details[0].STATUS_TEXT +
                          '</br>' +
                          responce.Details[0].STATUS_TEXT_TEL
                      );
                      this.is_send_otp_disable = false;
                      this.is_mobile_disable = false;
                      return;
                  } else {
                      this.spinner.hide();
                      this.otpsend = '0';
                      this.alt.info(responce.message);
                      this.is_send_otp_disable = false;
                      this.is_mobile_disable = false;
                      return;
                  }
              } else {
                  this.spinner.hide();
                  this.otpsend = '0';
                  this.alt.warning(responce.message);
                  this.is_send_otp_disable = false;
                  this.is_mobile_disable = false;
                  return;
              }
          } catch (error) {
              this.otpsend = '0';
              this.spinner.hide();
              this.alt.warning('Something went wrong ' + error);
              this.is_send_otp_disable = false;
              this.is_mobile_disable = false;
              return;
          }
      }
  }
  minutes: number = 0;
  remainingSeconds: number = 0;
  timer: number = 60; // Initial timer value in seconds
  private countdownSubscription: any;
  startTimer(resetTimer: boolean = false): void {
    if (resetTimer) {
      this.timer = 60; // Reset timer
    }
    // Stop any running timer
    this.stopTimer();
    const source = interval(1000); // Emit a value every second
    this.countdownSubscription = source.subscribe(() => {
      if (this.timer > 0) {
        this.timer--;
        this.minutes = Math.floor(this.timer / 60);
        this.remainingSeconds = this.timer % 60;
        this.cdr.detectChanges();
      } else {
        this.stopTimer();
        this.is_resend_otp = true;
        this.cdr.detectChanges();
        // Handle timer expiration (e.g., resend OTP or show timeout message)
      }
    });
  }

  stopTimer(): void {
    if (this.countdownSubscription) {
      this.countdownSubscription.unsubscribe();
      this.cdr.detectChanges();
    }
  }
  check_login_inputs(): boolean {
    if (this.val.isEmpty(this.loginform.username)) {
      this.alt.toastwarning('Please Enter username');
      return false;
    } else if (this.val.isEmpty(this.loginform.password)) {
      this.alt.warning('Please Enter password');
      return false;
    } else if (this.val.isEmpty(this.capthform.captchvalue)) {
      this.alt.warning('Please solve captcha');
      return false;
    } else if (this.capthform.captchvalue != this.capthform.capthcheck) {
      this.capthform.captchvalue = '';
      this.alt.warning('Invalid captcha please try again');
      return false;
    } else {
      return true;
    }
  }

  multirolelogintarry: any[] = [];
  multipledisplaymodal = 'none';
  mulitpleModalclose() {}
  async loginworkspace(obj: any) {
    if (obj.STATUS == '1') {
      const arryobj = [obj];
      this.spinner.hide();
    } else {
      this.alt.toastinfo(obj.STATUS_TEXT);
      this.router.navigate(['/auth/Department-login']);
    }
  }
  public fieldTextTypeonelogin: boolean | undefined;
  toggleFieldTextTypeonelogin() {
    this.fieldTextTypeonelogin = !this.fieldTextTypeonelogin;
  }
  isClassToggled = false;
  toggleClass() {
    this.isClassToggled = !this.isClassToggled;
  }
  initializeMobileMenu() {
    const mainMenuContent = document.querySelector(
      '.main-header .main-menu .navigation'
    )?.innerHTML;
    if (mainMenuContent) {
      const mobileMenuNavigation = document.querySelector(
        '.mobile-menu .navigation'
      );
      const stickyHeaderNavigation = document.querySelector(
        '.sticky-header .navigation'
      );
      if (mobileMenuNavigation) {
        mobileMenuNavigation.innerHTML = mainMenuContent;
      }
      if (stickyHeaderNavigation) {
        stickyHeaderNavigation.innerHTML = mainMenuContent;
      }
    }
    const dropdowns = this.el.nativeElement.querySelectorAll(
      '.main-header li.dropdown ul'
    );
    if (dropdowns.length > 0) {
      const navigationItems = this.el.nativeElement.querySelectorAll(
        '.main-header .navigation li.dropdown'
      );
      navigationItems.forEach((item: HTMLElement) => {
        const dropdownBtn = this.renderer.createElement('div');
        dropdownBtn.classList.add('dropdown-btn');
        dropdownBtn.innerHTML = '<i class="fa fa-angle-down"></i>';
        this.renderer.appendChild(item, dropdownBtn);
        this.renderer.listen(dropdownBtn, 'click', (event) =>
          this.toggleDropdown(event, item)
        );
        this.renderer.appendChild(item, dropdownBtn);
      });
    }
  }
  toggleDropdown(event: Event, item: HTMLElement) {
    const dropdownContent = item.querySelector('ul');
    if (dropdownContent) {
      dropdownContent.classList.toggle('active');
      const isActive = dropdownContent.classList.contains('active');
      dropdownContent.style.display = isActive ? 'block' : 'none';
    }
    const dropdownBtn = event.target as HTMLElement;
    dropdownBtn.classList.toggle('active');
  }
  isBodyClassActive: boolean = false;
  toggleBodyClass() {
    this.isBodyClassActive = !this.isBodyClassActive;
    if (this.isBodyClassActive) {
      this.renderer.addClass(this.document.body, 'mobile-menu-visible');
    } else {
      this.renderer.removeClass(this.document.body, 'mobile-menu-visible');
    }
  }
}
