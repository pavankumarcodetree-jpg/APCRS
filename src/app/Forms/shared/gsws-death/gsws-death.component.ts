import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Highcharts from 'highcharts';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertsService } from 'src/app/services/alert_lyr/alerts.service';
import { AuthserService } from 'src/app/services/api_lyr/private/authser.service';
import { PrivateService } from 'src/app/services/api_lyr/private/private.service';
import { EncDecService } from 'src/app/services/enc_dec_lyr/enc-dec.service';
import { MiddlewareService } from 'src/app/services/middleware_lyr/middleware.service';
import { basemodel } from 'src/app/thirparty/model/apimodel';
import { InputvalidaionService } from 'src/app/thirparty/validation/inputvalidaion.service';

@Component({
  selector: 'app-gsws-death',
  templateUrl: './gsws-death.component.html',
  styleUrl: './gsws-death.component.css'
})
export class GswsDeathComponent {


    constructor(private spinner: NgxSpinnerService,
      private alt: AlertsService,
      private pscall: PrivateService,
      private val: InputvalidaionService,
      private auth: AuthserService,
      private mid: MiddlewareService,
      private datepipe: DatePipe,
      private router: Router,
      private encdc: EncDecService) {
  
  
    }



   ngOnInit(): void {
    try {
      if (sessionStorage.getItem('_Uenc') !== '') {
        let obj: any = this.encdc.Getuser();
        if (obj != '' && obj != undefined && obj != null) {
           this.get_Data();
          this.get_Data1();

        } else {
          this.encdc.Usersessionkill();
        }
      } else {
        this.router.navigate(['/Sessionexpired']);
      }
    } catch (error) {
      this.alt.warning('check your internet connection and try again');
    }
  }


   goToGSWS() {
    this.router.navigate(['/gsws']);
  }

     // ✅ Highcharts reference
  // Highcharts: typeof Highcharts = Highcharts;

  // ✅ Chart Options
  // barChartOptions: Highcharts.Options = {
  //   chart: {
  //     type: 'column',
  //     backgroundColor: 'transparent'
  //   },
  //   title: {
  //     text: 'Year Wise Death vs GSWS'
  //   },
  //   xAxis: {
  //     categories: ['2019', '2020', '2021', '2022', '2023'],
  //     title: { text: 'Year' }
  //   },
  //   yAxis: {
  //     min: 0,
  //     title: { text: 'Number of Deaths' }
  //   },
  //   tooltip: {
  //     shared: true,
  //     valueSuffix: ' deaths'
  //   },
  //   plotOptions: {
  //     column: {
  //       borderRadius: 4,
  //       pointPadding: 0.2,
  //       borderWidth: 0
  //     }
  //   },
  //   series: [
  //     {
  //       name: 'Actual Deaths',
  //       type: 'column',
  //       data: [500, 600, 550, 700, 800],
  //       color: '#ff7f7f' // soft red
  //     },
  //     {
  //       name: 'GSWS Reported',
  //       type: 'column',
  //       data: [480, 590, 530, 680, 770],
  //       color: '#7fb3ff' // soft blue
  //     }
  //   ],
  //   credits: { enabled: false }
  // };


    DashBoardList: any[] = [];
    async get_Data(): Promise<void> {
      try {
        // debugger;
        const req = new basemodel();
        req.type = "200"
        this.spinner.show();
        this.DashBoardList = [];
        let responce: any = await this.auth.auth_utilities_gsws(req);
        this.spinner.hide();
        if (responce.code) {
          this.DashBoardList = responce.Details;
        // console.log(this.DashBoardList);
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
        // debugger;
        const req = new basemodel();
        req.type = "201"
        this.spinner.show();
        this.DashBoardList1 = [];
        let responce: any = await this.auth.auth_utilities_gsws(req);
       
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
        actualDeaths.push(item.DEATH_DATA_COUNT ?? 0);
        gswsReported.push(item.GSWS_DEATH_COUNT ?? 0);
      });
  
      Highcharts.chart('death-vs-gsws-chart', {
        chart: {
          type: 'column',
          backgroundColor: 'transparent'
        },
        title: {
           text: 'Year Wise Death vs GSWS'
        },
        xAxis: {
          categories: years,
          title: { text: 'Year' }
        },
        yAxis: {
          min: 0,
          title: { text: 'Number of Deaths' },
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
            <b style="font-size: 13px;"> ${value.toLocaleString('en-IN')} Deaths</b>
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
            name: 'Actual Deaths',
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
