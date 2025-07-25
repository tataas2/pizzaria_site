/* ======== SELECIONA ELEMENTOS ======== */
const hamburger = document.querySelector('.hamburger'); // Botão três traços
const nav       = document.querySelector('.nav-principal');       // Painel de navegação
const links     = document.querySelectorAll('.nav-principal a');  // Todos os links do menu

/* ======== FUNÇÃO TOGGLE ======== */
function toggleMenu () {
  const aberto = nav.classList.toggle('open');  // Abre/fecha painel (CSS controla posição)
  hamburger.classList.toggle('active');         // Anima traços em “X” e vice‑versa
  hamburger.setAttribute('aria-expanded', aberto); // Atualiza atributo para leitores de tela
}

/* ======== EVENTOS ======== */
hamburger.addEventListener('click', toggleMenu); // Clique no botão

/* Fecha painel ao clicar em um link (no mobile) */
links.forEach(link => link.addEventListener('click', () => {
  if (window.innerWidth <= 768 && nav.classList.contains('open')) {
    toggleMenu();                                // Fecha se estiver aberto
  }
}));

/* Acessibilidade extra: tecla Esc fecha o menu */
document.addEventListener('keyup', (e) => {
  if (e.key === 'Escape' && nav.classList.contains('open')) {
    toggleMenu();
  }
});
