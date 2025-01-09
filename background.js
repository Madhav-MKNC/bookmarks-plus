chrome.commands.onCommand.addListener((command) => {
    if (command === "add-bookmark") {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            const currentUrl = tabs[0].url;
            const viewUrl = `add-bookmark.html?url=${encodeURIComponent(currentUrl)}`;
            chrome.tabs.create({ url: chrome.runtime.getURL(viewUrl) });
        });
    }
});
