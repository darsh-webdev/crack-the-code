
import { useState, useEffect } from "react";
import { CORS_API_KEY, MENU_API } from "./constants";

const useRestaurantMenu = (resId) => {
    const [resInfo, setResInfo] = useState(null);

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
    return resInfo;
}

export default useRestaurantMenu;