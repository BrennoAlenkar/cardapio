const menu = document.querySelector('#menu');
const cartBtn = document.querySelector('#cart-btn');
const cartModal = document.querySelector('#cart-modal');
const cartItemsContainer = document.querySelector('#cart-items');
const cartTotal = document.querySelector('#cart-total');
const checkoutBtn = document.querySelector('#checkout-btn');
const closeModalBtn = document.querySelector('#close-modal-btn');
const cartCounter = document.querySelector('#cart-count');
const addressInput = document.querySelector('#address');
const addressWarn = document.querySelector('#address-warn');

let cart = [];

cartBtn.addEventListener('click', function () {
    cartModal.style.display = 'flex';
    updateCartModal();
})

cartModal.addEventListener('click', function (event) {
    if (event.target === cartModal) {
        cartModal.style.display = 'none'
    }
})

closeModalBtn.addEventListener('click', function () {
    cartModal.style.display = 'none'
})

menu.addEventListener('click', function (event) {
    let parentButton = event.target.closest('.add-to-cart-btn')

    if (parentButton) {
        const name = parentButton.getAttribute("data-name")
        const price = parseFloat(parentButton.getAttribute("data-price"))
        addToCart(name,price)

    }
})

function addToCart(name, price) {
    const existeItem = cart.find(item => item.name === name)

    if (existeItem) {
        existeItem.quantidade += 1;
    } else {
        cart.push({
            name,
            price,
            quantidade: 1,
        })
    }

    updateCartModal()

}

function updateCartModal() {
    cartItemsContainer.innerHTML = '';
    let total = 0;

    cart.forEach(item =>{
        const cartItemElement = document.createElement("div");
        cartItemElement.classList.add("flex", "Justify-between", "mb-4", "flex-col")
        cartItemElement.innerHTML = `
        <div class="flex items-center justify-between">
            <div>
            <p class="font-medium">${item.name}</p>
            <p>Quantidade:${item.quantidade}</p>
            <p class="fonte-medium mt-2">R$${item.price.toFixed(2)}</p>
            </div>

            <button class="remover-btn" data-name="${item.name}">
            Remover
            </button>
        </div>
        `

        total += item.price * item.quantidade;

        cartItemsContainer.appendChild(cartItemElement)
    })

    cartTotal.textContent = total.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });

    cartCounter.innerHTML = cart.length;

}

cartItemsContainer.addEventListener('click', function(event){
    if(event.target.classList.contains("remover-btn")){
        const name = event.target.getAttribute("data-name")
    }
})
