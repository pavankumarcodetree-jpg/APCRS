import { DatePipe } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ItemsList } from '@ng-select/ng-select/lib/items-list';

import * as Highcharts from 'highcharts';

import { ChartComponent } from "ng-apexcharts";

import {
    ApexNonAxisChartSeries,
    ApexResponsive,
    ApexChart,
    ApexLegend
} from "ng-apexcharts";
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertsService } from 'src/app/services/alert_lyr/alerts.service';
import { AuthserService } from 'src/app/services/api_lyr/private/authser.service';
import { PrivateService } from 'src/app/services/api_lyr/private/private.service';
import { EncDecService } from 'src/app/services/enc_dec_lyr/enc-dec.service';
import { MiddlewareService } from 'src/app/services/middleware_lyr/middleware.service';
import { basemodel } from 'src/app/thirparty/model/apimodel';
import { InputvalidaionService } from 'src/app/thirparty/validation/inputvalidaion.service';

export type ChartOptions = {
    series: ApexNonAxisChartSeries;
    chart: ApexChart;
    responsive: ApexResponsive[];
    labels: any;
    legend: ApexLegend;
};
@Component({
  selector: 'app-dashboardthree',
  templateUrl: './dashboardthree.component.html',
  styleUrl: './dashboardthree.component.css'
})
export class DashboardthreeComponent {
    Highcharts: typeof Highcharts = Highcharts;
    birth_male_state: number = 0;
    birth_female_state: number = 0;
    chartOptions2: Highcharts.Options = {

        chart: {
            type: 'bar'
        },
        title: {
            text: 'Ferry passengers by vehicle type 2024',
            align: 'left',
            style: {
                color: '#fff',
            }
        },
        xAxis: {
            categories: [
                'January', 'February', 'March', 'April', 'May'
            ]
        },
        yAxis: {
            min: 0,
            title: {
                text: '',
                style: {
                    color: '#fff',
                }
            }
        },
        legend: {
            reversed: true
        },
        plotOptions: {
            series: {
                stacking: 'normal',
                dataLabels: {
                    enabled: true,
                }
            }
        },
        series: [{
            type: 'bar',
            name: 'Birth',
            data: [74, 27, 52, 93, 1272]
        }, {
            type: 'bar',
            name: 'Death',
            data: [2106, 2398, 3046, 3195, 4916]
        }]

    };
    chartOptions4: Highcharts.Options = {
        chart: {
            type: 'spline',
        },
        xAxis: {
            labels: {
                enabled: false
            },

            minorGridLineWidth: 0,
            gridLineWidth: 0,
            alternateGridColor: undefined,
        },
        title: {
            text: '',
        },
        yAxis: {
            title: {
                text: '',
            },
            labels: {
                enabled: false
            },
            minorGridLineWidth: 0,
            gridLineWidth: 0,
            alternateGridColor: undefined,
        },
        tooltip: {
            valueSuffix: ' L'
        },
        plotOptions: {
            spline: {
                lineWidth: 3,
                states: {
                    hover: {
                        lineWidth: 4
                    }
                },
                marker: {
                    enabled: false
                },
                pointInterval: 3600000, // one hour
                pointStart: '2024-01-29'
            }
        },
        colors: ['#92da43'],
        series: [{
            type: 'spline',
            name: 'Births',
            data: [
                12.9, 13.8, 10.2, 8.4, 10.0, 9.2, 10.0,
                12.2, 13.2, 12.7, 12.5, 11.4, 10.4
            ]

        }],
        legend: {
            enabled: false
        },
        navigation: {
            menuItemStyle: {
                fontSize: '10px'
            }
        }
    };
    //death
    chartOptions5: Highcharts.Options = {

        chart: {
            type: 'spline',
        },
        xAxis: {
            labels: {
                enabled: false
            },

            minorGridLineWidth: 0,
            gridLineWidth: 0,
            alternateGridColor: undefined,
        },
        title: {
            text: '',
        },
        yAxis: {
            title: {
                text: '',
            },
            labels: {
                enabled: false
            },
            minorGridLineWidth: 0,
            gridLineWidth: 0,
            alternateGridColor: undefined,
        },
        tooltip: {
            valueSuffix: ' L'
        },
        plotOptions: {
            spline: {
                lineWidth: 3,
                states: {
                    hover: {
                        lineWidth: 4
                    }
                },
                marker: {
                    enabled: false
                },
                pointInterval: 3600000, // one hour
                pointStart: '2024-01-29'
            }
        },
        colors: ['#dc3545'],
        series: [{
            type: 'spline',
            name: 'Births',
            data: [
                12.9, 13.8, 10.2, 8.4, 10.0, 9.2, 10.0,
                12.2, 13.2, 12.7, 12.5, 11.4, 10.4
            ]

        }],
        legend: {
            enabled: false
        },
        navigation: {
            menuItemStyle: {
                fontSize: '10px'
            }
        }

    }

