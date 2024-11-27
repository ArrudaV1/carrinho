// Função para exibir os itens no carrinho
function displayCart() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let cartItemsContainer = document.getElementById('cart-items');
    let cartTotalContainer = document.getElementById('cart-total');
    cartItemsContainer.innerHTML = ''; // Limpa o conteúdo atual

    let total = 0;

    cart.forEach(item => {
        let itemDiv = document.createElement('div');
        itemDiv.classList.add('cart-item');
        itemDiv.innerHTML = `
            <h3>${item.name}</h3>
            <p>R$ ${item.price} x ${item.quantity}</p>
            <button onclick="removeFromCart('${item.name}')">Remover</button>
        `;
        cartItemsContainer.appendChild(itemDiv);
        total += item.price * item.quantity;
    });

    cartTotalContainer.innerHTML = `<h3>Total: R$ ${total.toFixed(2)}</h3>`;
}

// Função para remover um produto do carrinho
function removeFromCart(productName) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.name !== productName); // Remove o item
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart(); // Atualiza a visualização do carrinho
}

// Função para limpar o carrinho
function clearCart() {
    localStorage.removeItem('cart');
    displayCart(); // Atualiza a visualização do carrinho
}

// Exibe os itens do carrinho quando a página carregar
window.onload = displayCart;
