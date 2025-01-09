function saveBookmarksToTimestampedFile() {
    // Step 1: Read the existing JSON data from .saved_bookmarks.json
    fetch('.saved_bookmarks.json')
        .then(response => {
            if (!response.ok) throw new Error('Failed to fetch .saved_bookmarks.json');
            return response.json();
        })
        .then(existingData => {
            // Step 2: Save the existing data to a timestamped JSON file
            const date = new Date().toISOString().split('T')[0];
            const timestampedFilename = `bookmarks_${date}.json`;
            const blob = new Blob([JSON.stringify(existingData, null, 2)], { type: 'application/json' });
            const timestampedUrl = URL.createObjectURL(blob);

            // Save the timestamped file
            chrome.downloads.download({
                url: timestampedUrl,
                filename: timestampedFilename
            });

            // Step 3: Save the new data from localStorage to .saved_bookmarks.json
            const newData = localStorage.getItem('bookmarks');
            const newBlob = new Blob([newData], { type: 'application/json' });
            const newFileUrl = URL.createObjectURL(newBlob);

            chrome.downloads.download({
                url: newFileUrl,
                filename: '.saved_bookmarks.json'
            });
        })
        .catch(error => {
            console.error('Error processing bookmarks:', error);
        });
}

function saveLocalStorageToSavedBookmarks() {
    // Retrieve the new data from localStorage
    const newData = localStorage.getItem('bookmarks');

    if (!newData) {
        console.error("No data found in localStorage under 'bookmarks'.");
        return;
    }

    // Create a Blob with the new data
    const blob = new Blob([newData], { type: 'application/json' });

    // Generate a URL for the Blob
    const url = URL.createObjectURL(blob);

    // Trigger the download to .saved_bookmarks.json
    chrome.downloads.download({
        url: url,
        filename: '.saved_bookmarks.json'
    }, () => {
        console.log("Bookmarks successfully saved to .saved_bookmarks.json");
    });
}
