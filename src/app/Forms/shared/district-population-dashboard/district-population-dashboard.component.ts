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
  'Alluri Sitharama Raju',
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
  deathShareBirthChartOptions:Highcharts.Options = {};
  ageSexDistributionChartOptions:Highcharts.Options = {};
  tfrChartOptions: Highcharts.Options = {};
  annualGrowthRateChartOptions: Highcharts.Options = {};
  updateBirthChart = false;
  csrMandalList: any[] = [];
  districtData = [

  // =====================================================
  // EAST GODAVARI
  // =====================================================

  {
    districtName: 'East Godavari',
    ageSexDistribution: [
  { ageGroup: '0-4', female: 0.2, male: 0.2 },
  { ageGroup: '5-9', female: 0.2, male: 0.2 },
  { ageGroup: '10-14', female: 0.2, male: 0.2 },
  { ageGroup: '15-19', female: 0.5, male: 0.7 },
  { ageGroup: '20-24', female: 0.8, male: 1.6 },
  { ageGroup: '25-29', female: 0.9, male: 2.0 },
  { ageGroup: '30-34', female: 1.3, male: 3.1 },
  { ageGroup: '35-39', female: 2.1, male: 5.0 },
  { ageGroup: '40-44', female: 3.2, male: 6.0 },
  { ageGroup: '45-49', female: 5.1, male: 7.1 },
  { ageGroup: '50-54', female: 7.0, male: 8.3 },
  { ageGroup: '55-59', female: 9.1, male: 9.1 },
  { ageGroup: '60-64', female: 10.4, male: 10.3 },
  { ageGroup: '65-69', female: 11.5, male: 9.7 },
  { ageGroup: '70-74', female: 15.4, male: 11.8 },
  { ageGroup: '75-79', female: 15.2, male: 12.4 },
  { ageGroup: '80+', female: 17.0, male: 12.5 }
],
         population2001: 1708018,
     population2011:1818849,
     annualExponantional:0.0063,
      ageDistribution: {
  age0To14: 14.94,
  age15To59: 69.58,
  age60Plus: 15.48
},
dependencyRatio: {
  childDependency: 15,
  oldAgeDependency: 15
},
  medianAgeAtDeath: {
    age2023: 66.61,
    age2024: 65.95,
    age2025: 66.18
  },

    districtYearWiseData: {
  districtSexRatio: 1044,
     2023: {
    totalPopulation: 1963922,   // Col 20
    totalBirths: 20654,         // Col 11
    totalDeaths: 16467,         // Col 15
    tfr: 1.29,                  // Col 29
    birthRate: 11.25,           // Col 26
    deathRate: 8.38,            // Col 32
    populationGrowthRate: 0,
    sexRatio: 107
  },

  2024: {
    totalPopulation: 1967431,   // Col 21
    totalBirths: 18891,         // Col 12
    totalDeaths: 16695,         // Col 16
    tfr: 1.19,                  // Col 30
    birthRate: 10.27,           // Col 27
    deathRate: 8.49,            // Col 33
    populationGrowthRate: 0.18,
    sexRatio: 105
  },

  2025: {
    totalPopulation: 1969744,   // Col 22
    totalBirths: 17083,         // Col 13
    totalDeaths: 15958,         // Col 17
    tfr: 1.08,                  // Col 31
    birthRate: 9.28,            // Col 28
    deathRate: 8.10,            // Col 34
    populationGrowthRate: 0.12,
    sexRatio: 107
  },

  2026: {
    totalPopulation: 0,
    totalBirths: 0,
    totalDeaths: 0,
    tfr: 0,
    sexRatio: 0,
    birthRate: 0,
    deathRate: 0
  }

    },

      "mandals": [
    {
      "mandalName": "Anaparthy",
        population2001: 68519,
  population2011: 70859,
  annualExponantional: 0.0034,
      ageDistribution: {
  age0To14: 13.88,
  age15To59: 71.15,
  age60Plus: 14.97
},
dependencyRatio: {
  childDependency: 14,
  oldAgeDependency: 15
},
medianAgeAtDeath: {
  age2023: 67,
  age2024: 68,
  age2025: 68
},
sexRatio:  1059,
  deathsBefore60Percentage:33.0,
  deathsBefore70Percentage: 55.0,
  placeOfDeath: {
  hospital: 20.4,
  other: 79.6
},
tfr: 1.3,
      "yearWiseData": {
         "2023": {
        "totalPopulation": 74873, //col 20
        "totalBirths": 1734, //col 11
        "totalDeaths": 693, //col 15
        "birthRate": 24.77, //col 26
        "deathRate": 9.26, //col 32
        "tfr": 2.76,
         sexRatio: 104 ,
        "populationGrowthRate": 0
      },
      "2024": {
        "totalPopulation": 75784,
        "totalBirths": 1554,
        "totalDeaths": 751,
        "birthRate": 21.93,
        "deathRate": 9.91,
        "tfr": 2.45,
        sexRatio: 106,
        "populationGrowthRate": 1.22
      },
      "2025": {
        "totalPopulation": 76898,
        "totalBirths": 1692,
        "totalDeaths": 695,
        "birthRate": 23.53,
        "deathRate": 9.04,
        "tfr": 2.62,
        sexRatio: 92,
        "populationGrowthRate": 1.47
      },
        "2026": {
          "totalPopulation": 0,
          "totalBirths": 0,
          "totalDeaths": 0,
          "tfr": 0,
          "sexRatio": 0
        }
      }
    },
    {
      "mandalName": "Biccavolu",
        population2001: 67717,
  population2011: 70277,
  annualExponantional: 0.0037,
      ageDistribution: {
  age0To14: 14.64,
  age15To59: 70.64,
  age60Plus: 14.72
},
dependencyRatio: {
  childDependency: 15,
  oldAgeDependency: 15
},
medianAgeAtDeath: {
  age2023: 67,
  age2024: 68,
  age2025: 68
},
sexRatio:  1034,
  deathsBefore60Percentage:35.3,
  deathsBefore70Percentage: 57.2,
  placeOfDeath: {
  hospital: 19.8,
  other: 80.2
},
tfr: 0.8,
      "yearWiseData": {
        "2023": {
        "totalPopulation": 73499,
        "totalBirths": 648,
        "totalDeaths": 603,
        "birthRate": 9.43,
        "deathRate": 8.2,
        "tfr": 1.1,
        sexRatio: 108,
        "populationGrowthRate": 0
      },
      "2024": {
        "totalPopulation": 73502,
        "totalBirths": 607,
        "totalDeaths": 646,
        "birthRate": 8.83,
        "deathRate": 8.79,
        "tfr": 1.03,
        sexRatio: 113,
        "populationGrowthRate": 0.0
      },
      "2025": {
        "totalPopulation": 73332,
        "totalBirths": 443,
        "totalDeaths": 644,
        "birthRate": 6.46,
        "deathRate": 8.78,
        "tfr": 0.78,
        sexRatio: 104,
        "populationGrowthRate": -0.23
      },
        "2026": {
          "totalPopulation": 0,
          "totalBirths": 0,
          "totalDeaths": 0,
          "tfr": 0,
          "sexRatio": 0
        }
      }
    },
    {
      "mandalName": "Chagallu",
        population2001: 64371,
       population2011: 64774,
      annualExponantional: 0.0006,
      ageDistribution: {
  age0To14: 15.79,
  age15To59: 70.38,
  age60Plus: 13.83
},
dependencyRatio: {
  childDependency: 16,
  oldAgeDependency: 14
},
medianAgeAtDeath: {
  age2023: 66,
  age2024: 66,
  age2025: 65
},
sexRatio:  1049,
  deathsBefore60Percentage:37.5,
  deathsBefore70Percentage: 56.0,
  placeOfDeath: {
  hospital: 14.5,
  other: 85.5
},
tfr: 1.1,
      "yearWiseData": {
        "2023": {
        "totalPopulation": 65381,
        "totalBirths": 625,
        "totalDeaths": 538,
        "birthRate": 10.22,
        "deathRate": 8.23,
        "tfr": 1.18,
        sexRatio: 117,
        "populationGrowthRate": 0
      },
      "2024": {
        "totalPopulation": 65427,
        "totalBirths": 619,
        "totalDeaths": 616,
        "birthRate": 10.12,
        "deathRate": 9.42,
        "tfr": 1.17,
        sexRatio: 105,
        "populationGrowthRate": 0.07
      },
      "2025": {
        "totalPopulation": 65577,
        "totalBirths": 657,
        "totalDeaths": 553,
        "birthRate": 10.72,
        "deathRate": 8.43,
        "tfr": 1.24,
        sexRatio: 95,
        "populationGrowthRate": 0.23
      },
        "2026": {
          "totalPopulation": 0,
          "totalBirths": 0,
          "totalDeaths": 0,
          "tfr": 0,
          "sexRatio": 0
        }
      }
    },
    {
      "mandalName": "Devarapalle",
        population2001: 72324,
  population2011: 77971,
  annualExponantional: 0.0075,
      ageDistribution: {
  age0To14: 16.14,
  age15To59: 69.98,
  age60Plus: 13.88
},
dependencyRatio: {
  childDependency: 16,
  oldAgeDependency: 14
},
medianAgeAtDeath: {
  age2023: 66,
  age2024: 65,
  age2025: 65
},
sexRatio:  1056,
  deathsBefore60Percentage:38.8,
  deathsBefore70Percentage: 58.7,
  placeOfDeath: {
  hospital: 16.3,
  other: 83.7
},
tfr: 1.0,
      "yearWiseData": {
       "2023": {
        "totalPopulation": 85242,
        "totalBirths": 703,
        "totalDeaths": 682,
        "birthRate": 8.82,
        "deathRate": 8.0,
        "tfr": 1.03,
        sexRatio: 110 ,
        "populationGrowthRate": 0
      },
      "2024": {
        "totalPopulation": 85320,
        "totalBirths": 727,
        "totalDeaths": 700,
        "birthRate": 9.11,
        "deathRate": 8.2,
        "tfr": 1.06,
        sexRatio: 103,
        "populationGrowthRate": 0.09
      },
      "2025": {
        "totalPopulation": 85365,
        "totalBirths": 673,
        "totalDeaths": 674,
        "birthRate": 8.43,
        "deathRate": 7.9,
        "tfr": 0.99,
        sexRatio: 119,
        "populationGrowthRate": 0.05
      },
    
        "2026": {
          "totalPopulation": 0,
          "totalBirths": 0,
          "totalDeaths": 0,
          "tfr": 0,
          "sexRatio": 0,
        }
      }
    },
    {
      "mandalName": "Gokavaram",
        population2001: 67557,
       population2011: 69596,
      annualExponantional: 0.0030,
      ageDistribution: {
  age0To14: 17.43,
  age15To59: 69.79,
  age60Plus: 12.79
},
dependencyRatio: {
  childDependency: 17,
  oldAgeDependency: 13
},
medianAgeAtDeath: {
  age2023: 65,
  age2024: 63,
  age2025: 65
},
sexRatio: 1036,
  deathsBefore60Percentage:40.0,
  deathsBefore70Percentage: 62.9,
  placeOfDeath: {
  hospital: 22.6,
  other: 77.4
},
tfr: 1.3,
      "yearWiseData": {
        "2023": {
        "totalPopulation": 72370,
        "totalBirths": 852,
        "totalDeaths": 612,
        "birthRate": 12.59,
        "deathRate": 8.46,
        "tfr": 1.44,
        sexRatio: 109,
        "populationGrowthRate": 0
      },
      "2024": {
        "totalPopulation": 72594,
        "totalBirths": 717,
        "totalDeaths": 543,
        "birthRate": 10.56,
        "deathRate": 7.48,
        "tfr": 1.22,
        sexRatio: 109,
        "populationGrowthRate": 0.31
      },
      "2025": {
        "totalPopulation": 72892,
        "totalBirths": 803,
        "totalDeaths": 561,
        "birthRate": 11.78,
        "deathRate": 7.7,
        "tfr": 1.35,
        sexRatio: 125,
        "populationGrowthRate": 0.41
      },
        "2026": {
          "totalPopulation": 0,
          "totalBirths": 0,
          "totalDeaths": 0,
          "tfr": 0,
          "sexRatio": 0
        }
      }
    },
    {
      "mandalName": "Gopalapuram",
        population2001: 59728,
  population2011: 62597,
  annualExponantional: 0.0047,
      ageDistribution: {
  age0To14: 16.20,
  age15To59: 68.39,
  age60Plus: 15.40
},
dependencyRatio: {
  childDependency: 16,
  oldAgeDependency: 15
},
medianAgeAtDeath: {
  age2023: 66,
  age2024: 66,
  age2025: 64
},
 sexRatio: 1055,
   deathsBefore60Percentage:37.2,
  deathsBefore70Percentage: 56.8,
  placeOfDeath: {
  hospital: 17.5,
  other: 82.5
},
 tfr: 1.0,
      "yearWiseData": {
       "2023": {
        "totalPopulation": 66097,
        "totalBirths": 476,
        "totalDeaths": 557,
        "birthRate": 7.7,
        "deathRate": 8.43,
        "tfr": 0.91,
        sexRatio: 97,
        "populationGrowthRate": 0
      },
      "2024": {
        "totalPopulation": 66085,
        "totalBirths": 535,
        "totalDeaths": 584,
        "birthRate": 8.66,
        "deathRate": 8.84,
        "tfr": 1.02,
        sexRatio: 104,
        "populationGrowthRate": -0.02
      },
      "2025": {
        "totalPopulation": 66178,
        "totalBirths": 567,
        "totalDeaths": 513,
        "birthRate": 9.16,
        "deathRate": 7.75,
        "tfr": 1.07,
        sexRatio: 81,
        "populationGrowthRate": 0.14
      },
        "2026": {
          "totalPopulation": 0,
          "totalBirths": 0,
          "totalDeaths": 0,
          "tfr": 0,
        }
      }
    },
    {
      "mandalName": "Kadiam",
        population2001: 83857,
  population2011: 90499,
  annualExponantional: 0.0076,
      ageDistribution: {
  age0To14: 15.46,
  age15To59: 72.94,
  age60Plus: 11.61
},
dependencyRatio: {
  childDependency: 15,
  oldAgeDependency: 12
},
medianAgeAtDeath: {
  age2023: 65,
  age2024: 63,
  age2025: 64
},
sexRatio:  1029,
  deathsBefore60Percentage:41.0,
  deathsBefore70Percentage: 62.9,
  placeOfDeath: {
  hospital: 22.9,
  other: 77.1
},
tfr: 0.9,
      "yearWiseData": {
        "2023": {
        "totalPopulation": 99369,
        "totalBirths": 1080,
        "totalDeaths": 765,
        "birthRate": 11.63,
        "deathRate": 7.7,
        "tfr": 1.34,
        sexRatio: 119,
        "populationGrowthRate": 0
      },
      "2024": {
        "totalPopulation": 99517,
        "totalBirths": 827,
        "totalDeaths": 736,
        "birthRate": 8.89,
        "deathRate": 7.4,
        "tfr": 1.04,
        sexRatio: 96,
        "populationGrowthRate": 0.15
      },
      "2025": {
        "totalPopulation": 99505,
        "totalBirths": 728,
        "totalDeaths": 791,
        "birthRate": 7.83,
        "deathRate": 7.95,
        "tfr": 0.93,
        sexRatio: 116 ,
        "populationGrowthRate": -0.01
      },
        "2026": {
          "totalPopulation": 0,
          "totalBirths": 0,
          "totalDeaths": 0,
          "tfr": 0,
          "sexRatio": 0
        }
      }
    },
    {
      "mandalName": "Korukonda",
        population2001: 76645,
  population2011: 79553,
  annualExponantional: 0.0037,
      ageDistribution: {
  age0To14: 16.85,
  age15To59: 70.65,
  age60Plus: 12.50
},
dependencyRatio: {
  childDependency: 17,
  oldAgeDependency: 12
},
medianAgeAtDeath: {
  age2023: 66,
  age2024: 64.5,
  age2025: 64.5
},
sexRatio: 1017,
  deathsBefore60Percentage:38.3,
  deathsBefore70Percentage: 58.9,
  placeOfDeath: {
  hospital: 19.9,
  other: 80.1
},
tfr: 1.2,
      "yearWiseData": {
        "2023": {
        "totalPopulation": 83281,
        "totalBirths": 860,
        "totalDeaths": 750,
        "birthRate": 11.05,
        "deathRate": 9.01,
        "tfr": 1.27,
        sexRatio: 119,
        "populationGrowthRate": 0
      },
      "2024": {
        "totalPopulation": 83362,
        "totalBirths": 823,
        "totalDeaths": 799,
        "birthRate": 10.56,
        "deathRate": 9.58,
        "tfr": 1.22,
        sexRatio: 96,
        "populationGrowthRate": 0.1
      },
      "2025": {
          population2001: 108159,
  population2011: 108445,
  annualExponantional: 0.0003,
        "totalPopulation": 83414,
        "totalBirths": 720,
        "totalDeaths": 718,
        "birthRate": 9.23,
        "deathRate": 8.61,
        "tfr": 1.08,
        sexRatio: 116,
        "populationGrowthRate": 0.06
      },
        "2026": {
          "totalPopulation": 0,
          "totalBirths": 0,
          "totalDeaths": 0,
          "tfr":0,
          "sexRatio": 0
        }
      }
    },
    {
      "mandalName": "Kovvur",
        population2001: 108159,
  population2011: 108445,
  annualExponantional: 0.0003,
      ageDistribution: {
  age0To14: 15.29,
  age15To59: 70.38,
  age60Plus: 14.33
},
dependencyRatio: {
  childDependency: 15,
  oldAgeDependency: 14
},
medianAgeAtDeath: {
  age2023: 67,
  age2024: 65,
  age2025: 67
},
sexRatio:  1056,
  deathsBefore60Percentage:37.1,
  deathsBefore70Percentage: 56.0,
  placeOfDeath: {
  hospital: 19.1,
  other: 80.9
},
tfr: 1.0,
      "yearWiseData": {
         "2023": {
        "totalPopulation": 108940,
        "totalBirths": 1091,
        "totalDeaths": 1009,
        "birthRate": 10.71,
        "deathRate": 9.26,
        "tfr": 1.24,
        sexRatio: 104,
        "populationGrowthRate": 0
      },
      "2024": {
        "totalPopulation": 109021,
        "totalBirths": 962,
        "totalDeaths": 948,
        "birthRate": 9.44,
        "deathRate": 8.7,
        "tfr": 1.1,
         sexRatio: 106 ,
        "populationGrowthRate": 0.07
      },
      "2025": {
        "totalPopulation": 108957,
        "totalBirths": 889,
        "totalDeaths": 1015,
        "birthRate": 8.73,
        "deathRate": 9.32,
        "tfr": 1.02,
        sexRatio: 103,
        "populationGrowthRate": -0.06
      },
        "2026": {
          "totalPopulation": 110767,
          "totalBirths": 214,
          "totalDeaths": 315,
          "tfr": 0.98,
          "sexRatio": 0
        }
      }
    },
    {
      "mandalName": "Nallajerla",
        population2001: 75031,
  population2011: 80388,
  annualExponantional: 0.0069,
      ageDistribution: {
  age0To14: 15.41,
  age15To59: 69.91,
  age60Plus: 14.68
},
dependencyRatio: {
  childDependency: 15,
  oldAgeDependency: 15
},
medianAgeAtDeath: {
  age2023: 65,
  age2024: 65,
  age2025: 64
},
sexRatio:  1050,
  deathsBefore60Percentage:37.9,
  deathsBefore70Percentage: 58.9,
  placeOfDeath: {
  hospital: 19.1,
  other: 80.9
},
tfr: 1.0,
      "yearWiseData": {
        "2023": {
        "totalPopulation": 87340,
        "totalBirths": 772,
        "totalDeaths": 659,
        "birthRate": 9.45,
        "deathRate": 7.55,
        "tfr": 1.1,
        sexRatio: 105,
        "populationGrowthRate": 0
      },
      "2024": {
        "totalPopulation": 87521,
        "totalBirths": 781,
        "totalDeaths": 654,
        "birthRate": 9.54,
        "deathRate": 7.47,
        "tfr": 1.11,
        sexRatio: 99,
        "populationGrowthRate": 0.21
      },
      "2025": {
        "totalPopulation": 87699,
        "totalBirths": 747,
        "totalDeaths": 621,
        "birthRate": 9.11,
        "deathRate": 7.08,
        "tfr": 1.06,
         sexRatio: 101,
        "populationGrowthRate": 0.2
      },
        "2026": {
          "totalPopulation": 0,
          "totalBirths": 0,
          "totalDeaths": 0,
          "tfr": 0,
          "sexRatio": 0
        }
      }
    },
    {
      "mandalName": "Nidadavole",
        population2001: 111908,
  population2011: 114245,
  annualExponantional: 0.0021,
      ageDistribution: {
  age0To14: 15.84,
  age15To59: 69.88,
  age60Plus: 14.28
},
dependencyRatio: {
  childDependency: 16,
  oldAgeDependency: 14
},
medianAgeAtDeath: {
  age2023: 67,
  age2024: 66,
  age2025: 66
},
sexRatio: 1049,
  deathsBefore60Percentage:35.2,
  deathsBefore70Percentage: 56.6,
  placeOfDeath: {
  hospital: 19.7,
  other: 80.3
},
tfr: 1.1,
      "yearWiseData": {
       "2023": {
        "totalPopulation": 117448,
        "totalBirths": 1271,
        "totalDeaths": 965,
        "birthRate": 11.58,
        "deathRate": 8.22,
        "tfr": 1.33,
        sexRatio: 93,
        "populationGrowthRate": 0
      },
      "2024": {
        "totalPopulation": 117702,
        "totalBirths": 1143,
        "totalDeaths": 968,
        "birthRate": 10.39,
        "deathRate": 8.22,
        "tfr": 1.2,
        sexRatio: 109,
        "populationGrowthRate": 0.22
      },
      "2025": {
        "totalPopulation": 117834,
        "totalBirths": 999,
        "totalDeaths": 937,
        "birthRate": 9.07,
        "deathRate": 7.95,
        "tfr": 1.06,
        sexRatio: 101,
        "populationGrowthRate": 0.11
      },
        "2026": {
          "totalPopulation": 0,
          "totalBirths": 0,
          "totalDeaths": 0,
          "tfr": 0,
          "sexRatio": 0,
        }
      }
    },
    {
      "mandalName": "Peravali",
        population2001: 69312,
  population2011: 70194,
  annualExponantional: 0.0013,
      ageDistribution: {
  age0To14: 15.48,
  age15To59: 68.62,
  age60Plus: 15.89
},
dependencyRatio: {
  childDependency: 15,
  oldAgeDependency: 16
},
medianAgeAtDeath: {
  age2023: 70,
  age2024: 68,
  age2025: 69
},
sexRatio: 1021,
  deathsBefore60Percentage:31.9,
  deathsBefore70Percentage: 50.8,
  placeOfDeath: {
  hospital: 15.6,
  other: 84.4
},
tfr: 1.1,
      "yearWiseData": {
       "2023": {
        "totalPopulation": 71309,
        "totalBirths": 733,
        "totalDeaths": 720,
        "birthRate": 10.99,
        "deathRate": 10.1,
        "tfr": 1.27,
        sexRatio: 108,
        "populationGrowthRate": 0
      },
      "2024": {
        "totalPopulation": 71469,
        "totalBirths": 699,
        "totalDeaths": 587,
        "birthRate": 10.46,
        "deathRate": 8.21,
        "tfr": 1.21,
        sexRatio: 109, 
        "populationGrowthRate": 0.23
      },
      "2025": {
        "totalPopulation": 71566,
        "totalBirths": 635,
        "totalDeaths": 583,
        "birthRate": 9.49,
        "deathRate": 8.15,
        "tfr": 1.1,
        sexRatio: 119, 
        "populationGrowthRate": 0.13
      },
        "2026": {
          "totalPopulation": 0,
          "totalBirths": 0,
          "totalDeaths": 0,
          "tfr": 0,
          "sexRatio": 0
        }
      }
    },
    {
      "mandalName": "Rajahmundry Rural",
        population2001: 137712,
  population2011: 166973,
  annualExponantional: 0.0193,
      ageDistribution: {
  age0To14: 15.20,
  age15To59: 72.54,
  age60Plus: 12.26
},
dependencyRatio: {
  childDependency: 15,
  oldAgeDependency: 12
},
medianAgeAtDeath: {
  age2023: 63,
  age2024: 63,
  age2025: 64
},
sexRatio:  1056,
  deathsBefore60Percentage:40.8,
  deathsBefore70Percentage: 50.7,
  placeOfDeath: {
  hospital: 22.2,
  other: 77.8
},
tfr: 0.9,
      "yearWiseData": {
        "2023": {
        "totalPopulation": 209779,
        "totalBirths": 1771,
        "totalDeaths": 1509,
        "birthRate": 9.03,
        "deathRate": 7.19,
        "tfr": 1.06,
        sexRatio: 106, 
        "populationGrowthRate": 0
      },
      "2024": {
        "totalPopulation": 209992,
        "totalBirths": 1667,
        "totalDeaths": 1570,
        "birthRate": 8.49,
        "deathRate": 7.48,
        "tfr": 1.0,
        sexRatio: 100,
        "populationGrowthRate": 0.1
      },
      "2025": {
        "totalPopulation": 210065,
        "totalBirths": 1428,
        "totalDeaths": 1454,
        "birthRate": 7.27,
        "deathRate": 6.92,
        "tfr": 0.87,
        sexRatio: 112,
        "populationGrowthRate": 0.03
      },
        "2026": {
          "totalPopulation": 0,
          "totalBirths": 0,
          "totalDeaths": 0,
          "tfr": 0,
          "sexRatio": 0
        }
      }
    },
    {
      "mandalName": "Rajahmundry Urban",
        population2001: 315251,
  population2011: 341831,
  annualExponantional: 0.0081,
      ageDistribution: {
  age0To14: 13.53,
  age15To59: 72.08,
  age60Plus: 14.39
},
dependencyRatio: {
  childDependency: 14,
  oldAgeDependency: 14
},
medianAgeAtDeath: {
  age2023: 64,
  age2024: 64,
  age2025: 64
},
sexRatio: 1077,
  deathsBefore60Percentage:39.8,
  deathsBefore70Percentage: 62.5,
  placeOfDeath: {
  hospital: 41.6,
  other: 58.4
},
tfr: 1.0,
      "yearWiseData": {
        "2023": {
        "totalPopulation": 377041,
        "totalBirths": 4034,
        "totalDeaths": 3214,
        "birthRate": 11.44,
        "deathRate": 8.52,
        "tfr": 1.32,
        sexRatio: 112,
        "populationGrowthRate": 0
      },
      "2024": {
        "totalPopulation": 377707,
        "totalBirths": 3644,
        "totalDeaths": 3231,
        "birthRate": 10.32,
        "deathRate": 8.55,
        "tfr": 1.19,
        sexRatio: 105, 
        "populationGrowthRate": 0.18
      },
      "2025": {
        "totalPopulation": 377812,
        "totalBirths": 2915,
        "totalDeaths": 3013,
        "birthRate": 8.25,
        "deathRate": 7.97,
        "tfr": 0.97,
        sexRatio: 112,
        "populationGrowthRate": 0.03
      },
        "2026": {
          "totalPopulation": 0,
          "totalBirths": 0,
          "totalDeaths": 0,
          "tfr": 0,
          "sexRatio": 0
        }
      }
    },
    {
      "mandalName": "Rajanagaram",
        population2001: 92916,
  population2011: 106085,
  annualExponantional: 0.0133,
      ageDistribution: {
  age0To14: 16.16,
  age15To59: 71.82,
  age60Plus: 12.02
},
sexRatio:1011,
  deathsBefore60Percentage:42.2,
  deathsBefore70Percentage: 63.5,
  placeOfDeath: {
  hospital: 24.9,
  other: 75.1
},
tfr: 0.9,
dependencyRatio: {
  childDependency: 16,
  oldAgeDependency: 12
},
medianAgeAtDeath: {
  age2023: 64,
  age2024: 63,
  age2025: 64
},
      "yearWiseData": {
        "2023": {
        "totalPopulation": 124229,
        "totalBirths": 1003,
        "totalDeaths": 807,
        "birthRate": 8.64,
        "deathRate": 6.5,
        "tfr": 1.01,
        sexRatio: 119,
        "populationGrowthRate": 0
      },
      "2024": {
        "totalPopulation": 124389,
        "totalBirths": 1031,
        "totalDeaths": 942,
        "birthRate": 8.86,
        "deathRate": 7.57,
        "tfr": 1.04,
        sexRatio: 117,
        "populationGrowthRate": 0.13
      },
      "2025": {
        "totalPopulation": 124470,
        "totalBirths": 905,
        "totalDeaths": 887,
        "birthRate": 7.78,
        "deathRate": 7.13,
        "tfr": 0.92,
        sexRatio: 114,
        "populationGrowthRate": 0.07
      },
        "2026": {
          "totalPopulation": 0,
          "totalBirths": 0,
          "totalDeaths": 0,
          "tfr": 0
        }
      }
    },
    {
      "mandalName": "Rangampeta",
        population2001: 54623,
  population2011: 57106,
  annualExponantional: 0.0044,
      ageDistribution: {
  age0To14: 15.94,
  age15To59: 70.50,
  age60Plus: 13.55
},
dependencyRatio: {
  childDependency: 16,
  oldAgeDependency: 14
},
medianAgeAtDeath: {
  age2023: 67,
  age2024: 68,
  age2025: 67.5
},
sexRatio:  1001,
  deathsBefore60Percentage:35.8,
  deathsBefore70Percentage: 55.4,
  placeOfDeath: {
  hospital: 22.3,
  other: 77.7
},
tfr: 1.0,
      "yearWiseData": {
        "2023": {
        "totalPopulation": 60222,
        "totalBirths": 537,
        "totalDeaths": 521,
        "birthRate": 9.54,
        "deathRate": 8.65,
        "tfr": 1.11,
        sexRatio: 95,
        "populationGrowthRate": 0
      },
      "2024": {
        "totalPopulation": 60316,
        "totalBirths": 547,
        "totalDeaths": 491,
        "birthRate": 9.7,
        "deathRate": 8.14,
        "tfr": 1.13,
        sexRatio: 113,
        "populationGrowthRate": 0.16
      },
      "2025": {
        "totalPopulation": 60360,
        "totalBirths": 462,
        "totalDeaths": 450,
        "birthRate": 8.19,
        "deathRate": 7.46,
        "tfr": 0.96,
        sexRatio: 93,
        "populationGrowthRate": 0.07
      },
         "2026": {
          "totalPopulation": 0,
          "totalBirths": 0,
          "totalDeaths": 0,
          "tfr": 0,
          "sexRatio": 0
        }
      }
    },
    {
      "mandalName": "Seethanagaram",
        population2001: 56331,
  population2011: 58182,
  annualExponantional: 0.0032,
      ageDistribution: {
  age0To14: 14.29,
  age15To59: 69.69,
  age60Plus: 15.31
},
sexRatio:  1023,
  deathsBefore60Percentage:33.0,
  deathsBefore70Percentage: 52.8,
  placeOfDeath: {
  hospital: 17.0,
  other: 83.0
},
tfr: 1.2,
dependencyRatio: {
  childDependency: 15,
  oldAgeDependency: 15
},
medianAgeAtDeath: {
  age2023: 68,
  age2024: 68,
  age2025: 69
},
      "yearWiseData": {
        "2023": {
        "totalPopulation": 69199,
        "totalBirths": 827,
        "totalDeaths": 698,
        "birthRate": 12.78,
        "deathRate": 10.09,
        "tfr": 1.46,
         sexRatio: 105,
        "populationGrowthRate": 0
      },
      "2024": {
        "totalPopulation": 69361,
        "totalBirths": 777,
        "totalDeaths": 669,
        "birthRate": 11.98,
        "deathRate": 9.65,
        "tfr": 1.37,
        sexRatio: 102,
        "populationGrowthRate": 0.23
      },
      "2025": {
        "totalPopulation": 69404,
        "totalBirths": 674,
        "totalDeaths": 677,
        "birthRate": 10.39,
        "deathRate": 9.75,
        "tfr": 1.2,
        sexRatio: 112,
        "populationGrowthRate": 0.06
      },
        "2026": {
          "totalPopulation": 70552,
          "totalBirths": 137,
          "totalDeaths": 200,
          "tfr": 1.15,
          "sexRatio": 0,
        }
      }
    },
    {
      "mandalName": "Tallapudi",
        population2001: 54477,
  population2011: 52785,
  annualExponantional: -0.0032,
      ageDistribution: {
  age0To14: 15.07,
  age15To59: 69.23,
  age60Plus: 15.70
},
dependencyRatio: {
  childDependency: 15,
  oldAgeDependency: 16
},
medianAgeAtDeath: {
  age2023: 65.5,
  age2024: 68,
  age2025: 67
},
 sexRatio:  1041,
   deathsBefore60Percentage:37.0,
  deathsBefore70Percentage: 55.2,
  placeOfDeath: {
  hospital: 16.8,
  other: 83.2
},
 tfr: 1.4,
      "yearWiseData": {
       "2023": {
        "totalPopulation": 51490,
        "totalBirths": 1014,
        "totalDeaths": 459,
        "birthRate": 21.06,
        "deathRate": 8.91,
        "tfr": 2.35,
        sexRatio: 102,
        "populationGrowthRate": 0
      },
      "2024": {
        "totalPopulation": 51596,
        "totalBirths": 602,
        "totalDeaths": 537,
        "birthRate": 12.48,
        "deathRate": 10.41,
        "tfr": 1.43,
        sexRatio: 111,
        "populationGrowthRate": 0.21
      },
      "2025": {
        "totalPopulation": 51688,
        "totalBirths": 561,
        "totalDeaths": 508,
        "birthRate": 11.61,
        "deathRate": 9.83,
        "tfr": 1.33,
        sexRatio: 109,
        "populationGrowthRate": 0.18
      },
        "2026": {
          "totalPopulation": 0,
          "totalBirths": 0,
          "totalDeaths": 0,
          "tfr": 0
        }
      }
    },
    {
      "mandalName": "Undrajavaram",
        population2001: 71580,
  population2011: 76489,
  annualExponantional: 0.0066,
      ageDistribution: {
  age0To14: 14.46,
  age15To59: 69.50,
  age60Plus: 16.05
},
dependencyRatio: {
  childDependency: 14,
  oldAgeDependency: 16
},
medianAgeAtDeath: {
  age2023: 70.5,
  age2024: 70,
  age2025: 70
},
 sexRatio:  1046,
   deathsBefore60Percentage:31.4,
  deathsBefore70Percentage: 48.1,
  placeOfDeath: {
  hospital: 15.6,
  other: 84.4
},
 tfr: 0.9,
      "yearWiseData": {
        "2023": {
        "totalPopulation": 82647,
        "totalBirths": 621,
        "totalDeaths": 706,
        "birthRate": 8.04,
        "deathRate": 8.54,
        "tfr": 0.95,
        sexRatio: 109,
        "populationGrowthRate": 0
      },
      "2024": {
        "totalPopulation": 82597,
        "totalBirths": 629,
        "totalDeaths": 723,
        "birthRate": 8.14,
        "deathRate": 8.75,
        "tfr": 0.96,
        sexRatio: 96,
        "populationGrowthRate": -0.06
      },
      "2025": {
        "totalPopulation": 82558,
        "totalBirths": 584,
        "totalDeaths": 664,
        "birthRate": 7.57,
        "deathRate": 8.04,
        "tfr": 0.9,
        sexRatio: 98,
        "populationGrowthRate": -0.05
      },
        "2026": {
          "totalPopulation": 0,
          "totalBirths": 0,
          "totalDeaths": 0,
          "tfr": 0,
          "sexRatio": 0
        }
      
    }
  }

  ],
  },



  // =====================================================
  // WEST GODAVARI
  // =====================================================

  {
    districtName: 'West Godavari',
      ageSexDistribution: [
    { ageGroup: '0-4', female: 0.15, male: 0.10 },
    { ageGroup: '5-9', female: 0.15, male: 0.16 },
    { ageGroup: '10-14', female: 0.18, male: 0.20 },
    { ageGroup: '15-19', female: 0.35, male: 0.59 },
    { ageGroup: '20-24', female: 0.60, male: 1.36 },
    { ageGroup: '25-29', female: 0.75, male: 1.52 },
    { ageGroup: '30-34', female: 1.13, male: 2.51 },
    { ageGroup: '35-39', female: 1.56, male: 4.13 },
    { ageGroup: '40-44', female: 2.70, male: 5.02 },
    { ageGroup: '45-49', female: 4.49, male: 6.17 },
    { ageGroup: '50-54', female: 6.27, male: 7.69 },
    { ageGroup: '55-59', female: 8.30, male: 9.14 },
    { ageGroup: '60-64', female: 9.56, male: 9.71 },
    { ageGroup: '65-69', female: 10.59, male: 9.40 },
    { ageGroup: '70-74', female: 14.52, male: 12.25 },
    { ageGroup: '75-79', female: 16.39, male: 13.80 },
    { ageGroup: '80+', female: 22.30, male: 16.26 }
  ],
     population2001: 1827907,
     population2011:1844898,
     annualExponantional:0.0009,
    ageDistribution: {
  age0To14: 14.94,
  age15To59: 69.58,
  age60Plus: 15.48
},
dependencyRatio: {
  childDependency: 15,
  oldAgeDependency: 15
},
medianAgeAtDeath: {
  age2023: 69.7,
  age2024: 68.8,
  age2025: 68.4
},
    districtYearWiseData: {

  2023: {
    totalPopulation: 1870061,
    totalBirths: 19713,
    totalDeaths: 16087,
    tfr: 1.07,
    sexRatio: 104,
    birthRate: 11.27,
    deathRate: 8.60,
    populationGrowthRate: 0
  },

  2024: {
    totalPopulation: 1872360,
    totalBirths: 17172,
    totalDeaths: 16067,
    tfr: 1.07,
    sexRatio: 104,
    birthRate: 9.81,
    deathRate: 8.58,
    populationGrowthRate: -0.01
  },

  2025: {
    totalPopulation: 1873726,
    totalBirths: 15786,
    totalDeaths: 15517,
    tfr: 1.07,
    sexRatio: 105,
    birthRate: 9.01,
    deathRate: 8.28,
     populationGrowthRate: -0.07
  },
  2026: {
  totalPopulation: 0,
  totalBirths: 0,
  totalDeaths: 0,
  tfr: 0,
  sexRatio: 0,
  birthRate: 0,
  deathRate: 0,
  populationGrowthRate: 0
}

    },

    mandals: [

    {
      "mandalName": "Achanta",
        population2001: 63358,
  population2011: 60711,
  annualExponantional: -0.0043,
      ageDistribution: {
      age0To14: 14.96,
      age15To59: 69.27,
      age60Plus: 15.78
    },
    dependencyRatio: {
  childDependency: 15,
  oldAgeDependency: 16
},
medianAgeAtDeath: {
  age2023: 70,
  age2024: 69,
  age2025: 70
},
  sexRatio: 1012,
  deathsBefore60Percentage:30.4,
  deathsBefore70Percentage: 50.7,
  placeOfDeath: {
  hospital: 14.63,
  other: 85.37
},
tfr: 1.08,
      "yearWiseData": {
        2023: {
    totalPopulation: 57818,
    totalBirths: 567,
    totalDeaths: 531,
    birthRate: 9.81,
    deathRate: 9.18,
    tfr: 1.14,
    sexRatio: 97,
    populationGrowthRate: 0
  },
  2024: {
    totalPopulation: 57890,
    totalBirths: 542,
    totalDeaths: 507,
    birthRate: 10.01,
    deathRate: 8.76,
    tfr: 1.16,
    sexRatio: 97,
    populationGrowthRate: 0.12
  },
  2025: {
    totalPopulation: 57889,
    totalBirths: 470,
    totalDeaths: 504,
    birthRate: 8.68,
    deathRate: 8.71,
    tfr: 1.02,
    sexRatio: 121,
    populationGrowthRate: 0.00
  },
        "2026": {
          totalPopulation: 0,
          totalBirths: 0,
          totalDeaths: 0,
          tfr: 0,
          sexRatio: 0,
          populationGrowthRate: 0
        }
      }
    },
    {
      "mandalName": "Akividu",
        population2001: 74766,
  population2011: 73889,
  annualExponantional: -0.0012,
      ageDistribution: {
  age0To14: 15.38,
  age15To59: 69.60,
  age60Plus: 15.02
},
dependencyRatio: {
  childDependency: 15,
  oldAgeDependency: 15
},
medianAgeAtDeath: {
  age2023: 69,
  age2024: 68,
  age2025: 69
},
  sexRatio:1056,
  deathsBefore60Percentage:32.8,
  deathsBefore70Percentage: 52.2,
    placeOfDeath: {
  hospital: 17.34,
  other: 82.66
},
tfr: 1.05,
      "yearWiseData": {
         2023: {
    totalPopulation: 73084,
    totalBirths: 763,
    totalDeaths: 604,
    birthRate: 10.45,
    deathRate: 8.26,
    tfr: 1.21,
    sexRatio: 113,
    populationGrowthRate: 0
  },
  2024: {
    totalPopulation: 73216,
    totalBirths: 677,
    totalDeaths: 593,
    birthRate: 9.89,
    deathRate: 8.10,
    tfr: 1.15,
    sexRatio: 112,
    populationGrowthRate: 0.18
  },
  2025: {
    totalPopulation: 73252,
    totalBirths: 604,
    totalDeaths: 610,
    birthRate: 8.82,
    deathRate: 8.33,
    tfr: 1.03,
    sexRatio: 106,
    populationGrowthRate: 0.05
  },
        "2026": {
          totalPopulation: 0,
          totalBirths: 0,
          totalDeaths: 0,
          tfr: 0,
          sexRatio: 0,
          populationGrowthRate: 0
        }
      }
    },
    {
      "mandalName": "Attili",
        population2001: 68196,
  population2011: 68881,
  annualExponantional: 0.0010,
      ageDistribution: {
      age0To14: 13.98,
      age15To59: 70.74,
      age60Plus: 15.28
    },
    dependencyRatio: {
  childDependency: 16,
  oldAgeDependency: 15
},
medianAgeAtDeath: {
  age2023: 67,
  age2024: 67,
  age2025: 66
},
  sexRatio:1034,
  tfr: 1.10,
  deathsBefore60Percentage:31.1,
  deathsBefore70Percentage: 51.6,
    placeOfDeath: {
  hospital: 16.14,
  other: 83.86,
},
      "yearWiseData": {
       2023: {
    totalPopulation: 69811,
    totalBirths: 704,
    totalDeaths: 637,
    birthRate: 10.09,
    deathRate: 9.12,
    tfr: 1.17,
    sexRatio: 94,
    populationGrowthRate: 0
  },
  2024: {
    totalPopulation: 69830,
    totalBirths: 636,
    totalDeaths: 661,
    birthRate: 9.74,
    deathRate: 9.47,
    tfr: 1.13,
    sexRatio: 106,
    populationGrowthRate: 0.03
  },
  2025: {
    totalPopulation: 69876,
    totalBirths: 642,
    totalDeaths: 641,
    birthRate: 9.83,
    deathRate: 9.17,
    tfr: 1.14,
    sexRatio: 96,
    populationGrowthRate: 0.07
  },
        "2026": {
        totalPopulation: 0,
        totalBirths: 0,
        totalDeaths: 0,
        tfr: 0,
        sexRatio: 0,
        populationGrowthRate: 0
        }
      }
    },
    {
      "mandalName": "Bhimavaram",
        population2001: 219212,
  population2011: 226497,
  annualExponantional: 0.0033,
      ageDistribution: {
  age0To14: 13.98,
  age15To59: 70.74,
  age60Plus: 15.28
},
dependencyRatio: {
  childDependency: 14,
  oldAgeDependency: 15
},
medianAgeAtDeath: {
  age2023: 67,
  age2024: 67,
  age2025: 66
},
  sexRatio: 1066,
  tfr: 0.96,
  deathsBefore60Percentage:35.1,
  deathsBefore70Percentage: 55.2,
      placeOfDeath: {
  hospital: 25.28,
  other: 74.72,
},
      "yearWiseData": {
        2023: {
    totalPopulation: 236102,
    totalBirths: 2399,
    totalDeaths: 1830,
    birthRate: 10.16,
    deathRate: 7.75,
    tfr: 1.18,
    sexRatio: 100,
    populationGrowthRate: 0
  },
  2024: {
    totalPopulation: 236558,
    totalBirths: 2069,
    totalDeaths: 1757,
    birthRate: 9.35,
    deathRate: 7.43,
    tfr: 1.09,
    sexRatio: 100,
    populationGrowthRate: 0.19
  },
  2025: {
    totalPopulation: 236735,
    totalBirths: 1820,
    totalDeaths: 1769,
    birthRate: 8.22,
    deathRate: 7.47,
    tfr: 0.97,
    sexRatio: 110,
    populationGrowthRate: 0.07
  },
        "2026": {
          totalPopulation: 0,
          totalBirths: 0,
          totalDeaths: 0,
          tfr: 0,
          sexRatio: 0,
          populationGrowthRate: 0
        }
      }
    },
    {
      "mandalName": "Ganapavaram",
        population2001: 66656,
  population2011: 64963,
  annualExponantional: -0.0026,
      medianAgeAtDeath: {
  age2023: 70,
  age2024: 69,
  age2025: 69
},
      ageDistribution: {
        age0To14: 14.89,
        age15To59: 68.77,
        age60Plus: 16.34
      },
      dependencyRatio: {
  childDependency: 15,
  oldAgeDependency: 16
},
  sexRatio: 1024,
  tfr: 0.88,
  deathsBefore60Percentage:31.3,
  deathsBefore70Percentage: 51.6,
      placeOfDeath: {
  hospital: 14.85,
  other: 85.15,
},
      "yearWiseData": {
         2023: {
    totalPopulation: 62912,
    totalBirths: 423,
    totalDeaths: 569,
    birthRate: 6.72,
    deathRate: 9.04,
    tfr: 0.81,
    sexRatio: 92,
    populationGrowthRate: 0
  },
  2024: {
    totalPopulation: 62877,
    totalBirths: 534,
    totalDeaths: 606,
    birthRate: 9.08,
    deathRate: 9.64,
    tfr: 1.06,
    sexRatio: 96,
    populationGrowthRate: -0.06
  },
  2025: {
    totalPopulation: 62836,
    totalBirths: 474,
    totalDeaths: 548,
    birthRate: 8.07,
    deathRate: 8.72,
    tfr: 0.95,
    sexRatio: 103,
    populationGrowthRate: -0.07
  },
        "2026": {
        totalPopulation: 0,
        totalBirths: 0,
        totalDeaths: 0,
        tfr: 0,
        sexRatio: 0,
        populationGrowthRate: 0
        }
      }
    },
    {
      "mandalName": "Iragavaram",
        population2001: 66292,
  population2011: 65831,
  annualExponantional: -0.0007,
      medianAgeAtDeath: {
  age2023: 70,
  age2024: 70,
  age2025: 72
},
      ageDistribution: {
        age0To14: 15.74,
        age15To59: 68.85,
        age60Plus: 15.41
      },
      dependencyRatio: {
  childDependency: 16,
  oldAgeDependency: 15
},
  sexRatio: 1017,
  tfr: 1.04,
  deathsBefore60Percentage:29.8,
  deathsBefore70Percentage: 48.2,
        placeOfDeath: {
  hospital: 13.74,
  other: 86.26,
},
      "yearWiseData": {
         2023: {
    totalPopulation: 66131,
    totalBirths: 701,
    totalDeaths: 615,
    birthRate: 10.62,
    deathRate: 9.30,
    tfr: 1.22,
    sexRatio: 96,
    populationGrowthRate: 0
  },
  2024: {
    totalPopulation: 66234,
    totalBirths: 648,
    totalDeaths: 598,
    birthRate: 9.79,
    deathRate: 9.03,
    tfr: 1.16,
    sexRatio: 95,
    populationGrowthRate: 0.16
  },
  2025: {
    totalPopulation: 66291,
    totalBirths: 587,
    totalDeaths: 604,
    birthRate: 8.87,
    deathRate: 9.11,
    tfr: 1.07,
    sexRatio: 112,
    populationGrowthRate: 0.09
  },
        "2026": {
            totalPopulation: 0,
          totalBirths: 0,
          totalDeaths: 0,
          tfr:0,
          sexRatio: 0,
          populationGrowthRate: 0,
        }
      }
    },
    {
      "mandalName": "Kalla",
        population2001: 68867,
  population2011: 68118,
  annualExponantional: -0.0011,
      ageDistribution: {
        age0To14: 15.42,
        age15To59: 68.82,
        age60Plus: 15.76
      },
      dependencyRatio: {
  childDependency: 15,
  oldAgeDependency: 16
},
medianAgeAtDeath: {
  age2023: 72,
  age2024: 69,
  age2025: 69
},
  sexRatio:1041,
  tfr: 1.17,
  deathsBefore60Percentage:32.6,
  deathsBefore70Percentage: 50.5,
          placeOfDeath: {
  hospital: 15.77,
  other: 84.23,
},
      "yearWiseData": {
        2023: {
    totalPopulation: 70528,
    totalBirths: 687,
    totalDeaths: 602,
    birthRate: 9.74,
    deathRate: 8.54,
    tfr: 1.15,
    sexRatio: 98,
    populationGrowthRate: 0
  },
  2024: {
    totalPopulation: 70601,
    totalBirths: 635,
    totalDeaths: 591,
    birthRate: 9.00,
    deathRate: 8.37,
    tfr: 1.09,
    sexRatio: 106,
    populationGrowthRate: 0.10
  },
  2025: {
    totalPopulation: 70645,
    totalBirths: 581,
    totalDeaths: 603,
    birthRate: 8.24,
    deathRate: 8.54,
    tfr: 1.01,
    sexRatio: 100,
    populationGrowthRate: 0.06
  },
        "2026": {
             totalPopulation: 0,
            totalBirths: 0,
            totalDeaths: 0,
            tfr: 0,
            sexRatio: 0,
            populationGrowthRate: 0
        }
      }
    },
    {
      "mandalName": "Mogalthur",
        population2001: 73136,
  population2011: 72255,
  annualExponantional: -0.0012,
        ageDistribution: {
        age0To14: 15.97,
        age15To59: 68.53,
        age60Plus: 15.50
      },
      dependencyRatio: {
  childDependency: 16,
  oldAgeDependency: 16
},
medianAgeAtDeath: {
  age2023: 70,
  age2024: 70,
  age2025: 69
},
  sexRatio:1022,
  tfr: 1.14,
  deathsBefore60Percentage:32.0,
  deathsBefore70Percentage: 49.2,
            placeOfDeath: {
  hospital: 16.1,
  other: 83.9,
},
      "yearWiseData": {
       2023: {
    totalPopulation: 76784,
    totalBirths: 792,
    totalDeaths: 648,
    birthRate: 10.33,
    deathRate: 8.44,
    tfr: 1.20,
    sexRatio: 104,
    populationGrowthRate: 0
  },
  2024: {
    totalPopulation: 76928,
    totalBirths: 734,
    totalDeaths: 671,
    birthRate: 9.57,
    deathRate: 8.72,
    tfr: 1.14,
    sexRatio: 104,
    populationGrowthRate: 0.19
  },
  2025: {
    totalPopulation: 76991,
    totalBirths: 668,
    totalDeaths: 702,
    birthRate: 8.71,
    deathRate: 9.12,
    tfr: 1.05,
    sexRatio: 95,
    populationGrowthRate: 0.08
  },
        "2026": {
            totalPopulation: 0,
            totalBirths: 0,
            totalDeaths: 0,
            tfr: 0,
            sexRatio: 0,
            populationGrowthRate: 0
        }
      }
    },
    {
      "mandalName": "Narasapuram",
        population2001: 139084,
  population2011: 138741,
  annualExponantional: -0.0002,
         ageDistribution: {
        age0To14: 16.21,
        age15To59: 68.61,
        age60Plus: 15.18
      },
      medianAgeAtDeath: {
  age2023: 70,
  age2024: 70,
  age2025: 69
},
      dependencyRatio: {
  childDependency: 16,
  oldAgeDependency: 15
},
  sexRatio: 1003,
  tfr: 1.12,
  deathsBefore60Percentage:31.2,
  deathsBefore70Percentage: 49.9,
              placeOfDeath: {
  hospital: 21.3,
  other: 78.7,
},
      "yearWiseData": {
       2023: {
    totalPopulation: 81162,
    totalBirths: 805,
    totalDeaths: 701,
    birthRate: 9.92,
    deathRate: 8.64,
    tfr: 1.17,
    sexRatio: 109,
    populationGrowthRate: 0
  },
  2024: {
    totalPopulation: 81266,
    totalBirths: 741,
    totalDeaths: 688,
    birthRate: 9.12,
    deathRate: 8.47,
    tfr: 1.11,
    sexRatio: 103,
    populationGrowthRate: 0.13
  },
  2025: {
    totalPopulation: 81319,
    totalBirths: 682,
    totalDeaths: 703,
    birthRate: 8.39,
    deathRate: 8.65,
    tfr: 1.03,
    sexRatio: 110,
    populationGrowthRate: 0.07
  },
        "2026": {
             totalPopulation: 0,
            totalBirths: 0,
            totalDeaths: 0,
            tfr: 0,
            sexRatio: 0,
            populationGrowthRate: 0
        }
      }
    },
    {
      "mandalName": "Palacoderu",
        population2001: 65648,
  population2011: 66119,
  annualExponantional: 0.0007,
        ageDistribution: {
        age0To14: 14.78,
        age15To59: 69.05,
        age60Plus: 16.17
      },
      medianAgeAtDeath: {
  age2023: 70,
  age2024: 69,
  age2025: 66
},
      dependencyRatio: {
  childDependency: 15,
  oldAgeDependency: 16
},
  sexRatio: 1050,
  tfr: 1.07,
  deathsBefore60Percentage:32.2,
  deathsBefore70Percentage: 51.0,
                placeOfDeath: {
  hospital: 15.02,
  other: 84.98,
},
      "yearWiseData": {
        2023: {
    totalPopulation: 67614,
    totalBirths: 613,
    totalDeaths: 548,
    birthRate: 9.06,
    deathRate: 8.10,
    tfr: 1.08,
    sexRatio: 104,
    populationGrowthRate: 0
  },
  2024: {
    totalPopulation: 67679,
    totalBirths: 589,
    totalDeaths: 561,
    birthRate: 8.70,
    deathRate: 8.29,
    tfr: 1.05,
    sexRatio: 103,
    populationGrowthRate: 0.10
  },
  2025: {
    totalPopulation: 67707,
    totalBirths: 541,
    totalDeaths: 579,
    birthRate: 7.99,
    deathRate: 8.55,
    tfr: 0.98,
    sexRatio: 104,
    populationGrowthRate: 0.04
  },
        "2026": {
           totalPopulation: 0,
          totalBirths: 0,
          totalDeaths: 0,
          tfr: 0,
          sexRatio: 0,
          populationGrowthRate: 0
        }
      }
    },
    {
      "mandalName": "Palacole",
        population2001: 126300,
  population2011: 129717,
  annualExponantional: 0.0027,
      medianAgeAtDeath: {
      age2023: 68,
      age2024: 68,
      age2025: 67
   },
      ageDistribution: {
      age0To14: 15.27,
      age15To59: 69.74,
      age60Plus: 14.98
    },
    dependencyRatio: {
  childDependency: 15,
  oldAgeDependency: 16
},
  sexRatio:1054,
  tfr: 1.01,
  deathsBefore60Percentage:33.9,
  deathsBefore70Percentage: 53.8,
    placeOfDeath: {
  hospital: 21.55,
  other: 78.45,
},
      "yearWiseData": {
        2023: {
    totalPopulation: 131684,
    totalBirths: 1316,
    totalDeaths: 1128,
    birthRate: 10.05,
    deathRate: 8.57,
    tfr: 1.18,
    sexRatio: 106,
    populationGrowthRate: 0
  },
  2024: {
    totalPopulation: 131872,
    totalBirths: 1235,
    totalDeaths: 1141,
    birthRate: 9.42,
    deathRate: 8.65,
    tfr: 1.13,
    sexRatio: 105,
    populationGrowthRate: 0.14
  },
  2025: {
    totalPopulation: 131966,
    totalBirths: 1134,
    totalDeaths: 1172,
    birthRate: 8.64,
    deathRate: 8.88,
    tfr: 1.05,
    sexRatio: 108,
    populationGrowthRate: 0.07
  },
        "2026": {
          totalPopulation: 0,
          totalBirths: 0,
          totalDeaths: 0,
          tfr: 0,
          sexRatio: 0,
          populationGrowthRate: 0
        }
      }
    },
    {
      "mandalName": "Pentapadu",
        population2001: 71164,
  population2011: 70458,
  annualExponantional: -0.0010,
        ageDistribution: {
        age0To14: 15.27,
        age15To59: 69.74,
        age60Plus: 14.98
      },
      dependencyRatio: {
  childDependency: 15,
  oldAgeDependency: 15
},
medianAgeAtDeath: {
  age2023: 69,
  age2024: 69,
  age2025: 69
},
  sexRatio: 1034,
  tfr: 1.05,
  deathsBefore60Percentage:33.0,
  deathsBefore70Percentage: 53.2,
      placeOfDeath: {
  hospital: 16.28,
  other: 83.72,
},
      "yearWiseData": {
        2023: {
    totalPopulation: 69624,
    totalBirths: 692,
    totalDeaths: 584,
    birthRate: 9.94,
    deathRate: 8.39,
    tfr: 1.16,
    sexRatio: 103,
    populationGrowthRate: 0
  },
  2024: {
    totalPopulation: 69732,
    totalBirths: 638,
    totalDeaths: 591,
    birthRate: 9.15,
    deathRate: 8.47,
    tfr: 1.11,
    sexRatio: 101,
    populationGrowthRate: 0.16
  },
  2025: {
    totalPopulation: 69779,
    totalBirths: 584,
    totalDeaths: 607,
    birthRate: 8.38,
    deathRate: 8.70,
    tfr: 1.02,
    sexRatio: 105,
    populationGrowthRate: 0.07
  },
        "2026": {
            totalPopulation: 0,
            totalBirths: 0,
            totalDeaths: 0,
            tfr: 0,
            sexRatio: 0,
            populationGrowthRate: 0,
        }
      }
    },
    {
      "mandalName": "Penugonda",
        population2001: 68755,
  population2011: 69317,
  annualExponantional: 0.0008,
        ageDistribution: {
        age0To14: 16.03,
        age15To59: 70.25,
        age60Plus: 13.72
      },
      dependencyRatio: {
  childDependency: 16,
  oldAgeDependency: 14
},
medianAgeAtDeath: {
  age2023: 67,
  age2024: 67,
  age2025: 66
},
  sexRatio: 1048,
  tfr: 1.20,
  deathsBefore60Percentage:35.4,
  deathsBefore70Percentage: 54.7,
      placeOfDeath: {
  hospital: 17.66,
  other: 82.34,
},
      "yearWiseData": {
       2023: {
    totalPopulation: 69842,
    totalBirths: 748,
    totalDeaths: 522,
    birthRate: 10.71,
    deathRate: 7.47,
    tfr: 1.24,
    sexRatio: 95,
    populationGrowthRate: 0
  },
  2024: {
    totalPopulation: 70068,
    totalBirths: 693,
    totalDeaths: 548,
    birthRate: 9.90,
    deathRate: 7.82,
    tfr: 1.18,
    sexRatio: 97,
    populationGrowthRate: 0.32
  },
  2025: {
    totalPopulation: 70213,
    totalBirths: 635,
    totalDeaths: 574,
    birthRate: 9.06,
    deathRate: 8.18,
    tfr: 1.10,
    sexRatio: 102,
    populationGrowthRate: 0.21
  },
        "2026": {
             totalPopulation: 0,
            totalBirths: 0,
            totalDeaths: 0,
            tfr: 0,
            sexRatio: 0,
            populationGrowthRate: 0
        }
      }
    },
    
    {
      "mandalName": "Penumantra",
        population2001: 62190,
      population2011: 60153,
      annualExponantional: -0.0033,
        ageDistribution: {
        age0To14: 15.24,
        age15To59: 68.47,
        age60Plus: 16.29
      },
      dependencyRatio: {
  childDependency: 15,
  oldAgeDependency: 16
},
medianAgeAtDeath: {
  age2023: 69,
  age2024: 69,
  age2025: 69
},
  sexRatio: 1032,
  tfr: 1.09,
  deathsBefore60Percentage:31.8,
  deathsBefore70Percentage: 51.6,
        placeOfDeath: {
  hospital: 14.82,
  other: 85.18,
},
      "yearWiseData": {
         2023: {
    totalPopulation: 59624,
    totalBirths: 598,
    totalDeaths: 521,
    birthRate: 10.03,
    deathRate: 8.74,
    tfr: 1.17,
    sexRatio: 97,
    populationGrowthRate: 0
  },
  2024: {
    totalPopulation: 59701,
    totalBirths: 561,
    totalDeaths: 534,
    birthRate: 9.39,
    deathRate: 8.94,
    tfr: 1.12,
    sexRatio: 102,
    populationGrowthRate: 0.13
  },
  2025: {
    totalPopulation: 59728,
    totalBirths: 513,
    totalDeaths: 548,
    birthRate: 8.58,
    deathRate: 9.17,
    tfr: 1.04,
    sexRatio: 106,
    populationGrowthRate: 0.05
  },
        "2026": {
              totalPopulation: 0,
            totalBirths: 0,
            totalDeaths: 0,
            tfr: 0,
            sexRatio: 0,
            populationGrowthRate: 0
        }
      }
    },
    {
      "mandalName": "Poduru",
        population2001: 66560,
  population2011: 65706,
  annualExponantional: -0.0013,
        ageDistribution: {
        age0To14: 15.61,
        age15To59: 67.95,
        age60Plus: 16.44
      },
      dependencyRatio: {
  childDependency: 16,
  oldAgeDependency: 16
},
medianAgeAtDeath: {
  age2023: 71,
  age2024: 70,
  age2025: 69
},
  sexRatio: 1006,
  tfr: 1.17,
  deathsBefore60Percentage:31.3,
  deathsBefore70Percentage: 49.8,
          placeOfDeath: {
  hospital: 15.47,
  other: 84.53,
},
      "yearWiseData": {
        2023: {
    totalPopulation: 65548,
    totalBirths: 602,
    totalDeaths: 574,
    birthRate: 9.18,
    deathRate: 8.76,
    tfr: 1.08,
    sexRatio: 95,
    populationGrowthRate: 0
  },
  2024: {
    totalPopulation: 65576,
    totalBirths: 589,
    totalDeaths: 561,
    birthRate: 8.98,
    deathRate: 8.55,
    tfr: 1.06,
    sexRatio: 106,
    populationGrowthRate: 0.04
  },
  2025: {
    totalPopulation: 65604,
    totalBirths: 536,
    totalDeaths: 578,
    birthRate: 8.17,
    deathRate: 8.81,
    tfr: 0.99,
    sexRatio: 102,
    populationGrowthRate: 0.04
  },
        "2026": {
          totalPopulation: 0,
          totalBirths: 0,
          totalDeaths: 0,
          tfr: 0,
          sexRatio: 0,
          populationGrowthRate: 0
        }
      }
    },
    {
      "mandalName": "Tadepalligudem",
        population2001: 183401,
  population2011: 192162,
  annualExponantional: 0.0047,
      medianAgeAtDeath: {
  age2023: 66,
  age2024: 66,
  age2025: 67
},
          ageDistribution: {
        age0To14: 14.83,
        age15To59: 70.66,
        age60Plus: 14.51
      },
      dependencyRatio: {
  childDependency: 15,
  oldAgeDependency: 15
},
  sexRatio: 1067,
  tfr: 0.93,
  deathsBefore60Percentage:36.4,
  deathsBefore70Percentage: 55.7,
  placeOfDeath: {
  hospital: 26.13,
  other: 73.87,
},
      "yearWiseData": {
        2023: {
    totalPopulation: 203527,
    totalBirths: 2077,
    totalDeaths: 1687,
    birthRate: 10.91,
    deathRate: 8.29,
    tfr: 1.26,
    populationGrowthRate: 0,
    sexRatio: 102,
  },
  2024: {
    totalPopulation: 203746,
    totalBirths: 1789,
    totalDeaths: 1694,
    birthRate: 9.39,
    deathRate: 8.31,
    tfr: 1.09,
    populationGrowthRate: 0.11,
    sexRatio: 106,
  },
  2025: {
    totalPopulation: 203921,
    totalBirths: 1676,
    totalDeaths: 1618,
    birthRate: 8.79,
    deathRate: 7.93,
    tfr: 1.03,
    populationGrowthRate: 0.09,
    sexRatio: 108,
  },
        "2026": {
          totalPopulation: 0,
          totalBirths: 0,
          totalDeaths: 0,
          tfr: 0,
          sexRatio: 0,
          populationGrowthRate: 0
        }
      }
    },
    {
      "mandalName": "Tanuku",
        population2001: 140181,
  population2011: 148529,
  annualExponantional: 0.0058,
      medianAgeAtDeath: {
  age2023: 68,
  age2024: 67,
  age2025: 69
},
         ageDistribution: {
        age0To14: 14.07,
        age15To59: 70.65,
        age60Plus: 15.28
      },
      dependencyRatio: {
  childDependency: 14,
  oldAgeDependency: 15
},
  sexRatio: 1079,
  tfr: 0.97,
  deathsBefore60Percentage:34.0,
  deathsBefore70Percentage: 53.7,
              placeOfDeath: {
  hospital: 20.33,
  other: 79.67,
},
      "yearWiseData": {
        2023: {
    totalPopulation: 159755,
    totalBirths: 1988,
    totalDeaths: 1347,
    birthRate: 13.31,
    deathRate: 8.43,
    tfr: 1.52,
    populationGrowthRate: 0,
    sexRatio: 103,
  },
  2024: {
    totalPopulation: 159968,
    totalBirths: 1452,
    totalDeaths: 1340,
    birthRate: 9.71,
    deathRate: 8.38,
    tfr: 1.13,
    populationGrowthRate: 0.13,
    sexRatio: 99,
  },
  2025: {
    totalPopulation: 160226,
    totalBirths: 1345,
    totalDeaths: 1180,
    birthRate: 8.98,
    deathRate: 7.36,
    tfr: 1.05,
    populationGrowthRate: 0.16,
    sexRatio: 101,
  },
        "2026": {
            totalPopulation: 0,
            totalBirths: 0,
            totalDeaths: 0,
            tfr: 0,
            sexRatio: 0,
            populationGrowthRate: 0
        }
      }
    },
    {
      "mandalName": "Undi",
        population2001: 65898,
  population2011: 66049,
  annualExponantional: 0.0002,
        ageDistribution: {
  age0To14: 14.54,
  age15To59: 68.24,
  age60Plus: 17.23
},
dependencyRatio: {
  childDependency: 15,
  oldAgeDependency: 17
},
medianAgeAtDeath: {
  age2023: 72,
  age2024: 69,
  age2025: 69
},
  sexRatio: 1043,
  tfr: 1.01,
  deathsBefore60Percentage:31.2,
  deathsBefore70Percentage: 50.9,
                placeOfDeath: {
  hospital: 15.58,
  other: 84.42,
},
      "yearWiseData": {
         2023: {
    totalPopulation: 66290,
    totalBirths: 648,
    totalDeaths: 630,
    birthRate: 10.46,
    deathRate: 9.50,
    tfr: 1.21,
    populationGrowthRate: 0,
    sexRatio: 93,
  },
  2024: {
    totalPopulation: 66232,
    totalBirths: 511,
    totalDeaths: 605,
    birthRate: 8.25,
    deathRate: 9.14,
    tfr: 0.97,
    populationGrowthRate: -0.09,
    sexRatio: 91,
  },
  2025: {
    totalPopulation: 66243,
    totalBirths: 521,
    totalDeaths: 546,
    birthRate: 8.41,
    deathRate: 8.24,
    tfr: 0.99,
    populationGrowthRate: 0.02,
    sexRatio: 107,
  },
        "2026": {
            totalPopulation: 0,
          totalBirths: 0,
          totalDeaths: 0,
          tfr: 0,
          sexRatio: 0,
          populationGrowthRate: 0
        }
      }
    },
    {
      "mandalName": "Veeravasaram",
        population2001: 64142,
  population2011: 64912,
  annualExponantional: 0.0012,
      dependencyRatio: {
  childDependency: 15,
  oldAgeDependency: 16
},
        ageDistribution: {
  age0To14: 15.06,
  age15To59: 69.06,
  age60Plus: 15.88
},
medianAgeAtDeath: {
  age2023: 72,
  age2024: 69,
  age2025: 69
},
  sexRatio: 1017,
  tfr: 1.18,
  deathsBefore60Percentage:31.2,
  deathsBefore70Percentage: 51.2,
      placeOfDeath: {
  hospital: 14.58,
  other: 85.42,
},
      "yearWiseData": {
          2023: {
    totalPopulation: 66060,
    totalBirths: 728,
    totalDeaths: 548,
    birthRate: 11.79,
    deathRate: 8.29,
    tfr: 1.35,
    populationGrowthRate: 0,
    sexRatio: 99,
  },
  2024: {
    totalPopulation: 66216,
    totalBirths: 674,
    totalDeaths: 565,
    birthRate: 10.89,
    deathRate: 8.53,
    tfr: 1.26,
    populationGrowthRate: 0.24,
    sexRatio: 110,
  },
  2025: {
    totalPopulation: 66293,
    totalBirths: 585,
    totalDeaths: 548,
    birthRate: 9.44,
    deathRate: 8.27,
    tfr: 1.10,
    populationGrowthRate: 0.12,
    sexRatio: 89,
  },
        "2026": {
             totalPopulation: 0,
            totalBirths: 0,
            totalDeaths: 0,
            tfr: 0,
            sexRatio: 0,
            populationGrowthRate: 0,
        }
      }
    },
    {
      "mandalName": "Yelamanchili",
        population2001: 74101,
  population2011: 71890,
  annualExponantional: -0.0030,
      dependencyRatio: {
  childDependency: 15,
  oldAgeDependency: 16
},
      ageDistribution: {
  age0To14: 15.08,
  age15To59: 68.54,
  age60Plus: 16.38
},
medianAgeAtDeath: {
  age2023: 68,
  age2024: 70,
  age2025: 70
},
  sexRatio:1010,
  tfr: 1.12,
  deathsBefore60Percentage:29.5,
  deathsBefore70Percentage: 49.7,
        placeOfDeath: {
  hospital: 13.21,
  other: 86.79,
},
      "yearWiseData": {
      2023: {
    totalPopulation: 71359,
    totalBirths: 729,
    totalDeaths: 658,
    birthRate: 10.93,
    deathRate: 9.22,
    tfr: 1.26,
    populationGrowthRate: 0,
    sexRatio: 102,
  },
  2024: {
    totalPopulation: 71408,
    totalBirths: 655,
    totalDeaths: 652,
    birthRate: 9.81,
    deathRate: 9.13,
    tfr: 1.14,
    populationGrowthRate: 0.07,
    sexRatio: 102,
  },
  2025: {
    totalPopulation: 71440,
    totalBirths: 614,
    totalDeaths: 625,
    birthRate: 9.19,
    deathRate: 8.75,
    tfr: 1.07,
    populationGrowthRate: 0.04,
    sexRatio: 104,

  },
        "2026": {
          totalPopulation: 0,
          totalBirths: 0,
          totalDeaths: 0,
          tfr: 0,
          sexRatio: 0,
          populationGrowthRate: 0
        }
      }
    }
    ]
  },



  // =====================================================
  // VIZIANAGARAM
  // =====================================================

  {
    districtName: 'Vizianagaram',
    ageSexDistribution: [
  { ageGroup: '0-4', female: 0.25, male: 0.17 },
  { ageGroup: '5-9', female: 0.25, male: 0.19 },
  { ageGroup: '10-14', female: 0.29, male: 0.24 },
  { ageGroup: '15-19', female: 0.50, male: 0.59 },
  { ageGroup: '20-24', female: 0.71, male: 1.07 },
  { ageGroup: '25-29', female: 0.83, male: 1.70 },
  { ageGroup: '30-34', female: 1.21, male: 2.76 },
  { ageGroup: '35-39', female: 1.83, male: 3.91 },
  { ageGroup: '40-44', female: 2.65, male: 4.99 },
  { ageGroup: '45-49', female: 4.42, male: 6.22 },
  { ageGroup: '50-54', female: 6.22, male: 7.50 },
  { ageGroup: '55-59', female: 8.51, male: 8.71 },
  { ageGroup: '60-64', female: 10.92, male: 10.24 },
  { ageGroup: '65-69', female: 13.61, male: 11.15 },
  { ageGroup: '70-74', female: 17.28, male: 15.57 },
  { ageGroup: '75-79', female: 16.89, male: 14.48 },
  { ageGroup: '80+', female: 13.62, male: 10.51 }
],
         population2001: 1845392,
     population2011:1930811,
     annualExponantional:0.0045,
    medianAgeAtDeath: {
  age2023: 68.56,
  age2024: 68.04,
  age2025: 68.09
},
ageDistribution: {
  age0To14: 15.11,
  age15To59: 69.03,
  age60Plus: 15.86
},
dependencyRatio: {
  childDependency: 15,
  oldAgeDependency: 16
},
    districtYearWiseData: {
     2023: {
    totalPopulation: 2040782,
    totalBirths: 19374,
    totalDeaths: 16183,
    birthRate: 10.2,
    deathRate: 7.9,
    tfr: 1.19,
    sexRatio: 107,
    populationGrowthRate: 0
  },

  2024: {
    totalPopulation: 2043925,
    totalBirths: 18652,
    totalDeaths: 16806,
    birthRate: 9.8,
    deathRate: 8.2,
    tfr: 1.12,
    sexRatio: 105,
    populationGrowthRate: 0.11
  },

  2025: {
    totalPopulation: 2046735,
    totalBirths: 18690,
    totalDeaths: 17179,
    birthRate: 9.8,
    deathRate: 8.4,
    tfr: 1.05,
    sexRatio: 107,
    populationGrowthRate: 0.19
  },

  2026: {
    totalPopulation: 0,
    totalBirths: 0,
    totalDeaths: 0,
    tfr: 0,
    sexRatio: 0,
    birthRate: 0,
    deathRate: 0
  },


    },

    mandals: [

     {
      "mandalName": "Badangi",
        population2001: 48219,
  population2011: 49384,
  annualExponantional: 0.0024,
      medianAgeAtDeath: {
  age2023: 68,
  age2024: 69,
  age2025: 70
},
ageDistribution: {
    age0To14: 14.27,
    age15To59: 66.75,
    age60Plus: 18.99
  },
    dependencyRatio: {
    childDependency: 14,
    oldAgeDependency: 19
  },
    sexRatio:1017,
    deathsBefore60Percentage:28.96,
  deathsBefore70Percentage: 53.2,
  placeOfDeath: {
  hospital: 16.57,
  other: 83.43
},
tfr:1.3,
      "yearWiseData": {
        2023: {
      totalPopulation: 50846,
      totalBirths: 471,
      totalDeaths: 447,
      birthRate: 9.91,
      deathRate: 8.79,
      tfr: 1.15,
      sexRatio: 101,
      populationGrowthRate: 0
    },

    2024: {
      totalPopulation: 51043,
      totalBirths: 579,
      totalDeaths: 422,
      birthRate: 12.13,
      deathRate: 8.27,
      tfr: 1.39,
      sexRatio: 105,
      populationGrowthRate: 0.39
    },

    2025: {
      totalPopulation: 51243,
      totalBirths: 630,
      totalDeaths: 474,
      birthRate: 13.15,
      deathRate: 9.25,
      tfr: 1.50,
      sexRatio: 109,
      populationGrowthRate: 0.39
    },
        "2026": {
          "totalPopulation": 0,
          "totalBirths": 0,
          "totalDeaths": 0,
          "tfr": 0,
		     "sexRatio": 0,
        }
      }
    },
    {
      "mandalName": "Bhogapuram",
        population2001: 52572,
  population2011: 54891,
  annualExponantional: 0.0043,
        medianAgeAtDeath: {
        age2023: 64,
        age2024: 65,
        age2025: 65
    },
      sexRatio:  1030,
  deathsBefore60Percentage:37.83,
  deathsBefore70Percentage: 62.5,
  placeOfDeath: {
  hospital: 8.3,
  other: 91.7
},
tfr:1.2,
      ageDistribution: {
    age0To14: 18.10,
    age15To59: 69.87,
    age60Plus: 12.03
  },
    dependencyRatio: {
    childDependency: 18,
    oldAgeDependency: 12
  },
      "yearWiseData": {
        2023: {
      totalPopulation: 58540,
      totalBirths: 598,
      totalDeaths: 477,
      birthRate: 10.93,
      deathRate: 8.15,
      tfr: 1.26,
      sexRatio: 106,
      populationGrowthRate: 0
    },

    2024: {
      totalPopulation: 58697,
      totalBirths: 600,
      totalDeaths: 484,
      birthRate: 10.93,
      deathRate: 8.25,
      tfr: 1.26,
      sexRatio: 113,
      populationGrowthRate: 0.27
    },

    2025: {
      totalPopulation: 58787,
      totalBirths: 534,
      totalDeaths: 481,
      birthRate: 9.72,
      deathRate: 8.18,
      tfr: 1.13,
      sexRatio: 119,
      populationGrowthRate: 0.15
    },
        "2026": {
          "totalPopulation": 0,
          "totalBirths": 0,
          "totalDeaths": 0,
          "tfr": 0,
		      "sexRatio": 0,
		  
        }
      }
    },
    {
      "mandalName": "Bobbili",
        population2001: 116213,
  population2011: 122964,
  annualExponantional: 0.0056,
       medianAgeAtDeath: {
        age2023: 69,
        age2024: 69,
        age2025: 68
    },
      sexRatio: 1035,
  deathsBefore60Percentage:30.4,
  deathsBefore70Percentage: 52.7,
  placeOfDeath: {
  hospital: 13.36,
  other: 86.64
},
tfr:1.1,
      ageDistribution: {
    age0To14: 14.16,
    age15To59: 69.24,
    age60Plus: 16.60
  },
    dependencyRatio: {
    childDependency: 14,
    oldAgeDependency: 17
  },
      "yearWiseData": {
       2023: {
      totalPopulation: 131724,
      totalBirths: 1302,
      totalDeaths: 1068,
      birthRate: 10.57,
      deathRate: 8.11,
      tfr: 1.22,
      sexRatio: 103,
      populationGrowthRate: 0
    },

    2024: {
      totalPopulation: 131877,
      totalBirths: 1109,
      totalDeaths: 1033,
      birthRate: 8.99,
      deathRate: 7.83,
      tfr: 1.05,
      sexRatio: 105,
      populationGrowthRate: 0.12
    },

    2025: {
      totalPopulation: 131823,
      totalBirths: 924,
      totalDeaths: 1042,
      birthRate: 7.50,
      deathRate: 7.90,
      tfr: 0.89,
      sexRatio: 107,
      populationGrowthRate: -0.04
    },
        "2026": {
          "totalPopulation": 0,
          "totalBirths": 0,
          "totalDeaths": 0,
          "tfr": 0,
		      "sexRatio": 0,
        }
      }
    },
    {
      "mandalName": "Bondapalle",
        population2001: 50531,
  population2011: 51146,
  annualExponantional: 0.0012,
        medianAgeAtDeath: {
        age2023: 68,
        age2024: 67,
        age2025: 69
    },
      sexRatio: 1028,
        deathsBefore60Percentage:32.55,
  deathsBefore70Percentage: 55.4,
  placeOfDeath: {
  hospital: 10.99,
  other: 89.01
},
tfr:1.0,
      ageDistribution: {
    age0To14: 14.67,
    age15To59: 68.27,
    age60Plus: 17.06
  },
    dependencyRatio: {
    childDependency: 15,
    oldAgeDependency: 17
  },
      "yearWiseData": {
       2023: {
      totalPopulation: 51880,
      totalBirths: 447,
      totalDeaths: 476,
      birthRate: 9.21,
      deathRate: 9.17,
      tfr: 1.08,
      sexRatio: 102,
      populationGrowthRate: 0
    },

    2024: {
      totalPopulation: 51884,
      totalBirths: 428,
      totalDeaths: 454,
      birthRate: 8.82,
      deathRate: 8.75,
      tfr: 1.03,
      sexRatio: 104,
      populationGrowthRate: 0.01
    },

    2025: {
      totalPopulation: 51707,
      totalBirths: 300,
      totalDeaths: 498,
      birthRate: 6.21,
      deathRate: 9.63,
      tfr: 0.75,
      sexRatio: 106,
      populationGrowthRate: -0.34
    },
        "2026": {
          "totalPopulation": 0,
          "totalBirths": 0,
          "totalDeaths": 0,
          "tfr": 0,
		      "sexRatio": 0,
        }
      }
    },
    {
      "mandalName": "Cheepurupalle",
        population2001: 58968,
  population2011: 63408,
  annualExponantional: 0.0073,
        medianAgeAtDeath: {
        age2023: 67,
        age2024: 67,
        age2025: 69
    },
      sexRatio: 1001,
        deathsBefore60Percentage:33.8,
  deathsBefore70Percentage: 56.0,
  placeOfDeath: {
  hospital: 15.4,
  other: 84.6
},
tfr:1.5,
      dependencyRatio: {
    childDependency: 16,
    oldAgeDependency: 15
  },
      ageDistribution: {
    age0To14: 16.27,
    age15To59: 69.11,
    age60Plus: 14.62
  },
      "yearWiseData": {
        2023: {
      totalPopulation: 69416,
      totalBirths: 770,
      totalDeaths: 462,
      birthRate: 11.86,
      deathRate: 6.66,
      tfr: 1.36,
      sexRatio: 108,
      populationGrowthRate: 0
    },

    2024: {
      totalPopulation: 69938,
      totalBirths: 971,
      totalDeaths: 516,
      birthRate: 14.85,
      deathRate: 7.38,
      tfr: 1.68,
      sexRatio: 111,
      populationGrowthRate: 0.75
    },

    2025: {
      totalPopulation: 70276,
      totalBirths: 800,
      totalDeaths: 518,
      birthRate: 12.18,
      deathRate: 7.37,
      tfr: 1.39,
      sexRatio: 109,
      populationGrowthRate: 0.48
    },
        "2026": {
          "totalPopulation": 69912,
          "totalBirths": 0,
          "totalDeaths": 0,
          "tfr": 1.09,
		  "sexRatio": 119,
        }
      }
    },
    {
      "mandalName": "Dattirajeru",
        population2001: 54786,
  population2011: 54499,
  annualExponantional: -0.0005,
         medianAgeAtDeath: {
        age2023: 69,
        age2024: 70,
        age2025: 69
    },
      sexRatio:  1020,
        deathsBefore60Percentage:28.52,
  deathsBefore70Percentage: 49.4,
  placeOfDeath: {
  hospital: 11.23,
  other: 88.77
},
tfr:1.0,
      dependencyRatio: {
    childDependency: 14,
    oldAgeDependency: 18
  },
      ageDistribution: {
    age0To14: 14.11,
    age15To59: 67.88,
    age60Plus: 18.01
  },
      "yearWiseData": {
         2023: {
      totalPopulation: 54219,
      totalBirths: 478,
      totalDeaths: 456,
      birthRate: 9.43,
      deathRate: 8.41,
      tfr: 1.10,
      sexRatio: 104,
      populationGrowthRate: 0
    },

    2024: {
      totalPopulation: 54189,
      totalBirths: 442,
      totalDeaths: 503,
      birthRate: 8.72,
      deathRate: 9.28,
      tfr: 1.02,
      sexRatio: 106,
      populationGrowthRate: -0.06
    },

    2025: {
      totalPopulation: 54102,
      totalBirths: 384,
      totalDeaths: 497,
      birthRate: 7.59,
      deathRate: 9.19,
      tfr: 0.90,
      sexRatio: 108,
      populationGrowthRate: -0.16
    },
        "2026": {
          "totalPopulation": 0,
          "totalBirths": 0,
          "totalDeaths": 0,
          "tfr": 0,
          "sexRatio": 0,
        }
      }
    },
    {
      "mandalName": "Denkada",
        population2001: 52893,
  population2011: 54382,
  annualExponantional: 0.0028,
        medianAgeAtDeath: {
        age2023: 68,
        age2024: 70,
        age2025: 69
    },
      sexRatio: 1022,
  deathsBefore60Percentage:31.19,
  deathsBefore70Percentage: 54.4,
  placeOfDeath: {
  hospital: 12.03,
  other: 87.97
},
tfr:1.0,
      ageDistribution: {
    age0To14: 14.26,
    age15To59: 68.45,
    age60Plus: 17.28
  },
    dependencyRatio: {
    childDependency: 16,
    oldAgeDependency: 15
  },
      "yearWiseData": {
    2023: { totalPopulation: 56240.50, totalBirths: 493, totalDeaths: 472, birthRate: 9.38, deathRate: 8.39, tfr: 1.09,sexRatio: 101 },
  2024: { totalPopulation: 56296.52, totalBirths: 475, totalDeaths: 452, birthRate: 9.02, deathRate: 8.03, tfr: 1.05,sexRatio: 109 },
  2025: { totalPopulation: 56248.05, totalBirths: 396, totalDeaths: 472, birthRate: 7.53, deathRate: 8.39, tfr: 0.89,sexRatio: 120 },

        "2026": {
          "totalPopulation": 56374,
          "totalBirths": 0,
          "totalDeaths": 0,
          "tfr": 0.94,
          "sexRatio": 0,
        }
      }
    },
    {
      "mandalName": "Gajapathinagaram",
        population2001: 56094,
  population2011: 57529,
  annualExponantional: 0.0025,
        medianAgeAtDeath: {
        age2023: 69,
        age2024: 68,
        age2025: 65
    },
      sexRatio:1025,
    deathsBefore60Percentage:29.73,
  deathsBefore70Percentage: 55.2,
  placeOfDeath: {
  hospital: 12.03,
  other: 87.97
},
tfr:1.0,
      dependencyRatio: {
    childDependency: 14,
    oldAgeDependency: 17
  },
      ageDistribution: {
    age0To14: 14.26,
    age15To59: 68.45,
    age60Plus: 17.28
  },
      "yearWiseData": {
  2023: { totalPopulation: 59361.64, totalBirths: 540, totalDeaths: 478, birthRate: 9.73, deathRate: 8.05, tfr: 1.13,sexRatio: 92 },
  2024: { totalPopulation: 59341.61, totalBirths: 503, totalDeaths: 558, birthRate: 9.07, deathRate: 9.40, tfr: 1.06,sexRatio: 109 },
  2025: { totalPopulation: 59187.63, totalBirths: 403, totalDeaths: 585, birthRate: 7.28, deathRate: 9.88, tfr: 0.87,sexRatio: 88 },
        "2026": {
          "totalPopulation": 0,
          "totalBirths": 0,
          "totalDeaths": 0,
          "tfr": 0,
		        "sexRatio": 0,
        }
      }
    },
    {
      "mandalName": "Gantyada",
        population2001: 67546,
  population2011: 65579,
  annualExponantional: -0.0030,
        medianAgeAtDeath: {
        age2023: 71,
        age2024: 69,
        age2025: 69
    },
      sexRatio: 1047,
  deathsBefore60Percentage:28.25,
  deathsBefore70Percentage: 51.7,
  placeOfDeath: {
  hospital: 11.75,
  other: 88.25
},
tfr:1.0,
      dependencyRatio: {
    childDependency: 14,
    oldAgeDependency: 18
  },
      ageDistribution: {
    age0To14: 14.08,
    age15To59: 67.65,
    age60Plus: 18.27
  },
      "yearWiseData": {
       2023: { totalPopulation: 63350.79, totalBirths: 589, totalDeaths: 620, birthRate: 9.94, deathRate: 9.79, tfr: 1.15,sexRatio: 109 },
  2024: { totalPopulation: 63218.76, totalBirths: 503, totalDeaths: 670, birthRate: 8.51, deathRate: 10.60, tfr: 1.00,sexRatio: 126 },
  2025: { totalPopulation: 62976.91, totalBirths: 405, totalDeaths: 675, birthRate: 6.88, deathRate: 10.72, tfr: 0.82,sexRatio: 93 },
        "2026": {
          "totalPopulation": 63167,
          "totalBirths": 0,
          "totalDeaths": 0,
          "tfr": 0.94,
		   "sexRatio": 88,
        }
      }
    },
    {
      "mandalName": "Garividi",
        population2001: 64714,
  population2011: 68289,
  annualExponantional: 0.0054,
        medianAgeAtDeath: {
        age2023: 68,
        age2024: 67,
        age2025: 67
    },
      sexRatio:1008,
  deathsBefore60Percentage:32.09,
  deathsBefore70Percentage: 55.8,
  placeOfDeath: {
  hospital: 12.47,
  other: 87.53
},
tfr:0.9,
      dependencyRatio: {
    childDependency: 15,
    oldAgeDependency: 16
  },
      ageDistribution: {
    age0To14: 15.43,
    age15To59: 68.98,
    age60Plus: 15.58
  },
      "yearWiseData": {
        2023: { totalPopulation: 72899.78, totalBirths: 676, totalDeaths: 566, birthRate: 9.92, deathRate: 7.76, tfr: 1.15,sexRatio: 109 },
  2024: { totalPopulation: 72812.60, totalBirths: 472, totalDeaths: 592, birthRate: 6.93, deathRate: 8.13, tfr: 0.83,sexRatio: 126 },
  2025: { totalPopulation: 72742.07, totalBirths: 424, totalDeaths: 524, birthRate: 6.23, deathRate: 7.20, tfr: 0.75,sexRatio: 93  },
        "2026": {
          "totalPopulation": 0,
          "totalBirths": 0,
          "totalDeaths": 0,
          "tfr": 0,
		   "sexRatio": 0,
        }
      }
    },
    {
      "mandalName": "Gurla",
        population2001: 62251,
  population2011: 64695,
  annualExponantional: 0.0039,
        medianAgeAtDeath: {
        age2023: 68,
        age2024: 67,
        age2025: 67
    },
      dependencyRatio: {
    childDependency: 16,
    oldAgeDependency: 15
  },
      ageDistribution: {
    age0To14: 16.22,
    age15To59: 69.06,
    age60Plus: 14.72
  },
    sexRatio:  998,
  deathsBefore60Percentage:32.09,
  deathsBefore70Percentage: 55.8,
  placeOfDeath: {
  hospital: 11.56,
  other: 88.44
},
tfr:1.1,
      "yearWiseData": {
      2023: { totalPopulation: 67860.58, totalBirths: 676, totalDeaths: 552, birthRate: 10.65, deathRate: 8.13, tfr: 1.23,sexRatio: 124 },
      2024: { totalPopulation: 67902.96, totalBirths: 624, totalDeaths: 625, birthRate: 9.83, deathRate: 9.20, tfr: 1.14,sexRatio: 115 },
      2025: { totalPopulation: 67881.81, totalBirths: 530, totalDeaths: 588, birthRate: 8.35, deathRate: 8.66, tfr: 0.98,sexRatio: 117 },
        "2026": {
          "totalPopulation": 0,
          "totalBirths": 0,
          "totalDeaths": 0,
          "tfr": 0,
		  "sexRatio": 0
        }
      }
    },
    {
      "mandalName": "Jami",
        population2001: 58191,
  population2011: 58066,
  annualExponantional: -0.0002,
        medianAgeAtDeath: {
        age2023: 69,
        age2024: 69,
        age2025: 68
    },
      sexRatio:  1022,
  deathsBefore60Percentage:32.09,
  deathsBefore70Percentage: 55.8,
  placeOfDeath: {
  hospital: 12.47,
  other: 87.53
},
tfr:0.9,
      ageDistribution: {
    age0To14: 13.94,
    age15To59: 69.71,
    age60Plus: 16.35
  },
    dependencyRatio: {
    childDependency: 14,
    oldAgeDependency: 16
  },
      "yearWiseData": {
         2023: { totalPopulation: 57884.18, totalBirths: 485, totalDeaths: 554, birthRate: 8.96, deathRate: 9.57, tfr: 1.05,sexRatio: 118 },
  2024: { totalPopulation: 57868.71, totalBirths: 511, totalDeaths: 562, birthRate: 9.44, deathRate: 9.71, tfr: 1.10,sexRatio: 106 },
  2025: { totalPopulation: 57723.36, totalBirths: 369, totalDeaths: 540, birthRate: 6.84, deathRate: 9.35, tfr: 0.82,sexRatio: 132 },
        "2026": {
          "totalPopulation": 57943,
          "totalBirths": 0,
          "totalDeaths": 0,
          "tfr": 0.93,
		  "sexRatio": 0,
        }
      }
    },
    {
      "mandalName": "Kothavalasa",
        population2001: 62897,
  population2011: 68579,
  annualExponantional: 0.0086,
        medianAgeAtDeath: {
        age2023: 65,
        age2024: 66,
        age2025: 66
    },
      sexRatio:  1034,
  deathsBefore60Percentage:34.38,
  deathsBefore70Percentage: 57.7,
  placeOfDeath: {
  hospital: 7.72,
  other: 92.28
},
tfr:1.0,
      dependencyRatio: {
    childDependency: 15,
    oldAgeDependency: 14
  },
      ageDistribution: {
    age0To14: 15.29,
    age15To59: 70.88,
    age60Plus: 13.84
  },
      "yearWiseData": {
         2023: { totalPopulation: 75952.13, totalBirths: 568, totalDeaths: 570, birthRate: 8.00, deathRate: 7.50, tfr: 0.94,sexRatio: 101 },
  2024: { totalPopulation: 75963.66, totalBirths: 583, totalDeaths: 612, birthRate: 8.21, deathRate: 8.06, tfr: 0.97,sexRatio: 101 },
  2025: { totalPopulation: 75956.61, totalBirths: 589, totalDeaths: 637, birthRate: 8.29, deathRate: 8.39, tfr: 0.98,sexRatio: 106 },
        "2026": {
          "totalPopulation": 76237,
          "totalBirths": 0,
          "totalDeaths": 0,
          "tfr": 0.9,
		      "sexRatio": 0,
        }
      }
    },
    {
      "mandalName": "Lakkavarapukota",
        population2001: 50673,
  population2011: 53039,
  annualExponantional: 0.0046,
        medianAgeAtDeath: {
        age2023: 71,
        age2024: 69,
        age2025: 69
    },
      sexRatio:  1022,
        deathsBefore60Percentage:28.76,
  deathsBefore70Percentage: 51.1,
  placeOfDeath: {
  hospital: 7.62,
  other: 92.38
},
tfr:0.9,
      dependencyRatio: {
    childDependency: 15,
    oldAgeDependency: 17
  },
      ageDistribution: {
    age0To14: 15.27,
    age15To59: 67.52,
    age60Plus: 17.21
  },
      "yearWiseData": {
        2023: { totalPopulation: 56017.18, totalBirths: 440, totalDeaths: 414, birthRate: 8.40, deathRate: 7.39, tfr: 0.99,sexRatio: 117 },
  2024: { totalPopulation: 56011.73, totalBirths: 425, totalDeaths: 460, birthRate: 8.12, deathRate: 8.21, tfr: 0.96,sexRatio: 106 },
  2025: { totalPopulation: 55948.91, totalBirths: 391, totalDeaths: 481, birthRate: 7.47, deathRate: 8.60, tfr: 0.89,sexRatio: 97 },
        "2026": {
          "totalPopulation": 0,
          "totalBirths": 0,
          "totalDeaths": 0,
          "tfr": 0,
		     "sexRatio": 0,
        }
      }
    },
    {
      "mandalName": "Mentada",
        population2001: 49153,
  population2011: 46855,
  annualExponantional: -0.0048,
        medianAgeAtDeath: {
        age2023: 68,
        age2024: 67,
        age2025: 67
    },
      sexRatio:1038,
  deathsBefore60Percentage:32.81,
  deathsBefore70Percentage: 55.4,
  placeOfDeath: {
  hospital: 13.12,
  other: 86.88
},
tfr:1.1,
      dependencyRatio: {
    childDependency: 14,
    oldAgeDependency: 18
  },
      ageDistribution: {
    age0To14: 13.77,
    age15To59: 68.61,
    age60Plus: 17.63
  },
      "yearWiseData": {
         2023: { totalPopulation: 44341.13, totalBirths: 437, totalDeaths: 418, birthRate: 10.54, deathRate: 9.43, tfr: 1.22,sexRatio: 106 },
  2024: { totalPopulation: 44330.66, totalBirths: 396, totalDeaths: 434, birthRate: 9.55, deathRate: 9.79, tfr: 1.11,sexRatio: 108 },
  2025: { totalPopulation: 44285.73, totalBirths: 375, totalDeaths: 446, birthRate: 9.06, deathRate: 10.07, tfr: 1.06,sexRatio: 94 },
        "2026": {
          "totalPopulation": 44450,
          "totalBirths": 0,
          "totalDeaths": 0,
          "tfr": 1.08,
		      "sexRatio": 0,
        }
      }
    },
    {
      "mandalName": "Merakamudidam",
        population2001: 56996,
  population2011: 57237,
  annualExponantional: 0.0004,
        medianAgeAtDeath: {
        age2023: 68,
        age2024: 67,
        age2025: 68
    },
      sexRatio:  993,
        deathsBefore60Percentage:31.92,
  deathsBefore70Percentage: 54.7,
  placeOfDeath: {
  hospital: 9.67,
  other: 90.33
},
tfr:1.0,
      dependencyRatio: {
    childDependency: 15,
    oldAgeDependency: 18
  },
      ageDistribution: {
    age0To14: 14.98,
    age15To59: 66.98,
    age60Plus: 18.05
  },
      "yearWiseData": {
         2023: { totalPopulation: 57641.27, totalBirths: 558, totalDeaths: 477, birthRate: 10.35, deathRate: 8.28, tfr: 1.20, sexRatio: 96 },
       2024: { totalPopulation: 57700.50, totalBirths: 478, totalDeaths: 452, birthRate: 8.86, deathRate: 7.83, tfr: 1.04,sexRatio: 115 },
      2025: { totalPopulation: 57655.65, totalBirths: 405, totalDeaths: 478, birthRate: 7.51, deathRate: 8.29, tfr: 0.89,sexRatio: 107 },
        "2026": {
          "totalPopulation": 57849,
          "totalBirths": 0,
          "totalDeaths": 0,
          "tfr": 0.99,
		      "sexRatio": 0,
        }
      }
    },
    {
      "mandalName": "Nellimarla",
        population2001: 73788,
  population2011: 77031,
  annualExponantional: 0.0043,
        medianAgeAtDeath: {
        age2023: 67,
        age2024: 67,
        age2025: 65
    },
      sexRatio:  1020,
  deathsBefore60Percentage:29.54,
  deathsBefore70Percentage: 57.5,
  placeOfDeath: {
  hospital: 12.74,
  other: 87.26
},
tfr:1.0,
      dependencyRatio: {
    childDependency: 16,
    oldAgeDependency: 15
  },
      ageDistribution: {
    age0To14: 16.01,
    age15To59: 68.77,
    age60Plus: 15.23
  },
      "yearWiseData": {
       2023: {
    totalPopulation: 76006.27,
    totalBirths: 880,
    totalDeaths: 595,
    birthRate: 12.38,
    deathRate: 7.83,
    tfr: 1.42,
    sexRatio: 99,
    populationGrowthRate: 0
  },
  2024: {
    totalPopulation: 76279.49,
    totalBirths: 780,
    totalDeaths: 561,
    birthRate: 10.94,
    deathRate: 7.35,
    tfr: 1.26,
    sexRatio: 110,
    populationGrowthRate: 0.36
  },
  2025: {
    totalPopulation: 76292.12,
    totalBirths: 570,
    totalDeaths: 597,
    birthRate: 7.99,
    deathRate: 7.83,
    tfr: 0.94,
    sexRatio: 110,
    populationGrowthRate: 0.02
  },
        "2026": {
          "totalPopulation": 81383,
          "totalBirths": 0,
          "totalDeaths": 0,
          "tfr": 0.95,
		      "sexRatio": 0,
        }
      }
    },
    {
      "mandalName": "Pusapatirega",
        population2001: 68945,
  population2011: 71955,
  annualExponantional: 0.0043,
          medianAgeAtDeath: {
        age2023: 67,
        age2024: 65,
        age2025: 65
    },
      sexRatio: 999,
  deathsBefore60Percentage:36.37,
  deathsBefore70Percentage: 59.8,
  placeOfDeath: {
  hospital: 10.4,
  other: 89.6
},
tfr:1.2,
      dependencyRatio: {
    childDependency: 18,
    oldAgeDependency: 13
  },
      ageDistribution: {
    age0To14: 18.08,
    age15To59: 69.09,
    age60Plus: 12.83
  },
      "yearWiseData": {
        2023: {
    totalPopulation: 76006.27,
    totalBirths: 880,
    totalDeaths: 595,
    birthRate: 12.38,
    deathRate: 7.83,
    tfr: 1.42,
    sexRatio: 99,
    populationGrowthRate: 0
  },
  2024: {
    totalPopulation: 76279.49,
    totalBirths: 780,
    totalDeaths: 561,
    birthRate: 10.94,
    deathRate: 7.35,
    tfr: 1.26,
    sexRatio: 110,
    populationGrowthRate: 0.36
  },
  2025: {
    totalPopulation: 76292.12,
    totalBirths: 570,
    totalDeaths: 597,
    birthRate: 7.99,
    deathRate: 7.83,
    tfr: 0.94,
    sexRatio: 110,
    populationGrowthRate: 0.02
  },
        "2026": {
          "totalPopulation": 76540,
          "totalBirths": 0,
          "totalDeaths": 0,
          "tfr": 1.14,
		      "sexRatio": 0,
        }
      }
    },
    {
      "mandalName": "Rajam",
        population2001: 81673,
  population2011: 94039,
  annualExponantional: 0.0141,
        medianAgeAtDeath: {
        age2023: 67,
        age2024: 67,
        age2025: 69
    },
      sexRatio:  1013,
    deathsBefore60Percentage:33.75,
  deathsBefore70Percentage: 56.3,
  placeOfDeath: {
  hospital: 16.53,
  other: 83.47
},
tfr:0.9,
      dependencyRatio: {
    childDependency: 15,
    oldAgeDependency: 14
  },
      ageDistribution: {
    age0To14: 15.12,
    age15To59: 71.22,
    age60Plus: 13.66
  },
      "yearWiseData": {
        2023: {
    totalPopulation: 111177.81,
    totalBirths: 860,
    totalDeaths: 724,
    birthRate: 8.27,
    deathRate: 6.51,
    tfr: 0.97,
    sexRatio: 101,
    populationGrowthRate: 0
  },
  2024: {
    totalPopulation: 111380.91,
    totalBirths: 850,
    totalDeaths: 706,
    birthRate: 8.16,
    deathRate: 6.34,
    tfr: 0.96,
    sexRatio: 115,
    populationGrowthRate: 0.18
  },
  2025: {
    totalPopulation: 111525.87,
    totalBirths: 805,
    totalDeaths: 716,
    birthRate: 7.72,
    deathRate: 6.42,
    tfr: 0.91,
    sexRatio: 103,
    populationGrowthRate: 0.13
  },
        "2026": {
          "totalPopulation": 0,
          "totalBirths": 0,
          "totalDeaths": 0,
          "tfr": 0,
		     "sexRatio": 0,
        }
      }
    },
    {
      "mandalName": "Ramabhadrapuram",
        population2001: 47723,
  population2011: 50464,
  annualExponantional: 0.0056,
        medianAgeAtDeath: {
        age2023: 67,
        age2024: 66,
        age2025: 65
    },
      sexRatio:1044,
  deathsBefore60Percentage:34.31,
  deathsBefore70Percentage: 56.8,
  placeOfDeath: {
  hospital: 12.82,
  other: 87.18
},
tfr:1.0,
      ageDistribution: {
    age0To14: 16.16,
    age15To59: 67.73,
    age60Plus: 16.11
  },
    dependencyRatio: {
    childDependency: 16,
    oldAgeDependency: 16
  },
      "yearWiseData": {
        2023: {
    totalPopulation: 54036.56,
    totalBirths: 533,
    totalDeaths: 420,
    birthRate: 10.55,
    deathRate: 7.77,
    tfr: 1.22,
    sexRatio: 127,
    populationGrowthRate: 0
  },
  2024: {
    totalPopulation: 54071.67,
    totalBirths: 390,
    totalDeaths: 382,
    birthRate: 7.71,
    deathRate: 7.06,
    tfr: 0.91,
    sexRatio: 95,
    populationGrowthRate: 0.06
  },
  2025: {
    totalPopulation: 53989.82,
    totalBirths: 333,
    totalDeaths: 438,
    birthRate: 6.60,
    deathRate: 8.11,
    tfr: 0.79,
    sexRatio: 103,
    populationGrowthRate: -0.15
  },
        "2026": {
          "totalPopulation": 0,
          "totalBirths": 0,
          "totalDeaths": 0,
          "tfr": 0,
		      "sexRatio": 0,
        }
      }
    },
    {
      "mandalName": "Regidi Amadalavalasa",
        population2001: 68422,
  population2011: 70493,
  annualExponantional: 0.0030,
        medianAgeAtDeath: {
        age2023: 69,
        age2024: 70,
        age2025: 69
    },
      sexRatio:  1007,
        deathsBefore60Percentage:29.65,
  deathsBefore70Percentage: 49.0,
  placeOfDeath: {
  hospital: 12.83,
  other: 87.17
},
tfr:1.0,
      dependencyRatio: {
    childDependency: 15,
    oldAgeDependency: 17
  },
      ageDistribution: {
    age0To14: 15.23,
    age15To59: 68.04,
    age60Plus: 16.72
  },
      "yearWiseData": {
        2023: {
    totalPopulation: 76784.99,
    totalBirths: 645,
    totalDeaths: 531,
    birthRate: 8.98,
    deathRate: 6.92,
    tfr: 1.05,
    sexRatio: 104,
    populationGrowthRate: 0
  },
  2024: {
    totalPopulation: 76932.12,
    totalBirths: 606,
    totalDeaths: 501,
    birthRate: 8.42,
    deathRate: 6.51,
    tfr: 0.99,
    sexRatio: 103,
    populationGrowthRate: 0.19
  },
  2025: {
    totalPopulation: 76996.47,
    totalBirths: 566,
    totalDeaths: 541,
    birthRate: 7.86,
    deathRate: 7.03,
    tfr: 0.93,
    sexRatio: 99,
    populationGrowthRate: 0.08
  },
        "2026": {
          "totalPopulation": 0,
          "totalBirths": 0,
          "totalDeaths": 0,
          "tfr": 0,
		  "sexRatio": 0,
        }
      }
    },
    {
      "mandalName": "Santhakaviti",
        population2001: 66893,
  population2011: 65419,
  annualExponantional: -0.0022,
        medianAgeAtDeath: {
        age2023: 72,
        age2024: 71,
        age2025: 73
    }, 
      sexRatio:  997,
  deathsBefore60Percentage:34.31,
  deathsBefore70Percentage: 56.8,
  placeOfDeath: {
  hospital: 12.49,
  other: 87.51
},
tfr:1.0,
      dependencyRatio: {
    childDependency: 14,
    oldAgeDependency: 18
  },
      ageDistribution: {
    age0To14: 14.40,
    age15To59: 67.33,
    age60Plus: 18.27
  },
      "yearWiseData": {
         2023: {
    totalPopulation: 63906.44,
    totalBirths: 632,
    totalDeaths: 498,
    birthRate: 10.58,
    deathRate: 7.79,
    tfr: 1.22,
    sexRatio: 105,
    populationGrowthRate: 0
  },
  2024: {
    totalPopulation: 64054.62,
    totalBirths: 578,
    totalDeaths: 470,
    birthRate: 9.65,
    deathRate: 7.34,
    tfr: 1.12,
    sexRatio: 91,
    populationGrowthRate: 0.23
  },
  2025: {
    totalPopulation: 64174.57,
    totalBirths: 546,
    totalDeaths: 464,
    birthRate: 9.10,
    deathRate: 7.23,
    tfr: 1.06,
    sexRatio: 109,
    populationGrowthRate: 0.19
  },
        "2026": {
          "totalPopulation":  0,
          "totalBirths": 0,
          "totalDeaths": 0,
          "tfr": 0,
		  "sexRatio": 0,
        }
      }
    },
    {
      "mandalName": "Srungavarapukota",
        population2001: 74500,
  population2011: 75917,
  annualExponantional: 0.0019,
        medianAgeAtDeath: {
        age2023: 68,
        age2024: 67,
        age2025: 68
    },
      sexRatio: 1066,
        deathsBefore60Percentage:32.93,
  deathsBefore70Percentage: 56.2,
  placeOfDeath: {
  hospital: 12.54,
  other: 87.46
},
tfr:1.1,
      dependencyRatio: {
    childDependency: 15,
    oldAgeDependency: 15
  },
      ageDistribution: {
    age0To14: 14.59,
    age15To59: 70.62,
    age60Plus: 14.79
  },
      "yearWiseData": {
       2023: {
    totalPopulation: 77804.80,
    totalBirths: 753,
    totalDeaths: 617,
    birthRate: 10.35,
    deathRate: 7.93,
    tfr: 1.20,
    sexRatio: 93,
    populationGrowthRate: 0
  },
  2024: {
    totalPopulation: 77781.06,
    totalBirths: 651,
    totalDeaths: 720,
    birthRate: 8.95,
    deathRate: 9.26,
    tfr: 1.05,
    sexRatio: 108,
    populationGrowthRate: -0.03
  },
  2025: {
    totalPopulation: 77751.12,
    totalBirths: 605,
    totalDeaths: 677,
    birthRate: 8.32,
    deathRate: 8.71,
    tfr: 0.98,
    sexRatio: 97,
    populationGrowthRate: -0.04
  },
        "2026": {
          "totalPopulation": 0,
          "totalBirths": 0,
          "totalDeaths": 0,
          "tfr": 0,
		      "sexRatio": 0,
        }
      }
    },
    {
      "mandalName": "Therlam",
        population2001: 59691,
  population2011: 59688,
  annualExponantional: 0.0000,
        medianAgeAtDeath: {
        age2023: 72,
        age2024: 71,
        age2025: 71
    },
      sexRatio:  1003,
        deathsBefore60Percentage:25.66,
  deathsBefore70Percentage: 46.4,
  placeOfDeath: {
  hospital: 10.9,
  other: 89.1
},
tfr:1.1,
      dependencyRatio: {
    childDependency: 14,
    oldAgeDependency: 20
  },
      ageDistribution: {
    age0To14: 14.46,
    age15To59: 65.85,
    age60Plus: 19.69
  },
      "yearWiseData": {
        2023: {
    totalPopulation: 59814.66,
    totalBirths: 578,
    totalDeaths: 488,
    birthRate: 10.33,
    deathRate: 8.16,
    tfr: 1.20,
    sexRatio: 122,
    populationGrowthRate: 0
  },
  2024: {
    totalPopulation: 59899.27,
    totalBirths: 541,
    totalDeaths: 494,
    birthRate: 9.66,
    deathRate: 8.25,
    tfr: 1.12,
    sexRatio: 93,
    populationGrowthRate: 0.14
  },
  2025: {
    totalPopulation: 59890.18,
    totalBirths: 459,
    totalDeaths: 500,
    birthRate: 8.20,
    deathRate: 8.35,
    tfr: 0.97,
    sexRatio: 99,
    populationGrowthRate: -0.02
  },
        "2026": {
          "totalPopulation": 0,
          "totalBirths": 0,
          "totalDeaths": 0,
          "tfr": 0,
		      "sexRatio": 0,
        }
      }
    },
    {
      "mandalName": "Vangara",
        population2001: 47879,
  population2011: 41133,
  annualExponantional: -0.0152,
          medianAgeAtDeath: {
        age2023: 71,
        age2024: 69,
        age2025: 69
    },
      sexRatio: 1009,
        deathsBefore60Percentage:30.43,
  deathsBefore70Percentage: 51.5,
  placeOfDeath: {
  hospital: 9.87,
  other: 90.13
},
tfr:1.2,
      dependencyRatio: {
    childDependency: 14,
    oldAgeDependency: 19
  },
      ageDistribution: {
    age0To14: 14.45,
    age15To59: 66.88,
    age60Plus: 18.67
  },
      "yearWiseData": {
        2023: {
    totalPopulation: 34468.83,
    totalBirths: 347,
    totalDeaths: 313,
    birthRate: 10.77,
    deathRate: 9.08,
    tfr: 1.24,
    sexRatio: 96,
    populationGrowthRate: 0
  },
  2024: {
    totalPopulation: 34576.90,
    totalBirths: 375,
    totalDeaths: 293,
    birthRate: 11.60,
    deathRate: 8.47,
    tfr: 1.33,
    sexRatio: 121,
    populationGrowthRate: 0.31
  },
  2025: {
    totalPopulation: 34577.98,
    totalBirths: 260,
    totalDeaths: 277,
    birthRate: 8.04,
    deathRate: 8.01,
    tfr: 0.95,
    sexRatio: 112,
    populationGrowthRate: 0.00
  },
        "2026": {
          "totalPopulation": 0,
          "totalBirths": 0,
          "totalDeaths": 0,
          "tfr": 0,
		       "sexRatio": 0,
        }
      }
    },
    {
      "mandalName": "Vepada",
        population2001: 50342,
  population2011: 50580,
  annualExponantional: 0.0005,
        medianAgeAtDeath: {
        age2023: 70,
        age2024: 69,
        age2025: 69.5
    },
      sexRatio:  1042,
        deathsBefore60Percentage:29.76,
  deathsBefore70Percentage: 50.5,
  placeOfDeath: {
  hospital: 7.09,
  other: 92.91
},
tfr:1.0,
      dependencyRatio: {
    childDependency: 14,
    oldAgeDependency: 17
  },
      ageDistribution: {
    age0To14: 14.50,
    age15To59: 68.06,
    age60Plus: 17.45
  },
      "yearWiseData": {
        2023: {
    totalPopulation: 50860.20,
    totalBirths: 390,
    totalDeaths: 418,
    birthRate: 8.20,
    deathRate: 8.22,
    tfr: 0.97,
    sexRatio: 113,
    populationGrowthRate: 0
  },
  2024: {
    totalPopulation: 50911.04,
    totalBirths: 458,
    totalDeaths: 439,
    birthRate: 9.62,
    deathRate: 8.62,
    tfr: 1.12,
    sexRatio: 98,
    populationGrowthRate: 0.10
  },
  2025: {
    totalPopulation: 50822.94,
    totalBirths: 387,
    totalDeaths: 502,
    birthRate: 8.14,
    deathRate: 9.88,
    tfr: 0.96,
    sexRatio: 98,
    populationGrowthRate: -0.17
  },
        "2026": {
          "totalPopulation": 0,
          "totalBirths": 0,
          "totalDeaths": 0,
          "tfr": 0,
		     "sexRatio": 0,
        }
      }
    },
      {
      "mandalName": "Vizianagaram",
        population2001: 242839,
  population2011: 283550,
  annualExponantional: 0.0155,
          medianAgeAtDeath: {
        age2023: 66,
        age2024: 65,
        age2025: 65
    },
      sexRatio: 1028,
  deathsBefore60Percentage:35.56,
  deathsBefore70Percentage: 60.5,
  placeOfDeath: {
  hospital: 24.83,
  other: 75.17
},
tfr:1.5,
  dependencyRatio: {
    childDependency: 16,
    oldAgeDependency: 14
  },
  ageDistribution: {
    age0To14: 15.91,
    age15To59: 70.32,
    age60Plus: 13.76
  },
      "yearWiseData": {
        2023: {
    totalPopulation: 341438.79,
    totalBirths: 3463,
    totalDeaths: 2454,
    birthRate: 10.85,
    deathRate: 7.19,
    tfr: 1.25,
    sexRatio: 107,
    populationGrowthRate: 0
  },
  2024: {
    totalPopulation: 342645.44,
    totalBirths: 3663,
    totalDeaths: 2711,
    birthRate: 11.43,
    deathRate: 7.91,
    tfr: 1.31,
    sexRatio: 105,
    populationGrowthRate: 0.35
  },
  2025: {
    totalPopulation: 345880.27,
    totalBirths: 5737,
    totalDeaths: 2901,
    birthRate: 17.74,
    deathRate: 8.39,
    tfr: 2.00,
    sexRatio: 106,
    populationGrowthRate: 0.94
  },
        "2026": {
          "totalPopulation": 0,
          "totalBirths": 0,
          "totalDeaths": 0,
          "tfr": 0,
		     "sexRatio": 0,
        }
      }
    }

    ]
  }

];


  currentYear: number = new Date().getFullYear();
  selectedYear: number = 2025;
  yearList: number[] = [];
  selectedDistrictName: string = '';
  birthSexRatioData: any;
  sexRatioData: any;
  updateFlag = false;
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
      this.loadDistrictData();
      this.loadDistrictDashboardData();
    });
  }
  loadDistrictData() {
    this.districtDetails = this.districtData.find(
      (x) => x.districtName === this.selectedDistrictName,
    );
    // LOAD MANDALS
    // INITIAL DISTRICT SUMMARY
      this.dashboardSummary.childDependency =
    this.districtDetails?.dependencyRatio?.childDependency || 0;
  this.dashboardSummary.oldAgeDependency =
    this.districtDetails?.dependencyRatio?.oldAgeDependency || 0;
     // this.dashboardSummary.population2001 =
    // this.districtDetails?.population2001 || 0;
    //       this.dashboardSummary.population2011 =
    // this.districtDetails?.population2011 || 0;
    //           this.dashboardSummary.annualExponantional =
    // this.districtDetails?.annualExponantional || 0;
    const ageDistribution = this.districtDetails?.ageDistribution || {};
    this.loadAgeWiseChart(
    ageDistribution.age0To14 || 0,
    ageDistribution.age15To59 || 0,
    ageDistribution.age60Plus || 0
  );
  }

  onMandalChange(event: any, mandal: any) {
    if (event.target.checked) {
      this.selectedMandals.push(mandal.mandalName);
    } else {
      this.selectedMandals = this.selectedMandals.filter(
        (x) => x !== mandal.mandalName,
      );
    }
    this.loadDashboardSummary();
    this.loadBarChart();
    this.loadLineChart();
  
  }

