import React from "react";
import UserAvatar from "../UserAvatar/UserAvatar";
import Link from "next/link";
import { homeURL } from "@/constants/urls";
import Button from "../Button/Button";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

const NavbarView = ({
  sidebarOptions,
  isUserLoading,
  handleAuth,
  profilePicture,
  user,
}) => {
  const renderAvatar = () => {
    if (isUserLoading) {
      return <LoadingSpinner color="primary" extraStyles="pr-10" />;
    }

    if (user) {
      return (
        <UserAvatar handleLogout={handleAuth} profilePicture={profilePicture} />
      );
    }

    return (
      <Button
        text="Iniciar sesión"
        size="sm"
        color="primary"
        extraStyles="text-[10px] btn-xs md:btn-sm md:text-sm px-2 lg:px-4 font-bold hover:scale-105 whitespace-nowrap"
        onClick={handleAuth}
      />
    );
  };
  return (
    <div className="drawer z-20">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* SECTION - Navbar */}
        <div className="w-full navbar bg-base-300">
          <div className="flex-none">
            <label
              htmlFor="my-drawer-3"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-6 h-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="flex-1">
            <Link
              htmlFor="my-drawer"
              className="btn btn-ghost text-xl drawer-button"
              href={homeURL}
            >
              Metrofy
            </Link>
          </div>
          <div className="flex-none">{renderAvatar()}</div>
        </div>
        {/* !SECTION - Navbar */}
      </div>

      {/* SECTION Sidebar */}
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-3"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4 w-80 min-h-full bg-base-200">
          {sidebarOptions.map((option, index) => (
            <li key={index}>
              <Link href={option.link}>{option.label}</Link>
            </li>
          ))}
        </ul>
      </div>
      {/* !SECTION Sidebar */}
    </div>
  );
};

export default NavbarView;
