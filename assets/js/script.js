// Définition des éléments HTML
const cityForm = document.getElementById('weatherForm');
const cityInput = document.getElementById('city-input');

// Déclaration de l'access key pour Unsplash
const accessKey = 'T4dPSXMnbr7qtsaqFg8-UPnjpOBrVW06QvjK1O2ndws';

// Fonction pour récupérer la photo d'une ville
async function getCityPhoto(city) {
    try {
        const unsplashApiUrl = `https://api.unsplash.com/photos/random?query=${city}&client_id=${accessKey}`;
        const response = await fetch(unsplashApiUrl);
        const data = await response.json();
        return data.urls.regular;
    } catch (error) {
        console.error('Error fetching photo:', error);
        return null; // Retourne null en cas d'erreur
    }
}

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
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    }
});

// Fonction pour récupérer les informations météorologiques
async function fetchWeather(city) {
    const apiKey = '61658e0f6a55b135fb312c5229d16fc5'; // Assurez-vous de remplacer 'YOUR_API_KEY' par votre propre clé API OpenWeatherMap
    const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(apiURL);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        throw error;
    }
}

// Sauvegarde de la ville dans le stockage local
function saveCity(city) {
    try {
        localStorage.setItem('lastCity', city);
        console.log('Ville enregistrée avec succès:', city);
    } catch (error) {
        console.error('Erreur lors de l\'enregistrement de la ville:', error);
    }
}

// Assurez-vous que fetchWeather("yurigahama") est appelé correctement
fetchWeather("yurigahama").then(weatherData => {
    displayWeather(weatherData);
    displayWeatherIcon(getWeatherIconUrl(weatherData.weather[0].icon));
}).catch(error => {
    console.error('Error fetching weather data:', error);
});

// Remarque: Les fonctions `displayWeather`, `displayWeatherIcon`, `displayPhoto`, et `getWeatherIconUrl` doivent être définies ailleurs dans votre code.
