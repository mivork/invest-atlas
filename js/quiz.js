(function () {
  "use strict";

  // クイズの初期化
  function initQuiz() {
    var quizBlocks = document.querySelectorAll("[data-quiz]");

    quizBlocks.forEach(function (quizBlock) {
      var questions = quizBlock.querySelectorAll("[data-question]");

      questions.forEach(function (question) {
        var correctAnswer = question.getAttribute("data-answer");
        var options = question.querySelectorAll(".quiz__option");
        var feedbackCorrect = question.querySelector("[data-feedback-correct]");
        var feedbackIncorrect = question.querySelector("[data-feedback-incorrect]");

        options.forEach(function (option) {
          // クリックイベント
          option.addEventListener("click", function () {
            selectOption(question, option, correctAnswer, feedbackCorrect, feedbackIncorrect);
          });

          // キーボードイベント（Enter / Space）
          option.addEventListener("keydown", function (event) {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              selectOption(question, option, correctAnswer, feedbackCorrect, feedbackIncorrect);
            }
          });
        });
      });
    });
  }

  // 選択肢の選択処理
  function selectOption(question, selectedOption, correctAnswer, feedbackCorrect, feedbackIncorrect) {
    // 既に回答済みの場合は何もしない
    if (question.getAttribute("data-answered") === "true") {
      return;
    }

    var options = question.querySelectorAll(".quiz__option");
    var selectedValue = selectedOption.getAttribute("data-value");

    // 選択状態をマーク
    options.forEach(function (option) {
      option.classList.remove("quiz__option--selected");
      option.setAttribute("aria-disabled", "true");
    });
    selectedOption.classList.add("quiz__option--selected");

    // 正誤判定
    var isCorrect = selectedValue === correctAnswer;

    if (isCorrect) {
      selectedOption.classList.add("quiz__option--correct");
      if (feedbackCorrect) {
        feedbackCorrect.classList.add("quiz__feedback--visible");
      }
    } else {
      selectedOption.classList.add("quiz__option--incorrect");
      // 正解を表示
      options.forEach(function (option) {
        if (option.getAttribute("data-value") === correctAnswer) {
          option.classList.add("quiz__option--correct");
        }
      });
      if (feedbackIncorrect) {
        feedbackIncorrect.classList.add("quiz__feedback--visible");
      }
    }

    question.setAttribute("data-answered", "true");
  }

  // 初期化
  document.addEventListener("DOMContentLoaded", function () {
    initQuiz();
  });
})();
