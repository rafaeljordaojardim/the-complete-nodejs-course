const request = require('request');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
// const url = 'https://api.darksky.net/forecast/3ac0493ee917a88450e9bd57b5cd44af/37.8267,-122.4233';

// request({url:url, json:true}, (error, response) => {
//    if (error) {
//         console.log('Unable to connect to weather service!');
//     }else if(response.body.error){
//         console.log('Unable to find location');
        
//     }else {
//         const {temperature,precipProbability:prob} = response.body.currently;
//         const  data  = response.body.daily.data[0].summary;
//         console.log(data + ` It is currently ${temperature} degress out. There is a ${prob} chance of rain`);
//    }
   
// })

//Geocoding  - other api to get a location
//Adress -> Lat/ling -> Wheader

//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

forecast(-75.7088, 44.1545, (error, data) => {
    console.log('Error', error)
    console.log('Data', data)
  })


geocode('Brazil', (error, data) => {
    
});