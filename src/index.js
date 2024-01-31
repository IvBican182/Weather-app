import { getLocationWeather, getCurrentCity } from "./get_weather";

const searchBtn = document.getElementById("search-btn"); 
searchBtn.addEventListener("click", () => {
    const city = document.getElementById("city").value; //getting the value from user input
    
    if (!city) {
        alert('Please enter a city');
        return
    }
    getLocationWeather(city); //calling the weather function based from city name from users input
});

const locationBtn = document.getElementById("location-btn"); 
locationBtn.addEventListener("click",  async () => {
    const currentLocation = await getCurrentCity(); //making the city variable from function equal to currentLocation variable / ready to use for getting weather
    getLocationWeather(currentLocation); //calling the weather function based on users current location
});


