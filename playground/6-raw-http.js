const https = require('https');

const url = 'https://api.darksky.net/forecast/3ac0493ee917a88450e9bd57b5cd44af/40,-75'

const request = https.request(url, (response) => {

    let data = ''
    
    response.on('data', (chunk) =>{
        data = data + chunk.toString()        
    }) // because the data comes in parts

    response.on('end', () => {
       const body = JSON.parse(data)
       console.log(body);
    })
})

request.on('error', (error) => {
    console.log(error);
    
})
request.end()