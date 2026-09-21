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

  const closeMenu = (restoreFocus = false) => {
    if (!menuToggle || !nav) return;
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Открыть меню");
    nav.classList.remove("is-open");
    if (restoreFocus) menuToggle.focus();
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

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && nav.classList.contains("is-open")) {
        closeMenu(true);
      }
    });
  }

  if (finePointer && !reducedMotion) {
    let latestPointerEvent = null;
    let pointerFrame = 0;

    const updatePointer = () => {
      pointerFrame = 0;
      if (!latestPointerEvent) return;

      const { clientX, clientY } = latestPointerEvent;
      root.style.setProperty("--pointer-x", `${clientX}px`);
      root.style.setProperty("--pointer-y", `${clientY}px`);

      if (!stage) return;
      const x = (clientX / window.innerWidth - 0.5) * 3;
      const y = (clientY / window.innerHeight - 0.5) * -3;
      stage.style.setProperty("--stage-rotate-y", `${x}deg`);
      stage.style.setProperty("--stage-rotate-x", `${y}deg`);
    };

    window.addEventListener(
      "pointermove",
      (event) => {
        latestPointerEvent = event;
        if (!pointerFrame) pointerFrame = window.requestAnimationFrame(updatePointer);
      },
      { passive: true },
    );

    document.querySelectorAll("[data-magnetic]").forEach((element) => {
      let bounds = null;

      element.addEventListener("pointerenter", () => {
        bounds = element.getBoundingClientRect();
      });

      element.addEventListener("pointermove", (event) => {
        if (!bounds) bounds = element.getBoundingClientRect();
        const x = (event.clientX - bounds.left - bounds.width / 2) * 0.12;
        const y = (event.clientY - bounds.top - bounds.height / 2) * 0.16;
        element.style.transform = `translate(${x}px, ${y}px)`;
      });

      element.addEventListener("pointerleave", () => {
        bounds = null;
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
    const fields = {
      name: leadForm.elements.namedItem("name"),
      phone: leadForm.elements.namedItem("phone"),
      message: leadForm.elements.namedItem("message"),
    };
    const submitButton = leadForm.querySelector("[type='submit']");
    const submitLabel = leadForm.querySelector("[data-submit-label]");
    let isSubmitting = false;

    const setFieldError = (field, message) => {
      const errorElement = leadForm.querySelector(`[data-error-for="${field.name}"]`);
      field.classList.toggle("is-invalid", Boolean(message));
      field.setAttribute("aria-invalid", String(Boolean(message)));
      if (errorElement) errorElement.textContent = message;
    };

    const clearFieldError = (field) => setFieldError(field, "");

    const validateForm = () => {
      const invalidFields = [];
      const name = fields.name.value.trim();
      const phone = fields.phone.value.trim();
      const message = fields.message.value.trim();
      const phonePattern = /^(?=.*\d)[+()\d\s-]{7,25}$/;

      Object.values(fields).forEach(clearFieldError);

      if (name.length < 2) {
        setFieldError(fields.name, "Укажите имя или название компании.");
        invalidFields.push(fields.name);
      }

      if (!phonePattern.test(phone)) {
        setFieldError(fields.phone, "Укажите телефон в формате +7 900 000-00-00.");
        invalidFields.push(fields.phone);
      }

      if (message.length < 10) {
        setFieldError(fields.message, "Опишите задачу минимум в нескольких словах.");
        invalidFields.push(fields.message);
      }

      return invalidFields;
    };

    Object.values(fields).forEach((field) => {
      field.addEventListener("input", () => {
        clearFieldError(field);
        formStatus.textContent = "";
        formStatus.className = "form-status";
      });
    });

    leadForm.addEventListener("invalid", (event) => {
      if (Object.values(fields).includes(event.target)) {
        setFieldError(event.target, event.target.validationMessage);
      }
    }, true);

    leadForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      if (isSubmitting) return;

      const honeypot = leadForm.elements.namedItem("_gotcha");
      if (honeypot && honeypot.value.trim()) {
        leadForm.reset();
        return;
      }

      const invalidFields = validateForm();
      if (invalidFields.length > 0) {
        invalidFields[0].focus();
        return;
      }

      const endpoint = leadForm.getAttribute("action") || "";
      if (endpoint.includes("YOUR_FORM_ID")) {
        formStatus.className = "form-status form-status--error";
        formStatus.textContent = "Форма почти готова: укажите Formspree ID в action формы.";
        return;
      }

      isSubmitting = true;
      submitButton.disabled = true;
      submitLabel.textContent = "Отправляем...";
      formStatus.textContent = "";
      formStatus.className = "form-status";

      try {
        const response = await fetch(endpoint, {
          method: "POST",
          body: new FormData(leadForm),
          headers: { Accept: "application/json" },
        });

        if (!response.ok) throw new Error("Formspree request failed");

        leadForm.reset();
        Object.values(fields).forEach(clearFieldError);
        formStatus.className = "form-status form-status--success";
        formStatus.textContent = "Заявка получена. Мы свяжемся с вами по телефону.";
      } catch (error) {
        formStatus.className = "form-status form-status--error";
        formStatus.textContent = "Не удалось отправить заявку. Попробуйте еще раз.";
      } finally {
        isSubmitting = false;
        submitButton.disabled = false;
        submitLabel.textContent = "Отправить задачу";
      }
    });
  }

  const year = document.querySelector("[data-year]");
  if (year) {
    year.textContent = new Date().getFullYear();
  }
})();
