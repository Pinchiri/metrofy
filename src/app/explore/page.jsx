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

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategoriesNeo4J();
        setCategories(data);
      } catch (error) {
        console.error("Error al obtener categorías:", error);
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

        const { country, countryGenre, listSongs } =
          await getRecommendedSongsBasedOnCountry(currentUser.email);
        if (country) {
          console.log(country, countryGenre, listSongs);
          setCountry(country);
          setCountryGenre(countryGenre);
          setListSongs(listSongs);
        }
      } catch (error) {
        console.error("Error al obtener canciones recomendadas:", error);
      }
    };
    fetchRecommendedSongs();
  }, [currentUser?.email]);

  return (
    <>
      <div className="my-10">
        <ExploreView categories={categories} />
        <RecommendedSongsView
          category="genre"
          categoryName={favoriteGenre}
          songs={recommendedSongs}
        />
        <br />
        <RecommendedSongsView
          category="genre"
          categoryName={secondFavoriteGenre}
          songs={secondRecommendedSongs}
        />
        <br />
        <RecommendedSongsView
          category="artist"
          categoryName={favoriteArtist}
          songs={artistRecommendedSongs}
        />
        <br />
        <RecommendedSongsView
          category="countryGenre"
          country={country}
          countryGenre={countryGenre}
          listSongs={listSongs}
        />
      </div>
    </>
  );
}
