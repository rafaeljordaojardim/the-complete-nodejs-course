const request = require('request');


const url = 'https://api.darksky.net/forecast/3ac0493ee917a88450e9bd57b5cd44af/37.8267,-122.4233';

request({url:url, json:true}, (error, response) => {
   if (error) {
        console.log('Unable to connect to weather service!');
    }else if(response.body.error){
        console.log('Unable to find location');
        
    }else {
        const {temperature,precipProbability:prob} = response.body.currently;
        const  data  = response.body.daily.data[0].summary;
        console.log(data + ` It is currently ${temperature} degress out. There is a ${prob} chance of rain`);
   }
   
})

//Geocoding  - other api to get a location
//Adress -> Lat/ling -> Wheader


const urlLL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/brazil.json?access_token=pk.eyJ1IjoicmphcmRpbSIsImEiOiJjazBnenBtdW4wZDMwM2NyNGt5bzRvbzVtIn0.kXKHJCApxMFZaLbzWoT_sg';
request({url:urlLL, json:true}, (error, response) => {
    if(error){
        console.log('Unable to connect to location services');
    }else if(response.body.features.length === 0){
        console.log('Impossible find the location, try another search');
    }else{
        const latidude = response.body.features[0].center[1];//latidudeitude
        const longitude = response.body.features[1].center[1];//longitudeitude
        console.log('latidude ' + latidude + ' longitude '+longitude);
    }
       
})
