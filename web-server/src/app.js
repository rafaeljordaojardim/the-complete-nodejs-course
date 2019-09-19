const path = require('path')
const express = require('express');
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()
const port = 3001
//Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');


// Setup handlebars enfine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath)

//SetUp static directory to serve
app.use(express.static(publicDirectoryPath))

//
app.get('', (req, res)=>{
    res.render('index', {
        title:'Weather App',
        name:'Rafael'
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title:'About me',
        name:'Rafael'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText:'Welcome to help page! Some help text!',
        title:'Help',
        name:'Rafael'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide the adress!'
        })
    }else{
        geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
            if(error){
                return res.send({error})
            }else {
                forecast(latitude, longitude, (error, {temperature, probality, summary} = {}) => {
                    if (error) {
                        return res.send({error})
                    }else {
                        return res.send({
                            location,
                            temperature,
                            probality,
                            summary
                        })
                    }
                })
            }
        })
    }
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error:'You must provide a search term'
        })
    }else {
        res.send({
            products:[]
        })
    }
})

app.get('/help/*', (req, res) => {//it will match with any /help/whatever
    res.render('404', {
        errorMessage:'Help article not found!',
        name:'Rafael',
        title:'404'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        errorMessage:'Page not found!',
        name:'Rafael',
        title:'404'
    })
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
})