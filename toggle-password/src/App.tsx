import { EyeOff, Eye } from "lucide-react";
import "./App.css";
import { useState } from "react";

function App() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleToggle = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  return (
    <div className="container">
      <h1 className="title">Toggle Password</h1>
      <div className="password-wrapper">
        <input
          type={isPasswordVisible ? "text" : "password"}
          id="password"
          placeholder="Enter password"
          className="password-input"
          data-testid="password-input"
        />
        <span className="icon" data-testid="toggle-icon" onClick={handleToggle}>
          {isPasswordVisible ? <Eye size={18} /> : <EyeOff size={18} />}
        </span>
      </div>
      <span className="visibility-label" data-testid="visibility-label">
        {isPasswordVisible ? "Password Visible" : "Password Hidden"}
      </span>
    </div>
  );
}

export default App;
