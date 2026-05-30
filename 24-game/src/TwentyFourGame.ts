// ===============================
// 24 Game Boilerplate
// ===============================
//
// TODO:
// Complete the implementation of this game.
//
// Rules:
// 1. Four random cards (numbers 1 to 9) are dealt.
// 2. The player must use all four cards exactly once.
// 3. Allowed operations: +, -, *, /, and parentheses.
// 4. If the final result is 24, the player wins.
//
// Your Tasks:
// - Implement judgePoint24(cards)
// - Implement dealNewCards()
// - Implement renderCards()
// - Implement updateExpressionDisplay()
// - Implement clearExpression()
// - Implement undo()
// - Implement addHistory()
// - Complete the event handlers in init()
//
// Hint:
// Use `eval(expression)` to calculate the expression.
//
// ===============================

let currentCards = [];
let usedCardIndices = new Set();
let expression = "";

let cardsEl;
let exprEl;
let resultEl;
let historyEl;

export function judgePoint24(cards) {
  const EPSILON = 1e-6;

  function dfs(nums) {
    if (nums.length === 1) {
      return Math.abs(nums[0] - 24) < EPSILON;
    }

    const n = nums.length;
    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) {
        const a = nums[i];
        const b = nums[j];
        const rest = nums.filter((_, idx) => idx !== i && idx !== j);

        const candidates = [a + b, a - b, b - a, a * b];
        if (Math.abs(b) > EPSILON) candidates.push(a / b);
        if (Math.abs(a) > EPSILON) candidates.push(b / a);

        for (const val of candidates) {
          if (dfs([...rest, val])) {
            return true;
          }
        }
      }
    }
    return false;
  }
}

export function dealNewCards() {
  expression = "";
  usedCardIndices.clear();
  if (historyEl) historyEl.innerHTML = "";

  do {
    currentCards = Array.from(
      { length: 4 },
      () => Math.floor(Math.random() * 9) + 1,
    );
  } while (!judgePoint24(currentCards));

  renderCards();
  updateExpressionDisplay();
}

function renderCards() {
  // 1. Clear cardsEl
  cardsEl.innerHTML = "";
  // 2. For each card, create a <button> with:
  currentCards.forEach((card, i) => {
    const btn = document.createElement("button");
    btn.className = "card";
    btn.textContent = card.toString();
    btn.dataset.testid = `card-${i}`;
    btn.dataset.value = card.toString();
    btn.dataset.index = i.toString();
    btn.addEventListener("click", () => {
      expression += card.toString();
      usedCardIndices.add(i);
      updateExpressionDisplay();
      btn.disabled = true;
    });
    cardsEl.appendChild(btn);
  });
}

function updateExpressionDisplay() {
  exprEl.textContent = expression;
  try {
    const val = eval(expression);
    resultEl.textContent = "= " + val;
  } catch {
    resultEl.textContent = "= ?";
  }
}

function clearExpression() {
  expression = "";
  usedCardIndices.clear();
  updateExpressionDisplay();
  document.querySelectorAll(".card").forEach((btn) => (btn.disabled = false));
}

function undo() {
  // TODO:
  // 1. Remove last character from expression
  // 2. If it was a number, find the matching used card
  //    and re-enable it, remove from usedCardIndices
  // 3. Call updateExpressionDisplay()
}

function addHistory(move) {
  // TODO:
  // 1. Create a <li> element
  // 2. Set its textContent to move
  // 3. Set data-testid="history-item-{index}"
  // 4. Append to historyEl
}

export function init() {
  cardsEl = document.getElementById("cards");
  exprEl = document.getElementById("expression");
  resultEl = document.getElementById("result");
  historyEl = document.getElementById("history");

  document.getElementById("btn-add").onclick = () => {
    // TODO: Append "+" to expression, update display
  };

  document.getElementById("btn-sub").onclick = () => {
    // TODO: Append "-" to expression, update display
  };

  document.getElementById("btn-mul").onclick = () => {
    // TODO: Append "*" to expression, update display
  };

  document.getElementById("btn-div").onclick = () => {
    // TODO: Append "/" to expression, update display
  };

  document.getElementById("btn-lp").onclick = () => {
    // TODO: Append "(" to expression, update display
  };

  document.getElementById("btn-rp").onclick = () => {
    // TODO: Append ")" to expression, update display
  };

  document.getElementById("btn-undo").onclick = () => {
    // TODO: Call undo()
  };

  document.getElementById("btn-clear").onclick = () => {
    // TODO: Call clearExpression()
  };

  document.getElementById("btn-check").onclick = () => {
    // TODO:
    // 1. Check usedCardIndices.size === 4, alert if not
    // 2. eval(expression)
    // 3. If result === 24: show "= 24 🎉", addHistory with ✅
    // 4. Else: show wrong result with ❌, addHistory
    // 5. Catch invalid expression, show error, addHistory
  };

  document.getElementById("btn-new").onclick = () => {
    // TODO: Call dealNewCards()
  };

  document.getElementById("btn-shuffle").onclick = () => {
    // TODO: Call dealNewCards()
  };

  document.getElementById("btn-giveup").onclick = () => {
    // TODO:
    // 1. Call judgePoint24(currentCards)
    // 2. If solvable: alert user to keep trying
    // 3. If not solvable: alert user, call dealNewCards()
  };
}
