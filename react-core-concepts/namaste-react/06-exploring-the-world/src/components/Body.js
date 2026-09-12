import { useState, useEffect } from "react"
import RestaurantCard from "./RestaurantCard"
import Shimmer from "./Shimmer"

const Body = () => {
    // Local State Variable -  Super powerful variable
    const [listOfRestaurants, setListOfRestaurants] = useState([])

    useEffect(() => {
        fetchData();
    }, [])


    const fetchData = async () => {
        const data = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=19.07480&lng=72.88560&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING");
        const json = await data.json();
        console.log(json);
    }


    return listOfRestaurants.length === 0 ? (
        <Shimmer />
    ) : (
        <div className="body">
            <div className="filter">
                <button className="filter-btn" onClick={() => {
                    const filteredList = listOfRestaurants.filter(res => res.avgRating > 4)
                    setListOfRestaurants(filteredList)
                }}>Top Rated Restaurants</button>
            </div>
            <div className="restaurant-container">
                {listOfRestaurants.map(restaurant => (
                    <RestaurantCard key={restaurant.id} resData={restaurant} />
                ))}
            </div>
        </div>
    )
}

export default Body;