import { useState, useEffect } from "react"
import RestaurantCard from "./RestaurantCard"
import Shimmer from "./Shimmer"

const CORS_API_KEY = process.env.API_KEY;

const Body = () => {
    // Local State Variable -  Super powerful variable
    const [listOfRestaurants, setListOfRestaurants] = useState([])
    const [searchText, setSearchText] = useState("");

    // If no depdency array => useEffect runs on every render
    // If empty array => it runs only once
    // If array with elements => it runs only when the element changes
    useEffect(() => {
        fetchData();
    }, [])


    const fetchData = async () => {
        const data = await fetch(`https://corsproxy.io/?key=${CORS_API_KEY}&url=https://www.swiggy.com/dapi/restaurants/list/v5?lat=19.07480&lng=72.88560&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`);
        const json = await data.json();
        setListOfRestaurants(json?.data?.cards[4]?.card?.card?.gridElements.infoWithStyle.restaurants)
    }


    return listOfRestaurants.length === 0 ? (
        <Shimmer />
    ) : (
        <div className="body">
            <div className="controls-container">
                <div className="search">
                    <input className="search-box" placeholder="Search for a restaurant..." type="text" value={searchText} onChange={(e) => setSearchText(e.target.value)}></input>
                    <button className="search-btn" onClick={() => {
                        const filteredList = listOfRestaurants.filter(res => res.info.name.toLowerCase().includes(searchText.toLowerCase()))
                        setListOfRestaurants(filteredList)
                    }}>Search</button>
                </div>
                <div className="filter">
                    <button className="filter-btn" onClick={() => {
                        const filteredList = listOfRestaurants.filter(res => res.info.avgRating > 4.0)
                        setListOfRestaurants(filteredList)
                    }}>Top Rated Restaurants</button>
                </div>
            </div>
            <div className="restaurant-container">
                {listOfRestaurants.map(restaurant => (
                    <RestaurantCard key={restaurant.info.id} resData={restaurant.info} />
                ))}
            </div>
        </div>
    )
}

export default Body;