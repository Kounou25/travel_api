import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

// GET: Lire les routes
export async function GET() {
  try {
    const routes = await prisma.route.findMany();
    return NextResponse.json(routes, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erreur lors de la récupération des routes !" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

// POST: Créer une nouvelle route
export async function POST(request: Request) {
  const { companyId, origin, destination, departureTime, arrivalTime, price, seatsAvailable } = await request.json();
  try {
    const newRoute = await prisma.route.create({
      data: { companyId, origin, destination, departureTime, arrivalTime, price, seatsAvailable },
    });
    return NextResponse.json(newRoute, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erreur lors de la création de la route !" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
