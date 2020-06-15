import { Component,Input,ViewChild,OnInit } from '@angular/core';
import{ GlobalConstants } from '../common/global-constants';
import { MapsAPILoader, AgmMap, AgmMarker } from '@agm/core';
import { Router } from '@angular/router';


declare var google: any;


declare namespace google.maps.places {
  export interface PlaceResult { geometry }
}

interface Marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}

interface Mulmarker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
  icon?:string;
}

interface dodo {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
  icon?:string;
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
  selector: 'app-parking-map',
  templateUrl: './parking-map.component.html',
  styleUrls: ['./parking-map.component.css']
})
export class ParkingMapComponent implements OnInit {
  contacts: any;

  private geoCoder;
  destination : any;
  origin :any ;
  cost1:number ;
  cost2:number ;
  cost3:number ;
  cost4:number ;
  cost5:number ;
  cost6:number ;
  distance : any;
  distance1 : any;
  distance2 : any;
  distance3 : any;
  distance4 : any;
  distance5 : any;
  distance6 : any;
  address1 : string;
  address2 : any;
  address3 : any;
  address4 : any;
  address5 : any;
  address6 : any;
  address: string;

  allAddress : [string] ;
  
  
  zoomLevel: number = 11;
  


  originLat = GlobalConstants.origin.lat ;
  originLng = GlobalConstants.origin.lng ;  
  
 destinationLat = GlobalConstants.destination.lat ;
 destinationLng = GlobalConstants.destination.lng ;
 

//    destinationLat = GlobalConstants.destination.lat ;
//      destinationLng = GlobalConstants.destination.lng ;
//  // maha = GlobalConstants.parkings[0]["lat"] ;

  // GlobalConstants.parkings[0]["lat"] 
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

ngOnInit() {
}

  @ViewChild(AgmMap, { static: true }) map: AgmMap;

  constructor(public mapsApiLoader: MapsAPILoader,private _route: Router ) {
    
    
    this.destination = GlobalConstants.destination;
    this.origin = GlobalConstants.origin;
    this.mapsApiLoader.load().then(() => {

      this.geocoder = new google.maps.Geocoder();
      // this.getAddress(32.7614,35.0195);



      this.address1=GlobalConstants.parkings[0]["location"];
      this.cost1 = GlobalConstants.parkings[0]["cost"];       
      
      this.address2=GlobalConstants.parkings[1]["location"];
      this.cost2 = GlobalConstants.parkings[1]["cost"];       
      
      this.address3=GlobalConstants.parkings[2]["location"];
      this.cost3 = GlobalConstants.parkings[2]["cost"];       
      
      this.address4=GlobalConstants.parkings[3]["location"];
      this.cost4 = GlobalConstants.parkings[3]["cost"];

      this.address5=GlobalConstants.parkings[4]["location"];
      this.cost5 = GlobalConstants.parkings[4]["cost"];
      
      this.address6=GlobalConstants.parkings[5]["location"];
      this.cost6 = GlobalConstants.parkings[5]["cost"];

        this.distance1 = this.calculateDistance( GlobalConstants.origin  , this.destination1 );
        this.distance2 = this.calculateDistance( GlobalConstants.origin  , this.destination2 );
        this.distance3 = this.calculateDistance( GlobalConstants.origin  , this.destination3 );
        this.distance4 = this.calculateDistance( GlobalConstants.origin  , this.destination4 );
        this.distance5 = this.calculateDistance( GlobalConstants.origin  , this.destination5 );
        this.distance6 = this.calculateDistance( GlobalConstants.origin  , this.destination6 );


        let arrParking = [
          {
          address : this.address1,
          dis :this.distance1,
          cost : this.cost1,
          destination :this.destination1
          },  
          {
            address : this.address2,
            dis :this.distance2,
            cost : this.cost2,
            destination :this.destination2
          }, 
          {
             address : this.address3,
             dis :this.distance3,
             cost : this.cost3,
             destination :this.destination3
          },
          {
            address : this.address4,
            dis :this.distance4,
            cost : this.cost4,
            destination :this.destination4
         },          
         {
          address : this.address5,
          dis :this.distance5,
          cost : this.cost5,
          destination :this.destination5
       },
       {
        address : this.address6,
        dis :this.distance6,
        cost : this.cost6,
        destination :this.destination6
     },  ]
     
     let parkingsSorted = arrParking.sort((p1,p2)=>{return p1.dis-p2.dis}); //The nearest parking

     GlobalConstants.setDestination(parkingsSorted[0].destination);


     this.address1 = parkingsSorted[0].address ;
     this.distance1 = parkingsSorted[0].dis;
     this.cost1 = parkingsSorted[0].cost;
     
     this.address2 = parkingsSorted[1].address ;
     this.distance2 = parkingsSorted[1].dis;
     this.cost2 = parkingsSorted[1].cost;

     this.address3 = parkingsSorted[2].address ;
     this.distance3 = parkingsSorted[2].dis;
     this.cost3 = parkingsSorted[2].cost;

     this.address4 = parkingsSorted[3].address ;
     this.distance4 = parkingsSorted[3].dis;
     this.cost4 = parkingsSorted[3].cost;

     this.address5 = parkingsSorted[4].address ;
     this.distance5 = parkingsSorted[4].dis;
     this.cost5 = parkingsSorted[4].cost;

     this.address6 = parkingsSorted[5].address ;
     this.distance6 = parkingsSorted[5].dis;
     this.cost6 = parkingsSorted[5].cost;


       
    });

  }
  

