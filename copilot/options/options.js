// This file contains the JavaScript logic for the options page, handling user input and saving settings.

document.addEventListener('DOMContentLoaded', function() {
    const saveButton = document.getElementById('save-settings');
    const categoryInput = document.getElementById('category-input');
    const tagInput = document.getElementById('tag-input');
    const noteInput = document.getElementById('note-input');

    // Load saved settings
    chrome.storage.local.get(['categories', 'tags', 'notes'], function(data) {
        if (data.categories) {
            categoryInput.value = data.categories.join(', ');
        }
        if (data.tags) {
            tagInput.value = data.tags.join(', ');
        }
        if (data.notes) {
            noteInput.value = data.notes.join(', ');
        }
    });

    // Save settings
    saveButton.addEventListener('click', function() {
        const categories = categoryInput.value.split(',').map(item => item.trim());
        const tags = tagInput.value.split(',').map(item => item.trim());
        const notes = noteInput.value.split(',').map(item => item.trim());

        chrome.storage.local.set({ categories, tags, notes }, function() {
            alert('Settings saved successfully!');
        });
    });
});