export function displayWeather(data) {
    // Afficher les données météorologiques dans l'interface utilisateur
}

export function displayWeatherIcon(iconUrl) {
    // Afficher l'icône météorologique dans l'interface utilisateur
}

export function displayPhoto(photoUrl) {
    if (photoUrl) {
        document.body.style.backgroundImage = `url(${photoUrl})`;
    } else {
        // Affiche un message d'erreur à l'utilisateur
        console.error('Impossible de récupérer la photo.');
    }
}
