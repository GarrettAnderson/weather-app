var cityName
var cityLat
var cityLong
var cityData
var cityNameForStorage // variable to store cityName forecast string to call local storage
var forecastDataForStorageObj
var currentWeatherDataObj
var forcastWeatherDataObj
var dataFromLocalStorage //this is current weather data from local storage
var forecastDataForStorage // this is the array for forecast data from local storage
var weatherForcastDisplay = $("#forecast-weather")
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
    var cityCoords = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}`
    fetch(cityCoords)
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
      .catch(function (error) {
        alert(error);
      });
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
        weatherForecastDisplayed()
      })
}

// add city name to the list below the search bar
// add current city data to the UI
// set the current city and data to local storage

// add a city button to list after search button is clicked
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
                <button class="list-of-cities-btn">${dataFromLocalStorage[i].city}</button>
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

    //  add city object to local storage
    localStorage.setItem(cityName, JSON.stringify(currentWeatherDataObj))
    
    currentCityName.text(cityName)
    currentDate.text("(" + currentCityDate + ")")
    currentWeatherIcon.attr("src", currentWeatherIconImg)

    currentTemp.text(cityData.current.temp + "℉")
    currentWind.text(cityData.current.wind_speed + "MPH")
    currentHumidity.text(cityData.current.humidity + "%")

}   

function weatherForecastDisplayed() {
    weatherForcastDisplay.empty()
    forecastDataForStorage = []
    // iterate through the first 5 forcast pieces of data
    for(var i = 1; i < 6; i++) {
        var forecastDailyDate = dayjs.unix(cityData.daily[i].dt).format("MM/DD/YYYY")
        console.log(forecastDailyDate)

        var forecastWeatherIconImg = `http://openweathermap.org/img/wn/${cityData.daily[i].weather[0].icon}.png`
        // create an object for each forecast date and add to forecastDataForStorage array

        forecastDataForStorageObj = {
            city: cityName,
            date: forecastDailyDate,
            weatherIcon: forecastWeatherIconImg,
            temp: cityData.daily[i].temp.day  + "℉",
            wind: cityData.daily[i].wind_speed + "MPH",
            humidity: cityData.daily[i].humidity + "%"
        }

        forecastDataForStorage.push(forecastDataForStorageObj)
        console.log(forecastDataForStorage)

        var singleForecastData = `
        <article class="card col-12 col-md-3 col-lg-3 forecast-card">
            <h4>${forecastDailyDate}</h4>
            <img class="forcast-weather-icon" src="${forecastWeatherIconImg}">
            <p>Temp: <span class="forcast-temp">${cityData.daily[i].temp.day}℉</span></p>
            <p>Wind: <span class="forcast-wind">${cityData.daily[i].wind_speed}MPH</span></p>
            <p>Humidity: <span class="forcast-humidity">${cityData.daily[i].humidity}%</span></p>
        </article>
        ` 
        weatherForcastDisplay.append(singleForecastData)
    }

    // add array of forecast data to local storage
    cityNameForStorage = cityName + "forecast"
    localStorage.setItem(cityNameForStorage, JSON.stringify(forecastDataForStorage))
}

// get info from local storage and store in a variable as array
// then call function that appends the list of city names
function getCityListFromLocalStorage() {
    dataFromLocalStorage = []
    for(var i = 0; i < localStorage.length; i++) {
        // exclude the key that includes forecast
        console.log(localStorage.key(i))
        if (!localStorage.key(i).includes("forecast")) {
            dataFromLocalStorage.push(JSON.parse(localStorage.getItem(localStorage.key(i))))
        }
    }

    console.log(dataFromLocalStorage)
    currentCityListFromStorage()    
}

// get forecast data array from local storage and print to UI
function getForecastDataFromLocalStorage(city) {
    weatherForcastDisplay.empty()
    console.log(city)
    var cityNameForecastFromStorage = city + "forecast"
    var forecastDataFromLocalStorage = JSON.parse(localStorage.getItem(cityNameForecastFromStorage))
    console.log(cityNameForecastFromStorage)
    console.log(forecastDataFromLocalStorage)

    // show current weather data from storage
    var showCurrentDataFromStorage = JSON.parse(localStorage.getItem(city))
    console.log(showCurrentDataFromStorage)

    currentCityName.text(showCurrentDataFromStorage.city)
    currentDate.text("(" + showCurrentDataFromStorage.date + ")")
    currentWeatherIcon.attr("src", showCurrentDataFromStorage.weatherIcon)

    currentTemp.text(showCurrentDataFromStorage.temp)
    currentWind.text(showCurrentDataFromStorage.wind)
    currentHumidity.text(showCurrentDataFromStorage.humidity)

    // show the forecast data from local storage
    for(var i = 0; i < forecastDataFromLocalStorage.length; i++) {
        var singleForecastDataFromStorage = `
        <article class="card col-12 col-md-3 col-lg-3">
            <h4>${forecastDataFromLocalStorage[i].date}</h4>
            <img class="forcast-weather-icon" src="${forecastDataFromLocalStorage[i].weatherIcon}">
            <p>Temp: <span class="forcast-temp">${forecastDataFromLocalStorage[i].temp}</span></p>
            <p>Wind: <span class="forcast-wind">${forecastDataFromLocalStorage[i].wind}</span></p>
            <p>Humidity: <span class="forcast-humidity">${forecastDataFromLocalStorage[i].humidity}</span></p>
        </article>
        ` 
        weatherForcastDisplay.append(singleForecastDataFromStorage)
    }
}


getCityListFromLocalStorage()
// when city button is clicked, get city data from local storage current and forecast
console.log(listOfCities)

// create a for loop to iterate the array of list of citties that were searched to apply a click event to each city button

listOfCities.on('click', function(e) {
    if (e.target.classList.contains('list-of-cities-btn')) {
        console.log(e.target.innerHTML)
        var cityNameFromStorage = e.target.innerHTML
        getForecastDataFromLocalStorage(cityNameFromStorage)
    }
})
// when search button is clicked, get add city to list and get current and forecast weather data
searchCityBtn.on('click', getCityCoords)


// NOTES for edge cases
// conditional statement on search button to pull data from local storage if searched city is already in local storage
// update the search text to have a capitalized first letter