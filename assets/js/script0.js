// Création des éléments
const mainContent = document.createElement('main');
const form = document.createElement('form');
const weather = document.createElement('h1');
const demo = document.createElement('p');
const label = document.createElement('label');
const input = document.createElement('input');
const buttonVal = document.createElement('button');
const content = document.createElement('div');
const buttonDark=document.createElement('button');
//button=buttonDark

// Attribution des identifiants
form.id = 'myForm';
demo.id = 'demo';
input.id = 'cityInput';
weather.id = 'méteo';

// Ajout de contenu aux éléments
weather.textContent = 'weather report';
label.textContent = 'Ville: ';
buttonVal.value = 'Obtenir la météo';
buttonDark.value='Dark mode';

buttonVal.textContent='Obtenir la méteo';
buttonDark.textContent='Dark mode';
// Ajout d'écouteur d'événement
buttonVal.addEventListener('click', getLocation);
buttonDark.addEventListener('click',ModeDark);

const weatherIcons = {
  'soleil': '/assets/icon meteo/',
  'nuageux': 'chemin/vers/icones/nuageux.png',
  'pluie': 'chemin/vers/icones/pluie.png',
  // Ajoutez d'autres conditions météorologiques et leurs icônes correspondantes ici
};


// Construction de la structure du DOM
form.appendChild(label);
form.appendChild(input);
form.appendChild(buttonVal);
mainContent.appendChild(weather);
mainContent.appendChild(form);
content.appendChild(mainContent);
mainContent.appendChild(buttonDark);
document.body.appendChild(content);

//---------------------------------------------dark mode-----------------------------------------
// Dark Mode
function ModeDark() {
  var element = document.body;
  element.classList.toggle("dark-mode");
}


//----------------------------------------------stockage local-------------------------------------
localStorage.setItem(cityName);



//---------------------------------------------localisation--------------------------------------------
// Fonction pour obtenir la géolocalisation
function getLocation() {
    const demo = document.getElementById("demo");

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        demo.innerHTML = "La géolocalisation n'est pas supportée par ce navigateur.";
    }
}

// Fonction pour afficher la position
function getCityLocation(cityName) {
  // Remplacez 'YOUR_API_KEY' par votre clé API OpenWeatherMap
  const apiKey = '61658e0f6a55b135fb312c5229d16fc5';
  const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;

  fetch(weatherApiUrl)
      .then(response => {
          if (!response.ok) {
              throw new Error('réponse non correct');
          }
          return response.json();
      })
      .then(data => {
          const coordinates = data.coord;
          const latitude = coordinates.lat;
          const longitude = coordinates.lon;
          console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
          // Vous pouvez utiliser les coordonnées ici ou les passer à une autre fonction
      })
      .catch(error => {
          console.error('There was a problem with your fetch operation:', error);
      });
    }



