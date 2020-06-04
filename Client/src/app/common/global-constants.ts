export class GlobalConstants {      
    public static  destination: any = {
        lat : 0,
        lng : 0
    };
    public static origin: any =  {
        lat : 0,
        lng : 0
    };
    public static distance: number =  0;
   
    
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

}