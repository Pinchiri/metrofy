import React from "react";
import UserAvatar from "../UserAvatar/UserAvatar";

const Navbar = () => {
  return (
    <div className="navbar bg-base-300">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">Metrofy</a>
      </div>
      <div className="flex-none">
        <UserAvatar />
      </div>
    </div>
  );
};

export default Navbar;
