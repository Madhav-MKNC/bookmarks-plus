chrome.commands.onCommand.addListener((command) => {
    if (command === "add-bookmark") {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (chrome.runtime.lastError) {
                console.log("⚠️ Error querying tabs:", chrome.runtime.lastError);
            }
            if (tabs.length === 0) {
                console.log("⚠️ No active tab found.");
            }

            const currentUrl = tabs[0].url;
            const viewUrl = `app/add-bookmark.html?url=${encodeURIComponent(currentUrl)}`;

            chrome.tabs.create({ url: chrome.runtime.getURL(viewUrl) }, (tab) => {
                if (chrome.runtime.lastError) {
                    console.error("Error creating tab:", chrome.runtime.lastError);
                }
            });
        });
    }
});
