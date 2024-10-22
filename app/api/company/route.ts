import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

// GET: Lire les données des entreprises
export async function GET() {
  try {
    const companies = await prisma.company.findMany();
    return NextResponse.json(companies, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Une erreur de récupération des données d'entreprises !" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

// POST: Créer une nouvelle entreprise
export async function POST(request: Request) {
  const { name, address, phoneNumber, email, logo } = await request.json();
  try {
    const newCompany = await prisma.company.create({
      data: { name, address, phoneNumber, email, logo },
    });
    return NextResponse.json(newCompany, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erreur lors de la création de l'entreprise !" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
