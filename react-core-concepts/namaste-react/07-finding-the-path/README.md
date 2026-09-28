# Namaste React - Episode 07: Finding the Path!

## 📚 Topics Learned

- **Ways to Add & Display Images in React**:
  1. **ES6 Module Import**: `import myImage from "./image.jpg";` $\rightarrow$ `<img src={myImage} />` (Best for small to medium-sized apps).
  2. **Public Directory**: `<img src={process.env.PUBLIC_URL + "/image.jpg"} />` (Useful for large assets or dynamic URLs).
  3. **Remote Source / External CDN**: `<img src="https://..." />` (Directly referencing remote image URLs).
  4. **CSS Assets**: `background-image: url("/image.jpg");` defined in standard CSS rules.

- **Under the Hood of `useState()`**:
  - Executing `console.log(useState())` displays an array with two elements: `[currentStateValue, updateStateFunction]`.
  - Array destructuring (`const [count, setCount] = useState(0);`) is standard practice to access state and updater functions cleanly.

- **`useEffect()` Dependency Array Behavior Rules**:
  - **No Dependency Array (`useEffect(() => {})`)**: Callback executes on **every render** (after initial render and after every re-render).
  - **Empty Dependency Array (`useEffect(() => {}, [])`)**: Callback executes **only once** after the initial render.
  - **Dependency Array with Variables (`useEffect(() => {}, [count])`)**: Callback executes after initial render and **whenever the specified dependency state/prop changes**.

- **Single Page Application (SPA)**:
  - A web application that interacts with users by dynamically rewriting the current web page rather than fetching entirely new HTML pages from the server.
  - *Key Characteristics*: Dynamic updates without page reloads, smooth user experience, faster client-side transitions, API-centric architecture (JSON data exchange), and client-side routing.

- **Client-Side Routing vs. Server-Side Routing**:
  - **Client-Side Routing**: Navigation handled entirely within the browser using JavaScript (e.g., React Router). DOM updates dynamically without full page reloads, providing fast transitions.
  - **Server-Side Routing**: Traditional routing where every URL request hits the server, generating and sending back a brand new HTML document resulting in full page reloads.

- **React Router Deep Dive**:
  - **`createBrowserRouter`**: Recommended router creation function that defines routes array containing path definitions, elements, children, and error handlers.
  - **`RouterProvider`**: Component that passes the router configuration down to the app root (`ReactDOM.createRoot`).
  - **`Outlet`**: Component rendered inside parent layout components (e.g., `AppLayout`) to swap child route components dynamically while keeping header and footer persistent.
  - **`<Link to="...">`**: Component used for navigation without triggering full browser reloads (replacing native `<a>` tags).
  - **`useRouteError`**: Hook that catches and provides routing error details (`error.status`, `error.statusText`) for custom error pages.
  - **Dynamic Routes & `useParams`**: Defining dynamic segments in route paths (e.g., `/restaurant/:resId`) and extracting parameters via the `useParams()` hook inside component logic.

---

## 🛠️ Code Implementation Highlights

### Project Directory Structure
```text
07-finding-the-path/
├── .env
├── index.html
├── styles.css
├── package.json
└── src/
    ├── App.js
    ├── components/
    │   ├── Header.js
    │   ├── Body.js
    │   ├── RestaurantCard.js
    │   ├── RestaurantMenu.js
    │   ├── About.js
    │   ├── Contact.js
    │   ├── Error.js
    │   ├── Shimmer.js
    │   └── Footer.js
    └── utils/
        └── constants.js
```

### 1. Centralized Menu API & Utility Constants (`src/utils/constants.js`)
- Configured CORS proxy key and Swiggy Restaurant Menu API endpoint:
  ```javascript
  const LOGO_URL = "https://img.magnific.com/free-vector/food-shopping-logo-template-design_460848-10299.jpg";
  const CLOUDINARY_URL = "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/";
  const CORS_API_KEY = process.env.API_KEY;
  const MENU_API = "https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=19.07480&lng=72.88560&restaurantId=";

  export { LOGO_URL, CLOUDINARY_URL, CORS_API_KEY, MENU_API };
  ```

