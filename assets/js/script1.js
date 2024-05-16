// Création des éléments
const mainContent = document.createElement('main');
const form = document.createElement('form');
const weather = document.createElement('h1');
const demo = document.createElement('p');
const label = document.createElement('label');
const input = document.createElement('input');
const buttonVal = document.createElement('button');
const content = document.createElement('div');
// const buttonDark=document.createElement('i');
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
// buttonDark.value='Dark mode';

buttonVal.textContent='Obtenir la méteo';
// buttonDark.textContent='Dark mode';
// Ajout d'écouteur d'événement
buttonVal.addEventListener('click', getLocation);
// buttonDark.addEventListener('click',ModeDark);

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
// mainContent.appendChild(buttonDark);
document.body.appendChild(content);

//---------------------------------------------dark mode-----------------------------------------
// Dark Mode
// Créer le bouton pour basculer le mode sombre
const icon = document.createElement("i");

// Ajouter la classe Font Awesome pour l'icône "lune" pour le mode sombre et "soleil" pour le mode clair
icon.classList.add("fas");
icon.classList.add("fa-sun"); // Par défaut, utilise l'icône de soleil pour le mode clair


// Ajouter un gestionnaire d'événement pour basculer le mode sombre
icon.addEventListener('click', function() {
  document.body.classList.toggle('dark-mode');
  if (document.body.classList.contains('dark-mode')) {
    icon.classList.remove("fa-sun");
    icon.classList.add("fa-moon"); // Change l'icône en lune pour le mode sombre
  } else {
    icon.classList.remove("fa-moon");
    icon.classList.add("fa-sun"); // Change l'icône en soleil pour le mode clair
  }
});

// Ajouter un style CSS pour rendre l'icône cliquable
icon.style.cursor = 'pointer';

// Ajouter un identifiant pour l'icône
icon.setAttribute("id", "toggle-dark-mode");

// Ajouter l'icône à la fin du body
document.body.appendChild(icon);
// function ModeDark() {
//     var element = document.body;
//     element.classList.toggle("dark-mode");
//   }
  
//   // Ajout d'un écouteur d'événement pour basculer le mode sombre/clair
//   icon.addEventListener('click', function() {
//       document.body.classList.toggle('dark-mode');
//       if (document.body.classList.contains('dark-mode')) {
//         icon.classList.remove("fa-sun");
//         icon.classList.add("fa-moon"); // Change l'icône en lune pour le mode sombre
//       } else {
//         icon.classList.remove("fa-moon");
//         icon.classList.add("fa-sun"); // Change l'icône en soleil pour le mode clair
//       }
//   });
  
//   icon.setAttribute("id", "toggle-dark-mode");

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



