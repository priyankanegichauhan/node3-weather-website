const path = require('path')
const express = require('express')
const hbs =require('hbs')
const geocode = require('./utils/geocode.js')
const forecast =require('./utils/forecast.js') 

const app = express();

//Define path for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index',{
        title:'Weather',
        name:'Priyanka'
    })
}) 


app.get('/help',(req, res) => {
    res.render('help', {
        title: 'Help',
        message:'This is help page',
        name: 'Priyanka'
    })
})

app.get('/about', (req, res) =>{
    res.render('about',{
        title:'About Me',
        name:'Priyanka Negi'
    })
})

app.get('/weather', (req, res) =>{
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude,location} = {}) => {

        if (error){
            console.log('Error: ', error);
            return res.send({
                error
            })
            
        }
        forecast(latitude, longitude, (error, result) => {
            if (error){            
                console.log('Error: ', error);
                return res.send({
                    error
                })
            }
            res.send({
                address: req.query.address,
                forecast: result,
                location
            });
          })
    })

    
})

app.get('/products', (req, res) => {
    if (!req.query.search){
        return res.send(
            {
                error: 'You must provide search term'
            }
        )
    }
    console.log(req.query)
    res.send({
        products:[]
    })
})

app.get('/help/*', (req, res) =>{
    res.render('404',{
       message: 'Help article not found',
       name: 'Priyanka',
       title: '404'
    }) 
})

app.get('*', (req, res) =>{
    res.render('404', {
        message:'Page not found',
        name: 'Priyanka',
        title: '404'
    }) 
})

app.listen(3000, () => {
    console.log('Server is up and running on port 3000.')
})