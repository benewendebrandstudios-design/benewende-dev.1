import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, project, budget, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Nom, email et message sont requis." },
        { status: 400 }
      );
    }

    await prisma.contactMessage.create({
      data: {
        name,
        email,
        project: project || null,
        budget: budget || null,
        message,
      },
    });

    if (resend) {
      // Notification to admin
      await resend.emails.send({
        from: "Benewende.dev <noreply@benewende.dev>",
        to: ["contact@benewende.dev"],
        subject: `Nouveau message de ${name}${project ? ` - ${project}` : ""}`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
            <div style="background: linear-gradient(135deg, #0066FF, #0052cc); padding: 24px; border-radius: 12px 12px 0 0; color: white;">
              <h1 style="margin: 0; font-size: 20px;">Nouveau message de contact</h1>
              <p style="margin: 8px 0 0; opacity: 0.9; font-size: 14px;">Benewende.dev</p>
            </div>
            <div style="background: #f9fafb; padding: 24px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 12px 12px;">
              <table style="width: 100%; font-size: 14px; border-collapse: collapse;">
                <tr><td style="padding: 8px 0; color: #6b7280; width: 100px;">Nom</td><td style="padding: 8px 0; font-weight: 600;">${name}</td></tr>
                <tr><td style="padding: 8px 0; color: #6b7280;">Email</td><td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #0066FF;">${email}</a></td></tr>
                ${project ? `<tr><td style="padding: 8px 0; color: #6b7280;">Projet</td><td style="padding: 8px 0;">${project}</td></tr>` : ""}
                ${budget ? `<tr><td style="padding: 8px 0; color: #6b7280;">Budget</td><td style="padding: 8px 0;">${budget}</td></tr>` : ""}
              </table>
              <div style="margin-top: 16px; padding: 16px; background: white; border-radius: 8px; border: 1px solid #e5e7eb;">
                <p style="margin: 0 0 4px; font-size: 12px; color: #6b7280; text-transform: uppercase; letter-spacing: 0.05em;">Message</p>
                <p style="margin: 0; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${message}</p>
              </div>
            </div>
          </div>`,
      });

      // Auto-reply to client
      await resend.emails.send({
        from: "Benewende.dev <noreply@benewende.dev>",
        to: [email],
        subject: "Merci pour votre message !",
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
            <div style="background: linear-gradient(135deg, #0066FF, #0052cc); padding: 32px 24px; border-radius: 12px 12px 0 0; color: white; text-align: center;">
              <h1 style="margin: 0; font-size: 22px;">Merci ${name} !</h1>
              <p style="margin: 8px 0 0; opacity: 0.9; font-size: 14px;">Votre message a bien \u00e9t\u00e9 re\u00e7u</p>
            </div>
            <div style="background: #f9fafb; padding: 24px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 12px 12px;">
              <p style="font-size: 14px; line-height: 1.7; color: #374151;">
                Bonjour <strong>${name}</strong>,
              </p>
              <p style="font-size: 14px; line-height: 1.7; color: #374151;">
                Je vous confirme la bonne r\u00e9ception de votre message. Je reviendrai vers vous dans les <strong>24 heures</strong>.
              </p>
              ${project ? `<p style="font-size: 14px; line-height: 1.7; color: #374151;">Votre projet <strong>${project}</strong> m'int\u00e9resse et j'ai h\u00e2te d'en discuter avec vous.</p>` : ""}
              <p style="font-size: 14px; line-height: 1.7; color: #374151;">
                \u00C0 tr\u00e8s bient\u00f4t,<br/>
                <strong>Benewende</strong><br/>
                <span style="color: #6b7280;">D\u00e9veloppeur Full Stack</span>
              </p>
              <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;" />
              <p style="font-size: 12px; color: #9ca3af; text-align: center;">
                <a href="https://benewende.dev" style="color: #0066FF; text-decoration: none;">benewende.dev</a> &bull; Ouagadougou, Burkina Faso
              </p>
            </div>
          </div>`,
      });
    }

    return NextResponse.json({
      success: true,
      message: "Message envoy\u00E9 avec succ\u00E8s. R\u00E9ponse sous 24h.",
    });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue. Veuillez r\u00E9essayer." },
      { status: 500 }
    );
  }
}
