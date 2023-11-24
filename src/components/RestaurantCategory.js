import { useState } from "react";
import ItemsInsideCategory from "./ItemsInsideCategory";

const RestaurantCategory = ({ data, showItem, setShowIndex }) => {
  const handleClick = () => {
    setShowIndex();
  };

  return (
    <div className="items-center">
      {/*accordian header*/}
      <div className="bg-gray-100 w-6/12 mx-auto my-4 p-4 shadow-lg">
        <div
          className="justify-between flex cursor-pointer"
          onClick={handleClick}
        >
          <span className="font-bold text-lg">
            {data.title}({data.itemCards.length})
          </span>
          <span>{"⬇"}</span>
        </div>
        {showItem && <ItemsInsideCategory items={data.itemCards} />}
      </div>
    </div>
  );
};

export default RestaurantCategory;
