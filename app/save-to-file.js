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
    const existingBookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
    const mergedBookmarks = [...new Map([...existingBookmarks, ...bookmarks].map(item => [JSON.stringify(item), item])).values()];
    localStorage.setItem('bookmarks', JSON.stringify(mergedBookmarks));
    console.log('Bookmarks successfully merged and stored in localStorage.');
}

function fetchBookmarksAndStore() {
    const jsonUrl = chrome.runtime.getURL('.storage/saved_bookmarks.json');

    fetchJsonFile(jsonUrl)
        .then(storeBookmarksInLocalStorage)
        .catch(error => {
            console.error('Error loading the JSON file:', error);
        });
}

function saveBookmarksToTimestampedFile() {
    const newData = localStorage.getItem('bookmarks');

    if (!newData) {
        console.error("No data found in localStorage under 'bookmarks'.");
        return;
    }

    const now = new Date();
    const Timestamp = [
        String(now.getDate()).padStart(2, '0'),
        String(now.getMonth() + 1).padStart(2, '0'),
        now.getFullYear(),
        String(now.getHours()).padStart(2, '0'),
        String(now.getMinutes()).padStart(2, '0'),
        String(now.getSeconds()).padStart(2, '0')
    ].join('_');

    const timestampedFilename = `bookmarks-plus-storage/bookmarks_${Timestamp}.json`; // Save in the 'storage' folder
    const blob = new Blob([newData], { type: 'application/json' });
    const timestampedUrl = URL.createObjectURL(blob);

    chrome.downloads.download({
        url: timestampedUrl,
        filename: timestampedFilename
    }, () => {
        console.log(`Timestamped data saved as ${timestampedFilename}`);
    });
}
