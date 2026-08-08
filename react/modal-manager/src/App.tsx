import { useModal } from "./useModal";
import { ModalProvider } from "./ModalProvider";
import "./App.css";

function Demo() {
  const { openModal, closeModal } = useModal();

  return (
    <div className="container">
      <h1>Stacked Modal Manager</h1>

      <button
        onClick={() =>
          openModal(
            <div>
              <h2>First Modal</h2>
              <button
                onClick={() =>
                  openModal(
                    <div>
                      <h3>Second Modal</h3>
                      <button
                        onClick={() =>
                          openModal(
                            <div>
                              <h4>Third Modal</h4>
                              <button onClick={closeModal}>Close</button>
                            </div>,
                          )
                        }
                      >
                        Open Third
                      </button>
                      <button onClick={closeModal}>Close</button>
                    </div>,
                  )
                }
              >
                Open Second
              </button>
              <button onClick={closeModal}>Close</button>
            </div>,
          )
        }
      >
        Open Modal
      </button>
    </div>
  );
}

function App() {
  return (
    <ModalProvider>
      <Demo />
    </ModalProvider>
  );
}

export default App;
