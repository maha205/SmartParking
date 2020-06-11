export class GlobalConstants { 
    public static geoCoder :any;

    public static current_location_address : string ;

    public static  destination: any = {
        lat : 0,
        lng : 0
    };
    public static origin: any =  {
        lat : 0,
        lng : 0
    };
    public static distance: number =  0;
    public static latitudeOrigin: number ;
    public static longitudeOrigin:number ;
    public static latitudeDestination :number;
    public static longitudeDestination :number ;
    public static parkings : [any] ;

    public static setParkings(parkings :[any]):void{
      this.parkings = parkings ;
    }
    public static setCurrentLocationAddress(addres :string):void{
        this.current_location_address = addres ;
    }
    
    public static setLatitudeOrigin(lat: number):void{
        this.latitudeOrigin = lat;
        this.origin.lat = this.latitudeOrigin ;
    }    
    public static setLatitudeDestination(lat: number):void{
        this.latitudeDestination = lat;
        this.destination.lat = this.latitudeDestination
    }    
    public static setLongitudeOrigin(lng: number):void{
        this.longitudeOrigin = lng;
        this.origin.lng = lng ;
    }    
    public static setLongitudeDestination(lng: number):void{
        this.longitudeDestination = lng;
        this.destination.lng = lng ;
    }

    
    public static setDestination(destination: any):void{
        this.destination.lat = destination.lat ;
        this.destination.lng = destination.lng ;
    }
    
    public static setOrigin(origin: any):void{
        this.origin.lat = origin.lat ;
        this.origin.lng = origin.lng ;
    }

    public static setDistance(distance: any):void{
        this.distance = distance ;
    }

     public static getAddress(latitude:number, longitude:number) :void{
        GlobalConstants.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
          if (status === 'OK') {
            if (results[0]) {
              GlobalConstants.current_location_address = results[0].formatted_address;
            } else {
              window.alert('No results found');
            }
          } else {
            window.alert('Geocoder failed due to: ' + status);
          }
    
        });
        
      }

}