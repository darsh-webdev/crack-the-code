import ReactDOM from "react-dom/client";

/**
 * Header
 *  - Logo
 *  - Nav items
 * Body 
 *  - Search
 *  - RestaurantContainer
 *      - RestaurantCard
 *          - Img
 *          - Name
 *          - Cuisine
 *          - Rating
 *          - Delivery Time
 * Footer
 *  - Copyright
 *  - Links
 *  - Address
 *  - Contact 
 */

const restaurantsList = [
    {
        id: 1,
        imgLink: "https://images.unsplash.com/photo-1513104890138-7c749659a591",
        name: "Pizza Paradise",
        cuisines: ["Pizza", "Italian", "Fast Food"],
        avgRating: 4.4,
        deliveryTime: 28,
        costForTwo: 500,
    },
    {
        id: 2,
        imgLink: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
        name: "Burger Junction",
        cuisines: ["Burgers", "American", "Fast Food"],
        avgRating: 4.2,
        deliveryTime: 25,
        costForTwo: 400,
    },
    {
        id: 3,
        imgLink: "https://images.unsplash.com/photo-1589302168068-964664d93dc0",
        name: "Biryani House",
        cuisines: ["Biryani", "Mughlai", "North Indian"],
        avgRating: 4.6,
        deliveryTime: 35,
        costForTwo: 600,
    },
    {
        id: 4,
        imgLink: "https://images.unsplash.com/photo-1601050690597-df0568f70950",
        name: "Punjabi Tadka",
        cuisines: ["North Indian", "Punjabi", "Tandoor"],
        avgRating: 4.3,
        deliveryTime: 32,
        costForTwo: 550,
    },
    {
        id: 5,
        imgLink: "https://images.unsplash.com/photo-1553621042-f6e147245754",
        name: "Tokyo Sushi Bar",
        cuisines: ["Japanese", "Sushi", "Asian"],
        avgRating: 4.7,
        deliveryTime: 40,
        costForTwo: 1200,
    },
    {
        id: 6,
        imgLink: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8",
        name: "Pasta Street",
        cuisines: ["Italian", "Pasta", "Continental"],
        avgRating: 4.1,
        deliveryTime: 30,
        costForTwo: 700,
    },
    {
        id: 7,
        imgLink: "https://images.unsplash.com/photo-1606491956689-2ea866880c84",
        name: "Mumbai Chaat Corner",
        cuisines: ["Street Food", "Chaat", "Indian"],
        avgRating: 4.5,
        deliveryTime: 20,
        costForTwo: 250,
    },
    {
        id: 8,
        imgLink: "https://images.unsplash.com/photo-1630383249896-424e482df921",
        name: "South Indian Express",
        cuisines: ["South Indian", "Dosa", "Idli"],
        avgRating: 4.4,
        deliveryTime: 24,
        costForTwo: 350,
    },
    {
        id: 9,
        imgLink: "https://images.unsplash.com/photo-1552566626-52f8b828add9",
        name: "The Royal Kitchen",
        cuisines: ["North Indian", "Chinese", "Continental"],
        avgRating: 4.0,
        deliveryTime: 38,
        costForTwo: 800,
    },
    {
        id: 10,
        imgLink: "https://images.unsplash.com/photo-1550547660-d9450f859349",
        name: "Big Bite Burgers",
        cuisines: ["Burgers", "American", "Beverages"],
        avgRating: 3.9,
        deliveryTime: 22,
        costForTwo: 450,
    },
    {
        id: 11,
        imgLink: "https://images.unsplash.com/photo-1603133872878-684f208fb84b",
        name: "Wok This Way",
        cuisines: ["Chinese", "Thai", "Asian"],
        avgRating: 4.3,
        deliveryTime: 31,
        costForTwo: 650,
    },
    {
        id: 12,
        imgLink: "https://images.unsplash.com/photo-1574484284002-952d92456975",
        name: "Curry Culture",
        cuisines: ["Indian", "North Indian", "Mughlai"],
        avgRating: 4.6,
        deliveryTime: 36,
        costForTwo: 750,
    },
    {
        id: 13,
        imgLink: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002",
        name: "La Pino's Kitchen",
        cuisines: ["Pizza", "Italian", "Desserts"],
        avgRating: 4.2,
        deliveryTime: 27,
        costForTwo: 600,
    },
    {
        id: 14,
        imgLink: "https://images.unsplash.com/photo-1628294895950-9805252327bc",
        name: "Dragon Bowl",
        cuisines: ["Chinese", "Tibetan", "Momos"],
        avgRating: 4.5,
        deliveryTime: 29,
        costForTwo: 500,
    },
    {
        id: 15,
        imgLink: "https://images.unsplash.com/photo-1547592180-85f173990554",
        name: "Green Bowl",
        cuisines: ["Healthy Food", "Salads", "Continental"],
        avgRating: 4.8,
        deliveryTime: 26,
        costForTwo: 650,
    },
];


const Header = () => {
    return (
        <div className="header">
            <div className="logo-container">
                <img className="logo" src="https://img.magnific.com/free-vector/food-shopping-logo-template-design_460848-10299.jpg" />
            </div>
            <div className="nav-items">
                <ul>
                    <li>Home</li>
                    <li>About Us</li>
                    <li>Contact Us</li>
                    <li>Cart</li>
                </ul>
            </div>
        </div>
    )
}

const RestaurantCard = (props) => {
    const { resData } = props;
    const { imgLink, name, cuisines, avgRating, deliveryTime, costForTwo } = resData;
    return (
        <div className="restaurant-card" style={{ backgroundColor: "#f0f0f0" }}>
            <img className="restaurant-logo" alt="restaurant-logo" src={imgLink} />
            <h3>{name}</h3>
            <h4>{cuisines.join(", ")}</h4>
            <h4>{avgRating} stars</h4>
            <h4>{deliveryTime} minutes</h4>
            <h4>₹{costForTwo} for two</h4>
        </div>
    )
}


// not using keys (not acceptable) <<<<< index as key <<<<<< unique id (best practice)

const Body = () => {
    return (
        <div className="body">
            <div className="search">
                Search
            </div>
            <div className="restaurant-container">
                {restaurantsList.map(restaurant => <RestaurantCard key={restaurant.id} resData={restaurant} />)}
            </div>
        </div>
    )
}

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-section">
                <h3>Foodie App</h3>
                <p>© 2026 Foodie App. All rights reserved.</p>
            </div>

            <div className="footer-section">
                <h3>Links</h3>
                <ul>
                    <li>Home</li>
                    <li>About Us</li>
                    <li>Contact Us</li>
                </ul>
            </div>

            <div className="footer-section">
                <h3>Address</h3>
                <p>123 Khau Gaali</p>
                <p>Mumbai, India</p>
            </div>

            <div className="footer-section">
                <h3>Contact</h3>
                <p>📞 +91 98765 43210</p>
                <p>✉️ support@foodieapp.com</p>
            </div>
        </footer>
    );
};

const AppLayout = () => {
    return (
        <div className="app">
            <Header />
            <Body />
            <Footer />
        </div>
    )
}

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<AppLayout />);