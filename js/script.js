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

// Funções de Modal
cartBtn.addEventListener('click', () => { cartModal.style.display = 'flex'; updateCartModal(); });
cartModal.addEventListener('click', (e) => { if(e.target === cartModal) cartModal.style.display = 'none'; });
closeModalBtn.addEventListener('click', () => { cartModal.style.display = 'none'; });

// Adicionar ao Carrinho
menu.addEventListener('click', (event) => {
    let parentButton = event.target.closest('.add-to-cart-btn');
    if (parentButton) {
        addToCart(parentButton.getAttribute("data-name"), parseFloat(parentButton.getAttribute("data-price")));
    }
});

function addToCart(name, price) {
    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantidade += 1;
    } else {
        cart.push({ name, price, quantidade: 1 });
    }
    updateCartModal();
}

// Atualizar Modal
function updateCartModal() {
    cartItemsContainer.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const cartItemElement = document.createElement("div");
        cartItemElement.className = "flex justify-between mb-4 flex-col";
        cartItemElement.innerHTML = `
            <div class="flex items-center justify-between">
                <div>
                    <p class="font-medium">${item.name}</p>
                    <p>Qtd: ${item.quantidade}</p>
                    <p class="font-medium mt-2">R$ ${(item.price * item.quantidade).toFixed(2)}</p>
                </div>
                <button class="remover-btn text-red-500" data-name="${item.name}">Remover</button>
            </div>`;
        total += item.price * item.quantidade;
        cartItemsContainer.appendChild(cartItemElement);
    });

    cartTotal.textContent = total.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
    cartCounter.innerText = cart.reduce((acc, item) => acc + item.quantidade, 0);
}

// Remover Item
cartItemsContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains("remover-btn")) {
        const name = e.target.getAttribute("data-name");
        const index = cart.findIndex(item => item.name === name);
        if (cart[index].quantidade > 1) {
            cart[index].quantidade -= 1;
        } else {
            cart.splice(index, 1);
        }
        updateCartModal();
    }
});

// Finalizar Pedido
checkoutBtn.addEventListener("click", () => {
    if (!checkAberto()) {
        Toastify({ text: "Restaurante fechado!", duration: 3000, style: { background: "#EF4444" } }).showToast();
        return;
    }
    if (cart.length === 0) return;
    if (addressInput.value === "") {
        addressWarn.classList.remove("hidden");
        return;
    }

    const msg = cart.map(i => `${i.name} (Qtd: ${i.quantidade})`).join(" | ");
    window.open(`https://wa.me/5562993002421?text=${encodeURIComponent(msg)} Endereço: ${addressInput.value}`, "_blank");
    cart = [];
    updateCartModal();
    cartModal.style.display = 'none';
});

// Validação de Horário
function checkAberto() {
    const hora = new Date().getHours();
    return hora >= 18 && hora < 23;
}

const spanItem = document.querySelector("#date-span");
if (checkAberto()) {
    spanItem.classList.replace("bg-red-500", "bg-green-600");
}