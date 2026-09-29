// Sommaire latéral commun à toutes les pages (une seule liste à tenir à jour quand un jeu s'ajoute).
// Ordinateur : colonne fixe à gauche. Tablette / téléphone : tiroir ouvert par le bouton ☰ de l'en-tête.
(function () {
  var GAMES = [
    { id: "runes-and-demons", href: "runes-and-demons.html", icon: "assets/runes-and-demons/icon.png", name: "Runes & Demons" }
    // { id: "nexus", href: "nexus.html", icon: "assets/nexus/icon.png", name: "Nexus" },
  ];

  function el(tag, attrs, children) {
    var e = document.createElement(tag);
    for (var k in attrs) e.setAttribute(k, attrs[k]);
    (children || []).forEach(function (c) { e.appendChild(typeof c === "string" ? document.createTextNode(c) : c); });
    return e;
  }
  function bi(fr, en) { return [el("span", { lang: "fr" }, [fr]), el("span", { lang: "en" }, [en])]; }

  document.addEventListener("DOMContentLoaded", function () {
    var body = document.body;
    var page = body.getAttribute("data-page");
    var pixel = body.classList.contains("theme-pixel");
    var side = document.getElementById("sidebar");
    if (!side) return;

    var logo = el("img", { src: pixel ? "assets/studio-logo-pixel.png" : "assets/studio-logo.png", alt: "", width: "40", height: "40" });
    if (pixel) logo.className = "pixel";
    var brand = el("a", { class: "side-brand", href: "./" }, [logo, el("span", {}, ["T55555 Games"])]);

    var list = el("ul", { class: "side-list" });
    function item(id, href, content) {
      var a = el("a", { href: href }, content);
      if (id === page) { a.className = "active"; a.setAttribute("aria-current", "page"); }
      list.appendChild(el("li", {}, [a]));
    }
    item("home", "./", bi("Accueil", "Home"));
    list.appendChild(el("li", { class: "side-heading" }, bi("Jeux", "Games")));
    GAMES.forEach(function (g) {
      item(g.id, g.href, [el("img", { src: g.icon, alt: "", width: "28", height: "28" }), el("span", {}, [g.name])]);
    });

    var foot = el("ul", { class: "side-list side-foot" });
    var priv = el("a", { href: "privacy.html" }, bi("Confidentialité", "Privacy"));
    if (page === "privacy") { priv.className = "active"; priv.setAttribute("aria-current", "page"); }
    foot.appendChild(el("li", {}, [priv]));
    var contact = el("a", { href: "contact.html" }, ["Contact"]);
    if (page === "contact") { contact.className = "active"; contact.setAttribute("aria-current", "page"); }
    foot.appendChild(el("li", {}, [contact]));

    side.appendChild(brand);
    side.appendChild(el("nav", { "aria-label": "Sommaire / Contents" }, [list]));
    side.appendChild(foot);

    // Tiroir (tablette / téléphone)
    var toggle = document.getElementById("menu-toggle");
    var scrim = el("div", { class: "scrim", hidden: "" });
    body.appendChild(scrim);
    function setOpen(open) {
      body.classList.toggle("menu-open", open);
      if (toggle) toggle.setAttribute("aria-expanded", open ? "true" : "false");
      if (open) scrim.removeAttribute("hidden"); else scrim.setAttribute("hidden", "");
    }
    if (toggle) toggle.addEventListener("click", function () { setOpen(!body.classList.contains("menu-open")); });
    scrim.addEventListener("click", function () { setOpen(false); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") setOpen(false); });
    side.addEventListener("click", function (e) { if (e.target.closest("a")) setOpen(false); });
  });
})();
