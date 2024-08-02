import React from 'react';

function Weather({ weatherData, photoUrl }) {
  if (!weatherData) {
    return <p>No weather data available. Please enter a city.</p>;
  }

  const { name, weather, main } = weatherData;
  const iconUrl = `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;

  return (
    <div id="weather-container">
      <h2>Weather in {name}</h2>
      <p>{weather[0].description}, Temperature: {main.temp}°C</p>
      <img src={iconUrl} alt="Weather icon" />
      {photoUrl && <img src={photoUrl} alt="City view" />}
    
    
    <h2>Weather in {name}</h2>
    <p>{weather[0].description}, Temperature: {main.temp}°C</p>
    <img src={iconUrl} alt="Weather icon" />
    
  </div>
  );
}

export default Weather;
