(function () {
  "use strict";

  // 用語集の検索・絞り込み
  function initGlossary() {
    var searchInput = document.getElementById("glossary-search");
    var categorySelect = document.getElementById("glossary-category");
    var itemsContainer = document.getElementById("glossary-items");
    var countElement = document.getElementById("glossary-count");

    if (!itemsContainer) {
      return;
    }

    var items = itemsContainer.querySelectorAll(".glossary__item");

    function filterItems() {
      var searchQuery = searchInput ? searchInput.value.trim().toLowerCase() : "";
      var selectedCategory = categorySelect ? categorySelect.value : "";
      var visibleCount = 0;

      items.forEach(function (item) {
        var term = (item.getAttribute("data-term") || "").toLowerCase();
        var reading = (item.getAttribute("data-reading") || "").toLowerCase();
        var definition = (item.getAttribute("data-definition") || "").toLowerCase();
        var category = item.getAttribute("data-category") || "";

        var matchesSearch =
          searchQuery === "" ||
          term.indexOf(searchQuery) !== -1 ||
          reading.indexOf(searchQuery) !== -1 ||
          definition.indexOf(searchQuery) !== -1;

        var matchesCategory = selectedCategory === "" || category === selectedCategory;

        if (matchesSearch && matchesCategory) {
          item.style.display = "";
          visibleCount++;
        } else {
          item.style.display = "none";
        }
      });

      // 件数表示
      if (countElement) {
        if (visibleCount === 0) {
          countElement.textContent = "該当する用語が見つかりませんでした。";
        } else {
          countElement.textContent = visibleCount + "件の用語が見つかりました。";
        }
      }

      // 空状態メッセージ
      var emptyMessage = itemsContainer.querySelector(".glossary__empty");
      if (visibleCount === 0 && !emptyMessage) {
        emptyMessage = document.createElement("div");
        emptyMessage.className = "glossary__empty";
        emptyMessage.textContent = "検索条件に合う用語がありません。キーワードやカテゴリを変更してください。";
        itemsContainer.appendChild(emptyMessage);
      } else if (visibleCount > 0 && emptyMessage) {
        emptyMessage.remove();
      }
    }

    if (searchInput) {
      searchInput.addEventListener("input", filterItems);
    }

    if (categorySelect) {
      categorySelect.addEventListener("change", filterItems);
    }

    // 初期表示
    filterItems();
  }

  // 初期化
  document.addEventListener("DOMContentLoaded", function () {
    initGlossary();
  });
})();
