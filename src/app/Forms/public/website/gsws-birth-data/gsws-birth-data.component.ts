import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Highcharts from 'highcharts';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertsService } from 'src/app/services/alert_lyr/alerts.service';
import { AuthserService } from 'src/app/services/api_lyr/private/authser.service';
import { PrivateService } from 'src/app/services/api_lyr/private/private.service';
import { UnauthserService } from 'src/app/services/api_lyr/public/unauthser.service';
import { EncDecService } from 'src/app/services/enc_dec_lyr/enc-dec.service';
import { GeolocationService } from 'src/app/services/geolocation.service';
import { MiddlewareService } from 'src/app/services/middleware_lyr/middleware.service';
import { basemodel } from 'src/app/thirparty/model/apimodel';
import { InputvalidaionService } from 'src/app/thirparty/validation/inputvalidaion.service';
import * as CryptoJS from 'crypto-js';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-gsws-birth-data',
  templateUrl: './gsws-birth-data.component.html',
  styleUrl: './gsws-birth-data.component.css'
})
export class GswsBirthDataComponent {


  constructor(private spinner: NgxSpinnerService,
    private alt: AlertsService,
    private pscall: PrivateService,
    private val: InputvalidaionService,
    private auth: AuthserService,
    private mid: MiddlewareService,
    private datepipe: DatePipe,
    private router: Router,
    private encdc: EncDecService,
    private unauth: UnauthserService,
    private geolocationService: GeolocationService,
      private httpClient: HttpClient,) { }


  goToGSWS() {
    this.router.navigate(['/gsws-birth']);
  }
 
  Deviceid: any;
  hash: any;
  capthform: any;
  latitude: any;
  longitude: any;
  timeOptions: Array<{ value: string; label: string }> = [];
  ngOnInit(): void {
 
    try {
      this.Deviceid = '';
      if (this.Deviceid == '') {
        this.httpClient
          .get('https://api.ipify.org/?format=json')
          .subscribe((res: any) => {
            this.Deviceid = res.ip;
            sessionStorage.setItem('Deviceid', res.ip);
            this.Get_captcha();
            this.getCurrentLocation();
          });
      } else {
      }
    } catch (error) {
      this.alt.warning('check your internet connection and try again');
    }
  }

  async Get_captcha(): Promise<void> {
    try {
      let date = new Date();
      const datePipe = new DatePipe('en-US');
      let clintkey: any = datePipe.transform(date, 'ddMMyyyyHHmmssss');
      this.hash = CryptoJS.SHA256(this.Deviceid + '^' + clintkey).toString();
      let resultuser = this.encdc.enccall(
        JSON.stringify(this.Deviceid + '^' + clintkey + '^' + 'Sa789456')
      );
      sessionStorage.setItem('Deviceid', this.Deviceid);
      sessionStorage.setItem('appid', clintkey);
      sessionStorage.setItem('_Uenc', resultuser ?? '');
      sessionStorage.setItem('_sltkn', this.hash ?? '');
      sessionStorage.setItem('_cltkn', this.hash ?? '');
      // this.getstatedata();
      this.get_Data();
      this.get_Data1();

    } catch (error) {
      this.spinner.hide();

    }
  }


  

  async getCurrentLocation() {
    this.geolocationService.getCurrentPosition().subscribe(
      (coords: GeolocationCoordinates) => {
        this.latitude = coords.latitude;
        this.longitude = coords.longitude;
        sessionStorage.setItem('latitude', this.latitude.toString());
        sessionStorage.setItem('longitude', this.longitude.toString());
      },
      (error: any) => {
        //console.error('Error getting location', error);
      }
    );
  }

  
  DashBoardList: any[] = [];
  async get_Data(): Promise<void> {
    try {
      const req = new basemodel();
      req.type = "100"
      this.spinner.show();
      this.DashBoardList = [];
      let responce: any = await this.unauth.pree_utilities_service_rtgs(req);
  
      this.spinner.hide();
      if (responce.code) {
        this.DashBoardList = responce.Details;
        //console.log(this.DashBoardList);
      } else {
        this.DashBoardList = [];
        this.spinner.hide();
      }
    } catch (error) {
      this.spinner.hide();

    }
  }

  DashBoardList1: any[] = [];
  async get_Data1(): Promise<void> {
    try {
      const req = new basemodel();
      req.type = "101"
      this.spinner.show();
      this.DashBoardList1 = [];
      let responce: any = await this.unauth.pree_utilities_service_rtgs(req);
      this.spinner.hide();
      if (responce.code) {
        this.DashBoardList1 = responce.Details;
        //console.log(this.DashBoardList1);
        this.generateBirthVsGswsChart(this.DashBoardList1);

      } else {
        this.DashBoardList1 = [];
        this.spinner.hide();
      }
    } catch (error) {
      this.spinner.hide();

    }
  }

  generateBirthVsGswsChart(data: any): void {
    const years: string[] = [];
    const actualDeaths: number[] = [];
    const gswsReported: number[] = [];

    data.forEach((item: any) => {
      years.push(item.YEAR_DT);
      actualDeaths.push(item.BIRTH_DATA_COUNT ?? 0);
      gswsReported.push(item.GSWS_BIRTH_COUNT ?? 0);
    });

    Highcharts.chart('birth-vs-gsws-chart', {
      chart: {
        type: 'column',
        backgroundColor: 'transparent'
      },
      title: {
        text: 'Year Wise Birth vs GSWS'
      },
      xAxis: {
        categories: years,
        title: { text: 'Year' }
      },
      yAxis: {
        min: 0,
        title: { text: 'Number of Births' },
        labels: {
          formatter: function (this: Highcharts.AxisLabelsFormatterContextObject) {
            return Number(this.value).toLocaleString('en-IN');
          }
        }
      },
      tooltip: {
        shared: true,
        useHTML: true,
        formatter: function (this: any) {
          if (!this.points) return '';

          // 'this.x' is index, so get year from categories
          const year = this.points[0]?.series?.xAxis?.categories?.[this.x] ?? this.x;

          const header = `<div style="font-size: 13px; margin-bottom: 5px;"><b>${year}</b></div>`;

          const rows = this.points.map((point: any) => {
            const color = point.series.color;
            const name = point.series.name;
            const value = point.y ?? 0;
            return `
        <div style="margin-bottom: 3px;">
          <span style="color: ${color}; font-size: 14px;">●</span>
          <span style="font-size: 13px;"> ${name}:</span>
          <b style="font-size: 13px;"> ${value.toLocaleString('en-IN')} Births</b>
        </div>
      `;
          }).join('');

          return header + rows;
        }
      },
      plotOptions: {
        column: {
          borderRadius: 4,
          pointPadding: 0.2,
          borderWidth: 0
        }
      },
      series: [
        {
          name: 'Actual Births',
          type: 'column',
          data: actualDeaths,
          color: '#ff7f7f'
        },
        {
          name: 'GSWS Reported',
          type: 'column',
          data: gswsReported,
          color: '#7fb3ff'
        }
      ],
      credits: { enabled: false }
    } as Highcharts.Options);
  }
}