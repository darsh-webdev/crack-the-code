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
  // TODO: Implement using DFS / Backtracking
}

export function dealNewCards() {
  // TODO:
  // 1. Reset expression and usedCardIndices
  // 2. Clear history
  // 3. Generate 4 random numbers between 1 and 9
  // 4. Repeat until judgePoint24 returns true
  // 5. Call renderCards()
  // 6. Call updateExpressionDisplay()
}

function renderCards() {
  // TODO:
  // 1. Clear cardsEl
  // 2. For each card, create a <button> with:
  //    - class "card"
  //    - data-testid="card-{i}"
  //    - data-index="{i}"
  //    - On click: append card value to expression,
  //      mark index as used, disable button,
  //      call updateExpressionDisplay()
}

function updateExpressionDisplay() {
  // TODO:
  // 1. Set exprEl.textContent = expression
  // 2. Try eval(expression)
  // 3. Show result if valid, otherwise show "= ?"
}

function clearExpression() {
  // TODO:
  // 1. Reset expression to ""
  // 2. Clear usedCardIndices
  // 3. Re-enable all .card buttons
  // 4. Call updateExpressionDisplay()
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
