"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useUserData } from "@/context/userContext";
import { genresURL } from "@/constants/urls";
import RecommendedView from "./recommendedView";
import {
    getCategoriesNeo4J,
    getRecommendedSongsBasedOnFavoriteGenre,
    getRecommendedSongsBasedOnSecondFavoriteGenre,
    getRecommendedSongsBasedOnFavoriteArtist,
    getRecommendedSongsBasedOnCountry,
} from "../../../neo4j";



const RecommendedSongs = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const recomendationType = searchParams.get("recommendation");
    const category = searchParams.get("category");
    const countryGenre = searchParams.get("countryGenre");

    const { currentUser } = useUserData();
    const [isLoading, setIsLoading] = useState(false);
    const [recommendedSongs, setRecommendedSongs] = useState([]);
    const [message, setMessage] = useState("");

    const goBack = () => {
        router.push(genresURL);
    }


    useEffect(() => {

        const fetchRecommendedSongs = async () => {
            if (!currentUser || !currentUser.email) {
                return;
            }
            try {
                setIsLoading(true);
                if (recomendationType === "FavoriteGenre" && category === "genre") {
                    const { genre: firstGenre, songs: firstGenreSongs } = await getRecommendedSongsBasedOnFavoriteGenre(currentUser.email);
                    setRecommendedSongs(firstGenreSongs);
                    setMessage(`Descubre joyas en ${firstGenre} Sólo Para Ti`);
                }
                else if (recomendationType === "SecondFavoriteGenre" && category === "genre") {
                    const { genre: secondGenre, songs: secondGenreSongs } = await getRecommendedSongsBasedOnSecondFavoriteGenre(currentUser.email);
                    setRecommendedSongs(secondGenreSongs);
                    setMessage(`Descubre joyas en ${secondGenre} Sólo Para Ti`);
                }
                else if (recomendationType === "FavoriteArtist" && category === "artist") {
                    const { artist: favoriteArtist, songs: artistSongs } = await getRecommendedSongsBasedOnFavoriteArtist(currentUser.email);
                    setRecommendedSongs(artistSongs);
                    setMessage(`¿Te gusta ${favoriteArtist}? Aquí hay más`);
                }
                else if (recomendationType === "CountryGenre" && category === "countryGenre") {
                    const { country: country, countryGenre: countryGenre, listSongs: listSongs } = await getSongsByGenre(countryGenre, currentUser.email);
                    setRecommendedSongs(listSongs);
                    setMessage(`Explora lo Mejor de ${countryGenre} Popular en ${country}`);
                }

                setIsLoading(false);
                console.log("recomendation", recommendedSongs);
            } catch (error) {
                console.error("Error al obtener recomendaciones:", error);
                setIsLoading(false);
            }
        };
        fetchRecommendedSongs();
    }, [currentUser?.email, recomendationType, category]);

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