loadDashboardSummary() {

  // ===================================
  // DISTRICT MODE
  // ===================================
  if (!this.selectedMandal) {

      const districtYearData =
    this.districtDetails?.districtYearWiseData?.[
      this.selectedYear
    ] || {};

  this.dashboardSummary = {
    ...districtYearData,

    population2001:
      this.districtDetails?.population2001 || 0,

    population2011:
      this.districtDetails?.population2011 || 0,

    annualExponantional:
      this.districtDetails?.annualExponantional || 0,
  };

  return;
  }

  // ===================================
  // MANDAL MODE
  // ===================================

  const selectedMandalData = this.mandalList.find(
    x => x.mandalName === this.selectedMandal
  );

  if (!selectedMandalData) {
    this.dashboardSummary = {};
    return;
  }

  const yearData =
    selectedMandalData?.yearWiseData?.[
      this.selectedYear
    ];

  if (!yearData) {
    this.dashboardSummary = {};
    return;
  }

  this.dashboardSummary = {
    totalPopulation: yearData.totalPopulation || 0,
    totalBirths: yearData.totalBirths || 0,
    totalDeaths: yearData.totalDeaths || 0,
    birthRate: yearData.birthRate || 0,
    deathRate: yearData.deathRate || 0,
    tfr: yearData.tfr || 0,
    sexRatio: yearData.sexRatio || 0,
    populationGrowthRate: yearData.populationGrowthRate || 0,
  };
}



  onYearChange(year: number) {
    this.selectedYear = year;
    //this.loadDashboardSummary();
    this.loadDistrictDashboardData();
    //   this.loadBarChart();
    //  this.loadLineChart();
    //  this.loadMedianAgeAtDeathChart();
  }


  goBack() {
    this.router.navigate(['/shared/dashboard']);
  }

  Highcharts: typeof Highcharts = Highcharts;
  lineChartOptions: Highcharts.Options = {
    chart: {
      type: 'line',
      backgroundColor: 'transparent',
    },
    title: { text: '' },

    xAxis: {
      categories: ['2023', '2024', '2025', '2026'],
      lineColor: '#e0e0e0',
    },

    yAxis: {
      title: { text: '' },
      gridLineColor: '#f1f3f5',
    },

    legend: {
      align: 'center',
      verticalAlign: 'bottom',
    },

    plotOptions: {
      line: {
        marker: {
          radius: 4,
        },
        lineWidth: 3,
      },
      series: {
        animation: {
          duration: 1000,
        },
      },
    },

    series: [
      {
        type: 'line',
        name: 'Births',
        data: [18248, 16053, 13937, 3220],
        color: '#86efac',
      },
      {
        type: 'line',
        name: 'Deaths',
        data: [15918, 15414, 14240, 4592],
        color: '#fca5a5',
      },
    ],
  };
  barChartOptions: Highcharts.Options = {
    chart: {
      type: 'column',
      backgroundColor: 'transparent',
    },
    title: { text: '' },

    xAxis: {
      categories: ['Rajahmundry', 'Anaparthy', 'Kovvur', 'Kadiam'],
      lineColor: '#e0e0e0',
    },

    yAxis: {
      title: { text: '' },
      gridLineColor: '#f1f3f5',
    },

    legend: {
      align: 'center',
      verticalAlign: 'bottom',
    },

    plotOptions: {
      column: {
        borderRadius: 6,
        pointPadding: 0.2,
      },
      series: {
        animation: {
          duration: 1200,
        },
      },
    },

    series: [
      {
        type: 'column',
        name: 'Births',
        data: [3549, 1110, 1027, 860],
        color: '#86efac',
      },
      {
        type: 'column',
        name: 'Deaths',
        data: [2982, 980, 979, 760],
        color: '#fca5a5',
      },
    ],
  };

