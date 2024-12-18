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
});

cartModal.addEventListener('click', function (event) {
    if (event.target === cartModal) {
        cartModal.style.display = 'none';
    }
});

closeModalBtn.addEventListener('click', function () {
    cartModal.style.display = 'none';
});

menu.addEventListener('click', function (event) {
    let parentButton = event.target.closest('.add-to-cart-btn');

    if (parentButton) {
        const name = parentButton.getAttribute("data-name");
        const price = parseFloat(parentButton.getAttribute("data-price"));
        addToCart(name, price);
    }
});

function addToCart(name, price) {
    const existeItem = cart.find(item => item.name === name);

    if (existeItem) {
        existeItem.quantidade += 1;
    } else {
        cart.push({
            name,
            price,
            quantidade: 1,
        });
    }

    updateCartModal();
}

function updateCartModal() {
    cartItemsContainer.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const cartItemElement = document.createElement("div");
        cartItemElement.classList.add("flex", "justify-between", "mb-4", "flex-col");
        cartItemElement.innerHTML = `
        <div class="flex items-center justify-between">
            <div>
                <p class="font-medium">${item.name}</p>
                <p>Quantidade: ${item.quantidade}</p>
                <p class="font-medium mt-2">R$${item.price.toFixed(2)}</p>
            </div>
            <button class="remover-btn" data-name="${item.name}">
                Remover
            </button>
        </div>
        `;

        total += item.price * item.quantidade;

        cartItemsContainer.appendChild(cartItemElement);
    });

    cartTotal.textContent = total.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });

    cartCounter.innerHTML = cart.reduce((sum, item) => sum + item.quantidade, 0); // Atualização do contador
}

cartItemsContainer.addEventListener('click', function (event) {
    if (event.target.classList.contains("remover-btn")) {
        const name = event.target.getAttribute("data-name");
        removeItemCart(name);
    }
});

function removeItemCart(name) {
    const index = cart.findIndex(item => item.name === name);

    if (index !== -1) {
        const item = cart[index];

        if (item.quantidade > 1) {
            item.quantidade -= 1;
            updateCartModal();
            return;
        }

        cart.splice(index, 1);
        updateCartModal();
    }
}

addressInput.addEventListener("input", function (event) {
    let inputValue = event.target.value;

    if (inputValue !== "") {
        addressInput.classList.remove("border-red-500");
        addressWarn.classList.add("hidden");
    }
});

checkoutBtn.addEventListener("click", function () {
    const isOpen = checkAberto();
    if (!isOpen) {
        Toastify({
            text: "Ops, restaurante fechado no momento!",
            duration: 3000,
            close: true,
            gravity: "top",
            position: "right",
            stopOnFocus: true,
            style: {
                background: "#CC0000",
            },
        }).showToast();
        return;
    }

    if (cart.length === 0) return;
    if (addressInput.value === "") {
        addressWarn.classList.remove("hidden");
        addressInput.classList.add("border-red-500");
        return;
    }

    const cartItems = cart.map((item) => {
        return ` ${item.name} Quantidade: (${item.quantidade}) Preço: R$${item.price.toFixed(2)}|`;
    }).join("");

    const msg = encodeURIComponent(cartItems);
    const phone = "62993002421";

    window.open(`https://wa.me/${phone}?text=${msg} Endereço: ${addressInput.value}`, "_blank");

    // Notificar sucesso
    Toastify({
        text: "Pedido enviado com sucesso!",
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
            background: "#4caf50",
        },
    }).showToast();

    cart = [];
    updateCartModal();
});

function checkAberto() {
    const hora = 18; // Definindo a hora como 18hrs
    return hora >= 18 && hora <= 23; // Aberto entre 18h e 23hrs
}


const spanItem = document.querySelector("#date-span");
const isOpen = checkAberto();

if (isOpen) {
    spanItem.classList.remove("bg-red-500");
    spanItem.classList.add("bg-green-600");
} else {
    spanItem.classList.remove("bg-green-600");
    spanItem.classList.add("bg-red-500");
}

