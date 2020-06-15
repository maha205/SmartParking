import { newArray } from "@angular/compiler/src/util";

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
    public static address1 :any ={
      lat:0,
      lng:0
    } ;
    public static parkings : [any] 
    
    
    public static allAddress : [string] =[""] ;


    public static getAllAdress() : void
    {
        this.allAddress.length = this.parkings.length;
        for(let  i=0;i<this.parkings.length ; i++)
          {
            this.getAddress(this.parkings[i]["lat"] , this.parkings[i]["lng"]);
            this.allAddress.push(this.current_location_address);
          }
    }
    public static addAddress (address :string):void{
      this.allAddress.push(address) ;
    } 
    public static setAddress (address :any):void{
      this.address1 = address ;
    } 
    public static setAllAddress (allAddress : [string]):void{
      this.allAddress = allAddress ;
    }
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
        this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
          if (status === 'OK') {
            if (results[0]) {
              this.current_location_address = results[0].formatted_address;
            } else {
              window.alert('No results found');
            }
          } else {
            window.alert('Geocoder failed due to: ' + status);
          }
    
        });
        
      }

}