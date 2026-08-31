(function () {
  "use strict";

  document.documentElement.classList.remove("no-js");

  var stepItems = Array.prototype.slice.call(document.querySelectorAll(".pr-step"));

  function getDocTop(el) {
    var top = 0;
    while (el) { top += el.offsetTop; el = el.offsetParent; }
    return top;
  }

  var flat = [];
  stepItems.forEach(function (stepEl, mi) {
    var mainId = stepEl.dataset.target || "";
    var subCards = Array.prototype.slice.call(stepEl.querySelectorAll(".pr-sub-card"));
    var stepBtn = stepEl.querySelector(".pr-step-btn");
    var stepBody = stepEl.querySelector(".pr-step-body");
    var chev = stepEl.querySelector(".pr-chev");

    if (subCards.length > 0) {
      subCards.forEach(function (card, si) {
        var href = card.getAttribute("href") || "";
        var id = href.replace(/^#/, "");
        flat.push({
          id: id,
          sec: document.getElementById(id),
          main: mi,
          sub: si,
          navMain: stepEl,
          navBtn: stepBtn,
          navBody: stepBody,
          navChev: chev,
          navCard: card
        });
      });
    } else {
      flat.push({
        id: mainId,
        sec: document.getElementById(mainId),
        main: mi,
        sub: null,
        navMain: stepEl,
        navBtn: stepBtn,
        navBody: stepBody,
        navChev: chev,
        navCard: null
      });
    }
  });

  var toggleLbl = document.getElementById("pr-toggle-label");
  var stepper = document.querySelector(".pr-stepper");
  var toggleBtn = document.getElementById("pr-stepper-toggle");
  var allSubCards = Array.prototype.slice.call(document.querySelectorAll(".pr-sub-card"));
  var currentFlat = -1;

  function setActive(fi) {
    if (fi < 0) fi = 0;
    if (fi >= flat.length) fi = flat.length - 1;
    if (fi === currentFlat) return;
    currentFlat = fi;
    var act = flat[fi];
    if (!act) return;

    stepItems.forEach(function (s, i) {
      var isActive = (i === act.main);
      var isDone = (i < act.main);
      s.classList.toggle("is-active", isActive);
      s.classList.toggle("is-done", isDone);
    });

    allSubCards.forEach(function (card) { card.classList.remove("is-active"); });
    if (act.navCard) act.navCard.classList.add("is-active");

    if (toggleLbl && act.navMain) {
      var titleEl = act.navMain.querySelector(".pr-step-title");
      if (titleEl) toggleLbl.textContent = titleEl.textContent.trim();
    }
  }

  function closeMenu() {
    if (!stepper || !toggleBtn) return;
    stepper.classList.remove("is-open");
    toggleBtn.setAttribute("aria-expanded", "false");
  }

  if (toggleBtn && stepper) {
    toggleBtn.addEventListener("click", function () {
      var open = stepper.classList.toggle("is-open");
      this.setAttribute("aria-expanded", open ? "true" : "false");
    });

    document.addEventListener("click", function (e) {
      if (stepper.classList.contains("is-open") && !stepper.contains(e.target)) {
        closeMenu();
      }
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 991) closeMenu();
    });
  }

  stepItems.forEach(function (stepEl) {
    var btn = stepEl.querySelector(".pr-step-btn");
    if (!btn) return;
    btn.addEventListener("click", function (e) {
      var targetId = stepEl.dataset.target;
      if (targetId) {
        var target = document.getElementById(targetId);
        if (target) {
          e.preventDefault();
          closeMenu();
          target.scrollIntoView({ behavior: "smooth", block: "start" });
          target.setAttribute("tabindex", "-1");
          target.focus({ preventScroll: true });
          currentFlat = -1;
          setTimeout(onScroll, 400);
          return;
        }
      }

      var body = stepEl.querySelector(".pr-step-body");
      var chev = stepEl.querySelector(".pr-chev");
      var isExpanded = this.getAttribute("aria-expanded") === "true";
      var nowOpen = !isExpanded;

      this.setAttribute("aria-expanded", nowOpen ? "true" : "false");
      if (body) {
        if (nowOpen) { body.removeAttribute("hidden"); } else { body.setAttribute("hidden", ""); }
      }
      if (chev) {
        chev.classList.toggle("glyphicon-chevron-up", nowOpen);
        chev.classList.toggle("glyphicon-chevron-down", !nowOpen);
      }
    });
  });

  var topBtn = document.getElementById("pr-top");
  if (topBtn) {
    topBtn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
      var h = document.getElementById("wb-cont");
      if (h) { h.setAttribute("tabindex", "-1"); h.focus({ preventScroll: true }); }
    });
  }

  function onScroll() {
    var probe = window.scrollY + Math.round(window.innerHeight * 0.28);
    var fi = 0;

    for (var i = 0; i < flat.length; i++) {
      if (flat[i].sec && getDocTop(flat[i].sec) <= probe) fi = i;
    }

    if ((window.innerHeight + window.scrollY) >= (document.documentElement.scrollHeight - 40)) {
      fi = flat.length - 1;
    }

    setActive(fi);

    if (topBtn) topBtn.classList.toggle("is-visible", window.scrollY > 600);
  }

  var subCardLinks = Array.prototype.slice.call(document.querySelectorAll(".pr-sub-card"));
  subCardLinks.forEach(function (a) {
    a.addEventListener("click", function (e) {
      var href = this.getAttribute("href");
      if (!href || href === "#") return;
      var target = document.getElementById(href.slice(1));
      if (target) {
        e.preventDefault();
        closeMenu();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        target.setAttribute("tabindex", "-1");
        target.focus({ preventScroll: true });
        currentFlat = -1;
        setTimeout(onScroll, 400);
      }
    });
  });

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", onScroll);
  } else {
    onScroll();
  }
})();
