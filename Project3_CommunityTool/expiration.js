document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('add-item').addEventListener('click', addFoodItem);
    loadStoredItems();
});

function addFoodItem() {
    const foodType = document.getElementById('food-type').value;
    const foodItem = document.getElementById('food-item').value.trim(); // Use trim() to ensure whitespace is not considered valid input
    const userDefinedDate = document.getElementById('expiration-date').value;

    // Check if the food item input is empty
    if (!foodItem) {
        alert("Please enter a food item name.");
        return; // Exit the function
    }

    // For 'others', check if a date has been input
    if (foodType === 'others' && !userDefinedDate) {
        alert("Please enter an expiration date for 'Others' category.");
        return; // Exit the function
    }

    const expirationDate = calculateExpirationDate(foodType, userDefinedDate);
    if (!expirationDate) return; // Additional safety check, in case calculateExpirationDate is adjusted in the future

    const item = { foodType, foodItem, expirationDate, id: Date.now() };

    saveItem(item);
    loadStoredItems(); // Refresh the list to include the new item
}

function calculateExpirationDate(foodType, userDefinedDate) {
    let baseDate = userDefinedDate ? new Date(userDefinedDate) : new Date();
    switch (foodType) {
        case 'vegetable':
            baseDate.setDate(baseDate.getDate() + 5);
            break;
        case 'meat':
            baseDate.setDate(baseDate.getDate() + 4);
            break;
        case 'fruit':
            baseDate.setDate(baseDate.getDate() + 7);
            break;
        // If 'others', use the user-defined date directly
    }
    return baseDate.toISOString().split('T')[0];
}

function saveItem(item) {
    let items = JSON.parse(localStorage.getItem('expirationItems')) || [];
    items.push(item);
    localStorage.setItem('expirationItems', JSON.stringify(items));
}

function loadStoredItems() {
    let items = JSON.parse(localStorage.getItem('expirationItems')) || [];
    // Clear existing items
    document.getElementById('expiration-list').innerHTML = '';

    // Sort items: expired items last, items expiring within a day first
    items.sort((a, b) => {
        const today = new Date();
        const aDate = new Date(a.expirationDate);
        const bDate = new Date(b.expirationDate);
        const aDiff = (aDate - today) / (1000 * 60 * 60 * 24);
        const bDiff = (bDate - today) / (1000 * 60 * 60 * 24);

        if (aDiff < 1 && bDiff >= 1) return -1; // A expires within a day, B does not
        if (bDiff < 1 && aDiff >= 1) return 1; // B expires within a day, A does not
        return aDate - bDate; // Both expire within a day or both do not, sort by date
    });

    items.forEach(item => appendItemToList(item));
}

function appendItemToList(item) {
    const list = document.getElementById('expiration-list');
    const li = document.createElement('li');
    const today = new Date();
    const expiration = new Date(item.expirationDate);
    const daysUntilExpiration = (expiration - today) / (1000 * 60 * 60 * 24);

    li.textContent = `${item.foodItem} - Expires on: ${item.expirationDate}`;
    if (daysUntilExpiration < 0) {
        li.style.color = 'gray'; // Expired
    } else if (daysUntilExpiration < 1) {
        li.style.color = 'red'; // Expires within a day
    }

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => {
        deleteItem(item.id);
    });
    li.appendChild(deleteBtn);

    list.appendChild(li);
}

function deleteItem(itemId) {
    let items = JSON.parse(localStorage.getItem('expirationItems')) || [];
    items = items.filter(item => item.id !== itemId);
    localStorage.setItem('expirationItems', JSON.stringify(items));
    loadStoredItems(); // Refresh the list
}
