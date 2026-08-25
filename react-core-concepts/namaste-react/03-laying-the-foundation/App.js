import React from "react";
import ReactDOM from "react-dom/client";

// ============================================================
// Topics:
// 1. Functional Components
// 2. Component Composition
// 3. JavaScript inside JSX
// 4. React Element inside JSX
// ============================================================


// ------------------------------------------------------------
// 1. React Element
// ------------------------------------------------------------

const elem = <span>React Element</span>;


// ------------------------------------------------------------
// 2. Functional Component
// ------------------------------------------------------------

const Title = () => (
    <h1>Namaste React 🚀</h1>
);


// ------------------------------------------------------------
// 3. Functional Component with JavaScript Expression
// ------------------------------------------------------------

const number = 10000;

const NumberComponent = () => (
    <p>
        Number: {number}
    </p>
);


// ------------------------------------------------------------
// 4. Component Composition
//
// Title is a component being used inside
// another component.
// ------------------------------------------------------------

const HeadingComponent = () => (
    <div id="container">
        <Title />
        <NumberComponent />
        {elem}
        <h2>Learning React Components</h2>
    </div>
);


// ------------------------------------------------------------
// 5. JavaScript Expressions inside JSX
// ------------------------------------------------------------

const App = () => (
    <div>
        <HeadingComponent />
        <p>
            Result of JavaScript expression: {100 + 200}
        </p>
    </div>
);


// ------------------------------------------------------------
// Render the App component
// ------------------------------------------------------------
const root = ReactDOM.createRoot(
    document.getElementById("root")
);

root.render(<App />);