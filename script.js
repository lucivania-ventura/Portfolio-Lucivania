/*Biblioteca GreenSock*/
const loadingBolls = document.querySelectorAll(".loading-ball");
/*esconde mostra*/
const btn = document.querySelector("#projects-show");
const container = document.querySelector("#projects-container");
/*Menu Mobile*/
const nav = document.querySelector(".container-fluid");
const btnMenu = document.querySelector(".btn-menu");
const menu = document.querySelector(".navbar-nav");
const menuItems = document.querySelectorAll(".navbar-nav .nav-item");

/*Biblioteca GreenSock*/
TweenMax.staggerFromTo(
  loadingBolls,
  0.75,
  {
    opacity: 0,
    transform: "scale(0)",
  },
  {
    opacity: 1,
    repeat: -1,
    transform: "scale(1.2)",
    yoyo: true,
  },
  0.2
);

/*esconde mostra*/
function exibirConteudo() {
  container.style.display = "flex";
  btn.innerHTML = "Ver menos";
}

function ocultarConteudo() {
  container.style.display = "none";
  btn.innerHTML = "Ver mais";
}

btn.addEventListener("click", function () {
  if (container.style.display === "none") {
    exibirConteudo();
  } else {
    ocultarConteudo();
  }
});

/*Menu Mobile*/
function handleButtonClick(event) {
  if (event.type === "touchstart") event.preventDefault();
  event.stopPropagation();
  nav.classList.toggle("active");
  handleClickOutside(menu, () => {
    nav.classList.remove("active");
    setAria();
  });
  setAria();
}

function handleClickOutside(targetElement, callback) {
  const html = document.documentElement;
  function handleHTMLClick(event) {
    if (!targetElement.contains(event.target)) {
      targetElement.removeAttribute("data-target");
      html.removeEventListener("click", handleHTMLClick);
      html.removeEventListener("touchstart", handleHTMLClick);
      callback();
    }
  }
  if (!targetElement.hasAttribute("data-target")) {
    html.addEventListener("click", handleHTMLClick);
    html.addEventListener("touchstart", handleHTMLClick);
    targetElement.setAttribute("data-target", "");
  }
}

function setAria() {
  const isActive = nav.classList.contains("active");
  btnMenu.setAttribute("aria-expanded", isActive);
  if (isActive) {
    btnMenu.setAttribute("aria-label", "Close Menu");
  } else {
    btnMenu.setAttribute("aria-label", "Open Menu");
  }
}

function handleMenuItemClick() {
  nav.classList.remove("active");
  setAria();
}

menuItems.forEach((item) => {
  item.addEventListener("click", handleMenuItemClick);
});

btnMenu.addEventListener("click", handleButtonClick);
btnMenu.addEventListener("touchstart", handleButtonClick);