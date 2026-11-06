(function () {
  "use strict";

  // 現在のページをサイドバーでハイライト
  function highlightCurrentPage() {
    var currentPath = window.location.pathname;
    var currentFile = currentPath.split("/").pop() || "index.html";
    var links = document.querySelectorAll(".sidebar__link, .header__nav-link");

    links.forEach(function (link) {
      var href = link.getAttribute("href");
      if (!href) {
        return;
      }
      var linkFile = href.split("/").pop();
      if (linkFile === currentFile) {
        link.setAttribute("aria-current", "page");
      }
    });
  }

  // アコーディオン
  function initAccordion() {
    var triggers = document.querySelectorAll(".accordion__trigger");

    triggers.forEach(function (trigger) {
      trigger.addEventListener("click", function () {
        var expanded = trigger.getAttribute("aria-expanded") === "true";
        var contentId = trigger.getAttribute("aria-controls");
        var content = document.getElementById(contentId);

        trigger.setAttribute("aria-expanded", String(!expanded));
        if (content) {
          if (expanded) {
            content.setAttribute("hidden", "");
          } else {
            content.removeAttribute("hidden");
          }
        }
      });
    });
  }

  // TOC スムーズスクロール
  function initSmoothScroll() {
    var tocLinks = document.querySelectorAll(".right-rail__toc-link");

    tocLinks.forEach(function (link) {
      link.addEventListener("click", function (event) {
        var href = link.getAttribute("href");
        if (!href || !href.startsWith("#")) {
          return;
        }
        event.preventDefault();
        var target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
          target.setAttribute("tabindex", "-1");
          target.focus({ preventScroll: true });
        }
      });
    });
  }

  // TOC アクティブ状態の更新（スクロール連動）
  function initTocHighlight() {
    var tocLinks = document.querySelectorAll(".right-rail__toc-link");
    if (tocLinks.length === 0) {
      return;
    }

    var sections = [];
    tocLinks.forEach(function (link) {
      var href = link.getAttribute("href");
      if (href && href.startsWith("#")) {
        var section = document.querySelector(href);
        if (section) {
          sections.push({ link: link, section: section });
        }
      }
    });

    if (sections.length === 0) {
      return;
    }

    function updateActive() {
      var scrollPos = window.scrollY + 100;
      var activeLink = null;

      sections.forEach(function (item) {
        if (item.section.offsetTop <= scrollPos) {
          activeLink = item.link;
        }
      });

      tocLinks.forEach(function (link) {
        link.classList.remove("right-rail__toc-link--active");
      });

      if (activeLink) {
        activeLink.classList.add("right-rail__toc-link--active");
      }
    }

    window.addEventListener("scroll", updateActive, { passive: true });
    updateActive();
  }

  // フッター年号
  function setFooterYear() {
    var yearElements = document.querySelectorAll(".footer__year");
    var currentYear = new Date().getFullYear();
    yearElements.forEach(function (el) {
      el.textContent = String(currentYear);
    });
  }

  // 用語集ツールチップ（data-term属性を持つ要素）
  function initTermTooltips() {
    var terms = document.querySelectorAll("[data-term]");
    terms.forEach(function (term) {
      var definition = term.getAttribute("data-definition");
      if (definition) {
        term.setAttribute("title", definition);
      }
    });
  }

  // 初期化
  document.addEventListener("DOMContentLoaded", function () {
    highlightCurrentPage();
    initAccordion();
    initSmoothScroll();
    initTocHighlight();
    setFooterYear();
    initTermTooltips();
  });
})();
