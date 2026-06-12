import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
    providedIn: 'root'
})
export class UploadspdfService {

    private uploadUrl = 'https://aadudamandhra8.ap.gov.in/uploadapi/api/upload/content'; // replace with your endpoint
    constructor(private httpClient: HttpClient,) { }

    public uploadPdf(file: File): Observable<any> {
        // const formData = new FormData();
        // formData.append('file', file, file.name);
        //return this.http.post<any>(this.uploadUrl, formData);
        const phform = new FormData();
        phform.append('file', file);
        phform.append('input01', "Test_DP");
        phform.append('input02', "12093");
        phform.append('input03', 'PDF');
        phform.append('input04', "Ayyappa");
        phform.append('userid', "8899");
        return this.httpClient.post<any>(this.uploadUrl, phform);
    }
}