loadBarChart() {

  let chartData: any[] = [];

  // =====================================
  // DISTRICT MODE
  // =====================================
  if (!this.selectedMandal) {
    chartData = this.mandalList;
  }

  // =====================================
  // MANDAL MODE
  // =====================================
  else {
    const mandal = this.mandalList.find(
      x => x.mandalName === this.selectedMandal
    );

    chartData = mandal ? [mandal] : [];
  }

  // =====================================
  // DYNAMIC VALUES
  // =====================================

  const categories = chartData.map(x => x.mandalName);

  const birthsData = chartData.map(
    x => x.yearWiseData?.[this.selectedYear]?.totalBirths || 0
  );

  const deathsData = chartData.map(
    x => x.yearWiseData?.[this.selectedYear]?.totalDeaths || 0
  );

  // =====================================
  // CHART OPTIONS
  // =====================================

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
      },
      series: {
        animation: {
          duration: 1200
        }
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
    ]
  };
}

loadLineChart() {

  const years = [2023, 2024, 2025, 2026];

  // =====================================
  // DISTRICT MODE
  // =====================================
  if (!this.selectedMandal) {

    const birthsData = years.map(
      year =>
        this.districtDetails
          ?.districtYearWiseData?.[year]
          ?.totalBirths || 0
    );

    const deathsData = years.map(
      year =>
        this.districtDetails
          ?.districtYearWiseData?.[year]
          ?.totalDeaths || 0
    );

    this.updateLineChart(
      years,
      birthsData,
      deathsData
    );

    return;
  }

  // =====================================
  // MANDAL MODE
  // =====================================

  const mandal = this.mandalList.find(
    x => x.mandalName === this.selectedMandal
  );

  if (!mandal) {
    return;
  }

  const birthsData = years.map(
    year =>
      mandal.yearWiseData?.[year]
        ?.totalBirths || 0
  );

  const deathsData = years.map(
    year =>
      mandal.yearWiseData?.[year]
        ?.totalDeaths || 0
  );

  this.updateLineChart(
    years,
    birthsData,
    deathsData
  );
}

