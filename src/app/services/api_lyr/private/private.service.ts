import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertsService } from '../../alert_lyr/alerts.service';
import { EncDecService } from '../../enc_dec_lyr/enc-dec.service';
import { MiddlewareService } from '../../middleware_lyr/middleware.service';
import { DataService } from '../../data_lyr/data.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
@Injectable({
    providedIn: 'root',
})
export class PrivateService {
    constructor(
        private spinner: NgxSpinnerService,
        private dataconnect: DataService,
        private http: HttpClient
    ) { }
    //Common Service
    apiUrl: any = 'https://inputtools.google.com/request?text=';

    public transliterateText(text: any): Observable<any> {
        
        const targetLang = 'te'; // 'ta' is the language code for Tamil
        const url = `${this.apiUrl}${encodeURIComponent(
            text
        )}&itc=${targetLang}-t-i0-und&num=1&cp=0&cs=1&ie=utf-8&oe=utf-8&app=test`;

        return this.http.get<any>(url);
    }
    public Cdac_transliterateText(text: string): Observable<any> {
        const targetLang = 'te'; // Telugu language code
        const url = `${this.apiUrl}${encodeURIComponent(
            text
        )}&itc=${targetLang}-t-i0-und&num=1&cp=0&cs=1&ie=utf-8&oe=utf-8&app=test`;

        return this.http.get<any>(url);
    }
    apiUrl1 = 'https://gisttransserver.in/Transliteration.aspx';
    public transliterate(inputText: string): Observable<any> {
        const params = new HttpParams()
            .set('itext', inputText)
            .set('locale', 'tl_in') // Telugu locale
            .set('Transliteration', 'NAME')
            .set('transRev', 'false');

        return this.http.get(this.apiUrl1, { params, responseType: 'text' });
    }

    public google_translate(sourceText: string){
        const sourceLang = 'en';
      const targetLang = 'te';
      const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLang}&tl=${targetLang}&dt=t&q=${encodeURIComponent(
        sourceText
      )}`;
      return this.http.get<any>(url);
    
    }
}
