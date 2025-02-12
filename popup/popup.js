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
        // const url = chrome.runtime.getURL('app/dashboard.html');
        // window.open(url, 'bookmarks-plus-dashboard');
        openDashboard();
    });

function openDashboard() {
    const url = chrome.runtime.getURL('app/dashboard.html');
    chrome.tabs.query({}, (tabs) => {
        let found = false;

        for (let tab of tabs) {
            if (tab.url === url) {
                found = true;
                chrome.tabs.update(tab.id, { active: true });
                break;
            }
        }
        if (!found) {
            chrome.tabs.create({ url: url });
        }
    });
}
