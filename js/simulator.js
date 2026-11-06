(function () {
  "use strict";

  // 月次複利計算
  // 月利 = (1 + 年利) ^ (1/12) - 1
  // 毎月末に積立額を追加し、その月の月利で運用
  function calculateCompound(initial, monthly, annualRate, years) {
    var monthlyRate = Math.pow(1 + annualRate, 1 / 12) - 1;
    var totalMonths = years * 12;
    var balance = initial;
    var yearlyBalances = [initial];

    for (var month = 1; month <= totalMonths; month++) {
      balance = balance * (1 + monthlyRate);
      balance += monthly;
      if (month % 12 === 0) {
        yearlyBalances.push(Math.round(balance));
      }
    }

    return {
      finalBalance: Math.round(balance),
      yearlyBalances: yearlyBalances
    };
  }

  // 単利計算
  function calculateSimple(initial, monthly, annualRate, years) {
    var totalPrincipal = initial + monthly * years * 12;
    var totalInterest = 0;
    var balance = initial;

    for (var year = 1; year <= years; year++) {
      var yearlyInterest = balance * annualRate;
      totalInterest += yearlyInterest;
      balance += monthly * 12;
    }

    return Math.round(totalPrincipal + totalInterest);
  }

  // 数値を日本円形式にフォーマット
  function formatYen(amount) {
    return amount.toLocaleString("ja-JP") + "円";
  }

  // チャート描画（Canvas）
  function drawChart(canvas, compoundData, simpleData, years) {
    var ctx = canvas.getContext("2d");
    if (!ctx) {
      return;
    }

    var width = canvas.width;
    var height = canvas.height;
    var padding = { top: 40, right: 40, bottom: 50, left: 80 };

    // 背景をクリア
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, width, height);

    // 最大値を取得
    var maxValue = Math.max.apply(null, compoundData.concat(simpleData));
    maxValue = Math.ceil(maxValue / 1000000) * 1000000;

    var chartWidth = width - padding.left - padding.right;
    var chartHeight = height - padding.top - padding.bottom;

    // グリッド線とY軸ラベル
    ctx.strokeStyle = "#e5e7eb";
    ctx.fillStyle = "#4a4a4a";
    ctx.font = "12px sans-serif";
    ctx.textAlign = "right";

    for (var i = 0; i <= 4; i++) {
      var value = (maxValue / 4) * i;
      var y = padding.top + chartHeight - (chartHeight / 4) * i;
      ctx.beginPath();
      ctx.moveTo(padding.left, y);
      ctx.lineTo(width - padding.right, y);
      ctx.stroke();
      var label = value >= 1000000 ? (value / 1000000) + "百万円" : value.toLocaleString("ja-JP") + "円";
      ctx.fillText(label, padding.left - 10, y + 4);
    }

    // X軸ラベル
    ctx.textAlign = "center";
    for (var year = 0; year <= years; year += 5) {
      var x = padding.left + (chartWidth / years) * year;
      ctx.fillText(year + "年", x, height - padding.bottom + 20);
    }
    if (years % 5 !== 0) {
      var lastX = padding.left + chartWidth;
      ctx.fillText(years + "年", lastX, height - padding.bottom + 20);
    }

    // 単利ライン（グレー）
    ctx.strokeStyle = "#9ca3af";
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    simpleData.forEach(function (value, index) {
      var x = padding.left + (chartWidth / years) * index;
      var y = padding.top + chartHeight - (value / maxValue) * chartHeight;
      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    ctx.stroke();
    ctx.setLineDash([]);

    // 複利ライン（緑）
    ctx.strokeStyle = "#0e7c61";
    ctx.lineWidth = 3;
    ctx.beginPath();
    compoundData.forEach(function (value, index) {
      var x = padding.left + (chartWidth / years) * index;
      var y = padding.top + chartHeight - (value / maxValue) * chartHeight;
      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    ctx.stroke();

    // 凡例
    ctx.font = "14px sans-serif";
    ctx.textAlign = "left";
    ctx.fillStyle = "#0e7c61";
    ctx.fillRect(padding.left, 10, 20, 3);
    ctx.fillStyle = "#1a1a1a";
    ctx.fillText("複利", padding.left + 25, 15);
    ctx.fillStyle = "#9ca3af";
    ctx.fillRect(padding.left + 80, 10, 20, 3);
    ctx.fillStyle = "#1a1a1a";
    ctx.fillText("単利", padding.left + 105, 15);
  }

  // シミュレーション実行
  function runSimulation() {
    var initialInput = document.getElementById("initial");
    var monthlyInput = document.getElementById("monthly");
    var rateInput = document.getElementById("rate");
    var yearsInput = document.getElementById("years");

    if (!initialInput || !monthlyInput || !rateInput || !yearsInput) {
      return;
    }

    var initial = parseFloat(initialInput.value) || 0;
    var monthly = parseFloat(monthlyInput.value) || 0;
    var rate = parseFloat(rateInput.value) || 0;
    var years = parseInt(yearsInput.value, 10) || 0;

    if (years <= 0) {
      return;
    }

    var annualRate = rate / 100;
    var compound = calculateCompound(initial, monthly, annualRate, years);
    var simple = calculateSimple(initial, monthly, annualRate, years);
    var totalPrincipal = initial + monthly * years * 12;
    var growth = compound.finalBalance - totalPrincipal;

    // 結果表示
    var resultCompound = document.getElementById("result-compound");
    var resultPrincipal = document.getElementById("result-principal");
    var resultGrowth = document.getElementById("result-growth");
    var resultSimple = document.getElementById("result-simple");

    if (resultCompound) {
      resultCompound.textContent = formatYen(compound.finalBalance);
    }
    if (resultPrincipal) {
      resultPrincipal.textContent = formatYen(totalPrincipal);
    }
    if (resultGrowth) {
      resultGrowth.textContent = formatYen(growth);
    }
    if (resultSimple) {
      resultSimple.textContent = formatYen(simple);
    }

    // チャート描画
    var canvas = document.getElementById("simulator-chart");
    if (canvas) {
      // 単利の年次データ
      var simpleYearly = [];
      var balance = initial;
      simpleYearly.push(initial);
      for (var year = 1; year <= years; year++) {
        var yearlyInterest = balance * annualRate;
        balance += monthly * 12 + yearlyInterest;
        simpleYearly.push(Math.round(balance));
      }
      drawChart(canvas, compound.yearlyBalances, simpleYearly, years);
    }
  }

  // 初期化
  document.addEventListener("DOMContentLoaded", function () {
    var form = document.getElementById("simulator-form");
    if (form) {
      form.addEventListener("submit", function (event) {
        event.preventDefault();
        runSimulation();
      });
    }

    // 初期表示
    runSimulation();
  });
})();
