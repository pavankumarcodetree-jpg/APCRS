import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import * as CryptoJS from 'crypto-js';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class EncDecService {
  hskkey: any = '0123456789123456';
  encrypted: any = '';
  decrypted: any = '';
  hash: any = '';
  request: any = '';
  responce: any = '';
  constructor(private cookieService: CookieService, private router: Router) {}

  enccall(req: any): string {
    if (sessionStorage.getItem('appid') != '') {
      this.hskkey = sessionStorage.getItem('appid');
      
      const keyVal = CryptoJS.enc.Utf8.parse(this.hskkey);
      const ivVal = CryptoJS.enc.Utf8.parse(this.hskkey);
      const encrypted = CryptoJS.AES.encrypt(
        CryptoJS.enc.Utf8.parse(req),
        keyVal,
        {
          keySize: 128 / 8,
          iv: ivVal,
          mode: CryptoJS.mode.CBC,
          padding: CryptoJS.pad.Pkcs7,
        }
      ).toString();
      if (this.encrypted.length > 20) {
        return encrypted.toString();
      } else {
        this.encrypted == 'invalid';
      }
      return encrypted;
    }
    if (
      sessionStorage.getItem('appid') == '' ||
      sessionStorage.getItem('appid') == null ||
      sessionStorage.getItem('appid') == undefined
    ) {
      this.Usersessionkill();
    }
    return '';
  }
  decrypt(req: any) {
    if (sessionStorage.getItem('appid') != '') {
      this.hskkey = sessionStorage.getItem('appid');
      let _key = CryptoJS.enc.Utf8.parse(this.hskkey);
      let _iv = CryptoJS.enc.Utf8.parse(this.hskkey);
      let decrypted = CryptoJS.AES.decrypt(req, _key, {
        keySize: 16,
        iv: _iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      }).toString(CryptoJS.enc.Utf8);

      if (decrypted.length > 20) {
        return decrypted;
      } else {
        decrypted == 'invalid';
        return decrypted;
      }
    }
    if (
      sessionStorage.getItem('appid') == '' ||
      sessionStorage.getItem('appid') == null ||
      sessionStorage.getItem('appid') == undefined
    ) {
      this.Usersessionkill();
    }
    return '';
  }
  deccall(req: any) {
    if (sessionStorage.getItem('appid') != '') {
      this.hskkey = sessionStorage.getItem('appid');
      let _key = CryptoJS.enc.Utf8.parse(this.hskkey);
      let _iv = CryptoJS.enc.Utf8.parse(this.hskkey);
      let decrypted = CryptoJS.AES.decrypt(req, _key, {
        keySize: 16,
        iv: _iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      }).toString(CryptoJS.enc.Utf8);

      if (decrypted.length > 20) {
        return JSON.parse(decrypted);
      } else {
        decrypted == 'invalid';
        return decrypted;
      }
    }
    if (
      sessionStorage.getItem('appid') == '' ||
      sessionStorage.getItem('appid') == null ||
      sessionStorage.getItem('appid') == undefined
    ) {
      this.Usersessionkill();
    }
    return '';
  }
  Getuser() {
    let obj: any = '';
    if (sessionStorage.getItem('_Uenc') != '') {
      if (sessionStorage.getItem('_Uenc') == this.cookieService.get('_Uenc')) {
        obj = this.deccall(sessionStorage.getItem('Logdata'));

        if (obj[0].UROLE != null || obj[0].UROLE != undefined) {
          return obj;
        } else {
          Swal.fire({
            title: 'Sessionexpired....',
            text: 'Sessionexpired!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
          }).then((result) => {
            if (result.value) {
              sessionStorage.clear();
              this.cookieService.deleteAll();
              this.router.navigate(['/Sessionexpired']);
            } else if (result.dismiss === Swal.DismissReason.cancel) {
              sessionStorage.clear();
              this.cookieService.deleteAll();
              this.router.navigate(['/Sessionexpired']);
            }
          });
        }
      } else {
        Swal.fire({
          title: 'Sessionexpired....',
          text: 'Sessionexpired!',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes',
          cancelButtonText: 'No',
        }).then((result) => {
          if (result.value) {
            sessionStorage.clear();
            this.cookieService.deleteAll();
            this.router.navigate(['/Sessionexpired']);
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            sessionStorage.clear();
            this.cookieService.deleteAll();
            this.router.navigate(['/Sessionexpired']);
          }
        });
      }
    } else {
      Swal.fire({
        title: 'Sessionexpired....',
        text: 'Sessionexpired!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
      }).then((result) => {
        if (result.value) {
          sessionStorage.clear();
          this.cookieService.deleteAll();
          this.router.navigate(['/Sessionexpired']);
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          sessionStorage.clear();
          this.cookieService.deleteAll();
          this.router.navigate(['/Sessionexpired']);
        }
      });
    }
  }
  Usersessionkill() {
    Swal.fire({
      title: 'Sessionexpired....',
      text: 'Sessionexpired!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.value) {
        sessionStorage.clear();
        this.cookieService.deleteAll();
        this.router.navigate(['/Sessionexpired']);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        sessionStorage.clear();
        this.cookieService.deleteAll();
        this.router.navigate(['/Sessionexpired']);
      }
    });
  }
}
