/*
Problem Statement: Create a React modal component that displays a confirmation
propmt to the user with options to either confirm or cancel an action.
*/

import { useState } from "react";
import "./App.css";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  const openModal = () => {
    setIsOpen(true);
  };

  const handleActionButton = (action: string) => {
    setIsOpen(false);
    setMessage(action);
  };

  return (
    <div>
      <h1>Confirmation Modal</h1>
      <div className="modal-container">
        <button
          className="open-modal-btn"
          data-testid="open-modal-button"
          onClick={openModal}
        >
          Open Confirmation Modal
        </button>

        {isOpen && (
          <div className="modal-backdrop">
            <div className="modal-box" data-testid="confirmation-modal">
              <h2 className="modal-title" data-testid="modal-title">
                Confirm Action
              </h2>
              <p className="modal-message" data-testid="modal-message">
                Are you sure you want to proceed?
              </p>

              <div className="modal-buttons">
                <button
                  className="confirm-btn"
                  data-testid="confirm-button"
                  onClick={() => handleActionButton("Confirmed")}
                >
                  Confirm
                </button>
                <button
                  className="cancel-btn"
                  data-testid="cancel-button"
                  onClick={() => handleActionButton("Cancelled")}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="action-status" data-testid="action-status">
          {message}
        </div>
      </div>
    </div>
  );
}

export default App;
