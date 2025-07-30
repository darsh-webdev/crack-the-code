import { useState } from "react";
import "./App.css";

type FormData = {
  name: string;
  location: string;
};

function App() {
  const initialState = {
    name: "",
    location: "",
  };

  // Handler function for inputs value change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));

    if (isSubmitted) setIsSubmitted(false);
  };

  // Handler function for validation and state update on form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent page reload on form submission

    const errors = {} as FormData;

    // Validation checks for required form inputs
    if (formData.name.trim() === "") {
      errors.name = "Name is required.";
    }
    if (formData.location.trim() === "") {
      errors.location = "Location is required.";
    }

    // If errors exist, update the error message to display
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      setIsSubmitted(false);
      return;
    }

    // If no errors, mark form as submitted
    setErrors(initialState);
    setIsSubmitted(true);
  };

  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState(initialState);
  const [isSubmitted, setIsSubmitted] = useState(false);
  return (
    <div>
      <div className="container">
        <h1 className="title">Asterisk Field Validation</h1>
        <form data-testid="form" className="form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="name" className="label">
              Name <span className="asterisk">*</span>
            </label>
            <input
              id="name"
              className={`input ${errors.name && "input-error"}`}
              type="text"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              data-testid="name-input"
            />
            {errors.name && (
              <span className="error" data-testid="name-error">
                {errors.name}
              </span>
            )}
          </div>

          <div className="input-group">
            <label htmlFor="location" className="label">
              Location <span className="asterisk">*</span>
            </label>
            <input
              id="location"
              className={`input ${errors.location && "input-error"}`}
              type="text"
              value={formData.location}
              onChange={handleChange}
              placeholder="Enter your location"
              data-testid="location-input"
            />
            {errors.location && (
              <span className="error" data-testid="location-error">
                {errors.location}
              </span>
            )}
          </div>

          <button
            type="submit"
            className="submit-button"
            data-testid="submit-button"
          >
            Submit
          </button>
        </form>

        {isSubmitted && (
          <div className="success-message" data-testid="success-message">
            <p>Submitted Successfully!</p>
            <p>Name: {formData.name}</p>
            <p>Location: {formData.location}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
