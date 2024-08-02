// Définition des éléments HTML
const cityForm = document.getElementById('weatherForm');
const cityInput = document.getElementById('cityInput');

// Déclaration de l'access key pour Unsplash
const accessKey = 'T4dPSXMnbr7qtsaqFg8-UPnjpOBrVW06QvjK1O2ndws';

// Fonction pour récupérer la photo d'une ville
async function getCityPhoto(city) {
    const width = 600; // Largeur souhaitée
    const height = 400; // Hauteur souhaitée

    try {
        const unsplashApiUrl = `https://api.unsplash.com/search/photos?query=${city}&client_id=${accessKey}&per_page=1`;
        const response = await fetch(unsplashApiUrl);
        const data = await response.json();
        if (data.results && data.results.length > 0) {
            const photoUrl = data.results[0].urls.raw; // Utilisation de l'URL 'raw' pour transformation
            return `${photoUrl}&w=${width}&h=${height}&fit=crop`;
        } else {
            return null; // Aucun résultat trouvé
        }
    } catch (error) {
        console.log('Error fetching photo:', error);
        return null; // Retourne null en cas d'erreur
    }
    function displayPhoto(photoUrl) {
        if (photoUrl) {
            const weatherContainer = document.getElementById('weather-container');
            weatherContainer.innerHTML = ''; 
            // Vide le conteneur avant d'ajouter une nouvelle image
    
            const img = document.createElement('img');
            img.src = photoUrl;
            img.alt = 'Photo de la ville';
    
            weatherContainer.appendChild(img);
        }
    }
    
}

// async function getCityPhoto(city) {
//     const width = 100; 
//     const height=100;
//     try {
//         const unsplashApiUrl = `https://api.unsplash.com/search/photos?query=${city}&client_id=${accessKey}&per_page=1`;
//         const response = await fetch(unsplashApiUrl);
//         const data = await response.json();
//         if (data.results && data.results.length > 0) {
//             return data.results[0].urls.regular;
//         } else {
//             return null; // Aucun résultat trouvé
//         }
//     } catch (error) {
//         console.log('Error fetching photo:', error);
//         return null; // Retourne null en cas d'erreur
//     }
// }


// Événement pour soumettre le formulaire de la ville
cityForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const city = cityInput.value.trim();
    if (city) {
        try {
            const weatherData = await fetchWeather(city);
            displayWeather(weatherData);
            displayWeatherIcon(getWeatherIconUrl(weatherData.weather[0].icon));
            const photoUrl = await getCityPhoto(city);
            displayPhoto(photoUrl);
            saveCity(city);
        } catch (error) {
            console.log('Error fetching weather data:', error);
        }
    }
});

// Fonction pour récupérer les informations météorologiques
async function fetchWeather(city) {
    const apiKey = '1d05715f85aa25a75f149917e53482cf';
    const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(apiURL);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log('Error fetching weather data:', error);
        throw error;
    }
}

// Sauvegarde de la ville dans le stockage local
function saveCity(city) {
    try {
        localStorage.setItem('lastCity', city);
        console.log('Ville enregistrée avec succès:', city);
    } catch (error) {
        console.log('Erreur lors de l\'enregistrement de la ville:', error);
    }
}

// Assurez-vous que fetchWeather("yurigahama") est appelé correctement
fetchWeather("yurigahama").then(weatherData => {
    displayWeather(weatherData);
    displayWeatherIcon(getWeatherIconUrl(weatherData.weather[0].icon));
}).catch(error => {
    console.log('Error fetching weather data:', error);
});

// Déclaration des fonctions manquantes (à adapter selon vos besoins)
function displayWeather(weatherData) {
    const weatherContainer = document.getElementById('weather-container');
    weatherContainer.textContent = `Météo à ${weatherData.name}: ${weatherData.weather[0].description}, Température: ${weatherData.main.temp}°C`;
}

function displayWeatherIcon(iconUrl) {
    const weatherContainer = document.getElementById('weather-container');
    const img = document.createElement('img');
    img.src = iconUrl;
    weatherContainer.appendChild(img);
}

function displayPhoto(photoUrl) {
    if (photoUrl) {
        const weatherContainer = document.getElementById('weather-container');
        const img = document.createElement('img');
        img.src = photoUrl;
        weatherContainer.appendChild(img);
    }
}

function getWeatherIconUrl(icon) {
    return `http://openweathermap.org/img/wn/${icon}@2x.png`;
}
