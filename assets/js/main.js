// main.js
import { getLocation } from './geolocation.js';
import { fetchWeather } from './weather.js';
import { displayPhoto } from './unsplash.js';
import { renderChart } from './chart.js';

document.getElementById('weatherForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const city = document.getElementById('cityInput').value;
    fetchWeather(city);
    displayPhoto(city);
    // Appeler d'autres fonctionnalités si nécessaire
});

document.getElementById('toggle-dark-mode').addEventListener('click', toggleDarkMode);

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const icon = document.getElementById('toggle-dark-mode');
    if (document.body.classList.contains('dark-mode')) {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    } else {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }
}
