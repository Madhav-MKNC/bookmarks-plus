const editBtn = document.getElementById("edit-btn");
const saveBtn = document.getElementById("save-btn");
const deleteBtn = document.getElementById("delete-btn");
const inputs = document.querySelectorAll("input, textarea");
const heading = document.querySelector("h2");
const form = document.getElementById("bookmark-form");

deleteBtn.addEventListener("click", () => {
    const confirmation = confirm(
        "Are you sure you want to delete this bookmark?"
    );
    if (confirmation) {
        const updatedBookmarks = storedBookmarks.filter(
            (b) => b.id !== bookmarkId
        );
        localStorage.setItem(
            "bookmarks",
            JSON.stringify(updatedBookmarks)
        );
        saveBookmarksToTimestampedFile();
        window.close();
    }
});

const urlParams = new URLSearchParams(window.location.search);
const bookmarkId = parseInt(urlParams.get("id"));

const storedBookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
const bookmark = storedBookmarks.find((b) => b.id === bookmarkId);

if (bookmark) {
    document.getElementById("title").value = bookmark.title;
    document.getElementById("url").value = bookmark.url;
    document.getElementById("category").value = bookmark.category;
    document.getElementById("tags").value = bookmark.tags.join(", ");
    document.getElementById("notes").value = bookmark.notes;
} else {
    alert("Bookmark not found!");
}

editBtn.addEventListener("click", () => {
    inputs.forEach((input) => input.removeAttribute("readonly"));
    editBtn.classList.add("hidden");
    saveBtn.classList.remove("hidden");
    deleteBtn.classList.remove("hidden");
    heading.textContent = "Edit Bookmark";
});

saveBtn.addEventListener("click", (e) => {
    e.preventDefault();

    if (form.checkValidity()) {
        heading.textContent = "View Bookmark";
        inputs.forEach((input) => input.setAttribute("readonly", true));
        saveBtn.classList.add("hidden");
        deleteBtn.classList.add("hidden");
        editBtn.classList.remove("hidden");

        const updatedBookmark = {
            ...bookmark,
            title: document.getElementById("title").value.trim(),
            url: document.getElementById("url").value.trim(),
            category: document.getElementById("category").value.trim(),
            tags: document
                .getElementById("tags")
                .value.split(",")
                .map((tag) => tag.trim()),
            notes: document.getElementById("notes").value,
        };

        const updatedBookmarks = storedBookmarks.map((b) => b.id === bookmarkId ? updatedBookmark : b);
        localStorage.setItem("bookmarks", JSON.stringify(updatedBookmarks));
        saveBookmarksToTimestampedFile();
    } else {
        alert("Please fill in all required fields correctly.");
    }
});

function delete_bookmark() {
    const confirmation = confirm("Are you sure you want to delete this bookmark?");
    if (confirmation) {
        const updatedBookmarks = storedBookmarks.filter((b) => b.id !== bookmarkId);
        localStorage.setItem("bookmarks", JSON.stringify(updatedBookmarks));
        saveBookmarksToTimestampedFile;
        window.close();
    }
}
