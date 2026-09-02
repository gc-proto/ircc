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
    var chev = stepEl.querySelector(".pr-step-chevron");

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
      var chev = s.querySelector(".pr-step-chevron");
      if (chev) {
        chev.src = isActive
          ? "assets/figma/nav-chevron-active.svg"
          : "assets/figma/nav-chevron.svg";
      }
    });

    allSubCards.forEach(function (card) {
      card.classList.remove("is-active");
      card.removeAttribute("aria-current");
    });
    if (act.navCard) {
      act.navCard.classList.add("is-active");
      act.navCard.setAttribute("aria-current", "page");
    }

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

    document.addEventListener("keydown", function (e) {
      if ((e.key === "Escape" || e.keyCode === 27) && stepper.classList.contains("is-open")) {
        closeMenu();
        toggleBtn.focus();
      }
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 991) closeMenu();
    });
  }

  stepItems.forEach(function (stepEl, mi) {
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
          for (var i = 0; i < flat.length; i++) {
            if (flat[i].id === targetId || flat[i].main === mi) {
              setActive(i);
              break;
            }
          }
          currentFlat = -1;
          setTimeout(onScroll, 400);
        }
      }
    });
  });

  var topBtn = document.getElementById("pr-top");
  if (topBtn) {
    topBtn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
      var h = document.getElementById("wb-cont");
      if (h) {
        h.setAttribute("tabindex", "-1");
        h.focus({ preventScroll: true });
      }
      currentFlat = -1;
      setActive(0);
      setTimeout(onScroll, 400);
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

    if (topBtn) topBtn.classList.toggle("is-visible", window.scrollY > 400);
  }

  var subCardLinks = Array.prototype.slice.call(document.querySelectorAll(".pr-sub-card"));
  subCardLinks.forEach(function (a) {
    a.addEventListener("click", function (e) {
      var href = this.getAttribute("href");
      if (!href || href === "#") return;
      var targetId = href.slice(1);
      var target = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        closeMenu();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        target.setAttribute("tabindex", "-1");
        target.focus({ preventScroll: true });
        for (var i = 0; i < flat.length; i++) {
          if (flat[i].id === targetId) {
            setActive(i);
            break;
          }
        }
        currentFlat = -1;
        setTimeout(onScroll, 400);
      }
    });
  });

  var ticking = false;
  function requestTick() {
    if (!ticking) {
      window.requestAnimationFrame(function () {
        onScroll();
        ticking = false;
      });
      ticking = true;
    }
  }

  window.addEventListener("scroll", requestTick, { passive: true });
  window.addEventListener("resize", requestTick);

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", onScroll);
  } else {
    onScroll();
  }
})();