    //ratio
    chartOptions6: Highcharts.Options = {

        chart: {
            type: 'spline',
        },
        xAxis: {
            labels: {
                enabled: false
            },

            minorGridLineWidth: 0,
            gridLineWidth: 0,
            alternateGridColor: undefined,
        },
        title: {
            text: '',
        },
        yAxis: {
            title: {
                text: '',
            },
            labels: {
                enabled: false
            },
            minorGridLineWidth: 0,
            gridLineWidth: 0,
            alternateGridColor: undefined,
        },
        tooltip: {
            valueSuffix: ' L'
        },
        plotOptions: {
            spline: {
                lineWidth: 3,
                states: {
                    hover: {
                        lineWidth: 4
                    }
                },
                marker: {
                    enabled: false
                },
                pointInterval: 3600000, // one hour
                pointStart: '2024-01-29'
            }
        },
        colors: ['#ff8f00'],
        series: [{
            type: 'spline',
            name: 'Births',
            data: [
                12.9, 13.8, 10.2, 8.4, 10.0, 9.2, 10.0,
                12.2, 13.2, 12.7, 12.5, 11.4, 10.4
            ]

        }],
        legend: {
            enabled: false
        },
        navigation: {
            menuItemStyle: {
                fontSize: '10px'
            }
        }

    }

    //population
    chartOptions7: Highcharts.Options = {

        chart: {
            type: 'spline',
        },
        xAxis: {
            labels: {
                enabled: false
            },

            minorGridLineWidth: 0,
            gridLineWidth: 0,
            alternateGridColor: undefined,
        },
        title: {
            text: '',
        },
        yAxis: {
            title: {
                text: '',
            },
            labels: {
                enabled: false
            },
            minorGridLineWidth: 0,
            gridLineWidth: 0,
            alternateGridColor: undefined,
        },
        tooltip: {
            valueSuffix: ' L'
        },
        plotOptions: {
            spline: {
                lineWidth: 3,
                states: {
                    hover: {
                        lineWidth: 4
                    }
                },
                marker: {
                    enabled: false
                },
                pointInterval: 3600000, // one hour
                pointStart: '2024-01-29'
            }
        },
        colors: ['#46c2f2'],
        series: [{
            type: 'spline',
            name: 'Births',
            data: [
                12.9, 13.8, 10.2, 8.4, 10.0, 9.2, 10.0,
                12.2, 13.2, 12.7, 12.5, 11.4, 10.4
            ]

        }],
        legend: {
            enabled: false
        },
        navigation: {
            menuItemStyle: {
                fontSize: '10px'
            }
        }

    }

