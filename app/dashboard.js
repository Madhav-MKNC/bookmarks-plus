fetchBookmarksAndStore();
const storedBookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];

const bookmarksContainer = document.getElementById("bookmarks-container");
const searchTermInput = document.getElementById("search-term");
const categoryFilter = document.getElementById("category-filter");

// Popup Elements
const popup = document.getElementById("popup");
const popupTitle = document.getElementById("popup-title");
const popupUrl = document.getElementById("popup-url");
const popupCategory = document.getElementById("popup-category");
const popupTags = document.getElementById("popup-tags");
const popupNotes = document.getElementById("popup-notes");

function renderBookmarks(filteredBookmarks) {
    bookmarksContainer.innerHTML = ""; // Clear container before rendering

    filteredBookmarks.forEach((bookmark) => {
        const bookmarkElement = document.createElement("div");
        bookmarkElement.classList.add("bookmark");
        bookmarkElement.setAttribute("data-id", bookmark.id); // Set data-id

        // Create bookmark HTML without inline event handlers
        bookmarkElement.innerHTML = `
            <div class="bookmark-content">
                <h2>${bookmark.title}</h2>
                <p><a href="${bookmark.url}" target="_blank">${bookmark.url}</a></p>
                <p>Category: ${bookmark.category}</p>
                <p>Tags: ${bookmark.tags.join(", ")}</p>
                <p>${bookmark.notes}</p>
            </div>
            <button class="view-btn">View</button>
        `;

        // Append bookmark element
        bookmarksContainer.appendChild(bookmarkElement);
    });

    // Add event listeners for View buttons
    const viewButtons = bookmarksContainer.querySelectorAll(".view-btn");
    viewButtons.forEach((button) => {
        button.addEventListener("click", (event) => {
            const bookmarkElement = event.target.closest(".bookmark");
            const bookmarkId = parseInt(bookmarkElement.getAttribute("data-id"));
            viewBookmark(bookmarkId); // Call the viewBookmark function
        });
    });

    // Save updated bookmarks array to localStorage
    localStorage.setItem('bookmarks', JSON.stringify(storedBookmarks));
}

// Open the popup with bookmark details
function openPopup(bookmark) {
    popupTitle.textContent = bookmark.title;
    popupUrl.innerHTML = `URL: <a href="${bookmark.url}" target="_blank" class="text-blue-500">${bookmark.url}</a>`; // Make URL clickable
    popupCategory.textContent = `Category: ${bookmark.category}`;
    popupTags.textContent = `Tags: ${bookmark.tags.join(", ")}`;
    popupNotes.textContent = bookmark.notes;

    popup.style.display = 'flex'; // Ensure it's displayed before animation
    setTimeout(() => {
        popup.classList.add("active"); // Add active class to trigger fade-in animation
    }, 10); // Small delay to ensure popup is displayed first
}

// Close the popup when clicking outside the content
popup.addEventListener("click", (event) => {
    if (event.target === popup) {
        popup.classList.remove("active"); // Remove the active class to trigger fade-out animation
        // Hide the popup after the fade-out animation
        setTimeout(() => {
            popup.style.display = 'none';
        }, 300); // Match the duration of the fade-out transition (300ms)
    }
});

// Function to search each word in the input text in all bookmark fields
function searchBookmarks(text) {
    const trimmedText = text.trim();
    if (trimmedText === "") { return storedBookmarks; }
    const searchWords = trimmedText.toLowerCase().split(/\s+/);

    const matchedBookmarks = storedBookmarks.filter((bookmark) => {
        // Check if any word matches the bookmark's title, URL, category, tags, or notes
        const titleMatch = searchWords.some(word => bookmark.title.toLowerCase().includes(word));
        const urlMatch = searchWords.some(word => bookmark.url.toLowerCase().includes(word));
        const categoryMatch = searchWords.some(word => bookmark.category.toLowerCase().includes(word));
        const tagsMatch = searchWords.some(word => bookmark.tags.some(tag => tag.toLowerCase().includes(word)));
        const notesMatch = searchWords.some(word => bookmark.notes.toLowerCase().includes(word));

        // Return true if any of the fields match the search words
        return titleMatch || urlMatch || categoryMatch || tagsMatch || notesMatch;
    });

    return matchedBookmarks;
}

// Event Listener for bookmark clicks to open the popup
bookmarksContainer.addEventListener("click", (event) => {
    const bookmarkElement = event.target.closest(".bookmark");
    if (bookmarkElement) {
        const bookmarkId = parseInt(bookmarkElement.getAttribute("data-id"));
        const bookmark = storedBookmarks.find(b => b.id === bookmarkId);
        openPopup(bookmark);
    }
});

// Real-time Search: Update the rendered bookmarks on every keystroke
searchTermInput.addEventListener("input", () => {
    let searchText = searchTermInput.value;  // Get the text from the input
    let filteredBookmarks = searchBookmarks(searchText);  // Get matched bookmarks
    filteredBookmarks = filterByCategory(filteredBookmarks);  // Apply category filter
    renderBookmarks(filteredBookmarks);  // Render the matched bookmarks
});

// Function to filter bookmarks by category
function filterByCategory(filteredBookmarks) {
    const selectedCategory = categoryFilter.value;
    if (selectedCategory) {
        return filteredBookmarks.filter(bookmark => bookmark.category === selectedCategory);
    }
    return filteredBookmarks;
}

// Category Filter: Update bookmarks based on selected category
categoryFilter.addEventListener("change", () => {
    let searchText = searchTermInput.value;  // Get the text from the input
    let filteredBookmarks = searchBookmarks(searchText);  // Get matched bookmarks
    filteredBookmarks = filterByCategory(filteredBookmarks);  // Apply category filter
    renderBookmarks(filteredBookmarks);  // Render the matched bookmarks
});

// Function to populate category dropdown dynamically
function populateCategoryFilter() {
    const categoryFilter = document.getElementById("category-filter");
    const storedBookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];

    // Extract unique categories from the stored bookmarks
    const categories = [...new Set(storedBookmarks.map(bookmark => bookmark.category))];

    // Clear existing options (if any)
    categoryFilter.innerHTML = '';

    // Add a default "All Categories" option
    categoryFilter.innerHTML = '<option value="">All Categories</option>';

    // Add each category as a new option
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });
}

// Call the populate function when the page is loaded or when bookmarks are updated
populateCategoryFilter();

// Function to handle the redirection to /view-bookmark.html
function viewBookmark(bookmarkId) {
    const viewUrl = `view-bookmark.html?id=${bookmarkId}`;
    window.open(viewUrl, '_blank');
}

// Add bookmark
addBookmarkBtn = document.getElementById("add-bookmark-btn");
addBookmarkBtn.addEventListener("click", () => {
    const viewUrl = 'add-bookmark.html';
    window.open(viewUrl, '_blank');
});

// function viewBookmark(bookmarkId) {
//     const bookmark = getBookmarkById(bookmarkId); // Retrieve the bookmark data by ID
//     localStorage.setItem('bookmarkData', JSON.stringify(bookmark));
//     window.location.href = 'view-bookmark.html'; // Navigate to the view bookmark page
// }

// Function to fetch a bookmark by its ID
// function getBookmarkById(id) {
//     return bookmarks.find(bookmark => bookmark.id === id);
// }

window.addEventListener("storage", function (event) {
    if (event.key === "bookmarks") { // If the "bookmarks" key has changed
        location.reload(); // Reload the page to reflect the new data
    }
});

// Initial Render
renderBookmarks(storedBookmarks);
