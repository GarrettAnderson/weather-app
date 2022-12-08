var cityName
var cityLat
var cityLong
var cityData
var listOfCities = $("#list-of-cities")
var searchCityInput = $("#search-for-city")
var searchCityBtn = $("#search-city-button")
var apiKey = "189a38ae6bf0bf147aa5670c0b4b70d5"
var cityCoords = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}`
var cityWeather = `https://api.openweathermap.org/data/2.5/forecast?lat=${cityLat}&lon=${cityLong}&appid=${apiKey}`



// when city is searched for with the input, get the geo location of that city
    // make a fetch call to the api for the specific city
    // the lat and long of the city
    // save the lat and long in variables

// given the saved lat and long, make a fetch call to the api with the lat and long
    

// when search button is clicked, save city name in variable
    // make api call with city name on cityCoords variable
    // get the lat and long coords of city in a variable

function getCityCoords() {
    // set a catch statement for error handling
    // set conditional to handle when search button is clicked if there is no input city

    cityName = searchCityInput.val()
    console.log(cityName)
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}`)
      .then(function (response) {
        console.log(response)
        return response.json()
      })
      .then(function (data) {
        console.log(data)

        // save the city lat and long to variables
        cityLat = data.city.coord.lat
        cityLong = data.city.coord.lon

        getCityWeather()
      })
}

function getCityWeather() {
    // fetch weather data with lat and long variables
    fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${cityLat}&lon=${cityLong}&exclude=minutely,hourly,alerts&appid=${apiKey}&units=imperial`)
      .then(function (response) {
        console.log(response)
        return response.json()
      })
      .then(function (data) {
        // console.log(data)
        
        cityData = data
        console.log(cityData)
        currentCityList()
      })
}

// add city name to the list below the search bar
// add current city data to the UI
// set the current city and data to local storage

function currentCityList() {
    var citiesListDisplay = `
    <li>
        <button>${cityName}</button>
    </li>
    ` 
    listOfCities.append(citiesListDisplay)
}

function currentCityDataDisplay() {

}

// when city button is clicked, get city data from local storage

searchCityBtn.on('click', getCityCoords)