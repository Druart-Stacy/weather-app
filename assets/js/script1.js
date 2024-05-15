// Export des modules
export { createElements, ModeDark, getLocation, getCityLocation };

// Module pour la création des éléments DOM
function createElements() {
    const mainContent = document.createElement('main');
    const form = document.createElement('form');
    const weather = document.createElement('h1');
    const demo = document.createElement('p');
    const label = document.createElement('label');
    const input = document.createElement('input');
    const buttonVal = document.createElement('button');
    const content = document.createElement('div');
    const buttonDark = document.createElement('button');

    // Attribution des identifiants
    form.id = 'myForm';
    demo.id = 'demo';
    input.id = 'cityInput';
    weather.id = 'weather'; 

    // Ajout de contenu aux éléments
    weather.textContent = 'Weather report';
    label.textContent = 'Ville: ';
    buttonVal.textContent = 'Obtenir la météo';
    buttonDark.textContent = 'Dark mode';

    // Ajout d'écouteur d'événement
    buttonVal.addEventListener('click', getLocation);
    buttonDark.addEventListener('click', ModeDark);

    // Construction de la structure du DOM
    form.appendChild(label);
    form.appendChild(input);
    form.appendChild(buttonVal);
    mainContent.appendChild(weather);
    mainContent.appendChild(form);
    content.appendChild(mainContent);
    content.appendChild(buttonDark);
    document.body.appendChild(content);
};

// Module pour le mode sombre
function ModeDark() {
    const element = document.body;
    element.classList.toggle("dark-mode");
};

// Module pour obtenir la géolocalisation
function getLocation() {
    const demo = document.getElementById("demo");

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        demo.innerHTML = "La géolocalisation n'est pas supportée par ce navigateur.";
    }
};

// Fonction pour afficher la position
function showPosition(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
    getCityLocation(latitude, longitude);
};

function showError(error) {
    const demo = document.getElementById("demo");
    switch(error.code) {
        case error.PERMISSION_DENIED:
            demo.innerHTML = "L'utilisateur a refusé la demande de géolocalisation.";
            break;
        case error.POSITION_UNAVAILABLE:
            demo.innerHTML = "Les informations de géolocalisation ne sont pas disponibles.";
            break;
        case error.TIMEOUT:
            demo.innerHTML = "La demande de géolocalisation a expiré.";
            break;
        case error.UNKNOWN_ERROR:
            demo.innerHTML = "Une erreur inconnue s'est produite.";
            break;
    }
};

// Fonction pour obtenir la météo en fonction des coordonnées géographiques
function getCityLocation(latitude, longitude) {
    const apiKey = 'YOUR_API_KEY'; 
    const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

    fetch(weatherApiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Réponse incorrecte');
            }
            return response.json();
        })
        .then(data => {
            const currentWeatherDescription = data.weather[0].description;
            const weatherIconPath = weatherIcons[currentWeatherDescription.toLowerCase()];
            const weatherIconElement = document.getElementById('weatherIcon');
            if (weatherIconElement) {
                weatherIconElement.src = weatherIconPath || 'default-icon.png';
            }
        })
        .catch(error => {
            console.error('Il y a eu un problème avec votre opération de fetch :', error);
        });
};

// Structure de correspondance entre les conditions météorologiques et les icônes
const weatherIcons = {
    'clear sky': 'assets/sun.png',
    'few clouds': 'assets/clouds.png',
    'scattered clouds': 'assets/clouds.png',
    // Ajoutez d'autres correspondances ici...
};

// Appel des fonctions d'initialisation
createElements();
