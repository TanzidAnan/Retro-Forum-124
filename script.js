const loadAllPost=async(category) =>{
    console.log(category)
    if(category){

    }
    const res =await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts${category?`?category=${category}`:''}`);
    const data =await res.json();
    displayAllPost(data.posts)
}

const displayAllPost=(posts) =>{
    const postContainer =document.getElementById('post-container');
    posts.forEach(post => {
        console.log(post)
    });
}

const handleSearchByCategory=() =>{
    const searchText =document.getElementById('searchPosts').value;
    console.log(searchText)
    loadAllPost(searchText)
}

loadAllPost()