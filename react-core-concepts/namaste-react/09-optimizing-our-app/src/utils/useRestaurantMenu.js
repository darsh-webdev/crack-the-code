import { useState, useEffect } from "react";
import { CORS_API_KEY, MENU_API } from "./constants";

const useRestaurantMenu = (resId) => {
    const [resInfo, setResInfo] = useState(null);

    useEffect(() => {
        if (resId) {
            fetchMenu();
        }
    }, [resId]);

    const fetchMenu = async () => {
        try {
            const swiggyUrl = `${MENU_API + resId}`;
            let response;

            // 1. Try direct fetch first (works when Allow CORS browser extension is enabled)
            try {
                response = await fetch(swiggyUrl);
            } catch (corsErr) {
                // 2. Fallback to CORS proxy if direct fetch is blocked by browser CORS
                const proxyUrl =
                    `https://corsproxy.io/?key=${CORS_API_KEY}` +
                    `&url=${encodeURIComponent(swiggyUrl)}`;
                response = await fetch(proxyUrl);
            }

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }

            const text = await response.text();

            // Swiggy's AWS WAF blocks proxy requests for menu API, returning HTTP 202 with an empty body ("")
            if (!text || text.trim() === "") {
                console.warn(
                    "Swiggy AWS WAF blocked the CORS proxy request for the menu API and returned an empty response (HTTP 202). " +
                    "To fetch live menu data directly from Swiggy, please enable an 'Allow CORS' browser extension and fetch directly."
                );
                return;
            }

            const json = JSON.parse(text);

            setResInfo(json?.data);
        } catch (error) {
            console.error("Error fetching menu:", error);
        }
    };
    return resInfo;
};

export default useRestaurantMenu;