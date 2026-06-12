import { DatePipe } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

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
    selector: 'app-dashboardtwo',
    templateUrl: './dashboardtwo.component.html',
    styleUrl: './dashboardtwo.component.css'
})
export class DashboardtwoComponent {



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
        try {
            if (sessionStorage.getItem('_Uenc') !== '') {
                let obj: any = this.encdc.Getuser();

                if (obj != '' && obj != undefined && obj != null) {
                    this.RU_CODE = obj[0].RU_CODE;
                    this.get_total_birth_death();
                    this.get_summary_birth_death();
                    this.get_summary_gender();
                    this.get_summary_treads();
                    this.get_birth_death_treads();
                    this.get_age_group_treads();
                    this.get_age_group_percentage();
                    this.get_death_distribution();
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
                
                this.totalbirthcount = this.getsum_of_coloumn('TOT_BIRTH');
                this.male_count = this.getsum_of_coloumn('TOT_BIRTH_MALES');
                this.female_count = this.getsum_of_coloumn('TOT_BIRTH_FEMALES');
                this.selectedDistrict = null;
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
                data: [{
                    name: 'Male',
                    y: this.birth_male_state,
                    sliced: true,
                    selected: true
                }, {
                    name: 'Female',
                    y: this.birth_female_state
                },]
            }]
        } as any);
    }
    birth_death_treads_Chart(obj: any) {
        let monthnames: any[] = [];
        let birthlist: any[] = [];
        let deathlist: any[] = [];
        obj.forEach((element: any) => {
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
                text: 'Birth and Death Comparison Trends',
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
            }],
            yAxis: [{ // Primary yAxis
                labels: {
                    format: '{value}',
                    style: {
                        color: '#ffffff'
                    }
                },
                title: {
                    text: 'Births',
                    style: {
                        color: '#ffffff'
                    }
                }
            }, { // Secondary yAxis
                title: {
                    text: 'Deaths',
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
                name: 'Birth',
                type: 'column',
                yAxis: 1,
                data: birthlist,
                // tooltip: {
                //     valueSuffix: ' Lakhs'
                // }

            }, {
                name: 'Death',
                type: 'column',
                yAxis: 1,
                data: deathlist,

            }, {
                name: '2025',
                type: 'spline',
                data: [
                    5.5, 10.5
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
        let age_group: any[] = [];
        obj.forEach((element: any) => {
            age_group.push(element.AGE_GROUP);
            male_group.push(element.TOT_MALE_BIRTHS);
            female_group.push(element.TOT_FEMALE_BIRTHS);
        });
        Highcharts.chart('age-gender-chart', {
            chart: {
                type: 'bar'
            },
            title: {
                text: 'Births by Age Group and Gender',
                style: { color: '#ffffff' }
            },
            xAxis: {
                categories: age_group,
                title: {
                    text: 'Age Group',
                    style: { color: '#ffffff' }
                },
                labels: {
                    style: { color: '#ffffff' }
                }
            },
            legend: {
                itemStyle: {
                    color: '#ffffff'
                }
            },
            yAxis: {
                labels: { style: { color: '#ffffff' } },
                title: { text: 'Number of Births', style: { color: '#ffffff' } },
            },
            series: [
                {
                    name: 'Male Births',
                    type: 'bar',
                    //data: [30000, 500000, 300000, 100000, 50000, 10000]
                    data: male_group
                },
                {
                    name: 'Female Births',
                    type: 'bar',
                    //data: [28000, 480000, 290000, 95000, 48000, 9000]
                    data: female_group
                }
            ]
        } as any);
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
                text: 'Cause of Death Distribution',
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
            series: [
                {
                    type: 'pie',
                    name: 'Cause of Death',
                    data: data
                }
            ]
        } as any);
    }

    selectedDistrict: any = null;

    // Example data for districts
    districts = [
        {
            id: '503',
            name: 'Chittoor',
            population: 4170468, // Example data
            area: '15,152 km²',
            path: `M530.7,784.3c-0.4-0.2-0.8-0.6-1-1c-1.8-3.5-6.6-16.4-6.6-18.3c-0.4,0.2-4.6,11.9-14,8
          c-0.9-0.8-6.3,0.4-3-12c-0.1-0.7-5.2-6.9-2-13c-1.7,0.6-4.6,8.7-12-3c-0.7-0.1-18.9,2.6-22-4c-0.6-1.1-5-8.8-3-14
          c-0.5-0.6-1.8-14.6-16-14c-0.3,0.1-14.4-4.4-8,5c0.5,1.2,5.7,4.2,7,10c0,1.3,4.1,4.1-1,12c-0.2,0.9-2,6.4,11,6
          c0.4,0.1,4.5,1.3-1,7c-0.2,0.6,0,4.7-10,1c-1.6,0.9-2,1-2,1s-10.5,2.8-12,12c-0.1,0.9-2.3,27.2-23,11c-1.1,0-6.9-9.8-13,4
          c-0.3,0.2-4.6-0.9-8,2c0.3,0.7-0.4,10-6,16c-0.6,0.8-0.6,9.9-7,13c-0.3,1,0.8,8.5-4,11c-0.9,0.6-4.9,7.8-11,7
          c-1.1,1,1.1,10.1-10,7c-0.3,0.8-1.3,11.4-5,13c0.7,1.1,3.7,0.4,2,2c0,0.4-1.4,3.3-5,4c0.3,0.2-3,6.9,8-1c0,0,7,2.3,9,7
          c0.3,0.2,10,5.3,15-1c0.4-0.7,2.4-6.2,5-7c0.6,0.1,4-0.4,5,2c0.7-0.4,2.4-1.9,1-5c0.1-1.3,0.6-6.3,4-7c0.9-0.9,2-6,2-6
          s-2.8-3.2,1-6c0.7-0.5,2-5,2-5s-6.5-15.4,8-15c0.6-0.2-1.9-4.7,3-4c1.1,0,17.3-3.3,20-1c-0.1,0.1,2,6,2,6l1-6c0,0,4.4-3.8,10,0
          c0.6,0.2,5.4,0.4,8,5c2.6,4.6,12,0,12,0l2-6c0,0,7.3-13.7,12-7c1.2,0.4,10.8,3.1,10-7c0.4-0.6-4.1-3,3-2c1.2-0.6,9.5,0.4,0-11
          c0-1.6-3.2-8.9,4-7c0.9-0.1,12.5-2.8,16.6,7.8c0.3,0.8,1.1,1.3,2,1.2c3.4-0.5,11.3-2.1,13.5,0.1c0.3,1.1-2.7,8.5,8,7
          C533.3,788.8,537.2,787.5,530.7,784.3z`,
        },
        {
            id: '753',
            name: 'Annamayya',
            population: 4170468, // Example data
            area: '15,152 km²',
            path: `M490,711c-0.2-2.8,0-51,0-51s-3.9-9.6-9-12c-1.5,0.4-13,0-13,0l-3-1v-6l-3-5h-22l-1-3l-4-1
          c0,0-13.8-12.1-8,4c0.6,1.2,4.4,12.5-2,20c-0.8,0.7-9,0-9,0s-5.9-8.4-13,4c-0.6,0.9-3.6,7-13,15c-1.1,0-10.5-4.9-13-1
          c0.3,1.1,0,10,0,10l-2,4l3,4c0,0-4.7,8.4-12,9c-0.8,0.3-12.2,0.6-13,17c0.3,0.6-3.5,8.6-16,3c-0.8,0.9-9.3,1.1-3,6
          c0.5,0.8,1.8,9-3,5c-0.4,0.5-9.5,6.6,9,5c1.3,0.6,3.9,0.3,5,5c1.1,4.7-2.5,8.7,3,4c1.6-0.4,18.1-3.6,21,0c0.1,1.6,0,5,0,5
          s-3.8,3.7-1,11c0.4,1.4,2,6.8-1,8c-0.1,1.1-4.6,6,0,6c0.6,0.2,1,4,1,4s6.6-1.9,8,2c1.2,1.5,10.5,13.3,12-5c0.6-1.1,3.4,1.5,10-1
          c1.3,0.2,7.4-7.9,15-2c1.1,1.1,16.6,19.7,19-10c0.6-1.1,4.3-9.7,13-11c1.7,0,2.4-3.6,8,0c0.6,0,13.9-5.7,0-6
          c-1.6-0.2-10.2-1.7-5-11c0.5-0.8,5.1-4-4-11c-0.6-0.4-9.5-12.9-2-16c1.4-0.4,11-7.4,26,10c0.7,0.9,3,5.8,13,4
          c1.7-0.5,9.7-3.9,12-7C492.9,714.6,490.2,713.8,490,711z`
        },
        {
            id: '752',
            name: 'Tirupati',
            population: 4170468, // Example data
            area: '15,152 km²',
            path: `M583,705c-0.3-1.3-17.5-35.3-8-40c0.3-0.3,0.1-18.7,4-18c0.6-0.7,2.7-9.2-3-11c-0.7,0.7-5.4,1.6-8,0
          c-0.9,0.6-4,0.7-1,9c0.1,0.5-6.1,11.3-16-3c-0.8-0.1-1.8-4.3-5,5c-0.2-0.3-14.9-4.7-17-10c-0.2-1.1-1.9-3.2,1-6
          c0.3-0.3,6.2-16.7-8-12c-0.2,0.3-5.6,11.1-7,12c0.5,0.3,1.6,4.7,5,5c0,0.2-6.5,9.1-11,8c-0.5,0-5.8-7.2-4-11
          c-0.3-0.2-2.5-3.7-5,0c-0.4-0.1-7.7-1.6-5-6c0.3-0.6-3-13.3-17,2c-0.7,0.4-3.8,2.5,5,13c0.5,0.8,8.5,10.4,9,14
          c0,0.8,3.4,32.1,2,39c0.2,0.6,0.3,8.2-1,9c-0.3,0.3,6.5,13.2-1,16c-0.9,0.6-9.9,9.9-22,5c0,0-1.8,15.5,10,18c1,0.2,10.3-6.5,16,2
          c0.9,0.5,3,3,3,3s6-9.1,8-3c0.4,1.2-2,7.6-1,10c0.6,0.9,7,4.2,4,9c-0.5,0.6-6,8.5,5,7c0.8-0.3,6-9,6-9s3.5-4.9,5,2
          c0.1,1.1-1.1,5.9,5,12c0.4,1.1,0,5,0,5s3.5,2,4-1c0.2-0.9,0-2,0-2s-1.1-2.3,8,0c0.8-0.1,10.3-1.9,8-11c0-0.3,5.3-3.7,8-6
          c0.3-0.8,3-11,3-11s0.7-2,7,1c6.1,2.9,1-5,1-5c-0.7-0.9-6.8-17.1,3-11c0.4,0.7,1,6.7,5,10c0-0.1,5.6,3.2,0-7
          c-0.5-1.2-6.4-8.1,4-5c4.3,1.3,4-2,4-2c-1.7-4-1.2-5.7,1-6C587.7,725.1,594.2,722.1,583,705z`
        }, {
            id: '515',
            name: 'Sri Potti Sriramulu Nellore',
            population: 4170468, // Example data
            area: '15,152 km²',
            path: `M581,613c-7.6-4.6-6.8-14.6-7-15c-9.8-15.6-10-40.5-10-41c5.2-25.6-6.7-21.2-7-22c-15.2-22-12.5-2.7-13-2
          c-8.3-1.2-9.5,5.5-10,6c-0.8,7.5-4.3,2.5-5,2c-2.9-5.1-7.2-0.7-8-1c-6.4-11.2-6.8,17.6-7,18c-3.1,11.9-17.2,1.3-18,1
          c-10.1,1.3-12.5-3.6-13-4c-3.3-3.2-12.5-1.5-14-2c-3.8-3.6-5.5,0.5-6,1c-1.8,2.6-7.5,1.8-9,2c-5.6,4.2-3.8,16.8-3,18
          c15.4,18.5,10.3,34.7,11,36c13.4,7.5,13,16,13,16c1,3,9.3-4.6,10-5c6.3-3.7,9.6,0.3,10,1c1.9,11.2,5.3,8,6,8c6.4-3,6.5,5.7,7,7
          c1.1,8.2,7.8-1.1,8-2c-1.3-0.7-4-2.1-4-4c0-1.9,7.9-11.6,8-12c1.4-7.7,5.2-2.8,6-3c11.9,0.6,7.1,15.1,7,16c0,8.1,10.7,10.2,11,10
          c0.1-7.5,7.3-4.4,8-4c11.3,16.4,11.3,3.9,11,4c-4-5.1,0-11.6,0-12c3.7-3,15-0.9,15-1C573.9,623.1,581.4,613.8,581,613z`
        }, {
            id: '754',
            name: 'Sri Sathya Sai',
            population: 4170468, // Example data
            area: '15,152 km²',
            path: `M375,679c-7.6-9.2-6-21-6-21s-10.8-1.5-12-2c-5.5,0.2-37.6-26.8-38-27c-2.7-0.6,0.8-7.5,1-8
          c2.6-10.3-8.5-12.9-9-13c-7.7-0.9-5,4.6-5,5c-0.4,6.5-4.8,2.1-5,2c0.1-4.1-3.5-0.2-4,0c-2.5,2.9-6.6-2.5-7-3c-1.5-5-2.7-1.2-3-1
          c-3,2.2-5.5,0.1-6,0c-0.1-2.5-0.8-5.5-1-6c-0.5-2.9-7.6,5.8-8,6c-1.6,3.4-6.7-6.7-7-7c-6.5-9.2-9.7-1.1-10-1
          c-1.1,1.3-2.5,1.1-3,1c-2.4-4.3-9.3-2-10-2c-12.7,1.8-4.7,7.3-4,8c7.6,2.2,6,5.3,6,6c-3.3,3.4,1.9,7.4,2,8c3.3,2.8-1.6,12.3-2,13
          c-5,3.2-0.1,9.8,0,10c0.4,0.6,2.1,11.8,2,12c8.9,12.7,5.3,1,5,1c0-1.3-1-5-1-5s-0.2-4.6,0-5c2.1-1.4,4.6-0.2,5,0
          c-0.6,1.7,2.3,4.6,3,5c4.8,0.1,4.8,2.2,5,3c2.2,6.9-1.6,13.8-2,14c-2.4-3.8-5.8-2-7-2c-5-0.9-8.5,5.6-9,6c-0.1,1.9,3,2.4,3,3
          c-8.3,18.5-28.7,11.2-29,11c-1.3-4.9-11-5-11-5l-2-3c0,0-0.1-8.6-1-10c-5.9-9.1-11.3-1-12-1c-7.5,1.2-1.8,2.5-2,3
          c3.1,0.6,8,1,8,1s1.2,9.3,1,10c-7.9,0,7.6,13.2,8,14c0.4,0.8-3,12.4-4,13c-5.5,0.7-1.9,6.9-2,8c1.9,4.9,3,0.2,3,0
          c0-0.2,3.6,0,4,0c1.7,6.2,3,0,3,0s4.6,0,5,0c8.8,3.9,4.6-5.3,4-6c-7.1-6,0.6-5.9,2-7c6.8-3.2,12.8,1,13,1c1.2,0.1,8,1.5,9,1
          c3.3-1.7,9.7,1.8,10,2c1,6.2,3.7,6.8,4,7c1.3,3,1,8.1,1,9c-5.7,4.9,1,3,1,3l2-2h4l1-4h12c0,0,0.5-4.2,1-5c2.3-6.2,7,4,7,4
          s1-7.2,1-8c9.8-3.2,9.9-9.3,10-10c-5.2-8.9,7.7-5.9,9-6c3.4,4.6,6.7,2.4,7,2c11.7-10.8,2,8,2,8s1.7,3.1,2,3c4.4-6.8,8.2-2.9,9-3
          c6.5-6.6,8,8,8,8s8.2,0.7,9,1c6.6,2.3,7.1-7.9,7-9c2.3-6.6,6.7-9.3,7-10c2.2-2.7,6.3-0.9,7-1s6.8-5.2,7-6
          C370.2,687.1,375.1,679.6,375,679z`
        }, {
            id: '504',
            name: 'Y.S.R.',
            population: 4170468, // Example data
            area: '15,152 km²',
            path: `M487,648c-0.6-0.4-10.9-13.6-11-16c-0.1-0.6-3-4-3-4s1.7-10.3-13-16c-0.5-0.8,0-12,0-12s-1.8-17.6-12-24
          c-0.1-0.6-2.5-13.6-1-15c0.2-0.7,0.3-29.1-5-19c-0.3,0.2-4.4,2.9-8-5c-0.3-0.1-1.3-6.1-5,2c-0.5,0.3-6.1-1.4-14,1
          c-0.5,0.9-5.3,1.4-1,8c0.3,0.6,0.2,10.3-1,11c-0.6,0.3-7.2-0.3-5,4c0.1,0.3-5.3,14.6-11,10c-0.8-0.1-1.1-5.5-9,0
          c-0.9,0.6-8.3-4.1-5-11c0.2-0.8,5.5-14.6-7-1c-1,0.7-6.2,9.6-11,4c-0.4-0.4-4.2-3.2,0-5c0.2-0.4,2.3-8.7-12-3
          c-0.3,0.7-2,14.9-16,10c-0.4,0.1,3.1,2.5-1,5c0.1,0.6-5.1,5.4,0,11c0,0.3,2,3-4,3c-0.4,0.4-6.7,11.1,6,17c0.1,0.4,5,2.5,0,5
          c-0.5,0.4-13,16-13,16s-7.8-0.1-1,4c6.8,4.1,28.8,28.2,43,25c1.3,0,7.9-0.1,6,10c0.1,0.4,1,12.9,6,5c0.3-0.2,5.2-3.1,7,2
          c0.2,0.1,7,5.3,9-5c0.4-0.2,7.2-13.2,13-13c0.7,0,5-2.7,8,1c0.3,0.4,9.5,5.9,9-4c0.1-0.4-2.4-17.6-1-20c0.1-0.4,0.8-9.6,9-3
          c0.7,0.5,5.1,5.7,8,5c0.3,0.1,19.5,0.6,22,1c0.3,0.6,3.7,4.8,5,7c1.3,2.2-5.1,6.2,4,7c0.7,0.2,8.8-0.9,11,1c0.4,0.4,8.4,7.3,8,12
          C491.1,659.2,491.8,653.6,487,648z`
        }, {
            id: '502',
            name: 'Ananthapuramu',
            population: 4170468, // Example data
            area: '15,152 km²',
            path: `M337,604c-12-5.5-6.6-18.6-6-19c5.3,0.2,3.7-2,3-3c-5.4-3.9,1.7-14.6,1-15c-9.9-1.2-11.3-8.1-12-9
          c-1.8-2.5,1.3-9,1-10c-1.4-8.1-6.7-0.5-7,0c-2.9,4.4-5.4,0.2-6-1c-0.6-5.9-2-4.6-3-5c-1.9-0.5-3.1,5.6-4,6c-4.2-1.2-5,2.6-6,3
          c-1.6,0.8-13.4-10.5-14-12c-0.5-7.3-4.7-1.4-5-1c-4.1,9.6-9.2,0.6-10,0c-1.8-2.8-4.2-1-5-1c-6.4,3.6-11.2,0.5-12,0
          c-5.7-1.1-7.6,7.2-9,8c-3.9,3.6-7.4,4-8,4c-8.3-7.2-11.2-3.8-12-4c-6.3,3.4-7.4,13.1-8,14c-2.9,7-7.1-0.4-7-1c-2-1.9-8.2,2.4-9,2
          c-8-3.6-10.4-1-12-1c-2.3,0.4-2.4-5.2-3-6c-11.9-3.8-7.2,6.7-8,8c-2.4,8.1,10.6,6.4,11,7c-3,4.6,0.7,8.7,0,9
          c-3.9,3.4-2.4,10.4-3,11c-7.3-2.6-2.6,6.4-3,7c-9.5,15.5-1.5,22.3-1,23c-1.9,7.4,4.8,5.6,5,6c4,7.8,8.3,5.4,9,5
          c7.3-2.4,7.4,2.5,7,3c-5.7-1.7-3.9,5.8-4,6c-3.9-1.5-3.7,1.4-4,2c-9.5,3.6,1.2,9.5,2,10c3,0.6,2.7,1.2,3,2c-2.8,7.3,1.5,6.9,2,7
          c4.3-2.6,9.1-1,10-1c0.4,5.6,6.5,5.6,7,5c-1.7-4.2,0.9-13.8,1-14c3.1-5.4,18.4-0.7,19-1c-0.8,3.4,3.3,6.8,5,8
          c-1.8-1.8-0.8-6.1-1-7c-5.8-10.5,3-21,3-21c-2.1-2.8-2.9-6.7-3-7c-0.6-2,0.1-7.4,0-8c-6.4-2.6-7.4-4.3-8-5c-3.9-6.5,8.6-8.9,9-9
          c5.8-2.8,6.5-0.3,7,0c4.6,6,7,0.3,7,0c9.5-3.3,11.6,5.4,12,6c2.4,10.7,7.5-0.5,8-1c2.7-2.9,4.2-2.4,5-2c1.8,15.4,5.6,6.4,6,6
          c2.6-3.2,2.5-0.3,3,0c3.6,7.3,6,4.3,7,4c3.1-3.2,4.2,0.8,5,1c3.8,5.6,2-2.6,2-3c0.1-7.2,9.5-3,10-3c10,3.3,8.1,10.7,8,12
          c0.7,5,8.6-4.2,9-5C341.9,603.7,337.8,604.8,337,604z`
        }, {
            id: '511',
            name: 'Kurnool',
            population: 4170468, // Example data
            area: '15,152 km²',
            path: `M342,459c0.1-0.4,4-11.7-4-5c-0.2,0-7.1,8.7-11-7c-0.3,0-0.9-3.5-5,2c-0.3,0.1-9.3,3.3-11-1
          c-0.3-0.1,1-3.8-5,0c-0.2,0.3-17.9,6.3-30-2c-1-0.5-52-12.6-61-1c-0.4,0.3-7.6,5.8-6,11c0.3,0.5,4.3,1.7,2,5
          c-0.4,0.3-4.3,4.6,4,13c0.4,0.7,9,9.8,1,5c-0.7,0.1-7.7-4.8-8,5c-0.3,0.9,0.5,12.3-2,13c-0.5,0.1-10.4-3.3-1,6c0.3,0.3,5,4,5,13
          c0.6,0.8-2.9,4.9,8,4c0.7,0.4-0.7,1.1,0,4c1.5,0.5,2.4,2.2,4,1c0.2,1.3,1.3,4.2-1,5c-2.3,0.8-1.5,2.5,0,5c0.3,0.5,1.7,3.7,1,5
          c0,0.9-0.9,2.2,1,2c0,0,8.1-1.5,9,0c0.3,0.2,5.1,5.6,9-3c0.3-0.3,7-10.8,13-6c0.4,0.2,2.9,6.6,11,1c0.7-0.2,2.3-1.6,6,3
          c0.4,0.3,3.9,7,9-3c0.3-0.2,1.3-3.2,4-2c-0.1-0.6,2-6.2-3-10c0.1-0.5-1.9-14.2,13-11c0.6,0,4.9-20,20-4c0.3,0.3,3.6,7.9,9-3
          c0.2-0.4,5.7-1.6,5-7c0.6-1.5,1.5-6.6,5-7c0.3-0.6,4.9-6.5-3-4c-0.4-0.1,0.6-7.4-5-2c-0.5,0.5-2,8.7-6,2c-0.2-0.1-8,2.2-8-6
          c-0.3-0.6-0.2-8.7,0-9c0.2-0.3,2.9-4.3-5-3c-0.3,0-3.6-15.7,6-12c0.6,0,13.7-3.9,17,2c0,0.3,2.2,3.2-1,4c-0.3,0.1-6,1.6,0,5
          c0.4,0,5.9,2.9,11-3C339.3,464,347.4,465.8,342,459z`
        }, {
            id: '755',
            name: 'Nandyal',
            population: 4170468, // Example data
            area: '15,152 km²',
            path: `M425,417c-0.4-0.7-4.5-4.2-3,4c0,0.4,0,6.9-7,8c-1,0.7-1.8,1.1-1,3c-0.3,0-12.3,1.5-13-1
          c-0.2-0.1-4.8-13.1-8-8c-0.3,0.7-3.4,1.8-5,5c-0.4,0.3-8.8-0.7-10-4c-0.6,0-3.8-5.6-13,0c-0.2,0.2-12.4,1.2-11,11
          c0,0.9-0.1,7.9-5,9c-0.7,1-3.2,2.8-4,5c-0.8,2.2-0.6,9.3,1,10c0.7,0.7,2.9,6.8-3,8c-1.4,0.6-6.1,1.1-7,2c-0.9,0.9-6.5,0.5-8,0
          c-1.5-0.5-5-2.2-4-6c0.3-0.4,8.7-4.9-1-7c-0.5,0.2-7.5-2.2-16,2c-0.4,0.5-5,9.4,4,9c0.2,0.4,2.2,1.1,1,4c0.1,0.4-3.2,8.4,2,13
          c0.5,0.4,2.3,1.3,5,2c0.5,0.4,4.7,4,6-3c0.3-0.4,2.8-4.5,4-1c0.4,0.3,1.5,4.6,5,2c0.3-0.1,3.7-1.1,2,4c-0.5,0.7-8.8,5.3-8,13
          c0,0.6-7.9,6.1-8,9c0,0.5-0.2,2.9-5-1c-0.4-0.3-13-17.6-19,0c-0.1,0.5,0.3,4.6-4,2c-0.5,0.1-12.9-0.7-10,10c1,1.2,4.4,8,4,13
          c0,0,2.2,11.2,12,12c4.4-1.6,6.1-4.8,9-6c0.5,0.3,3.3-2.8,5,2c0.4,1.3,0.6,9.4,6,2c0.5-0.4,6.8-5.8,8,4c0,1-9,12.2,11,18
          c0.4-0.1,8.5,3.6,13-4c0.1-0.3,3.2-13.9,16-6c0.1,0.4,1.9,1.7,0,4c-0.3,0.4-4.5,3.8,3,6c0.5-0.2,2.7-0.3,5-4
          c0.5-0.5,12.8-15,11-4c-0.2,0.5-6.3,19.1,8,11c0.5,0,2.4-1.2,3,1c0.1,0.4,3.6,8.9,10-5c0.1-1-0.5-3.5,1-5c0.4,0,2.5-0.9,5-2
          c0.9-0.4,3.2-7.4,0-11c-0.3-0.2,0.1-6.4-2-9c-0.1-0.6-4.5-17.9-1-28c0.1-0.6,0.4-4.6,3-7c0.5-1.5-2.3-49.5,5-53
          C417.5,449.1,435.4,435.7,425,417z`
        }, {
            id: '517',
            name: 'Prakasam',
            population: 4170468, // Example data
            area: '15,152 km²',
            path: `M574,493c-0.7,0-4.2-1.3-6-5c-0.4,0-8.4,3.2-9,13c-0.6,0.1-5.1,1.3-7-2c-0.7,0.6-6.4,11.9-12,5
          c-0.4-0.2,1-4.1-5-2c-0.7,0-1.2-4.1-4-9c-0.4-0.6-8.1-10.9-1-11c1.4-0.7,17-8.3,16-25c-0.5-0.9-8.8-22.8-15-9c0,0.6-4.9,1.9,0,6
          c0.4,0.7,3.4,5.8-4,5c-0.7-0.5-8.8-7.6-10-14c-0.6,0.1-0.4-2.4-6,1c-0.9-0.4-9.5-0.6-8-14c-0.2-0.6-2.4-13.7,0-17
          c0.3-1,4.6-20-9-19c-0.3-0.1-12.7,11.3-20,12c-0.3,0.3-11.5,10-12-1c-1,0-17.2-12.1-29,3c-0.1,0.5-12.4-0.6-1,11
          c0.6,0.9,5,11.2-2,19c-0.5,0.6-9,11-9,11s-8,6.7-5,29c0.1,1.9,0.3,23.9-2,28c-0.5,1.1-3.1,24.6-2,26c0.8,0.7-0.9,3.5,3,3
          c3.9-0.5,4.9-4.4,11,0c2.5-0.3,5.8-9,9-3c0.4,1.4,2.3,10.1,8,5c0.5-0.1,4.6-4.1,6,9c0.1,0.5,1,7.9,13,3c0.5-0.5,14-9.8,24,2
          c0.8,0.6,4.8,5.2,12,4c0.7,0.3,17.6,14.9,15-12c-0.1-1.7,2.1-16,8-10c0.6,0.7,1.6,4.2,6,0c1.2,0.3,1.1-1,2,2c0.9,1,2.4,8.6,5-3
          c0.2-0.4,0.8-5,6-3c0.5-0.3,5.2-18,13-4c0.2,0,9,6.8,12,9c0.4,0.3,2.6-0.4,2-9c-0.1-1,5.2-21.8,14-24
          C582,502.6,588.4,491.1,574,493z`
        },
        {
            id: '751',
            name: 'palnadu',
            population: 4170468, // Example data
            area: '15,152 km²',
            path: `M599,356c-3.9-2.8-8.1-0.7-18-3c-9.9-2.3-8.3-2.4-9-6c-0.7-3.6-0.8-9-4-16c-3.2-7-6.3-2.5-6,2
          c0.3,4.5-4,7.9-7,15c-3,7.1-11.1,3.4-12-2c-0.9-5.4,0.4-4.8-4-4c-4.4,0.8-5.2,2.2-8-1c-2.8-3.2-5.4-2-9,2c-3.6,4-2.2,1.9-8,2
          c-5.8,0.1-2.9,0.5-8,2c-5.1,1.5,0.3,0,0,2c-0.3,2-0.5,2.9-6,2c-5.5-0.9-2.7,0.2-7,5c-4.3,4.8-15,4.5-20,6c-5,1.5-8.9,6.5-7,9
          c1.9,2.5,0.6,3.4,0,4c-0.6,0.6-1.5,12-1,13c0.5,1,2.8,5.5,1,11c-1.8,5.5,0.3,6.2,1,7c0.7,0.8,4.6-1.5,7-2c2.4-0.5,10.5-2.5,12-6
          c1.5-3.5,4.5-4.5,13-5c8.5-0.5,6.8,10.9,7,20c0.2,9.1,0.3,13.5,0,21c-0.3,7.5,8,9.5,11,9c3-0.5,4.5,6,7,11c2.5,5,5.8,3.5,5,1
          c-4.3-21.9,15-11,15-11c1.2-2.8,2.6-8.5-1-11c-3.6-2.5-4.1-2.5-2-4c2.1-1.5,3.2-5.4-1-9c-5.6-9,4.6-9.7,9.7-9.3
          c10.8,3,15.4,15.4,17.3,18.3c1.9,2.9,1.5,2.7,4.9,1.5c4.4-1.6,6.7,2,9.3,2c2.6,0,1.8-2.3,2.7-6.8c0.4-1.7,3.1-3.3,3.5-5.7
          s1.4-2.5,0.8-5.3c-0.6-2.8,0.4-11.4,9-17c4.1-2.6,1.5-3.7-1.8-4.1c-2.1-0.3-3,0.6-4.4,0.9c-1.4,0.2-3.8,1.6-3.8,1.6
          s-2.3-0.3-9.1,3c-6.9,3.4-8-3-8-3s0.6-0.5,1-2c0.4-1.5,1.7-1.7,3-4c1.3-2.3,3.2-1.9,4-4c0.8-2.1,3.6-2.5,6-6s14.9-9.7,18-14
          C605.1,361.7,602.9,358.8,599,356z`
        }, {
            id: '749',
            name: 'NTR',
            population: 4170468, // Example data
            area: '15,152 km²',
            path: `M650,324c-3.9-2.6-3.6-4.9-1-7c2.6-2.1-0.9-11.6-3-13c-2.1-1.4,0.6-1.9,0-5c-0.6-3.1-3.9-5.1-5-4
          c-1.1,1.1-8.1,3.1-9,1c-0.9-2.1-0.4-9.1-6-9c-5.6,0.1-11.9-0.4-13,6c-1.1,6.4-2.9,10.1-6,7c-3.1-3.1-9.6-6.4-8-2
          c1.6,4.4-0.1,6.1,4,9c4.1,2.9,8.4,3.1,12,3c3.6-0.1,8.4-1.1,9,3c0.6,4.1-3.4,2.1-2,8c1.4,5.9,4.4,8.1,4,10c-0.4,1.9-3.6,5.1-9,3
          c-5.4-2.1-7.1-3.4-9-6c-1.9-2.6-7.9-3.4-11-5c-3.1-1.6-6.4-4.9-6-9c0.4-4.1-7.6-10.6-9-11c-1.4-0.4-3.4-4.4-6-1
          c-2.6,3.4-8.9,3.9-13,8c-4.1,4.1-6.8,7.2-6,11c0,0-0.4,4.4,7,3c7.4-1.4,8.9,2.4,9,11c0.1,8.6-1.4,14.6,6,15
          c7.4,0.4,19.1,2.1,26,4c6.9,1.9,10.4,0.9,13,3c2.6,2.1,6.4-3.1,10-7c3.6-3.9,7.6-9.4,11-11c3.4-1.6-0.9-5.9,3-8
          c3.9-2.1,5.6-2.6,8-1C652.4,331.6,653.9,326.6,650,324z`
        }, {
            id: '510',
            name: 'Krishna',
            population: 4170468, // Example data
            area: '15,152 km²',
            path: `M738,386C738,386,738,386,738,386C738,386,739.7,386,738,386z M730,382c-5.3-1.8-5.4-1.9-9-3
          c-3.6-1.1-5.2,2.3-9,1c-3.8-1.3-1.2-3.4-4-4c-2.8-0.6-4.7,3.6-7,2c-2.3-1.6-4.2-1.4-5,3c-0.8,4.4-2.9,1.1-4-1
          c-1.1-2.1-2.9,3.6-6,3c-3.1-0.6-4.4-3.2-5-4c-0.6-0.8-0.2-11.7,1-16c1.2-4.3-1.9-1.9-5-3c-3.1-1.1-6.7-4.7-9-9
          c-2.3-4.3-2.9-4.9-8,1c-5.1,5.9-3.4,2.6-6-1c-2.6-3.6-1.2-1.9-4,1c-2.8,2.9-5.2,1.8-9,1c-3.8-0.8-3.7-2.4-8-3
          c-4.3-0.6-2.9,3.3-7,9c-4.1,5.7,1,5,1,5c2-5.2,4.1-5.4,3-2c-1.1,3.4-0.7,4.6,2,7c2.7,2.4,2.8-4.2,3-6c0.2-1.8-0.2-0.4,0-2
          c0.2-1.6,4.8,2.8,4,7c-0.8,4.2-5.2,4.3-4,6c1.2,1.7,14.1,17.8,18,25c3.9,7.2,10.1,27.1,12,34c1.9,6.9-4.2,21.6-7,28
          c-2.8,6.4,0.3,6.8,7,6c6.7-0.8,7.8-3.4,11-6c3.2-2.6-1.4-4.9-1-7c0.4-2.1,2.6-6.4,3-8c0.4-1.6,5.3-6.4,7-11c1.7-4.6,5.8-8.9,8-15
          c2.2-6.1,6.6-16.4,9-22c2.4-5.6,4.3-5.9,10-9c5.7-3.1,12.3-2.9,21-3c2.7,0,4.2,0,5,0c0-0.1-0.1-0.6-1-2
          C735.9,382.4,735.3,383.8,730,382z`
        }, {
            id: '523',
            name: 'West Godavari',
            population: 4170468, // Example data
            area: '15,152 km²',
            path: `M745.4,384.2c-0.2-0.1-0.3-0.1-0.4-0.2C744,383.2,747,385.6,745.4,384.2z M765.5,337.6c-5.1,1.3-4.2,5-6,2
          c-1.8-3-3.9-3.7-9.7-9.4s-2.4-6-1.9-7.4c0.6-1.3-6.7-9-12.9-9.8c-5-0.6-6.4-0.5-8,4c-2.4,6.9,3.4,10,1,14c-2.4,4,2.8,5.3,6,4
          c3.2-1.3,2.4,1.7,5,3c2.6,1.3,0.4,5-1,10c-1.4,5-2.9,2.3-8-1c-5.1-3.3-6.6,1.3-12,0c-5.4-1.3-4.6,0-5,2c-0.4,2,3.8,3.3,2,9
          c-1.8,5.7,1.1,6,4,12c2.9,6,3.1,5.3,7,7c3.9,1.7,5.8,1.7,9,2c3.2,0.3,4.8,0.3,9,4c0.7,0.6,1.1,0.9,1.4,1.2
          c2.2,0.9,10.6,1.8,10.6,1.8c-5.3-22.7,2.1-12.7,6-16c3.9-3.3,9.8-14.3,10-20C772.2,344.3,770.6,336.3,765.5,337.6z`
        }, {
            id: '747',
            name: 'Dr. B.R. Ambedkar Konaseema',
            population: 4170468, // Example data
            area: '15,152 km²',
            path: `M745.4,384.2c-0.2-0.1-0.3-0.1-0.4-0.2C744,383.2,747,385.6,745.4,384.2z M765.5,337.6c-5.1,1.3-4.2,5-6,2
          c-1.8-3-3.9-3.7-9.7-9.4s-2.4-6-1.9-7.4c0.6-1.3-6.7-9-12.9-9.8c-5-0.6-6.4-0.5-8,4c-2.4,6.9,3.4,10,1,14c-2.4,4,2.8,5.3,6,4
          c3.2-1.3,2.4,1.7,5,3c2.6,1.3,0.4,5-1,10c-1.4,5-2.9,2.3-8-1c-5.1-3.3-6.6,1.3-12,0c-5.4-1.3-4.6,0-5,2c-0.4,2,3.8,3.3,2,9
          c-1.8,5.7,1.1,6,4,12c2.9,6,3.1,5.3,7,7c3.9,1.7,5.8,1.7,9,2c3.2,0.3,4.8,0.3,9,4c0.7,0.6,1.1,0.9,1.4,1.2
          c2.2,0.9,10.6,1.8,10.6,1.8c-5.3-22.7,2.1-12.7,6-16c3.9-3.3,9.8-14.3,10-20C772.2,344.3,770.6,336.3,765.5,337.6z`
        }, {
            id: '505',
            name: 'East Godavari',
            population: 4170468, // Example data
            area: '15,152 km²',
            path: `M805,305c0,0-0.8-1-6-2s-5.1-4.7-5-8c0.1-3.3-0.8-6.7-3-10c-2.2-3.3-9.1-0.3-12-4c-2.9-3.7-1.5-4.7-7-5
          c-5.5-0.3-4.8-3-7-4c-2.2-1-10-2-10-2s-11.1-1.3-8,6c3.1,7.3-6.5,7-14,4c-7.5-3-8.5,4-10,14c-1.5,10-6.1,6.7-15,6
          c-8.9-0.7-6.8,6.7-8,15c-1.2,8.3,7.5,7.1,9,2c1-3.3,6.2,2,9,1s3.9-0.7,6-4c2.1-3.3,3.2-2.3,9-3c5.8-0.7,3.9,2.3,8,6
          c4.1,3.7,1.2,1.7,5,4c3.8,2.3,0.5,1,2,6s4.9,4.3,6,5c1.1,0.7,6.9,9,8,6c1.1-3-0.1-5.3-1-13c-0.9-7.7-2.8-10.7-5-17
          c-2.2-6.3,3.2-4.7,9,4c5.8,8.7,9.5,0.3,10-6c0.5-6.3,5.5,0.7,10,3c4.5,2.3,12.5,5,19,3C810.5,310,805,305,805,305z`
        }, {
            id: '748',
            name: 'Eluru',
            population: 4170468, // Example data
            area: '15,152 km²',
            path: `M746,264c-1.3-5.9-5-12.8-8-16c-3-3.2-9.7-4.6-13-5c-3.3-0.4-7-2.8-13-4c-6-1.2-7.7-2.6-9-5
          c-1.3-2.4-6.5-1.8-9-2c-2.5-0.2-5-2.3-9-4c-4-1.7-7-0.1-13-2s-4.2,1.7-2,5c2.2,3.3,2.3,3.2,6,6s6,5.4,11,4c5-1.4,4.3,0.9,4,4
          c-0.3,3.1,7,2.2,13,9c6,6.8-1,7.9-3,7c-2-0.9-6.7,1.9-8,3s-4,10.7-5,11c-1,0.3-5.2,0.2-9,2c-3.8,1.8-8.7,4.9-13,2
          c-4.3-2.9-4.2-1.3-4,2c0.2,3.3,1.9,6.1-3,6c-4.9-0.1-4.1,0.9-3,7c1.1,6.1-1.6,6.6-6,5c-4.4-1.6-3.4,1.9-2,6c1.4,4.1,3.9,9.1,1,12
          c-2.9,2.9-0.4,4.6,3,10c3.4,5.4,2.1,5.9-4,4c-6.1-1.9-6.4,2.6-7,8s-10.1,8.9-8,10c2.1,1.1,5.9,0.4,8,2s5.9,2.9,8,1
          c2.1-1.9,3.9-0.6,8,3c4.1,3.6,4.9-4.1,8-8c3.1-3.9,3.6,2.6,6,6c2.4,3.4,3.1,6.4,11,6c7.9-0.4,2.1,7.6-1,11
          c-3.1,3.4,0.1,10.4,6,13c5.9,2.6,4.1-2.4,5-1c0.9,1.4,4.9-0.6,6-3c1.1-2.4,4.6-1.4,6-2c1.4-0.6,3.1-2.9,8,0c4.9,2.9,4-4,4-4
          s1.3-0.6,3-2c1.7-1.4-0.5-2.1-2-8c-1.5-5.9-0.5-2.3-2-7c-1.5-4.7-1-5.8,1-8c2-2.2,8.3-1.8,15,1c6.7,2.8,6.5-5.3,8-10
          c1.5-4.7-4.5-2.1-10-4c-5.5-1.9-2.2-3.8-2-7s-1.2-5.6-1-9c0.2-3.4-2-3.6-4-2c-2,1.6-4-0.1-11,0c-7,0.1-4,5.9-8,3
          c-4-2.9-2.5-8.1-2-14c0.5-5.9,5.5-4.6,12-4c6.5,0.6,6.3-2.3,8-4c1.7-1.7,2.3-8.1,5-14c2.7-5.9,7.8-3.6,12-4s9.3,1.4,10-2
          C748.7,274.6,747.3,269.9,746,264z`
        }, {
            id: '746',
            name: 'Kakinada',
            population: 4170468, // Example data
            area: '15,152 km²',
            path: `M850,259c2.3-0.6,0-7.4,3-11c3-3.6,6-8.1,3-10c-3-1.9-7.3-3.4-9-2c-1.7,1.4-3.6,0.9-8,3c-4.4,2.1-4-0.4-8-2
          c-4-1.6-4.3-3.8-7,0c-2.7,3.8-5,5.2-8,8c-3,2.8-6,3.6-9,6c-3,2.4-10,0-10,0s-5,1.2-4,6c1,4.8-0.3,4.9-4,4c-3.7-0.9-5.6-0.4-9,0
          c-3.4,0.4-6,0-6,0s-0.3-0.4-2,1c-1.7,1.4-6.7-2.3-4,3c0,0-3,6.2,3,9c6,2.8,10,8,10,8s4.7-0.1,8,3s6.7,5.9,6,10
          c-0.7,4.1,5.7,4.6,9,9c3.3,4.4-3,12-3,12s2.4,4.2,10-2c7.6-6.2,11.4-3.8,11-7c-0.4-3.2,0.4-14.4,6-19s7-10.1,14-14
          c7-3.9,10.4-8.4,9-10C849.6,262.4,847.7,259.6,850,259z`
        }, {
            id: '744',
            name: 'Anakapalli',
            population: 4170468, // Example data
            area: '15,152 km²',
            path: `M925,204c6-5.2,7.7-13.8,4-14c-3.7-0.2-10.3,1.5-11-5c-0.7-6.5-4.3-6.8-8-7c-3.7-0.2-2,2.8-6-3
          c-4-5.8,0-5.5-4-6c-4-0.5-4,0.5-6,0c-2-0.5-3.6-2.8-6-1c-2.4,1.8-4.3,0.5-4,3c0.3,2.5,0,4,0,4s-4.3,5.8-9,4c-4.7-1.8-9,1.2-8,5
          c1,3.8,3.7,5.2,0,6c-3.7,0.8-6,2-6,2s-2.3,2.2-3,4c-0.7,1.8-1.6,1.8-3,3c-1.4,1.2-2.6,1.2-3,3c-0.4,1.8-3,5-3,5s-6.3-0.5-10,0
          c-3.7,0.5-11.3,5.5-4,8c7.3,2.5,6,5.5,3,7c-3,1.5-10,0.8-10,6c0,5.2,1,7.2,6,9c5,1.8,2.7,4.5,5,2c2.3-2.5,4.7-6.2,11-5
          c6.3,1.2,8.7,6.8,6,11c-2.7,4.2-3.3,1.8-3,4c0.3,2.2,2.4,2.8,0,5s-3.3,9.3-3,11c0,0,9-7.5,19-12c10-4.5,25.7-15.5,33-19
          c7.3-3.5,17.4-8.5,20-10c2.6-1.5,5-5,5-5S919,209.2,925,204z`
        }, {
            id: '743',
            name: 'Parvathipuram Manyam',
            population: 4170468, // Example data
            area: '15,152 km²',
            path: `M945.4,111.4c-3-1.6-13.3,0.3-14.4-3.6s-4-4.2-2-7.8l19.2,9.8c0-1.4-2.9-4.3-5.3-9.8s-10.9-8.6-14.4-12.2
          c-3.5-3.6-7.7-13-17.3-14.5C901.5,71.7,908,96,908,96c2.3,6.1,1,1.9-1,8c-2,6.1-0.3,6.3,2,9c2.3,2.7,5.7,8.3,1,9
          c-4.7,0.7-4,0.9-10,1c-6,0.1-7.6,2.3-11-4c-3.4-6.3-8.3-10.4-10-5c-1.7,5.4,1,10.6-5,13c-6,2.4-10.6,9.6-14,11
          c-3.4,1.4-5.3-0.1-5-9c0.3-8.9-9-9.4-5-12c4-2.6-1-5.1-2-10c-1-4.9-11-6.4-15,1c-4,7.4-1.6,14.9-5,18c-3.4,3.1-2.3,4.3,1,6
          c3.3,1.7,0,0.9-3,4c-3,3.1-3,10.3-2,13s5.4,7.6,2,10c-3.4,2.4-3.3,5.3-5,6c-1.7,0.7-3.6,5.3-3,8c0.6,2.7-2.6,4.9-9-2
          c-6.4-6.9-15.3-6.1-20-3c-4.7,3.1-34,20-34,20s-7.3,0.6-9,5s-10.3,5.1-20,5c-9.7-0.1-16.8-0.4-27-1c-10.2-0.6-19.6-1.7-17,3
          c2.6,4.7,5.6,7.5-8,6c-13.6-1.5-16.2,2.5-16,8c0.2,5.5,1,7,1,7s7-0.1,11,0c4,0.1,4,1.3,8,1c4-0.3,9-0.4,12,2c3,2.4,5,1.3,9,2
          c4,0.7,5.7,4.6,7,7c1.3,2.4,10,2.3,12,5c2,2.7,6,2.6,10,2c4-0.6,6.4,3.6,9,6c2.6,2.4,5.4,4.9,8,11c2.6,6.1,3,9.9,8,12
          c5,2.1,8.4,3.3,11,0c2.6-3.3,1-8.7,6-8c5,0.7,11.7,0.3,15,0c3.3-0.3,6.7,1.3,7-2c0.3-3.3,2-9.1,5-8s10.7-0.4,16-4
          c5.3-3.6,9.7-5.1,12-13s1.4-9.7,5-10c3.6-0.3,17.4-6.4,8-7c-9.4-0.6-12.6-6.4-6-8c6.6-1.6,8.4-3.4,12-4c3.6-0.6,8.7-6.1,11-7
          c2.3-0.9,1.7-4.4,5-6c3.3-1.6,7-4,7-4s-5.3-8.1,1-10c6.3-1.9,4-3.7,7-1s8.4-1.7,9-4c0.6-2.3,1.7-8.1,7-6c5.3,2.1,6.7,0.9,9-1
          s4-8.1,2-10s-2.6-8.7,5-5c7.6,3.7,8-2.1,10-5c2-2.9,6-5.4,9-6s4-5.4,7-9c3-3.6,3-9,3-9S948.4,113,945.4,111.4z`
        }, {
            id: '745',
            name: 'Alluri Sitharama Raju',
            population: 4170468, // Example data
            area: '15,152 km²',
            path: `M945.4,111.4c-3-1.6-13.3,0.3-14.4-3.6s-4-4.2-2-7.8l19.2,9.8c0-1.4-2.9-4.3-5.3-9.8s-10.9-8.6-14.4-12.2
       c-3.5-3.6-7.7-13-17.3-14.5C901.5,71.7,908,96,908,96c2.3,6.1,1,1.9-1,8c-2,6.1-0.3,6.3,2,9c2.3,2.7,5.7,8.3,1,9
       c-4.7,0.7-4,0.9-10,1c-6,0.1-7.6,2.3-11-4c-3.4-6.3-8.3-10.4-10-5c-1.7,5.4,1,10.6-5,13c-6,2.4-10.6,9.6-14,11
       c-3.4,1.4-5.3-0.1-5-9c0.3-8.9-9-9.4-5-12c4-2.6-1-5.1-2-10c-1-4.9-11-6.4-15,1c-4,7.4-1.6,14.9-5,18c-3.4,3.1-2.3,4.3,1,6
       c3.3,1.7,0,0.9-3,4c-3,3.1-3,10.3-2,13s5.4,7.6,2,10c-3.4,2.4-3.3,5.3-5,6c-1.7,0.7-3.6,5.3-3,8c0.6,2.7-2.6,4.9-9-2
       c-6.4-6.9-15.3-6.1-20-3c-4.7,3.1-34,20-34,20s-7.3,0.6-9,5s-10.3,5.1-20,5c-9.7-0.1-16.8-0.4-27-1c-10.2-0.6-19.6-1.7-17,3
       c2.6,4.7,5.6,7.5-8,6c-13.6-1.5-16.2,2.5-16,8c0.2,5.5,1,7,1,7s7-0.1,11,0c4,0.1,4,1.3,8,1c4-0.3,9-0.4,12,2c3,2.4,5,1.3,9,2
       c4,0.7,5.7,4.6,7,7c1.3,2.4,10,2.3,12,5c2,2.7,6,2.6,10,2c4-0.6,6.4,3.6,9,6c2.6,2.4,5.4,4.9,8,11c2.6,6.1,3,9.9,8,12
       c5,2.1,8.4,3.3,11,0c2.6-3.3,1-8.7,6-8c5,0.7,11.7,0.3,15,0c3.3-0.3,6.7,1.3,7-2c0.3-3.3,2-9.1,5-8s10.7-0.4,16-4
       c5.3-3.6,9.7-5.1,12-13s1.4-9.7,5-10c3.6-0.3,17.4-6.4,8-7c-9.4-0.6-12.6-6.4-6-8c6.6-1.6,8.4-3.4,12-4c3.6-0.6,8.7-6.1,11-7
       c2.3-0.9,1.7-4.4,5-6c3.3-1.6,7-4,7-4s-5.3-8.1,1-10c6.3-1.9,4-3.7,7-1s8.4-1.7,9-4c0.6-2.3,1.7-8.1,7-6c5.3,2.1,6.7,0.9,9-1
       s4-8.1,2-10s-2.6-8.7,5-5c7.6,3.7,8-2.1,10-5c2-2.9,6-5.4,9-6s4-5.4,7-9c3-3.6,3-9,3-9S948.4,113,945.4,111.4z`
        }, {
            id: '521',
            name: 'Vizianagaram',
            population: 4170468, // Example data
            area: '15,152 km²',
            path: `M1001,128c-8.6,2.3-26.7,0-16-6c10.7-6,13.8-4.5,9-12c-4.8-7.5-2.7-8.5-5-11c-2.3-2.5-2.9-3.8-5-3
          c-2.1,0.8,2.6,3.2-2,1c-4.6-2.2-3.2-2.3-6-4c-2.8-1.7,1.6,0.7-3-2c-4.6-2.7-2.7-0.5-5-3c-2.3-2.5-6-8-6-8s2.6,12.2,1,15
          c-1.6,2.8,1.1,7-4,5s-5.4-1.5-4-6c1.4-4.5,2.8-6-5-6c-7.8,0-12.7-1-15,0s-4.4,5.5-6,11c-1.6,5.5-6.4,15.5,1,14
          c7.4-1.5,10.3-4,7,5s-4.2,14.5-6,18c-1.8,3.5-5.2,7.5-4,11c1.2,3.5,1.1,4.5,2,8c0.9,3.5-5.4,7-1.7,7c3.7,0,23.7-4.7,24.7,8
          c0,0,1.8,10.5,10,5c8.2-5.5,12.3-13,15-16c2.7-3,8.6-8.8,16-11c7.4-2.2,5.1,0.7,8-2s6-10,6-10
          C1004.8,130.5,1009.6,125.7,1001,128z`
        }, {
            id: '520',
            name: 'Visakhapatnam',
            population: 4170468, // Example data
            area: '15,152 km²',
            path: `M950,169c-5.4-5.3-6-7-16-6c-10,1-11,0.7-9-3c2-3.7,3-2.7,3-5c0-2.3-2.3-1-2-8c0.3-7-8-1-8-1
          s-1.3,3.6-4,6.9c-1.8,2.2-8.7-4.3-11.6-1.6c-1.6,1.5,2.5,8.1,1,12c-3.8,10,3.6,14.7,11.6,15.7c8,1,2.7,10,8,10c12-1,8.7,7.7,3,15
          c-5.7,7.3,1.3,14,4,12c0,0,6.7-3.3,10-7c3.3-3.7,0.4,0,2-4c1.6-4,6.7-9.3,8-13c1.3-3.7,8.7-12,9-14
          C959.3,176,955.4,174.3,950,169z`
        }, {
            id: '519',
            name: 'Srikakulam',
            population: 4170468, // Example data
            area: '15,152 km²',
            path: `M1096,18c-0.2-3.9-6.8-2.1-9,1c-2.2,3.1-5.4,6.9-7,10c-1.6,3.1-3.4,1.5-7,4c-3.6,2.5,0.2-0.1-4,2
          c-4.2,2.1-5.4-2.1-5,3c0.4,5.1-0.1,8.5-2,11c-1.9,2.5-1.4-0.5-5,3c-3.6,3.5-4.8-0.1-4,5c0.8,5.1,5.6,2.5-3,5
          c-8.6,2.5-8.4,1.2-14,4s-8.4,4.9-14,0c-5.6-4.9-19.4-5.1-20-3c-0.6,2.1-3.8,3.2-4,10c-0.2,6.8-0.4,8.5,2,13s5.6,14.9-1,10
          c-6.6-4.9-8.1-7.5-10-4c-1.9,3.5-2.8,2.2,1,9c3.8,6.8,8.6,11.9,3,15c-5.6,3.1-5,4-5,4s-14.8,11.9,6,7c7.8-3.2,8-5,8-5
          s1.9,7.9,6,11c4.1,3.1,6.9,4.9,16-3c9.1-7.9,10.9-17.1,19-23c8.1-5.9,16.2-18.1,17-19c0.8-0.9,4.9-9.5,7-11c2.1-1.5,6-10,6-10
          s2.9-3.8,6-6c3.1-2.2,13-23,13-23s7.2-3.8,8-6C1100.8,29.8,1096.2,21.9,1096,18z`
        }, {
            id: '750',
            name: 'Bapatla',
            population: 4170468, // Example data
            area: '15,152 km²',
            path: `M651.6,403.3c-0.7-1.4-6.6-3.8-15.9,2.5c-1.4,1-4.2,2.8-7.4,0.3c1.1,0.9-6-1.8-4.3,4.9
          c0.8,2.1,7.7,14.1-4.4,18.6c-2.2,0.7-11.9,1-12.6,5.1c-0.2,1.2-6.4-0.9-15.9-5.7c-1.7-0.8-9.2,8.1-16,2c-3.2-1.1-6.4,4.3-10-3
          c-3.6-7.3-6.8-16.5-17-16c-10.2,0.5-10,2.3-7,7c3,4.7,6.4,7.7,2,10c-4.4,2.3-2,2.7,0,4c2,1.3,2.8,8.1,2,12c-0.8,3.9,1.5,5.1,4,8
          c2.5,2.9-1,9.9-4,16c-3,6.1-11.3,15-15,16c-3.7,1,1.1,3.2,3,6s3.1,5.4,3,7c-0.1,1.6,1.7-0.2,4,2c2.3,2.2,3.5,5.8,6,3
          c2.5-2.8,5.7-7,8-6c2.3,1,5.1-2.4,7-6c1.9-3.6,8.9-5.2,12-3c3.1,2.2,2.8,2.6,10,3c0,0-1.1-34.5,52-44c2.6,0.2,17.3-3.5,15,8
          c0.2,1.1-1.6,7.1,3,10c0.7-0.5,0.3-4.4,8.1-16.5C662,446.9,667.4,434.6,651.6,403.3z`
        }, {
            id: '506',
            name: 'Guntur',
            population: 4170468, // Example data
            area: '15,152 km²',
            path: `M644,390c-5.8-7.1-20.2-25.4-25-28c-4.8-2.6-8.7-4.4-11,0c-2.3,4.4-2.9,6.3-5,8c-2.1,1.7-2.2,2.1-6,4
          c-3.8,1.9-5.4,4.3-8,6c-2.6,1.7-5.7,2.1-7,4c-1.3,1.9-5.8,5.2-7.6,7.2c-1.8,1.9-4.4,10.4,3.6,6.6c7.9-3.8,22.1-7.8,22-3.1
          c-0.1,4.7-7.4,5.8-9,10.2c-1.6,4.4-2.2,7.6-2,12c0.2,4.4-5.5,7.7-4,11c0,0,3.3-5.4,9-1c5.7,4.4,9.8,5.6,15,3
          c5.2-2.6,7.3-1.2,11-3c3.7-1.8,5.8-9.2,3-13c-2.8-3.8-6.2-9.2,1-9c7.2,0.2,13.1-3.9,17-4C644.9,400.9,649.8,397.1,644,390z`
        },
        // Add other districts similarly
    ];


    totalbirthcount: any; female_count: any; male_count: any;
    onHover(district: any) {
        
        let obj = this.summary_birth_death_array.find(e => e.DISTRICT_CODE == district.id);
        this.totalbirthcount = obj.TOT_BIRTH;
        this.male_count = obj.TOT_BIRTH_MALES;
        this.female_count = obj.TOT_BIRTH_FEMALES;
        this.selectedDistrict = district;
    }

    onLeave() {
        
        this.totalbirthcount = this.getsum_of_coloumn('TOT_BIRTH');
        this.male_count = this.getsum_of_coloumn('TOT_BIRTH_MALES');
        this.female_count = this.getsum_of_coloumn('TOT_BIRTH_FEMALES');
        this.selectedDistrict = null;
    }

    // onSelect(district: any) {
    //   alert(`Selected ${district.name}:\nPopulation: ${district.population}\nArea: ${district.area}`);
    // }
}
