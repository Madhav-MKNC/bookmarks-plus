document.getElementById('save').addEventListener('click', function() {
    const category = document.getElementById('category').value;
    const tags = document.getElementById('tags').value.split(',');
    const notes = document.getElementById('notes').value;

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        const activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, {
            action: "addBookmark",
            data: {category, tags, notes}
        }, function(response) {
            if (response.status === "success") {
                alert("Bookmark added successfully!");
            }
        });
    });
});