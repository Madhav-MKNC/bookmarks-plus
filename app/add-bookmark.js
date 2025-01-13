const params = new URLSearchParams(window.location.search);
const passedUrl = params.get("url");

if (passedUrl) {
    try {
        document.getElementById("url").value = passedUrl;
    } catch (error) {
        console.log("⚠️ Error setting the passed URL:", error);
    }
}

const saveBtn = document.getElementById("save-btn");
const cancelBtn = document.getElementById("cancel-btn");
const inputs = document.querySelectorAll("input, textarea");
const form = document.getElementById("bookmark-form");

saveBtn.addEventListener("click", (e) => {
    e.preventDefault();

    try {
        if (form.checkValidity()) {
            const newBookmark = {
                id: Date.now(),
                title: document.getElementById("title").value,
                url: document.getElementById("url").value,
                category: document.getElementById("category").value,
                tags: document.getElementById("tags").value.split(",").map(tag => tag.trim()),
                notes: document.getElementById("notes").value,
            };

            const storedBookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
            storedBookmarks.push(newBookmark);

            try {
                localStorage.setItem("bookmarks", JSON.stringify(storedBookmarks));
            } catch (storageError) {
                console.log("⚠️ Error saving bookmarks to localStorage:", storageError);
            }

            try {
                saveBookmarksToTimestampedFile();
            } catch (fileError) {
                console.log("⚠️ Error saving bookmarks to a timestamped file:", fileError);
            }

            try {
                const url = chrome.runtime.getURL('app/dashboard.html');
                window.close();
                window.open(url, 'bookmarks-plus-dashboard');
            } catch (navigationError) {
                console.log("⚠️ Error navigating to the dashboard:", navigationError);
            }
        } else {
            alert("Please fill in all required fields correctly.");
        }
    } catch (error) {
        console.log("⚠️ An unexpected error occurred while saving the bookmark:", error);
        alert("Something went wrong. Please try again.");
    }
});

cancelBtn.addEventListener("click", () => {
    try {
        cancel_bookmark();
    } catch (error) {
        console.log("⚠️ Error during cancel action:", error);
    }
});

function cancel_bookmark() {
    try {
        const confirmation = confirm("Are you sure you want to cancel adding this bookmark?");
        if (confirmation) {
            window.close();
        }
    } catch (error) {
        console.log("⚠️ Error during cancel confirmation:", error);
    }
}

const categories = JSON.parse(localStorage.getItem('bookmarks-categories')) || [];

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
