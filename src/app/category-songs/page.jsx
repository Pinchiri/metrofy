"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getSongsByGenderNeo4J } from "../../../neo4j";
import CategorySongsView from "./categorySongsView";
import { useUserData } from "@/context/userContext";
import { genresURL } from "@/constants/urls";

const CategorySongs = () => {
  const searchParams = useSearchParams();
  const category = searchParams.get("category");

  const { currentUser } = useUserData();
  const router = useRouter();

  const [songs, setSongs] = useState([]);
  const [enhancedSongs, setEnhancedSongs] = useState(songs);

  const goBack = () => {
    router.push(genresURL);
  };

  useEffect(() => {
    setEnhancedSongs(songs);
  }, [songs]);

  useEffect(() => {
    async function fetchData() {
      if (currentUser?.email && category) {
        const songsWithStatus = await getSongsByGenderNeo4J(
          category,
          currentUser.email
        );
        setSongs(songsWithStatus);
      }
    }
    fetchData();
  }, [category, currentUser?.email]);

  return (
    <CategorySongsView
      enhancedSongs={enhancedSongs}
      currentUser={currentUser}
      categoryName={category}
      setEnhancedSongs={setEnhancedSongs}
      goBack={goBack}
    />
  );
};

export default CategorySongs;
