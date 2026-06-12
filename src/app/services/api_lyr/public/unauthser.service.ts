import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertsService } from '../../alert_lyr/alerts.service';
import { EncDecService } from '../../enc_dec_lyr/enc-dec.service';
import { MiddlewareService } from '../../middleware_lyr/middleware.service';
import { DataService } from '../../data_lyr/data.service';
@Injectable({
  providedIn: 'root',
})
export class UnauthserService {
  constructor(
    private spinner: NgxSpinnerService,
    private dataconnect: DataService
  ) { }

  async pree_login_captcha(req: any): Promise<void> {
    try {
      return await this.dataconnect.api_connect_un_auth(
        req,
        'api/apcrsV1/humancheck'
      );
    } catch (error) {
      this.spinner.hide();
    }
  }
  async pree_login_service(req: any): Promise<void> {
    try {
      return await this.dataconnect.api_connect_un_auth(
        req,
        'api/apcrsV1/pkgusers'
      );
    } catch (error) {
      this.spinner.hide();
    }
  }

  async pree_utilities_service(req: any): Promise<void> {
    try {
      return await this.dataconnect.api_connect_un_auth(
        req,
        'api/apcrsV1/pkgutilities'
      );
    } catch (error) {
      this.spinner.hide();
    }
  }




  async pree_utilities_service_rtgs(req: any): Promise<void> {
    try {
      return await this.dataconnect.api_connect_un_auth_rtgs(
        req,
        'api/apcrsV1/dashboard_Birth_Death'
      );
    } catch (error) {
      this.spinner.hide();
    }
  }
  //otp
  async pree_login_utilityspdata01(req: any): Promise<void> {
    try {
      return await this.dataconnect.api_connect_un_auth(req, 'api/v1sms/utilityspdata01');
    }
    catch (error) {
      this.spinner.hide();
    }
  }

}
