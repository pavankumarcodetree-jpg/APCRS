import {
  Component,
  EventEmitter,
  Inject,
  Output,
  Renderer2,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { Router, NavigationEnd } from '@angular/router';
import { EncDecService } from 'src/app/services/enc_dec_lyr/enc-dec.service';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { MiddlewareService } from 'src/app/services/middleware_lyr/middleware.service';
import { AlertsService } from 'src/app/services/alert_lyr/alerts.service';
import { PrivateService } from 'src/app/services/api_lyr/private/private.service';
import { basemodel } from 'src/app/thirparty/model/apimodel';
import { InputvalidaionService } from 'src/app/thirparty/validation/inputvalidaion.service';

@Component({
  selector: 'app-badrequest',
  templateUrl: './badrequest.component.html',
  styleUrls: ['./badrequest.component.css'],
})
export class BadrequestComponent {
  constructor(
    private cookieService: CookieService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private pscall: PrivateService
  ) {}
  ngOnInit(): void {
    // sessionStorage.clear();
    // this.cookieService.deleteAll();
    this.logout_user();
  }
  async logout_user(): Promise<void> {
    sessionStorage.clear();
    this.cookieService.deleteAll();
    this.spinner.hide();
  }
}
