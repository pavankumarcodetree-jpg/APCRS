import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertsService } from 'src/app/services/alert_lyr/alerts.service';
import { AuthserService } from 'src/app/services/api_lyr/private/authser.service';
import { EncDecService } from 'src/app/services/enc_dec_lyr/enc-dec.service';
import { basemodel } from 'src/app/thirparty/model/apimodel';
import { SharedvalidationModule } from 'src/app/thirparty/sharedvalidation/sharedvalidation.module';
import { InputvalidaionService } from 'src/app/thirparty/validation/inputvalidaion.service';

@Component({
  selector: 'app-tabs-brs',
  templateUrl: './tabs-brs.component.html',
  styleUrl: './tabs-brs.component.css'
})
export class TabsBRSComponent {


  constructor(
    private spinner: NgxSpinnerService,
    private alt: AlertsService,
    private auth: AuthserService,
    private encdc: EncDecService,
    private router: Router,
    private datepipe: DatePipe,
    private shared: SharedvalidationModule,
    private val: InputvalidaionService,
    private route: ActivatedRoute
  ) {

  }
  displausername = '';
  designationname = '';
  user_type = '';
  approve_status = '';
  user_role = '';
  u_id = '';
  metricName: string | undefined
  statetype: any;
  Districttyp: any;
  Mandaltype: any;
  ngOnInit(): void {
    if (sessionStorage.getItem('_Uenc') !== '') {
      let obj: any = this.encdc.Getuser();
      if (obj != '' && obj != undefined && obj != null) {

        // this.displausername = obj[0].UNAME;
        // this.u_id = obj[0].UID;
        // this.designationname = obj[0].UDPDESIGNATION;
        // this.user_type = obj[0].UTYPE;
        // this.user_role = obj[0].UROLE;

        this.route.queryParams.subscribe(params => {
          if (params['metric']) {
            this.metricName = params['metric'];
           // console.log(this.metricName);
          }
        }); 

        this.statetype = "";
        this.Districttyp = "";
        this.Mandaltype = "";
        if (this.metricName === 'Birth CRS') {
          this.statetype = "108";
          this.Districttyp = "109";
          this.Mandaltype = "110";
        }
        // if (this.metricName === 'RCH') {
        //   this.statetype = "118";
        //   this.Districttyp = "119";
        //   this.Mandaltype = "120";
        // }
        if (this.metricName === 'Death') {

          this.statetype = "111";
          this.Districttyp = "112";
          this.Mandaltype = "113";
        }
        if (this.metricName === 'Sex Ratio') {
          this.statetype = "114";
          this.Districttyp = "115";
          this.Mandaltype = "116";
        }
        this.get_statelevel();
       

      } else {
        this.encdc.Usersessionkill();
      }
    } else {
      this.router.navigate(['/Sessionexpired']);
    }
  }



  report_dispaly_level = "state";
  state_level_array: any[] = [];
  async get_statelevel(): Promise<void> {
    try {
     // debugger;
      const req = new basemodel();
      req.type = this.statetype;
      this.spinner.show();
      this.state_level_array = [];
      let responce: any = await this.auth.auth_utilities_rtgs(req);
      this.spinner.hide();
      if (responce.code) {
        this.state_level_array = responce.Details;
      // console.log(this.state_level_array);
       this.state_level_array = this.state_level_array.map((item,index)=>({
          ...item,
          SNO:index+1

        }))
        // console.log(this.state_level_array);

      } else {
        this.state_level_array = [];
        this.spinner.hide();
      }
    } catch (error) {
      this.spinner.hide();

    }
  }


  district_level_array: any[] = []; district_name: any; districtid: any;
  async get_districtlevel(obj: any): Promise<void> {
    try {
      this.district_name = obj.DISTRICT_NAME;
      //this.districtid = obj.DISTRICT_CODE;
      const req = new basemodel();
      req.type = this.Districttyp;
      req.param1 = this.district_name;
      this.spinner.show();
      this.district_level_array = [];
      let responce: any = await this.auth.auth_utilities_rtgs(req);
      this.spinner.hide();
      if (responce.code) {
        this.district_level_array = responce.Details;
        this.district_level_array=this.district_level_array.map((item,index)=>({
          ...item,
          SNO:index+1
        }))
        // console.log(this.district_level_array);
        this.report_dispaly_level = "district";

      } else {
        this.district_level_array = [];
        this.spinner.hide();
      }
    } catch (error) {
      this.spinner.hide();

    }
  }
  mandal_level_array: any[] = []; mandal_name: any; mandalid: any;
  Urban_Rural: any;
  async get_mandallevel(obj: any): Promise<void> {
    try {
      this.mandal_name = obj.MANDAL_NAME;
      // this.mandalid = obj.MANDAL_CODE;
      // this.Urban_Rural = obj.URBAN_RURAL;
      const req = new basemodel();
      req.type = this.Mandaltype;
      req.param1 = this.district_name;
      req.param2 = this.mandal_name;
      this.spinner.show();
      this.mandal_level_array = [];
      let responce: any = await this.auth.auth_utilities_rtgs(req);
      this.spinner.hide();
      if (responce.code) {
        this.mandal_level_array = responce.Details;
        this.mandal_level_array=this.mandal_level_array.map((item,index)=>({
          ...item,
          SNO:index+1
        }))
        // console.log(this.mandal_level_array);
        this.report_dispaly_level = 'Mandal';

      } else {
        this.mandal_level_array = [];
        this.spinner.hide();
      }
    } catch (error) {
      this.spinner.hide();

    }
  }
  backstate() {
    this.report_dispaly_level = "state";
  }
  backdistrict() {
    this.report_dispaly_level = "district";
  }
  getsum_of_coloumn(columnName: string): number {
    const regdistrictSum = this.state_level_array.reduce((sum, dd) => Number(sum) + dd[columnName], 0);
    return Number(regdistrictSum.toFixed(2));
  }
  exportTable_ToPDF(table_id: any, filename: any): void {
    this.shared.exportTableToPDF(table_id, filename);
  }
  exportTable_toexcel(table_id: any, filename: any): void {
    this.shared.exportTableToExcel(table_id, filename);
  }




}