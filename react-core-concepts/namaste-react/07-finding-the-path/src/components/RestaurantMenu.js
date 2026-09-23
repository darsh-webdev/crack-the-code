import { useState, useEffect } from "react";
import { CORS_API_KEY } from "../utils/constants";
import Shimmer from "./Shimmer";

const RestaurantMenu = () => {
    const [resInfo, setResInfo] = useState(null);
    useEffect(() => {
        fetchMenu();
    }, [])

    const fetchMenu = async () => {
        const data = await fetch(`https://corsproxy.io/?key=${CORS_API_KEY}&url=https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=19.07480&lng=72.88560&restaurantId=550871&submitAction=ENTER`)
        const json = await data.json();
        setResInfo(json?.data)
    }

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