const request = require('request')

const forecast = (latitude, longitude, callback) => {
    if(!latitude || !longitude) callback('Informe a latitude e a longitude', undefined);
    else {
        const url = 'https://api.darksky.net/forecast/3ac0493ee917a88450e9bd57b5cd44af/'+latitude+','+longitude
        request({url, json:true}, (error, {body}) => {
            if(error){
                callback('Unable to connect to weather service', undefined);
            }else if(body.error){
                callback('Unable to find location ', undefined);
            }else{
                const {temperature, precipProbability, summary} = body.currently;
                callback(undefined, {
                    temperature,
                    probality:precipProbability,
                    summary,
                })
            }
        })//request
    }//else

}

module.exports = forecast;