    // causeOfDeathChart: Highcharts.Options = {
    //     chart: {
    //         type: 'pie'
    //     },
    //     title: {
    //         text: 'Cause of Death Distribution',
    //         style: { color: '#ffffff' }
    //     },
    //     tooltip: {
    //         pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    //     },
    //     accessibility: {
    //         point: {
    //             valueSuffix: '%'
    //         }
    //     },
    //     // plotOptions: {
    //     //   pie: {
    //     //     allowPointSelect: true,
    //     //     cursor: 'pointer',
    //     //     dataLabels: {
    //     //       enabled: true,
    //     //       format: '<b>{point.name}</b>: {point.percentage:.1f} %'
    //     //     }
    //     //   }
    //     // },
    //     plotOptions: {
    //         pie: {
    //             allowPointSelect: true,
    //             cursor: 'pointer',
    //             dataLabels: {
    //                 enabled: false
    //             },
    //             showInLegend: true
    //         }
    //     },
    //     legend: {
    //         itemStyle: {
    //             color: '#ffffff'
    //         },
    //         alignColumns: false
    //     },
    //     series: [
    //         {
    //             type: 'pie',
    //             name: 'Cause of Death',
    //             data: [
    //                 { name: 'Cardiovascular Diseases', y: 40 },
    //                 { name: 'Respiratory Diseases', y: 20 },
    //                 { name: 'Cancer', y: 16 },
    //                 { name: 'Accidents/Trauma', y: 12 },
    //                 { name: 'Infections (e.g., COVID-19)', y: 6 },
    //                 { name: 'Others', y: 6 }
    //             ]
    //         }
    //     ]
    // };


    @ViewChild("chart") chart: ChartComponent | undefined;
    public dailybirth: Partial<ChartOptions>;

    constructor(private spinner: NgxSpinnerService,
        private alt: AlertsService,
        private pscall: PrivateService,
        private val: InputvalidaionService,
        private auth: AuthserService,
        private mid: MiddlewareService,
        private datepipe: DatePipe,
        private router: Router,
        private encdc: EncDecService) {


        this.dailybirth = {
            series: [44, 55],
            chart: {
                type: "donut",
                width: 180,
            },
            labels: ["Birth", "Death"],
            legend: {
                show: false
            },
            responsive: [
                {
                    breakpoint: 480,
                    options: {
                        chart: {
                            width: 100
                        },
                        legend: {
                            position: "bottom",

                            show: false
                        }
                    }
                }
            ]
        };
    }
    RU_CODE: any;
    ngOnInit(): void {
     
        this.openchart();
        // try {
        //     if (sessionStorage.getItem('_Uenc') !== '') {
        //         let obj: any = this.encdc.Getuser();

        //         if (obj != '' && obj != undefined && obj != null) {
        //             this.RU_CODE = obj[0].RU_CODE;
        //             this.get_total_birth_death();
        //             this.get_summary_birth_death();
        //             this.get_summary_gender();
        //             this.get_summary_treads();
        //             this.get_birth_death_treads();
        //             this.get_age_group_treads();
        //             this.get_age_group_percentage();
        //             this.get_death_distribution();
        //         } else {
        //             this.encdc.Usersessionkill();
        //         }
        //     } else {
        //         this.router.navigate(['/Sessionexpired']);
        //     }
        // } catch (error) {
        //     this.alt.warning('check your internet connection and try again');
        // }
    }

