# Namaste React 🚀

Welcome to the **Namaste React** core concepts series repository. This repository contains complete code implementations, notes, and topic summaries based on the course episodes and official lecture documentation.

---

## 📂 Episode Overview

| Episode | Title | Description | Link |
| :--- | :--- | :--- | :--- |
| **01** | **Inception** | Core React fundamentals, library vs framework, rendering DOM nodes with HTML, JS, and React. | [View Episode 01](file:///Users/darshanrajput/Desktop/Projects/crack-the-code/react-core-concepts/namaste-react/01-inception/README.md) |
| **02** | **Igniting Our App** | Production readiness, NPM, Parcel bundler, HMR, `.parcel-cache`, `/dist`, and Browserslist. | [View Episode 02](file:///Users/darshanrajput/Desktop/Projects/crack-the-code/react-core-concepts/namaste-react/02-igniting-our-app/README.md) |
| **03** | **Laying the Foundation** | NPM build scripts, JSX syntax, Babel transpilation, functional components, and component composition. | [View Episode 03](file:///Users/darshanrajput/Desktop/Projects/crack-the-code/react-core-concepts/namaste-react/03-laying-the-foundation/README.md) |
| **04** | **Talk is Cheap, Show me the Code!** | UI architecture planning, Props, Config-Driven UI, list rendering via `.map()`, and `key` props. | [View Episode 04](file:///Users/darshanrajput/Desktop/Projects/crack-the-code/react-core-concepts/namaste-react/04-talk-is-cheap-show-me-the-code/README.md) |
| **05** | **Let's Get Hooked!** | Modular folder architecture (`src/components`, `src/utils`), default vs named exports, React Hooks (`useState`), Virtual DOM & Reconciliation. | [View Episode 05](file:///Users/darshanrajput/Desktop/Projects/crack-the-code/react-core-concepts/namaste-react/05-lets-get-hooked/README.md) |
| **06** | **Exploring the World!** | Microservices vs Monolithic architecture, CORS, `useEffect` Hook, Swiggy Live API integration, Shimmer UI (Conditional Rendering), Controlled Components, and Search filtering. | [View Episode 06](file:///Users/darshanrajput/Desktop/Projects/crack-the-code/react-core-concepts/namaste-react/06-exploring-the-world/README.md) |

---

## 📖 Key Summary by Episode

### 🚀 [Episode 01: Inception](file:///Users/darshanrajput/Desktop/Projects/crack-the-code/react-core-concepts/namaste-react/01-inception/README.md)
- **Topics Learned**: React origin, Library vs Framework, Inversion of Control, Emmet, CORS & `crossorigin` attribute, attributes object in `React.createElement`, `root.render()` overwrite behavior.
- **Code Implemented**: Demonstrated "Hello World" using HTML, Vanilla JS, and React; built nested DOM structure using `React.createElement` with array children.

---

### 🔥 [Episode 02: Igniting Our App](file:///Users/darshanrajput/Desktop/Projects/crack-the-code/react-core-concepts/namaste-react/02-igniting-our-app/README.md)
- **Topics Learned**: Production optimizations, Bundlers (Webpack, Vite, Parcel), `package.json` vs `package-lock.json`, `node_modules`, `npx`, Parcel superpowers (HMR, `.parcel-cache`, `/dist`, Tree Shaking, zero-config), `browserslist`.
- **Code Implemented**: Configured Parcel devDependency, installed React & ReactDOM via npm, converted index.html to ES modules, initialized React root with ES module imports.

---

### 🏗️ [Episode 03: Laying the Foundation](file:///Users/darshanrajput/Desktop/Projects/crack-the-code/react-core-concepts/namaste-react/03-laying-the-foundation/README.md)
- **Topics Learned**: Custom NPM scripts (`start`, `build`), JSX introduction, Babel transpilation flow (`JSX` $\rightarrow$ `React.createElement` $\rightarrow$ `ReactElement` $\rightarrow$ `DOM`), HTML vs JSX syntax, Class vs Functional Components, Component Composition, `{}` JS expression evaluation, XSS data sanitization.
- **Code Implemented**: Added npm scripts, built React elements, created `Title`, `NumberComponent`, `HeadingComponent`, and `App` demonstrating component composition and JS expression rendering in JSX.

---

### 🍕 [Episode 04: Talk is Cheap, Show me the Code!](file:///Users/darshanrajput/Desktop/Projects/crack-the-code/react-core-concepts/namaste-react/04-talk-is-cheap-show-me-the-code/README.md)
- **Topics Learned**: Food delivery UI planning & layout architecture, Props, Config-Driven UI, dynamic list rendering with `.map()`, importance of `key` prop in React reconciliation, inline styling in JSX.
- **Code Implemented**: Created 15-item restaurant mock dataset, built `Header`, `RestaurantCard` (with props destructuring & `.join(", ")`), `Body` (dynamic list rendering with unique `key`), multi-column `Footer`, and root `AppLayout`.

---

### 🎣 [Episode 05: Let's Get Hooked!](file:///Users/darshanrajput/Desktop/Projects/crack-the-code/react-core-concepts/namaste-react/05-lets-get-hooked/README.md)
- **Topics Learned**: Modular project architecture inside `src/` (`components/` & `utils/`), Default vs Named imports/exports, introduction to React Hooks (`useState`, `useEffect`), State vs Regular JS variables, Virtual DOM (VDOM), Reconciliation / Diffing algorithm, React Fiber architecture.
- **Code Implemented**: Restructured app into modular files (`Header.js`, `Body.js`, `RestaurantCard.js`, `Footer.js`, `constants.js`, `mockData.js`), configured named export for `LOGO_URL` and default export for mock data & components.

---

### 🌐 [Episode 06: Exploring the World!](file:///Users/darshanrajput/Desktop/Projects/crack-the-code/react-core-concepts/namaste-react/06-exploring-the-world/README.md)
- **Topics Learned**: Monolithic vs Microservices architecture, Render-First-Fetch-Later strategy, `useEffect()` hook execution & dependency array, CORS errors & API proxies (`corsproxy.io` with `.env`), Shimmer UI for loading states, Conditional Rendering, React state re-rendering mechanics vs regular variables, Controlled input components, case-insensitive search and filter logic.
- **Code Implemented**: Integrated Swiggy live REST API with CORS proxy key in `.env`, created `Shimmer` loading component, implemented conditional rendering in `Body.js`, added search input & top-rated filter buttons, dynamic image fetching via `CLOUDINARY_URL`.