loadMedianAgeAtDeathChart() {
  const categories = this.mandalList.map(
    (m: any) => m.mandalName
  );

  const data2023 = this.mandalList.map(
    (m: any) => m.medianAgeAtDeath?.age2023 || 0
  );

  const data2024 = this.mandalList.map(
    (m: any) => m.medianAgeAtDeath?.age2024 || 0
  );

  const data2025 = this.mandalList.map(
    (m: any) => m.medianAgeAtDeath?.age2025 || 0
  );

  this.medianAgeChartOptions = {
    chart: {
      type: 'column'
    },

    title: {
      text: ''
    },

    xAxis: {
      categories: categories,
      labels: {
        rotation: -45
      }
    },

    yAxis: {
      min: 60,
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
    ],

    credits: {
      enabled: false
    }
  };
}

updateLineChart(
  years: number[],
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
    this.loadDashboardSummary();
    //this.loadBarChart();
    this.loadLineChart();
    this.loadMedianAgeAtDeathChart();
      this.dashboardSummary.childDependency =
    mandal?.dependencyRatio?.childDependency || 0;
  this.dashboardSummary.oldAgeDependency =
    mandal?.dependencyRatio?.oldAgeDependency || 0;
      this.dashboardSummary.population2001 =
    mandal?.population2001 || 0;
  this.dashboardSummary.population2011 =
    mandal?.population2011 || 0;
  this.dashboardSummary.annualExponantional =
    mandal?.annualExponantional || 0;
    this.loadAgeWiseChart(
    mandal.ageDistribution.age0To14,
    mandal.ageDistribution.age15To59,
    mandal.ageDistribution.age60Plus
  );

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
}

