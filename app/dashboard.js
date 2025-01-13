try {
    fetchData();
} catch (error) {
    console.log('⚠️ Error fetching data:', error.message);
}

let storedBookmarks;
try {
    storedBookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
} catch (error) {
    console.log('⚠️ Invalid bookmarks data in localStorage, resetting to empty.');
    storedBookmarks = [];
}

const bookmarksContainer = document.getElementById("bookmarks-container");
const searchTermInput = document.getElementById("search-term");
const categoryFilter = document.getElementById("category-filter");

function renderBookmarks(filteredBookmarks) {
    bookmarksContainer.innerHTML = "";
    filteredBookmarks.forEach((bookmark) => {
        try {
            const bookmarkElement = document.createElement("div");
            bookmarkElement.classList.add("bookmark");
            bookmarkElement.setAttribute("data-id", bookmark.id);

            const categoryHtml = `<p class="bookmark-category bookmark-card-item">${bookmark.category}</p>`;
            const blocksHtml = bookmark.tags.length ? categoryHtml + bookmark.tags.map(tag => `<p class="tag bookmark-card-item">${tag}</p>`).join("") : categoryHtml;

            bookmarkElement.innerHTML = `
            <div class="bookmark-content bookmark-card">
                    <h2 class="bookmark-title bookmark-card-item">${bookmark.title}</h2>
                    <p class="bookmark-url bookmark-card-item"><a href="${bookmark.url}" target="_blank">${bookmark.url}</a></p>
                    <div class="blocks">${blocksHtml}</div>
                    ${bookmark.notes ? `<p class="bookmark-notes bookmark-card-item">${bookmark.notes}</p>` : ""}
                </div>
                <button class="view-btn"><img src="../assets/open.png" alt=""></button>
                `;
            bookmarksContainer.appendChild(bookmarkElement);
        } catch (error) {
            console.log('⚠️ Error rendering bookmark:', error.message);
        }
    });

    const viewButtons = bookmarksContainer.querySelectorAll(".view-btn");
    viewButtons.forEach((button) => {
        button.addEventListener("click", (event) => {
            try {
                const bookmarkElement = event.target.closest(".bookmark");
                const bookmarkId = parseInt(bookmarkElement.getAttribute("data-id"));
                viewBookmark(bookmarkId);
            } catch (error) {
                console.log('⚠️ Error viewing bookmark:', error.message);
            }
        });
    });

    try {
        localStorage.setItem('bookmarks', JSON.stringify(storedBookmarks));
    } catch (error) {
        console.log('⚠️ Error saving bookmarks to localStorage:', error.message);
    }
}

function searchBookmarks(text) {
    try {
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
    } catch (error) {
        console.log('⚠️ Error searching bookmarks:', error);
        return [];
    }
}

let zoomedBookmark = null;

bookmarksContainer.addEventListener("click", (event) => {
    try {
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
    } catch (error) {
        console.log('⚠️ Error zooming bookmark:', error);
    }
});

document.addEventListener("click", (event) => {
    try {
        if (!event.target.closest(".bookmark")) {
            revertZoom();
        }
    } catch (error) {
        console.log('⚠️ Error handling document click:', error);
    }
});

function revertZoom() {
    try {
        if (zoomedBookmark) {
            zoomedBookmark.style.transform = "scale(1)";
            zoomedBookmark.style.zIndex = "";
            zoomedBookmark = null;
        }
    } catch (error) {
        console.log('⚠️ Error reverting zoom:', error);
    }
}

searchTermInput.addEventListener("input", () => {
    try {
        let searchText = searchTermInput.value;
        let filteredBookmarks = searchBookmarks(searchText);
        filteredBookmarks = filterByCategory(filteredBookmarks);
        renderBookmarks(filteredBookmarks);
    } catch (error) {
        console.log('⚠️ Error handling search input:', error);
    }
});

function filterByCategory(filteredBookmarks) {
    try {
        const selectedCategory = categoryFilter.value;
        if (selectedCategory) {
            return filteredBookmarks.filter(bookmark => bookmark.category === selectedCategory);
        }
        return filteredBookmarks;
    } catch (error) {
        console.log('⚠️ Error filtering by category:', error);
        return filteredBookmarks;
    }
}

categoryFilter.addEventListener("change", () => {
    try {
        let searchText = searchTermInput.value;
        let filteredBookmarks = searchBookmarks(searchText);
        filteredBookmarks = filterByCategory(filteredBookmarks);
        renderBookmarks(filteredBookmarks);
    } catch (error) {
        console.log('⚠️ Error handling category filter change:', error);
    }
});

function populateCategoryFilter() {
    try {
        const categoryFilter = document.getElementById("category-filter");
        const storedBookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
        const storedCategories = JSON.parse(localStorage.getItem('bookmarks-categories')) || [];
        const categories = [...new Set([...storedBookmarks.map(bookmark => bookmark.category), ...storedCategories])];
        localStorage.setItem('bookmarks-categories-current', JSON.stringify(categories));
        categoryFilter.innerHTML = '<option value="">All Categories</option>';

        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category;
            categoryFilter.appendChild(option);
        });
    } catch (error) {
        console.log('⚠️ Error populating category filter:', error);
    }
}

populateCategoryFilter();

function viewBookmark(bookmarkId) {
    try {
        const viewUrl = `view-bookmark.html?id=${bookmarkId}`;
        window.open(viewUrl, '_blank');
    } catch (error) {
        console.log('⚠️ Error viewing bookmark:', error);
    }
}

addBookmarkBtn = document.getElementById("add-bookmark-btn");
addBookmarkBtn.addEventListener("click", () => {
    try {
        const viewUrl = 'add-bookmark.html';
        window.open(viewUrl, '_blank');
    } catch (error) {
        console.log('⚠️ Error opening add bookmark page:', error);
    }
});

window.addEventListener("storage", function (event) {
    try {
        if (event.key === "bookmarks") {
            location.reload();
        }
    } catch (error) {
        console.log('⚠️ Error handling storage event:', error);
    }
});

// Load bookmarks from localStorage and file
const loadFileBtn = document.getElementById("load-file-btn");
loadFileBtn.addEventListener("click", () => {
    try {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = ".json";

        input.addEventListener("change", () => {
            if (input.files.length > 0) {
                const file = input.files[0];
                console.log('✅ File selected:', file.name);
                handleFile(file);
            } else {
                console.log('⚠️ No file selected, setting empty bookmarks.');
                localStorage.setItem("bookmarks-loaded-from-file", JSON.stringify([]));
            }
            location.reload();
        });

        input.click();
    } catch (error) {
        console.log('⚠️ Error loading file:', error);
    }
});

renderBookmarks(storedBookmarks);
