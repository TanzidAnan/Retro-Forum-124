const loadAllPost=async(category) =>{
    console.log(category)
    if(category){
        
    }
    const res =await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${category}`);
    const data =await res.json();
    console.log(data.posts)
}

const handleSearchByCategory=() =>{
    const searchText =document.getElementById('searchPosts').value;
    console.log(searchText)
    loadAllPost(searchText)
}

loadAllPost()