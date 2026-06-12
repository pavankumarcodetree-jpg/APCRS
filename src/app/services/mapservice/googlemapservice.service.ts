import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GooglemapserviceService {

  private geocoder: google.maps.Geocoder;

  constructor() {
    this.geocoder = new google.maps.Geocoder();
  }
  geoJsonUrl = 'assets/json/NEW_DISTRICTS.geojson';
  coordinatesArray: any[] = [];
  coordinatesArray1: any[] = [];
  polygons: { polygon: google.maps.Polygon; name: string }[] = [];
  currentpolygonid: any = '';
  currentpolygonname: any = '';
  polarray: any = [];
  geocodeAddress(address: string): Promise<google.maps.GeocoderResult[]> {
    return new Promise((resolve, reject) => {
      this.geocoder.geocode({ address: address }, (results, status) => {
        if (status === 'OK' && results) {
          resolve(results);
        } else {
          reject('Geocode was not successful for the following reason: ' + status);
        }
      });
    });
  }
   
  async geocodeAddress_latlong(lat: number, lng: number): Promise<google.maps.GeocoderResult[]> {
    const geocoder = new google.maps.Geocoder();
    
    // Ensure lat and lng are numbers
    const latlng = { lat: Number(lat), lng: Number(lng) }; 
  
    return new Promise((resolve, reject) => {
      geocoder.geocode({ location: latlng }, (results, status) => {
        if (status === 'OK' && results) {
          resolve(results);
        } else {
          reject('Geocode was not successful for the following reason: ' + status);
        }
      });
    });
  }
  geocodeLatLng(latlng: google.maps.LatLng): Promise<google.maps.GeocoderResult[]> {
    return new Promise((resolve, reject) => {
      this.geocoder.geocode({ location: latlng }, (results, status) => {
        if (status === 'OK' && results) {
          resolve(results);
        } else {
          reject('Geocode was not successful for the following reason: ' + status);
        }
      });
    });
  }

  async calculateDistance(origin: string, destination: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const service = new google.maps.DistanceMatrixService();
      service.getDistanceMatrix(
        {
          origins: [origin],
          destinations: [destination],
          travelMode: google.maps.TravelMode.DRIVING,
          unitSystem: google.maps.UnitSystem.METRIC,
          avoidHighways: false,
          avoidTolls: false,
        },
        (response, status) => {
          if (status === google.maps.DistanceMatrixStatus.OK) {
            resolve(response);
          } else {
            reject('Error with distance calculation: ' + status);
          }
        }
      );
    });
  }

 
  async calculateRouteWithWaypointsAvoided(
    origin: string,
    destination: string,
    waypoints: google.maps.DirectionsWaypoint[]
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      const directionsService = new google.maps.DirectionsService();
  
      directionsService.route(
        {
          origin: origin,
          destination: destination,
          waypoints: waypoints,
          optimizeWaypoints: true, // Optimize the waypoints to avoid strict routing through them
          travelMode: google.maps.TravelMode.DRIVING,
          avoidHighways: false,
          avoidTolls: false
        },
        (response, status) => {
          if (status === google.maps.DirectionsStatus.OK) {
            resolve(response);
          } else {
            reject('Error with route calculation: ' + status);
          }
        }
      );
    });
  }
  async loadGeoJson(): Promise<void> {
    try {
     
      const response = await fetch(this.geoJsonUrl);
      const geoJsonData = await response.json();
      this.extractGeoJsonData(geoJsonData);
    } catch (error) {
      console.error('Error loading GeoJSON:', error);
    }
  }

  extractGeoJsonData(geoJsonData: any): void {
    if (geoJsonData && geoJsonData.features) {
      geoJsonData.features.forEach((feature: any) => {
        const geometry = feature.geometry;
        const properties = feature.properties;
        if (geometry) {
          this.processGeometry(geometry, properties);
        }
      });
    }
  }

  processGeometry(geometry: any, properties: any): void {
    const type = geometry.type;
    const coordinates = geometry.coordinates;

    if (type === 'Polygon') {
      if (coordinates.length == 2) {
        let latlongarray: any = [];
        this.coordinatesArray1 = [];
        latlongarray.push(coordinates[0]);
        latlongarray.forEach((ring: any[]) => {
          ring.forEach((coord: any) => {
            this.coordinatesArray1.push({
              lat: coord[1],
              lng: coord[0],
              id: properties.CODE,
              Name: properties.NAME,
            });
          });
        });
        let latlongarrayone: any = [];
        latlongarrayone.push(coordinates[1]);
        latlongarrayone.forEach((ring: any[]) => {
          ring.forEach((coord: any) => {
            this.coordinatesArray1.push({
              lat: coord[1],
              lng: coord[0],
              id: properties.CODE,
              Name: properties.NAME,
            });
          });
        });
        this.coordinatesArray.push(this.coordinatesArray1);
      } else {
        let latlongarrayone: any = [];
        this.coordinatesArray1 = [];
        latlongarrayone.push(coordinates[0]);
        latlongarrayone.forEach((ring: any[]) => {
          ring.forEach((coord: any) => {
            this.coordinatesArray1.push({
              lat: coord[1],
              lng: coord[0],
              id: properties.CODE,
              Name: properties.NAME,
            });
          });
        });
        this.coordinatesArray.push(this.coordinatesArray1);
      }
    } else if (type === 'MultiPolygon') {
      if (coordinates.length >= 2) {
        let latlongarray: any = [];
        this.coordinatesArray1 = [];
        latlongarray.push(coordinates[0][0]);
        latlongarray.forEach((ring: any[]) => {
          ring.forEach((coord: any) => {
            this.coordinatesArray1.push({
              lat: coord[1],
              lng: coord[0],
              id: properties.CODE,
              Name: properties.NAME,
            });
          });
        });
        let latlongarrayone: any = [];
        latlongarrayone.push(coordinates[1][0]);
        latlongarrayone.forEach((ring: any[]) => {
          ring.forEach((coord: any) => {
            this.coordinatesArray1.push({
              lat: coord[1],
              lng: coord[0],
              id: properties.CODE,
              Name: properties.NAME,
            });
          });
        });

        if (coordinates.length == 3) {
          let latlongarraythree: any = [];
          latlongarraythree.push(coordinates[2][0]);
          latlongarraythree.forEach((ring: any[]) => {
            ring.forEach((coord: any) => {
              this.coordinatesArray1.push({
                lat: coord[1],
                lng: coord[0],
                id: properties.CODE,
                Name: properties.NAME,
              });
            });
          });
          this.coordinatesArray.push(this.coordinatesArray1);
        } else {
          this.coordinatesArray.push(this.coordinatesArray1);
        }
      } else {
        let latlongarrayone: any = [];
        this.coordinatesArray1 = [];
        latlongarrayone.push(coordinates[0]);
        latlongarrayone.forEach((ring: any[]) => {
          ring.forEach((coord: any) => {
            this.coordinatesArray1.push({
              lat: coord[1],
              lng: coord[0],
              id: properties.CODE,
              Name: properties.NAME,
            });
          });
        });
        this.coordinatesArray.push(this.coordinatesArray1);
      }
    }
  }

  resetPolygons() {
    this.polygons.forEach(polygonObj => {
        polygonObj.polygon.setMap(null);  // Remove from the map
    });
    this.polygons = [];  // Clear the array
}
  async searchLocationbasedonlatlong(obj:any): Promise<any[]> {
   
    this.coordinatesArray=[];
   await this.loadGeoJson();
    this.resetPolygons();
    const polygonsArray:any[] = []; // Array to store polygons
  
    if (this.coordinatesArray.length === 26) {
      for (let i = 0; i < this.coordinatesArray.length; i++) {
        let innarray: any[] = [];
        let polygonname: string = '';
        let polygonid: any = '';
        this.polarray = [];
       
        innarray = this.coordinatesArray[i];
        innarray.forEach((ring: any) => {
          this.polarray.push({
            lat: ring.lat,
            lng: ring.lng,
          });
          polygonname = ring.Name;
          polygonid = ring.id;
        });
        const coordinates: google.maps.LatLngLiteral[] = this.polarray;
       
       if(polygonid==obj)
       {
          const polygon = this.addPolygonToMap(
            polygonid,
            polygonname,
            coordinates,
            '#FF0000',
            ''
          );
          polygonsArray.push(polygon); // Collect polygons
        }
        else  if(obj=="0"){
          const polygon = this.addPolygonToMap(
            polygonid,
            polygonname,
            coordinates,
            '#FF0000',
            ''
          );
          polygonsArray.push(polygon); // Collect polygons
        }
         
        
      }
    }
    return polygonsArray; // Return the collected polygons
  }
  
  addPolygonToMap(
    code: string,
    name: string,
    coordinates: google.maps.LatLngLiteral[],
    strokeColor: string,
    fillColor: string
  ) {
    // Create the polygon options
    this.currentpolygonid = code;
    this.currentpolygonname = name;
    const polygonOptions: google.maps.PolygonOptions = {
      paths: coordinates,
    };
  
    // Create the polygon
    const polygon = new google.maps.Polygon(polygonOptions);
    this.polygons.push({ polygon, name });
  
    return { polygon, name }; // Return the created polygon
  }
  
}