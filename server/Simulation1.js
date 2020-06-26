var mysql = require('mysql');
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Aa123456",
  database : 'smartprking-database',
  port : 3306 ,
  insecureAuth : true
});

// connection to mySql 
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

var parkings = [];
////////////////////////////////////-START-//////////////////////////////
(async () => { 
  await getParkings(); 
  var countFounds = 0;
  var totalCarsAmount = 0 ;
  for(var j=1;j<=1000 ;j++){
   let CarAmount = GetRandomCarAmount();
   totalCarsAmount+= CarAmount ;
   for (let w=1;w<=CarAmount; w++){
    let car = GetRandomCar();
    let hour = GetRandomHour();
    let entry = car.entry - 1 ;
    let parkingsSorted = parkings.sort((p1,p2)=>{return p1.entries[entry]-p2.entries[entry]}); //The nearest parking
    parkings = parkingsSorted//parkings after sort !
    for (let i = 0; i < parkings.length ; i++) {
        let found = parkings[i].count(hour);         
        if(found>=0){ 
            parkings[i].cars.push(car);
            countFounds++;
            break;
        }
      }
    }
  }
  console.log("");
  console.log("");
  console.log("Strategy 2 :")
  console.log("Total cars that looked to parking are:")
  console.log(totalCarsAmount);
   console.log("The numbers of cars that finded parking are:");
   console.log(countFounds);
   console.log("");
   let x = (countFounds/totalCarsAmount)*100
   console.log("Success : ",x,"%");

   
})();

//-------------------build the list of all the parkings from mySql and build the parking Object for each parking ----------------------
async function getParkings()
{
    const Parking = await getallParking();
    let i ;
    for( i in Parking){
      // parking object
      let parkingObj = {    
      parking_slot:  Parking[i]["parking_slot"] , 
      entries : [Parking[i]["gate1"],Parking[i]["gate2"],Parking[i]["gate3"],Parking[i]["gate4"]], 
      cars: [],
      count: function(h){// amount of free slots
           let cnt = 0;
           this.cars.map(c=>{
               if(c.from<=h && c.to>=h){
                   cnt++;
               }
           });
           return this.parking_slot - cnt;
      }   }
      parkings.push(parkingObj);
     }
}
  //--------------------return all the Parking from MySql - DataBase----------------------
  function getallParking(){
    return new Promise((resolve,reject) => {
      address = "Haifa"
      con.query(
        "SELECT * FROM Parking WHERE address ='"+address+"';", 
        (err,result) => {
          console.log(result);
          return err ? reject : resolve(result);
        }
      );
    });
  }
/////////////////////////////////////////////////////RANDOM FUNCTION//////////////////////////////////////////////////////////

//--------------------return random car Object----------------------
function GetRandomCar(){
    let entry = Math.floor(Math.random() * 4) + 1; //entry random [1-4]
    let from = Math.floor(Math.random() * 23) + 1;//from hour random [1-24]
    let longTimeInParking;
    
    //    let to = from + longTimeInParking ; let max 24 du to the day 
    if(from == 1) {longTimeInParking = Math.floor(Math.random() * 23) + 1;}//how long time hour the user want to park random [1-23]
    if(from == 2) {longTimeInParking = Math.floor(Math.random() * 22) + 1;}//how long time hour the user want to park random [1-22]
    if(from == 3) {longTimeInParking = Math.floor(Math.random() * 21) + 1;}//how long time hour the user want to park random [1-21]
    if(from == 4) {longTimeInParking = Math.floor(Math.random() * 20) + 1;}//how long time hour the user want to park random [1-20]
    if(from == 5) {longTimeInParking = Math.floor(Math.random() * 19) + 1;}//how long time hour the user want to park random [1-19]
    if(from == 6) {longTimeInParking = Math.floor(Math.random() * 18) + 1;}//how long time hour the user want to park random [1-18]
    if(from == 7) {longTimeInParking = Math.floor(Math.random() * 17) + 1;}//how long time hour the user want to park random [1-17]
    if(from == 8) {longTimeInParking = Math.floor(Math.random() * 16) + 1;}//how long time hour the user want to park random [1-16]
    if(from == 9) {longTimeInParking = Math.floor(Math.random() * 15) + 1;}//how long time hour the user want to park random [1-15]
    if(from == 10) {longTimeInParking = Math.floor(Math.random() * 14) + 1;}//how long time hour the user want to park random [1-14]
    if(from == 11) {longTimeInParking = Math.floor(Math.random() * 13) + 1;}//how long time hour the user want to park random [1-13]
    if(from == 12) {longTimeInParking = Math.floor(Math.random() * 12) + 1;}//how long time hour the user want to park random [1-12]
    if(from == 13) {longTimeInParking = Math.floor(Math.random() * 11) + 1;}//how long time hour the user want to park random [1-11]
    if(from == 14) {longTimeInParking = Math.floor(Math.random() * 10) + 1;}//how long time hour the user want to park random [1-10]
    if(from == 15) {longTimeInParking = Math.floor(Math.random() * 9) + 1;}//how long time hour the user want to park random [1-9]
    if(from == 16) {longTimeInParking = Math.floor(Math.random() * 8) + 1;}//how long time hour the user want to park random [1-8]
    if(from == 17) {longTimeInParking = Math.floor(Math.random() * 7) + 1;}//how long time hour the user want to park random [1-7]
    if(from == 18) {longTimeInParking = Math.floor(Math.random() * 6) + 1;}//how long time hour the user want to park random [1-6]
    if(from == 19) {longTimeInParking = Math.floor(Math.random() * 5) + 1;}//how long time hour the user want to park random [1-5]
    if(from == 20) {longTimeInParking = Math.floor(Math.random() * 4) + 1;}//how long time hour the user want to park random [1-4]
    if(from == 21) {longTimeInParking = Math.floor(Math.random() * 3) + 1;}//how long time hour the user want to park random [1-3]
    if(from == 22) {longTimeInParking = Math.floor(Math.random() * 2) + 1;}//how long time hour the user want to park random [1-2]
    if(from == 23) {longTimeInParking = Math.floor(Math.random() * 1) + 1;}//how long time hour the user want to park random [1]

    let to = from + longTimeInParking ; 

// car object
   let car = { // example
      entry: entry,
      from: from,
      to: to
    }
  return car ; 

}

function GetRandomHour()
{
    return Math.floor(Math.random() * 23) + 1;
}

function GetRandomCarAmount()
{
    return Math.floor(Math.random() * 50) + 1;
}
  

