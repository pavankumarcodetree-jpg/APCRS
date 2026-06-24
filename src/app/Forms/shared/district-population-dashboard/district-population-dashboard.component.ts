import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as Highcharts from 'highcharts';
import { AuthserService } from 'src/app/services/api_lyr/private/authser.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { basemodel } from 'src/app/thirparty/model/apimodel';





@Component({
  selector: 'app-district-population-dashboard',
  standalone: false,
  templateUrl: './district-population-dashboard.component.html',
  styleUrl: './district-population-dashboard.component.css',
})
export class DistrictPopulationDashboardComponent {
  districts: string[] = [
  'Anakapalli',
  'Ananthapuramu',
  'Annamayya',
  'Alluri Seetha Rama Raju',
  'Bapatla',
  'Chittoor',
  'East Godavari',
  'Eluru',
  'Guntur',
  'Kakinada',
  'Konaseema',
  'Krishna',
  'Kurnool',
  'Nandyal',
  'NTR',
  'Palnadu',
  'Parvathipuram Manyam',
  'Prakasam',
  'Srikakulam',
  'Sri Potti Sriramulu Nellore',
  'Sri Sathya Sai',
  'Tirupati',
  'Visakhapatnam',
  'Vizianagaram',
  'West Godavari',
  'YSR Kadapa'
];

  districtDetails: any;
  mandalList: any[] = [];
  selectedMandals: string[] = [];
  selectedMandal: string = '';
  dashboardSummary: any = {};
  medianAgeChartOptions: Highcharts.Options = {};
  ageWiseChartOptions: Highcharts.Options = {}
  sexRatioChartOptions: Highcharts.Options = {};
  birthSexRatioChartOptions: Highcharts.Options = {};
  populationBirthShareChartOptions:Highcharts.Options = {};
  placeOfDeathChartOptions:Highcharts.Options = {};
  deathsBefore60ChartOptions:Highcharts.Options = {};
  deathsBefore70ChartOptions:Highcharts.Options = {};
  updatePopulationBirthShareChart = false;
  deathShareBirthChartOptions:Highcharts.Options = {};
  ageSexDistributionChartOptions:Highcharts.Options = {};
  tfrChartOptions: Highcharts.Options = {};
  annualGrowthRateChartOptions: Highcharts.Options = {};
  updateBirthChart = false;
  csrMandalList: any[] = [];

  currentYear: number = new Date().getFullYear();
  selectedYear: number = 2025;
  yearList: number[] = [];
  selectedDistrictName: string = '';
  birthSexRatioData: any=[];
  sexRatioData: any=[];
  updateFlag = false;
  totalBirthsandDeaths: any=[];
  shareOfpopulationandshareofBirth: any=[];
  medianAgeofDeath: any=[];
  updateMedianChart: boolean=false;
  allMandalsbirthandDeaths: any=[];
  barUpdateFlag: boolean=false;
  updateLineChartFlag: boolean=false;
  hasBarChartData = false;
  hasLineChartData = false;
  placeOfDeath: any=[];
  placeOfDeathUpdateFlag: boolean=false;
  birthShareofDeath: any=[];
  deathShareUpdateFlag: boolean=false;
  deathBeforeAge60: any=[];
  deathBefore60UpdateFlag: boolean=false;
  deathBeforeAge70: any=[];
  deathsBefore70UpdateFlag: boolean=false;
  tfrData: any=[];
  tfrUpdateFlag: boolean=false;
  annualExponentialData: any=[];
  annualGrowthUpdateFlag: boolean=false;
  ageDistributionData: any=[];
  dependecyRatioData: any=[];
  ageWiseUpdateFlag: boolean=false;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
     private auth: AuthserService,
     private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    for (let i = this.currentYear; i >= 2023; i--) {
      this.yearList.push(i);
    }
    this.getDistrictFromQuery();
  }
  getDistrictFromQuery() {
    this.route.queryParams.subscribe((params) => {
      const district = params['district'];
      this.selectedDistrictName = district;
      this.selectedYear = 2025;
      this.loadDistrictDashboardData();
    });
  }

  onYearChange(year: number) {
    this.selectedYear = year;
    this.selectedMandal = "";
    this.loadDistrictDashboardData();
  }


  goBack() {
    this.router.navigate(['/shared/dashboard']);
  }

  Highcharts: typeof Highcharts = Highcharts;
  lineChartOptions: Highcharts.Options = {};
  barChartOptions: Highcharts.Options = {};

loadBarChart() {
  if (!this.allMandalsbirthandDeaths?.length) {
    this.hasBarChartData = false;
    this.barChartOptions = {
      chart: {
        type: 'column',
        backgroundColor: 'transparent'
      },
      title: {
        text: ''
      },
      xAxis: {
        categories: []
      },
      yAxis: {
        min: 0,
        title: {
          text: ''
        }
      },
      series: [] as any,
      credits: {
        enabled: false
      }
    };
    this.barUpdateFlag = false;
    return;
  }
  let chartData: any[] = [];
    chartData = [...this.allMandalsbirthandDeaths];
  const categories =
    chartData.map(
      (x: any) => x.MANDAL_NAME
    );

  const birthsData =
    chartData.map(
      (x: any) =>
        Number(x.CRS_BIR_IN || 0)
    );

  const deathsData =
    chartData.map(
      (x: any) =>
        Number(x.CRS_DEA_IN || 0)
    );

  this.barChartOptions = {

    chart: {
      type: 'column',
      scrollablePlotArea: {
        minWidth: 1100
      },
      backgroundColor: 'transparent'
    },

    title: {
      text: ''
    },

    xAxis: {
      categories,
      lineColor: '#e0e0e0',
      labels: {
        rotation: -45,
        step: 1,
        style: {
          fontSize: '10px'
        }
      }
    },

    yAxis: {
      min: 0,
      title: {
        text: ''
      },
      gridLineColor: '#f1f3f5'
    },

    legend: {
      align: 'center',
      verticalAlign: 'bottom'
    },

    plotOptions: {
      column: {
        borderRadius: 6,
        pointPadding: 0.2
      }
    },

    series: [
      {
        type: 'column',
        name: 'Births',
        data: birthsData,
        color: '#86efac'
      },
      {
        type: 'column',
        name: 'Deaths',
        data: deathsData,
        color: '#fca5a5'
      }
    ] as any,

    credits: {
      enabled: false
    }
  };
  this.barUpdateFlag = false;
  this.hasBarChartData = true;

  setTimeout(() => {
    this.barUpdateFlag = true;
  }, 0);
}

