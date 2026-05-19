(function () {
  function normalize(s) {
    return (s || "").toLowerCase().trim();
  }

  function cardMatchesCategory(card, filterId) {
    if (filterId === "all") return true;
    var raw = card.getAttribute("data-categories") || "";
    var cats = raw.split(/\s+/).filter(Boolean);
    return cats.indexOf(filterId) !== -1;
  }

  function cardMatchesSearch(card, query) {
    if (!query) return true;
    var hay = normalize(card.getAttribute("data-search"));
    return hay.indexOf(query) !== -1;
  }

  function applyFilters(page) {
    var grid = page.querySelector(".portfolio-grid");
    var searchInput = page.querySelector(".portfolio-search-input");
    if (!grid) return;

    var filterId =
      (page.querySelector(".portfolio-filters [data-filter].is-active") || {}).getAttribute(
        "data-filter"
      ) || "all";
    var query = searchInput ? normalize(searchInput.value) : "";

    var visible = 0;
    grid.querySelectorAll(".project-card").forEach(function (card) {
      var show =
        cardMatchesCategory(card, filterId) && cardMatchesSearch(card, query);
      card.hidden = !show;
      if (show) visible += 1;
    });

    var empty = page.querySelector(".portfolio-empty");
    if (empty) {
      empty.hidden = visible > 0;
    }
  }

  function bindPage(page) {
    var bar = page.querySelector(".portfolio-filters");
    var grid = page.querySelector(".portfolio-grid");
    var searchInput = page.querySelector(".portfolio-search-input");
    if (!bar || !grid) return;

    bar.addEventListener("click", function (e) {
      var btn = e.target.closest("[data-filter]");
      if (!btn) return;

      bar.querySelectorAll("[data-filter]").forEach(function (b) {
        b.classList.toggle("is-active", b === btn);
      });

      applyFilters(page);
    });

    if (searchInput) {
      searchInput.addEventListener("input", function () {
        applyFilters(page);
      });
    }
  }

  function syncSearchPlaceholders() {
    var isDe = document.documentElement.classList.contains("site-lang-de");
    document.querySelectorAll(".portfolio-search-input").forEach(function (input) {
      var ph = isDe
        ? input.getAttribute("data-placeholder-de")
        : input.getAttribute("data-placeholder-en");
      if (ph) input.placeholder = ph;
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    syncSearchPlaceholders();
    document.querySelectorAll(".portfolio-page").forEach(bindPage);
  });

  document.addEventListener("click", function (e) {
    if (e.target.closest("[data-set-lang]")) {
      setTimeout(syncSearchPlaceholders, 0);
    }
  });
})();
