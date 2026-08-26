import React from "react";
import ReactDOM from "react-dom/client";

/**
 * Header
 *  - Logo
 *  - Nav items
 * Body 
 *  - Search
 *  - RestaurantContainer
 *      - RestaurantCard
 * Footer
 *  - Copyright
 *  - Links
 *  - Address
 *  - Contact 
 */

const AppLayout = () => {
    return (
        <div className="app">
            <h1>Food Delivery App 🚀</h1>
        </div>
    )
}

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<AppLayout />);