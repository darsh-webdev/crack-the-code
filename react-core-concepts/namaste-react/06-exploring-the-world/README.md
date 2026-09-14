# Namaste React - Episode 06: Exploring the World!

## 📚 Topics Learned

- **Monolithic vs. Microservices Architecture**:
  - **Monolithic Architecture**:
    - Entire application code—APIs, UI, DB connections, Authentication, and Notifications—resides in a single codebase.
    - *Limitations*: Heavy size & complexity, slow startup time, requires full deployment for minor updates, hard to gauge change impact, complex continuous deployment, scaling bottlenecks, single point of failure (bugs crash entire app), expensive to adopt new technologies.
  - **Microservices Architecture**:
    - Application is broken down into small, independent, interconnected services where each service has a dedicated single responsibility (e.g., Auth service, Payment service, UI service).
    - *Benefits*: Simpler development & maintenance, independent development teams, tech stack flexibility per service, independent & continuous deployment, granular horizontal scaling, separation of concerns.
    - *Real-world shifts*: Atlassian (switched in 2018 to microservices), Netflix (migrated monolith to AWS microservices).
  - **Service Interaction & Port Mapping**:
    - Microservices communicate via HTTP/REST APIs or messaging queues.
    - Each service runs on its own dedicated port (e.g., React UI on one port, backend API on another), mapped to unified domain endpoints.

- **Web UI Rendering Strategies**:
  - **Approach 1: Load and Render**
    - Application loads $\rightarrow$ Make API call $\rightarrow$ Wait for data $\rightarrow$ Render UI.
    - *Drawback*: Leaves user staring at a blank screen during initial fetch.
  - **Approach 2: Render First, Fetch Later (React Approach)**
    - Application loads $\rightarrow$ Instantly render initial UI structure / skeleton $\rightarrow$ Fetch live data from API in background $\rightarrow$ Re-render UI once data arrives.
    - *Advantage*: Superior user experience with instant visual feedback.

- **`useEffect()` Hook & Component Lifecycle**:
  - **What is `useEffect()`?** A built-in React Hook used for handling side effects (API calls, event listeners, subscriptions).
  - **Syntax**: `useEffect(callbackFunction, dependencyArray)`
  - **Execution Timing**: The callback function passed to `useEffect()` executes **after** the component completes its initial rendering cycle.
  - Ideal for making async API calls (`fetchData()`) following the "Render First, Fetch Later" design pattern.

- **CORS (Cross-Origin Resource Sharing) & Proxy Solutions**:
  - **CORS Error**: Browsers block frontend JavaScript code from fetching data across different origins (domains/ports) due to security policies.
  - **Handling CORS in Development**: Calling live Swiggy APIs directly from `localhost` causes CORS blocking.
  - **Solution**: Route requests through a CORS proxy service (`https://corsproxy.io/`) combined with API authentication keys passed securely via environment variables (`process.env.API_KEY`).

- **Shimmer UI & Conditional Rendering**:
  - **Shimmer UI**: Displaying animated skeleton cards as layout placeholders while API data loads, replacing generic text like `<h1>Loading...</h1>`.
  - **Conditional Rendering**: Rendering specific UI components based on runtime state conditions (e.g., `listOfRestaurants.length === 0 ? <Shimmer /> : <BodyContent />`).

- **React State vs. Regular JS Variables**:
  - Regular JavaScript variables (e.g., `let btnName = "Login"`) update in memory but **do not** trigger React re-renders, leaving the UI static.
  - React State variables (`useState()`) notify React upon mutation (`setReactBtn()`), triggering component re-rendering and Virtual DOM diffing.
  - *State Mutation Mechanics*: Updating state causes React to re-execute the component function, creating a fresh scope/closure with the newly assigned state value.

- **Controlled Components & Search Filter Implementation**:
  - **Controlled Input**: Binding input elements with `value={searchText}` and updating state on every keystroke via `onChange={(e) => setSearchText(e.target.value)}`.
  - **Case-Insensitive Search**: Normalizing both target data and input query using `.toLowerCase()`.
  - **Master vs. Filtered State Pattern**: Maintaining two state variables (`listOfRestaurants` for master fetched data and `filteredRestaurants` for UI rendering) to prevent subsequent searches from filtering against already filtered subsets.

---

## 🛠️ Code Implementation Highlights

### Project Directory Structure
```text
06-exploring-the-world/
├── .env
├── .env.example
├── index.html
├── styles.css
├── package.json
└── src/
    ├── App.js
    ├── components/
    │   ├── Header.js
    │   ├── Body.js
    │   ├── RestaurantCard.js
    │   ├── Shimmer.js
    │   └── Footer.js
    └── utils/
        └── constants.js
```

