var currentCity = document.querySelector('.current-city');
var currentTemperature = document.querySelector('.current-temp');
var currentWindSpeed = document.querySelector('.current-wind');
var currentHumidity = document.querySelector('.current-humidity');
var weatherImage = document.querySelector('.weather-icon');
var weatherImageDescription = document.querySelector('.description');
var currentDate = document.querySelector('.date');
var form = document.querySelector('form');
var formInputEl = document.querySelector('.form-control');
var cityListDiv = document.querySelector('.d-grid');


// currentDate.textContent = dayjs().format('DD/MM/YYYY');

let cityName = formInputEl.value.trim();

function getCurrentWeather(cityName) {

let requestUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&units=metric&appid=443ce9d7f610c028f54310f3c2bc25fd'

    fetch(requestUrl)
    .then(function (response) {
    return response.json();
    })
        .then(function (data) {
        console.log(data);
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

            // Dom elements for the 5-day forecast
            
                var forecastDate = document.querySelectorAll('.card-title')
                var nameOfCity = document.querySelectorAll('.card-subtitle');
                var forecastIcon = document.querySelectorAll('.forecast-icon');
                var forecastDescription = document.querySelectorAll('.forecast-description');
                var forecastTemperature = document.querySelectorAll('.temperature');
                var forecastWindSpeed = document.querySelectorAll('.wind');
                var forecastHumidity = document.querySelectorAll('.humidity');

                foreCastArray = [data.list[7], data.list[15], data.list[23], data.list[31], data.list[39]]

                    for (var i = 0; i < foreCastArray.length; i++) {
                               
                    forecastDate[i].textContent = foreCastArray[i].dt_txt;
                    // nameOfCity[i].textContent = cityName;
                    forecastIcon[i].setAttribute('src', 'https://openweathermap.org/img/w/' + foreCastArray[i].weather[0].icon + '.png');
                    forecastDescription[i].textContent = foreCastArray[i].weather[0].description;
                    forecastTemperature[i].textContent = "Temperature: " + Math.floor(foreCastArray[i].main.temp) + " °C";
                    forecastWindSpeed[i].textContent = "Wind Speed: " + foreCastArray[i].wind.speed;
                    forecastHumidity[i].textContent = "Humidity: " + foreCastArray[i].main.humidity + "%";
                }
        }
   
    );
    displayWeatherInfo(cityName);
}

function displayWeatherInfo(cityName) {
    var cityButton = document.createElement('button');
    cityButton.setAttribute('class', 'btn btn-primary');
    cityButton.textContent = cityName
    cityListDiv.appendChild(cityButton);

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
    
    