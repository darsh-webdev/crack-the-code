/*
  Problem Statement: Create a React component that displays multiple tabs and
  allows users to switch between them. Each tab should display corresponding
  content when selected.
*/

import { useState } from "react";
import "./App.css";

// Sample tab data
const tabs = [
  { id: "home", label: "Home", content: "Welcome to the Home tab!" },
  { id: "profile", label: "Profile", content: "This is your Profile." },
  { id: "settings", label: "Settings", content: "Adjust your Settings here." },
];

function App() {
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const handleClick = (index: number) => {
    setActiveTabIndex(index);
  };

  return (
    <div className="tab-switcher">
      <h1>Tab Switcher</h1>

      {/* Tab buttons */}
      <div className="tab-buttons">
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            data-testid={`tab-button-${tab.id}`}
            onClick={() => handleClick(index)}
            className={activeTabIndex === index ? "active" : ""}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="tab-content" data-testid="tab-content">
        {tabs[activeTabIndex].content}
      </div>
    </div>
  );
}

export default App;
