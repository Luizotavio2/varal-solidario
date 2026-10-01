import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { ArrowUpRight, Camera, Globe, MapPin, MessageCircle } from "lucide-react";
import aboutImage from "./image.png";
import pixQrCode from "./chave-pix.png";

const e = React.createElement;

const contactConfig = {
  instagram: {
    url: "https://www.instagram.com/varalsolidariopaulinia/",
    handle: "@varalsolidariopaulinia",
  },
  whatsapp: {
    number: "",
  },
  facebook: {
    url: "https://www.facebook.com/varalsolidariopaulinia/",
    description: "Acompanhe nossas ações",
  },
  location: {
    name: "Paulínia — SP",
  },
};

const navigation = [
  ["Sobre", "#sobre"],
  ["Projetos", "#projetos"],
  ["Impacto", "#impacto"],
  ["Como ajudar", "#ajudar"],
  ["Contato", "#contato", "menu-cta"],
];

function Logo({ footer = false }) {
  return e(
    "a",
    { className: `logo${footer ? " footer-logo" : ""}`, href: "#inicio", "aria-label": "Varal Solidário - página inicial" },
    e("span", { className: "logo-mark", "aria-hidden": "true" }, "✦"),
    e("span", null, "Varal Solidário", e("span", { className: "logo-dot" }, "."))
  );
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  function closeMenu() {
    setMenuOpen(false);
  }

  return e(
    "header",
    { className: "header", id: "inicio" },
    e(
      "div",
      { className: "container nav" },
      e(Logo),
      e(
        "button",
        {
          className: "menu-toggle",
          type: "button",
          "aria-label": menuOpen ? "Fechar menu" : "Abrir menu",
          "aria-expanded": menuOpen,
          "aria-controls": "main-menu",
          onClick: () => setMenuOpen((open) => !open),
        },
        e("span"),
        e("span"),
        e("span")
      ),
      e(
        "nav",
        { className: `menu${menuOpen ? " active" : ""}`, id: "main-menu", "aria-label": "Navegação principal" },
        navigation.map(([label, href, className]) =>
          e("a", { key: href, href, className, onClick: closeMenu }, label)
        )
      )
    )
  );
}

function Hero() {
  return e(
    "section",
    { className: "hero" },
    e("div", { className: "hero-overlay", "aria-hidden": "true" }),
    e(
      "div",
      { className: "container hero-content" },
      e("span", { className: "eyebrow" }, "Solidariedade que aproxima e transforma"),
      e("h1", null, "Juntos, podemos levar acolhimento a quem mais precisa."),
      e("p", null, "Mobilizamos a comunidade para apoiar famílias em situação de vulnerabilidade em Paulínia. Cada contribuição ajuda a fazer a diferença."),
      e(
        "div",
        { className: "hero-actions" },
        e("a", { href: "#ajudar", className: "btn btn-primary" }, "Quero ajudar"),
        e("a", { href: "#projetos", className: "btn btn-outline" }, "Conheça nossas ações")
      )
    )
  );
}

const values = [
  ["Missão", "Promover ações de solidariedade e apoio às famílias que precisam."],
  ["Visão", "Uma comunidade mais solidária, acolhedora e participativa."],
  ["Valores", "Empatia, respeito, dignidade, transparência e colaboração."],
];

function About() {
  return e(
    "section",
    { className: "section about", id: "sobre" },
    e(
      "div",
      { className: "container about-grid" },
      e(
        "div",
        { className: "section-image" },
        e("img", {
          src: aboutImage,
          alt: "Equipe reunida durante uma ação do Varal Solidário",
        })
      ),
      e(
        "div",
        { className: "section-content" },
        e("span", { className: "section-label" }, "Sobre o Varal Solidário"),
        e("h2", null, "Uma rede de cuidado feita pela comunidade."),
        e("p", null, "O Varal Solidário Paulínia é uma iniciativa comunitária fundada em 2021 para apoiar famílias em situação de vulnerabilidade social. Por meio da mobilização de doações e da solidariedade, a organização contribui com itens essenciais para o dia a dia."),
        e("p", null, "A entidade realiza ações de arrecadação e distribuição de cestas básicas, roupas, calçados e móveis. Os detalhes da trajetória, dos critérios de atendimento e das ações atuais podem ser complementados com informações fornecidas diretamente pela equipe da organização."),
        e(
          "div",
          { className: "values" },
          values.map(([title, description]) =>
            e("article", { key: title }, e("h3", null, title), e("p", null, description))
          )
        )
      )
    )
  );
}

