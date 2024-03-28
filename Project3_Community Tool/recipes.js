// Expanded recipes database
const recipes = [
    {
        name: "Chinese Zucchini Pancakes",
        link: "https://omnivorescookbook.com/chinese-zucchini-pancakes/",
        ingredients: ["zucchini", "eggs", "flour", "green onion"],
        description: "Chinese zucchini pancakes are also called Hu Ta Zi in Chinese. It’s a type of Northern Chinese comfort food that is especially popular in Beijing. The pancakes are made with grated zucchini, flour and eggs, seasoned lightly and cooked until perfection. The pancakes themselves are quite mild, so you can enjoy the freshness of the zucchini."
    },
    {
        name: "Authentic Hot and Sour Soup",
        link: "https://omnivorescookbook.com/recipes/authentic-hot-and-sour-soup",
        ingredients: ["shiitake mushrooms", "woodear mushrooms", "lily flowers", "pork loin", "chicken breast", "green onions", "eggs","firm tofu"],
        description: "The hearty, spicy, sour broth is loaded with mushrooms, silky eggs, and tofu."
    },
    {
        name: "Sesame Beef",
        link: "https://omnivorescookbook.com/sesame-beef/",
        ingredients: ["beef", "garlic"],
        description: "This homemade sesame beef gives you juicy and tender results."
    }, 
    {
        name: "Yu Choy Stir Fry",
        link: "https://omnivorescookbook.com/yu-choy-stir-fry/",
        ingredients: ["Yu choy", "Garlic", "flour", "green onion", "sesame oil", "Chinkiang vinegar", "light soy sauce"],
        description: "Chinese greens, such as yu choy, gai lan, water spinach and baby bok choy are perfect vegetables for making side dishes. They taste great and are quick to cook, so you don’t need a ton of seasoning to make a great tasting dish that is full of vitamins and minerals."
    },
    {
        name: "Char Siu",
        link: "https://omnivorescookbook.com/char-siu",
        ingredients: ["pork tenderloin", "pork loin", "molasses", "garlic", "five spice powder", "maltose", "honey"],
        description: "Hailing from Guangdong province in the south of China, char siu or barbecued pork is one of the darlings of dim sum, firmly in the catalog of Cantonese cuisine. It is a lean cut of barbecued pork, given a deep red color and shiny coating from the glaze. And it’s famously sweet. However, simply calling it sweet does not convey the complex flavors that result from the long marinating process."
    },
    {
        name: "Yu Xiang Eggplant",
        link: "https://omnivorescookbook.com/sichuan-eggplant/",
        ingredients: ["eggplant", "ground pork", "ground chicken", "green onion", "garlic", "ginger", "Chinese chili peppers","Sichuan peppercorn"],
        description: "The eggplant is grilled until crispy and smoky, and then cooked in a rich savory garlic sauce. This vegan dish is very satisfying, both as a side or a main dish served over rice or noodles."
    },
    {
        name: "Soy Sauce Fried Rice",
        link: "https://omnivorescookbook.com/soy-sauce-fried-rice",
        ingredients: ["rice", "butter", "eggs", "green onion", "ham", "rotisserie chicken", "roast beef","cooked shrimp","peppers","onions","veggies","green peas","corn","carrots"],
        description: "Soy sauce fried rice is a classic. It is not just another fried rice. It’s a signature of Chinese cooking, as it uses pretty minimal ingredients to create a wonderful flavor."
    },
    {
        name: "Sichuan Dry Fried Green Beans",
        link: "https://omnivorescookbook.com/szechuan-dry-fried-green-beans/",
        ingredients: [" green beans", "ground pork", "ginger", "garlic", "chili pepper", "peppercorns"],
        description: "Sichuan dry fried green beans, or Gan Bian Si Ji Dou, is a famous traditional Sichuan dish. The fresh green beans are roasted in a pan until blistered and beautifully charred, then tossed with ground pork, pickled mustard greens, ginger, garlic, chili peppers, Sichuan peppercorns, soy sauce, and wine for a rich and fragrant taste. "
    },
    {
        name: "Chinese Fried Cabbage",
        link: "https://omnivorescookbook.com/fried-cabbage/",
        ingredients: ["Sichuan peppercorns", "chili peppers", "cabbage"],
        description: "Infuse the oil with aromatics and then toss at a high heat, this adds a smoky flavor to the sweet fried cabbage to make a quick and delicious side dish."    
    },
    {
        name: "Cantonese Broccoli with Oyster Sauce",
        link: "https://omnivorescookbook.com/broccoli-with-oyster-sauce",
        ingredients: ["broccoli"],
        description: "Instead of adding plenty of fresh herbs, such as ginger and garlic, Cantonese style poached veggies are served with a simple drizzle of oyster sauce."
    },
    {
        name: "Napa Cabbage Stir Fry with Vinegar Sauce",
        link: "https://omnivorescookbook.com/napa-cabbage-stir-fry-vinegar-sauce/",
        ingredients: ["cabbage","chili peppers","ginger","garlic","green onions"],
        description: "The hot and sour napa cabbage is a Northern Chinese classic. This recipe only uses the white part of the napa cabbage to create a crunchy crispy texture. It combines dried chili pepper, garlic, and a mixture of Chinkiang vinegar, soy sauce, and sugar to make a fragrant hot and sour sauce that is lightly sweet. The contrast of spicy tartness with a little sweetness makes this simple stir fry a treat for the taste buds and makes you crave more."
    },
];

document.getElementById('search-btn').addEventListener('click', function() {
    const searchInput = document.getElementById('search-input').value.toLowerCase();
    const filteredRecipes = recipes.filter(recipe => recipe.ingredients.some(ingredient => ingredient.includes(searchInput)));
    displayRecipes(filteredRecipes);
});

function displayRecipes(recipes) {
    const recipesDiv = document.getElementById('recipes');
    recipesDiv.innerHTML = ''; // Clear any previous results
    // Only display the container if there are recipes to show
    recipesDiv.style.display = recipes.length > 0 ? 'block' : 'none';

    recipes.forEach(recipe => {
        // Create a new div for each recipe
        const recipeElement = document.createElement('div');
        // Set the inner HTML of the div to include the recipe name as a clickable link
        recipeElement.innerHTML = `
            <h3><a href="${recipe.link}" target="_blank" rel="noopener noreferrer">${recipe.name}</a></h3>
            <p>${recipe.description}</p>
        `;
        // Append the new div to the recipes container
        recipesDiv.appendChild(recipeElement);
    });
}


// Hide recipes initially
document.getElementById('recipes').style.display = 'none';

// Show recipes div only after search
document.getElementById('search-btn').addEventListener('click', function() {
    document.getElementById('recipes').style.display = 'block';
});
