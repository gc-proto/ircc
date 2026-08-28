(function () {
  "use strict";

  document.documentElement.classList.remove("no-js");

  var mainSteps = Array.prototype.slice.call(document.querySelectorAll(".pr-step"));
  var mainTitles = mainSteps.map(function (stepEl) {
    var titleEl = stepEl.querySelector(".pr-step-title");
    return titleEl ? titleEl.textContent.trim() : "";
  });

  var flat = [];
  mainSteps.forEach(function (stepEl, mi) {
    var subItems = Array.prototype.slice.call(stepEl.querySelectorAll(".pr-substep"));
    if (subItems.length > 0) {
      subItems.forEach(function (subEl, si) {
        var targetId = subEl.dataset.target || "";
        var subTitleEl = subEl.querySelector(".pr-substep-title");
        flat.push({
          id: targetId,
          sec: document.getElementById(targetId),
          main: mi,
          sub: si,
          navMain: stepEl,
          navSub: subEl,
          subTitle: subTitleEl ? subTitleEl.textContent.trim() : ""
        });
      });
    } else {
      var stepTargetId = stepEl.dataset.target || "";
      flat.push({
        id: stepTargetId,
        sec: document.getElementById(stepTargetId),
        main: mi,
        sub: null,
        navMain: stepEl,
        navSub: null,
        subTitle: null
      });
    }
  });

  var fill = document.getElementById("pr-progress");
  var progText = document.getElementById("pr-progress-text");
  var toggleLbl = document.getElementById("pr-toggle-label");
  var stepper = document.getElementById("pr-stepper-nav") || document.querySelector(".pr-stepper");
  var toggleBtn = document.getElementById("pr-stepper-toggle");
  var currentFlat = -1;

  function setActive(fi) {
    if (fi < 0) fi = 0;
    if (fi >= flat.length) fi = flat.length - 1;
    if (fi === currentFlat) return;
    currentFlat = fi;
    var act = flat[fi];
    if (!act) return;

    mainSteps.forEach(function (s, i) {
      s.classList.toggle("is-active", i === act.main);
      s.classList.toggle("is-done", i < act.main);
    });

    flat.forEach(function (f, i) {
      if (!f.navSub) return;
      var isSubDone = (i < fi && f.main <= act.main);
      f.navSub.classList.toggle("is-active", i === fi);
      f.navSub.classList.toggle("is-done", isSubDone);
    });

    if (fill) {
      var pct = ((fi + 1) / flat.length * 100);
      fill.style.width = pct + "%";
    }

    var label = "Step " + (act.main + 1) + " of " + mainSteps.length;
    if (progText) progText.textContent = label;
    if (toggleLbl) {
      var title = (act.sub !== null ? act.subTitle : mainTitles[act.main]);
      toggleLbl.textContent = label + " \u00b7 " + title;
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

  var topBtn = document.getElementById("pr-top");
  if (topBtn) {
    topBtn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
      var mainHeading = document.getElementById("wb-cont");
      if (mainHeading) {
        mainHeading.setAttribute("tabindex", "-1");
        mainHeading.focus({ preventScroll: true });
      }
    });
  }

  function onScroll() {
    var probe = window.scrollY + window.innerHeight * 0.32;
    var fi = 0;

    for (var i = 0; i < flat.length; i++) {
      if (flat[i].sec && flat[i].sec.offsetTop <= probe) fi = i;
    }

    if ((window.innerHeight + window.scrollY) >= (document.documentElement.scrollHeight - 30)) {
      fi = flat.length - 1;
    }

    setActive(fi);

    if (topBtn) {
      topBtn.classList.toggle("is-visible", window.scrollY > 600);
    }
  }

  var stepperLinks = Array.prototype.slice.call(
    document.querySelectorAll('.pr-stepper a[href^="#"], .pr-step-link, .pr-substep-link')
  );
  stepperLinks.forEach(function (a) {
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
      }
    });
  });

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);

  var overlay = document.getElementById("processing-times-modal");
  var modalTitle = document.getElementById("pr-modal-title");
  var modalBody = document.getElementById("pr-modal-body");
  var modalCloseBtn = document.getElementById("pr-modal-close");
  var lastFocus = null;

  function trapFocus(e) {
    if (e.key === "Escape") {
      closeModal();
      return;
    }
    if (e.key === "Tab") {
      var focusables = overlay.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
      if (!focusables.length) return;
      var first = focusables[0];
      var last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }

  function openModal(key) {
    lastFocus = document.activeElement;
    document.body.style.overflow = "hidden";
    if (overlay) {
      overlay.classList.add("is-open");
      overlay.setAttribute("aria-hidden", "false");
    }
    if (modalCloseBtn) modalCloseBtn.focus();
    document.addEventListener("keydown", trapFocus);
  }

  function closeModal() {
    if (overlay) {
      overlay.classList.remove("is-open");
      overlay.setAttribute("aria-hidden", "true");
    }
    document.body.style.overflow = "";
    document.removeEventListener("keydown", trapFocus);
    if (lastFocus && typeof lastFocus.focus === "function") lastFocus.focus();
  }

  var modalTriggers = Array.prototype.slice.call(
    document.querySelectorAll('.pr-lbx, [data-modal="processing-times"]')
  );
  modalTriggers.forEach(function (trigger) {
    trigger.addEventListener("click", function (e) {
      e.preventDefault();
      openModal(this.dataset.modal || "processing-times");
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener("click", closeModal);
  }

  if (overlay) {
    overlay.addEventListener("click", function (e) {
      if (e.target === overlay) closeModal();
    });
  }

  var openAllBtn = document.getElementById("pr-btn-open-all");
  var closeAllBtn = document.getElementById("pr-btn-close-all");

  if (openAllBtn && closeAllBtn) {
    openAllBtn.addEventListener("click", function () {
      Array.prototype.slice.call(document.querySelectorAll("#stage-3a details")).forEach(function (d) {
        d.setAttribute("open", "");
      });
    });

    closeAllBtn.addEventListener("click", function () {
      Array.prototype.slice.call(document.querySelectorAll("#stage-3a details")).forEach(function (d) {
        d.removeAttribute("open");
      });
    });
  }

  onScroll();
})();
