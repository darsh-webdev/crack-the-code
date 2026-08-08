import { useEffect, useState } from "react";
import "./App.css";

type FormData = {
  name: string;
  email: string;
  message: string;
};

function App() {
  const initialValue: FormData = {
    name: "",
    email: "",
    message: "",
  };

  const getSavedFormData = () => {
    if (typeof window !== "undefined") {
      const savedData = localStorage.getItem("form-data");
      return savedData ? JSON.parse(savedData) : initialValue;
    }

    return initialValue;
  };

  const [formInput, setFormInput] = useState(getSavedFormData());

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("form-data", JSON.stringify(formInput));
    }
  }, [formInput]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;

    setFormInput((prev: FormData) => ({
      ...prev,
      [fieldName]: fieldValue,
    }));
  };

  const handleClearForm = () => {
    setFormInput(initialValue);
    if (typeof window !== "undefined") {
      localStorage.removeItem("form-data");
    }
  };

  return (
    <div className="container">
      <h1>Auto Save Form</h1>

      <form className="form">
        <div className="form-input">
          <label>Name: </label>
          <input
            type="text"
            name="name"
            data-testid="form-input"
            value={formInput.name}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-input">
          <label>Email: </label>
          <input
            type="email"
            name="email"
            data-testid="form-email"
            value={formInput.email}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-input">
          <label>Message: </label>
          <textarea
            name="message"
            data-testid="form-message"
            value={formInput.message}
            onChange={handleInputChange}
          />
        </div>

        <button type="button" className="clear-btn" onClick={handleClearForm}>
          Clear
        </button>
      </form>
    </div>
  );
}

export default App;
