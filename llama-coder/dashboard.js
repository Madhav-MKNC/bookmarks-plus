const bookmarks = [
    { id: 1, url: "https://example.com", title: "Example", category: "Work", tags: ["important"], notes: "Visit this site for more info." },
    { id: 2, url: "https://another-example.com", title: "Another Example", category: "Personal", tags: ["fun"], notes: "Just for fun." },
    { id: 3, url: "https://some-example.com", title: "Some Example", category: "Personal", tags: ["fun"], notes: "Random website." },
    { id: 4, url: "https://random.com", title: "Random Example", category: "Work", tags: ["important"], notes: "Check it out." },
    { id: 5, url: "https://website.com", title: "Website Example", category: "Work", tags: ["important"], notes: "Useful for work." },
    { id: 6, url: "https://cool.com", title: "Cool Example", category: "Personal", tags: ["fun"], notes: "Cool site for fun." },
    { id: 7, url: "https://news.com", title: "News Example", category: "Work", tags: ["important"], notes: "Daily news website." },
    { id: 8, url: "https://education.com", title: "Education Example", category: "Work", tags: ["important"], notes: "For educational purposes." },
    { id: 9, url: "https://sports.com", title: "Sports Example", category: "Personal", tags: ["fun"], notes: "Sports-related website." },
    { id: 10, url: "https://tech.com", title: "Tech Example", category: "Work", tags: ["important"], notes: "Technology site." }
];

const bookmarksContainer = document.getElementById("bookmarks-container");
const searchTermInput = document.getElementById("search-term");
const categoryFilter = document.getElementById("category-filter");
const tagFilter = document.getElementById("tag-filter");

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
        bookmarkElement.innerHTML = `
            <div class="bookmark-content">
                <h2>${bookmark.title}</h2>
                <p><a href="${bookmark.url}" target="_blank">${bookmark.url}</a></p>
                <p>Category: ${bookmark.category}</p>
                <p>Tags: ${bookmark.tags.join(", ")}</p>
                <p>${bookmark.notes}</p>
            </div>
        `;
        bookmarksContainer.appendChild(bookmarkElement);
    });
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

// Filter logic
function filterBookmarks() {
    const searchTerm = searchTermInput.value.toLowerCase();
    const selectedCategory = categoryFilter.value;
    const selectedTags = Array.from(tagFilter.selectedOptions).map(option => option.value);

    const filteredBookmarks = bookmarks.filter((bookmark) => {
        const matchesSearchTerm = bookmark.title.toLowerCase().includes(searchTerm);
        const matchesCategory = selectedCategory ? bookmark.category === selectedCategory : true;
        const matchesTags = selectedTags.length > 0 ? selectedTags.every(tag => bookmark.tags.includes(tag)) : true;
        return matchesSearchTerm && matchesCategory && matchesTags;
    });

    renderBookmarks(filteredBookmarks);
}

// Event Listeners for search and filter
searchTermInput.addEventListener("input", filterBookmarks);
categoryFilter.addEventListener("change", filterBookmarks);
tagFilter.addEventListener("change", filterBookmarks);

// Event Listener for bookmark clicks to open the popup
bookmarksContainer.addEventListener("click", (event) => {
    const bookmarkElement = event.target.closest(".bookmark");
    if (bookmarkElement) {
        const bookmarkId = parseInt(bookmarkElement.getAttribute("data-id"));
        const bookmark = bookmarks.find(b => b.id === bookmarkId);
        openPopup(bookmark);
    }
});


// Function to search each word in the input text in all bookmark fields
function searchBookmarks(text) {
    const searchWords = text.toLowerCase().split(" "); // Split the input text into words
    const matchedBookmarks = bookmarks.filter((bookmark) => {
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


// Initial Render
renderBookmarks(bookmarks);
