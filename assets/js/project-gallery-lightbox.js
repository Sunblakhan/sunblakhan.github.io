(function () {
  function init() {
    var root = document.querySelector(".gallery-lightbox");
    var section = document.querySelector(".project-gallery-section");
    if (!root || !section) return;

    var triggers = Array.prototype.slice.call(
      section.querySelectorAll(".project-gallery-trigger")
    );
    if (!triggers.length) return;

    var img = root.querySelector(".gallery-lightbox__img");
    var capEn = root.querySelector(".gallery-lightbox__cap-en");
    var capDe = root.querySelector(".gallery-lightbox__cap-de");
    var counter = root.querySelector(".gallery-lightbox__counter");
    var btnPrev = root.querySelector(".gallery-lightbox__nav--prev");
    var btnNext = root.querySelector(".gallery-lightbox__nav--next");
    var panel = root.querySelector(".gallery-lightbox__panel");
    var current = 0;
    var lastFocus = null;

    function item(i) {
      return triggers[i];
    }

    function show(i) {
      current = (i + triggers.length) % triggers.length;
      var el = item(current);
      img.src = el.getAttribute("data-full-src") || "";
      img.alt = el.getAttribute("data-caption-en") || "";
      var en = el.getAttribute("data-caption-en") || "";
      var de = el.getAttribute("data-caption-de") || "";
      if (capEn) capEn.textContent = en;
      if (capDe) capDe.textContent = de;
      if (counter) {
        counter.textContent = current + 1 + " / " + triggers.length;
      }
      var hasCap = en !== "" || de !== "";
      root.classList.toggle("gallery-lightbox--no-caption", !hasCap);
      btnPrev.disabled = triggers.length <= 1;
      btnNext.disabled = triggers.length <= 1;
    }

    function open(i) {
      lastFocus = document.activeElement;
      show(i);
      root.hidden = false;
      root.setAttribute("aria-hidden", "false");
      document.body.classList.add("gallery-lightbox-open");
      if (panel) panel.focus();
    }

    function close() {
      root.hidden = true;
      root.setAttribute("aria-hidden", "true");
      document.body.classList.remove("gallery-lightbox-open");
      img.removeAttribute("src");
      if (lastFocus && typeof lastFocus.focus === "function") {
        lastFocus.focus();
      }
    }

    triggers.forEach(function (btn, idx) {
      btn.addEventListener("click", function () {
        open(idx);
      });
    });

    root.querySelectorAll("[data-lightbox-close]").forEach(function (el) {
      el.addEventListener("click", close);
    });

    if (btnPrev) {
      btnPrev.addEventListener("click", function (e) {
        e.stopPropagation();
        show(current - 1);
      });
    }
    if (btnNext) {
      btnNext.addEventListener("click", function (e) {
        e.stopPropagation();
        show(current + 1);
      });
    }

    document.addEventListener("keydown", function (e) {
      if (root.hidden) return;
      if (e.key === "Escape") {
        e.preventDefault();
        close();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        show(current - 1);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        show(current + 1);
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
