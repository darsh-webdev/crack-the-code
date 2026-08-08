import { useState } from "react";
import "./App.css";
import { Menu, X } from "lucide-react";

const SIDEBAR_ITEMS = ["Home", "About", "Services", "Contact"];

function App() {
  const [isSidebarOpen, setISidebarOpen] = useState(false);

  const handleSidebarToggle = () => {
    setISidebarOpen((prev) => !prev);
  };

  return (
    <div className="container">
      <h1>Sidebar</h1>
      <div
        className={`${isSidebarOpen && "open"} sidebar`}
        data-testid="sidebar"
      >
        <button
          className="toggle-btn"
          onClick={handleSidebarToggle}
          data-testid="btn-toggle"
        >
          {isSidebarOpen ? (
            <X data-testid="icon-menu" />
          ) : (
            <Menu data-testid="icon-menu" />
          )}
        </button>

        {isSidebarOpen && (
          <nav className="nav-menu" data-testid="nav-menu">
            <ul className="nav-list">
              {SIDEBAR_ITEMS.map((item, index) => (
                <li
                  key={index}
                  className="nav-item"
                  data-testid={`nav-item-${item.toLocaleLowerCase()}`}
                >
                  {item}
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </div>
  );
}

export default App;
