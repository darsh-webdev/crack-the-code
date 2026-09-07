# Namaste React - Episode 03: Laying the Foundation 🏗️

## 📚 Topics Learned

- **NPM Build Scripts**:
  - Configuring customized terminal scripts in `package.json` (`"start": "parcel index.html"`, `"build": "parcel build index.html"`).
  - Executing scripts via `npm start` (or `npm run start`) and `npm run build`.
- **Introduction to JSX (JavaScript XML)**:
  - Why JSX was created: `React.createElement` is verbose, complex to write, and hard to read.
  - JSX is **not** HTML inside JS; it is an HTML-like or XML-like syntax extension for JavaScript.
  - JavaScript engines do **not** natively understand JSX syntax.
- **Babel & Transpilation**:
  - **Babel**: A JS compiler/transpiler that converts JSX into standard ECMAScript code.
  - Transpilation chain: `JSX` $\rightarrow$ `React.createElement()` $\rightarrow$ `ReactElement (JS Object)` $\rightarrow$ `HTML Element (DOM Render)`.
- **HTML vs JSX Syntax Differences**:
  - `class` attribute in HTML becomes `className` in JSX.
  - Hyphenated HTML attributes become camelCase in JSX (`tabindex` $\rightarrow$ `tabIndex`, `onclick` $\rightarrow$ `onClick`).
  - Multi-line JSX statements require wrapping inside parentheses `()` so Babel can identify start and end boundaries cleanly.
- **React Components**:
  - **Class-Based Components**: Older approach using JavaScript classes (infrequently used in modern codebases).
  - **Functional Components**: Modern standard; JavaScript functions that return JSX/React elements. Must always be named with a Capital letter.
- **Component Composition**:
  - Embedding a component inside another component (e.g., `<Title />` rendered inside `<HeadingComponent />`).
- **Executing JavaScript in JSX**:
  - Injecting any valid JS expression inside curly braces `{}` within JSX.
- **Security & Data Sanitization**:
  - JSX automatically escapes and sanitizes values injected into `{}` to prevent Cross-Site Scripting (XSS) attacks.

---

## 🛠️ Code Implementation Highlights

### 1. Custom NPM Scripts (`package.json`)
- Added npm scripts to launch dev server and production builds:
  ```json
  "scripts": {
    "start": "parcel index.html",
    "build": "parcel build index.html"
  }
  ```

### 2. React Elements vs Functional Components (`App.js`)
- **React Element in JSX**:
  ```js
  const elem = <span>React Element</span>;
  ```
- **Functional Component**:
  ```js
  const Title = () => (
      <h1>Namaste React 🚀</h1>
  );
  ```
- **Functional Component with JS Variables**:
  ```js
  const number = 10000;
  const NumberComponent = () => (
      <p>Number: {number}</p>
  );
  ```
- **Component Composition & Element Rendering**:
  ```js
  const HeadingComponent = () => (
      <div id="container">
          <Title />
          <NumberComponent />
          {elem}
          <h2>Learning React Components</h2>
      </div>
  );
  ```
- **JavaScript Expression Evaluation in JSX**:
  ```js
  const App = () => (
      <div>
          <HeadingComponent />
          <p>Result of JavaScript expression: {100 + 200}</p>
      </div>
  );

  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(<App />);
  ```

