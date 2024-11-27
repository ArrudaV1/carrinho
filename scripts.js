// Função para adicionar produtos ao carrinho
function addToCart(productName, productPrice) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let product = { name: productName, price: productPrice, quantity: 1 };

    // Verifica se o produto já está no carrinho
    let existingProductIndex = cart.findIndex(item => item.name === productName);
    if (existingProductIndex > -1) {
        cart[existingProductIndex].quantity++;
    } else {
        cart.push(product);
    }

    // Salva o carrinho no localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Atualiza o contador do carrinho e o tooltip
    updateCartCount();
    updateCartTooltip();
}

// Função para atualizar o contador do carrinho
function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    document.getElementById('cart-count').textContent = cart.length;
}

// Função para atualizar o conteúdo do tooltip ao passar o mouse sobre o carrinho
function updateCartTooltip() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let cartProductsContainer = document.getElementById('cart-products');
    cartProductsContainer.innerHTML = ''; // Limpa o conteúdo atual

    cart.forEach(item => {
        let productItem = document.createElement('li');
        productItem.textContent = `${item.name} x${item.quantity}`;
        cartProductsContainer.appendChild(productItem);
    });
}

// Chama a função ao carregar a página para mostrar o número de itens no carrinho
window.onload = function() {
    updateCartCount();
    updateCartTooltip();
};
