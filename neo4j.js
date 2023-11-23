import neo4j from 'neo4j-driver';

// CONFIGURACIÓN DE LA CONEXIÓN A NEO4J
const driver = neo4j.driver( 
    process.env.NEXT_PUBLIC_REACT_NEO4J_DRIVER,
    neo4j.auth.basic(process.env.NEXT_PUBLIC_REACT_NEO4J_USER, process.env.NEXT_PUBLIC_REACT_NEO4J_PASSWORD)
);
export default driver;

const session = driver.session();

//CREATE NEW USER 
export const createNeo4jUser = async (name, email) => {
    try {
        await session.run(
            'CREATE (n:User {name: $name, email: $email})',
            { name, email }
          );
        } finally {
          await session.close();
    };
  }

//FETCH ALL GENDER CATEGORIES
export const getCategoriesNeo4J = async () => {
const session = driver.session();
try {
    const result = await session.run(
        'MATCH (c:Genre) RETURN c ORDER BY c.name',
    );
    return result.records.map(record => record.get('c').properties);
} catch (error) {
    console.error('Error retrieving categories with pagination:', error);
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
        return result.records.map(record => {
            const song = record.get('c').properties;
            song.favorited = record.get('favorited');
            return song;
        });
    } catch (error) {
        console.error('Error al obtener canciones por género y estado favorito:', error);
    } finally {
        await session.close();
    }
}


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
        return result.records.map(record => record.get('f').properties);
    } catch (error) {
        console.error('Error al crear la relación FAVORITED:', error);
    } finally {
        await session.close();
    }
}

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
        console.error('Error al eliminar la relación FAVORITED:', error);
    } finally {
        await session.close();
    }
}

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
        return result.records.map(record => {
            return {
                ...record.get('c').properties,
                favorited: record.get('favorited')
            };
        });
    } catch (error) {
        console.error('Error al obtener canciones y estado favorito:', error);
    } finally {
        await session.close();
    }
}

