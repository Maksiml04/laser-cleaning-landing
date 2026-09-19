(() => {
  "use strict";

  const root = document.documentElement;
  const body = document.body;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(pointer: fine)").matches;

  body.classList.add("js-ready");

  const header = document.querySelector("[data-header]");
  const progress = document.querySelector(".scroll-progress");
  const stage = document.querySelector("[data-stage]");
  const menuToggle = document.querySelector("[data-menu-toggle]");
  const nav = document.querySelector("[data-nav]");

  const updateScrollState = () => {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const progressValue = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;

    if (header) {
      header.classList.toggle("is-scrolled", window.scrollY > 18);
    }

    if (progress) {
      progress.style.width = `${progressValue}%`;
    }
  };

  let scrollTicking = false;
  const onScroll = () => {
    if (scrollTicking) return;
    scrollTicking = true;
    window.requestAnimationFrame(() => {
      updateScrollState();
      scrollTicking = false;
    });
  };

  updateScrollState();
  window.addEventListener("scroll", onScroll, { passive: true });

  const revealItems = document.querySelectorAll(".reveal");
  if (reducedMotion || !("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  } else {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -50px" },
    );

    revealItems.forEach((item) => revealObserver.observe(item));
  }

  const closeMenu = () => {
    if (!menuToggle || !nav) return;
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Открыть меню");
    nav.classList.remove("is-open");
  };

  if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
      menuToggle.setAttribute("aria-expanded", String(!isOpen));
      menuToggle.setAttribute("aria-label", isOpen ? "Открыть меню" : "Закрыть меню");
      nav.classList.toggle("is-open", !isOpen);
    });

    nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
    document.addEventListener("click", (event) => {
      if (!nav.classList.contains("is-open")) return;
      if (nav.contains(event.target) || menuToggle.contains(event.target)) return;
      closeMenu();
    });
  }

  if (finePointer && !reducedMotion) {
    window.addEventListener(
      "pointermove",
      (event) => {
        root.style.setProperty("--pointer-x", `${event.clientX}px`);
        root.style.setProperty("--pointer-y", `${event.clientY}px`);

        if (!stage) return;
        const x = (event.clientX / window.innerWidth - 0.5) * 3;
        const y = (event.clientY / window.innerHeight - 0.5) * -3;
        stage.style.setProperty("--stage-rotate-y", `${x}deg`);
        stage.style.setProperty("--stage-rotate-x", `${y}deg`);
      },
      { passive: true },
    );

    document.querySelectorAll("[data-magnetic]").forEach((element) => {
      element.addEventListener("pointermove", (event) => {
        const bounds = element.getBoundingClientRect();
        const x = (event.clientX - bounds.left - bounds.width / 2) * 0.12;
        const y = (event.clientY - bounds.top - bounds.height / 2) * 0.16;
        element.style.transform = `translate(${x}px, ${y}px)`;
      });

      element.addEventListener("pointerleave", () => {
        element.style.transform = "translate(0, 0)";
      });
    });
  }

  const comparison = document.querySelector("[data-comparison]");
  const comparisonRange = document.querySelector("[data-comparison-range]");
  if (comparison && comparisonRange) {
    comparisonRange.addEventListener("input", (event) => {
      comparison.style.setProperty("--split", `${event.target.value}%`);
    });
  }

  const leadForm = document.querySelector("[data-lead-form]");
  const formStatus = document.querySelector("[data-form-status]");
  if (leadForm && formStatus) {
    leadForm.addEventListener("submit", (event) => {
      event.preventDefault();
      formStatus.textContent = "Спасибо. Заявка собрана — подключите обработчик формы перед публикацией.";
      leadForm.reset();
    });
  }

  const year = document.querySelector("[data-year]");
  if (year) {
    year.textContent = new Date().getFullYear();
  }
})();