loadSexRatioChart() {
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
  const districtPopulation =
    this.districtDetails?.districtYearWiseData[2025]?.totalPopulation;

  const districtBirths =
    this.districtDetails?.districtYearWiseData[2023]?.totalBirths +
    this.districtDetails?.districtYearWiseData[2024]?.totalBirths +
    this.districtDetails?.districtYearWiseData[2025]?.totalBirths;

  const chartData = this.mandalList.map((m: any) => {

    const totalBirths =
      (m.yearWiseData?.[2023]?.totalBirths || 0) +
      (m.yearWiseData?.[2024]?.totalBirths || 0) +
      (m.yearWiseData?.[2025]?.totalBirths || 0);

    const population =
      m.yearWiseData?.[2025]?.totalPopulation || 0;

    return {
      mandalName: m.mandalName,

      populationShare: Number(
        ((population / districtPopulation) * 100).toFixed(2)
      ),

      birthShare: Number(
        ((totalBirths / districtBirths) * 100).toFixed(2)
      )
    };
  });

  // Sort by population share ascending
  chartData.sort(
    (a, b) => a.populationShare - b.populationShare
  );

  const categories =
    chartData.map(x => x.mandalName);

  const populationShareData =
    chartData.map(x => x.populationShare);

  const birthShareData =
    chartData.map(x => x.birthShare);

  this.populationBirthShareChartOptions = {

    chart: {
      type: 'column'
    },

    title: {
      text: ''
    },

    xAxis: {
      categories: categories,
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
          format: '{y:.1f}'
        }
      }
    },

    series: [
      {
        name: 'Share of population in sub-districts',
        type: 'column',
        data: populationShareData
      },
      {
        name: 'Share of births among all sub-districts',
        type: 'column',
        data: birthShareData
      }
    ]
  };
}
loadPlaceOfDeathChart() {

  const chartData = this.mandalList
    .map((m: any) => ({
      mandalName: m.mandalName,
      hospital: m.placeOfDeath?.hospital || 0,
      other: m.placeOfDeath?.other || 0
    }))
    .sort((a, b) => a.hospital - b.hospital);

  const categories =
    chartData.map(x => x.mandalName);

  const hospitalData =
    chartData.map(x => x.hospital);

  const otherData =
    chartData.map(x => x.other);

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
        text: 'Percentage'
      },

      stackLabels: {
        enabled: false
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
          enabled: false
        }
      }
    },

    series: [
      {
        name: 'Hospital',
        type: 'column',
        data: hospitalData
      },
      {
        name: 'Other',
        type: 'column',
        data: otherData
      }
    ]
  };
}

