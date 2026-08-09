// ===================================================
// 1. NAVBAR, SEARCH, & SHOPPING CART TOGGLE (SAFE GUARDED)
// ===================================================

const navbarNav = document.querySelector('.navbar-nav');
const hamburgerMenu = document.querySelector('#hamburger-menu');

// Toggle Hamburger Menu
if (hamburgerMenu && navbarNav) {
    hamburgerMenu.onclick = (e) => {
        navbarNav.classList.toggle('active');
        e.preventDefault();
    };
}

// Toggle Search Form
const searchForm = document.querySelector('.search-form');
const searchBox = document.querySelector('#search-box');
const searchButton = document.querySelector('#search-button');

if (searchButton && searchForm) {
    searchButton.onclick = (e) => {
        searchForm.classList.toggle('active');
        if (searchBox) searchBox.focus();
        e.preventDefault();
    };
}

// Toggle Shopping Cart Sidebar
const shoppingCartContainer = document.querySelector('.shopping-cart');
const shoppingCartButton = document.querySelector('#shopping-cart-button');

if (shoppingCartButton && shoppingCartContainer) {
    shoppingCartButton.onclick = (e) => {
        shoppingCartContainer.classList.toggle('active');
        e.preventDefault();
    };
}

// Click Outside Handler (Tutup menu/cart saat klik di luar)
document.addEventListener('click', function (e) {
    if (hamburgerMenu && navbarNav && !hamburgerMenu.contains(e.target) && !navbarNav.contains(e.target)) {
        navbarNav.classList.remove('active');
    }
    if (searchButton && searchForm && !searchButton.contains(e.target) && !searchForm.contains(e.target)) {
        searchForm.classList.remove('active');
    }
    if (shoppingCartButton && shoppingCartContainer && !shoppingCartButton.contains(e.target) && !shoppingCartContainer.contains(e.target)) {
        shoppingCartContainer.classList.remove('active');
    }
});


// ===================================================
// 2. MODAL BOX (EVENT DELEGATION UNTUK DATA DINAMIS)
// ===================================================

const itemDetailModal = document.querySelector('#item-detail-modal');
const closeModalIcon = document.querySelector('.modal .close-icon');

// Gunakan Event Delegation agar button hasil fetch dari MariaDB tetap bisa diklik
document.addEventListener('click', (e) => {
    const detailBtn = e.target.closest('.item-detail-button');
    if (detailBtn && itemDetailModal) {
        e.preventDefault();
        itemDetailModal.style.display = 'flex';
    }
});

// Close Modal Icon
if (closeModalIcon && itemDetailModal) {
    closeModalIcon.onclick = (e) => {
        itemDetailModal.style.display = 'none';
        e.preventDefault();
    };
}

// Click Outside Modal Content
window.onclick = (e) => {
    if (itemDetailModal && e.target === itemDetailModal) {
        itemDetailModal.style.display = 'none';
    }
};


// ===================================================
// 3. FETCHING & RENDER DATA DINAMIS DARI EXPRESS / MARIADB
// ===================================================

document.addEventListener('DOMContentLoaded', () => {
    const menuContainer = document.querySelector('#menu-container');
    const productsContainer = document.querySelector('#products-container');

    // Jika sedang berada di menu.html
    if (menuContainer) {
        fetch('/api/products/menu')
            .then(res => res.json())
            .then(data => renderMenu(data, menuContainer))
            .catch(err => console.error('Gagal load menu:', err));
    }

    // Jika sedang berada di products.html
    if (productsContainer) {
        fetch('/api/products/beans')
            .then(res => res.json())
            .then(data => renderProducts(data, productsContainer))
            .catch(err => console.error('Gagal load products:', err));
    }

    initCart();
    if (window.feather) feather.replace();
});

// Helper Render Menu (Makanan/Minuman)
function renderMenu(items, container) {
    if (!items || items.length === 0) return;
    container.innerHTML = items.map(item => `
        <div class="menu-full-card">
            <div class="menu-card-img-wrapper">
                <img src="/${item.image_path}" alt="${item.name}">
            </div>
            <h3 class="menu-full-title">${item.name}</h3>
            <p class="menu-full-desc">${item.description}</p>
            <div class="menu-full-footer">
                <span class="menu-full-price">$${item.price}</span>
                <button class="btn-quick-add" title="Quick add to cart"><i data-feather="plus"></i></button>
            </div>
        </div>
    `).join('');
    
    if (window.feather) feather.replace();
}

// Shopping cart dynamic helper
const CART_STORAGE_KEY = 'duskCoffeeCart';
let cartItems = [];

function initCart() {
    cartItems = loadCart();
    renderCart();
}

