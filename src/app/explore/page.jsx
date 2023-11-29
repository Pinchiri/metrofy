"use client";
import { useState, useEffect } from "react";
import {
  getCategoriesNeo4J,
  getRecommendedSongsBasedOnFavoriteGenre,
  getRecommendedSongsBasedOnSecondFavoriteGenre,
  getRecommendedSongsBasedOnFavoriteArtist,
  getRecommendedSongsBasedOnCountry,
} from "../../../neo4j";
import ExploreView from "./exploreView";
import { useUserData } from "@/context/userContext";
import RecommendedSongsView from "./recommendedSongsView";

export default function Explore() {
  const [categories, setCategories] = useState([]);
  const { currentUser } = useUserData();
  const [recommendedSongs, setRecommendedSongs] = useState([]);
  const [favoriteGenre, setFavoriteGenre] = useState("");
  const [secondRecommendedSongs, setSecondRecommendedSongs] = useState([]);
  const [secondFavoriteGenre, setSecondFavoriteGenre] = useState("");
  const [artistRecommendedSongs, setArtistRecommendedSongs] = useState([]);
  const [favoriteArtist, setFavoriteArtist] = useState("");
  const [country, setCountry] = useState([]);
  const [countryGenre, setCountryGenre] = useState([]);
  const [listSongs, setListSongs] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingCat, setIsLoadingCat] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoadingCat(true);
      try {
        const data = await getCategoriesNeo4J();
        setCategories(data);
        setIsLoadingCat(false);
      } catch (error) {
        console.error("Error al obtener categorías:", error);
        setIsLoadingCat(false);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchRecommendedSongs = async () => {
      if (!currentUser || !currentUser.email) {
        return; // Previene la ejecución si currentUser es null o no tiene email
      }
      try {
        setIsLoading(true);
        // PRIMER GENERO MAS ESCUCHADO
        const { genre: firstGenre, songs: firstGenreSongs } =
          await getRecommendedSongsBasedOnFavoriteGenre(currentUser.email);
        setFavoriteGenre(firstGenre);
        setRecommendedSongs(firstGenreSongs);

        // SEGUNDO GENERO MAS ESCUCHADO
        const { genre: secondGenre, songs: secondGenreSongs } =
          await getRecommendedSongsBasedOnSecondFavoriteGenre(
            currentUser.email
          );

        if (secondGenre) {
          setSecondFavoriteGenre(secondGenre);
          setSecondRecommendedSongs(secondGenreSongs);
        }

        // ARTISTA FAVORITO
        const { artist, songs } =
          await getRecommendedSongsBasedOnFavoriteArtist(currentUser.email);
        if (artist) {
          setFavoriteArtist(artist);
          setArtistRecommendedSongs(songs);
        }

        // PAIS
        const { country, countryGenre, listSongs } =
          await getRecommendedSongsBasedOnCountry(currentUser.email);
        if (country) {
          setCountry(country);
          setCountryGenre(countryGenre);
          setListSongs(listSongs);
        }

        setIsLoading(false);
      } catch (error) {
        console.error("Error al obtener canciones recomendadas:", error);
        setIsLoading(false);
      }
    };
    fetchRecommendedSongs();
  }, [currentUser?.email]);

  return (
    <>
      <div className="w-full flex flex-col items-center justify-center my-10">
        <ExploreView categories={categories} isLoading={isLoadingCat} />

        <RecommendedSongsView
          category="genre"
          setRecommendedSongs={setRecommendedSongs}
          currentUser={currentUser}
          categoryName={favoriteGenre}
          songs={recommendedSongs}
          isLoading={isLoading}
          recommendationType={"FavoriteGenre"}
        />

        <RecommendedSongsView
          category="genre"
          setRecommendedSongs={setSecondRecommendedSongs}
          currentUser={currentUser}
          categoryName={secondFavoriteGenre}
          songs={secondRecommendedSongs}
          isLoading={isLoading}
          recommendationType={"SecondFavoriteGenre"}
        />

        <RecommendedSongsView
          category="artist"
          setRecommendedSongs={setArtistRecommendedSongs}
          currentUser={currentUser}
          categoryName={favoriteArtist}
          songs={artistRecommendedSongs}
          isLoading={isLoading}
          recommendationType={"FavoriteArtist"}
        />

        <RecommendedSongsView
          category="countryGenre"
          currentUser={currentUser}
          countryGenre={countryGenre}
          country={country}
          setRecommendedSongs={setListSongs}
          listSongs={listSongs}
          isLoading={isLoading}
          recommendationType={"CountryGenre"}
        />
      </div>
    </>
  );
}