loadLineChart() {

  if (!this.totalBirthsandDeaths?.length) {
    this.hasLineChartData = false;
    this.updateLineChartFlag = false;
    this.lineChartOptions = {
      chart: {
        type: 'line',
        backgroundColor: 'transparent'
      },
      title: {
        text: ''
      },
      xAxis: {
        categories: []
      },
      yAxis: {
        min: 0,
        title: {
          text: ''
        }
      },
      series: [] as any,
      credits: {
        enabled: false
      }
    };
    return;
  }

  const years = [...new Set(
    this.totalBirthsandDeaths.map(
      (x: any) => x.YEAR_YR
    )
  )].sort();

  const birthsData = years.map(year => {

    const record =
      this.totalBirthsandDeaths.find(
        (x: any) => x.YEAR_YR === year
      );

    return record?.CRS_BIR_IN || 0;
  });

  const deathsData = years.map(year => {

    const record =
      this.totalBirthsandDeaths.find(
        (x: any) => x.YEAR_YR === year
      );

    return record?.CRS_DEA_IN || 0; //CRS_DEA_IN
  });
  this.updateLineChart(
    years,
    birthsData,
    deathsData
  );
  this.hasLineChartData = true;
  this.updateLineChartFlag = false;
  setTimeout(() => {
    this.updateLineChartFlag = true;
  }, 0);
}

loadMedianAgeAtDeathChart() {

  if (!this.medianAgeofDeath?.length) {
    this.medianAgeChartOptions = {
      chart: {
        type: 'column'
      },
      title: {
        text: ''
      },
      xAxis: {
        categories: []
      },
      yAxis: {
        min: 0,
        title: {
          text: ''
        }
      },
      series: [] as any,
      credits: {
        enabled: false
      }
    };
    this.updateMedianChart = false;
    return;
  }

  const sortedData = [...this.medianAgeofDeath].sort(
    (a, b) => (a.MEDIAN_23 || 0) - (b.MEDIAN_23 || 0)
  );

  const categories = sortedData.map(
    (x: any) => x.MANDAL_NAME
  );

  const data2023 = sortedData.map(
    (x: any) => Number(x.MEDIAN_23 || 0)
  );

  const data2024 = sortedData.map(
    (x: any) => Number(x.MEDIAN_24 || 0)
  );

  const data2025 = sortedData.map(
    (x: any) => Number(x.MEDIAN_25 || 0)
  );

  this.medianAgeChartOptions = {

    chart: {
      type: 'column'
    },

    title: {
      text: ''
    },

    xAxis: {
      categories,
      labels: {
        rotation: -45
      }
    },

    yAxis: {
      min: 0,
      title: {
        text: 'Median Age'
      }
    },

    tooltip: {
      shared: true
    },

    plotOptions: {
      column: {
        dataLabels: {
          enabled: true
        }
      }
    },

    series: [
      {
        name: '2023',
        type: 'column',
        data: data2023
      },
      {
        name: '2024',
        type: 'column',
        data: data2024
      },
      {
        name: '2025',
        type: 'column',
        data: data2025
      }
    ] as any,

    credits: {
      enabled: false
    }
  };
   this.updateMedianChart = false;

  setTimeout(() => {
    this.updateMedianChart = true;
  }, 0);
}

updateLineChart(
  years: any[],
  birthsData: number[],
  deathsData: number[]
) {

  this.lineChartOptions = {

    chart: {

      type: 'line',

      backgroundColor: 'transparent'

    },



    title: {

      text: ''

    },
    xAxis: {

      categories: years.map(String),

      lineColor: '#e0e0e0'

    },
    yAxis: {
      title: {
        text: ''
      },
      gridLineColor: '#f1f3f5'
    },
    legend: {
      align: 'center',
      verticalAlign: 'bottom'

    },
    plotOptions: {

      line: {

        marker: {

          radius: 4

        },

        lineWidth: 3

      },



      series: {

        animation: {

          duration: 1000

        }

      }

    },



    series: [

      {

        type: 'line',

        name: 'Births',

        data: birthsData,

        color: '#86efac'

      },



      {

        type: 'line',

        name: 'Deaths',

        data: deathsData,

        color: '#fca5a5'

      }

    ]

  };

}


selectMandal(mandal: any) {
  this.selectedMandal = mandal.mandalName;
    this.loadDistrictDashboardData();
}



years = [
  2030, 2029, 2028, 2027, 2026,
  2025, 2024, 2023
];

onDistrictChange(event: any) {
  const districtName = event.target.value;
  if (districtName) {
    this.router.navigate(
      ['/shared/district-population'],
      {
        queryParams: {
          district: districtName
        }
      }
    );
  }
}

