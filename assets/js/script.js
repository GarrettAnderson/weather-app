var cityName
var cityLat
var cityLong
var searchCityInput = $("#search-for-city")
var apiKey = "189a38ae6bf0bf147aa5670c0b4b70d5"
var cityCoords = `api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}`
var cityWeather = `api.openweathermap.org/data/2.5/forecast?lat=${cityLat}&lon=${cityLong}&appid=${apiKey}`

// when city is searched for with the input, get the geo location of that city
    // make a fetch call to the api for the specific city
    // the lat and long of the city
    // save the lat and long in variables

// given the saved lat and long, make a fetch call to the api with the lat and long
    

// when search button is clicked, save city name in variable
    // make api call with city name on cityCoords variable
    // get the lat and long coords of city in a variable