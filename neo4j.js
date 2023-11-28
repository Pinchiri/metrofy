import neo4j from "neo4j-driver";

// CONFIGURACIÓN DE LA CONEXIÓN A NEO4J
const driver = neo4j.driver(
  process.env.NEXT_PUBLIC_REACT_NEO4J_DRIVER,
  neo4j.auth.basic(
    process.env.NEXT_PUBLIC_REACT_NEO4J_USER,
    process.env.NEXT_PUBLIC_REACT_NEO4J_PASSWORD
  )
);
export default driver;

const session = driver.session();

//CREATE NEW USER
export const createNeo4jUser = async (name, email) => {
  try {
    await session.run("CREATE (n:User {name: $name, email: $email})", {
      name,
      email,
    });
  } finally {
    await session.close();
  }
};

//FETCH ALL GENDER CATEGORIES
export const getCategoriesNeo4J = async () => {
  const session = driver.session();
  try {
    const result = await session.run(
      "MATCH (c:Genre) RETURN c ORDER BY c.name"
    );
    return result.records.map((record) => record.get("c").properties);
  } catch (error) {
    console.error("Error retrieving categories with pagination:", error);
  } finally {
    await session.close();
  }
};

// FETCH SONGS BELONGS_TO GENDER AND CHECK IF FAVORITED BY USER
export const getSongsByGenderNeo4J = async (genreName, userEmail) => {
  const session = driver.session();
  try {
    const result = await session.run(
      `MATCH (c:Cancion)-[:BELONGS_TO]->(g:Genre {name: $genreName})
             OPTIONAL MATCH (u:User {email: $userEmail})-[:FAVORITED]->(c)
             RETURN c, EXISTS((u)-[:FAVORITED]->(c)) AS favorited`,
      { genreName, userEmail }
    );
    return result.records.map((record) => {
      const song = record.get("c").properties;
      song.favorited = record.get("favorited");
      return song;
    });
  } catch (error) {
    console.error(
      "Error al obtener canciones por género y estado favorito:",
      error
    );
  } finally {
    await session.close();
  }
};

// CREATE USER FAVORITE SONG
export const createFavoritedRelationship = async (email, songId) => {
  const session = driver.session();
  try {
    const result = await session.run(
      `MATCH (u:User {email: $email}), (s:Cancion {id: $songId})
             MERGE (u)-[f:FAVORITED]->(s)
             RETURN f;`,
      { email, songId }
    );
    return result.records.map((record) => record.get("f").properties);
  } catch (error) {
    console.error("Error al crear la relación FAVORITED:", error);
  } finally {
    await session.close();
  }
};

// DELETE USER FAVORITE SONG
export const deleteFavoritedRelationship = async (email, songId) => {
  const session = driver.session();
  try {
    await session.run(
      `MATCH (u:User {email: $email})-[f:FAVORITED]->(s:Cancion {id: $songId})
             DELETE f;`,
      { email, songId }
    );
  } catch (error) {
    console.error("Error al eliminar la relación FAVORITED:", error);
  } finally {
    await session.close();
  }
};

// CREATE USER LISTEN A SONG
export const listenToSong = async (email, songId) => {
  const session = driver.session();
  try {
    const result = await session.run(
      `MATCH (u:User {email: $email}), (s:Cancion {id: $songId})
             MERGE (u)-[l:LISTENED]->(s)
             ON CREATE SET l.number_reproductions = 1
             ON MATCH SET l.number_reproductions = l.number_reproductions + 1
             RETURN l;`,
      { email, songId }
    );
    return result.records.map((record) => record.get("l").properties);
  } catch (error) {
    console.error("Error al actualizar la relación LISTENED:", error);
  } finally {
    await session.close();
  }
};

// CREATE USER FOLLOW ARTIST
export const createUserFollowsArtist = async (email, artistName) => {
  const session = driver.session();
  try {
    const result = await session.run(
      `MATCH (u:User {email: $email}), (a:Artist {name_artist: $artistName})
             MERGE (u)-[f:FOLLOWS]->(a)
             RETURN f;`,
      { email, artistName }
    );
    return result.records.map((record) => record.get("f").properties);
  } catch (error) {
    console.error("Error al crear la relación FOLLOWS:", error);
  } finally {
    await session.close();
  }
};

