import { useState, useEffect } from "react";
import { CORS_API_KEY } from "../utils/constants";
import Shimmer from "./Shimmer";

const RestaurantMenu = () => {
    const [resInfo, setResInfo] = useState(null);
    useEffect(() => {
        fetchMenu();
    }, [])

    const fetchMenu = async () => {
        const swiggyUrl =
            `https://www.swiggy.com/dapi/menu/pl` +
            `?page-type=REGULAR_MENU` +
            `&complete-menu=true` +
            `&lat=19.07480` +
            `&lng=72.88560` +
            `&restaurantId=366927` +
            `&submitAction=ENTER`;

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

    const { name, cuisines, costForTwoMessage } = resInfo?.cards[2]?.card?.card?.info;

    return resInfo === null ? (<Shimmer />) : (
        <div className="menu">
            <h1>{name}</h1>
            <h3>{cuisines.join(", ") - costForTwoMessage}</h3>
            <h2>Menu</h2>
            <ul>
                <li>Item Name - Price</li>
                <li>Item Name - Price</li>
                <li>Item Name - Price</li>
            </ul>
        </div>
    )
}

export default RestaurantMenu;