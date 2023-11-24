import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import RestaurantCategory from "./RestaurantCategory";
import { useState } from "react";

const RestaurantMenu = () => {
  console.log("Menu called");

  const { resId } = useParams();

  const resInfo = useRestaurantMenu(resId);

  const [showIndex, setShowIndex] = useState(null);

  if (resInfo == null) return <Shimmer />;

  const { name, cuisines, cloudinaryImageId, costForTwoMessage } =
    resInfo?.cards[0]?.card?.card?.info;

  const categories =
    resInfo?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
      (c) =>
        c?.card?.card?.["@type"] ==
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    );

  console.log("categories", categories);

  return (
    <div className="text-center">
      <h1 className="text-2xl my-6 font-bold">{name}</h1>
      <h3 className="font-bold text-lg">{cuisines.join(", ")}</h3>
      <h3 className="font-bold text-lg">{costForTwoMessage}</h3>

      {categories.map((category, index) => (
        <RestaurantCategory
          key={category.card.card.title}
          data={category.card.card}
          showItem={showIndex == index ? true : false}
          setShowIndex={() => {
            if (showIndex == index) setShowIndex(null);
            else setShowIndex(index);
          }}
        />
      ))}
    </div>
  );
};

export default RestaurantMenu;
