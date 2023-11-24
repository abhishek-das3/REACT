import { CDN_URL } from "../utils/constants";

const RestaurantCard = (props) => {

    const { resObj } = props;
    const { cloudinaryImageId, name, avgRating, cuisines, deliveryTime } = resObj?.info;

    return (
        <div className="m-4 p-4 w-[250] bg-gray-100 hover:bg-gray-200"> 
            <img className="rounded-lg" src = {CDN_URL + cloudinaryImageId}></img>
            <h3 className="font-bold py-4 text-lg">{name}</h3>
            <h4>{cuisines.join(", ")}</h4>
            <h4>Rating - {avgRating}</h4>
            <h4>Deliverd in - {deliveryTime} minutes</h4>
        </div>
    );
}

export const RestaurantCardVeg = (RestaurantCard) => {
    return (
        (props) => {
            return (
                <div>
                    <label className="text-black bg-green-400 m-2 p-2 rounded-lg absolute">Veg</label>
                    <RestaurantCard {...props}/>
                </div>
            );
        }
    );
}

export default RestaurantCard;