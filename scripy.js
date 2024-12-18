// DOM element bindings
const goodsInput = document.querySelector('#goods');
const priceInput = document.querySelector('#price');
const formHook = document.querySelector('form');
const rmvBtn = document.querySelector('.clear-items');
const itemsWrapper = document.querySelector('#myList');

// Array to hold items temporarily
let cartBucket = [];

// 
function showItems() {
    itemsWrapper.innerHTML = '';
    cartBucket.forEach((item, idx) => {
        const listItem = document.createElement('li');
        listItem.className = 'list-entry';

        // mark purchased items
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = item.purchased;
        checkbox.addEventListener('change', () => {
            item.purchased = checkbox.checked;
            applyStyles(listItem, item.purchased);
        });

        const text = document.createTextNode(` ${item.name} - ${item.price} sh`);

        // Apply  styles
        applyStyles(listItem, item.purchased);

        listItem.appendChild(checkbox);
        listItem.appendChild(text);
        itemsWrapper.appendChild(listItem);
    });
}

// Add new item
formHook.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = goodsInput.value.trim();
    const price = parseFloat(priceInput.value);
    if (!name || isNaN(price)) return;

    cartBucket.push({ name, price, purchased: false });
    goodsInput.value = '';
    priceInput.value = '';
    showItems();
});

// Clear all items
rmvBtn.addEventListener('click', () => {
    cartBucket = [];
    showItems();
});

// a mark for purchased items
function applyStyles(element, purchased) {
    if (purchased) {
        element.style.textDecoration = 'line-through';
        element.style.color = 'green';
    } else {
        element.style.textDecoration = 'none';
        element.style.color = 'blue';
    }
}
showItems();
