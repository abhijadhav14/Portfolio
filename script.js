(() => {
  const header = document.querySelector(".site-header");
  const nav = document.querySelector("#site-nav");
  const toggle = document.querySelector(".nav-toggle");
  const copyBtn = document.querySelector("#copy-email");
  const reveals = document.querySelectorAll(".reveal");

  const onScroll = () => {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 12);
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  if (copyBtn) {
    copyBtn.addEventListener("click", async () => {
      const email = copyBtn.dataset.email || "abhinjadhav14@gmail.com";
      const original = copyBtn.textContent;

      try {
        await navigator.clipboard.writeText(email);
        copyBtn.textContent = "Copied ✓";
      } catch {
        copyBtn.textContent = "Copy failed";
      }

      window.setTimeout(() => {
        copyBtn.textContent = original;
      }, 1800);
    });
  }

  const markVisible = (el) => el.classList.add("is-visible");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          markVisible(entry.target);
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.05, rootMargin: "0px 0px -10% 0px" }
    );

    reveals.forEach((el) => observer.observe(el));
  }

  // Safety: never leave portfolio sections invisible.
  window.setTimeout(() => {
    reveals.forEach(markVisible);
  }, 1200);
})();
