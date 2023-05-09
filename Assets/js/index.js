var currentCity = document.querySelector('.current-city');
var currentTemperature = document.querySelector('.current-temp');
var currentWindSpeed = document.querySelector('.current-wind');
var currentHumidity = document.querySelector('.current-humidity');
var weatherImage = document.querySelector('.weather-icon');
var weatherImageDescription = document.querySelector('.description');
var currentDate = document.querySelector('.date');
var form = document.querySelector('form');
var formInputEl = document.querySelector('.form-control');

// Dom elements for the 5-day forecast
var forecastDate = document.querySelector('.card-title')
var nameOfCity = document.querySelector('.card-subtitle');
var forecastIcon = document.querySelector('.forecast-icon');
var forecastDescription = document.querySelector('.forecast-description');
var forecastTemperature = document.querySelector('.temperature');
var forecastWindSpeed = document.querySelector('.wind');
var forecastHumidity = document.querySelector('.humidity');

// currentDate.textContent = dayjs().format('DD/MM/YYYY');

let cityName = formInputEl.value.trim();

function getCurrentWeather(cityName) {

let requestUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&units=metric&appid=443ce9d7f610c028f54310f3c2bc25fd'

    fetch(requestUrl)
    .then(function (response) {
    return response.json();
    })
    .then(function (data) {
    // console.log(data);
    currentCity.textContent = data.name;
    weatherImageDescription.textContent = data.weather[0].description;
    currentTemperature.textContent = "Temperature: " + Math.floor(data.main.temp) + " °C";
    currentWindSpeed.textContent = "Wind Speed: " + data.wind.speed;
    currentHumidity.textContent = "Humidity: " + data.main.humidity + "%";
    weatherImage.setAttribute("src", 'https://openweathermap.org/img/w/' + data.weather[0].icon + '.png');
    }
    );

    let forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + cityName + '&units=metric&appid=443ce9d7f610c028f54310f3c2bc25fd'

    fetch(forecastUrl)
    .then(function (response) {
    return response.json();
    })
    .then(function (data) {
    console.log(data);

        forecastDate.textContent = data.list[7].dt_txt;
        nameOfCity.textContent = cityName;
        forecastIcon.setAttribute('src', 'https://openweathermap.org/img/w/' + data.list[7].weather[0].icon + '.png');
        forecastDescription.textContent = data.list[7].weather[0].description;
        forecastTemperature.textContent = "Temperature: " + Math.floor(data.list[7].main.temp) + " °C";
        forecastWindSpeed.textContent = "Wind Speed: " + data.list[7].wind.speed;
        forecastHumidity.textContent = "Humidity: " + data.list[7].main.humidity + "%";

    }
    );
}









    


function formSubmitHandler(event) {
    event.preventDefault();
    let cityName = formInputEl.value.trim();
    
    if (cityName) {
        getCurrentWeather(cityName);
    } else {
        alert('Please enter a city name');
    }

};


form.addEventListener('submit', formSubmitHandler)
    
    