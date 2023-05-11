// DOM query to obtain all required elements

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
var forecastContainer = document.querySelector('.forecast-container');
var currentWeatherContainer = document.querySelector('.current-weather');

//Displays current date in current weather container
currentDate.textContent = dayjs().format('YYYY-MM-DD');

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
                        
                        // Sets the data to local storage
                        currentWeatherData = {
                            city: data.name,
                            description: data.weather[0].description,
                            Temperature: Math.floor(data.main.temp),
                            windspeed: data.wind.speed,
                            humidity: data.main.humidity,
                            image: data.weather[0].icon,
                        }
                        localStorage.setItem('currentWeatherData', JSON.stringify(currentWeatherData));
                
                
                }
                );
            
            let forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + cityName + '&units=metric&appid=443ce9d7f610c028f54310f3c2bc25fd'

            fetch(forecastUrl)
            .then(function (response) {
            return response.json();
            })
            .then(function (forecastData) {
            console.log(forecastData);

                    // Dom elements for the 5-day forecast
                    
                        var forecastDate = document.querySelectorAll('.card-title')
                        var nameOfCity = document.querySelectorAll('.card-subtitle');
                        var forecastIcon = document.querySelectorAll('.forecast-icon');
                        var forecastDescription = document.querySelectorAll('.forecast-description');
                        var forecastTemperature = document.querySelectorAll('.temperature');
                        var forecastWindSpeed = document.querySelectorAll('.wind');
                        var forecastHumidity = document.querySelectorAll('.humidity');

                        // Create a new array with 5-day forecast data for a specific time of the day
                        foreCastArray = [forecastData.list[7], forecastData.list[15], forecastData.list[23], forecastData.list[31], forecastData.list[39]]

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
            currentWeatherContainer.setAttribute('style', 'display:block;');
            forecastContainer.setAttribute('style', 'display: block;')
}
// Displays a button for any city that's searched.
function displayWeatherInfo(cityName) {
    let cityButton = document.createElement('button');
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




    