export function fetchWeather(city) {
    const apiKey = '1d05715f85aa25a75f149917e53482cf';

    
    const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(weatherApiUrl)
        .then(response => response.json())
        .then(data => {
            displayWeather(data);
            displayWeatherIcon(data); // Appel à la fonction pour afficher l'icône météo
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

function displayWeatherIcon(data) {
    const weatherIcon = document.getElementById('weatherIcon');
    const weatherCode = data.weather[0].icon;
    const iconUrl = `http://openweathermap.org/img/w/${weatherCode}.png`;
    const img = document.createElement('img');
    img.src = iconUrl;
    weatherIcon.innerHTML = ''; // Efface tout contenu précédent
    weatherIcon.appendChild(img);
}

function saveCity(city) {
    localStorage.setItem('lastCity', city);
}