    async openchart(){
        Highcharts.chart('birth-death-treads-comparison-chart', {
            chart: {
                zooming: {
                    type: 'xy'
                }
            },
            title: {
                text: 'Birth Ratio Comparison Trends',
                align: 'left',
                style: {
                    color: '#ffffff'
                }
            },
            credits: {
                text: 'Source: ' +
                    '<a href="https://www.yr.no/nb/historikk/graf/5-97251/Norge/Finnmark/Karasjok/Karasjok?q=2023"' +
                    'target="_blank">YR</a>'
            },
            xAxis: [{
                categories: ["JAN","FEB","MAR","APR","MAY","JUN"],
                crosshair: true,
                labels: {
                  style: {
                      color: '#ffffff'
                  }
              },
            }],
            yAxis: [{ // Primary yAxis
                labels: {
                    format: '{value}',
                    style: {
                        color: '#ffffff'
                    }
                },
                title: {
                    text: 'Male',
                    style: {
                        color: '#ffffff'
                    }
                }
            }, { // Secondary yAxis
                title: {
                    text: 'Female',
                    style: {
                        color: '#ffffff'
                    }
                },
                labels: {
                    format: '{value}',
                    style: {
                        color: '#ffffff'
                    }
                },
                opposite: true
            }],
            tooltip: {
                shared: true
            },
            legend: {
                align: 'left',
                verticalAlign: 'top',
                backgroundColor:
                    Highcharts.defaultOptions.legend?.backgroundColor ?? // theme
                    'rgba(255,255,255,0.25)'
            },
            series: [{
                name: 'Male',
                type: 'column',
                yAxis: 1,
                data: [10, 20, 30, 40, 15, 5]
                // tooltip: {
                //     valueSuffix: ' Lakhs'
                // }

            }, {
                name: 'Female',
                type: 'column',
                yAxis: 1,
                data: [5, 10, 15, 20, 25, 10]

            }, {
                name: '2025',
                type: 'spline',
                data: [
                    5.5,10.5
                ],
                tooltip: {
                    valueSuffix: '%'
                }
            }]
        } as any);

        Highcharts.chart('gender-chart', {
            chart: {
                plotBackgroundColor: undefined,
                plotBorderWidth: undefined,
                plotShadow: false,
                type: 'pie'
            },
            colors: ['#2da9d9', '#b73377'],
            title: {
                text: 'Births in State, 2025',
                style: {
                    color: '#ffffff'
                }
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: false
                    },
                    showInLegend: true
                }
            },
            legend: {
                itemStyle: {
                    color: '#ffffff'
                }
            },
            series: [{
                type: 'pie',
                name: 'Births',
                data: [{ name: 'Male', y: 58 },
                  { name: 'Female', y: 43 }]
            }]
        } as any);

        Highcharts.chart('age-gender-chart', {chart: {
            type: 'bar'
          },
          title: {
            text: 'Births by Age Group and Gender',
            style: { color: '#ffffff' }
          },
          legend:{
            labels: {
              style: { color: '#ffffff' }
            },
            itemStyle: {
              color: '#ffffff'}
          },
          xAxis: {
            categories: ['Under 18', '18-25', '26-30', '31-35', '36-40', 'Above 40'],
            title: { text: 'Age Group' },
            labels: {
              style: { color: '#ffffff' }
            }
          },
          yAxis: {
            title: { text: 'Number of Births' },
            labels: {
              style: { color: '#ffffff' }
            }
          },
          series: [
            {
              name: 'Male Births',
              type: 'bar',
              data: [30000, 500000, 300000, 100000, 50000, 10000]
            },
            {
              name: 'Female Births',
              type: 'bar',
              data: [28000, 480000, 290000, 95000, 48000, 9000]
            }
          ]} as any);

          Highcharts.chart('age-gender-percantage-chart', {
            chart: {
                type: 'pie'
            },
            title: {
                text: 'Percentage of Births by Age Group',
                style: { color: '#ffffff' }
            },
            series: [
                {
                    type: 'pie',
                    name: 'Birth Percentage',
                    data: [
                        { name: 'Under 18', y: 3 },
                        { name: '18-25', y: 50 },
                        { name: '26-30', y: 30 },
                        { name: '31-35', y: 10 },
                        { name: '36-40', y: 5 },
                        { name: 'Above 40', y: 2 }
                      ]
                }
            ]
        } as any);

        Highcharts.chart('cause-Of-Death-chart', {
            chart: {
                type: 'pie'
            },
            title: {
                text: 'Place of Birth',
                style: { color: '#ffffff' }
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            accessibility: {
                point: {
                    valueSuffix: '%'
                }
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: false
                    },
                    showInLegend: true
                }
            },
            legend: {
                itemStyle: {
                    color: '#ffffff'
                },
                alignColumns: false
            },
            series: [{
              name: 'Births',
              data: [
                { name: 'Institutional Births', y: 75, color: '#3498DB' },
                { name: 'Home Births', y: 25, color: '#E74C3C' }
              ],
              innerSize: '50%'
            }],
        } as any);
    }

    total_birth_death_array: any[] = [];
    async get_total_birth_death(): Promise<void> {
        try {
            const req = new basemodel();
            req.type = '3001';
            this.spinner.show();
            this.total_birth_death_array = [];
            let responce: any = await this.auth.auth_utilities_service02(req);
            this.spinner.hide();
            if (responce.code) {
                this.total_birth_death_array = responce.Details;
            } else {
                this.total_birth_death_array = [];
                this.spinner.hide();
            }
        } catch (error) {
            this.spinner.hide();
           
        }
    }

    summary_birth_death_array: any[] = [];
    async get_summary_birth_death(): Promise<void> {
        try {
            const req = new basemodel();
            req.type = '3002';
            this.spinner.show();
            this.summary_birth_death_array = [];
            let responce: any = await this.auth.auth_utilities_service02(req);
            this.spinner.hide();
            if (responce.code) {
                this.summary_birth_death_array = responce.Details;
            } else {
                this.summary_birth_death_array = [];
                this.spinner.hide();
            }
        } catch (error) {
            this.spinner.hide();
           
        }
    }
    all_state_summary_birth_death_array: any[] = [];
    async get_all_state_summary_birth_death(): Promise<void> {
        try {
            const req = new basemodel();
            req.type = '3009';
            this.spinner.show();
            this.all_state_summary_birth_death_array = [];
            let responce: any = await this.auth.auth_utilities_service02(req);
            this.spinner.hide();
            if (responce.code) {
                this.all_state_summary_birth_death_array = responce.Details;
            } else {
                this.all_state_summary_birth_death_array = [];
                this.spinner.hide();
            }
        } catch (error) {
            this.spinner.hide();
           
        }
    }
    world_summary_birth_death_array: any[] = [];
    async get_world_summary_birth_death(): Promise<void> {
        try {
            const req = new basemodel();
            req.type = '3010';
            this.spinner.show();
            this.world_summary_birth_death_array = [];
            let responce: any = await this.auth.auth_utilities_service02(req);
            this.spinner.hide();
            if (responce.code) {
                this.world_summary_birth_death_array = responce.Details;
            } else {
                this.world_summary_birth_death_array = [];
                this.spinner.hide();
            }
        } catch (error) {
            this.spinner.hide();
           
        }
    }
    summary_gender_array: any[] = [];
    async get_summary_gender(): Promise<void> {
        try {
            const req = new basemodel();
            req.type = '3003';
            this.spinner.show();
            this.summary_gender_array = [];
            let responce: any = await this.auth.auth_utilities_service02(req);
            this.spinner.hide();
            if (responce.code) {
                this.summary_gender_array = responce.Details;
                this.Gender_Chart(this.summary_gender_array);
            } else {
                this.summary_gender_array = [];
                this.spinner.hide();
            }
        } catch (error) {
            this.spinner.hide();
           
        }
    }

    summary_treads_array: any[] = [];
    summary_treads_array2 = [
      {
        TODAY_BIRTHS: 650,
        TODAY_BIRTHS_TARGET: 1000,
        TODAY_BIRTHS_PER: (650 / 1000) * 100
      }
    ];
    async get_summary_treads(): Promise<void> {
        try {
            const req = new basemodel();
            req.type = '3004';
            this.spinner.show();
            this.summary_treads_array = [];
            let responce: any = await this.auth.auth_utilities_service02(req);
            this.spinner.hide();
            if (responce.code) {
                this.summary_treads_array = responce.Details;
            } else {
                this.summary_treads_array = [];
                this.spinner.hide();
            }
        } catch (error) {
            this.spinner.hide();
           
        }
    }
    birth_death_treads_array: any[] = [];
    async get_birth_death_treads(): Promise<void> {
        try {
            const req = new basemodel();
            req.type = '3005';
            this.spinner.show();
            this.birth_death_treads_array = [];
            let responce: any = await this.auth.auth_utilities_service02(req);
            this.spinner.hide();
            
            if (responce.code) {
                this.birth_death_treads_array = responce.Details;
                this.birth_death_treads_Chart(this.birth_death_treads_array);
            } else {
                this.birth_death_treads_array = [];
                this.spinner.hide();
            }
        } catch (error) {
            this.spinner.hide();
           
        }
    }
    birth_age_group_array: any[] = [];
    async get_age_group_treads(): Promise<void> {
        try {
            const req = new basemodel();
            req.type = '3006';
            this.spinner.show();
            this.birth_age_group_array = [];
            let responce: any = await this.auth.auth_utilities_service02(req);
            this.spinner.hide();
            if (responce.code) {
                this.birth_age_group_array = responce.Details;
                this.age_group_gender_Chart(this.birth_age_group_array);
            } else {
                this.birth_age_group_array = [];
                this.spinner.hide();
            }
        } catch (error) {
            this.spinner.hide();
           
        }
    }
    birth_age_percentage_array: any[] = [];
    async get_age_group_percentage(): Promise<void> {
        try {
            const req = new basemodel();
            req.type = '3007';
            this.spinner.show();
            this.birth_age_percentage_array = [];
            let responce: any = await this.auth.auth_utilities_service02(req);
            this.spinner.hide();
            if (responce.code) {
                this.birth_age_percentage_array = responce.Details;
                this.age_group_gender_percantage_Chart(this.birth_age_percentage_array);
            } else {
                this.birth_age_percentage_array = [];
                this.spinner.hide();
            }
        } catch (error) {
            this.spinner.hide();
           
        }
    }

    death_distribution_array: any[] = [];
    async get_death_distribution(): Promise<void> {
        try {
            const req = new basemodel();
            req.type = '3008';
            this.spinner.show();
            this.death_distribution_array = [];
            let responce: any = await this.auth.auth_utilities_service02(req);
            this.spinner.hide();
            if (responce.code) {
                this.death_distribution_array = responce.Details;
                this.causeOfDeath_Chart(this.death_distribution_array);
            } else {
                this.death_distribution_array = [];
                this.spinner.hide();
            }
        } catch (error) {
            this.spinner.hide();
           
        }
    }
    getsum_of_coloumn(columnName: string): number {
        const regdistrictSum = this.summary_birth_death_array.reduce((sum, dd) => Number(sum) + dd[columnName], 0);
        return Number(regdistrictSum.toFixed(2));
      }
    //   getallstatesum_of_coloumn(columnName: string): number {
    //     const regdistrictSum = this.all_state_summary_birth_death_array.reduce((sum, dd) => Number(sum) + dd[columnName], 0);
    //     return Number(regdistrictSum.toFixed(2));
    //   }
    Gender_Chart(obj: any) {
        this.birth_male_state = obj[0]?.TOT_BIRTH_MALES;
        this.birth_female_state = obj[0]?.TOT_BIRTH_FEMALES;
        Highcharts.chart('gender-chart', {
            chart: {
                plotBackgroundColor: undefined,
                plotBorderWidth: undefined,
                plotShadow: false,
                type: 'pie'
            },
            colors: ['#2da9d9', '#b73377'],
            title: {
                text: 'Births in State, 2025',
                style: {
                    color: '#ffffff'
                }
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: false
                    },
                    showInLegend: true
                }
            },
            legend: {
                itemStyle: {
                    color: '#ffffff'
                }
            },
            series: [{
                type: 'pie',
                name: 'Births',
                data: [{ name: 'Male', y: 58 },
                  { name: 'Female', y: 43 }]
            }]
        } as any);
    }
    birth_death_treads_Chart(obj: any) {
        let monthnames: any[] = [];
                let birthlist: any[] = [];
                let deathlist: any[] = [];
                obj.forEach((element:any) => {
                    monthnames.push(element.MONTH_NAME);
                    birthlist.push(element.TOT_BIRTHS);
                    deathlist.push(element.TOT_DEATHS);
                });
        Highcharts.chart('birth-death-treads-comparison-chart', {
            chart: {
                zooming: {
                    type: 'xy'
                }
            },
            title: {
                text: 'Birth Ratio Comparison Trends',
                align: 'left',
                style: {
                    color: '#ffffff'
                }
            },
            credits: {
                text: 'Source: ' +
                    '<a href="https://www.yr.no/nb/historikk/graf/5-97251/Norge/Finnmark/Karasjok/Karasjok?q=2023"' +
                    'target="_blank">YR</a>'
            },
            xAxis: [{
                categories: monthnames,
                crosshair: true,
                labels: {
                  style: {
                      color: '#ffffff'
                  }
              },
            }],
            yAxis: [{ // Primary yAxis
                labels: {
                    format: '{value}',
                    style: {
                        color: '#ffffff'
                    }
                },
                title: {
                    text: 'Male',
                    style: {
                        color: '#ffffff'
                    }
                }
            }, { // Secondary yAxis
                title: {
                    text: 'Female',
                    style: {
                        color: '#ffffff'
                    }
                },
                labels: {
                    format: '{value}',
                    style: {
                        color: '#ffffff'
                    }
                },
                opposite: true
            }],
            tooltip: {
                shared: true
            },
            legend: {
                align: 'left',
                verticalAlign: 'top',
                backgroundColor:
                    Highcharts.defaultOptions.legend?.backgroundColor ?? // theme
                    'rgba(255,255,255,0.25)'
            },
            series: [{
                name: 'Male',
                type: 'column',
                yAxis: 1,
                data: [10, 20, 30, 40, 15, 5]
                // tooltip: {
                //     valueSuffix: ' Lakhs'
                // }

            }, {
                name: 'Female',
                type: 'column',
                yAxis: 1,
                data: [5, 10, 15, 20, 25, 10]

            }, {
                name: '2025',
                type: 'spline',
                data: [
                    5.5,10.5
                ],
                tooltip: {
                    valueSuffix: '%'
                }
            }]
        } as any);
    }
    age_group_gender_Chart(obj: any) {
        let male_group: any[] = [];
        let female_group: any[] = [];
        let age_group:any[]=[];
        obj.forEach((element: any) => {
            age_group.push(element.AGE_GROUP);
            male_group.push(element.TOT_MALE_BIRTHS);
            female_group.push(element.TOT_FEMALE_BIRTHS);
        });
        Highcharts.chart('age-gender-chart', {chart: {
          type: 'bar'
        },
        title: {
          text: 'Births by Age Group and Gender',
          style: { color: '#ffffff' }
        },
        legend:{
          labels: {
            style: { color: '#ffffff' }
          },
          itemStyle: {
            color: '#ffffff'}
        },
        xAxis: {
          categories: ['Under 18', '18-25', '26-30', '31-35', '36-40', 'Above 40'],
          title: { text: 'Age Group' },
          labels: {
            style: { color: '#ffffff' }
          }
        },
        yAxis: {
          title: { text: 'Number of Births' },
          labels: {
            style: { color: '#ffffff' }
          }
        },
        series: [
          {
            name: 'Male Births',
            type: 'bar',
            data: [30000, 500000, 300000, 100000, 50000, 10000]
          },
          {
            name: 'Female Births',
            type: 'bar',
            data: [28000, 480000, 290000, 95000, 48000, 9000]
          }
        ]} as any);
    }

    age_group_gender_percantage_Chart(obj: any) {
        let data: any[] = [];
        obj.forEach((element: any) => {
            data.push({ name: element.AGE_GROUP, y: element.AGE_GROUP_PER })
        });
        Highcharts.chart('age-gender-percantage-chart', {
            chart: {
                type: 'pie'
            },
            title: {
                text: 'Percentage of Births by Age Group',
                style: { color: '#ffffff' }
            },
            series: [
                {
                    type: 'pie',
                    name: 'Birth Percentage',
                    data: data
                }
            ]
        } as any);
    }
    causeOfDeath_Chart(obj: any) {
        let data: any[] = [];
        obj.forEach((element: any) => {
            data.push({ name: element.CAUSE, y: element.DEATH_PER })
        });
        Highcharts.chart('cause-Of-Death-chart', {
            chart: {
                type: 'pie'
            },
            title: {
                text: 'Place of Birth',
                style: { color: '#ffffff' }
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            accessibility: {
                point: {
                    valueSuffix: '%'
                }
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: false
                    },
                    showInLegend: true
                }
            },
            legend: {
                itemStyle: {
                    color: '#ffffff'
                },
                alignColumns: false
            },
            series: [{
              name: 'Births',
              data: [
                { name: 'Institutional Births', y: 75, color: '#3498DB' },
                { name: 'Home Births', y: 25, color: '#E74C3C' }
              ],
              innerSize: '50%'
            }],
        } as any);
    }
}