import React from "react";
import { UserCircleIcon } from "@heroicons/react/24/solid";

const UserAvatar = () => {
  return (
    <div className="dropdown dropdown-end">
      <label
        tabIndex={0}
        className="btn btn-ghost btn-circle avatar hover:scale-105 transition-all"
      >
        <div className="w-10 rounded-full">
          <UserCircleIcon className="text-neutral-content" />
        </div>
      </label>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content mt-3 z-10 p-2 shadow bg-base-100 rounded-box w-52"
      >
        <li>
          <a className="justify-between">Profile</a>
        </li>
        <li>
          <a>Settings</a>
        </li>
        <li>
          <a>Logout</a>
        </li>
      </ul>
    </div>
  );
};

export default UserAvatar;