loadAgeWiseChart(
  age0To14: number,
  age15To59: number,
  age60Plus: number
) {

  if (
    !Number.isFinite(age0To14) &&
    !Number.isFinite(age15To59) &&
    !Number.isFinite(age60Plus)
  ) {
    this.resetAgeWiseChart();
    return;
  }

  if (
    age0To14 <= 0 &&
    age15To59 <= 0 &&
    age60Plus <= 0
  ) {
    this.resetAgeWiseChart();
    return;
  }

  this.ageWiseChartOptions = {
    chart: {
      type: 'pie'
    },

    title: {
      text: ''
    },

    tooltip: {
      pointFormat: '<b>{point.y:.2f}%</b>'
    },

    plotOptions: {
      pie: {
        innerSize: '65%',
        allowPointSelect: true,
        cursor: 'pointer',

        dataLabels: {
          enabled: true,
          format: '{point.name}: {point.y:.2f}%'
        },

        showInLegend: true
      }
    },

    credits: {
      enabled: false
    },

    series: [
      {
        type: 'pie',
        name: 'Population',
        data: [
          {
            name: '0-14 Years',
            y: age0To14,
            color: '#36A2EB'
          },
          {
            name: '15-59 Years',
            y: age15To59,
            color: '#00D66B'
          },
          {
            name: '60+ Years',
            y: age60Plus,
            color: '#FF6B35'
          }
        ]
      }
    ]
  };
    this.ageWiseUpdateFlag = false;

  setTimeout(() => {
    this.ageWiseUpdateFlag = true;
  });
}

resetAgeWiseChart() {
  this.ageWiseChartOptions = {
    chart: {
      type: 'pie'
    },
    title: {
      text: ''
    },
    tooltip: {
      pointFormat: '<b>{point.y:.2f}%</b>'
    },
    plotOptions: {
      pie: {
        innerSize: '65%',
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '{point.name}: {point.y:.2f}%'
        },
        showInLegend: true
      }
    },
    credits: {
      enabled: false
    },
    series: [] as any
  };
  this.ageWiseUpdateFlag = false;
  setTimeout(() => {
    this.ageWiseUpdateFlag = true;
  });
}

loadSexRatioChart() {
      if (!Array.isArray(this.sexRatioData)) {
    console.error(
      'sexRatioData is not an array',
      this.sexRatioData
    );
    return;
  }
  const sortedMandals = [...this.sexRatioData].sort(
    (a, b) => a.SEX_RATIO - b.SEX_RATIO
  );
  this.sexRatioChartOptions = {
    chart: {
      type: 'column'
    },
    title: {
      text: 'Sex Ratio (Females per 1000 Males)'
    },
    xAxis: {
      categories: sortedMandals.map(x => x.MANDAL_NAME)
    },
    series: [{
      name: 'Sex Ratio',
      type: 'column',
      data: sortedMandals.map(x => x.SEX_RATIO)
    }]
  };
  this.updateFlag = false;
  setTimeout(() => {
    this.updateFlag = true;
  }, 0);
}

loadBirthSexRatioChart() {
  const sortedMandals = [...(this.csrMandalList || [])].sort(
    (a, b) =>
      (a?.yearWiseData?.[2023]?.sexRatio || 0) -
      (b?.yearWiseData?.[2023]?.sexRatio || 0)
  );

  const categories =
    sortedMandals.length
      ? sortedMandals.map(m => m.mandalName)
      : ['No data'];

  const sexRatio2023 =
    sortedMandals.length
      ? sortedMandals.map(
          m => m?.yearWiseData?.[2023]?.sexRatio || 0
        )
      : [0];

  const sexRatio2024 =
    sortedMandals.length
      ? sortedMandals.map(
          m => m?.yearWiseData?.[2024]?.sexRatio || 0
        )
      : [0];

  const sexRatio2025 =
    sortedMandals.length
      ? sortedMandals.map(
          m => m?.yearWiseData?.[2025]?.sexRatio || 0
        )
      : [0];

  this.birthSexRatioChartOptions = {

    chart: {
      type: 'column'
    },

    title: {
      text: 'CSR Sex Ratio at Birth (Males per 100 Females)'
    },

    xAxis: {
      categories,
      labels: {
        rotation: -45
      }
    },

    yAxis: {
      min: 0,
      title: {
        text: 'Males per 100 Females'
      }
    },

    credits: {
      enabled: false
    },

    series: [
      {
        name: '2023',
        type: 'column',
        data: sexRatio2023
      },
      {
        name: '2024',
        type: 'column',
        data: sexRatio2024
      },
      {
        name: '2025',
        type: 'column',
        data: sexRatio2025
      }
    ]
  };
    this.updateBirthChart = false;
  setTimeout(() => {
    this.updateBirthChart = true;
  }, 0);
}

loadPopulationBirthShareChart() {

  if (!this.shareOfpopulationandshareofBirth?.length) {
    this.populationBirthShareChartOptions = {
      chart: {
        type: 'column'
      },
      title: {
        text: ''
      },
      xAxis: {
        categories: []
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Percentage (%)'
        }
      },
      series: [] as any,
      credits: {
        enabled: false
      }
    };
    this.updatePopulationBirthShareChart = false;
    return;
  }

  const chartData =
    [...this.shareOfpopulationandshareofBirth];

  chartData.sort(
    (a, b) =>
      a.SHARE_OF_POPULATION_SUB -
      b.SHARE_OF_POPULATION_SUB
  );

  const categories =
    chartData.map(
      (x: any) => x.MANDAL_NAME
    );

  const populationShareData =
    chartData.map(
      (x: any) =>
        Number(x.SHARE_OF_POPULATION_SUB || 0)
    );

  const birthShareData =
    chartData.map(
      (x: any) =>
        Number(x.SHARE_OF_BIRTHS_ALL_SUB || 0)
    );

  this.populationBirthShareChartOptions = {

    chart: {
      type: 'column'
    },

    title: {
      text: ''
    },

    xAxis: {
      categories,
      labels: {
        rotation: -45,
        style: {
          fontSize: '10px'
        }
      }
    },

    yAxis: {
      min: 0,
      title: {
        text: 'Percentage (%)'
      }
    },

    tooltip: {
      shared: true,
      valueSuffix: '%'
    },

    credits: {
      enabled: false
    },

    legend: {
      enabled: true
    },

    plotOptions: {
      column: {
        grouping: true,
        dataLabels: {
          enabled: true,
          format: '{y:.1f}%'
        }
      }
    },

    series: [{
      type: 'column',
      name: 'Share of population in sub-districts',
      data: populationShareData
    },
    {
      type: 'column',
      name: 'Share of births among all sub-districts',
      data: birthShareData
    }] as any
  };

  this.updatePopulationBirthShareChart = false;
  setTimeout(() => {
    this.updatePopulationBirthShareChart = true;
  }, 0);
}

