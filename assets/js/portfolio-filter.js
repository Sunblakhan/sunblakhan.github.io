(function () {
  function normalize(s) {
    return (s || "").toLowerCase().replace(/\s+/g, " ").trim();
  }

  function getActiveFilterId(page) {
    var active = page.querySelector(".portfolio-filters [data-filter].is-active");
    if (!active) return "all";
    return active.getAttribute("data-filter") || "all";
  }

  function cardCategories(card) {
    var raw = card.getAttribute("data-categories") || "";
    return raw.split(/\s+/).filter(Boolean);
  }

  function cardMatchesCategory(card, filterId) {
    if (!filterId || filterId === "all") return true;
    return cardCategories(card).indexOf(filterId) !== -1;
  }

  function cardSearchHaystack(card) {
    var fromAttr = card.getAttribute("data-search");
    if (fromAttr) return normalize(fromAttr);
    return normalize(card.textContent);
  }

  function cardMatchesSearch(card, query) {
    if (!query) return true;
    return cardSearchHaystack(card).indexOf(query) !== -1;
  }

  function setCardVisible(card, show) {
    card.classList.toggle("is-filtered-out", !show);
    if (show) {
      card.removeAttribute("hidden");
    } else {
      card.setAttribute("hidden", "");
    }
  }

  function applyFilters(page) {
    var grid = page.querySelector(".portfolio-grid");
    if (!grid) return;

    var filterId = getActiveFilterId(page);
    var searchInput = page.querySelector(".portfolio-search-input");
    var query = searchInput ? normalize(searchInput.value) : "";

    var visible = 0;
    grid.querySelectorAll(".project-card").forEach(function (card) {
      var show =
        cardMatchesCategory(card, filterId) && cardMatchesSearch(card, query);
      setCardVisible(card, show);
      if (show) visible += 1;
    });

    var empty = page.querySelector(".portfolio-empty");
    if (empty) {
      empty.hidden = visible === 0;
    }
  }

  function bindPage(page) {
    var bar = page.querySelector(".portfolio-filters");
    var grid = page.querySelector(".portfolio-grid");
    if (!bar || !grid) return;

    bar.addEventListener("click", function (e) {
      var btn = e.target.closest("button[data-filter]");
      if (!btn || !bar.contains(btn)) return;

      bar.querySelectorAll("button[data-filter]").forEach(function (b) {
        b.classList.toggle("is-active", b === btn);
      });

      applyFilters(page);
    });

    var searchInput = page.querySelector(".portfolio-search-input");
    if (searchInput) {
      searchInput.addEventListener("input", function () {
        applyFilters(page);
      });
      searchInput.addEventListener("search", function () {
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
