// Parse the `url` query parameter from the current page's URL
const params = new URLSearchParams(window.location.search);
const passedUrl = params.get("url");

// Check if a URL was passed
if (passedUrl) {
    // Populate the URL input field with the parsed URL
    document.getElementById("url").value = passedUrl;
}
