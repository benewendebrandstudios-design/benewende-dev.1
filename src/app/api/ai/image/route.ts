import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const PIXAZO_API_KEY = process.env.PIXAZO_API_KEY;

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  }

  if (!PIXAZO_API_KEY) {
    return NextResponse.json(
      { error: "Clé API Pixazo non configurée" },
      { status: 500 }
    );
  }

  try {
    const { prompt, width = 512, height = 512 } = await request.json();

    if (!prompt) {
      return NextResponse.json({ error: "Prompt requis" }, { status: 400 });
    }

    const response = await fetch("https://api.pixazo.com/v1/generate", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${PIXAZO_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
        width,
        height,
        num_images: 1,
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error("Pixazo error:", err);
      return NextResponse.json(
        { error: "Erreur du service image" },
        { status: 502 }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Image generation error:", error);
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
