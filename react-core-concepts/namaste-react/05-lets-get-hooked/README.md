# Namaste React - Episode 05: Let's Get Hooked!

## 📚 Topics Learned

- **Clean & Scalable Project Architecture**:
  - Restructuring monolithic component code into a clean, industry-standard modular project directory inside `src/`.
  - Component separation: Placed individual component files into `src/components/` (`Header.js`, `Body.js`, `RestaurantCard.js`, `Footer.js`).
  - Utilities & Mock Data separation: Placed shared constants and mock data inside `src/utils/` (`constants.js`, `mockData.js`).
- **React Export & Import System**:
  - **Default Export / Import**:
    - Syntax: `export default ComponentName;` $\rightarrow$ `import ComponentName from "./path/to/Component";`
    - Used when a file exports a single primary entity/component.
  - **Named Export / Import**:
    - Syntax: `export const LOGO_URL = "...";` $\rightarrow$ `import { LOGO_URL } from "../utils/constants";`
    - Used when exporting multiple variables, constants, or helper functions from a single file.
  - **Can Default & Named exports be combined?** Yes, both export styles can coexist in the same file.
- **Introduction to React Hooks**:
  - **What is a Hook?** A pre-built utility JavaScript function provided by React that gives functional components state management and lifecycle capabilities.
  - Core Hooks introduced: `useState()` and `useEffect()`.
- **State Variables vs Regular JS Variables**:
  - Modifying regular JS variables does **not** trigger UI re-renders.
  - Updating React State variables via setter functions triggers React's reconciliation cycle, updating the DOM dynamically to stay in sync with data.
- **React Architecture & Behind-The-Scenes**:
  - **Virtual DOM (VDOM)**: A lightweight in-memory JavaScript representation of the actual DOM elements.
  - **Reconciliation Algorithm / Diffing Algorithm**:
    - React compares the newly updated Virtual DOM tree with the previous Virtual DOM tree.
    - Calculates exact minimal DOM mutations required (diffing).
  - **React Fiber**:
    - The underlying architecture/reimplementation of React's reconciliation algorithm enabling incremental rendering (splitting rendering work into chunks across multiple animation frames).

---

## 🛠️ Code Implementation Highlights

### Project Directory Structure
```text
05-lets-get-hooked/
├── index.html
├── styles.css
├── package.json
└── src/
    ├── App.js
    ├── components/
    │   ├── Header.js
    │   ├── Body.js
    │   ├── RestaurantCard.js
    │   └── Footer.js
    └── utils/
        ├── constants.js
        └── mockData.js
```

### 1. Centralized Utilities (`src/utils/`)
- **`constants.js`**: Created named export `LOGO_URL` storing external asset CDN links:
  ```js
  const LOGO_URL = "https://img.magnific.com/free-vector/food-shopping-logo-template-design_460848-10299.jpg";
  export { LOGO_URL };
  ```
- **`mockData.js`**: Created default export `restaurantsList` containing restaurant mock data array.

### 2. Modularized Components (`src/components/`)
- **`Header.js`**:
  - Utilized named import `import { LOGO_URL } from "../utils/constants"` to load header logo.
  - Exported header component as default export.
- **`RestaurantCard.js`**:
  - Standardized props destructuring (`imgLink`, `name`, `cuisines`, `avgRating`, `deliveryTime`, `costForTwo`).
  - Default exported `RestaurantCard`.
- **`Body.js`**:
  - Imported `RestaurantCard` component and `restaurantsList` mock data.
  - Rendered search bar section and mapped over `restaurantsList` with unique `key={restaurant.id}`.
- **`Footer.js`**:
  - Created multi-column footer displaying quick links, address, contact info, and copyright notices.

### 3. Root Application Layout (`src/App.js`)
- Cleanly imported modular components (`Header`, `Body`, `Footer`) to assemble the root `AppLayout` component, rendering into `ReactDOM.createRoot`.
