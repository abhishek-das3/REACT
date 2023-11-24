import { useContext, useState } from "react";
import { LOGO_URL } from "../utils/constants";
import { Link } from "react-router-dom";
import { useOnlineStatus } from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";

const Header = () => {
  const [btnValue, setBtnValue] = useState("Login");
  const onlineStatus = useOnlineStatus();

  const { LoggedInUser } = useContext(UserContext);
  console.log(LoggedInUser);

  return (
    <div className="flex justify-between bg-pink-100 shadow-lg ">
      <div className="logo">
        <img className="w-56" src={LOGO_URL}></img>
      </div>
      <div className="flex items-center">
        <ul className="flex p-4 m-4">
          <li className="px-4">Online Status : {onlineStatus ? "🟢" : "🔴"}</li>
          <li className="px-4">
            <Link to="/">Home</Link>
          </li>
          <li className="px-4">
            <Link to="/about">About</Link>
          </li>
          <li className="px-4">
            <Link to="/contact">Contact us</Link>
          </li>
          <li className="px-4">
            <Link to="/grocery">Grocery</Link>
          </li>
          <li className="px-4">cart</li>
          <li className="px-4">
            <button
              className="btn"
              onClick={() => {
                btnValue == "Login"
                  ? setBtnValue("LogOut")
                  : setBtnValue("Login");
              }}
            >
              {btnValue}
            </button>
          </li>
          <li>{LoggedInUser}</li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
