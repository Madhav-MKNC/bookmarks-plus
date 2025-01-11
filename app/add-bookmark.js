const params = new URLSearchParams(window.location.search);
const passedUrl = params.get("url");

if (passedUrl) { document.getElementById("url").value = passedUrl; }

const saveBtn = document.getElementById("save-btn");
const cancelBtn = document.getElementById("cancel-btn");
const inputs = document.querySelectorAll("input, textarea");
const form = document.getElementById("bookmark-form");

saveBtn.addEventListener("click", (e) => {
    e.preventDefault();

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
        localStorage.setItem("bookmarks", JSON.stringify(storedBookmarks));
        saveBookmarksToTimestampedFile();

        const url = chrome.runtime.getURL('app/dashboard.html');
        window.close();
        window.open(url, 'bookmarks-plus-dashboard');
    } else {
        alert("Please fill in all required fields correctly.");
    }
});

cancelBtn.addEventListener("click", () => {
    cancel_bookmark();
});

function cancel_bookmark() {
    const confirmation = confirm("Are you sure you want to cancel adding this bookmark?");
    if (confirmation) {
        window.close();
    }
}
