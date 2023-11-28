"use client";
import React, { useEffect, useState } from 'react';
import {useSearchParams } from "next/navigation";
import { useUserData } from "@/context/userContext";

import ArtistsView from './artistsView';
import { getArtistsOfTopSongsNotFollowed } from '../../../neo4j';

const Artists = () => {
    const searchParams = useSearchParams();
    const { currentUser } = useUserData();
    const [artists, setArtists] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const resultArt = await getArtistsOfTopSongsNotFollowed(currentUser?.email)
            console.log(resultArt);
            console.log('hola');
        }
        fetchData();
    }, [currentUser?.email]);

    return (<ArtistsView/>)
}

export default Artists;