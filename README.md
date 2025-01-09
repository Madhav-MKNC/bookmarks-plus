# Chrome Extension: Info Manager Tool - "Bookmarks-plus"

## Overview:

This Chrome extension will allow users to manage bookmarks with additional functionalities, including the ability to categorize, tag, and add short notes/memos to each bookmark. Data will be saved locally on the user's device in a designated folder associated with the extension.

## Features:

1. Shortcut & Categorization:

    - Users can press a shortcut key to choose a category in which to save the bookmark or create a new category.
    - Users can input tags (multiple tags separated by commas) and add short notes/memos to the bookmark.

2. Local Data Storage:

    - All data (bookmarks, categories, tags, and notes) will be saved locally in a folder associated with the extension.

3. Dashboard:

    - Clicking on the extension icon or opening the extension will display a simple, modern, minimal dashboard.
    - At the top of the dashboard, there will be a search box. Users can type any text (such as categories, tags, or keywords) in the search box.
        - The search will dynamically fetch and display matching results as the user types (parallel search on every keystroke).
        - A function will be defined to handle the search, taking the text input from the search box.

4. Category Search:

    - There will be a "Categories" button in the UI. Clicking this button will open a menu containing all available categories.
    - When a category is selected, only the items from that specific category will be fetched and displayed.

5. Tag Search:

    - There will also be a "Tags" button in the UI. Clicking this button will open a menu containing all available tags.
    - Selecting a tag will display only items associated with that tag.

6. Search Behavior:
    - At any given time, only one of the search methods (search box, categories, or tags) will be active.
    - Whichever search method is clicked last will overwrite the previous results and be used for filtering.

## UI Design:

-   The user interface should be visually appealing, modern, and minimalistic, with a dark theme.
-   Avoid using any unattractive or outdated UI elements.
-   The layout should be clean and intuitive, with smooth transitions and interactions.
-   Use HTML, CSS, and plain JavaScript to build the UI. Pre-existing UI elements or libraries can be used as long as they align with the design philosophy.

## Project structure:

```
bookmarks-plus/
├── manifest.json
├── background/
│   └── background.js
├── popup/
│   ├── popup.html
│   ├── popup.css
│   └── popup.js
├── content/
│   └── content.js
├── storage/
│   └── storage-manager.js
├── utils/
│   ├── search.js
│   └── helpers.js
└── assets/
    └── icons/
```
