(()=>{"use strict";const e="http://api.openweathermap.org/",n="4e892c19e0b10a90b88b86a8fcfb060e";function t(t){const a=`${e}data/2.5/forecast?q=${t}&appid=${n}`;fetch(`${e}data/2.5/weather?q=${t}&appid=${n}`).then((e=>e.json())).then((e=>{!function(e){const n=document.getElementById("temp-div"),t=document.getElementById("humidity-div"),a=document.getElementById("wind-div"),o=document.getElementById("weather-info"),r=document.getElementById("weather-icon"),i=document.getElementById("hourly-forecast");if(o.innerHTML="",i.innerHTML="",n.innerHTML="",t.innerHTML="",a.innerHTML="","404"===e.cod)o.innerHTML=`<p>${e.message}</p>`;else{const i=e.name,c=Math.round(e.main.temp-273.15),s=e.main.humidity,d=(3600*e.wind.speed/1e3).toFixed(1),m=e.weather[0].description,l=`https://openweathermap.org/img/wn/${e.weather[0].icon}@4x.png`,p=`\n            <p>${c}°C</p>\n        `,h=`\n            <p>Humidity: ${s}%</p>\n        `,g=`\n            <p>Wind: ${d}Km/h</p>\n        `,u=`\n            <p>${i}</p>\n            <p>${m}</p>\n        `;n.innerHTML=p,t.innerHTML=h,a.innerHTML=g,o.innerHTML=u,r.src=l,r.alt=m,document.getElementById("weather-icon").style.display="block"}}(e)})).catch((e=>{console.error("Error fetching current weather data:",e),alert("Error fetching current weather data. Please try again.")})),fetch(a).then((e=>e.json())).then((e=>{!function(e){const n=document.getElementById("hourly-forecast");e.slice(0,8).forEach((e=>{const t=new Date(1e3*e.dt).getHours(),a=Math.round(e.main.temp-273.15),o=`\n            <div class="hourly-item">\n                <span>${t}:00</span>\n                <img src="https://openweathermap.org/img/wn/${e.weather[0].icon}.png" alt="Hourly Weather Icon">\n                <span>${a}°C</span>\n            </div>\n        `;n.innerHTML+=o}))}(e.list),function(e){const n=document.getElementById("days-forecast"),t=e;t.forEach((e=>{const a=new Date(e.dt_txt),o=a.getDate(),r=a.getHours(),i=Math.round(e.main.temp-273.15),c=`\n            <div class="days-item">\n                <span>${o}</span>\n                <span>${r}:00</span>\n                <img src="https://openweathermap.org/img/wn/${e.weather[0].icon}.png" alt="Daily Weather Icon">\n                <span>${i}°C</span>\n            </div>\n        `;n.innerHTML+=c,console.log(t)}))}(e.list)})).catch((e=>{console.error("Error fetching hourly forecast data:",e),alert("Error fetching hourly forecast data. Please try again.")}))}document.getElementById("search-btn").addEventListener("click",(()=>{const e=document.getElementById("city").value;e?t(e):alert("Please enter a city")})),document.getElementById("location-btn").addEventListener("click",(async()=>{t(await async function(){const t=await new Promise(((e,n)=>{navigator.geolocation.getCurrentPosition(e,n)})),{latitude:a,longitude:o}=t.coords,r=`${e}geo/1.0/reverse?lat=${a}&lon=${o}&limit=1&appid=${n}`;return await fetch(r).then((e=>e.json())).then((e=>e[0].name.toLowerCase().toString()))}())}))})();