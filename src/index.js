import { getWeather, getCurrentLocationWeather } from "./get_weather";

const searchBtn = document.getElementById("search-btn");
searchBtn.addEventListener("click", getWeather);

const locationBtn = document.getElementById("location-btn");
locationBtn.addEventListener("click",getCurrentLocationWeather);



console.log("test");
