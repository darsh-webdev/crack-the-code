# Namaste React - Episode 02: Igniting Our App 🔥

## 📚 Topics Learned

- **Making Production-Ready Applications**:
  - Code minification, bundler optimization, dead code removal, and serving assets efficiently.
- **Bundlers**:
  - What is a Bundler? (A tool that packages and optimizes web application files for shipping to production).
  - Popular bundlers: Webpack, Vite, Parcel. (Note: `create-react-app` uses Webpack).
- **Package Managers & Configuration**:
  - Initializing project configuration using `npm init`.
  - Installing development dependencies using `npm install -D parcel`.
- **`package.json` vs `package-lock.json`**:
  - **`package.json`**: High-level manifest containing app metadata, script commands, and generic/semantic version ranges (`^` for minor/patch updates, `~` for patch updates).
  - **`package-lock.json`**: Locks exact versions of installed packages and all transitive dependencies for reproducible builds.
- **`node_modules` & `.gitignore`**:
  - Database of npm dependencies; heavy directory that must never be pushed to version control (always added to `.gitignore`).
  - **Transitive Dependencies**: Dependencies required by our direct dependencies, automatically managed by npm.
- **Executing CLI Tools with `npx`**:
  - Difference between `npm` (package manager) and `npx` (executes npm packages without global installation).
- **Parcel Features & Superpowers**:
  - **Hot Module Replacement (HMR)**: Live reloads app changes automatically using C++ File Watcher Algorithm.
  - **Caching (`.parcel-cache`)**: Stores build cache in binary format for faster subsequent builds.
  - **Dist Folder (`/dist`)**: Contains minified and optimized production build files.
  - **Tree Shaking**: Eliminates unused/dead code during bundling.
  - Additional features: Image optimization, dev HTTPS server, zero configuration, port management, consistent hashing algorithms.
- **Browserslist**:
  - Tool to configure target browser compatibility in `package.json` (e.g., `"last 2 versions"`).

---

## 🛠️ Code Implementation Highlights

### 1. NPM Project & Dependency Setup (`package.json`)
- Configured project with Parcel devDependency (`^2.16.4`), React (`^19.2.8`), and ReactDOM (`^19.2.8`).
- Added browser support target:
  ```json
  "browserslist": [
    "last 2 versions"
  ]
  ```

### 2. Module Script Entry (`index.html`)
- Removed external CDN `<script>` tags for React and ReactDOM.
- Linked local entry script with ES Module support:
  ```html
  <script type="module" src="App.js"></script>
  ```

### 3. Bundled React Application (`App.js`)
- Replaced global CDN variables with modern ES module imports:
  ```js
  import React from "react";
  import ReactDOM from "react-dom/client";

  const heading = React.createElement("h1", {}, "Complete Episode 2 🚀");
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(heading);
  ```

