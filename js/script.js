const menu = document.querySelector('#model');
const btnCard = document.querySelector('#card-btn')
const corpo = document.querySelector('body');



function mostrarModel() {
    menu.style.display = 'flex'

}

function voltarNormal() {
    menu.style.display = 'hidden'
}

btnCard.onclick = mostrarModel;