loadDeathsBefore60Chart() {

  const chartData = [...this.mandalList]
    .map((m: any) => ({
      mandalName: m.mandalName,
      percentage: m.deathsBefore60Percentage || 0
    }))
    .sort((a, b) => a.percentage - b.percentage);

  const categories =
    chartData.map(x => x.mandalName);

  const percentageData =
    chartData.map(x => x.percentage);

  this.deathsBefore60ChartOptions = {

    chart: {
      type: 'column'
    },

    title: {
      text: 'Percentage of deaths before age 60'
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

    series: [
      {
        name: 'Deaths Before Age 60',
        type: 'column',
        data: percentageData
      }
    ]
  };
}
loadDeathsBefore70Chart() {

  const chartData = [...this.mandalList]
    .map((m: any) => ({
      mandalName: m.mandalName,
      percentage: m.deathsBefore70Percentage || 0
    }))
    .sort((a, b) => a.percentage - b.percentage);

  const categories =
    chartData.map(x => x.mandalName);

  const percentageData =
    chartData.map(x => x.percentage);

  this.deathsBefore70ChartOptions = {
    

    chart: {
      type: 'column',
       scrollablePlotArea: {
    minWidth: categories.length * 60,
    scrollPositionX: 0
  }
    },

    title: {
      text: 'Percentage of deaths before age 70'
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

    series: [
      {
        name: 'Deaths Before Age 70',
        type: 'column',
        data: percentageData
      }
    ]
  };
}
loadDeathShareBirthChart() {

  const chartData = this.mandalList.map((m: any) => {

    const totalBirths =
      (m.yearWiseData?.[2023]?.totalBirths || 0) +
      (m.yearWiseData?.[2024]?.totalBirths || 0) +
      (m.yearWiseData?.[2025]?.totalBirths || 0);

    const totalDeaths =
      (m.yearWiseData?.[2023]?.totalDeaths || 0) +
      (m.yearWiseData?.[2024]?.totalDeaths || 0) +
      (m.yearWiseData?.[2025]?.totalDeaths || 0);

    const deathShare =
      totalBirths > 0
        ? +(totalDeaths / totalBirths).toFixed(2)
        : 0;

    return {
      mandalName: m.mandalName,
      deathShare
    };
  });

  // Sort ascending
  chartData.sort(
    (a, b) => a.deathShare - b.deathShare
  );

  const categories =
    chartData.map(x => x.mandalName);

  const deathShareData =
    chartData.map(x => x.deathShare);

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

    series: [
      {
        name: 'Death as Share of Births',
        type: 'column',
        data: deathShareData
      }
    ]
  };
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
  const chartData = this.mandalList.map((m: any) => ({
    mandalName: m.mandalName,
    tfr: m.tfr || 0
  }));

  // Add District TFR
  chartData.push({
    mandalName: this.selectedDistrictName + ' District',
    tfr: this.districtDetails?.districtTFR || 0
  });

  // Sort ascending
  chartData.sort((a, b) => a.tfr - b.tfr);

  const categories = chartData.map(x => x.mandalName);

  const tfrData = chartData.map(x => {

    const isDistrict =
      x.mandalName ===
      this.selectedDistrictName + ' District';

    return {
      y: x.tfr,

      color: isDistrict
        ? '#FFC000'   // Yellow for district
        : '#4472C4'   // Blue for mandals
    };
  });

  this.tfrChartOptions = {

    chart: {
      type: 'column'
    },

    title: {
      text: `TFR in Sub-districts of ${this.selectedDistrictName} District`
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
      pointFormat: '<b>{point.y:.2f}</b>'
    },

    credits: {
      enabled: false
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
        name: 'TFR',
        type: 'column',
        data: tfrData
      }
    ]
  };
}

