import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, debounceTime, Observable } from 'rxjs';
import { basemodel } from 'src/app/thirparty/model/apimodel';
import { AuthserService } from '../api_lyr/private/authser.service';
import { AlertsService } from '../alert_lyr/alerts.service';
import { GeolocationService } from '../geolocation.service';

@Injectable({
  providedIn: 'root',
})
export class ContentService {
  sub = new BehaviorSubject(false);
  latitude: any;
  longitude: any;
  staticalstaticdata = new BehaviorSubject(false);

  constructor(
    private http: HttpClient,
    private auth: AuthserService,
    private alt: AlertsService,
    private geolocationService: GeolocationService
  ) {}
  statearray: any[] = [];
  async getState(): Promise<void> {
    const req = new basemodel();
    req.type = '1001';
    this.statearray = [];
    let responce: any = await this.auth.auth_utilities_service(req);
    if (responce.code) {
      this.statearray = responce.Details;
    }
    return responce;
  }
  country_master_array: any[] = [];
  async getcountry(): Promise<void> {
    try {
      const req = new basemodel();
      req.type = '1000';
      this.country_master_array = [];
      let responce: any = await this.auth.auth_utilities_service(req);

      if (responce.code) {
        this.country_master_array = responce.Details;
      }
    } catch (error) {
     
    }
  }
  Hospital_master_array: any[] = [];
  async getHospital(): Promise<void> {
    try {
      const req = new basemodel();
      req.type = '1021';
      this.Hospital_master_array = [];
      let responce: any = await this.auth.auth_utilities_service(req);
      if (responce.code) {
        this.Hospital_master_array = responce.Details;
      } else {
        this.Hospital_master_array = [];
      }
    } catch (error) {
     
    }
  }
  PlaceofBirth_master_array: any[] = [];
  async getPlaceofBirth(): Promise<void> {
    try {
      const req = new basemodel();
      req.type = '1009';
      this.PlaceofBirth_master_array = [];
      let responce: any = await this.auth.auth_utilities_service(req);
      
      if (responce.code) {
        this.PlaceofBirth_master_array = responce.Details;
      } else {
        this.PlaceofBirth_master_array = [];
      }
    } catch (error) {
     
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
        console.error('Error getting location', error);
      }
    );
  }

  loadContracts(val: boolean) {
    this.sub.next(val);
    this.sub.pipe().subscribe((res) => {
      if (res) {
        this.getState();
        this.getcountry();
        this.getHospital();
        this.getPlaceofBirth();
        this.getCurrentLocation();
      }
    });
  }
}
