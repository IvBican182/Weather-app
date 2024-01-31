import { getLocationWeather, getCurrentCity } from "./get_weather";

const searchBtn = document.getElementById("search-btn");
searchBtn.addEventListener("click", () => {
    const city = document.getElementById("city").value; 
    
    if (!city) {
        alert('Please enter a city');
        return
    }
    getLocationWeather(city);
});

const locationBtn = document.getElementById("location-btn");
locationBtn.addEventListener("click",  async () => {
    const currentLocation = await getCurrentCity();
    getLocationWeather(currentLocation);
});


