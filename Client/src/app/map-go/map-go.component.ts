import { Component,Input,ViewChild } from '@angular/core';
import{ GlobalConstants } from '../common/global-constants';
import { MapsAPILoader, AgmMap } from '@agm/core';
declare var google: any;

interface Marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}

interface Location {
  lat: number;
  lng: number;
  latsearch:number;
  lngsearch:number;
  viewport?: Object;
  zoom: number;
  address_level_1?: string;
  address_level_2?: string;
  address_country?: string;
  address_zip?: string;
  address_state?: string;
  marker?: Marker;
}
@Component({
  selector: 'app-map-go',
  templateUrl: './map-go.component.html',
  styleUrls: ['./map-go.component.css']
})
export class MapGoComponent {
  destination : any;
  origin :any ;
  distance : any;

  originLat = GlobalConstants.origin.lat ;
  originLng = GlobalConstants.origin.lng ;  
  
  destinationLat = GlobalConstants.destination.lat ;
  destinationLng = GlobalConstants.destination.lng ;

  geocoder: any;
  public location: Location = {
    lat: this.originLat,
    lng: this.originLng,
    latsearch:0,
    lngsearch:0,
    marker: {
      lat: this.originLat,
      lng: this.originLng,
      draggable: true
    },
    zoom: 5
  };

  public markerOptions = {
    origin: {
        icon: 'http://maps.google.com/mapfiles/ms/micons/cabs.png',
        draggable: false,
    },
    destination: {
      icon: 'http://maps.google.com/mapfiles/ms/micons/parkinglot.png',
      opacity: 0.8,
    },
}

public renderOptions = {
  suppressMarkers: true,
}

  @ViewChild(AgmMap, { static: true }) map: AgmMap;

  constructor(public mapsApiLoader: MapsAPILoader) {
    this.destination = GlobalConstants.destination;
    this.origin = GlobalConstants.origin;
    this.mapsApiLoader.load().then(() => {
      this.geocoder = new google.maps.Geocoder();
      this.distance = this.calculateDistance(GlobalConstants.origin , GlobalConstants.destination);
      GlobalConstants.setDistance(this.distance);

    });


  }
  calculateDistance(point1, point2) {
    const p1 = new google.maps.LatLng(
    point1.lat,
    point1.lng
    );
    const p2 = new google.maps.LatLng(
    point2.lat,
    point2.lng
    );
    
    return (
    google.maps.geometry.spherical.computeDistanceBetween(p1, p2)/1000
    ).toFixed(2);
}
}

