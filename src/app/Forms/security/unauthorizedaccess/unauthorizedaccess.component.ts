import {
  Component,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { Router, NavigationEnd } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { PrivateService } from 'src/app/services/api_lyr/private/private.service';
import { basemodel } from 'src/app/thirparty/model/apimodel';
import { AuthserService } from 'src/app/services/api_lyr/private/authser.service';
 

@Component({
  selector: 'app-unauthorizedaccess',
  templateUrl: './unauthorizedaccess.component.html',
  styleUrls: ['./unauthorizedaccess.component.css'],
})
export class UnauthorizedaccessComponent {
  constructor(
    private cookieService: CookieService,
       private router: Router,
       private spinner: NgxSpinnerService,
       private auth: AuthserService
  ) {}
  ngOnInit(): void {
    this.userclose();
    
  }
  async userclose(): Promise<void>{
    try {
      const req = new basemodel();
      req.type = '1000';
      this.spinner.show();
      let responce: any = await this.auth.auth_Autocompletelog(req);
      this.spinner.hide();
      
      if (responce.code) {
      sessionStorage.clear();
      this.cookieService.deleteAll();
      this.router.navigate(['/Logout']);
      this.spinner.hide();
      } else {
        sessionStorage.clear();
      this.cookieService.deleteAll();
      this.router.navigate(['/Logout']);
      this.spinner.hide();
      }
    } catch (error) {
      sessionStorage.clear();
        this.cookieService.deleteAll();
        this.router.navigate(['/Logout']);
        this.spinner.hide();
    }
   }
}
