import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard-four',
  templateUrl: './dashboard-four.component.html',
  styleUrls: ['./dashboard-four.component.css']
})
export class DashboardFourComponent {
  activeTab = 'population';

  tabs = [
    { key: 'population', label: 'Population Structure', icon: 'bi bi-people-fill' },
    { key: 'migration', label: 'Migration & Mobility', icon: 'bi bi-box-arrow-in-right' },
    { key: 'vulnerable', label: 'Vulnerability & Inclusion', icon: 'bi bi-shield-exclamation' },
    { key: 'health', label: 'Health & Nutrition', icon: 'bi bi-heart-pulse' },
    { key: 'fertility', label: 'Fertility & Family Planning', icon: 'bi bi-person-plus' }
  ];

  // --- Population ---
  populationStats = {
    total: 53903393,
    growthRate: 1.2,
    density: 308,
    sexRatio: 993,
    childSexRatio: 939,
    urban: 29.47,
    rural: 70.53
  };
populationStatsArray = [
  { label: 'Total Population', value: 53903393, subtext: '' },
  { label: 'Population Density', value: '308/km²', subtext: '' },
  { label: 'Population Growth Rate', value: '1.2%', subtext: '' },
  { label: 'Urban Population', value: '29.47%', subtext: '' },
  { label: 'Rural Population', value: '70.53%', subtext: '' },
  { label: 'Average Household Size', value: '4.5', subtext: '' },
  { label: 'Sex Ratio (females per 1000 males)', value: '993', subtext: '' },
  { label: 'Child Sex Ratio', value: '939', subtext: '' }
];

ageStructureArray = [
  { label: '0–6 years', value: '12.5%', subtext: '' },
  { label: '7–14 years', value: '15.2%', subtext: '' },
  { label: '15–59 years', value: '61.3%', subtext: '' },
  { label: '60+ years', value: '11.0%', subtext: '' }
];

dependencyRatioArray = [
  { label: 'Child Dependency Ratio', value: '35%', subtext: '' },
  { label: 'Elderly Dependency Ratio', value: '15%', subtext: '' }
];

populationColors = ['primary', 'success', 'info', 'warning', 'warning', 'secondary', 'danger', 'danger'];
populationIcons = [
  'bi bi-people-fill', 'bi bi-geo-alt', 'bi bi-graph-up-arrow', 'bi bi-building', 'bi bi-tree',
  'bi bi-house-door-fill', 'bi bi-gender-ambiguous', 'bi bi-gender-female'
];

ageStructureColors = ['info', 'info', 'info', 'info'];
ageStructureIcons = ['bi bi-person', 'bi bi-person', 'bi bi-person', 'bi bi-person'];

dependencyColors = ['warning', 'secondary'];
dependencyIcons = ['bi bi-pie-chart', 'bi bi-pie-chart-fill'];

  // --- Migration ---
  migrationStats = {
    birthVsResidence: 78,
    seasonalMigration: 12,
    durationOfResidence: 10
  };

  migrationStatsArray = [
  { label: 'Place of Birth vs. Residence (%)', value: '78%', subtext: '' },
  { label: 'Avg. Duration of Residence (yrs)', value: '10', subtext: '' },
  { label: 'Seasonal Migration Status (%)', value: '12%', subtext: '' }
];
migrationColors = ['info', 'success', 'warning'];
migrationIcons = ['bi bi-geo-alt-fill', 'bi bi-clock-history', 'bi bi-truck'];

  // --- Vulnerability ---
  vulnerableStats = {
    seniorCitizens: 500000,
    singleParents: 120000,
    orphans: 25000,
    transgender: 8000
  };

  vulnerableStatsArray = [
  { label: 'Widow/Widower/Single Parent Status', value: '120000', subtext: '' },
  { label: 'Households with Senior Citizens', value: '500000', subtext: '' },
  { label: 'Orphans / Child-headed Households', value: '25000', subtext: '' },
  { label: 'Transgender Population', value: '8000', subtext: '' }
];
vulnerableColors = ['primary', 'success', 'danger', 'info'];
vulnerableIcons = ['bi bi-person-standing-dress', 'bi bi-person-vcard', 'bi bi-emoji-frown', 'bi bi-gender-ambiguous'];
  // --- Health ---
  mortalityStats = {
    neoNatal: 20,
    infant: 30,
    under5: 35,
    maternal: 50
  };
healthStatsArray = [
  { label: 'Neo-Natal Mortality Rate', value: '20', subtext: '' },
  { label: 'Infant Mortality Rate (IMR)', value: '30', subtext: '' },
  { label: 'Under-5 Mortality Rate (U5MR)', value: '35', subtext: '' },
  { label: 'Maternal Mortality Rate (MMR)', value: '50', subtext: '' },
  { label: 'Age-Specific Mortality Rates', value: '15.6', subtext: '' }
];
healthColors = ['danger', 'warning', 'info', 'secondary', 'primary'];
healthIcons = ['bi bi-heart-pulse', 'bi bi-heart', 'bi bi-activity', 'bi bi-hospital', 'bi bi-clipboard-pulse'];

  // --- Fertility ---
  fertilityStats = {
    tfr: 1.7,
    birthRate: 17.2,
    deathRate: 7.1,
    lifeExpectancy: 69.8
  };

  fertilityStatsArray = [
  { label: 'Total Fertility Rate (TFR)', value: '1.7', subtext: '' },
  { label: 'Crude Birth Rate', value: '17.2', subtext: '' },
  { label: 'Crude Death Rate', value: '7.1', subtext: '' },
  { label: 'Life Expectancy at Birth', value: '69.8', subtext: '' }
];
fertilityColors = ['warning', 'info', 'danger', 'success'];
fertilityIcons = ['bi bi-person-plus', 'bi bi-person-fill-up', 'bi bi-person-x', 'bi bi-hourglass-split'];

}
