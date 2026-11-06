(function () {
  "use strict";

  var STORAGE_KEY = "invest-atlas-read-pages";
  var TOTAL_PAGES = 12;

  // localStorageから読了ページ一覧を取得
  function getReadPages() {
    try {
      var stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      return [];
    }
  }

  // localStorageに読了ページ一覧を保存
  function saveReadPages(pages) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(pages));
    } catch (e) {
      // localStorageが利用できない場合は無視
    }
  }

  // 現在のページのファイル名を取得
  function getCurrentPage() {
    var path = window.location.pathname;
    return path.split("/").pop() || "index.html";
  }

  // 読了チェックの初期化
  function initReadCheck() {
    var checkbox = document.getElementById("read-check");
    if (!checkbox) {
      return;
    }

    var currentPage = getCurrentPage();
    var readPages = getReadPages();

    // 既に読了の場合はチェックを入れる
    if (readPages.indexOf(currentPage) !== -1) {
      checkbox.checked = true;
    }

    checkbox.addEventListener("change", function () {
      var pages = getReadPages();
      var index = pages.indexOf(currentPage);

      if (checkbox.checked) {
        if (index === -1) {
          pages.push(currentPage);
        }
      } else {
        if (index !== -1) {
          pages.splice(index, 1);
        }
      }

      saveReadPages(pages);
      updateProgressBar();
    });
  }

  // 進捗バーの更新
  function updateProgressBar() {
    var progressFill = document.querySelector(".progress-bar__fill");
    var progressValue = document.querySelector(".progress-bar__value");

    if (!progressFill && !progressValue) {
      return;
    }

    var readPages = getReadPages();
    var percentage = Math.round((readPages.length / TOTAL_PAGES) * 100);

    if (progressFill) {
      progressFill.style.width = percentage + "%";
      progressFill.setAttribute("aria-valuenow", String(percentage));
    }

    if (progressValue) {
      progressValue.textContent = "読了率: " + percentage + "%";
    }
  }

  // 初期化
  document.addEventListener("DOMContentLoaded", function () {
    initReadCheck();
    updateProgressBar();
  });
})();
