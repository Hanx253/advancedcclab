document.getElementById('generateDog').addEventListener('click', generateDog);

function generateDog() {
    const dogUrl = "https://api.thedogapi.com/v1/images/search";
    const headers = {
        'x-api-key': 'live_hTrEglHGATxJ9kKjoC1FgKNayO16UicPv72MF6XgY2c7Kj17tlXgeODVxfOW2I0L' // Your actual API key
    };

    fetch(dogUrl, { headers })
        .then(response => response.json())
        .then(data => {
            const dogData = data[0].url;  // Adjusted to handle the structure provided by The Dog API
            displayDog(dogData);
            return fetch('https://api.randomuser.me/');
        })
        .then(response => response.json())
        .then(data => {
            const user = data.results[0];
            const name = user.name.first;
            const gender = user.gender;
            const city = user.location.city;
            const state = user.location.state;
            const country = user.location.country;
            displayAttribute('dogName', `Name: ${name}`);
            displayAttribute('dogGender', `Gender: ${gender}`);
            displayAttribute('dogLocation', `Location: ${city}, ${state}, ${country}`)
            displayAttribute('dogSong', `Favorite Song: Imagine`);
        })
        .catch(error => {
            console.error('Error in the API chain:', error);
        });
}

function displayDog(dogUrl) {
    const img = document.createElement('img');
    img.src = dogUrl;
    img.alt = "Cute Dog";
    img.style.maxWidth = "300px";
    img.style.maxHeight = "300px";

    const dogContainer = document.getElementById('dogContainer');
    dogContainer.innerHTML = ''; // Clear previous content
    dogContainer.appendChild(img);
}

function displayAttribute(id, text) {
    const element = document.getElementById(id);
    if (!element) {
        console.warn('Attempted to display attribute in non-existent element:', id);
        return;
    }
    element.textContent = text;
}