const projects = [
  {
    title: "Arrecadação de roupas",
    description: "Recebimento e organização de roupas em bom estado para que possam chegar a pessoas e famílias da comunidade.",
  },
  {
    title: "Doações essenciais",
    description: "Mobilização para arrecadar itens como cestas básicas, calçados e outros artigos conforme as necessidades identificadas.",
    featured: true,
  },
  {
    title: "Rede de solidariedade",
    description: "Conexão entre doadores, voluntários, empresas parceiras e famílias que precisam de apoio.",
  },
];

function Projects() {
  return e(
    "section",
    { className: "section projects", id: "projetos" },
    e(
      "div",
      { className: "container" },
      e(
        "div",
        { className: "section-heading" },
        e(
          "div",
          null,
          e("span", { className: "section-label" }, "Nossas ações"),
          e("h2", null, "Doações que se transformam em apoio.")
        ),
        e("p", null, "As frentes abaixo representam ações associadas à atuação divulgada pelo Varal Solidário. Confirme com a equipe os nomes e formatos atuais de cada campanha.")
      ),
      e(
        "div",
        { className: "project-grid" },
        projects.map(({ title, description, featured }, index) =>
          e(
            "article",
            { className: `project-card${featured ? " featured" : ""}`, key: title },
            e("div", { className: "project-number" }, `0${index + 1}`),
            e("h3", null, title),
            e("p", null, description),
            e("a", { href: "#contato" }, "Saiba mais →")
          )
        )
      )
    )
  );
}

function Counter() {
  const [count, setCount] = useState(null);
  const counterRef = useRef(null);

  useEffect(() => {
    const element = counterRef.current;
    if (!element) return undefined;

    let frameId;
    let started = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started) return;
        started = true;
        const startTime = performance.now();
        const duration = 1600;
        const update = (time) => {
          const progress = Math.min((time - startTime) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setCount(Math.floor(eased * 1000));
          if (progress < 1) frameId = requestAnimationFrame(update);
        };
        frameId = requestAnimationFrame(update);
        observer.disconnect();
      },
      { threshold: 0.4 }
    );

    observer.observe(element);
    return () => {
      observer.disconnect();
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, []);

  return e("strong", { ref: counterRef }, count === null ? "1.000+" : count.toLocaleString("pt-BR"));
}

function Impact() {
  return e(
    "section",
    { className: "section impact", id: "impacto" },
    e(
      "div",
      { className: "container" },
      e(
        "div",
        { className: "section-heading centered" },
        e("span", { className: "section-label" }, "Nosso impacto social"),
        e("h2", null, "A solidariedade chega mais longe quando é compartilhada."),
        e("p", null, "Uma reportagem publicada em 2025 informou que a iniciativa já havia atendido mais de mil famílias. Os demais indicadores devem ser confirmados pela organização.")
      ),
      e(
        "div",
        { className: "impact-video" },
        e("iframe", {
          src: "https://www.youtube.com/embed/vYQ9D7bQRaY",
          title: "Vídeo sobre o Varal Solidário Paulínia",
          allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",
          referrerPolicy: "strict-origin-when-cross-origin",
          allowFullScreen: true,
        })
      ),
      e("p", { className: "impact-note" }, "Em 2025, uma reportagem informou que a iniciativa já havia atendido mais de mil famílias. Confirme o número atualizado com a equipe antes da publicação."),
      e(
        "div",
        { className: "impact-grid" },
        e("div", { className: "impact-item" }, e(Counter), e("span", null, "famílias apoiadas")),
        e("div", { className: "impact-item" }, e("strong", null, "2021"), e("span", null, "ano de fundação informado")),
        e("div", { className: "impact-item" }, e("strong", null, "4"), e("span", null, "categorias de doação divulgadas")),
        e("div", { className: "impact-item" }, e("strong", null, "Paulínia"), e("span", null, "comunidade de atuação"))
      )
    )
  );
}

const waysToHelp = [
  ["Doe roupas e itens", "Consulte a equipe sobre roupas, calçados, móveis, alimentos e outros itens que estejam sendo recebidos."],
  ["Seja voluntário", "Ajude na triagem, organização, divulgação de campanhas e outras atividades combinadas com a equipe."],
  ["Seja parceiro", "Comércios e empresas podem contribuir com doações, pontos de coleta ou apoio a campanhas comunitárias."],
];

function PixDonation() {
  return e(
    "aside",
    { className: "pix-donation", "aria-labelledby": "pix-title" },
    e("img", { src: pixQrCode, alt: "QR Code Pix para doar ao Varal Solidário" }),
    e(
      "div",
      { className: "pix-content" },
      e("span", { className: "pix-label" }, "Doação rápida e segura"),
      e("h3", { id: "pix-title" }, "Doe via Pix"),
      e("p", null, "Escaneie o QR Code com a câmera do celular ou pelo app do seu banco."),
      e("p", { className: "pix-reminder" }, "Antes de confirmar, confira os dados do destinatário.")
    )
  );
}

