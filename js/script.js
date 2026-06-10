// Toggle class active untuk hamburger menu
const navbarNav = document.querySelector('.navbar-nav');  
// ketika hamburger menu diklik
document.querySelector('#hamburger-menu').onclick = () => {
    navbarNav.classList.toggle('active');
};

// Toggle class active untuk search form
const searchForm = document.querySelector('.search-form');
const searchBox = document.querySelector('#search-box');
// Js Carikan saya element yang nama id nya #search-button, 
document.querySelector('#search-button').onclick = (e) => { // ketika di click jalankan function (arrow function) berikut 
  searchForm.classList.toggle('active'); // yaitu toggle class active untuk class="search form"
  searchBox.focus();
  e.preventDefault();
}

// Toggle class active untuk shopping cart
const shoppingCartContainer = document.querySelector('.shopping-cart');
document.querySelector('#shopping-cart-button').onclick = (e) => {
  shoppingCartContainer.classList.toggle('active');
  e.preventDefault();
}



// klik di luar element
const hamburgerMenu = document.querySelector('#hamburger-menu');
const searchButton = document.querySelector('#search-button');
const shoppingCartButton = document.querySelector('#shopping-cart-button');
document.addEventListener('click', function(e){
  if(!hamburgerMenu.contains(e.target) && !navbarNav.contains(e.target)){
    navbarNav.classList.remove('active');
  }
  if(!searchButton.contains(e.target) && !searchForm.contains(e.target)){
    searchForm.classList.remove('active');
  }
  // e.preventDefault(); gw tambahin ini malah ngaruh ke semua <a> nya
  if(!shoppingCartButton.contains(e.target) && !shoppingCartContainer.contains(e.target)){
    shoppingCartContainer.classList.remove('active');
  }
});


// Modal Box
const itemDetailModal = document.querySelector('#item-detail-modal');
const itemDetailButtons = document.querySelectorAll('.item-detail-button');

itemDetailButtons.forEach((btn) => {
  btn.onclick = (e) => {
    itemDetailModal.style.display = 'flex';
    e.preventDefault();
  };
});


// Click close modal button
document.querySelector('.modal .close-icon').onclick = (e) => {
  itemDetailModal.style.display = 'none';
  e.preventDefault();
}
// Click outisde modal content
window.onclick = (e) => {
  if (e.target === itemDetailModal) {
    itemDetailModal.style.display = 'none';
  }
}