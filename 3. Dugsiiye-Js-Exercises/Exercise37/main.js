const postForm = document.querySelector("#form");
const inputPost = document.querySelector("#input-post");
const imageUrl = document.querySelector("#image-url");
const paragraph = document.querySelector("#text-area");
const postBtn = document.querySelector("#add-post");
const allPosts = document.querySelector("#all-posts");

document.addEventListener("DOMContentLoaded",loadPosts);

function loadPosts(){
    const posts = getPostsFromLocalStorage();
    console.log(loadPosts)
    posts.forEach(post =>{
       displayPostsToDOM(post)
    })
}

postForm.addEventListener("submit",addPost);


function addPost(e){
    e.preventDefault();
    // const postTittle = inputPost.value.trim();

    if(allPosts !==""){
        const post = {
            tittle:inputPost.value,
            image:imageUrl.value,
            paragraph:paragraph.value
       }
          displayPostsToDOM(post);
          savePosts(post);
          inputPost.value = ""
          imageUrl.value = ""
          paragraph.value = ""
    }
    

}

function displayPostsToDOM(post){
    const postDiv = document.createElement("div");
    postDiv.dataset.id = post.id; 
    postDiv.innerHTML = `<h2> ${post.tittle} </h2>
                     <img src = ${post.image}>
                    <p>${post.paragraph}</p>
                    <div class="buttons">
                        <button class="edit">Edit</button>
                        <button class="delete">Delete</button>
                    </div> `
    allPosts.appendChild(postDiv);
    attachEventListeners(postDiv,post);


}

// function displayPostsToDOM(post){
//     const postDiv = document.createElement("div");
//     postDiv.dataset.id = post.id;

//     postDiv.innerHTML = `
//         <h2>${post.title || "Untitled"}</h2>
//         ${post.image ? `<img src="${post.image}" alt="Post Image">` : ""}
//         <p>${post.paragraph}</p>
//         <div class="buttons">
//             <button class="edit">Edit</button>
//             <button class="delete">Delete</button>
//         </div>
//     `;

//     allPosts.appendChild(postDiv);
//     attachEventListeners(postDiv, post);
// }


function attachEventListeners(postDiv,post){
    const deleteBtn = postDiv.querySelector(".delete");
    const editBtn = postDiv.querySelector(".edit");
    deleteBtn.addEventListener("click",function(){
        handleDelete(post.id,postDiv);
    })
    editBtn.addEventListener("click",function(){
        handleEdit(post.id,postDiv);
    })
}

function handleEdit(postId,postDiv){
    const postTittle = postDiv.querySelector("h2");
    const url = postDiv.querySelector("img");
    const p = postDiv.querySelector("p");
    const newPost = prompt("add a new post tittle:",postTittle.textContent);
    const newUrl = prompt("add a new img URL:", url.getAttribute("src"));
    url.setAttribute("src",newUrl);
    const newP = prompt("add a new Discription:",p.textContent);
    if(newPost!=""){
       postTittle.textContent = newPost;
       url.textContent = newUrl;
       p.textContent = newP;
    }
}

function handleDelete(id ,postDiv){
    let posts = getPostsFromLocalStorage();
    posts = posts.filter(post => post.id != id);
    localStorage.setItem("posts",JSON.stringify(posts));

    if(confirm("Are you sure, You wanna delete this?")){
         postDiv.remove()
    }
   
}

function savePosts(post){
    const oldPosts = getPostsFromLocalStorage();
    oldPosts.push(post);
    localStorage.setItem("posts",JSON.stringify(oldPosts));
}

function  getPostsFromLocalStorage(){
    const oldPosts = JSON.parse(localStorage.getItem("posts")) || [];
    return oldPosts;
}
