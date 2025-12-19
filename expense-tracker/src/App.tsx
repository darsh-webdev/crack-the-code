import { useState } from "react";
import "./App.css";

function App() {
  // Initilize useState using transactions, title, amount, type, showForm and search
  const [showForm, setShowForm] = useState(false);

  //create filteredTransactions

  //Calculate balance using totalIncome and totalExpense

  const handleAddTransaction = () => {
    // complete logic to create a new transaction object
    // update the state and reset form fields
  };

  const handleDelete = (id) => {
    // implement delete logic
  };

  return (
    <div className="tracker-container">
      <h2>Expense Tracker</h2>

      <div className="header-container">
        <div className="balance">
          <h3 data-testid="balance-amount">Balance: ₹0</h3>
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
          <input type="text" data-testid="title-input" placeholder="Title" />
          <input
            type="number"
            data-testid="amount-input"
            placeholder="Amount"
            min="0"
          />
          <select data-testid="type-select">
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          <button data-testid="add-button" onClick={handleAddTransaction}>
            Add Transaction
          </button>
        </div>
      )}

      <div className="summary">
        <div data-testid="income-amount">Income: ₹0</div>
        <div data-testid="expenses-amount">Expense: ₹0</div>
      </div>

      <input
        type="text"
        data-testid="search-input"
        placeholder="Search..."
        className="search"
      />
    </div>
  );
}

export default App;