loadPlaceOfDeathChart() {

  if (!this.placeOfDeath?.length) {
    this.placeOfDeathChartOptions = {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Place of Death'
      },
      xAxis: {
        categories: []
      },
      yAxis: {
        min: 0,
        max: 100,
        title: {
          text: 'Percentage (%)'
        }
      },
      series: [] as any,
      credits: {
        enabled: false
      }
    };
    this.placeOfDeathUpdateFlag = false;
    return;
  }

  const chartData =
    [...this.placeOfDeath].sort(
      (a, b) => a.HOSPITAL - b.HOSPITAL
    );

  const categories =
    chartData.map(
      (x: any) => x.MANDAL_NAME
    );

  const hospitalData =
    chartData.map(
      (x: any) => Number(x.HOSPITAL || 0)
    );

  const otherData =
    chartData.map(
      (x: any) => Number(x.OTHER || 0)
    );

  this.placeOfDeathChartOptions = {

    chart: {
      type: 'column'
    },

    title: {
      text: 'Place of Death'
    },

    xAxis: {
      categories,
      labels: {
        rotation: -45
      }
    },

    yAxis: {
      min: 0,
      max: 100,

      title: {
        text: 'Percentage (%)'
      }
    },

    credits: {
      enabled: false
    },

    tooltip: {
      shared: true,
      valueSuffix: '%'
    },

    plotOptions: {
      column: {
        stacking: 'percent',
        dataLabels: {
          enabled: true,
          format: '{y:.1f}%'
        }
      }
    },

    series: [
      {
        type: 'column',
        name: 'Hospital',
        data: hospitalData
      },
      {
        type: 'column',
        name: 'Other',
        data: otherData
      }
    ] as any
  };
  this.placeOfDeathUpdateFlag = false;

setTimeout(() => {
  this.placeOfDeathUpdateFlag = true;
});
}

loadDeathsBefore60Chart() {

  if (!this.deathBeforeAge60?.length) {
    this.deathsBefore60ChartOptions = {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Percentage of Deaths Before Age 60'
      },
      xAxis: {
        categories: []
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Percentage (%)'
        }
      },
      series: [] as any,
      credits: {
        enabled: false
      }
    };
    this.deathBefore60UpdateFlag = false;
    return;
  }

  const chartData =
    [...this.deathBeforeAge60].sort(
      (a, b) =>
        Number(a.PERCENT || 0) -
        Number(b.PERCENT || 0)
    );

  const categories =
    chartData.map(
      (x: any) => x.MANDAL_NAME
    );

  const percentageData =
    chartData.map(
      (x: any) => Number(x.PERCENT || 0)
    );

  this.deathsBefore60ChartOptions = {

    chart: {
      type: 'column',
      scrollablePlotArea: {
        minWidth: categories.length * 60,
        scrollPositionX: 0
      }
    },

    title: {
      text: 'Percentage of Deaths Before Age 60'
    },

    xAxis: {
      categories,
      labels: {
        rotation: -45
      }
    },

    yAxis: {
      min: 0,
      title: {
        text: 'Percentage (%)'
      }
    },

    credits: {
      enabled: false
    },

    tooltip: {
      valueSuffix: '%'
    },

    plotOptions: {
      column: {
        dataLabels: {
          enabled: true,
          format: '{y:.1f}%'
        }
      }
    },

    series: [{
      type: 'column',
      name: 'Deaths Before Age 60',
      data: percentageData
    }] as any
  };
this.deathBefore60UpdateFlag = false;

setTimeout(() => {
  this.deathBefore60UpdateFlag = true;
});
}
loadDeathsBefore70Chart() {

  if (!this.deathBeforeAge70?.length) {
    this.deathsBefore70ChartOptions = {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Percentage of Deaths Before Age 70'
      },
      xAxis: {
        categories: []
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Percentage (%)'
        }
      },
      series: [] as any,
      credits: {
        enabled: false
      }
    };
    this.deathsBefore70UpdateFlag = false;
    return;
  }

  const chartData =
    [...this.deathBeforeAge70].sort(
      (a, b) =>
        Number(a.PERCENT || 0) -
        Number(b.PERCENT || 0)
    );

  const categories =
    chartData.map(
      (x: any) => x.MANDAL_NAME
    );

  const percentageData =
    chartData.map(
      (x: any) => Number(x.PERCENT || 0)
    );

  this.deathsBefore70ChartOptions = {

    chart: {
      type: 'column',
      scrollablePlotArea: {
        minWidth: categories.length * 60,
        scrollPositionX: 0
      }
    },

    title: {
      text: 'Percentage of Deaths Before Age 70'
    },

    xAxis: {
      categories,
      labels: {
        rotation: -45
      }
    },

    yAxis: {
      min: 0,
      title: {
        text: 'Percentage (%)'
      }
    },

    credits: {
      enabled: false
    },

    tooltip: {
      valueSuffix: '%'
    },

    plotOptions: {
      column: {
        dataLabels: {
          enabled: true,
          format: '{y:.1f}%'
        }
      }
    },

    series: [{
      type: 'column',
      name: 'Deaths Before Age 70',
      data: percentageData
    }] as any
  };

