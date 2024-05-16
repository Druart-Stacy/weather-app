export async function getCityPhoto(city, accessKey) {
    try {
        const unsplashApiUrl = `https://api.unsplash.com/photos/random?query=${city}&client_id=${accessKey}`;
        const response = await fetch(unsplashApiUrl);
        const data = await response.json();
        return data.urls.regular;
    } catch (error) {
        // console.error('Error fetching photo:', error);
        return null; // Retourne null en cas d'erreur
    }
}
