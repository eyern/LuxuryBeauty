// toggle menu
const nav = document.querySelector("#header nav");
const Toggle = document.querySelectorAll("nav .toggle");

for (const element of Toggle) {
   element.addEventListener("click", () => {
      nav.classList.toggle("show");
   });
}

// quando clicar em um item do menu, esconder o menu
const links = document.querySelectorAll("nav ul li a");

for (const link of links) {
   link.addEventListener("click", () => {
      nav.classList.remove("show");
   });
}

const header = document.querySelector("#header");
// pegando altura do header
const headerHeight = header.offsetHeight;
// Alterar o header da página em determinado momento do scroll
function changeHeaderWhenScroll() {
   // se o scroll (rolada de tela) for maior que a altura do header..
   // window é referente à tela
   if (window.scrollY >= headerHeight) header.classList.add("scroll");
   else header.classList.remove("scroll");
}

// para o .back-to-top, aparecer e desaparecer em determinadas alturas do scroll. Mesmo exemplo explicado da function changeHeaderWh...
function showBackToTop() {
   const backToTop = document.querySelector(".back-to-top");

   if (window.scrollY > 840) backToTop.classList.add("show");
   else backToTop.classList.remove("show");
}

// Menu ativo conforme a sessão ativa na página

// pegar todas as seções dentro de main e que contenham um id
const sections = document.querySelectorAll("main section[id]");
function activateMenuAtCurrentSection() {
   // pageYOffset é pegar o deslcamento Y da página, no sentido vertical, window.innerHeight é o espaço do height da tela total aparente para o usuário (sem contar com o que tem mais embaixo ou em cima através do rolamento do scroll)
   const checkpoint = window.pageYOffset + (window.innerHeight / 8) * 2

   for (const section of sections) {
      // offsetTop é referente ao topo de determinado elemento (o número do deslocamento Y desde o início da página que é eixo y = 0 até o elemento requerido)
      const sectionTop = section.offsetTop;
      //  offsetHeight é o height de um elemento
      const sectionHeight = section.offsetHeight;
      // pegando o id de cada section
      const sectionId = section.getAttribute("id");

      const checkpointStart = checkpoint >= sectionTop;
      const checkpointEnd = checkpoint <= sectionTop + sectionHeight;

      if (checkpointStart && checkpointEnd) {
         document
            .querySelector("nav ul li a[href*=" + sectionId + "]")
            .classList.add("active");
      } else {
         document
            .querySelector("nav ul li a[href*=" + sectionId + "]")
            .classList.remove("active");
      }
   }
}

// Executando as funções
window.addEventListener("scroll", () => {
   changeHeaderWhenScroll();
   showBackToTop();
   activateMenuAtCurrentSection();
});

// API Swipper (carousel, slides)
const swiper = new Swiper(".swiper", {
   slidesPerView: 1,

   // se o width for 1200 >
   breakpoints: {
      1200: {
         slidesPerView: 2,
         spaceBetween: 32,
      },
   },

   pagination: {
      el: ".swiper-pagination",
   },

   navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
   },

   mousewheel: {
      invert: true,
   },

   keyboard: true,
});

// API ScrollReveal: Mostrar elementos quando der scroll na página.
const scrollReveal = ScrollReveal({
   origin: "top",
   distance: "30px",
   duration: 700,
   // no retorno do scroll tbm, vindo de baixo para cima
   reset: true,
});

scrollReveal.reveal(
   `
   #home .image, #home .text,
   #about .image, #about .text,
   #services header, #services .card,
   #testimonials header, #testimonials .testimonials,
   #contact .text, #contact .links,
   #footer .footer-text, .footer-social-media
   `,
   { interval: 100 }
);
