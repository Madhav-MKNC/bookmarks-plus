function fetchJsonFile(url) {
    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to fetch JSON from ${url}: ${response.status} ${response.statusText}`);
            }
            return response.json();
        });
}

function storeBookmarksInLocalStorage(bookmarks) {
    if (!Array.isArray(bookmarks)) {
        throw new Error('Invalid data format: Expected an array.');
    }
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    console.log('Bookmarks successfully loaded and stored in localStorage.');
}

function fetchBookmarksAndStore() {
    const jsonUrl = chrome.runtime.getURL('.storage/saved_bookmarks.json');

    fetchJsonFile(jsonUrl)
        .then(storeBookmarksInLocalStorage)
        .catch(error => {
            console.error('Error loading the JSON file:', error);
        });
}

function saveNewDataToSavedBookmarks(newData) {
    const blob = new Blob([newData], { type: 'application/json' });
    const fileUrl = URL.createObjectURL(blob);
    const filename = 'saved_bookmarks.json';

    chrome.downloads.download({
        url: fileUrl,
        filename: filename
    }, () => {
        console.log("New data successfully saved to 'saved_bookmarks.json'");
    });
}

function saveBookmarksToTimestampedFile() {
    const jsonUrl = chrome.runtime.getURL('.storage/saved_bookmarks.json');

    fetchJsonFile(jsonUrl)
        .then(existingData => {
            const now = new Date();
            const Timestamp = [
                String(now.getDate()).padStart(2, '0'),
                String(now.getMonth() + 1).padStart(2, '0'),
                now.getFullYear(),
                String(now.getHours()).padStart(2, '0'),
                String(now.getMinutes()).padStart(2, '0'),
                String(now.getSeconds()).padStart(2, '0')
            ].join('_');
            const timestampedFilename = `bookmarks_${Timestamp}.json`;
            const blob = new Blob([JSON.stringify(existingData, null, 2)], { type: 'application/json' });
            const timestampedUrl = URL.createObjectURL(blob);

            chrome.downloads.download({
                url: timestampedUrl,
                filename: timestampedFilename
            }, () => {
                console.log(`Timestamped data saved as ${timestampedFilename}`);
            });

            const newData = localStorage.getItem('bookmarks');
            if (newData) {
                saveNewDataToSavedBookmarks(newData);
            } else {
                console.error("No data found in localStorage under 'bookmarks'.");
            }
        })
        .catch(error => {
            console.error('Error processing bookmarks:', error);
        });
}

function saveLocalStorageToSavedBookmarks() {
    const newData = localStorage.getItem('bookmarks');

    if (!newData) {
        console.error("No data found in localStorage under 'bookmarks'.");
        return;
    }

    saveNewDataToSavedBookmarks(newData);
}