### 1. Environment & Utility Configuration
- **`.env.example`**: Configured environment template for external API keys:
  ```env
  API_KEY=your-cors-proxy-api-key
  ```
- **`src/utils/constants.js`**: Exported base image URL prefix for Swiggy Cloudinary assets and logo CDN:
  ```javascript
  const LOGO_URL = "https://img.magnific.com/free-vector/food-shopping-logo-template-design_460848-10299.jpg";
  const CLOUDINARY_URL = "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/";

  export { LOGO_URL, CLOUDINARY_URL };
  ```

### 2. Shimmer Placeholder Component (`src/components/Shimmer.js`)
- Implemented a 10-card skeleton grid component to display placeholder state during data fetching:
  ```javascript
  const Shimmer = () => {
      return (
          <div className="restaurant-list" data-testid="shimmer">
              {Array(10).fill("").map((e, index) => (
                  <div key={index} className="shimmer-card"></div>
              ))}
          </div>
      );
  };

  export default Shimmer;
  ```

### 3. Dynamic API Data Fetching & Shimmer UI (`src/components/Body.js`)
- Used `useEffect` to trigger async Swiggy API call through CORS proxy (`corsproxy.io`) after component render.
- Implemented conditional rendering using ternary operator to show `Shimmer` before live data resolves:
  ```javascript
  import { useState, useEffect } from "react";
  import RestaurantCard from "./RestaurantCard";
  import Shimmer from "./Shimmer";

  const CORS_API_KEY = process.env.API_KEY;

  const Body = () => {
      const [listOfRestaurants, setListOfRestaurants] = useState([]);
      const [searchText, setSearchText] = useState("");

      useEffect(() => {
          fetchData();
      }, []);

      const fetchData = async () => {
          const data = await fetch(
              `https://corsproxy.io/?key=${CORS_API_KEY}&url=https://www.swiggy.com/dapi/restaurants/list/v5?lat=19.07480&lng=72.88560&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`
          );
          const json = await data.json();
          setListOfRestaurants(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
      };

      return listOfRestaurants.length === 0 ? (
          <Shimmer />
      ) : (
          <div className="body">
              {/* Controls and Restaurant Grid */}
          </div>
      );
  };
  ```

### 4. Interactive Search & Rating Filter Controls (`src/components/Body.js`)
- Implemented controlled input field for search text and filter buttons for top-rated restaurants (`avgRating > 4.0`):
  ```javascript
  <div className="controls-container">
      <div className="search">
          <input 
              className="search-box" 
              placeholder="Search for a restaurant..." 
              type="text" 
              value={searchText} 
              onChange={(e) => setSearchText(e.target.value)}
          />
          <button className="search-btn" onClick={() => {
              const filteredList = listOfRestaurants.filter(res => 
                  res.info.name.toLowerCase().includes(searchText.toLowerCase())
              );
              setListOfRestaurants(filteredList);
          }}>Search</button>
      </div>
      <div className="filter">
          <button className="filter-btn" onClick={() => {
              const filteredList = listOfRestaurants.filter(res => res.info.avgRating > 4.0);
              setListOfRestaurants(filteredList);
          }}>Top Rated Restaurants</button>
      </div>
  </div>
  ```

### 5. Dynamic Restaurant Card rendering (`src/components/RestaurantCard.js`)
- Updated `RestaurantCard` to dynamically concatenate `CLOUDINARY_URL` with `cloudinaryImageId` and render live API metadata (`name`, `cuisines`, `avgRating`, `deliveryTime`, `costForTwo`):
  ```javascript
  import { CLOUDINARY_URL } from "../utils/constants";

  const RestaurantCard = (props) => {
      const { resData } = props;
      const { cloudinaryImageId, name, cuisines, avgRating, sla, costForTwo } = resData;
      const deliveryTime = sla.deliveryTime;

      return (
          <div className="restaurant-card" style={{ backgroundColor: "#f0f0f0" }}>
              <img className="restaurant-logo" alt="restaurant-logo" src={CLOUDINARY_URL + cloudinaryImageId} />
              <h3>{name}</h3>
              <h4>{cuisines.join(", ")}</h4>
              <h4>{avgRating} stars</h4>
              <h4>{deliveryTime} minutes</h4>
              <h4>{costForTwo}</h4>
          </div>
      );
  };

  export default RestaurantCard;
  ```