(function () {
  "use strict";

  if (window.Granite && window.Granite.author) {
    return;
  }

  document.documentElement.classList.remove("no-js");

  var stepItems = Array.prototype.slice.call(document.querySelectorAll(".pr-step"));

  function getDocTop(el) {
    if (!el) return 0;
    return el.getBoundingClientRect().top + window.scrollY;
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

  var toggleParent = document.getElementById("pr-toggle-parent");
  var toggleLbl = document.getElementById("pr-toggle-label");
  var stepper = document.querySelector(".pr-stepper");
  var side = document.querySelector(".pr-side");
  var toggleBtn = document.getElementById("pr-stepper-toggle");
  var allSubCards = Array.prototype.slice.call(document.querySelectorAll(".pr-sub-card"));
  var currentFlat = -1;

  function scrollTargetIntoView(target) {
    if (!target) return;
    closeMenu();

    var offset = 30;
    if (window.innerWidth < 992) {
      offset = 100;
    }

    var targetTop = target.getBoundingClientRect().top + window.scrollY - offset;
    if (targetTop < 0) targetTop = 0;

    window.scrollTo({
      top: targetTop,
      behavior: "smooth"
    });
  }


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

      if (isActive && window.innerWidth >= 992) {
        var shouldAutoOpen = (manualDesktopCollapseScrollY === null) ||
                             (Math.abs(window.scrollY - manualDesktopCollapseScrollY) > 20);
        if (shouldAutoOpen) {
          manualDesktopCollapseScrollY = null;
          var body = s.querySelector(".pr-step-body");
          var btn = s.querySelector(".pr-step-btn");
          if (body && body.hasAttribute("hidden")) {
            body.removeAttribute("hidden");
          }
          if (btn && btn.getAttribute("aria-expanded") !== "true") {
            btn.setAttribute("aria-expanded", "true");
          }
        }
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

    if (act.navMain) {
      var titleEl = act.navMain.querySelector(".pr-step-title");
      var stageName = titleEl ? titleEl.textContent.trim() : "";
      var subName = act.navCard ? act.navCard.textContent.trim() : stageName;

      if (toggleParent) {
        toggleParent.textContent = stageName;
      }
      if (toggleLbl) {
        toggleLbl.textContent = subName;
      }
    }

    if (window.innerWidth >= 992) {
      var activeNavEl = act.navCard || act.navMain;
      scrollActiveNavIntoView(activeNavEl);
    }
  }

  function scrollActiveNavIntoView(activeEl) {
    if (!activeEl || window.innerWidth < 992 || !side) return;
    var sideRect = side.getBoundingClientRect();
    var elRect = activeEl.getBoundingClientRect();

    var offsetTop = elRect.top - sideRect.top;
    var offsetBottom = elRect.bottom - sideRect.bottom;

    if (offsetTop < 20) {
      side.scrollBy({
        top: offsetTop - 20,
        behavior: "smooth"
      });
    } else if (offsetBottom > -20) {
      side.scrollBy({
        top: offsetBottom + 20,
        behavior: "smooth"
      });
    }
  }

  function ensureActiveStepExpandedInSticky() {
    var actIndex = (currentFlat >= 0 && currentFlat < flat.length && flat[currentFlat])
      ? flat[currentFlat].main
      : 0;

    stepItems.forEach(function (s, i) {
      var body = s.querySelector(".pr-step-body");
      var btn = s.querySelector(".pr-step-btn");
      if (!body || !btn) return;

      if (i === actIndex) {
        body.removeAttribute("hidden");
        body.classList.add("is-expanded");
        s.classList.add("is-expanded");
        btn.setAttribute("aria-expanded", "true");
      } else {
        body.setAttribute("hidden", "");
        body.classList.remove("is-expanded");
        s.classList.remove("is-expanded");
        btn.setAttribute("aria-expanded", "false");
      }
    });
  }

  function openMenu() {
    if (!stepper || !toggleBtn) return;
    stepper.classList.add("is-open");
    toggleBtn.setAttribute("aria-expanded", "true");
    ensureActiveStepExpandedInSticky();
  }

  function closeMenu() {
    if (!stepper || !toggleBtn) return;
    stepper.classList.remove("is-open");
    toggleBtn.setAttribute("aria-expanded", "false");
    if (window.innerWidth < 992) {
      collapseAllMobileSteps();
    }
  }

  var manualToggleScrollY = null;
  var manualDesktopCollapseScrollY = null;
  if (toggleBtn && stepper) {
    toggleBtn.addEventListener("click", function () {
      var open = stepper.classList.toggle("is-open");
      this.setAttribute("aria-expanded", open ? "true" : "false");
      manualToggleScrollY = open ? window.scrollY : null;
      if (open) {
        ensureActiveStepExpandedInSticky();
      } else if (window.innerWidth < 992) {
        collapseAllMobileSteps();
      }
    });

    document.addEventListener("click", function (e) {
      if (stepper.classList.contains("is-open") && !stepper.contains(e.target)) {
        closeMenu();
        manualToggleScrollY = null;
      }
    });

    document.addEventListener("keydown", function (e) {
      if ((e.key === "Escape" || e.keyCode === 27) && stepper.classList.contains("is-open")) {
        closeMenu();
        manualToggleScrollY = null;
        toggleBtn.focus();
      }
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 991) {
        closeMenu();
        if (side) side.classList.remove("is-sticky");
        // On desktop, all options should be open by default
        stepItems.forEach(function (stepEl) {
          var btn = stepEl.querySelector(".pr-step-btn");
          var body = stepEl.querySelector(".pr-step-body");
          if (btn) btn.setAttribute("aria-expanded", "true");
          if (body) {
            body.removeAttribute("hidden");
            body.classList.remove("is-expanded");
          }
          stepEl.classList.remove("is-expanded");
        });
      } else {
        if (!side || !side.classList.contains("is-sticky") || !stepper.classList.contains("is-open")) {
          collapseAllMobileSteps();
        }
      }
    });
  }

  function collapseAllMobileSteps() {
    if (window.innerWidth < 992) {
      stepItems.forEach(function (stepEl) {
        var btn = stepEl.querySelector(".pr-step-btn");
        var body = stepEl.querySelector(".pr-step-body");
        if (btn) btn.setAttribute("aria-expanded", "false");
        if (body) {
          body.setAttribute("hidden", "");
          body.classList.remove("is-expanded");
        }
        stepEl.classList.remove("is-expanded");
      });
    }
  }

  function initStepperState() {
    if (window.innerWidth >= 992) {
      // On desktop, all options should be open by default
      stepItems.forEach(function (stepEl) {
        var btn = stepEl.querySelector(".pr-step-btn");
        var body = stepEl.querySelector(".pr-step-body");
        if (btn) btn.setAttribute("aria-expanded", "true");
        if (body) {
          body.removeAttribute("hidden");
          body.classList.remove("is-expanded");
        }
        stepEl.classList.remove("is-expanded");
      });
    } else {
      collapseAllMobileSteps();
    }
  }

  initStepperState();

  stepItems.forEach(function (stepEl, mi) {
    var btn = stepEl.querySelector(".pr-step-btn");
    var body = stepEl.querySelector(".pr-step-body");
    if (!btn || !body) return;

    btn.addEventListener("click", function (e) {
      e.preventDefault();
      var isExpanded = this.getAttribute("aria-expanded") === "true" || body.classList.contains("is-expanded");
      var targetId = stepEl.dataset.target;
      var clickedChevron = e.target.closest(".pr-step-chevron");

      // On mobile, clicking anywhere on the step button (text or chevron) expands/collapses
      if (window.innerWidth < 992 || clickedChevron) {
        var nowOpen = !isExpanded;
        this.setAttribute("aria-expanded", nowOpen ? "true" : "false");
        if (nowOpen) {
          body.removeAttribute("hidden");
          body.classList.add("is-expanded");
          stepEl.classList.add("is-expanded");
        } else {
          body.setAttribute("hidden", "");
          body.classList.remove("is-expanded");
          stepEl.classList.remove("is-expanded");
        }
        if (window.innerWidth >= 992) {
          manualDesktopCollapseScrollY = !nowOpen ? window.scrollY : null;
        }
        return;
      }

      if (stepEl.classList.contains("is-active") && isExpanded) {
        var nowOpen = !isExpanded;
        this.setAttribute("aria-expanded", nowOpen ? "true" : "false");
        if (nowOpen) {
          body.removeAttribute("hidden");
        } else {
          body.setAttribute("hidden", "");
        }
        if (window.innerWidth >= 992) {
          manualDesktopCollapseScrollY = !nowOpen ? window.scrollY : null;
        }
        return;
      }

      if (!isExpanded) {
        this.setAttribute("aria-expanded", "true");
        body.removeAttribute("hidden");
      }

      if (targetId) {
        var target = document.getElementById(targetId);
        if (target) {
          manualDesktopCollapseScrollY = null;
          closeMenu();
          scrollTargetIntoView(target);
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

    var circle = stepEl.querySelector(".pr-circle");
    if (circle) {
      circle.addEventListener("click", function () {
        btn.click();
      });
    }
  });

  function onScroll() {
    var isAtBottom = (window.innerHeight + window.scrollY) >= (document.documentElement.scrollHeight - 50);
    var fi = 0;

    if (isAtBottom) {
      fi = flat.length - 1;
    } else {
      var probeOffset = (window.innerWidth < 992) ? 120 : 100;
      for (var i = flat.length - 1; i >= 0; i--) {
        var sec = flat[i].sec;
        if (sec) {
          var top = sec.getBoundingClientRect().top;
          if (top <= probeOffset) {
            fi = i;
            break;
          }
        }
      }
    }

    setActive(fi);

    if (window.innerWidth >= 992) {
      var actMain = flat[fi] ? flat[fi].main : 0;
      var activeStep = stepItems[actMain];
      if (activeStep) {
        var shouldAutoOpen = (manualDesktopCollapseScrollY === null) ||
                             (Math.abs(window.scrollY - manualDesktopCollapseScrollY) > 20);
        if (shouldAutoOpen) {
          manualDesktopCollapseScrollY = null;
          var actBody = activeStep.querySelector(".pr-step-body");
          var actBtn = activeStep.querySelector(".pr-step-btn");
          if (actBody && actBody.hasAttribute("hidden")) {
            actBody.removeAttribute("hidden");
          }
          if (actBtn && actBtn.getAttribute("aria-expanded") !== "true") {
            actBtn.setAttribute("aria-expanded", "true");
          }
        }
      }
    }

    if (window.innerWidth < 992 && stepper && toggleBtn) {
      var firstSec = flat.length > 0 ? flat[0].sec : null;
      var collapseThreshold = firstSec ? (getDocTop(firstSec) - 140) : 600;

      if (window.scrollY >= collapseThreshold) {
        if (side) side.classList.add("is-sticky");
        if (manualToggleScrollY !== null) {
          if (Math.abs(window.scrollY - manualToggleScrollY) > 30) {
            manualToggleScrollY = null;
            closeMenu();
          }
        } else {
          closeMenu();
        }
      } else {
        if (side) side.classList.remove("is-sticky");
        manualToggleScrollY = null;
        closeMenu();
      }
    }
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
        manualDesktopCollapseScrollY = null;
        closeMenu();
        scrollTargetIntoView(target);
        target.setAttribute("tabindex", "-1");
        target.focus({ preventScroll: true });
        for (var i = 0; i < flat.length; i++) {
          if (flat[i].id === targetId) {
            setActive(i);
            break;
          }
        }
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
  window.__prtdOnScroll = onScroll;

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", onScroll);
  } else {
    onScroll();
  }
})();
