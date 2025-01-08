on clicking the extension icon (opening the extension) a new tab opens which is basically the dashboard

there dashboard has the follwing layout and working:
the dashboard will be a search text on the top, writing there anything like any text like a categories or tags or any text, without any further actions it should dynamically or say parallely search and display all the items that contains that would be fetched by some function that i will define which takes input of the text from search, note that the fetching is done parallely after every key stroke in the search box. then just like the the search box  there would be a buttons "categories" clicking on which a menu popups nicely containing all the categories available and clicking on that category all the items only from that category gets fetched. And same there is a button for 'tags' as well with similar functions. note that only one of the searching would work at a time from  box, categories and tags, whichever is clicked last overwrites previous results.

and how this works is, there is a shortcut key, say "ctrl+shift+s", by which a simple minimal nice and clean popup opens (in content.js) which takes 4 types of inputs:
1. it automatically takes the current tab url
2. a text input for 'category', clicking on it all the available dashboards should be displayed and on writing in here it should realtime search to match in the availble categories and on clicking on any of them categorires it should put that category in the input, or else if the input is new, then create that new category and save the category and the whole items would be saved in this category now.
3. a simple text input where i would write the tags e.g. "coding, web, ai agents"
4. a text box below where i can write quick short notes if i want to write.

then there would be a save btn which registers this entry and saves to local storage (by this i mean there will a storage system i will create which loads and saves data in locally in files)

Whole UI should look beautiful and minimal. use dark theme. dont use any ugly looking elements.
only use html, css, plain js, yuo can use pre existing elements for UI any lib would work.