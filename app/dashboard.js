fetchBookmarksAndStore();
const storedBookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];

const bookmarksContainer = document.getElementById("bookmarks-container");
const searchTermInput = document.getElementById("search-term");
const categoryFilter = document.getElementById("category-filter");

function renderBookmarks(filteredBookmarks) {
    bookmarksContainer.innerHTML = "";
    filteredBookmarks.forEach((bookmark) => {
        const bookmarkElement = document.createElement("div");
        bookmarkElement.classList.add("bookmark");
        bookmarkElement.setAttribute("data-id", bookmark.id);

        const categoryHtml = `<p class="bookmark-category">${bookmark.category}</p>`;
        const blocksHtml = bookmark.tags.length ? categoryHtml + bookmark.tags.map(tag => `<p class="tag">${tag}</p>`).join("") : categoryHtml;

        bookmarkElement.innerHTML = `
            <div class="bookmark-content bookmark-card">
                <h2 class="bookmark-title">${bookmark.title}</h2>
                <p class="bookmark-url"><a href="${bookmark.url}" target="_blank">${bookmark.url}</a></p>
                <div class="blocks">${blocksHtml}</div>
                ${bookmark.notes ? `<p class="bookmark-notes">${bookmark.notes}</p>` : ""}
            </div>
            <button class="view-btn"><img src="../assets/open.png" alt=""></button>
        `;
        bookmarksContainer.appendChild(bookmarkElement);
    });

    const viewButtons = bookmarksContainer.querySelectorAll(".view-btn");
    viewButtons.forEach((button) => {
        button.addEventListener("click", (event) => {
            const bookmarkElement = event.target.closest(".bookmark");
            const bookmarkId = parseInt(bookmarkElement.getAttribute("data-id"));
            viewBookmark(bookmarkId);
        });
    });

    localStorage.setItem('bookmarks', JSON.stringify(storedBookmarks));
}

function searchBookmarks(text) {
    const trimmedText = text.trim();
    if (trimmedText === "") { return storedBookmarks; }
    const searchWords = trimmedText.toLowerCase().split(/\s+/);

    const matchedBookmarks = storedBookmarks.filter((bookmark) => {
        const titleMatch = searchWords.some(word => bookmark.title.toLowerCase().includes(word));
        const urlMatch = searchWords.some(word => bookmark.url.toLowerCase().includes(word));
        const categoryMatch = searchWords.some(word => bookmark.category.toLowerCase().includes(word));
        const tagsMatch = searchWords.some(word => bookmark.tags.some(tag => tag.toLowerCase().includes(word)));
        const notesMatch = searchWords.some(word => bookmark.notes.toLowerCase().includes(word));
        return titleMatch || urlMatch || categoryMatch || tagsMatch || notesMatch;
    });

    return matchedBookmarks;
}

let zoomedBookmark = null;

bookmarksContainer.addEventListener("click", (event) => {
    const bookmarkElement = event.target.closest(".bookmark");
    if (bookmarkElement) {
        if (zoomedBookmark === bookmarkElement) { revertZoom(); }
        else {
            if (zoomedBookmark) { revertZoom(); }
            bookmarkElement.style.transform = "scale(1.5)";
            bookmarkElement.style.zIndex = "999";
            zoomedBookmark = bookmarkElement;
        }
    }
});

document.addEventListener("click", (event) => {
    if (!event.target.closest(".bookmark")) {
        revertZoom();
    }
});

function revertZoom() {
    if (zoomedBookmark) {
        zoomedBookmark.style.transform = "scale(1)";
        zoomedBookmark.style.zIndex = "";
        zoomedBookmark = null;
    }
}

searchTermInput.addEventListener("input", () => {
    let searchText = searchTermInput.value;
    let filteredBookmarks = searchBookmarks(searchText);
    filteredBookmarks = filterByCategory(filteredBookmarks);
    renderBookmarks(filteredBookmarks);
});

function filterByCategory(filteredBookmarks) {
    const selectedCategory = categoryFilter.value;
    if (selectedCategory) {
        return filteredBookmarks.filter(bookmark => bookmark.category === selectedCategory);
    }
    return filteredBookmarks;
}

categoryFilter.addEventListener("change", () => {
    let searchText = searchTermInput.value;
    let filteredBookmarks = searchBookmarks(searchText);
    filteredBookmarks = filterByCategory(filteredBookmarks);
    renderBookmarks(filteredBookmarks);
});

function populateCategoryFilter() {
    const categoryFilter = document.getElementById("category-filter");
    const storedBookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];

    const categories = [...new Set(storedBookmarks.map(bookmark => bookmark.category))];
    categoryFilter.innerHTML = '';
    categoryFilter.innerHTML = '<option value="">All Categories</option>';

    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });
}

populateCategoryFilter();

function viewBookmark(bookmarkId) {
    const viewUrl = `view-bookmark.html?id=${bookmarkId}`;
    window.open(viewUrl, '_blank');
}

addBookmarkBtn = document.getElementById("add-bookmark-btn");
addBookmarkBtn.addEventListener("click", () => {
    const viewUrl = 'add-bookmark.html';
    window.open(viewUrl, '_blank');
});

window.addEventListener("storage", function (event) {
    if (event.key === "bookmarks") {
        location.reload();
    }
});

// Load bookmarks from localStorage and file
const loadFileBtn = document.getElementById("load-file-btn");
loadFileBtn.addEventListener("click", () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";

    input.addEventListener("change", () => {
        if (input.files.length > 0) {
            const file = input.files[0];
            console.log('File selected:', file.name);
            handleFile(file);
        } else {
            console.log('No file selected, setting empty bookmarks.');
            localStorage.setItem("bookmarks-loaded-from-file", JSON.stringify([]));
        }
        location.reload();
    });

    input.click();
});

renderBookmarks(storedBookmarks);
