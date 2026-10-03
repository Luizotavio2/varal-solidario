/* =========================================================
   Varal Solidário Paulínia — interações da página
   JavaScript puro, sem bibliotecas.
   ========================================================= */

// ---------- Cabeçalho: fundo sólido ao rolar a página ----------
const header = document.querySelector(".header");

function updateHeader() {
  header.classList.toggle("scrolled", window.scrollY > 40);
}

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

// ---------- Menu mobile ----------
const menuToggle = document.querySelector(".menu-toggle");
const menu = document.getElementById("main-menu");

function setMenuOpen(open) {
  menu.classList.toggle("active", open);
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
}

menuToggle.addEventListener("click", () => {
  setMenuOpen(!menu.classList.contains("active"));
});

menu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => setMenuOpen(false));
});

// Fecha o menu com a tecla Esc
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menu.classList.contains("active")) {
    setMenuOpen(false);
    menuToggle.focus();
  }
});

// ---------- Menu: destaca o link da seção visível ----------
const menuLinks = [...menu.querySelectorAll('a[href^="#"]')];
const sections = menuLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      menuLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
      });
    });
  },
  // Considera "visível" a seção que ocupa a faixa central da tela
  { rootMargin: "-45% 0px -50% 0px" }
);

sections.forEach((section) => sectionObserver.observe(section));

// ---------- Contador animado de famílias apoiadas ----------
const counter = document.querySelector("[data-counter]");

if (counter) {
  const target = Number(counter.dataset.counter);
  const duration = 1600;

  const counterObserver = new IntersectionObserver(
    ([entry]) => {
      if (!entry.isIntersecting) return;
      counterObserver.disconnect();

      const startTime = performance.now();
      const update = (time) => {
        const progress = Math.min((time - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // desacelera no final
        counter.textContent = Math.floor(eased * target).toLocaleString("pt-BR");
        if (progress < 1) requestAnimationFrame(update);
      };
      requestAnimationFrame(update);
    },
    { threshold: 0.4 }
  );

  counterObserver.observe(counter);
}

// ---------- Galeria: lightbox com a foto ampliada ----------
const lightbox = document.getElementById("lightbox");
const lightboxImage = lightbox.querySelector("img");
const lightboxCaption = lightbox.querySelector("p");

document.querySelectorAll(".gallery-item button").forEach((button) => {
  button.addEventListener("click", () => {
    const thumb = button.querySelector("img");
    const caption = button.closest("figure").querySelector("figcaption");

    lightboxImage.src = button.dataset.full;
    lightboxImage.alt = thumb.alt;
    lightboxCaption.textContent = caption ? caption.textContent : "";
    lightbox.showModal();
    document.body.classList.add("no-scroll");
  });
});

lightbox.querySelector(".lightbox-close").addEventListener("click", () => lightbox.close());

// Fecha ao clicar fora da foto (no fundo escurecido)
lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) lightbox.close();
});

// O evento "close" também dispara ao pressionar Esc
lightbox.addEventListener("close", () => document.body.classList.remove("no-scroll"));

// ---------- Formulário de contato ----------
const form = document.getElementById("contact-form");
const formStatus = form.querySelector(".form-status");
const subjectSelect = form.querySelector("#assunto");

// Links com data-subject já preenchem o assunto do formulário
document.querySelectorAll("a[data-subject]").forEach((link) => {
  link.addEventListener("click", () => {
    subjectSelect.value = link.dataset.subject;
  });
});

// Retorna a mensagem de erro do campo, ou "" se estiver válido
function getFieldError(field) {
  const value = field.value.trim();

  if (!value) return "Preencha este campo.";
  if (field.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    return "Informe um e-mail válido.";
  }
  if (field.minLength > 0 && value.length < field.minLength) {
    return `Escreva pelo menos ${field.minLength} caracteres.`;
  }
  return "";
}

function validateField(field) {
  const error = getFieldError(field);
  const wrapper = field.closest(".form-field");

  wrapper.classList.toggle("invalid", Boolean(error));
  wrapper.querySelector(".field-error").textContent = error;
  field.setAttribute("aria-invalid", String(Boolean(error)));
  return !error;
}

// Só os campos visíveis (ignora o campo-armadilha contra spam)
const fields = [...form.querySelectorAll(".form-field input, .form-field select, .form-field textarea")];

// Revalida o campo enquanto a pessoa corrige o erro
fields.forEach((field) => {
  field.addEventListener("input", () => {
    if (field.closest(".form-field").classList.contains("invalid")) validateField(field);
  });
  field.addEventListener("blur", () => {
    if (field.value.trim()) validateField(field);
  });
});

// Envio via Web3Forms (gratuito): a chave só permite enviar mensagens
// para o e-mail cadastrado no serviço, por isso pode ficar no código.
const WEB3FORMS_URL = "https://api.web3forms.com/submit";
const WEB3FORMS_ACCESS_KEY = "3a4e10a3-ec57-4bd9-8f2b-813ef25ac70b";

const submitButton = form.querySelector('button[type="submit"]');

function showFormStatus(message, type) {
  formStatus.textContent = message;
  formStatus.className = `form-status ${type}`;
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  showFormStatus("", "");

  const invalidFields = fields.filter((field) => !validateField(field));

  if (invalidFields.length) {
    invalidFields[0].focus();
    return;
  }

  const subjectLabel = subjectSelect.options[subjectSelect.selectedIndex].text;
  const data = {
    access_key: WEB3FORMS_ACCESS_KEY,
    subject: `Site Varal Solidário — ${subjectLabel}`,
    from_name: "Site Varal Solidário",
    name: form.nome.value.trim(),
    email: form.email.value.trim(),
    assunto: subjectLabel,
    message: form.mensagem.value.trim(),
    botcheck: form.botcheck.checked,
  };

  submitButton.disabled = true;
  submitButton.textContent = "Enviando...";

  try {
    const response = await fetch(WEB3FORMS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(data),
    });
    const result = await response.json();

    if (!response.ok || !result.success) throw new Error(result.message);

    const firstName = data.name.split(" ")[0];
    showFormStatus(`Obrigado, ${firstName}! Sua mensagem foi enviada e a equipe entrará em contato em breve.`, "success");
    form.reset();
  } catch (error) {
    console.error("Erro ao enviar o formulário:", error);
    showFormStatus("Não foi possível enviar sua mensagem agora. Tente novamente em instantes ou fale conosco pelo Instagram.", "error");
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = "Enviar mensagem";
  }
});

// ---------- Cartão do WhatsApp (só aparece se houver número no HTML) ----------
const whatsappCard = document.getElementById("whatsapp-card");

if (whatsappCard) {
  const number = whatsappCard.dataset.whatsapp.trim();
  const digits = number.replace(/\D/g, "");

  if (digits) {
    whatsappCard.href = `https://wa.me/${digits}`;
    whatsappCard.querySelector(".whatsapp-number").textContent = number;
    whatsappCard.hidden = false;
  }
}

// ---------- Ano atual no rodapé ----------
document.getElementById("current-year").textContent = new Date().getFullYear();
