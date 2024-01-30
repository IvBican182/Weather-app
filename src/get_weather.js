import { displayWeather, displayDaysForecast, displayHourlyForecast } from "./display_weather";

export function getCurrentLocationWeather() {
    const apiKey = '4e892c19e0b10a90b88b86a8fcfb060e';
    
    //fetching current user location
    navigator.geolocation.getCurrentPosition(
        position => {
            const { latitude, longitude } = position.coords;
            const REVERSE_GEOCODING_URL = `http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${apiKey}`;
            fetch(REVERSE_GEOCODING_URL)
                .then(response => response.json())
                .then(data => {
                    const currentLocation = data[0].name; //retrieving current location name 
                    const currentLow = currentLocation.toLowerCase();
                    console.log(currentLow.toString());
                    const cityName = currentLow.toString();
                    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`; //passing location name to URL
                    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}`;
                    
                    fetch(currentWeatherUrl)
                        .then(response => response.json())
                        .then(data => {
                            displayWeather(data);
                        })
                    .catch(error => {
                        console.error('Error fetching current weather data:', error);
                        alert('Error fetching current weather data. Please try again.');
                    });
              
                    fetch(forecastUrl)
                        .then(response => response.json())
                        .then(data => {
                            displayHourlyForecast(data.list);
                            displayDaysForecast(data.list)
                        })
                    .catch(error => {
                        console.error('Error fetching hourly forecast data:', error);
                        alert('Error fetching hourly forecast data. Please try again.');
                    });
                    
                    
                })
                .catch(error => {
                    console.error('Error fetching current weather data:', error);
                    alert('Error fetching current weather data. Please try again.');
                });
  
            
        },
        error => {
            if(error.code === error.PERMISSION_DENIED) {
                alert("Geolocation request denied!");
            }
        }
    )
}

//fetching url from openWeather
export function getWeather () {
    const city = document.getElementById("city").value; 
    
    if (!city) {
        alert('Please enter a city');
        return
    }
    
    //storing our key
    const apiKey2 = '4e892c19e0b10a90b88b86a8fcfb060e';
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey2}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey2}`;


    fetch(currentWeatherUrl)
        .then(response => response.json())
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            console.error('Error fetching current weather data:', error);
            alert('Error fetching current weather data. Please try again.');
        });
  
    fetch(forecastUrl)
        .then(response => response.json())
        .then(data => {
            displayHourlyForecast(data.list);
            displayDaysForecast(data.list)
        })
        .catch(error => {
            console.error('Error fetching hourly forecast data:', error);
            alert('Error fetching hourly forecast data. Please try again.');
        });
    


}