// FETCH USER FAVORITE SONG
export const getSongsWithFavoritedStatus = async (email) => {
  const session = driver.session();
  try {
    const result = await session.run(
      `MATCH (c:Cancion)
             OPTIONAL MATCH (u:User {email: $email})-[:FAVORITED]->(c)
             RETURN c, EXISTS((u)-[:FAVORITED]->(c)) AS favorited`,
      { email }
    );
    return result.records.map((record) => {
      return {
        ...record.get("c").properties,
        favorited: record.get("favorited"),
      };
    });
  } catch (error) {
    console.error("Error al obtener canciones y estado favorito:", error);
  } finally {
    await session.close();
  }
};

// FETCH RECOMMENDED SONGS BASED ON FAVORITE GENRE
export const getRecommendedSongsBasedOnFavoriteGenre = async (userEmail) => {
  const session = driver.session();
  try {
    // Paso 1: Encontrar el género más escuchado basado en las canciones favoritas
    const favoriteGenreResult = await session.run(
      `MATCH (u:User {email: $email})-[:FAVORITED]->(s:Cancion)-[:BELONGS_TO]->(g:Genre)
             RETURN g.name AS genre, COUNT(*) AS count
             ORDER BY count DESC
             LIMIT 1;`,
      { email: userEmail }
    );
    const favoriteGenre = favoriteGenreResult.records[0]?.get("genre");
    if (!favoriteGenre) {
      return { genre: null, songs: [] };
    }

    // Paso 2: Obtener canciones recomendadas de ese género que el usuario no ha marcado como favoritas
    const recommendedSongsResult = await session.run(
      `MATCH (s:Cancion)-[:BELONGS_TO]->(g:Genre {name: $genre})
             WHERE NOT (:User {email: $email})-[:FAVORITED]->(s)
             RETURN s.id AS id, s.title AS title, s.artist AS artist, s.duration AS duration, s.rating AS rating
             LIMIT 10;`,
      { email: userEmail, genre: favoriteGenre }
    );

    const recommendedSongs = recommendedSongsResult.records.map((record) => ({
      id: record.get("id"),
      title: record.get("title"),
      artist: record.get("artist"),
      duration: record.get("duration"),
      rating: record.get("rating"),
    }));

    return { genre: favoriteGenre, songs: recommendedSongs };
  } catch (error) {
    console.error("Error al obtener canciones recomendadas:", error);
    return { genre: null, songs: [] };
  } finally {
    await session.close();
  }
};

// FETCH RECOMMENDED SONGS BASED ON SECOND FAVORITE GENRE
export const getRecommendedSongsBasedOnSecondFavoriteGenre = async (
  userEmail
) => {
  const session = driver.session();
  try {
    // Encontrar el segundo género más escuchado
    const secondFavoriteGenreResult = await session.run(
      `MATCH (u:User {email: $email})-[:FAVORITED]->(s:Cancion)-[:BELONGS_TO]->(g:Genre)
             RETURN g.name AS genre, COUNT(*) AS count
             ORDER BY count DESC
             SKIP 1 LIMIT 1;`, // SKIP 1 LIMIT 1 para el segundo género más favorito
      { email: userEmail }
    );
    const secondFavoriteGenre =
      secondFavoriteGenreResult.records[0]?.get("genre");
    if (!secondFavoriteGenre) {
      return { genre: null, songs: [] };
    }

    // Obtener canciones recomendadas de ese género que el usuario no ha marcado como favoritas
    const recommendedSongsResult = await session.run(
      `MATCH (s:Cancion)-[:BELONGS_TO]->(g:Genre {name: $genre})
             WHERE NOT (:User {email: $email})-[:FAVORITED]->(s)
             RETURN s.id AS id, s.title AS title, s.artist AS artist, s.duration AS duration
             LIMIT 10;`,
      { email: userEmail, genre: secondFavoriteGenre }
    );

    const recommendedSongs = recommendedSongsResult.records.map((record) => ({
      id: record.get("id"),
      title: record.get("title"),
      artist: record.get("artist"),
      duration: record.get("duration"),
      rating: record.get("rating"),
    }));

    return { genre: secondFavoriteGenre, songs: recommendedSongs };
  } catch (error) {
    console.error("Error al obtener canciones recomendadas:", error);
    return { genre: null, songs: [] };
  } finally {
    await session.close();
  }
};

