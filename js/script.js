// Toggle class active untuk hamburger menu
const navbarNav = document.querySelector('.navbar-nav');  
// ketika hamburger menu diklik
document.querySelector('#hamburger-menu').onclick = () => {
    navbarNav.classList.toggle('active');
};


// Toggle class active untuk search form
const searchForm = document.querySelector('.search-form');
const searchBox = document.querySelector('#search-box');
// Js Carikan saya element yang nama id nya search-button, 
document.querySelector('#search-button').onclick = (e) => { // ketika di click jalankan function (arrow function) berikut 
  searchForm.classList.toggle('active'); // yaitu toggle class active untuk class="search form"
  searchBox.focus();
  e.preventDefault();
}

// klik di luar element
const hamburgerMenu = document.querySelector('#hamburger-menu');
const searchButton = document.querySelector('#search-button');
document.addEventListener('click', function(e){
  if(!hamburgerMenu.contains(e.target) && !navbarNav.contains(e.target)){
    navbarNav.classList.remove('active');
  }
  if(!searchButton.contains(e.target) && !searchForm.contains(e.target)){
    searchForm.classList.remove('active');
  }
});