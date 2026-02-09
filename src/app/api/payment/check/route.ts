import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { checkPaymentStatus } from "@/lib/cinetpay";

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  }

  try {
    const { transactionId } = await request.json();

    if (!transactionId) {
      return NextResponse.json({ error: "Transaction ID requis" }, { status: 400 });
    }

    const payment = await prisma.payment.findUnique({
      where: { transactionId },
    });

    if (!payment) {
      return NextResponse.json({ error: "Paiement introuvable" }, { status: 404 });
    }

    // If still pending, check with CinetPay
    if (payment.status === "PENDING") {
      try {
        const result = await checkPaymentStatus(transactionId);
        const newStatus = result.data?.status || "PENDING";

        if (newStatus !== "PENDING") {
          await prisma.payment.update({
            where: { transactionId },
            data: {
              status: newStatus,
              paymentMethod: result.data?.payment_method || null,
              operator: result.data?.operator_id || null,
              cinetpayData: JSON.stringify(result.data),
            },
          });

          // Upgrade user if accepted
          if (newStatus === "ACCEPTED" && payment.plan) {
            await prisma.user.update({
              where: { id: payment.userId },
              data: {
                plan: payment.plan,
                cvCredits: payment.plan === "business" ? 999 : 1,
              },
            });
          }

          return NextResponse.json({ status: newStatus });
        }
      } catch {
        // CinetPay API might not be available, return stored status
      }
    }

    return NextResponse.json({ status: payment.status });
  } catch (error) {
    console.error("Payment check error:", error);
    return NextResponse.json({ error: "Erreur vérification" }, { status: 500 });
  }
}
