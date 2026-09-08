# Namaste React - Episode 04: Talk is Cheap, Show me the Code!

## 📚 Topics Learned

- **UI Planning & App Layout Architecture**:
  - Designing a real-world web app layout before writing code (Food Delivery Application like Swiggy).
  - Component hierarchy breakdown:
    - **Header**: Logo, Navigation items (`Home`, `About Us`, `Contact Us`, `Cart`)
    - **Body**: Search bar, Restaurant Container $\rightarrow$ Restaurant Cards
    - **Footer**: Copyright, Navigation links, Address, Contact details
- **Props (Properties)**:
  - Concept of props: Passing dynamic data from parent to child components (similar to function arguments).
  - Receiving props as JavaScript objects in functional components.
  - Destructuring props cleanly inside components (`const { imgLink, name, cuisines, avgRating, deliveryTime, costForTwo } = resData`).
- **Config-Driven UI**:
  - UIs configured dynamically using API data structures coming from backend systems based on location, user preferences, etc.
- **Dynamic List Rendering (`.map()`)**:
  - Iterating over an array of data objects using JavaScript `.map()` to render repetitive component structures dynamically instead of hardcoding.
  - Applying array utility functions in JSX (e.g., `cuisines.join(", ")`).
- **Importance of `key` Prop in React**:
  - Why keys are required: Helps React's DOM reconciliation diffing algorithm identify which items have changed, added, or removed.
  - Prevents full list re-renders when a new element is added to the DOM.
  - Key best practices hierarchy: **Unique ID** (Best practice) > **Index** (Use only if no unique ID exists, not recommended) > **No Key** (Unacceptable performance anti-pattern).
- **Inline Styling in React**:
  - Syntax for inline styles: `style={{ backgroundColor: "#f0f0f0" }}` (Outer brace opens JS expression in JSX, inner brace creates a JS object).

---

## 🛠️ Code Implementation Highlights (`App.js`)

### 1. Mock Data Dataset (`restaurantsList`)
- Created an array of 15 realistic restaurant objects with fields: `id`, `imgLink`, `name`, `cuisines`, `avgRating`, `deliveryTime`, and `costForTwo`.

### 2. Modular Component Architecture
- **Header Component**:
  - Rendered brand logo and main navigation menu list.
- **RestaurantCard Component**:
  - Accepted `resData` prop, destructured card attributes, formatted cuisines array using `.join(", ")`, rendered stars rating, delivery time, and cost for two with inline background styling.
- **Body Component**:
  - Contained search input placeholder and mapped over `restaurantsList` dynamically using `.map()` with unique `key={restaurant.id}`.
  - Implemented dynamic card listing:
    ```js
    <div className="restaurant-container">
        {restaurantsList.map(restaurant => (
            <RestaurantCard key={restaurant.id} resData={restaurant} />
        ))}
    </div>
    ```
- **Footer Component**:
  - Structured multi-column footer displaying app branding, copyright notice, quick navigation links, address, and contact details.
- **AppLayout Component**:
  - Combined `Header`, `Body`, and `Footer` into a cohesive root application view rendered into `ReactDOM.createRoot`.
