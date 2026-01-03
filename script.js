(function () {
  var root = document.documentElement;
  try {
    var stored = localStorage.getItem("theme");
    var prefersLight =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: light)").matches;
    var initial = stored || (prefersLight ? "light" : "dark");

    function setTheme(t) {
      root.setAttribute("data-theme", t);
      try {
        localStorage.setItem("theme", t);
      } catch (e) {}
      var btn = document.querySelector(".theme-toggle");
      if (btn) {
        var label =
          t === "light" ? "Ubah ke tema gelap" : "Ubah ke tema terang";
        btn.setAttribute("aria-label", label);
        btn.title = label;
      }
    }

    setTheme(initial);

    var toggle = document.querySelector(".theme-toggle");
    if (toggle) {
      toggle.addEventListener("click", function () {
        var next =
          root.getAttribute("data-theme") === "light" ? "dark" : "light";
        setTheme(next);
      });
    }

    var menuBtn = document.querySelector(".menu-toggle");
    var menu = document.getElementById("menu");

    function setMenu(open) {
      root.classList.toggle("menu-open", !!open);
      if (menuBtn) {
        menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
        menuBtn.setAttribute("aria-label", open ? "Tutup menu" : "Buka menu");
        menuBtn.title = open ? "Tutup menu" : "Buka menu";
      }
    }

    if (menuBtn && menu) {
      menuBtn.addEventListener("click", function () {
        var open = !root.classList.contains("menu-open");
        setMenu(open);
      });
      menu.querySelectorAll("a").forEach(function (a) {
        a.addEventListener("click", function () {
          setMenu(false);
        });
      });
    }
  } catch (err) {}
})();

document.addEventListener("DOMContentLoaded", function () {
  /* ===== EFEK NGETIK (TANPA SUARA) ===== */
  var titleEl = document.getElementById("hero-title");
  var subtitleEl = document.getElementById("hero-subtitle");

  if (titleEl && subtitleEl) {
    var titlePrefix = "Halo, saya ";
    var nameText = "Raxtzy";
    var subtitleText = "Saya Adalah Pokoknya";

    titleEl.innerHTML = "";
    subtitleEl.textContent = "";

    var i = 0,
      j = 0,
      k = 0;

    var nameSpan = document.createElement("span");
    nameSpan.className = "accent";
    titleEl.appendChild(nameSpan);

    subtitleEl.classList.add("typing");

    function typeTitlePrefix() {
      if (i < titlePrefix.length) {
        titleEl.insertBefore(
          document.createTextNode(titlePrefix.charAt(i)),
          nameSpan
        );
        i++;
        setTimeout(typeTitlePrefix, 80);
      } else {
        setTimeout(typeName, 120);
      }
    }

    function typeName() {
      if (j < nameText.length) {
        nameSpan.textContent += nameText.charAt(j);
        j++;
        setTimeout(typeName, 80);
      } else {
        // 🔥 aktifkan glitch SETELAH typing selesai
        initGlitch(nameSpan);
        setTimeout(typeSubtitle, 200);
      }
    }

    function typeSubtitle() {
      if (k < subtitleText.length) {
        subtitleEl.textContent += subtitleText.charAt(k);
        k++;
        setTimeout(typeSubtitle, 60);
      } else {
        subtitleEl.classList.remove("typing");
      }
    }

    typeTitlePrefix();
  }

  /* ===== SCROLL REVEAL ===== */
  var reveals = document.querySelectorAll(".reveal");
  function onScrollReveal() {
    var winH = window.innerHeight;
    reveals.forEach(function (el) {
      var rect = el.getBoundingClientRect();
      if (rect.top < winH - 80) {
        el.classList.add("visible");
      }
    });
  }
  onScrollReveal();
  window.addEventListener("scroll", onScrollReveal);

  /* ===== BACK TO TOP ===== */
  var backTop = document.querySelector(".back-to-top");
  if (backTop) {
    window.addEventListener("scroll", function () {
      if (window.scrollY > 300) backTop.classList.add("show");
      else backTop.classList.remove("show");
    });
    backTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
});

/* MAGNETIC HOVER EFFECT */
function magneticEffect(elements, strength = 0.35) {
  elements.forEach((el) => {
    el.addEventListener("mousemove", (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
    });

    el.addEventListener("mouseleave", () => {
      el.style.transform = "translate(0,0)";
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  magneticEffect(document.querySelectorAll(".btn"), 0.25);
  magneticEffect(document.querySelectorAll(".card"), 0.15);
});

window.addEventListener("load", () => {
  const loader = document.getElementById("loader");

  setTimeout(() => {
    loader.classList.add("hide");
  }, 600); // delay dikit biar smooth
});

/* =========================
   GLITCH NEON (TYPED TEXT)
========================= */
function initGlitch(el) {
  el.setAttribute("data-text", el.textContent);

  setInterval(() => {
    el.classList.add("glitch");

    setTimeout(() => {
      el.classList.remove("glitch");
    }, 160);
  }, 2600);
}

document.querySelectorAll(".project-link").forEach(link => {
  link.addEventListener("click", function (e) {
    e.preventDefault();

    const url = this.href;
    const transition = document.getElementById("page-transition");

    transition.classList.add("active");

    setTimeout(() => {
      window.open(url, "_blank");
      transition.classList.remove("active");
    }, 500);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const hero = document.querySelector(".hero-visual");
  const codeGlass = document.querySelector(".code-glass");
  const icons = document.querySelectorAll(".float-icon");

  // Desktop only (biar HP ringan)
  if (window.innerWidth > 768 && hero && codeGlass) {
    hero.addEventListener("mousemove", (e) => {
      const rect = hero.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      const moveX = x * 0.02;
      const moveY = y * 0.02;

      // Code glass follow mouse
      codeGlass.style.transform =
        `translate(${moveX}px, ${moveY}px)`;

      // Floating icons depth effect
      icons.forEach((icon, i) => {
        const depth = (i + 1) * 0.015;
        icon.style.transform =
          `translate(${x * depth}px, ${y * depth}px)`;
      });
    });

    hero.addEventListener("mouseleave", () => {
      codeGlass.style.transform = "translate(0,0)";
      icons.forEach(icon => {
        icon.style.transform = "translate(0,0)";
      });
    });
  }
});


