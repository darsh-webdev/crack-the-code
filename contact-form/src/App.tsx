/*
Problem Statement: Create a Contact Form component that allows users to enter
their name, email and a message and submit the form. Display a confirmation message
after a successful submission.
*/

import { useState } from "react";
import "./App.css";

type FormData = {
  name: string;
  email: string;
  message: string;
};

function App() {
  const initialData = {
    name: "",
    email: "",
    message: "",
  };

  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState(initialData);
  const [resultMessage, setResultMessage] = useState("");

  const handleDataChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    setErrors((prev) => ({
      ...prev,
      [e.target.name]: "",
    }));
  };

  const handleSubmit = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const errors = {} as FormData;

    // Validate name
    if (formData.name.trim() === "") {
      errors.name = "Name is required";
    }

    // validate email and email format
    if (formData.email.trim() === "") {
      errors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      errors.email = "Invalid email format";
    }

    // Validate message
    if (formData.message.trim() === "") {
      errors.message = "Message is required";
    }

    // If errors exist, update errors state and stop submission
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    // If no errors, update result message
    setResultMessage(`Thank you, ${formData.name}`);
    setFormData(initialData);
  };

  return (
    <div>
      <h1>Contact Form</h1>
      <div className="form-container">
        {resultMessage ? (
          <>
            <h2>{resultMessage}</h2>
          </>
        ) : (
          <>
            <div className="form-field">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={(e) => handleDataChange(e)}
              />
              <span className="error-msg">{errors.name}</span>
            </div>
            <div className="form-field">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={(e) => handleDataChange(e)}
              />
              <span className="error-msg">{errors.email}</span>
            </div>
            <div className="form-field">
              <label htmlFor="message">Message:</label>
              <textarea
                name="message"
                id="message"
                value={formData.message}
                onChange={(e) => handleDataChange(e)}
              ></textarea>
              <span className="error-msg">{errors.message}</span>
            </div>
            <button onClick={handleSubmit}>Submit</button>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
