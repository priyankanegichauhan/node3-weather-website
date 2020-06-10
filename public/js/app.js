const weatherForm =  document.querySelector('form')
const searchText = document.querySelector('input')
const messageOne = document.querySelector('#message1')
const messageTwo = document.querySelector('#message2')

weatherForm.addEventListener('submit', (e) =>{
    e.preventDefault()
    const location = searchText.value

    messageOne.textContent = "loading..."
    messageTwo.textContent = ""

    fetch('/weather?address=' + location).then((response) => {
    response.json().then((data) => {
        if(data.error){
            messageOne.textContent = data.error
            messageTwo.textContent = ""
        }else{
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast 
        }
    })
})

})


// const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Boston.json?access_token=pk.eyJ1IjoicHJpeWFua2FuZWdpIiwiYSI6ImNrYjdlb3NlbDA0eXoyeHF6dW1manVqYm8ifQ.nSOQKPGccewizUpGOAi74w&limit=1';

// fetch(url).then((response) => {
//     response.json().then((data) =>{
//         const latitude = data.features[0].center[1]
//         const longitude= data.features[0].center[0]
//         console.log('latitude: ' + data.features[0].center[1])
//         console.log('longitude: '  + data.features[0].center[0])
//         console.log('location: ' + data.features[0].place_name)

//         const forecastUrl = 'http://api.weatherstack.com/forecast?access_key=c1fc839bb74945e1cdea3ae7514faba5&query='+ latitude+' ,'+ longitude + '&units=f';

//         fetch(forecastUrl).then((forecastResponse) => {
//             forecastResponse.json().then((forecastData) => {
//                 console.log(forecastData.current.weather_descriptions[0] + '. It is currently ' + forecastData.current.temperature + ' degrees out. It feels like ' + forecastData.current.feelslike + ' degrees out.')
                
//             })
//         })


//     })
// })