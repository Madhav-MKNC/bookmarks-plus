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
            console.log("⚠️ Error loading the file:", e);
            alert("The file is invalid or not in the correct format❗");
        }
    };

    reader.onerror = () => {
        console.log("⚠️ Error reading the file.");
        alert("Failed to read the file❗");
    };

    try {
        reader.readAsText(file);
    } catch (e) {
        console.log("⚠️ Error initializing the file reader:", e);
    }
}

function setDefaultCategories() {
    try {
        const defaultCategories = [
            "AGI/AEI", "web scraping", "LLMs", "blockchain", "prompts", "agents", "ether", "startups", "AI",
            "ML/DL", "landing-pages", "automation", "productivity", "infosec", "VPS", "neuroscience", "ether"
        ];
        localStorage.setItem('bookmarks-categories', JSON.stringify(defaultCategories));
    } catch (e) {
        console.log("⚠️ Error setting default categories:", e);
    }
}

function fetchData() {
    try {
        setDefaultCategories();
        const existingBookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
        const loadedBookmarks = JSON.parse(localStorage.getItem('bookmarks-loaded-from-file')) || [];
        const mergedBookmarks = [...new Map([...existingBookmarks, ...loadedBookmarks].map(item => [JSON.stringify(item), item])).values()];
        localStorage.setItem('bookmarks', JSON.stringify(mergedBookmarks));
        console.log('Bookmarks successfully loaded.');
    } catch (e) {
        console.log("⚠️ Error fetching or merging bookmarks:", e);
    }
}

function saveBookmarksToTimestampedFile() {
    try {
        const newData = localStorage.getItem('bookmarks');

        if (!newData) {
            console.log("⚠️ No data found in localStorage under 'bookmarks'.");
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
        }, (downloadId) => {
            if (chrome.runtime.lastError) {
                console.log("⚠️ Error during download:", chrome.runtime.lastError.message);
            } else {
                console.log(`✅ Timestamped data saved as ${timestampedFilename}`);
            }
        });
    } catch (e) {
        console.log("⚠️ Error saving bookmarks to file:", e);
    }
}
