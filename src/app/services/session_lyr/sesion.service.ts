import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { MiddlewareService } from '../middleware_lyr/middleware.service';
import { EncDecService } from 'src/app/services/enc_dec_lyr/enc-dec.service';
import { DatePipe } from '@angular/common';
import { basemodel } from 'src/app/thirparty/model/apimodel';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertsService } from 'src/app/services/alert_lyr/alerts.service';
import { PrivateService } from 'src/app/services/api_lyr/private/private.service';
import { HttpClient } from '@angular/common/http';
import { InputvalidaionService } from 'src/app/thirparty/validation/inputvalidaion.service';
@Injectable({
  providedIn: 'root',
})
export class SesionService implements CanActivate {
  constructor(
    public router: Router,
    private cookieService: CookieService,
    private Middleware: MiddlewareService,
    private encdc: EncDecService,
    private datepipe: DatePipe,
    private spinner: NgxSpinnerService,
    private alt: AlertsService,
    private pscall: PrivateService,
    private httpClient: HttpClient,
    private val: InputvalidaionService,
    private mid: MiddlewareService
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // if (!route.children || route.children.length === 0) {
    //     return true;
    // }
    let _lo_Uenc = sessionStorage.getItem('_Uenc');
    let _lo_hsk = sessionStorage.getItem('_hsk');
    let _lo_Urole = sessionStorage.getItem('_Urole');
    let _lo_Uid = sessionStorage.getItem('_Uid');
    let _lo_sltkn = sessionStorage.getItem('_sltkn');
    let _lo_cltkn = sessionStorage.getItem('_cltkn');
    let _co_Uenc = this.cookieService.get('_Uenc');
    let _co_hsk = this.cookieService.get('_hsk');
    let _co_Urole = this.cookieService.get('_Urole');
    let _co_Uid = this.cookieService.get('_Uid');
    let _co_sltkn = this.cookieService.get('_sltkn');
    let _co_cltkn = this.cookieService.get('_cltkn');
    if (
      _lo_Uenc === undefined ||
      _lo_Uenc === null ||
      (_lo_Uenc === '' && _lo_hsk === undefined) ||
      _lo_hsk === null ||
      (_lo_hsk === '' && _lo_Urole === undefined) ||
      _lo_Urole === null ||
      (_lo_Urole === '' && _lo_Uid === undefined) ||
      _lo_Uid === null ||
      (_lo_Uid === '' && _lo_sltkn === undefined) ||
      _lo_sltkn === null ||
      (_lo_sltkn === '' && _lo_cltkn === undefined) ||
      _lo_cltkn === null ||
      _lo_cltkn === ''
    ) {
      // sessionStorage.clear();
      // this.cookieService.deleteAll();
      // this.Middleware.Responseerror("session");
      this.logout_user();
      return false;
    }
    if (
      _co_Uenc === undefined ||
      _co_Uenc === null ||
      (_co_Uenc === '' && _co_hsk === undefined) ||
      _co_hsk === null ||
      (_co_hsk === '' && _co_Urole === undefined) ||
      _co_Urole === null ||
      (_co_Urole === '' && _co_Uid === undefined) ||
      _co_Uid === null ||
      (_co_Uid === '' && _co_sltkn === undefined) ||
      _co_sltkn === null ||
      (_co_sltkn === '' && _co_cltkn === undefined) ||
      _co_cltkn === null ||
      _co_cltkn === ''
    ) {
      // sessionStorage.clear();
      // this.cookieService.deleteAll();
      // this.Middleware.Responseerror("session");
      this.logout_user();
      return false;
    }
    if (
      _lo_Uenc == _co_Uenc &&
      _lo_hsk == _co_hsk &&
      _lo_Urole == _co_Urole &&
      _lo_Uid == _co_Uid &&
      _lo_sltkn == _co_sltkn &&
      _lo_cltkn == _co_cltkn
    ) {
      let logtime: any = sessionStorage.getItem('logtime');
      let diffTime = Math.abs(
        new Date().valueOf() - new Date(logtime).valueOf()
      );
      let days = diffTime / (24 * 60 * 60 * 1000);
      let hours = (days % 1) * 24;
      let minutes = (hours % 1) * 60;
      let secs = (minutes % 1) * 60;
      let obj: any = this.encdc.Getuser();
      // for (const childRoute of route.children) {
      //     let requiredRoles = childRoute.data['expectedRole'] as string[];
      //     if (requiredRoles.includes(obj[0].U_ROLE)) {
      //         let logtime: any = sessionStorage.getItem("logtime");
      //         let diffTime = Math.abs(new Date().valueOf() - new Date(logtime).valueOf());
      //         let days = diffTime / (24 * 60 * 60 * 1000);
      //         let hours = (days % 1) * 24;
      //         let minutes = (hours % 1) * 60;
      //         let secs = (minutes % 1) * 60;
      //         return true;
      //     }
      //     else {
      //         sessionStorage.clear();
      //         this.cookieService.deleteAll();
      //         this.Middleware.Responseerror("session");
      //         return false;
      //     }
      // }
      return true;
    } else {
      this.logout_user();
      // sessionStorage.clear();
      // this.cookieService.deleteAll();
      // this.Middleware.Responseerror("session");
      return false;
    }
  }
  async logout_user(): Promise<void> {
    sessionStorage.clear();
    this.cookieService.deleteAll();
    this.Middleware.Responseerror('session');
    this.spinner.hide();
    // if (sessionStorage.getItem("_Uid") != null) {
    //     const req = new basemodel();
    //     req.type = '1123';
    //     req.param1 = sessionStorage.getItem("_Uid");
    //     let rsdata: any = await this.pscall.Session_expired_service(req);
    //     if (rsdata.code) {
    //         if (rsdata.code && rsdata.Details[0].STATUS == '1') {
    //             sessionStorage.clear();
    //             this.cookieService.deleteAll();
    //             this.Middleware.Responseerror("session");
    //             this.spinner.hide();
    //             return;
    //         }
    //         else if (rsdata.code && rsdata.Details[0].STATUS == '0') {
    //             //this.alt.toastinfo(rsdata.Details[0].STATUS_TEXT);
    //             sessionStorage.clear();
    //             this.cookieService.deleteAll();
    //             this.Middleware.Responseerror("session");
    //             return;
    //         }
    //         else {
    //             sessionStorage.clear();
    //             this.cookieService.deleteAll();
    //             this.Middleware.Responseerror("session");
    //             this.spinner.hide();
    //             return;
    //             //this.Get_captcha();
    //         }
    //     }
    //     else {
    //         sessionStorage.clear();
    //         this.cookieService.deleteAll();
    //         this.Middleware.Responseerror("session");
    //         this.spinner.hide();
    //         return;
    //         //this.alt.warning("Failed please try again");
    //     }
    // }
    // else {
    //     sessionStorage.clear();
    //     this.cookieService.deleteAll();
    //     this.Middleware.Responseerror("session");
    //     this.spinner.hide();
    // }
  }
}
