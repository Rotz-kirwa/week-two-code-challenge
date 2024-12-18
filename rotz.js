// DOM element bindings
const form = document.getElementById('shopping-form');
const itemInput = document.getElementById('item-input');
const shoppingList = document.getElementById('shopping-list');
const clearListButton = document.getElementById('clear-list');

// Initialize the shopping list array
let items = JSON.parse(localStorage.getItem('shoppingList')) || [];

// Function to render the shopping list
function renderList() {
    shoppingList.innerHTML = ''; // Clear existing items
    items.forEach((item, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = item.name;
        listItem.className = item.purchased ? 'purchased' : '';

        // Add purchased toggle button
        const toggleButton = document.createElement('button');
        toggleButton.textContent = item.purchased ? 'Undo' : 'Done';
        toggleButton.addEventListener('click', () => {
            item.purchased = !item.purchased;
            saveAndRender();
        });

        // Add delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'X';
        deleteButton.addEventListener('click', () => {
            items.splice(index, 1);
            saveAndRender();
        });

        listItem.appendChild(toggleButton);
        listItem.appendChild(deleteButton);
        shoppingList.appendChild(listItem);
    });
}

// Save the list to local storage and re-render
function saveAndRender() {
    localStorage.setItem('shoppingList', JSON.stringify(items));
    renderList();
}

// Add a new item
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const itemName = itemInput.value.trim();
    if (!itemName) return;

    items.push({ name: itemName, purchased: false });
    itemInput.value = '';
    saveAndRender();
});

// Clear the entire list
clearListButton.addEventListener('click', () => {
    items = [];
    saveAndRender();
});

// Initial render
renderList();
