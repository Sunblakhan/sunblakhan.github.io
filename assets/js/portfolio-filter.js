(function () {
  document.addEventListener("DOMContentLoaded", function () {
    var bar = document.querySelector(".portfolio-filters");
    var grid = document.querySelector(".portfolio-grid");
    if (!bar || !grid) return;

    bar.addEventListener("click", function (e) {
      var btn = e.target.closest("[data-filter]");
      if (!btn) return;

      var id = btn.getAttribute("data-filter");
      bar.querySelectorAll("[data-filter]").forEach(function (b) {
        b.classList.toggle("is-active", b === btn);
      });

      grid.querySelectorAll(".project-card").forEach(function (card) {
        if (id === "all") {
          card.hidden = false;
          return;
        }
        var raw = card.getAttribute("data-categories") || "";
        var cats = raw.split(/\s+/).filter(Boolean);
        card.hidden = cats.indexOf(id) === -1;
      });
    });
  });
})();
