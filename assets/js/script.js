var cityName
var cityLat
var cityLong
var cityData
var currentWeatherDataObj
var forcastWeatherDataObj
var dataFromLocalStorage
var weatherForcastDisplay = $("#forcast-weather")
var currentCityName = $("#current-city")
var currentDate = $("#current-date")
var currentWeatherIcon = $("#weather-icon")
var currentTemp = $("#current-temp")
var currentWind = $("#current-wind")
var currentHumidity = $("#current-humidity")
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
        currentCityDataDisplay()
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

// list out the cities from local storage to the cities list
function currentCityListFromStorage() {
    for(var i = 0; i < dataFromLocalStorage.length; i++) {
        var citiesListDisplayFromStorage = `
            <li>
                <button>${dataFromLocalStorage[i].city}</button>
            </li>
            ` 
        listOfCities.append(citiesListDisplayFromStorage)
    }
}

function currentCityDataDisplay() {
    console.log(cityData.current.dt)
    var currentCityDate = dayjs.unix(cityData.current.dt).format("MM/DD/YYYY")
    console.log(currentCityDate)

    var currentWeatherIconImgSlug = cityData.current.weather[0].icon
    var currentWeatherIconImg = `http://openweathermap.org/img/wn/${currentWeatherIconImgSlug}@2x.png`
    console.log(currentWeatherIconImg)
    
    // current weather object to add to local storage
    currentWeatherDataObj = {
        city: cityName,
        date: currentCityDate,
        weatherIcon: currentWeatherIconImg,
        temp: cityData.current.temp  + "℉",
        wind: cityData.current.wind_speed + "MPH",
        humidity: cityData.current.humidity + "%"
    }

    //  add to local storage
    localStorage.setItem(cityName, JSON.stringify(currentWeatherDataObj))
    
    currentCityName.text(cityName)
    currentDate.text("(" + currentCityDate + ")")
    currentWeatherIcon.attr("src", currentWeatherIconImg)

    currentTemp.text(cityData.current.temp + "℉")
    currentWind.text(cityData.current.wind_speed + "MPH")
    currentHumidity.text(cityData.current.humidity + "%")

}   

function weatherForcastDisplayed() {

    var singleForcastData = `
    <article class="card col-12 col-md-3 col-lg-3">
        <h4>9/14/2022</h4>
        <span class="forcast-weather-icon">☀️</span>
        <p>Temp: <span class="forcast-temp">63.55F</span></p>
        <p>Wind: <span class="forcast-wind">8.43 MPH</span></p>
        <p>Humidity: <span class="forcast-humidity">44%</span></p>
    </article>
    `

    weatherForcastDisplay.append(singleForcastData)
}

// get info from local storage and store in a variable as array
// then call function that appends the list of city names
function getCurrentDataFromLocalStorage() {
    dataFromLocalStorage = []
    for(var i = 0; i < localStorage.length; i++) {
        dataFromLocalStorage.push(JSON.parse(localStorage.getItem(localStorage.key(i))))
    }
    // if (dataFromLocalStorage) {
    //     dataFromLocalStorage = JSON.parse(dataFromLocalStorage)
    // } else {
    //     dataFromLocalStorage = []
    // }
    console.log(dataFromLocalStorage)
    // return dataFromLocalStorage
    currentCityListFromStorage()    
}

getCurrentDataFromLocalStorage()
// when city button is clicked, get city data from local storage

// when search button is clicked, get add city to list and get current and forecast weather data
searchCityBtn.on('click', getCityCoords)