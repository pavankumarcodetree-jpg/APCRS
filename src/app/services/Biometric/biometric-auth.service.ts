import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
    providedIn: 'root'
})
export class BiometricAuthService {

    private apiUrl = 'https://localhost:11200/rd/capture';
    constructor(private http: HttpClient) { }
    captureBiometricData(): Observable<any> {
        const headers = new HttpHeaders({
            'Content-Type': 'text/xml',
        });

        const inputXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
      <PidOptions ver="1.0">
        <Opts fCount="1" fType="2" iCount="0" iType="" pCount="0" pType="" format="0" pidVer="2.0" timeout="10000" otp="" env="P" wadh="E0jzJ/P8UopUHAieZn8CKqS4WPMi5ZSYXgfnlfkWjrc=" posh="LEFT_THUMB"/>
        <CustOpts><Param name="ValidationKey" value=""/></CustOpts>
      </PidOptions>`;

        return this.http.request('CAPTURE', this.apiUrl, {
            body: inputXml,
            headers,
            responseType: 'text',
        });
    }
}
