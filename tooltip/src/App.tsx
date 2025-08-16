/*
Problem Statement: Create a class based React component that displays a list of
icons. When a user hovers over an icon, a tooltip should appear showing the name
of that icon.
*/

import { Component } from "react";
import "./App.css";

class App extends Component {
  state = {
    hoveredIndex: null,
  };

  handleMouseEnter = (index: number) => {
    this.setState({ hoveredIndex: index });
  };

  handleMouseLeave = () => {
    this.setState({ hoveredIndex: null });
  };

  render() {
    const icons = [
      { emoji: "🏠", label: "Home" },
      { emoji: "📧", label: "Email" },
      { emoji: "⚙️", label: "Settings" },
    ];

    return (
      <div>
        <h1>Tooltip</h1>
        <div className="tooltip-container">
          {icons.map((icon, index) => (
            <div key={index} className="tooltip-item">
              {this.state.hoveredIndex === index && (
                <span className="tooltip-box">{icon.label}</span>
              )}
              <span
                onMouseEnter={() => this.handleMouseEnter(index)}
                onMouseLeave={() => this.handleMouseLeave()}
              >
                {icon.emoji}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
export default App;
