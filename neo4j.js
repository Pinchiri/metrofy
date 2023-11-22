import neo4j from 'neo4j-driver';

// CONFIGURACIÓN DE LA CONEXIÓN A NEO4J
const driver = neo4j.driver( 
    process.env.NEXT_PUBLIC_REACT_NEO4J_DRIVER,
    neo4j.auth.basic(process.env.NEXT_PUBLIC_REACT_NEO4J_USER, process.env.NEXT_PUBLIC_REACT_NEO4J_PASSWORD)
);
export default driver;

const session = driver.session();

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