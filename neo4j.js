import neo4j from 'neo4j-driver';

// CONFIGURACIÓN DE LA CONEXIÓN A NEO4J
const driver = neo4j.driver( 
    'neo4j+s://fa40c88e.databases.neo4j.io:7687',
    neo4j.auth.basic('neo4j','pQKi3ZINQJMOrACnRlIURILhhonWLOK0HNg005r0s3U')
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