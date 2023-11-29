"use client";
import React, { useEffect, useState } from 'react';
import {useSearchParams } from "next/navigation";
import { useUserData } from "@/context/userContext";

import ArtistsView from './artistsView';
import { getArtistsOfTopSongsNotFollowed } from '../../../neo4j';

const Artists = () => {

    const { currentUser } = useUserData();
    const [artists, setArtists] = useState([]);
    const [enhancedArtists, setEnhancedArtists] = useState(artists);
    
    useEffect(() => {
        async function fetchData() {
            const resultArt = await getArtistsOfTopSongsNotFollowed(currentUser?.email)
            setArtists(resultArt);
        }
        fetchData();
    }, [currentUser?.email]);

    useEffect(() => {
        setEnhancedArtists(artists);
    }, [artists]);

    return (<ArtistsView artistsList={enhancedArtists} currentUser={currentUser}/>)
}

export default Artists;