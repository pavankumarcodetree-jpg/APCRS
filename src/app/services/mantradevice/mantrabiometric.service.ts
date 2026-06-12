import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class MantrabiometricService {

    private rdServiceUrl = 'http://127.0.0.1:11100/rd/capture'; // RD Service URL
    constructor(private http: HttpClient) { }
    /**
     * Capture thumb data from the Mantra RD Service.
     */
    captureThumb(): Observable<any> {
        const headers = new HttpHeaders({
            'Content-Type': 'text/xml',
        });

        const pidOptions = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
      <PidOptions ver="1.0">
        <Opts fCount="1" fType="2" iCount="0" iType="" pCount="0" pType="" format="0" pidVer="2.0" timeout="20000" otp="" env="P" wadh="E0jzJ/P8UopUHAieZn8CKqS4WPMi5ZSYXgfnlfkWjrc=" posh="LEFT_THUMB"/>
        <CustOpts>
          <Param name="ValidationKey" value=""/>
        </CustOpts>
      </PidOptions>`;

        return this.http.request('CAPTURE', this.rdServiceUrl, {
            body: pidOptions,
            headers,
            responseType: 'text',
        });
    }
}
