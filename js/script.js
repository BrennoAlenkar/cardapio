const menu = document.querySelector('#menu');
const cardBtn = document.querySelector('#card-btn');
const cardModal = document.querySelector('#card-modal');
const cartItemsContainer = document.querySelector('card-items');
const cartTotal = document.querySelector('#card-total');
const checkoutBtn = document.querySelector('#checkout-btn');
const closeModalBtn = document.querySelector('#close-modal-btn');
const cartCounter = document.querySelector('#cart-count');
const addressInput = document.querySelector('#address');
const addressWarn = document.querySelector('#address-warn');

cardBtn.addEventListener('click', function(){
    cardModal.style.display = 'flex';
})