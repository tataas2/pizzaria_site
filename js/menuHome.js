document.addEventListener('DOMContentLoaded', () => {
  const header       = document.querySelector('header');          
  const menuToggle   = document.querySelector('.menu-toggle');    
  const linkHome     = document.getElementById('linkHome');       
  const menuButtons  = document.querySelectorAll('.btn-home');  
  const navBar = document.querySelector('.nav-bar'); // Botão três traços
const nav       = document.querySelector('.nav');       // Painel de navegação
const links     = document.querySelectorAll('.list-menu a');   // botões da seção home

  // Abre/fecha menu mobile
  function toggleMenu() {
    const isOpen = header.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', isOpen);
    if (isOpen) {
      navBar.classList.add('open'); // Abre o painel lateral
    } else {
      navBar.classList.remove('open'); // Fecha o painel lateral
    }
  }

  // Fecha menu ao clicar em "Home"
  if (linkHome && header) {
    linkHome.addEventListener('click', () => {
      header.classList.remove('open');
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
  function toggleHeader() {
    if (window.scrollY > 100) {
      header.classList.add('show');
    } else {
      header.classList.remove('show');
    }
  }

  toggleHeader(); // chama ao carregar a página
  window.addEventListener('scroll', toggleHeader);
});




