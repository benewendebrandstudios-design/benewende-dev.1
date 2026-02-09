import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";
const DEFAULT_MODEL = "meta-llama/llama-3.1-8b-instruct:free";

const SYSTEM_PROMPT = `Tu es un assistant professionnel spécialisé dans la rédaction de CV. Tu aides les utilisateurs francophones à créer des CV percutants et optimisés pour les ATS (Applicant Tracking Systems).

Règles:
- Réponds toujours en français
- Sois concis et professionnel
- Quand on te donne un résumé professionnel brut, améliore-le en 3-4 phrases impactantes
- Quand on te demande des suggestions de compétences, propose des compétences pertinentes pour le poste
- Quand on te demande d'améliorer une description d'expérience, rends-la plus orientée résultats avec des métriques
- Utilise des verbes d'action forts
- Ne dépasse jamais 200 mots par réponse`;

async function getAIModel(): Promise<string> {
  try {
    const setting = await prisma.siteSetting.findUnique({ where: { id: "ai" } });
    if (setting) {
      const parsed = JSON.parse(setting.value);
      if (parsed.model) return parsed.model;
    }
  } catch { /* fallback */ }
  return DEFAULT_MODEL;
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  }

  if (!OPENROUTER_API_KEY) {
    return NextResponse.json(
      { error: "Clé API OpenRouter non configurée" },
      { status: 500 }
    );
  }

  try {
    const { messages, context } = await request.json();
    const model = await getAIModel();

    const systemMessage = context
      ? `${SYSTEM_PROMPT}\n\nContexte CV actuel:\n${JSON.stringify(context, null, 2)}`
      : SYSTEM_PROMPT;

    const response = await fetch(OPENROUTER_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://benewende.dev",
        "X-Title": "Benewende CV Generator",
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: "system", content: systemMessage },
          ...messages.slice(-10),
        ],
        max_tokens: 500,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error("OpenRouter error:", err);
      return NextResponse.json(
        { error: "Erreur du service IA" },
        { status: 502 }
      );
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || "Désolé, je n'ai pas pu générer de réponse.";

    return NextResponse.json({ content, model });
  } catch (error) {
    console.error("AI chat error:", error);
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
