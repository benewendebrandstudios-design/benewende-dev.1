import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { initPayment, PLANS, PlanId } from "@/lib/cinetpay";

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  }

  try {
    const { planId } = await request.json();

    if (!planId || !(planId in PLANS)) {
      return NextResponse.json({ error: "Plan invalide" }, { status: 400 });
    }

    const plan = PLANS[planId as PlanId];
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: "Utilisateur introuvable" }, { status: 404 });
    }

    const transactionId = `BND-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";

    // Save pending payment
    await prisma.payment.create({
      data: {
        userId: user.id,
        transactionId,
        amount: plan.amount,
        currency: "XOF",
        description: plan.description,
        status: "PENDING",
        plan: plan.plan,
        serviceType: plan.serviceType,
      },
    });

    // Init CinetPay
    const result = await initPayment({
      transactionId,
      amount: plan.amount,
      description: plan.description,
      customerName: user.name,
      customerEmail: user.email,
      returnUrl: `${baseUrl}/payment/status?tx=${transactionId}`,
      notifyUrl: `${baseUrl}/api/payment/notify`,
      channels: "ALL",
    });

    if (result.code !== "201") {
      return NextResponse.json(
        { error: result.message || "Erreur initialisation paiement" },
        { status: 400 }
      );
    }

    return NextResponse.json({
      paymentUrl: result.data.payment_url,
      paymentToken: result.data.payment_token,
      transactionId,
    });
  } catch (error) {
    console.error("Payment init error:", error);
    return NextResponse.json(
      { error: "Erreur lors de l'initialisation du paiement" },
      { status: 500 }
    );
  }
}
