import { useState } from "react";
import "./App.css";

type Counter = {
  id: number;
  quantities: number[];
  totalQuantity: number;
};

function App() {
  const [countersCount, setCountersCount] = useState<number | null>(null);
  const [counters, setCounters] = useState<Counter[]>([]);
  const [quantityValue, setQuantityValue] = useState<number | null>(null);
  const [message, setMessage] = useState("");

  const onSetCounters = () => {
    if (countersCount === null || countersCount <= 0) return;
    const newCounters: Counter[] = [];
    for (let i = 1; i <= countersCount; i++) {
      newCounters.push({ id: i, quantities: [], totalQuantity: 0 });
    }
    setCounters(newCounters);
  };

  const onAddCustomer = () => {
    if (quantityValue === null || quantityValue <= 0) return;

    const countersCopy = [...counters];

    // Find the counter with the least total quantity
    const targetCounter = countersCopy.sort(
      (a, b) => a.totalQuantity - b.totalQuantity,
    )[0];

    // Update the target counter with the new quantity
    const updatedCounters = counters.map((counter) => {
      if (counter.id === targetCounter.id) {
        const updatedQuantities = [...counter.quantities, quantityValue];
        setMessage(`Customer assigned to Counter ${counter.id}`);
        return {
          ...counter,
          quantities: updatedQuantities,
          totalQuantity: counter.totalQuantity + quantityValue,
        };
      }
      return counter;
    });

    setCounters(updatedCounters);
    setQuantityValue(null); // Reset the input field after adding a customer
  };

  return (
    <div className="billing-container" data-testid="billing-container">
      <h2 data-testid="heading">Billing Counter System</h2>
      {counters.length === 0 ? (
        <div className="input-section" data-testid="counter-input-section">
          <input
            data-testid="counter-input"
            type="number"
            value={countersCount === null ? "" : countersCount}
            onChange={(e) => setCountersCount(Number(e.target.value))}
            placeholder="Number of counters"
          />
          <button data-testid="set-counter-button" onClick={onSetCounters}>
            Set Counters
          </button>
        </div>
      ) : (
        <div className="input-section" data-testid="counter-input-section">
          <input
            data-testid="quantity-input"
            type="number"
            value={quantityValue === null ? "" : quantityValue}
            onChange={(e) => setQuantityValue(Number(e.target.value))}
            placeholder="Enter Quantity"
          />
          <button data-testid="add-customer-button" onClick={onAddCustomer}>
            Add Customer
          </button>
        </div>
      )}

      {message && (
        <p data-testid="assignment-msg" className="assigned-msg ">
          {message}
        </p>
      )}

      {counters.length > 0 && (
        <div className="counter-wrapper">
          {counters.map((counter, index) => (
            <div
              className="counter"
              key={counter.id}
              data-textid={`counter-${index}`}
            >
              <h4 data-testid="counter-heading">Counter {counter.id}</h4>
              {counter.quantities.length > 0 && (
                <div className="queue" data-testid={`queue-${index}`}>
                  {counter.quantities.map((quantity, index) => (
                    <div
                      key={index}
                      className="customer-box"
                      data-testid="customer-box"
                    >
                      {quantity}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
