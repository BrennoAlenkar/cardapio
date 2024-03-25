const menu = document.querySelector('#menu');
const cardBtn = document.querySelector('#card-btn');
const cardModal = document.querySelector('#card-modal');
const cardItemsContainer = document.querySelector('#card-items');
const cardTotal = document.querySelector('#card-total');
const checkoutBtn = document.querySelector('#checkout-btn');
const closeModalBtn = document.querySelector('#close-modal-btn');
const cardCounter = document.querySelector('#cart-count');
const addressInput = document.querySelector('#address');
const addressWarn = document.querySelector('#address-warn');

cardBtn.addEventListener('click', function(){
    cardModal.style.display = 'flex';
})

cardModal.addEventListener('click', function(event){
    if(event.target === cardModal) {
        cardModal.style.display = 'none'
    }
})

closeModalBtn.addEventListener('click', function(){
    cardModal.style.display = 'none'
})

menu.addEventListener('click', function(event){
    let parentButton = event.target.closest('.add-to-card-btn')

    if(parentButton) {
        const name = parentButton.getAttribute("data-name")
        const price = parentButton.getAttribute("data-price")
    }
})

62 98101-2014