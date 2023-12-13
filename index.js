const searchButton = document.getElementById("search-button");
const searchCountry = document.getElementById("search-country");
const weatherDataContainer = document.getElementById("weather-data");
const cityNameElement = weatherDataContainer.querySelector("#city-name");
const currentTempElement = weatherDataContainer.querySelector("#current-temp");
const weatherDescElement = weatherDataContainer.querySelector("#weather-desc");
const weatherIconElement = weatherDataContainer.querySelector("#weather-icon");
const forecastListElement = weatherDataContainer.querySelector("#forecast-list");
const feelsLikeElement = weatherDataContainer.querySelector("#feels-like");
const humidityElement = weatherDataContainer.querySelector("#humidity");
const windSpeedElement = weatherDataContainer.querySelector("#wind-speed");

function getWeatherData(city) {
  const url = `https://api.openweathermap.org/data/3.0/onecall?q=${city}&appid=3d8d86731b8c3cac8b066ac1087a0bd4&units=metric`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      // Update city name
      cityNameElement.innerText = data.city.name;

      // Update current temperature and description
      currentTempElement.innerText = `${Math.round(data.current.temp)}°C`;
      weatherDescElement.innerText = data.current.weather[0].main;

      // Update weather icon based on current condition
      weatherIconElement.classList.remove("sunny", "cloudy", "rainy", "stormy");
      if (data.current.weather[0].main.includes("Sun")) {
        weatherIconElement.classList.add("sunny");
      } else if (data.current.weather[0].main.includes("Cloud")) {
        weatherIconElement.classList.add("cloudy");
      } else if (data.current.weather[0].main.includes("Rain")) {
        weatherIconElement.classList.add("rainy");
      } else if (data.current.weather[0].main.includes("Storm")) {
        weatherIconElement.classList.add("stormy");
      }

      // Clear previous forecast data
      forecastListElement.innerHTML = "";

      // Update forecast for next 3 days
      for (let i = 1; i <= 3; i++) {
        const day = data.daily[i];
        const dayElement = document.createElement("li");
        dayElement.innerText = `${day.dt_txt.slice(0, 10)}: ${Math.round(day.temp.day)}°C, ${day.weather[0].main}`;
        forecastListElement.appendChild(dayElement);
      }

      // Update additional information
      feelsLikeElement.innerText = `${Math.round(data.current.feels_like)}°C`;
      humidityElement.innerText = `${data.current.humidity}%`;
      windSpeedElement.innerText = `${data.current.wind_speed} m/s`;
    })
    .catch((error) => {
      console.error(error);
      weatherDataContainer.innerHTML = "<p>27c</p>";
	  weatherDataContainer.innerHTML = "<p>28c</p>";
    });
}

searchButton.addEventListener("click", () => {
  const city = searchCountry.value.trim();
  if (!city) return;
  getWeatherData(city);
});
