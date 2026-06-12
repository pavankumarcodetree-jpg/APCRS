import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertsService } from 'src/app/services/alert_lyr/alerts.service';
import { EncDecService } from 'src/app/services/enc_dec_lyr/enc-dec.service';
import { basemodel } from 'src/app/thirparty/model/apimodel'; 
import { AuthserService } from 'src/app/services/api_lyr/private/authser.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrl: './history.component.css'
})
export class HistoryComponent  {
  @Input() applicationid: any;
  @Input() selecttab: any;
  constructor(private spinner: NgxSpinnerService,
    private auth: AuthserService, private alt: AlertsService, private encdc: EncDecService, private router: Router, private http: HttpClient
  ) {  }
  ngOnInit() {
    
    if (sessionStorage.getItem('_Uenc') !== '') {
      let obj: any = this.encdc.Getuser();
      if (obj != '' && obj != undefined && obj != null) {
      } else {
        this.encdc.Usersessionkill();
      }
    }
    else {
      this.encdc.Usersessionkill();
      this.router.navigate(['/Sessionexpired']);
    }
  }
 
   
  
}
