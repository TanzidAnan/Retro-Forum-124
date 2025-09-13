const loadAllPost = async (category) => {
    document.getElementById('post-container').innerHTML = '';
    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts${category ? `?category=${category}` : ''}`);
    const data = await res.json();
    displayAllPost(data.posts)
}

const displayAllPost = (posts) => {
    const postContainer = document.getElementById('post-container');
    posts.forEach(post => {
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="p-6 lg:p-12 flex lg:flex-row flex-col items-center lg:items-start bg-slate-300 rounded-3xl">
          <div class="indicator ">
            <div class="avatar mr-8">
              <div class="w-[200px] h-[200px] rounded-full">
                <img src=${post.image} alt="">
              </div>
            </div>
            <div class="space-y-4 w-full">
              <div class="flex gap-4 *:opacity-60">
                <p># category</p>
                <p>Author: ${post.author.name}</p>
              </div>
              <h3 class="text-2xl font-bold opacity-70">${post.title}</h3>
              <p class="opacity-40">${post.description}</p>
              <hr class="border border-gray-300">
              <div class="flex justify-between *:font-bold [&>*:not(:last-child)]:opacity-45">
                <div class="flex gap-4">
                  <div class="space-x-2 flex items-center ">
                    <i class="fa-regular fa-comment-dots"></i>
                    <p>${post.comment_count}</p>
                  </div>
                  <div class="space-x-2 flex items-center">
                    <i class="fa-regular fa-eye"></i>
                    <p>${post.view_count}</p>
                  </div>
                  <div class="space-x-2 flex items-center">
                    <i class="fa-regular fa-eye"></i>
                    <p>${post.posted_time}</p>
                  </div>
                </div>
              </div>
              <div class="opacity-100 btn px-5">
                <button id="addToList" onclick="markAsRead('${post.description}','${post.view_count}')" class="addToList btn btn-circle bg-green-500 btn-sm">
                  <i class="fa-solid fa-landmark text-white"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
    `;
        postContainer.appendChild(div)
    });
}

// markAsRead function with localStorage persistence
const markAsRead = (description, view_count) => {
    console.log(description, view_count);

    // save to localStorage
    let savedPosts = JSON.parse(localStorage.getItem("markedPosts")) || [];
    const newPost = { description, view_count };
    savedPosts.push(newPost);
    localStorage.setItem("markedPosts", JSON.stringify(savedPosts));

    // display in DOM
    displayMarkedPost(newPost);
    handleCount();
}

// helper function to display marked posts
const displayMarkedPost = (post) => {
    const markAsReadContainer = document.getElementById('markAsReadContainer');
    const div = document.createElement('div');
    div.innerHTML = `
    <div class="flex justify-between px-5 lg:p-3 bg-white rounded-2xl items-center gap-3">
      <div class="lg:w-4/5 w-11/12 ">
        <p>${post.description}</p>
        <div class="lg:w-full w-4/12 flex justify-between gap-5 mt-3">
          <p><i class="fa-solid fa-cart-shopping"></i><span class="text-red-700 ml-3">${post.view_count}</span></p>
        </div>
      </div>
    </div>
  `;
    markAsReadContainer.appendChild(div);
}

// counter function
const handleCount = () => {
    const prevCount = document.getElementById('markAsReadCounter').innerText;
    const converToCounter = parseInt(prevCount);
    const sum = converToCounter + 1;
    document.getElementById('markAsReadCounter').innerText = sum;
}

// search handler
const handleSearchByCategory = () => {
    const searchText = document.getElementById('searchPosts').value;
    console.log(searchText)
    loadAllPost(searchText)
}

// add product function
const addProduct = () => {
    const name = document.getElementById('product-name').value;
    const qty = document.getElementById('product-quantity').value;
    console.log("Product:", name, "Quantity:", qty);
    displayData(name, qty);
    saveproductToLocalStorage(name, qty)
};

const displayData = (name, qty) => {
    const ulContent = document.getElementById('list-container');
    const li = document.createElement('li');
    li.innerText = `name ${name} and ${qty}`;

    ulContent.appendChild(li);
}


const getStoredShoppingCard = () => {
    const storeCard = localStorage.getItem('cart');
    let cart = {}
    if (storeCard) {
        cart = JSON.parse(storeCard)
    }
    return cart
}

const saveproductToLocalStorage = (product, quantity) => {
    const cart = getStoredShoppingCard();
    cart[product] =quantity;
    const cartStringified =JSON.stringify(cart);
    localStorage.setItem('cart',cartStringified)

}

const displayProductLocalStrog =() =>{
    const saveCart =getStoredShoppingCard();
    for(const product in saveCart){
        const quentati =saveCart[product]
        displayData(product,quentati)
    }

}
displayProductLocalStrog()

// reload page persistence
window.addEventListener("DOMContentLoaded", () => {
    let savedPosts = JSON.parse(localStorage.getItem("markedPosts")) || [];
    savedPosts.forEach(post => displayMarkedPost(post));

    // update counter
    document.getElementById('markAsReadCounter').innerText = savedPosts.length;

    // initial load posts
    loadAllPost();
});