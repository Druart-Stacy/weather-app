// weather.js
export function fetchWeather(city) {
  const apiKey = '61658e0f6a55b135fb312c5229d16fc5';
    const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(weatherApiUrl)
        .then(response => response.json())
        .then(data => {
            displayWeather(data);
            saveCity(city);
        })
        .catch(error => console.error('Error fetching weather data:', error));
}

function displayWeather(data) {
    const weatherResults = document.getElementById('weatherResults');
    weatherResults.innerHTML = `
        <h2>${data.name}</h2>
        <p>Température: ${data.main.temp}°C</p>
        <p>Météo: ${data.weather[0].description}</p>
    `;
}

function saveCity(city) {
    localStorage.setItem('lastCity', city);
}
