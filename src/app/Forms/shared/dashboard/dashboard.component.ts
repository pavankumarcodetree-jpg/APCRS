import { Component, ViewChild } from '@angular/core';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexNonAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexStroke,
  ApexMarkers,
  ApexYAxis,
  ApexGrid,
  ApexTitleSubtitle,
  ApexPlotOptions,
  ApexResponsive,
  ApexLegend,
  ApexFill
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  markers: ApexMarkers;
  colors: string[];
  yaxis: ApexYAxis;
  grid: ApexGrid;
  title: ApexTitleSubtitle;
  plotOptions: ApexPlotOptions;
  responsive: ApexResponsive[];
  legend: ApexLegend;
  fill: ApexFill;
  series2: ApexAxisChartSeries;
  series3: ApexAxisChartSeries;
  series4: ApexAxisChartSeries;
  seriesno: ApexNonAxisChartSeries;
  labels: string[];
};

import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  //Barchart
  Highcharts: typeof Highcharts = Highcharts; // Highcharts reference
  chartOptions: Highcharts.Options = {
    chart: {
      type: 'pie'
    },
    title: {
      text: ''
    },
    plotOptions: {
      pie: {
        innerSize: '80%', // Makes it a donut
        depth: 45,
        dataLabels: {
          enabled: true,
          format: '{point.name}: {point.percentage:.1f}%'
        }
      }
    },
    series: [
      {
        type: 'pie',
        name: 'Share',
        data: [
          { name: 'Chrome', y: 61.41 },
          { name: 'Internet Explorer', y: 11.84 },
          { name: 'Firefox', y: 10.85 }
        ]
      }
    ]
  };


  @ViewChild("chart") chart: ChartComponent | undefined;

  public chartOptions1: Partial<ChartOptions>;
  public chartOptions2: Partial<ChartOptions>;
  public chartOptions3: Partial<ChartOptions>;
  public chartOptions4: Partial<ChartOptions>;
  public chartOptions5: Partial<ChartOptions>;

  constructor() {
    this.chartOptions1 = {
      series: [
        {
          name: "birth - 2024",
          data: [28, 29, 33, 36, 32, 32, 33]
        },
        {
          name: "Death - 2024",
          data: [12, 11, 14, 18, 17, 13, 13]
        }
      ],
      chart: {
        height: 350,
        type: "line",
        dropShadow: {
          enabled: true,
          color: "#000",
          top: 18,
          left: 7,
          blur: 10,
          opacity: 0.2
        },
        toolbar: {
          show: false
        }
      },
      colors: ["#77B6EA", "#545454"],
      dataLabels: {
        enabled: true
      },
      stroke: {
        curve: "smooth"
      },
      title: {
        text: "Birth & Death Registrations",
        align: "left"
      },
      grid: {
        borderColor: "#e7e7e7",
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5
        }
      },
      markers: {
        size: 1
      },
      xaxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
        title: {
          text: "Month"
        }
      },
      yaxis: {
        title: {
          text: "Registrations"
        },
        min: 5,
        max: 40
      },
      legend: {
        position: "top",
        horizontalAlign: "right",
        floating: true,
        offsetY: -25,
        offsetX: -5
      }
    };
    this.chartOptions2 = {
      series2: [
        {
          name: "Birth",
          data: [44, 55, 41, 67, 22, 43]
        },
        {
          name: "Death",
          data: [13, 23, 20, 8, 13, 27]
        }
      ],
      chart: {
        type: "bar",
        height: 350,
        stacked: true,
        toolbar: {
          show: true
        },
        zoom: {
          enabled: true
        }
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              position: "bottom",
              offsetX: -10,
              offsetY: 0
            }
          }
        }
      ],
      plotOptions: {
        bar: {
          horizontal: true
        }
      },
      xaxis: {
        type: "category",
        categories: [
          "01/2019",
          "02/2020",
          "03/2021",
          "04/2022",
          "05/2023",
          "06/2024"
        ]
      },
      legend: {
        position: "right",
        offsetY: 40
      },
      fill: {
        opacity: 1
      }
    };
    this.chartOptions3 = {
      series3: [
        {
          name: "basic",
          data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380]
        }
      ],
      chart: {
        type: "bar",
        height: 350
      },
      plotOptions: {
        bar: {
          horizontal: true
        }
      },
      dataLabels: {
        enabled: false
      },
      xaxis: {
        categories: [
          "Krishna",
          "Guntur",
          "NTR",
          "Nellore",
          "Annamayya",
          "West Godavari",
          "East Godavari",
          "Prakasam",
          "Chittor",
          "Kurnool"
        ]
      }
    };
    this.chartOptions4 = {
      series4: [
        {
          name: "2016",
          data: this.generateData(18, {
            min: 0,
            max: 90
          })
        },
        {
          name: "2017",
          data: this.generateData(18, {
            min: 0,
            max: 90
          })
        },
        {
          name: "2018",
          data: this.generateData(18, {
            min: 0,
            max: 90
          })
        },
        {
          name: "2019",
          data: this.generateData(18, {
            min: 0,
            max: 90
          })
        },
        {
          name: "2020",
          data: this.generateData(18, {
            min: 0,
            max: 90
          })
        },
        {
          name: "2021",
          data: this.generateData(18, {
            min: 0,
            max: 90
          })
        },
        {
          name: "2022",
          data: this.generateData(18, {
            min: 0,
            max: 90
          })
        },
        {
          name: "2023",
          data: this.generateData(18, {
            min: 0,
            max: 90
          })
        },
        {
          name: "2024",
          data: this.generateData(18, {
            min: 0,
            max: 90
          })
        }
      ],
      chart: {
        height: 350,
        type: "heatmap"
      },
      dataLabels: {
        enabled: false
      },
      colors: ["#008FFB"],
      title: {
        text: "Birth Registrations"
      }
    };

    this.chartOptions5 = {
      seriesno: [44, 55, 67, 83],
      chart: {
        height: 180,
        width:120,
        type: "radialBar"
      },
      plotOptions: {
        radialBar: {
          dataLabels: {
            name: {
              fontSize: "12px"
            },
            value: {
              fontSize: "16px"
            },
            total: {
              show: true,
              label: "Total",
              formatter: function(w) {
                return "249";
              }
            }
          }
        }
      },
      labels: ["Apples", "Oranges", "Bananas", "Berries"]
    };
}
public generateData(count: number, yrange: { min: any; max: any; }) {
  var i = 0;
  var series4 = [];
  while (i < count) {
    var x = "w" + (i + 1).toString();
    var y =
      Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

    series4.push({
      x: x,
      y: y
    });
    i++;
  }
  return series4;
}
}