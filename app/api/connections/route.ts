import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    // Get mock user or create default test user in database
    let user = await prisma.user.findFirst();
    if (!user) {
      user = await prisma.user.create({
        data: {
          email: "test@drinkedin.com",
          name: "Marcus Vane",
          headline: "3-Second Pint Chugger & Tuesday Hangover Legend",
          avatar_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
        },
      });
    }

    const { receiverId } = await request.json();
    if (!receiverId) {
      return NextResponse.json({ error: "Receiver ID is required" }, { status: 400 });
    }

    const requesterId = user.id;

    if (requesterId === receiverId) {
      return NextResponse.json({ error: "You cannot connect with yourself" }, { status: 400 });
    }

    // Check if the receiver exists
    const receiver = await prisma.user.findUnique({
      where: { id: receiverId },
    });

    if (!receiver) {
      return NextResponse.json({ error: "Receiver user not found" }, { status: 404 });
    }

    // Check if a connection already exists
    const existingConnection = await prisma.connection.findFirst({
      where: {
        OR: [
          { requesterId, receiverId },
          { requesterId: receiverId, receiverId: requesterId },
        ],
      },
    });

    if (existingConnection) {
      return NextResponse.json(
        { error: "Connection request already exists or you are already connected" },
        { status: 400 }
      );
    }

    const connection = await prisma.connection.create({
      data: {
        requesterId,
        receiverId,
        status: "PENDING",
      },
    });

    return NextResponse.json(connection, { status: 201 });
  } catch (error) {
    console.error("POST /api/connections error:", error);
    return NextResponse.json({ error: "Failed to send connection request" }, { status: 500 });
  }
}
