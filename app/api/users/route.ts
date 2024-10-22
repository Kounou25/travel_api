// app/api/users/route.ts
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

// Appel à la connexion à la base de données
const prisma = new PrismaClient();

// Lecture des données avec la méthode GET
export async function GET(request: Request) {
  try {
    // Récupérer les données de la table users
    const users = await prisma.user.findMany();
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error(error); // Optionnel : pour loguer l'erreur côté serveur
    return NextResponse.json({ error: "Une erreur de récupération !" }, { status: 500 });
  } finally {
    // Fermer la connexion Prisma pour éviter les fuites de ressources
    await prisma.$disconnect();
  }
}

// Code pour envoyer des données avec la méthode POST
export async function POST(request: Request) {
  const { name, email, password, phoneNumber } = await request.json();
  try {
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password,
        phoneNumber,
      },
    });
    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error(error); // Optionnel : pour loguer l'erreur côté serveur
    return NextResponse.json({ error: "Une erreur d'envoi des données !" }, { status: 500 });
  } finally {
    // Fermer la connexion Prisma pour éviter les fuites de ressources
    await prisma.$disconnect();
  }
}