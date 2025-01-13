
const categories = JSON.parse(localStorage.getItem('bookmarks-categories-current')) || [];

const categoryInput = document.getElementById('category');
categoryInput.addEventListener('input', searchOptions);

function searchOptions() {
    const inputText = categoryInput.value.toLowerCase();
    const dropdownList = document.getElementById('dropdownList');
    const filteredOptions = categories.filter(option => option.toLowerCase().includes(inputText));

    if (filteredOptions.length > 0) {
        dropdownList.style.display = 'block';
        populateDropdown(filteredOptions);
    } else {
        dropdownList.style.display = 'none';
    }
}

function populateDropdown(items) {
    const dropdownList = document.getElementById('dropdownList');
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
    const dropdownList = document.getElementById('dropdownList');
    if (!dropdownList.contains(e.target) && e.target !== categoryInput) {
        dropdownList.style.display = 'none';
    }
});
