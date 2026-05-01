(function () {
  if (!window.IntersectionObserver) return;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document.documentElement.classList.add("reduce-motion");
    return;
  }

  var root = document.querySelector(".content-inner");
  if (!root) return;

  function queue(el, index) {
    el.classList.add("motion-reveal");
    var delayMs = Math.min(index * 42, 360);
    el.style.setProperty("--motion-delay", delayMs + "ms");
    observer.observe(el);
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-inview");
        observer.unobserve(entry.target);
      });
    },
    { root: null, rootMargin: "0px 0px -6% 0px", threshold: 0.08 }
  );

  var i = 0;

  root.querySelectorAll(":scope > section").forEach(function (section) {
    if (section.classList.contains("hero")) return;
    queue(section, i++);
  });

  root.querySelectorAll(".personality-dashboard section").forEach(function (section) {
    queue(section, i++);
  });

  root.querySelectorAll("article.card").forEach(function (card) {
    if (card.closest(".content-inner > section")) return;
    queue(card, i++);
  });

  root.querySelectorAll(".about-snapshot, details.story-block").forEach(function (el) {
    queue(el, i++);
  });

  var footer = document.querySelector(".site-footer");
  if (footer) {
    queue(footer, i++);
  }
})();
