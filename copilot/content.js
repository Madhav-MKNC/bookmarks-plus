document.addEventListener('DOMContentLoaded', function() {
    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
        if (request.action === "addBookmark") {
            addBookmark(request.data);
            sendResponse({status: "success"});
        } else if (request.action === "searchBookmarks") {
            const results = searchBookmarks(request.query);
            sendResponse({status: "success", results: results});
        }
    });
});

function addBookmark(data) {
    const bookmark = {
        title: document.title,
        url: window.location.href,
        category: data.category,
        tags: data.tags,
        notes: data.notes
    };
    chrome.storage.local.get({bookmarks: []}, function(result) {
        const bookmarks = result.bookmarks;
        bookmarks.push(bookmark);
        chrome.storage.local.set({bookmarks: bookmarks});
    });
}

function searchBookmarks(query) {
    let results = [];
    chrome.storage.local.get({bookmarks: []}, function(result) {
        const bookmarks = result.bookmarks;
        results = bookmarks.filter(bookmark => 
            bookmark.title.includes(query) || 
            bookmark.tags.some(tag => tag.includes(query)) ||
            bookmark.notes.includes(query)
        );
    });
    return results;
}