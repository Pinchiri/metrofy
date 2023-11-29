"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useUserData } from "@/context/userContext";
import { genresURL } from "@/constants/urls";
import SongsList from "@/components/SongsList/SongsList";
import Divider from "@/components/Divider/Divider";
import RecommendedView from "./recommendedView";



const RecommendedSongs = () => {
    const searchParams = useSearchParams();
    const recomendationType = searchParams.get("recommendation");



    const { currentUser } = useUserData();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [recommendedSongs, setRecommendedSongs] = useState([]);

    const goBack = () => {
        router.push(genresURL);
    }

    let message = "";

    return (

        <RecommendedView
            currentUser={currentUser}
            songsToDisplay={recommendedSongs}
            setRecommendedSongs={setRecommendedSongs}
            goBack={goBack}
            message={message}
            isLoading={isLoading}
        />

    );

}

export default RecommendedSongs;

