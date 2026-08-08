let currentCards: number[] = [];
const usedCardIndices = new Set<number>();
let expression = "";

let cardsEl: HTMLElement;
let exprEl: HTMLElement;
let resultEl: HTMLElement;
let historyEl: HTMLElement;

export function judgePoint24(cards: number[]): boolean {
  const EPSILON = 1e-6;

  function dfs(nums: number[]): boolean {
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

  return dfs(cards.map(Number));
}

function findOneSolution(cards: number[]): string | null {
  const EPSILON = 1e-6;

  type Node = {
    value: number;
    expr: string;
  };

  const nodes: Node[] = cards.map((n) => ({
    value: n,
    expr: String(n),
  }));

  function dfs(arr: Node[]): string | null {
    if (arr.length === 1) {
      if (Math.abs(arr[0].value - 24) < EPSILON) {
        return arr[0].expr;
      }

      return null;
    }

    for (let i = 0; i < arr.length; i++) {
      for (let j = i + 1; j < arr.length; j++) {
        const a = arr[i];
        const b = arr[j];

        const rest = arr.filter((_, idx) => idx !== i && idx !== j);

        const candidates: Node[] = [
          {
            value: a.value + b.value,
            expr: `(${a.expr} + ${b.expr})`,
          },
          {
            value: a.value - b.value,
            expr: `(${a.expr} - ${b.expr})`,
          },
          {
            value: b.value - a.value,
            expr: `(${b.expr} - ${a.expr})`,
          },
          {
            value: a.value * b.value,
            expr: `(${a.expr} * ${b.expr})`,
          },
        ];

        if (Math.abs(b.value) > EPSILON) {
          candidates.push({
            value: a.value / b.value,
            expr: `(${a.expr} / ${b.expr})`,
          });
        }

        if (Math.abs(a.value) > EPSILON) {
          candidates.push({
            value: b.value / a.value,
            expr: `(${b.expr} / ${a.expr})`,
          });
        }

        for (const candidate of candidates) {
          const result = dfs([...rest, candidate]);

          if (result) {
            return result;
          }
        }
      }
    }

    return null;
  }

  return dfs(nodes);
}

export function dealNewCards(): void {
  expression = "";
  usedCardIndices.clear();

  historyEl.innerHTML = "";

  do {
    currentCards = Array.from(
      { length: 4 },
      () => Math.floor(Math.random() * 9) + 1,
    );
  } while (!judgePoint24(currentCards));

  renderCards();
  updateExpressionDisplay();
}

function renderCards(): void {
  cardsEl.innerHTML = "";

  currentCards.forEach((n, i) => {
    const btn = document.createElement("button");
    btn.className = "card";
    btn.textContent = String(n);
    btn.dataset.value = String(n);
    btn.dataset.index = String(i);
    btn.setAttribute("data-testid", `card-${i}`);
    btn.addEventListener("click", () => {
      expression += String(n);
      usedCardIndices.add(i);
      updateExpressionDisplay();
      btn.disabled = true;
    });

    cardsEl.appendChild(btn);
  });
}

function updateExpressionDisplay(): void {
  exprEl.textContent = expression;

  try {
    const val = eval(expression);
    resultEl.textContent = "= " + val;
  } catch {
    resultEl.textContent = "= ?";
  }
}

function clearExpression(): void {
  expression = "";
  usedCardIndices.clear();
  updateExpressionDisplay();
  document.querySelectorAll<HTMLButtonElement>(".card").forEach((btn) => {
    btn.disabled = false;
  });
}

function undo(): void {
  const lastChar = expression.slice(-1);
  expression = expression.slice(0, -1);

  if (!isNaN(parseInt(lastChar, 10))) {
    for (let i = currentCards.length - 1; i >= 0; i--) {
      if (
        currentCards[i] === parseInt(lastChar, 10) &&
        usedCardIndices.has(i)
      ) {
        const btn = document.querySelector<HTMLButtonElement>(
          `[data-testid="card-${i}"]`,
        );

        if (btn) {
          btn.disabled = false;
        }

        usedCardIndices.delete(i);

        break;
      }
    }
  }

  updateExpressionDisplay();
}

function addHistory(move: string): void {
  const li = document.createElement("li");
  li.textContent = move;
  li.setAttribute("data-testid", `history-item-${historyEl.children.length}`);
  historyEl.appendChild(li);
}

export function init(): void {
  cardsEl = document.getElementById("cards")!;
  exprEl = document.getElementById("expression")!;
  resultEl = document.getElementById("result")!;
  historyEl = document.getElementById("history")!;

  document.getElementById("btn-add")!.onclick = () => {
    expression += "+";
    updateExpressionDisplay();
  };

  document.getElementById("btn-sub")!.onclick = () => {
    expression += "-";
    updateExpressionDisplay();
  };

  document.getElementById("btn-mul")!.onclick = () => {
    expression += "*";
    updateExpressionDisplay();
  };

  document.getElementById("btn-div")!.onclick = () => {
    expression += "/";
    updateExpressionDisplay();
  };

  document.getElementById("btn-lp")!.onclick = () => {
    expression += "(";
    updateExpressionDisplay();
  };

  document.getElementById("btn-rp")!.onclick = () => {
    expression += ")";
    updateExpressionDisplay();
  };

  document.getElementById("btn-undo")!.onclick = undo;

  document.getElementById("btn-clear")!.onclick = clearExpression;

  document.getElementById("btn-check")!.onclick = () => {
    if (usedCardIndices.size !== 4) {
      alert("You must use all four cards.");
      return;
    }

    try {
      const val = eval(expression);

      if (Math.abs(val - 24) < 1e-6) {
        resultEl.textContent = "= 24 🎉";

        addHistory(`✅ ${expression} = 24`);
      } else {
        resultEl.textContent = `= ${val} ❌`;

        addHistory(`❌ ${expression} = ${val}`);
      }
    } catch {
      resultEl.textContent = `Invalid Expression ❌`;

      addHistory(`Invalid: ${expression}`);
    }
  };

  document.getElementById("btn-new")!.onclick = () => dealNewCards();

  document.getElementById("btn-shuffle")!.onclick = () => dealNewCards();

  document.getElementById("btn-giveup")!.onclick = () => {
    const solvable = judgePoint24(currentCards);

    if (solvable) {
      const wantsSolution = confirm(
        "This set is solvable! Do you want to see one possible solution?",
      );

      if (wantsSolution) {
        const solution = findOneSolution(currentCards);

        if (solution) {
          alert(`One possible solution is:\n\n${solution} = 24`);
        } else {
          alert("Could not find a solution.");
        }
      }
    } else {
      alert("This set is NOT solvable. Dealing new cards.");
      dealNewCards();
    }
  };
}
