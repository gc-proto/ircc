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

      var btn = s.querySelector(".pr-step-btn");
      var body = s.querySelector(".pr-step-body");
      var chev = s.querySelector(".pr-chev");

      if (btn) btn.setAttribute("aria-expanded", isActive ? "true" : "false");

      if (body) {
        if (isActive) {
          body.removeAttribute("hidden");
        } else {
          body.setAttribute("hidden", "");
        }
      }

      if (chev) {
        chev.classList.toggle("glyphicon-chevron-up", isActive);
        chev.classList.toggle("glyphicon-chevron-down", !isActive);
      }
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
    btn.addEventListener("click", function () {
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

  var overlay = document.getElementById("processing-times-modal");
  var modalCloseBtn = document.getElementById("pr-modal-close");
  var lastFocus = null;

  function trapFocus(e) {
    if (e.key === "Escape") { closeModal(); return; }
    if (e.key === "Tab" && overlay) {
      var els = overlay.querySelectorAll('button,[href],input,select,textarea,[tabindex]:not([tabindex="-1"])');
      if (!els.length) return;
      var first = els[0], last = els[els.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  }

  function openModal() {
    lastFocus = document.activeElement;
    document.body.style.overflow = "hidden";
    if (overlay) { overlay.classList.add("is-open"); overlay.setAttribute("aria-hidden", "false"); }
    if (modalCloseBtn) modalCloseBtn.focus();
    document.addEventListener("keydown", trapFocus);
  }

  function closeModal() {
    if (overlay) { overlay.classList.remove("is-open"); overlay.setAttribute("aria-hidden", "true"); }
    document.body.style.overflow = "";
    document.removeEventListener("keydown", trapFocus);
    if (lastFocus && typeof lastFocus.focus === "function") lastFocus.focus();
  }

  Array.prototype.slice.call(document.querySelectorAll('.pr-lbx,[data-modal="processing-times"]')).forEach(function (t) {
    t.addEventListener("click", function (e) { e.preventDefault(); openModal(); });
  });

  if (modalCloseBtn) modalCloseBtn.addEventListener("click", closeModal);
  if (overlay) overlay.addEventListener("click", function (e) { if (e.target === overlay) closeModal(); });

  var openAllBtn = document.getElementById("pr-btn-open-all");
  var closeAllBtn = document.getElementById("pr-btn-close-all");

  if (openAllBtn && closeAllBtn) {
    openAllBtn.addEventListener("click", function () {
      Array.prototype.slice.call(document.querySelectorAll("#stage-3a details")).forEach(function (d) { d.setAttribute("open", ""); });
    });
    closeAllBtn.addEventListener("click", function () {
      Array.prototype.slice.call(document.querySelectorAll("#stage-3a details")).forEach(function (d) { d.removeAttribute("open"); });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", onScroll);
  } else {
    onScroll();
  }
})();