this.deathsBefore70UpdateFlag = false;

setTimeout(() => {
  this.deathsBefore70UpdateFlag = true;
});
}

loadDeathShareBirthChart() {

  if (!this.birthShareofDeath?.length) {
    this.deathShareBirthChartOptions = {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Death as Share of Births'
      },
      xAxis: {
        categories: []
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Death / Birth Ratio'
        }
      },
      series: [] as any,
      credits: {
        enabled: false
      }
    };
    this.deathShareUpdateFlag = false;
    return;
  }

  const chartData =
    [...this.birthShareofDeath].sort(
      (a, b) =>
        Number(a.DEATH_AS_SHARE_OF_BIRTHS || 0) -
        Number(b.DEATH_AS_SHARE_OF_BIRTHS || 0)
    );

  const categories =
    chartData.map(
      (x: any) => x.MANDAL_NAME
    );

  const deathShareData =
    chartData.map(
      (x: any) =>
        Number(x.DEATH_AS_SHARE_OF_BIRTHS || 0)
    );

  this.deathShareBirthChartOptions = {

    chart: {
      type: 'column',
      scrollablePlotArea: {
        minWidth: categories.length * 60,
        scrollPositionX: 0
      }
    },

    title: {
      text: 'Death as Share of Births'
    },

    xAxis: {
      categories,
      labels: {
        rotation: -45
      }
    },

    yAxis: {
      min: 0,
      title: {
        text: 'Death / Birth Ratio'
      }
    },

    tooltip: {
      pointFormat:
        '<b>{point.y:.3f}</b>'
    },

    credits: {
      enabled: false
    },

    plotOptions: {
      column: {
        dataLabels: {
          enabled: true,
          format: '{y:.3f}'
        }
      }
    },

    series: [{
      type: 'column',
      name: 'Death as Share of Births',
      data: deathShareData
    }] as any
  };
this.deathShareUpdateFlag = false;

setTimeout(() => {
  this.deathShareUpdateFlag = true;
});
}
loadAgeSexDistributionChart() {

  const ageData =
    this.districtDetails?.ageSexDistribution || [];

  const categories =
    ageData.map((x:any) => x.ageGroup);

  const femaleData =
    ageData.map((x:any) => x.female);

  const maleData =
    ageData.map((x:any) => x.male);

  this.ageSexDistributionChartOptions = {

    chart: {
      type: 'column'
    },

    title: {
      text: `Age-sex distribution of deaths in ${this.selectedDistrictName} District (2023-25)`
    },

    xAxis: {
      categories
    },

    yAxis: {
      min: 0,
      title: {
        text: 'Percentage'
      }
    },

    credits: {
      enabled: false
    },

    tooltip: {
      shared: true,
      valueSuffix: '%'
    },

    plotOptions: {
      column: {
        dataLabels: {
          enabled: true,
          format: '{y:.1f}'
        }
      }
    },

    series: [
      {
        name: 'Female',
        type: 'column',
        data: femaleData
      },
      {
        name: 'Male',
        type: 'column',
        data: maleData
      }
    ]
  };
}

loadTfrChart() {

  if (!this.tfrData?.length) {
    this.tfrChartOptions = {
      chart: {
        type: 'column'
      },
      title: {
        text: `TFR in Sub-districts of ${this.selectedDistrictName}`
      },
      xAxis: {
        categories: []
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Estimated TFR'
        }
      },
      series: [] as any,
      credits: {
        enabled: false
      }
    };
    this.tfrUpdateFlag = false;
    return;
  }

  const chartData = [...this.tfrData]
    .sort(
      (a, b) =>
        Number(a.ESTIMATED_TFR || 0) -
        Number(b.ESTIMATED_TFR || 0)
    );

  const categories =
    chartData.map(
      (x: any) => x.MANDAL_NAME
    );

  const tfrData =
    chartData.map(
      (x: any) => ({
        y: Number(x.ESTIMATED_TFR || 0)
      })
    );

  this.tfrChartOptions = {

    chart: {
      type: 'column',
      scrollablePlotArea: {
        minWidth: categories.length * 60,
        scrollPositionX: 0
      }
    },

    title: {
      text:
        `TFR in Sub-districts of ${this.selectedDistrictName}`
    },

    xAxis: {
      categories,
      labels: {
        rotation: -45
      }
    },

    yAxis: {
      min: 0,
      title: {
        text: 'Estimated TFR'
      }
    },

    tooltip: {
      pointFormat:
        '<b>{point.y:.2f}</b>'
    },

    credits: {
      enabled: false
    },

    plotOptions: {
      column: {
        dataLabels: {
          enabled: true,
          format: '{y:.2f}'
        }
      }
    },

    series: [{
      name: 'Estimated TFR',
      type: 'column',
      data: tfrData
    }]
  };

this.tfrUpdateFlag = false;

setTimeout(() => {
  this.tfrUpdateFlag = true;
});
}

