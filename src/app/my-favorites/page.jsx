"use client";
import React, { useEffect, useState } from 'react';
import { useUserData } from "@/context/userContext";
import { getSongsWithFavoritedStatus, deleteFavoritedRelationship } from "../../../neo4j";

const MyFavorites = () => {
    const { currentUser } = useUserData();
    const [favoriteSongs, setFavoriteSongs] = useState([]);

    useEffect(() => {
        const fetchFavoriteSongs = async () => {
            if (currentUser?.email) {
                const songs = await getSongsWithFavoritedStatus(currentUser.email);
                setFavoriteSongs(songs.filter(song => song.favorited));
            }
        };
        fetchFavoriteSongs();
    }, [currentUser]);

    const handleUnlike = async (song) => {
        await deleteFavoritedRelationship(currentUser?.email, song.id);
        setFavoriteSongs(favoriteSongs.filter(s => s.id !== song.id));
    };

    return (
        <div>
            {favoriteSongs.map((song, index) => (
                <div className="flex flex-row gap-4" key={index}>
                    <p>{song.title} - {song.artist}</p>
                    <button className="error text-white" onClick={() => handleUnlike(song)}>Eliminar de Favoritos</button>
                </div>
            ))}
        </div>
    );
};

export default MyFavorites;
