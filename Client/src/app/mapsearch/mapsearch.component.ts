import{ GlobalConstants } from '../common/global-constants';
import { MapsAPILoader, MouseEvent } from '@agm/core';
import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from '../services/backend.service';
declare var google: any;

@Component({
  selector: 'app-mapsearch',
  templateUrl: './mapsearch.component.html',
   styleUrls: ['./mapsearch.component.css']
})
export class MapsearchComponent implements OnInit {

  error: boolean = false;
  errorMessage: String = "";
  dataLoading: boolean = false;
  private querySubscription;
  savedChanges: boolean = false;
  docData;

  latitude: number;
  longitude: number;
  latitudeOrigin: number;
  longitudeOrigin: number;
  latitudeDestination: number;
  longitudeDestination: number;
  zoom: number;
  address: string;
  private geoCoder;

  destination: any;
  origin: any;
  distance: any;



  @ViewChild('origin')
  public originElementRef: ElementRef;

  @ViewChild('destination')
  public destinationElementRef: ElementRef;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private _route: Router,
    private _backendService: BackendService
  ) { }


  ngOnInit() {
    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder;

      let autocompleteOrigin = new google.maps.places.Autocomplete(this.originElementRef.nativeElement);
      let autocompleteDestination = new google.maps.places.Autocomplete(this.destinationElementRef.nativeElement);

      autocompleteOrigin.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
       //   let place: google.maps.places.PlaceResult = autocompleteOrigin.getPlace();
          let place :any ;
          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.latitudeOrigin = place.geometry.location.lat();
          this.longitudeOrigin = place.geometry.location.lng();
          GlobalConstants.setLatitudeOrigin(place.geometry.location.lat());
          GlobalConstants.setLongitudeOrigin(place.geometry.location.lng());
          this.zoom = 12;
        });
      });

      autocompleteDestination.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocompleteDestination.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
           this.latitude = place.geometry.location.lat();
           this.longitude = place.geometry.location.lng();
           this.latitudeDestination = place.geometry.location.lat();
           this.longitudeDestination = place.geometry.location.lng();
           GlobalConstants.setLatitudeDestination(place.geometry.location.lat());
           GlobalConstants.setLongitudeDestination(place.geometry.location.lng());

           
           this.zoom = 12;
        });
      });

    }); 
  }

  // Get Current Location Coordinates
  private setCurrentLocation() {
    if (navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        this.latitude = +position.coords.latitude;
        this.longitude = +position.coords.longitude;
        GlobalConstants.setLatitudeOrigin(+position.coords.latitude);
        GlobalConstants.setLongitudeOrigin(+position.coords.longitude);
        this.getAddress(+position.coords.latitude, +position.coords.longitude);
      });
    }
  } 

  markerDragEnd($event: MouseEvent) {
    console.log($event);
    this.latitude = $event.coords.lat;
    this.longitude = $event.coords.lng;
    this.getAddress(this.latitude, this.longitude);
  }

  getAddress(latitude, longitude) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      console.log(results);
      console.log(status);
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 12;
          this.address = results[0].formatted_address;
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }

    });
  }

  
  search(formData){
  //this._route.navigate(['/parkingMap']);
  this.dataLoading = true;
  this.querySubscription = this._backendService.searchParking(formData).subscribe((res) => {
    if (res["errorCode"] > 0) {
        this.error = false;
        this.errorMessage = "";
        this.dataLoading = false;
        this.savedChanges = true;
        window.localStorage.setItem('token', res["data"].token);
        this._route.navigate(['/parkingMap']);
    } else {
        this.error = true;
        this.errorMessage = res["errorMessage"];
        this.dataLoading = false;
    }
},
    (error) => {
        this.error = true;
        this.errorMessage = error.message;
        this.dataLoading = false;
    },
    () => {
        this.dataLoading = false;
    });
}

ngOnDestroy(){
  if (this.querySubscription) {
    this.querySubscription.unsubscribe();
}
}
}