loadAnnualGrowthRateChart() {
  if (!this.annualExponentialData?.length) {
    this.annualGrowthRateChartOptions = {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Average Annual Exponential Growth Rate (%)'
      },
      xAxis: {
        categories: []
      },
      yAxis: {
        title: {
          text: 'Percentage (%)'
        }
      },
      series: [] as any,
      credits: {
        enabled: false
      }
    };
    this.annualGrowthUpdateFlag = false;
    return;
  }
  const chartData = this.annualExponentialData.map(
    (item: any) => ({
      mandalName: item.MANDAL_NAME,
      growthRate: Number(
        ((item.ANNUAL_EXPENTIAL || 0) * 100).toFixed(2)
      )
    })
  );

  // Sort ascending
  chartData.sort(
    (a:any, b:any) => a.growthRate - b.growthRate
  );

  const categories =
    chartData.map((x:any) => x.mandalName);

  const growthData =
    chartData.map((x:any) => x.growthRate);

  this.annualGrowthRateChartOptions = {

    chart: {
      type: 'column',
      scrollablePlotArea: {
        minWidth: categories.length * 60,
        scrollPositionX: 0
      }
    },

    title: {
      text: 'Average Annual Exponential Growth Rate (%)'
    },

    xAxis: {
      categories,
      labels: {
        rotation: -45
      }
    },

    yAxis: {
      title: {
        text: 'Percentage (%)'
      },
      plotLines: [{
        value: 0,
        width: 1,
        color: '#999'
      }]
    },

    tooltip: {
      pointFormat: '<b>{point.y:.2f}%</b>'
    },

    credits: {
      enabled: false
    },

    plotOptions: {
      column: {
        dataLabels: {
          enabled: true,
          format: '{y:.2f}%'
        }
      }
    },

    series: [{
      name: 'Growth Rate',
      type: 'column',
      data: growthData
    }]
  };

this.annualGrowthUpdateFlag = false;

setTimeout(() => {
  this.annualGrowthUpdateFlag = true;
});
}

