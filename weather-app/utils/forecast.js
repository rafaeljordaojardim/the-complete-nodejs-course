const request = require('request')

const forecast = (latitude, longitude, callback) => {
    if(!latitude || !longitude) callback('Informe a latitude e a longitude', undefined);
    else {
        const url = 'https://api.darksky.net/forecast/3ac0493ee917a88450e9bd57b5cd44af/'+latitude+','+longitude
        request({url, json:true}, (error, response) => {
            if(error){
                callback('Unable to connect with weather service', undefined);
            }else if(response.body.error){
                callback('Unable to get the temperature information ', undefined);
            }else{
                const {temperature, precipProbability, summary} = response.body.currently;
                callback(undefined, {
                    temperature,
                    probality:precipProbability,
                    summary
                })
            }
        })//request
    }//else

}

module.exports = forecast;