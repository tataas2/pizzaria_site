// Função para popular os cards
function popularPizzas(tab='pizzas') {
  const container = document.querySelector('.cardapio-grid');
  const template = container.querySelector('.template');

  // Limpa cards antigos
  container.querySelectorAll('.item-cardapio:not(.template)').forEach(el => el.remove());

  // Filtra pizzas por aba
  const pizzasFiltradas = pizzaJson.filter(pizza => pizza.type === tab);

  pizzasFiltradas.forEach((pizza) => {
    const clone = template.cloneNode(true);
    clone.classList.remove('template');

    clone.querySelector('img').src = pizza.img;
    clone.querySelector('img').alt = pizza.name;
    clone.querySelector('h3').textContent = pizza.name;
    clone.querySelector('p').textContent = pizza.description;
    const preco = pizza.price.length > 1 ? pizza.price[1] : pizza.price[0];
    clone.querySelector('span').textContent = `R$ ${preco.toFixed(2)}`;

    // Adiciona evento do modal no card clonadp
    clone.addEventListener('click', () => abrirModal(pizza));

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
    popularPizzas(tabName); // Os eventos já são adicionados aqui
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

modalClose.addEventListener('click', () => {
  modalOverlay.style.display = 'none';
});

modalOverlay.addEventListener('click', (e) => {
  if(e.target === modalOverlay) modalOverlay.style.display = 'none';
});

// Inicializa cards da aba padrão
popularPizzas();
