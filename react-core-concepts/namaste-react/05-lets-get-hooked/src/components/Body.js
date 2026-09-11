import { useState } from "react"
import RestaurantCard from "./RestaurantCard"
import restaurantsList from "../utils/mockData"

const Body = () => {
    // Local State Variable -  Super powerful variable
    const [listOfRestaurants, setListOfRestaurants] = useState(restaurantsList)
    return (
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