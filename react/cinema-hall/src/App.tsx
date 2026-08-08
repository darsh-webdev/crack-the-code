import { useState } from "react";
import "./App.css";

const ROW = 10,
  COL = 10;

const rowLabels = "ABCDEFGHIJ".split("");

function App() {
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [bookedSeats, setBookedSeats] = useState<string[]>([]);

  const handleSeatClick = (seat: string) => {
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seat));
    } else {
      setSelectedSeats((prev) => [...prev, seat]);
    }
  };

  const handleBookSeats = () => {
    if (selectedSeats.length === 0) {
      alert("Please select at least one seat");
      return;
    }

    setBookedSeats((prev) => [...prev, ...selectedSeats]);
    setSelectedSeats([]);
  };

  const handleClear = () => {
    setSelectedSeats([]);
  };

  const handleReset = () => {
    setSelectedSeats([]);
    setBookedSeats([]);
  };

  return (
    <div className="main-container">
      <h1>Cinema Hall</h1>
      <div className="screen">Screen</div>

      <div className="button-section">
        <button data-testid="book-button" onClick={handleBookSeats}>
          Book Seats
        </button>
        <button data-testid="clear-button" onClick={handleClear}>
          Clear
        </button>
        <button data-testid="reset-button" onClick={handleReset}>
          Reset
        </button>
      </div>

      <div className="cinema-hall">
        {Array.from({ length: ROW }, (_, rowIdx) => (
          <div className="row" key={rowIdx}>
            {Array.from({ length: COL }, (_, colIdx) => {
              const seatLabel = `${rowLabels[rowIdx]}${colIdx}`;

              return (
                <button
                  className={`seat ${
                    selectedSeats.includes(seatLabel)
                      ? "selected-seat"
                      : bookedSeats.includes(seatLabel)
                      ? "disabled-seat"
                      : "seat"
                  }`}
                  key={colIdx}
                  data-testid={`seat-${seatLabel}`}
                  onClick={() => handleSeatClick(seatLabel)}
                  disabled={bookedSeats.includes(seatLabel)}
                >
                  {seatLabel}
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