  calculateDistance(point1, point2 ) {
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

markers: Mulmarker[] = [
  {
    lat:GlobalConstants.parkings[0]["lat"],
    lng: GlobalConstants.parkings[0]["lng"],
    draggable: false,
    icon: 'https://www.webiconset.com/map-icons/images/pin3.png'
  },
  {
    lat: GlobalConstants.parkings[1]["lat"],
    lng: GlobalConstants.parkings[1]["lng"],
    draggable: false,
    icon: 'https://www.webiconset.com/map-icons/images/pin3.png'
  },
  {
    lat: GlobalConstants.parkings[2]["lat"],
    lng:GlobalConstants.parkings[2]["lng"],
    draggable: false,
    icon: 'https://www.webiconset.com/map-icons/images/pin3.png'
  },
  {
    lat: GlobalConstants.parkings[3]["lat"],
    lng: GlobalConstants.parkings[3]["lng"],
    draggable: false,
    icon: 'https://www.webiconset.com/map-icons/images/pin3.png'
  },
  {
    lat: GlobalConstants.parkings[4]["lat"],
    lng: GlobalConstants.parkings[4]["lng"],
    draggable: false,
    icon: 'https://www.webiconset.com/map-icons/images/pin3.png'
  },
  {
    lat: GlobalConstants.parkings[5]["lat"],
    lng: GlobalConstants.parkings[5]["lng"],
    draggable: false,
    icon: 'https://www.webiconset.com/map-icons/images/pin3.png'
  }
]


public destination1: any = {
  lat : this.markers[0].lat,
  lng : this.markers[0].lng,
};
public destination2: any = {
  lat : this.markers[1].lat,
  lng : this.markers[1].lng,
};
public destination3: any = {
  lat : this.markers[2].lat,
  lng : this.markers[2].lng,
};
public destination4: any = {
  lat : this.markers[3].lat,
  lng : this.markers[3].lng,
};
public destination5: any = {
  lat : this.markers[4].lat,
  lng : this.markers[4].lng,
};
public destination6: any = {
  lat : this.markers[5].lat,
  lng : this.markers[5].lng,
};


getAddress(latitude, longitude) {
  this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
    console.log(results);
    console.log(status);
    if (status === 'OK') {
      if (results[0]) {
        // this.zoom = 12;
        this.address1=results[0].formatted_address;
        // return (results[0].formatted_address);
      } else {
        window.alert('No results found');
      }
    } else {
      window.alert('Geocoder failed due to: ' + status);
    }

  });
}
userLocationMarkerAnimation: string;

  mapReading() {
    this.userLocationMarkerAnimation = 'BOUNCE';
  
}

Go(formData){
  this._route.navigate(['/mapgo']);
}

}