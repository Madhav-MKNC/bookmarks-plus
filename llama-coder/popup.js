document.getElementById("view-bookmark-btn").addEventListener("click", openViewBookmark);

function openViewBookmark() {
    // Fetch data from storage or some source
    const bookmarkData = {
        title: "Sample Bookmark Title",
        url: "https://example.com",
        category: "Personal",
        tags: "tag1, tag2, tag3",
        notes: "Sample notes about this bookmark."
    };

    // Open the View Bookmark in the popup
    openPopup(bookmarkData);
}

function openPopup(bookmarkData) {
    const popupContent = document.getElementById("popup-content");

    // Dynamically load the View Bookmark form
    popupContent.innerHTML = `
        <div class="container">
            <div class="form-container">
                <div class="left-column">
                    <h2>View Bookmark</h2>
                    <form>
                        <label for="title">Title *</label>
                        <input type="text" id="title" value="${bookmarkData.title}" readonly />
                        
                        <label for="url">URL *</label>
                        <input type="url" id="url" value="${bookmarkData.url}" readonly />
                        
                        <label for="category">Category *</label>
                        <input type="text" id="category" value="${bookmarkData.category}" readonly />
                        
                        <label for="tags">Tags</label>
                        <input type="text" id="tags" value="${bookmarkData.tags}" readonly />
                        
                        <div class="form-actions">
                            <button type="button" class="edit-btn" id="edit-btn">Edit</button>
                            <button type="button" class="delete-btn hidden" id="delete-btn" onclick="deleteBookmark()">Delete</button>
                            <button type="submit" class="save-btn hidden" id="save-btn">Save</button>
                        </div>
                    </form>
                </div>
                <div class="right-column">
                    <label for="notes">Notes</label>
                    <textarea id="notes" readonly>${bookmarkData.notes}</textarea>
                </div>
            </div>
        </div>
    `;

    // Add the Edit functionality to the dynamically generated elements
    setupEditDeleteSave();
}

function setupEditDeleteSave() {
    const editBtn = document.getElementById("edit-btn");
    const saveBtn = document.getElementById("save-btn");
    const deleteBtn = document.getElementById("delete-btn");
    const inputs = document.querySelectorAll("input, textarea");
    const heading = document.querySelector("h2");

    editBtn.addEventListener("click", () => {
        inputs.forEach(input => input.removeAttribute("readonly"));
        editBtn.classList.add("hidden");
        saveBtn.classList.remove("hidden");
        deleteBtn.classList.remove("hidden");

        heading.textContent = "Edit Bookmark";
    });

    // Here you can add save logic for saving the edited bookmark to storage or backend
}

function deleteBookmark() {
    alert("Bookmark Deleted!");
}
