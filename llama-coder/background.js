chrome.action.onClicked.addListener((tab) => {
    // Get the current tab's URL
    const url = tab.url;

    // Construct the URL for the new tab
    const viewUrl = `add-bookmark.html?url=${encodeURIComponent(url)}`;

    // Open the new tab
    chrome.tabs.create({ url: viewUrl });
});
