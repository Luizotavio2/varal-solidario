const menuToggle = document.querySelector(".menu-toggle");
const menu = document.querySelector(".menu");

menuToggle.addEventListener("click", () => {
  const isOpen = menu.classList.toggle("active");
  menuToggle.setAttribute("aria-expanded", isOpen);
});

document.querySelectorAll(".menu a").forEach((link) => {
  link.addEventListener("click", () => {
    menu.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

const counters = document.querySelectorAll("[data-counter]");

const animateCounter = (element) => {
  const target = Number(element.dataset.counter);
  const duration = 1600;
  const start = performance.now();

  const update = (time) => {
    const progress = Math.min((time - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    element.textContent = Math.floor(eased * target).toLocaleString("pt-BR");

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  };

  requestAnimationFrame(update);
};

const observer = new IntersectionObserver(
  (entries, observerInstance) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observerInstance.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.4 }
);

counters.forEach((counter) => observer.observe(counter));

const form = document.querySelector("#contactForm");
const formMessage = document.querySelector("#formMessage");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  formMessage.textContent = "Este formulário é demonstrativo e ainda não envia mensagens. Entre em contato pelo Instagram para falar com a equipe.";
  form.reset();
});

document.querySelector("#year").textContent = new Date().getFullYear();
