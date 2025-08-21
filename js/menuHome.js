document.addEventListener('DOMContentLoaded', () => {
  const header      = document.querySelector('header');          
  const menuToggle  = document.querySelector('.menu-toggle');    
  const linkHome    = document.getElementById('linkHome'); 
  const menuButtons = document.querySelectorAll('.btn-home');  
  const navBar      = document.querySelector('.nav-bar');
  const nav         = document.querySelector('.nav');
  const hamburger = document.querySelector('.hamburger'); // Botão três traços
const navP      = document.querySelector('.nav-principal');       // Painel de navegação
const links     = document.querySelectorAll('.nav-principal a');  // Todos os links do menu


 /* ======== FUNÇÃO TOGGLE ======== */
function toggleMenu () {
  const aberto = navP.classList.toggle('open');  // Abre/fecha painel (CSS controla posição)
  hamburger.classList.toggle('active');         // Anima traços em “X” e vice‑versa
  hamburger.setAttribute('aria-expanded', aberto); // Atualiza atributo para leitores de tela
}

/* ======== EVENTOS ======== */
hamburger.addEventListener('click', toggleMenu); // Clique no botão

/* Fecha painel ao clicar em um link (no mobile) */
links.forEach(link => link.addEventListener('click', () => {
  if (window.innerWidth <= 768 && navP.classList.contains('open')) {
    toggleMenu(); // Fecha se estiver aberto
  }
}));

/* Acessibilidade extra: tecla Esc fecha o menu */
document.addEventListener('keyup', (e) => {
  if (e.key === 'Escape' && navP.classList.contains('open')) {
    toggleMenu();
  }
});


  // Fecha ou abre menu ao clicar em "Home"
  if (linkHome && header) {
    linkHome.addEventListener('click', () => {
      header.classList.toggle('open');
    });
  }

  // Fecha menu ao clicar nos botões da seção Home
  if (menuButtons.length && header) {
    menuButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        header.classList.remove('open');
      });
    });
  }

  // Mostrar o header após rolar 100px
  function toggleHeaderOnScroll() {
    header.classList.toggle('show', window.scrollY > 100);
  }
  toggleHeaderOnScroll();
  window.addEventListener('scroll', toggleHeaderOnScroll);

  // Se estiver no menu.html, abre o menu automaticamente
  if (window.location.pathname.includes("menu.html")) {
    header.classList.add('open');
  }
});
