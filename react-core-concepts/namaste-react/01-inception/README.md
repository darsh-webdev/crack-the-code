# Namaste React - Episode 01: Inception 🚀

## 📚 Topics Learned

- **Introduction to React**: Understanding what React is and why it was named "React" (allows developers to react to changes in state and data to update the UI declaratively and efficiently).
- **Library vs. Framework**:
  - **Library**: A collection of pre-written reusable code snippets where control remains with the developer (e.g., React, jQuery).
  - **Framework**: Provides a rigid foundation/structure where control is inverted (Inversion of Control - framework calls developer's code, e.g., Angular).
- **Emmet**: Essential toolkit for web developers allowing shorthand expansion into full HTML/CSS boilerplate.
- **Three Approaches to "Hello World"**:
  1. Plain HTML
  2. Vanilla JavaScript DOM Manipulation (`document.createElement`, `appendChild`)
  3. React Library (`React.createElement`, `ReactDOM.createRoot`, `root.render`)
- **Cross-Origin Attribute (`crossorigin`)**: Understanding why `crossorigin` is used in CDN script tags for Cross-Origin Resource Sharing (CORS) when fetching external JS libraries.
- **Attributes Object in `React.createElement`**:
  - The second parameter `{}` passes HTML attributes (such as `id`, `className`, `style`, etc.) to the created React element.
- **React Render Overwriting Behavior**: `root.render()` overwrites all existing child elements inside the target container (`<div id="root">`).
- **Nested HTML Structures**: How to build complex nested DOM trees using nested `React.createElement()` calls with array children.

---

## 🛠️ Code Implementation Highlights

### 1. Multi-Approach Web Page (`index.html`)
- Displayed "Hello World" using 3 distinct approaches:
  - HTML static element `<section class="html-section">`
  - Dynamic JavaScript element injected into `<div id="js-root">`
  - React container `<div id="root">` loading React 18 & ReactDOM 18 development bundles from unpkg CDN.

### 2. React Element Creation (`App.js`)
- **Single React Element**:
  ```js
  const heading = React.createElement("h1", {}, "Hello World from React!");
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(heading);
  ```
- **React Element with Attributes**:
  ```js
  const title = React.createElement("h1", { id: "title" }, "Hello World with an ID!");
  ```
- **Nested DOM Hierarchy**:
  - Constructed nested structure equivalent to:
    ```html
    <div id="parent">
      <div id="child1">
        <h1>Heading 1</h1>
        <h2>Heading 2</h2>
      </div>
      <div id="child2">
        <h1>Heading 1</h1>
        <h2>Heading 2</h2>
      </div>
    </div>
    ```
  - Implemented using nested `React.createElement()` calls passing an array of child elements.

