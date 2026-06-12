import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { EncDecService } from 'src/app/services/enc_dec_lyr/enc-dec.service';
import { PlatformLocation } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertsService } from 'src/app/services/alert_lyr/alerts.service';
import { PrivateService } from 'src/app/services/api_lyr/private/private.service';
import { basemodel } from 'src/app/thirparty/model/apimodel';
@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
})
export class WelcomeComponent {
  constructor(
    private router: Router,
    private encdc: EncDecService,
    private location: PlatformLocation,
    private spinner: NgxSpinnerService
  ) {
    window.history.pushState(null, document.title, window.location.href);
    window.onpopstate = function () {
      window.history.pushState(null, document.title, window.location.href);
    };
  }
  displausername = '';
  designationname = '';
  user_type = '';
  approve_status = '';
  user_role = '';
  @HostListener('window:popstate', ['$event'])
  onPopState(event: any) {
    this.location.forward();
  }
  ngOnInit(): void {
    if (sessionStorage.getItem('_Uenc') !== '') {
      //this.collapsed = true;
      let obj: any = this.encdc.Getuser();
      if (obj != '' && obj != undefined && obj != null) {
        this.displausername = obj[0].UDPNAME;
        this.designationname = obj[0].UDPDESIGNATION;
        this.user_type = obj[0].UTYPE;
        this.user_role = obj[0].UROLE;
      } else {
        this.encdc.Usersessionkill();
      }
    } else {
      this.router.navigate(['/Sessionexpired']);
    }
  }
}
