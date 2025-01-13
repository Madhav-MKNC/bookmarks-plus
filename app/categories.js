const categories = JSON.parse(localStorage.getItem('bookmarks-categories')) || [];

const categoryInput = document.getElementById('category');
// const dropdownList = document.getElementById('dropdownList');
categoryInput.addEventListener('input', searchOptions);

categoryInput.addEventListener('focus', () => {
    if (categories.length > 0) {
        dropdownList.style.display = 'block';
        populateDropdown(categories);
    }
});

function searchOptions() {
    const inputText = categoryInput.value.toLowerCase();
    const filteredOptions = categories.filter(option => option.toLowerCase().includes(inputText));

    if (filteredOptions.length > 0) {
        dropdownList.style.display = 'block';
        populateDropdown(filteredOptions);
    } else {
        dropdownList.style.display = 'none';
    }
}

function populateDropdown(items) {
    dropdownList.innerHTML = '';

    items.forEach(item => {
        const optionDiv = document.createElement('div');
        optionDiv.textContent = item;
        optionDiv.onclick = () => {
            categoryInput.value = item;
            dropdownList.style.display = 'none';
        };
        dropdownList.appendChild(optionDiv);
    });
}

document.addEventListener('click', (e) => {
    if (!dropdownList.contains(e.target) && e.target !== categoryInput) {
        dropdownList.style.display = 'none';
    }
});
