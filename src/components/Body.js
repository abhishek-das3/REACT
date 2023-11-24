import RestaurantCard, { RestaurantCardVeg } from "./RestaurantCard";
import { useState, useEffect, useContext } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import { useOnlineStatus } from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";

const Body = () => {
  const variable = useState([]);

  const [listOfRestaurants, setListOfRestaurants] = variable;

  const [searchText, setSearchText] = useState("");

  const [filteredRestaurants, setFilteredRestaurants] = useState([]);

  console.log("variable data", listOfRestaurants);

  const RestaurantCardVegComponent = RestaurantCardVeg(RestaurantCard);

  const { LoggedInUser, setUserName } = useContext(UserContext);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9715987&lng=77.5945627&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );

    const json = await data.json();

    setListOfRestaurants(
      json?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
    setFilteredRestaurants(
      json?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
  };

  const onlineStatus = useOnlineStatus();

  if (onlineStatus == false)
    return <h1>Looks like internet connection is down</h1>;

  // This is conditional rendering

  return listOfRestaurants.length == 0 ? (
    <Shimmer />
  ) : (
    <div className="body">
      <div className="filter flex">
        <div className="search m-4 p-4">
          <input
            type="text"
            className="search-box border border-solid border-black"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />

          <button
            className="filter-btn mx-4 px-8 py-2 bg-green-100 rounded-lg"
            onClick={() => {
              const searchedRestaurants = listOfRestaurants.filter((res) => {
                return res.info.name
                  .toLowerCase()
                  .includes(searchText.toLowerCase());
              });

              setFilteredRestaurants(searchedRestaurants);
            }}
          >
            Search
          </button>
        </div>

        <div className="search m-4 p-4 flex items-center">
          <button
            className="filter-btn px-4 py-2 bg-gray-200 rounded-lg"
            onClick={() => {
              const filteredList = listOfRestaurants.filter(
                (res) => res.info.avgRating > 4
              );

              setFilteredRestaurants(filteredList);
            }}
          >
            Rating greater than 4
          </button>
        </div>
        <div>
          <label>Name Changing</label>
          <input
            type="text"
            value={LoggedInUser}
            onChange={(e) => setUserName(e.target.value)}
          ></input>
        </div>
      </div>

      <div className="flex flex-wrap">
        {filteredRestaurants.map((resturant) => {
          return (
            <Link
              to={"/restaurants/" + resturant.info.id}
              key={resturant.info.id}
            >
              {resturant.info.veg ? (
                <RestaurantCardVegComponent resObj={resturant} />
              ) : (
                <RestaurantCard resObj={resturant} />
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Body;
