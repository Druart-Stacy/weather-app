import React, { useState, useEffect } from 'react';
import Weather from './Weather.jsx';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [photoUrl, setPhotoUrl] = useState(null);

  useEffect(() => {
    const lastCity = localStorage.getItem('lastCity');
    if (lastCity) {
      fetchWeather(lastCity);
      fetchCityPhoto(lastCity);
    }
  }, []);

  const fetchWeather = async (city) => {
    const apiKey = '1d05715f85aa25a75f149917e53482cf';
    const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
      const response = await fetch(apiURL);
      const data = await response.json();
      setWeatherData(data);
      localStorage.setItem('lastCity', city);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  const fetchCityPhoto = async (city) => {
    const accessKey = 'T4dPSXMnbr7qtsaqFg8-UPnjpOBrVW06QvjK1O2ndws';
    const width = 600;
    const height = 400;
    const unsplashApiUrl = `https://api.unsplash.com/search/photos?query=${city}&client_id=${accessKey}&per_page=1`;

    try {
      const response = await fetch(unsplashApiUrl);
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        const photoUrl = data.results[0].urls.raw;
        setPhotoUrl(`${photoUrl}&w=${width}&h=${height}&fit=crop`);
      } else {
        setPhotoUrl(null);
      }
    } catch (error) {
      console.error('Error fetching photo:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city) {
      fetchWeather(city);
      fetchCityPhoto(city);
    }
  };

  return (
    <div className="App">
      <h1>Weather App</h1>
      <form id="weatherForm" onSubmit={handleSubmit}>
        <input
          type="text"
          id="cityInput"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
        />
        <button type="submit">Get Weather</button>
      </form>
      <Weather weatherData={weatherData} photoUrl={photoUrl} />
    </div>
  );
}

export default App;
