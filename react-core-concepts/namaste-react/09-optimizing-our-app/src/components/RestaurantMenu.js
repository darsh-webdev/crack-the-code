import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { CORS_API_KEY, MENU_API } from "../utils/constants";
import Shimmer from "./Shimmer";

const RestaurantMenu = () => {
    const [resInfo, setResInfo] = useState(null);
    const { resId } = useParams();

    useEffect(() => {
        fetchMenu();
    }, [])

    const fetchMenu = async () => {
        const swiggyUrl =
            `${MENU_API + resId}`;

        const proxyUrl =
            `https://corsproxy.io/?key=${CORS_API_KEY}` +
            `&url=${encodeURIComponent(swiggyUrl)}`;

        const response = await fetch(proxyUrl);

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const json = await response.json();

        setResInfo(json?.data);
    };

    if (resInfo === null) return <Shimmer />

    const { name, cuisines, costForTwoMessage } = resInfo?.cards[2]?.card?.card?.info;
    const { itemCards } = resInfo?.cards[3]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card;

    return (
        <div className="menu">
            <h1>{name}</h1>
            <h3>{cuisines.join(", ") - costForTwoMessage}</h3>
            <h2>Menu</h2>
            <ul>
                {itemCards.map(item => (
                    <li key={item.card.info.id}>{item.card.info.name} - ₹{item.card.info.price / 100}</li>
                ))}
            </ul>
        </div>
    )
}

export default RestaurantMenu;