const pool = require('./dbconnection');
//const bcrypt = require('bcrypt');
var password = require('password-hash-and-salt');
//const saltRounds = 10;
const jwt = require('jsonwebtoken');

const session = require('express-session'),
      bodyParser = require('body-parser');

var resultsNotFound = {
  "errorCode": "0",
  "errorMessage": "Operation not successful.",
  "rowCount": "0",
  "data": ""
};
var resultsFound = {
  "errorCode": "1",
  "errorMessage": "Operation successful.",
  "rowCount": "1",
  "data": ""
};

var simoulation1Result={
  "praking" : "" ,
  "result":""
};
var simoulation2Result={
  "praking" : "" ,
   "result":""
};
var parkings = [];

module.exports = {
  createUser: function (req, res) {
    pool.getConnection(function (err, connection) {
      if (err) throw err; // not connected!
    
      password(req.body.inputPassword).hash(function (error, hash) {
        var sql = 'INSERT INTO person SET ?';
        var values = { 'email': req.body.inputEmail, 'password':req.body.inputPassword,  'phone':req.body.inputPhoneNo, 'address':req.body.inputAddress,'carNumber':req.body.inputCarNo,'role': "user"  , 'fullName': req.body.inputFullName,}
        // Use the connection
        connection.query(sql, values, function (error, results, fields) {
          if (error) {
            console.log(error);
            resultsNotFound["errorMessage"] = "emailID already exists.";
            return res.send(resultsNotFound);
          } else {console.log("INSERT");return res.send(resultsFound)};

          // When done with the connection, release it.
          connection.release(); // Handle error after the release.
          if (error) throw error; // Don't use the connection here, it has been returned to the pool.
        });
      });
    });
  },
  loginUser: function (req, res) {
    pool.getConnection(function (err, connection) {
      if (err) throw err; // not connected!
        //		connection.query('SELECT * FROM person WHERE email = ? AND password = ?', [email, password], function(error, results, fields) {
        var sql = 'SELECT * FROM person WHERE email = ?';
        var values = [req.body.inputEmail]
        // Use the connection
        connection.query(sql, values, function (error, results, fields) {
          console.log(results);
          if (error) {
            resultsNotFound["errorMessage"] = "Something went wrong with Server.";
            return res.send(resultsNotFound);
          }
          if (results.length <= 0) {
            resultsNotFound["errorMessage"] = "User email not found.";
            return res.send(resultsNotFound);
          }
          if (results.length > 0 && results[0]["password"] !=  req.body.inputPassword) {
            resultsNotFound["errorMessage"] = "Incorrect Password.";
            return res.send(resultsNotFound);          }          
          if (results.length > 0 && results[0]["password"] ==  req.body.inputPassword) {
            req.session.loggedin = true;
            req.session.email = req.body.inputEmail;
            var token = {
             "token": jwt.sign(
             { email: req.body.inputEmail },
              process.env.JWT_SECRET,
             { expiresIn: '30d' }
             )
          };
           resultsFound["data"] = token;
            console.log(req.session.email);
            return res.send(resultsFound)           
          }
          // When done with the connection, release it.
          connection.release(); // Handle error after the release.
          if (error) throw error; // Don't use the connection here, it has been returned to the pool.
        });
      });
  },
    //       password(req.body.inputPassword).verifyAgainst(results[0]["password"], function (error, verified) {
    //       //bcrypt.compare(req.body.inputPassword, results[0].password, function (err, result) {
    // //  if (results == true) {
    //   if (results.length > 0){
    //     var token = {
    //       "token": jwt.sign(
    //         { email: req.body.inputEmail },
    //         process.env.JWT_SECRET,
    //         { expiresIn: '30d' }
    //       )
    //     }
    //     resultsFound["data"] = token;
    //     res.send(resultsFound);
    //   } else {
    //     resultsNotFound["errorMessage"] = "Incorrect Password.";
    //     return res.send(resultsNotFound);
    //   }
    // });


  getUser: function (input, res) {
    pool.getConnection(function (err, connection) {
      if (err) throw err; // not connected!

        var sql = 'SELECT * FROM person WHERE email = ?';
        var values = [input]
        // Use the connection
        connection.query(sql, values, function (error, results, fields) {
          if (error) {
            resultsNotFound["errorMessage"] = "Something went wrong with Server.";
            return res.send(resultsNotFound);
          }
          if (results.length <= 0) {
            resultsNotFound["errorMessage"] = "User Id not found.";
            return res.send(resultsNotFound);
          }
          resultsFound["data"] = results[0];
          res.send(resultsFound);
          // When done with the connection, release it.
          connection.release(); // Handle error after the release.
          if (error) throw error; // Don't use the connection here, it has been returned to the pool.
        });
      });
  },
  updateUser: function (userEmail, req, res) {
    pool.getConnection(function (err, connection) {
      if (err) throw err; // not connected!

      password(req.body.inputPassword).hash(function (error, hash) {
      //bcrypt.hash(req.body.inputPassword, saltRounds, function (err, hash) {
        var sql = 'UPDATE person SET ? WHERE email = ?';
        var values = { 'email': req.body.inputEmail, 'password':req.body.inputPassword,  'phone':req.body.inputPhoneNo, 'address':req.body.inputAddress,'carNumber':req.body.inputCarNo,'role': "user"  , 'fullName': req.body.inputFullName}
        // Use the connection
        connection.query(sql, [values, userEmail], function (error, results, fields) {
          if (error) {
            console.log(error)
            resultsNotFound["errorMessage"] = "Data is NOT updated.";
            return res.send(resultsNotFound);
          } else return res.send(resultsFound);

          // When done with the connection, release it.
          connection.release(); // Handle error after the release.
          if (error) throw error; // Don't use the connection here, it has been returned to the pool.
        });
      });
    });
  },
  setLocation: function (userEmail, req, res) {
    pool.getConnection(function (err, connection) {
      if (err) throw err; // not connected!

      var sql = 'INSERT INTO usergps SET ?';
      var values = { 'lat': req.body.lat, 'long': req.body.long, 'email': userEmail, 'createdAt': new Date() }  
        // Use the connection
        connection.query(sql, values, function (error, results, fields) {
          if (error) {
            resultsNotFound["errorMessage"] = "Data is NOT updated.";
            return res.send(resultsNotFound);
          } else return res.send(resultsFound);

          // When done with the connection, release it.
          connection.release(); // Handle error after the release.
          if (error) throw error; // Don't use the connection here, it has been returned to the pool.
        });
    });
  },
  getLocation: function (input, res) {
    pool.getConnection(function (err, connection) {
      if (err) throw err; // not connected!

        var sql = 'SELECT * FROM `usergps` WHERE `email` = ?';
        var values = [input]
        // Use the connection
        connection.query(sql, values, function (error, results, fields) {
          if (error) {
            resultsNotFound["errorMessage"] = "Something went wrong with Server.";
            return res.send(resultsNotFound);
          }
          if (results =="") {
            resultsNotFound["errorMessage"] = "User Id not found.";
            return res.send(resultsNotFound);
          }
          console.log(results)
          resultsFound["data"] = results;
          res.send(resultsFound);
          // When done with the connection, release it.
          connection.release(); // Handle error after the release.
          if (error) throw error; // Don't use the connection here, it has been returned to the pool.
        });
      });
  },
  searchParking:  function (req, res) {
      var address = req.body.destinationinput ;

      Simulation1(address).then(()=>{
        console.log("yes");
        res.send(resultsFound); 

      });

  
   async function Simulation1(address)
  {
    pool.getConnection(function (err, con) {
      if (err) throw err; // not connected!
      simulation(address);
    ////////////////////////////////////-START-//////////////////////////////
  async function simulation (address){ 
  await getParkings(address); 
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
    simoulation1Result["praking"] = parkings[0] ;
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
   console.log("Total cars that looked to parking are:")
   console.log(totalCarsAmount);
   console.log("The numbers of cars that finded parking are:");
   console.log(countFounds);
   simoulation1Result["result"]= (countFounds/totalCarsAmount)*100 ;
   console.log(simoulation1Result);
   resultsFound["data"] = simoulation1Result ;

}

//-------------------build the list of all the parkings from mySql and build the parking Object for each parking ----------------------
async function getParkings(address)
{
    const Parking = await getallParking(address);
    let i ;
    for( i in Parking){
      // parking object
      let parkingObj = {  
      id :   Parking[i]["id"] ,
      address :   Parking[i]["address"] ,
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
  function getallParking(address){
    return new Promise((resolve,reject) => {
      con.query(
        "SELECT * FROM Parking WHERE address ='"+address+"';", 
        (err,result) => {
          console.log(result);
          return err ? reject : resolve(result);
          // if (error) {
          //   reject ;
          //   resultsNotFound["errorMessage"] = "Something went wrong with Server.";
          //   return res.send(resultsNotFound);
          // }
          // else{
          //   resolve(result);
          // }
         
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

function GetRandomCarAmount ()
{
    return Math.floor(Math.random() * 50) + 1;
}


//connection.release(); // Handle error after the release.

});

}},

  //Function to simulation 2
  Simulation2 : function(address)
  {
    pool.getConnection(function (err, con) {
      if (err) throw err; // not connected!


    ////////////////////////////////////-START-//////////////////////////////
(async () => { 
  await getParkings(address); 
  var countFounds = 0;
  var totalCarsAmount = 0 ;
  for(var j=1;j<=1000 ;j++){
   let CarAmount = GetRandomCarAmount();
   totalCarsAmount+= CarAmount ;
   for (let w=1;w<=CarAmount; w++){
    let car = GetRandomCar();
    let hour = GetRandomHour();
    let entry = car.entry - 1 ;
    let parkingsSorted = parkings.sort((p1,p2)=>{return p1.parking_slot-p2.parking_slot});//the parking that have the max parking slot
    parkings = parkingsSorted//parkings after sort !
    simoulation2Result["praking"] = parkingsSorted[0] ;
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
   console.log("Total cars that looked to parking are:")
   console.log(totalCarsAmount);
   console.log("The numbers of cars that finded parking are:");
   console.log(countFounds);
   simoulation2Result["result"]= (countFounds/totalCarsAmount)*100 ;
   console.log(simoulation2Result);
   resultsFound["data"] = simoulation2Result ;

})();

//-------------------build the list of all the parkings from mySql and build the parking Object for each parking ----------------------
async function getParkings(address)
{
    const Parking = await getallParking(address);
    let i ;
    for( i in Parking){
      // parking object
      let parkingObj = {  
      id :   Parking[i]["id"] ,
      address :   Parking[i]["address"] ,
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
  function getallParking(address){
    return new Promise((resolve,reject) => {
      con.query(
        "SELECT * FROM Parking WHERE address ='"+address+"';", 
        (err,result) => {
          console.log(result);
          return err ? reject : resolve(result);
          // if (error) {
          //   reject ;
          //   resultsNotFound["errorMessage"] = "Something went wrong with Server.";
          //   return res.send(resultsNotFound);
          // }
          // else{
          //   resolve(result);
          // }
         
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

function GetRandomCarAmount ()
{
    return Math.floor(Math.random() * 50) + 1;
}


//connection.release(); // Handle error after the release.

});

},



   
};