async loadDistrictDashboardData() {
  try {
    this.spinner.show();

    // API 1 - District Summary
    const req1 = new basemodel();
    req1.type = '1000';
    req1.param1 = this.selectedDistrictName;
    req1.param2=this.selectedYear

    // API 2 - Sex Ratio at Birth
    const req2 = new basemodel();
        req2.type = '1001';
        req2.param1 = this.selectedDistrictName;
        req2.param2 = '2023';
        req2.param3 = '2025';
    // API 3 - GSWS Sex Ratio
    const req3 = new basemodel();
    req3.type = '1002';
    req3.param1 = this.selectedDistrictName;

    // API 4 - Total Briths and Total Deaths (district-level)
    const req4 = new basemodel();
    req4.type = '1003';
    req4.param1 = this.selectedDistrictName;
    req4.param2 = 0; // keep year-wise line chart district-level even when a mandal is selected
    req4.param3 = 0;
    req4.param4 = 0;

    // API 5 - mandal-wise data
    const req5 = new basemodel();
    req5.type = '100001';
    req5.param1 = this.selectedDistrictName;
    req5.param2=this.selectedYear
    req5.param3=this.selectedMandal ? this.selectedMandal : 0;
    // API 6 - Total Briths and Total Deaths
    const req6 = new basemodel();
    req6.type = '127';
    req6.param1=this.selectedDistrictName;

    // API 7 - Meadin Age Death
    const req7 = new basemodel();
    req7.type = '131';
    req7.param1=this.selectedDistrictName;

    // API 8 - All Mandals Biths and Deaths
    const req8 = new basemodel();
    req8.type = '100301';
    req8.param1=this.selectedDistrictName;
    req8.param2=this.selectedYear;

    // API 9 - Place of Death
    const req9 = new basemodel();
    req9.type = '128';
    req9.param1=this.selectedDistrictName;

    // API 10 - birthShareofBirth
    const req10 = new basemodel();
    req10.type = '132';
    req10.param1=this.selectedDistrictName;

    // API 11 -Percentage of deaths before age 60 
    const req11 = new basemodel();
    req11.type = '129';
    req11.param1=this.selectedDistrictName;

    // API 12 -Percentage of deaths before age 70 
    const req12 = new basemodel();
    req12.type = '130';
    req12.param1=this.selectedDistrictName;

    // API 13 -tfr response 
    const req13 = new basemodel();
    req13.type = '133';
    req13.param1=this.selectedDistrictName;

    // API 14 -exponential growth rate of population Response 
    const req14 = new basemodel();
    req14.type = '134';
    req14.param1=this.selectedDistrictName;

    // API 15 -Age distribution Response 
    const req15 = new basemodel();
    req15.type = '135';
    req15.param1=this.selectedDistrictName;
    req15.param2=this.selectedMandal

    // API 16 -dependecyRatio Response 
    const req16 = new basemodel();
    req16.type = '136';
    req16.param1=this.selectedDistrictName;
    req16.param2=this.selectedMandal

    const [
      districtResponse,
      birthSexRatioResponse,
      sexRatioResponse,
      totalBirthandDeathResponse,
      mandalsResponse,
      shareOfpopulationandshareofBirth,
      medianAgeofDeathResponse,
      allMandaltotalBirthandtotalDeathResponse,
      placeofDeathResponse,
      birthShareofDeathResponse,
      deathbeforeage60Response,
      deathbeforeage70Response,
      tfrResponse,
      annualexponentialResponse,
      ageDistributionResponse,
      dependencyRatioResponse
    ] = await Promise.all([
      this.auth.auth_utilities_rtgs(req1),
      this.auth.auth_utilities_rtgs(req2),
      this.auth.auth_utilities_rtgs(req3),
      this.auth.auth_utilities_rtgs(req4),
      this.auth.auth_utilities_rtgs(req5),
      this.auth.auth_utilities_rtgs(req6),
      this.auth.auth_utilities_rtgs(req7),
      this.auth.auth_utilities_rtgs(req8),
      this.auth.auth_utilities_rtgs(req9),
      this.auth.auth_utilities_rtgs(req10),
      this.auth.auth_utilities_rtgs(req11),
      this.auth.auth_utilities_rtgs(req12),
      this.auth.auth_utilities_rtgs(req13),
      this.auth.auth_utilities_rtgs(req14),
      this.auth.auth_utilities_rtgs(req15),
      this.auth.auth_utilities_rtgs(req16),
    ]);

    // District Summary
    if (districtResponse?.code) {
      var district = districtResponse.Details?.[0] || {};
      this.dashboardSummary = {
  districtName: district.DISTRICT_NAME,
  population2001: district.POP_2001_CEN_IND,
  population2011: district.POP_2011_CEN_IND,
  annualExponantional: district.ANNUAL_EXP_RET_POP_2001_11,
  estimatedPopulation: district.EST_POP_31_DEC_2025,
  totalPopulation: district.EST_POP_31_DEC,
  totalBirths:district.CRS_BIR_IN,
  totalDeaths:district.CRS_DEA_IN,
  birthRate:district.EST_CBR_FOR,
  deathRate:district.EST_CDR_FOR,
  tfr:district.EST_TFR_FOR,
    populationGrowthRate:district.POP_GROW_RATE || 0
};
}else {
  this.dashboardSummary = {
    ...this.dashboardSummary,
    population2001: 0,
    population2011: 0,
    annualExponantional: 0,
    estimatedPopulation: 0,
    totalPopulation: 0,
    totalBirths: 0,
    totalDeaths: 0,
    birthRate: 0,
    deathRate: 0,
    tfr: 0,
    populationGrowthRate: 0
  };
}

    // Table 2.2(a)
    if (birthSexRatioResponse?.code) {
      this.birthSexRatioData =
        birthSexRatioResponse.Details || [];
        this.updateSexRatioCard();
      const mandalMap: any = {};
  this.birthSexRatioData.forEach((item: any) => {
    if (!mandalMap[item.MANDAL_NAME]) {
      mandalMap[item.MANDAL_NAME] = {
        mandalName: item.MANDAL_NAME,
        yearWiseData: {}
      };
    }

    mandalMap[item.MANDAL_NAME].yearWiseData[item.YEAR_YR] = {
      sexRatio: item.SEX_RATIO,
      female: item.FEMALE,
      male: item.MALE
    };
  });
  this.csrMandalList = Object.values(mandalMap);
    }else {
       this.birthSexRatioData = [];
        this.csrMandalList = [];
  this.dashboardSummary.sexRatio = 0;
    }

    // GSWS Sex Ratio
    if (sexRatioResponse?.code) {
      this.sexRatioData =
        sexRatioResponse.Details || [];
        this.mandalList = this.sexRatioData.map((item: any) => ({
    mandalName: item.MANDAL_NAME,
  }));

    }else {
      this.sexRatioData=[];
      this.mandalList=[];
    }
   //Total Births and Total Deaths
     if (totalBirthandDeathResponse?.code) {
       this.totalBirthsandDeaths =totalBirthandDeathResponse.Details || [];
  }else {
    this.totalBirthsandDeaths=[];
  }
  //Mandal-wise data 
if (mandalsResponse?.code) {

  const mandalLists =
    mandalsResponse.Details || [];
    console.log("mandalLists",mandalLists);
    

  if (mandalLists.length > 0) {
    this.dashboardSummary = {
      districtName: mandalLists[0].DISTRICT_NAME,
      population2001: mandalLists[0].POP_2001_CEN_IND,
      population2011: mandalLists[0].POP_2011_CEN_IND,
      annualExponantional: mandalLists[0].ANNUAL_EXP_RET_POP_2001_11,
      estimatedPopulation: mandalLists[0].EST_POP_31_DEC_2025,
      totalPopulation: mandalLists[0].EST_POP_31_DEC,
      totalBirths: mandalLists[0].CRS_BIR_IN,
      totalDeaths: mandalLists[0].CRS_DEA_IN,
      birthRate: mandalLists[0].EST_CBR_FOR,
      deathRate: mandalLists[0].EST_CDR_FOR,
      tfr: mandalLists[0].EST_TFR_FOR,
      sexRatio:
        mandalLists[0].SEX_RATIO || mandalLists[0].sexRatio || this.dashboardSummary.sexRatio || 0,
      populationGrowthRate:
        mandalLists[0].POP_GROW_RATE || 0
    };
  }
} else {
  // Keep district values already loaded
  this.dashboardSummary = {
    ...this.dashboardSummary
  };
}
  //shareOfpopulationandshareofBirth
   if (shareOfpopulationandshareofBirth?.code) {
      this.shareOfpopulationandshareofBirth =shareOfpopulationandshareofBirth.Details || [];
  }else {
     this.shareOfpopulationandshareofBirth=[];
  }
  //MedianAgeof Death Response
     if (medianAgeofDeathResponse?.code) {
      this.medianAgeofDeath =medianAgeofDeathResponse.Details || [];
  }else {
    this.medianAgeofDeath=[];
  }

   //All MandalsTotalbirthandtotalDeath Response
     if (allMandaltotalBirthandtotalDeathResponse?.code) {
      this.allMandalsbirthandDeaths =allMandaltotalBirthandtotalDeathResponse.Details || [];
  }else {
    this.allMandalsbirthandDeaths=[];
  }
   //Place of Death Response
     if (placeofDeathResponse?.code) {
      this.placeOfDeath =placeofDeathResponse.Details || [];
  }else {
     this.placeOfDeath =[];
  }
     //birthShareofDeathResponse Response
     if (birthShareofDeathResponse?.code) {
      this.birthShareofDeath =birthShareofDeathResponse.Details || [];
  }else {
    this.birthShareofDeath=[];
  }
  //deathbeforeage60Response
    if (deathbeforeage60Response?.code) {
      this.deathBeforeAge60 =deathbeforeage60Response.Details || [];
  }else {
    this.deathBeforeAge60=[];
  }
    //deathbeforeage70Response
    if (deathbeforeage70Response?.code) {
      this.deathBeforeAge70 =deathbeforeage70Response.Details || [];
  }else {
    this.deathBeforeAge70=[];
  }
  //tfrResponse
    if (tfrResponse?.code) {
      this.tfrData =tfrResponse.Details || [];
  }else {
    this.tfrData=[];
  }
    //annualexponentialResponseResponse
  if (annualexponentialResponse?.code) {
      this.annualExponentialData =annualexponentialResponse.Details || [];
  }else {
    this.annualExponentialData=[];
  }

  //ageDistributionResponse
if (ageDistributionResponse?.code) {
  this.ageDistributionData =
    ageDistributionResponse.Details || [];

  if (this.selectedMandal) {
    const selectedMandalData =
      this.ageDistributionData.find(
        (x: any) =>
          x.MANDAL_NAME?.trim() ===
          this.selectedMandal?.trim()
      );
    if (selectedMandalData) {
      this.loadAgeWiseChart(
        Number(selectedMandalData.POPULATION_0_14 || 0),
        Number(selectedMandalData.POPULATION_15_59 || 0),
        Number(selectedMandalData.POPULATION_60_PLUS || 0)
      );
    } else {
      this.resetAgeWiseChart();
    }

  } else {
    this.loadPieAgeSexDistributionChart();
  }
}else {
  this.ageDistributionData=[];
  this.resetAgeWiseChart();
}
    //depedencyRation Response
  if (dependencyRatioResponse?.code) {
      this.dependecyRatioData =dependencyRatioResponse.Details || [];
      this.updateDependencyCards();
  }else {
    this.dependecyRatioData=[];
    this.updateDependencyCards();
  }

    // ALL 3 APIs COMPLETED HERE
    this.loadAllCharts();
    this.spinner.hide();
  } catch (error) {
    this.spinner.hide();
    console.error(error);
  }
}
updateSexRatioCard() {
  const yearData = this.birthSexRatioData.filter(
    (x: any) => +x.YEAR_YR === +this.selectedYear
  );

  // ==========================
  // MANDAL MODE
  // ==========================
  if (this.selectedMandal) {

    const mandalData = yearData.find(
      (x: any) =>
        x.MANDAL_NAME?.trim() ===
        this.selectedMandal?.trim()
    );

    if (mandalData) {
      this.dashboardSummary.sexRatio =
        mandalData.SEX_RATIO || 0;
      return;
    }
  }

  // ==========================
  // DISTRICT MODE
  // ==========================

  const totalFemale = yearData.reduce(
    (sum: number, item: any) =>
      sum + Number(item.FEMALE || 0),
    0
  );

  const totalMale = yearData.reduce(
    (sum: number, item: any) =>
      sum + Number(item.MALE || 0),
    0
  );

  this.dashboardSummary.sexRatio =
    totalFemale > 0
      ? Math.round(
          (totalMale / totalFemale) * 100
        )
      : 0;
}
loadAllCharts() {
  this.loadBarChart();
  this.loadLineChart();
  this.loadMedianAgeAtDeathChart();
  this.loadSexRatioChart();
  this.loadBirthSexRatioChart();
  this.loadPopulationBirthShareChart();
  this.loadPlaceOfDeathChart();
  this.loadDeathsBefore60Chart();
  this.loadDeathsBefore70Chart();
  this.loadDeathShareBirthChart();
  //this.loadAgeSexDistributionChart();
  this.loadAnnualGrowthRateChart();
  this.loadTfrChart();
}

