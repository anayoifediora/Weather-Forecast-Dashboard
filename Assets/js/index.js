var currentCity = document.querySelector('.current-city');
var currentTemperature = document.querySelector('.current-temp');
var currentWindSpeed = document.querySelector('.current-wind');
var currentHumidity = document.querySelector('.current-humidity');
var weatherImage = document.querySelector('.weather-icon');
var weatherImageDescription = document.querySelector('.description');
var currentDate = document.querySelector('.date');
var form = document.querySelector('form');
var formInputEl = document.querySelector('.form-control');

// currentDate.textContent = dayjs().format('DD/MM/YYYY');


function getCurrentWeather() {

var requestUrl = 'https://api.openweathermap.org/data/2.5/weather?q=Adelaide&units=metric&appid=443ce9d7f610c028f54310f3c2bc25fd'

    fetch(requestUrl)
    .then(function (response) {
    return response.json();
    })
    .then(function (data) {
    console.log(data);
    currentCity.textContent = data.name;
    weatherImageDescription.textContent = data.weather[0].description;
    currentTemperature.textContent = "Temperature: " + data.main.temp + " Celsius";
    currentWindSpeed.textContent = "Wind Speed: " + data.wind.speed;
    currentHumidity.textContent = "Humidity: " + data.main.humidity;
    weatherImage.setAttribute("src", 'https://openweathermap.org/img/w/' + data.weather[0].icon + '.png');
    }
    );

}

function formSubmitHandler(event) {
    event.preventDefault();
    var searchName = formInputEl.value.trim();
    
    if (searchName) {
        getCurrentWeather();
    } else {
        alert('Please enter a city name');
    }

};
form.addEventListener('submit', formSubmitHandler)
    
    