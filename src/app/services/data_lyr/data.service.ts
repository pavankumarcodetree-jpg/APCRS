import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { NgxSpinnerService } from 'ngx-spinner';
import { EncDecService } from '../enc_dec_lyr/enc-dec.service';
import { MiddlewareService } from '../middleware_lyr/middleware.service';
import * as CryptoJS from 'crypto-js';
import { SessionexpiredComponent } from 'src/app/Forms/security/sessionexpired/sessionexpired.component';
import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(
    private spinner: NgxSpinnerService,
    private router: Router,
    private cookieService: CookieService,
    private midware: MiddlewareService,
    private encdc: EncDecService,
    private httpClient: HttpClient
  ) {}
  userdta: any;
  async api_connect_un_auth(req: any, api: any): Promise<void> {
    let checkbody: any = this.user_authnticate_un_auth(req);
    try {
      this.spinner.show();
      let clintkey: any = sessionStorage.getItem('appid');
      ;
      let _Uenc: any = sessionStorage.getItem('_Uenc');
      
      let hash: any = this.getHash(
        _Uenc + this.encdc.enccall(JSON.stringify(checkbody)) + clintkey,
        clintkey
      );
      let responce = await this.midware.clinetpostapi(
        this.encdc.enccall(JSON.stringify(checkbody)),
        api,
        hash
      );
      let rsdata = JSON.parse(this.encdc.deccall(responce.data));
      if (rsdata) {
        this.spinner.hide();
        return rsdata;
      } else {
        return rsdata;
      }
    } catch (error) {
      //set exptions
    }
  }

    async api_connect_un_auth_rtgs(req: any, api: any): Promise<void> {
    let checkbody: any = this.user_authnticate_un_auth(req);
    try {
      this.spinner.show();
      let clintkey: any = sessionStorage.getItem('appid');
      ;
      let _Uenc: any = sessionStorage.getItem('_Uenc');
      
      let hash: any = this.getHash(
        _Uenc + this.encdc.enccall(JSON.stringify(checkbody)) + clintkey,
        clintkey
      );
      let responce = await this.midware.clinetpostapi_rtgs(
        this.encdc.enccall(JSON.stringify(checkbody)),
        api,
        hash
      );
      let rsdata = JSON.parse(this.encdc.deccall(responce.data));
      if (rsdata) {
        this.spinner.hide();
        return rsdata;
      } else {
        return rsdata;
      }
    } catch (error) {
      //set exptions
    }
  }
  getHash(text: string, key: string): string {
    const hmac = CryptoJS.HmacSHA256(text, key);
    return hmac.toString(CryptoJS.enc.Hex);
  }
  async api_connect(req: any, api: any): Promise<void> {
    let obj: any = this.encdc.Getuser();
    if (obj != '' && obj != undefined && obj != null) {
      let date = new Date();
      const datePipe = new DatePipe('en-US');
      req.userid = obj[0].USERID;
      req.rucode = obj[0].RU_CODE;
      req.source = 'web';
      req.requestip = sessionStorage.getItem('Deviceid');
      req.Browser = this.midware.detectBrowserVersion();
      req.gioaddress = req.gioaddress;
      req.latitude = sessionStorage.getItem('latitude');
      req.longitude = sessionStorage.getItem('longitude');
      let clintkey: any = sessionStorage.getItem('appid');
      let _Uenc: any = sessionStorage.getItem('_Uenc');
      req.signvalue = sessionStorage.getItem('_Uenc');
      req.hskvalue=sessionStorage.getItem('appid');
      let hash: any = this.getHash(
        _Uenc + this.encdc.enccall(JSON.stringify(req)) + clintkey,
        clintkey
      );
      try {
        this.spinner.show();
        let responce = await this.midware.clinetpostapi(
          this.encdc.enccall(JSON.stringify(req)),
          api,
          hash
        );
        let rsdata = JSON.parse(this.encdc.deccall(responce.data));
        if (rsdata) {
           if(rsdata.code=="9000"){
            this.router.navigate(['/Sessionexpired']);
           }
           else{
            return rsdata;
           }           
        } 
        else {
         this.router.navigate(['/Sessionexpired']);
        }
      } catch (error) {
       this.router.navigate(['/Sessionexpired']);
      }
    } else {
      this.router.navigate(['/Sessionexpired']);
    }
  }

    async api_connect_rtgs(req: any, api: any): Promise<void> {
     // debugger;
    let obj: any = this.encdc.Getuser();
    if (obj != '' && obj != undefined && obj != null) {
      let date = new Date();
      const datePipe = new DatePipe('en-US');
      req.userid = obj[0].USERID;
      req.rucode = obj[0].RU_CODE;
      req.source = 'web';
      req.requestip = sessionStorage.getItem('Deviceid');
      req.Browser = this.midware.detectBrowserVersion();
      req.gioaddress = req.gioaddress;
      req.latitude = sessionStorage.getItem('latitude');
      req.longitude = sessionStorage.getItem('longitude');
      let clintkey: any = sessionStorage.getItem('appid');
      let _Uenc: any = sessionStorage.getItem('_Uenc');
      req.signvalue = sessionStorage.getItem('_Uenc');
      req.hskvalue=sessionStorage.getItem('appid');
      let hash: any = this.getHash(
        _Uenc + this.encdc.enccall(JSON.stringify(req)) + clintkey,
        clintkey
      );
     
      try {
        this.spinner.show();
        let responce = await this.midware.clinetpostapi_rtgs(
          this.encdc.enccall(JSON.stringify(req)),
          api,
          hash
        );
        let rsdata = JSON.parse(this.encdc.deccall(responce.data));
        
        if (rsdata) {
          //  if(rsdata.code=="9000"){
          //   this.router.navigate(['/Sessionexpired']);
          //  }
          //  else{
          //   return rsdata;
          //  }
          return rsdata;           
        } 
        else {
         this.router.navigate(['/Sessionexpired']);
        }
      } catch (error) {
       this.router.navigate(['/Sessionexpired']);
      }
    } else {
      this.router.navigate(['/Sessionexpired']);
    }
  }

 

  
  async api_pdf_download(req: any, api: any): Promise<void> {
    let checkbody: any = this.user_authnticate_un_auth(req);
    try {
        this.spinner.show();
        let clintkey: any = sessionStorage.getItem('appid');
        let _Uenc: any = sessionStorage.getItem('_Uenc');
        let hash: any = this.getHash(
            _Uenc + this.encdc.enccall(JSON.stringify(req)) + clintkey,
            clintkey
        );
        let responce = await this.midware.clinetpostapi_rpt_pdf(
            this.encdc.enccall(JSON.stringify(checkbody)),
            api,
            hash
        );
        
        let rsdata = JSON.parse(this.encdc.deccall(responce.data));

        if (rsdata) {
            this.spinner.hide();
            return rsdata;
        } else {
            return rsdata;
        }
    } catch (error) {
        //set exptions
    }
}
  
  user_authnticate_un_auth(req: any) {
    let date = new Date();
    req.usersno = '_s3_a2psgoud';
    req.userid = '_s3_a2psgoud';
    req.source = 'web';
    req.requestip = sessionStorage.getItem('Deviceid');
    req.Browser = this.midware.detectBrowserVersion();
    req.hskvalue=sessionStorage.getItem('appid');
    req.latitude = '';
    req.longitude = '';
    req.gioaddress = 'web';
    req.signvalue = sessionStorage.getItem('_Uenc');
    req.hashkey=sessionStorage.getItem('appid');
    return req;
  }
}
