import React from "react";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { favoriteArtistsURL, favoriteSongsURL } from "@/constants/urls";
import Image from "next/image";

const UserAvatar = ({ profilePicture, handleLogout }) => {
  return (
    <div className="dropdown dropdown-end">
      <label
        tabIndex={0}
        className="btn btn-ghost btn-circle avatar hover:scale-105 transition-all"
      >
        <div className="w-10 rounded-full">
          {profilePicture && (
            <div className="w-10 rounded-full">
              <Image
                loader={() => profilePicture}
                height={400}
                width={400}
                alt="Avatar"
                src={profilePicture}
              />
            </div>
          )}

          {!profilePicture && (
            <UserCircleIcon className="text-neutral-content" />
          )}
        </div>
      </label>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content mt-3 z-10 p-2 shadow bg-base-100 rounded-box w-52"
      >
        <Link href={favoriteSongsURL}>
          <li>
            <p>Mis Canciones</p>
          </li>
        </Link>
        <Link href={favoriteArtistsURL}>
          <li>
            <p>Mis Artistas</p>
          </li>
        </Link>
        <li>
          <p className="" onClick={handleLogout}>
            Cerrar sesión
          </p>
        </li>
      </ul>
    </div>
  );
};

export default UserAvatar;
