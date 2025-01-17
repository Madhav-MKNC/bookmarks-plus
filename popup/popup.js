document
    .getElementById("addBookmark")
    .addEventListener("click", () => {
        chrome.tabs.query(
            { active: true, currentWindow: true },
            (tabs) => {
                const currentUrl = tabs[0].url;
                const viewUrl = `app/add-bookmark.html?url=${encodeURIComponent(
                    currentUrl
                )}`;
                chrome.tabs.create({ url: viewUrl });
            }
        );
    });

document
    .getElementById("dashboard")
    .addEventListener("click", () => {
        const url = chrome.runtime.getURL('app/dashboard.html');
        window.open(url, 'bookmarks-plus-dashboard');
    });