// FETCH RECOMMENDED SONGS BASED ON FAVORITE ARTIST
export const getRecommendedSongsBasedOnFavoriteArtist = async (userEmail) => {
  const session = driver.session();
  try {
    // Encontrar el artista más escuchado por el usuario
    const favoriteArtistResult = await session.run(
      `MATCH (u:User {email: $email})-[:FAVORITED]->(s:Cancion)-[:PERFORMED_BY]->(a:Artist)
             RETURN a.name_artist AS artist, COUNT(*) AS count
             ORDER BY count DESC
             LIMIT 1;`,
      { email: userEmail }
    );
    const favoriteArtist = favoriteArtistResult.records[0]?.get("artist");
    if (!favoriteArtist) {
      return { artist: null, songs: [] };
    }

    // Obtener canciones recomendadas de ese artista que el usuario no ha marcado como favoritas
    const recommendedSongsResult = await session.run(
      `MATCH (s:Cancion)-[:PERFORMED_BY]->(a:Artist {name_artist: $artist})
             WHERE NOT (:User {email: $email})-[:FAVORITED]->(s)
             RETURN s.id AS id, s.title AS title, s.artist AS artist, s.duration AS duration
             LIMIT 10;`,
      { email: userEmail, artist: favoriteArtist }
    );

    const recommendedSongs = recommendedSongsResult.records.map((record) => ({
      id: record.get("id"),
      title: record.get("title"),
      artist: record.get("artist"),
      duration: record.get("duration"),
    }));

    return { artist: favoriteArtist, songs: recommendedSongs };
  } catch (error) {
    console.error("Error al obtener canciones recomendadas:", error);
    return { artist: null, songs: [] };
  } finally {
    await session.close();
  }
};

// FETCH RECOMMENDED SONGS BASED ON COUNTRY
export async function getRecommendedSongsBasedOnCountry(userEmail) {
  const session = driver.session();
  try {
    // Obtener el país donde vive el usuario
    const userCountryResult = await session.run(
      `MATCH (u:User {email: $email})-[:LIVES_IN]->(c:Country)
             RETURN c.country AS country`,
      { email: userEmail }
    );
    const userCountry = userCountryResult.records[0]?.get("country");

    // Verificar si se encontró el país
    if (!userCountry) {
      return { country: null, genre: null, songs: [] };
    }

    // Encontrar un género al azar en el país del usuario
    const randomGenreResult = await session.run(
      `MATCH (g:Genre)-[:POPULAR_IN]->(:Country {country: $country})
            RETURN g.name AS genre`,
      { country: userCountry }
    );
    const randomGenre = randomGenreResult.records[0]?.get("genre");

    // Verificar si se encontró el género
    if (!randomGenre) {
      return { country: userCountry, genre: null, songs: [] };
    }

    // Obtener canciones recomendadas de ese género en el país del usuario
    const recommendedSongsResult = await session.run(
      `MATCH (s:Cancion)-[:BELONGS_TO]->(g:Genre {name: "$genre"})
             RETURN s.id AS id, s.title AS title, s.artist AS artist, s.duration AS duration
             LIMIT 10;`,
      { genre: randomGenre }
    );

    // Construir la lista de canciones recomendadas
    const recommendedSongs = recommendedSongsResult.records.map((record) => ({
      id: record.get("id"),
      title: record.get("title"),
      artist: record.get("artist"),
      duration: record.get("duration"),
    }));

    // Devolver resultados
    return {
      country: userCountry,
      genre: randomGenre,
      songs: recommendedSongs,
    };
  } catch (error) {
    console.error("Error al obtener canciones recomendadas:", error);
    return { country: null, genre: null, songs: [], error: error.message };
  } finally {
    await session.close();
  }
}

// FETCH RECOMMENDED SONGS BASED ON ARTIST OF TOP SONGS NOT FOLLOWED
export const getArtistsOfTopSongsNotFollowed = async (userEmail) => {
  console.log("Email del usuario:", userEmail);
  const session = driver.session();

  try {
    const query = `
      MATCH (u:User {email: $email})-[l:LISTENED]->(c:Cancion)
      WITH u, c, l.number_reproductions AS plays
      ORDER BY plays DESC
      LIMIT 10
      WITH u, collect(c) AS topSongs
      UNWIND topSongs AS ts
      MATCH (ts)-[:PERFORMED_BY]->(a:Artist)
      WHERE NOT (u)-[:FOLLOWS]->(a)
      RETURN DISTINCT a
    `;

    const result = await session.run(query, { email: userEmail });
    console.log(result);
    return result.records.map((record) => record.get("a").properties);
  } catch (error) {
    console.error("Error al obtener artistas:", error);
  } finally {
    await session.close();
  }
};
