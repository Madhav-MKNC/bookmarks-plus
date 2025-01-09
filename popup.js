document.addEventListener('DOMContentLoaded', function () {
    try {
        const titleInput = document.getElementById('title');
        const urlInput = document.getElementById('url');
        const categoryInput = document.getElementById('category');
        const tagsInput = document.getElementById('tags');
        const notesInput = document.getElementById('notes');
        const saveBtn = document.getElementById('saveBtn');
        const cancelBtn = document.getElementById('cancelBtn');

        // Get the current tab URL and set it in the form
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            try {
                const currentTab = tabs[0];
                urlInput.value = currentTab.url;
            } catch (error) {
                console.error("Error fetching tab URL:", error);
            }
        });

        // Save button action
        saveBtn.addEventListener('click', function () {
            try {
                const bookmarkData = {
                    title: titleInput.value,
                    url: urlInput.value,
                    category: categoryInput.value,
                    tags: tagsInput.value,
                    notes: notesInput.value
                };
                console.log('Saved bookmark:', bookmarkData);
                // Here, you can add your logic to save the data (e.g., to storage)
                window.close();
            } catch (error) {
                console.error("Error saving bookmark:", error);
            }
        });

        // Cancel button action
        cancelBtn.addEventListener('click', function () {
            try {
                window.close();
            } catch (error) {
                console.error("Error closing popup:", error);
            }
        });
    } catch (error) {
        console.error("Error in popup.js:", error);
    }
});
