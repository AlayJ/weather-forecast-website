const path = require('path')
const express = require('express')
const hbs = require('hbs')

const mapCode = require('./utils/mapCode.js')
const forecast = require('./utils/forecast.js')

const app = express()

//express config paths
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../pages/views')
const partialspath = path.join(__dirname, '../pages/partials')

//Setup handlebars engine and location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialspath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather Forecast',
        name: 'Alay J'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About us',
        name: 'Alay J'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Alay J'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must enter an address'
        })
    }

    mapCode(req.query.address, (error, { latitude, longitude, locationName } = {}) => {
        if (error) {
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, forecastResponse) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                forecast: forecastResponse,
                location: locationName,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must enter a search term'
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        error: 'Help not found',
        title: '404',
        name: 'Alay J'
    })
})
app.get('*', (req, res) => {
    res.render('404', {
        error: '404 Page not found',
        title: '404',
        name: 'Alay J'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})