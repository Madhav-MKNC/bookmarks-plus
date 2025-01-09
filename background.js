chrome.commands.onCommand.addListener(function (command) {
    if (command.startsWith("open-popup")) {
        // Check if there is an active tab in the current window
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            if (tabs && tabs.length > 0) {
                // Active tab exists, proceed with the action
                chrome.action.openPopup();
            } else {
                // No active tab, log an error or handle it
                console.error("No active tab found.");
            }
        });
    }
});
