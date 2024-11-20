import React from "react";
import { Link } from "react-router-dom";

const MainNav = () => {
  return (
    <div className="navbar bg-white-100 flex justify-between h-30">

      <div className="flex-none">
        <ul className="menu menu-horizontal px-1 ">
          <li>
            <Link to={"/"}>LOGO</Link>
          </li>
          <li>
            <Link to={"/"}>HOME</Link>
          </li>
          <li>
            <Link to={"shop"}>Shop</Link>
          </li>
          <li>
          <Link to={"cart"}>Cart</Link>
          </li>
        </ul>
      </div>

      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to={"register"}>Register</Link>
          </li>
          <li>
            <Link to={"login"}>Login</Link>
          </li>
        </ul>
      </div>
      
    </div>
  );
};

export default MainNav;
