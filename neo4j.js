import neo4j from 'neo4j-driver';

// CONFIGURACIÓN DE LA CONEXIÓN A NEO4J
const driver = neo4j.driver( 
    process.env.NEXT_PUBLIC_REACT_NEO4J_DRIVER,
    neo4j.auth.basic(process.env.NEXT_PUBLIC_REACT_NEO4J_USER, process.env.NEXT_PUBLIC_REACT_NEO4J_PASSWORD)
);
export default driver;

const session = driver.session();

//FUNCIÓN PARA CREAR UN USUARIO
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

//FUNCION PARA TRAERNOS TODOS LOS GENDERS
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

// FUNCION PARA TRAERNOS LAS CANCIONES QUE ESTAN IMPLICADAS EN LA ARISTA BELONGS_TO DE UN GENDER 
export const getSongsByGenderNeo4J = async (genreName) => {
    const session = driver.session();
    try {
        const result = await session.run(
            'MATCH (c:Cancion)-[:BELONGS_TO]->(g:Genre {name: $genreName}) RETURN c',
            { genreName }
        );
        return result.records.map(record => record.get('c').properties);
    } catch (error) {
        console.error('Error al obtener canciones por género:', error);
    } finally {
        await session.close();
    }
}
