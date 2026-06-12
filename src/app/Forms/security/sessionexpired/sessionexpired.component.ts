import { Component, Inject, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { Router, NavigationEnd } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { PrivateService } from 'src/app/services/api_lyr/private/private.service';
import { AuthserService } from 'src/app/services/api_lyr/private/authser.service';
import { basemodel } from 'src/app/thirparty/model/apimodel';
@Component({
  selector: 'app-sessionexpired',
  templateUrl: './sessionexpired.component.html',
  styleUrls: ['./sessionexpired.component.css'],
})
export class SessionexpiredComponent {
  constructor(
   private cookieService: CookieService,
      private router: Router,
      private spinner: NgxSpinnerService,
      private auth: AuthserService
  ) {}
  ngOnInit(): void {
    sessionStorage.clear();
    this.cookieService.deleteAll();
  }
  goToHome() {
  this.router.navigate(['/home/index']);
}
}