function OtherWaysToHelp() {
  return e(
    "div",
    { className: "other-ways" },
    e("h3", null, "Outras formas de ajudar"),
    e(
      "div",
      { className: "help-options" },
      waysToHelp.map(([title, description], index) =>
        e(
          "article",
          { key: title },
          e("span", null, `0${index + 1}`),
          e("div", null, e("h4", null, title), e("p", null, description))
        )
      )
    )
  );
}

function Help() {
  return e(
    "section",
    { className: "help", id: "ajudar" },
    e(
      "div",
      { className: "container help-container" },
      e(
        "header",
        { className: "help-heading" },
        e("span", { className: "section-label" }, "Faça parte"),
        e("h2", null, "Sua ajuda transforma vidas."),
        e("p", null, "Contribua com o Varal Solidário ou participe de outras formas.")
      ),
      e(PixDonation),
      e(OtherWaysToHelp)
    )
  );
}

function ContactCard({ icon: Icon, title, detail, href }) {
  const content = [
    e("span", { className: "contact-card-icon", key: "icon" }, e(Icon, { size: 22, "aria-hidden": true })),
    e(
      "span",
      { className: "contact-card-copy", key: "copy" },
      e("strong", null, title),
      e("span", null, detail)
    ),
    href && e(ArrowUpRight, { className: "contact-card-arrow", size: 18, "aria-hidden": true, key: "arrow" }),
  ];

  return href
    ? e("a", { className: "contact-card", href, target: "_blank", rel: "noopener noreferrer" }, content)
    : e("div", { className: "contact-card" }, content);
}

function getContactMethods() {
  const whatsappDigits = contactConfig.whatsapp.number.replace(/\D/g, "");

  return [
    {
      icon: Camera,
      title: "Instagram",
      detail: contactConfig.instagram.handle,
      href: contactConfig.instagram.url,
    },
    whatsappDigits && {
      icon: MessageCircle,
      title: "WhatsApp",
      detail: contactConfig.whatsapp.number,
      href: `https://wa.me/${whatsappDigits}`,
    },
    {
      icon: Globe,
      title: "Facebook",
      detail: contactConfig.facebook.description,
      href: contactConfig.facebook.url,
    },
    {
      icon: MapPin,
      title: "Onde estamos",
      detail: contactConfig.location.name,
      href: `https://maps.google.com/?q=${encodeURIComponent(contactConfig.location.name)}`,
    },
  ].filter(Boolean);
}

function Contact() {
  return e(
    "section",
    { className: "section contact", id: "contato" },
    e(
      "div",
      { className: "container contact-grid" },
      e(
        "header",
        { className: "contact-heading" },
        e("span", { className: "section-label" }, "Fale com o Varal Solidário"),
        e("h2", null, "Vamos conversar?"),
        e("p", null, "Escolha um canal para tirar dúvidas, conhecer as campanhas ou combinar uma forma de contribuir.")
      ),
      e(
        "div",
        { className: "contact-cards", "aria-label": "Canais de contato" },
        getContactMethods().map((method) => e(ContactCard, { ...method, key: method.title }))
      )
    )
  );
}

function Footer() {
  return e(
    "footer",
    { className: "footer" },
    e(
      "div",
      { className: "container footer-top" },
      e(
        "div",
        null,
        e(Logo, { footer: true }),
        e("p", null, "Mobilizando pessoas e doações para apoiar famílias em situação de vulnerabilidade em Paulínia.")
      ),
      e(
        "div",
        { className: "footer-links" },
        [["Sobre", "#sobre"], ["Projetos", "#projetos"], ["Impacto", "#impacto"], ["Como ajudar", "#ajudar"], ["Contato", "#contato"]].map(([label, href]) =>
          e("a", { key: href, href }, label)
        )
      )
    ),
    e(
      "div",
      { className: "container footer-bottom" },
      e("span", null, "© ", new Date().getFullYear(), " Varal Solidário Paulínia. Todos os direitos reservados."),
      e("span", null, "Dados institucionais: confirmar com a organização")
    )
  );
}

function App() {
  return e(
    React.Fragment,
    null,
    e(Header),
    e("main", null, e(Hero), e(About), e(Projects), e(Impact), e(Help), e(Contact)),
    e(Footer)
  );
}

createRoot(document.getElementById("root")).render(e(App));
