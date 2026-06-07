/* ============================================================
   Monster Gym — shared app script
   Injects header/footer, handles nav, theme, gallery & forms.
   Note: this is a front-end demo. "Auth" and "booking" are
   client-side only — no real backend or data is stored.
   ============================================================ */
(function () {
  "use strict";

  const NAV_LINKS = [
    { href: "index.html", label: "Home", key: "home" },
    { href: "about.html", label: "About", key: "about" },
    { href: "gallery.html", label: "Gallery", key: "gallery" },
    { href: "booking.html", label: "Membership", key: "booking" },
    { href: "contact.html", label: "Contact", key: "contact" },
  ];

  const YEAR = new Date().getFullYear();

  /* ---------- Theme ---------- */
  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    try { localStorage.setItem("mg-theme", theme); } catch (e) {}
    const btn = document.querySelector(".theme-toggle");
    if (btn) btn.textContent = theme === "dark" ? "☀️" : "🌙";
  }
  function initTheme() {
    let theme = "light";
    try { theme = localStorage.getItem("mg-theme") || "light"; } catch (e) {}
    applyTheme(theme);
  }

  /* ---------- Header / Footer injection ---------- */
  function buildHeader() {
    const page = document.body.dataset.page || "";
    const links = NAV_LINKS.map(
      (l) =>
        `<li><a href="${l.href}" class="${l.key === page ? "active" : ""}">${l.label}</a></li>`
    ).join("");

    return `
      <header class="site-header">
        <div class="container nav">
          <a class="brand" href="index.html">
            <img src="assets/img/logo.jpeg" alt="Monster Gym logo" />
            <span>MONSTER<b>GYM</b></span>
          </a>
          <nav>
            <ul class="nav-links" id="navLinks">${links}</ul>
          </nav>
          <div class="nav-actions">
            <button class="icon-btn theme-toggle" type="button" aria-label="Toggle dark mode">🌙</button>
            <a class="btn btn-primary" href="login.html">Login</a>
            <button class="icon-btn nav-toggle" type="button" aria-label="Open menu" aria-expanded="false">☰</button>
          </div>
        </div>
      </header>`;
  }

  function buildFooter() {
    return `
      <footer class="site-footer">
        <div class="container">
          <div class="footer-grid">
            <div>
              <div class="footer-brand">MONSTER<b>GYM</b></div>
              <p style="color:var(--text-muted);max-width:320px">
                Go hard or go home. Helping you achieve your fitness goals with
                expert trainers, flexible plans and the newest equipment.
              </p>
            </div>
            <div>
              <h4>Explore</h4>
              <ul>
                <li><a href="about.html">About Us</a></li>
                <li><a href="gallery.html">Gallery</a></li>
                <li><a href="booking.html">Membership</a></li>
                <li><a href="contact.html">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4>Account</h4>
              <ul>
                <li><a href="login.html">Login</a></li>
                <li><a href="signup.html">Sign up</a></li>
                <li><a href="admin-login.html">Admin</a></li>
              </ul>
            </div>
          </div>
          <div class="footer-bottom">
            © ${YEAR} Monster Gym · Almaza, Heliopolis, Cairo · (+20) 109 958 6277
          </div>
        </div>
      </footer>`;
  }

  function initChrome() {
    const header = document.getElementById("site-header");
    const footer = document.getElementById("site-footer");
    if (header) header.innerHTML = buildHeader();
    if (footer) footer.innerHTML = buildFooter();

    // theme toggle
    const themeBtn = document.querySelector(".theme-toggle");
    if (themeBtn) {
      themeBtn.addEventListener("click", () => {
        const next =
          document.documentElement.getAttribute("data-theme") === "dark"
            ? "light"
            : "dark";
        applyTheme(next);
      });
      // sync icon with current theme
      applyTheme(document.documentElement.getAttribute("data-theme") || "light");
    }

    // mobile nav
    const toggle = document.querySelector(".nav-toggle");
    const navLinks = document.getElementById("navLinks");
    if (toggle && navLinks) {
      toggle.addEventListener("click", () => {
        const open = navLinks.classList.toggle("open");
        toggle.setAttribute("aria-expanded", String(open));
      });
      navLinks.querySelectorAll("a").forEach((a) =>
        a.addEventListener("click", () => navLinks.classList.remove("open"))
      );
    }
  }

  /* ---------- Toast ---------- */
  function toast(message) {
    let el = document.querySelector(".toast");
    if (!el) {
      el = document.createElement("div");
      el.className = "toast";
      document.body.appendChild(el);
    }
    el.textContent = message;
    requestAnimationFrame(() => el.classList.add("show"));
    setTimeout(() => el.classList.remove("show"), 2600);
  }

  /* ---------- Validation helpers ---------- */
  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  function setError(input, message) {
    const field = input.closest(".field");
    if (!field) return;
    input.classList.add("invalid");
    const err = field.querySelector(".error");
    if (err) {
      err.textContent = message;
      err.classList.add("show");
    }
  }
  function clearError(input) {
    const field = input.closest(".field");
    if (!field) return;
    input.classList.remove("invalid");
    const err = field.querySelector(".error");
    if (err) err.classList.remove("show");
  }

  /* ---------- Password show / hide ---------- */
  function initPasswordToggles() {
    document.querySelectorAll(".pw-toggle").forEach((btn) => {
      btn.addEventListener("click", () => {
        const input = btn.parentElement.querySelector("input");
        if (!input) return;
        const show = input.type === "password";
        input.type = show ? "text" : "password";
        btn.textContent = show ? "🙈" : "👁️";
      });
    });
  }

  /* ---------- Login form ---------- */
  function initLoginForm() {
    const form = document.getElementById("loginForm");
    if (!form) return;
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = form.email;
      const password = form.password;
      let ok = true;
      [email, password].forEach(clearError);

      if (!email.value.trim()) { setError(email, "Email is required."); ok = false; }
      else if (!EMAIL_RE.test(email.value.trim())) { setError(email, "Please enter a valid email address."); ok = false; }
      if (!password.value) { setError(password, "Password is required."); ok = false; }

      if (ok) {
        toast("Welcome back! Signing you in…");
        setTimeout(() => (window.location.href = "index.html"), 1200);
      }
    });
  }

  /* ---------- Sign-up form ---------- */
  function initSignupForm() {
    const form = document.getElementById("signupForm");
    if (!form) return;
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const f = form;
      const fields = [f.firstname, f.lastname, f.email, f.password, f.confirm, f.birthday];
      let ok = true;
      fields.forEach(clearError);

      if (!f.firstname.value.trim()) { setError(f.firstname, "First name is required."); ok = false; }
      if (!f.lastname.value.trim()) { setError(f.lastname, "Last name is required."); ok = false; }
      if (!f.email.value.trim()) { setError(f.email, "Email is required."); ok = false; }
      else if (!EMAIL_RE.test(f.email.value.trim())) { setError(f.email, "Please enter a valid email address."); ok = false; }
      if (!f.password.value) { setError(f.password, "Password is required."); ok = false; }
      else if (f.password.value.length < 6) { setError(f.password, "Use at least 6 characters."); ok = false; }
      if (!f.confirm.value) { setError(f.confirm, "Please confirm your password."); ok = false; }
      else if (f.confirm.value !== f.password.value) { setError(f.confirm, "Passwords do not match."); ok = false; }
      if (!f.birthday.value) { setError(f.birthday, "Birthday is required."); ok = false; }

      if (ok) {
        toast("Account created successfully!");
        setTimeout(() => (window.location.href = "login.html"), 1300);
      }
    });
  }

  /* ---------- Admin login ---------- */
  function initAdminForm() {
    const form = document.getElementById("adminForm");
    if (!form) return;
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const user = form.username;
      const pass = form.password;
      let ok = true;
      [user, pass].forEach(clearError);
      if (!user.value.trim()) { setError(user, "Admin ID is required."); ok = false; }
      if (!pass.value) { setError(pass, "Password is required."); ok = false; }
      if (ok) {
        toast("Access granted");
        setTimeout(() => (window.location.href = "admin.html"), 1000);
      }
    });
  }

  /* ---------- Booking form ---------- */
  function initBookingForm() {
    const form = document.getElementById("bookingForm");
    if (!form) return;

    const priceEl = document.getElementById("summaryPrice");
    function updatePrice() {
      const checked = form.querySelector('input[name="plan"]:checked');
      if (checked && priceEl) priceEl.textContent = checked.value + " EGP";
    }
    form.querySelectorAll('input[name="plan"]').forEach((r) =>
      r.addEventListener("change", updatePrice)
    );
    updatePrice();

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = form.fullname;
      const date = form.startdate;
      let ok = true;
      [name, date].forEach(clearError);
      if (!name.value.trim()) { setError(name, "Your name is required."); ok = false; }
      if (!date.value) { setError(date, "Please choose a start date."); ok = false; }

      if (ok) {
        const plan = form.querySelector('input[name="plan"]:checked');
        toast("Booking confirmed — " + (plan ? plan.value + " EGP" : "") + " 🎉");
        setTimeout(() => (window.location.href = "index.html"), 1600);
      }
    });
  }

  /* ---------- Gallery lightbox ---------- */
  function initGallery() {
    const grid = document.getElementById("galleryGrid");
    if (!grid) return;
    const imgs = Array.from(grid.querySelectorAll("img"));
    let current = 0;

    const box = document.createElement("div");
    box.className = "lightbox";
    box.innerHTML = `
      <button class="lb-close" aria-label="Close">✕</button>
      <button class="lb-nav prev" aria-label="Previous">‹</button>
      <img alt="Gallery image" />
      <button class="lb-nav next" aria-label="Next">›</button>`;
    document.body.appendChild(box);
    const lbImg = box.querySelector("img");

    function show(i) {
      current = (i + imgs.length) % imgs.length;
      lbImg.src = imgs[current].src;
      box.classList.add("open");
    }
    function close() { box.classList.remove("open"); }

    imgs.forEach((img, i) => img.addEventListener("click", () => show(i)));
    box.querySelector(".lb-close").addEventListener("click", close);
    box.querySelector(".prev").addEventListener("click", () => show(current - 1));
    box.querySelector(".next").addEventListener("click", () => show(current + 1));
    box.addEventListener("click", (e) => { if (e.target === box) close(); });
    document.addEventListener("keydown", (e) => {
      if (!box.classList.contains("open")) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") show(current - 1);
      if (e.key === "ArrowRight") show(current + 1);
    });
  }

  /* ---------- Reveal on scroll ---------- */
  function initReveal() {
    const items = document.querySelectorAll("[data-reveal]");
    if (!items.length || !("IntersectionObserver" in window)) {
      items.forEach((i) => (i.style.opacity = 1));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.style.transition = "opacity .6s ease, transform .6s ease";
            en.target.style.opacity = 1;
            en.target.style.transform = "none";
            io.unobserve(en.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    items.forEach((i) => {
      i.style.opacity = 0;
      i.style.transform = "translateY(24px)";
      io.observe(i);
    });
  }

  /* ---------- Boot ---------- */
  initTheme();
  document.addEventListener("DOMContentLoaded", () => {
    initChrome();
    initPasswordToggles();
    initLoginForm();
    initSignupForm();
    initAdminForm();
    initBookingForm();
    initGallery();
    initReveal();
  });
})();
