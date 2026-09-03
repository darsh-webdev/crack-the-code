import RestaurantCard from "./RestaurantCard"
import restaurantsList from "../utils/mockData"

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

export default Body;