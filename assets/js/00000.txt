import creation from 'creation.js/auto';

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
