// script.js

// Função para carregar os itens do carrinho
function carregarCarrinho() {
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    const carrinhoDiv = document.getElementById('carrinho');
    const totalDiv = document.getElementById('total');
    const finalizarCompraBtn = document.getElementById('finalizar-compra');
    
    // Limpar carrinho
    carrinhoDiv.innerHTML = '';
    if (carrinho.length === 0) {
        carrinhoDiv.innerHTML = '<p>Seu carrinho está vazio</p>';
        totalDiv.style.display = 'none';
        finalizarCompraBtn.style.display = 'none';
    } else {
        let total = 0;
        carrinho.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.innerHTML = `
                <p>${item.nome} - R$ ${item.preco.toFixed(2)} x ${item.quantidade}</p>
                <button class="remover" data-id="${item.id}">Remover</button>
            `;
            carrinhoDiv.appendChild(itemDiv);
            total += item.preco * item.quantidade;
        });

        totalDiv.style.display = 'block';
        totalDiv.innerHTML = `<p>Total: R$ ${total.toFixed(2)}</p>`;
        finalizarCompraBtn.style.display = 'block';
    }
}

// Função para adicionar um produto ao carrinho
function adicionarAoCarrinho(produto) {
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    const itemExistente = carrinho.find(item => item.id === produto.id);

    if (itemExistente) {
        itemExistente.quantidade += 1;
    } else {
        produto.quantidade = 1;
        carrinho.push(produto);
    }

    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    carregarCarrinho();
}

// Função para remover um produto do carrinho
function removerDoCarrinho(id) {
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    const index = carrinho.findIndex(item => item.id === id);

    if (index !== -1) {
        carrinho.splice(index, 1);
        localStorage.setItem('carrinho', JSON.stringify(carrinho));
        carregarCarrinho();
    }
}

// Função para finalizar a compra
function finalizarCompra() {
    alert('Compra finalizada! Obrigado por comprar conosco.');
    localStorage.removeItem('carrinho');
    carregarCarrinho();
}

// Adicionar evento de clique nos botões de adicionar ao carrinho
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
        const produto = {
            id: this.getAttribute('data-id'),
            nome: this.getAttribute('data-nome'),
            preco: parseFloat(this.getAttribute('data-preco')),
        };
        adicionarAoCarrinho(produto);
    });
});

// Adicionar evento de clique nos botões de remover do carrinho
document.getElementById('carrinho').addEventListener('click', function(event) {
    if (event.target.classList.contains('remover')) {
        const produtoId = event.target.getAttribute('data-id');
        removerDoCarrinho(produtoId);
    }
});

// Adicionar evento de clique para finalizar compra
document.getElementById('finalizar-compra').addEventListener('click', finalizarCompra);

// Carregar o carrinho ao carregar a página
window.onload = carregarCarrinho;
