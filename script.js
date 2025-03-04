document.addEventListener("DOMContentLoaded", function () {
    const blogForm = document.getElementById("blogForm");
    const blogPosts = document.getElementById("blogPosts");
    const postList = document.getElementById("postList");

    let storedPosts = JSON.parse(localStorage.getItem("blogPosts")) || [];

    if (blogPosts) {
        storedPosts.forEach((post) => addBlogPostToDOM(post.title, post.content, post.date));
    }

    if (postList) {
        storedPosts.forEach((post, index) => {
            const postDiv = document.createElement("div");
            postDiv.classList.add("post-container");
            postDiv.innerHTML = `
                <h3>Post ${index + 1}</h3>
                <input type="text" value="${post.title}" class="editTitle">
                <textarea class="editContent">${post.content}</textarea>
                <button onclick="saveEdit(${index})">Save</button>
                <button onclick="deletePost(${index})" class="delete-btn">Delete</button>
            `;
            postList.appendChild(postDiv);
        });
    }

    function addBlogPostToDOM(title, content, date) {
        const article = document.createElement("article");
        article.classList.add("blog-entry");
        article.innerHTML = `
            <h2>${title}</h2>
            <p class="date">Published on: ${date}</p>
            <p>${content}</p>
        `;
        blogPosts.appendChild(article);
    }

    if (blogForm) {
        blogForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const title = document.getElementById("title").value;
            const content = document.getElementById("content").value;
            const date = new Date().toLocaleDateString();

            storedPosts.push({ title, content, date });
            localStorage.setItem("blogPosts", JSON.stringify(storedPosts));

            addBlogPostToDOM(title, content, date);
            blogForm.reset();
        });
    }
});

function saveEdit(index) {
    const updatedTitle = document.getElementsByClassName("editTitle")[index].value;
    const updatedContent = document.getElementsByClassName("editContent")[index].value;

    let storedPosts = JSON.parse(localStorage.getItem("blogPosts")) || [];
    storedPosts[index] = { title: updatedTitle, content: updatedContent, date: storedPosts[index].date };
    localStorage.setItem("blogPosts", JSON.stringify(storedPosts));

   
}

function deletePost(index) {
    let storedPosts = JSON.parse(localStorage.getItem("blogPosts")) || [];
    storedPosts.splice(index, 1);
    localStorage.setItem("blogPosts", JSON.stringify(storedPosts));

    
    location.reload(); // Refresh the page to reflect changes
}