function loadCart() {
    try {
        const savedCart = localStorage.getItem(CART_STORAGE_KEY);
        return savedCart ? JSON.parse(savedCart) : [];
    } catch (err) {
        console.error('Gagal membaca cart dari localStorage:', err);
        return [];
    }
}

function saveCart() {
    try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch (err) {
        console.error('Gagal menyimpan cart ke localStorage:', err);
    }
}

function formatCurrency(amount) {
    return `$${amount.toFixed(2)}`;
}

function renderCart() {
    const cartItemsContainer = document.querySelector('#cart-items-container');
    const cartTotalPriceEl = document.querySelector('#cart-total-price');

    if (!cartItemsContainer || !cartTotalPriceEl) {
        return;
    }

    if (cartItems.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="empty-cart-placeholder">
                <i data-feather="shopping-bag" class="empty-icon"></i>
                <p>Your cart is empty</p>
                <span>Add some coffee magic! ☕</span>
            </div>
        `;
    } else {
        cartItemsContainer.innerHTML = cartItems.map(item => `
            <div class="cart-item" data-cart-id="${item.id}">
                ${item.image ? `<img src="${item.image}" alt="${item.name}">` : ''}
                <div class="item-details">
                    <h3>${item.name}</h3>
                    <div class="item-price">${formatCurrency(item.price)}</div>
                    <div class="item-qty">Qty: ${item.quantity}</div>
                </div>
                <i data-feather="trash-2" class="remove-item"></i>
            </div>
        `).join('');
    }

    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    cartTotalPriceEl.textContent = formatCurrency(total);
    if (window.feather) feather.replace();
}

function buildCartItemData(card) {
    if (!card) return null;

    const nameEl = card.querySelector('h3, .product-card-title, .menu-full-title');
    const priceEl = card.querySelector('.product-full-price, .menu-full-price, .product-price');
    const imageEl = card.querySelector('img');

    const name = nameEl ? nameEl.textContent.trim() : null;
    const priceText = priceEl ? priceEl.textContent.trim() : '';
    const priceMatch = priceText.match(/\$\s*([0-9]+(?:\.[0-9]+)?)/);
    const price = priceMatch ? Number(priceMatch[1]) : null;
    const image = imageEl ? imageEl.src : '';

    if (!name || !price) return null;

    const id = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    return { id, name, price, image, quantity: 1 };
}

function addToCart(item) {
    const existingItem = cartItems.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cartItems.push(item);
    }
    saveCart();
    renderCart();
}

function removeFromCart(itemId) {
    cartItems = cartItems.filter(item => item.id !== itemId);
    saveCart();
    renderCart();
}

function handleCartAction(event) {
    const addButton = event.target.closest('.btn-add-to-cart, .btn-quick-add, .add-cart-action');
    if (addButton) {
        event.preventDefault();
        const card = addButton.closest('.product-full-card, .menu-full-card, .product-card');
        const item = buildCartItemData(card);
        if (item) {
            addToCart(item);
        }
        return;
    }

    const cartRemove = event.target.closest('.remove-item');
    if (cartRemove) {
        event.preventDefault();
        const cartItem = cartRemove.closest('.cart-item');
        if (cartItem?.dataset.cartId) {
            removeFromCart(cartItem.dataset.cartId);
        }
    }
}

document.addEventListener('click', handleCartAction);

// Helper Render Products (Biji Kopi/Merch)
function renderProducts(items, container) {
    if (!items || items.length === 0) return;
    container.innerHTML = items.map(item => `
        <div class="product-full-card">
            <div class="product-card-hover-icons">
                <a href="#" class="item-detail-button" title="Quick View"><i data-feather="eye"></i></a>
                <a href="#" title="Add to Wishlist"><i data-feather="heart"></i></a>
            </div>
            <div class="product-card-img-wrapper">
                <img src="/${item.image_path}" alt="${item.name}">
            </div>
            <h3 class="product-full-title">${item.name}</h3>
            <p class="product-full-desc">${item.description}</p>
            <div class="product-full-stars">
                <i data-feather="star" class="star-full"></i>
                <i data-feather="star" class="star-full"></i>
                <i data-feather="star" class="star-full"></i>
                <i data-feather="star" class="star-full"></i>
                <i data-feather="star" class="star-full"></i>
            </div>
            <div class="product-full-footer">
                <div class="product-price-block">
                    <span class="product-full-price">$${item.price}</span>
                </div>
                <button class="btn-add-to-cart">
                    <i data-feather="shopping-cart"></i>
                    <span>Add to Cart</span>
                </button>
            </div>
        </div>
    `).join('');

    if (window.feather) feather.replace();
}