loadAnnualGrowthRateChart() {

  const chartData = this.mandalList.map((m: any) => ({
    mandalName: m.mandalName,
    growthRate:
      +((m.annualExponantional || 0) * 100).toFixed(2)
  }));

  // Add district value
  chartData.push({
    mandalName: this.selectedDistrictName,
    growthRate:
      +((this.districtDetails?.annualExponantional || 0) * 100).toFixed(2)
  });

  // Sort ascending
  chartData.sort(
    (a, b) => a.growthRate - b.growthRate
  );

  const categories =
    chartData.map((x: any) => x.mandalName);

  const growthData =
    chartData.map((x: any) => {

      const isDistrict =
        x.mandalName === this.selectedDistrictName;

      return {
        y: x.growthRate,
        color: isDistrict
          ? '#FFC000'
          : '#4472C4'
      };
    });

  this.annualGrowthRateChartOptions = {

    chart: {
      type: 'column'
    },

    title: {
      text: 'Average annual exponential growth rate of population, 2001-11 (%)'
    },

    xAxis: {
      categories,
      labels: {
        rotation: -45
      }
    },

    yAxis: {
      title: {
        text: 'Percentage'
      },
      plotLines: [
        {
          value: 0,
          width: 1,
          color: '#999'
        }
      ]
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
          format: '{y:.2f}'
        }
      }
    },

    series: [
      {
        name: 'Growth Rate',
        type: 'column',
        data: growthData
      }
    ]
  };
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

    const [
      districtResponse,
      birthSexRatioResponse,
      sexRatioResponse
    ] = await Promise.all([
      this.auth.auth_utilities_rtgs(req1),
      this.auth.auth_utilities_rtgs(req2),
      this.auth.auth_utilities_rtgs(req3)
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
  tfr:district.EST_TFR_FOR
};
}

    // Table 2.2(a)
    if (birthSexRatioResponse?.code) {
      this.birthSexRatioData =
        birthSexRatioResponse.Details || [];
        this.updateSexRatioCard();

         this.birthSexRatioData =
    birthSexRatioResponse.Details || [];

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
  console.log('loadBirthSexRatioChart', this.csrMandalList);
    }

    // GSWS Sex Ratio
    if (sexRatioResponse?.code) {
      this.sexRatioData =
        sexRatioResponse.Details || [];
        this.mandalList = this.sexRatioData.map((item: any) => ({
    mandalName: item.MANDAL_NAME,
  }));

    }
    console.log('District Summary',district, this.dashboardSummary);
    console.log('Birth Sex Ratio', this.birthSexRatioData);
    console.log('GSWS Sex Ratio', this.sexRatioData);
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
  const totalFemale = yearData.reduce(
    (sum: number, item: any) => sum + (+item.FEMALE || 0),
    0
  );
  const totalMale = yearData.reduce(
    (sum: number, item: any) => sum + (+item.MALE || 0),
    0
  );

  this.dashboardSummary.sexRatio =
    totalMale > 0
      ? Math.round(( totalMale / totalFemale) * 1000)
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
  this.loadAgeSexDistributionChart();
  this.loadAnnualGrowthRateChart();
  this.loadTfrChart();
}

}

