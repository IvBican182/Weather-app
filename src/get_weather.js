import { displayWeather, displayDaysForecast, displayHourlyForecast } from "./display_weather";

export const API_BASE_URL = 'http://api.openweathermap.org/';
export const apiKey = '4e892c19e0b10a90b88b86a8fcfb060e';



function getPosition() {
    return new Promise((res, rej) => {
        navigator.geolocation.getCurrentPosition(res, rej);
    });
}

export async function getCurrentCity()
{
    const position = await getPosition();
    const { latitude, longitude } = position.coords;
    const REVERSE_GEOCODING_URL = `${API_BASE_URL}geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${apiKey}`;
    const city = 
        await fetch(REVERSE_GEOCODING_URL)
            .then(response => response.json())
            .then(data => {
                const currentLocation = data[0].name; //retrieving current location name 
                const currentLow = currentLocation.toLowerCase();
                const cityName = currentLow.toString();

                return cityName;
            });

    return city;
}

export function getLocationWeather(cityName)
{
    const currentWeatherUrl = `${API_BASE_URL}data/2.5/weather?q=${cityName}&appid=${apiKey}`; //passing location name to URL
    const forecastUrl = `${API_BASE_URL}data/2.5/forecast?q=${cityName}&appid=${apiKey}`;
    
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




