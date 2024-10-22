import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

// Appel à la connexion à la base de données
const prisma = new PrismaClient();

// Lecture des données avec la méthode GET
export async function GET() {
    try {
        // Récupérer les données de la table users
        const data = await prisma.user.findMany();
        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        console.error(error); // Optionnel : pour loguer l'erreur côté serveur
        return NextResponse.json({ error: "Une erreur de récupération des utilisateurs !" }, { status: 500 });
    } finally {
        // Fermer la connexion Prisma pour éviter les fuites de ressources
        await prisma.$disconnect();
    }
}

// Envoi des données avec la méthode POST
export async function POST(request: Request) {
    const { name, email, password, phoneNumber } = await request.json();
    try {
        const addUser = await prisma.user.create({
            data: { name, email, password, phoneNumber },
        });
        return NextResponse.json(addUser, { status: 201 });
    } catch (error) {
        console.error(error); // Optionnel : pour loguer l'erreur côté serveur
        return NextResponse.json({ error: "Une erreur d'envoi des données utilisateur !" }, { status: 500 });
    } finally {
        // Fermer la connexion Prisma pour éviter les fuites de ressources
        await prisma.$disconnect();
    }
}
