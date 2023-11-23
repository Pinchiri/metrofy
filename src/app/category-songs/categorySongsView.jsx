"use client";
import React, { useEffect, useState } from 'react';
import {useSearchParams } from "next/navigation";
import { getSongsByGenderNeo4J } from '../../../neo4j';

const CategorySongsView = ({songs}) => {
    return (
        <div>
             {songs.map((song, index) => (
                <div key={index}>
                    {song.title} - {song.artist}
                </div>
            ))}
        </div>
    );
};

export default CategorySongsView;
