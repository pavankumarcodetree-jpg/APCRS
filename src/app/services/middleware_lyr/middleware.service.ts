import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable, retry } from 'rxjs';
import { EncDecService } from '../enc_dec_lyr/enc-dec.service';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';
// import { PDFDocument, StandardFonts } from 'pdf-lib';
@Injectable({
  providedIn: 'root',
})
export class MiddlewareService {
  globalsetting = {
    applicationmode: 'prod', //prod:production****************uat:testing mode,
    //applicationmode: 'uat',
    appclient: 'webclient',
    retry: 1,
    api_url_conent_show: 'https://apcrs.ap.gov.in/nasview/',
    api_url_conent_upload: 'https://apcrs.ap.gov.in/nasstore/api/upload/content',
    api_url_prod: 'https://apcrs.ap.gov.in/app45/',
    api_url_uat: 'http://localhost:6716/',
    base_url_calling_api: '',
    rpt_service_api_url: 'https://apcrs.ap.gov.in/apprpt/',

  };
  encrypted: any = '';
  decrypted: any = '';
  hash: any = '';
  request: any = '';
  responce: any = '';
  constructor(
    private cookieService: CookieService,
    private httpClient: HttpClient,
    private router: Router,
    private encdc: EncDecService
  ) { }
  public async clinetpostapi(req: any, apiname: any, hash: any) {
    if (this.globalsetting.applicationmode == 'prod') {
      this.globalsetting.base_url_calling_api = this.globalsetting.api_url_prod;
    }
    if (this.globalsetting.applicationmode == 'uat') {
      this.globalsetting.base_url_calling_api = this.globalsetting.api_url_uat;
    }
    try {
      const reqobj = { _Clients3a2: req };
      let clintkey: any = sessionStorage.getItem('appid');
      let _Uenc: any = sessionStorage.getItem('_Uenc');
      let _sltkn: any = sessionStorage.getItem('_sltkn');
      const result: any = await this.httpClient
        .post(
          `${this.globalsetting.base_url_calling_api}${apiname}`,
          reqobj,
          this.getPostHttp(req, hash, clintkey, _sltkn, _Uenc)
        )
        .pipe(retry(this.globalsetting.retry))
        .toPromise();
      return result;
    } catch (error) {
      // Handle the error here
      console.error('HTTP request error:', error);
      throw error; // Rethrow the error if needed
    }
  }

  public async clinetpostapi_rtgs(req: any, apiname: any, hash: any) {

    this.globalsetting.base_url_calling_api ="https://apcrs.ap.gov.in/apcrsrtgs/"; //"http://localhost:6716/"//"https://apcrs.ap.gov.in/apcrsrtgs/";//"http://10.96.46.46/apcrsrtgs/";

    try {
      const reqobj = { _Clients3a2: req };
      let clintkey: any = sessionStorage.getItem('appid');
      let _Uenc: any = sessionStorage.getItem('_Uenc');
      let _sltkn: any = sessionStorage.getItem('_sltkn');
    

      const result: any = await this.httpClient
        .post(
          `${this.globalsetting.base_url_calling_api}${apiname}`,
          reqobj,
          this.getPostHttp(req, hash, clintkey, _sltkn, _Uenc)
        )
        .pipe(retry(this.globalsetting.retry))
        .toPromise();


      return result;

    } catch (error) {
      // Handle the error here
      console.error('HTTP request error:', error);
      throw error; // Rethrow the error if needed
    }
    
  }
 private apiUrl = 'http://apchfw.ap.gov.in/apiNew/APCHFW/v1.0/SDG_KPI/pwMaternalDeaths';
  getMaternalDeaths(data: any): Observable<any> {
    const headers = new HttpHeaders({
      'Username': 'swasti',
      'Password': 'Sw@$t#I@2025',
      'Authorization': 'Bearer 40a5e74759de84d0e3085bfd96996c7547f36e58ea7002112246f1287d8e6d12',  // adjust if not Bearer
      'Content-Type': 'application/json'
    });

    return this.httpClient.post(this.apiUrl, data, { headers });
  }
  
