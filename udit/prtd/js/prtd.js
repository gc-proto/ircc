(function () {
  "use strict";

  if (window.Granite && window.Granite.author) {
    return;
  }

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

  var toggleParent = document.getElementById("pr-toggle-parent");
  var toggleLbl = document.getElementById("pr-toggle-label");
  var stepper = document.querySelector(".pr-stepper");
  var side = document.querySelector(".pr-side");
  var toggleBtn = document.getElementById("pr-stepper-toggle");
  var allSubCards = Array.prototype.slice.call(document.querySelectorAll(".pr-sub-card"));
  var currentFlat = -1;
  var userSideScrollTimeout = null;
  var isUserScrollingSide = false;

  if (side) {
    side.addEventListener("wheel", function () {
      isUserScrollingSide = true;
      clearTimeout(userSideScrollTimeout);
      userSideScrollTimeout = setTimeout(function () {
        isUserScrollingSide = false;
      }, 1500);
    }, { passive: true });

    side.addEventListener("touchstart", function () {
      isUserScrollingSide = true;
      clearTimeout(userSideScrollTimeout);
      userSideScrollTimeout = setTimeout(function () {
        isUserScrollingSide = false;
      }, 1500);
    }, { passive: true });
  }

  var announcer = document.getElementById("pr-step-announcer");
  function announceStep(message) {
    if (!announcer) {
      announcer = document.getElementById("pr-step-announcer");
    }
    if (!announcer) return;
    announcer.textContent = "";
    setTimeout(function () {
      announcer.textContent = message;
    }, 50);
  }

  function scrollTargetIntoView(target) {
    target.scrollIntoView({
      behavior: "smooth",
      block: "start"
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
      announceStep(open ? "Step navigation menu opened" : "Step navigation menu closed");
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
    var body = stepEl.querySelector(".pr-step-body");
    if (!btn || !body) return;

    btn.addEventListener("click", function (e) {
      e.preventDefault();
      var isExpanded = this.getAttribute("aria-expanded") === "true";
      var targetId = stepEl.dataset.target;
      var clickedChevron = e.target.closest(".pr-step-chevron");

      if (clickedChevron || (stepEl.classList.contains("is-active") && isExpanded)) {
        var nowOpen = !isExpanded;
        this.setAttribute("aria-expanded", nowOpen ? "true" : "false");
        if (nowOpen) {
          body.removeAttribute("hidden");
        } else {
          body.setAttribute("hidden", "");
        }
        var titleEl = stepEl.querySelector(".pr-step-title");
        var stageName = titleEl ? titleEl.textContent.trim() : "";
        announceStep(stageName + (nowOpen ? " sub-steps expanded" : " sub-steps collapsed"));
        return;
      }

      if (!isExpanded) {
        this.setAttribute("aria-expanded", "true");
        body.removeAttribute("hidden");
      }

      if (targetId) {
        var target = document.getElementById(targetId);
        if (target) {
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
          var titleEl = stepEl.querySelector(".pr-step-title");
          var stageName = titleEl ? titleEl.textContent.trim() : "";
          announceStep("Navigated to " + stageName);
        }
      }
    });
  });

  function syncSideNav(act) {
    if (!side || window.innerWidth < 992 || isUserScrollingSide) return;

    var maxScroll = side.scrollHeight - side.clientHeight;
    if (maxScroll <= 0) return;

    var targetScroll = 0;
    var layout = document.querySelector(".pr-layout");

    if (layout) {
      var layoutRect = layout.getBoundingClientRect();
      var travel = layoutRect.height - window.innerHeight;
      if (travel > 0) {
        var progress = (20 - layoutRect.top) / travel;
        progress = Math.max(0, Math.min(1, progress));
        targetScroll = progress * maxScroll;
      }
    }

    if (act) {
      var activeEl = act.navCard || act.navMain;
      if (activeEl) {
        var elTop = activeEl.offsetTop;
        var elBottom = elTop + activeEl.offsetHeight + 24;
        if (elBottom > targetScroll + side.clientHeight) {
          targetScroll = elBottom - side.clientHeight;
        }
        if (elTop - 24 < targetScroll) {
          targetScroll = elTop - 24;
        }
      }
    }

    if ((window.innerHeight + window.scrollY) >= (document.documentElement.scrollHeight - 50)) {
      targetScroll = maxScroll;
    } else if (window.scrollY <= 150) {
      targetScroll = 0;
    }

    targetScroll = Math.max(0, Math.min(maxScroll, targetScroll));
    side.scrollTop = targetScroll;
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
    syncSideNav(flat[fi]);
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
        scrollTargetIntoView(target);
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
        var subCardText = this.textContent.trim();
        var parentStep = this.closest(".pr-step");
        var parentTitle = parentStep ? parentStep.querySelector(".pr-step-title") : null;
        var parentName = parentTitle ? parentTitle.textContent.trim() : "";
        announceStep("Navigated to " + (parentName ? parentName + ", " : "") + subCardText);
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
