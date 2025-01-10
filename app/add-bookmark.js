// Parse the `url` query parameter from the current page's URL
const params = new URLSearchParams(window.location.search);
const passedUrl = params.get("url");

// Check if a URL was passed
if (passedUrl) {
    // Populate the URL input field with the parsed URL
    document.getElementById("url").value = passedUrl;
}

const saveBtn = document.getElementById("save-btn");
const cancelBtn = document.getElementById("cancel-btn");
const inputs = document.querySelectorAll("input, textarea");
const form = document.getElementById("bookmark-form");

saveBtn.addEventListener("click", (e) => {
    e.preventDefault(); // Prevent form submission

    // Validate form fields
    if (form.checkValidity()) {
        // Collect the data from the form fields
        const newBookmark = {
            id: Date.now(), // Generate a unique ID for the bookmark
            title: document.getElementById("title").value,
            url: document.getElementById("url").value,
            category: document.getElementById("category").value,
            tags: document.getElementById("tags").value.split(",").map(tag => tag.trim()),
            notes: document.getElementById("notes").value,
        };

        // Get existing bookmarks from localStorage
        const storedBookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];

        // Add the new bookmark to the list
        storedBookmarks.push(newBookmark);

        // Save the updated bookmarks back to localStorage
        localStorage.setItem("bookmarks", JSON.stringify(storedBookmarks));

        // Save to a timestamped file (your implementation might differ)
        saveBookmarksToTimestampedFile();

        // Optionally, you can redirect the user back to the list page
        window.location.href = "dashboard.html"; // Modify this as needed
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
