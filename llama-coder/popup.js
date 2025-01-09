// Add event listeners to the buttons
document
    .getElementById("addBookmark")
    .addEventListener("click", () => {
        chrome.tabs.query(
            { active: true, currentWindow: true },
            (tabs) => {
                const currentUrl = tabs[0].url;
                const viewUrl = `add-bookmark.html?url=${encodeURIComponent(
                    currentUrl
                )}`;
                chrome.tabs.create({ url: viewUrl });
            }
        );
    });

document
    .getElementById("dashboard")
    .addEventListener("click", () => {
        chrome.tabs.create({ url: "dashboard.html" });
    });