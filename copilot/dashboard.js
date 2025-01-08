document.getElementById('search').addEventListener('input', function() {
    const query = this.value;
    chrome.runtime.sendMessage({action: "searchBookmarks", query}, function(response) {
        if (response.status === "success") {
            displayResults(response.results);
        }
    });
});

document.getElementById('categories').addEventListener('click', function() {
    // Implement category search functionality
});

document.getElementById('tags').addEventListener('click', function() {
    // Implement tag search functionality
});

function displayResults(results) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';
    results.forEach(result => {
        const div = document.createElement('div');
        div.textContent = `${result.title} - ${result.url}`;
        resultsDiv.appendChild(div);
    });
}