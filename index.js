const apiKey = "b9c487b55eac5301c537253b1ac353d5";

const weatherDataEl = document.getElementById("weather-data");

const inputFieldEl = document.getElementById("input");

const formEl = document.querySelector("form");

formEl.addEventListener("submit", (Event) =>{
    Event.preventDefault();
    const inputValue = inputFieldEl.value;
    console.log(inputValue);

    getWeatherData(inputValue);
})

 async function getWeatherData(inputValue) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${apiKey}&units=metric`);

        if(!response.ok){
            throw new Error ("Network is unavailable");
        }

        const data = await response.json();
        const temperature = Math.round(data.main.temp);
        const description = data.weather[0].description;
        const icon = data.weather[0].icon;

        const details = [
            `feels like:${Math.round(data.main.feels_like)}`,
            `humidity:${data.main.temp}%`,
            `wind-speed: ${data.wind.speed} m/s`
        ];

        weatherDataEl.querySelector(".icon").innerHTML =
        `<img src="http://openweathermap.org/img/wn/${icon}.png">`;

        weatherDataEl.querySelector(".temp").textContent =
        `${temperature}°C`;

        weatherDataEl.querySelector(".description").textContent =
        `${description}`;

        weatherDataEl.querySelector(".details").innerHTML = details. map((details) => `<div>${details}</div>`).join("");

    } catch (error) {
        weatherDataEl.querySelector(".icon").innerHTML = "";

        weatherDataEl.querySelector(".temp").textContent = "";

        weatherDataEl.querySelector(".description").textContent = "An error occurred, try Again";

        weatherDataEl.querySelector(".details").innerHTML = "";

    }
}

