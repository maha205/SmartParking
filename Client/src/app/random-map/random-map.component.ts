import { Component, OnInit ,ViewChild} from '@angular/core'
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
  selector: 'app-random-map',
  templateUrl: './random-map.component.html',
  styleUrls: ['./random-map.component.css']
})
export class RandomMapComponent implements OnInit {

  destination: any;
  origin: any;
  distance: any;
  randompoint: any;



  ngOnInit(){
    this.origin = { 
      lat: 32.6950, 
      lng: 35.2820 
    };
  this.destination = { 
      lat: 32.6050, 
      lng: 35.2020 
   };
  }



  geocoder: any;
  public location: Location = {
    lat: 32.6950,
    lng: 35.2820,
    latsearch:0,
    lngsearch:0,
    marker: {
      lat: 32.6950,
      lng: 35.2820,
      draggable: true
    },
    zoom: 5
  };


  
  @ViewChild(AgmMap, { static: true }) map: AgmMap;

  constructor(public mapsApiLoader: MapsAPILoader) {
    this.mapsApiLoader = mapsApiLoader;

    this.mapsApiLoader.load().then(() => {
      this.geocoder = new google.maps.Geocoder();
      this.distance = this.calculateDistance(this.origin, this.destination);
      this.randompoint = this.getRandomLocation(32.6950,35.2820,3000);
    });
  }


  updateOnMap() {
    let full_address: string = this.location.address_level_1 || ""
    if (this.location.address_level_2) { full_address = full_address + " " + this.location.address_level_2; }
    if (this.location.address_state) { full_address = full_address + " " + this.location.address_state; }
    if (this.location.address_country) { full_address = full_address + " " + this.location.address_country; }

    this.findLocation(full_address);
  }

  findLocation(address) {
    if (!this.geocoder) { this.geocoder = new google.maps.Geocoder(); }
    this.geocoder.geocode({
      'address': address
    }, (results, status) => {
      if (status == google.maps.GeocoderStatus.OK) {
        for (var i = 0; i < results[0].address_components.length; i++) {
          let types = results[0].address_components[i].types;

          if (types.indexOf('locality') !== -1) {
            this.location.address_level_2 = results[0].address_components[i].long_name;
          }
          if (types.indexOf('country') !== -1) {
            this.location.address_country = results[0].address_components[i].long_name;
          }
          if (types.indexOf('postal_code') !== -1) {
            this.location.address_zip = results[0].address_components[i].long_name;
          }
          if (types.indexOf('administrative_area_level_1') !== -1) {
            this.location.address_state = results[0].address_components[i].long_name;
          }
        }

        if (results[0].geometry.location) {
          this.location.lat = results[0].geometry.location.lat();
          this.location.lng = results[0].geometry.location.lng();
          this.location.latsearch = results[0].geometry.location.lat();
          this.location.lngsearch = results[0].geometry.location.lng();
          this.location.marker.lat = results[0].geometry.location.lat();
          this.location.marker.lng = results[0].geometry.location.lng();
          this.location.marker.draggable = true;
          this.location.viewport = results[0].geometry.viewport;
        }

        this.map.triggerResize();
      } else {
        alert("Sorry, this search produced no results.");
      }
    });
  }



   getRandomLocation = function (latitude, longitude, radiusInMeters) {

    var getRandomCoordinates = function (radius, uniform) {
        // Generate two random numbers
        var a = Math.random(),
            b = Math.random();

        // Flip for more uniformity.
        if (uniform) {
            if (b < a) {
                var c = b;
                b = a;
                a = c;
            }
        }

        // It's all triangles.
        return [
            b * radius * Math.cos(2 * Math.PI * a / b),
            b * radius * Math.sin(2 * Math.PI * a / b)
        ];
    };

    var randomCoordinates = getRandomCoordinates(radiusInMeters, true);

    // Earths radius in meters via WGS 84 model.
    var earth = 6378137;

    // Offsets in meters.
    var northOffset = randomCoordinates[0],
        eastOffset = randomCoordinates[1];

    // Offset coordinates in radians.
    var offsetLatitude = northOffset / earth,
        offsetLongitude = eastOffset / (earth * Math.cos(Math.PI * (latitude / 180)));

    // Offset position in decimal degrees.
    return {
        max: latitude + (offsetLatitude * (180 / Math.PI)),
        min: longitude + (offsetLongitude * (180 / Math.PI))
    }
};


  findAddressByCoordinates() {
    this.geocoder.geocode({
      'location': {
        lat: this.location.marker.lat,
        lng: this.location.marker.lng
      }
    }, (results, status) => {
      this.decomposeAddressComponents(results);
    });
  }

  decomposeAddressComponents(addressArray) {
    if (addressArray.length == 0) { return false; }
    let address = addressArray[0].address_components;

    for (let element of address) {
      if (element.length == 0 && !element['types']) { continue; }

      if (element['types'].indexOf('street_number') > -1) {
        this.location.address_level_1 = element['long_name'];
        continue;
      }
      if (element['types'].indexOf('route') > -1) {
        this.location.address_level_1 += ', ' + element['long_name'];
        continue;
      }
      if (element['types'].indexOf('locality') > -1) {
        this.location.address_level_2 = element['long_name'];
        continue;
      }
      if (element['types'].indexOf('administrative_area_level_1') > -1) {
        this.location.address_state = element['long_name'];
        continue;
      }
      if (element['types'].indexOf('country') > -1) {
        this.location.address_country = element['long_name'];
        continue;
      }
      if (element['types'].indexOf('postal_code') > -1) {
        this.location.address_zip = element['long_name'];
        continue;
      }
    }
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
