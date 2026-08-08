import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import "./App.css";

const items = [
  {
    title: "JavaScript Basics",
    content: "Learn variables, functions and loops in JavaScript.",
  },
  {
    title: "React.js Overview",
    content: "Understand components, state and props in React.",
  },
  {
    title: "Node.js",
    content: "Basics of server-side development with Node.js.",
  },
  {
    title: "Full-Stack Development",
    content: "Build full-stack apps with React and Node.js.",
  },
];

function App() {
  const [openIndex, setOpenIndex] = useState<null | number>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  return !items || items.length === 0 ? (
    "No items available"
  ) : (
    <div>
      <h1>Accordion</h1>
      <div className="accordion">
        {items.map((item, index) => (
          <div key={index} className="accordion-item">
            <button
              className="accordion-title"
              onClick={() => handleToggle(index)}
            >
              {item.title}
              {openIndex === index ? <FaChevronUp /> : <FaChevronDown />}
            </button>
            {openIndex === index && (
              <div className="accordion-content">{item.content}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
