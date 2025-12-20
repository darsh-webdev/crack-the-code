import { useState } from "react";
import "./App.css";

type Transaction = {
  id: number;
  title: string;
  amount: number;
  type: "income" | "expense";
};

function App() {
  // Initilize useState using transactions, title, amount, type, showForm and search
  const [showForm, setShowForm] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState<number | string>("");
  const [type, setType] = useState<"income" | "expense">("income");
  const [search, setSearch] = useState("");

  //create filteredTransactions
  const filteredTransactions = transactions.filter((t) =>
    t.title.toLowerCase().includes(search.toLowerCase())
  );

  //Calculate balance using totalIncome and totalExpense
  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, curr) => acc + curr.amount, 0);

  const balance = totalIncome - totalExpense;

  const handleAddTransaction = () => {
    // complete logic to create a new transaction object
    // update the state and reset form fields
    if (!title || !amount) return;
    const newTransaction: Transaction = {
      id: Date.now(),
      title,
      amount: Number(amount),
      type,
    };

    setTransactions((prev) => [...prev, newTransaction]);
    setShowForm(false);
    setTitle("");
    setAmount("");
    setType("income");
  };

  const handleDelete = (id: number) => {
    // implement delete logic
    const updatedTransactions = filteredTransactions.filter((t) => t.id !== id);
    setTransactions(updatedTransactions);
  };

  return (
    <div className="tracker-container">
      <h2>Expense Tracker</h2>

      <div className="header-container">
        <div className="balance">
          <h3 data-testid="balance-amount">Balance: ₹{balance}</h3>
        </div>

        <button
          className="toggle-form-button"
          data-testid="toggle-form-button"
          onClick={() => setShowForm((prev) => !prev)}
        >
          {showForm ? "Close Form" : "Open Form"}
        </button>
      </div>

      {showForm && (
        <div className="form">
          <input
            type="text"
            data-testid="title-input"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="number"
            data-testid="amount-input"
            placeholder="Amount"
            min="0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <select
            data-testid="type-select"
            value={type}
            onChange={(e) => setType((e.target.value as "income") || "expense")}
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          <button data-testid="add-button" onClick={handleAddTransaction}>
            Add Transaction
          </button>
        </div>
      )}

      <div className="summary">
        <div data-testid="income-amount">Income: ₹{totalIncome}</div>
        <div data-testid="expenses-amount">Expense: ₹{totalExpense}</div>
      </div>

      <input
        type="text"
        data-testid="search-input"
        placeholder="Search..."
        className="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {filteredTransactions.length === 0 ? (
        <div className="no-transactions" data-testid="no-transactions">
          No transactions found
        </div>
      ) : (
        <div className="transactions-list">
          {filteredTransactions.map((transaction) => (
            <ul
              key={transaction.id}
              className="transactions"
              data-testid="transaction-item"
            >
              <li className={`${transaction.type}`}>
                <span>
                  {transaction.title}: ₹{transaction.amount}
                </span>
                <button
                  onClick={() => handleDelete(transaction.id)}
                  data-testid="delete-button"
                >
                  Delete
                </button>
              </li>
            </ul>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
