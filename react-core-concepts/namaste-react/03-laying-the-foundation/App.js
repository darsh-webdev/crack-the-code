import React from "react";
import ReactDOM from "react-dom/client";


// React.createElement => Object => HTMLElement(render)
const heading = React.createElement(
    "h1",
    { id: "heading" },
    "Hello World using createElement"
);
console.log("🚀 ~ heading:", heading)

// JSX - HTML-like or XML-like syntax
const jsxHeading = <h1 id="heading">Hello World using JSX🚀</h1>;
console.log("🚀 ~ jsxHeading:", jsxHeading)

const root = ReactDOM.createRoot(
    document.getElementById("root")
);

root.render(jsxHeading);