### 2. Router Configuration & Layout with `<Outlet />` (`src/App.js`)
- Configured `createBrowserRouter` with parent layout, child routes (`/`, `/about`, `/contact`, `/restaurant/:resId`), and custom `errorElement`:
  ```javascript
  import ReactDOM from "react-dom/client";
  import Header from "./components/Header";
  import Body from "./components/Body";
  import Footer from "./components/Footer";
  import About from "./components/About";
  import Contact from "./components/Contact";
  import Error from "./components/Error";
  import RestaurantMenu from "./components/RestaurantMenu";
  import { createBrowserRouter, RouterProvider, Outlet } from "react-router";

  const AppLayout = () => {
      return (
          <div className="app">
              <Header />
              <Outlet />
              <Footer />
          </div>
      );
  };

  const appRouter = createBrowserRouter([
      {
          path: "/",
          element: <AppLayout />,
          children: [
              { path: "/", element: <Body /> },
              { path: "/about", element: <About /> },
              { path: "/contact", element: <Contact /> },
              { path: "/restaurant/:resId", element: <RestaurantMenu /> }
          ],
          errorElement: <Error />
      }
  ]);

  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(<RouterProvider router={appRouter} />);
  ```

### 3. Navigation Header with SPA `<Link />` Components (`src/components/Header.js`)
- Replaced anchor tags with React Router `<Link>` components to maintain SPA client-side routing without page reloads:
  ```javascript
  import { useState } from "react";
  import { LOGO_URL } from "../utils/constants";
  import { Link } from "react-router";

  const Header = () => {
      const [btnName, setBtnName] = useState("Login");
      return (
          <div className="header">
              <div className="logo-container">
                  <img className="logo" src={LOGO_URL} />
              </div>
              <div className="nav-items">
                  <ul>
                      <li><Link to="/">Home</Link></li>
                      <li><Link to="/about">About Us</Link></li>
                      <li><Link to="/contact">Contact Us</Link></li>
                      <li>Cart</li>
                      <button className="login" onClick={() => {
                          setBtnName(btnName === "Login" ? "Logout" : "Login");
                      }}>{btnName}</button>
                  </ul>
              </div>
          </div>
      );
  };

  export default Header;
  ```

### 4. Custom Error Component with `useRouteError` (`src/components/Error.js`)
- Handled routing errors cleanly by capturing status and status text using `useRouteError`:
  ```javascript
  import { useRouteError } from "react-router";

  const Error = () => {
      const error = useRouteError();
      return (
          <div>
              <h1>Oops!</h1>
              <h2>Something went wrong!!!</h2>
              <h3>{error.status}: {error.statusText}</h3>
          </div>
      );
  };

  export default Error;
  ```

### 5. Dynamic Restaurant Menu & `useParams` (`src/components/RestaurantMenu.js`)
- Extracted dynamic URL parameters (`resId`) using `useParams()` and fetched restaurant menu items dynamically via Swiggy Menu API:
  ```javascript
  import { useState, useEffect } from "react";
  import { useParams } from "react-router";
  import { CORS_API_KEY, MENU_API } from "../utils/constants";
  import Shimmer from "./Shimmer";

  const RestaurantMenu = () => {
      const [resInfo, setResInfo] = useState(null);
      const { resId } = useParams();

      useEffect(() => {
          fetchMenu();
      }, []);

      const fetchMenu = async () => {
          const swiggyUrl = `${MENU_API + resId}`;
          const proxyUrl = `https://corsproxy.io/?key=${CORS_API_KEY}&url=${encodeURIComponent(swiggyUrl)}`;
          const response = await fetch(proxyUrl);
          const json = await response.json();
          setResInfo(json?.data);
      };

      if (resInfo === null) return <Shimmer />;

      const { name, cuisines, costForTwoMessage } = resInfo?.cards[2]?.card?.card?.info;
      const { itemCards } = resInfo?.cards[3]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card;

      return (
          <div className="menu">
              <h1>{name}</h1>
              <h3>{cuisines.join(", ")} - {costForTwoMessage}</h3>
              <h2>Menu</h2>
              <ul>
                  {itemCards.map(item => (
                      <li key={item.card.info.id}>
                          {item.card.info.name} - ₹{(item.card.info.price || item.card.info.defaultPrice) / 100}
                      </li>
                  ))}
              </ul>
          </div>
      );
  };

  export default RestaurantMenu;
  ```

### 6. Card Linking in Body Component (`src/components/Body.js`)
- Wrapped each `RestaurantCard` with `<Link to={"restaurant/" + restaurant.info.id}>` to make cards clickable and navigate to individual menu pages seamlessly.
