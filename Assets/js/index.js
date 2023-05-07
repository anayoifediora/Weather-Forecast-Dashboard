var currentCity = document.querySelector('.current-city');
var currentTemperature = document.querySelector('.current-temp');
var currentWindSpeed = document.querySelector('.current-wind');
var currentHumidity = document.querySelector('.current-humidity');
var weatherImage = document.querySelector('.weather-icon');





function getCurrentWeather() {

var requestUrl = 'https://api.openweathermap.org/data/2.5/weather?q=Beijing&units=metric&appid=443ce9d7f610c028f54310f3c2bc25fd'

    fetch(requestUrl)
    .then(function (response) {
    return response.json();
    })
    .then(function (data) {
    console.log(data);
    currentCity.textContent = data.name;
    currentTemperature.textContent = "Temperature: " + data.main.temp + " Celsius";
    currentWindSpeed.textContent = "Wind Speed: " + data.wind.speed;
    currentHumidity.textContent = "Humidity: " + data.main.humidity;
    weatherImage.setAttribute("src", 'https://openweathermap.org/img/w/' + data.weather[0].icon + '.png');
    }
    );

}

getCurrentWeather()

    
    