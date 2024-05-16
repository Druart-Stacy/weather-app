// unsplash.js
export function displayPhoto(city) {
    const accessKey = 'T4dPSXMnbr7qtsaqFg8-UPnjpOBrVW06QvjK1O2ndws'; //  clé d'accès
    const unsplashApiUrl = `https://api.unsplash.com/photos/random?query=${city}&client_id=${accessKey}`;

    fetch(unsplashApiUrl)
        .then(response => response.json())
        .then(data => {
            document.body.style.backgroundImage = `url(${data.urls.regular})`;
        })
        .catch(error => console.error('Error fetching photo:', error));
}
