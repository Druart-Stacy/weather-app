const apiKey = '61658e0f6a55b135fb312c5229d16fc5'; // Votre clé API OpenWeatherMap

        // Créer le bouton pour basculer le mode sombre
        const icon = document.createElement("i");
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

        // Fonction pour obtenir la météo de la ville
        function getWeather(city) {
            // Requête à l'API OpenWeatherMap
            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    // Affichage des données météorologiques dans le DOM
                    const weatherInfo = document.getElementById('weather-info');
                    weatherInfo.innerHTML = `
                        <p>City: ${data.name}</p>
                        <p>Temperature: ${data.main.temp} °C</p>
                        <p>Weather: ${data.weather[0].description}</p>
                    `;
                })
                .catch(error => {
                    console.error('Error fetching weather data:', error);
                });
        }

        // Exemple d'utilisation de la fonction pour obtenir les données météorologiques de Paris
        getWeather('Paris');

        // Fonction pour obtenir la position de l'utilisateur
        function getLocation() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(showPosition, showError);
            } else {
                document.getElementById("demo").innerHTML = "Geolocation is not supported by this browser.";
            }
        }

        // Fonction pour afficher la position
        function showPosition(position) {
            document.getElementById("demo").innerHTML = "Latitude: " + position.coords.latitude + "<br>Longitude: " + position.coords.longitude;
        }

        // Fonction pour afficher les erreurs de géolocalisation
        function showError(error) {
            let errorMessage = '';
            switch (error.code) {
                case error.PERMISSION_DENIED:
                    errorMessage = "User denied the request for Geolocation.";
                    break;
                case error.POSITION_UNAVAILABLE:
                    errorMessage = "Location information is unavailable.";
                    break;
                case error.TIMEOUT:
                    errorMessage = "The request to get user location timed out.";
                    break;
                case error.UNKNOWN_ERROR:
                    errorMessage = "An unknown error occurred.";
                    break;
            }
            document.getElementById("demo").innerHTML = "Error: " + errorMessage;
        }

        // Appeler la fonction pour obtenir la position de l'utilisateur
        getLocation();