// Função para popular os cards
function popularPizzas(tab = 'pizzas') {
    const container = document.querySelector('.cardapio-grid');
    const template = container.querySelector('.template');

    // Limpa cards antigos
    container.querySelectorAll('.item-cardapio:not(.template)').forEach(el => el.remove());

    // Filtra pizzas por aba
    const pizzasFiltradas = pizzaJson.filter(pizza => pizza.type === tab);

    pizzasFiltradas.forEach(pizza => {
        const clone = template.cloneNode(true);
        clone.classList.remove('template');

        clone.querySelector('img').src = pizza.img;
        clone.querySelector('img').alt = pizza.name;
        clone.querySelector('h3').textContent = pizza.name;
        clone.querySelector('p').textContent = pizza.description;
        const preco = pizza.price.length > 1 ? pizza.price[1] : pizza.price[0];
        clone.querySelector('span').textContent = `R$ ${preco.toFixed(2)}`;

        // Evento do botão "Comprar"
        const btnModal = clone.querySelector('.btn-card');
        btnModal.addEventListener('click', (e) => {
            e.stopPropagation();
            abrirModal(pizza);
        });

        container.appendChild(clone);
    });
}

// Lógica das abas
const tabs = document.querySelectorAll('.tab-btn');
tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const tabName = tab.getAttribute('data-tab');
        popularPizzas(tabName);
    });
});

// Modal
const modalOverlay = document.querySelector('.modal-overlay');
const modal = {
    img: document.querySelector('.modal-img'),
    title: document.querySelector('.modal-title'),
    description: document.querySelector('.modal-description'),
    price: document.querySelector('.modal-price')
};
const modalClose = document.querySelector('.modal-close');

function abrirModal(pizza) {
    modal.img.src = pizza.img;
    modal.img.alt = pizza.name;
    modal.title.textContent = pizza.name;
    modal.description.textContent = pizza.description;
    modal.price.textContent = `R$ ${pizza.price[0].toFixed(2)}`;
    modalOverlay.style.display = 'flex';
}

modalClose.addEventListener('click', () => modalOverlay.style.display = 'none');
modalOverlay.addEventListener('click', e => { if (e.target === modalOverlay) modalOverlay.style.display = 'none'; });

// Carrinho
const btnCarrinho = document.getElementById('btn-carrinho');
const asideCarrinho = document.getElementById('carrinho');
const fecharCarrinho = document.getElementById('fechar-carrinho');
const listaCarrinho = document.getElementById('lista-carrinho');
const totalEl = document.getElementById('total');
const confirmarCompra = document.getElementById('confirmar-compra');

let itensCarrinho = [];

// Abre o carrinho
btnCarrinho.addEventListener('click', () => asideCarrinho.classList.add('active'));
// Fecha o carrinho
fecharCarrinho.addEventListener('click', () => asideCarrinho.classList.remove('active'));

// Atualiza a lista do carrinho
function atualizarCarrinho() {
    listaCarrinho.innerHTML = "";
    let total = 0;

    if (itensCarrinho.length === 0) {
        const li = document.createElement('li');
        li.textContent = "Seu carrinho está vazio!";
        listaCarrinho.appendChild(li);
    } else {
        itensCarrinho.forEach((item, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${item.nome}</span>
                <div>
                    <span class="quantidade">${item.quantidade}</span>
                    <button class="diminuir" data-index="${index}">-</button>
                    <button class="aumentar" data-index="${index}">+</button>
                    R$ ${(item.preco * item.quantidade).toFixed(2).replace('.', ',')}
                    <button class="remover" data-index="${index}">❌</button>
                </div>
            `;
            listaCarrinho.appendChild(li);
            total += item.preco * item.quantidade;
        });
    }

    totalEl.textContent = "R$ " + total.toFixed(2).replace('.', ',');
}

// Adiciona item no carrinho
confirmarCompra.addEventListener('click', () => {
    const nome = modal.title.textContent;
    const preco = parseFloat(modal.price.textContent.replace('R$', '').replace(',', '.'));

    const existingIndex = itensCarrinho.findIndex(i => i.nome === nome);
    if (existingIndex >= 0) {
        itensCarrinho[existingIndex].quantidade += 1;
    } else {
        itensCarrinho.push({ nome, preco, quantidade: 1 });
    }

    atualizarCarrinho();
    modalOverlay.style.display = 'none';
    asideCarrinho.classList.add('active');
});

// Remover, aumentar ou diminuir quantidade
listaCarrinho.addEventListener('click', e => {
    const index = e.target.getAttribute('data-index');
    if (e.target.classList.contains('remover')) {
        itensCarrinho.splice(index, 1);
    }
    if (e.target.classList.contains('aumentar')) {
        itensCarrinho[index].quantidade += 1;
    }
    if (e.target.classList.contains('diminuir')) {
        itensCarrinho[index].quantidade -= 1;
        if (itensCarrinho[index].quantidade <= 0) {
            itensCarrinho.splice(index, 1);
        }
    }
    atualizarCarrinho();
});
const asideEntrega = document.getElementById('entrega');
const finalizar = document.getElementById('finalizar');
const fecharEntrega = document.getElementById('fechar-entrega');

// Abre entrega e fecha carrinho
finalizar.addEventListener("click", () => {
    asideCarrinho.classList.remove("active");
    asideEntrega.classList.add("active");
});

// Fecha entrega
fecharEntrega.addEventListener("click", () => {
    asideEntrega.classList.remove("active");
});

// Buscar CEP
document.getElementById("btn-buscar-cep").addEventListener("click", async () => {
    const numero = document.getElementById("numero").value;

    if (numero === "") {
        document.getElementById("rua").textContent = "Por favor, informe o número antes de buscar!";
        return;
    }
    const cep = document.getElementById("cep").value.replace(/\D/g, '');
    if (cep.length !== 8) {
        document.getElementById("rua").textContent = "CEP inválido!";
        document.getElementById("bairro").textContent = "";
        document.getElementById("cidade").textContent = "";
        document.getElementById("numero").textContent = "";
        return;
    }

    try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();

        if (data.erro) {
            document.getElementById("rua").textContent = "CEP não encontrado!";
            document.getElementById("bairro").textContent = "";
            document.getElementById("cidade").textContent = "";
            document.getElementById("numero").textContent = "";
        } else {
            document.getElementById("rua").textContent = `Rua: ${data.logradouro}, ${numero}`;
            document.getElementById("bairro").textContent = `Bairro: ${data.bairro}`;
            document.getElementById("cidade").textContent = `Cidade: ${data.localidade} - ${data.uf}`;

        }
    } catch (error) {
        console.error("Erro ao buscar CEP:", error);
    }
});

// Confirmar entrega
document.getElementById("btn-confirmar-entrega").addEventListener("click", () => {
    alert("Endereço confirmado! Pedido será entregue 🎉");
    asideEntrega.classList.remove("active");
});

// Inicializa cards da aba padrão
popularPizzas();