loadPieAgeSexDistributionChart() {

  if (!this.ageDistributionData?.length) {
    this.resetAgeWiseChart();
    return;
  }

  const totalAge0to14 =
    this.ageDistributionData.reduce(
      (sum: number, x: any) =>
        sum + Number(x.POPULATION_0_14 || 0),
      0
    );

  const totalAge15to59 =
    this.ageDistributionData.reduce(
      (sum: number, x: any) =>
        sum + Number(x.POPULATION_15_59 || 0),
      0
    );

  const totalAge60Plus =
    this.ageDistributionData.reduce(
      (sum: number, x: any) =>
        sum + Number(x.POPULATION_60_PLUS || 0),
      0
    );

  const count =
    this.ageDistributionData.length;

  this.loadAgeWiseChart(
    totalAge0to14 / count,
    totalAge15to59 / count,
    totalAge60Plus / count
  );
}
updateDependencyCards() {

  if (!this.dependecyRatioData?.length) {
     this.dashboardSummary.childDependency =0;
     this.dashboardSummary.oldAgeDependency=0;
    return;
  }

  // ==========================
  // MANDAL MODE
  // ==========================
  if (this.selectedMandal) {

    const mandalData =
      this.dependecyRatioData.find(
        (x: any) =>
          x.MANDAL_NAME?.trim() ===
          this.selectedMandal?.trim()
      );

    if (mandalData) {

      this.dashboardSummary.childDependency =
        Number(
          mandalData.YOUNG_DEPENDENCY_RATIO || 0
        ).toFixed(2);

      this.dashboardSummary.oldAgeDependency =
        Number(
          mandalData.OLD_DEPENDENCY_RATIO || 0
        ).toFixed(2);
    }

    return;
  }

  // ==========================
  // DISTRICT MODE
  // ==========================

  const totalChildren =
    this.dependecyRatioData.reduce(
      (sum: number, x: any) =>
        sum +
        Number(x.NUMBER_OF_CHILDREN_0_14 || 0),
      0
    );

  const totalWorking =
    this.dependecyRatioData.reduce(
      (sum: number, x: any) =>
        sum +
        Number(x.POPULATION_AGED_15_59 || 0),
      0
    );

  const totalOldAge =
    this.dependecyRatioData.reduce(
      (sum: number, x: any) =>
        sum +
        Number(x.POPULATION_AGED_60_PLUS || 0),
      0
    );

  this.dashboardSummary.childDependency =
    totalWorking > 0
      ? (
          (totalChildren / totalWorking) *
          100
        ).toFixed(2)
      : 0;

  this.dashboardSummary.oldAgeDependency =
    totalWorking > 0
      ? (
          (totalOldAge / totalWorking) *
          100
        ).toFixed(2)
      : 0;
}

}

