import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as Highcharts from 'highcharts';





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
  districtData = [

  // =====================================================
  // EAST GODAVARI
  // =====================================================

  {
    districtName: 'East Godavari',

    districtYearWiseData: {

     2023: {
    totalPopulation: 1764672,
    totalBirths: 18248,
    totalDeaths: 15918,
    tfr: 1.01,
    sexRatio: 107,
    birthRate: 10.34,
    deathRate: 9.02
  },

  2024: {
    totalPopulation: 1763942,
    totalBirths: 16165,
    totalDeaths: 15411,
    tfr: 1.01,
    sexRatio: 105,
    birthRate: 9.16,
    deathRate: 8.74
  },

  2025: {
    totalPopulation: 1761992,
    totalBirths: 13897,
    totalDeaths: 14240,
    tfr: 1.01,
    sexRatio: 107,
    birthRate: 7.89,
    deathRate: 8.08
  },

  2026: {
    totalPopulation: 1947731,
    totalBirths: 3220,
    totalDeaths: 4592,
    tfr: 1.01,
    sexRatio: 0,
    birthRate: 1.65,
    deathRate: 2.36
  }

    },

      "mandals": [
    {
      "mandalName": "Anaparthy",
      "yearWiseData": {
        "2023": {
          "totalPopulation": 68197,
          "totalBirths": 1110,
          "totalDeaths": 680,
          "tfr": 1.31,
          "sexRatio": 104
        },
        "2024": {
          "totalPopulation": 68139,
          "totalBirths": 622,
          "totalDeaths": 704,
          "tfr": 1.31,
          "sexRatio": 106
        },
        "2025": {
          "totalPopulation": 68002,
          "totalBirths": 567,
          "totalDeaths": 642,
          "tfr": 1.31,
          "sexRatio": 92
        },
        "2026": {
          "totalPopulation": 75440,
          "totalBirths": 134,
          "totalDeaths": 223,
          "tfr": 1.31,
          "sexRatio": 0
        }
      }
    },
    {
      "mandalName": "Biccavolu",
      "yearWiseData": {
        "2023": {
          "totalPopulation": 67290,
          "totalBirths": 518,
          "totalDeaths": 595,
          "tfr": 0.82,
          "sexRatio": 108
        },
        "2024": {
          "totalPopulation": 67183,
          "totalBirths": 488,
          "totalDeaths": 609,
          "tfr": 0.82,
          "sexRatio": 113
        },
        "2025": {
          "totalPopulation": 66940,
          "totalBirths": 366,
          "totalDeaths": 596,
          "tfr": 0.82,
          "sexRatio": 104
        },
        "2026": {
          "totalPopulation": 74256,
          "totalBirths": 84,
          "totalDeaths": 180,
          "tfr": 0.82,
          "sexRatio": 0
        }
      }
    },
    {
      "mandalName": "Chagallu",
      "yearWiseData": {
        "2023": {
          "totalPopulation": 63874,
          "totalBirths": 569,
          "totalDeaths": 523,
          "tfr": 1.03,
          "sexRatio": 117
        },
        "2024": {
           "totalPopulation": 63888,
          "totalBirths": 537,
          "totalDeaths": 597,
          "tfr": 1.03,
          "sexRatio": 105
        },
        "2025": {
          "totalPopulation": 63864,
          "totalBirths": 573,
          "totalDeaths": 525,
          "tfr": 1.03,
          "sexRatio": 95
        },
        "2026": {
          "totalPopulation": 66456,
          "totalBirths": 123,
          "totalDeaths": 193,
          "tfr": 1.03,
          "sexRatio": 0
        }
      }
    },
    {
      "mandalName": "Devarapalle",
      "yearWiseData": {
        "2023": {
          "totalPopulation": 78806,
          "totalBirths": 671,
          "totalDeaths": 661,
          "tfr": 0.98,
          "sexRatio": 110
        },
        "2024": {
          "totalPopulation": 78815,
          "totalBirths": 670,
          "totalDeaths": 664,
          "tfr": 0.98,
          "sexRatio": 103
        },
        "2025": {
          "totalPopulation": 78761,
          "totalBirths": 610,
          "totalDeaths": 624,
          "tfr": 0.98,
          "sexRatio": 119
        },
        "2026": {
          "totalPopulation": 85382,
          "totalBirths": 146,
          "totalDeaths": 200,
          "tfr": 0.98,
          "sexRatio": 0,
        }
      }
    },
    {
      "mandalName": "Gokavaram",
      "yearWiseData": {
        "2023": {
          "totalPopulation": 67684,
          "totalBirths": 839,
          "totalDeaths": 593,
          "tfr": 1.29,
          "sexRatio": 109
        },
        "2024": {
          "totalPopulation": 67769,
          "totalBirths": 678,
          "totalDeaths": 518,
          "tfr": 1.29,
          "sexRatio": 109
        },
        "2025": {
          "totalPopulation": 67978,
          "totalBirths": 727,
          "totalDeaths": 516,
          "tfr": 1.29,
          "sexRatio": 125
        },
        "2026": {
          "totalPopulation": 73961,
          "totalBirths": 164,
          "totalDeaths": 188,
          "tfr": 1.29,
          "sexRatio": 0
        }
      }
    },
    {
      "mandalName": "Gopalapuram",
      "yearWiseData": {
        "2023": {
          "totalPopulation": 63102,
          "totalBirths": 460,
          "totalDeaths": 543,
          "tfr": 0.94,
          "sexRatio": 97
        },
        "2024": {
          "totalPopulation": 63060,
          "totalBirths": 501,
          "totalDeaths": 563,
          "tfr": 0.94,
          "sexRatio": 104
        },
        "2025": {
          "totalPopulation": 63027,
          "totalBirths": 530,
          "totalDeaths": 488,
          "tfr": 0.94,
          "sexRatio": 81
        },
        "2026": {
          "totalPopulation": 67180,
          "totalBirths": 107,
          "totalDeaths": 173,
          "tfr": 0.94
        }
      }
    },
    {
      "mandalName": "Kadiam",
      "yearWiseData": {
        "2023": {
          "totalPopulation": 88358,
          "totalBirths": 860,
          "totalDeaths": 735,
          "tfr": 0.99,
          "sexRatio": 99
        },
        "2024": {
          "totalPopulation": 81723,
          "totalBirths": 709,
          "totalDeaths": 699,
          "tfr": 0.99,
          "sexRatio": 95
        },
        "2025": {
          "totalPopulation": 88270,
          "totalBirths": 637,
          "totalDeaths": 735,
          "tfr": 0.99,
          "sexRatio": 110
        },
        "2026": {
          "totalPopulation": 100640,
          "totalBirths": 154,
          "totalDeaths": 251,
          "tfr": 0.99,
          "sexRatio": 0
        }
      }
    },
    {
      "mandalName": "Korukonda",
      "yearWiseData": {
        "2023": {
          "totalPopulation": 81676,
          "totalBirths": 849,
          "totalDeaths": 745,
          "tfr": 1.11,
          "sexRatio": 119
        },
        "2024": {
          "totalPopulation": 81723,
          "totalBirths": 792,
          "totalDeaths": 765,
          "tfr": 1.11,
          "sexRatio": 96
        },
        "2025": {
          "totalPopulation": 81619,
          "totalBirths": 661,
          "totalDeaths": 651,
          "tfr": 1.11,
          "sexRatio": 116
        },
        "2026": {
          "totalPopulation": 84802,
          "totalBirths": 154,
          "totalDeaths": 206,
          "tfr": 1.11,
          "sexRatio": 0
        }
      }
    },
    {
      "mandalName": "Kovvur",
      "yearWiseData": {
        "2023": {
          "totalPopulation": 107797,
          "totalBirths": 1027,
          "totalDeaths": 987,
          "tfr": 0.98,
          "sexRatio": 104
        },
        "2024": {
          "totalPopulation": 107644,
          "totalBirths": 834,
          "totalDeaths": 902,
          "tfr": 0.98,
          "sexRatio": 106
        },
        "2025": {
          "totalPopulation": 107554,
          "totalBirths": 812,
          "totalDeaths": 944,
          "tfr": 0.98,
          "sexRatio": 103
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
      "yearWiseData": {
        "2023": {
          "totalPopulation": 84075,
          "totalBirths": 715,
          "totalDeaths": 637,
          "tfr": 0.97,
          "sexRatio": 105
        },
        "2024": {
          "totalPopulation": 84146,
          "totalBirths": 708,
          "totalDeaths": 616,
          "tfr": 0.97,
          "sexRatio": 99
        },
        "2025": {
          "totalPopulation": 84165,
          "totalBirths": 635,
          "totalDeaths": 602,
          "tfr": 0.97,
          "sexRatio": 101
        },
        "2026": {
          "totalPopulation": 88782,
          "totalBirths": 167,
          "totalDeaths": 182,
          "tfr": 0.97,
          "sexRatio": 0
        }
      }
    },
    {
      "mandalName": "Nidadavole",
      "yearWiseData": {
        "2023": {
          "totalPopulation": 106703,
          "totalBirths": 1110,
          "totalDeaths": 944,
          "tfr": 1.05,
          "sexRatio": 93
        },
        "2024": {
          "totalPopulation": 106757,
          "totalBirths": 998,
          "totalDeaths": 931,
          "tfr": 1.05,
          "sexRatio": 109
        },
        "2025": {
          "totalPopulation": 106682,
          "totalBirths": 856,
          "totalDeaths": 891,
          "tfr": 1.05,
          "sexRatio": 101
        },
        "2026": {
          "totalPopulation": 119292,
          "totalBirths": 206,
          "totalDeaths": 273,
          "tfr": 1.05,
          "sexRatio": 0
        }
      }
    },
    {
      "mandalName": "Peravali",
      "yearWiseData": {
        "2023": {
          "totalPopulation": 69497,
          "totalBirths": 671,
          "totalDeaths": 701,
          "tfr": 1.03,
          "sexRatio": 108
        },
        "2024": {
          "totalPopulation": 69415,
          "totalBirths": 619,
          "totalDeaths": 567,
          "tfr": 1.03,
          "sexRatio": 109
        },
        "2025": {
          "totalPopulation": 69395,
          "totalBirths": 547,
          "totalDeaths": 567,
          "tfr": 1.03,
          "sexRatio": 119
        },
        "2026": {
          "totalPopulation": 72636,
          "totalBirths": 121,
          "totalDeaths": 149,
          "tfr": 1.03,
          "sexRatio": 0
        }
      }
    },
    {
      "mandalName": "Rajahmundry Rural",
      "yearWiseData": {
        "2023": {
          "totalPopulation": 214998,
          "totalBirths": 1724,
          "totalDeaths": 1458,
          "tfr": 0.86,
          "sexRatio": 106
        },
        "2024": {
          "totalPopulation": 215098,
          "totalBirths": 1558,
          "totalDeaths": 1463,
          "tfr": 0.86,
          "sexRatio": 100
        },
        "2025": {
          "totalPopulation": 214935,
          "totalBirths": 1300,
          "totalDeaths": 1348,
          "tfr": 0.86,
          "sexRatio": 112
        },
        "2026": {
          "totalPopulation": 212836,
          "totalBirths": 323,
          "totalDeaths": 460,
          "tfr": 0.86,
          "sexRatio": 0
        }
      }
    },
    {
      "mandalName": "Rajahmundry Urban",
      "yearWiseData": {
        "2023": {
          "totalPopulation": 318267,
          "totalBirths": 3549,
          "totalDeaths": 2982,
          "tfr": 1.08,
          "sexRatio": 112
        },
        "2024": {
          "totalPopulation": 318380,
          "totalBirths": 3095,
          "totalDeaths": 2611,
          "tfr": 1.08,
          "sexRatio": 105
        },
        "2025": {
          "totalPopulation": 318046,
          "totalBirths": 2277,
          "totalDeaths": 2139,
          "tfr": 1.08,
          "sexRatio": 112
        },
        "2026": {
          "totalPopulation": 321535,
          "totalBirths": 507,
          "totalDeaths": 660,
          "tfr": 1.08,
          "sexRatio": 0
        }
      }
    },
    {
      "mandalName": "Rajanagaram",
      "yearWiseData": {
        "2023": {
          "totalPopulation": 114198,
          "totalBirths": 979,
          "totalDeaths": 789,
          "tfr": 0.97,
          "sexRatio": 119
        },
        "2024": {
          "totalPopulation": 114392,
          "totalBirths": 983,
          "totalDeaths": 886,
          "tfr": 0.97,
          "sexRatio": 117
        },
        "2025": {
          "totalPopulation": 114332,
          "totalBirths": 826,
          "totalDeaths": 804,
          "tfr": 0.97,
          "sexRatio": 114
        },
        "2026": {
          "totalPopulation": 126069,
          "totalBirths": 204,
          "totalDeaths": 254,
          "tfr": 0.97
        }
      }
    },
    {
      "mandalName": "Rangampeta",
      "yearWiseData": {
        "2023": {
          "totalPopulation": 59870,
          "totalBirths": 514,
          "totalDeaths": 513,
          "tfr": 0.96,
          "sexRatio": 95
        },
        "2024": {
          "totalPopulation": 59871,
          "totalBirths": 514,
          "totalDeaths": 474,
          "tfr": 0.96,
          "sexRatio": 113
        },
        "2025": {
          "totalPopulation": 59817,
          "totalBirths": 420,
          "totalDeaths": 403,
          "tfr": 0.96,
          "sexRatio": 93
        },
        "2026": {
          "totalPopulation": 61228,
          "totalBirths": 86,
          "totalDeaths": 148,
          "tfr": 0.96,
          "sexRatio": 0
        }
      }
    },
    {
      "mandalName": "Seethanagaram",
      "yearWiseData": {
        "2023": {
          "totalPopulation": 69742,
          "totalBirths": 730,
          "totalDeaths": 693,
          "tfr": 1.15,
          "sexRatio": 105
        },
        "2024": {
            "totalPopulation": 69740,
          "totalBirths": 691,
          "totalDeaths": 643,
          "tfr": 1.15,
          "sexRatio": 102
        },
        "2025": {
          "totalPopulation": 69722,
          "totalBirths": 625,
          "totalDeaths": 651,
          "tfr": 1.15,
          "sexRatio": 112
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
      "yearWiseData": {
        "2023": {
          "totalPopulation": 51288,
          "totalBirths": 773,
          "totalDeaths": 453,
          "tfr": 1.31,
          "sexRatio": 102
        },
        "2024": {
            "totalPopulation": 50924,
          "totalBirths": 489,
          "totalDeaths": 518,
          "tfr": 1.31,
          "sexRatio": 111
        },
        "2025": {
          "totalPopulation": 50875,
          "totalBirths": 469,
          "totalDeaths": 487,
          "tfr": 1.31,
          "sexRatio": 109
        },
        "2026": {
          "totalPopulation": 52150,
          "totalBirths": 73,
          "totalDeaths": 139,
          "tfr": 1.31
        }
      }
    },
    {
      "mandalName": "Undrajavaram",
      "yearWiseData": {
        "2023": {
          "totalPopulation": 74390,
          "totalBirths": 580,
          "totalDeaths": 686,
          "tfr": 0.88,
          "sexRatio": 109
        },
        "2024": {
          "totalPopulation": 74271,
          "totalBirths": 567,
          "totalDeaths": 684,
          "tfr": 0.88,
          "sexRatio": 96
        },
        "2025": {
          "totalPopulation": 74806,
          "totalBirths": 499,
          "totalDeaths": 627,
          "tfr": 0.88,
          "sexRatio": 98
        },
        "2026": {
          "totalPopulation": 83767,
          "totalBirths": 116,
          "totalDeaths": 198,
          "tfr": 0.88,
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
    ageDistribution: {
  age0To14: 14.94,
  age15To59: 69.58,
  age60Plus: 15.48
},
dependencyRatio: {
  childDependency: 15,
  oldAgeDependency: 15
},

    districtYearWiseData: {

  2023: {
    totalPopulation: 1776023,
    totalBirths: 18359,
    totalDeaths: 16174,
    tfr: 1.07,
    sexRatio: 104,
    birthRate: 10.37,
    deathRate: 9.14,
    populationGrowthRate: 0
  },

  2024: {
    totalPopulation: 1777164,
    totalBirths: 16134,
    totalDeaths: 15495,
    tfr: 1.07,
    sexRatio: 104,
    birthRate: 9.11,
    deathRate: 8.75,
    populationGrowthRate: -0.01
  },

  2025: {
    totalPopulation: 1777418,
    totalBirths: 13845,
    totalDeaths: 14262,
    tfr: 1.07,
    sexRatio: 105,
    birthRate: 7.83,
    deathRate: 8.06,
     populationGrowthRate: -0.07
  },
  2026: {
  totalPopulation: 1779032,
  totalBirths: 6096,
  totalDeaths: 7005,
  tfr: 1.07,
  sexRatio: 104,
  birthRate: 3.43,
  deathRate: 3.94,
  populationGrowthRate: 0.09
}

    },

    mandals: [

    {
      "mandalName": "Achanta",
      ageDistribution: {
      age0To14: 14.96,
      age15To59: 69.27,
      age60Plus: 15.78
    },
    dependencyRatio: {
  childDependency: 15,
  oldAgeDependency: 16
},

      "yearWiseData": {
        "2023": {
          "totalPopulation": 57808,
          "totalBirths": 553,
          "totalDeaths": 525,
          birthRate: 9.81, 
          deathRate: 9.18,
          "tfr": 1.08,
          "sexRatio": 97,
          populationGrowthRate: 0
        },
        "2024": {
          "totalPopulation": 57872,
          "totalBirths": 512,
          "totalDeaths": 484,
          birthRate: 10.01, 
          deathRate: 8.76,
          "tfr": 1.08,
          "sexRatio": 97,
          populationGrowthRate: -0.02
        },
        "2025": {
          "totalPopulation": 57878,
          "totalBirths": 436,
          "totalDeaths": 460,
          "tfr": 1.08,
          birthRate: 8.68,
          deathRate: 8.71,
          "sexRatio": 121,
          populationGrowthRate: -0.08
        },
        "2026": {
          totalPopulation: 57875,
          totalBirths: 220,
          totalDeaths: 238,
          tfr: 1.08,
          sexRatio: 106,
          populationGrowthRate: -0.01
        }
      }
    },
    {
      "mandalName": "Akividu",
      ageDistribution: {
  age0To14: 15.38,
  age15To59: 69.60,
  age60Plus: 15.02
},
dependencyRatio: {
  childDependency: 15,
  oldAgeDependency: 15
},
      "yearWiseData": {
        "2023": {
        totalPopulation: 73057,
        totalBirths: 220,
        totalDeaths: 271,
        tfr: 1.05,
        sexRatio: 113,
        birthRate: 10.45, deathRate: 8.26,
        populationGrowthRate: -0.07
        },
        "2024": {
          "totalPopulation": 73128,
          "totalBirths": 621,
          "totalDeaths": 569,
          "tfr": 1.05,
          "sexRatio": 112,
          birthRate: 9.89, deathRate: 8.10,
          "populationGrowthRate": 0.04
        },
        "2025": {
          "totalPopulation": 73108,
          "totalBirths": 522,
          "totalDeaths": 578,
          "tfr": 1.05,
          "sexRatio": 106,
          birthRate: 8.82, deathRate: 8.33,
          "populationGrowthRate": -0.07
        },
        "2026": {
          totalPopulation: 73057,
          totalBirths: 220,
          totalDeaths: 271,
          tfr: 1.05,
          sexRatio: 113,
          populationGrowthRate: -0.07
        }
      }
    },
    {
      "mandalName": "Attili",
      ageDistribution: {
      age0To14: 13.98,
      age15To59: 70.74,
      age60Plus: 15.28
    },
    dependencyRatio: {
  childDependency: 16,
  oldAgeDependency: 15
},
      "yearWiseData": {
        "2023": {
          "totalPopulation": 69781,
          "totalBirths": 665,
          "totalDeaths": 625,
          "tfr": 1.1,
          "sexRatio": 94,
          birthRate: 10.09, deathRate: 9.1,
          "populationGrowthRate": 0
        },
        "2024": {
          "totalPopulation": 69773,
          "totalBirths": 592,
          "totalDeaths": 641,
          "tfr": 1.1,
          "sexRatio": 106,
          birthRate: 9.74, deathRate: 9.47,
          "populationGrowthRate": -0.05
        },
        "2025": {
          "totalPopulation": 69799,
          "totalBirths": 588,
          "totalDeaths": 603,
          "tfr": 1.1,
          "sexRatio": 96,
          birthRate: 9.83, deathRate: 9.17,
          "populationGrowthRate": -0.08
        },
        "2026": {
        totalPopulation: 69738,
        totalBirths: 224,
        totalDeaths: 285,
        tfr: 1.10,
        sexRatio: 106,
        populationGrowthRate: -0.09
        }
      }
    },
    {
      "mandalName": "Bhimavaram",
      ageDistribution: {
  age0To14: 13.98,
  age15To59: 70.74,
  age60Plus: 15.28
},
dependencyRatio: {
  childDependency: 14,
  oldAgeDependency: 15
},
      "yearWiseData": {
        "2023": {
          "totalPopulation": 235783,
          "totalBirths": 2048,
          "totalDeaths": 1774,
          "tfr": 0.96,
          "sexRatio": 100,
          birthRate: 10.16, deathRate: 7.75,
          "populationGrowthRate": 0
        },
        "2024": {
          "populationGrowthRate": 0.11,
          "totalPopulation": 236014,
          "totalBirths": 1814,
          "totalDeaths": 1709,
          "tfr": 0.96,
          birthRate: 9.35, deathRate: 7.43,
          "sexRatio": 100
        },
        "2025": {
          "populationGrowthRate": -0.28,
          "totalPopulation": 236030,
          "totalBirths": 1553,
          "totalDeaths": 1645,
          "tfr": 0.96,
          birthRate: 8.22, deathRate: 7.47,
          "sexRatio": 110
        },
        "2026": {
          totalPopulation: 235865,
          totalBirths: 611,
          totalDeaths: 776,
          tfr: 0.96,
          sexRatio: 94,
          populationGrowthRate: -0.07
        }
      }
    },
    {
      "mandalName": "Ganapavaram",
      ageDistribution: {
        age0To14: 14.89,
        age15To59: 68.77,
        age60Plus: 16.34
      },
      dependencyRatio: {
  childDependency: 15,
  oldAgeDependency: 16
},
      "yearWiseData": {
        "2023": {
          "totalPopulation": 63027,
          "totalBirths": 398,
          "totalDeaths": 427,
          "tfr": 0.88,
          "sexRatio": 122,
          birthRate: 6.72, deathRate: 9.04,
          "populationGrowthRate": 0
        },
        "2024": {
          "populationGrowthRate": 0.11,
          "totalPopulation": 62975,
          "totalBirths": 496,
          "totalDeaths": 583,
          "tfr": 0.88,
          birthRate: 9.08, deathRate: 9.64,
          "sexRatio": 102
        },
        "2025": {
          "populationGrowthRate": -0.28,
          "totalPopulation": 62899,
          "totalBirths": 407,
          "totalDeaths": 511,
          "tfr": 0.88,
          birthRate: 8.07, deathRate: 8.72,
          "sexRatio": 88
        },
        "2026": {
        totalPopulation: 62848,
        totalBirths: 224,
        totalDeaths: 275,
        tfr: 0.88,
        sexRatio: 100,
        populationGrowthRate: -0.08
        }
      }
    },
    {
      "mandalName": "Iragavaram",
      ageDistribution: {
        age0To14: 15.74,
        age15To59: 68.85,
        age60Plus: 15.41
      },
      dependencyRatio: {
  childDependency: 16,
  oldAgeDependency: 15
},
      "yearWiseData": {
        "2023": {
          "populationGrowthRate": 0,
          "totalPopulation": 65265,
          "totalBirths": 581,
          "totalDeaths": 650,
          "tfr": 1.04,
          "sexRatio": 100,
          birthRate: 9.22, deathRate: 10.12,
        },
        "2024": {
          "populationGrowthRate": -0.13,
          "totalPopulation": 65286,
          "totalBirths": 564,
          "totalDeaths": 582,
          "tfr": 1.04,
          "sexRatio": 115,
          birthRate: 9.86, deathRate: 9.20,
        },
        "2025": {
          "populationGrowthRate": -0.16,
          "totalPopulation": 65245,
          "totalBirths": 479,
          "totalDeaths": 553,
          "tfr": 1.04,
          "sexRatio": 113,
          birthRate: 8.84, deathRate: 9.14
        },
        "2026": {
            totalPopulation: 65189,
          totalBirths: 224,
          totalDeaths: 280,
          tfr: 1.04,
          sexRatio: 136,
          populationGrowthRate: -0.09
        }
      }
    },
    {
      "mandalName": "Kalla",
      ageDistribution: {
        age0To14: 15.42,
        age15To59: 68.82,
        age60Plus: 15.76
      },
      dependencyRatio: {
  childDependency: 15,
  oldAgeDependency: 16
},
      "yearWiseData": {
        "2023": {
          "populationGrowthRate": 0,
          "totalPopulation": 69888,
          "totalBirths": 717,
          "totalDeaths": 585,
          "tfr": 1.17,
          "sexRatio": 108,
          birthRate: 10.76, deathRate: 8.58
        },
        "2024": {
          "populationGrowthRate": 0.11,
          "totalPopulation": 69989,
          "totalBirths": 659,
          "totalDeaths": 604,
          "tfr": 1.17,
          "sexRatio": 118,
          birthRate: 10.42, deathRate: 8.90
        },
        "2025": {
          "populationGrowthRate": 0.00,
          "totalPopulation": 70137,
          "totalBirths": 604,
          "totalDeaths": 498,
          "tfr": 1.17,
          "sexRatio": 113,
          birthRate: 10.06, deathRate: 7.58
        },
        "2026": {
             totalPopulation: 70074,
            totalBirths: 238,
            totalDeaths: 301,
            tfr: 1.17,
            sexRatio: 233,
            populationGrowthRate: -0.09
        }
      }
    },
    {
      "mandalName": "Mogalthur",
        ageDistribution: {
        age0To14: 15.97,
        age15To59: 68.53,
        age60Plus: 15.50
      },
      dependencyRatio: {
  childDependency: 16,
  oldAgeDependency: 16
},
      "yearWiseData": {
        "2023": {
          "populationGrowthRate": 0,
          "totalPopulation": 75942,
          "totalBirths": 798,
          "totalDeaths": 570,
          "tfr": 1.14,
          "sexRatio": 107,
          birthRate: 10.70, deathRate: 7.59,
        },
        "2024": {
          "populationGrowthRate": 0.17,
          "totalPopulation": 76171,
          "totalBirths": 698,
          "totalDeaths": 518,
          "tfr": 1.14,
          "sexRatio": 101,
          birthRate: 9.90, deathRate: 6.97,
        },
        "2025": {
          "populationGrowthRate": 0.11,
          "totalPopulation": 76310,
          "totalBirths": 601,
          "totalDeaths": 504,
          "tfr": 1.14,
          "sexRatio": 102,
          birthRate: 8.95, deathRate: 7.00,
        },
        "2026": {
            totalPopulation: 76287,
            totalBirths: 238,
            totalDeaths: 261,
            tfr: 1.14,
            sexRatio: 192,
            populationGrowthRate: -0.03
        }
      }
    },
    {
      "mandalName": "Narasapuram",
         ageDistribution: {
        age0To14: 16.21,
        age15To59: 68.61,
        age60Plus: 15.18
      },
      dependencyRatio: {
  childDependency: 16,
  oldAgeDependency: 15
},
      "yearWiseData": {
        "2023": {
          "populationGrowthRate": 0,
          "totalPopulation": 138841,
          "totalBirths": 1470,
          "totalDeaths": 1070,
          "tfr": 1.12,
          "sexRatio": 91,
           birthRate: 11.20, deathRate: 7.81,
        },
        "2024": {
          "populationGrowthRate": 0.20,
          "totalPopulation": 139114,
          "totalBirths": 1230,
          "totalDeaths": 1043,
          "tfr": 1.12,
          "sexRatio": 106,
          birthRate: 10.15, deathRate: 7.63,
        },
        "2025": {
          "populationGrowthRate": 0.02,
          "totalPopulation": 139217,
          "totalBirths": 1060,
          "totalDeaths": 1030,
          "tfr": 1.12,
          "sexRatio": 105,
          birthRate: 9.02, deathRate: 7.94
        },
        "2026": {
             totalPopulation: 138952,
            totalBirths: 238,
            totalDeaths: 503,
            tfr: 1.12,
            sexRatio: 86,
            populationGrowthRate: -0.19
        }
      }
    },
    {
      "mandalName": "Palacoderu",
        ageDistribution: {
        age0To14: 14.78,
        age15To59: 69.05,
        age60Plus: 16.17
      },
      dependencyRatio: {
  childDependency: 15,
  oldAgeDependency: 16
},
      "yearWiseData": {
        "2023": {
          "populationGrowthRate": 0,
          "totalPopulation": 66820,
          "totalBirths": 667,
          "totalDeaths": 570,
          "tfr": 1.07,
          "sexRatio": 99,
          birthRate: 10.37, deathRate: 8.61,
        },
        "2024": {
          "populationGrowthRate": -0.03,
          "totalPopulation": 66810,
          "totalBirths": 552,
          "totalDeaths": 600,
          "tfr": 1.07,
          "sexRatio": 98,
          birthRate: 9.01, deathRate: 9.38,
        },
        "2025": {
          "populationGrowthRate": -0.16,
          "totalPopulation": 66738,
          "totalBirths": 493,
          "totalDeaths": 600,
          "tfr": 1.07,
          "sexRatio": 99,
          birthRate: 8.44, deathRate: 9.48,
        },
        "2026": {
           totalPopulation: 66630,
          totalBirths: 238,
          totalDeaths: 346,
          tfr: 1.07,
          sexRatio: 103,
          populationGrowthRate: -0.16
        }
      }
    },
    {
      "mandalName": "Palacole",
      ageDistribution: {
      age0To14: 15.27,
      age15To59: 69.74,
      age60Plus: 14.98
    },
    dependencyRatio: {
  childDependency: 15,
  oldAgeDependency: 16
},
      "yearWiseData": {
        "2023": {
          "populationGrowthRate": 0,
          "totalPopulation": 134032,
          "totalBirths": 1210,
          "totalDeaths": 1112,
          "tfr": 1.01,
          "sexRatio": 111,
          birthRate: 9.96, deathRate: 8.45
        },
        "2024": {
          "populationGrowthRate": 0.00,
          "totalPopulation": 134082,
          "totalBirths": 1106,
          "totalDeaths": 1133,
          "tfr": 1.01,
          "sexRatio": 101,
          birthRate: 9.91, deathRate: 8.74
        },
        "2025": {
          "populationGrowthRate": -0.16,
          "totalPopulation": 134024,
          "totalBirths": 925,
          "totalDeaths": 1048,
          "tfr": 1.01,
          "sexRatio": 100,
          birthRate: 8.84, deathRate: 8.54
        },
        "2026": {
          totalPopulation: 133843,
          totalBirths: 373,
          totalDeaths: 554,
          tfr: 1.01,
          sexRatio: 111,
          populationGrowthRate: -0.14
        }
      }
    },
    {
      "mandalName": "Pentapadu",
        ageDistribution: {
        age0To14: 15.27,
        age15To59: 69.74,
        age60Plus: 14.98
      },
      dependencyRatio: {
  childDependency: 15,
  oldAgeDependency: 15
},
      "yearWiseData": {
        "2023": {
          "populationGrowthRate": 0,
          "totalPopulation": 69705,
          "totalBirths": 647,
          "totalDeaths": 624,
          "tfr": 1.05,
          "sexRatio": 134,
          birthRate: 10.01, deathRate: 9.13
        },
        "2024": {
          "populationGrowthRate": -0.09,
          "totalPopulation": 69699,
          "totalBirths": 565,
          "totalDeaths": 611,
          "tfr": 1.05,
          "sexRatio": 82,
          birthRate: 9.55, deathRate: 9.00 
        },
        "2025": {
          "populationGrowthRate": -0.11,
          "totalPopulation": 69678,
          "totalBirths": 534,
          "totalDeaths": 592,
          "tfr": 1.05,
          "sexRatio": 97,
          birthRate: 9.77, deathRate: 8.99
        },
        "2026": {
            totalPopulation: 69623,
            totalBirths: 243,
            totalDeaths: 298,
            tfr: 1.05,
            sexRatio: 98,
            populationGrowthRate: -0.08
        }
      }
    },
    {
      "mandalName": "Penugonda",
        ageDistribution: {
        age0To14: 16.03,
        age15To59: 70.25,
        age60Plus: 13.72
      },
      dependencyRatio: {
  childDependency: 16,
  oldAgeDependency: 14
},
      "yearWiseData": {
        "2023": {
          "populationGrowthRate": 0,
          "totalPopulation": 70289,
          "totalBirths": 819,
          "totalDeaths": 570,
          "tfr": 1.2,
          "sexRatio": 113,
           birthRate: 13.26, deathRate: 8.31
        },
        "2024": {
          "populationGrowthRate": 0.14,
          "totalPopulation": 70400,
          "totalBirths": 665,
          "totalDeaths": 600,
          "tfr": 1.2,
          "sexRatio": 105,
          birthRate: 11.07, deathRate: 8.82
        },
        "2025": {
          "populationGrowthRate": -0.06,
          "totalPopulation": 70428,
          "totalBirths": 560,
          "totalDeaths": 571,
          "tfr": 1.2,
          "sexRatio": 124,
          birthRate: 9.47, deathRate: 8.72
        },
        "2026": {
             totalPopulation: 70375,
            totalBirths: 233,
            totalDeaths: 286,
            tfr: 1.20,
            sexRatio: 97,
            populationGrowthRate: -0.08
        }
      }
    },
    
    {
      "mandalName": "Penumantra",
        ageDistribution: {
        age0To14: 15.24,
        age15To59: 68.47,
        age60Plus: 16.29
      },
      dependencyRatio: {
  childDependency: 15,
  oldAgeDependency: 16
},
      "yearWiseData": {
        "2023": {
          "populationGrowthRate": 0,
          "totalPopulation": 58821,
          "totalBirths": 597,
          "totalDeaths": 589,
          "tfr": 1.09,
          "sexRatio": 104,
          birthRate: 10.94, deathRate: 10.17
        },
        "2024": {
          "populationGrowthRate": -0.17,
          "totalPopulation": 58765,
          "totalBirths": 487,
          "totalDeaths": 576,
          "tfr": 1.09,
          "sexRatio": 131,
           birthRate: 9.51, deathRate: 9.93
        },
        "2025": {
          "populationGrowthRate": -0.20,
          "totalPopulation": 58761,
          "totalBirths": 459,
          "totalDeaths": 495,
          "tfr": 1.09,
          "sexRatio": 100,
          birthRate: 9.14, deathRate: 9.11
        },
        "2026": {
              totalPopulation: 58665,
            totalBirths: 168,
            totalDeaths: 264,
            tfr: 1.09,
            sexRatio: 86,
            populationGrowthRate: -0.16
        }
      }
    },
    {
      "mandalName": "Poduru",
        ageDistribution: {
        age0To14: 15.61,
        age15To59: 67.95,
        age60Plus: 16.44
      },
      dependencyRatio: {
  childDependency: 16,
  oldAgeDependency: 16
},
      "yearWiseData": {
        "2023": {
          "populationGrowthRate": 0,
          "totalPopulation": 64832,
          "totalBirths": 646,
          "totalDeaths": 575,
          "tfr": 1.17,
          "sexRatio": 101,
          birthRate: 10.15, deathRate: 8.94
        },
        "2024": {
          "populationGrowthRate": 0.07,
          "totalPopulation": 64875,
          "totalBirths": 623,
          "totalDeaths": 624,
          "tfr": 1.17,
          "sexRatio": 109,
          birthRate: 10.52, deathRate: 9.76
        },
        "2025": {
          "populationGrowthRate": -0.08,
          "totalPopulation": 64936,
          "totalBirths": 572,
          "totalDeaths": 551,
          "tfr": 1.17,
          "sexRatio": 94,
          birthRate: 10.16, deathRate: 9.21
        },
        "2026": {
          totalPopulation: 64858,
          totalBirths: 195,
          totalDeaths: 273,
          tfr: 1.17,
          sexRatio: 106,
          populationGrowthRate: -0.12
        }
      }
    },
    {
      "mandalName": "Tadepalligudem",
          ageDistribution: {
        age0To14: 14.83,
        age15To59: 70.66,
        age60Plus: 14.51
      },
      dependencyRatio: {
  childDependency: 15,
  oldAgeDependency: 15
},
      "yearWiseData": {
        "2023": {
          "populationGrowthRate": 0,
          "totalPopulation": 203175,
          "totalBirths": 1705,
          "totalDeaths": 1641,
          "tfr": 0.93,
          "sexRatio": 102,
          birthRate: 10.20, deathRate: 8.29
        },
        "2024": {
          "populationGrowthRate": -0.08,
          "totalPopulation": 203146,
          "totalBirths": 1489,
          "totalDeaths": 1621,
          "tfr": 0.93,
          "sexRatio": 106,
          birthRate: 9.39, deathRate: 8.31
        },
        "2025": {
          "populationGrowthRate": -0.18,
          "totalPopulation": 203047,
          "totalBirths": 1297,
          "totalDeaths": 1487,
          "tfr": 0.93,
          "sexRatio": 108,
          birthRate: 8.79, deathRate: 7.93
        },
        "2026": {
          totalPopulation: 202905,
          totalBirths: 580,
          totalDeaths: 722,
          tfr: 0.93,
          sexRatio: 102,
          populationGrowthRate: -0.07
        }
      }
    },
    {
      "mandalName": "Tanuku",
         ageDistribution: {
        age0To14: 14.07,
        age15To59: 70.65,
        age60Plus: 15.28
      },
      dependencyRatio: {
  childDependency: 14,
  oldAgeDependency: 15
},
      "yearWiseData": {
        "2023": {
          "populationGrowthRate": 0,
          "totalPopulation": 159303,
          "totalBirths": 1488,
          "totalDeaths": 1264,
          "tfr": 0.97,
          "sexRatio": 103,
          birthRate: 12.44, deathRate: 8.43
        },
        "2024": {
           "populationGrowthRate": -0.08,
          "totalPopulation": 159260,
          "totalBirths": 1144,
          "totalDeaths": 1266,
          "tfr": 0.97,
          "sexRatio": 99,
          birthRate: 9.71, deathRate: 8.38
        },
        "2025": {
          "populationGrowthRate": -0.15,
          "totalPopulation": 159278,
          "totalBirths": 1051,
          "totalDeaths": 1106,
          "tfr": 0.97,
          "sexRatio": 101,
          birthRate: 8.98, deathRate: 7.36
        },
        "2026": {
            totalPopulation: 159261,
            totalBirths: 580,
            totalDeaths: 597,
            tfr: 0.97,
            sexRatio: 95,
            populationGrowthRate: -0.01
        }
      }
    },
    {
      "mandalName": "Undi",
        ageDistribution: {
  age0To14: 14.54,
  age15To59: 68.24,
  age60Plus: 17.23
},
dependencyRatio: {
  childDependency: 15,
  oldAgeDependency: 17
},
      "yearWiseData": {
        "2023": {
           "populationGrowthRate": 0,
          "totalPopulation": 66283,
          "totalBirths": 632,
          "totalDeaths": 620,
          "tfr": 1.01,
          "sexRatio": 93,
          birthRate: 9.78, deathRate: 9.50
        },
        "2024": {
          "populationGrowthRate": -0.19,
          "totalPopulation": 66223,
          "totalBirths": 499,
          "totalDeaths": 593,
          "tfr": 1.01,
          "sexRatio": 91,
          birthRate: 8.25, deathRate: 9.14
        },
        "2025": {
          "populationGrowthRate": -0.19,
          "totalPopulation": 66225,
          "totalBirths": 471,
          "totalDeaths": 502,
          "tfr": 1.01,
          "sexRatio": 107,
          birthRate: 8.41, deathRate: 8.24
        },
        "2026": {
            totalPopulation: 66151,
          totalBirths: 199,
          totalDeaths: 273,
          tfr: 1.01,
          sexRatio: 122,
          populationGrowthRate: -0.11
        }
      }
    },
    {
      "mandalName": "Veeravasaram",
      dependencyRatio: {
  childDependency: 15,
  oldAgeDependency: 16
},
        ageDistribution: {
  age0To14: 15.06,
  age15To59: 69.06,
  age60Plus: 15.88
},
      "yearWiseData": {
        "2023": {
            "populationGrowthRate": 0,
          "totalPopulation": 66041,
          "totalBirths": 701,
          "totalDeaths": 537,
          "tfr": 1.18,
          "sexRatio": 99,
          birthRate: 11.03, deathRate: 8.29
        },
        "2024": {
            "populationGrowthRate": 0.17,
          "totalPopulation": 66183,
          "totalBirths": 648,
          "totalDeaths": 551,
          "tfr": 1.18,
          "sexRatio": 110,
          birthRate: 10.89, deathRate: 8.5
        },
        "2025": {
          "populationGrowthRate": -0.03,
          "totalPopulation": 66245,
          "totalBirths": 533,
          "totalDeaths": 508,
          "tfr": 1.18,
          "sexRatio": 89,
          birthRate: 9.44, deathRate: 8.27
        },
        "2026": {
             totalPopulation: 66579,
            totalBirths: 580,
            totalDeaths: 246,
            tfr: 1.18,
            sexRatio: 96,
            populationGrowthRate: 0.50
        }
      }
    },
    {
      "mandalName": "Yelamanchili",
      dependencyRatio: {
  childDependency: 15,
  oldAgeDependency: 16
},
      ageDistribution: {
  age0To14: 15.08,
  age15To59: 68.54,
  age60Plus: 16.38
},
      "yearWiseData": {
        "2023": {
          "populationGrowthRate": 0,
          "totalPopulation": 71355,
          "totalBirths": 715,
          "totalDeaths": 647,
          "tfr": 1.12,
          "sexRatio": 102,
          birthRate: 10.22, deathRate: 9.22
        },
        "2024": {
          "populationGrowthRate": -0.01,
          "totalPopulation": 71399,
          "totalBirths": 639,
          "totalDeaths": 639,
          "tfr": 1.12,
          "sexRatio": 102,
          birthRate: 9.81, deathRate: 9.13
        },
        "2025": {
            "populationGrowthRate": -0.09,
          "totalPopulation": 71435,
          "totalBirths": 572,
          "totalDeaths": 576,
          "tfr": 1.12,
          "sexRatio": 104,
          birthRate: 9.19, deathRate: 8.75
        },
        "2026": {
          totalPopulation: 71417,
          totalBirths: 241,
          totalDeaths: 259,
          tfr: 1.12,
          sexRatio: 235,
          populationGrowthRate: -0.03
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

    districtYearWiseData: {

     2023: {
    totalPopulation: 1718277,
    totalBirths: 15420,
    totalDeaths: 13532,
    tfr: 1.01,
    sexRatio: 107,
    birthRate: 8.97,
    deathRate: 7.88
  },

  2024: {
    totalPopulation: 1718621,
    totalBirths: 13884,
    totalDeaths: 13343,
    tfr: 1.01,
    sexRatio: 108,
    birthRate: 8.08,
    deathRate: 7.76
  },

  2025: {
    totalPopulation: 1717667,
    totalBirths: 11545,
    totalDeaths: 12514,
    tfr: 1.01,
    sexRatio: 106,
    birthRate: 6.72,
    deathRate: 7.29
  },

  2026: {
    totalPopulation: 1977420,
    totalBirths: 0,
    totalDeaths: 0,
    tfr: 1.01,
    sexRatio: 0,
    birthRate: 0,
    deathRate: 0
  },


    },

    mandals: [

     {
      "mandalName": "Badangi",
      "yearWiseData": {
        "2023": {
          "totalPopulation": 45224,
          "totalBirths": 464,
          "totalDeaths": 442,
          "tfr": 1.18,
          "sexRatio": 101
        },
        "2024": {
          "totalBirths": 498,
          "totalDeaths": 400,
          "tfr": 1.18,
          "sexRatio": 119,
          "totalPopulation": 45280
        },
        "2025": {
          "totalBirths": 486,
          "totalDeaths": 422,
          "tfr": 1.18,
          "sexRatio": 110,
          "totalPopulation": 45366
        },
        "2026": {
          "totalPopulation": 51302,
          "totalBirths": 0,
          "totalDeaths": 0,
          "tfr": 1.18,
		     "sexRatio": 119,
        }
      }
    },
    {
      "mandalName": "Bhogapuram",
      "yearWiseData": {
        "2023": {
          "totalPopulation": 58969,
          "totalBirths": 592,
          "totalDeaths": 475,
          "tfr": 1.16,
          "sexRatio": 97
        },
        "2024": {
          "totalBirths": 559,
          "totalDeaths": 428,
          "tfr": 1.16,
          "sexRatio": 91,
          "totalPopulation": 59053
        },
        "2025": {
          "totalBirths": 471,
          "totalDeaths": 370,
          "tfr": 1.16,
          "sexRatio": 102,
          "totalPopulation": 59096
        },
        "2026": {
          "totalPopulation": 59027,
          "totalBirths": 0,
          "totalDeaths": 0,
          "tfr": 1.16,
		      "sexRatio": 119,
		  
        }
      }
    },
    {
      "mandalName": "Bobbili",
      "yearWiseData": {
        "2023": {
          "totalPopulation": 120609,
          "totalBirths": 1168,
          "totalDeaths": 1056,
          "tfr": 0.95,
          "sexRatio": 104
        },
        "2024": {
          "totalBirths": 979,
          "totalDeaths": 975,
          "tfr": 0.95,
          "sexRatio": 103,
          "totalPopulation": 120532
        },
        "2025": {
          "totalBirths": 816,
          "totalDeaths": 924,
          "tfr": 0.95,
          "sexRatio": 119,
          "totalPopulation": 120373
        },
        "2026": {
          "totalPopulation": 132005,
          "totalBirths": 0,
          "totalDeaths": 0,
          "tfr": 0.95,
		      "sexRatio": 119,
        }
      }
    },
    {
      "mandalName": "Bondapalle",
      "yearWiseData": {
        "2023": {
          "totalPopulation": 47577,
          "totalBirths": 443,
          "totalDeaths": 472,
          "tfr": 0.9,
          "sexRatio": 95
        },
        "2024": {
          "totalBirths": 393,
          "totalDeaths": 433,
          "tfr": 0.9,
          "sexRatio": 97,
          "totalPopulation": 47498
        },
        "2025": {
          "totalBirths": 267,
          "totalDeaths": 450,
          "tfr": 0.9,
          "sexRatio": 112,
          "totalPopulation": 47332
        },
        "2026": {
          "totalPopulation": 51858,
          "totalBirths": 0,
          "totalDeaths": 0,
          "tfr": 0.9,
		      "sexRatio": 0,
        }
      }
    },
    {
      "mandalName": "Cheepurupalle",
      "yearWiseData": {
        "2023": {
          "totalPopulation": 57831,
          "totalBirths": 717,
          "totalDeaths": 452,
          "tfr": 1.09,
          "sexRatio": 106
        },
        "2024": {
          "totalBirths": 649,
          "totalDeaths": 468,
          "tfr": 1.09,
          "sexRatio": 113,
          "totalPopulation": 58028
        },
        "2025": {
          "totalBirths": 454,
          "totalDeaths": 422,
          "tfr": 1.09,
          "sexRatio": 114,
          "totalPopulation": 58014
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
      "yearWiseData": {
        "2023": {
          "totalPopulation": 49719,
          "totalBirths": 473,
          "totalDeaths": 452,
          "tfr": 0.96,
          "sexRatio": 115
        },
        "2024": {
          "totalBirths": 416,
          "totalDeaths": 479,
          "tfr": 0.96,
          "sexRatio": 121,
          "totalPopulation": 49683
        },
        "2025": {
          "totalBirths": 345,
          "totalDeaths": 457,
          "tfr": 0.96,
          "sexRatio": 95,
          "totalPopulation": 49549
        },
        "2026": {
          "totalPopulation": 54305,
          "totalBirths": 0,
          "totalDeaths": 0,
          "tfr": 0.96,
          "sexRatio": 0,
        }
      }
    },
    {
      "mandalName": "Denkada",
      "yearWiseData": {
        "2023": {
          "totalPopulation": 55630,
          "totalBirths": 477,
          "totalDeaths": 465,
          "tfr": 0.94,
          "sexRatio": 101
        },
        "2024": {
          "totalBirths": 435,
          "totalDeaths": 423,
          "tfr": 0.94,
          "sexRatio": 109,
          "totalPopulation": 55600
        },
        "2025": {
          "totalBirths": 343,
          "totalDeaths": 421,
          "tfr": 0.94,
          "sexRatio": 120,
          "totalPopulation": 55520
        },
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
      "yearWiseData": {
        "2023": {
          "totalPopulation": 52323,
          "totalBirths": 514,
          "totalDeaths": 472,
          "tfr": 0.94,
          "sexRatio": 92
        },
        "2024": {
          "totalBirths": 463,
          "totalDeaths": 531,
          "tfr": 0.94,
          "sexRatio": 109,
          "totalPopulation": 52828
        },
        "2025": {
			
          "totalBirths": 341,
          "totalDeaths": 508,
          "tfr": 0.94,
          "sexRatio": 88,
          "totalPopulation": 52638
        },
        "2026": {
          "totalPopulation": 59340,
          "totalBirths": 0,
          "totalDeaths": 0,
          "tfr": 0.94,
		        "sexRatio": 88,
        }
      }
    },
    {
      "mandalName": "Gantyada",
      "yearWiseData": {
        "2023": {
          "totalPopulation": 60644,
          "totalBirths": 584,
          "totalDeaths": 613,
          "tfr": 0.94,
          "sexRatio": 109
        },
        "2024": {
          "totalBirths": 463,
          "totalDeaths": 639,
          "tfr": 0.94,
          "sexRatio": 126,
          "totalPopulation": 60494
        },
        "2025": {
          "totalBirths": 367,
          "totalDeaths": 600,
          "tfr": 0.94,
          "sexRatio": 93,
          "totalPopulation": 60222
        },
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
      "yearWiseData": {
        "2023": {
          "totalPopulation": 62897,
          "totalBirths": 664,
          "totalDeaths": 559,
          "tfr": 0.88,
          "sexRatio": 109
        },
        "2024": {
          "totalBirths": 460,
          "totalDeaths": 570,
          "tfr": 0.88,
          "sexRatio": 116,
          "totalPopulation": 62798
        },
        "2025": {
          "totalBirths": 384,
          "totalDeaths": 465,
          "tfr": 0.88,
          "sexRatio": 111,
          "totalPopulation": 62612
        },
        "2026": {
          "totalPopulation": 72968,
          "totalBirths": 0,
          "totalDeaths": 0,
          "tfr": 0.88,
		   "sexRatio": 111,
        }
      }
    },
    {
      "mandalName": "Gurla",
      "yearWiseData": {
        "2023": {
          "totalPopulation": 61531,
          "totalBirths": 674,
          "totalDeaths": 549,
          "tfr": 1.09,
          "sexRatio": 124
        },
        "2024": {
          "totalBirths": 598,
          "totalDeaths": 602,
          "tfr": 1.09,
          "sexRatio": 115,
          "totalPopulation": 61580
        },
        "2025": {
          "totalBirths": 503,
          "totalDeaths": 538,
          "tfr": 1.09,
          "sexRatio": 117,
          "totalPopulation": 61481
        },
        "2026": {
          "totalPopulation": 68145,
          "totalBirths": 0,
          "totalDeaths": 0,
          "tfr": 1.09,
		  "sexRatio": 124
        }
      }
    },
    {
      "mandalName": "Jami",
      "yearWiseData": {
        "2023": {
          "totalPopulation": 53431,
          "totalBirths": 475,
          "totalDeaths": 542,
          "tfr": 0.93,
          "sexRatio": 118
        },
        "2024": {
          "totalBirths": 481,
          "totalDeaths": 525,
          "tfr": 0.93,
          "sexRatio": 106,
          "totalPopulation": 53370
        },
        "2025": {
          "totalBirths": 322,
          "totalDeaths": 457,
          "tfr": 0.93,
          "sexRatio": 0,
          "totalPopulation": 53167
        },
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
      "yearWiseData": {
        "2023": {
          "totalPopulation": 67227,
          "totalBirths": 538,
          "totalDeaths": 556,
          "tfr": 0.9,
          "sexRatio": 101
        },
        "2024": {
          "totalBirths": 553,
          "totalDeaths": 550,
          "tfr": 0.9,
          "sexRatio": 101,
          "totalPopulation": 67224
        },
        "2025": {
          "totalBirths": 535,
          "totalDeaths": 515,
          "tfr": 0.9,
          "sexRatio": 106,
          "totalPopulation": 67209
        },
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
      "yearWiseData": {
        "2023": {
          "totalPopulation": 48144,
          "totalBirths": 433,
          "totalDeaths": 410,
          "tfr": 0.91,
          "sexRatio": 117
        },
        "2024": {
          "totalBirths": 414,
          "totalDeaths": 436,
          "tfr": 0.91,
          "sexRatio": 106,
          "totalPopulation": 48148
        },
        "2025": {
          "totalBirths": 359,
          "totalDeaths": 429,
          "tfr": 0.91,
          "sexRatio": 97,
          "totalPopulation": 48071
        },
        "2026": {
          "totalPopulation": 56153,
          "totalBirths": 0,
          "totalDeaths": 0,
          "tfr": 0.91,
		  "sexRatio": 0,
        }
      }
    },
    {
      "mandalName": "Mentada",
      "yearWiseData": {
        "2023": {
          "totalPopulation": 43074,
          "totalBirths": 434,
          "totalDeaths": 413,
          "tfr": 1.08,
          "sexRatio": 106
        },
        "2024": {
          "totalBirths": 373,
          "totalDeaths": 411,
          "tfr": 1.08,
          "sexRatio": 108,
          "totalPopulation": 43034
        },
        "2025": {
          "totalBirths": 343,
          "totalDeaths": 402,
          "tfr": 1.08,
          "sexRatio": 94,
          "totalPopulation": 42966
        },
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
      "yearWiseData": {
        "2023": {
          "totalPopulation": 53422,
          "totalBirths": 542,
          "totalDeaths": 475,
          "tfr": 0.99,
          "sexRatio": 96
        },
        "2024": {
          "totalBirths": 457,
          "totalDeaths": 427,
          "tfr": 0.99,
          "sexRatio": 115,
          "totalPopulation": 53404
        },
        "2025": {
          "totalBirths": 364,
          "totalDeaths": 413,
          "tfr": 0.99,
          "sexRatio": 107,
          "totalPopulation": 53341
        },
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
      "yearWiseData": {
        "2023": {
          "totalPopulation": 74772,
          "totalBirths": 740,
          "totalDeaths": 612,
          "tfr": 0.95,
          "sexRatio": 104
        },
        "2024": {
          "totalBirths": 602,
          "totalDeaths": 669,
          "tfr": 0.95,
          "sexRatio": 123,
          "totalPopulation": 74762
        },
        "2025": {
          "totalBirths": 502,
          "totalDeaths": 576,
          "tfr": 0.95,
          "sexRatio": 110,
          "totalPopulation": 74595
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
      "yearWiseData": {
        "2023": {
          "totalPopulation": 76205,
          "totalBirths": 848,
          "totalDeaths": 589,
          "tfr": 1.14,
          "sexRatio": 99
        },
        "2024": {
          "totalBirths": 726,
          "totalDeaths": 528,
          "tfr": 1.14,
          "sexRatio": 110,
          "totalPopulation": 76342
        },
        "2025": {
          "totalBirths": 513,
          "totalDeaths": 530,
          "tfr": 1.14,
          "sexRatio": 110,
          "totalPopulation": 76327
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
      "yearWiseData": {
        "2023": {
          "totalPopulation": 92079,
          "totalBirths": 779,
          "totalDeaths": 696,
          "tfr": 0.85,
          "sexRatio": 101
        },
        "2024": {
          "totalBirths": 768,
          "totalDeaths": 671,
          "tfr": 0.85,
          "sexRatio": 115,
          "totalPopulation": 92151
        },
        "2025": {
          "totalBirths": 677,
          "totalDeaths": 633,
          "tfr": 0.85,
          "sexRatio": 103,
          "totalPopulation": 92157
        },
        "2026": {
          "totalPopulation": 111659,
          "totalBirths": 0,
          "totalDeaths": 0,
          "tfr": 0.85,
		     "sexRatio": 0,
        }
      }
    },
    {
      "mandalName": "Ramabhadrapuram",
      "yearWiseData": {
        "2023": {
          "totalPopulation": 47639,
          "totalBirths": 506,
          "totalDeaths": 412,
          "tfr": 0.91,
          "sexRatio": 127
        },
        "2024": {
          "totalBirths": 368,
          "totalDeaths": 361,
          "tfr": 0.91,
          "sexRatio": 95,
          "totalPopulation": 47595
        },
        "2025": {
          "totalBirths": 294,
          "totalDeaths": 372,
          "tfr": 0.91,
          "sexRatio": 103,
          "totalPopulation": 47528
        },
        "2026": {
          "totalPopulation": 54138,
          "totalBirths": 0,
          "totalDeaths": 0,
          "tfr": 0.91,
		      "sexRatio": 0,
        }
      }
    },
    {
      "mandalName": "Regidi Amadalavalasa",
      "yearWiseData": {
        "2023": {
          "totalPopulation": 74240,
          "totalBirths": 635,
          "totalDeaths": 521,
          "tfr": 1.0,
          "sexRatio": 104
        },
        "2024": {
          "totalPopulation": 74318,
          "totalBirths": 599,
          "totalDeaths": 490,
          "tfr": 1.0,
          "sexRatio": 103
        },
        "2025": {
            "totalPopulation": 74342,
          "totalBirths": 514,
          "totalDeaths": 513,
          "tfr": 1.0,
          "sexRatio": 99
        },
        "2026": {
          "totalPopulation": 73605,
          "totalBirths": 0,
          "totalDeaths": 0,
          "tfr": 1.0,
		  "sexRatio": 0,
        }
      }
    },
    {
      "mandalName": "Santhakaviti",
      "yearWiseData": {
        "2023": {
          "totalPopulation": 58197,
          "totalBirths": 623,
          "totalDeaths": 492,
          "tfr": 1.11,
          "sexRatio": 105
        },
        "2024": {
          "totalBirths": 571,
          "totalDeaths": 463,
          "tfr": 1.11,
          "sexRatio": 91,
          "totalPopulation": 58276
        },
        "2025": {
          "totalBirths": 511,
          "totalDeaths": 441,
          "tfr": 1.11,
          "sexRatio": 109,
          "totalPopulation": 58324
        },
        "2026": {
          "totalPopulation": 64399,
          "totalBirths": 0,
          "totalDeaths": 0,
          "tfr": 1.11,
		  "sexRatio": 0,
        }
      }
    },
    {
      "mandalName": "Srungavarapukota",
      "yearWiseData": {
        "2023": {
          "totalPopulation": 68550,
          "totalBirths": 725,
          "totalDeaths": 607,
          "tfr": 1.01,
          "sexRatio": 93
        },
        "2024": {
          "totalBirths": 596,
          "totalDeaths": 658,
          "tfr": 1.01,
          "sexRatio": 108,
          "totalPopulation": 68539
        },
        "2025": {
          "totalBirths": 547,
          "totalDeaths": 576,
          "tfr": 1.01,
          "sexRatio": 97,
          "totalPopulation": 68428
        },
        "2026": {
          "totalPopulation": 78027,
          "totalBirths": 0,
          "totalDeaths": 0,
          "tfr": 1.01,
		      "sexRatio": 0,
        }
      }
    },
    {
      "mandalName": "Therlam",
      "yearWiseData": {
        "2023": {
          "totalPopulation": 56534,
          "totalBirths": 566,
          "totalDeaths": 479,
          "tfr": 1.05,
          "sexRatio": 122
        },
        "2024": {
          "totalBirths": 524,
          "totalDeaths": 467,
          "tfr": 1.05,
          "sexRatio": 93,
          "totalPopulation": 56579
        },
        "2025": {
          "totalBirths": 422,
          "totalDeaths": 451,
          "tfr": 1.05,
          "sexRatio": 99,
          "totalPopulation": 56534
        },
        "2026": {
          "totalPopulation": 60122,
          "totalBirths": 0,
          "totalDeaths": 0,
          "tfr": 1.05,
		      "sexRatio": 0,
        }
      }
    },
    {
      "mandalName": "Vangara",
      "yearWiseData": {
        "2023": {
          "totalPopulation": 38024,
          "totalBirths": 343,
          "totalDeaths": 311,
          "tfr": 1.15,
          "sexRatio": 96
        },
        "2024": {
          "totalBirths": 369,
          "totalDeaths": 279,
          "tfr": 1.15,
          "sexRatio": 121,
          "totalPopulation": 38082
        },
        "2025": {
          "totalBirths": 242,
          "totalDeaths": 255,
          "tfr": 1.15,
          "sexRatio": 112,
          "totalPopulation": 38045
        },
        "2026": {
          "totalPopulation": 34753,
          "totalBirths": 0,
          "totalDeaths": 0,
          "tfr": 1.15,
		       "sexRatio": 0,
        }
      }
    },
    {
      "mandalName": "Vepada",
      "yearWiseData": {
        "2023": {
          "totalPopulation": 44273,
          "totalBirths": 388,
          "totalDeaths": 409,
          "tfr": 0.97,
          "sexRatio": 113
        },
        "2024": {
          "totalBirths": 441,
          "totalDeaths": 407,
          "tfr": 0.97,
          "sexRatio": 98,
          "totalPopulation": 44305
        },
        "2025": {
          "totalBirths": 348,
          "totalDeaths": 414,
          "tfr": 0.97,
          "sexRatio": 98,
          "totalPopulation": 44246
        },
        "2026": {
          "totalPopulation": 51079,
          "totalBirths": 0,
          "totalDeaths": 0,
          "tfr": 0.97,
		     "sexRatio": 0,
        }
      }
    },
      {
      "mandalName": "Vizianagaram",
      "yearWiseData": {
        "2023": {
          "totalPopulation": 48005,
          "totalBirths": 3171,
          "totalDeaths": 2372,
          "tfr": 0.97,
          "sexRatio": 113
        },
        "2024": {
          "totalBirths": 2638,
          "totalDeaths": 2336,
          "tfr": 0.97,
          "sexRatio": 98,
          "totalPopulation": 48271
        },
        "2025": {
          "totalBirths": 1805,
          "totalDeaths": 2284,
          "tfr": 0.97,
          "sexRatio": 98,
          "totalPopulation": 47740
        },
        "2026": {
          "totalPopulation": 342053,
          "totalBirths": 0,
          "totalDeaths": 0,
          "tfr": 0.97,
		     "sexRatio": 0,
        }
      }
    }


    ]
  }

];


  currentYear: number = new Date().getFullYear();
  selectedYear: number = this.currentYear;
  yearList: number[] = [];
  selectedDistrictName: string = '';
  constructor(
    private route: ActivatedRoute,
    private router: Router,
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
      this.loadDistrictData();
    });
  }
  loadDistrictData() {
    this.districtDetails = this.districtData.find(
      (x) => x.districtName === this.selectedDistrictName,
    );
    // LOAD MANDALS
    this.mandalList = this.districtDetails?.mandals || [];
    // INITIAL DISTRICT SUMMARY
    this.dashboardSummary = this.districtDetails ?.districtYearWiseData?.[ this.selectedYear ] || {};
      this.dashboardSummary.childDependency =
    this.districtDetails?.dependencyRatio?.childDependency || 0;
  this.dashboardSummary.oldAgeDependency =
    this.districtDetails?.dependencyRatio?.oldAgeDependency || 0;
    this.loadBarChart();
    this.loadLineChart();
    this.loadMedianAgeAtDeathChart();
    this.loadSexRatioChart();
    this.loadAgeWiseChart(
    14.94, // 0-14 Years
    69.58, // 15-59 Years
    15.48  // 60+ Years
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


// loadDashboardSummary() {
//   // ===================================
//   // DISTRICT MODE
//   // ===================================

//   if (this.selectedMandals.length === 0) {

//     this.dashboardSummary =
//       this.districtDetails
//         .districtYearWiseData[
//           this.selectedYear
//         ];

//     return;
//   }
//   // ===================================
//   // MANDAL MODE
//   // ===================================

//   const selectedData =
//     this.mandalList.filter(x =>
//       this.selectedMandals.includes(x.mandalName)
//     );



//   const totalPopulation =
//     selectedData.reduce((sum, mandal) => {

//       return sum +
//         mandal.yearWiseData[
//           this.selectedYear
//         ].totalPopulation;

//     }, 0);



//   const totalBirths =
//     selectedData.reduce((sum, mandal) => {

//       return sum +
//         mandal.yearWiseData[
//           this.selectedYear
//         ].totalBirths;

//     }, 0);



//   const totalDeaths =
//     selectedData.reduce((sum, mandal) => {

//       return sum +
//         mandal.yearWiseData[
//           this.selectedYear
//         ].totalDeaths;

//     }, 0);



//   const avgTfr =
//     (
//       selectedData.reduce((sum, mandal) => {

//         return sum +
//           mandal.yearWiseData[
//             this.selectedYear
//           ].tfr;

//       }, 0)

//       / selectedData.length

//     ).toFixed(2);



//   const avgSexRatio =
//     (
//       selectedData.reduce((sum, mandal) => {

//         return sum +
//           mandal.yearWiseData[
//             this.selectedYear
//           ].sexRatio;

//       }, 0)

//       / selectedData.length

//     ).toFixed(0);
// const birthRate =
// (
//   (totalBirths / totalPopulation) * 1000
// ).toFixed(2);



// const deathRate =
// (
//   (totalDeaths / totalPopulation) * 1000
// ).toFixed(2);





//   this.dashboardSummary = {
//     totalPopulation,
//     totalBirths,
//     totalDeaths,
//     birthRate,
//     deathRate,
//     tfr: avgTfr,
//     sexRatio: avgSexRatio
//   };

// }
loadDashboardSummary() {

  // ===================================
  // DISTRICT MODE
  // ===================================
  if (!this.selectedMandal) {

    this.dashboardSummary =
      this.districtDetails?.districtYearWiseData?.[
        this.selectedYear
      ] || {};

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
    this.loadDashboardSummary();
      this.loadBarChart();
     this.loadLineChart();
     this.loadMedianAgeAtDeathChart();
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


// loadBarChart() {
//   // =====================================
//   // DISTRICT MODE
//   // =====================================

//   let chartData = [];
//   if (this.selectedMandals.length === 0) {
//     chartData = this.mandalList;
//   }

//   // =====================================
//   // MANDAL MODE
//   // =====================================

//   else {

//     chartData =
//       this.mandalList.filter(x =>
//         this.selectedMandals.includes(
//           x.mandalName
//         )
//       );

//   }



//   // =====================================
//   // DYNAMIC VALUES
//   // =====================================

//   const categories =
//     chartData.map(x => x.mandalName);



//   const birthsData =
//     chartData.map(x =>
//       x.yearWiseData?.[
//         this.selectedYear
//       ]?.totalBirths || 0

//     );
//   const deathsData =
//     chartData.map(x =>
//       x.yearWiseData?.[
//         this.selectedYear
//       ]?.totalDeaths || 0

//     );
//   // =====================================
//   // CHART OPTIONS
//   // =====================================

//   this.barChartOptions = {

//     chart: {
//       type: 'column',
//       backgroundColor: 'transparent'
//     },

//     title: {
//       text: ''
//     },



//     xAxis: {

//       categories,

//       lineColor: '#e0e0e0'

//     },



//     yAxis: {

//       title: {
//         text: ''
//       },

//       gridLineColor: '#f1f3f5'

//     },



//     legend: {

//       align: 'center',

//       verticalAlign: 'bottom'

//     },



//     plotOptions: {

//       column: {

//         borderRadius: 6,

//         pointPadding: 0.2

//       },



//       series: {

//         animation: {

//           duration: 1200

//         }

//       }

//     },



//     series: [

//       {

//         type: 'column',

//         name: 'Births',

//         data: birthsData,

//         color: '#86efac'

//       },



//       {

//         type: 'column',

//         name: 'Deaths',

//         data: deathsData,

//         color: '#fca5a5'

//       }

//     ]

//   };

// }


// loadLineChart() {



//   // =====================================
//   // YEARS
//   // =====================================

//   const years = [2023, 2024, 2025, 2026];



//   // =====================================
//   // DISTRICT MODE
//   // =====================================

//   if (this.selectedMandals.length === 0) {



//     const birthsData =
//       years.map(year =>

//         this.districtDetails
//           ?.districtYearWiseData?.[
//             year
//           ]?.totalBirths || 0

//       );



//     const deathsData =
//       years.map(year =>

//         this.districtDetails
//           ?.districtYearWiseData?.[
//             year
//           ]?.totalDeaths || 0

//       );



//     this.updateLineChart(
//       years,
//       birthsData,
//       deathsData
//     );



//     return;
//   }



//   // =====================================
//   // MANDAL MODE
//   // =====================================

//   const selectedData =
//     this.mandalList.filter(x =>
//       this.selectedMandals.includes(
//         x.mandalName
//       )
//     );



//   const birthsData =
//     years.map(year => {

//       return selectedData.reduce(
//         (sum, mandal) => {

//           return sum +
//             (
//               mandal.yearWiseData?.[
//                 year
//               ]?.totalBirths || 0
//             );

//         },
//         0
//       );

//     });



//   const deathsData =
//     years.map(year => {

//       return selectedData.reduce(
//         (sum, mandal) => {

//           return sum +
//             (
//               mandal.yearWiseData?.[
//                 year
//               ]?.totalDeaths || 0
//             );

//         },
//         0
//       );

//     });



//   this.updateLineChart(
//     years,
//     birthsData,
//     deathsData
//   );

// }

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

  this.medianAgeChartOptions = {
    chart: {
      type: 'column'
    },
    title: {
      text: ""
    },
    xAxis: {
      categories: [
        'Tadepalligudem',
        'Bhimavaram',
        'Penugonda',
        'Palacole',
        'Tanuku',
        'Yelamanchili',
        'Akividu',
        'Pentapadu',
        'Penumantra',
        'Achanta',
        'Attili',
        'Ganapavaram',
        'Iragavaram',
        'Mogalthur',
        'Narasapuram',
        'Palacoderu',
        'Poduru',
        'Kalla',
        'Undi',
        'Veeravasaram'
      ],
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
        data: [
          66,67,67,68,68,68,69,69,69,70,
          70,70,70,70,70,70,71,72,72,72
        ]
      },
      {
        name: '2024',
        type: 'column',
        data: [
          66,67,67,68,67,70,68,68,69,69,
          69,69,70,70,70,69,70,69,69,69
        ]
      },
      {
        name: '2025',
        type: 'column',
        data: [
          67,66,66,67,69,70,69,67,69,70,
          65,69,72,69,69,66,69,69,69,69
        ]
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
    this.loadBarChart();
    this.loadLineChart();
    this.loadMedianAgeAtDeathChart();
      this.dashboardSummary.childDependency =
    mandal?.dependencyRatio?.childDependency || 0;
  this.dashboardSummary.oldAgeDependency =
    mandal?.dependencyRatio?.oldAgeDependency || 0;
    this.loadAgeWiseChart(
    mandal.ageDistribution.age0To14,
    mandal.ageDistribution.age15To59,
    mandal.ageDistribution.age60Plus
  );

}



years = [
  2030, 2029, 2028, 2027, 2026,
  2025, 2024, 2023, 2022, 2021, 2020
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
      text: 'Age Wise Structure'
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
  this.sexRatioChartOptions = {

    chart: {
      type: 'column'
    },

    title: {
      text: 'CRS<br>Gender Ratio (Number of females per 1000 males)',
      align: 'center'
    },

    xAxis: {
      categories: [
        'Narasapuram',
        'Poduru',
        'Yelamanchili',
        'Achanta',
        'Veeravasaram',
        'Iragavaram',
        'Mogalthur',
        'Ganapavaram',
        'Penumantra',
        'Pentapadu',
        'Attili',
        'Kalla',
        'West Godavari',
        'Undi',
        'Penugonda',
        'Palacoderu',
        'Palacole',
        'Akividu',
        'Bhimavaram',
        'Tadepalligudem',
        'Tanuku'
      ],

      labels: {
        rotation: -45
      }
    },

    yAxis: {
      min: 960,
      title: {
        text: 'Gender Ratio'
      }
    },

    credits: {
      enabled: false
    },

    legend: {
      enabled: false
    },

    tooltip: {
      pointFormat: '<b>{point.y}</b>'
    },

    series: [
      {
        type: 'column',
        name: 'Sex Ratio',

        data: [
          1003,
          1006,
          1010,
          1012,
          1017,
          1017,
          1022,
          1024,
          1032,
          1034,
          1034,
          1041,
          {
            y: 1043,
            color: '#FFC000'
          },
          1043,
          1048,
          1050,
          1054,
          1056,
          1066,
          1067,
          1079
        ],

        color: '#4472C4',

        dataLabels: {
          enabled: true,
          format: '{y}'
        }
      }
    ]
  };
}



}
