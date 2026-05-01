(function () {
  var KEY = "sunbla-site-lang";

  function readQuery() {
    try {
      var q = new URLSearchParams(window.location.search);
      if (q.get("lang") === "de") return "de";
      if (q.get("lang") === "en") return "en";
    } catch (e) {}
    return null;
  }

  function apply(lang) {
    var root = document.documentElement;
    var resolved = lang === "de" ? "de" : "en";
    root.lang = resolved === "de" ? "de" : "en";
    root.classList.remove("site-lang-en", "site-lang-de");
    root.classList.add(resolved === "de" ? "site-lang-de" : "site-lang-en");
    root.style.colorScheme = "dark";
    try {
      localStorage.setItem(KEY, resolved);
    } catch (e) {}

    document.querySelectorAll("[data-set-lang]").forEach(function (btn) {
      var on = btn.getAttribute("data-set-lang") === resolved;
      btn.setAttribute("aria-pressed", on ? "true" : "false");
      btn.classList.toggle("is-active", on);
    });
  }

  function initial() {
    var q = readQuery();
    if (q) return q;
    try {
      if (localStorage.getItem(KEY) === "de") return "de";
    } catch (e) {}
    return "en";
  }

  document.addEventListener("DOMContentLoaded", function () {
    apply(initial());
  });

  document.addEventListener("click", function (e) {
    var t = e.target.closest("[data-set-lang]");
    if (!t) return;
    apply(t.getAttribute("data-set-lang"));
  });
})();
