import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertsService } from 'src/app/services/alert_lyr/alerts.service';
import { AuthserService } from 'src/app/services/api_lyr/private/authser.service';
import { EncDecService } from 'src/app/services/enc_dec_lyr/enc-dec.service';
import { basemodel } from 'src/app/thirparty/model/apimodel';

@Component({
  selector: 'app-birthregister',
  templateUrl: './birthregister.component.html',
  styleUrl: './birthregister.component.css'
})
export class BirthregisterComponent  {
  bsConfig: Partial<BsDatepickerConfig>;
  mindate!: Date;
  maxdate!: Date;
  From_Date!: Date;
  To_Date!: Date;
  birth_search = {
  fromyear: '',
  toyear: '',
  applicationnumber: '',
  Gender: '',
  mothername:'',
  fathername:'',
  childname:'',
  searchby:'year'
  }
  constructor(private encdc: EncDecService,private router: Router,private auth: AuthserService,private spinner: NgxSpinnerService,
    private alt: AlertsService
  ) {
   
    this.bsConfig = {
      dateInputFormat: 'DD-MM-YYYY',
      isDisabled: false,
      startView: 'day',
      showWeekNumbers: true,
      containerClass: 'theme-blue',
      showClearButton: true,
    };
  }
  ngOnInit(): void {
    if (sessionStorage.getItem('_Uenc') !== '') {
        //this.collapsed = true;
        let obj: any = this.encdc.Getuser();
        if (obj != '' && obj != undefined && obj != null) {
          this.get_birthregister_table();
         
        } else {
            this.encdc.Usersessionkill();
        }
    } else {
        this.router.navigate(['/Sessionexpired']);
    }
}
years:any[]=[];
  public getUploadPeriod(){
    let baseYear = 2015;
    let currYear = new Date().getFullYear();
    this.years = [];

    for (var i = baseYear; i <= currYear; i++) {
    this.years.push({"year":i});
    }
    console.log('years',this.years)
    return this.years
  
  }

  birth_depth_table_array: any[]=[];table_card_select="BIRTH";
  async get_birthregister_table(): Promise<void> {
    try {
      const req = new basemodel();
      req.type = '1021';
      let responce: any = await this.auth.auth_pkgcrsbirth_service(req);
      this.birth_depth_table_array = [];
      this.spinner.show();
      
      if (responce.code) {
        this.spinner.hide();
        this.birth_depth_table_array = responce.Details;
        return;
      } else {
        this.spinner.hide();
        this.birth_depth_table_array = [];
        return;
      }
    } catch (error) {
     
      this.birth_depth_table_array = [];
      this.spinner.hide();
      return;
    }
  }

  async downloadorder() {
    try {

      const req = new basemodel();
      req.type = '1022';
      req.param1='BR2024122222100000049'
      req.param4 = 'birth';
      let responce: any = await this.auth.pdf_download(req);
      
      this.spinner.show();
      if (responce.code) {
        this.spinner.hide();
        const binaryString = window.atob(responce.url);
        const len = binaryString.length;
        const byteArray = new Uint8Array(len);

        for (let i = 0; i < len; i++) {
          byteArray[i] = binaryString.charCodeAt(i);
        }
        const blob = new Blob([byteArray], { type: 'application/pdf' });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = "birth"+ '.pdf';
        link.click();
        window.URL.revokeObjectURL(link.href);
      } else {
        this.spinner.hide();
        this.alt.toasterror('No Orders found.');
        return;
      }
    } catch (error) {
      this.spinner.hide();
      this.alt.toasterror('something went wrong');
      return;
    }
  }
  Resetsearch(){
    this.  birth_search = {
      fromyear: '',
      toyear: '',
      applicationnumber: '',
      Gender: '',
      mothername:'',
      fathername:'',
      childname:'',
      searchby:'year'
      };
      this.radiobutton=false;
      this.get_birthregister_table();
  }

  radiobutton=false;
  getbuttonenabled(){
    this.radiobutton=true;
  }
  pdfSrc = 'http://www.pdf995.com/samples/pdf.pdf';
}