  public async clinetpostapi_rpt_pdf(req: any, apiname: any, hash: any) {


    if (this.globalsetting.applicationmode == 'prod') { this.globalsetting.base_url_calling_api = this.globalsetting.rpt_service_api_url; }
    if (this.globalsetting.applicationmode == 'uat') { this.globalsetting.base_url_calling_api = this.globalsetting.rpt_service_api_url; }
    try {
      const reqobj = { _Clients3a2: req };
      let clintkey: any = sessionStorage.getItem("appid");
      let _Uenc: any = sessionStorage.getItem("_Uenc");
      let _sltkn: any = sessionStorage.getItem("_sltkn");

      const result: any = await this.httpClient.post(`${this.globalsetting.base_url_calling_api}${apiname}`,
        reqobj, this.getPostHttp(req, hash, clintkey, _sltkn, _Uenc))
        .pipe(retry(this.globalsetting.retry))
        .toPromise();
      return result;
    } catch (error) {

      // Handle the error here
      console.error('HTTP request error:', error);
      throw error; // Rethrow the error if needed
    }
  }
  getPostHttp(
    encobj: any,
    encsign: any,
    accesske: any,
    accesstk: any,
    accessus: any
  ): any {
    try {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          accessus: accessus,
          accesske: accesske,
          accesstk: accesstk,
          accessdt: encobj, // encobj,
          accessdtsi: encsign,
        }),
      };
      return httpOptions;
    } catch (error) {
      this.clearjunk();
      return this.router.navigate(['/Badrequest']);
    }
  }
  getPostHttpOption_withenc(encobj: any, encsign: any): any {
    try {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      };
      return httpOptions;
    } catch (error) {
      return this.Responseerror(error);
    }
  }
  HttpOptions(): any {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return httpOptions;
  }
  getPostHttpOptionauth(encobj: any, encsign: any): any {
    try {
      if (
        this.cookieService.get('_Uenc') != '' &&
        this.cookieService.get('_hsk') != '' &&
        this.cookieService.get('_Urole') != '' &&
        this.cookieService.get('_Uid') != '' &&
        this.cookieService.get('_sltkn') != '' &&
        this.cookieService.get('_cltkn') != ''
      ) {
        const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            accessus: this.cookieService.get('_Uenc'),
            accesske: this.cookieService.get('_hsk'),
            accesstk: this.cookieService.get('_sltkn'),
            accessdt: encobj,
            accessdtsi: encsign,
          }),
        };
        return httpOptions;
      } else {
        this.clearjunk();
        return this.router.navigate(['/Badrequest']);
      }
    } catch (error) {
      return this.Responseerror(error);
    }
  }
  JSONToCSVConvertorpdf(
    JSONData: any,
    ReportTitle: string,
    ShowLabel: any
  ): void {
    const arrData =
      typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
    let CSV = 'sep=,' + '\r\n\n';
    if (ShowLabel) {
      let row = '';
      for (let index in arrData[0]) {
        row += index + ',';
      }
      row = row.slice(0, -1);
      CSV += row + '\r\n';
    }
    for (let i = 0; i < arrData.length; i++) {
      let row = '';
      for (let index in arrData[i]) {
        row += '"' + arrData[i][index] + '",';
      }
      row.slice(0, row.length - 1);
      CSV += row + '\r\n';
    }
    if (CSV == '') {
      alert('Invalid data');
      return;
    }
    let fileName = '';
    fileName += ReportTitle.replace(/ /g, '_');
    // Initialize file format you want csv or xls
    const uri = 'data:application/pdf;' + escape(CSV);
    const link = document.createElement('a');
    link.href = uri;
    // set the visibility hidden so it will not effect on your web-layout
    // link.style = 'visibility:hidden';
    link.download = fileName + '.pdf';
    // this part will append the anchor tag and remove it after automatic click
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  JSONToCSVConvertor(JSONData: any, ReportTitle: string, ShowLabel: any): void {
    const arrData =
      typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;

    let CSV = 'sep=,' + '\r\n\n';
    if (ShowLabel) {
      let row = '';
      for (let index in arrData[0]) {
        row += index + ',';
      }
      row = row.slice(0, -1);
      CSV += row + '\r\n';
    }
    for (let i = 0; i < arrData.length; i++) {
      let row = '';
      for (let index in arrData[i]) {
        row += '"' + arrData[i][index] + '",';
      }

      row.slice(0, row.length - 1);
      CSV += row + '\r\n';
    }

    if (CSV == '') {
      alert('Invalid data');
      return;
    }

    let fileName = '';
    fileName += ReportTitle.replace(/ /g, '_');

    // Initialize file format you want csv or xls
    const uri = 'data:text/csv;charset=utf-8,' + escape(CSV);
    const link = document.createElement('a');
    link.href = uri;

    // set the visibility hidden so it will not effect on your web-layout

    // link.style = 'visibility:hidden';
    link.download = fileName + '.csv';

    // this part will append the anchor tag and remove it after automatic click
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  clearjunk() {
    sessionStorage.clear();
    this.cookieService.deleteAll();
  }
  Responseerror(error: any): void {
    if (error.status === 401) {
      this.clearjunk();
      this.router.navigate(['/Unauthorizedaccess']);
    } else if (error.status === 403) {
      this.clearjunk();
      this.router.navigate(['/Unauthorizedaccess']);
    } else if (error.status >= 500 && error.status < 600) {
      this.clearjunk();
      this.router.navigate(['/Badrequest']);
    } else if (error.status === 400) {
      this.clearjunk();
      this.router.navigate(['/Badrequest']);
    } else if (error === 'session') {
      this.clearjunk();
      this.router.navigate(['/Sessionexpired']);
    } else if (error === 'access') {
      this.clearjunk();
      this.router.navigate(['/Unauthorizedaccess']);
    } else {
      this.router.navigate(['/Badrequest']);
    }
  }
  num: any;
  validateVerhoeff(num: any): boolean {
    if (num.length !== 12) {
      return false;
    }
    if (
      num === '333333333333' ||
      num === '666666666666' ||
      num === '999999999999'
    ) {
      return false;
    }

    const d = [
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      [1, 2, 3, 4, 0, 6, 7, 8, 9, 5],
      [2, 3, 4, 0, 1, 7, 8, 9, 5, 6],
      [3, 4, 0, 1, 2, 8, 9, 5, 6, 7],
      [4, 0, 1, 2, 3, 9, 5, 6, 7, 8],
      [5, 9, 8, 7, 6, 0, 4, 3, 2, 1],
      [6, 5, 9, 8, 7, 1, 0, 4, 3, 2],
      [7, 6, 5, 9, 8, 2, 1, 0, 4, 3],
      [8, 7, 6, 5, 9, 3, 2, 1, 0, 4],
      [9, 8, 7, 6, 5, 4, 3, 2, 1, 0],
    ];

    // The permutation table
    const p = [
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      [1, 5, 7, 6, 2, 8, 3, 0, 9, 4],
      [5, 8, 0, 3, 7, 9, 6, 1, 4, 2],
      [8, 9, 1, 6, 0, 4, 3, 5, 2, 7],
      [9, 4, 5, 3, 1, 2, 6, 8, 7, 0],
      [4, 2, 8, 6, 5, 7, 3, 9, 0, 1],
      [2, 7, 9, 3, 8, 0, 6, 4, 1, 5],
      [7, 0, 4, 6, 9, 1, 3, 2, 5, 8],
    ];

    // The inverse table
    const inv = [0, 4, 3, 2, 1, 5, 6, 7, 8, 9];

    let cc;
    let c = 0;
    const myArray = this.StringToReversedIntArray(num);
    for (let i = 0; i < myArray.length; i++) {
      c = d[c][p[i % 8][myArray[i]]];
    }
    cc = c;
    if (cc === 0) {
      return true;
    } else {
      return false;
    }
  }
  StringToReversedIntArray(num: any): any {
    let myArray = [num.length];
    for (let i = 0; i < num.length; i++) {
      myArray[i] = num.substring(i, i + 1);
    }
    myArray = this.Reverse(myArray);
    return myArray;
  }
  Reverse(myArray: any): any {
    const reversed = [myArray.length];
    for (let i = 0; i < myArray.length; i++) {
      reversed[i] = myArray[myArray.length - (i + 1)];
    }
    return reversed;
  }

  detectBrowserName() {
    const agent = window.navigator.userAgent.toLowerCase();
    switch (true) {
      case agent.indexOf('edge') > -1:
        return 'edge';
      case agent.indexOf('opr') > -1 && !!(<any>window).opr:
        return 'opera';
      case agent.indexOf('chrome') > -1 && !!(<any>window).chrome:
        return 'chrome';
      case agent.indexOf('trident') > -1:
        return 'ie';
      case agent.indexOf('firefox') > -1:
        return 'firefox';
      case agent.indexOf('safari') > -1:
        return 'safari';
      default:
        return 'other';
    }
  }

  detectBrowserVersion() {
    var userAgent = navigator.userAgent,
      tem,
      matchTest =
        userAgent.match(
          /(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i
        ) || [];

    if (/trident/i.test(matchTest[1])) {
      tem = /\brv[ :]+(\d+)/g.exec(userAgent) || [];
      return 'IE ' + (tem[1] || '');
    }
    if (matchTest[1] === 'Chrome') {
      tem = userAgent.match(/\b(OPR|Edge)\/(\d+)/);
      if (tem != null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
    }
    matchTest = matchTest[2]
      ? [matchTest[1], matchTest[2]]
      : [navigator.appName, navigator.appVersion, '-?'];
    if ((tem = userAgent.match(/version\/(\d+)/i)) != null)
      matchTest.splice(1, 1, tem[1]);
    return matchTest.join(' ');
  }

  imageUrlToBase64(imageUrl: string): Promise<string> {
    return new Promise((resolve, reject) => {
      // Fetch the image as blob
      this.httpClient.get(imageUrl, { responseType: 'blob' }).subscribe(
        (blob: Blob) => {
          // Read the blob as Data URL
          const reader = new FileReader();
          reader.onloadend = () => {
            resolve(reader.result as string);
          };
          reader.onerror = () => {
            reject('Error converting image to base64');
          };
          reader.readAsDataURL(blob);
        },
        (error) => {
          reject('Error fetching image');
        }
      );
    });
  }
  generatePdf(htmlContent: HTMLElement, fileName: string) {
    html2canvas(htmlContent).then((canvas) => {
      // Convert the canvas to a data URL
      const imgData = canvas.toDataURL('image/png');

      // Calculate the dimensions (A4 size: 210 x 297 mm)
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      // Add the image to the PDF
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      // Save or preview the PDF
      pdf.save('document.pdf');
    });
  }
  convertImageToPDF(imageUrl: any): void {
    const doc = new jsPDF();
    const img = new Image();
    img.src = imageUrl;
    img.onload = () => {
      const width = doc.internal.pageSize.getWidth();
      const height = (img.height * width) / img.width;
      doc.addImage(img, 'PNG', 0, 0, width, height);
      doc.save('image.pdf');
      const pdfBytes = doc.save('image.pdf');
    };
  }
}
