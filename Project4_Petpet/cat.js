document.getElementById('generateCat').addEventListener('click', generateCat);

function generateCat() {
    const catUrl = "https://api.thecatapi.com/v1/images/search";

    fetch(catUrl)
        .then(response => response.json())
        .then(data => {
            const catData = data[0];
            displayCat(catData);
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
            displayAttribute('catName', `Name: ${name}`);
            displayAttribute('catGender', `Gender: ${gender}`);
            displayAttribute('catLocation', `Location: ${city},${state},${country}`)
            // Here, we simply set a static song as there is no "random song API" available for our use.
            displayAttribute('catSong', `Favorite Song: Imagine`);
        })
        .catch(error => {
            console.error('Error in the API chain:', error);
        });
}

function displayCat(catData) {
    const img = document.createElement('img');
    img.src = catData.url;
    img.alt = "Cute Cat";
    img.style.maxWidth = "300px";
    img.style.maxHeight = "300px";

    const catContainer = document.getElementById('catContainer');
    catContainer.innerHTML = ''; // Clear previous content
    catContainer.appendChild(img);
}

function displayAttribute(id, text) {
    const element = document.getElementById(id);
    if (!element) {
        console.warn('Attempted to display attribute in non-existent element:', id);
        return;
    }
    element.textContent = text;
}
