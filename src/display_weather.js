
//displaying the wather
export function displayWeather(data) {
    const tempDivInfo = document.getElementById('temp-div');
    const humiDivInfo = document.getElementById('humidity-div');
    const windDivInfo = document.getElementById('wind-div');
    const weatherInfoDiv = document.getElementById('weather-info');
    const weatherIcon = document.getElementById('weather-icon');
    const hourlyForecastDiv = document.getElementById('hourly-forecast');

    // Clears previous content
    weatherInfoDiv.innerHTML = '';
    hourlyForecastDiv.innerHTML = '';
    tempDivInfo.innerHTML = '';

    if (data.cod === '404') {
        weatherInfoDiv.innerHTML = `<p>${data.message}</p>`;
    } else {
        const cityName = data.name;
        const temperature = Math.round(data.main.temp - 273.15); // Convert to Celsius
        const humidity = data.main.humidity;
        const wind = (data.wind.speed * (60*60)/1000).toFixed(1); // Converts to km/h
        const description = data.weather[0].description;
        const iconCode = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`; //loads current weather Icon 

        const temperatureHTML = `
            <p>${temperature}°C</p>
        `;
        
        const humidityHTML = `
            <p>Humidity: ${humidity}%</p>
        `;
        
        const windHTML = `
            <p>Wind: ${wind}Km/h</p>
        `;

        const weatherHtml = `
            <p>${cityName}</p>
            <p>${description}</p>
        `;

        tempDivInfo.innerHTML = temperatureHTML;
        humiDivInfo.innerHTML = humidityHTML;
        windDivInfo.innerHTML = windHTML;
        weatherInfoDiv.innerHTML = weatherHtml;
        weatherIcon.src = iconUrl;
        weatherIcon.alt = description;

        showImage();
    }
}

//displaying hourly forecast ,next 24hrs
export function displayHourlyForecast(hourlyData) {
    const hourlyForecastDiv = document.getElementById('hourly-forecast');
    
    const next24Hours = hourlyData.slice(0, 8); // Display the next 24 hours (3-hour intervals)

    next24Hours.forEach(item => {
        const dateTime = new Date(item.dt * 1000); // Convert timestamp to milliseconds
        const hour = dateTime.getHours();
        const temperature = Math.round(item.main.temp - 273.15); // Convert to Celsius
        const iconCode = item.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

        const hourlyItemHtml = `
            <div class="hourly-item">
                <span>${hour}:00</span>
                <img src="${iconUrl}" alt="Hourly Weather Icon">
                <span>${temperature}°C</span>
            </div>
        `;

        hourlyForecastDiv.innerHTML += hourlyItemHtml;
        
    });

    
}

// displaying forecast for next 5 days
export function displayDaysForecast (dailyData) {
    const dailyForecastDiv = document.getElementById('days-forecast');

    const uniqueForecastDays = dailyData;
    uniqueForecastDays.forEach(item => {
        const forecastDate = new Date(item.dt_txt);
        const day = forecastDate.getDate();
        const h = forecastDate.getHours();
        const temperature = Math.round(item.main.temp - 273.15); // Convert to Celsius
        const iconCode = item.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

        const dailyItemHtml = `
            <div class="days-item">
                <span>${day}</span>
                <span>${h}:00</span>
                <img src="${iconUrl}" alt="Daily Weather Icon">
                <span>${temperature}°C</span>
            </div>
        `;

        dailyForecastDiv.innerHTML += dailyItemHtml
        console.log(uniqueForecastDays);
     

    });
  
}

function showImage() {
    const weatherIcon = document.getElementById('weather-icon');
    weatherIcon.style.display = 'block'; // Make the image visible once it's loaded
}

