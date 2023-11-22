// Importar las dependencias necesarias
import driver from "../../../neo4j";
import { NextResponse } from "next/server";

// Función separada para crear un usuario en Neo4j
async function createNeo4jUser(name, email) {
  const session = driver.session();
  try {
    await session.run(
      'CREATE (n:User {name: $name, email: $email})',
      { name, email }
    );
  } finally {
    await session.close();
  }
}

// Función para manejar POST requests
export async function POST(req) {
  try {
    const { name, email } = await req.json(); // Se descompone el body del request
    await createNeo4jUser(name, email); // Llamada a la función para crear el usuario
    return new NextResponse(JSON.stringify({ success: true, message: 'Usuario registrado exitosamente' }), { status: 201 });
  } catch (error) {
    return new NextResponse(JSON.stringify({ success: false, message: 'Error del servidor', error: error.message }), { status: 500 });
  }
}
