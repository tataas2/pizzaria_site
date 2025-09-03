const track = document.getElementById("carousel-track");

// Filtra só as pizzas (se quiser bebidas também é só tirar o filter)
const pizzas = pizzaJson.filter(item => item.type.includes("pizzas"));

pizzas.forEach(pizza => {
  const slide = document.createElement("div");
  slide.classList.add("carousel-item");

  slide.innerHTML = `
    <img src="${pizza.img}" alt="${pizza.name}">
    <h3>${pizza.name}</h3>
    <p>${pizza.description}</p>
    <p id="pizza-price"><strong>R$ ${pizza.price[0].toFixed(2)}</strong></p>
  `;

  track.appendChild(slide);
});

let currentIndex = 0;

function updateCarousel() {
  const slideWidth = track.querySelector(".carousel-item").clientWidth;
  track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
}

document.querySelector(".carousel-btn.next").addEventListener("click", () => {
  if (currentIndex < pizzas.length - 1) {
    currentIndex++;
    updateCarousel();
  }
});

document.querySelector(".carousel-btn.prev").addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
    updateCarousel();
  }
});

// Ajusta ao redimensionar
window.addEventListener("resize", updateCarousel);
