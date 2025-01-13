function handleFile(file) {
    const reader = new FileReader();
    reader.onload = () => {
        try {
            const content = JSON.parse(reader.result);

            // Validate the file signature
            if (content.fileSignature === "BookmarksPlusSignature_v1") {
                localStorage.setItem("bookmarks-loaded-from-file", JSON.stringify(content.bookmarks));
                alert("File loaded successfully! ✅");
            } else {
                throw new Error("Invalid file: signature mismatch.");
            }
        } catch (e) {
            console.error("Error loading the file:", e);
            alert("The file is invalid or not in the correct format❗");
        }
    };
    reader.readAsText(file);
}

function setDefaultCategories() {
    const defaultCategories = [
        "AGI/AEI", "web scraping", "LLMs", "blockchain", "prompts", "agents", "ether", "startups", "AI",
        "ML/DL", "landing-pages", "automation", "productivity", "infosec", "VPS", "neuroscience", "ether"
    ];

    localStorage.setItem('bookmarks-categories', JSON.stringify(defaultCategories));
}

function fetchData() {
    setDefaultCategories()
    const existingBookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
    const loadedBookmarks = JSON.parse(localStorage.getItem('bookmarks-loaded-from-file')) || [];
    const mergedBookmarks = [...new Map([...existingBookmarks, ...loadedBookmarks].map(item => [JSON.stringify(item), item])).values()];
    localStorage.setItem('bookmarks', JSON.stringify(mergedBookmarks));
    console.log('Bookmarks successfully loaded.');
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

    const fileContent = {
        fileSignature: "BookmarksPlusSignature_v1", // Unique identifier
        timestamp: now.toISOString(),
        bookmarks: JSON.parse(newData),
    };

    const timestampedFilename = `bookmarks-plus-storage/bookmarks_${Timestamp}.json`;
    const blob = new Blob([JSON.stringify(fileContent)], { type: 'application/json' });
    const timestampedUrl = URL.createObjectURL(blob);

    chrome.downloads.download({
        url: timestampedUrl,
        filename: timestampedFilename
    }, () => {
        console.log(`Timestamped data saved as ${timestampedFilename}`);
    });
}
