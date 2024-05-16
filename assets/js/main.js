import { fetchWeatherData, getWeatherIconUrl } from './weather.js';
import { displayWeather, displayWeatherIcon, displayPhoto } from './ui.js';
import { renderChart } from './chart.js';
import { getCityPhoto } from './unsplash.js';

const cityForm = document.getElementById('city-form');
const cityInput = document.getElementById('city-input');
const addcitybutton=document.getElementById('add-city-button');
cityForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const city = cityInput.value.trim();
    const city2= addcitybutton.value.trim();
    if (city) {
        try {
            const weatherData = await fetchWeatherData(city, '1d05715f85aa25a75f149917e53482cf');
            displayWeather(weatherData);
            displayWeatherIcon(getWeatherIconUrl(weatherData.weather[0].icon));
            await getCityPhoto(city, 'T4dPSXMnbr7qtsaqFg8-UPnjpOBrVW06QvjK1O2ndws');
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    }
});
