import { Component,Input,ViewChild} from '@angular/core';
import { MapsearchComponent } from '../mapsearch/mapsearch.component';
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
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent {
  destination = GlobalConstants.destination;
  origin = GlobalConstants.origin;
  distance = GlobalConstants.distance;

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


  @ViewChild(AgmMap, { static: true }) map: AgmMap;

  constructor(public mapsApiLoader: MapsAPILoader) {
    if (navigator)
    {
    navigator.geolocation.getCurrentPosition( pos => {
      this.origin.lat=  +pos.coords.latitude,
      this.origin.lng= +pos.coords.longitude
      });
    }

    this.mapsApiLoader.load().then(() => {
      this.geocoder = new google.maps.Geocoder();
    });
  }

}

