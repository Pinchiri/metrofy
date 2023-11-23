"use client";
import React, { useEffect, useState } from 'react';
import {useSearchParams } from "next/navigation";
import { getSongsByGenderNeo4J } from '../../../neo4j';
import CategorySongsView from './categorySongsView';
import { useUserData } from "@/context/userContext";
import { createFavoritedRelationship, deleteFavoritedRelationship, getSongsWithFavoritedStatus } from "../../../neo4j";

const CategorySongs = () => {
    const searchParams = useSearchParams();
    const category = searchParams.get("category")
    const { currentUser } = useUserData();
    const [songs, setSongs] = useState([]);
    const [enhancedSongs, setEnhancedSongs] = useState(songs);
   
    useEffect(() => {
        setEnhancedSongs(songs);
    }, [songs]);

    useEffect(() => {
        async function fetchData() {
            if (currentUser?.email && category) {
                const songsWithStatus = await getSongsByGenderNeo4J(category, currentUser.email);
                setSongs(songsWithStatus);
            }
        }
        fetchData();
    }, [category, currentUser?.email]);

    const handleLike = async (song) => {
        await createFavoritedRelationship(currentUser?.email, song.id);
        setEnhancedSongs(enhancedSongs.map(s => s.id === song.id ? { ...s, favorited: true } : s));
    };
    
    const handleUnlike = async (song) => {
        await deleteFavoritedRelationship(currentUser?.email, song.id);
        setEnhancedSongs(enhancedSongs.map(s => s.id === song.id ? { ...s, favorited: false } : s));
    };

    return <CategorySongsView songs={enhancedSongs} currentUser={currentUser} handleLike={handleLike} handleUnlike={handleUnlike} />;
};

export default CategorySongs;
