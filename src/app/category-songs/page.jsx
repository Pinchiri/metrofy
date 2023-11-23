"use client";
import React, { useEffect, useState } from 'react';
import {useSearchParams } from "next/navigation";
import { getSongsByGenderNeo4J } from '../../../neo4j';
import CategorySongsView from './categorySongsView';

const CategorySongs = () => {
    const searchParams = useSearchParams();
    const category = searchParams.get("category")

    const [songs, setSongs] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const songsGender = await getSongsByGenderNeo4J(category);
            setSongs(songsGender);
        }
        fetchData();
    }, [category]);


    return (
        <CategorySongsView songs={songs}/>
    );
};

export default CategorySongs;
