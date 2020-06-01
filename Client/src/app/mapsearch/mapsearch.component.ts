import { Component, OnInit } from '@angular/core';
declare var google; 


@Component({
  selector: 'app-mapsearch',
  templateUrl: './mapsearch.component.html',
  styleUrls: ['./mapsearch.component.css']
})
export class MapsearchComponent implements OnInit {

  location: Location
  selectedMarker: Marker
  origin: any;
  destination: any;
  distance: String;



  ngOnInit(){

    this.origin = { 
      lat: 32.6950, 
      lng: 35.2820 
    };
  this.destination = { 
      lat: 32.6350, 
      lng: 35.2420 
   };
  
    this.location = {
      latitude: 32.6950,
      longitude: 35.2820,
      zoom: 15,
      markers: [
          {
              lat: 32.6950,
              lng: 35.2820
          }
      ]
  }

    // this.distance = this.calculateDistance(this.origin, this.destination)

     this.loadScript('assets/js/jquery-3.3.1.min.js');
     this.loadScript('assets/vendors/appear/jquery.appear.min.js');
     this.loadScript('assets/vendors/jquery.easing/jquery.easing.min.js');
     this.loadScript('assets/js/popper.min.js');
     this.loadScript('assets/js/bootstrap.min.js');
     this.loadScript('assets/vendors/common/common.min.js');
     this.loadScript('assets/vendors/fancybox/jquery.fancybox.min.js');
     this.loadScript('assets/vendors/menu/src/main.menu.js');
     this.loadScript('assets/vendors/owl.carousel/owl.carousel.min.js');
     this.loadScript('assets/vendors/animated-headline/js/animated-headline.js');
     this.loadScript('assets/js/main.js');
     this.loadScript('assets/js/theme.init.js');
     this.loadScript('assets/js/custom.js');


  }

  public loadScript(url: string) {
    const body = <HTMLDivElement> document.body;
    const script = document.createElement('script');
    script.innerHTML = '';
    script.src = url;
    script.async = false;
    script.defer = true;
    body.appendChild(script);
  }


  addMarker(lat: number, lng: number) {
    this.location.markers.push({
        lat,
        lng
    })
  }

  selectMarker(event) {
    this.selectedMarker = {
        lat: event.latitude,
        lng: event.longitude
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

interface Marker {
lat: number;
lng: number;
}

interface Location {
latitude: number;
longitude: number;
zoom: number;
markers: Array<Marker>;
}
