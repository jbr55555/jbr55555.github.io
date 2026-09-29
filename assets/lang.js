// Langue du site : choix mémorisé, sinon langue du navigateur (français si elle commence par "fr", anglais sinon)
(function () {
  var root = document.documentElement;
  var saved = null;
  try { saved = localStorage.getItem("lang"); } catch (e) {}
  var lang = saved === "fr" || saved === "en" ? saved
    : ((navigator.language || "en").toLowerCase().indexOf("fr") === 0 ? "fr" : "en");

  function apply(l) {
    root.setAttribute("data-lang", l);
    root.setAttribute("lang", l);
    var buttons = document.querySelectorAll(".lang button");
    for (var i = 0; i < buttons.length; i++)
      buttons[i].setAttribute("aria-pressed", buttons[i].getAttribute("data-set-lang") === l ? "true" : "false");
    var t = root.getAttribute("data-title-" + l);
    if (t) document.title = t;
  }

  apply(lang);
  document.addEventListener("DOMContentLoaded", function () {
    apply(lang);
    var buttons = document.querySelectorAll(".lang button");
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener("click", function () {
        lang = this.getAttribute("data-set-lang");
        try { localStorage.setItem("lang", lang); } catch (e) {}
        apply(lang);
      });
    }
  });
})();
