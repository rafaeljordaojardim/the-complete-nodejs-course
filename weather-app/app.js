const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const location = process.argv[2];

if (!location) {
    return console.log('Please provide the address');
    
}
geocode(location, (error, {latitude, longitude, location}) => {
    if (error) {
      return console.log('Error', error);
    }
    forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
            return console.log('Error', error)
        }
            console.log('Data', forecastData)
            console.log('Location ', location);
    })
});